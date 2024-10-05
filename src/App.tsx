import React, { useRef, useEffect, Suspense } from 'react';
  import './App.css';
  import { Canvas, useFrame } from '@react-three/fiber';
  import { Points, PointMaterial, Preload } from '@react-three/drei';
  import * as random from 'maath/random/dist/maath-random.esm';
  
  function App() {
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}> 
        <Canvas camera={{ position: [0, 0, 1] }}>
  
          <Suspense fallback={null}>
            <Points limit={10000} range={100} >
              <PointMaterial
                transparent
                color="#f272c8"
                size={0.005}
                sizeAttenuation={true}
                depthWrite={false}
              />
              <Stars />
            </Points>
            <Preload all />
          </Suspense>
        </Canvas>
  
        <div className="form-container"> {/* Use the form-container class */}
          <h1>Signup</h1>
          <form>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
            </div>
            <button type="submit">Sign up
  </button>
          </form>
        </div>
      </div>
    );
  }
  
  function Stars() {
    const ref = useRef<any>();
    useFrame((state, delta) => {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    });
    const [sphere] = React.useState(() =>
      random.inSphere(new Float32Array(10000), { radius: 1.2 })
    );
    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} />
      </group>
    );
  }
  
  export default App;
  