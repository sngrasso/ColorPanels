/***********************************************************************************
 Color Tiles
 Author: Stephanie Grasso

 Simple program that displays a random animated pattern of colored tiles for 15 sec
 utilizing both the p5.timer and p5.clickable classes.

 ------------------------------------------------------------------------------------
 Notes:
 * includes a replay button, help button, and

 ***********************************************************************************/
// Object global variables
let panelTimer;
let gameTimer;
let clickButton;

// board and tallies
let boardDimensions = 3;
let tally = 0;

// random globals for panel choice and colors
let r1 = 0;
let r2 = 0;
let table = [];
let possibilities = [0, 1, 2];
let colorChoices = ["#3434eb", "#ed37d2", "#f0b71d", "#b479e8"]
let colorPicker = 0;

// offsets
let titleOffset = 50;

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create timers
  panelTimer = new Timer(500);
  gameTimer = new Timer(15000);
  // start timer
  panelTimer.start();

  // make buttons
  clickButton = new Clickable();
  initButton();

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

    // draws title
    drawTitle();

    // draws the replay button
    clickButton.draw();

    // update new random panel
    checkRunTime();

    //draw board
    drawBoard();

    //draw tally
    drawTally();
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
            fill(255)
            ellipse((width / 2) + ((j - .75) * 200), (height / 2) +  ((i - 1) * 80), 50, 35);
        }
    }
}

// drawTally() -- draws lines to show the tally of the amount of times "replay" was clicked
function drawTally() {
    // this is the tally
    text("tally:", titleOffset, height - 125)

    // fix stroke settings
    strokeWeight(4);
    stroke(255);

    // loop through to make tallies
    for (let i = 0; i < tally; i++) {
        line( (i * 20) + 100, height - 150, (i * 20) + 100, height - 100);
    }

    // fix stroke back
    noStroke();
}

// drawTitle() -- draws the title of piece at the top
function drawTitle() {
    fill("red");
    textSize(30);
    text("[Color Panel] : Does nothing but change color THATS IT!!", width / 2 + titleOffset, titleOffset);
}

// randomizePanel() -- randomly chooses a panel in the table to color
function randomizePanel() {
    // get random panel to color
    r1 = round(random(boardDimensions - 1));
    r2 = round(random(boardDimensions - 1));
    // set in table to true
    table[r1][r2] = 1;
    console.log("r1: " + r1 + " r2: " + r2);
}

// setRandomColor() -- sets a random color of what is available
function setRandomColor() {
    colorPicker = round(random(colorChoices.length - 1))
    console.log("Color picker chose: colorChoices[" + colorPicker + "] -> " + colorChoices[colorPicker]);
}

// updatePanel() -- Looks for elapsed time
function updatePanel() {
    if(panelTimer.expired()) {
        table[r1][r2] = 0;
        // set new "mole"
        randomizePanel();
        // set random color
        setRandomColor();
        // reset timer
        panelTimer.start();
    }
}

// checkRunTime() -- checks to make sure the loop timer is still running if so update new panel
function checkRunTime() {
    if (!gameTimer.expired()) {
        updatePanel();
    }
    else {
        // reset the last panel
        table[r1][r2] = 0;
    }
}

// button non hover settings
buttonOutside = function () {
    this.color = "#FFFFFF";
    this.textColor = "#000000";
    this.textSize = 20;
}

// button hover settings
buttonHover = function () {
    this.color = "#FF0000";
}

// for replay clickable button
replay = function () {
    // reset game timer
    gameTimer.start();
    // update tally
    tally = tally + 1;
}
