function generatePath(gridSize) {
	var path = []; 
	path.push(new Tile(0, gridSize - 1, true)); 
    while (path[path.length - 1].y != 0) {
	    var pool = []; 
	    var previous = path[path.length - 1];
		var relativeTiles = getRelativeTiles(previous);
		for (var i = 0; i < relativeTiles.length; i++) {
			if (validateTile(relativeTiles[i], path, gridSize)) {
				pool.push(relativeTiles[i]);
			}
		}
    path.push(random(pool)); 
  	}
  return path;
}

function validateTile(tile, path, gridSize){
	if ((tile.x >= 0 && tile.x < gridSize) &&
	    (tile.y >= 0 && tile.y < gridSize)) {
			return !arrIncludes(path, tile);
	}
	return false;
}

function getRelativeTiles(tile) {
	var west = new Tile(tile.x - 1, tile.y, true);
	var east = new Tile(tile.x + 1, tile.y, true);
	var north = new Tile(tile.x, tile.y - 1, true);
	return [west, east, north];
}

function arrIncludes(pool, tile) {
  var t = JSON.stringify(tile);
  for (var i = 0; i < pool.length; i++)
    if (JSON.stringify(pool[i]) === t) 
      return true;
  return false;
}

function onPath(path, steps) {
  for (var i = 0; i < steps.length; i++)
    if (path[i].x != steps[i].x || path[i].y != steps[i].y)
      return false;
  return true;
}

function newPath() {
  resetGrid();
  animating = true; 
  animationTime = 0;
  path = generatePath(gridSize);
  steps = [];
}
