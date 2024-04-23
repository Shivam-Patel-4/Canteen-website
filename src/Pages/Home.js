import React from "react";
import MenuItemCard from "../Components/MenuItemCard";
import { menuItemsData } from "../menuItemData/MenuItemData";
import "../Pages/Home.css";

const Home = ({ cart, setCart }) => {
  

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

          // console.log('Updated Cart Item:', updatedCartItem);
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
        // console.log('New Cart Item:', newItem);
        return [...prevCart, newItem];
      });
    }
  };

  return (
    <div className="container-fluid">

     

      <div className="row justify-content-center">
        {menuItemsData.map((item, index) => (
          <div key={item.id} className=" col-xl-3 col-lg-4 col-md-6 mt-2">
            <MenuItemCard {...item} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
