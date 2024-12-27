"use client"

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Target, FileText, Shield, Wifi, Radio, AlertTriangle, CuboidIcon } from 'lucide-react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import * as THREE from 'three';
import { LoadingScreen } from '@/components/loading-screen'

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes typing {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes sweep {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-typing {
    animation: typing 0.5s ease-out forwards;
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

const models = [
  {
    name: "Model 1",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/https___blendergptv2-jobs.s3.us-east-2.amazonaws.com_generated-images_183678.png-mOoiro6CuW7o7kp9cBfzyh465Rwt9F.glb",
  },
  {
    name: "Model 2",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/https___blendergptv2-jobs.s3.us-east-2.amazonaws.com_generated-images_84904.png-9fXfBFmqk6Zce8G1gZ4cGUdCATKAR1.glb",
  },
];

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

const FeathersDashboard = () => {
  const [timeString, setTimeString] = useState('');
  const [blinkStatus, setBlinkStatus] = useState(true);
  const [loadedSections, setLoadedSections] = useState<string[]>([]);
  const [radarAngle, setRadarAngle] = useState(0);
  const [currentModelUrl, setCurrentModelUrl] = useState(models[0].url);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    const timer = setInterval(() => {
      const now = new Date();
      setTimeString(now.toISOString());
      setBlinkStatus(prev => !prev);
    }, 1000);

    const radarTimer = setInterval(() => {
      setRadarAngle(prev => (prev + 2) % 360);
    }, 20);

    const sections = ['header', 'biometrics', 'surveillance', 'operations', '3dviewer'];
    sections.forEach((section, index) => {
      setTimeout(() => {
        setLoadedSections(prev => [...prev, section]);
      }, index * 800);
    });

    return () => {
      clearInterval(timer);
      clearInterval(radarTimer);
      document.head.removeChild(styleElement);
    };
  }, []);

  const criminalProfile = {
    name: "FEATHERS McGRAW",
    alias: "THE PENGUIN",
    threatLevel: "EXTREME",
    classificationLevel: "OMEGA",
    species: "Penguin (Criminal Mastermind)",
    height: "2 feet 3 inches",
    distinguishingFeatures: [
      "Master of Disguise - Primary: Rubber Glove Chicken Costume",
      "Silent Operator - No Known Vocalizations",
      "Advanced Engineering Expertise",
      "Tool Manipulation Despite Flippers",
      "Exceptional Problem-Solving Capabilities"
    ],
    lastSeen: {
      location: "62 West Wallaby Street, Wigan",
      timestamp: "1993-11-15T14:23:00Z",
      status: "ESCAPED"
    },
    knownPlots: [
      {
        operationName: "OPERATION TROUSERS",
        date: "1993",
        primaryTarget: "CITY MUSEUM DIAMOND",
        methodology: "Cybernetic Lower-Body Enhancement (Modified Techno-Trousers)",
        outcome: "NEUTRALIZED",
        operativeInvolved: "GROMIT",
        details: "Orchestrated sophisticated heist utilizing stolen mechanical enhancement technology. Demonstrated advanced understanding of robotics and urban infiltration techniques."
      }
    ],
    threatAssessment: [
      "Genius-Level Intelligence",
      "Advanced Technical Expertise",
      "Masterful Disguise Artist",
      "Strategic Planning Specialist",
      "High Escape Risk"
    ]
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8 bg-gray-950 text-emerald-300 font-mono">
      {/* Top Bar */}
      <div 
        className={`flex justify-between items-center mb-6 opacity-0 ${loadedSections.includes('header') ? 'opacity-100' : ''}`}
        style={{
          animation: 'fadeIn 0.5s ease-out forwards',
          textShadow: '0 0 10px rgba(52, 211, 153, 0.5)'
        }}
      >
        <div className="flex items-center gap-4">
          <Shield className="h-8 w-8" />
          <div>
            <div className="text-xs text-emerald-200">CLASSIFIED DATABASE ACCESS</div>
            <div className="text-sm">{timeString}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Wifi className={`h-5 w-5 ${blinkStatus ? 'opacity-100' : 'opacity-30'}`} />
          <Radio className={`h-5 w-5 ${!blinkStatus ? 'opacity-100' : 'opacity-30'}`} />
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-gray-900 border-emerald-400 border shadow-lg max-w-7xl mx-auto">
        <CardHeader className="border-b border-emerald-400">
          <div className={`flex items-center justify-between opacity-0 ${loadedSections.includes('header') ? 'animate-typing' : ''}`}>
            <div>
              <div className="text-xs text-emerald-200">SUBJECT CLASSIFICATION: {criminalProfile.classificationLevel}</div>
              <CardTitle className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                {criminalProfile.name}
                <AlertTriangle className={`h-6 w-6 text-yellow-500 ${blinkStatus ? 'opacity-100' : 'opacity-50'}`} />
              </CardTitle>
            </div>
            <div className="text-right">
              <div className="text-xs text-emerald-200">THREAT LEVEL</div>
              <div className="text-red-400 font-bold animate-pulse">{criminalProfile.threatLevel}</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Biometric Analysis */}
          <Card className={`bg-gray-800 border-emerald-400 border transform transition-all duration-500 ${
            loadedSections.includes('biometrics') ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
                <Target className="h-4 w-4" />
                BIOMETRIC ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2 text-emerald-100">
                <div className="text-emerald-300">SPECIES:</div>
                <div>{criminalProfile.species}</div>
                <div className="text-emerald-300">HEIGHT:</div>
                <div>{criminalProfile.height}</div>
              </div>
              <div className="mt-4">
                <div className="mb-2 text-emerald-300">DISTINGUISHING FEATURES:</div>
                <ul className="list-none space-y-2">
                  {criminalProfile.distinguishingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-emerald-100">
                      <span className="text-emerald-400">[{String(index).padStart(2, '0')}]</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Last Known Location */}
          <Card className={`bg-gray-800 border-emerald-400 border transform transition-all duration-500 ${
            loadedSections.includes('surveillance') ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
                <MapPin className="h-4 w-4" />
                SURVEILLANCE STATUS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {/* Radar Display */}
              <div className="w-full h-48 mb-4 relative">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="100"
                    fill="none"
                    stroke="rgb(52, 211, 153)"
                    strokeWidth="2"
                  />
                  {[1, 2, 3, 4].map((ring) => (
                    <circle
                      key={ring}
                      cx="100"
                      cy="100"
                      r={ring * 20}
                      fill="none"
                      stroke="rgba(52, 211, 153, 0.2)"
                      strokeWidth="1"
                    />
                  ))}
                  <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1" />
                  <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1" />
                  <path
                    d={`M 100,100 L 100,0 A 100,100 0 ${radarAngle > 180 ? 1 : 0} 1 ${
                      100 + Math.sin(radarAngle * Math.PI / 180) * 100
                    } ${
                      100 - Math.cos(radarAngle * Math.PI / 180) * 100
                    } Z`}
                    fill="rgba(52, 211, 153, 0.2)"
                  />
                  <line
                    x1="100"
                    y1="100"
                    x2={100 + Math.sin(radarAngle * Math.PI / 180) * 100}
                    y2={100 - Math.cos(radarAngle * Math.PI / 180) * 100}
                    stroke="rgba(52, 211, 153, 1)"
                    strokeWidth="2"
                  />
                  <circle cx="140" cy="60" r="3" fill="rgb(239, 68, 68)" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-2 text-emerald-100">
                <div className="text-emerald-300">LOCATION:</div>
                <div>{criminalProfile.lastSeen.location}</div>
                <div className="text-emerald-300">TIMESTAMP:</div>
                <div>{criminalProfile.lastSeen.timestamp}</div>
                <div className="text-emerald-300">STATUS:</div>
                <div className="text-red-400 animate-pulse">{criminalProfile.lastSeen.status}</div>
              </div>
              <div className="mt-4">
                <div className="mb-2 text-emerald-300">THREAT ASSESSMENT:</div>
                <ul className="list-none space-y-2">
                  {criminalProfile.threatAssessment.map((threat, index) => (
                    <li key={index} className="flex items-start gap-2 text-emerald-100">
                      <span className="text-emerald-400">[{String(index).padStart(2, '0')}]</span>
                      {threat}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 3D Model Viewer */}
          <Card className={`bg-gray-800 border-emerald-400 border md:col-span-2 transform transition-all duration-500 ${
            loadedSections.includes('3dviewer') ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
                <CuboidIcon className="h-4 w-4" />
                3D MODEL ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full relative">
                <Canvas shadows>
                  <color attach="background" args={["#1f2937"]} />
                  
                  <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
                  
                  {/* Lighting */}
                  <ambientLight intensity={0.8} />
                  <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.5}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                  />
                  <pointLight position={[-5, 5, -5]} intensity={0.5} />

                  {/* Environment */}
                  <Environment preset="warehouse" background blur={0.6} />

                  {/* Model */}
                  <Suspense fallback={<LoadingScreen />}>
                    <Model url={currentModelUrl} />
                  </Suspense>

                  {/* Shadows */}
                  <ContactShadows
                    position={[0, -0.99, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2}
                    far={4}
                  />

                  {/* Controls */}
                  <OrbitControls 
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    enableZoom={true}
                    enablePan={true}
                  />
                </Canvas>

                {/* Model Selector */}
                <div className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
                  <RadioGroup 
                    defaultValue={models[0].url} 
                    onValueChange={(value) => setCurrentModelUrl(value)}
                  >
                    {models.map((model) => (
                      <div key={model.url} className="flex items-center space-x-2">
                        <RadioGroupItem value={model.url} id={model.name} />
                        <Label htmlFor={model.name} className="text-emerald-300 text-xs">{model.name}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Known Operations */}
          <Card className={`bg-gray-800 border-emerald-400 border md:col-span-2 transform transition-all duration-500 ${
            loadedSections.includes('operations') ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
                <FileText className="h-4 w-4" />
                KNOWN OPERATIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              {criminalProfile.knownPlots.map((plot, index) => (
                <div key={index} className="border-l border-emerald-400 pl-4 mb-4 text-sm">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-emerald-100">
                    <div className="text-emerald-300">OPERATION NAME:</div>
                    <div>{plot.operationName}</div>
                    <div className="text-emerald-300">DATE:</div>
                    <div>{plot.date}</div>
                    <div className="text-emerald-300">PRIMARY TARGET:</div>
                    <div>{plot.primaryTarget}</div>
                    <div className="text-emerald-300">METHODOLOGY:</div>
                    <div>{plot.methodology}</div>
                    <div className="text-emerald-300">OUTCOME:</div>
                    <div className="text-yellow-400">{plot.outcome}</div>
                    <div className="text-emerald-300">OPERATIVE:</div>
                    <div>{plot.operativeInvolved}</div>
                    <div className="col-span-2 mt-2">
                      <div className="text-emerald-300 mb-1">OPERATION DETAILS:</div>
                      <div className="pl-4">{plot.details}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-xs text-emerald-200/70 text-center animate-pulse">
        AUTHORIZED ACCESS ONLY • LEVEL 5 CLEARANCE REQUIRED • MONITORING ACTIVE
      </div>
    </div>
  );
};

export default FeathersDashboard;

// Pre-load all models
models.forEach(model => useGLTF.preload(model.url));

