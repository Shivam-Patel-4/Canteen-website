import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Components/Cart.css";
import { loadStripe } from "@stripe/stripe-js";

const Cart = ({
  cart,
  totalCartPrice,
  handleRemoveFromCart,
  handleUpdateCart,
}) => {
  const [stripePromise, setStripePromise] = useState(null);

  // Load Stripe asynchronously when the component mounts
  useEffect(() => {
    const stripePromise = loadStripe('pk_test_51PIQGiSI40H1y2UiBX46wVp0m8COP6BKHDczyHqZHpxxODiwksUaPvacLhbZLN8HW1XwjiarTMJyk6ijNSZUgf7C0005GeOq0U');
    setStripePromise(stripePromise);
    
  }, []);

  const handleQuantityChange = (id, quantity) => {
    // Ensure quantity is a valid number
    if (!isNaN(quantity) && quantity >= 1) {
      handleUpdateCart(id, quantity);
    }
  };

  const handleCheckout = async () => {
    if (!stripePromise) return; // Ensure Stripe is loaded before proceeding

    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="cart text-white">
      <h2 className="text-center">Cart</h2>
      {cart.map((cartItem) => (
        <div key={cartItem.id}>
          <img
            src={cartItem.image}
            alt={cartItem.name}
            style={{ width: "70px", height: "70px", marginRight: "10px" }}
          />
          <b>{cartItem.name}</b> - &#8377;{cartItem.price} (&#xd7;
          {cartItem.quantity}) = &#8377;{(cartItem.totalItemPrice || 0).toFixed(2)}
          <button onClick={() => handleRemoveFromCart(cartItem.id)}>
            <i className="bi bi-trash3-fill"></i>
          </button>
          {/* <input
            type="number"
            value={cartItem.quantity}
            onChange={(e) =>
              handleQuantityChange(cartItem.id, parseInt(e.target.value))
            }
          /> */}
          <hr />
        </div>
      ))}

      <div className="position-absolute bottom-0 start-0 cartTotal">
        <div className="con-btn-parents">
          <div className="continue-shopping">
            <Link to="/" className="cont-shop">
              Continue Shopping
            </Link>
          </div>
          <button className="checkout" onClick={handleCheckout}>
            Continue Checkout
          </button>
        </div>
        <div>
          <strong className="">Total Cart Price :</strong> &#8377;
          {(totalCartPrice || 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
