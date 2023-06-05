const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startColorChange() {
    intervalId = setInterval(changeBackgroundColor, 1000);
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}

function stopColorChange() {
  clearInterval(intervalId);
}

startButton.addEventListener('click', function () {
  startColorChange();
  startButton.toggleAttribute('disabled');
});

stopButton.addEventListener('click', function () {
  stopColorChange();
  startButton.toggleAttribute('disabled');
});