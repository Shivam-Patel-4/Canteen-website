import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import {
    collection,
    getDocs,
    query,
    orderBy,
    where
  } from "firebase/firestore"; // Import Firestore functions
  import { firestore } from "../firebase"; // Assuming import from firebase.js

const Dinner = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchDinnerItems = async () => {
      try {
        const dinnerRef = collection(firestore, "foodItems");
        const dinnerQuery = query(
          dinnerRef,
          orderBy("foodName", "asc"),
          where("foodCategory", "==", "dinner")
        );
        const querySnapshot = await getDocs(dinnerQuery);
        const dinnerItems = [];
        querySnapshot.forEach((doc) => {
          const dinnerItem = {
            id: doc.id,
            ...doc.data()
          };
          dinnerItems.push(dinnerItem);
        });
        setFoodItems(dinnerItems);
      } catch (error) {
        console.error("Error fetching dinner items:", error);
      }
    };

    fetchDinnerItems();
  }, []);

  return (
    <div className="dinner-container">
      <h2>Dinner Items</h2>
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Details</th>
            <th>Price (INR)</th>
            <th>Serve</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((foodItem) => (
            <tr key={foodItem.id}>
              <td>{foodItem.foodName}</td>
              <td>{foodItem.foodDetails}</td>
              <td>{foodItem.foodPrice}</td>
              <td>{foodItem.foodServe}</td>
              <td>{foodItem.foodCategory}</td>
              <td>
                {foodItem.image ? (
                  <img
                    src={foodItem.image}
                    alt={foodItem.foodName}
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "No image"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dinner;
