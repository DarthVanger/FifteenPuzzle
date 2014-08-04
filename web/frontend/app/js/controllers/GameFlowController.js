/**
 *  Game Flow Controller
 *  Controls game flow like initialize game, start new game, save game,
 *  display congradulations for solving puzzle.
 */
function GameFlowController() {
  var self = this;

  /**
   *  Board Model instance
   */
  var board;

  /**
   * Initialize the game
   */
  this.initGame = function() {
    console.log('debug', 'initializing game');
    board = new Board();
    listenForBoardClick();
  }

  var listenForBoardClick = function() {
    $(document).on('BoardClick', function(event, cellX, cellY) {
      var cell = new Cell(cellX, cellY);
      if (board.hasEmptyCellAround(cell)) {
        board.movePieceToEmptyCell(cell); 
      } else {
        console.log('debug', 'GameFlowController.boardClickListener: no empty cell around clicked cell');
      }
    });
  }
}
