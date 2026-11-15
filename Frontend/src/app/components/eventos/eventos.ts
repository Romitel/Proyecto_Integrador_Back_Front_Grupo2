import { Component, inject, signal } from '@angular/core';
import { EventosServicios } from '../../services/eventos-servicios';
import {Evento} from '../../models/eventos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eventos',
  imports: [RouterLink],
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
  
  eliminarEvento(id:Evento['id']){
    if(confirm('¿Estás seguro de que quieres eliminar este evento?')){
      this._eventoService.eliminarEvento(id!).subscribe({
        next:(respuesta)=>{
          console.log('Evento eliminado con éxito', respuesta);
          this.obtenerEventos();
        },
        error:(error)=>{
          console.log('Error al eliminar el evento', error);
          alert('No se puede eliminar el evento. Intenta de nuevo.');
        }
      })
    }
  }
  editarEvento(evento:Evento){
    const nuevoNombre=prompt('Ingrese el nuevo nombre del evento:', evento.nombre);
    if(nuevoNombre===null|| nuevoNombre.trim()===''){
      return;
    }
    const eventoActualizado:Evento={...evento, nombre:nuevoNombre};
    this._eventoService.actualizarEvento(evento.id,eventoActualizado).subscribe({
      next:(respuesta)=>{
        console.log('Evento actualizado con exito', respuesta);
        this.obtenerEventos();
      },
      error:(error)=>{
        console.error('Error al actualizar el evento', error);
      }
    });
  }
}
