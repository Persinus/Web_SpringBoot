import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function OrbitLab({ onInteract }) {
  const group = useRef()

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18
  })

  const particles = Array.from({ length: 22 }, (_, index) => {
    const angle = (index / 22) * Math.PI * 2
    return [Math.cos(angle) * 2.1, Math.sin(angle * 2) * 0.3, Math.sin(angle) * 2.1]
  })

  return <group ref={group} onClick={onInteract}>
    <mesh rotation={[0.6, 0.4, 0]}>
      <torusGeometry args={[1.35, 0.035, 12, 80]} />
      <meshStandardMaterial color="#51d5c5" emissive="#0c6868" emissiveIntensity={1.8} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.92, 0.025, 10, 64]} />
      <meshStandardMaterial color="#f4c56f" emissive="#7c5420" emissiveIntensity={1.4} />
    </mesh>
    <mesh onPointerOver={onInteract}>
      <icosahedronGeometry args={[0.52, 1]} />
      <meshStandardMaterial color="#8bb8ff" emissive="#254d9a" emissiveIntensity={1.2} roughness={0.24} metalness={0.7} />
    </mesh>
    {particles.map((position, index) => <mesh key={index} position={position}>
      <sphereGeometry args={[index % 3 === 0 ? 0.06 : 0.035, 8, 8]} />
      <meshBasicMaterial color={index % 2 ? '#f59ab1' : '#71d9ed'} />
    </mesh>)}
  </group>
}

export default function InteractiveLab({ onInteract }) {
  return <div className="orbit-lab-canvas" aria-label="Mô hình 3D phòng lab tương tác"><Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.5]}><color attach="background" args={['#0a1725']} /><ambientLight intensity={1.2} /><pointLight position={[3, 3, 4]} color="#51d5c5" intensity={8} /><pointLight position={[-3, -2, 2]} color="#8bb8ff" intensity={5} /><OrbitLab onInteract={onInteract} /></Canvas><span className="orbit-lab-label">INTERACTIVE LAB</span></div>
}
