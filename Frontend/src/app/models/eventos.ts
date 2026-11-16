// export interface Evento{
//     id? : number,
//     nombre:string,
//     description: string
// }

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
<<<<<<< HEAD
  id?: number;
  disciplina: Disciplina;
  nombre: string | null;
  fecha: string; // Ej: '2026-11-19'
  fechaFormateada?: string;
=======
  id: number;
  disciplina: string;
  nombre: string;
  fecha: string;   // Ej: '2026-11-19'
>>>>>>> 196f9dfa0c7eaa3e482d838bb9b5e1f00128ca61
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
