import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Stats,
} from 'react-instantsearch-dom';

import './App.css';

// My Algolia Account
// app id: BNO7BF9W4R
// api key: fe3c1240d2d187a1e7c803bb729335f1
// index name: Ecommerce_betterdev

const searchClient = algoliasearch(
  'BNO7BF9W4R',
  'fe3c1240d2d187a1e7c803bb729335f1'
);

export default function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="Ecommerce_betterdev">
      <div className="app">
        <div className="search-container">
          <Stats />
          <SearchBox />
          <Hits hitComponent={Product} />
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  );
}

function Product({ hit }) {
  return (
    <a
      className="product"
      href={hit.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={hit.image} alt={hit.name} />
      <div>
        <h3>{hit.brand}</h3>
        <h2>{hit.name}</h2>
        <p>${hit.price}</p>
      </div>
    </a>
  );
}
