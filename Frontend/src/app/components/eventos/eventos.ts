import { Component, inject, signal } from '@angular/core';
import { EventosServicios } from '../../services/eventos-servicios';
import { Evento } from '../../models/eventos';
import { fmtDate, fmtTime } from '../../../lib/format';
@Component({
  selector: 'app-eventos',
  imports: [],
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
}
