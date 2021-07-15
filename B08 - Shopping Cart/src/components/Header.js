import React, { useState, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import Cart from './Cart';

import { useCart } from '../contexts/useCart';

import CartIcon from '../supermarket.svg';

export default function Header() {
  const { cart, totalPrice } = useCart();
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(modalRef, () => {
    if (isOpen === true) setIsOpen(false);
  });

  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button
            onClick={() => {
              if (isOpen === false) setIsOpen(true);
            }}
          >
            <img src={CartIcon} width="30" alt="cart" />({cart.length} items - $
            {totalPrice})
          </button>

          <div
            ref={modalRef}
            className="cart-modal"
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}
