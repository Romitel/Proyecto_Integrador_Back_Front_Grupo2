import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-nuevo',
  imports: [ReactiveFormsModule],
  templateUrl: './evento-nuevo.html',
  styleUrl: './evento-nuevo.css',
})
export class EventoNuevo {
   private fb = inject(FormBuilder);

  busy = false;
  sports: string[] = ['Fútbol', 'Básquet', 'Tenis', 'Pádel', 'Vóley']; // Ajusta con tu lista real

  form: FormGroup = this.fb.group({
    sport: ['Fútbol', Validators.required],
    title: [''], // Opcional
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    max_capacity: [10, [Validators.required, Validators.min(1)]],
    min_participants: [6, [Validators.required, Validators.min(1)]],
    mode: ['abierta' as 'abierta' | 'cerrada', Validators.required],
    age_min: [null, [Validators.required, Validators.min(1)]],
    age_max: [null, [Validators.required, Validators.min(1)]],
    guests_enabled_early: [false],
    notes: ['']
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy = true;
    const payload = this.form.value;
    console.log('Datos listos para enviar:', payload);

    // Aquí llamas a tu servicio (ej. this.encuentrosService.crear(payload).subscribe(...))
    // Al finalizar: this.busy = false;
  }
}
