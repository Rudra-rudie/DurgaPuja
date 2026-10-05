import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WelcomeSection from './components/WelcomeSection';
import HeritageSection from './components/HeritageSection';
import ScheduleSection from './components/ScheduleSection';
import DarshanGallerySection from './components/DarshanGallerySection';
import BhogDiningSection from './components/BhogDiningSection';
import CulturalSection from './components/CulturalSection';
import LocationSection from './components/LocationSection';
import RSVPSection from './components/RSVPSection';
import DaanOfferingsSection from './components/DaanOfferingsSection';
import FestiveGreetingSection from './components/FestiveGreetingSection';
import BottomNav from './components/BottomNav';
import { fetchPublicContent, fetchPersonalizedInvite } from './api';
import { dhaakPlayer } from './utils/dhaakAudio';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestInfo, setGuestInfo] = useState(null);
  const [isPlayingDhaak, setIsPlayingDhaak] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    // 1. Fetch public invitation data from PostgreSQL API
    fetchPublicContent()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load invitation data:', err);
        setLoading(false);
      });

    // 2. Check for personalized invite link (e.g. /invite/rahul-sharma or ?invite=rahul-sharma)
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    let slug = urlParams.get('invite');

    if (!slug && path.startsWith('/invite/')) {
      slug = path.replace('/invite/', '').split('/')[0];
    }

    if (slug) {
      fetchPersonalizedInvite(slug)
        .then(res => {
          if (res?.guest) {
            setGuestInfo(res.guest);
          }
        })
        .catch(err => console.warn('Could not load personalized invite:', err));
    }
  }, []);

  const toggleDhaak = () => {
    const playing = dhaakPlayer.toggle();
    setIsPlayingDhaak(playing);
  };

  const siteSettings = data?.siteSettings || {};
  const sections = data?.sections || [];

  // Map section keys to their corresponding React components
  const renderSection = (key) => {
    switch (key) {
      case 'hero':
        return (
          <HeroSection
            key="hero"
            siteSettings={siteSettings}
            guestName={guestInfo?.guestName}
            personalMessage={guestInfo?.personalMessage}
            isPlayingDhaak={isPlayingDhaak}
            toggleDhaak={toggleDhaak}
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
          />
        );
      case 'welcome':
        return <WelcomeSection key="welcome" siteSettings={siteSettings} />;
      case 'heritage':
        return <HeritageSection key="heritage" pillars={data?.heritagePillars} />;
      case 'schedule':
        return <ScheduleSection key="schedule" scheduleDays={data?.scheduleDays} />;
      case 'gallery':
        return <DarshanGallerySection key="gallery" galleryImages={data?.galleryImages} />;
      case 'bhog':
        return <BhogDiningSection key="bhog" siteSettings={siteSettings} bhogItems={data?.bhogItems} />;
      case 'cultural':
        return <CulturalSection key="cultural" culturalEvents={data?.culturalEvents} />;
      case 'location':
        return <LocationSection key="location" siteSettings={siteSettings} transitOptions={data?.transitOptions} />;
      case 'rsvp':
        return <RSVPSection key="rsvp" guestName={guestInfo?.guestName} />;
      case 'daan':
        return <DaanOfferingsSection key="daan" siteSettings={siteSettings} daanTiers={data?.daanTiers} />;
      case 'footer':
        return <FestiveGreetingSection key="footer" siteSettings={siteSettings} />;
      default:
        return null;
    }
  };

  // Sort sections by order and filter visible
  const visibleSections = sections.length > 0
    ? [...sections].sort((a, b) => a.order - b.order).filter(s => s.isVisible)
    : [
        { key: 'hero' },
        { key: 'welcome' },
        { key: 'heritage' },
        { key: 'schedule' },
        { key: 'gallery' },
        { key: 'bhog' },
        { key: 'cultural' },
        { key: 'location' },
        { key: 'rsvp' },
        { key: 'daan' },
        { key: 'footer' }
      ];

  return (
    <div className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-secondary-fixed selection:text-primary">
      {/* Fixed Top Header */}
      <Header
        siteSettings={siteSettings}
        isPlayingDhaak={isPlayingDhaak}
        toggleDhaak={toggleDhaak}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
      />

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-20 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-lg mx-auto shadow-sm md:shadow-2xl md:border-x md:border-outline-variant/30 bg-surface">
          {loading && (
            <div className="p-8 text-center text-primary font-semibold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>
              <span>Loading Sacred Invitation...</span>
            </div>
          )}

          {visibleSections.map(s => renderSection(s.key))}
        </div>
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
}
