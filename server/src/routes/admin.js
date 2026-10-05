import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import prisma from '../prisma.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Setup local uploads directory
const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// All admin routes require authentication
router.use(authenticateAdmin);

// POST /api/admin/upload - Image upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

// GET /api/admin/data - Complete database payload for admin dashboard
router.get('/data', async (req, res) => {
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
      daanTiers,
      rsvps,
      invites
    ] = await Promise.all([
      prisma.siteSettings.findFirst({ where: { id: 1 } }),
      prisma.section.findMany({ orderBy: { order: 'asc' } }),
      prisma.heritagePillar.findMany({ orderBy: { order: 'asc' } }),
      prisma.scheduleDay.findMany({
        orderBy: { order: 'asc' },
        include: { items: { orderBy: { order: 'asc' } } }
      }),
      prisma.galleryImage.findMany({ orderBy: { order: 'asc' } }),
      prisma.bhogItem.findMany({ orderBy: { order: 'asc' } }),
      prisma.culturalEvent.findMany({ orderBy: { order: 'asc' } }),
      prisma.transitOption.findMany({ orderBy: { order: 'asc' } }),
      prisma.daanTier.findMany({ orderBy: { order: 'asc' } }),
      prisma.rSVP.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.guestInvite.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    res.json({
      siteSettings,
      sections,
      heritagePillars,
      scheduleDays,
      galleryImages,
      bhogItems,
      culturalEvents,
      transitOptions,
      daanTiers,
      rsvps,
      invites
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Failed to fetch admin data' });
  }
});

// PUT /api/admin/settings - Update site settings
router.put('/settings', async (req, res) => {
  try {
    const data = req.body;
    delete data.id;
    delete data.updatedAt;

    const updated = await prisma.siteSettings.update({
      where: { id: 1 },
      data
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// PUT /api/admin/sections - Update section order & visibility
router.put('/sections', async (req, res) => {
  try {
    const { sections } = req.body;
    if (!Array.isArray(sections)) {
      return res.status(400).json({ error: 'Sections must be an array' });
    }

    for (const sec of sections) {
      await prisma.section.update({
        where: { id: sec.id },
        data: {
          order: sec.order,
          isVisible: sec.isVisible !== undefined ? sec.isVisible : true
        }
      });
    }

    const updatedSections = await prisma.section.findMany({ orderBy: { order: 'asc' } });
    res.json({ success: true, sections: updatedSections });
  } catch (error) {
    console.error('Error updating sections:', error);
    res.status(500).json({ error: 'Failed to update sections' });
  }
});

// CRUD for Gallery Images
router.post('/gallery', async (req, res) => {
  try {
    const { title, subtitle, url, altText, isWide, order } = req.body;
    const img = await prisma.galleryImage.create({
      data: { title, subtitle, url, altText, isWide: Boolean(isWide), order: order || 0 }
    });
    res.status(201).json({ success: true, data: img });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add image' });
  }
});

router.put('/gallery/:id', async (req, res) => {
  try {
    const { title, subtitle, url, altText, isWide, order } = req.body;
    const updated = await prisma.galleryImage.update({
      where: { id: req.params.id },
      data: { title, subtitle, url, altText, isWide: Boolean(isWide), order }
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update image' });
  }
});

router.delete('/gallery/:id', async (req, res) => {
  try {
    await prisma.galleryImage.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// CRUD for Schedule
router.post('/schedule/days', async (req, res) => {
  try {
    const { dayKey, dayName, dateLabel, order } = req.body;
    const day = await prisma.scheduleDay.create({
      data: { dayKey, dayName, dateLabel, order: order || 0 }
    });
    res.status(201).json({ success: true, data: day });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create schedule day' });
  }
});

router.post('/schedule/items', async (req, res) => {
  try {
    const { dayId, tag, time, description, priest, hasReminder, order } = req.body;
    const item = await prisma.scheduleItem.create({
      data: { dayId, tag, time, description, priest, hasReminder: Boolean(hasReminder), order: order || 0 }
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create schedule item' });
  }
});

router.put('/schedule/items/:id', async (req, res) => {
  try {
    const { tag, time, description, priest, hasReminder, order } = req.body;
    const updated = await prisma.scheduleItem.update({
      where: { id: req.params.id },
      data: { tag, time, description, priest, hasReminder: Boolean(hasReminder), order }
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update schedule item' });
  }
});

router.delete('/schedule/items/:id', async (req, res) => {
  try {
    await prisma.scheduleItem.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete schedule item' });
  }
});

// RSVPs and CSV export
router.get('/rsvp', async (req, res) => {
  try {
    const { search } = req.query;
    let where = {};
    if (search) {
      where = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search } },
          { tokenCode: { contains: search } }
        ]
      };
    }
    const rsvps = await prisma.rSVP.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json({ rsvps });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

router.get('/rsvp/export', async (req, res) => {
  try {
    const rsvps = await prisma.rSVP.findMany({ orderBy: { createdAt: 'desc' } });
    let csv = 'Token,Name,Phone,Members,Ritual,Date\n';
    for (const r of rsvps) {
      csv += `"${r.tokenCode}","${r.name}","${r.phone}",${r.members},"${r.ritual}","${r.createdAt.toISOString()}"\n`;
    }
    res.header('Content-Type', 'text/csv');
    res.attachment('durga-puja-rsvps.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

// Guest Invites
router.post('/invites/bulk', async (req, res) => {
  try {
    const { namesText, personalMessage } = req.body;
    if (!namesText) {
      return res.status(400).json({ error: 'Pasted names are required' });
    }
    const names = namesText.split('\n').map(n => n.trim()).filter(Boolean);
    const created = [];

    for (const name of names) {
      const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      let slug = baseSlug;
      let counter = 1;
      while (await prisma.guestInvite.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter++}`;
      }
      const invite = await prisma.guestInvite.create({
        data: {
          slug,
          guestName: name,
          personalMessage: personalMessage || 'We cordially invite you and your family to celebrate Durga Puja with us.'
        }
      });
      created.push(invite);
    }
    res.json({ success: true, count: created.length, data: created });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk create invites' });
  }
});

export default router;
