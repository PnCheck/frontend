export const __BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://ms-tsjs.herokuapp.com'
    : 'http://localhost:5000';
