import React from 'react';
import './index.css';

const App = () => {
  return (
    <main className="launch-scene">
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
      <section className="wifi-success" aria-labelledby="wifi-title">
        <div className="space-goose" aria-hidden="true">
          <span className="goose-body" />
          <span className="goose-neck" />
          <span className="goose-head" />
          <span className="goose-helmet" />
        </div>
        <h1 id="wifi-title">Wi-Fi connected.</h1>
        <p>The goose has cleared you for browsing.</p>
        <p className="wifi-close">You can close this window.</p>
      </section>
    </main>
  );
};

export default App;
