import isValidEmail from 'is-valid-email';
import validUrl from 'valid-url';

const checkEmail = (email) => isValidEmail(email) ? true: false;
const checkPassword = (password, passRepeat) => password === passRepeat ? true : false;


const checkUrl = (url) => validUrl.isUri(url);


export {
  checkEmail,
  checkPassword,
  checkUrl
}