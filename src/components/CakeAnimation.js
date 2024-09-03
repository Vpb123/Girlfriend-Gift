import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Button , Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles/CakeAnimation.css';

// Styled Material-UI Button
const StyledButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 24px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#ff6f61', // Soft Coral color for a romantic touch
    color: '#ffffff',
    borderRadius: '25px',
    border: '2px solid #ff6f61', // Matching border color
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Soft shadow for depth
    transition: 'background-color 0.3s, transform 0.3s',
    
    // Hover effects
    '&:hover': {
      backgroundColor: '#ff3d3d', // Slightly darker shade for hover effect
    },
    
    // Focus effect
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 4px rgba(255, 111, 97, 0.4)', // Focus ring
    }
  }));
  
// Styled Animated Message
const AnimatedMessage = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#FFC0CB', // Light Pink color for a romantic feel
    textAlign: 'center',
    zIndex: 10,
    opacity: 0,
    background: 'rgba(255, 255, 255, 0.8)', // Soft white background with slight transparency
    borderRadius: '15px', // More rounded corners for a softer look
    padding: '20px 30px', // Added horizontal padding for a more spacious feel
    maxWidth: '80%', // Slightly reduced max-width for better alignment
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // More pronounced shadow for depth
    letterSpacing: '2px', // Increased letter-spacing for elegance
    textShadow: '1px 1px 3px rgba(255, 105, 180, 0.6)', // Light pink shadow for a subtle glow
    fontFamily: "'Dancing Script', cursive", // Romantic and elegant font
  }));
  
// Function to create a realistic flame
const Flame = ({ isBlown }) => {
  const flameRef1 = useRef();
  const flameRef2 = useRef();
  const flameRef3 = useRef();

  // Animate flames using useFrame for continuous flickering
  useFrame(() => {
    if (!isBlown) {
      // Flame 1
      flameRef1.current.scale.y = 1 + Math.sin(Date.now() * 0.005) * 0.1;
      flameRef1.current.position.y = 0.8 + Math.sin(Date.now() * 0.005) * 0.02;

      // Flame 2
      flameRef2.current.scale.y = 0.9 + Math.sin(Date.now() * 0.006) * 0.1;
      flameRef2.current.position.y = 0.75 + Math.sin(Date.now() * 0.006) * 0.025;

      // Flame 3
      flameRef3.current.scale.y = 1.1 + Math.sin(Date.now() * 0.004) * 0.1;
      flameRef3.current.position.y = 0.85 + Math.sin(Date.now() * 0.004) * 0.015;
    }
  });

  // Handle blowing out the flame
  useEffect(() => {
    if (isBlown) {
      gsap.to([flameRef1.current.scale, flameRef2.current.scale, flameRef3.current.scale], {
        y: 0,
        duration: 0.5,
        onComplete: () => {
          flameRef1.current.visible = false;
          flameRef2.current.visible = false;
          flameRef3.current.visible = false;
        },
      });
      gsap.to(
        [flameRef1.current.material, flameRef2.current.material, flameRef3.current.material],
        {
          emissiveIntensity: 0,
          duration: 0.5,
        }
      );
    }
  }, [isBlown]);

  return (
    <>
      {/* Flame Layer 1 */}
      <mesh ref={flameRef1} position={[0, 0.8, 0]}>
        <coneGeometry args={[0.08, 0.3, 32]} />
        <meshStandardMaterial
          color={'orange'}
          emissive={'yellow'}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Flame Layer 2 */}
      <mesh ref={flameRef2} position={[0, 0.75, 0]}>
        <coneGeometry args={[0.06, 0.25, 32]} />
        <meshStandardMaterial
          color={'yellow'}
          emissive={'orange'}
          emissiveIntensity={1}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Flame Layer 3 */}
      <mesh ref={flameRef3} position={[0, 0.85, 0]}>
        <coneGeometry args={[0.07, 0.28, 32]} />
        <meshStandardMaterial
          color={'red'}
          emissive={'orange'}
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
};

