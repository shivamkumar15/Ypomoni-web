'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type ScrollRef = React.MutableRefObject<number>

const ACCENT = new THREE.Color('#ff3f68')
const ACCENT_DEEP = new THREE.Color('#be185d')
const ACCENT_BRIGHT = new THREE.Color('#ec1380')
const ACCENT_LIGHT = new THREE.Color('#ffb3c6')

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function fibonacciSphere(count: number, radius: number, seed = 1337) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const golden = Math.PI * (3 - Math.sqrt(5))
  const rand = mulberry32(seed)

  const palette = [ACCENT, ACCENT_BRIGHT, ACCENT_DEEP, ACCENT_LIGHT]

  for (let i = 0; i < count; i++) {
    const t = i / count
    const y = 1 - t * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    const rr = radius * (0.94 + rand() * 0.12)
    positions[i * 3] = Math.cos(theta) * r * rr
    positions[i * 3 + 1] = y * rr
    positions[i * 3 + 2] = Math.sin(theta) * r * rr

    const c = palette[Math.floor(rand() * palette.length)].clone()
    c.lerp(ACCENT_LIGHT, rand() * 0.35)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b

    scales[i] = 0.5 + rand() * 1.6
  }
  return { positions, colors, scales }
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vScale;
  void main() {
    vColor = aColor;
    vScale = aScale;
    vec3 pos = position;
    float wobble = sin(uTime * 0.6 + pos.y * 3.0) * 0.04;
    pos += normalize(pos) * wobble;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vScale;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    alpha = pow(alpha, 1.7);
    gl_FragColor = vec4(vColor * (1.0 + alpha * 0.4), alpha);
  }
`

function ShieldParticles({ scrollRef }: { scrollRef: ScrollRef }) {
  const groupRef = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { pointer } = useThree()

  const { positions, colors, scales } = useMemo(() => fibonacciSphere(4200, 2.5), [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 34 },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
    }),
    []
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t
    }
    if (groupRef.current) {
      const s = scrollRef.current
      const targetRotY = pointer.x * 0.4 + t * 0.04
      const targetRotX = -pointer.y * 0.25 + s * 0.5
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * Math.min(delta * 1.6, 1)
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * Math.min(delta * 1.6, 1)
      const breathe = 1 + Math.sin(t * 0.9) * 0.018
      const scrollScale = 1 - s * 0.35
      groupRef.current.scale.setScalar(breathe * scrollScale)
      groupRef.current.position.z = s * 1.5
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function CoreOrb({ scrollRef }: { scrollRef: ScrollRef }) {
  const wireRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.18
      wireRef.current.rotation.x += delta * 0.07
    }
    if (groupRef.current) {
      const targetY = pointer.x * 0.5
      const targetX = -pointer.y * 0.4
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * Math.min(delta * 1.4, 1)
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * Math.min(delta * 1.4, 1)
      const s = scrollRef.current
      groupRef.current.position.z = s * 1.5
      groupRef.current.scale.setScalar(1 - s * 0.35)
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <Icosahedron args={[1, 4]}>
          <MeshDistortMaterial
            color="#2a0a14"
            emissive="#ff3f68"
            emissiveIntensity={0.9}
            roughness={0.35}
            metalness={0.6}
            distort={0.38}
            speed={1.8}
          />
        </Icosahedron>
        <Icosahedron ref={wireRef} args={[1.32, 1]}>
          <meshBasicMaterial color="#ff3f68" wireframe transparent opacity={0.18} />
        </Icosahedron>
        <Icosahedron args={[1.6, 1]}>
          <meshBasicMaterial color="#be185d" wireframe transparent opacity={0.08} />
        </Icosahedron>
      </Float>
    </group>
  )
}

function AmbientDust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const { positions } = useMemo(() => {
    const rand = mulberry32(7331)
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + rand() * 9
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return { positions: pos }
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffb3c6"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function HeroScene({ scrollRef }: { scrollRef: ScrollRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 0]} intensity={6} color="#ff3f68" distance={12} />
      <pointLight position={[4, 3, 4]} intensity={1.2} color="#ec1380" />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#be185d" />
      <ShieldParticles scrollRef={scrollRef} />
      <CoreOrb scrollRef={scrollRef} />
      <AmbientDust />
    </Canvas>
  )
}
