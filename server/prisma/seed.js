import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Durga Puja database from Stitch design...');

  // 1. Create or update Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@mandir.org',
      password: hashedPassword,
      name: 'Mandir Head Priest & Admin'
    }
  });
  console.log(`Created admin user: ${admin.username} (password: admin123)`);

  // 2. Seed SiteSettings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      mandirName: "Sri Sri Sarbojanin Durga Puja",
      invitationTitle: "Puja Invitation",
      bangabdaYear: "1431 Bangabda",
      heroBadge: "Sharodiya Maha Utsav",
      heroHeading: "Sri Sri Sharodotsav Mandir Nimontron",
      heroDescription: "You and your family are cordially invited to the 42nd Annual Autumnal Sanctum Celebration.",
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ye281hwxzD13wojKbAiM_2Eul_BJZw3ZMhWoGP_cGnza7GVIyZAblszm7gvrKmu8vwD7CZKR3-XzqswBYGqIs3FRXLgGIVm9cOwV68Yp5K-Zs3xgUWExs8Fxi66oPajYYBcwGySZoX4ba-JNkZzRoxDnhuWi9iidtGZFheB-O3WktXZJHywzOjN6gA_mBeBQSf-pYQucbFJ1tkSD0AfJnRBU7hYe_pNPNDpq0DxG7h6ZosBWNBXgtA",
      logoImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWjzNgGYLeZXEQvCUQQTjVIaJ4RuNwA6Dj3GVnKCyTRQ0Wunp042wB3EQzU2ylQNOQOZ8IfT9hiC0by2a8BEgZ7btvm_FjVnysBdqB0Tk4RET2mUEunfVEcOPTCb287JZie0EIFlLqVdfrP8b3Hzdh45UVsNrAp5NIlTiAnkfy9phz_Rw_r4hEwwuc6-ZHFMCKiG6x5E87vodBOQ-UeazgCIThXd471vRQY4CLXD2dGXtexrxfUrZ8eQ",
      locationName: "Ballygunge, Kolkata",
      fullAddress: "24A Ballygunge Circular Rd, Kolkata, West Bengal, India",
      googleMapsUrl: "https://maps.google.com/?q=24A+Ballygunge+Circular+Road,+Kolkata",
      mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9QqkqMCw-La0I_YiY2Vmfgx5znXI-hHWpxqIOhmB0nuDhyGMr7gK8QE174H6tnALki3lPK2gFszTcR4AZUQF_q6iy0LQ8Zmg5eyDf7QZ0of3THleXIDcB-aj4ild_dMv3dJO9nVDp-IbwXNak3cRm1QT5t3b5OLaPhdyjY8ntFHbjqzloNMGLeiTP5bZKxCO5Axp8KW-LYLlpa0aHpGkd8RZjqfzPgDPE3HCTHwvxN9MFDuUm2OApJQ",
      countdownTitle: "Maha Sasthi Countdown",
      countdownDays: 4,
      countdownHours: 18,
      countdownMins: 34,
      countdownSecs: 42,
      welcomeBadge: "Welcome Address",
      welcomeTitle: "Nomoshkar & Warm Greetings",
      welcomeShloka: "“Sarva mangala mangalye shive sarvartha sadhike,\nSharanye tryambake gauri narayani namostute.”",
      welcomeShlokaRef: "— Sri Sri Chandi Stotram",
      welcomeMessage: "With the soothing autumn breeze carrying the resonance of the sacred Kash flowers and festive conch shells, the Sri Sarbojanin Mandir Samiti cordially requests the gracious presence of you and your family for our 42nd annual Sharodotsav. Let us unite in prayer, devotion, and community fellowship.",
      signatoryName: "Dr. Partha Sarathi Roy",
      signatoryTitle: "General Secretary, Mandir Samiti",
      bhogBadge: "ALL DEVOTEES",
      bhogSubtitle: "Maha Prasadam",
      bhogTitle: "Community Bhog Dining",
      bhogTiming: "Warm consecrated satvik feast served daily on fresh sal leaf plates from 1:00 PM to 3:30 PM.",
      bhogNotice: "Digital Token counters open 11:30 AM daily",
      donationTitle: "Seva & Community Contributions",
      donationSubtitle: "Devotee Offerings",
      donationDescription: "Support the daily flower offerings, earthen lamp oils, and charitable bhog distributions for underprivileged families.",
      upiId: "mandir.seva@sbi",
      footerTitle: "Shubho Sharodiya!",
      footerBlessing: "May Mother Durga bless your household with happiness, prosperity, peace, and eternal joy.",
      registeredTrustNo: "Sri Sri Sarbojanin Durga Puja Samiti • Reg. Trust No. 412/WB/1982",
      whatsappShareMessage: "🌺 Shubho Sharodiya! You and your family are cordially invited to the 42nd Annual Durga Puja celebration at Sri Sri Sarbojanin Mandir, Ballygunge. Please view the rituals schedule, bhog menu, and digital pushpanjali token pass here!"
    }
  });

  // 3. Seed Sections
  const sections = [
    { key: 'hero', name: 'Hero Banner & Countdown', order: 1 },
    { key: 'welcome', name: 'Welcome Address & Shloka', order: 2 },
    { key: 'heritage', name: 'Mandir Heritage Pillars', order: 3 },
    { key: 'schedule', name: 'Festival Schedule', order: 4 },
    { key: 'gallery', name: 'Darshan Gallery', order: 5 },
    { key: 'bhog', name: 'Maha Prasadam & Bhog Dining', order: 6 },
    { key: 'cultural', name: 'Rangamancha Cultural Performances', order: 7 },
    { key: 'location', name: 'Location & Route Guide', order: 8 },
    { key: 'rsvp', name: 'Devotee RSVP & Booking', order: 9 },
    { key: 'daan', name: 'Seva, Daan & Sacred Offerings', order: 10 },
    { key: 'footer', name: 'Festive Greetings & Footer', order: 11 }
  ];
  for (const s of sections) {
    await prisma.section.upsert({
      where: { key: s.key },
      update: { name: s.name, order: s.order },
      create: { key: s.key, name: s.name, order: s.order, isVisible: true }
    });
  }

  // 4. Seed Heritage Pillars
  const pillars = [
    { title: '42 Yrs', subtitle: 'Vedic Rituals', icon: 'auto_stories', order: 1 },
    { title: '15,000+', subtitle: 'Annadaan Bhog', icon: 'soup_kitchen', order: 2 },
    { title: 'Kumartuli', subtitle: 'Clay Artistry', icon: 'palette', order: 3 }
  ];
  await prisma.heritagePillar.deleteMany();
  for (const p of pillars) {
    await prisma.heritagePillar.create({ data: p });
  }

  // 5. Seed Schedule Days & Items
  await prisma.scheduleItem.deleteMany();
  await prisma.scheduleDay.deleteMany();

  const daysData = [
    {
      dayKey: 'sasthi',
      dayName: 'Sasthi',
      dateLabel: 'Oct 20',
      order: 1,
      items: [
        {
          tag: 'DAWN',
          time: '06:30 AM — Kalparambha',
          description: 'Solemn vow of the festival, initial invocation rituals, and sanctification of the mandir altar.',
          order: 1
        },
        {
          tag: 'EVENING',
          time: '07:00 PM — Bodhon & Adhibas',
          description: 'Divine awakening of the goddess beneath the Bilva tree, followed by deep rhythmic Dhaak beats and evening Arati.',
          priest: 'Pandit S. Bannerjee',
          hasReminder: true,
          order: 2
        }
      ]
    },
    {
      dayKey: 'saptami',
      dayName: 'Saptami',
      dateLabel: 'Oct 21',
      order: 2,
      items: [
        {
          tag: 'MORNING',
          time: '06:00 AM — Nabapatrika Snan',
          description: 'Sacred bathing of the nine holy leaves at the holy Ganges waters, followed by Pratishtha in the pavilion.',
          order: 1
        },
        {
          tag: 'FORENOON',
          time: '10:30 AM — Saptami Pushpanjali',
          description: 'Devotee morning floral prayers followed by distribution of morning fruit charnamrit.',
          order: 2
        }
      ]
    },
    {
      dayKey: 'ashtami',
      dayName: 'Maha Ashtami',
      dateLabel: 'Oct 22',
      order: 3,
      items: [
        {
          tag: 'MORNING',
          time: '09:30 AM — Maha Ashtami Pushpanjali',
          description: 'The most sacred pushpanjali batch offerings. Traditional white dhuti and saree attire requested.',
          order: 1
        },
        {
          tag: 'AFTERNOON',
          time: '12:00 PM — Kumari Puja',
          description: 'Veneration of the young maiden as the living manifestation of the Supreme Divine Mother.',
          order: 2
        },
        {
          tag: 'EVENING',
          time: '05:48 PM — Sandhi Puja',
          description: 'Sacred transition junction between Ashtami and Navami. Lighting of 108 clay pradips and 108 lotus blooms.',
          order: 3
        }
      ]
    },
    {
      dayKey: 'navami',
      dayName: 'Maha Navami',
      dateLabel: 'Oct 23',
      order: 4,
      items: [
        {
          tag: 'FORENOON',
          time: '11:00 AM — Maha Navami Homa',
          description: 'Grand sacred fire ritual seeking universal peace, warding off discord and negative energies.',
          order: 1
        },
        {
          tag: 'NIGHT',
          time: '08:00 PM — Dhunuchi Naach Arena',
          description: 'Exhilarating incense dance performance honoring Mother Durga with live drum symphonies.',
          order: 2
        }
      ]
    },
    {
      dayKey: 'dashami',
      dayName: 'Vijaya Dashami',
      dateLabel: 'Oct 24',
      order: 5,
      items: [
        {
          tag: 'MORNING',
          time: '10:00 AM — Sindoor Khela',
          description: 'Traditional vermillion blessing ceremony among married women, offering sweets and betel leaves to the Mother.',
          order: 1
        },
        {
          tag: 'EVENING',
          time: '06:00 PM — Bishorjan & Shanti Jal',
          description: 'Ceremonial procession to the immersion ghats, sprinkling of sanctified peace waters (Shanti Jal).',
          order: 2
        }
      ]
    }
  ];

  for (const d of daysData) {
    const dayRecord = await prisma.scheduleDay.create({
      data: {
        dayKey: d.dayKey,
        dayName: d.dayName,
        dateLabel: d.dateLabel,
        order: d.order
      }
    });

    for (const it of d.items) {
      await prisma.scheduleItem.create({
        data: {
          dayId: dayRecord.id,
          tag: it.tag,
          time: it.time,
          description: it.description,
          priest: it.priest || null,
          hasReminder: it.hasReminder || false,
          order: it.order
        }
      });
    }
  }

  // 6. Seed Gallery Images
  const gallery = [
    {
      title: 'Sanctum Murti',
      subtitle: 'Kumartuli Clay Craft',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUjHura0knALlXM2R8kxcuf93TyBw25H-8nIgS5fkn7hjxBSUTlaFdPF2a7UD8lVWnhVTO2acude_pIJ1OZom656K2oOd_Pf3zltlnzJxZ89SQ9beeAYbnJpcietN7NahwcGaGkmQ9pGy5Knti_qGzPQSpXuLS8_OdBZa8leRjBeN06dkf4lph-Btb6gy9vFr6qZFIQ_ClTM915HPbzB6Y8sSZvbAAGrq6zA05E7AMktdFMHnYktxawA',
      altText: 'Close up devotional capture of Goddess Durga idol',
      isWide: false,
      order: 1
    },
    {
      title: 'Dhunuchi Arati',
      subtitle: 'Evening Devotion',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_iCyNGklVbC9h3iWaHAYy_76XZ0q3LQyROdn8ItqTuWeeI9e5YEDKs2UgulNaSgmYzDbMbVEAw81seKlGYbgjnIK1R5yIt8Ma9u2eaT_bI8ty4pkybaTskC3vxGA3vC8kXYUHiI-BVrMr4YwC-ufTFSZuas_Y5vhK22fbI-JH3xlSs8UoFtyVtaT3yFIiFsGqZB1F77LtvM4B4Xaox1Gc706g0SqlKNJwuSKlENjHVDDTaczASMWqg',
      altText: 'Traditional Bengali Dhunuchi dance during evening arati',
      isWide: false,
      order: 2
    },
    {
      title: 'Hand-drawn Rice Flour Alpona Pavilions',
      subtitle: 'Pandal Craft',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrHq5gSrqw8j43aOblyZoA_wILzhoGdUFzVTKe20qhU-Ep71Dws7EzrEQb3B_9G3M6kkewBMlK3T37WojNFp6iFoPDZMqgMNRSuDkPsme2OMWb33e_3ihLqV6RoLBY88bQkFqedRNBCe5QHo_9WyWpI1Whb8Z0IcbZnkgO8LAi2T5sxP52M3yP9Ox2hlW7I-SH8sfMwFttnaiOw6DK64RBBEMrhkyanIpKLAM7raJ1gSKGpWI5vfdGHQ',
      altText: 'Intricate traditional Bengali white rice paste Alpona floor art',
      isWide: true,
      order: 3
    }
  ];
  await prisma.galleryImage.deleteMany();
  for (const g of gallery) {
    await prisma.galleryImage.create({ data: g });
  }

  // 7. Seed Bhog Menu Items
  const bhogList = [
    { name: 'Gobindobhog Khichuri', description: 'Ghee roasted lentils', icon: 'rice_bowl', order: 1 },
    { name: 'Labra Tarkari', description: 'Autumn spiced medley', icon: 'nutrition', order: 2 },
    { name: 'Chhanar Payesh', description: 'Cardamom infused', icon: 'bakery_dining', order: 3 },
    { name: 'Tomato Chutney', description: 'Dates & crisp papad', icon: 'tapas', order: 4 }
  ];
  await prisma.bhogItem.deleteMany();
  for (const b of bhogList) {
    await prisma.bhogItem.create({ data: b });
  }

  // 8. Seed Cultural Events
  const events = [
    { month: 'OCT', day: '21', title: 'Agomoni Sangeet Recital', detail: 'Swarnali Sen & Mandir Choir • 8:00 PM', icon: 'music_note', order: 1 },
    { month: 'OCT', day: '23', title: 'Maha Dhunuchi Dance Arena', detail: 'Inter-Para Championship • 7:30 PM', icon: 'local_fire_department', order: 2 }
  ];
  await prisma.culturalEvent.deleteMany();
  for (const e of events) {
    await prisma.culturalEvent.create({ data: e });
  }

  // 9. Seed Transit Options
  const transit = [
    { title: 'Kalighat Metro', detail: '8 mins via auto / e-rickshaw', icon: 'subway', order: 1 },
    { title: 'Devotee Parking', detail: 'Gate No. 3 Pavilion Slot', icon: 'local_parking', order: 2 }
  ];
  await prisma.transitOption.deleteMany();
  for (const t of transit) {
    await prisma.transitOption.create({ data: t });
  }

  // 10. Seed Daan Tiers
  const daan = [
    { amount: 501, label: 'Pushpanjali', order: 1 },
    { amount: 1101, label: '108 Diyas', order: 2 },
    { amount: 2501, label: 'Annadaan Seva', order: 3 }
  ];
  await prisma.daanTier.deleteMany();
  for (const d of daan) {
    await prisma.daanTier.create({ data: d });
  }

  // 11. Sample Guest Invite
  await prisma.guestInvite.upsert({
    where: { slug: 'rahul-sharma' },
    update: {},
    create: {
      slug: 'rahul-sharma',
      guestName: 'Rahul Sharma & Family',
      personalMessage: 'We would be honored by your gracious presence during Maha Ashtami Pushpanjali and Bhog feast.',
      isFamily: true
    }
  });

  console.log('✅ Durga Puja database seeded successfully with 100% Stitch content!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
