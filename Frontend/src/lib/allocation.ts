export type Category = "activo" | "invitado";

export interface EventRules {
  starts_at: string;
  mode: "abierta" | "cerrada";
  guests_enabled_early: boolean;
  max_capacity: number;
  min_participants: number;
  status: "programado" | "cancelado" | "finalizado";
}

export interface RegistrationLike {
  id: string;
  user_id: string;
  status: "inscripto" | "cancelado";
  category_at_signup: Category;
  created_at: string;
  attended: boolean | null;
}

export interface MemberStats {
  attended: number;
  absences: number;
  cancellations: number;
  joinedAt: string;
}

export const GUEST_WINDOW_HOURS = 24;

/** Momento en que se habilita la inscripción de invitados (null si la convocatoria es cerrada). */
export function guestWindowOpensAt(ev: EventRules): Date | null {
  if (ev.mode === "cerrada") return null;
  return new Date(new Date(ev.starts_at).getTime() - GUEST_WINDOW_HOURS * 3600_000);
}

export function guestsCanRegister(ev: EventRules, now: Date = new Date()): boolean {
  if (ev.mode === "cerrada" || ev.status !== "programado") return false;
  if (now >= new Date(ev.starts_at)) return false;
  if (ev.guests_enabled_early) return true;
  const opens = guestWindowOpensAt(ev)!;
  return now >= opens;
}

export function canRegister(ev: EventRules, category: Category, now: Date = new Date()): boolean {
  if (ev.status !== "programado" || now >= new Date(ev.starts_at)) return false;
  if (category === "activo") return true;
  return guestsCanRegister(ev, now);
}

/**
 * Puntaje de ranking: 3 por asistencia efectiva, -2 por inasistencia (confirmó y no fue),
 * -1 por cancelación.
 */
export function rankingScore(s: Pick<MemberStats, "attended" | "absences" | "cancellations">): number {
  return s.attended * 3 - s.absences * 2 - s.cancellations;
}

/** Compara dos integrantes para el ranking: mayor puntaje, más asistencias, menos cancelaciones, mayor antigüedad. */
export function compareMembers(a: MemberStats, b: MemberStats): number {
  return (
    rankingScore(b) - rankingScore(a) ||
    b.attended - a.attended ||
    a.cancellations - b.cancellations ||
    new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()
  );
}

export function computeStats(
  registrations: Pick<RegistrationLike, "user_id" | "status" | "attended">[],
  joinedAtByUser: Record<string, string>,
): Record<string, MemberStats> {
  const out: Record<string, MemberStats> = {};
  for (const [uid, joinedAt] of Object.entries(joinedAtByUser)) {
    out[uid] = { attended: 0, absences: 0, cancellations: 0, joinedAt };
  }
  for (const r of registrations) {
    const s = (out[r.user_id] ??= { attended: 0, absences: 0, cancellations: 0, joinedAt: new Date(0).toISOString() });
    if (r.status === "cancelado") s.cancellations++;
    else if (r.attended === true) s.attended++;
    else if (r.attended === false) s.absences++;
  }
  return out;
}

/**
 * Ordena a los inscriptos y separa confirmados de lista de espera.
 * 1. Activos primero, por orden de inscripción (prioridad).
 * 2. Invitados después, según ranking; empate por orden de inscripción.
 */
export function allocate<R extends RegistrationLike>(
  registrations: R[],
  capacity: number,
  stats: Record<string, MemberStats> = {},
): { confirmed: R[]; waitlist: R[]; cancelled: R[] } {
  const active = registrations.filter((r) => r.status === "inscripto");
  const cancelled = registrations.filter((r) => r.status === "cancelado");
  const byTime = (a: R, b: R) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  const activos = active.filter((r) => r.category_at_signup === "activo").sort(byTime);
  const empty: MemberStats = { attended: 0, absences: 0, cancellations: 0, joinedAt: new Date(0).toISOString() };
  const invitados = active
    .filter((r) => r.category_at_signup === "invitado")
    .sort((a, b) => {
      const sa = stats[a.user_id] ?? empty;
      const sb = stats[b.user_id] ?? empty;
      return rankingScore(sb) - rankingScore(sa) || sb.attended - sa.attended || byTime(a, b);
    });
  const ordered = [...activos, ...invitados];
  return { confirmed: ordered.slice(0, capacity), waitlist: ordered.slice(capacity), cancelled };
}

export function belowMinimum(confirmedCount: number, ev: Pick<EventRules, "min_participants">): boolean {
  return confirmedCount < ev.min_participants;
}
export const EMPTY_STATS: MemberStats = { attended: 0, absences: 0, cancellations: 0, joinedAt: new Date(0).toISOString() };