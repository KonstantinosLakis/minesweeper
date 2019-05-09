
function Cell(i, j){
  this.i = i;
  this.j = j;
  this.neighbors = 0;
  this.isBomb = false;
  this.isOpen = false;
  this.x = width / (squares * 2) + this.i * width / squares;
  this.y = height / (squares * 2) + this.j * height / squares;
  this.show = function(){
    if(this.isBomb){
      fill(0);
    } else {
      fill(135, 206, 250);
    }
    rect(this.x, this.y, len, len);
    fill(255, 0, 0);
    if(!this.isBomb){
      text(this.neighbors, this.x - len / 8, this.y + len / 8);
    } else {
      image(bombImg, this.x, this.y, len + 2, len + 2);
    }
    if(!this.isOpen){
      fill(0, 0, 255);
      image(tileImg, this.x, this.y, len + 2, len + 2)
    }
  }
}
