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
   *  SavesManager class instance
   */
  var savesManager;

  /**
   *  Width of board in cells.
   *  Default: 4.
   */
  var boardWidth = 4;

  /**
   * Initialize the game
   */
  this.initGame = function() {
    console.log('debug', 'initializing game');

    savesManager.getSavedPieceArrangementMapFromServer(function(pieceArrangementMap) {
        if (pieceArrangementMap) {
          // the user has a save
          console.log('debug', 'GameFlowController.initGame(): got saved piece arrangement map: ' + pieceArrangementMap);
          board = new Board({
            'pieceArrangementMap': pieceArrangementMap,
            'boardWidth': boardWidth
          });
          htmlGameControls.notifyUser('Loaded last saved game');
        } else {
          // user has no saves, create random board
          console.log('debug', 'GameFlowController.initGame(): no save found, create random puzzle');
          board = new Board({
            'boardWidth': boardWidth
          });
          htmlGameControls.notifyUser('Generated random board');
        }
        listenForBoardClick();
        listenForSaveButtonClick();
    });
  }

  /*** Private Methods ***/

  /**
   *  Set up listener for board click
   */
  function listenForBoardClick() {
    $(document).on('BoardClick', function(event, cellX, cellY) {
      var cell = board.getCell(cellX, cellY);
      if (board.hasEmptyCellAround(cell)) {
        board.movePieceToEmptyCell(cell); 
        if (board.puzzleSolved()) {
          puzzleSolvedCongradulations();
        }
      } else {
        // no empty cell around the clicked cell
        console.log('debug', 'GameFlowController.boardClickListener: no empty cell around clicked cell');
      }
    });
  }

  /**
   *  Set up listener for save button click
   */
  function listenForSaveButtonClick() {
    $(document).on('SaveButtonClick', saveCurrentPieceArrangement);
  }

  /**
   *  Save current piece arrangement to server
   */
  function saveCurrentPieceArrangement() {
    var pieceArrangementMap = board.getPieceArrangementMap();
    htmlGameControls.notifyUser('Saving game...');
    savesManager.savePieceArrangementMap(pieceArrangementMap, function(message) {
      htmlGameControls.notifyUser(message);
    });
  }

  /**
   *  Show puzzle solved congradulations
   */
  function puzzleSolvedCongradulation() {
    alert("Congradulations, puzzle solved!");
  }

  /*** End Private methods ***/

  /**
   *  Constructor
   */
  savesManager = new SavesManager({
    'boardWidth': boardWidth
  });
  htmlGameControls = new HtmlGameControls();

  /** End Constructor **/
}
