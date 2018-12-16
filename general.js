  var grid;
  var n = 8;
  var cellWidth;
  var currentPos;
  var moveCount = 0;
  var listOfMoves = [];
  var startPointX, startPointY;
  var solved = false;
  var shownumbers = false;
//  var xMove = new Array(2, 1, -1, -2, -2, -1, 1, 2);      /* {2, 1, -1, -2, -2, -1, 1, 2};*/
//  var yMove = new Array(1, 2, 2, 1, -1, -2, -2, -1);     /*{1, 2, 2, 1, -1, -2, -2, -1};*/


function setup(){
  n = parseInt(document.getElementById("N").value);
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

  //currentPos = grid[floor(random(n))][floor(random(n))];



  setCurrentPos(5,5);

  listOfMoves[0] = new Move(currentPos.x, currentPos.y);

  //console.log(listOfMoves[0]);
  //solve();

/*  for (var i = 0; i < n*n; i++) {
    currentPos = grid[n/2-1][n/2-1];
    currentPos.isCurrentPos = true;
    currentPos.visited = true;
    //setAvailable();
    currentPos.moves();

    listOfMoves[0] = new Move(currentPos.x, currentPos.y);

    solve2();
  }*/

}


function draw(){
  background(255);
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j].show();
    }
  }
  if(document.getElementById("shownumbers").checked){
    shownumbers = true;
  }else{
    shownumbers = false;
  }
  if(n != document.getElementById("N").value && document.getElementById("N").value > 7){
    n = document.getElementById("N").value;
    setup();
  }

 /* if(frameCount % 1 === 0 && !solved ){
    if (moveCount == n*n-1) {
      solved = true;
      Reset(Math.round(random(0, n-1)), Math.round(random(0, n-1)));
    }
    takeAStep();
  }*/
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
  setCurrentPos(document.getElementById("startPointX").value,document.getElementById("startPointY").value);
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
  //console.log(junctionCount);
  solved = false;
}

function takeAStep(){
  var availables = [];
  availables = getAvailable();
  var best = availables[0];
  var newBest;
  var currentMoveCount = currentPos.moveCount;
//  console.log(currentMoveCount);

for (var i = 0; i < currentMoveCount; i++) {
//    console.log(newBest);
newBest = availables[i];
best.setAvailableCount();
newBest.setAvailableCount();
var bestScore = best.score;
var newBestScore = newBest.score;
    //console.log(bestScore);
    if (newBestScore < bestScore) {
      best = newBest;
    }/*else if(tmpbest == tmpnewbest){
      junctionCount++;
      console.log(best.x, best.y);
    }*/

  }

  moveKnight(best.x,best.y);
  currentMoveCount = currentPos.moveCount;
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