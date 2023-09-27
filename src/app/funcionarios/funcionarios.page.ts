import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.page.html',
  styleUrls: ['./funcionarios.page.scss'],
})
export class FuncionariosPage {

  constructor(){
    this.getFuncionarios()
  }

  isLoading: boolean = false
  funcionarios: any = []

  form: any = {
    codigo: '',
    nome: '',
    sobrenome: '',
    cidade: '',
    fone: '',
    cargo: '',
    dataNasc: '',
    endereco: '',
    cep: '',
    pais: '',
    salario: '',
  }
  
  action: string = 'Inserir'

  choice: string = ''
  searchWord: string = ''

  getFuncionarios(){
    this.isLoading = true
    fetch('http://localhost/api/funcionarios/listar.php')
    .then(res => res.json())
    .then(dados => { this.funcionarios = dados['funcionarios'] })
    .catch(error => { console.log(error) })
    .finally(()=>{
      this.isLoading = false
      console.log('Funcionol!')
    })
  }
  
  removerFuncionario(CodFun: any){
    this.isLoading = true
    fetch('http://localhost/api/funcionarios/remover.php', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({ CodFun: CodFun }),

    })
    .then(res => res.json())
    .then(dados => { console.log(dados) })
    .catch(error => { console.log(error) }) 
    .finally(() => {
      this.getFuncionarios()
      this.isLoading = false
      console.log('Funcionol!')
    })
  }

    sendData(data: any){
      data.preventDefault()

      console.log(this.form.nome)

      this.isLoading = true
      if(this.action == 'Inserir'){
        fetch('http://localhost/api/funcionarios/inserir.php', {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json',
          },
          body: JSON.stringify(this.form),
  
        })
        .then(res => res.json())
        .then(dados => { console.log(dados) })
        .catch(error => { console.log(error) }) 
        .finally(() => {
          this.getFuncionarios()
          this.isLoading = false
          console.log('Funcionol!')
        })
      }else{
        fetch('http://localhost/api/funcionarios/update.php', {
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json',
        },
        body: JSON.stringify(this.form),

        })
        .then(res => res.json())
        .then(dados => { console.log(dados) })
        .catch(error => { console.log(error) }) 
        .finally(() => {
          this.getFuncionarios()
          this.isLoading = false
          console.log('Funcionol!')
        })
      }
    }


    clearForm(){
      this.form.nome = ''
      this.form.sobrenome = ''
      this.form.cargo = ''
      this.form.dataNasc = ''
      this.form.endereco = ''
      this.form.cep = ''
      this.form.cidade = ''
      this.form.pais = ''
      this.form.fone = ''
      this.form.salario = ''
    }

  // Modal Inserir funcionarios
  isModalOpenInserir = false;

  setOpenInserir(isOpen: boolean, codigo: number | null) {
    this.isModalOpenInserir = isOpen;
    console.log(codigo)
    this.action = 'Inserir'
    if(codigo){
      this.getData(codigo)
      this.action = 'Atualizar'
    }
    this.clearForm()
  }


  getData(codigo: number){
    fetch('http://localhost/api/funcionarios/getUpdate.php?codigo=' + codigo, {
      method: 'GET',
      headers: {
        'Content-type' : 'application/json',
      },

    })
    .then(res => res.json())
    .then(dados => { 
      console.log(dados)
      this.form.codigo = dados.funcionarios[0].CodFun
      this.form.nome = dados.funcionarios[0].Nome
      this.form.sobrenome = dados.funcionarios[0].Sobrenome
      this.form.cargo = dados.funcionarios[0].Cargo
      this.form.dataNasc = dados.funcionarios[0].DataNasc
      this.form.endereco = dados.funcionarios[0].Endereco
      this.form.cidade = dados.funcionarios[0].Cidade
      this.form.cep = dados.funcionarios[0].CEP
      this.form.pais = dados.funcionarios[0].Pais
      this.form.fone = dados.funcionarios[0].Fone
      this.form.salario = dados.funcionarios[0].Salario
    })
    .catch(error => { console.log(error) }) 
    .finally(() => {
      this.isLoading = false
      console.log('Funcionol!')
    })
  }

  // Botao de Consultar por Nome, Cargo, Cidade e Telefone
  searchData(){
    fetch('http://localhost/api/funcionarios/pesquisar.php', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({
        word: this.searchWord,
        choice: this.choice
      }),

    })
    .then(res => res.json())
    .then(dados => { this.funcionarios = dados['funcionarios'] })
    .catch(error => { console.log(error) }) 
    .finally(() => {
      this.isLoading = false
      console.log('Funcionol!')
    })
  }

}