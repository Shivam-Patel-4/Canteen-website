import React from 'react';


const Cart = ({ cart, totalCartPrice, handleRemoveFromCart }) => {
    return (
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
                        {cartItem.name} - {cartItem.price} *{cartItem.quantity} = &#8377;{cartItem.totalItemPrice.toFixed(2)}
                        <button onClick={() => handleRemoveFromCart(cartItem.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <strong>Total Cart Price:</strong> &#8377;{totalCartPrice.toFixed(2)}
            </div>
        </div>
    );
}

export default Cart;