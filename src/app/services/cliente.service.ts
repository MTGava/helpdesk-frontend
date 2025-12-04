import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private _http: HttpClient) { }

  findById(id: any): Observable<Cliente> {
    return this._http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  findAll(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  create(tecnico: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, tecnico);
  }

  update(tecnico: Cliente): Observable<Cliente> {
    return this._http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<Cliente> {
    return this._http.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
}
