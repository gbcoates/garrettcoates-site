import { useEffect, useRef, useState } from 'react'
import './App.css'
import './mobile.css'


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
  const [mapLat, setMapLat] = useState(null);
  const [mapLng, setMapLng] = useState(null);
  const [showPong, setShowPong] = useState(false);
  const [showMeme, setShowMeme] = useState(false);
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

  // Generate a random lat/lng for the map on mount
  useEffect(() => {
    if (mapLat === null && mapLng === null) {
      // Random latitude: -85 to 85 (avoid poles for map display)
      const lat = (Math.random() * 170 - 85).toFixed(4);
      // Random longitude: -180 to 180
      const lng = (Math.random() * 360 - 180).toFixed(4);
      setMapLat(lat);
      setMapLng(lng);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (showOminous) {
      // No longer changing document.title
    } else {
      document.title = 'Gallus gallus domesticus';
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
      if (showPong) {
        return <PongGame onEnd={() => { setShowPong(false); setShowMeme(true); }} />;
      }
      if (showMeme) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#111' }}>
            <div style={{ color: '#fffbe6', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: '2.5rem', textAlign: 'center' }}>
              You lost. The chickens <span style={{ fontSize: '1.1rem', fontWeight: 400, opacity: 0.7 }}>(Gallus gallus domesticus)</span> are disappointed in you.
            </div>
            <img src="/eyes-see-you.gif" alt="Disappointed Chicken" style={{ width: 'min(70vw, 340px)', height: 'auto', borderRadius: '1.2rem', marginBottom: '2.2rem', boxShadow: '0 4px 24px #0006' }} />
            <button
              onClick={() => {
                // Show a reminder message before reload
                const reminder = document.createElement('div');
                reminder.style.position = 'fixed';
                reminder.style.top = 0;
                reminder.style.left = 0;
                reminder.style.width = '100vw';
                reminder.style.height = '100vh';
                reminder.style.background = 'rgba(17,17,17,0.97)';
                reminder.style.display = 'flex';
                reminder.style.alignItems = 'center';
                reminder.style.justifyContent = 'center';
                reminder.style.zIndex = 9999;
                // Inner message box
                const inner = document.createElement('div');
                inner.textContent = 'You better think long and hard about what you need to do next time around.';
                inner.style.background = '#222';
                inner.style.color = '#fffbe6';
                inner.style.fontWeight = 'bold';
                inner.style.fontSize = '1.7rem';
                inner.style.borderRadius = '1.2rem';
                inner.style.boxShadow = '0 4px 32px #0008';
                inner.style.padding = '2.5rem 2.5rem';
                inner.style.maxWidth = '420px';
                inner.style.width = '90vw';
                inner.style.textAlign = 'center';
                inner.style.margin = '0 auto';
                reminder.appendChild(inner);
                document.body.appendChild(reminder);
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              }}
              style={{ fontSize: '1.3rem', background: '#d7263d', color: '#fffbe6', padding: '1rem 2.5rem', border: 'none', borderRadius: '0.7rem', cursor: 'pointer', fontWeight: 'bold' }}
            >Try Again</button>
          </div>
        );
      }
      return (
        <div className="ominous-container">
          <div className="popup" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div className="popup-content">
              <h2>🐔 View My Chickens!</h2>
              <p>There is no escape. You must see the chickens.</p>
              <a href="https://chickens.garrettcoates.com" target="_blank" rel="noopener noreferrer" className="popup-link" style={{ display: 'block', margin: '2rem auto', fontSize: '1.2rem', background: '#d7263d', color: '#fffbe6', padding: '1rem 2rem', borderRadius: '0.5rem', textDecoration: 'none' }}>View the Chicken Gallery</a>
              <button
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  padding: '4px 16px',
                  background: 'linear-gradient(90deg, #fffbe6 60%, #d7263d22 100%)',
                  color: '#d7263d',
                  border: '2px solid #d7263d',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 0 8px #d7263d55',
                  opacity: 1,
                  transition: 'transform 0.1s',
                  zIndex: 2
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => setShowPong(true)}
                aria-label="No"
              >no</button>
            </div>
          </div>
        </div>
      );
    }
