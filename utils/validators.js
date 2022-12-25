const validateEmail = (email) => {
  const emailregex = RegExp(/^(?=.{1,81}$)[\w\.-]+@[\w\.-]+\.\w{2,4}$/);
  return emailregex.test(email);
};

const validateName = (name) => {
  const regex = RegExp(/^[\w\d\s]{1,20}$/);
  return regex.test(name);
};
const validatePassword = (password) => {
  const regex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  return regex.test(password);
};

module.exports = { validateName, validateEmail, validatePassword };
