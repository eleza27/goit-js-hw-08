import throttle from 'lodash.throttle';

const formRef = document.querySelector('form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

const handler = event => {
  //   localStorage.setItem('email', inputRef.value);
  //   localStorage.setItem('message', textareaRef.value);
  const keyData = { email: inputRef.value, message: textareaRef.value };
  localStorage.setItem('feedback-form-state', JSON.stringify(keyData));
};

formRef.addEventListener('input', throttle(handler, 500));

const getKeyData = localStorage.getItem('feedback-form-state');
const lastKeyData = JSON.parse(getKeyData);
// console.log(JSON.parse(getKeyData));

const onLoadHandler = event => {
  if (lastKeyData !== null) {
    inputRef.value = lastKeyData.email;
    textareaRef.value = lastKeyData.message;
  }
};
addEventListener('load', onLoadHandler);

const onSubmitHandler = event => {
  event.preventDefault();
  localStorage.clear();
  formRef.reset();
};

formRef.addEventListener('submit', onSubmitHandler);
