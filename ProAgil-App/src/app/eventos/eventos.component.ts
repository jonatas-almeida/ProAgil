import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  //Opções definidas para serem settadas no property binding das imagens no componente de eventos
  eventosFiltrados: Evento[];
  eventos: Evento[];
  
  imagemLargura = 50;
  imagemMargem = 2;
  imagemBorda = 5;
  mostrarImagem = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;

  _filtroLista: string = '';
  

  constructor(private eventoService: EventoService, private modalService: BsModalService) { }

  //Encapsulamento da propriedade _filtroLista
  get filtroLista(): string{
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }



  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  //Função para filtrar os eventos quando digitado no input de busca
  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  //Mostra e esconde as imagens
  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  //Validação de cada input do formulário
  validation(){
    this.registerForm = new FormGroup({
      tema: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      local: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      dataEvento: new FormControl('', Validators.required),
      qtdPessoas: new FormControl('', [Validators.required, Validators.max(120000)]),
      imagemUrl: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  salvarAlteracao(){

  }

  getEventos(){
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
      this.eventos = _eventos;
      this.eventosFiltrados = this.eventos;
    }, error => {
      console.log(error);
    }
    );
  }

}
