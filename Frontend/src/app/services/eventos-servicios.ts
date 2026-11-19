import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/eventos';

@Injectable({
  providedIn: 'root',
})
export class EventosServicios {
  protected readonly http = inject(HttpClient);
  private url = 'http://3.17.116.195:3000/api/eventos';

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url);
  }
  getEventoById(id: Evento['id']): Observable<Evento> {
    return this.http.get<Evento>(`${this.url}/${id}`);
  }
  createEvento(datos: Evento): Observable<string> {
    return this.http.post<string>(this.url, datos);
  }
  eliminarEvento(id: Evento['id']): Observable<string> {
    return this.http.delete<string>(`${this.url}/${id}`);
  }
  actualizarEvento(id: Evento['id'], eventoActualizado: Evento): Observable<string> {
    console.log(id);
    return this.http.put<string>(`${this.url}/${id}`, eventoActualizado);
  }
}
