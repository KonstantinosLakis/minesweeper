  var squares = 12;
  var opened = 0;
  var len;
  var bombs = 30;
  var toBeOpened = squares * squares - bombs;
  var cells = [];
  var hasLost = false;
  var hasWon = false;


  var tileImg;
  var bombImg;



  function preload(){
    tileImg = loadImage('images/tile.PNG');
    bombImg = loadImage('images/bomb.PNG');
  }




  function setup(){
    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);
    createCanvas(640, 640);
    textSize(width / squares / 2);
    fillGrid();
    countNeighbors();
  }

  function draw() {
    background(135, 206, 250);
    drawGrid();
    for (var i = 0; i < cells.length; i ++){
      for (var j = 0; j < cells[i].length; j ++){
        cells[i][j].show();
      }
    }
  }



  function fillGrid(){
    len = width / squares;
    for (var i = 0; i < squares; i ++){
      cells[i] = [];
      for (var j = 0; j < squares; j ++){
        cells[i][j] = new Cell(i, j);
      }
    }

    var bombed = 0;

    while(bombed < bombs){
      var i = Math.round(random(squares - 1));
      var j = Math.round(random(squares - 1));
      var c = cells[i][j];
      if(!c.isBomb){
        c.isBomb = true;
        bombed ++;
      }
    }
  }


  function countNeighbors(){
    for (var i = 0; i < squares; i ++){
      for (var j = 0; j < squares; j ++){
         var c = cells[i][j];
         consider(i - 1, j - 1, c);
         consider(i - 1, j, c);
         consider(i - 1, j + 1, c);
         consider(i, j - 1, c);
         consider(i, j + 1, c);
         consider(i + 1, j - 1, c);
         consider(i + 1, j, c);
         consider(i + 1, j + 1, c);
      }
    }
  }


  function consider(x, y, c){
     if (isInGrid(x) && isInGrid(y) && cells[x][y].isBomb){
        c.neighbors ++;
     };
  }


  function isInGrid(n){
    return(n >= 0 && n < squares);
  }


  function mousePressed(){
    if (!hasLost && !hasWon){
     var i = Math.floor(mouseX / len);
     var j = Math.floor(mouseY / len);
     openUp(i, j);
   }
  }


  function openUp(i, j){
     if (isInGrid(i) && isInGrid(j) && !cells[i][j].isOpen){
       var c = cells[i][j];
       if(c.isBomb){
         for(var i = 0; i < cells.length; i++){
           for (var j = 0; j < cells[i].length; j ++){
             if (cells[i][j].isBomb){
               cells[i][j].isOpen = true;
             }
           }
         }
         hasLost = true;
         console.log('GameOver');
       } else {
         opened ++;
       }

       if (opened == toBeOpened){
         hasWon = true;
         console.log('Win!');
       }


       c.isOpen = true;
       if (c.neighbors == 0 && !c.isBomb){
         openUp(i - 1, j - 1);
         openUp(i - 1, j);
         openUp(i - 1, j + 1);
         openUp(i, j - 1);
         openUp(i, j + 1);
         openUp(i + 1, j - 1);
         openUp(i + 1, j);
         openUp(i + 1, j + 1);
       }
     }
  }



  function drawGrid(){
    strokeWeight(2);
    for (var i = 1; i < squares; i ++){
      line(0, i * len, width, i * len);
      line(i * len, 0, i * len, height);
    }
    strokeWeight(1);
  }
