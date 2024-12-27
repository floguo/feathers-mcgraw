"use client"

import dynamic from 'next/dynamic'

// Create a dynamic import of the actual viewer component with SSR disabled
const GLBViewer = dynamic(() => import('@/components/glb-viewer-component'), {
  ssr: false,
  loading: () => <div>Loading 3D viewer...</div>
})

export const CustomGLBViewer = () => {
  return <GLBViewer />
}

