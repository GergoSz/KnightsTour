  var grid;
  var n = 10;
  var cellWidth;
  var currentPos;
  var moveCount = 0;
  var listOfMoves = new Array(n*n);
  var junctionCount = 0;
//  var xMove = new Array(2, 1, -1, -2, -2, -1, 1, 2);      /* {2, 1, -1, -2, -2, -1, 1, 2};*/
//  var yMove = new Array(1, 2, 2, 1, -1, -2, -2, -1);     /*{1, 2, 2, 1, -1, -2, -2, -1};*/


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
      currentPos = grid[x][y];
      currentPos.isCurrentPos = true;
      currentPos.visited = true;
      currentPos.moves();
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
      currentPos = grid[oldX][oldY];
      currentPos.isCurrentPos = true;
      currentPos.visited = true;
      currentPos.moves();
      moveCount--;
    }
  }
}

function hardReset(){
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j] = new Cell(i, j, n, cellWidth);
    }
  }
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

/*function solve(){
  for (var i = 0; i < listOfMoves.length; i++) {
    for (var r = 0; r < 7; r++) {
      if(currentPos.x + xMove[r] >= 0 && currentPos.x + xMove[r] <n && currentPos.y + yMove[r] >= 0 && currentPos.y + yMove[r] <n ){
        moveKnight(currentPos.x + xMove[r], currentPos.y + yMove[r]);
      }
    }
  }

  if(moveCount == n*n-1){
    console.log("solve");
    return true;
  }
}*/

function solve2(){

  var solved = false;
  var tryCount = 0;

  while (!solved) {

    step();

    if (moveCount == n*n-1) {
      solved = true;
    }
    tryCount++;
  }
  //console.log(junctionCount);

}

function step(){
  var availables = [];
  availables = getAvailable();
  var best = availables[0];
  var newBest = best;
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
  var currentMoveCount = currentPos.moveCount;
}

function setup(){
  var width = 700;
  var cnvs = createCanvas(width + 1, width + 1);
  cellWidth = floor(width / n);
  cnvs.position(255,25);
  grid = makeGrid();

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j] = new Cell(i, j, n, cellWidth);
    }
  }

  //currentPos = grid[floor(random(n))][floor(random(n))];



  currentPos = grid[5][5];
  currentPos.isCurrentPos = true;
  currentPos.visited = true;
  //setAvailable();
  currentPos.moves();

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

function mousePressed(){
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if(grid[i][j].contains(mouseX, mouseY)){
        moveKnight(i,j);
      }
    }
  }
}

function draw(){
  background(255);
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j].show();
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
