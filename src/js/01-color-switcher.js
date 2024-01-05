function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify Option
Notify.init({
  position: 'center-top',
  cssAnimationStyle: 'zoom',
  cssAnimationDuration: 250,
  timeout: 1500,
});

//     RANDOM BACKGROUND COLOR CHANGE EVERY ONE SECOND
// ==============================================================

// DOM variables
const stopBtn = document.querySelector('button[data-stop]'); // button ref with data- stop attribute
const startBtn = document.querySelector('button[data-start]'); // button ref with data-start attribute
const buttons = document.querySelectorAll('button'); // All button reference

// default Button and default Interval variable
stopBtn.disabled = true;
let loadHex;

// optional default style
startBtn.style.backgroundColor = 'rgba(0,255,0,1)';
stopBtn.style.backgroundColor = 'rgba(255,0,0,0.5)';

// general style using forEach() method by distribute to all button element reference
buttons.forEach(button => {
  button.style.color = '#fcf';
  button.style.fontSize = '20px';
  button.style.border = '1px solid #fff';
  button.style.borderRadius = '80%/50px';
  button.style.padding = '5px 15px';
  button.style.boxShadow = '0 0 1px #000';
  button.style.textShadow = '0 0 3px #000';
  button.style.transition =
    'text-decoration-color ease 250ms,background-color ease 250ms';
});

//  METHOD
// ===============================================

// function set a background color with transition
const hexPlay = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

// addtional function to line-through text
const disabledBtn = d => {
  buttons.forEach(button => {
    button.style.textDecoration = 'none';
    button.style.textDecorationColor = 'transparent';
  });
  d.style.textDecoration = 'line-through #888';
};

disabledBtn(stopBtn);

// ==================================================

// Event action click for button Start
startBtn.addEventListener('click', function (event) {
  // set button into disabled and enabled
  startBtn.disabled = true;
  stopBtn.disabled = false;

  // line text style
  disabledBtn(event.currentTarget);

  // addtional styling
  startBtn.style.backgroundColor = 'rgba(0,255,0,0.3)';
  stopBtn.style.backgroundColor = 'rgba(255,0,0,1)';

  // reference variable for setInterval() method [1 is equivalent to 1 milisecond]
  loadHex = setInterval(hexPlay, 1000); // rendering infinite background color command from hexPlay function

  // First Queue rendering to fill color in the background before setInterval() method
  hexPlay();
  document.body.style.transition = 'background-color ease-in-out 500ms';

  // Notify Play mode message
  Notify.success('PLAY');
});

// Event action click for button Stop
stopBtn.addEventListener('click', function (event) {
  // set button into disabled and enabled
  stopBtn.disabled = true;
  startBtn.disabled = false;

  // line text style
  disabledBtn(event.currentTarget);

  // addtional styling
  startBtn.style.backgroundColor = 'rgba(0,255,0,1)';
  stopBtn.style.backgroundColor = 'rgba(255,0,0,0.5)';

  // by setting the variable inside the clearInterval() method will initiate clearing the variable
  clearInterval(loadHex);

  // Notify Stop mode message
  Notify.failure('STOP');
});
