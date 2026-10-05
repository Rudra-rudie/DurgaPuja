const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function fetchPublicContent() {
  const res = await fetch(`${API_BASE}/public/content`);
  if (!res.ok) throw new Error('Failed to load invitation content');
  return res.json();
}

export async function submitRsvpApi(data) {
  const res = await fetch(`${API_BASE}/public/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit RSVP');
  }
  return res.json();
}

export async function fetchPersonalizedInvite(slug) {
  const res = await fetch(`${API_BASE}/public/invite/${slug}`);
  if (!res.ok) throw new Error('Personalized invite not found');
  return res.json();
}
