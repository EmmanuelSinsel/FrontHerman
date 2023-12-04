import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class admin_list{
  id_admin: string = ""
  user: string = ""
  password: string = ""
  first_name: string = ""
  last_name: string = ""
  full_name: string = ""
  phone: string = ""
  email: string = ""
}

export class admin_register{
  user: string = ""
  password: string = ""
  first_name: string = ""
  last_name: string = ""
  full_name: string = ""
  phone: string = ""
  email: string = ""
  state: string = "1"
  token: string = ""
}

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})

export class AdminAccountsComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  admins: admin_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  filter: string = ""
  actual_admin: string = ""
  fiter: string = ""
  //REGISTER
  user: string = ""
  password: string = ""
  first_name: string = ""
  last_name: string = ""
  full_name: string = ""
  phone: string = ""
  email: string = ""
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
    this.crud.get_admins(where).subscribe(
      (res: any) => {
        console.log(res)
        this.admins = []
        for(let i = 0; i <= Object.keys(res).length-1; i++){
          let temp_admin: admin_list = new admin_list
          temp_admin.id_admin = res[i]['id_admin']
          temp_admin.user = res[i]['user']
          temp_admin.password = ""
          temp_admin.first_name = res[i]['first_name']
          temp_admin.last_name = res[i]['last_name']
          temp_admin.phone = res[i]['phone']
          temp_admin.email = res[i]['email']
          temp_admin.full_name = temp_admin.first_name + " " + temp_admin.last_name
          this.admins.push(temp_admin)
        }
      },
      (error) => {
      }
    );
  }
  edit(transaction: string, indice: number){
    if(transaction != 'new'){
      this.modify = true 
      let admin = this.admins[indice]
      this.actual_admin = this.admins[indice].id_admin
      this.user = admin.user
      this.password = admin.password
      this.first_name = admin.first_name
      this.last_name = admin.last_name
      this.phone = admin.phone
      this.email = admin.email
    }
    this.register = true
    this.view = false
    console.log(transaction)
  }

  register_admin(){
    let data = new admin_register
    data.user = this.user
    data.password = this.password
    data.first_name = this.first_name
    data.last_name = this.last_name
    data.phone = this.phone
    data.email = this.email
    data.state = "1"
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    this.crud.register_admin(data).subscribe(
      (res: any) => {
        if(res['status']=="200"){
          window.alert("Administrador Registrado")
          this.clear_form()
        }
        if(res['status']=="400"){
          window.alert("Administrador ya registrado")
        }
      },
      (error) => {
      }
    );
  }
  update_admin(){
    let data = new admin_register
    data.user = this.user
    data.password = this.password
    data.first_name = this.first_name
    data.last_name = this.last_name
    data.phone = this.phone
    data.email = this.email
    data.state = "1"
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    this.crud.update_admin(data,this.actual_admin).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="200"){
          window.alert("Administrador Actualizado")
          this.clear_form()
        }
        if(res['status']=="402"){
          window.alert("Administrador ya registrado")
        }
      },
      (error) => {
      }
    );
  }

  delete_admin(){
    this.crud.delete_admin(this.actual_admin).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="200"){
          window.alert("Administrador Eliminado")
          this.clear_form()
        }

      },
      (error) => {
      }
    );
  }

  clear_form(){
    this.user =""
    this.password = ""
    this.first_name = ""
    this.last_name = ""
    this.phone = ""
    this.email = ""
    this.register=false
    this.view=true
    this.modify=false
    this.get_data(this.filter)
  }
}
