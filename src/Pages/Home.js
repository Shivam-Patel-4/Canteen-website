import React from "react";
import MenuItemCard from "../Components/MenuItemCard";
import { menuItemsData } from "../menuItemData/MenuItemData";
import "../Pages/Home.css";
import { useState } from "react";
import Alert from "@mui/material/Alert"; // Import Alert component from Material UI
import Snackbar from "@mui/material/Snackbar"; // Import Snackbar component for notification
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import CheckCircleIcon component

const Home = ({ cart, setCart }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) => {
          const updatedCartItem =
            cartItem.id === item.id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                  totalItemPrice: (cartItem.quantity + 1) * Number(item.price),
                }
              : cartItem;
          return updatedCartItem;
        })
      );
    } else {
      setCart((prevCart) => {
        const newItem = {
          ...item,
          quantity: 1,
          totalItemPrice: Number(item.price),
        };
        return [...prevCart, newItem];
      });
    }


    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {menuItemsData.map((item, index) => (
          <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 mt-2">
            <MenuItemCard {...item} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
      <Snackbar
        open={showAlert} // Control Snackbar visibility with state
        autoHideDuration={1500} // Auto-close after 1.5 seconds
        onClose={() => setShowAlert(false)} // Handle Snackbar close
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Position
      >
        <Alert 
        // severity="success"
        >
          {/* <CheckCircleIcon sx={{ mr: 2 }} /> */}
           Added!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
