import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
        alert("Please choose a date in the future");
        return;
      }
  
      startButton.removeAttribute('disabled');
    },
  };
  
  flatpickr("#datetime-picker", options);

  const startButton = document.querySelector('[data-start]');
  const datetimePicker = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay(time) {
  daysValue.textContent = addLeadingZero(time.days);
  hoursValue.textContent = addLeadingZero(time.hours);
  minutesValue.textContent = addLeadingZero(time.minutes);
  secondsValue.textContent = addLeadingZero(time.seconds);
}

function startCountdown(endDate) {
  clearInterval(countdownInterval);

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const remainingTime = endDate - currentTime;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(convertMs(0));
      startButton.setAttribute('disabled', true);
      return;
    }

    const time = convertMs(remainingTime);
    updateTimerDisplay(time);
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

startButton.addEventListener('click', function () {
  const endDate = flatpickr.parseDate(datetimePicker.value, "Y-m-d H:i");
  startCountdown(endDate);
});
