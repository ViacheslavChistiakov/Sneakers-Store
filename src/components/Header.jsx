import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from "./hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
     <Link to={'/'}>
        <div className="d-flex align-center">
        <img width={40} height={40} src='/img/main-logo.png' alt="logo"/>
          <div className="headerInfo">
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className="opacity-5">Shoes Store</p>
          </div>
      </div>
      </Link> 
          <ul className="d-flex">
            <li className="mr-30 cu-p" onClick={props.onClickCart}>
              <img width={18} height={18} src='/img/buy.svg' alt="buy"/>
              <span>{totalPrice} руб.</span>
            </li>
            <Link to={'/favorites'}>
            <li className="mr-30 cu-p">
             <img width={18} height={18} src='/img/fuv.svg' alt="fuv" />
               <span>Favourite</span>
            </li>
            </Link>
            <Link to={'/orders'}>
            <li className="mr-30 cu-p"><img width={18} height={18} src='/img/Prof.svg' alt="prof" />
               <span>Profile</span>
            </li>
            </Link>
          </ul>
      </header>
    )
};

export default Header;