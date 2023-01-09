import { render, fireEvent, screen } from '@testing-library/react';
import MovieDetail from './MovieDetail';
import '@testing-library/jest-dom/extend-expect';

describe('The MovieDetail component', async () => {
  it('should render movie title and release date', () => {
    const { container } = render(
      <MovieDetail
        movie={{
          title: 'I am a test movie',
          poster:
            'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
          released: new Date('March 24, 2021'),
          runtime: 120,
          rating: 0,
        }}
      />,
      {},
    );
    expect(container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId('close-icon'));
  });

  it('should render Unknown release date with incorrect date', () => {
    const { container } = render(
      <MovieDetail
        movie={{
          title: 'I am a test movie',
          poster:
            'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
          released: 'asdf',
          rating: 2,
        }}
      />,
      {},
    );
    expect(container).toMatchSnapshot();
  });
});
