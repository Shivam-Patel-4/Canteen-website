import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import canteenLogo from './images/canteenLogo.png';
import './App.css';
import CartPage from '../src/Pages/CartPage';
import Home from './Pages/Home';
function App() {

  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };


  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  };
  

  useEffect(() => {
    const totalPrice = cart.reduce((total, cartItem) => total + cartItem.totalItemPrice, 0);
    setTotalCartPrice(totalPrice);
  }, [cart]);

  return (
    <Router>
      <header className='header-row'>
        <img src={canteenLogo} alt="logo" className='logo' />
        <Link to="/cart">
          <button type="button" className="btn position-relative cart-btn me-3">
            <i className="bi bi-bag-fill" style={{ fontSize: '25px', color: 'green' }}></i>
            <span className="translate-middle badge rounded-pill bg-danger">
              {cart.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </Link>
      </header>

      <Routes>
        <Route
          path='/'
          element={<Home cart={cart} setCart={setCart} />}
        />

        <Route
          path="/cart"
          element={<CartPage cart={cart} totalCartPrice={totalCartPrice} handleRemoveFromCart={handleRemoveFromCart} />}
        />
      </Routes>

    </Router>
  );
}

export default App;
