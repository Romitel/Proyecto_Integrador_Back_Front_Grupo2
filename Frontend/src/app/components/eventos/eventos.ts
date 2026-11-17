import { Component, inject, signal } from '@angular/core';
import { Evento } from '../../models/eventos';
import { EventosServicios } from '../../services/eventos-servicios';
import { fmtDate, fmtTime } from '../../../lib/format';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class Eventos {
  readonly eventos = signal<Evento[]>([]);
  private readonly _eventoService = inject(EventosServicios);
  private fmtDate = fmtDate;
  private fmtTime = fmtTime;
  // readonly sports = [
  //   'Fútbol 5',
  //   'Fútbol 7',
  //   'Fútbol 11',
  //   'Básquet',
  //   'Vóley',
  //   'Pádel',
  //   'Hockey',
  //   'Otro',
  // ];

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this._eventoService.getEventos().subscribe({
      next: (data) => {
        const eventosFormateados = data.map((ev) => ({
          ...ev,
          fechaFormateada: this.fmtDate(ev.fecha),
          horario: this.fmtTime(ev.horario),
        }));
        this.eventos.set(eventosFormateados);
        console.log(data);
      },
      error: (error) => console.log(error),
    });
  }

  faltanDias(ev: Evento): string {
    // 1. Extract YYYY-MM-DD from the ISO string to avoid UTC timezone shifts
    const [year, month, day] = ev.fecha.split('T')[0].split('-').map(Number);
    const fechaEvento = new Date(year, month - 1, day);

    // 2. Get today's date at midnight (00:00:00)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // 3. Calculate difference in full days
    const msPorDia = 1000 * 60 * 60 * 24;
    const dias = Math.round((fechaEvento.getTime() - hoy.getTime()) / msPorDia);

    // 4. Return the appropriate message
    if (dias < 0) return 'Finalizado';
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Falta 1 día';

    return `Faltan ${dias} días`;
  }

  //   eliminarEvento(id: Evento['id']) {
  //   if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
  //     this._eventoService.eliminarEvento(id!).subscribe({
  //       next: (respuesta) => {
  //         console.log('Evento eliminado con éxito', respuesta);
  //         this.obtenerEventos();
  //       },
  //       error: (error) => {
  //         console.log('Error al eliminar el evento', error);
  //         alert('No se puede eliminar el evento. Intenta de nuevo.');
  //       },
  //     });
  //   }
  // }

  // editarEvento(evento: Evento) {
  //   const nuevoNombre = prompt('Ingrese el nuevo nombre del evento:', evento.nombre);
  //   if (nuevoNombre === null || nuevoNombre.trim() === '') {
  //     return;
  //   }
  //   const eventoActualizado: Evento = { ...evento, nombre: nuevoNombre };
  //   this._eventoService.actualizarEvento(evento.id, eventoActualizado).subscribe({
  //     next: (respuesta) => {
  //       console.log('Evento actualizado con exito', respuesta);
  //       this.obtenerEventos();
  //     },
  //     error: (error) => {
  //       console.error('Error al actualizar el evento', error);
  //     },
  //   });
  // }
}
