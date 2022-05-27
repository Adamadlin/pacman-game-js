'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWERFOOD = '🦠'
const BONUSFOOD = '🍒'

var gCounterFood = 0
var gCounter;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    gBoard = buildBoard()
    console.log('gBoard', gBoard)
    createPacman(gBoard);
    gCounterFood = counterFood(gBoard)
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gGame.score = 0
    var elScore = document.querySelector('h2 span')
    elScore.innerText = '0'
    var elVictoryModal = document.querySelector('.victory')
    elVictoryModal.style.display = 'none'
    gCounter = 0

}

function counterFood(board) {
    gCounterFood = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) {
                gCounterFood++
            }
        }
    }
    return gCounterFood
}



function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 || i === 1 && j === 8 || i === 8 && j === 1 || i === 8 && j === 8) {
                board[i][j] = POWERFOOD

            }
        }
    }
    return board;
}

function restartGame() {
    init()
}
function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    // if (gGame.score === 60) {
    //     // console.log('victory')

    //     // DOM 
    //     var elVictoryModal = document.querySelector('.victory')
    //     elVictoryModal.style.display = 'block'


    // }
}

// function isVictory() {
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard[i].length; j++) {
//             var cell = gBoard[i][j]
//             if (cell === FOOD) return false
//         }
//     }
//     return true
// }
function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, EMPTY)
}

// function restartGame() {

// }

// function isVictory() {
//     for (var i = 1; i <)
// }

