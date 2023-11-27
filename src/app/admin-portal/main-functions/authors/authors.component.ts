import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class author_list{
  id_author: string = ""
  name: string = ""
}

export class author_register{
  name: string = ""
  state: string = "1"
  token: string = ""
}

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  authors: author_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  filter: string = ""
  actual_author: string = ""
  filter_array: string[] = []
  //REGISTER
  author: string = ""
  //RESUME


  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.get_data("")
  }
  async get_data(where: string){
    if(where == ""){
      where = " state = 1"
    }else{
      where ="name LIKE '"+ where+"%' AND state = 1"
    }
    this.crud.get_authors(where).subscribe(
      (res: any) => {
        console.log(res)
        this.authors = []
        for(let i = 0; i <= Object.keys(res).length-1; i++){
          let temp_author: author_list = new author_list
          temp_author.id_author = res[i]['id_author']
          temp_author.name = res[i]['name']
          this.authors.push(temp_author)
        }
      },
      (error) => {
      }
    );
  }
  edit(transaction: string, indice: number){
    if(transaction != 'new'){
      this.modify = true 
      let book = this.authors[indice]
      this.actual_author = this.authors[indice].id_author
      this.author = book.name
    }
    this.register = true
    this.view = false
    console.log(transaction)
  }

  register_author(){
    let data = new author_register
    data.name = this.author
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    this.crud.register_author(data).subscribe(
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
  update_author(){
    let data = new author_register
    data.name = this.author
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    this.crud.update_author(data,this.actual_author).subscribe(
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

  delete_author(){
    this.crud.delete_author(this.actual_author).subscribe(
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
    this.author = ""
    this.register=false
    this.view=true
    this.modify=false
    this.get_data(this.filter)
  }
}
