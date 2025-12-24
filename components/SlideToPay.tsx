'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight } from 'lucide-react';

type SlideToPayProps = {
  onComplete: () => void;
  total: number;
};

export default function SlideToPay({ onComplete, total }: SlideToPayProps) {
  const [dragWidth, setDragWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStart = () => setIsDragging(true);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || completed) return;
    const container = containerRef.current;
    if (!container) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = container.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const maxWidth = rect.width - 60;
    const newWidth = Math.max(0, Math.min(offsetX, maxWidth));
    setDragWidth(newWidth);

    if (newWidth > maxWidth * 0.9) {
      setCompleted(true);
      setIsDragging(false);
      setDragWidth(maxWidth);
      onComplete();
    }
  };

  const handleEnd = () => {
    if (!completed) {
      setIsDragging(false);
      setDragWidth(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove as any);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove as any);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove as any);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, completed]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-4">
        <span className="text-sm font-medium text-gray-500">Total</span>
        <span className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">S${total.toLocaleString()}</span>
      </div>
      <div
        ref={containerRef}
        className={`relative h-14 rounded-full bg-[#f5f5f7] overflow-hidden select-none transition-colors duration-500 ${completed ? 'bg-[#34c759]' : ''}`}
      >
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isDragging ? 'opacity-40' : 'opacity-100'}`}>
          <span className={`text-[13px] font-semibold tracking-wide ${completed ? 'text-white' : 'text-gray-400'}`}>
            {completed ? 'Success' : 'Slide to Purchase'}
          </span>
        </div>

        <div
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{ transform: `translateX(${dragWidth}px)` }}
          className={`absolute top-1 left-1 bottom-1 w-12 h-12 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center transition-all duration-300 z-10 shadow-sm
            ${completed ? 'bg-transparent shadow-none' : 'bg-white'}`}
        >
          {completed ? <Check className="w-6 h-6 text-white" /> : <ChevronRight className="w-6 h-6 text-gray-900" />}
        </div>
      </div>
    </div>
  );
}
