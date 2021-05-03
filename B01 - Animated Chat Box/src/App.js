import React, { useState } from 'react';
import useInterval from '@use-it/interval';

import './App.css';
import Message from './components/message';
import Typing from './components/typing';

const messages = [
  { text: 'How do I get better at React?' },
  { text: 'Just build something!' },
  { text: 'OK! What should I build?' },
  { text: 'Iono. Just Google it?' },
  { text: 'Oh! This course looks cool!' },
  { text: 'Send me the link?!' },
  { text: '20ReactApps.com!' },
];

export default function App() {
  const [messageToShow, setMessageToShow] = useState(0);

  useInterval(() => {
    if (messageToShow < messages.length) {
      setMessageToShow((messageToShow) => messageToShow + 1);
    }
  }, 3000);

  return (
    <div className="app">
      <div className="walkthrough">
        {messages.map((message, index) => {
          const even = index % 2 === 0;
          if (messageToShow + 1 === index) {
            return <Typing key={index} even={even} />;
          }
          if (index > messageToShow) return <div key={index} />;

          return <Message key={index} message={message} />;
        })}
      </div>
    </div>
  );
}
