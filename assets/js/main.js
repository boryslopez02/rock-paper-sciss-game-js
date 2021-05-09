let gameItems = document.querySelectorAll('.game-items .box'),
savePoints = localStorage.getItem('score'),
score = document.getElementById('score'),
animation = document.querySelector('.game .main-animation');

// Screen to Animate 
const firstScreen = document.getElementById('initial-screen'),
gameScreen = document.getElementById('game-screen'),
array = ['assets/img/icon-paper.svg', 'assets/img/icon-rock.svg', 'assets/img/icon-scissors.svg'],
// Rules Modal
ModalRules = document.getElementById('rules-modal'),
btnRules = document.getElementById('btn-rules'),
closeRulesModal = document.getElementById('rules-close'),
// Hints
modalHint = document.getElementById('modal-hint'),
hint = document.getElementById('hint'),
playAgainBtn = document.getElementById('play-again');

// Set card pick
const playerPick = document.getElementById('player-pick'),
housePick = document.getElementById('house-pick');

document.addEventListener('DOMContentLoaded', () => {
    GetSaveScore();
    setTimeout(() => {
        animation.classList.add('remove')
        animation.addEventListener('animationend', (e) => {
            if (e.animationName === 'hide3') {
                animation.remove();
            }
        });
    }, 6000);
});

gameItems.forEach(item => {
    item.addEventListener('click', (e) => {
        SetPick(e.target.childNodes[1]);
        ChangeScreen();
    });
});

function SetPick(item) {
    let randomNum = Math.floor(Math.random() * 3)
    
    let str = item.src.replace("http://127.0.0.1:5500/", '')
    playerPick.src = str;

    array.forEach(element => {
        if (element === str) {
            // PlayerPick
            if (str === array[0]) {
                playerPick.parentElement.classList.add('paper')
                Compare(0, randomNum)
            } else if(str === array[1]) {
                playerPick.parentElement.classList.add('rock')
                Compare(1, randomNum)
            } else {
                playerPick.parentElement.classList.add('sciss')
                Compare(2, randomNum)
            } 
        }
    });
    // HousePick
    if (randomNum < 1) {
        housePick.parentElement.classList.add('paper')
    } else if(randomNum === 1) {
        housePick.parentElement.classList.add('rock')
    } else {
        housePick.parentElement.classList.add('sciss')
    }
}

const Compare = (pick, house) => {
    console.log(pick, house);
    if (pick < house && house === 1) { // Complete
        hint.innerHTML = 'You Win';
        SumScore();
    } else if (pick === 0 && house < 2 && house != 0) { // Complete
        hint.innerHTML = 'You Win';
        SumScore();
    } else if (pick === 0 && house === 2) { // Complete
        hint.innerHTML = 'You Lose';
        RestScore();
    } else if (pick > house && house === 1) { // Complete
        hint.innerHTML = 'You Lose';
        RestScore();
    } else if (pick === 1 && pick < house) { // Complete
        hint.innerHTML = 'You Win';
        SumScore();
    } else if (pick === 1 && pick > house) { // Complete
        hint.innerHTML = 'You Lose';
        RestScore();
    } else if (pick === 2 && house < 1) {
        hint.innerHTML = 'You Win';
        SumScore();
    } else if (pick === house) { // Complete  
        hint.innerHTML = 'Draw';
    }

    setTimeout(() => {
        playerPick.parentElement.classList.add('show')
        housePick.src = array[house]
        setTimeout(() => {
            housePick.parentElement.classList.add('show')
            setTimeout(() => {
                modalHint.classList.add('active')
                score.innerHTML = savePoints;
            }, 500);
        }, 1000);
    }, 3000);
}

const Winner = (a) => {
    if (a === 0) {
        setTimeout(() => {
            playerPick.parentElement.parentElement.classList.add('winner')
        }, 4000);
    } else {
        setTimeout(() => {
            housePick.parentElement.parentElement.classList.add('winner')
        }, 4000);
    }
}

const ChangeScreen = () => {
    firstScreen.classList.add('active')
    firstScreen.addEventListener('animationend', (e) => {
        if (e.animationName === 'showLeft') {
            firstScreen.remove();
            gameScreen.classList.add('active')
        }
    });
}
const GetSaveScore = () => {
    if (savePoints === null) {
        savePoints = 0;
        score.innerHTML = 0;
        localStorage.setItem('score', savePoints)
    } else {
        savePoints = parseInt(localStorage.getItem('score'))
        score.innerHTML = savePoints;
    }
}

const SumScore = () => {
    Winner(0);
    savePoints++;
    localStorage.setItem('score', savePoints)
}

const RestScore = () => {
    Winner(1);
    if (savePoints > 0) {
        savePoints--;
    }
    localStorage.setItem('score', savePoints)
}

// Rules Modal
btnRules.onclick = function () {
    ModalRules.classList.add('active')
}

closeRulesModal.onclick = function () {
    ModalRules.classList.remove('active')
}

// Play Again Btn
playAgainBtn.onclick = function () {
    window.location.reload();
}