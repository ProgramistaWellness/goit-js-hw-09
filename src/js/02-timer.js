import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');

let timerId = null;

startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => {
    const startDate = new Date();
    const endDate = selectedDates[0];
    const startDateMs = startDate.getTime();
    const endDateMs = endDate.getTime();
    const remainingMs = endDateMs - startDateMs;

    if (remainingMs > 0) {
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', () => {
        let counter = remainingMs;

        timerId = setInterval(() => {
          counter -= 1000;
          if (counter >= 0) {
            const convertedCounter = convertMs(counter);
            function addLeadingZero(value) {
              return value.toString().padStart(2, '0');
            }
            timerDays.textContent = addLeadingZero(convertedCounter.days);
            timerHours.textContent = addLeadingZero(convertedCounter.hours);
            timerMinutes.textContent = addLeadingZero(convertedCounter.minutes);
            timerSeconds.textContent = addLeadingZero(convertedCounter.seconds);
          }
        }, 1000);
      });
    } else {
      startBtn.setAttribute('disabled', 'disabled');
      window.alert('Please choose a date in the future');
    }
  },
};

const fp = flatpickr('#datetime-picker', options); // flatpickr

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
