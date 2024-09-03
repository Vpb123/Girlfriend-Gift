import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import NameInput from './components/NameInput';
import CakeAnimation from './components/CakeAnimation';
import BalloonAnimation from './components/BalloonAnimation';
import FinalMessage from './components/FinalMessage';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  const [stage, setStage] = useState(0);
  const [name, setName] = useState('');
  const [showTransitionMessage, setShowTransitionMessage] = useState(false);

  const handleNameEntered = (enteredName) => {
    setName(enteredName);
    setStage(1);
  };

  const handleCakeAnimationEnd = () => {
    setShowTransitionMessage(true);
    setTimeout(() => {
      setShowTransitionMessage(false);
      setStage(2);
    }, 5000); // Display the transition message for 5 seconds
  };

  const handleBalloonAnimationEnd = () => {
    setStage(3);
  };

  return (
    <div className="App">
      {stage === 0 && <NameInput onNameEntered={handleNameEntered} />}
      {stage === 1 && !showTransitionMessage && <CakeAnimation onAnimationEnd={handleCakeAnimationEnd} />}
      {showTransitionMessage && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontFamily: 'cursive',
              color: '#d52a2a',
              animation: 'fadeIn 2s ease-out',
            }}
          >
            Wait a little honey...
          </Typography>
          <CircularProgress
            size={80} // Larger progress circle
            sx={{ color: '#d52a2a', animation: 'spin 2s linear infinite' }} // Apply color and animation
          />
        </Box>
      )}
      {stage === 2 && !showTransitionMessage && (
        <>
          <BalloonAnimation onBalloonAnimationEnd={handleBalloonAnimationEnd} />
          <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              <Gallery />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
              <FinalMessage name={name} />
            </Box>
          </Box>
        </>
      )}
      {stage === 3 && (
        <>
          <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Gallery />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
              <FinalMessage name={name} />
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}

export default App;
