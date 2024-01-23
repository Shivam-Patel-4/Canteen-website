import React from 'react';
import Cart from '../Components/Cart';
import '../Pages/CartPage.css';

const CartPage = ({ cart, totalCartPrice, handleRemoveFromCart, onClose }) => {
  return (
    <div className="cart-page">
      <button onClick={onClose} className="close-btn text-end">Close</button>
      <Cart className="cart-name" cart={cart} totalCartPrice={totalCartPrice} handleRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
}

export default CartPage;