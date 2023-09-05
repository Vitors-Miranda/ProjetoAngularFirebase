import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  habilidades = []
  constructor
  (
    private _authenticate: AuthenticateService
  ) 
  {}
  criarConta(dados: any){
    this._authenticate.register(dados.email, dados.password)
  }
  realizarLogin(dados: any){
    
  }
}
