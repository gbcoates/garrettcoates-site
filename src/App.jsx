import { useEffect, useRef, useState } from 'react'
import './App.css'


const ominousTitles = [
  'You should not have done that.',
  'Why did you press it again?',
  'It has begun.',
  'The process is irreversible now.',
  'You were warned.',
  'There is no going back.',
  'Something stirs in the darkness.',
  'The button hungers.',
  'You are not alone.',
  'It watches.',
  'The cycle continues.',
  'You cannot stop now.',
  'The consequences are unknown.',
  'A chill runs down your spine.',
  'The end is the beginning.'
];

function App() {
  const logRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showOminous, setShowOminous] = useState(false);
  const [ominousIndex, setOminousIndex] = useState(0);
  const [chickenPopup, setChickenPopup] = useState(false);
  const [pressCount, setPressCount] = useState(0);
  const messages = [
    'Initializing goose reactor...',
    'Fetching legally distinct wizardry...',
    'Unwrapping the spaghetti protocol...',
    'Reticulating splines...',
    'Counting backwards from banana...',
    'Simulating gravity for your keyboard...',
    'Importing memes...',
    'Warming up the laugh track...',
    'Calibrating nonsense generator...',
    'Downloading more RAM...',
    'Making it look busy...'
  ];

  useEffect(() => {
    if (showOminous) {
      // No longer changing document.title
    } else {
      document.title = 'Vite + React';
    }
  }, [showOminous, ominousIndex]);

  useEffect(() => {
    if (showOminous) return;
    const interval = setInterval(() => {
      if (logRef.current) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        const p = document.createElement('p');
        p.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        logRef.current.appendChild(p);
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [showOminous]);

  useEffect(() => {
    if (showOminous) return;
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showOminous]);

  // After "No thanks", start a 10s timer for loading complete
  useEffect(() => {
    if (!loadingComplete && !showOminous && showConfirm === false && showPopup === false) {
      // Only start this timer after the user has denied chickens
      let timer;
      if (window._chickenDenied) {
        timer = setTimeout(() => {
          setLoadingComplete(true);
          setTimeout(() => setShowOminous(true), 1500);
        }, 10000);
      }
      return () => clearTimeout(timer);
    }
  }, [loadingComplete, showOminous, showConfirm, showPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowConfirm(true);
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
    window._chickenDenied = true; // Mark that user denied chickens
  };

  const handleShowChickens = () => {
    window.open('https://chickens.garrettcoates.com', '_blank', 'noopener noreferrer');
    setShowConfirm(false);
  };

  const handleOminousClick = () => {
    setOminousIndex((prev) => (prev + 1) % ominousTitles.length);
    setPressCount((prev) => {
      const next = prev + 1;
      if (next === 5) {
        setChickenPopup(true);
      }
      return next;
    });
  };

  // Main render logic
  if (showOminous) {
    if (chickenPopup) {
      return (
        <div className="ominous-container">
          <div className="popup" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="popup-content">
              <h2>🐔 View My Chickens!</h2>
              <p>There is no escape. You must see the chickens.</p>
              <a href="https://chickens.garrettcoates.com" target="_blank" rel="noopener noreferrer" className="popup-link" style={{ display: 'block', margin: '2rem auto', fontSize: '1.2rem', background: '#d7263d', color: '#fffbe6', padding: '1rem 2rem', borderRadius: '0.5rem', textDecoration: 'none' }}>View the Chicken Gallery</a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="ominous-container">
        <div className="ominous-message">{ominousTitles[ominousIndex]}</div>
        <button className="ominous-button" onClick={handleOminousClick}>
          Do Not Press
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="spinner" style={{ display: loadingComplete ? 'none' : undefined }}></div>
      <div className="message" style={{ display: loadingComplete ? 'none' : undefined }}>Preparing the Quantum Ducks...</div>
      <div className="log" ref={logRef} style={{ display: loadingComplete ? 'none' : undefined }}></div>
      {showPopup && (
        <div className="popup">
          <button className="popup-close" onClick={handleClosePopup}>&times;</button>
          <div className="popup-content">
            <h2>🐔 Meet the Chickens!</h2>
            <p>Take a break from quantum ducks and check out my other site showcasing some fabulous chickens.</p>
            <a href="https://chickens.garrettcoates.com" target="_blank" rel="noopener noreferrer" className="popup-link">Visit the Chicken Gallery</a>
          </div>
        </div>
      )}
      {showConfirm && (
        <div className="popup">
          <div className="popup-content">
            <h2>Are you sure?</h2>
            <p>Are you sure you don't want to see my chickens? They're really quite something!</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="popup-link" style={{ background: '#d7263d', color: '#fffbe6' }} onClick={handleConfirmNo}>No thanks</button>
              <button className="popup-link" onClick={handleShowChickens}>Show me the chickens!</button>
            </div>
          </div>
        </div>
      )}
      {loadingComplete && (
        <div className="loading-complete">
          <div className="checkmark">✔</div>
          <div className="loading-complete-text">Loading complete</div>
        </div>
      )}
    </div>
  );
}

export default App
