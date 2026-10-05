import React from 'react';

export default function CulturalSection({ culturalEvents = [] }) {
  return (
    <div className="px-4 pb-6" id="cultural-section">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
            Rangamancha
          </span>
          <h2 className="font-title-lg text-primary">Cultural Performances</h2>
        </div>
        <span className="material-symbols-outlined text-secondary text-[20px]">theater_comedy</span>
      </div>

      <div className="space-y-2.5">
        {culturalEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-surface-container-low p-3.5 rounded-xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0">
                <span className="font-label-sm text-secondary font-bold">{evt.month}</span>
                <span className="font-title-sm text-primary font-bold leading-none">{evt.day}</span>
              </div>
              <div>
                <h4 className="font-title-sm text-primary font-bold">{evt.title}</h4>
                <p className="font-body-sm text-on-surface-variant text-[12px]">{evt.detail}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px]">
              {evt.icon || 'theater_comedy'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
