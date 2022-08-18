import formSubmitHandler from './formValidation.js';
import renderData from './fetchRequest.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('input').focus();
  renderData();
});

formSubmitHandler();

