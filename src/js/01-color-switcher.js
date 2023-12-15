function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.body;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

startBtn.addEventListener('click', event => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  event.currentTarget.setAttribute('disabled', 'disabled');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
});
