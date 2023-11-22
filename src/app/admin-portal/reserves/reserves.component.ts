import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class reserve_list{
  id_reserve: string = ""
  id_alumn: string = ""
  account: string = ""
  id_book: string = ""
  isbn: string = ""
  book: string = ""
  date_deliver: string = ""
  delivered: string = ""
}

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css']
})
export class ReservesComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  reserves: reserve_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  filter_search: string = ""
  actual_loan: string = ""
  //REGISTER
  account_number: string = ""
  book: string = ""
  date_loan: string = ""
  date_deadline: string = ""
  notation: string = ""
  date: string | null = ""
  //RESUME
  //-ALUMN
  name: string = "-"
  account: string = "-"
  group: string = "-"
  carreer: string = "-"
  phone: string = "-"
  email: string = "-"
  //-BOOK
  id_book: string = ""
  title: string = "-"
  isbn: string = "-"
  category: string = "-"
  author: string = "-"
  state: string = "-"
  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    let current_date = new Date(this.date);
    current_date.setDate(current_date.getDate() + 30);
    this.date_loan = this.date
    var datePipe = new DatePipe("en-US");
    let deadline = datePipe.transform(current_date, 'yyyy-MM-dd');
    if(deadline != null)
      this.date_deadline = deadline
    this.get_data("")
  }
  edit(transaction: string, indice: number){
    this.register = true
    this.modify = true
    this.view = false
    console.log(transaction)
  }
  async get_data(where: string){
    this.crud.get_reserve(where).subscribe(
      (res: any) => {
        console.log(res)
        this.reserves = []
        for(let i = 0; i <= Object.keys(res).length-1; i++){
          let temp_reserve: reserve_list = new reserve_list
          temp_reserve.account = res[i]['account_number']
          temp_reserve.isbn = res[i]['isbn']
          temp_reserve.book = res[i]['book']
          temp_reserve.id_reserve = res[i]['id_reserve']
          temp_reserve.date_deliver = res[i]['date_pickup']
          if(res[i]['state'] == '1'){
            temp_reserve.delivered = "PENDIENTE"
          }else{
            temp_reserve.delivered = "ENTREGADO"
          }
          this.reserves.push(temp_reserve)
        }
      },
      (error) => {
      }
    );
  }

  deliver_reserve(){
    this.crud.return_book(this.actual_loan).subscribe(
      (res: any) => {
        this.crud.update_book_status(this.id_book,"1").subscribe(
          (res: any) => {
            window.alert("Libro devuelto")
            this.clear_form()
          },
          (error) => {
          }
        );
      },
      (error) => {
      }
    );
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
  
  get_book_data(){
    this.crud.get_book(this.book).subscribe(
      (res: any) => {
        if(res[0]!= null){
          this.title = res[0]['title']
          this.isbn = this.book
          this.category = res[0]['category']
          this.author = res[0]['author']
          this.id_book = res[0]['id_book']
          if(res[0]['status'] == 1){
            this.state = "Disponible"
          }else{
            this.state = "No Disponible"
          }
 
        }else{
          this.title = "-"
          this.isbn = "-"
          this.category = "-"
          this.author = "-"
          this.state = "-"
        }
      },
      (error) => {
      }
    );
  }
  change_deadline(){
    let current_date = new Date(this.date_loan);
    current_date.setDate(current_date.getDate() + 30);
    var datePipe = new DatePipe("en-US");
    let deadline = datePipe.transform(current_date, 'yyyy-MM-dd');
    if(deadline != null)
      this.date_deadline = deadline
  }
  clear_form(){
    this.name = "-"
    this.account = "-"
    this.group = "-"
    this.carreer = "-"
    this.phone = "-"
    this.email = "-"
    this.title = "-"
    this.isbn = "-"
    this.category = "-"
    this.author = "-"
    this.state = "-"
    this.account_number = ""
    this.book = ""
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    let current_date = new Date(this.date);
    current_date.setDate(current_date.getDate() + 30);
    this.date_loan = this.date
    var datePipe = new DatePipe("en-US");
    let deadline = datePipe.transform(current_date, 'yyyy-MM-dd');
    if(deadline != null)
      this.date_deadline = deadline
    this.register=false
    this.view=true
    this.modify=false
    this.get_data(this.filter_search)
  }
}
