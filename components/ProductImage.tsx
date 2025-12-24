'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type ProductImageProps = {
  category: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function ProductImage({ 
  category, 
  alt, 
  className = '',
  priority = false
}: ProductImageProps) {
  const [images, setImages] = useState<Array<{
    url: string;
    alt: string;
    photographer: string;
    photographerUrl: string;
  }>>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch(`/images/${category.toLowerCase()}.json`);
        const data = await response.json();
        if (data && data.length > 0) {
          setImages(data);
        }
      } catch (error) {
        console.error(`Error loading ${category} images:`, error);
      }
    };

    loadImages();
  }, [category]);

  if (images.length === 0) {
    return (
      <div className={`bg-gray-100 animate-pulse ${className}`}></div>
    );
  }

  const currentImage = images[currentImageIndex % images.length];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={currentImage.url}
        alt={alt || currentImage.alt}
        fill
        className="object-cover"
        priority={priority}
        onError={() => {
          setCurrentImageIndex(prev => prev + 1);
        }}
      />
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
        <a 
          href={currentImage.photographerUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Photo by {currentImage.photographer}
        </a>
      </div>
    </div>
  );
}
