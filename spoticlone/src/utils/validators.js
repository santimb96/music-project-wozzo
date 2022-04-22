import isValidEmail from 'is-valid-email';
import validUrl from 'valid-url';

const checkEmailOnDB = (email, users) => users?.find(user => user.email === email);
const checkEmail = (email, users) => isValidEmail(email) && !checkEmailOnDB(email, users) ? true: false;
const checkPassword = (password, passRepeat) => password === passRepeat ? true : false;


const checkUrl = (url) => validUrl.isUri(url);


export {
  checkEmail,
  checkPassword,
  checkUrl,
  checkEmailOnDB
}