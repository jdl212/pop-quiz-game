function printHighscores() {
  var highScoreEl = document.getElementById("highscores");
  var savedHighScores = JSON.parse(localStorage.getItem("scores"));
  // deseding order each one
  savedHighScores.sort(function (a, b) {
    return a[Object.keys(a)[0]] - b[Object.keys(b)[0]];
  });
  //highScoreEl
  for (i = 0; i < savedHighScores.length; i++) {
    var name = [Object.keys(savedHighScores[i])[0]];
    var score = savedHighScores[i][name];
    var li = ` <li>${name}:${score}</li>`;
    highScoreEl.innerHTML += li;
  }
  //for score
  // for (var i=0 ; localStorage.get=)
}

function clearHighscores() {
  // (and reload)
  localStorage.setItem("scores", "");
  printHighscores();
}

// attache clear event to clear score button
var clearBtn = document.getElementById("clear");
clearBtn.onclick = clearHighscores;
// run printhighscore when page loads
document.getElementsByTagName("body")[0].onload = printHighscores;
