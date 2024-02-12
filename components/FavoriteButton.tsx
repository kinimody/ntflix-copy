import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  


  const { data: currentUser, mutate } = useCurrentUser();
 
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
  
  const Icon = isFavorite ? FiCheckCircle : FiPlusCircle;

  return (
   <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 flex justify-center items-center transition hover:border-neutral-300">
      <Icon  className="text-white group-hover/item:text-neutral-300 w-12 lg:w-14 h-12 lg:h-14" />
      
    </div> 
    
  )
}

export default FavoriteButton;