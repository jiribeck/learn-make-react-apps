import React from 'react';
import categories from '../categories';

export default function CategorySelector({ category, chooseCategory }) {
  return (
    <div className="category-selector">
      <p>Select Category</p>
      <select onChange={(e) => chooseCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
