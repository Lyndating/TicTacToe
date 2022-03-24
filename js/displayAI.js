

const winCondition = [
    Set([[0,0],[0,1],[0,2]]),
    Set([[1,0],[1,1],[1,2]]),
    Set([[2,0],[2,1],[2,2]]),
    Set([[0,0],[1,0],[2,0]]),
    Set([[0,1],[1,1],[2,1]]),
    Set([[0,2],[1,2],[2,2]]),
    Set([[0,0],[1,1],[2,2]]),
    Set([[0,2],[1,1],[2,0]]),
];

   
const getRandomIndex = function() {
    return Math.floor(Math.random() *3);
}

let Xindex= getRandomIndex();
let Yindex = getRandomIndex();
let point = `${Xindex}${Yindex}`
let AItokens = new Set();

$('.box').on('click', function() {
    // the token selection will be banned during the game.
    $('.plSelect').off('click');
    let x = ($(this).data('x'));
    let y = ($(this).data('y'));
    let xy = `${x}${y}`;
    // get the x-index and y-index of the clicked box
    //write it as a string into those two sets separately.

    player1Tokens.add(xy);
    // print the token on the box
    $(this).text(currentPlayer);
    ($('.box').data(Xindex)).each(function(){
        if ($(this).data(Yindex)) {
            $(this).text("O");
            AItokens.add(point);
        }
    });
});
