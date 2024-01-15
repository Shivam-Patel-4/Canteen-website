import React from 'react';
import '../Components/Cart.css';

const Cart = ({ cart, totalCartPrice, handleRemoveFromCart }) => {
    return (
        <div className="cart">
            <h2>Cart</h2>
            {cart.map((cartItem) => (
                <div key={cartItem.id}>
                    <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        style={{ width: '70px', height: '70px', marginRight: '10px', }}
                    />
                    <b>{cartItem.name}</b> - &#8377;{cartItem.price} &#xd7;{cartItem.quantity} = &#8377;{cartItem.totalItemPrice.toFixed(2)}
                    <button onClick={() => handleRemoveFromCart(cartItem.id)}><i class="bi bi-trash3-fill"></i></button>
                </div>
            ))}
            <div>
                <strong>Total Cart Price:</strong> &#8377;{totalCartPrice.toFixed(2)}
            </div>
        </div>
    );
}

export default Cart;