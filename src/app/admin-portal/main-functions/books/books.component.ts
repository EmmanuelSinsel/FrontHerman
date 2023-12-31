import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { author_list } from '../authors/authors.component';
import { category_list } from '../generes/generes.component';

export class book_list{
  id_book: string = ""
  title: string = ""
  isbn: string = ""
  category: string = ""
  author: string = ""
  stock: string = ""
}

export class book_filter_admin{
  title: string = ""
  isbn: string = ""
  category: string = ""
  author: string = ""
  library_id: string = ""
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
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  btn_message: string = "REGISTRAR PRESTAMO"
  authors: author_list[] = []
  categories: category_list[] = []
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
  //RESUME
  author_search: string = ""
  category_search: string = ""

  constructor(private crud: CrudService,){}
  ngOnInit() {
    this.get_data(false)
    this.get_category("")
    this.get_authors("")
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
    if(filters.library_id == ""){filters.library_id="*"}
    this.crud.get_admin_profile().subscribe(
      (res: any) => {
        if(res['profile']['master'] == null){
          filters.library_id = String(res['profile']['library_id'])
        }
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
    }
    this.register = true
    this.view = false
    console.log(transaction)

  }

  register_book(){
    let data = new book_register
    data.title = this.title
    data.isbn = this.isbn
    data.category = this.category
    data.author = this.author
    data.stock = this.stock
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    if(this.crud.verify(data)==1){
      this.crud.register_book(data).subscribe(
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
  update_book(){
    let data = new book_register
    data.title = this.title
    data.isbn = this.isbn
    data.category = this.category
    data.author = this.author
    data.stock = this.stock
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    if(this.crud.verify(data)==1){
      this.crud.update_book(data,this.actual_book).subscribe(
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

  delete_book(){
    this.crud.delete_book(this.actual_book).subscribe(
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

  get_authors(where: string){
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
  get_category(where: string){
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

  category_change(event: any){
    if(event.target != null){this.category = event.target.value}
  }
  author_change(event: any){
    if(event.target != null){this.author = event.target.value}
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
