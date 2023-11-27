import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class advice_list{
  id_advice: string = ""
  account_number: string = ""
  advice: string = ""
}

export class advice_register{
  account_number: string = ""
  advice: string = ""
  state: string = "1"
}

@Component({
  selector: 'app-advices',
  templateUrl: './advices.component.html',
  styleUrls: ['./advices.component.css']
})
export class AdvicesComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  advices: advice_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  filter: string = ""
  actual_advice: string = ""
  filter_array: string[] = []
  //REGISTER
  account_number: string = ""
  advice: string = ""
  //-ALUMN
  name: string = "-"
  account: string = "-"
  group: string = "-"
  carreer: string = "-"
  phone: string = "-"
  email: string = "-"

  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.get_data("")
  }
  async get_data(where: string){
    if(where == ""){
      where = " state = 1"
    }else{
      where ="alumn.account_number LIKE '"+ where+"%' AND advice.state = 1"
    }
    this.crud.get_advice(where).subscribe(
      (res: any) => {
        console.log(res)
        this.advices = []
        for(let i = 0; i <= Object.keys(res).length-1; i++){
          let temp_advice: advice_list = new advice_list
          temp_advice.id_advice = res[i]['id_advice']
          temp_advice.account_number = res[i]['account_number']
          temp_advice.advice = res[i]['advice']
          this.advices.push(temp_advice)
        }
      },
      (error) => {
      }
    );
  }
  edit(transaction: string, indice: number){
    if(transaction != 'new'){
      this.modify = true 
      let category = this.advices[indice]
      this.actual_advice = this.advices[indice].id_advice
      this.advice = category.advice
    }
    this.register = true
    this.view = false
    console.log(transaction)
  }

  register_advice(){
    let data = new advice_register
    data.account_number = this.account_number
    data.advice = this.advice
    this.crud.register_advice(data).subscribe(
      (res: any) => {
        if(res['status']=="200"){
          window.alert("Observacion Registrada")
          this.clear_form()
        }
      },
      (error) => {
      }
    );
  }
  update_advice(){
    let data = new advice_register
    data.account_number = this.account_number
    data.advice = this.advice
    this.crud.update_advice(data,this.actual_advice).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="200"){
          window.alert("Observacion Actualizada")
          this.clear_form()
        }
      },
      (error) => {
      }
    );
  }

  delete_advice(){
    this.crud.delete_advice(this.actual_advice).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="200"){
          window.alert("Categoria Eliminado")
          this.clear_form()
        }

      },
      (error) => {
      }
    );
  }

  clear_form(){
    this.advice = ""
    this.register=false
    this.view=true
    this.modify=false
    this.get_data(this.filter)
  }

  get_alumn_data(){
    this.crud.get_alumn("account_number = '"+this.account_number+"'").subscribe(
      (res: any) => {
        if(res[0]!= null){
          this.name=res[0]["first_name"]+" "+res[0]["last_name"]
          this.account = this.account_number
          this.group = res[0]['school_group']
          this.carreer = res[0]['carreer']
          this.phone = res[0]['phone']
          this.email = res[0]['email']
        }else{
          this.name = "-"
          this.account = "-"
          this.group = "-"
          this.carreer = "-"
          this.phone = "-"
          this.email = "-"
        }
      },
      (error) => {
      }
    );
  }
}
