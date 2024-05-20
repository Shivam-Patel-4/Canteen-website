import React from "react";
import "../Components/MenuItemCard.css";

const MenuItemCard = ({ id, foodName, foodDetails, foodPrice, image, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({ id, name: foodName, price: foodPrice, image });
  };

  return (
    <div className="menu-item" key={id}>
      <div className="row m-1 align-items-center">
        <div className="col-md-4 col-4">
          <img src={image} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-8 col-8 menuItemBody">
          <div>
            <h4 className="card-title">{foodName}</h4>
            <p className="card-text">{foodDetails}</p>
            <div className="d-flex justify-content-between align-items-center">
              <h5>&#8377;{foodPrice}</h5>
              <button onClick={handleAddToCart} id="liveToastBtn">
                ADD +1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
