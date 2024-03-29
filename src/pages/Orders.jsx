import React from 'react'
import Card from '../components/Card';
import axios from 'axios';
import AppContext from '../Context';

const Orders = () => {
// const {onAddToCart} = React.useContext(AppContext) 
const [isLoading, setIsLoading] = React.useState(true);   
const [orders, setOrders] = React.useState([]);

React.useEffect(() => {
    (async() => {
        try {
            const { data } =  await axios.get('https://65985913668d248edf247e30.mockapi.io/api/stuff/orders');
            setOrders(data.reduce((prev, obj) => [... prev, ...obj.items], []))
            setIsLoading(false);
        } catch(error) {
            alert('sorry we catched some troubles with your orders')
        }
    })()
},[])


  return (
    <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
        <h1>My Orders</h1>
    </div>
    <div className="d-flex flex-wrap">
  {(isLoading ? [...Array(8)] : orders).map((item, index) => (
        <Card
             key={index} 
             isLoading={isLoading}
            {...item}
        />
      ))}
  </div>
</div>
  )
};

export default Orders;
