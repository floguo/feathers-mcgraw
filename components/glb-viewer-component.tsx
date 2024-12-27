"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  Loader,
  PerspectiveCamera,
  ContactShadows
} from "@react-three/drei"
import * as THREE from 'three'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const models = [
  {
    name: "Model 1",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/https___blendergptv2-jobs.s3.us-east-2.amazonaws.com_generated-images_183678.png-mOoiro6CuW7o7kp9cBfzyh465Rwt9F.glb",
  },
  {
    name: "Model 2",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/https___blendergptv2-jobs.s3.us-east-2.amazonaws.com_generated-images_84904.png-9fXfBFmqk6Zce8G1gZ4cGUdCATKAR1.glb",
  },
]

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>()

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.PI;
    }
  }, [])

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.PI + state.clock.elapsedTime * 0.2;
    }
  })

  return <primitive 
    ref={modelRef} 
    object={scene} 
    scale={2}
  />
}

const GLBViewerComponent = () => {
  const [currentModelUrl, setCurrentModelUrl] = useState(models[0].url)

  return (
    <div className="relative w-full h-full bg-gray-800">
      <Canvas shadows>
        <PerspectiveCamera 
          makeDefault 
          position={[0, 5, 2]} 
          fov={25} 
        />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />
        <Environment preset="warehouse" background={false} />
        <Suspense fallback={null}>
          <Model url={currentModelUrl} />
        </Suspense>
        <ContactShadows position={[0, -0.99, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <OrbitControls 
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableZoom={true}
          enablePan={false}
        />
      </Canvas>

      <div className="absolute bottom-2 bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
        <RadioGroup defaultValue={models[0].url} onValueChange={setCurrentModelUrl} className="space-y-1">
          {models.map((model) => (
            <div key={model.url} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={model.url} 
                id={model.name} 
                className="border-emerald-400 text-emerald-400 focus:border-emerald-500"
              />
              <Label htmlFor={model.name} className="text-emerald-300 text-xs">
                {model.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Loader />
    </div>
  )
}

models.forEach(model => useGLTF.preload(model.url))

export default GLBViewerComponent