const tz = "America/Argentina/Buenos_Aires";

export const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long", timeZone: tz }).format(new Date(iso));

export const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date(iso));

export const fmtDateTime = (iso: string) => `${fmtDate(iso)} · ${fmtTime(iso)} h`;

export const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsEmbed = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const whatsappShare = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;

export function errMsg(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) return String((e as { message: string }).message);
  return "Ocurrió un error";
}