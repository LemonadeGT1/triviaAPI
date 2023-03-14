


export class Question {
  constructor(data) {
    this.difficulty = data.difficulty
    this.question = data.question
    this.correct_answer = data.correct_answer
    this.incorrect_answers = data.incorrect_answers

  }

  get all_answers() {
    let allAnswers = []
    allAnswers = this.incorrect_answers.map(a => a)
    allAnswers.push(this.correct_answer)
    console.log(allAnswers)
    allAnswers.sort(() => Math.random() - 0.5)
    return allAnswers
  }


  get questionTemplate() {
    const newOrderAnswers = [...this.all_answers]
    return `
    <div class="row justify-content-center p-3">
      <div class="col-6 card p-3 elevation-3">${this.question}
        <div class="qFloat elevation-1">
          <h5>Question</h5>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 m-1">
        <div class="card elevation-1 p-1 answer" onClick="app.questionsController.checkAnswer('${newOrderAnswers[0]}')">${newOrderAnswers[0]}</div>
      </div>
      <div class="col-3 m-1">
        <div class="card elevation-1 p-1 answer" onClick="app.questionsController.checkAnswer('${newOrderAnswers[1]}')">${newOrderAnswers[1]}</div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 m-1">
        <div class="card elevation-1 p-1 answer" onClick="app.questionsController.checkAnswer('${newOrderAnswers[2]}')">${newOrderAnswers[2]}</div>
      </div>
      <div class="col-3 m-1">
        <div class="card elevation-1 p-1 answer" onClick="app.questionsController.checkAnswer('${newOrderAnswers[3]}')">${newOrderAnswers[3]}</div>
      </div>
    </div>
  `
  }


}