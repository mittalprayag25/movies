import { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import * as R from 'ramda';
import {
  withResourcesGetters,
  useResources,
  resourceTypes,
  gettersOf,
} from 'with-resources';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import MovieDetail from '../components/MovieDetail';
import { withMovieRetrieveOneResource } from '../data/resources/movie';
import withMovieReview from '../data/resources/review';

const TOP_CASTS = 5;

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    width: '100vw',
    height: '100vh',
    zIndex: 999,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const padToLongestName = (casts) => {
  const longest = (name) => R.reduce(
    (max, item) => Math.max(max, R.pipe(R.prop(name), R.length)(item)),
    0,
  );
  const longestName = longest('name')(casts);
  const longestCharacter = longest('character')(casts);
  return casts.map(({ name, character, ...rest }) => ({
    ...rest,
    name: name.padEnd(longestName, ' '),
    character: character.padEnd(longestCharacter, ' '),
  }));
};

const MovieDetailContainer = ({
  classes,
  history,
  match: { params: { movieId } = {} },
}) => {
  const [ratingVal, setRatingVal] = useState(0);

  const updateRating = (rating) => {
    setRatingVal(rating);
    let ratedMovies = [];
    const savedMoviesWithRating = getSavedMoviesWithRating();
    if (savedMoviesWithRating !== null && savedMoviesWithRating.length >= 0) {
      ratedMovies = savedMoviesWithRating;
    }

    const movieObj = movie;
    /* Check if movie has been rated earlier */
    if (!Object.prototype.hasOwnProperty.call(movieObj, 'rating')) {
      ratedMovies.push({ movieId, rating });
      saveMoviesWithRating(ratedMovies);
      return;
    }
    const index = R.findIndex(R.propEq('movieId', movie.id.toString()))(
      ratedMovies,
    );
    if (index > -1) {
      updateRatings(ratedMovies, rating, index);
    }
  };

  const updateRatings = (ratedMovies, rating, index) => {
    const movieAtIndex = ratedMovies[index];
    movieAtIndex.rating = rating;
    ratedMovies.splice(index, 1);
    ratedMovies.push(movieAtIndex);
    saveMoviesWithRating(ratedMovies);
  };

  const saveMoviesWithRating = (movies) => {
    localStorage.setItem('ratedMovies', JSON.stringify(movies));
  };

  const getSavedMoviesWithRating = () => JSON.parse(localStorage.getItem('ratedMovies'));

  const getModifiedMovieObject = (rawMovie) => {
    const savedMoviesWithRating = getSavedMoviesWithRating();
    if (!savedMoviesWithRating) {
      return rawMovie;
    }

    const rawMovieId = rawMovie.id.toString();
    const find = (obj) => obj.movieId === rawMovieId;
    const filterMovie = (data) => {
      const obj = { ...rawMovie, rating: data.rating };
      return obj;
    };

    const obj = R.map(filterMovie, R.filter(find, savedMoviesWithRating))[0]; // should not have more then one value though
    return obj || rawMovie;
  };

  const movieResource = useResources([withMovieRetrieveOneResource(movieId)]);

  const { actionCreators } = useResources([
    withMovieReview(ratingVal, movieId),
  ]);

  useEffect(() => {
    if (ratingVal > 0) {
      actionCreators.review.ajax({
        cargo: {
          resourceType: resourceTypes.REVIEW,
          method: 'retrieveOne',
          input: {
            params: {
              ids: [{ name: 'movieId', value: movieId }],
            },
            queries: [
              {
                name: 'guest_session_id',
                value: localStorage.getItem('guest_session_id'),
              },
            ],
            content: { value: ratingVal },
          },
        },
      });
    }
  }, [ratingVal]);

  let { movie } = gettersOf(resourceTypes.MOVIES).getMovie()(
    movieResource.data,
  );

  if (movie) {
    // If defined then modify the movie with rating
    movie = { ...movie, updateRating: (rating) => updateRating(rating) };
    movie = getModifiedMovieObject(movie); // Modified Movie Object with rating added
  }

  movie = R.pipe(
    R.juxt([
      R.pipe(
        R.pathOr([], ['credits', 'casts']),
        R.take(TOP_CASTS),
        padToLongestName,
        R.map(({ id, ...rest }) => ({
          ...rest,
          id,
          view: () => history.push(`/cast/${id}`),
        })),
      ),
      R.identity,
    ]),
    R.apply(R.assocPath(['credits', 'casts'])),
  )(movie);

  return R.prop(
    'loading',
    gettersOf(resourceTypes.MOVIES).getStatus()('retrieveOne')(
      movieResource.data,
    ),
  ) ? (
    <Paper className={classes.overlay}>
      <CircularProgress className={classes.loading} />
    </Paper>
    ) : (
    <MovieDetail movie={movie} browse={() => history.push('/')} />
    );
};

export default R.compose(
  withRouter,
  withResourcesGetters,
  withStyles(styles),
)(MovieDetailContainer);
