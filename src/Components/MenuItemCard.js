import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';  
import "../Components/MenuItemCard.css";
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const MenuItemCard = ({ id, name, description, price, image, onAddToCart }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const handleDelete = async (id) => {
    const foodItemRef = doc(db, "foodItems", id);

    try {
      await deleteDoc(foodItemRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };
  const handleAddToCart = () => {
    onAddToCart({ id, name, price, image });
    setShowAlert(true); // Show the alert when item is added to cart
    // Hide the alert after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  
  return (
    <div className="menu-item">
      <div className="row m-1 align-items-center">
        <div className="col-md-4 col-4">
          {/* <div className=""> */}
            <img src={image} className="img-fluid" alt="..." />
          {/* </div> */}
        </div>
        <div className="col-md-8 col-8 menuItemBody">
          <div>
            <h4 className="card-title">{name}</h4>
            <p className="card-text">{description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <h5>&#8377;{price}</h5>
              <button
                onClick={() => onAddToCart({ id, name, price, image })}
                id="liveToastBtn"
                
              >
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
