import { Component } from '@angular/core';
import { first } from 'rxjs';
import { CrudService } from 'src/services/crud.service';

export class alumn_list{
  id_alumn: string = ""
  account_number: string = ""
  email: string = ""
  carreer: string = ""
  first_name: string = ""
  last_name: string = ""
  phone: string = ""
  school_group: string = ""
  user: string = ""
  library_id: string = ""
  full_name: string = ""
}

export class alumn_register{
  account_number: string = ""
  email: string = ""
  carreer: string = ""
  first_name: string = ""
  last_name: string = ""
  phone: string = ""
  school_group: string = ""
  password: string = ""
  library_id: string = ""
  user: string = ""
  state: string = "1"
  token: string = ""
}


@Component({
  selector: 'app-alumn-accounts',
  templateUrl: './alumn-accounts.component.html',
  styleUrls: ['./alumn-accounts.component.css']
})
export class AlumnAccountsComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  alumns: alumn_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  filter: string = ""
  actual_alumn: string = ""
  filter_array: string[] = []
  //REGISTER
  account_number: string = ""
  email: string = ""
  carreer: string = ""
  first_name: string = ""
  last_name: string = ""
  phone: string = ""
  school_group: string = ""
  password: string = ""
  library_id: string = ""
  user: string = ""
  //RESUME


  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.get_data("")
  }
  async get_data(where: string){
    if(where == ""){
      where = "state = 1"
    }else{
      where ="account_number LIKE '"+ where+"%' AND state = 1"
    }
    this.crud.get_alumns(where).subscribe(
      (res: any) => {
        console.log(res)
        this.alumns = []
        for(let i = 0; i <= Object.keys(res).length-1; i++){
          let temp_alumn: alumn_list = new alumn_list
          temp_alumn.id_alumn = res[i]['id_alumn']
          temp_alumn.account_number = res[i]['account_number']
          temp_alumn.email = res[i]['email']
          temp_alumn.carreer = res[i]['carreer']
          temp_alumn.first_name = res[i]['first_name']
          temp_alumn.last_name = res[i]['last_name']
          temp_alumn.phone = res[i]['phone']
          temp_alumn.school_group = res[i]['school_group']
          temp_alumn.user = res[i]['user']
          temp_alumn.library_id = res[i]['library_id']
          temp_alumn.full_name = temp_alumn.first_name + " " + temp_alumn.last_name
          this.alumns.push(temp_alumn)
        }
      },
      (error) => {
      }
    );
  }
  edit(transaction: string, indice: number){
    if(transaction != 'new'){
      this.modify = true 
      let alumn = this.alumns[indice]
      this.actual_alumn = this.alumns[indice].id_alumn
      this.account_number = alumn.account_number
      this.email = alumn.email
      this.carreer = alumn.carreer
      this.first_name = alumn.first_name
      this.last_name = alumn.last_name
      this.user = alumn.user
      this.phone = alumn.phone
      this.school_group = alumn.school_group
      this.library_id = alumn.library_id
    }
    this.register = true
    this.view = false
    console.log(transaction)
  }

  register_alumn(){
    let data = new alumn_register
    data.account_number = this.account_number
    data.email = this.email
    data.carreer = this.carreer
    data.first_name = this.first_name
    data.last_name = this.last_name
    data.phone = this.phone
    data.school_group = this.school_group
    data.password = this.password
    data.library_id = this.library_id
    data.user = this.user
    data.state = "1"
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    if(this.crud.verify(data)==1){
      this.crud.register_alumn(data).subscribe(
        (res: any) => {
          if(res['status']=="200"){
            window.alert("Autor Registrado")
            this.clear_form()
          }
          if(res['status']=="400"){
            window.alert("Autor ya registrado")
          }
        },
        (error) => {
        }
      );
    }
  }
  update_alumn(){
    let data = new alumn_register
    data.account_number = this.account_number
    data.email = this.email
    data.carreer = this.carreer
    data.first_name = this.first_name
    data.last_name = this.last_name
    data.phone = this.phone
    data.school_group = this.school_group
    data.password = this.password
    data.library_id = this.library_id.toString()
    data.user = this.user
    data.state = "1"
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    if(this.crud.verify(data)==1){
      this.crud.update_alumn(data,this.actual_alumn).subscribe(
        (res: any) => {
          console.log(res)
          if(res['status']=="200"){
            window.alert("Autor Actualizado")
            this.clear_form()
          }
          if(res['status']=="402"){
            window.alert("Autor ya registrado")
          }
        },
        (error) => {
        }
      );
    }
  }

  delete_alumn(){
    this.crud.delete_alumn(this.actual_alumn).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="200"){
          window.alert("Autor Eliminado")
          this.clear_form()
        }

      },
      (error) => {
      }
    );
  }

  clear_form(){
    let alumn = ""
    this.actual_alumn =""
    this.account_number = ""
    this.email = ""
    this.carreer = ""
    this.first_name = ""
    this.last_name = ""
    this.phone = ""
    this.school_group = ""
    this.library_id = ""
    this.register=false
    this.view=true
    this.modify=false
    this.get_data(this.filter)
  }
}
