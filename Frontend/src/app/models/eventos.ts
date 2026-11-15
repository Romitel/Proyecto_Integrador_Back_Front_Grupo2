// export interface Evento{
//     id? : number,
//     nombre:string,
//     description: string
// }

export interface Evento {
  id: number;
  disciplina: string;
  nombre: string;
  fecha: string;   // Ej: '2026-11-19'
  horario: string; // Ej: '20:30:00'
  lugar_direccion: string;
  capacidad_maxima: number;
  minimo_para_jugar: number;
  modalidad: string; // Ej: 'abierta' | 'cerrada'
  edad_desde?: number | null;
  edad_hasta?: number | null;
  habilitar_invitados?: boolean;
  notas?: string | null;
  estado?: string; // 'programado' | 'cancelado' | 'finalizado' más adelante
  //inscripciones?: any[]; cuando exista
}