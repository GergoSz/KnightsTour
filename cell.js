function Cell(x, y, n, w){
  this.visited = false;
  this.isCurrentPos = false;
  this.available = false;
  this.x = x;
  this.y = y;
  this.n = n;
  this.w = w;
  this.xPos = x * w;
  this.yPos = y * w;
  this.DistanceScore = this.getDistanceScore();
  this.moveCount;
  this.score;
  this.moved = 0;
}

Cell.prototype.show = function(){
  this.setAvailableCount();
  stroke(0);
  noFill();
  rect(this.xPos, this.yPos, this.w, this.w);

  if (this.available) {
    fill(200,200,0);
    rect(this.xPos, this.yPos, this.w, this.w);
  }
  if(this.visited){
    fill(0,200,0);
    rect(this.xPos, this.yPos, this.w, this.w);
  }
  if (this.isCurrentPos) {
    ellipseMode(CORNER);
    fill(127);
    ellipse(this.xPos + this.w * 0.25,this.yPos + this.w * 0.25, this.w * 0.5);
  }
  fill(0);
  if(shownumbers){
  textAlign(CENTER);
  textSize(20);
  text(this.moveCount, this.xPos + this.w * 0.25, this.yPos + this.w * 0.25);
  text(this.DistanceScore, this.xPos + this.w * 0.75, this.yPos + this.w * 0.25);
  this.score = this.DistanceScore + (this.moveCount * 4);
  textSize(24);
  text(this.score, this.xPos + this.w * 0.5, this.yPos + this.w * 0.8);
  }



  //text(this.moved , this.xPos + this.w * 0.5, this.yPos + this.w * 0.8);

}

Cell.prototype.moves = function(){

  //var availableList = new Array();
  //var total = 0;
  for (var xoff = -2; xoff <= 2; xoff++) {
    for (var yoff = -2; yoff <= 2; yoff++) {
      var i = this.x + xoff;
      var j = this.y + yoff;
      if(i < 0 || i >= this.n || j < 0 || j >= this.n){

      }else{
        if(xoff != 0 && yoff != 0){
          if(xoff + yoff == 3 || xoff + yoff == -3 || xoff + yoff == 1 || xoff + yoff == -1){
            //total++;
            //availableList.append(grid[i][j]);
            grid[i][j].available = true;
          }
        }

      }

    }
  }

  //return availableList;
}

Cell.prototype.getDistanceScore = function(){
  var xscore;
  var yscore;
  var score;

  switch (this.x < floor(n/2)) {
    case true:
      xscore = this.x;
      break;
    case false:
      xscore = (n-1) - this.x;
      break;
    default:
    xscore = -n;
  }
  switch (this.y < floor(n/2)) {
    case true:
      yscore = this.y;
      break;
    case false:
      yscore = (n-1) - this.y;
      break;
    default:
      yscore = -n;
  }
  score = xscore + yscore;
  return score;
}



Cell.prototype.setAvailableCount = function(){
  var total = 0;

  for (var xoff = -2; xoff <= 2; xoff++) {
    for (var yoff = -2; yoff <= 2; yoff++) {
      var i = this.x + xoff;
      var j = this.y + yoff;
      if(i < 0 || i >= this.n || j < 0 || j >= this.n || grid[i][j].visited){

      }else{
        if(xoff != 0 && yoff != 0 && grid[i][j].visited == false){
          if(xoff + yoff == 3 || xoff + yoff == -3 || xoff + yoff == 1 || xoff + yoff == -1){
            total++;
          }
        }

      }

    }
  }

  this.moveCount = total;
  this.score = this.DistanceScore + (this.moveCount * 4);
}

Cell.prototype.getAvailableCount = function(){
  var total = 0;

  for (var xoff = -2; xoff <= 2; xoff++) {
    for (var yoff = -2; yoff <= 2; yoff++) {
      var i = this.x + xoff;
      var j = this.y + yoff;
      if(i < 0 || i >= this.n || j < 0 || j >= this.n || grid[i][j].visited){

      }else{
        if(xoff != 0 && yoff != 0){
          if(xoff + yoff == 3 || xoff + yoff == -3 || xoff + yoff == 1 || xoff + yoff == -1){
            total++;
          }
        }

      }

    }
  }

  return total;
}

Cell.prototype.contains = function(x,y) {
  return(x > this.xPos && x < this.xPos + this.w && y > this.yPos && y < this.yPos + this.w);
}
