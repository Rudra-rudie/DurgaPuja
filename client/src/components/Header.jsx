import React from 'react';

export default function Header({
  siteSettings = {},
  isPlayingDhaak,
  toggleDhaak,
  currentLang,
  setCurrentLang
}) {
  const logo = siteSettings.logoImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBWjzNgGYLeZXEQvCUQQTjVIaJ4RuNwA6Dj3GVnKCyTRQ0Wunp042wB3EQzU2ylQNOQOZ8IfT9hiC0by2a8BEgZ7btvm_FjVnysBdqB0Tk4RET2mUEunfVEcOPTCb287JZie0EIFlLqVdfrP8b3Hzdh45UVsNrAp5NIlTiAnkfy9phz_Rw_r4hEwwuc6-ZHFMCKiG6x5E87vodBOQ-UeazgCIThXd471vRQY4CLXD2dGXtexrxfUrZ8eQ";
  const mandirName = siteSettings.mandirName || "Sri Sri Sarbojanin Durga Puja";
  const invitationTitle = siteSettings.invitationTitle || "Puja Invitation";

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-20 px-margin flex items-center justify-between gap-space-sm max-w-lg mx-auto">
        <div className="flex items-center gap-space-sm min-w-0">
          <img
            alt="Sri Sri Sharodiya Utsav Mandir Emblem"
            className="h-8 w-auto object-contain shrink-0"
            src={logo}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-secondary tracking-widest uppercase truncate">
              {mandirName}
            </span>
            <span className="font-title-sm text-primary truncate leading-tight">
              {invitationTitle}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs shrink-0">
          <button
            onClick={toggleDhaak}
            aria-label="Toggle Maha Dhaak Sound"
            className={`h-11 px-space-sm rounded-full bg-surface-container flex items-center gap-space-xs text-on-surface hover:bg-surface-container-high transition-colors ${isPlayingDhaak ? 'ring-2 ring-secondary' : ''}`}
          >
            <span className={`material-symbols-outlined text-[18px] ${isPlayingDhaak ? 'text-primary animate-pulse' : 'text-secondary'}`}>
              music_note
            </span>
            <span className="font-label-sm text-on-surface font-semibold">
              {isPlayingDhaak ? 'Playing' : 'Dhaak'}
            </span>
          </button>
          <button
            onClick={() => setCurrentLang(currentLang === 'EN' ? 'BN' : 'EN')}
            aria-label="Multilingual Toggle"
            className="h-11 px-space-xs rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors font-label-sm font-semibold"
          >
            <span className={`px-1 ${currentLang === 'EN' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
              EN
            </span>
            <span className="text-outline/40">|</span>
            <span className={`px-1 ${currentLang === 'BN' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
              BN
            </span>
          </button>
          <a
            href="/admin"
            title="Admin Dashboard"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </a>
        </div>
      </div>
    </header>
  );
}
