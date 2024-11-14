import { useEffect, useState } from "react";
import { LocalStorageKeys } from "../constants";
import { getLocalStorageItem, setLocalStorageItem } from "../utils";

export const useFavorites = (selectedCity: string) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = () => {
    const isFavorite = favorites.includes(selectedCity);
    if (isFavorite) {
      removeFavorite(selectedCity);
    } else addFavorite(selectedCity);
  };

  const addFavorite = (cityName: string) => {
    setFavorites((prevFavorites) => {
      const updatedList = [...prevFavorites, cityName];
      saveFavoritesToLocalStorage(updatedList);
      return updatedList;
    });
  };

  const removeFavorite = (cityName: string) => {
    setFavorites((prevFavorites) => {
      const updatedList = prevFavorites.filter((city) => city !== cityName);
      saveFavoritesToLocalStorage(updatedList);
      return updatedList;
    });
  };

  const saveFavoritesToLocalStorage = (favorites: string[]) => {
    setLocalStorageItem(LocalStorageKeys.FavoriteCities, favorites);
  };

  // Load favorite cities from localStorage on mount
  useEffect(() => {
    const savedFavorites = getLocalStorageItem(
      LocalStorageKeys.FavoriteCities,
      []
    );
    setFavorites(savedFavorites);
  }, []);

  return { favorites, toggleFavorite, removeFavorite };
};
