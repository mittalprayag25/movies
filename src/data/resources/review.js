import { resourceTypes } from 'with-resources';
import { useMemo } from 'react';

const withMovieReview = (rating, movieId) => ({
  resourceType: resourceTypes.REVIEW,
  method: 'retrieveOne',
  input: useMemo(
    () => ({
      params: {
        ids: [{ name: 'movieId', value: movieId }],
      },
      queries: [
        {
          name: 'guest_session_id',
          value: localStorage.getItem('guest_session_id'),
        },
      ],
      content: { value: rating },
    }),
    [rating],
  ),
  options: { runOnInputChange: true },
});

export default withMovieReview;
