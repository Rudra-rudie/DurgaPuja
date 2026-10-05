import React, { useState, useEffect } from 'react';

export default function ScheduleSection({ scheduleDays = [] }) {
  const [activeTab, setActiveTab] = useState('');
  const [remindedItems, setRemindedItems] = useState({});

  useEffect(() => {
    if (scheduleDays.length > 0 && !activeTab) {
      setActiveTab(scheduleDays[0].dayKey);
    }
  }, [scheduleDays, activeTab]);

  const toggleReminder = (itemId) => {
    setRemindedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const currentDay = scheduleDays.find(d => d.dayKey === activeTab) || scheduleDays[0];

  return (
    <div className="px-4 pb-6" id="schedule-section">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
            Festival Schedule
          </span>
          <h2 className="font-title-lg text-primary">Ritual &amp; Prayer Timings</h2>
        </div>
        <button
          onClick={() => alert("Downloading Puja Schedule PDF...")}
          className="flex items-center gap-1 text-primary font-label-sm font-semibold hover:underline"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          PDF
        </button>
      </div>

      {/* Scrollable Day Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="schedule-tabs">
        {scheduleDays.map((tab) => (
          <button
            key={tab.id || tab.dayKey}
            onClick={() => setActiveTab(tab.dayKey)}
            className={`schedule-tab shrink-0 px-3.5 py-1.5 rounded-full font-label-sm transition-all ${
              activeTab === tab.dayKey
                ? 'bg-primary text-on-primary font-bold shadow-sm'
                : 'bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high'
            }`}
          >
            {tab.dayName} ({tab.dateLabel})
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="mt-3 flex flex-col gap-3">
        {currentDay?.items?.map((item) => (
          <div key={item.id} className="bg-surface-container-low p-4 rounded-xl shadow-md flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-md font-label-sm font-bold text-[10px] ${
                    item.tag === 'EVENING' || item.tag === 'NIGHT'
                      ? 'bg-primary text-on-primary'
                      : 'bg-secondary-container text-on-secondary-container'
                  }`}
                >
                  {item.tag}
                </span>
                <span className="font-title-sm text-primary font-bold">{item.time}</span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                {item.tag === 'DAWN' || item.tag === 'MORNING' ? 'wb_sunny' : 'flare'}
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant whitespace-pre-line">{item.description}</p>
            {item.priest && (
              <div className="flex items-center justify-between pt-2">
                <span className="font-label-sm text-secondary font-semibold">
                  Head Priest: {item.priest}
                </span>
                {item.hasReminder && (
                  <button
                    onClick={() => toggleReminder(item.id)}
                    className="px-2.5 py-1 rounded-md bg-surface-container text-primary font-label-sm font-semibold flex items-center gap-1 hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {remindedItems[item.id] ? 'notifications_active' : 'calendar_add_on'}
                    </span>
                    {remindedItems[item.id] ? 'Reminder Set' : 'Reminder'}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
