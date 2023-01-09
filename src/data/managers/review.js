import * as R from 'ramda';
import { getIdsObject, getQueriesString } from 'with-resources/build/lib/utils';
import { httpPost } from '../../api/rest';
import adapters from '../adapters';

const DM = async ({ method, input }) => ({ [method]: await DM[method](input) });

DM.retrieveOne = async ({ params: { ids }, queries, content }) => R.pipe(
  R.juxt([
    R.pipe(R.prop('ids'), getIdsObject),
    R.pipe(R.prop('queries'), getQueriesString),
    R.prop('content'),
  ]),
  ([{ movieId }, queries, content]) => R.pipe(
    (queriesString) => httpPost(`movie/${movieId}/rating${queriesString}`, content),
    (response) => response.then(adapters.review.retrieveOne.be2fe),
  )(queries),
)({ ids, queries, content });
export default DM;
