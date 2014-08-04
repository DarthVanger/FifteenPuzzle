describe("Board model", function() {

  // HtmlBoard can't be created withoud <div id = 'board'>
  boardDiv = document.createElement('div');
  boardDiv.id = 'board';
  document.body.appendChild(boardDiv);

  board = new Board();

  it("should create a new board", function() {
    expect(board).toBeDefined();
  });

  it("should have cells", function() {
    var cells = board.getCells();
    expect(cells.length).toBeGreaterThan(0);
  });

  it("should return pieceArrangementMap", function() {
    var map = board.getPieceArrangementMap();
    expect(map.length).toBeGreaterThan(0);
  });

  it("should return a cell", function() {
    var cell = board.getCell(0,0);
    expect(cell).toBeDefined();
  });

  it("should have cells with x,y coordinates in array on respective places", function() {
    var cells = board.getCells();
    for (var i=0; i<cells.length; i++) {
      for (var j=0; j<cells[i].length; j++) {
        expect(cells[i][j].x).toBe(i);
        expect(cells[i][j].y).toBe(j);
      }
    }
  });

  it("should find empty cell in empty cell's neighborhood", function() {
    var emptyCell = board.getEmptyCell();
    var neighborCells = board.findNeighborCells(emptyCell);
    
    console.log(
      'debug',
      'BoardTest.hasEmptyCellAround test: empty cell coordinates: (' + emptyCell.x + ','+ emptyCell.y + ')'
    );

    $.each(neighborCells, function(direction, neighborCell) {
      console.log(
        'debug',
        'BoardTest.hasEmptyCellAround test: testing neighbor cell at ' + direction
        + ' with coorinates (' + neighborCell.x + ',' + neighborCell.y + ')'
      );
      expect(board.hasEmptyCellAround(neighborCell)).toBe(true);
    });

  });

  // Board.movePieceToEmptyCell() test
  it("should move empty cell's neighbor pieces to the empty cell", function() {
    var emptyCell = board.getEmptyCell();
    var neighborCells = board.findNeighborCells(emptyCell);

    console.log(
      'debug',
      'BoardTest.movePieceToEmptyCell test: empty cell coordinates: (' + emptyCell.x + ','+ emptyCell.y + ')'
    );

    $.each(neighborCells, function(direction, neighborCell) {
      console.log(
        'debug',
        'BoardTest.movePieceToEmptyCell test: testing neighbor cell at ' + direction
        + ' with coorinates (' + neighborCell.x + ',' + neighborCell.y + ')'
      );

      board.movePieceToEmptyCell(neighborCell);

      // now the cell that was empty shouldn't be empty anymore
      var cellWherePieceWasMoved = board.getCell(emptyCell.x, emptyCell.y);
      expect(cellWherePieceWasMoved.isEmpty()).toBe(false);
      // and the cell that we were moving from should be now empty
      var newEmptyCell = board.getCell(neighborCell.x, neighborCell.y);
      expect(newEmptyCell.isEmpty()).toBe(true);

      // move the piece back for next tests
      board.movePieceToEmptyCell(cellWherePieceWasMoved);
    });
  });

  it("should have emptyCell empty", function() {
    var emptyCell = board.getEmptyCell(); 
    expect(emptyCell.isEmpty()).toBe(true);
  });

});
