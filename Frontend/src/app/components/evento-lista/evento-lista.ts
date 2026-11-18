import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { fmtDate, fmtTime, isEventPassed } from '../../../lib/format';
import { BadgeComponent, ButtonComponent } from '../../components/ui';
import { Evento, Modalidad } from '../../models/eventos'; // Ajusta la ruta a tu interfaz/modelo
import { EventosServicios } from '../../services/eventos-servicios'; // Ajusta la ruta a tu servicio

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [RouterLink, BadgeComponent, ButtonComponent],
  templateUrl: './evento-lista.html',
  styles: [
    `
      .card-hover {
        transition:
          transform 0.15s ease,
          box-shadow 0.15s ease;
      }
      .card-hover:hover {
        transform: translateY(-2px);
      }
      .tracking-widest {
        letter-spacing: 0.1em;
      }
    `,
  ],
})
export class EventoLista implements OnInit {
  private readonly _eventoService = inject(EventosServicios);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly Modalidad = Modalidad;
  private fmtDate = fmtDate;
  private fmtTime = fmtTime;

  // Signals de estado
  readonly eventos = signal<Evento[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly error = signal<boolean>(false);

  // Valores temporales mientras no hay auth
  readonly isAdmin = signal<boolean>(true);
  readonly uid = signal<string>('');

  // Combina fecha ('YYYY-MM-DD') y horario ('HH:MM:SS') en un timestamp comparable
  // private getTimestamp(e: Evento): number {
  //   return new Date(`${e.fecha}T${e.horario}`).getTime();
  // }

  // Próximos encuentros (hasta 3 horas después de haber empezado)
  readonly upcoming = computed(() => {
    return this.eventos().filter((e: any) => !isEventPassed(e));
  });

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

  // Encuentros anteriores o cancelados
  readonly past = computed(() => {
    const upcomingIds = new Set(this.upcoming().map((e) => e.id));
    return this.eventos()
      .filter((e) => !upcomingIds.has(e.id))
      .reverse();
  });

  ngOnInit(): void {
    this.titleService.setTitle('Convocatorias — ESTOY');
    this.metaService.updateTag({
      name: 'description',
      content: 'Próximos encuentros de tu grupo y su estado de cupos.',
    });

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
        // console.log(data);
      },
      error: (err) => {
        console.error('Error al cargar encuentros:', err);
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }

  // // Formateo de fecha en español (ej: "jueves 19 nov")
  // fmtFecha(fechaStr: string): string {
  //   if (fechaStr) return '';
  //   const date = new Date(`${fechaStr}T00:00:00`);
  //   return new Intl.DateTimeFormat('es-AR', {
  //     weekday: 'long',
  //     day: 'numeric',
  //     month: 'short',
  //   }).format(date);
  // }

  // Formateo de horario (ej: "20:30:00" -> "20:30")
  fmtHorario(horarioStr: string): string {
    if (!horarioStr) return '';
    return horarioStr.slice(0, 5);
  }

  // Cálculo de cupos y estado del usuario por tarjeta
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
