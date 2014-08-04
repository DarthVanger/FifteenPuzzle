/**
 *  Board Model
 *  Represents the fifteen puzzle board with cells and pieces.
 *  Can move pieces and stores piece arrangement map.
 */
function Board(pieceArrangementMap) {
  var self = this;
  var selff = this;

  /**
   *  Width of the board in cells.
   *  Default: 4;
   */
  var boardWidth = 4;

  /**
   *  Board View.
   *  An object that has methods for displaying and moving pieces on the screen. 
   */
  var boardView;

  /**
   *  Piece Arrangement Map.
   *  Format: 2d array with numbers of pieces, 0 represents emtpy cell.
   */
  //var pieceArrangementMap;

  /**
   *  Cells - 2d array of Cell class instances.
   */
  var cells = new Array();

  /**
   *  The empty cell
   */
  var emptyCell;


  /**
   *  Returns cells array
   */
  this.getCells = function() {
    return cells;
  }

  /**
   *  Returns cell with coordinates x, y
   */
  this.getCell = function(x, y) {
    return cells[x][y];
  }

  /**
   *  Returns the empty cell
   */
  this.getEmptyCell = function() {
    return emptyCell;
  }

  /**
   *  Dumps piece arrangement to log 
   */
  function dumpPieceArrangementToLog() {
    var pieceMap = self.getPieceArrangementMap();
    for (var i=0; i<pieceMap.length; i++) {
      for (var j=0; j<pieceMap[i].length; j++) {
        console.log('debug', 'dumping piece map: pieceMap['+i+']['+j+'] = ' + pieceMap[i][j]);
      }
    }
  }

  /**
   *  Generates and returns pieceArrangementMap.
   *  Format: 2d array: [x][y] = pieceNumber
   */
  this.getPieceArrangementMap = function() {
    var pieceMap = new Array(cells.length);
    for (var i=0; i<cells.length; i++) {
      pieceMap[i] = new Array(cells.length);
      for (var j=0; j<cells.length; j++) {
        var piece = cells[i][j].getPiece();
        if (piece) {
          pieceMap[i][j] = piece.getNumber();
        } else {
          // write 0 for empty cell
          pieceMap[i][j] = 0;
        }
        //console.log('debug', 'Board.getPieceArrangementMap(): map['+i+']['+j+'] = ' + pieceMap[i][j]);
      }
    }
    return pieceMap;
  }

  /**
   *  Moves piece from one cell to another.
   *  @param fromCell Cell object to move piece from
   *  @param toCell Cell obejct to move piece to
   *  @throws 'moving piece to non-empty cell'
   */
  this.movePieceToEmptyCell = function(fromCell) {
    //if (!toCell.isEmpty()) throw new BoardException('moving piece to non-empty cell');
    if (!self.hasEmptyCellAround(fromCell)) throw new BoardException('no empty cell around the piece to move');
    console.log('debug', 'Board.movePiece(): moving piece');

    var toCell = emptyCell.clone();

    // get the piece to move
    var piece = fromCell.getPiece();
    // remove the piece from 'fromCell'
    fromCell.removePiece();
    // put piece into empty cell
    emptyCell.putPiece(piece);
    // now fromCell is the empty cell
    emptyCell = fromCell;

    boardView.movePiece(fromCell, toCell);

    dumpPieceArrangementToLog();
  }


  /*** Private methods ***/

  /**
   *  Create cells
   */
  function createCells() {
    for (var i=0; i<boardWidth; i++) {
      cells[i] = new Array();
      for (var j=0; j<boardWidth; j++) {
        cells[i][j] = new Cell(i,j);  
      }
    }

    return cells;
  }

  /**
   *  Put pieces in cells
   */
  function putPieces(pieceArrangementMap) {
    console.log('debug', 'Board.putPieces(): piece arrangement map = ' + pieceArrangementMap);
    for(var i=0; i<boardWidth; i++) {
      for(var j=0; j<boardWidth; j++) {
        var pieceNumber = pieceArrangementMap[i][j];
        if (pieceNumber === 0) {
          // empty cell
          emptyCell = cells[i][j];
        } else {
          // not empty cell
          piece = new Piece(pieceNumber);
          cells[i][j].putPiece(piece); 
        }
      }
    }
  }

  /**
   *  generate random piece arrangement map
   *  @return 2d array representing piece arrangement map
   */
  function generateRandomPieceArrangementMap() {
    map = new Array(boardWidth);

    // fill map with ordered integers
    var count = 0;
    for (var i=0; i<boardWidth; i++) {
      map[i] = new Array();
      for (var j=0; j<boardWidth; j++) {
        map[i][j] = count++;
      }
    }
    map = shuffle(shuffle(map));
    return map;

      /**
       *  Fisher-Yates array shuffle algorigthm.
       *  @param array array to shuffle.
       *  @return suffled array.
       */
      function shuffle(array) {
        var currentIndex = array.length
          , temporaryValue
          , randomIndex
          ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  }

  /**
   *  Returns true if cell has the empty cell around, else false.
   *  @param cell Cell object which is questioned to have empty cell around.
   */
  this.hasEmptyCellAround = function(cell) {
    if (cell === emptyCell) {
      // looking for empty cell around itself
      return false;
    }

    xDistance = Math.abs(cell.x - emptyCell.x);
    yDistance = Math.abs(cell.y - emptyCell.y);
    if (xDistance + yDistance === 1) {
      console.log('debug', 'Board.hasEmptyCellAround answer: HAS empty cell around');
      return true;
    } else {
      console.log('debug', 'Board.hasEmptyCellAround answer: has NO empty cell around');
      return false;
    }
  }

  /**
   *  Returns object containig neighbor cells:
   *  neighborCells.right = right Cell object
   *  neighborCells.left = left Cell object
   *  neighborCells.top = top Cell object
   *  neighborCells.bottom = bottom Cell object
   */
  this.findNeighborCells = function(cell) {
    var neighborCells = {};
    
    if (emptyCell.x < cells.length - 1) {
      // has right neighbor
      neighborCells.right = self.getCell(emptyCell.x + 1, emptyCell.y);
    } else {
      console.log('debug', 'board.findNeihborCells(): empty cell is at the right edge of the board');
    }
    if (emptyCell.x > 0 ) {
      // has left neighbor
      neighborCells.left = self.getCell(emptyCell.x - 1, emptyCell.y);
    } else {
      console.log('debug', 'board.findNeihborCells(): empty cell is at the left edge of the board');
    }
    if (emptyCell.y < cells.length - 1) {
      // has bottom neighbor
      neighborCells.bottom = self.getCell(emptyCell.x, emptyCell.y + 1);
    } else {
      console.log('debug', 'board.findNeihborCells(): empty cell is at the bottom edge of the board');
    }
    if (emptyCell.y > 0) {
      // has top neighbor
      neighborCells.top = self.getCell(emptyCell.x, emptyCell.y - 1);
    } else {
      console.log('debug', 'board.findNeihborCells(): empty cell is at the top edge of the board');
    }

    return neighborCells;
  }

  /********** End Private methods ***********/

  /**
   *  Constructor
   *  @param pieceArrangementMap map of piece arrangement.
   *    Format: 2d array with numbers of pieces, 0 represents emtpy cell.
   */
  console.log('debug', 'Board.constructor() invoked');
  

  cells = createCells();
  if(!pieceArrangementMap) {
    pieceArrangementMap = generateRandomPieceArrangementMap();
  }
  putPieces(pieceArrangementMap);
  boardView = new HtmlBoard('board', pieceArrangementMap);

  dumpPieceArrangementToLog();

  /*** End Constructor ***/

}
