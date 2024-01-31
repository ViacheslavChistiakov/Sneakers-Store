import React from "react";
import styles from "./Drawer.module.scss";
import axios from "axios";
import Info from "../Info";
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://65985913668d248edf247e30.mockapi.io/api/stuff/orders', { items : cartItems })
      
      setOrderId(data.id)
      setIsOrderComplete(true);
      setCartItems([]);

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete(`https://65985913668d248edf247e30.mockapi.io/api/stuff/cart/${item.id}`);
      await delay(1000);
    }
    } catch (error) {
      alert('Falied with make order :(')
    }
    setIsLoading(false);
  }

  // {`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}
  // {styles.drawer}

    return (
    <div  className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">Busket <img className="cu-p" src='/img/btn-remove.svg' alt="btn-remove" onClick={onClose}/></h2>
      {
              items.length > 0 ? (
              <div className="d-flex flex-column flex">
              <div className="items flex">
              {items.map((obj) => {
                  return (
                    <> <div key={obj.id}  className="cartItem d-flex align-center">
                        <div style={{ backgroundImage: `url(${obj.imageUrl})` }}
                          className="cartItemImg">
                        </div>
                        <div className="mr-20 flex">
                          <p className="mb-5">{obj.title}</p>
                          <b>{obj.price}руб.</b>
                        </div>
                        <img onClick={() => onRemove(obj.id)} className="removeBtn" src='/img/btn-remove.svg' alt="btn-remove" />
                      </div></>
                  )
  })}
      </div>
          <div className="cartTotalBlock">
          <ul>
               <li className="d-flex">
                              <span>Total:</span>
                                  <div></div>
                                <b>{totalPrice} руб. </b>
                 </li>
                 <li className="d-flex">
                              <span>Tax 5%: </span>
                                  <div></div>
                                <b>{totalPrice / 100 * 5} руб. </b>
                </li>
          </ul>
          <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Declare order<img src='img/arror.svg' alt="arror"/></button>
      
            </div>
          </div>
              
      
      
      ): (
        <Info 
        title={isOrderComplete ? "Order is decorated!" : "Busket is empty" } 
        description={isOrderComplete ? `"Your order #${orderId} soon time will be transfer to delivery service"` : "Add someone shoes for making order"} 
        image={isOrderComplete ? "/img/complete-order.png" : "/img/empty-cart.jpg"} 
        />
      )
 }



          </div>

</div>
    )
};

export default Drawer;



