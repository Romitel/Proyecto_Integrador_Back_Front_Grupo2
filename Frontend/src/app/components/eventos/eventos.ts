import { Component, inject, signal } from '@angular/core';
import { EventosServicios } from '../../services/eventos-servicios';
import {Evento} from '../../models/eventos';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-eventos',
  imports: [],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class Eventos {
  readonly eventos = signal<Evento[]>([])
  private readonly _eventoService = inject(EventosServicios)

  readonly sports = ["Fútbol 5", "Fútbol 7", "Fútbol 11", "Básquet", "Vóley", "Pádel", "Hockey", "Otro"];

  ngOnInit():void {
    this.obtenerEventos()
  }

  obtenerEventos(){
    this._eventoService.getEventos().subscribe({
      next: data => this.eventos.set(data),
      error: error => console.log(error)
    })
  }
}
