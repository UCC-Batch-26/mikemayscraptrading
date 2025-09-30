import React, { useState } from 'react';

const fallbackImage = 'https://placehold.co/400?text=No+Image';

export default function ProductCard({ imageUrl, name, categoryName, quantity }) {
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <div className="grid grid-flow-col grid-rows-3 gap-4 ">
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgSrc(fallbackImage)}
          className="w-40 h-40 object-cover rounded mb-3 row-span-3"
        />
        <div className="row-start-1 row-end-4">
          <h3 className="text-3xl font-semibold">{name} Refrigerator</h3>
          <p className="text-sm text-black">{categoryName} Appliances</p>
          <p className="text-lead text-8xl mt-1 font-bold">{quantity} 5</p>
        </div>
      </div>
    </div>
  );
}
