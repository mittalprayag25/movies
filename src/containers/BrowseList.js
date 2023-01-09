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
import BrowseList from '../components/BrowseList';
import { withMovieRetrieveManyResource } from '../data/resources/movie';
import withSessionResource from '../data/resources/session';

const PAGE_SIZE = 20;

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

const BrowseListContainer = ({ classes, history }) => {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');

  const movieQuery = [
    { name: 'page', value: page + 1 },
    { name: 'query', value: keyword },
  ];
  const movieResource = useResources([
    withMovieRetrieveManyResource(movieQuery, page, keyword),
  ]);

  const { data, actionCreators } = useResources([withSessionResource()]);

  const { guest_session_id } = gettersOf(resourceTypes.SESSION).getSession()(
    data,
  );

  guest_session_id
    && !localStorage.getItem('guest_session_id')
    && localStorage.setItem('guest_session_id', guest_session_id);

  const createGuestSession = () => {
    actionCreators.session.ajax({
      cargo: {
        resourceType: resourceTypes.SESSION,
        method: 'retrieveOne',
        input: (() => ({}), []),
      },
    });
  };
  useEffect(() => {
    createGuestSession();
  }, []);

  const { list, totalPages } = gettersOf(resourceTypes.MOVIES).getMovies()(
    movieResource.data,
  );

  let movies = list.map(({ id, ...rest }) => ({
    ...rest,
    id,
    view: () => history.push(`/movie/${id}`),
  }));

  const convertMovieArrWithRating = (movies) => {
    const cachedMovies = JSON.parse(localStorage.getItem('ratedMovies'));
    if (cachedMovies !== null && cachedMovies.length >= 0) {
      return movies.map((mv) => {
        const cache = cachedMovies.find(
          (cm) => cm.movieId === mv.id.toString(),
        );
        const temp = mv;
        if (cache) {
          temp.rating = cache.rating;
        }
        return temp;
      });
    }
    return movies;
  };

  movies = convertMovieArrWithRating(movies);

  return (
    <>
      <BrowseList
        movies={movies}
        pagination={{
          page,
          pageSize: PAGE_SIZE,
          totalPages,
          changePage: setPage,
        }}
        searching={{
          keyword,
          search: (term) => {
            setPage(0);
            setKeyword(term);
          },
        }}
      />
      {R.prop(
        'loading',
        gettersOf(resourceTypes.MOVIES).getStatus()('retrieveMany')(
          movieResource.data,
        ),
      ) && (
        <Paper className={classes.overlay}>
          <CircularProgress className={classes.loading} />
        </Paper>
      )}
    </>
  );
};

export default R.compose(
  withRouter,
  withResourcesGetters,
  withStyles(styles),
)(BrowseListContainer);
