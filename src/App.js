import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import canteenLogo from './images/canteenLogo.png';
import './App.css';
import MenuItemCard from './Components/MenuItemCard';
import CartPage from '../src/Pages/CartPage';
import menuItemsData from './menuItemData/MenuItemData';

function App() {

  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) => {
          const updatedCartItem = cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1, totalItemPrice: (cartItem.quantity + 1) * Number(item.price) }
            : cartItem;

          // console.log('Updated Cart Item:', updatedCartItem);
          return updatedCartItem;
        })
      );
    } else {
      setCart((prevCart) => {
        const newItem = { ...item, quantity: 1, totalItemPrice: Number(item.price) };
        // console.log('New Cart Item:', newItem);
        return [...prevCart, newItem];
      });
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    const totalPrice = cart.reduce((total, cartItem) => total + cartItem.totalItemPrice, 0);
    setTotalCartPrice(totalPrice);
  }, [cart]);

  return (
    <Router>
    <div className="App row">
      <header className='col-12 text-center'>
        <img src={canteenLogo} alt="logo" className='logo' />
        <Link to="/cart">
          <button type="button" className="btn position-relative ">
            <i className="bi bi-bag-fill" style={{ fontSize: '25px' }}></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.reduce((total, cartItem) => total + cartItem.quantity, 0)}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </Link>
      </header>

      <div className="container-fluid">
        <div className="row justify-content-center">
          {menuItemsData.map((item, index) => (
            <div key={item.id} className=" col-xl-3 col-lg-4 col-md-6 mt-2">
              <MenuItemCard {...item} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </div>

      <Routes>
        <Route
          path="/cart"
          element={<CartPage cart={cart} totalCartPrice={totalCartPrice} handleRemoveFromCart={handleRemoveFromCart} onClose={() => window.history.back()} />}
        />
      </Routes>

      
    </div>
  </Router>
  );
}

export default App;
