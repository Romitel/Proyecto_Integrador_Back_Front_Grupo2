import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/eventos';

@Injectable({
  providedIn: 'root',
})
export class EventosServicios {
  protected readonly http = inject(HttpClient);
  private url = 'http://127.0.0.1:3000/api/eventos';
<<<<<<< HEAD

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url);
  }

  createEvento(datos: Evento): Observable<string> {
    console.log(datos);

    return this.http.post<string>(this.url, datos);
  }
}
=======
  
  getEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.url)
  }
  eliminarEvento(id:number):Observable<string>{
    return this.http.delete<string>(`${this.url}/${id}`);
  }
  actualizarEvento(id:number, eventoActualizado:Evento): Observable<Evento>{
    return this.http.put<Evento>(`${this.url}/${id}`, eventoActualizado);
  }
}
>>>>>>> 196f9dfa0c7eaa3e482d838bb9b5e1f00128ca61
