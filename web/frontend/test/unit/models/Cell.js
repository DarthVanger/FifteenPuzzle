describe("Cell model", function() {

  it("should create a new cell", function() {
    var cell = new Cell();
    expect(cell).toBeDefined();
  });

  it("should be putting a piece", function() {
    var piece = new Piece(5);
    var cell = new Cell();
    cell.putPiece(piece);
    expect(cell.getPiece()).toBe(piece);
  });

  it("should be removing a piece", function() {
    var piece = new Piece(5);
    var cell = new Cell();
    cell.putPiece(piece);
    expect(cell.getPiece()).toBe(piece);
    cell.removePiece();
    expect(cell.getPiece()).toBeNull();
  });

  it("should say that cell is empty", function() {
    var cell = new Cell();
    expect(cell.isEmpty()).toBe(true);
  });

});
