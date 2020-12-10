import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/_models/Evento';
import { EventoService } from 'src/app/_services/evento.service';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.scss']
})
export class EventoEditComponent implements OnInit {

  title = "Editar evento";
  registerForm: FormGroup;
  evento: Evento = new Evento();
  imagemURL = 'assets/img/upload.jpg';
  dataEvento: Date;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private datePipe: DatePipe) {

    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.validation();
  }


  //Validação de cada input do formulário
  validation(){
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(50)]],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemURL: [''],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lotes: this.fb.array([this.criaLote()]),
      redesSociais: this.fb.array([this.criaRedeSocial()])
    });
  }


  criaLote(): FormGroup{
    return this.fb.group({
      nome:  ['', Validators.required],
      quantidade: ['', Validators.required],
      preco: ['', Validators.required],
      dataInicio: [''],
      dataFim: ['']
    });
  }

  criaRedeSocial(): FormGroup{
    return this.fb.group({
      nome:  ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  onFileChange(file: FileList){
    const reader = new FileReader();
    reader.onload = (event: any) => this.imagemURL = event.target.result;
    reader.readAsDataURL(file[0]);
  }

}
