import React from 'react';
import Cart from '../Components/Cart';
import '../Pages/CartPage.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const CartPage = ({ cart, totalCartPrice, handleRemoveFromCart, onClose, handleUpdateCart }) => {
  return (
    <div className="cart-page">
      <Link to="/"><button onClick={onClose} className="close-btn text-end text-white" aria-label="Close cart"><i className="bi bi-x-lg"></i></button></Link>

      <Cart cart={cart} totalCartPrice={totalCartPrice} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCart={handleUpdateCart} />
    </div>
  );
}

export default CartPage;
