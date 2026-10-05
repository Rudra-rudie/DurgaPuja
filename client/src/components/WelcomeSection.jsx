import React from 'react';

export default function WelcomeSection({ siteSettings = {} }) {
  const logo = siteSettings.logoImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBWjzNgGYLeZXEQvCUQQTjVIaJ4RuNwA6Dj3GVnKCyTRQ0Wunp042wB3EQzU2ylQNOQOZ8IfT9hiC0by2a8BEgZ7btvm_FjVnysBdqB0Tk4RET2mUEunfVEcOPTCb287JZie0EIFlLqVdfrP8b3Hzdh45UVsNrAp5NIlTiAnkfy9phz_Rw_r4hEwwuc6-ZHFMCKiG6x5E87vodBOQ-UeazgCIThXd471vRQY4CLXD2dGXtexrxfUrZ8eQ";

  return (
    <div className="px-4 py-6 flex flex-col gap-4">
      <div className="relative bg-surface-container-low p-5 rounded-xl shadow-md overflow-hidden">
        {/* Ornate Accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary-container/20 to-transparent pointer-events-none rounded-bl-full"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <img
              alt="Mandir Crest"
              className="w-7 h-7 object-contain"
              src={logo}
            />
          </div>
          <div>
            <span className="font-label-sm text-secondary font-bold uppercase tracking-widest block">
              {siteSettings.welcomeBadge || 'Welcome Address'}
            </span>
            <h2 className="font-title-md text-primary leading-tight">
              {siteSettings.welcomeTitle || 'Nomoshkar & Warm Greetings'}
            </h2>
          </div>
        </div>

        {/* Sanskrit Shloka Block */}
        <div className="bg-surface-container p-3 rounded-lg text-center my-2 shadow-sm">
          <p className="font-title-sm text-primary italic leading-relaxed whitespace-pre-line">
            {siteSettings.welcomeShloka || `“Sarva mangala mangalye shive sarvartha sadhike,\nSharanye tryambake gauri narayani namostute.”`}
          </p>
          <span className="font-label-sm text-on-surface-variant block mt-1 text-[11px]">
            {siteSettings.welcomeShlokaRef || '— Sri Sri Chandi Stotram'}
          </span>
        </div>

        <p className="font-body-md text-on-surface leading-relaxed mt-2 whitespace-pre-line">
          {siteSettings.welcomeMessage || `With the soothing autumn breeze carrying the resonance of the sacred Kash flowers and festive conch shells, the Sri Sarbojanin Mandir Samiti cordially requests the gracious presence of you and your family for our 42nd annual Sharodotsav. Let us unite in prayer, devotion, and community fellowship.`}
        </p>

        <div className="flex items-center justify-between pt-4 mt-2">
          <div>
            <p className="font-title-sm text-primary font-bold">
              {siteSettings.signatoryName || 'Dr. Partha Sarathi Roy'}
            </p>
            <p className="font-body-sm text-on-surface-variant text-[12px]">
              {siteSettings.signatoryTitle || 'General Secretary, Mandir Samiti'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
