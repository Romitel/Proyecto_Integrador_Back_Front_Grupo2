import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fmtDate, fmtTime, isEventPassed } from '../../../lib/format';
import { BadgeComponent, ButtonComponent } from '../../components/ui';
import { Evento } from '../../models/eventos';
import { EventosServicios } from '../../services/eventos-servicios';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [RouterLink, BadgeComponent, ButtonComponent],
  templateUrl: './evento-lista.html',
  styleUrl: './evento-lista.css',
})
export class EventoLista implements OnInit {
  private readonly _eventoService = inject(EventosServicios);
  private fmtDate = fmtDate;
  private fmtTime = fmtTime;

  readonly eventos = signal<Evento[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly error = signal<boolean>(false);

  readonly isAdmin = signal<boolean>(true);
  readonly uid = signal<string>('');

  readonly upcoming = computed(() => {
    return this.eventos().filter((e: any) => !isEventPassed(e));
  });

  faltanDias(ev: Evento): string {
    const [year, month, day] = ev.fecha.split('T')[0].split('-').map(Number);
    const fechaEvento = new Date(year, month - 1, day);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const msPorDia = 1000 * 60 * 60 * 24;
    const dias = Math.round((fechaEvento.getTime() - hoy.getTime()) / msPorDia);

    if (dias < 0) return 'Finalizado';
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Falta 1 día';

    return `Faltan ${dias} días`;
  }

  readonly past = computed(() => {
    const upcomingIds = new Set(this.upcoming().map((e) => e.id));
    return this.eventos()
      .filter((e) => !upcomingIds.has(e.id))
      .reverse();
  });

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.isLoading.set(true);
    this.error.set(false);

    this._eventoService.getEventos().subscribe({
      next: (data) => {
        const eventosFormateados = data.map((ev) => ({
          ...ev,
          fechaFormateada: this.fmtDate(ev.fecha),
          horario: this.fmtTime(ev.horario),
        }));
        this.eventos.set(eventosFormateados);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar encuentros');
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }

  fmtHorario(horarioStr: string): string {
    if (!horarioStr) return '';
    return horarioStr.slice(0, 5);
  }

  getCardInfo(e: any) {
    const regs = (e.inscripciones ?? []).filter(
      (r: any) => r.estado === 'inscripto' || r.status === 'inscripto',
    );
    const confirmed = regs.slice(0, e.capacidad_maxima);
    const waitlist = regs.slice(e.capacidad_maxima);

    const mine = regs.find((r: any) => r.user_id === this.uid());
    const myState = mine
      ? confirmed.some((r: any) => r.id === mine.id)
        ? 'confirmado'
        : 'espera'
      : null;

    const pct =
      e.capacidad_maxima > 0 ? Math.min(100, (confirmed.length / e.capacidad_maxima) * 100) : 0;

    const belowMin = confirmed.length < e.minimo_para_jugar;

    return { confirmed, waitlist, myState, pct, belowMin };
  }
}
