const MoveError = require("./moveError");

class View {
  constructor(game, $el) {
    this.game = game;
    this.$list = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $('li').on('click', e => {
      this.makeMove($(e.currentTarget));
    });
  }

  makeMove($square) {
    if (this.game.isOver()) {
      return;
    }

    const currentMark = this.game.currentPlayer;

    try {
      this.game.playMove($square.data('pos'));
    } catch (error) {
      if (error instanceof MoveError) {
        return;
      } else {
        throw e;
      }
    }
    $square.addClass("white");
    $square.text(currentMark);
    if (this.game.isOver()) {
      let message = "It's a tie!";
      const winner = this.game.winner();
      if (winner) message = `${winner} wins!`;
      this.$list.after($('<h1></h1>').text(message));

      this.$list.addClass("over");
    }
  }

  setupBoard() {
    this.$list.addClass("list");
    for (let i = 0; i < 9; i++) {
      const $el = $('<li></li>');
      $el.data('pos', [
        Math.floor(i / 3),
        i % 3
      ]);
      $el.addClass("square");

      this.$list.append($el);
    }
    $('h1').after(this.$list);
  }
}

module.exports = View;
