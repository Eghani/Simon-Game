document.addEventListener("DOMContentLoaded", function () {
  const rulesToggle = document.getElementById("rules-toggle");
  const rulesList = document.getElementById("rules-list");
  if (!rulesToggle || !rulesList) return;
  let rulesTimeout;
  let isOpen = false;
  function closeRules() {
    rulesList.style.maxHeight = "0";
    rulesList.style.opacity = "0";
    rulesToggle.innerHTML = "Rules &#9660;";
    isOpen = false;
  }
  function openRules() {
    rulesList.style.maxHeight = rulesList.scrollHeight + "px";
    rulesList.style.opacity = "1";
    rulesToggle.innerHTML = "Rules &#9650;";
    isOpen = true;
    clearTimeout(rulesTimeout);
    rulesTimeout = setTimeout(closeRules, 4000);
  }
  closeRules();
  rulesToggle.addEventListener("click", function () {
    if (isOpen) {
      closeRules();
    } else {
      openRules();
    }
  });
});
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
let level = 0;
let started = false;
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
