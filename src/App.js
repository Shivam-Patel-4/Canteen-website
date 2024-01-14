import React, { useState, useEffect } from 'react';
import canteenLogo from './images/canteenLogo.png';
import './App.css';
import MenuItemCard from './Components/MenuItemCard';
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

          console.log('Updated Cart Item:', updatedCartItem);
          return updatedCartItem;
        })
      );
    } else {
      setCart((prevCart) => {
        const newItem = { ...item, quantity: 1, totalItemPrice: Number(item.price) };
        console.log('New Cart Item:', newItem);
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

      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map((cartItem) => (
            <li key={cartItem.id}>
              <img
                src={cartItem.image}
                alt={cartItem.name}
                style={{ width: '30px', height: '30px', marginRight: '10px' }}
              />
              {cartItem.name} - {cartItem.price} *{cartItem.quantity} = ${cartItem.totalItemPrice.toFixed(2)}
              <button onClick={() => handleRemoveFromCart(cartItem.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <strong>Total Cart Price:</strong> ${totalCartPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default App;
