import React, { useState } from 'react';
import './App.css';
import marked from 'marked';

export default function App() {
  const [markdown, setMarkdown] = useState('# sup');

  function handleTextareaChange(event) {
    setMarkdown(event.target.value);
  }

  return (
    <div className="app">
      <textarea value={markdown} onChange={handleTextareaChange} />

      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}
