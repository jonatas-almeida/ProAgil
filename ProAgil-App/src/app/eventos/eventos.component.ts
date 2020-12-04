import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import { FileStats } from '@angular/compiler-cli/src/ngtsc/file_system';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  //Variáveis
  title = "Eventos";
  eventosFiltrados: Evento[];
  dataEvento: Date;
  eventos: Evento[];
  evento: Evento;
  bodyDeletarEvento = '';
  modoSalvar = 'post';
  file: File;
  registerForm: FormGroup;
  dataAtual: string;

  //Opções definidas para serem settadas no property binding das imagens no componente de eventos
  imagemLargura = 50;
  imagemMargem = 2;
  imagemBorda = 5;
  mostrarImagem = false;

  _filtroLista: string = '';
  fileNameToUpdate: string;


  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private datePipe: DatePipe) {

    this.localeService.use('pt-br');
  }

  //Encapsulamento da propriedade _filtroLista
  get filtroLista(): string{
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  //Método de adicionar eventos
  novoEvento(template: any){
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  //Método de editar eventos
  editarEventos(evento: Evento, template: any){
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento =  Object.assign({}, evento); //Copia as informações do evento, não precisando criar uma associação (binding).
    //Quando você referencia o objeto que foi copiado as informações, a imagem continua sendo carregada ao clicar no botão para alterar, simplesmente porque ele não está criando um binding, mas está referênciando uma cópia do objeto originale mantendo suas informações até que elas sejam editadas
    this.fileNameToUpdate = evento.imagemURL.toString();
    this.evento.imagemURL = '';
    this.registerForm.patchValue(this.evento);
  }

  //Método de exlcuir eventos
  excluirEvento(evento: Evento, template: any){
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}` //Adiciona o valor de string para criar uma mensagem personalizada que aparecerá no modal de deletar evento

  }

  //Método para upload de Imagens
  uploadImagem(){
    if(this.modoSalvar === "post"){
      const nomeArquivo = this.evento.imagemURL.split('\\', 3);
      this.evento.imagemURL = nomeArquivo[2];

      this.eventoService.postUpload(this.file, nomeArquivo[2]).subscribe(
        () => {
          this.dataAtual = new Date().getMilliseconds().toString();
          this.getEventos();
        }
      );
    }
    else{
      this.evento.imagemURL = this.fileNameToUpdate;
      this.eventoService.postUpload(this.file, this.fileNameToUpdate).subscribe(
        () => {
          this.dataAtual = new Date().getMilliseconds().toString();
          this.getEventos();
        }
      );
    }

  }

  //Método para confirmar a exclusão do evento
  confirmeDelete(template: any){
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
        template.hide();
        this.getEventos();
        this.toastr.success('Evento deletado com sucesso!');
      }, error => {
        console.log(error);
        this.toastr.error(`Não foi possível excluir o evento: ${error}`);
      }
    )
  }

  //Abrir modal
  openModal(template: any){
    this.registerForm.reset();
    template.show();
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
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(50)]],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  //Captura os eventos do banco de dados
  getEventos(){
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
      this.eventos = _eventos;
      this.eventosFiltrados = this.eventos;
    }, error => {
      this.toastr.error(`Erro ao tentar carregar eventos: ${error}`);
    }
    );
  }

  onFileChange(event){
    const reader = new FileReader();

    if(event.target.files && event.target.files.length){
      this.file = event.target.files;
    }
  }


  //Cadastra os eventos no banco de dados
  //Nesse método é possível
  salvarAlteracao(template: any){
    if(this.registerForm.valid){
      if(this.modoSalvar === 'post'){
        this.evento = Object.assign({}, this.registerForm.value);

        this.uploadImagem();

        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Evento criado com sucesso!');
          }, error =>{
            console.log(error);
            this.toastr.error(`Não foi possível criar o evento: ${error}`);
          }
        );
      }
      else{
        //Altera os eventos no banco de dados
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);

        this.uploadImagem();

        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            template.hide();
            this.getEventos();
            this.toastr.success('Evento editado com sucesso!');
          }, error =>{
            this.toastr.error(`Não foi possível criar o evento: ${error}`);
            console.log(error);
          }
        );
      }

    }
  }


}
