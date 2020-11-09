import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  _filtroLista: string;
  //Encapsulamento da propriedade _filtroLista
  get filtroLista(){
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventosFiltrados: any = [];
  eventos: any = [];
  //Opções definidas para serem settadas no property binding das imagens no componente de eventos
  imagemLargura = 50;
  imagemMargem = 2;
  imagemBorda = 5;
  mostrarImagem = false;


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  //Função para filtrar os eventos quando digitado no input de busca
  filtrarEventos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  //Mostra e esconde as imagens
  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos(){
    this.httpClient.get('http://localhost:5000/api/values').subscribe(response => {
      this.eventos = response;
    }, error => {
      console.log(error);
    }
    );
  }

}
