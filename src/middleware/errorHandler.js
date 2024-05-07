import BadRequestError from "./BadRequestError.js";
const errorHandler = (err, req, res, next) => {
  console.error(err);
  
  if (err instanceof BadRequestError) {
    res.status(400).json({ message: 'Veld ontbreekt' });
  } else {
      res.status(500).json({ message: 'An error occurred on the server, please double-check your request!' });
  }
};

export default errorHandler;