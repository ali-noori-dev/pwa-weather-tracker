interface FavoriteCitiesListProps {
  favorites: string[];
}

const FavoriteCitiesList: React.FC<FavoriteCitiesListProps> = ({
  favorites,
}) => {
  return (
    <ul>
      {favorites.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default FavoriteCitiesList;
