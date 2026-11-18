import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fmtDate, fmtDateTime, fmtTime } from '../../../lib/format';
import { Evento, Modalidad } from '../../models/eventos';
import { EventosServicios } from '../../services/eventos-servicios';

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
  private _eventoService = inject(EventosServicios);
  private modalidad = Modalidad;

  public fmtDate = fmtDate;
  public fmtTime = fmtTime;

  eventId = signal<string>('');
  isLoading = signal<boolean>(true);
  busy = signal<boolean>(false);
  evento = signal<Evento | null>(null);
  modalidadDinamica = signal(this.evento()?.modalidad);

  showCancelModal = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId.set(id);
      this.loadData();
    }
  }

  obtenerEvento(id: Evento['id']) {
    this._eventoService.getEventoById(id).subscribe({
      next: (data) => {
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
      this.obtenerEvento(+this.eventId());
    } finally {
      this.isLoading.set(false);
    }
  }

  editarEvento() {
    this.thisRoute.navigate([`/editar-evento/${this.evento()?.id}`]);
  }

  eliminarEvento(id: Evento['id']) {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      this._eventoService.eliminarEvento(id!).subscribe({
        next: (respuesta) => {
          this.thisRoute.navigate(['/eventos']);
          return respuesta;
        },
        error: (error) => {
          return error;
        },
      });
    }
  }

  modalidadTrigger(id: Evento['id']) {
    let modalidad: Evento['modalidad'] =
      this.evento()?.modalidad === this.modalidad.ABIERTA
        ? this.modalidad.CERRADA
        : this.modalidad.ABIERTA;

    this._eventoService.actualizarModalidadEvento(id, modalidad).subscribe({
      next: (res) => {
        this.modalidadDinamica.set(this.evento()?.modalidad);
        console.log(res);
      },
      error: (err) => {
        console.log('segundo Modalidad___', modalidad);
        console.log(err);
      },
    });
  }
}
