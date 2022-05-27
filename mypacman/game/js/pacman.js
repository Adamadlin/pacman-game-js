'use strict'
const PACMAN = '😷';
var isSuper = false

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}


function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    // console.log(gPacman.location)
    var nextLocation = getNextLocation(ev);
    if (!nextLocation) return
    // console.log('nextLocation', nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        console.log(gPacman.isSuper)
        if (!gPacman.isSuper) {

            gameOver();
            return
        }
        var ghost = getGhost(nextLocation)
        console.log(ghost)
        if (!ghost) return
        if (ghost.currCellContent === FOOD) {
            ghost.currCellContent === EMPTY
            gCounter++
            updateScore(1);
            gCounterFood--
        }
        removeGhost(ghost)
    }
    if (nextCell === FOOD) {
        gCounter++
        updateScore(1);
        gCounterFood--
        if (gCounterFood === 0) {
            gameOver()
            // console.log('victory')

            // DOM 
            var elVictoryModal = document.querySelector('.victory')
            elVictoryModal.style.display = 'block'
        }

    }
    if (nextCell === POWERFOOD) {
        gPacman.isSuper = true
        setTimeout(function () { gPacman.isSuper = false }, 5000)

    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    // Move the pacman
    // update the model
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}


function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.key', eventKeyboard.key)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default: return null
    }
    return nextLocation;
}