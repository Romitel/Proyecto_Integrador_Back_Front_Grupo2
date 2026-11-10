import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventosServicios } from './services/eventos-servicios';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly httpServicios = inject(EventosServicios);

  obtenerEventos() {
    this.httpServicios
      .getEventos()
      .subscribe({ next: (data) => console.log(data), error: (error) => console.log(error) });
  }
}
