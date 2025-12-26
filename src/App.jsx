import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice"; // Removed unused clearCart if not required by UI
import "./CartItem.css";

/**
 * CartItem Component
 * Manages the display and logic for the shopping cart, including
 * quantity adjustments, item removal, and subtotal/total calculations.
 */
function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calculates the total monetary value of all items currently in the cart.
   * Logic: Sums (price * quantity) for every item.
   */
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.replace("$", ""));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  /**
   * Calculates the total cost for a specific individual item type.
   */
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace("$", ""));
    return (price * item.quantity).toFixed(2);
  };

  /**
   * Increases the quantity of an item in the store.
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Decreases item quantity. If quantity reaches 0, the item is removed.
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Logic for removing item if quantity hits 0
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Removes an item completely from the Redux state.
   */
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => onContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
