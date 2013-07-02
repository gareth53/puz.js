describe("Puzzle", function() {

  beforeEach(function() {
        var puzzle;
        var test_wrapper = document.createElement('div');
        test_wrapper.setAttribute("id", 'test_wrapper');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(test_wrapper);
  });

  afterEach(function() {
        var body = document.getElementsByTagName('body')[0];
        var fixture = document.getElementById('test_wrapper');
        body.removeChild(fixture);
        var fixture2 = document.getElementById('test_wrapper2');
        if (fixture2) body.removeChild(fixture2);
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
    puzzle = new Puz('test_wrapper');
    puzzle.init();
    expect(document.getElementById(puzzle.board_wrapper_id)).toBeTruthy();
  });
  
  
  it("should build a board map", function() {
        var settings = [
        // w, h
        [4, 4],
        [5, 4],
        [6, 4],
        [7, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
        [57, 102]
        ];
        for (var i=0, lim=settings.length; i<lim ; i++) {
          var w = settings[i][0],
              h = settings[i][1];
          puzzle = new Puz('test', {
              'board_w': w,
              'board_h': h
          });
          puzzle.build_board_map()
          expect(puzzle.board.length).toBe(h);
          expect(puzzle.board[0].length).toBe(w);
        }
  });
  it("should understand which tiles are movable", function() {
      var tests = [
        {   'board' : [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
                [13,14,15, 0],
            ],
            'space': [3, 3],
            'movables': [12, 15]
        },
        {   'board' : [
                [ 1, 2, 3, 0],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
                [13,14,15, 4],
            ],
            'space': [3, 0],
            'movables': [3, 8]
        },
        {   'board' : [
                [ 0, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
                [13,14,15, 1],
            ],
            'space' : [0, 0],
            'movables': [2, 5]
        },
        {   'board' : [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9, 0,11,12],
                [13,14,15,10],
            ],
            'space': [1, 2],
            'movables': [6, 9, 11, 14]
        },
        {   'board' : [
                [ 1, 2, 3, 4],
                [ 5, 6, 0, 8],
                [ 9, 7,11,12],
                [13,14,15,10],
            ],
            'space': [2, 1],
            'movables': [3, 6, 8, 11]
        }
        ];

        for (var i=0, lim=tests.length; i<lim ; i++) {
          puzzle = new Puz('test', {
              'board_w': 4,
              'board_h': 4
          });
          puzzle.space = tests[i]['space'];
          puzzle.board = tests[i]['board'];

          var output = puzzle.movable_tiles();
          output.sort(function(a, b) { return (a > b) });
          expect(output).toEqual(tests[i]['movables']);
        }
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
      puzzle = new Puz();
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
