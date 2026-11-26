import React from 'react';
import './index.css';

const App = () => {
  return (
    <main className="launch-scene" aria-label="Rocket launch animation">
      <div className="loading-container" aria-hidden="true">
        <div className="apple-spinner">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="spinner-tick"></div>
          ))}
        </div>
      </div>
      <div className="launch-stars" aria-hidden="true" />
      <div className="rocket" aria-hidden="true">
        <div className="rocket-flame" />
        <div className="rocket-fins" />
        <div className="rocket-body">
          <div className="rocket-window" />
        </div>
      </div>
    </main>
  );
};

export default App;
