import isValidEmail from 'is-valid-email';
import validUrl from 'valid-url';

const checkEmailOnDB = (email, users) => users?.find(user => user.email === email);
const checkEmail = (email, users) => isValidEmail(email) && !checkEmailOnDB(email, users) ? true: false;
const checkEmailOnRegister = (email) => isValidEmail(email);
const checkPassword = (password, passRepeat) => password === passRepeat ? true : false;


const checkUrl = (url) => validUrl.isUri(url);


export {
  checkEmail,
  checkEmailOnRegister,
  checkPassword,
  checkUrl,
  checkEmailOnDB
}