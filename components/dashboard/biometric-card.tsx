import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface BiometricCardProps {
  species: string;
  height: string;
  weight: string;
  distinguishingFeatures: string[];
}

export function BiometricCard({ species, height, weight, distinguishingFeatures }: BiometricCardProps) {
  return (
    <Card className="bg-gray-800 border-emerald-400 border">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2 text-emerald-300">
          <Target className="h-4 w-4" />
          BIOMETRIC ANALYSIS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-2 text-emerald-100">
          <div className="text-emerald-300">SPECIES:</div>
          <div>{species}</div>
          <div className="text-emerald-300">HEIGHT:</div>
          <div>{height}</div>
          <div className="text-emerald-300">WEIGHT:</div>
          <div>{weight}</div>
        </div>
        <div className="mt-2">
          <div className="mb-2 text-emerald-300">DISTINGUISHING FEATURES:</div>
          <ul className="list-none space-y-2">
            {distinguishingFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-emerald-100">
                <span className="text-emerald-400">[{String(index).padStart(2, '0')}]</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 