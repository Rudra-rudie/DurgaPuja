import React from 'react';

export default function FestiveGreetingSection({ siteSettings = {} }) {
  const logo = siteSettings.logoImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBWjzNgGYLeZXEQvCUQQTjVIaJ4RuNwA6Dj3GVnKCyTRQ0Wunp042wB3EQzU2ylQNOQOZ8IfT9hiC0by2a8BEgZ7btvm_FjVnysBdqB0Tk4RET2mUEunfVEcOPTCb287JZie0EIFlLqVdfrP8b3Hzdh45UVsNrAp5NIlTiAnkfy9phz_Rw_r4hEwwuc6-ZHFMCKiG6x5E87vodBOQ-UeazgCIThXd471vRQY4CLXD2dGXtexrxfUrZ8eQ";
  const defaultMessage = "🌺 Shubho Sharodiya! You and your family are cordially invited to the 42nd Annual Durga Puja celebration at Sri Sri Sarbojanin Mandir, Ballygunge. Please view the rituals schedule, bhog menu, and digital pushpanjali token pass here!";

  const shareInviteWhatsApp = () => {
    const message = encodeURIComponent(siteSettings.whatsappShareMessage || defaultMessage);
    window.open("https://api.whatsapp.com/send?text=" + message, '_blank');
  };

  return (
    <div className="px-4 pb-8 flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center">
        <img
          alt="Mandir Crest"
          className="w-8 h-8 object-contain"
          src={logo}
        />
      </div>
      <div>
        <h3 className="font-headline-sm text-primary">
          {siteSettings.footerTitle || 'Shubho Sharodiya!'}
        </h3>
        <p className="font-body-sm text-on-surface-variant max-w-xs mx-auto whitespace-pre-line">
          {siteSettings.footerBlessing || 'May Mother Durga bless your household with happiness, prosperity, peace, and eternal joy.'}
        </p>
      </div>

      {/* Quick Share Action Button */}
      <div className="w-full flex items-center gap-2 mt-2">
        <button
          onClick={shareInviteWhatsApp}
          className="flex-1 py-3 px-4 rounded-xl bg-secondary-container text-on-secondary-container font-title-sm font-semibold flex items-center justify-center gap-2 shadow hover:bg-secondary-fixed-dim transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
          Share Invitation on WhatsApp
        </button>
        <a
          href="#rsvp-section"
          className="py-3 px-4 rounded-xl bg-primary text-on-primary font-title-sm font-semibold flex items-center justify-center gap-1 shadow hover:bg-primary-container transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">bookmark</span>
          RSVP
        </a>
      </div>

      <span className="font-label-sm text-outline text-[11px] mt-2">
        {siteSettings.registeredTrustNo || 'Sri Sri Sarbojanin Durga Puja Samiti • Reg. Trust No. 412/WB/1982'}
      </span>
    </div>
  );
}
