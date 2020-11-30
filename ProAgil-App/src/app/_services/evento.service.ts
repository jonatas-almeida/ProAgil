import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseURL = "http://localhost:5000/api/evento";

  constructor(private httpClient: HttpClient) { }


  //Usando o Observable no método fica mais fácil de especificar qual informação está sendo puxada via Get (no caso aqui se trata do Evento).

  //Lembrando que é necessário especificar o tipo que está sendo passado no Observable no caso do Observable abaixo estamos dizendo que o Evento retorna um array como valor, feito isso é necessário também passar a mesma informação para o método get do HttpClient que puxa a Base URL.

  getAllEvento(): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(this.baseURL);
  }

  getEventoByTema(tema: string): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }

  getEventoById(id: number): Observable<Evento>{
    return this.httpClient.get<Evento>(`${this.baseURL}/${id}`);
  }

  //Método POST
  postEvento(evento: Evento) {
    return this.httpClient.post(this.baseURL, evento);
  }

  //Método PUT
  putEvento(evento: Evento) {
    return this.httpClient.put(`${this.baseURL}/${evento.id}`, evento);
  }

  //Método DELETE
  deleteEvento(id: number){
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
