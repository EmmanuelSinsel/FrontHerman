import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

export class loan_list{
  id_transaction: string = ""
  id_alumn: string = ""
  account: string = ""
  id_book: string = ""
  isbn: string = ""
  book: string = ""
  date_transaction: string = ""
  date_deadline: string = ""
  date_return: string | null = ""
  notation: string = ""
}
export class loan_register{
  account: string = ""
  isbn:string = ""
  date_transaction:string = ""
  date_deadline:string = ""
  notation:string = ""
  state: string = "1"
  token: string = ""
}

@Component({
  selector: 'app-slopes',
  templateUrl: './slopes.component.html',
  styleUrls: ['./slopes.component.css']
})
export class SlopesComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  loans: loan_list[] = []
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
  stock: number = 0
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
  async get_data(where: string){

    this.crud.get_admin_profile().subscribe(
      (res: any) => {
        console.log(res)
        if(res['profile']['master'] != "1"){
          if(where==""){
            where = "book.id_library = '"+res['profile']['library_id']+"'"
          }else{
            where = "alumn.account_number = '"+where+"' AND book.id_library = '"+res['profile']['library_id']+"'"
          }
        }else{
          where = "*"
        }
        this.crud.get_loan(where).subscribe(
          (res: any) => {
            console.log(res)
            this.loans = []
            for(let i = 0; i <= Object.keys(res).length-1; i++){
              let temp_loan: loan_list = new loan_list
              temp_loan.account = res[i]['account_number']
              temp_loan.isbn = res[i]['isbn']
              temp_loan.book = res[i]['book']
              temp_loan.id_transaction = res[i]['id_transaction']
              temp_loan.date_deadline = res[i]['date_deadline']
              if(res[i]['date_return'] == null){
                temp_loan.date_return = "NO DEVUELTO"
              }else{
                temp_loan.date_return = res[i]['date_return']
              }
              temp_loan.date_transaction = res[i]['date_transaction']
              if(temp_loan.date_return =="NO DEVUELTO"){
                this.loans.push(temp_loan)
              }
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
      let loan = this.loans[indice]
      this.actual_loan = this.loans[indice].id_transaction
      this.account_number = loan.account
      this.book = loan.isbn
      this.date_loan = loan.date_transaction
      this.date_deadline = loan.date_deadline
      this.notation = loan.notation
      this.get_alumn_data()
      this.get_book_data()
    }
    this.register = true
    this.view = false
    console.log(transaction)

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
          console.log(res[0]['status'])
          this.stock = Number(res[0]['status'])
          if(res[0]['status'] > 0){
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

  send_mail(){
    this.crud.send_return_mail(this.email, this.title).subscribe(
      (res: any) => {
        window.alert("CORREO")
      },
      (error) => {
      }
    );
  }
}

