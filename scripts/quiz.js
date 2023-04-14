class Quiz {
  constructor({
    questions,
    quizQuestionCounter,
    quizQuestion,
    quizOptions,
    quizNextBtn,
    quizSection,
    quizScorecard,
  }) {
    this.questions = questions || [];
    this.currentQuestion = 0;
    this.scoreCard = [];

    for (let i = 0; i < this.questions.length; i++) {
      this.scoreCard.push(null);
    }

    this.quizQuestionCounter = quizQuestionCounter;
    this.quizQuestion = quizQuestion;
    this.quizOptions = quizOptions;
    this.quizNextBtn = quizNextBtn;
    this.quizSection = quizSection;
    this.quizScorecard = quizScorecard;

    this.renderQuestion(this.currentQuestion);
    this.renderScoreCard();

    this.quizSection.addEventListener("submit", (e) => {
      e.preventDefault();

      this.handleNextQuestion();
    });
  }

  renderQuestion(questionNum) {
    const question = this.questions[questionNum];

    this.quizQuestionCounter.textContent = this.currentQuestion + 1;
    this.quizQuestion.textContent = question.question;

    for (let i = 0; i < this.quizOptions.length; i++) {
      quizOptions[i].textContent = question.answers[i];
    }
  }

  renderScoreCard() {
    this.quizScorecard.innerHTML = "";

    for (let i = 0; i < this.scoreCard.length; i++) {
      const score = this.scoreCard[i];

      if (score === null) {
        this.quizScorecard.innerHTML += blank;
      } else if (score) {
        this.quizScorecard.innerHTML += correctAnswer;
      } else {
        this.quizScorecard.innerHTML += wrongAnswer;
      }
    }
  }

  handleNextQuestion() {
    if (this.currentQuestion === this.questions.length) {
      return;
    }

    const selectedOptionElement = this.quizSection.querySelector(
      'input[name="answer"]:checked'
    );

    const selectedOption = selectedOptionElement?.value;

    if (!selectedOption) {
      return;
    }

    if (selectedOption === this.questions[this.currentQuestion].correct) {
      this.scoreCard[this.currentQuestion] = true;
    } else {
      this.scoreCard[this.currentQuestion] = false;
    }

    this.renderScoreCard();

    this.currentQuestion += 1;

    if (this.currentQuestion < this.questions.length) {
      this.renderQuestion(this.currentQuestion);
    }

    selectedOptionElement.checked = false;
  }
}
