import React, { useState, useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount,food_list,cartItem,url,token } = useContext(StoreContext);
  const navigate = useNavigate()
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zipCode: "",
    country: "",
    city:"",
    state:"",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  const handleProceedToPayment = async (e) =>  {
    e.preventDefault(); // Prevent form submission
    let orderItems = []
    food_list.map((item)=>{
      if(cartItem[item._id]>0){
        let itemInfo = item;
        itemInfo.quantity = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData ={
      address: deliveryInfo,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    try{
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      console.log(response.data)
      const {session_url} = response.data
      window.location.replace(session_url)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(!token){
      Navigate('/cart')
    }
    else if(getTotalCartAmount()==0)
      Navigate('/cart')
  },[token])

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 29;
  const total = getTotalCartAmount() + deliveryFee;

  return (
    <div className="place-order">
      <div className="delivery-info">
        <h2>Delivery Information</h2>
        <form onSubmit={handleProceedToPayment}>
          <div className="row">
            <input required type="text" name="firstName" placeholder="First Name" value={deliveryInfo.firstName} onChange={(e)=>onChangeHandler(e)}  />
            <input required type="text" name="lastName" placeholder="Last Name" value={deliveryInfo.lastName} onChange={(e)=>onChangeHandler(e)} />
          </div>
          <input required type="email" name="email" placeholder="Email address" value={deliveryInfo.email} onChange={(e)=>onChangeHandler(e)} />
          <input required type="text" name="street" placeholder="Street" value={deliveryInfo.street} onChange={(e)=>onChangeHandler(e)} />
          <div className="row">
            <input required type="text" name="zipCode" placeholder="Zip Code" value={deliveryInfo.zipCode} onChange={(e)=>onChangeHandler(e)} />
            <input required type="text" name="country" placeholder="Country" value={deliveryInfo.country} onChange={(e)=>onChangeHandler(e)}  />
          </div>
          <div className="row">
            <input required type="text" name="city" placeholder="City" value={deliveryInfo.city} onChange={(e)=>onChangeHandler(e)} />
            <input required type="text" name="state" placeholder="State" value={deliveryInfo.state} onChange={(e)=>onChangeHandler(e)}  />
          </div>
          <input required type="text" name="phone" placeholder="Phone" value={deliveryInfo.phone} onChange={(e)=>onChangeHandler(e)}  />
        </form>
      </div>
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹{getTotalCartAmount()==0?0:2}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>₹{getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
        </div>
        <hr />
        <br />
        <button onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default PlaceOrder