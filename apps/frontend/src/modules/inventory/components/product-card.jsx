import React, { useState } from 'react';

const fallbackImage = 'https://placehold.co/400?text=No+Image';

export default function ProductCard({ imageUrl, name }) {
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgSrc(fallbackImage)}
          className="w-24 h-24 object-cover rounded mb-3"
        />
      </div>
    </div>
  );
}
