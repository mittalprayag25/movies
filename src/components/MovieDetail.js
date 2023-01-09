import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import classNames from 'classnames';
import CastCard from './CastCard';

const styles = {
  rootContainter: {
    marginTop: 20,
  },
  card: {
    maxWidth: '70%',
    margin: '0 auto',
  },
  topBilledCastsCard: {
    padding: 5,
  },
  media: {
    maxWidth: 300,
    objectFit: 'cover',
  },
  ratingContainer: {
    width: 300,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
};

export default withStyles(styles)(
  ({
    classes,
    browse,
    movie: {
      title,
      overview,
      poster,
      released,
      runtime,
      updateRating,
      rating,
      credits: { casts = [] } = {},
    } = {},
  }) => {
    const [open, setOpen] = useState(rating === 0 || !rating);

    const changeRating = (num) => {
      setOpen(false);
      if (num) {
        updateRating(num);
      }
    };

    const close = () => {
      setOpen(false);
    };

    return (
      <Grid container spacing={6} className={classes.rootContainter}>
        <Grid item xs={12}>
          <Card elevation={0} className={classes.card}>
            <Button variant='contained' color='primary' onClick={browse}>
              Back To Movie List
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Grid container>
              <Grid item>
                <CardMedia
                  component='img'
                  alt={title}
                  className={classes.media}
                  image={poster}
                  title={title}
                />
              </Grid>
              <Grid item xs>
                <CardContent>
                  <Typography variant='h3'>{title}</Typography>
                  <Typography variant='overline' gutterBottom>
                    {moment(released).isValid()
                      ? moment(released).format('MMMM DD, YYYY')
                      : 'Unknown release date'}
                  </Typography>
                  <Typography variant='h6'>Runtime</Typography>
                  <Typography gutterBottom>
                    {Math.floor(runtime / 60)}h {runtime % 60}m
                  </Typography>
                  <Typography variant='h6'>Overview</Typography>
                  <Typography gutterBottom>{overview}</Typography>
                  {rating > 0 ? (
                    <Rating
                      name='simple-controlled'
                      value={rating}
                      onChange={(event, newValue) => changeRating(newValue)}
                    />
                  ) : null}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            elevation={0}
            className={classNames(classes.card, classes.topBilledCastsCard)}
          >
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='h5'>Top Billed Cast</Typography>
              </Grid>
              <Grid item xs={12} container spacing={5}>
                {casts.map((cast) => (
                  <Grid key={cast.id} item>
                    <CastCard cast={cast} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Dialog open={open} data-testid='movie-detail-dialog'>
          <CardContent className={classes.ratingContainer}>
            <CloseIcon
              className={classes.closeIcon}
              onClick={close}
              data-testid='close-icon'
            />
            <Typography variant='h6'>Did you like the movie?</Typography>
            <Rating
              name='simple-controlled'
              data-testid='movie-detail-ratings'
              value={rating}
              onChange={(event, newValue) => changeRating(newValue)}
            />
          </CardContent>
        </Dialog>
      </Grid>
    );
  },
);
