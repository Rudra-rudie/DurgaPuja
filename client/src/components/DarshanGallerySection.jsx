import React from 'react';

export default function DarshanGallerySection({ galleryImages = [] }) {
  const regularPhotos = galleryImages.filter(g => !g.isWide);
  const widePhotos = galleryImages.filter(g => g.isWide);

  return (
    <div className="px-4 pb-6" id="gallery-section">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
            Visual Chronicle
          </span>
          <h2 className="font-title-lg text-primary">Darshan &amp; Sacred Artistry</h2>
        </div>
        <span className="font-label-sm text-secondary font-semibold">1430 Archives</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {regularPhotos.map((item) => (
          <div key={item.id} className="relative h-44 rounded-xl overflow-hidden shadow-md group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              alt={item.altText || item.title}
              src={item.url}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2">
              <span className="font-label-sm text-on-primary font-bold block">{item.title}</span>
              <span className="font-body-sm text-primary-fixed-dim text-[11px]">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Wide Alpona Feature Image */}
      {widePhotos.map((wideItem) => (
        <div key={wideItem.id} className="relative h-32 mt-3 rounded-xl overflow-hidden shadow-md group">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt={wideItem.altText || wideItem.title}
            src={wideItem.url}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/40 to-transparent"></div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 max-w-[220px]">
            <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
              {wideItem.subtitle || 'Pandal Craft'}
            </span>
            <p className="font-title-sm text-on-primary font-bold leading-snug">
              {wideItem.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
