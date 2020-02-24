var gridSize = 5;
var grid = [];
var path = []; 
var steps = []; 
var tileSize; 
var animating; 
var animationTime; 
var stepTime; 
var level;
var gameOver; 
var newLevel; 

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  level = 1;
  stepTime = 60;
  newLevel = false;
  gameOver = false;
  newPath();
  textAlign(CENTER);
  textSize(tileSize * 0.8);
}

function draw(){
	background(51);
	drawGrid();
	drawLevel();
	pollTasks();
}

function pollTasks(){
	if(animating){
		handleAnimation();
	}
	if(newLevel){
		nextLevel();
	}
	if(gameOver){
		endGame();
	}
}

function mousePressed(){
	if(animating){
		return;
	}
	var clickedTile = getTile(mouseX, mouseY);
	if (clickedTile == null)
	    return;
    steps.push(clickedTile); 
    grid[clickedTile.x][clickedTile.y].lit = true;
	if (!onPath(path, steps)) {
		gameOver = true;
	}
	if(steps.length == path.length){
		newLevel = true;
	}
}

function drawGrid(){
	strokeWeight(4);
    stroke(255);
    for (var x = 0; x < gridSize; x++) {
    	for (var y = 0; y < gridSize; y++) {
      		grid[x][y].draw();
    	}
  	}
}

function drawLevel(){
	noStroke();
	fill("#FF0000");
	text("Level " + level, width / 2, tileSize);
}

function handleAnimation(){
	animationTime++;
	var route = Math.floor(animationTime / stepTime);
	if(route >= path.length){
		animating = false; 
        resetGrid();
        return;
	}
	var tile = path[route];
    grid[tile.x][tile.y].lit = true;
}

function resetGrid(){
	grid = [];
  	tileSize = Math.min(width / gridSize, height / gridSize);
  	for (var x = 0; x < gridSize; x++) {
    	var col = [];
    	for (var y = 0; y < gridSize; y++) {
      		col.push(new Tile(x, y, false));
    	}
    grid.push(col);
  	}
}

function nextLevel(){
	level++;
	gridSize++;
    newPath();
	stepTime /= 1.25;
    resetGrid();
	newLevel = false;
}

function endGame(){
  noLoop();
  noStroke();
  fill("#FF0000");
  text("Game Over!", width / 2, height / 2);
  gameOver = false;
}