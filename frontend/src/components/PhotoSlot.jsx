import React, { useState } from 'react';

export default function PhotoSlot({ size = 'md', className = '' }) {
  const [imageError, setImageError] = useState(false);

  const dimensionClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden border border-border bg-[#F5F4F0] flex-shrink-0 select-none ${dimensionClasses} ${className}`}
      aria-label="Profile Avatar"
    >
      {!imageError ? (
        <img
          src="/profile.jpg"
          alt="Aayush Raj"
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : null}

      <span
        className={`font-mono font-semibold tracking-wider text-text-main ${
          !imageError ? 'opacity-0' : 'opacity-100'
        }`}
      >
        AR
      </span>
    </div>
  );
}
