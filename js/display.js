$(document).ready(function(){

//if player doesn't select token, 'X' will be default one.
    let player1 = $('.PlayerX').text();
    let player2 = $('.PlayerO').text();
    let currentPlayer = player1;
// state represents total 9 boxes on the grid.
    let state = [[" "," "," "],[" "," "," "],[" "," "," "]];

// popup box will display only if the game is over.
    $('.popup').removeClass('active');

// if player want to choose different token.
    $('.sidebar-btn').on('click',function(){
        $(this).toggleClass('sidebar-btn-closed');
        $('.sidebar').toggleClass('sidebar-closed');
    });
// once the P1 select the Token, P2 will use the other.    
    const plTokenSelect= function(obj){
        $('.plSelect').removeClass('is-selected');
        obj.addClass('is-selected');
        $('.sidebar').toggleClass('sidebar-closed');
        player1 = obj.text();
        player2 = obj.siblings().text();
        currentPlayer = player1;
    }
    $('.plSelect').on('click',function(){
        plTokenSelect ($(this));
    });

// P1 start the game, once the box clicked, the x-index and y-index of the clikced box will be recorded in the state array.

// the token selection will be banned during the game.
    $('.box').on('click', function() {
        $('.plSelect').off('click');
        let x = $(this).data('x');
        let y = $(this).data('y');
        if (state[x][y] == " "){
            state[x][y] = currentPlayer;
            console.log(state[x][y]); //********** */
            $(this).text(currentPlayer);
        }

// if the winning Condition function is true, popup box will be active.
// the sidebar will be avilable now.
// player winning record will be updated at the bottom of the page.        
        if(playerWin()) {
            $('.title').text(currentPlayer);
            $('.unicorn').attr('src','img/playerwin-2.gif');
            $('.state').text(`wins the game!`);
            $('.popup').addClass('active');
            $('.plSelect').on('click',function(){
                plTokenSelect ($(this));
            });
            if(currentPlayer === player1){
                $('.count-X').text(parseInt($('.count-X').text())+1);
            }else{
                $('.count-O').text(parseInt($('.count-O').text())+1);
            }
            return;
        }

// if the game ends in a draw, no update for winning record.
// popup box will display draw message.
// the sidebar token select part will be available here.    
        if(playerDraw()) {
            $('.unicorn').attr('src','img/drawgame-fin.gif');
            $('.title').text("X O")
            $('.state').text(`it's a draw!`);
            $('.popup').addClass('active');
            $('.plSelect').on('click',function(){
                plTokenSelect ($(this));
            });
            return;
        }
// everytime one box is cliked, switch the player by the end.
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }else{
            currentPlayer = player1;
        }
        console.log('changed the player to',currentPlayer);

    });

    const playerWin = function () {
        if (state[0][0] === currentPlayer){
            if (state[0][1] === currentPlayer && state[0][2] === currentPlayer) {
                return true;
            }
            if (state[1][1] === currentPlayer && state[2][2] === currentPlayer) {
                return true;
            }
            if (state[1][0] === currentPlayer && state[2][0] === currentPlayer) {
                return true;
            }
        };

        if (state[1][1] === currentPlayer){
            if (state[1][2] === currentPlayer && state[1][0] === currentPlayer) {
                return true;
            }
            if (state[2][1] === currentPlayer &&  state[0][1] === currentPlayer) {
                return true;
            }
            if (state[2][0] === currentPlayer &&  state[0][2] === currentPlayer) {
                return true;
            }
        };

        if (state[2][2] === currentPlayer){
            if (state[0][2] === currentPlayer && state[1][2] === currentPlayer) {
                return true;
            }
            if (state[2][0] === currentPlayer && state[2][1] === currentPlayer) {
                return true;
            }
        }
    };

    const playerDraw = function () {
        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++) {
                if(state[i][j] === " "){
                    return false;
                }
            }
        }
        return true;
    };

    const restart = function() {

        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++) {
                state[i][j] = " ";
            }
        }
        $('.box').removeClass('clicked').text('');
        $('.plSelect').on('click',function(){
            plTokenSelect ($(this));
        });
        currentPlayer = player1;
    }

    $("#restart-popup-btn").on('click', function() {
        $('.popup').removeClass('active');
        setTimeout(restart, 500);
    });

    $('.counterside-btn').on('click',function(){
        $(this).toggleClass('counterside-btn-closed');
        $('.stepCounter').toggleClass('stepCounter-closed');
        console.log($('.stepCounter').css('transform'));
    });

});







