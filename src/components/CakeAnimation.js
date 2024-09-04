import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { styled } from '@mui/material/styles';
import '../styles/CakeAnimation.css';

const AnimatedMessage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#FFC0CB',
  textAlign: 'center',
  zIndex: 10,
  opacity: 0,
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '15px',
  padding: '20px 30px',
  maxWidth: '80%',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  letterSpacing: '2px',
  textShadow: '1px 1px 3px rgba(255, 105, 180, 0.6)',
  fontFamily: "'Dancing Script', cursive",
}));

const RomanticMessage = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  bottom: '20%',
  transform: 'translateX(-50%)',
  fontSize: '1.2rem',
  color: '#FFC0CB',
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '10px',
  padding: '10px 20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  fontFamily: "'Dancing Script', cursive",
}));

const CakeAnimation = ({ onAnimationEnd }) => {
  const [blowAllCandles, setBlowAllCandles] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  
  const messageRef = useRef(null);
  const cakeRef = useRef(null);
  const flameRef = useRef(null);

  // Audio Context for volume detection
  useEffect(() => {
    const handleMicrophoneInput = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          
          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          
          const checkVolume = () => {
            analyser.getByteFrequencyData(dataArray);
            const averageVolume = dataArray.reduce((a, b) => a + b) / dataArray.length;
            
            if (averageVolume > 100) { // Adjust this threshold as needed
              setBlowAllCandles(true);
            }
          };
          
          const interval = setInterval(checkVolume, 100);
          
          return () => {
            clearInterval(interval);
            stream.getTracks().forEach(track => track.stop());
          };
        });
    };
    
    handleMicrophoneInput();
  }, []);

  useEffect(() => {
    if (blowAllCandles && flameRef.current) {
      flameRef.current.classList.add('flame-blown');
      
      setTimeout(() => {
        cakeRef.current.classList.add('cake-hidden');
        setMessageVisible(true);
        setTimeout(() => {
          console.log("animated message");
          if (messageRef.current) {
            gsap.to(messageRef.current, { opacity: 1, duration: 1 });
            gsap.to(messageRef.current, { opacity: 0, duration: 1, delay: 6, onComplete: onAnimationEnd });
          } else {
            console.log("messageRef.current is undefined");
          }
        }, 3000); // Wait for cake fade-out before showing the message
      }, 2000); // Delay for candle blow animation
    }
  }, [blowAllCandles, onAnimationEnd]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'transparent' }}>
      <div ref={cakeRef} className="cake-container">
        <div className="cake">
          <div className="plate"></div>
          <div className="layer layer-bottom"></div>
          <div className="layer layer-middle"></div>
          <div className="layer layer-top"></div>
          <div className="icing"></div>
          <div className="drip drip1"></div>
          <div className="drip drip2"></div>
          <div className="drip drip3"></div>
          <div className="candle">
            <div className="flame" ref={flameRef}></div>
          </div>
        </div>
        <RomanticMessage>
          Make a wish, blow in microphone
        </RomanticMessage>
      </div>

      {messageVisible && (
        <AnimatedMessage ref={messageRef}>
          To the love of my life, Happy Birthday! You make every day brighter with your smile and warmth. I hope your special day is filled with joy and love.
        </AnimatedMessage>
      )}
    </div>
  );
};

export default CakeAnimation;
