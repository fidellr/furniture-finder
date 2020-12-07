//#region PACKAGE IMPORTS
import React from 'react';
import { formatCurrency } from '../../utils/helpers';
//#endregion

//#region STYLESHEET IMPORTS
import './ProductCard.style.scss';
//#endregion

const ProductCard = ({
  className,
  name,
  price,
  description,
  furnitureStyles,
  deliveryTime,
}) => {
  const classes = !className ? 'cardContainer' : `${className} cardContainer`;

  return (
    <div className={classes}>
      <div className="productHeader">
        <h3>{name}</h3>
        <p>IDR {formatCurrency(price, 0)}</p>
      </div>
      <p className="productDescription">
        {description.length > 114
          ? `${description.substring(0, 114)}...`
          : description}
      </p>
      <div className="productFooter">
        <div className="productStyles">
          {furnitureStyles.map((style) => (
            <span key={style}>{style}</span>
          ))}
        </div>
        <div className="productDeliveryTime">
          <p>
            {deliveryTime} Day{deliveryTime > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
