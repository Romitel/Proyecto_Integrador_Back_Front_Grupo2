import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

// Ajusta estas rutas a tus servicios equivalentes en Angular
// import { ToastService } from '../../services/toast.service';
import { allocate, canRegister, guestWindowOpensAt } from '../../../lib/allocation';
import { errMsg, fmtDate, fmtDateTime, fmtTime } from '../../../lib/format';
import { EventosServicios } from '../../services/eventos-servicios';
import { Evento } from '../../models/eventos';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './evento-detalle.html',
  styleUrls: ['./evento-detalle.css'],
})
export class EventoDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private thisRoute = inject(Router);
  //   private toast = inject(ToastService);
  private _eventoService = inject(EventosServicios);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // Helpers expuestos al template
  fmtDate = fmtDate;
  fmtDateTime = fmtDateTime;
  fmtTime = fmtTime;

  // Estados reactivos (Signals)
  eventId = signal<string>('');
  isLoading = signal<boolean>(true);
  busy = signal<boolean>(false);
  ev = signal<any | null>(null);
  regs = signal<any[]>([]);
  membersStats = signal<any | null>(null);
  evento = signal<Evento | null>(null);

  // Estado de formularios e interacción
  replacement = '';
  attendance: Record<string, boolean> = {};
  showCancelModal = signal<boolean>(false);

  // Datos de usuario/sesión
  //   session = this.auth.session;
  //   profile = this.auth.profile;
  //   isAdmin = this.auth.isAdmin;

  // Cálculos derivados (equivalente a useMemo)
  alloc = computed(() => {
    const currentEv = this.ev();
    if (!currentEv) return null;
    return allocate(this.regs(), currentEv.max_capacity, this.membersStats());
  });

  //   uid = computed(() => this.session()?.user?.id ?? '');

  //   mine = computed(() => this.regs().find((r) => r.user_id === this.uid()));
  //   myActive = computed(() => this.mine()?.status === 'inscripto');
  //   myConfirmed = computed(
  //     () => this.alloc()?.confirmed.some((r: any) => r.user_id === this.uid()) ?? false,
  //   );
  //   myWaitPos = computed(
  //     () => this.alloc()?.waitlist.findIndex((r: any) => r.user_id === this.uid()) ?? -1,
  //   );

  //   category = computed(() => this.profile()?.category ?? 'invitado');
  //   allowed = computed(() => (this.ev() ? canRegister(this.ev(), this.category()) : false));
  //   opens = computed(() => (this.ev() ? guestWindowOpensAt(this.ev()) : null));
  started = computed(() => (this.ev() ? new Date() >= new Date(this.ev().horario) : false));
  free = computed(() => {
    const currentEv = this.ev();
    const currentAlloc = this.alloc();
    if (!currentEv || !currentAlloc) return 0;
    return Math.max(0, currentEv.minimo_para_jugar - currentAlloc.confirmed.length);
  });

  shareText = computed(() => {
    const e = this.ev();
    const a = this.alloc();
    if (!e || !a) return '';
    const url = typeof window !== 'undefined' ? window.location.href : '';
    return `⚽ ${e.disciplina}${e.nombre ? ` — ${e.nombre}` : ''}\n📅 ${fmtDateTime(e.horario)}\n📍 ${e.lugar_direccion}\n👥 ${a.confirmed.length}/${e.capacidad_maxima} confirmados\nConfirmá en ESTOY: ${url}`;
  });

  ngOnInit(): void {
    // Equivalente a head() de TanStack Router
    this.titleService.setTitle('Encuentro — ESTOY');
    this.metaService.updateTag({
      name: 'description',
      content: 'Detalle del encuentro: cupos, confirmados, lista de espera y ubicación.',
    });
    this.metaService.updateTag({ property: 'og:title', content: 'Encuentro — ESTOY' });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Confirmá tu lugar en este encuentro.',
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId.set(id);
      this.loadData();
    }
  }

  obtenerEvento(id: Evento['id']) {
    this._eventoService.getEventoById(id).subscribe({
      next: (data) => {
        console.log(data);
        data.fechaFormateada = this.fmtDate(data.fecha);
        data.horario = this.fmtTime(data.horario);
        this.evento.set(data);
      },
      error: (error) => console.log(error),
    });
  }

  async loadData() {
    this.isLoading.set(true);
    try {
      console.log(this.eventId());

      this.obtenerEvento(+this.eventId());
      //   const [eventRes, membersRes] = await Promise.all([
      //     this.supabase
      //       .from('events')
      //       .select('*, registrations(*)')
      //       .eq('id', this.eventId())
      //       .single(),
      //     this.supabase.from('members_stats').select('*'), // Ajusta según tu query exacta
      //   ]);

      //   if (eventRes.data) {
      //     this.ev.set(eventRes.data);
      //     this.regs.set(eventRes.data.registrations ?? []);
      //   }
      //   if (membersRes.data) {
      //     this.membersStats.set(membersRes.data);
      //   }

      // Sincronizar checkboxes de asistencia (equivalente a useEffect)
      const currentAlloc = this.alloc();
      if (currentAlloc) {
        this.attendance = Object.fromEntries(
          currentAlloc.confirmed.map((r: any) => [r.id, r.attended ?? true]),
        );
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  //   private async run(fn: () => PromiseLike<{ error: unknown }>, okMsg: string) {
  //     this.busy.set(true);
  //     const { error } = await fn();
  //     this.busy.set(false);
  //     if (error) {
  //       this.toast.error(errMsg(error));
  //       return;
  //     }
  //     this.toast.success(okMsg);
  //     await this.loadData();
  //   }

  //   join() {
  //     const m = this.mine();
  //     this.run(
  //       () =>
  //         m
  //           ? this.supabase
  //               .from('registrations')
  //               .update({ status: 'inscripto', replacement_name: null })
  //               .eq('id', m.id)
  //           : this.supabase
  //               .from('registrations')
  //               .insert({ event_id: this.ev().id, user_id: this.uid() }),
  //       '¡Listo! Quedaste inscripto.',
  //     );
  //   }

  //   confirmCancel() {
  //     const m = this.mine();
  //     if (!m) return;
  //     this.showCancelModal.set(false);
  //     this.run(
  //       () =>
  //         this.supabase
  //           .from('registrations')
  //           .update({ status: 'cancelado', replacement_name: this.replacement || null })
  //           .eq('id', m.id),
  //       'Cancelaste tu inscripción. El lugar quedó libre.',
  //     );
  //   }

  //   toggleGuests(v: boolean) {
  //     this.run(
  //       () => this.supabase.from('events').update({ guests_enabled_early: v }).eq('id', this.ev().id),
  //       v ? 'Invitados habilitados' : 'Invitados recién 24 h antes',
  //     );
  //   }

  //   cancelEvent() {
  //     this.run(
  //       () => this.supabase.from('events').update({ status: 'cancelado' }).eq('id', this.ev().id),
  //       'Encuentro cancelado',
  //     );
  //   }

  //   async saveAttendance() {
  //     const currentAlloc = this.alloc();
  //     if (!currentAlloc || !this.ev()) return;

  //     this.busy.set(true);
  //     for (const r of currentAlloc.confirmed) {
  //       const { error } = await this.supabase
  //         .from('registrations')
  //         .update({ attended: !!this.attendance[r.id] })
  //         .eq('id', r.id);
  //       if (error) {
  //         this.busy.set(false);
  //         this.toast.error(errMsg(error));
  //         return;
  //       }
  //     }
  //     const { error } = await this.supabase
  //       .from('events')
  //       .update({ status: 'finalizado' })
  //       .eq('id', this.ev().id);
  //     this.busy.set(false);
  //     if (error) {
  //       this.toast.error(errMsg(error));
  //       return;
  //     }
  //     this.toast.success('Asistencia registrada');
  //     await this.loadData();
  //   }

  editarEvento() {
    this.thisRoute.navigate([`/editar-evento/${this.evento()?.id}`]);
  }

  eliminarEvento(id: Evento['id']) {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      this._eventoService.eliminarEvento(id!).subscribe({
        next: (respuesta) => {
          console.log('Evento eliminado con éxito', respuesta);
          this.thisRoute.navigate(['/eventos']);
        },
        error: (error) => {
          console.log('Error al eliminar el evento', error);
          alert('No se puede eliminar el evento. Intenta de nuevo.');
        },
      });
    }
  }
}
