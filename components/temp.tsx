"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, MapPin, Target, Clock, FileText, Shield, Wifi, Radio, AlertTriangle, CuboidIcon as CubeIcon } from 'lucide-react';
import { CustomGLBViewer } from './custom-glb-viewer';

// ... (keep the existing styles and criminalProfile object)

const FeathersDashboard = () => {
  const [timeString, setTimeString] = useState('');
  const [blinkStatus, setBlinkStatus] = useState(true);
  const [loadedSections, setLoadedSections] = useState<string[]>([]);
  const [radarAngle, setRadarAngle] = useState(0);

  useEffect(() => {
    // ... (keep the existing useEffect logic)

    // Add '3dviewer' to the sections array
    const sections = ['header', 'biometrics', 'surveillance', 'operations', '3dviewer'];
    sections.forEach((section, index) => {
      setTimeout(() => {
        setLoadedSections(prev => [...prev, section]);
      }, index * 800);
    });

    // ... (keep the rest of the useEffect logic)
  }, []);

  // ... (keep the existing criminalProfile object)

  return (
    <div className="w-full max-w-4xl p-4 space-y-4 bg-gray-950 text-emerald-300 font-mono">
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
      
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* ... (keep the existing Biometric Analysis and Surveillance Status cards) */}

        {/* 3D Model Viewer */}
        <Card className={`bg-gray-800 border-emerald-400 border md:col-span-2 transform transition-all duration-500 ${
          loadedSections.includes('3dviewer') ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
              <CubeIcon className="h-4 w-4" />
              3D MODEL ANALYSIS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <CustomGLBViewer />
            </div>
          </CardContent>
        </Card>

        {/* ... (keep the existing Known Operations card) */}
      </CardContent>

      {/* ... (keep the existing footer) */}
    </div>
  );
};

export default FeathersDashboard;

