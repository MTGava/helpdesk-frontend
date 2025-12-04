import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private _http: HttpClient) { }

  findById(id: any): Observable<Tecnico> {
    return this._http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }

  findAll(): Observable<Tecnico[]> {
    return this._http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this._http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this._http.put<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<Tecnico> {
    return this._http.delete<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }
}
