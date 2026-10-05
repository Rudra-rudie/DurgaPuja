import React, { useState } from 'react';
import { submitRsvpApi } from '../api';

export default function RSVPSection({ guestName = '' }) {
  const [formData, setFormData] = useState({
    name: guestName || '',
    phone: '',
    members: 2,
    ritual: 'ashtami-pushpanjali'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tokenCode, setTokenCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const adjustCount = (delta) => {
    setFormData(prev => ({
      ...prev,
      members: Math.max(1, Math.min(12, prev.members + delta))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await submitRsvpApi(formData);
      setTokenCode(res.data.tokenCode);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to submit RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sharePassWhatsApp = () => {
    const text = encodeURIComponent(
      `🌺 Durga Puja Digital Pass Confirmed!\n\nName: ${formData.name}\nToken: #${tokenCode}\nFamily Members: ${formData.members}\nRitual: ${formData.ritual}\nVenue: 24A Ballygunge Circular Rd, Kolkata.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="px-4 pb-6" id="rsvp-section">
      <div className="bg-surface-container-low p-5 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Top Filigree Accent */}
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-secondary text-[18px]">how_to_reg</span>
          <span className="font-label-sm text-secondary uppercase font-bold tracking-widest">
            Digital E-Pass
          </span>
        </div>
        <h2 className="font-title-lg text-primary mb-1">RSVP &amp; Pushpanjali Booking</h2>
        <p className="font-body-sm text-on-surface-variant mb-4">
          Reserve your family prayer slots to ensure seating in the sanctum mandap without queue delays.
        </p>

        {errorMsg && (
          <div className="mb-3 p-2.5 rounded-lg bg-error-container text-on-error-container text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" id="rsvp-form">
          <div>
            <label className="font-label-sm text-on-surface font-semibold block mb-1">
              Devotee / Head of Family Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-surface font-body-sm text-on-surface placeholder:text-outline/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Subhashish Mukhopadhyay"
              required
            />
          </div>

          <div>
            <label className="font-label-sm text-on-surface font-semibold block mb-1">
              WhatsApp Mobile Contact
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-surface font-body-sm text-on-surface placeholder:text-outline/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+91 98300 00000"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-on-surface font-semibold block mb-1">
                Family Members
              </label>
              <div className="flex items-center bg-surface rounded-lg p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => adjustCount(-1)}
                  className="w-8 h-8 rounded bg-surface-container text-primary font-bold text-lg flex items-center justify-center hover:bg-surface-container-high transition-colors"
                >
                  -
                </button>
                <span className="flex-1 text-center font-title-sm text-primary font-bold">
                  {formData.members}
                </span>
                <button
                  type="button"
                  onClick={() => adjustCount(1)}
                  className="w-8 h-8 rounded bg-surface-container text-primary font-bold text-lg flex items-center justify-center hover:bg-surface-container-high transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="font-label-sm text-on-surface font-semibold block mb-1">
                Preferred Ritual
              </label>
              <select
                value={formData.ritual}
                onChange={(e) => setFormData({ ...formData, ritual: e.target.value })}
                className="w-full h-10 px-2.5 rounded-lg bg-surface font-body-sm text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ashtami-pushpanjali">Ashtami Pushpanjali (09:30 AM)</option>
                <option value="sandhi-puja">Sandhi Puja Darshan (05:45 PM)</option>
                <option value="navami-homa">Navami Maha Homa (11:00 AM)</option>
                <option value="sindoor-khela">Sindoor Khela (10:00 AM)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl bg-primary text-on-primary font-title-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
            {loading ? 'Generating E-Pass...' : 'Confirm & Generate Digital Pass'}
          </button>
        </form>

        {/* Success State Card */}
        {submitted && (
          <div className="mt-4 p-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed shadow-md flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-secondary">
                check_circle
              </span>
              <span className="font-title-sm font-bold">Pass Generated Successfully!</span>
            </div>
            <p className="font-body-sm text-[13px]">
              Your token pass for <span className="font-bold">{formData.name}</span> has been confirmed &amp; saved in the Mandir register.
            </p>
            <div className="bg-surface/80 p-2.5 rounded-lg flex items-center justify-between mt-1">
              <span className="font-label-sm text-primary font-mono font-bold tracking-widest">
                TOKEN: #{tokenCode}
              </span>
              <button
                onClick={sharePassWhatsApp}
                className="font-label-sm text-secondary font-bold underline hover:text-primary transition-colors"
              >
                Share Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
