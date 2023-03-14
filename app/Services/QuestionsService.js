import { appState } from "../AppState.js";
import { Question } from "../Models/Question.js";

class QuestionsService {


  async getQuestions() {
    // @ts-ignore the code doesn't know axios exists until the index is read
    let response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
    console.log('axios', response)
    appState.questions = response.data.results.map(char => new Question(char)) // response.data.map cause data is a property on response
    console.log('AppState', appState.questions)
  }

  changeCorrectAnswersTally(incrementORReset) {
    if (incrementORReset) {
      appState.correctAnswers += 1
    } else appState.correctAnswers = 0
  }

}

export const questionsService = new QuestionsService()