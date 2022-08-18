import { schema as validationSchema } from './validation.schema.js';

function formSubmitHandler() {
  const loginForm = document.querySelector('.login-form');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    Promise.resolve()
      .then(clearErrors)
      .then(getFormData)
      .then(validateForm)
      .then(onSubmitSuccess)
      .catch(showErrors);
  });
}

function clearErrors() {
  const errors = Array.from(document.querySelectorAll('input'));

  for (let i = 0; i < errors.length; i++) {
    errors[i].classList.remove('error');
    
    if (errors[i].nextElementSibling) {
      errors[i].nextElementSibling.remove();
    }
  }
}

function getFormData() {
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;
  return {
    email,
    password,
  };
}

async function validateForm(obj) {
  try {
    await validationSchema.validate(obj, { abortEarly: false });
  } catch (err) {
    throw err;
  }
  return obj
}

async function onSubmitSuccess(obj) {
  const res = await obj;
  console.log('Submit Success', res);
}

function showErrors({ inner }) {
  const errors = {};

  for (let i = 0; i < inner.length; i++) {
    const errorPath = inner[i].path;

    if (!errors.hasOwnProperty(inner[i].path)) {
      errors[errorPath] = inner[i].message;
    }
  }

  for (const key in errors) {
    const input = document.querySelector(`input[type=${key}]`);
    input.classList.add('error');

    const div = document.createElement('div');
    div.classList.add('form-group__error');
    div.innerHTML = `<p>${errors[key]}</p>`;

    input.insertAdjacentElement('afterend', div);
  }
}

export default formSubmitHandler;

