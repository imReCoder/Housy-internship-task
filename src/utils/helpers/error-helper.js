import logger from '../logger.js';


export default (code, req, errorMessage) => {

  let userId = '';
  if (req && req.user && req.user._id) userId = req.user._id;

  logger(code, userId, errorMessage, 'Client Error', req);


  return {
    'resultMessage': errorMessage,
    'resultCode': code
  };
};
