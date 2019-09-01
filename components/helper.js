import _ from 'lodash';

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

const sendErrorsFromDB = (res, dbErrors) => {
  const errors = [];
  _.forIn(dbErrors.errors, error => errors.push(error.message));
  return res.status(400).json({ errors });
};

const snapshotToObject = async (snapshot) => {
  let data = null;
  await snapshot.forEach((childSnapshot) => {
      data = childSnapshot.val();
  });
  return data;
};

export default {
  asyncMiddleware,
  sendErrorsFromDB,
  snapshotToObject
};
