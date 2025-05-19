const questions = [
  {
    question: 'What is the capital of France?',
    choices: ['Berlin', 'London', 'Paris', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    choices: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars',
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    choices: ['Harper Lee', 'Ernest Hemingway', 'Mark Twain', 'Jane Austen'],
    answer: 'Harper Lee',
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreContainer = document.getElementById('score-container');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.textContent = '';
  restartBtn.style.display = 'none';
  nextBtn.textContent = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQ = questions[currentQuestionIndex];
  questionElement.textContent = currentQ.question;

  currentQ.choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('btn');
    btn.addEventListener('click', () => selectAnswer(btn, currentQ.answer));
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextBtn.style.display = 'none';
  answered = false;
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(selectedBtn, correctAnswer) {
  if (answered) return;
  answered = true;
  const allBtns = answerButtons.children;
  for (let btn of allBtns) {
    btn.classList.add('selected');
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add('correct');
    }
    if (btn === selectedBtn && btn.textContent !== correctAnswer) {
      btn.classList.add('wrong');
    }
  }
  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }
  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

restartBtn.addEventListener('click', startQuiz);

function showScore() {
  resetState();
  questionElement.textContent = 'Quiz Finished!';
  scoreContainer.textContent = `Your score: ${score} / ${questions.length}`;
  nextBtn.style.display = 'none';
  restartBtn.style.display = 'inline-block';
}

startQuiz();
