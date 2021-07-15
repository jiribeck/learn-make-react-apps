import React from 'react';

import { useCart } from '../contexts/useCart';

export default function Cart() {
  const { addItem, removeItem, cartGroupedByItems, totalPrice } = useCart();
  return (
    <div className="cart">
      {cartGroupedByItems.length === 0 && <div>Your Cart is Empty</div>}
      {cartGroupedByItems.map((product, index) => (
        <div key={index} className="cart-item">
          <img src={product.image_url} alt={product.name} width={100} />

          <div className="content">
            <h3>{product.name}</h3>
            <div className="cart-buttons">
              <button onClick={() => removeItem(product.sku)}>-</button>
              <button>{product.quantity}</button>
              <button onClick={() => addItem(product.sku)}>+</button>
            </div>
          </div>
        </div>
      ))}
      <div className="total">${totalPrice}</div>
    </div>
  );
}
