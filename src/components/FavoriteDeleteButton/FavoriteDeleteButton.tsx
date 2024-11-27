import { MdClear } from "react-icons/md";
import { IconButton, Tooltip } from "../common";
import "./FavoriteDeleteButton.scss";

interface FavoriteDeleteButton {
  onRemoveFavorite: VoidFunction;
}

const FavoriteDeleteButton: React.FC<FavoriteDeleteButton> = ({
  onRemoveFavorite,
}) => {
  return (
    <Tooltip title="Delete">
      <IconButton
        ariaLabel="Delete favorite"
        className="favorite-delete-button"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onRemoveFavorite();
        }}
      >
        <MdClear fontSize={20} />
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteDeleteButton;
