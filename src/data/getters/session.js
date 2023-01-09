import * as R from 'ramda';
import { resourceTypes } from 'with-resources';

/*
**************************************************
  State Getters
**************************************************
*/
const RESOURCE_TYPE = resourceTypes.SESSION;

const getSession = ({
  root,
  defaultValue = {
    guest_session_id: '',
  },
} = {}) => R.pipe(
  R.pathOr(
    defaultValue,
    R.concat(root ? ['resources'] : [], [RESOURCE_TYPE, 'retrieveOne']),
  ),
  R.when(R.pipe(R.keys, R.length, R.lte(R.__, 1)), R.always(defaultValue)),
  R.pick(['guest_session_id']),
);

export default {
  getSession,
};
