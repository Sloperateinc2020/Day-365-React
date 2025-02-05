import React, { useState } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 30, quantity: 1 },
    { id: 2, name: 'Product 2', price: 50, quantity: 2 },
    { id: 3, name: 'Product 3', price: 20, quantity: 3 },
  ]);

  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const outerContainerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const cartItemsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  };

  const cartItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
  };

  const itemNameStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const itemDetailsStyle = {
    fontSize: '14px',
    color: '#555',
  };

  const removeButtonStyle = {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const checkoutContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #ddd',
    paddingTop: '20px',
  };

  const totalStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const checkoutButtonStyle = {
    backgroundColor: '#8a6ded',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  // For mobile view adjustments
  const mobileStyle = {
    fontSize: '14px',
    padding: '10px',
  };

  return (
    <div style={outerContainerStyle}>
      <h1 style={headerStyle}>Your Cart</h1>

      <div style={cartItemsContainerStyle}>
        {cartItems.map(item => (
          <div key={item.id} style={cartItemStyle}>
            <div>
              <p style={itemNameStyle}>{item.name}</p>
              <p style={itemDetailsStyle}>${item.price} x {item.quantity}</p>
            </div>
            <button style={removeButtonStyle} onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={checkoutContainerStyle}>
        <p style={totalStyle}>Total: ${calculateTotal().toFixed(2)}</p>
        <button style={checkoutButtonStyle}>Proceed to Checkout</button>
      </div>

      {/* Mobile Style Overrides */}
      <div style={mobileStyle}>
        <p style={{ fontSize: '12px', color: '#777' }}>If you're on mobile, swipe to view more details.</p>
      </div>
    </div>
  );
}
