import React from 'react';

const NavBar = ({ title = 'Inventory' }) => {
  return (
    <header className="w-full h-16 px-4 py-2 flex items-center justify-between border-b border-gray-300 bg-white">
      <div className="flex items-center w-1/3">
        <span className="text-lg font-bold">Logo</span>
      </div>

      <div className="flex items-center justify-center w-1/3">
        <h1 className="md:text-xl sm:text-sm text-xl font-semibold truncate text-center">{title}</h1>
      </div>

      <div className="flex items-center justify-end w-1/3">
        <button
          className="text-sm text-yellow-600 hover:underline"
          onClick={() => alert('Settings modal placeholder')}
        >
          Settings
        </button>
      </div>
    </header>
  );
};

export default NavBar;
