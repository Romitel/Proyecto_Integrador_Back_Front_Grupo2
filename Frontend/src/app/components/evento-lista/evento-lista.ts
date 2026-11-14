import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BadgeComponent, ButtonComponent } from '../../components/ui';
import { EventosServicios } from '../../services/eventos-servicios'; // Ajusta la ruta a tu servicio
import { Evento } from '../../models/eventos'; // Ajusta la ruta a tu interfaz/modelo
import { fmtDate, fmtTime, fmtDateTime } from '../../../lib/format';
import { allocate, belowMinimum } from '../../../lib/allocation';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [RouterLink, BadgeComponent, ButtonComponent],
  templateUrl: './evento-lista.html',
  styles: [`
    .card-hover {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .card-hover:hover {
      transform: translateY(-2px);
    }
    .tracking-widest {
      letter-spacing: 0.1em;
    }
  `]
})
export class EventoLista implements OnInit {
  private readonly _eventoService = inject(EventosServicios);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  // Signals de estado
  readonly eventos = signal<Evento[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly error = signal<boolean>(false);

  // Valores temporales mientras no hay auth
  readonly isAdmin = signal<boolean>(true);
  readonly uid = signal<string>('');

  // Combina fecha ('YYYY-MM-DD') y horario ('HH:MM:SS') en un timestamp comparable
  private getTimestamp(e: Evento): number {
    return new Date(`${e.fecha}T${e.horario}`).getTime();
  }

  // Próximos encuentros (hasta 3 horas después de haber empezado)
  readonly upcoming = computed(() => {
    const now = Date.now();
    return this.eventos().filter((e: any) => {
      const noCancelado = !e.estado || e.estado === 'programado';
      return noCancelado && this.getTimestamp(e) > now - 3 * 3600_000;
    });
  });

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
      content: 'Próximos encuentros de tu grupo y su estado de cupos.'
    });

    this.cargarEventos();
  }

  cargarEventos(): void {
    this.isLoading.set(true);
    this.error.set(false);

    this._eventoService.getEventos().subscribe({
      next: (data) => {
        this.eventos.set(data ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar encuentros:', err);
        this.error.set(true);
        this.isLoading.set(false);
      }
    });
  }

  // Formateo de fecha en español (ej: "jueves 19 nov")
  fmtFecha(fechaStr: string): string {
    if (!fechaStr) return '';
    const date = new Date(`${fechaStr}T00:00:00`);
    return new Intl.DateTimeFormat('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    }).format(date);
  }

  // Formateo de horario (ej: "20:30:00" -> "20:30")
  fmtHorario(horarioStr: string): string {
    if (!horarioStr) return '';
    return horarioStr.slice(0, 5);
  }

  // Cálculo de cupos y estado del usuario por tarjeta
  getCardInfo(e: any) {
    const regs = (e.inscripciones ?? []).filter(
      (r: any) => r.estado === 'inscripto' || r.status === 'inscripto'
    );
    const confirmed = regs.slice(0, e.capacidad_maxima);
    const waitlist = regs.slice(e.capacidad_maxima);

    const mine = regs.find((r: any) => r.user_id === this.uid());
    const myState = mine
      ? confirmed.some((r: any) => r.id === mine.id)
        ? 'confirmado'
        : 'espera'
      : null;

    const pct = e.capacidad_maxima > 0
      ? Math.min(100, (confirmed.length / e.capacidad_maxima) * 100)
      : 0;

    const belowMin = confirmed.length < e.minimo_para_jugar;

    return { confirmed, waitlist, myState, pct, belowMin };
  }
}