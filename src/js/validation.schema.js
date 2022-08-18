import { string, object } from 'yup';

export const schema = object().shape({
  email: string().required('Email is a required field').email(),
  password:
     string()
    .required('Password is a required field')
    .min(8, 'Password should contain min 8 symbols')
    .matches(
      /[a-zA-Z0-9]/,
      'Password can only contain Lattin letters and numbers'
    ),
});

