import React, { useState } from 'react';

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('invitation');

  const navItems = [
    {
      id: 'invitation',
      label: 'Invitation',
      icon: 'temple_hindu',
      href: '#'
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: 'calendar_month',
      href: '#schedule-section'
    },
    {
      id: 'bhog',
      label: 'Bhog Menu',
      icon: 'restaurant',
      href: '#bhog-section'
    },
    {
      id: 'directions',
      label: 'Directions',
      icon: 'near_me',
      href: '#location-section'
    },
    {
      id: 'rsvp',
      label: 'RSVP',
      icon: 'how_to_reg',
      href: '#rsvp-section'
    }
  ];

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    if (item.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(158,27,27,0.08)]">
      <div className="flex justify-around items-center h-20 px-space-sm max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] transition-all ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {item.icon}
              </span>
              <span className="font-label-sm text-[11px] leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
