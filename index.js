let $start = document.querySelector('#start'),
  $btn0 = document.querySelector('#btn0'),
  $btn1 = document.querySelector('#btn1'),
  $btn2 = document.querySelector('#btn2'),
  $btn3 = document.querySelector('#btn3'),
  $btn4 = document.querySelector('#btn4'),
  $btn5 = document.querySelector('#btn5'),
  $btn6 = document.querySelector('#btn6'),
  $btn7 = document.querySelector('#btn7'),
  $btn8 = document.querySelector('#btn8'),
  $btn9 = document.querySelector('#btn9'),
  $enter = document.querySelector('#enter'),
  $bspace = document.querySelector('#bspace'),
  $allGameBtn = document.getElementsByClassName('game_btn'),
  $board = document.querySelector('#board'),
  $findNumber = document.querySelector('#findNumber'),
  $resultTurn = document.querySelector('#resultTurn'),
  $surrender = document.querySelector('#surrender'),
  $body = document.querySelector('#body'),
  $temp = document.querySelector('#temp');

var isGameStarted = false,
  score = 1,
  number = '',
  board = '';


$start.addEventListener('click', startGame);
$btn0.addEventListener('click', btn0);
$btn1.addEventListener('click', btn1);
$btn2.addEventListener('click', btn2);
$btn3.addEventListener('click', btn3);
$btn4.addEventListener('click', btn4);
$btn5.addEventListener('click', btn5);
$btn6.addEventListener('click', btn6);
$btn7.addEventListener('click', btn7);
$btn8.addEventListener('click', btn8);
$btn9.addEventListener('click', btn9);
$bspace.addEventListener('click', bspace);
//Эксперимент с функцией, похоже в этом месте функция не имеет
// смысла
funcEvent($enter, clickEnter);
funcEvent($surrender, clickSurrender);
function funcEvent(item, job) {
  item.addEventListener('click', job);
}

function startGame() {
  $findNumber.innerHTML = 'XXXX';
  $board.innerHTML = '';
  isGameStarted = true;
  score = 1;
  number = '';
  var i = 0,
      numberTemp = [];
  while (i < 4) {
    var c = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    if (numberTemp.indexOf(c) === -1) {
      // if ((i === 0  && c !== 0) || i !== 0) {
        numberTemp.push(c);
        number = number + c;
        i++;
      // } проверка на то что 0 впереди цифры  - код закоментирован
    }
    if (i === 4 && number.length !== 4) {
      i = 0;
      numberTemp = [];
      number = '';
    }
  }
  console.log(number);
  $btn1.removeAttribute("disabled");
  btn2.disabled = false;
  allGameBtnOn();
  $enter.disabled = true;
  off($start);
  on($surrender);
}


function allGameBtnOn() {
  var a = 0;
  while  (a < 12){
    $allGameBtn[a].disabled = false;
    a++;
  }
}

function allGameBtnOff() {
  var a = 0;
  while  (a < 12) {
    $allGameBtn[a].disabled = true;
    a++;
  }
}

function off(item) {
  item.disabled = true;
}
function on(item) {
  item.disabled = false;
}
function btn1() {
  clickNumberButton(1, $btn1);
}
function btn2() {
  clickNumberButton(2, $btn2);
}
function btn3() {
  clickNumberButton(3, $btn3);
}
function btn4() {
  clickNumberButton(4, $btn4);
}
function btn5() {
  clickNumberButton(5, $btn5);
}
function btn6() {
  clickNumberButton(6, $btn6);
}
function btn7(){
  clickNumberButton(7, $btn7);
}
function btn8() {
  clickNumberButton(8, $btn8);
}
function btn9() {
  clickNumberButton(9, $btn9);
}
function btn0() {
  clickNumberButton(0, $btn0);
}

function clickNumberButton(pushNumber, numNow){
  if (board.length < 4) {
    board = board + pushNumber;
    console.log(board);
    $board.innerHTML = board;
    off(numNow);
  } if (board.length === 4) {
    $enter.disabled = false;
  }
}

function bspace() {
  $board.innerHTML = '';
  allGameBtnOn();
  board = '';
  $enter.disabled = true;
}
          // после нажатия кнопки ВВОДа логика
function clickEnter() {
  if (number === board) {
    $findNumber.innerHTML = 'Поздравляю ' + number +
      ' с ' + score + ' попытки';
    isGameStarted = false;
    on($start);
    allGameBtnOff();
    off($surrender);
    $resultTurn.innerHTML = '';
  }
  else {
    var n = 0;
    var cow = 0;
    var bull = 0;
    while (n < 4){
      if (board[n] === number[n]) {
        bull++;
        n++;
        continue;
      }
      if ( number.indexOf( board[n] ) !== -1) {
        cow = cow + 1;
      }
      n++;
    }
    console.log('cow ' + cow);
    console.log('bull ' + bull);
    endTurn(bull, cow);
  }
}

function endTurn(bull, cow) {
  var h3 = document.createElement("h3");
  h3.classList.add('resultWrited');
  h3.innerHTML = score +') ' + board + ' быков = ' +
    bull + ' <br>   коровы = ' + cow;
  $resultTurn.appendChild(h3);
  score++;
  bspace();
}

function clickSurrender() {
  $findNumber.innerHTML = number;
  isGameStarted = false;
  on($start);
  allGameBtnOff();
  off($surrender);
  $resultTurn.innerHTML = '';
}

// МОДАЛЬНОЕ ОКНО "правила игры"

let modal = document.querySelector("#modal"),
    closeButton = document.querySelector("#close-button"),
    openButton = document.querySelector("#open-button");

closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  document.body.classList.toggle('scrollOff'); //выключение прокрутки боди
});
// toggle метод переключения, если есть удалит если нету напишет
openButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  document.body.classList.toggle('scrollOff');
});

// СЛАЙДЕР

function getRandomFloat() {
  return Math.floor(Math.random() *6 + 1);
};

let imgNow = 1,
  imgClass = 'body1';
  rand = getRandomFloat();


function changeBgImg() {
    while (imgNow == rand) {
      rand = getRandomFloat();
    };
    imgNow = rand;
    console.log(rand);
    if ($body.classList.contains) {
      $body.classList.remove(imgClass);
    };
    imgClass = `body${rand}`;
    $body.classList.add(imgClass);
};
changeBgImg();
setInterval('changeBgImg();', 30000);
