export const __BASE_URL__ =
  process.env.NODE_ENV === 'production'
    ? 'https://ms-tsjs.herokuapp.com'
    : 'http://localhost:5000';
export const __MODEL_URL__ =
  'https://raw.githubusercontent.com/PnCheck/model/main/models/js_model/model.json';
