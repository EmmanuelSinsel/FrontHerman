import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { book_filter_admin } from 'src/app/admin-portal/main-functions/books/books.component';
import { CrudService } from 'src/services/crud.service';

export class book_list{
  id_book: string = ""
  title: string = ""
  isbn: string = ""
  category: string = ""
  author: string = ""
  stock: string = ""
}

export class book_register{
  title: string = ""
  isbn: string = ""
  category: string = ""
  author: string = ""
  stock: string = ""
  state: string = "1"
  token: string = ""
}
@Component({
  selector: 'app-books-alumn',
  templateUrl: './books-alumn.component.html',
  styleUrls: ['./books-alumn.component.css']
})
export class BooksAlumnComponent {

  btn_message: string = "REGISTRAR PRESTAMO"
  books: book_list[] = []
  view: boolean = true
  register: boolean = false
  modify: boolean = false
  filter_title: string = ""
  filter_isbn: string = ""
  filter_category: string = ""
  filter_author: string = ""
  actual_book: string = ""
  filter_array: string[] = []
  //REGISTER
  title: string = ""
  isbn: string = ""
  category: string = ""
  author: string = ""
  stock: string = ""
  date_loan: string = ""
  //RESUME
  flag: boolean = true
  date: string = ""
  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.get_data(false)
    let date = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    let current_date = new Date(this.date);
    this.date_loan = date
  }
  async get_data(filter: boolean){
    let filters: book_filter_admin = new book_filter_admin
    filters.title = this.filter_title
    filters.isbn = this.filter_isbn
    filters.category = this.filter_category
    filters.author = this.filter_author
    if(filters.title == ""){filters.title="*"}
    if(filters.isbn == ""){filters.isbn="*"}
    if(filters.category == ""){filters.category="*"}
    if(filters.author == ""){filters.author="*"}
    if(filters.library_id = ""){filters.library_id = "*"}
    this.crud.get_alumn_profile().subscribe(
      (res: any) => {
        console.log(res)
        let library = res['profile']['library_id']
        filters.library_id = String(library)
        this.crud.get_books(filters).subscribe(
          (res: any) => {
            console.log(res)
            this.books = []
            for(let i = 0; i <= Object.keys(res).length-1; i++){
              let temp_loan: book_list = new book_list
              temp_loan.id_book = res[i]['id_book']
              temp_loan.title = res[i]['title']
              temp_loan.isbn = res[i]['isbn']
              temp_loan.category = res[i]['category']
              temp_loan.author = res[i]['author']
              temp_loan.stock = res[i]['stock']
              this.books.push(temp_loan)
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
  edit(transaction: string, indice: number){
    if(transaction != 'new'){
      this.modify = true 
      let book = this.books[indice]
      this.actual_book = this.books[indice].id_book
      this.title = book.title
      this.isbn = book.isbn
      this.category = book.category
      this.author = book.author
      this.stock = book.stock
      console.log(this.stock)
      if(Number(this.stock) < 2){
        this.flag=false
      }else{
        this.flag=true
      }
    }
    if(this.flag==false){
      window.alert("LIBRO NO DISPONIBLE")
    }else{
      this.register = true
      this.view = false
      console.log(transaction)
    }


  }

  reserve_book(){
    if(this.date_loan!="mm/dd/yyyy"){
      this.crud.get_token_data().subscribe(
        (res: any) => {
          console.log(res)
          this.crud.register_alumn_reserve(res['id'],this.actual_book,this.date_loan,res['library']).subscribe(
            (res: any) => {
              console.log(res)
              if(res['status']=="200"){
                window.alert("LIBRO APARTADO")
                this.clear_form()
              }else{
                window.alert(res['message'])
              }
            },
            (error) => {
            }
          );
        },
        (error) => {
        }
      );
    }else{
      window.alert("FECHA INVALIDA")
    }

  }

  clear_form(){

    this.title = ""
    this.isbn = ""
    this.category = ""
    this.author = ""
    this.stock = ""
    this.register=false
    this.view=true
    this.modify=false
    this.get_data(true)
  }
}

