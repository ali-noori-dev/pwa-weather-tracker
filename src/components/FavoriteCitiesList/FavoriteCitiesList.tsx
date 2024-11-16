import { BsBookmarkFill } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { IconButton } from "../common";
import "./FavoriteCitiesList.scss";

interface FavoriteCitiesListProps {
  favorites: string[];
  removeFavorite: (cityName: string) => void;
}

const FavoriteCitiesList: React.FC<FavoriteCitiesListProps> = ({
  favorites,
  removeFavorite,
}) => {
  return (
    <>
      {favorites.map((item) => (
        <li key={item} className="autocomplete__option favorite-item">
          <BsBookmarkFill className="favorite-item__bookmark-icon" />

          <span className="favorite-item__name">{item}</span>

          <IconButton
            ariaLabel="Remove favorite"
            onClick={() => removeFavorite(item)}
            className="favorite-item__remove-button"
          >
            <MdClear fontSize={20} />
          </IconButton>
        </li>
      ))}
    </>
  );
};

export default FavoriteCitiesList;
