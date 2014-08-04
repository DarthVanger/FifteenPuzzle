/**
 *  Piece Model
 *  Represents a puzzle piece on the board.
 */
 function Piece(pieceNumber) {
  var self = this;
  
  /**
   *  piece number
   */ 
  var number;


  /**
   *  Returns cell number
   */
  this.getNumber = function() {
    return number;
  }

  /*** Private Methods ***/
  
  /*** End Private Methods ***/
  
  /**
   * Constructor
   */
  //console.log('debug', 'Piece.constructor() invoked');
  number = pieceNumber; 

  /** end constructor **/
}
