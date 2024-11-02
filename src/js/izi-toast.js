import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const ERROR_COLOR = '#ef4040';
const SUCCESS_COLOR = '#59A10D';
const TOAST_TIMEOUT = 3000;
const TOAST_POSITION = 'topRight';
const icons = {
  error: new URL('../img/error-icon.svg', import.meta.url).href,
  fail: new URL('../img/fail-icon.svg', import.meta.url).href,
  success: new URL('../img/success-icon.svg', import.meta.url).href,
};

export function showToast(type, message, title = '') {
  const color = type === 'success' ? SUCCESS_COLOR : ERROR_COLOR;
  iziToast.show({
    title,
    titleColor: 'white',
    message,
    timeout: TOAST_TIMEOUT,
    iconColor: 'white',
    messageColor: 'white',
    position: TOAST_POSITION,
    close: false,
    iconUrl: icons[type],
    backgroundColor: color,
  });
}
