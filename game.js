const bColors = ["green", "red", "yellow", "blue"];
let pattern = [];
let userPattern = [];
let launchedGame = false;
let level = 0;

$(document).keypress(function() {
  if (!launchedGame) {
    $("#level-title").text("level: " + level);
    nextSequence();
    launchedGame = true;
  }
})

$(".btn").click(function() {
  let clicked = $(this).attr('id');
  clickedButton(clicked);
  playSound(clicked);
  userPattern.push(clicked);
  checkAnswer(userPattern.length-1);
})

function nextSequence() {
  level++;
  $("#level-title").text("level: " + level);

  let randomizer = Math.floor(Math.random() * 4);
  pattern.push(bColors[randomizer]);

  for (let i = 0; i < pattern.length; i++) {
    (function(i) {
      setTimeout(function() {
        $("#" + pattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(pattern[i]);
      }, 300 * i)
    })(i);
  }
}

function playSound(button) {
  let bip = new Audio(button + ".mp3");
  bip.play();
}

function clickedButton(buttonClicked) {
  $("#" + buttonClicked).addClass("pressed");
  setTimeout(function() {
    $("#" + buttonClicked).removeClass("pressed");
  }, 100);
}

function checkAnswer(step){
  if(userPattern[step] == pattern[step]){
    if(userPattern.length == pattern.length){
      userPattern = [];
      setTimeout(function(){ nextSequence();}, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){ $("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over! Press Any Key To Restart");
    startOver();
  }
}

function startOver(){
  level =0;
  userPattern = [];
  pattern = [];
  launchedGame = false;
}
