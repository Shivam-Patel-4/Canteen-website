import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CartPage from './Pages/CartPage';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import Lunch from './Pages/Lunch';
import Dinner from './Pages/Dinner';
import { auth, db, storage, messaging, generateToken } from './firebase'; // Import Firebase configurations

function App() {
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  // Calculate total cart price whenever cart changes
  useEffect(() => {
    const totalPrice = cart.reduce(
      (total, cartItem) => total + cartItem.totalItemPrice,
      0
    );
    setTotalCartPrice(totalPrice);
  }, [cart]);

  useEffect(() => {
    // Generate token for messaging
    generateToken();
  }, []);

  return (
    <Router>
      <div className="body">
        <header className="header-row">
          <h1 className="logo">
            <span>C</span>
            <span>F</span>
            <span>M</span>
            <span>S</span>
          </h1>
          <NavBar />
          <Link to="/cart">
            <button type="button" className="btn position-relative cart-btn me-3">
              <i className="bi bi-bag-fill" style={{ fontSize: '25px', color: '#fd7014' }}></i>
              <span className="translate-middle badge rounded-pill" style={{ backgroundColor: '#393e46' }}>
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} handleUpdateCart={handleUpdateCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} totalCartPrice={totalCartPrice} handleRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="/lunch" element={<Lunch cart={cart} setCart={setCart} handleUpdateCart={handleUpdateCart} />} />
          <Route path="/dinner" element={<Dinner cart={cart} setCart={setCart} handleUpdateCart={handleUpdateCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
