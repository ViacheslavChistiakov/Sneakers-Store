import React from "react";
import Card from "../components/Card";



function Home({ items,   searchValue, setSearchValue,  onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading }) {
  const renderItems = () =>  {
    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (isLoading ? [...Array(8)] : filteredItems.slice(0, 4)).map((item, index) => (
    <Card
    key={index} 
    onClickFavourite={(obj) => onAddToFavorite(obj)} 
    onClickPlus={(obj) => onAddToCart(obj)}
    isLoading={isLoading}
    {...item}
    />
  )) 
  }
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `Search to request: "${searchValue}"` : 'All shoes'}</h1>
            <div className="searchBlock">
              <img src='img/search.svg' alt="Search" />
             {searchValue &&  <img onClick={() => setSearchValue('')} className="clear cu-p" src='/img/btn-remove.svg' alt="btn-clear" /> }
                  <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
          </div>
        </div>
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
    )
};

export default Home;