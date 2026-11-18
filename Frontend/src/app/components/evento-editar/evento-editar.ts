import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventosServicios } from '../../services/eventos-servicios';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento, Disciplina, Modalidad } from '../../models/eventos';
import { fmtDate, fmtTime } from '../../../lib/format';

@Component({
  selector: 'app-evento-editar',
  imports: [ReactiveFormsModule],
  templateUrl: './evento-editar.html',
  styleUrls: ['../../../styles.css', './evento-editar.css'],
})
export class EventoEditar {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private thisRoute = inject(Router);
  evento = signal<Evento | null>(null);
  private readonly _eventoService = inject(EventosServicios);
  eventoId = this.route.snapshot.paramMap.get('id');
  fmtDate = fmtDate;
  fmtTime = fmtTime;
  disciplina = Object.values(Disciplina);
  modalidad = Object.values(Modalidad);

  ngOnInit() {
    this.obtenerEvento(+this.eventoId!);
  }
  form: FormGroup = this.fb.group({
    disciplina: [Disciplina.FUTBOL, Validators.required],
    nombre: ['', Validators.required],
    fecha: ['', Validators.required],
    horario: ['', Validators.required],
    lugar_direccion: ['', Validators.required],
    capacidad_maxima: [10, [Validators.required, Validators.min(1)]],
    minimo_para_jugar: [6, [Validators.required, Validators.min(1)]],
    modalidad: [Modalidad.ABIERTA, Validators.required],
    edad_desde: [null, [Validators.required, Validators.min(1)]],
    edad_hasta: [null, [Validators.required, Validators.min(1)]],
    habilitar_invitados: [false],
    notas: [''],
  });

  obtenerEvento(id: Evento['id']) {
    this._eventoService.getEventoById(id).subscribe({
      next: (data) => {
        data.fechaFormateada = this.fmtDate(data.fecha);
        data.horario = this.fmtTime(data.horario);
        this.evento.set(data);

        this.form.patchValue({
          disciplina: data.disciplina,
          nombre: data.nombre,
          fecha: data.fecha.split('T')[0],
          horario: data.horario,
          lugar_direccion: data.lugar_direccion,
          capacidad_maxima: data.capacidad_maxima,
          minimo_para_jugar: data.minimo_para_jugar,
          modalidad: data.modalidad,
          edad_desde: data.edad_desde,
          edad_hasta: data.edad_hasta,
          habilitar_invitados: data.habilitar_invitados,
          notas: data.notas,
        });
      },
      error: (error) => console.log(error),
    });
  }

  submit() {
    const id = this.eventoId;

    this.editarEvento(this.evento()?.id, this.form.value);
  }

  editarEvento(id: Evento['id'], data: Evento) {
    this._eventoService.actualizarEvento(id, data).subscribe({
      next: (respuesta) => {
        this.thisRoute.navigate(['/eventos']);
      },
      error: (error) => {
        console.error('Error al actualizar el evento', error);
      },
    });
  }
}
