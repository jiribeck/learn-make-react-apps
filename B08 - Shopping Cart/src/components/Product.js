import React from 'react';

import { useCart } from '../contexts/useCart';

export default function Product({ product }) {
  const sku = product.sku;
  const name = product.name;
  const img = product.image_url;
  // const price = product.price;

  const { addItem, removeItem, countItemsInCart } = useCart();
  const itemInCartCount = countItemsInCart(sku);

  return (
    <div className="product">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <div className="product-buttons">
        {itemInCartCount > 0 ? (
          <button className="remove" onClick={() => removeItem(sku)}>
            Remove
          </button>
        ) : (
          <div />
        )}
        <button className="add" onClick={() => addItem(sku)}>
          Add to cart ({itemInCartCount})
        </button>
      </div>
    </div>
  );
}
