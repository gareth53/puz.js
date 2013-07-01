describe("Puzzle", function() {

  beforeEach(function() {
        var puzzle;
        var test_wrapper = document.createElement('div');
        test_wrapper.setAttribute("id", 'test_wrapper');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(test_wrapper);
  });

  it("should build a puzzle board in a DOM element specified by ID", function() {
    // first witha specified ID that returns a DOM element
    puzzle = new Puz('test_wrapper');
    var wrap = puzzle.get_board_wrapper();
    expect(wrap).toBe(test_wrapper);

    // now with an ID that doesn't return a DOM element
    puzzle = new Puz('test_wrapper2');
    var wrap = puzzle.get_board_wrapper();
    expect(wrap.id).toBe('test_wrapper2');
    expect(wrap.tagName.toLowerCase()).toBe('div');


  });


    
  it("should build a puzzle board", function() {
    puzzle = new Puz();
    puzzle.init();
    expect(document.getElementById(puzzle.board_wrapper_id)).toBeTruthy();
  });
  
  it("should be able to format times in a human-friendly way", function() {
      puzzle = new Puz();
      times = [
      // hrs + ":" + pad_num(mins) + ":" + pad_num(secs);
        [9000,    "0:00:09"],
        [10000,   "0:00:10"],
        [601000,  "0:10:01"],
        [610000,  "0:10:10"],
        [3610000, "1:00:10"],
        [3670000, "1:01:10"],
        [3670000, "1:01:10"],
        [4270000, "1:11:10"]
      ]
      for (var t in times) {    
          var output = puzzle.time_format(times[t][0]);
          expect(output).toBe(times[t][1]);
      }
  });

  it("should be create a board map", function() {
      var puzzle = new Puz();
      // default is 4x4
      puzzle.build_board_map();
      expect(puzzle.board.length).toBe(4);
      expect(puzzle.board[0].length).toBe(4);
      delete puzzle;

      var width = 12,
          height = 6,
      puzzle = new Puz(undefined, {
              'board_w': width,
              'board_h': height
          });
      puzzle.build_board_map();
      expect(puzzle.board.length).toBe(height);
      expect(puzzle.board[0].length).toBe(width);
  });

});
