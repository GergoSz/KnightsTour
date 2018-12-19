  var grid;
  var n = 8;
  var cellWidth;
  var currentPos;
  var moveCount = 0;
  var listOfMoves = [];
  var startPointX, startPointY;
  var solved = false;
  var shownumbers = false;
  var slowsolvemode = false;
  var slowsolvespeed = 10;
  //Knight image
  var img;

  //DOM Elements
  var startPointXdom;
  var startPointYdom;
  var Num;
  var shownumbersel;

  function setup(){
    shownumbersel = document.getElementById("shownumbers");
    startPointXdom = document.getElementById("startPointX");
    startPointYdom = document.getElementById("startPointY");
    Num = document.getElementById("N");
    n = parseInt(Num.value);
    var width = 700;
    var cnvs = createCanvas(width + 1, width + 1);
    cellWidth = floor(width / n);
    cnvs.position(20,25);
    grid = makeGrid();

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        grid[i][j] = new Cell(i, j, n, cellWidth);
      }
    }

    setCurrentPos(5,5);

    img = loadImage("kn.png");/*knight.jpeg, kn.png*/
    listOfMoves[0] = new Move(currentPos.x, currentPos.y);

    setSpeed(5);
    startPointXdom.max=n;
    startPointYdom.max=n;
  }

  function draw(){   
    background("#333");
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        grid[i][j].show();
      }
    }
    if(shownumbersel.checked){
      shownumbers = true;
    }else{
      shownumbers = false;
    }
    if(n != document.getElementById("N").value && document.getElementById("N").value > 5){
      n = document.getElementById("N").value;
      startPointXdom.max=n;
      //startPointXdom.value = 1;
      startPointYdom.max=n;
      //startPointYdom.value = 1;
      setup();
    }
    if(slowsolvemode){
      if(frameCount % slowsolvespeed === 0 && !solved){
        takeAStep();
        if (moveCount == n*n-1) {
          solved = true;
          slowsolvemode = false;
        }
      }
    }
    
    image(img, currentPos.xPos + currentPos.w * 0.25/2 ,currentPos.yPos + currentPos.w * 0.25/2, currentPos.w * 0.75 , currentPos.w  * 0.75 ); 
  }

  function setCurrentPos(x,y) {
    currentPos = grid[x][y];
    currentPos.isCurrentPos = true;
    currentPos.visited = true;
    currentPos.moves();
  }

  function moveKnight(x, y){
    if(moveCount == n*n-1){
    //console.log("Done");
    return;
  }else if(x >= 0 && x < n && y >= 0 && y < n){
    if(grid[x][y].available && !grid[x][y].visited){
      moveCount++;
      listOfMoves[moveCount] = new Move(x, y);
      grid[x][y].moved = moveCount;
      setAvailableFalse();
      currentPos.isCurrentPos = false;
      setCurrentPos(x, y);
    }
  }
}

function reverseMove(){
  if(moveCount >= 0){
    var oldX = listOfMoves[moveCount-1].x;
    var oldY = listOfMoves[moveCount-1].y;

    if (grid[oldX][oldY].visited) {
      setAvailableFalse();
      currentPos.visited = false;
      currentPos.isCurrentPos = false;
      setCurrentPos(oldX, oldY);
      moveCount--;
    }
  }
}

function hardReset(){
  console.log("HardReset?");
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j] = new Cell(i, j, n, cellWidth);
    }
  }
  for (var i = 0; i < listOfMoves.length; i++) {
    listOfMoves[i] = null;
  }
  moveCount = 0;
  setCurrentPos(document.getElementById("startPointX").value-1,document.getElementById("startPointY").value-1);
  listOfMoves[0] = new Move(currentPos.x, currentPos.y);
  solved = false;
}

function setAvailableFalse(){
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j].available = false;
    }
  }
}

function getAvailable(){
  var listOfAvailable = [];
  var availableCount = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if(grid[i][j].available == true && grid[i][j].visited == false){
        if(availableCount < 8){
          listOfAvailable[availableCount] = grid[i][j];
          availableCount++;
        }
      }
    }
  }
  return listOfAvailable;
}

function makeGrid(){
  var arr = new Array(n);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(n);
  }
  return arr;
}

function solve(){
  while (!solved) {
    takeAStep();
    if (moveCount == n*n-1) {
      solved = true;
    }
  }
}

function slowSolve(){
  slowsolvemode = true;
}

function takeAStep(){
  var availables = [];
  availables = getAvailable();
  var best = availables[0];
  var newBest;
  var currentMoveCount = currentPos.moveCount;

  for (var i = 0; i < currentMoveCount; i++) {
    newBest = availables[i];
    best.setAvailableCount();
    newBest.setAvailableCount();
    var bestScore = best.score;
    var newBestScore = newBest.score;
    if (newBestScore < bestScore) {
      best = newBest;
    }

  }

  moveKnight(best.x,best.y);
  currentMoveCount = currentPos.moveCount;
  instep = false;
}


function mousePressed(){
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if(grid[i][j].contains(mouseX, mouseY)){
        moveKnight(i,j);
      }
    }
  }
}



function keyPressed(){
  if(key == ' ')
    reverseMove();
}

function setSpeed(sped) {
  document.getElementById('spedtext').innerHTML = "Set step speed: " + sped.toString();
  slowsolvespeed = (1/sped)*10;
}
/*
function checkedNums(){
  shownumbers = !shownumbers;
  if(shownumbersel.checked)

}
*/
/*function keyPressed(){
  if(key == 's')
      solve2();
  }*/


/*if(frameCount % lifeSpan === 0){
  nextGen();
}*/

function Reset(x, y){
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j] = new Cell(i, j, n, cellWidth);
    }
  }
  moveCount = 0;
  setCurrentPos(x, y);
  solved = false;
}