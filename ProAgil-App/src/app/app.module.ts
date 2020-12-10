//Imports - Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxMaskModule } from 'ngx-mask';
//Components
import { AppComponent } from './app.component';
import { EventosComponent } from '../app/eventos/eventos.component';
import { NavComponent } from '../app/nav/nav.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { EventoEditComponent } from './eventos/eventoEdit/eventoEdit.component';
//Services
import { EventoService } from './_services/evento.service';
//Helpers
import { DateTimeFormatPipePipe } from './_helpers/DateTimeFormatPipe.pipe';

//Bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AuthInterceptor } from './auth/auth.interceptor';



@NgModule({
  declarations: [
    //Components
    AppComponent,
    TituloComponent,
    EventosComponent,
    NavComponent,
    PalestrantesComponent,
    DashboardComponent,
    ContatosComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    EventoEditComponent,
    //Date Pipe
    DateTimeFormatPipePipe
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    TabsModule.forRoot(),
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventoService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
