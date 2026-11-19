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

export function isEventPassed(ev: Evento): boolean {
  const [year, month, day] = ev.fecha.split('T')[0].split('-').map(Number);
  const [hours = 0, minutes = 0] = (ev.horario || '00:00').split(':').map(Number);
  const eventDateTime = new Date(year, month - 1, day, hours, minutes);
  return eventDateTime.getTime() < Date.now();
}
