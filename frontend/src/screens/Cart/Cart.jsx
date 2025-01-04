import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Cart = () => {
  const { food_list, cartItem, removeFromCart, addToCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />
        {food_list.map((food, index) => {
          if (cartItem[food._id] > 0)
            return (
              <>
                <div
                  className="cart-items-title"
                  key={index}
                >
                  <img src={url+"/images/"+food.image}alt=""/>
                  <p>{food.name}</p>
                  <p>{food.price}</p>
                  <div className="quantity-counter">
                    <img
                      src={assets.remove_icon_red}
                      onClick={() => removeFromCart(food._id)}
                      alt=""
                    />

                    <p>{cartItem[food._id]}</p>
                    <img
                      src={assets.add_icon_green}
                      onClick={() => addToCart(food._id)}
                      alt=""
                    />
                  </div>
                  <p>₹{cartItem[food._id] * food.price}</p>
                </div>
                <hr />
              </>
            );
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-box">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() == 0 ? 0 : 29}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount() == 0 ? 0 : getTotalCartAmount() + 29}</p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed to Checkout
          </button>
        </div>

        <div className="cart-promocode">
          <p>If you have the promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="Enter promo code"
            />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;