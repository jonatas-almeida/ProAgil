import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  imagemBorda = 5;
  mostrarImagem = false;


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

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
