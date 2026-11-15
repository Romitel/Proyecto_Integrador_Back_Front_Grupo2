import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventosServicios } from '../../services/eventos-servicios';
import { Evento } from '../../models/eventos';
import { Disciplina, Modalidad } from '../../models/eventos';
import { Router } from '@angular/router';
@Component({
  selector: 'app-evento-nuevo',
  imports: [ReactiveFormsModule],
  templateUrl: './evento-nuevo.html',
  styleUrls: ['../../../styles.css', './evento-nuevo.css'],
})
export class EventoNuevo {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly _eventoService = inject(EventosServicios);

  busy = false;
  disciplina = Object.values(Disciplina);
  modalidad = Object.values(Modalidad);

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

  crear(payload: Evento) {
    this._eventoService.createEvento(payload).subscribe({
      next: (data) => {
        this.router.navigate(['/eventos']);
      },
      error: (error) => console.log(error),
    });
  }

  submit() {
    const payload = this.form.value;
    console.log('Datos listos para enviar:', payload);
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }
    this.crear(payload);

    this.busy = true;
  }
}
