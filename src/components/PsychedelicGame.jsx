import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Vector3 } from 'three';

const Player = ({ position }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

const Collectible = ({ position }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="gold" emissive="orange" emissiveIntensity={0.5} />
    </mesh>
  );
};

const Obstacle = ({ position }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.z += 0.01;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.5, 0.2, 16, 100]} />
      <meshStandardMaterial color="cyan" wireframe />
    </mesh>
  );
};

const PsychedelicGame = () => {
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0]);
  const [score, setScore] = useState(0);

  const handleKeyDown = (event) => {
    const speed = 0.5;
    switch (event.key) {
      case 'ArrowUp':
        setPlayerPosition([playerPosition[0], playerPosition[1], playerPosition[2] - speed]);
        break;
      case 'ArrowDown':
        setPlayerPosition([playerPosition[0], playerPosition[1], playerPosition[2] + speed]);
        break;
      case 'ArrowLeft':
        setPlayerPosition([playerPosition[0] - speed, playerPosition[1], playerPosition[2]]);
        break;
      case 'ArrowRight':
        setPlayerPosition([playerPosition[0] + speed, playerPosition[1], playerPosition[2]]);
        break;
    }
  };

  return (
    <div className="w-full h-screen" tabIndex={0} onKeyDown={handleKeyDown}>
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Player position={playerPosition} />
        <Collectible position={[2, 0, -2]} />
        <Collectible position={[-2, 0, 2]} />
        <Obstacle position={[0, 0, -3]} />
        <Obstacle position={[3, 0, 0]} />
      </Canvas>
      <div className="absolute top-4 left-4 text-white text-2xl">
        Score: {score}
      </div>
    </div>
  );
};

export default PsychedelicGame;