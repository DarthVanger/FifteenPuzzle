describe("Piece model", function() {

  it("should create a new piece", function() {
    var piece = new Piece();
    expect(piece).toBeDefined();
  });

  it("should have pieceNumber", function() {
    var piece = new Piece(5);
    expect(piece.getNumber()).toBe(5);
  });

});
