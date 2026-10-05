import React from 'react';

const defaultPillars = [
  { icon: 'auto_stories', title: '42 Yrs', subtitle: 'Vedic Rituals' },
  { icon: 'soup_kitchen', title: '15,000+', subtitle: 'Annadaan Bhog' },
  { icon: 'palette', title: 'Kumartuli', subtitle: 'Clay Artistry' }
];

export default function HeritageSection({ pillars = defaultPillars }) {
  const displayPillars = pillars && pillars.length > 0 ? pillars : defaultPillars;

  return (
    <div className="px-4 pb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
            Tradition &amp; Service
          </span>
          <h2 className="font-title-lg text-primary">Mandir Heritage Pillars</h2>
        </div>
        <span className="material-symbols-outlined text-secondary text-[22px]">auto_awesome</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {displayPillars.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-surface-container-low p-3 rounded-xl flex flex-col items-center text-center shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                {item.icon}
              </span>
            </div>
            <span className="font-title-sm text-primary font-bold">{item.title}</span>
            <span className="font-label-sm text-on-surface-variant text-[11px] leading-tight">
              {item.subtitle}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
