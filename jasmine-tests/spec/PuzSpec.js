describe("Puzzle", function() {
  var puzzle;

  beforeEach(function() {
    puzzle = new Puz();
  });
  
  it("should build a puzzle board", function() {
    puzzle.init();
    expect(document.getElementById(puzzle.board_el)).toBeTruthy();
  });


  it("should be able to format times in a human-friendly way", function() {
      times = [
      // hrs + ":" + pad_num(mins) + ":" + pad_num(secs);
        [9000,    "0:00:09"],
        [10000,   "0:00:10"],
        [601000,  "0:10:01"],
        [6010000, "0:10:10"],
        [3610000, "1:00:10"],
      ]
      for (var t in times) {    
          var output = puzzle.time_format(times[t][0]);
          expect(output).toBe(times[t][1]);
      }
  });
});
