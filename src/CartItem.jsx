import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleQuantityChange = (name, delta) => {
    const item = cartItems.find((i) => i.name === name);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        dispatch(updateQuantity({ name, quantity: newQuantity }));
      } else {
        dispatch(removeItem(name));
      }
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    alert("🛒 Checkout feature not implemented yet!");
  };

  const totalCost = cartItems.reduce((total, item) => {
    const numericCost = parseFloat(item.cost.replace("$", ""));
    return total + numericCost * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h1>Total Cart Amount: ${totalCost.toFixed(2)}</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.cost}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.name, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.name, 1)}>+</button>
                </div>
                <p>Total: ${(parseFloat(item.cost.replace("$", "")) * item.quantity).toFixed(2)}</p>
                <button
                  className="delete-button"
                  onClick={() => handleRemove(item.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="cart-buttons">
            <button className="continue-button" onClick={onContinueShopping}>
              Continue Shopping
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
