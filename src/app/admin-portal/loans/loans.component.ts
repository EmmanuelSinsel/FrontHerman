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

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})

export class LoansComponent {
  btn_message: string = "REGISTRAR PRESTAMO"
  loans: loan_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  //REGISTER
  account_number: string = ""
  book: string = ""
  date_loan: string = ""
  date_deadline: string = ""
  notation: string = ""
  constructor(private crud: CrudService){}
  ngOnInit() {
    this.get_data("")
    console.log("Asdasd")
  }
  async get_data(where: string){
    
    this.crud.get_loan(where).subscribe(
      (res: any) => {
        for(let i = 0; i <= Object.keys(res).length-1; i++){
          let temp_loan: loan_list = new loan_list
          temp_loan.id_transaction = res[i]['id_transaction']
          temp_loan.date_deadline = res[i]['date_deadline']
          temp_loan.date_return = res[i]['date_return']
          temp_loan.date_transaction = res[i]['date_transaction']
          temp_loan.notation = res[i]['notation']
          this.crud.get_alumn(where).subscribe(
            (res: any) => {
              temp_loan.id_alumn = res[0]['id_alumn']
              temp_loan.account = res[0]['account_number']
              this.crud.get_book(where).subscribe(
                (res: any) => {
                  temp_loan.book = res[0]['tittle']
                  temp_loan.isbn = res[0]['isbn']
                  temp_loan.id_book = res[0]['id_book']
                  this.loans.push(temp_loan)
                },
                (error) => {
                }
              );
            },
            (error) => {
            }
          );
        }
      },
      (error) => {
      }
    );
  }
  edit(transaction: string, indice: number){
    if(transaction != 'new'){
      this.modify = true 
      let loan = this.loans[indice]
      this.account_number = loan.account
      this.book = loan.book
      this.date_loan = loan.date_transaction
      this.date_deadline = loan.date_deadline
      this.notation = loan.notation
    }
    this.register = true
    this.view = false
    console.log(transaction)
  }

  register_loan(){
    let data = new loan
    this.crud.get_alumn("account_number = '"+this.account_number+"'").subscribe(
      (res: any) => {
        data.id_alumn = String(res[0]['id_alumn'])
        this.crud.get_book("isbn= '"+this.book+"'").subscribe(
          (res: any) => {
            data.id_book = String(res[0]['id_book'])
            if(res[0]['status']=="1"){
              data.date_deadline = this.date_deadline
              data.date_transaction = this.date_loan
              data.notation = this.notation
              let token =localStorage.getItem("token_admin")
              if(token != null){
                this.crud.get_user_token(token).subscribe(
                  (res: any) => {
                    this.crud.get_user_library(res[0]['id_user']).subscribe(
                      (res: any) => {
                        data.id_library = String(res[0]['library_id'])
                        this.crud.register_loan(data).subscribe(
                          (res: any) => {
                            this.crud.update_book_status(data.id_book,"0").subscribe(
                              (res: any) => {
                              },
                              (error) => {
                              });
                          },
                          (error) => {
                          });
                      },
                      (error) => {
                      });
                  },
                  (error) => {
                  });
              }
            }
            else{
              console.log("Libro Ocupao")
            }
          },
          (error) => {
          }
        );
      },
      (error) => {
      }
    );
    
    // this.crud.register_loan(data).subscribe(
    //   (res: any) => {
    //     console.log(res)
    //   },
    //   (error) => {
    //   }
    // );
  }
  update_loan(){

  }
  return_loan(){

  }
}
