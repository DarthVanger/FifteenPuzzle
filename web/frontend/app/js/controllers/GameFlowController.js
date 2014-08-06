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

  /*** Private Methods ***/

  var listenForBoardClick = function() {
    $(document).on('BoardClick', function(event, cellX, cellY) {
      var cell = board.getCell(cellX, cellY);
      if (board.hasEmptyCellAround(cell)) {
        board.movePieceToEmptyCell(cell); 
        if (board.puzzleSolved()) {
          alert("solved, bitch!:)");
        }
      } else {
        // no empty cell around the clicked cell
        console.log('debug', 'GameFlowController.boardClickListener: no empty cell around clicked cell');
      }
    });
  }

  /*** End Private methods ***/
}
