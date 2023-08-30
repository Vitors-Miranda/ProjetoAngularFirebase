import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoading : boolean = false
  constructor() {
    this.getData();
  }

  getData(){
    fetch('http://localhost/API_Fatec/index.php')
    .then(response => response.json())
    .then (dados => {
      return dados
    })
    .catch (erro => {
      console.log(erro)
    })
    .finally(()=>{
      console.log("Request finished")
      this.isLoading = true
    })
  }

}
