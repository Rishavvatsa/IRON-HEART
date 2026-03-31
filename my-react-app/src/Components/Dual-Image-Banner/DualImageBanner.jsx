import React from 'react'
import { Link } from 'react-router-dom';

const DualImageBanner = ({ banners }) => {
  return (
    <div className="mx-auto w-full max-w-368 px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className="relative col-span-1 lg:col-span-3 rounded-lg overflow-hidden shadow-lg group bg-black/50 aspect-4/3"
          >
            {/* Media */}
            {banner.media && banner.mediaType === 'image' && (
              <img
                src={banner.media}
                alt={banner.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {banner.media && banner.mediaType === 'video' && (
              <video
                src={banner.media}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay
                controls
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/30 to-black/70 flex flex-col justify-end p-8 pointer-events-none">
              <div>
                {banner.subtitle && (
                  <p className="text-white text-xs mb-1 opacity-80">{banner.subtitle}</p>
                )}
                <h2 className="text-white text-2xl font-bold mb-2">{banner.title}</h2>
                {banner.description && (
                  <p className="text-white mb-4 font-medium text-base">{banner.description}</p>
                )}
                {banner.buttonText && (
                  <div className="pointer-events-auto">
                    <Link
                      to={banner.href}
                      className="inline-block bg-transparent border border-white text-white px-5 py-2 rounded font-semibold text-sm transition hover:bg-white hover:text-black"
                      onClick={banner.onClick}
                    >
                      {banner.buttonText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DualImageBanner;