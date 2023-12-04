import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class log_list{
  id_log: string = ""
  user: string = ""
  log: string = ""
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})

export class LogsComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  logs: log_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  filter_search: string = ""
  actual_reserve: string = ""
  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.get_data("")
  }
  edit(transaction: string, indice: number){
    this.register = true
    this.modify = true
    this.view = false
  }
  async get_data(where: string){
    this.crud.get_logs(where).subscribe(
      (res: any) => {
        console.log(res)
        this.logs = []
        for(let i = 0; i <= Object.keys(res).length-1; i++){
          let temp_log: log_list = new log_list
          temp_log.id_log = res[i]['id_log']
          temp_log.user = res[i]['user']
          temp_log.log = res[i]['log']
          this.logs.push(temp_log)
        }
      },
      (error) => {
      }
    );
  }


}
