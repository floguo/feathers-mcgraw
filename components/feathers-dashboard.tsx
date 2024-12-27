"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, MapPin, Target, Clock, FileText, CuboidIcon as CubeIcon, Shield, Wifi, Radio, AlertTriangle } from 'lucide-react';
import { CustomGLBViewer } from './custom-glb-viewer';

// Add keyframes styles to a style tag
const styles = `
  @keyframes typing {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes sweep {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; filter: drop-shadow(0 0 8px rgb(239 68 68)); }
    50% { opacity: 0.4; filter: drop-shadow(0 0 2px rgb(239 68 68)); }
  }

  .animate-typing {
    animation: typing 0.5s ease-out forwards;
  }
`;

const FeathersDashboard = () => {
  const [timeString, setTimeString] = useState('');
  const [blinkStatus, setBlinkStatus] = useState(true);
  const [loadedSections, setLoadedSections] = useState<string[]>([]);
  const [radarAngle, setRadarAngle] = useState(0);
  const [selectedYear, setSelectedYear] = useState('1993');

  useEffect(() => {
    // Add styles to document head
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    const timer = setInterval(() => {
      const now = new Date();
      setTimeString(now.toISOString());
      setBlinkStatus(prev => !prev);
    }, 1000);

    // Radar scanning animation
    const radarTimer = setInterval(() => {
      setRadarAngle(prev => (prev + 2) % 360);
    }, 20);

    // Simulate sections loading in sequence
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
    species: "Penguin",
    height: "3.0 ft",
    weight: "12 lbs",
    distinguishingFeatures: [
      "Master of Disguise - Primary: Rubber Glove Chicken Costume",
      "Silent Operator - No Known Vocalizations",
      "Advanced Engineering Expertise",
      "Tool Manipulation Despite Flippers",
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

  // First, add the operations data by year
  const operationsByYear = {
    1993: [
      {
        operationName: "OPERATION TROUSERS",
        date: "1993",
        primaryTarget: "MUSEUM DIAMOND",
        methodology: "INFILTRATION & TECHNO-TROUSERS HIJACK",
        outcome: "CAPTURED",
        operativeInvolved: "GROMIT",
        details: "Subject infiltrated residence at 62 West Wallaby Street posing as lodger. Modified existing Techno-Trousers with remote control capabilities. Used sleeping resident as unwitting accomplice in museum heist. Pursuit ended in model train chase. Subject apprehended and transferred to West Wallaby Zoo."
      }
    ],
    2003: [
      {
        operationName: "OPERATION ZOO COUP",
        date: "2003",
        primaryTarget: "WEST WALLABY ZOO CONTROL",
        methodology: "FORCED LABOR & MECHANIZED WARFARE",
        outcome: "NEUTRALIZED",
        operativeInvolved: "ZOO SECURITY",
        details: "From containment, orchestrated zoo-wide takeover. Established illegal diamond mining operation using captive animal labor. Deployed automated penguin units and mining machinery. Final confrontation involved weaponized exoskeleton with missile capabilities. Threat contained by coordinated zoo animal response."
      }
    ],
    2024: [
      {
        operationName: "OPERATION GARDEN GNOME",
        date: "2024",
        primaryTarget: "CITYWIDE INFRASTRUCTURE",
        methodology: "REMOTE HACKING & ROBOTIC MANIPULATION",
        outcome: "ESCAPED",
        operativeInvolved: "GROMIT",
        details: "Remotely compromised Norbot garden gnome system. Orchestrated city-wide theft campaign via robotic proxies. Constructed submarine for sewer-based exfiltration. Original Blue Diamond discovered in historical teapot. Subject last seen boarding Yorkshire-bound train with counterfeit diamond (actually turnip)."
      }
    ]
  };

  return (
    <div className="h-screen w-full p-4 bg-gray-950 text-emerald-300 font-mono">
      {/* Top Bar - make it more compact on mobile */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Shield className="h-6 w-6 sm:h-8 sm:w-8" />
          <div>
            <div className="text-[10px] sm:text-xs text-emerald-200">CLASSIFIED DATABASE ACCESS</div>
            <div className="text-xs sm:text-sm font-mono">
              {timeString || '0000-00-00T00:00:00Z'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Wifi className={`h-5 w-5 ${blinkStatus ? 'opacity-100' : 'opacity-30'}`} />
          <Radio className={`h-5 w-5 ${!blinkStatus ? 'opacity-100' : 'opacity-30'}`} />
        </div>
      </div>

      {/* Main Card */}
      <Card className="bg-gray-900 border-emerald-400 border h-auto">
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

        <CardContent className="grid grid-cols-4 gap-2 p-2 h-full overflow-y-auto">
          {/* 3D Model Viewer - adjust height */}
          <Card className="bg-gray-800 border-emerald-400 border col-span-1">
            <CardHeader className="h-[40px]">
              <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
                 <Target className="h-4 w-4" />
                  BIOMETRIC ANALYSIS
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <CustomGLBViewer />
              </div>
               <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2 text-emerald-100">
                  <div className="text-emerald-300">SPECIES:</div>
                  <div>{criminalProfile.species}</div>
                  <div className="text-emerald-300">HEIGHT:</div>
                  <div>{criminalProfile.height}</div>
                  <div className="text-emerald-300">WEIGHT:</div>
                  <div>{criminalProfile.weight}</div>
                </div>
            </div>
            </CardContent>
          </Card>
          

          {/* Right side cards - reduce spacing */}
          <div className="col-span-3 space-y-2">
            <Card className="bg-gray-800 border-emerald-400 border">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
                  <MapPin className="h-4 w-4" />
                  SURVEILLANCE STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 text-sm">
                {/* Column 1: Radar Display */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-emerald-100">
                    <div className="text-emerald-300">LOCATION:</div>
                    <div>{criminalProfile.lastSeen.location}</div>
                    <div className="text-emerald-300">TIMESTAMP:</div>
                    <div>{criminalProfile.lastSeen.timestamp}</div>
                    <div className="text-emerald-300">STATUS:</div>
                    <div className="text-red-400 animate-pulse">{criminalProfile.lastSeen.status}</div>
                  </div>
                </div>

                {/* Column 2: Location Info */}
                <div>
                  <div className="w-full h-36 relative">
                    <svg className="w-full h-full" viewBox="-10 -10 220 220">
                      {/* Radar elements */}
                      <circle cx="100" cy="100" r="98" fill="none" stroke="rgb(52, 211, 153)" strokeWidth="2" />
                      {/* Background circles */}
                      {[1, 2, 3, 4].map((ring) => (
                        <circle key={ring} cx="100" cy="100" r={ring * 20} fill="none" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1" />
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
                        x1="100" y1="100"
                        x2={100 + Math.sin(radarAngle * Math.PI / 180) * 100}
                        y2={100 - Math.cos(radarAngle * Math.PI / 180) * 100}
                        stroke="rgba(52, 211, 153, .5)"
                        strokeWidth="2"
                      />
                      <circle 
                        cx="140" 
                        cy="60" 
                        r="3" 
                        fill="rgb(239 68 68)"
                        style={{
                          animation: 'blink 2s ease-in-out infinite',
                        }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Column 3: Distinguishing Features */}
                <div>
                  <div className="text-emerald-300 mb-2">DISTINGUISHING FEATURES:</div>
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
            {/* Bottom card */}
          <Card className="bg-gray-800 border-emerald-400 border col-span-4 mt-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
                <FileText className="h-4 w-4" />
                KNOWN OPERATIONS
              </CardTitle>
              <div className="flex gap-2">
                {Object.keys(operationsByYear).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-2 py-1 text-xs rounded border border-emerald-400 
                      ${selectedYear === year 
                        ? 'bg-emerald-400 text-gray-900' 
                        : 'bg-transparent text-emerald-400 hover:bg-emerald-400/10'
                      }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {operationsByYear[selectedYear as unknown as keyof typeof operationsByYear].map((plot: {
                operationName: string;
                date: string;
                primaryTarget: string;
                methodology: string;
                outcome: string;
                operativeInvolved: string;
                details: string;
              }, index: number) => (
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
          </div>
        </CardContent>
      </Card>

      {/* Footer - smaller on mobile */}
      <div className="text-[10px] sm:text-xs text-emerald-200/70 text-center animate-pulse py-2">
        AUTHORIZED ACCESS ONLY • LEVEL 5 CLEARANCE REQUIRED • MONITORING ACTIVE
      </div>
    </div>
  );
};

export default FeathersDashboard;