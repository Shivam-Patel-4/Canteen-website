import React from 'react';
import '../Components/MenuItemCard.css';

const MenuItemCard = ({ id, name, description, price, image, onAddToCart }) => {

    return (
        <div className='menu-item'>
                <div className="card m-2 p-2">
                    <img src={image} className="img-fluid" alt="..." />
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p className="card-text">{description}</p>
                        <h5>Price: &#8377;{price}</h5>
                        <button onClick={() => onAddToCart({ id, name, price, image })}>Add to Cart</button>
                    </div>
                </div>
        </div>
    );
};

export default MenuItemCard;