// Minimal Pong game component
function PongGame({ onEnd }) {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let animationId;
    let timeoutId;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Game variables
    let paddleY = 90;
    let ballX = 150, ballY = 100, ballVX = 2, ballVY = 2;
    const paddleHeight = 40, paddleWidth = 8;
    const pongWidth = 300, pongHeight = 200;

    function draw() {
      ctx.clearRect(0, 0, pongWidth, pongHeight);
      // Draw paddle
      ctx.fillStyle = '#d7263d';
      ctx.fillRect(10, paddleY, paddleWidth, paddleHeight);
      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, 7, 0, 2 * Math.PI);
      ctx.fillStyle = '#222';
      ctx.fill();
    }

    function update() {
      ballX += ballVX;
      ballY += ballVY;
      // Bounce off top/bottom
      if (ballY < 7 || ballY > pongHeight - 7) ballVY *= -1;
      // Bounce off right
      if (ballX > pongWidth - 7) ballVX *= -1;
      // Paddle collision
      if (ballX < 18 && ballY > paddleY && ballY < paddleY + paddleHeight) ballVX *= -1;
      // Lose condition
      if (ballX < 0) {
        setRunning(false);
        onEnd();
        return;
      }
      draw();
      if (running) animationId = requestAnimationFrame(update);
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const y = e.clientY - rect.top;
      paddleY = Math.max(0, Math.min(pongHeight - paddleHeight, y - paddleHeight / 2));
    }

    function onTouchMove(e) {
      if (e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const y = e.touches[0].clientY - rect.top;
        paddleY = Math.max(0, Math.min(pongHeight - paddleHeight, y - paddleHeight / 2));
      }
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    draw();
    animationId = requestAnimationFrame(update);
    timeoutId = setTimeout(() => {
      setRunning(false);
      onEnd();
    }, 15000);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [onEnd, running]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#111' }}>
      <div style={{ color: '#fffbe6', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>Play Pong to escape!</div>
      <canvas ref={canvasRef} width={300} height={200} style={{ background: '#fffbe6', borderRadius: '1rem', boxShadow: '0 2px 12px #0002' }} />
      {!running && <div style={{ color: '#d7263d', marginTop: '1rem', fontWeight: 'bold' }}>Game Over</div>}
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
      {/* Map overlay only when ominous screen (red button) is visible */}
      {showOminous && mapLat && mapLng && (
        <div style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '1rem',
          boxShadow: '0 2px 12px #0002',
          padding: '1rem',
          width: '320px',
          textAlign: 'center',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#d7263d' }}>I know where you are</div>
          <div style={{ width: '100%', height: '200px', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '0.5rem', border: '2px solid #111' }}>
            <iframe
              title="Random Map Location"
              width="100%"
              height="200"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLng-0.5},${mapLat-0.5},${parseFloat(mapLng)+0.5},${parseFloat(mapLat)+0.5}&layer=mapnik&marker=${mapLat},${mapLng}`}
              allowFullScreen
            ></iframe>
          </div>
          <div style={{ fontSize: '0.95rem', color: '#333' }}>Lat: {mapLat}, Lng: {mapLng}</div>
        </div>
      )}
      <div className="spinner" style={{ display: loadingComplete ? 'none' : undefined }}></div>
      <div className="message" style={{ display: loadingComplete ? 'none' : undefined }}>Polishing the rubber goose...</div>
      <div className="log" ref={logRef} style={{ display: loadingComplete ? 'none' : undefined }}></div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>🐔 Meet the Chickens!</h2>
            <p>Take a break from the rubber goose and check out my other site showcasing some fabulous chickens.</p>
            <a href="https://chickens.garrettcoates.com" target="_blank" rel="noopener noreferrer" className="popup-link">Visit the Chicken Gallery</a>
            <button className="popup-link" style={{ marginTop: '1.5rem', background: '#d7263d', color: '#fffbe6' }} onClick={handleClosePopup}>No thanks</button>
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
