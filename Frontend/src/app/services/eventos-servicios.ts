import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class EventosServicios {
  protected readonly http = inject(HttpClient);
  private url = 'http://127.0.0.1:3000/api/eventos';
  
  getEventos(): Observable<any> {
    return this.http.get<any>(this.url)
  }
}