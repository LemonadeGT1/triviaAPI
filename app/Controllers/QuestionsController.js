import { appState } from "../AppState.js"
import { questionsService } from "../Services/QuestionsService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"


function _drawQuestions() {
  let questions = appState.questions
  let template = ''
  questions.forEach(q => template += q.questionTemplate)
  setHTML('questions', template)
}

function _drawCorrectAnswersTally() {
  console.log('_drawCorrectAnswers')
  setText('correctAnswerTally', appState.correctAnswers)
}

export class QuestionsController {
  constructor() {
    console.log('QuestionsController constructor')
    appState.on('correctAnswerTally', _drawCorrectAnswersTally())
    this.getQuestions()
  }

  async getQuestions() {
    try { // * try to do this
      await questionsService.getQuestions() // await is required here so the try waits for the service's resolution
      _drawQuestions()
    } catch (error) { // * if in this process you fail, do this instead
      console.error(error) // repeat the error for developers
      Pop.error(error) // tell the users an error occurred
    }
  }

  checkAnswer(answer) {
    console.log('QuestionController checkAnswer()', answer)
    console.log('appState.questions', appState.questions[0].correct_answer)
    if (answer == appState.questions[0].correct_answer) {
      console.log('correct')
      Pop.success('Great Job! Get ready for the next question.')
      questionsService.changeCorrectAnswersTally(1)
      // appState.correctAnswers += 1
      // TODO - Pull a new question for the user
      this.getQuestions()
    } else {
      console.log('incorrect')
      Pop.toast('Incorrect! Try again.', 'error', 'top-end', 1500, false)
      questionsService.changeCorrectAnswersTally(0)
      // appState.correctAnswers = 0
    }
    console.log('correctAnswer', appState.correctAnswers)
    _drawCorrectAnswersTally()
  }
}