'use strict'
const GHOST = '&#9781;';

var gGhosts;
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        color: getRandomColor(),
        location: {
            i: 3,
            j: 3

        },
        currCellContent: FOOD
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);

    gIntervalGhosts = setInterval(moveGhosts, 1000)



}

function moveGhosts() {
    // loop through ghosts

    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)

    }
}
function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    // console.log('ghost.location', ghost.location)
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell);

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    // update the model
    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


// function countFoodAround(mat, rowIdx, colIdx) { // 4 , 0

//     var foodCount = 0;
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) { // 3 4 5
//         if (i < 0 || i > mat.length - 1) continue;
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (j < 0 || j > mat[0].length - 1) continue;
//             if (i === rowIdx && j === colIdx) continue
//             var cell = mat[i][j];
//             // console.log('cell', cell);
//             if (cell === food) foodCount++

//         }
//     }
//     return foodCount

// }

function getGhost(location) {
    console.log(location)
    for (var i = 0; i < gGhosts.length; i++) {
        var currentGhost = gGhosts[i]
        console.log(currentGhost)

        if (currentGhost.location.i === location.i && currentGhost.location.j === location.j) {
            console.log('inside if', currentGhost)
            return currentGhost
        }
    }
    return null
}

// function getGhost(location) {
//     for (var i = 0; i < gGhosts.length; i++) {
//         var currGhost = gGhosts[i];
//         if (currGhost.location.i === location.i &&
//             currGhost.location.j === location.j) {
//             return currGhost;
//         }
//     }
//     return null;
// }
function removeGhost(ghost) {
    var idx = gGhosts.indexOf(ghost)
    gGhosts.splice(idx, 1)
}
function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? 'blue' : ghost.color

    return `<span style="color:${color};">${GHOST}</span>`
}