export enum Modalidad {
  ABIERTA = 'Abierta',
  CERRADA = 'Cerrada',
}

export enum Disciplina {
  FUTBOL = 'Futbol',
  PADEL = 'Padel',
  BASQUET = 'Basquet',
  RUGBY = 'Rugby',
}

export interface Evento {
  id?: number;
  disciplina: Disciplina;
  nombre: string | null;
  fecha: string; // Ej: '2026-11-19'
  fechaFormateada?: string;
  horario: string; // Ej: '20:30:00'
  lugar_direccion: string;
  capacidad_maxima: number;
  minimo_para_jugar: number;
  modalidad: Modalidad;
  edad_desde?: number | null;
  edad_hasta?: number | null;
  habilitar_invitados?: boolean;
  notas?: string | null;
  estado?: string; // Por si agregas 'programado' | 'cancelado' | 'finalizado'
  inscripciones?: any[]; // Relación con inscriptos si existe
}
