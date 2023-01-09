import * as R from 'ramda';

const retrieveOne = {
  fe2be: R.identity,
  be2fe: ({ status_message, ...rest }) => ({
    ...rest,
    status_message,
  }),
};

export default {
  retrieveOne,
};
