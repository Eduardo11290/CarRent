import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Link } from 'react-router-dom'; 
import './CartItem.css'; 

const CartItem = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
        total += item.cost * item.quantity;
    });
    return total;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckoutShopping = async () => {
    if (cart.length === 0) return;

    for (const item of cart) {
        const bookingData = {
            CarId: item.id,
            CarName: item.name,
            StartDate: item.startDate,
            EndDate: item.endDate,
            Days: item.quantity,
            TotalCost: item.cost * item.quantity
        };

        try {
            const response = await fetch('https://autorentpremium.runasp.net/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                console.error("Eroare la rezervare:", item.name);
            }
        } catch (error) {
            console.error("Eroare rețea:", error);
        }
    }

    alert('Rezervarea a fost trimisă cu succes! Datele au fost salvate pe server.');

  };
 

  return (
    <div className="cart-container">
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Link to="/cars" style={{ textDecoration: 'none', color: '#ff4d4d', fontWeight: 'bold', fontSize: '1.1rem' }}>
              ← Înapoi la Flotă
          </Link>
      </div>

      <h2 className="cart-title">Coșul tău de rezervări</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
            <p>Nu ai nicio mașină rezervată momentan.</p>
            <Link to="/cars">
                <button className="btn-checkout">Vezi Oferta Noastră</button>
            </Link>
        </div>
      ) : (
        <div>
            <div className="cart-items-list">
                {cart.map(item => (
                <div className="cart-item" key={item.id}>
                    <img className="cart-item-image" src={item.images ? item.images[0] : item.image} alt={item.name} />
                    
                    <div className="cart-item-details">
                        <div>
                            <div className="cart-item-name">{item.name}</div>
                            <div style={{color: '#aaa', fontSize: '0.9rem', marginBottom: '8px', marginTop: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '5px', display: 'inline-block'}}>
                                <span style={{color: '#ff4d4d', fontWeight: 'bold'}}>📅 Perioada:</span> {item.startDate || "Neselectat"} <span style={{color: '#777'}}>➝</span> {item.endDate || "Neselectat"}
                            </div>
                            <div className="cart-item-cost">€{item.cost} / zi</div>
                        </div>
                        
                        <div className="cart-item-quantity">
                            <button className="quantity-btn" onClick={() => handleDecrement(item)}>-</button>
                            <span className="cart-item-count">{item.quantity} Zile</span>
                            <button className="quantity-btn" onClick={() => handleIncrement(item)}>+</button>
                        </div>
                        
                        <div className="cart-item-actions">
                            <div className="cart-item-total">
                                Total: <strong style={{color: 'white'}}>€{item.cost * item.quantity}</strong>
                            </div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                                ✕ Șterge
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            
            <div className="cart-summary">
                <div className="total_cart_amount">
                    Total de plată: <strong>€{calculateTotalAmount()}</strong>
                </div>
                
                <div className="continue_shopping_btn">
                    <Link to="/cars">
                        <button className="btn-continue">Continuă Navigarea</button>
                    </Link>
                    <button className="btn-checkout" onClick={handleCheckoutShopping}>
                        Finalizează Rezervarea
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;