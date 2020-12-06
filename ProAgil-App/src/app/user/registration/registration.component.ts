import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(public fb: FormBuilder, public toastr: ToastrService) { }

  ngOnInit() {
    this.validation();
  }

  //Validação dos campos
  //Quando tiver mais de uma validação para o mesmo campo, é necessário colocar entra colchetes
  validation(){
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, { validator : this.compararSenhas })
    });
  }


  compararSenhas(fg: FormGroup){
    const confirmSenhaCtrl = fg.get('confirmPassword');
    //Se ele estiver validado
    if(confirmSenhaCtrl.errors == null || 'missmatch' in confirmSenhaCtrl.errors){
      //Compara a senha e caso o valor não seja igual ele adiciona o mismatch
      if(fg.get('password').value !== confirmSenhaCtrl.value){
        confirmSenhaCtrl.setErrors({missmatch: true});
      }
      else{
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }


  cadastrarUsuario(){
    if(this.registerForm.valid){
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
    }
  }

}
