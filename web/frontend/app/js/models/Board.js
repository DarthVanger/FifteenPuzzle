/**
 *  Board Model
 *  Represents the fifteen puzzle board with cells and pieces.
 *  Can move pieces and stores piece arrangement map.
 */
function Board(config) {
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
   *  Moves piece to empty cell (should be called only for cells around the empty cell).
   *  @param fromCell Cell object to move piece from
   *  @throws BoardException
   */
  this.movePieceToEmptyCell = function(fromCell) {
    if (!self.hasEmptyCellAround(fromCell)) throw new BoardException('no empty cell around the piece to move');

    var toCell = emptyCell.clone();

    console.log('debug', '============= Board: Moving piece =============');

    console.log(
      'debug',
      'Board.movePiece(): moving piece from (' + fromCell.x + ',' + fromCell.y + ')'
      + ' to (' + emptyCell.x + ',' + emptyCell.y + ')'
    );

    // get the piece to move
    var piece = fromCell.getPiece();
    // remove the piece from 'fromCell'
    fromCell.removePiece();
    // put piece into empty cell
    emptyCell.putPiece(piece);
    // now fromCell is the empty cell
    emptyCell = fromCell;

    // move the piece in the view also
    boardView.movePiece(fromCell, toCell);

    //dumpPieceArrangementToLog();
    console.log('debug', 'piece arrangemaent map: ' + self.getPieceArrangementMap());
  }

  /**
   *  Returns true if puzzle piece arrangement corresponds to the solved one.
   */
  this.puzzleSolved = function() {
    // return false if empty cell is not in the right bottom corner
    if (
      emptyCell.x !== cells.length - 1 
      || emptyCell.y !== cells.length - 1
    ) {
      // emptyCell is not in the right bottom corner
      console.log(
        'debug',
        'board.puzzleSolved(): emptyCell is at (' + emptyCell.x + ',' + emptyCell.y + ')'
        + '(should be at (' + (cells.length - 1) + ',' + (cells. length - 1) + '))'
        + ', so the puzzle is not solved yet.' 
      );
      return false;
    }

    // now check if the number are in the correct order
    var puzzleSolved = true;
    loop:
      for (var i=0; i<cells.length; i++) {
        for (var j=0; j<cells.length; j++) {
          if (!(
               i === (cells.length - 1)
            && j === (cells.length - 1)
          )) {
            // if not in the right bottom corner
            console.log(
              'debug',
              'board.puzzleSolved(): '
              + 'checking cell (' + i + ',' + j + ')'
            );
            var pieceNumber = cells[i][j].getPiece().getNumber();
            var expectedPieceNumber = i * cells.length + (j+1);
            if (pieceNumber !== expectedPieceNumber) {
              console.log(
                'debug',
                'board.puzzleSolved(): cell (' + i + ',' + j + ') = ' + pieceNumber
                + '  (should be ' + expectedPieceNumber + '). So the puzzle is not solved yet'
              );
              puzzleSolved = false;
              break loop;
            }
          }
        }
      }
    return puzzleSolved;
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

  /**
   *  Return boardWidth property.
   */
  this.getBoardWidth = function() {
    return boardWidth;
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
   *  Checks piece arrangement map to be valid:
   *  it should be array,
   *  it should have same dimensions as the board has,
   *  it should contain integers from 0 to (boardWidth^2 - 1)
   *  @throws BoardException
   */
  function validatePieceArrangementMap(pieceArrangementMap) {
    var map = pieceArrangementMap;

    // check if map is array
    if (!(map instanceof Array)) {
      throw new BoardException(
        'validatePieceArrangementMap(): '
        + 'the map is not an instance of Array'
      );
    }

    // check if map[0] is array
    if (!(map[0] instanceof Array)) {
      throw new BoardException(
        'validatePieceArrangementMap(): '
        + 'map is an array, but map[0] is not an instance of Array'
      );
    }

    // check if map length meets board width
    if (map.length !== boardWidth || map[0].length !== boardWidth ) {
      throw new BoardException(
        'validatePieceArrangementMap(): '
        + 'Board.constructor(): piece arrangement map dimensions (' + map.length + ',' + map[0].length + ')'
        + ' don\'t meet the board size (board width = ' + boardWidth + ')'
      );
    }

    // push all numbers to one array to check them
    var allPieceNumbers = new Array();
    for (var i=0; i<map.length; i++) {
      for (var j=0; j<map[i].length; j++) {
        allPieceNumbers.push(map[i][j]); 
      }
    }

    console.log(
      'debug',
      'Board.validatePieceArrangementMap(): piece map\'s all numbers: '
      + allPieceNumbers
    );

    // sort the numbers in ascending order to easily check if we they are good 
    allPieceNumbers.sort(function(a, b){return a-b});
    console.log(
      'debug',
      'Board.validatePieceArrangementMap(): piece map\'s all numbers sorted: '
      + allPieceNumbers
    );

    // the numbers should look like 0, 1, 2, 3... now, check this
    for (var i=0; i<allPieceNumbers.length; i++) {
      if (allPieceNumbers[i] !== i) {
        throw new BoardException(
          'validatePieceArrangementMap(): '
          + 'the map numbers are invalid: ' + allPieceNumbers[i] + ' should have been equal to ' + i
        );
      }
    }

    console.log(
      'debug',
      'Board.validatePieceArrangementMap(): Validation OK'
    );
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

  /********** End Private methods ***********/

  /**
   *  Constructor
   *  @param config Object with following properties:
   *    config.pieceArrangementMap - map of piece arrangement.
   *      Format: 2d array with numbers of pieces, 0 represents emtpy cell.
   *    config.boardWidth - width of board in cells, default is 4.
   */
  console.log('debug', 'Board.constructor() invoked');

  // read config
  if (config) {
      if(config.boardWidth) {
        boardWidth = config.boardWidth;
      }

      if(config.pieceArrangementMap) {
        validatePieceArrangementMap(config.pieceArrangementMap);
        pieceArrangementMap = config.pieceArrangementMap;
      } else {
        pieceArrangementMap = generateRandomPieceArrangementMap();
      }
  } else {
    pieceArrangementMap = generateRandomPieceArrangementMap();
  }
  
  // create cells and put the pieces in them
  cells = createCells();
  putPieces(pieceArrangementMap);

  // create the view
  boardView = new HtmlBoard({
    'pieceArrangementMap': pieceArrangementMap,
    'boardWidth': boardWidth 
  });

  //dumpPieceArrangementToLog();

  /*** End Constructor ***/

}
