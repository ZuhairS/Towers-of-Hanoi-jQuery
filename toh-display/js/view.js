class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.move_from=undefined;
    this.move_to=undefined;
  }

  bindEvents($square) {
    $square.on("click", (event) => {
      this.registerClick($square);
    });
  }

  registerClick($square){
    if(this.move_from===undefined){
      this.move_from=$square.data("data-coor")[1];
    }else if(this.move_to===undefined){
      this.move_to=$square.data("data-coor")[1];
      let from=this.move_from;
      let to=this.move_to;
      let fromRow = (this.game.towers[from].length-1);
      let toRow = (this.game.towers[to].length);
      let width=this.game.towers[from][fromRow];
      if(this.game.move(from, to)){
        //Successful move
        this.makeMove(from, to, fromRow, toRow, width);
        // alert("Valid move!");
      }else{
        //invalid move
        alert("Invalid Move!");
      }
      this.move_from=undefined;
      this.move_to=undefined;
    }
  }

  makeMove(from, to, fromRow, toRow, width) {
    console.log(from);
    console.log(fromRow);
    let $fromDisk = $(`.disc${width}`);
    let $toSquare = $(`.${toRow}-${to}`);
    console.log(toRow);
    console.log(`.${toRow}-${to}`);
    console.log($toSquare);
    $fromDisk.css("background-color", "pink");
    $toSquare.css("background-color", "pink");

  }

  setupTowers() {
    const addRow = (rowIdx) => {
      const $row = $("<ul class='row'></ul>");
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        const $square = $("<li></li>").addClass("square").data("data-coor", [rowIdx, colIdx]).addClass(`${rowIdx}-${colIdx}`);
        if(colIdx===0){
          let $disc = $("<li></li>").addClass(`disc${rowIdx+1}`);
          $square.append($disc);
        }
        this.bindEvents($square);
        $row.append($square);
      }
      this.$el.append($row);
    };
    for (var i = 0; i < 3; i++) {
      addRow(i);
    }
    // let $disc = $("<li></li>").addClass(`disc${i}`);
    // $square.append($disc);
    // let $disc2 = $("<li></li>").addClass("disc2");
    // $square.append($disc2);
    // let $disc3 = $("<li></li>").addClass("disc3");
    // $square.append($disc3);
  }

}

module.exports = View;
