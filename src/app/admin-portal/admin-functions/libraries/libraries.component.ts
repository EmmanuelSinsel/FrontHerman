import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class lib_list{
  id_lib: string = ""
  name: string = ""
  address: string = ""
  phone: string = ""
  email: string = ""
}

export class lib_register{
  name: string = ""
  address: string = ""
  phone: string = ""
  email: string = ""
  state: string = "1"
  token: string = ""
}

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent {

  btn_message: string = "REGISTRAR PRESTAMO"
  libs: lib_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  actual_lib: string = ""
  //REGISTER
  name: string = ""
  address: string = ""
  phone: string = ""
  email: string = ""
  //RESUME


  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.get_data()
  }
  async get_data(){
    this.crud.get_admin_profile().subscribe(
      (res: any) => {
        console.log(res)
        this.crud.get_libs("").subscribe(
          (res: any) => {
            console.log(res)
            this.libs = []
            for(let i = 0; i <= Object.keys(res).length-1; i++){
              let temp_lib: lib_list = new lib_list
              temp_lib.id_lib = res[i]['id_library']
              temp_lib.name = res[i]['name']
              temp_lib.address = res[i]['address']
              temp_lib.phone = res[i]['phone']
              temp_lib.email = res[i]['email']
              this.libs.push(temp_lib)
            }
          },
          (error) => {
          }
        );
      }
    );
    
  }
  edit(transaction: string, indice: number){
    if(transaction != 'new'){
      this.modify = true 
      let lib = this.libs[indice]
      this.actual_lib = this.libs[indice].id_lib
      this.name = lib.name
      this.address = lib.address
      this.phone = lib.phone
      this.email = lib.email
    }
    this.register = true
    this.view = false
    console.log(transaction)

  }

  register_lib(){
    let data = new lib_register
    data.name = this.name
    data.address = this.address
    data.phone = this.phone
    data.email = this.email
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    if(this.crud.verify(data)==1){
      this.crud.register_lib(data).subscribe(
        (res: any) => {
          if(res['status']=="200"){
            window.alert("Libro Registrado")
            this.clear_form()
          }
          if(res['status']=="400"){
            window.alert("Libro ya registrado")
          }
        },
        (error) => {
        }
      );
    }
  }
  update_lib(){
    let data = new lib_register
    data.name = this.name
    data.address = this.address
    data.phone = this.phone
    data.email = this.email
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    if(this.crud.verify(data)==1){
      this.crud.update_lib(data,this.actual_lib).subscribe(
        (res: any) => {
          console.log(res)
          if(res['status']=="200"){
            window.alert("Libro Actualizado")
            this.clear_form()
          }
          if(res['status']=="402"){
            window.alert("Libro ya registrado")
          }
        },
        (error) => {
        }
      );
    }
  }

  delete_lib(){
    this.crud.delete_lib(this.actual_lib).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="200"){
          window.alert("Libro Eliminado")
          this.clear_form()
        }

      },
      (error) => {
      }
    );
  }

  clear_form(){
    this.name = ""
    this.address = ""
    this.phone = ""
    this.email = ""
    this.register=false
    this.view=true
    this.modify=false
    this.get_data()
  }
}
