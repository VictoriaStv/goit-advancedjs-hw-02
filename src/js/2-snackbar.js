import '../css/styles.css';
import { showToast } from './izi-toast';

const notificationForm = document.querySelector('.notification-form');

const PROMISE_STATE = 'fulfilled';

notificationForm.addEventListener('submit', handleNotificationSubmit);

function handleNotificationSubmit(e) {
  e.preventDefault();

  const delayInput = notificationForm.querySelector('input[name="delay"]');
  const selectedState = notificationForm.querySelector(
    'input[name="state"]:checked'
  );

  if (!delayInput.value || !selectedState) {
    return;
  }

  const delay = parseInt(delayInput.value, 10);
  const state = selectedState.value;

  generatePromise({ delay, shouldResolve: state === PROMISE_STATE })
    .then(({ message }) => showToast('success', message))
    .catch(({ message }) => showToast('fail', message));

  notificationForm.reset();
}

function generatePromise({ delay, shouldResolve = true }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = {
        message: `${
          shouldResolve ? 'Fulfilled' : 'Rejected'
        } promise in ${delay}ms`,
      };
      shouldResolve ? resolve(result) : reject(result);
    }, delay);
  });
}
