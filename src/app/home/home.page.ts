import { Component , ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal;

  message = '';
  form = {
    CodFun : "",
    nome : "",
    sobrenome : "",
    cargo : "",
    data : "",
    endereco : "",
    cidade : "",
    cep : "",
    pais : "",
    fone : "",
    salario : "",
  }
  
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  isLoading: boolean = false;
  funcionarios: any;

  constructor() {
    this.getFuncionarios();
  }

  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/listar_funcionario.php')
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response.funcionarios;
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  remover(id: any){
    console.log(id)
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/remover_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: id })
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      
    })
  }
  pegarDados(id: any){
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/pegar_dados.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: id })
			}
		)
    .then(response => response.json())
    .then(response => {
      this.form.CodFun = id
      this.form.nome = response.funcionario.Nome
      this.form.sobrenome = response.funcionario.Sobrenome
      this.form.cargo = response.funcionario.Cargo
      this.form.data = response.funcionario.DataNasc
      this.form.endereco = response.funcionario.Endereco
      this.form.cidade = response.funcionario.Cidade
      this.form.cep = response.funcionario.CEP
      this.form.pais = response.funcionario.Pais
      this.form.fone = response.funcionario.Fone
      this.form.salario = response.funcionario.Salario
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }
  atualizarFuncionario(){
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/atualizar_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify( this.form )
			}
		)
    .then(response => response.json())
    .then(response => {
      this.getFuncionarios()
      this.cancel()
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }
  inserirFuncionario(){
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/inserir_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify( this.form )
			}
		)
    .then(response => response.json())
    .then(response => {
      this.getFuncionarios()
      this.cancel()
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }
  limparForm(){
    this.form.CodFun = ""
      this.form.nome = ""
      this.form.sobrenome = ""
      this.form.cargo = ""
      this.form.data = ""
      this.form.endereco = ""
      this.form.cidade = ""
      this.form.cep = ""
      this.form.pais = ""
      this.form.fone = ""
      this.form.salario = ""
  }
}
