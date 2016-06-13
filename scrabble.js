
  var prompt = require('prompt');

// SCRABBLE
  Scrabble = function() {
    this._points = {
      A: 1,
      B: 3,
      C: 3,
      D: 2,
      E: 1,
      F: 4,
      G: 2,
      H: 4,
      I: 1,
      J: 8,
      K: 5,
      L: 1,
      M: 3,
      N: 1,
      O: 1,
      P: 3,
      Q: 10,
      R: 1,
      S: 1,
      T: 1,
      U: 1,
      V: 4,
      W: 4,
      X: 8,
      Y: 4,
      Z: 10
    };
  };
  Scrabble.prototype.score = function(word){
    var score = 0;
    var tiles = 0;

    var wordArray = word.toUpperCase().split("");

    for(var char of wordArray){
      score += this._points[char];

      tiles += 1;
    };

    if(tiles == 7){
      score += 50;
    };
    return score;
  };

  Scrabble.prototype.highestScoreFrom = function(arrayOfWords){

    var maxWord = [arrayOfWords[0], this.score(arrayOfWords[0])];
    var currentScore = this.score(arrayOfWords[0]);
    var highestScoreHash = {
                      word: (arrayOfWords[0]),
                      score: currentScore
                    };

    for(var word of arrayOfWords){
      var currentScore = this.score(word)

      if (currentScore === highestScoreHash["score"]){
        if (highestScoreHash["word"].length < 7 && highestScoreHash["word"].length > word.length){
          highestScoreHash = {
                            word: word,
                            score: currentScore
          }
        };
      }else if (currentScore > highestScoreHash["score"]){
        highestScoreHash = {
                          word: word,
                          score: currentScore
        }
      };
    };
    return highestScoreHash["word"];
  };

// PLAYER
  Player = function(name){
    this.name = name;
    this.plays = [];
    this.totalScore = 0;
    this._tiles = [];
    this._maxTiles = 7;
    this._scrabble = new Scrabble();
  };

  Player.prototype.play = function(word){
    var score = this._scrabble.score(word);

    this.plays.push(word);
    this.totalScore += score;

    return this.hasWon() === true ? false : score;
  };

  Player.prototype.hasWon = function(){
    return this.totalScore >= 100 ? true : false;
  };

  Player.prototype.highestScore = function(){
    return this.maxByScore()["score"];
  };

  Player.prototype.highestScoringWord = function(){
    return this.maxByScore()["word"];
  };


  Player.prototype.maxByScore = function(){
    var initialWord = this.plays[0];
    var maxHash = {word: initialWord, score: this._scrabble.score(initialWord)};

    for(var word of this.plays){
      var currentScore = this._scrabble.score(word);
      if(currentScore > maxHash["score"]){
        maxHash = {word: word, score: currentScore};
      };
    };
    return maxHash;
  };


  TileBag = function(){
    this._default_tiles = [["A", 1], ["A", 1], ["A", 1], ["A", 1], ["A", 1], ["A", 1], ["A", 1], ["A", 1], ["A", 1],
                  ["B", 1], ["B", 1],
                  ["C", 1], ["C", 1],
                  ["D", 1], ["D", 1], ["D", 1], ["D", 1],
                  ["E", 1], ["E", 1], ["E", 1], ["E", 1], ["E", 1], ["E", 1], ["E", 1],
                  ["E", 1], ["E", 1], ["E", 1], ["E", 1], ["E", 1],
                  ["F", 1], ["F", 1],
                  ["G", 1], ["G", 1],["G", 1],
                  ["H", 1], ["H", 1],
                  ["I", 1], ["I", 1], ["I", 1], ["I", 1], ["I", 1], ["I", 1], ["I", 1], ["I", 1], ["I", 1],
                  ["J", 1],
                  ["K", 1],
                  ["L", 1], ["L", 1], ["L", 1], ["L", 1],
                  ["M", 1], ["M", 1],
                  ["N", 1], ["N", 1], ["N", 1], ["N", 1], ["N", 1], ["N", 1],
                  ["O", 1], ["O", 1], ["O", 1], ["O", 1], ["O", 1], ["O", 1], ["O", 1], ["O", 1],
                  ["P", 1], ["P", 1],
                  ["Q", 1],
                  ["R", 1], ["R", 1], ["R", 1], ["R", 1], ["R", 1], ["R", 1],
                  ["S", 1], ["S", 1], ["S", 1], ["S", 1],
                  ["T", 1], ["T", 1], ["T", 1], ["T", 1], ["T", 1], ["T", 1],
                  ["U", 1], ["U", 1], ["U", 1], ["U", 1],
                  ["V", 1], ["V", 1],
                  ["W", 1], ["W", 1],
                  ["X", 1],
                  ["Y", 1], ["Y", 1],
                  ["Z", 1]];
  };
  
module.exports = Scrabble;
