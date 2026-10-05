import React, { useState } from 'react';

export default function DaanOfferingsSection({ siteSettings = {}, daanTiers = [] }) {
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const upi = siteSettings.upiId || "mandir.seva@sbi";

  const copyUPI = () => {
    navigator.clipboard?.writeText(upi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 pb-6" id="daan-section">
      <div className="bg-surface-container p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
              {siteSettings.donationSubtitle || 'Devotee Offerings'}
            </span>
            <h3 className="font-title-md text-primary">
              {siteSettings.donationTitle || 'Seva & Community Contributions'}
            </h3>
          </div>
          <span className="material-symbols-outlined text-secondary text-[22px]">
            volunteer_activism
          </span>
        </div>
        <p className="font-body-sm text-on-surface-variant mb-3">
          {siteSettings.donationDescription || 'Support the daily flower offerings, earthen lamp oils, and charitable bhog distributions for underprivileged families.'}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {daanTiers.map((tier) => (
            <button
              key={tier.id || tier.amount}
              onClick={() => setSelectedAmount(tier.amount)}
              className={`p-2 rounded-lg font-label-sm font-bold shadow-sm transition-all text-center ${
                selectedAmount === tier.amount
                  ? 'bg-primary text-on-primary ring-2 ring-secondary'
                  : 'bg-surface text-primary hover:bg-primary hover:text-on-primary'
              }`}
            >
              ₹ {tier.amount.toLocaleString()}
              <br />
              <span className={`font-body-sm text-[10px] font-normal ${
                selectedAmount === tier.amount ? 'text-primary-fixed-dim' : 'text-on-surface-variant'
              }`}>
                {tier.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between bg-surface p-2.5 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              account_balance
            </span>
            <span className="font-label-sm text-on-surface font-semibold">
              UPI: <span className="font-mono text-primary font-bold">{upi}</span>
            </span>
          </div>
          <button
            onClick={copyUPI}
            className="px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-sm font-bold hover:bg-primary hover:text-on-primary transition-colors"
          >
            {copied ? 'Copied!' : selectedAmount ? `Pay ₹${selectedAmount}` : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
