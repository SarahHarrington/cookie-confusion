
let firstCard = null
let secondCard = null;
let currentScore = 0;
let attempts = 0;
const startOverBtn = document.getElementById('startOverBtn');
let clearGuessTimeout = null;

document.getElementById("currentScore").innerHTML = 'Matches: ' + currentScore;
document.getElementById("attempts").innerHTML = 'Attempts: ' + attempts;

shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

startGame = () => {
  let cardDeck = document.getElementById('cardDeck');
  cardDeck.innerHTML = ''
  makeCards()
  firstCard = null
  secondCard = null;
  currentScore = 0;
  attempts = 0;
  document.getElementById("currentScore").innerHTML = 'Matches: ' + currentScore;
  document.getElementById("attempts").innerHTML = 'Attempts: ' + attempts;
}

makeCards = () => {
  shuffle(cookies);
  let gameCookies = cookies.slice(0, 10);
  gameCookies.forEach(cookie => gameCookies.push(cookie));
  shuffle(gameCookies)
  gameCookies.forEach((cookie) => {
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('type', cookie.type);
    newCard.addEventListener('click', selectedCard)
    let img = document.createElement('img')
    img.src = cookie.src;
    img.alt = cookie.alt;
    img.classList.add('hide-cookie')
    newCard.append(img);
    document.getElementById('cardDeck').appendChild(newCard);
  })
}

function selectedCard(event) {
  if (clearGuessTimeout !== null) {
    clearTimeout(clearGuessTimeout);
    clearGuess();
  }
  if (event.currentTarget.classList.contains('selected')) {
    return
  }
  else {
    event.currentTarget.classList.add('selected');
    event.target.firstChild.classList.remove('hide-cookie')
    checkMatch(event.currentTarget);
  }
}

function checkMatch(cardGuess) {
  if (firstCard === null) {
    firstCard = cardGuess;
    firstCard.classList.add('green');
  }

  else if (secondCard === null) {
    secondCard = cardGuess;
    if (firstCard.getAttribute('type') === secondCard.getAttribute('type')) {
      firstCard.classList.add('matched');
      secondCard.classList.add('green');
      secondCard.classList.add('matched');
      currentScore = currentScore + 1;
      attempts = attempts + 1;
      firstCard = null;
      secondCard = null;
      document.getElementById("currentScore").innerHTML = 'Matches: ' + currentScore;
      document.getElementById("attempts").innerHTML = 'Attempts: ' + attempts;
      if (currentScore === 10) {
        youWin();
      }
    }
    else {
      attempts = attempts + 1;
      document.getElementById("attempts").innerHTML = 'Attempts: ' + attempts;
      firstCard.classList.add('orange')
      firstCard.classList.remove('green');
      secondCard.classList.add('orange');
      secondCard.classList.remove('green');
      clearGuessTimeout = setTimeout(clearGuess, 1100);
    }
  }
}

function clearGuess() {
  clearGuessTimeout = null;
  firstCard.classList.remove('orange', 'selected');
  secondCard.classList.remove('orange', 'selected');
  firstCard.firstChild.classList.add('hide-cookie');
  secondCard.firstChild.classList.add('hide-cookie');
  firstCard = null;
  secondCard = null;
}

var modal = document.getElementById('winnerPop');
var modalContent = document.getElementById('winnerPopContent');
var modalClose = document.getElementById('close');
var playAgain = document.getElementById('playAgain');

function youWin() {
  modal.style.display = "flex";
  document.getElementById("winnerFinalTries").innerHTML = 'Final Attemps: ' + attempts;
  document.getElementById("winnerFinalScore").innerHTML = 'Total Matches: ' + currentScore;
}

modalClose.onclick = function () {
  modal.style.display = "none";
}

playAgain.onclick = function () {
  modal.style.display = "none";
  startGame();
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

startOverBtn.onclick = function () {
  startGame();
}

startGame();