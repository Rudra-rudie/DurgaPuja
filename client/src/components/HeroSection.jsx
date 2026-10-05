import React, { useState, useEffect } from 'react';

export default function HeroSection({
  siteSettings = {},
  guestName = null,
  personalMessage = null,
  isPlayingDhaak,
  toggleDhaak,
  currentLang,
  setCurrentLang
}) {
  const initialDays = siteSettings.countdownDays ?? 4;
  const initialHours = siteSettings.countdownHours ?? 18;
  const initialMins = siteSettings.countdownMins ?? 34;
  const initialSecs = siteSettings.countdownSecs ?? 42;

  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: initialHours,
    mins: initialMins,
    secs: initialSecs
  });

  useEffect(() => {
    let totalSecs =
      (siteSettings.countdownDays ?? 4) * 86400 +
      (siteSettings.countdownHours ?? 18) * 3600 +
      (siteSettings.countdownMins ?? 34) * 60 +
      (siteSettings.countdownSecs ?? 42);

    const interval = setInterval(() => {
      if (totalSecs <= 0) return;
      totalSecs--;
      const d = Math.floor(totalSecs / 86400);
      const h = Math.floor((totalSecs % 86400) / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;
      setTimeLeft({ days: d, hours: h, mins: m, secs: s });
    }, 1000);
    return () => clearInterval(interval);
  }, [siteSettings]);

  const heroImage = siteSettings.heroImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ye281hwxzD13wojKbAiM_2Eul_BJZw3ZMhWoGP_cGnza7GVIyZAblszm7gvrKmu8vwD7CZKR3-XzqswBYGqIs3FRXLgGIVm9cOwV68Yp5K-Zs3xgUWExs8Fxi66oPajYYBcwGySZoX4ba-JNkZzRoxDnhuWi9iidtGZFheB-O3WktXZJHywzOjN6gA_mBeBQSf-pYQucbFJ1tkSD0AfJnRBU7hYe_pNPNDpq0DxG7h6ZosBWNBXgtA";
  const logoImage = siteSettings.logoImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBWjzNgGYLeZXEQvCUQQTjVIaJ4RuNwA6Dj3GVnKCyTRQ0Wunp042wB3EQzU2ylQNOQOZ8IfT9hiC0by2a8BEgZ7btvm_FjVnysBdqB0Tk4RET2mUEunfVEcOPTCb287JZie0EIFlLqVdfrP8b3Hzdh45UVsNrAp5NIlTiAnkfy9phz_Rw_r4hEwwuc6-ZHFMCKiG6x5E87vodBOQ-UeazgCIThXd471vRQY4CLXD2dGXtexrxfUrZ8eQ";

  return (
    <div className="relative w-full overflow-hidden bg-primary-container text-on-primary">
      <div className="relative h-[490px] w-full">
        <img
          alt="Maa Durga in full sanctum grandeur"
          className="w-full h-full object-cover object-top opacity-90 brightness-95"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-transparent to-transparent"></div>

        {/* Top Overlay Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
            <img
              alt="Sacred Emblem"
              className="w-6 h-6 object-contain"
              src={logoImage}
            />
            <span className="font-label-sm text-primary uppercase font-bold tracking-wider">
              {siteSettings.bangabdaYear || '1431 Bangabda'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface/90 backdrop-blur-md p-1 rounded-full shadow-md">
            <button
              onClick={() => setCurrentLang('EN')}
              className={`px-2.5 py-1 rounded-full font-label-sm font-bold transition-colors ${
                currentLang === 'EN'
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang('BN')}
              className={`px-2 py-1 rounded-full font-label-sm font-semibold transition-colors ${
                currentLang === 'BN'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              BN
            </button>
            <button
              onClick={() => setCurrentLang('HI')}
              className={`px-2 py-1 rounded-full font-label-sm font-semibold transition-colors ${
                currentLang === 'HI'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              HI
            </button>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="absolute bottom-6 left-4 right-4 flex flex-col gap-2">
          {guestName && (
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-secondary-fixed text-primary font-label-sm font-bold shadow-md animate-bounce">
              <span className="material-symbols-outlined text-[16px]">favorite</span>
              <span>Specially Invited: Dear {guestName}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm">
            <span className="material-symbols-outlined text-[14px]">wb_twilight</span>
            <span>{siteSettings.heroBadge || 'Sharodiya Maha Utsav'}</span>
          </div>
          <h1 className="font-headline-lg-mobile text-on-primary leading-tight drop-shadow-md">
            {siteSettings.heroHeading || 'Sri Sri Sharodotsav Mandir Nimontron'}
          </h1>
          <p className="font-body-sm text-primary-fixed-dim line-clamp-2 drop-shadow">
            {personalMessage || siteSettings.heroDescription || 'You and your family are cordially invited to the 42nd Annual Autumnal Sanctum Celebration.'}
          </p>

          {/* Sound Pulse Interaction Pill */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={toggleDhaak}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/85 backdrop-blur-md text-primary font-label-sm font-bold hover:bg-surface transition-all shadow-sm ${
                isPlayingDhaak ? 'ring-2 ring-secondary' : ''
              }`}
              id="dhaakHeroBtn"
            >
              <span className={`material-symbols-outlined text-[16px] text-secondary ${isPlayingDhaak ? 'animate-pulse' : ''}`}>
                graphic_eq
              </span>
              <span id="dhaakText">
                {isPlayingDhaak ? 'Dhaak Playing (Rhythmic)' : 'Listen to Live Dhaak Rhythms'}
              </span>
            </button>
            <div className="flex items-center gap-1 text-secondary-fixed text-label-sm">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>{siteSettings.locationName || 'Ballygunge, Kolkata'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Festive Live Countdown Timer Bar */}
      <div className="bg-primary px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-1 mb-2 text-secondary-fixed">
          <span className="material-symbols-outlined text-[16px]">notifications_active</span>
          <span className="font-label-sm uppercase tracking-wider font-semibold">
            {siteSettings.countdownTitle || 'Maha Sasthi Countdown'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
          <div className="bg-surface-container-lowest/15 backdrop-blur-sm rounded-lg py-1.5 flex flex-col items-center">
            <span className="font-headline-sm text-on-primary leading-tight">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="font-label-sm text-primary-fixed-dim text-[10px]">DAYS</span>
          </div>
          <div className="bg-surface-container-lowest/15 backdrop-blur-sm rounded-lg py-1.5 flex flex-col items-center">
            <span className="font-headline-sm text-on-primary leading-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="font-label-sm text-primary-fixed-dim text-[10px]">HOURS</span>
          </div>
          <div className="bg-surface-container-lowest/15 backdrop-blur-sm rounded-lg py-1.5 flex flex-col items-center">
            <span className="font-headline-sm text-on-primary leading-tight">
              {String(timeLeft.mins).padStart(2, '0')}
            </span>
            <span className="font-label-sm text-primary-fixed-dim text-[10px]">MINS</span>
          </div>
          <div className="bg-surface-container-lowest/15 backdrop-blur-sm rounded-lg py-1.5 flex flex-col items-center">
            <span className="font-headline-sm text-on-primary leading-tight">
              {String(timeLeft.secs).padStart(2, '0')}
            </span>
            <span className="font-label-sm text-primary-fixed-dim text-[10px]">SECS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
