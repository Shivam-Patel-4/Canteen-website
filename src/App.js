import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import canteenLogo from './images/canteenLogo.png';
import './App.css';
import CartPage from '../src/Pages/CartPage';
import Home from './Pages/Home';
import { categoriesData } from './menuItemData/MenuItemData';

function App() {

  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);



  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    const totalPrice = cart.reduce((total, cartItem) => total + cartItem.totalItemPrice, 0);
    setTotalCartPrice(totalPrice);
    console.log("Cart data: ", cart)
  }, [cart]);



  return (
    <Router>
      {/* header */}
      <header className='header-row'>
        <img src={canteenLogo} alt="logo" className='logo' />
        <Link to="/cart">
          <button type="button" className="btn position-relative cart-btn me-3">
            <i className="bi bi-bag-fill" style={{ fontSize: '25px', color: 'green' }}></i>
            <span className="translate-middle badge rounded-pill bg-danger">
              {/* {cart.reduce((total, cartItem) => total + cartItem.quantity, 0)} */}
              {cart.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </Link>
      </header>

      {/* categories row */}
      <div className='d-flex gap-3 mx-3 overflow-x-auto'>
        <div className='badge bg-info'>
          All
        </div>
        {
          categoriesData.map(category => (
            <div key={category?.id} className='badge bg-info'>
              {category?.category}
            </div>
          ))
        }
      </div>

      <Routes>
        <Route
          path='/'
          element={<Home cart={cart} setCart={setCart} />}
        />

        <Route
          path="/cart"
          element={<CartPage cart={cart} totalCartPrice={totalCartPrice} handleRemoveFromCart={handleRemoveFromCart} onClose={() => window.history.back()} />}
        />
      </Routes>


    </Router>
  );
}

export default App;
