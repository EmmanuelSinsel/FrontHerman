import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class register_list{
  id_category: string = ""
  category: string = ""
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  categories: register_list[] = []
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
          let temp_category: register_list = new register_list
          temp_category.id_category = res[i]['id_category']
          temp_category.category = res[i]['category']
          this.categories.push(temp_category)
        }
      },
      (error) => {
      }
    );
  }  
}
