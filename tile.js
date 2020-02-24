function Tile(x, y, lit) {
    this.x = x;
    this.y = y;
    this.lit = lit;
}

Tile.prototype.draw = function() {
	 fill((this.lit) ? 200 : 51);
	 rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
};

Tile.prototype.clickedBy = function(x, y) {
    var leftX = this.x * tileSize;
    var rightX = leftX + tileSize;
    var topY = this.y * tileSize;
    var bottomY = topY + tileSize;
    return !(x < leftX || x > rightX || y < topY || y > bottomY);
};

function getTile(mouseX, mouseY){
   for(var x = 0; x < gridSize; x++){
        for(var y = 0; y < gridSize; y++){
            if(grid[x][y].clickedBy(mouseX, mouseY)){
                return grid[x][y];
            }
        }
   } 
   return null;
}
