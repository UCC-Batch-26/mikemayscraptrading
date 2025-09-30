import React, { useState } from 'react';

const fallbackImage = 'https://placehold.co/400?text=No+Image';

export default function ProductCard({ imageUrl, name, categoryName, quantity }) {
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage);
  const onClickEdit = () => {
    // @todo: for later implementation
  };

  const onClickInventoryOut = () => {
    // @todo: for later implementation
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgSrc(fallbackImage)}
          className="w-40 h-40 object-cover rounded mb-3 row-span-3"
        />
        <div className="row-start-1 row-end-4">
          <h3 className="text-3xl font-semibold">{name} Refrigerator</h3>
          <p className="text-base text-black">{categoryName} Appliances</p>
          <p className="text-lead text-8xl mt-1 font-bold">{quantity} 5</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <button
          onClick={onClickEdit}
          className="w-40 border-2 border-yellow-600 text-black font-semibold px-3 py-1 rounded-lg text-lg hover:bg-yellow-600 hover:text-white transition"
        >
          Edit
        </button>
        <button
          onClick={onClickInventoryOut}
          className="w-40 border-2 border-red-800 text-black font-semibold px-3 py-1 rounded-lg text-lg hover:bg-red-800 hover:text-white transition"
        >
          Inventory Out
        </button>
      </div>
    </div>
  );
}

ProductCard.Loading = function LoadingCard() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center animate-pulse">
      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <div className="w-40 h-40 bg-gray-300 rounded mb-3 row-span-3" />
        <div className="row-start-1 row-end-4">
          <div className="w-40 h-9 bg-gray-300 rounded mb-2" />
          <div className="w-24 h-6 bg-gray-300 rounded mb-1" />
          <div className="w-20 h-20 bg-gray-300 rounded mt-2" />
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <div className="w-40 h-12 bg-gray-300 rounded" />
        <div className="w-40 h-12 bg-gray-300 rounded" />
      </div>
    </div>
  );
};
