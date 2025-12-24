'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type HeroImageProps = {
  category?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
};

const FALLBACK_URL = 'https://images.unsplash.com/photo-1580537922571-ca7180cd700e?auto=format&fit=crop&w=2000&q=80';

export default function HeroImage({
  category = 'whisky',
  alt = 'Hero',
  className = '',
  priority = true,
}: HeroImageProps) {
  const [url, setUrl] = useState<string>(FALLBACK_URL);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/images/${category.toLowerCase()}.json`);
        if (!res.ok) return;
        const data: { url: string }[] = await res.json();
        if (Array.isArray(data) && data.length > 0 && data[0]?.url) {
          setUrl(data[0].url);
        }
      } catch (err) {
        console.error('Hero image load error', err);
      }
    };
    load();
  }, [category]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
      <Image
        src={url}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onLoadingComplete={() => setLoaded(true)}
        onError={() => setUrl(FALLBACK_URL)}
      />
    </div>
  );
}
