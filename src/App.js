import React, { useState, useEffect } from 'react';
import canteenLogo from './images/canteenLogo.png';
import './App.css';
import MenuItemCard from './Components/MenuItemCard';
import menuItemsData from './menuItemData/MenuItemData';
import Cart from './Components/Cart';

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
    <div className="App row">
      <header className='col-12 text-center'>
        <img src={canteenLogo} alt="logo" className='logo' />
      </header>

      <div className="container-fluid">
        <div className="row justify-content-center">
          {menuItemsData.map((item, index) => (
            <div key={item.id} className="col-lg-3 col-md-4 mt-2">
              <MenuItemCard {...item} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </div>
      <Cart cart={cart} totalCartPrice={totalCartPrice} handleRemoveFromCart={handleRemoveFromCart} />

    </div>
  );
}

export default App;
