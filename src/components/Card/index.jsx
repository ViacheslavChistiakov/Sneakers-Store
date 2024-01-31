import React from "react";
import ContentLoader from "react-content-loader"
import styles from "./Card.module.scss"
import AppContext from "../../Context";


function Card({ id,  imageUrl, price, title, onClickFavourite, onClickPlus, favorited = false, added = false, isLoading = false}) {

  const { getAddedItems } = React.useContext(AppContext);
  const [isFavourite, setIsFavourite] = React.useState(favorited);
  const obj = { id, parentId : id, title, imageUrl, price};

  const handleClick = () => {
      onClickPlus(obj);
  }

  const onClickFav = () => {
    onClickFavourite(obj);
    setIsFavourite(!isFavourite);
  }


    return (
        <div className={styles.card}>
          {
            isLoading ?    <ContentLoader 
            speed={2}
            width={150}
            height={187}
            viewBox="0 0 150 187"
            backgroundColor="#dda2a2"
            foregroundColor="#ededed"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
            <rect x="0" y="109" rx="3" ry="3" width="150" height="16" /> 
            <rect x="0" y="133" rx="3" ry="3" width="93" height="15" /> 
            <rect x="0" y="163" rx="8" ry="8" width="80" height="24" /> 
            <rect x="105" y="155" rx="8" ry="8" width="32" height="32" />
          </ContentLoader> :        <><div className={styles.favourite}  onClick={onClickFav}>
        {onClickFavourite && (<img src={isFavourite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}/>)}
        </div>
        <img width={133} height={112} src={imageUrl} alt="item-1" />
        <h5>{title}</h5>
        <div className="d-flex justify-beetwen align-center" style={{paddingTop: '10px'}}>
        <div className="d-flex flex-column">
        <span>Price:</span>
        <b>{price} .USD</b>
        </div>
          {onClickPlus &&  (<img className={styles.plus} onClick={handleClick} src={getAddedItems(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="Plus" />)} 
        </div></>
          }
    </div>
    )
}

export default Card;