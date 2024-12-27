"use client"

import { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

// Add keyframe animation for cursor
const styles = `
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

export const TypeWriter = ({ text, speed = 15, delay = 0 }: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0);

  useEffect(() => {
    // Clear any existing timeouts when text changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset state for new text
    setDisplayedText('');
    setIsComplete(false);
    charIndexRef.current = 0;

    // Start typing animation after delay
    timeoutRef.current = setTimeout(() => {
      const typeChar = () => {
        if (charIndexRef.current < text.length) {
          setDisplayedText(text.slice(0, charIndexRef.current + 1));
          charIndexRef.current++;
          timeoutRef.current = setTimeout(typeChar, speed);
        } else {
          setIsComplete(true);
        }
      };

      typeChar();
    }, delay);

    // Cleanup timeouts on unmount or text change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay]);

  useEffect(() => {
    // Add styles to document head
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // Run once on mount

  return (
    <div className="font-mono whitespace-pre-wrap inline">
      {displayedText}
      <span 
        className="inline-block w-1.5 h-3 ml-0.5 align-middle bg-emerald-400"
        style={{ 
          opacity: isComplete ? undefined : 1,
          animation: isComplete ? 'cursorBlink 1s step-end infinite' : undefined 
        }}
      />
    </div>
  );
}; 