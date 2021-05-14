import React, { useEffect, useState } from 'react';

export default function AddressBar({ updateBrowser, url }) {
  const [value, setValue] = useState(url || '');

  useEffect(() => {
    const httpsUrl = addHttps(url);
    setValue(httpsUrl);
  }, [url]);

  function handleSubmit(e) {
    e.preventDefault();
    const httpsUrl = addHttps(value);
    updateBrowser(httpsUrl);
  }

  return (
    <div className="address-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}

function addHttps(url) {
  if (!url) {
    return `https://`;
  }
  if (url.startsWith(`https://`)) {
    return url;
  }

  if (!url.startsWith(`https://`) || !url.startsWith('http://')) {
    return `https://${url}`;
  }
}
