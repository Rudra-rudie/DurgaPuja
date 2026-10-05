import React from 'react';

export default function BhogDiningSection({ siteSettings = {}, bhogItems = [] }) {
  return (
    <div className="px-4 pb-6" id="bhog-section">
      <div className="bg-surface-container-low p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[18px]">restaurant</span>
            </div>
            <div>
              <span className="font-label-sm text-secondary uppercase font-bold tracking-wider">
                {siteSettings.bhogSubtitle || 'Maha Prasadam'}
              </span>
              <h3 className="font-title-md text-primary">
                {siteSettings.bhogTitle || 'Community Bhog Dining'}
              </h3>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-bold text-[10px]">
            {siteSettings.bhogBadge || 'ALL DEVOTEES'}
          </span>
        </div>
        <p className="font-body-sm text-on-surface-variant mb-4">
          {siteSettings.bhogTiming || 'Warm consecrated satvik feast served daily on fresh sal leaf plates from 1:00 PM to 3:30 PM.'}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {bhogItems.map((item) => (
            <div key={item.id} className="bg-surface-container p-2.5 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                {item.icon || 'rice_bowl'}
              </span>
              <div>
                <p className="font-label-md text-primary font-bold">{item.name}</p>
                <p className="font-body-sm text-on-surface-variant text-[11px]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-highest/60 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              confirmation_number
            </span>
            <span className="font-label-sm text-on-surface font-semibold">
              {siteSettings.bhogNotice || 'Digital Token counters open 11:30 AM daily'}
            </span>
          </div>
          <a className="font-label-sm text-primary font-bold hover:underline" href="#rsvp-section">
            Reserve Slot →
          </a>
        </div>
      </div>
    </div>
  );
}
