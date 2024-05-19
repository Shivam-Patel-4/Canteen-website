import React from "react";
import { Link } from "react-router-dom";
import "../Components/Cart.css";

const handleCheckout = () => {

  alert("Checkout initiated!")
};

const Cart = ({
  cart,
  totalCartPrice,
  handleRemoveFromCart,
  handleUpdateCart,
}) => {
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
          {cartItem.quantity}) = &#8377;{cartItem.totalItemPrice.toFixed(2)}
          <button onClick={() => handleRemoveFromCart(cartItem.id)}>
            <i className="bi bi-trash3-fill"></i>
          </button>
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
          {totalCartPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