// Candle component with realistic flame
const Candle = ({ position, onBlow, isBlown, index }) => {
  const candleRef = useRef();
  const wickRef = useRef();
  const meltingWaxRef = useRef();

  const blowCandle = () => {
    if (!isBlown) {
      gsap.to(candleRef.current.scale, { y: 0, duration: 0.5 });
      gsap.to(meltingWaxRef.current.scale, { y: 0.8, duration: 0.5, ease: "power2.inOut" });
      onBlow(index); // Trigger blow action
    }
  };

  useEffect(() => {
    if (isBlown) {
      gsap.to(candleRef.current.scale, { y: 0, duration: 0.5 });
      gsap.to(wickRef.current.scale, { y: 0, duration: 0.5 });
      gsap.to(meltingWaxRef.current.scale, { y: 0.8, duration: 0.5, ease: "power2.inOut" });
    }
  }, [isBlown]);

  return (
    <group position={position}>
      {/* Candle Body */}
      <mesh ref={candleRef} onClick={blowCandle} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.8, 32]} />
        <meshStandardMaterial color="#f4f4f2" />
      </mesh>
      {/* Wick */}
      <mesh ref={wickRef} position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.1, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Melting Wax */}
      <mesh ref={meltingWaxRef} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.1, 32]} />
        <meshStandardMaterial color="#f4f4f2" transparent opacity={0.5} />
      </mesh>
      {/* Flames */}
      {!isBlown && <Flame isBlown={isBlown} />}
      {!isBlown && <pointLight position={[0, 0.8, 0]} intensity={1} distance={2} color="orange" />}
    </group>
  );
};

// Cake component
const Cake = ({ onBlow, blowAllCandles }) => {
  const [blownCandles, setBlownCandles] = useState([]);
  const cakeRef = useRef();

  const handleBlow = (index) => {
    setBlownCandles((prev) => [...prev, index]);
    onBlow(); // Additional handling if needed
  };

  useEffect(() => {
    if (blowAllCandles) {
      const allCandles = Array.from({ length: 24 }, (_, i) => i);
      setBlownCandles(allCandles);
      gsap.to(cakeRef.current.children, {
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        onComplete: () => {
          // Animate the cake after a delay
          gsap.to(cakeRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1, 
            ease: "power2.inOut",
          });
          gsap.to(cakeRef.current.material, {
            opacity: 0,
            duration: 1,
            delay: 0.1, // Same delay as above
            ease: "power2.inOut",
            onComplete: () => {
              cakeRef.current.visible = false;
            },
          });
        },
      });
    }
  }, [blowAllCandles]);

  const candles = [];
  const radius = 1.8;
  const numCandles = 24;

  for (let i = 0; i < numCandles; i++) {
    const angle = (i / numCandles) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    candles.push([x, 0.6, z]);
  }

  return (
    <group ref={cakeRef} >
      {/* Cake Base */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#d2691e" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Cream Layer */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.3, 32]} />
        <meshStandardMaterial color="#f5deb3" roughness={0.9} metalness={0.2} />
      </mesh>
      {/* Candles */}
      {candles.map((pos, i) => (
        <Candle
          key={i}
          position={pos}
          onBlow={handleBlow}
          isBlown={blownCandles.includes(i)}
          index={i}
        />
      ))}
    </group>
  );
};

const CakeAnimation = ({ onAnimationEnd }) => {
    const [messageVisible, setMessageVisible] = useState(false);
    const [blowAllCandles, setBlowAllCandles] = useState(false);
    const messageRef = useRef();
  
    const handleBlow = () => {
      setTimeout(() => {
        setMessageVisible(true);
        gsap.to(messageRef.current, { opacity: 1, duration: 1 });
        gsap.to(messageRef.current, { opacity: 0, duration: 1, delay: 4, onComplete: onAnimationEnd });
      }, 3000);
    };
  
    const handleBlowOutClick = () => {
      setBlowAllCandles(true);
      handleBlow(); // Trigger the blow all candles action
    };
  
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'transparent' }}>
        <Canvas camera={{ position: [0, 4, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Cake onBlow={handleBlow} blowAllCandles={blowAllCandles} />
        </Canvas>
        <AnimatedMessage ref={messageRef}>
          To the love of my life, Happy Birthday! You make every day brighter with your smile and warmth. I hope your special day is filled with joy and love.
        </AnimatedMessage>
        <StyledButton onClick={handleBlowOutClick}>
          Make a Wish
        </StyledButton>
      </div>
    );
  };
  
  export default CakeAnimation;
