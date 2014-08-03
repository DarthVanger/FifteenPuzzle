/**
 *  Board Model
 *  Represents the fifteen puzzle board with cells and pieces.
 *  Can move pieces and stores piece arrangement map.
 */
function Board(pieceArrangementMap_p) {
  var self = this;

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
  var pieceArrangementMap;

  /**
   *  Cells - 2d array of Cell class instances.
   */
  var cells = new Array();

  /**
   *  Constructor
   *  @param pieceArrangementMap map of piece arrangement.
   *    Format: 2d array with numbers of pieces, 0 represents emtpy cell.
   */
  console.log('debug', 'Board.constructor() invoked');
  
  //boardView = new HtmlBoard('board');

  if (pieceArrangementMap_p) {
    // if piece arrangement map parameter was passed in constructor
    pieceArrangementMap = pieceArrangementMap;
  } else {
    // no piece arrangement map was passed in constructor
    pieceArrangementMap = null;
  }
  cells = createCells();
  putPieces();

  /*** Private methods ***/
  
  /**
   *  Create cells
   */
  function createCells() {
    for (var i=0; i<boardWidth; i++) {
      cells[i] = new Array();
      for (var j=0; j<boardWidth; j++) {
        cells[i][j] = new Cell();  
      }
    }

    return cells;
  }

  /**
   *  Put pieces in cells
   */
  function putPieces() {
    if(!pieceArrangementMap) {
      pieceArrangementMap = generateRandomPieceArrangementMap();
    }
    console.log('debug', 'Board.putPieces(): piece arrangement map = ' + pieceArrangementMap);
    for(var i=0; i<boardWidth; i++) {
      for(var j=0; j<boardWidth; j++) {
        piece = new Piece(pieceArrangementMap[i][j]);
        cells[i][j] = piece; 
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
  }

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

  /*********************/
}
