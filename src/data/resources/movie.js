import { resourceTypes } from 'with-resources';
import { useMemo } from 'react';

export const withMovieRetrieveManyResource = (queries, page, keyword) => ({
  resourceType: resourceTypes.MOVIES,
  method: 'retrieveMany',
  input: useMemo(
    () => ({
      params: {
        queries,
      },
    }),
    [page, keyword],
  ),
  options: { autorun: true },
});

export const withMovieRetrieveOneResource = (movieId) => ({
  resourceType: resourceTypes.MOVIES,
  method: 'retrieveOne',
  input: useMemo(
    () => ({
      params: {
        ids: [{ name: 'movieId', value: movieId }],
      },
    }),
    [movieId],
  ),
  options: { autorun: true },
});
