/***********************************************************************************
 Color Tiles
 Author: Stephanie Grasso

 Simple program that displays a random animated pattern of colored tiles for 15 sec
 utilizing both the p5.timer and p5.clickable classes.

 ------------------------------------------------------------------------------------
 Notes:
 * includes a replay button, help button, and

 ***********************************************************************************/
let panelTimer;
let gameTimer;
let clickButton;
let elapsedSeconds = 0;
let score = 0;
let boardDimensions = 3;
let table = [];
let r1 = 0;
let r2 = 0;
let possibilities = [0, 1, 2];
let colorChoices = ["#3434eb", "#ed37d2", "#f0b71d", "#b479e8"]
let colorPicker = 0;

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  panelTimer = new Timer(500);
  gameTimer = new Timer(15000);
  clickButton = new Clickable();

  initButton();

  panelTimer.start();

  for (let i = 0; i < boardDimensions; i++){
      let box = []
      for (let j = 0; j < boardDimensions; j++){
          box.push(0);
      }
      table.push(box);
  }
  textAlign(CENTER);
  textSize(96);
 }


// Draw code goes here
function draw() {
  background(0);
  // draws the replay button
  clickButton.draw();
  if (!gameTimer.expired()) {
      updatePanel();
  }
  else {
      table[r1][r2] = 0;
  }

  fill(255);
  drawBoard();
}

// initButton() -- initialize buttons
function initButton() {
    clickButton.text = "replay?"
    clickButton.width = 100;
    clickButton.height = 50;
    clickButton.locate(width / 2, 100);
    clickButton.onRelease = replay;
    clickButton.onHover = buttonHover;
    clickButton.onOutside = buttonOutside;
}

// drawBoard() -- for loop that draws grid of circles
function drawBoard() {
    for ( let i = 0; i < boardDimensions; i++) {
        for ( let j = 0; j < boardDimensions; j++) {
            if(table[i][j] == 1) {
                fill(colorChoices[colorPicker]);
            }
            else {
                fill(255);
            }
            ellipse((width / 2) + ((j - .75) * 200), (height / 2) +  ((i - 1) * 80), 100, 70);
        }
    }
}
// randomizePanel() -- randomly chooses a panel in the table to color
function randomizePanel() {
    // get random panel to color
    r1 = random(possibilities);
    r2 = random(possibilities);
    // set in table to true
    table[r1][r2] = 1;
    console.log("r1: " + r1 + " r2: " + r2);
}

function setRandomColor() {
    colorPicker = round(random(colorChoices.length - 1))
    console.log("Color picker chose: colorChoices[" + colorPicker + "] -> " + colorChoices[colorPicker]);
}

// updatePanel() -- Looks for elapsed time
function updatePanel() {
  if( panelTimer.expired() ) {
    table[r1][r2] = 0;
    // set new "mole"
    randomizePanel();
    // set random color
    setRandomColor();
    // reset timer
  	panelTimer.start();
  }
}

buttonOutside = function () {
    this.color = "#FFFFFF";
    this.textColor = "#000000";
}

buttonHover = function () {
    this.color = "#FF0000";
    this.textColor = "#FFFFFF";
}

// for replay clickable button
replay = function () {
    gameTimer.start();
}
