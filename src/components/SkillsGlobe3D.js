import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Container, Heading, Stack, Text as ChakraText } from '@chakra-ui/react';

// Character sitting at laptop (simplified box representation)
function Character() {
  const groupRef = useRef();
  
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.PI * 0.3;
    }
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Laptop screen */}
      <mesh position={[0, 0.5, 0.5]}>
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Laptop base */}
      <mesh position={[0, -0.2, 0.5]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Head (simplified sphere) */}
      <mesh position={[0, 1.2, -0.3]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#f4a460" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.5, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#f4a460" />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#f4a460" />
      </mesh>

      {/* Glow effect around character */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#4a90e2"
          emissive="#2563eb"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

// Individual skill badge that orbits
function SkillBadge({ position, skill, color, index, totalSkills }) {
  const meshRef = useRef();
  const angle = (index / totalSkills) * Math.PI * 2;
  const radius = 3;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((state) => {
    if (meshRef.current) {
      // Orbit around character
      const t = state.clock.getElapsedTime();
      meshRef.current.position.x = Math.cos(t * 0.3 + angle) * radius;
      meshRef.current.position.z = Math.sin(t * 0.3 + angle) * radius;
      // Gentle bobbing
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.5;
      // Always face camera
      meshRef.current.rotation.y = -state.camera.position.x * 0.001;
    }
  });

  return (
    <group ref={meshRef} position={[x, 0, z]}>
      {/* Skill badge background */}
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      
      {/* Glow around badge */}
      <mesh position={[0, 0, 0.4]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Skill label text */}
      <Text
        position={[0, 0, 1]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.6}
        overflowWrap="break-word"
        textAlign="center"
        fontWeight="bold"
      >
        {skill}
      </Text>
    </group>
  );
}

// Main 3D Scene
function SkillsScene({ skills }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={2}
        rotateSpeed={0.5}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4a90e2" />
      
      {/* Gradient background */}
      <color attach="background" args={["#0f0f1e"]} />
      
      {/* Central character */}
      <Character />
      
      {/* Orbiting skill badges */}
      {skills.map((skill, index) => (
        <SkillBadge
          key={skill.name}
          skill={skill.name}
          color={skill.color}
          index={index}
          totalSkills={skills.length}
        />
      ))}

      {/* Orbital circle indicator */}
      <OrbitRing />
    </>
  );
}

// Visual orbit path
function OrbitRing() {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * 3,
        0,
        Math.sin(angle) * 3
      )
    );
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color="#4a90e2" transparent opacity={0.2} />
    </line>
  );
}

// Skills data with colors
const SKILLS_DATA = [
  { name: 'Python', color: '#3776ab' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Java', color: '#007396' },
  { name: 'SQL', color: '#336791' },
  { name: 'Go', color: '#00add8' },
  { name: 'C++', color: '#00599c' },
  { name: 'React', color: '#61dafb' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'PyTorch', color: '#ee4c2c' },
];

export default function SkillsGlobe3D() {
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container maxW="6xl" id="skills-globe" py={{ base: 12, md: 20 }}>
      <Stack spacing={{ base: 6, md: 12 }}>
        <Box textAlign="center">
          <Heading
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight={800}
            mb={4}
          >
            Tech Skills & Tools
          </Heading>
          <ChakraText color="gray.600" fontSize={{ base: 'md', md: 'lg' }}>
            Drag to rotate • Scroll to zoom • The globe auto-rotates with all the technologies I work with
          </ChakraText>
        </Box>

        {/* 3D Canvas Container */}
        <Box
          ref={containerRef}
          width="100%"
          height={{ base: '400px', md: '600px' }}
          borderRadius="20px"
          overflow="hidden"
          boxShadow="0 20px 60px rgba(0,0,0,0.15)"
          bg="#0f0f1e"
        >
          <Canvas
            style={{
              width: '100%',
              height: '100%',
            }}
            camera={{ position: [0, 2, 6], fov: 50 }}
          >
            <SkillsScene skills={SKILLS_DATA} />
          </Canvas>
        </Box>

        {/* Legend */}
        <Box>
          <ChakraText fontWeight={600} mb={4}>
            Technologies:
          </ChakraText>
          <Box
            display="grid"
            gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={3}
          >
            {SKILLS_DATA.map((skill) => (
              <Box
                key={skill.name}
                display="flex"
                alignItems="center"
                gap={2}
                p={2}
                borderRadius="8px"
                bg={`${skill.color}20`}
              >
                <Box
                  width="12px"
                  height="12px"
                  borderRadius="2px"
                  bg={skill.color}
                />
                <ChakraText fontSize="sm" fontWeight={500}>
                  {skill.name}
                </ChakraText>
              </Box>
            ))}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
