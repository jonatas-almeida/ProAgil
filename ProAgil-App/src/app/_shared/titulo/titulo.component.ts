import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  @Input() title: string;//Propriedade que irá receber um valor string (seria o props do React)

  constructor() { }

  ngOnInit() {
  }

}
