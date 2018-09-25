class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.$tower = null;
    $(".hanoi ul").on("click", this.clickTower.bind(this));
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      const $ul = $('<ul></ul>');
      $ul.data("index",i);
      if (i === 0) {
        for (let size = 1; size <= 3; size++) {
          const $li = $('<li></li>');
          $li.addClass(`disk-${size}`);
          $ul.append($li);
        }
      }
      this.$el.append($ul);
    }
  }

  clickTower(event){
    if (this.game.isWon()) {
      return;
    }

    const $ul = $(event.currentTarget);
    if (this.$tower === null) {
      this.$tower = $ul;
      this.$tower.addClass("selected");
    }else{
      const from = this.$tower.data("index");
      const to = $ul.data("index");

      if (this.game.move(from,to) === true) {
        $ul.prepend(this.$tower.find('li')[0]);
        if (this.game.isWon() === true) {
          this.$el.addClass("won");
          this.$el.after($("<h1></h1>").text("Congrats you won!"));
        }
      }
      this.$tower.removeClass("selected");
      this.$tower = null;
    }
  }
}

module.exports = View;
