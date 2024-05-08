//clickhandler function
//check winning 
//winning result
//check draw
//restart function

const X_class = 'x';
const Circle_class = 'circle';
let circletrun;
const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const board = document.getElementById('board');
const winTxt = document.getElementById('win-txt');
const winBox = document.getElementById('win-box');
const restartBtn = document.getElementById('restart-btn');
const inputCells = document.querySelectorAll('[data-cell]');

restartGame();

function restartGame(){
    inputCells.forEach((cell)=>{
        cell.classList.remove(X_class);
        cell.classList.remove(Circle_class);
        cell.addEventListener('click',clickhandler);
        cell.addEventListener('click',clickhandler,{once:true});
    });
    winBox.classList.remove('win');
}

restartBtn.addEventListener('click',restartGame)

function clickhandler(e){
    const cell = e.target;
    const currentClass = circletrun ? Circle_class : X_class;
    placemark(cell,currentClass);

    if(checkWinning(currentClass)){
        endgame(false);
    }else if(isDraw()){
        endgame(true);
    }else{
        swap();
        setboardhover();
    }
}

function placemark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swap(){
    circletrun = !circletrun;
}

setboardhover();
function setboardhover(){
    board.classList.remove(Circle_class);
    board.classList.remove(X_class);
        if(circletrun){
        board.classList.add(Circle_class);
    }else{
        board.classList.add(X_class);
    }
}

function checkWinning(currentClass){
    return winningCombination.some((combination)=>{
        return combination.every((index)=>{
            return inputCells[index].classList.contains(currentClass);
        });
    })
}

function endgame(draw){
    if(draw){
        winTxt.innerText = 'Draw';
    }else{
        winTxt.innerText = `${circletrun ? "o's" : "X's"} win`;
    }
    winBox.classList.add('win');
}

function isDraw(){
  return  [...inputCells].every((cell)=>{
        return cell.classList.contains(X_class) || cell.classList.contains(Circle_class);
    });
};