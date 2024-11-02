import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import '../css/styles.css';
import { showToast } from './izi-toast';
// flatpickr
const dateTimePicker = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const currentDate = new Date();
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentDate.getTime()) {
      showToast('error', 'Please, choose a date in the future', 'Error');
      startButton.disabled = true;
      startButton.removeEventListener('click', startTimer);
    } else {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
      startButton.addEventListener('click', startTimer);
    }
  },
};

flatpickr(dateTimePicker, options);

function startTimer() {
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  if (!userSelectedDate || userSelectedDate < currentDate) {
    return;
  }

  const timerInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      dateTimePicker.disabled = false;
      return;
    }

    fillTimer(timeDifference);
  }, 1000);
}
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

export function fillTimer(timeDifference) {
  const timeObject = convertMs(timeDifference);
  daysElem.textContent = addLeadingZero(timeObject.days);
  hoursElem.textContent = addLeadingZero(timeObject.hours);
  minutesElem.textContent = addLeadingZero(timeObject.minutes);
  secondsElem.textContent = String(timeObject.seconds).padStart(2, '0');
}

function addLeadingZero(value) {
  return value < 10 ? String(value).padStart(2, '0') : String(value);
}

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
