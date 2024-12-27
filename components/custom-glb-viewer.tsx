"use client"

import dynamic from 'next/dynamic'

// Create a dynamic import of the actual viewer component with SSR disabled
const GLBViewer = dynamic(() => import('@/components/glb-viewer-component'), {
  ssr: false,
  loading: () => <div className="text-emerald-400 h-full w-full flex items-center justify-center">
    LOADING 3D MODELS...</div>
})

export const CustomGLBViewer = () => {
  return <GLBViewer />
}

