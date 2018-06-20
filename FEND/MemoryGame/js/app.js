let card = document.getElementsByClassName('card');
let cards = [...card];
const deck = document.querySelector(".deck");
let matched = [];
let openCards = [];
let len = openCards.length;
const flipped = ['open', 'show', 'disabled'];
const all = ['open', 'show', 'match', 'disabled'];
let moves = document.querySelector('.moves');
let count = '';
const timer = new Timer();
let timerDisplay = document.querySelector('.myTimer');
const stars = document.querySelectorAll('.fa-star');

//start game
window.onload = startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleCards() {
  let shuffledCards = shuffle(cards);
  for (var i = 0; i < shuffledCards.length; i++) {
    for (let card of cards) {
      deck.appendChild(card);
    }
    cards[i].classList.remove(...all);
  }
}

function resetAll() {
  cards.innerHTML = '';
  count = '';
  moves.innerHTML = 0;
  timer.stop();
  timerDisplay.innerHTML = '00:00:00';
}

function startGame() {
  resetAll()
  shuffleCards();
  cardClick();
}

function cardClick() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCards);
  }
}

function flipCards() {
  this.classList.add(...flipped);
  openCards.push(this);
  if (openCards.length === 1) {
    myTimer();
  }
  if (openCards.length === 2) {
    document.body.style.pointerEvents = 'none';
    score();
    count++;
    moves.innerHTML = (count + ' Moves');
    let card1 = openCards[0].firstElementChild.className;
    let card2 = openCards[1].firstElementChild.className;
    if (card1 === card2) {
      match();
      document.body.style.pointerEvents = 'auto';
      if (matched.length === 16) {
        stopGame();
      }
    } else {
      closeCards();
    }
  }
}

// check if cards match
function match() {
  openCards[0].classList.add('match', 'disabled');
  openCards[1].classList.add('match', 'disabled');
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  matched.push(openCards[0], openCards[1]);
  openCards = [];
}

// close cards if they dont match 
function closeCards() {
  document.body.style.pointerEvents = 'none'; 
  openCards[0].classList.add('unmatch');
  openCards[1].classList.add('unmatch');
  setTimeout(function () {
    openCards[0].classList.remove(...flipped, 'unmatch');
    openCards[1].classList.remove(...flipped, 'unmatch');
    openCards = [];
    document.body.style.pointerEvents = 'auto';
  }, 1200);
}

//stop game and display modal 
function stopGame() {
  timer.stop();
  openModal();
}

// lower star rating based on number of moves 
function score() {
  if (count >= 13) {
    for (var i = stars.length - 1; i >= 0; --i) {
      stars[2].style.visibility = "hidden";
    }
  }
  if (count >= 20) {
    for (var i = stars.length - 1; i >= 0; --i) {
      stars[1].style.visibility = "hidden";
    }
  }
}

// timer by https://albert-gonzalez.github.io/easytimer.js/
function myTimer() {
  timer.start();
  timer.addEventListener('secondsUpdated', function (e) {
    timerDisplay.innerHTML = (timer.getTimeValues().toString());
  });
}


// Declare modal and close button 
const modal = document.querySelector('#modal');
const span = document.getElementsByClassName("close")[0];

let modalText = document.getElementsByClassName('modal-text');

// Open modal adapted from https://www.w3schools.com/howto/howto_css_modals.asp
function openModal() {
  prettyTime = timerDisplay.innerHTML.split(':');
  min = parseInt(prettyTime[1]) + ' min ';
  sec = ' and ' + parseInt(prettyTime[2]) + ' seconds';
  modal.style.display = 'block';
  let rating = document.querySelector(".stars").innerHTML;
  document.querySelector('.modal-text').innerHTML = '🎉Congratulations! 🎉<br>You finished with ' + count + ' moves in<br>' + min + sec + '<br>Rating: ' + rating;

  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}
