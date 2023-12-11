import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class category_list{
  id_category: string = ""
  category: string = ""
}

export class category_register{
  category: string = ""
  state: string = "1"
  token: string = ""
}

@Component({
  selector: 'app-generes',
  templateUrl: './generes.component.html',
  styleUrls: ['./generes.component.css']
})

export class GeneresComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  categories: category_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  filter: string = ""
  actual_category: string = ""
  filter_array: string[] = []
  //REGISTER
  category: string = ""
  //RESUME


  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.get_data("")
  }
  async get_data(where: string){
    if(where == ""){
      where = " state = 1"
    }else{
      where ="category LIKE '"+ where+"%' AND state = 1"
    }
    this.crud.get_category(where).subscribe(
      (res: any) => {
        console.log(res)
        this.categories = []
        for(let i = 0; i <= Object.keys(res).length-1; i++){
          let temp_category: category_list = new category_list
          temp_category.id_category = res[i]['id_category']
          temp_category.category = res[i]['category']
          this.categories.push(temp_category)
        }
      },
      (error) => {
      }
    );
  }
  edit(transaction: string, indice: number){
    if(transaction != 'new'){
      this.modify = true 
      let category = this.categories[indice]
      this.actual_category = this.categories[indice].id_category
      this.category = category.category
    }
    this.register = true
    this.view = false
    console.log(transaction)
  }

  register_category(){
    let data = new category_register
    data.category = this.category
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    if(this.crud.verify(data)==1){
      this.crud.register_category(data).subscribe(
        (res: any) => {
          if(res['status']=="200"){
            window.alert("Categoria Registrada")
            this.clear_form()
          }
          if(res['status']=="400"){
            window.alert("Categoria ya registrada")
          }
        },
        (error) => {
        }
      );
    }
  }
  update_category(){
    let data = new category_register
    data.category = this.category
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    if(this.crud.verify(data)==1){
      this.crud.update_category(data,this.actual_category).subscribe(
        (res: any) => {
          console.log(res)
          if(res['status']=="200"){
            window.alert("Categoria Actualizada")
            this.clear_form()
          }
          if(res['status']=="402"){
            window.alert("Categoria ya registrada")
          }
        },
        (error) => {
        }
      );
    }
  }

  delete_category(){
    this.crud.delete_category(this.actual_category).subscribe(
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
    this.category = ""
    this.register=false
    this.view=true
    this.modify=false
    this.get_data(this.filter)
  }
}
