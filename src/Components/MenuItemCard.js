import React from 'react';
import '../Components/MenuItemCard.css';

const MenuItemCard = ({ id, name, description, price, image, onAddToCart }) => {
    return (
        <div className='menu-item'>
            <div className="row m-1 align-items-center">
                <div className="col-md-4 col-4">
                    <div className="">
                        <img src={image} className="img-fluid" alt="..." />
                    </div>
                </div>
                <div className="col-md-8 col-8 menuItemBody">
                    <div>
                        <div>
                            <h4 className="card-title">{name}</h4>
                            <p className="card-text">{description}</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h5>&#8377;{price}</h5>
                                <button onClick={() => onAddToCart({ id, name, price, image })}>ADD +1</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MenuItemCard;
