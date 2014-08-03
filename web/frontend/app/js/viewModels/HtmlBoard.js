/**
 *  Html Board view model.
 *  Provides methods for creating and moving pieces on the screen.
 */
function HtmlBoard(boardDivId) {
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


  /**
   *  Constructor
   */
  console.log('debug', 'HtmlBoard.constructor() invoked');
  boardDiv = document.getElementById(boardDivId);
  console.log('debig', 'HtmlBoard.contructor(): boardDiv = ' + boardDiv);

  // create cells
  for(var i=0; i<boardWidth; i++) {
    cells[i] = new Array(boardWidth);
    var row = createRow();
    for(var j=0; j<boardWidth; j++) {
      var cell = createCell(i,j);
      cells[i][j] = cell;
      row.appendChild(cell);
    }
    boardDiv.appendChild(row);
  }

  /*** Private methods ***/

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
    cell.style.width = 100/boardWidth + '%';
    cell.style.height = '100%';

    return cell;
  }

  /**********************/

}
