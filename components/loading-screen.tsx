import { Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 backdrop-blur-sm z-50">
      <div className="space-y-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-400 mx-auto" />
        <div className="space-y-2">
          <p className="text-emerald-400 font-mono text-sm animate-pulse">
            LOADING CRIMINAL MODEL...
          </p>
          <div className="flex justify-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span 
                key={i} 
                className="text-emerald-400 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                ▊
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

