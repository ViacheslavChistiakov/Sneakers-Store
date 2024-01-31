import React from 'react'
import AppContext from '../Context';


const Info = ({ title, description, image }) => {
    const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
<img className="mb-20" width="120px"  src={image} alt="empy-cart" />
  <h2>{title}</h2>
  <p className="opacity-6">{description}</p>
  <button className="greenButton" onClick={() => setCartOpened(false)}>
    <img  src='img/arror.svg' alt="arror"/>Вернуться назад
    </button>
</div>
  )
}

export default Info;
