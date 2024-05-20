import React, { useState, useEffect } from "react";
import MenuItemCard from "../Components/MenuItemCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Dinner = ({ cart, setCart, handleUpdateCart }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const foodItemsCollection = collection(db, "foodItems");
        const foodItemsQuery = query(
          foodItemsCollection,
          where("foodCategory", "==", "dinner") // Filter items where foodCategory is "lunch"
        );
        const querySnapshot = await getDocs(foodItemsQuery);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setFoodItems(items);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    fetchFoodItems();
  }, []);

  const handleAddToCart = (item) => {
    console.log("Item added to cart:", item);
    
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      console.log("Existing item found in cart:", existingItem);
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalItemPrice: (cartItem.quantity + 1) * Number(item.price), // Calculate total price based on quantity
              }
            : cartItem
        )
      );
    } else {
      console.log("New item added to cart:", item);
      setCart((prevCart) => [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          totalItemPrice: Number(item.price), // Initial total price is same as food price
        },
      ]);
    }
  
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };
  


  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {foodItems.map((item) => (
          <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 mt-2">
            <MenuItemCard {...item} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={1500}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert>Added!</Alert>
      </Snackbar>
    </div>
  );
};

export default Dinner;
