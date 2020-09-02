// variables to keep track of quiz state
var currentQuestionIndex = 0;

var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startScreenEL = document.getElementById("start-screen");
var endScreenEl = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");
var clearBtn = document.getElementById("clear");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  startScreenEL.classList.add("hide");
  // un-hide questions section
  questionsEl.classList.remove("hide");
  // start timer
  // show starting time
  timerId = setInterval(clockTick, 1000);
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var question = questions[currentQuestionIndex];
  // update title with current question
  var questionTitle = questionsEl.firstElementChild;
  questionTitle.innerHTML = question.title;
  // clear out any old question choices
  choices.innerHTML = "";
  // loop over choices
  for (i = 0; i < question.choices.length; i++) {
    // create new button for each choice
    // attach click event listener to each choice
    // display on the page
    const btn = `<button onclick="questionClick('${question.choices[i]}')">${question.choices[i]}</button>`;
    choices.innerHTML += btn;
  }
}

function questionClick(choice) {
  // check if user guessed wrong
  let question = questions[currentQuestionIndex];
  let isCorrect = question.answer === choice;
  if (isCorrect) {
    // play "right" sound effect
    sfxRight.play();
    // flash right/wrong feedback on page for half a second
    feedbackEl.innerHTML = "correct";
    feedbackEl.classList.remove("hide");
    setTimeout(() => {
      feedbackEl.innerHTML = "";
      feedbackEl.classList.add("hide");
    }, 500);
    // move to next question
    ++currentQuestionIndex;
  } else {
    // penalize time
    time -= 5;
    // display new time on page
    clearInterval(timerId);
    timerId = setInterval(clockTick, 1000);
    // play "wrong" sound effect
    sfxWrong.play();
    // flash right/wrong feedback on page for half a second
    feedbackEl.innerHTML = "incorrect";
    feedbackEl.classList.remove("hide");
    setTimeout(() => {
      feedbackEl.innerHTML = "";
      feedbackEl.classList.add("hide");
    }, 500);
  }

  if (time > 0) {
    // check if we've run out of questions
    if (questions.length - 1 === currentQuestionIndex) {
      // quizEnd
      quizEnd();
    } else {
      // getQuestion
      getQuestion();
    }
  } else {
    quizEnd();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  endScreenEl.classList.remove("hide");
  // show final score
  var score = time;
  finalScoreEl.innerHTML = score;
  // function drawScore()
  // hide questions section
  questionsEl.classList.add("hide");
}

function clockTick() {
  // update time
  --time;
  // show user time updated
  timerEl.innerHTML = time;
  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}



function saveHighscore() {
  // get value of input box
  // funtion getInputValue(){}
  // make sure value wasn't empty
  var newScore = {
    [initialsEl.value]: finalScoreEl.innerHTML,
  };
  var scores = localStorage.getItem("scores");
  if (!scores) {
    var scoresRaw = [];
    scoresRaw.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scoresRaw));
  } else {
    var scoresRaw = JSON.parse(scores);
    scoresRaw.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scoresRaw));
  }
  // get saved scores from localstorage, or if not any, set to empty array
  // format new score object for current user
  // save to localstorage
  // redirect to next page
  window.location.href = "highscore.html";
}

function checkForEnter(event) {
  // check if event key is enter
  if (event.keyCode === 13) {
    // saveHighscore
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
