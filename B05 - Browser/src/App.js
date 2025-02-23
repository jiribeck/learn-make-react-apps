import React, { useReducer } from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';

function reducer(state, action) {
  const { browsers, activeBrowser } = state;
  const { type, payload } = action;

  if (type === 'ADD') {
    const newBrowsers = [...browsers, ''];
    const activeBrowser = newBrowsers.length - 1;
    return {
      browsers: newBrowsers,
      activeBrowser,
    };
  }
  if (type === 'UPDATE') {
    const newBrowsers = [...browsers];
    newBrowsers[activeBrowser] = payload;
    return {
      browsers: newBrowsers,
      activeBrowser,
    };
  }
  if (type === 'CHOOSE') {
    return {
      ...state,
      activeBrowser: payload,
    };
  }
  if (type === 'CLOSE') {
    const oldBrowsers = [...browsers];
    const newBrowsers = oldBrowsers.filter((b, index) => index !== payload);

    const oldUrl = oldBrowsers[activeBrowser];

    const newActiveBrowser =
      activeBrowser > newBrowsers.length - 1
        ? newBrowsers.length - 1
        : newBrowsers.findIndex((b) => b === oldUrl);

    return {
      browsers: newBrowsers,
      activeBrowser: newActiveBrowser,
    };
  }
}

export default function App() {
  const [{ browsers, activeBrowser }, dispatch] = useReducer(reducer, {
    browsers: ['https://learn.better.dev', 'https://beginnertailwind.com/'],
    activeBrowser: 0,
  });

  const chooseBrowser = (id) => dispatch({ type: 'CHOOSE', payload: id });
  const addBrowser = () => dispatch({ type: 'ADD' });
  const updateBrowser = (url) => dispatch({ type: 'UPDATE', payload: url });
  const deleteBrowser = (id) => dispatch({ type: 'CLOSE', payload: id });

  const url = browsers[activeBrowser];

  return (
    <div className="app">
      <div className="browser">
        <Tabs
          browsers={browsers}
          active={activeBrowser}
          addBrowser={addBrowser}
          chooseBrowser={chooseBrowser}
          deleteBrowser={deleteBrowser}
        />

        <AddressBar updateBrowser={updateBrowser} url={url} />

        <div className="viewport">
          {url ? <iframe src={url} title="Stuff" /> : <>New Tab Page</>}
        </div>
      </div>
    </div>
  );
}
