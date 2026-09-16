import { env } from 'cloudflare:workers';

const allowedServices = new Set(['classic','hybrid','volume']);
const allowedTimes = new Set(['09:00','10:30','12:00','14:00','15:30','17:00']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date');
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return Response.json({ unavailable: [] });
  const result = await env.DB.prepare("SELECT time FROM bookings WHERE date = ? AND status != 'cancelled'").bind(date).all<{time:string}>();
  return Response.json({ unavailable: result.results.map(row => row.time) });
}

export async function POST(request: Request) {
  const body = await request.json<Record<string, unknown>>().catch(() => null);
  if (!body) return Response.json({ error: 'Invalid request.' }, { status: 400 });
  const service=String(body.service||''),date=String(body.date||''),time=String(body.time||''),name=String(body.name||'').trim(),email=String(body.email||'').trim(),phone=String(body.phone||'').trim(),notes=String(body.notes||'').trim().slice(0,1000);
  if(!allowedServices.has(service)||!allowedTimes.has(time)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!name||!phone||!emailPattern.test(email)) return Response.json({ error:'Please complete every required booking field.' },{status:400});
  if(date < new Date().toISOString().slice(0,10)) return Response.json({ error:'Please choose a future date.' },{status:400});
  const id=crypto.randomUUID(),reference=`LBD-${crypto.randomUUID().slice(0,6).toUpperCase()}`;
  const created=await env.DB.prepare("INSERT INTO bookings (id, reference, service, date, time, name, email, phone, notes, status, created_at) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM bookings WHERE date = ? AND time = ? AND status != 'cancelled')").bind(id,reference,service,date,time,name,email,phone,notes,'requested',new Date().toISOString(),date,time).run();
  if(!created.meta.changes) return Response.json({ error:'That time has just been booked. Please choose another.' },{status:409});
  return Response.json({ reference },{status:201});
}
