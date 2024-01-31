import React from "react";
import Card from "../components/Card";
import AppContext from "../Context";


function Favorites() {
  const { favourites, onAddToFavorite } = React.useContext(AppContext);

    return (
        <div className="content p-40 df">
  <div className="d-flex flex-wrap">
  {favourites.map((item, index) => (
        <Card
        key={index} 
        favorited={true}
        onClickFavourite={onAddToFavorite}
        {...item}
        />
      ))}
  </div>
    </div>
    )
};

export default Favorites;