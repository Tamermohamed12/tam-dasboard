import React, { useState } from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import Checkout from '../Checkout';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return (
      <Checkout
        onBack={() => setShowCheckout(false)}
        onComplete={(orderData) => {
          setShowCheckout(false);
          alert(`Order ${orderData.orderId} placed successfully!`);
        }}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img
                  src={item.thumbnail || 'https://via.placeholder.com/120?text=Product'}
                  alt={item.title}
                />
              </div>
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <div className="cart-item-category">{item.category || 'General'}</div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items ({getCartItemsCount()})</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
