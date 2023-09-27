import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.page.html',
  styleUrls: ['./funcionarios.page.scss'],
})
export class FuncionariosPage {

  constructor(){
    this.listarFuncionarios()
  }

  funcionarios: any = []

  form: any = {
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
    codigo: '',
  }
  
  action: string = 'Inserir'

  opcao: string = ''
  searchWord: string = ''
  isToastOpen = false;

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  listarFuncionarios(){
    fetch('http://localhost/api/funcionarios/listar.php')
    .then(res => res.json())
    .then(dados => { this.funcionarios = dados['funcionarios'] })
    .catch(error => { console.log(error) })
    .finally(()=>{
    })
  }
  
  removerFuncionario(CodFun: any){
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
      this.listarFuncionarios()
    })
  }

    inserirFuncionario(data: any){
      data.preventDefault()

      console.log(this.form.nome)

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
          this.listarFuncionarios()
  
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
          this.listarFuncionarios()
        })
      }
    }


    limparModal(){
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

  isModalOpen= false;

  openModal(isOpen: boolean, codigo: number | null) {
    this.isModalOpen= isOpen;
    console.log(codigo)
    this.action = 'Inserir'
    if(codigo){
      this.pegarDadosFuncionario(codigo)
      this.action = 'Atualizar'
    }
    this.limparModal()
  }


  pegarDadosFuncionario(codigo: number){
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
  }

  pesquisar(){
    fetch('http://localhost/api/funcionarios/pesquisar.php', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({
        word: this.searchWord,
        opcao: this.opcao
      }),

    })
    .then(res => res.json())
    .then(dados => {
      if(dados['error'] ) {
        this.setToastOpen(true)
      }
      else this.funcionarios = dados['funcionarios'] 

      })
    .catch(error => { console.log(error) }) 
  }

}