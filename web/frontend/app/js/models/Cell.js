/**
 *  Cell Model
 *  Represents a cell on the board.
 */
 function Cell(x,y) {
  var self = this;
  

  /**
   *  Puzzle piece inside the cell (instance of Piece class).
   */
  var piece;

  /**
   *  X coordinate of the cell on the board.
   */
  this.x;

  /**
   *  Y coordinate of the cell on the board.
   */
  this.y;
  
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

  /**
   *  Returns piece that is in the cell
   */
  this.getPiece = function() {
    return piece;
  }

  /**
   *  Returns true if cell is empty, else false.
   */
  this.isEmpty = function() {
    if (piece) {
      return false;
    } else {
      return true;
    }
  }

  this.clone = function() {
    return jQuery.extend({}, self);
  }

  /**
   * Constructor
   */
  //console.log('debug', 'Cell.constructor() invoked');
  this.x = x;
  this.y = y;


  /** End Constructor **/

}
