
class Box  {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.value = "";
      this.stepCounter = 0;
    }

    set_value(value) {
        if(currentPlayer ==='O'){
        this.value = "O";
        }else{
            this.value = 'X';
        }
        console.log(`Setting (${this.x}, ${this.y}) is set to ${this.value}`)
    }

    on_click() {
        this.stepCounter += 1;        
        console.log(this.x, this.y +'is clicked');
    }
}; 

const Boxes = {
    x : 0,
    y: 0,
    box: function(x,y) {
        return 
    }
    
}

let grid = [];
for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++){
        let box = new Box(i, j);
        row.push(box);
    }
    grid.push(row);
};

$('.box').on('click', function() {
    let x = $(this).data("x");
    let y = $(this).data("y");
    button = grid[x][y];
    button.on_click();
    
});

const currentPlayer = function (){

}
const winCondition = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
];


    
