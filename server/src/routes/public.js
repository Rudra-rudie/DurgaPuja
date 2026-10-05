import { Router } from 'express';
import prisma from '../prisma.js';

const router = Router();

// GET /api/public/content - Load all content for public invitation
router.get('/content', async (req, res) => {
  try {
    const [
      siteSettings,
      sections,
      heritagePillars,
      scheduleDays,
      galleryImages,
      bhogItems,
      culturalEvents,
      transitOptions,
      daanTiers
    ] = await Promise.all([
      prisma.siteSettings.findFirst({ where: { id: 1 } }),
      prisma.section.findMany({ orderBy: { order: 'asc' } }),
      prisma.heritagePillar.findMany({ orderBy: { order: 'asc' } }),
      prisma.scheduleDay.findMany({
        orderBy: { order: 'asc' },
        include: {
          items: {
            orderBy: { order: 'asc' }
          }
        }
      }),
      prisma.galleryImage.findMany({ orderBy: { order: 'asc' } }),
      prisma.bhogItem.findMany({ orderBy: { order: 'asc' } }),
      prisma.culturalEvent.findMany({ orderBy: { order: 'asc' } }),
      prisma.transitOption.findMany({ orderBy: { order: 'asc' } }),
      prisma.daanTier.findMany({ orderBy: { order: 'asc' } })
    ]);

    res.json({
      siteSettings: siteSettings || {},
      sections: sections || [],
      heritagePillars: heritagePillars || [],
      scheduleDays: scheduleDays || [],
      galleryImages: galleryImages || [],
      bhogItems: bhogItems || [],
      culturalEvents: culturalEvents || [],
      transitOptions: transitOptions || [],
      daanTiers: daanTiers || []
    });
  } catch (error) {
    console.error('Error fetching public content:', error);
    res.status(500).json({ error: 'Failed to load public invitation content' });
  }
});

// POST /api/public/rsvp - Create new devotee RSVP
router.post('/rsvp', async (req, res) => {
  try {
    const { name, phone, members, ritual } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone number are required' });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const tokenCode = `PUJA-1431-${randomSuffix}`;

    const rsvp = await prisma.rSVP.create({
      data: {
        name,
        phone,
        members: parseInt(members, 10) || 1,
        ritual: ritual || 'ashtami-pushpanjali',
        tokenCode
      }
    });

    res.status(201).json({
      success: true,
      message: 'RSVP confirmed successfully',
      data: rsvp
    });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    res.status(500).json({ error: 'Failed to submit RSVP' });
  }
});

// GET /api/public/invite/:slug - Get personalized guest invitation
router.get('/invite/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const invite = await prisma.guestInvite.findUnique({
      where: { slug }
    });

    if (!invite) {
      return res.status(404).json({ error: 'Personalized invite not found' });
    }

    // Increment views count
    await prisma.guestInvite.update({
      where: { slug },
      data: { viewsCount: { increment: 1 } }
    });

    res.json({
      success: true,
      guest: {
        guestName: invite.guestName,
        personalMessage: invite.personalMessage,
        isFamily: invite.isFamily,
        slug: invite.slug,
        viewsCount: invite.viewsCount + 1
      }
    });
  } catch (error) {
    console.error('Error fetching invite:', error);
    res.status(500).json({ error: 'Failed to load personalized invitation' });
  }
});

export default router;
