import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { loan } from 'src/models/models';
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
  selector: 'app-loans-alumn',
  templateUrl: './loans-alumn.component.html',
  styleUrls: ['./loans-alumn.component.css']
})
export class LoansAlumnComponent {
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
    this.crud.get_token_data().subscribe(
      (res: any) => {
        console.log(res)
        this.crud.get_loan(res['account']).subscribe(
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
              this.loans.push(temp_loan)
            }
          },
          (error) => {
          }
        );
      },
      (error) => {
      }
    );
    
  }
}

