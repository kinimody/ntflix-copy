import React from 'react';


import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';

export interface MovieInterface {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: string;
    genre: string;
  }

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="sm:px-8 sm:py-8 mx-1 sm:mx-0 sm:my-0">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mt-2 sm:mt-0 ml-2 opacity-80">{title}</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1  sm:gap-2  ">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;