/**
 *  Cell Model
 *  Represents a cell on the board.
 */
 function Cell() {
  var self = this;
  
  /**
   *  X coordinate of the cell on the board.
   */
  var x;

  /**
   *  Y coordinate of the cell on the board.
   */
  var y;

  /**
   *  Puzzle piece inside the cell (instance of Piece class).
   */
  var piece;
 
  /**
   * Constructor
   */
  console.log('debug', 'Cell.constructor() invoked');
  
  /**
   *  Put piece in the cell.
   *  @param pieceToPut Piece object to put in the cell.
   */
  this.putPiece = function(pieceToPut) {
    piece = pieceToPut; 
  }

  /**
   *  Remove piece from the cell.
   */
  this.removePiece = function() {
    piece = null;
  }

}
