/**
 *  Html Board view model.
 *  Provides methods for creating and moving pieces on the screen.
 */
function HtmlBoard(config) {
  var self = this;

  /**
   *  Width of the board in number of cells.
   *  Default: 4.
   */
  var boardWidth = 4;

  /**
   *  Array of HtmlDivElements representing cells.
   */
  var cells = new Array(boardWidth); 

  /**
   *  HtmlDivElement representing the board. 
   */
  var boardDiv;

  this.movePiece = function(fromCell, toCell) {
    console.log(
      'debug',
      'HtmlBoard.movePiece(): moving piece from (' + fromCell.x + ',' + fromCell.y + ')'
      + ' to (' + toCell.x + ',' + toCell.y + ')'
    );
    fromCellDiv = cells[fromCell.x][fromCell.y];
    toCellDiv = cells[toCell.x][toCell.y];

    //console.log('debug', 'HtmlBoard.movePiece(): fromCellDiv = ' + fromCellDiv);
    var piece = fromCellDiv.removeChild(fromCellDiv.firstChild);
    var emptyPiece = toCellDiv.removeChild(toCellDiv.firstChild);

    fromCellDiv.appendChild(emptyPiece);
    fromCellDiv.className = 'board-cell-empty';

    toCellDiv.appendChild(piece);
    toCellDiv.className = 'board-cell';
  }

  /*** Private methods ***/

  /**
   *  Create cells and append them to boardDiv
   */
  function createCells(pieceArrangementMap) {
    for (var i=0; i<boardWidth; i++) {
      cells[i] = new Array(boardWidth);
      var row = createRow();
      for (var j=0; j<boardWidth; j++) {
        var cell = createCell(i,j);
        if (pieceArrangementMap[i][j] == 0) {
          // if empty cell
          cell.className = 'board-cell-empty';
        }
        cells[i][j] = cell;
        row.appendChild(cell);
      }
      boardDiv.appendChild(row);
    }
  }

  function createRow() {
    var row = document.createElement('div');
    row.style.height = 100/boardWidth + '%';

    return row;
  }

  /**
   *  Create HTMLDivElement representing cell
   */
  function createCell() {
    var cell = document.createElement('div');
    cell.className = 'board-cell';
    cell.style.width = 90/boardWidth + '%';
    cell.style.marginLeft = 2/boardWidth + '%';
    cell.style.marginRight = 2/boardWidth + '%';
    cell.style.height = '95%';

    return cell;
  }

  /**
   *  Add click listeners to cells
   */
  function addClickListeners() {
    for (var k=0; k<cells.length; k++) {
      (function() {
        var i=k;
        for (var m=0; m<cells[i].length; m++) {
          (function() {
            var j = m;
            $(cells[i][j]).on('click', function() {
              console.log('debug', 'HtmlBoard.clickListener: cell (' + i + ',' + j + ') clicked, triggering "BoardClick" event');
              $(document).trigger('BoardClick', [i, j]); 
            });
          }())
        }
      }())
    }
  }

  /**
   *  Put pieces in cells
   */
  function putPieces(pieceArrangementMap) {
    for (var i=0; i<cells.length; i++) {
      for (var j=0; j<cells.length; j++) {
        var pieceNumber = pieceArrangementMap[i][j];
        var piece = createPiece(pieceNumber);  
        cells[i][j].appendChild(piece);
      }
    }
  }
  
  /**
   *  Create puzzle piece
   */
  function createPiece(pieceNumber) {
    var pieceDiv = document.createElement('div');
    pieceDiv.className = 'puzzle-piece';
    if (pieceNumber == 0) {
      pieceDiv.innerHTML = '&nbsp;';
    } else {
      pieceDiv.innerHTML = pieceNumber;
    }
    return pieceDiv;
  }

  /*** End Private methods ***/

  /**
   *  Constructor
   */
  console.log('debug', 'HtmlBoard.constructor() invoked');

  if (config.boardWidth) {
    boardWidth = config.boardWidth;
  }

  boardDiv = document.getElementById('board');
  console.log('debug', 'HtmlBoard.contructor(): boardDiv = ' + boardDiv);
  createCells(config.pieceArrangementMap);
  addClickListeners();
  putPieces(config.pieceArrangementMap);

  // html board is ready
  // hide the loading-game block and show the game block
  var gameContainerDiv = document.getElementById('game-container');
  var loadingGameDiv = document.getElementById('loading-game');
  $(loadingGameDiv).hide();
  $(gameContainerDiv).show();

  /** End Constructor **/

}
