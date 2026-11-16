import { Evento } from '../app/models/eventos';

const tz = 'America/Argentina/Buenos_Aires';

export const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: tz,
  }).format(new Date(iso));

export const fmtTime = (time: string): string => {
  if (!time) return '';
  return time.slice(0, 5);
};

export const fmtDateTime = (iso: string) => `${fmtDate(iso)} · ${fmtTime(iso)} h`;

export const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsEmbed = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const whatsappShare = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;

export function errMsg(e: unknown): string {
  if (e && typeof e === 'object' && 'message' in e)
    return String((e as { message: string }).message);
  return 'Ocurrió un error';
}

export function isEventPassed(ev: Evento): boolean {
  // 1. Extract year, month, and day safely in local time
  const [year, month, day] = ev.fecha.split('T')[0].split('-').map(Number);

  // 2. Extract hours and minutes from ev.horario (defaults to 00:00 if missing)
  const [hours = 0, minutes = 0] = (ev.horario || '00:00').split(':').map(Number);

  // 3. Create the exact local Date & Time of the event
  const eventDateTime = new Date(year, month - 1, day, hours, minutes);

  // 4. Compare against right now
  return eventDateTime.getTime() < Date.now();
}
