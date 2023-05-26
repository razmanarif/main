// declare variables
const character = document.querySelector(".character");
const enemy = document.querySelector(".enemy");
const background = document.querySelector("#img");
let score = document.querySelector(".score");
const difficultyButtons = document.querySelector(".buttons")
const easyButton = document.querySelector(".easy");
const mediumButton = document.querySelector(".medium");
const hardButton = document.querySelector(".hard");
const welcomeText = document.querySelector(".welcome")
const backgroundMusic = document.getElementById("background-music");
const jumpingSound = document.getElementById("jumping-sound")
const gameOverSound = document.getElementById("game-over")

// function for character to jump and change character sprite during jumping animation
function jump() {
  if (character.classList != "jump") {
    character.classList.add("jump");
    character.setAttribute("src", "images/jumping.png");
    
    //removes jump class from 'character after 500ms, changing the character sprite to it's original image and allows us to jump again
    setTimeout(() => {
      character.classList.remove("jump");
      character.setAttribute("src", "images/character.png")
    }, 500);
  }
}

// functions to play / pause music or sound effects
function playMusic() {
  backgroundMusic.play();
}

function stopMusic() {
  backgroundMusic.pause();
}

function jumpSoundEffect() {
  jumpingSound.play();
}

function gameOverSoundEffect() {
  gameOverSound.play();
}

// hiding the "Press any key to jump" after the first jump and play sound effects for each jump
document.addEventListener("keydown", () => {
  jump();
  welcomeText.classList.add("hide")
  jumpSoundEffect();
});

// hiding the difficulty selector buttons when the game starts
const startScreen = document.querySelector(".start-screen");

function hideButtons() {
  difficultyButtons.classList.add("hide");
  welcomeText.innerText = "Press any key to jump"
}

// hides the difficulty buttons, starts counting the score, and starts main background music after player selects difficulty level
difficultyButtons.addEventListener("click", () => {
  hideButtons();
  startScoreCounter();
  playMusic();
});


// event listeners to each difficulty buttons and adding the selected difficulty class

easyButton.addEventListener("click", () => {
  enemy.classList.add("enemymoving");
  enemy.classList.add("enemyeasy");
});

mediumButton.addEventListener("click", () => {
  enemy.classList.add("enemymoving");
  enemy.classList.add("enemymedium");
});

hardButton.addEventListener("click", () => {
  enemy.classList.add("enemymoving");
  enemy.classList.add("enemyhard");
});

// function to keep score
let totalScore = 0;
let scoreInterval;

// the score counter function, the loop iterates from 0 to 10 billion
let scoreCounter = () => {
  for (let i = 0; i < 10000000000; i++) {
    totalScore++;
  }
};

// updating the score displayed on screen, score will keep going up until it detects a collision
let updateScore = () => {
  if (collision != "collide") {
    totalScore++;
    score.innerText = `Score: ${totalScore}`;
  }
};

// starts the score counter, player gets 1 point every second, this function gets called in the hideButtons function above
const startScoreCounter = () => {
  scoreInterval = setInterval(updateScore, 1000);
};

// function to stop counting scores once collision happens
const stopScoreCounter = () => {
  clearInterval(scoreInterval);
};

// function to detect collision
// function gameOver if collision detected

let collision = "";
let isAlive = setInterval(() => {
  // get character Y position
  let characterBottom = parseInt(
    window.getComputedStyle(character).getPropertyValue("bottom")
  );
  //get enemy X position
  let enemyLeft = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("left")
  );


  // assign character X position to constants
  const characterRight = 150;
  const characterLeft = 100;

  // checking for a collision
  if (
    enemyLeft < characterRight &&
    enemyLeft > characterLeft &&
    characterBottom < 130 //character bottom when stationary is set to 120, this checks whether or not the player is mid-air
  ) {
    collision = "collide";
    if (collision == "collide") {
      const stopGame = () => {
        clearInterval(isAlive);
        stopScoreCounter();
        enemy.remove();
        character.remove();
        stopMusic();
        gameOverSoundEffect();
        background.setAttribute("src", "images/gameover.jpg");
        welcomeText.innerText = "Why didn't you jump?" // will display if player collides with the dog without performing a single jump
        restartButton.classList.remove("hide"); // displays the 'retry' button upon collision
      };

      // Call the stopGame function
      
      stopGame();
      
    }
  }
}, 50);

// Restart button on game over screen
const restartButton = document.querySelector(".restart-button");

// Function to restart the game 
function restartGame() {

  location.reload();
}

// Add an event listener to the restart button
restartButton.addEventListener("click", restartGame);



