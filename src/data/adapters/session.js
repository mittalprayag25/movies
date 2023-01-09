import * as R from 'ramda';

const retrieveOne = {
  fe2be: R.identity,
  be2fe: ({ guest_session_id, ...rest }) => ({
    session: {
      ...rest,
      guest_session_id,
    },
  }),
};

export default {
  retrieveOne,
};
