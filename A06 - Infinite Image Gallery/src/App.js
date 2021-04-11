import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
// const unsplashAccessKey = '';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [photoSearchQuery, setPhotoSearchQuery] = useState('');
  const getPhotos = useCallback(() => {
    if (unsplashAccessKey) {
      let apiURL = '';
      if (!photoSearchQuery) apiURL = `https://api.unsplash.com/photos/?`;
      if (photoSearchQuery)
        apiURL = `https://api.unsplash.com/search/photos?query=${photoSearchQuery}`;

      apiURL += `&client_id=${unsplashAccessKey}`;
      apiURL += `&page=${page}`;

      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          if (page === 1) setImages([]);
          const imagesFromApi = data.results ?? data;
          setImages((images) => [...images, ...imagesFromApi]);
        });
    }
  }, [page, photoSearchQuery]);

  useEffect(() => {
    getPhotos();
  }, [page, getPhotos]);

  function moveToNextPage() {
    setPage((page) => page + 1);
  }

  function searchPhotos(e) {
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

  //Return error IF no access key
  if (!unsplashAccessKey) {
    return (
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://unsplash.com/documentation#authorization"
      >
        Get you API key first
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={searchPhotos}>
        <input
          value={photoSearchQuery}
          onChange={(e) => setPhotoSearchQuery(e.target.value)}
          type="text"
          placeholder="Search Unsplash..."
        />
        <button>Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={moveToNextPage}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image, index) => (
            <a
              href={image.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="image"
              key={`unspashImage${index}`}
            >
              <img src={image.urls.small} alt={image.alt_description} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
