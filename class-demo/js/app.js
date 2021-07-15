// handles page loading logic
let interval = setInterval(function () {
  if (document.readyState === 'complete') {
    clearInterval(interval);

    initClock();

    // if on word guessing game page, init guessing game
    if (window.location.pathname === '/word-guess.html') {
      initWordGuessingGame();
    }
  }
}, 100);

// event delegation
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('word-guess__hiddenWord--char')) {
    handleGuessedLetter(event);
  }
});


// ********************************************************** Word Guessing Game
const words = [
  "hello",
  "world",
  "programming",
  "javascript"
];

const initialAttempts = 3;

let guessedLetters = [];
let chosenWord = [];
let hiddenWord = []
let attemptsRemaining = 0;


// generates random number within range
function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// gets random word from list of words
function getRandomWord(list) {
  const idx = randomNumberInRange(0, list.length);
  return list[idx];
}

// generate alphabet [a - z]
function generateAlphabet() {
  var a = [], i = 'a'.charCodeAt(0), j = 'z'.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

// builds alphabet display in UI
function buildAlphabetDisplay(list) {
  // get containing element to append alphabet characters to
  const wrapper = document.getElementById('letters-display');
  wrapper.innerHTML = '';

  for (let i = 0; i < list.length; i++) {
    const char = document.createElement('span');
    char.setAttribute('class', 'word-guess__hiddenWord--char border col-2 col-sm-1 text-center p-2 m-1');
    char.setAttribute('data-character', list[i]);
    char.setAttribute('data-characterIdx', i);
    char.textContent = list[i];

    wrapper.appendChild(char);
  }
}

// builds word display in UI
function buildWordDisplay(word) {
  // get containing element to display underscores '_'
  const el = document.getElementById('hidden-word-display');
  el.innerHTML = '';

  for (let i = 0; i < word.length; i++) {
    const slot = document.createElement('span');
    slot.setAttribute('class', 'mx-3');
    slot.textContent = word[i];

    el.appendChild(slot);
  }
}

// handles game end logic
function handleGameEnd(isGameWon) {
  let playAgain;

  document.getElementById('letters-display').setAttribute('style', 'pointer-events: none;');

  if (isGameWon) {
    playAgain = confirm("Congratulations, you won! Play again?");
  } else {
    playAgain = confirm("You've lost! Play again?");
  }

  if (playAgain) {
    initWordGuessingGame();
  }
}

// displays remaining attempts
function displayAttemptsRemaining(attempts) {
  const el = document.getElementById('attempts-remaining-display');

  el.textContent = attempts;
}

// handles letter selection by user
function handleGuessedLetter(event) {
  const { target } = event;
  const guessedChar = target.dataset.character;

  // disable letter from being selected again
  target.setAttribute('style', 'pointer-events: none;');

  // check if chosen word contains selected character
  if (chosenWord.includes(guessedChar)) {
    target.classList.add('border-success');

    // display characters
    hiddenWord = chosenWord.map((c, idx) => {
      if (
        hiddenWord[idx] === '_' &&
        c === guessedChar
      ) {
        return c;
      }

      return hiddenWord[idx];
    });

    buildWordDisplay(hiddenWord);

    if (chosenWord.join('') === hiddenWord.join('')) {
      handleGameEnd(true);
    }

  } else {
    target.classList.add('border-danger');

    displayAttemptsRemaining(--attemptsRemaining);

    if (attemptsRemaining === 0) {
      handleGameEnd(false);
    }
  }
}

// starts/resets game
function initWordGuessingGame() {
  attemptsRemaining = initialAttempts;
  document.getElementById('letters-display').setAttribute('style', 'pointer-events: all;');

  chosenWord = getRandomWord(words).split('');
  hiddenWord = Array.from(chosenWord, (char) => char.trim() === '' ? ' ' : '_');

  buildWordDisplay(hiddenWord);
  displayAttemptsRemaining(attemptsRemaining);

  const alphabet = generateAlphabet();
  buildAlphabetDisplay(alphabet);
}


// ********************************************************** Clock
// initializes clock display
function initClock() {
  const clockEl = document.getElementById('clock-display');

  startClock(clockEl);
}

// sets clock time
function startClock() {
  const date = new Date(); /* creating object of Date class */
  const hour = updateTime(date.getHours());
  const min = updateTime(date.getMinutes());
  const sec = updateTime(date.getSeconds());

  document.getElementById("clock-display").innerText = hour + " : " + min + " : " + sec;

  setTimeout(startClock, 1000);
}

// adjusts time display
function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}
