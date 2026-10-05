import React from 'react';

export default function LocationSection({ siteSettings = {}, transitOptions = [] }) {
  const mapImage = siteSettings.mapImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuA9QqkqMCw-La0I_YiY2Vmfgx5znXI-hHWpxqIOhmB0nuDhyGMr7gK8QE174H6tnALki3lPK2gFszTcR4AZUQF_q6iy0LQ8Zmg5eyDf7QZ0of3THleXIDcB-aj4ild_dMv3dJO9nVDp-IbwXNak3cRm1QT5t3b5OLaPhdyjY8ntFHbjqzloNMGLeiTP5bZKxCO5Axp8KW-LYLlpa0aHpGkd8RZjqfzPgDPE3HCTHwvxN9MFDuUm2OApJQ";
  const mapsUrl = siteSettings.googleMapsUrl || "https://maps.google.com/?q=24A+Ballygunge+Circular+Road,+Kolkata";

  const openDirections = () => {
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="px-4 pb-6" id="location-section">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
            How to Reach
          </span>
          <h2 className="font-title-lg text-primary">Mandir Pavilion Location</h2>
        </div>
        <span className="material-symbols-outlined text-secondary text-[22px]">map</span>
      </div>

      {/* Map Trigger Card */}
      <div
        className="w-full h-44 bg-cover bg-center rounded-xl shadow-md relative overflow-hidden flex flex-col justify-end p-3"
        style={{ backgroundImage: `url('${mapImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/20 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-secondary-fixed font-bold">
              {siteSettings.locationName || 'Mandir Grounds'}
            </span>
            <p className="font-title-sm text-on-primary font-bold">
              {siteSettings.fullAddress || '24A Ballygunge Circular Rd'}
            </p>
          </div>
          <button
            onClick={openDirections}
            className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm font-bold flex items-center gap-1 shadow hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">directions</span>
            Directions
          </button>
        </div>
      </div>

      {/* Transit Suggestions */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        {transitOptions.map((item) => (
          <div key={item.id} className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              {item.icon || 'subway'}
            </span>
            <div>
              <p className="font-label-sm text-primary font-bold">{item.title}</p>
              <p className="font-body-sm text-on-surface-variant text-[11px]">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
