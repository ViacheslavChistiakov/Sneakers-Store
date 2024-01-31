import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import AppContext from "./Context";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";





function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isReady, setIsReady] = React.useState(true);


  const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
  }
  React.useEffect(() => {
    async function fetchData() {
      try {
       const [cartResponse, favResponse, itemsResponse] = await Promise.all([ 
        await axios.get('https://65985913668d248edf247e30.mockapi.io/api/stuff/cart'),
        await axios.get('https://65985913668d248edf247e30.mockapi.io/api/stuff/cart'), 
        await axios.get('https://65985913668d248edf247e30.mockapi.io/api/stuff/items')
      ]);

       
        setIsReady(false);
  
        setCartItems(cartResponse.data)
        setFavourites(favResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Some error with getting data =(');
        console.log(error);
      }
    }
    fetchData();
  },[]);
  const onAddToCart = async (obj) => {
      try {
        const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
        if (findItem) {
          setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
          await axios.delete(`https://65985913668d248edf247e30.mockapi.io/api/stuff/cart/${findItem.id}`) 
        } else {
          setCartItems((prev) => [...prev, obj])
          const { data } = await axios.post('https://65985913668d248edf247e30.mockapi.io/api/stuff/cart', obj)
          setCartItems((prev) => prev.map(item => {
            if (item.parentId === data.parentId){
              return {
                ...item,
                id: data.id
              }
            }
            return item;
          }));
        }
      } catch (error) {
        alert('Some error with adding cart =(');
        console.log(error);
      }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://65985913668d248edf247e30.mockapi.io/api/stuff/cart/${id}`)  
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Some error with removing from the cart =(');
      console.log(error);
    }
 };
  const onAddToFavorite =  async (obj) => {
    try {
      if (favourites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://65985913668d248edf247e30.mockapi.io/api/stuff/favorites/${obj.id}`)
        setFavourites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id))); 
      } else {
        const { data } = await axios.post('https://65985913668d248edf247e30.mockapi.io/api/stuff/favorites', obj)
        setFavourites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('failled to added in favorite')
      console.log(error);
    }

  }

  const getAddedItems = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <div className="wrapper clear">
      <AppContext.Provider value={{ items, cartItems, favourites, setCartItems, onAddToFavorite, onAddToCart, getAddedItems, setCartOpened  }}>
      <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
          {/* {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>} */}
          <Header onClickCart={() => setCartOpened(true)} /> 
         <Routes>
            <Route path="/" element={<Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isReady}
             />}/>
            <Route path="/favorites" element={<Favorites />}/>
            <Route path="/orders" element={<Orders />} />
         </Routes>
         </AppContext.Provider>
    </div>
  );
}

export default App;
