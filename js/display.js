const player1 = 'X';
const player2 = 'O';
let currentPlayer = player1;
let state = [[" "," "," "],[" "," "," "],[" "," "," "]];


$('.box').on('click', function () {
    let x = $(this).data('x');
    let y = $(this).data('y');
    if (state[x][y] == " "){
        state[x][y] = currentPlayer;
        console.log(state[x][y]);
        $(this).addClass('clicked').text(currentPlayer);
    }
    console.log(playerWin());
    if(playerWin()) {
        $('.state').text(`${currentPlayer} wins the game!`);
        restart();
        return;
    }
    if(playerDraw()) {
        $('.state').text(`The game end in a draw! Please try again!`);
        restart();
        return;
    }
    console.log(`now the player is`,currentPlayer);
    if($('.clicked').size() % 2 ===1){
        currentPlayer = player2;
    }else{
        currentPlayer = player1;
    }
    console.log(`change the player to`,currentPlayer);

});

const playerWin = function () {
    console.log(state);
    console.log(currentPlayer);
    if (state[0][0] === currentPlayer){
        console.log("here");
        console.log(state[1][0] ===state[2][0]);
        console.log(state[0][0] ===state[2][0]);
        if (state[0][1] ===state[0][2] && state[0][0] === state[0][2]) {
            return true;
        }
        if (state[1][1] ===state[2][2] && state[0][0] === state[2][2]) {
            return true;
        }
        if (state[1][0] ===state[2][0] && state[0][0] === state[2][0]) {
            return true;
        }
    };

    if (state[1][1] === currentPlayer){
        if (state[1][2] ===state[1][0] && state[1][1] === state[1][0]) {
            return true;
        }
        if (state[2][1] ===state[0][1] && state[1][1] === state[0][1]) {
            return true;
        }
        if (state[2][0] ===state[0][2] && state[1][1] === state[0][2]) {
            return true;
        }
    };

    if (state[2][2] === currentPlayer){
        if (state[0][0] ===state[2][2] && state[0][0]=== state[2][2]) {
            return true;
        }
        if (state[2][0] ===state[2][1] && state[2][2] ===state[2][1]) {
            return true;
        }
    }
};

const playerDraw = function () {
    if($('.clicked').size() > 8){
        return true;
    }
};

const restart = function() {
    for (i = 0; i < 3; i++){
        for (j = 0; j < 3; j++) {
            state[i][j] = " ";
        }
    }
    $('.box').removeClass('clicked').text('');
    currentPlayer = player1;
}

$("#restart").on('click', restart);









