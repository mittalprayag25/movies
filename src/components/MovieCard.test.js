import { render } from '@testing-library/react';
import MovieCard from './MovieCard';
import '@testing-library/jest-dom/extend-expect';

describe('The MovieCard component', () => {
  it('should render movie title and release date', () => {
    const { container } = render(
      <MovieCard
        movie={{
          title: 'I am a test movie',
          poster:
            'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
          released: new Date('March 24, 2021'),
        }}
      />,
      {},
    );
    expect(container).toHaveTextContent('I am a test movie');
    expect(container).toHaveTextContent('March 24, 2021');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render rating if provided and greater then zero', () => {
    const { container } = render(
      <MovieCard
        movie={{
          title: 'I am a test movie',
          poster:
            'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
          released: new Date('March 24, 2021'),
          rating: 2,
        }}
      />,
      {},
    );
    expect(container).toHaveTextContent('1 Star2 Stars3 Stars4 Stars5 Stars');
    expect(container).toMatchSnapshot();
  });

  it('should render text for incorrect date', () => {
    const { container } = render(
      <MovieCard
        movie={{
          title: 'I am a test movie',
          poster:
            'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
          released: 'aas',
          rating: 0,
        }}
      />,
      {},
    );
    expect(container).toHaveTextContent(
      'I am a test movieUnknown release date',
    );
    expect(container).toMatchSnapshot();
  });

  it('should render when card is small', () => {
    const { container } = render(
      <MovieCard
        movie={{
          title: 'I am a test movie',
          poster:
            'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
          released: new Date('March 24, 2021'),
        }}
        small={true}
      />,
      {},
    );
    expect(container).toMatchSnapshot();
  });
});
