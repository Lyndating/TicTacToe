$(document).ready(function(){

//if player doesn't select token, 'X' will be default one.
    let player1 = $('.PlayerX').text();
    let player2 = $('.PlayerO').text();
    let currentPlayer = player1;
// state represents total 9 boxes on the grid.
    // let state = [[" "," "," "],[" "," "," "],[" "," "," "]];
    let player1Tokens = new Set();
    let player2Tokens = new Set();

//list all 8 winning conditions.    
    const winConditions = [
        new Set(['00','01','02']),
        new Set(['10','11','12']),
        new Set(['20','21','22']),
        new Set(['00','10','20']),
        new Set(['01','11','21']),
        new Set(['02','12','22']),
        new Set(['00','11','22']),
        new Set(['02','11','20']),
    ];

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

// for each box being clicked, the index will be written in the state array.
    $('.box').on('click', function() {
        // the token selection will be banned during the game.
        $('.plSelect').off('click');
        let x = ($(this).data('x'));
        let y = ($(this).data('y'));
        let xy = `${x}${y}`;
        // get the x-index and y-index of the clicked box
        //write it as a string into those two sets separately.
        if (currentPlayer === player1) {
            player1Tokens.add(xy);
        }else{
            player2Tokens.add(xy);
        }
        // print the token on the box
        $(this).text(currentPlayer);


// if the winning Condition function is true, popup box will be active.
// the sidebar will be avilable now.
// player winning record will be updated at the bottom of the page.        
        if(playerWin()) {
            if(currentPlayer === player1){
                $('.title').text($('.PlayerX').attr('id'));
            }else{
                $('.title').text($('.PlayerO').attr('id'));
            }
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

    });


// winning condition check
    const playerWin = function () {
        if (currentPlayer === player1) {
            currentSet = player1Tokens;
        }else{
            currentSet = player2Tokens;
        }
        console.log(currentSet);
        console.log('pl',currentPlayer);
        // iterate through the winConditions array
        // compare each set with the currentplayer's set.
        // if there are three elements in the new set returned from the interSection function, return true
        for (let winningCondition of winConditions) {
            console.log(winningCondition);
            console.log(interSection(currentSet, winningCondition));
            if(interSection(currentSet, winningCondition).size === 3) {
                return true;
            }
        }
        return false;

    };
    // check draw condition, if more than 8 boxes are clicked, return true.
    const playerDraw = function () {
        let totalSize = player1Tokens.size + player2Tokens.size;
        if (totalSize < 8){
            return false;
        };
        return true;
    };
    
    // define restart function.
    // both two sets are clear (empty);
    // all the clicked boxes are reset.
    // sidebar is available.
    const restart = function() {
        player1Tokens.clear();
        player2Tokens.clear();
        $('.box').removeClass('clicked').text('');
        $('.plSelect').on('click',function(){
            plTokenSelect ($(this));
        });
        currentPlayer = player1;
    }
    // set the condition to compare two sets
    // return a new set with those values including in both of the two sets.
    const interSection =function(setA, setB) {
        let _intersection = new Set()
        for (let elem of setB) {
            if (setA.has(elem)) {
                _intersection.add(elem)
            }
        }
        return _intersection
    }
    //set function for the restart button in popupbox
    //click the button, the popupbox will disappear and restart function will be called after 500ms.
    $("#restart-popup-btn").on('click', function() {
        $('.popup').removeClass('active');
        setTimeout(restart, 500);
    });
    //click the button: counter-sidebar at the top right corner
    $('.counterside-btn').on('click',function(){
        $(this).toggleClass('counterside-btn-closed');
        $('.stepCounter').toggleClass('stepCounter-closed');
        console.log($('.stepCounter').css('transform'));
    });
    let audio = new Audio('http://www.sousound.com/music/healing/healing_01.mp3');
    $('.music-on').on('click',function(){
        audio.play();
    });
    $('.music-off').on('click',function(){
        audio.pause();
    });
});







