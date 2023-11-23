import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loan_register } from 'src/app/admin-portal/loans/loans.component';
import { AppModule } from 'src/app/app.module';
import { HeadersModule } from 'src/app/headers/headers.module';
import { fields, loan, search } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private app: AppModule,
    private http: HttpClient) {}
  url: string = this.app.url;

  public getCustomHeaders(): any {
    var token = localStorage.getItem("token_admin");
    if(token != null){
      let headers = new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "token":  token,
        "Access-Control-Allow-Origin":"*"
      });
      return headers
    }
  }

  get_fields(data: fields){
    const params = {
        table : data.table,
      };
    return this.http.post<any>(this.url+"/get_model", params, {headers: this.getCustomHeaders()});
  }

  //ADMIN--------------------------------------------------------------------------------------------------
  get_admin(where: string){

  }
  get_user_token(token: string){
    return this.http.get<any>(this.url+"/list_token/token = '"+token+"'", {headers: this.getCustomHeaders()})
  }
  get_user_library(user: string){

        return this.http.get<any>(this.url+"/list_admin/id_admin = '"+user+"'", {headers: this.getCustomHeaders()})
  }
  //PRESTAMOS
  get_loan(where: string){
    if(where==""){
      where="*"
    }
    const data = {
      where: where
    }
    return this.http.post<any>(this.url+"/get_full_loan/",data, {headers: this.getCustomHeaders()});
  }
  register_loan(data: loan_register){
    let params = {
      account: data.account,
      isbn:data.isbn,
      date_transaction:data.date_transaction,
      date_deadline:data.date_deadline,
      date_return:"",
      notation:data.notation,
      state:"1",
      token: data.token
    }
    return this.http.post<any>(this.url+"/register_loan/", params, {headers: this.getCustomHeaders()});
  }
  update_loan(data: loan_register, where: string){
    let params = {
      account: data.account,
      isbn:data.isbn,
      date_transaction:data.date_transaction,
      date_deadline:data.date_deadline,
      date_return:"",
      notation:data.notation,
      state:"1",
      token: data.token,
      where: where
    }
    return this.http.post<any>(this.url+"/update_loan/", params, {headers: this.getCustomHeaders()});
  }
  delete_loan(){
    
  }

  return_book(where: string){
    const data = {
      date_return: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
    return this.http.put<any>(this.url+"/update_loan/id_transaction = '"+where+"'", data, {headers: this.getCustomHeaders()});
  }
  //ALUMNOS
  get_alumn(where: string){
    if(where==""){
      where="*"
    }
    return this.http.get<any>(this.url+"/list_alumn/"+where, {headers: this.getCustomHeaders()});
  }
  //LIBROS
  update_book_status(id_book: string, status: string){
    const data = {
      status: status
    }
    return this.http.put<any>(this.url+"/update_book/id_book = '"+id_book+"'", data, {headers: this.getCustomHeaders()});
  }
  get_book(isbn: string){
    const data = {
      isbn: isbn
    }
    return this.http.post<any>(this.url+"/get_book_data/",data, {headers: this.getCustomHeaders()});
  }
  //CATEGORIAS
  get_category(where: string){
    if(where==""){
      where="*"
    }
    return this.http.get<any>(this.url+"/list_categoty/"+where, {headers: this.getCustomHeaders()});
  }
  //AUTORES
  get_author(where: string){
    if(where==""){
      where="*"
    }
    return this.http.get<any>(this.url+"/list_author/"+where, {headers: this.getCustomHeaders()});
  }
  //DEVOLUCIONES
  get_reserve(where: string){
    if(where==""){
      where="*"
    }
    const data = {
      where: where
    }
    return this.http.post<any>(this.url+"/get_full_reserve/",data, {headers: this.getCustomHeaders()});
  }

  return_reserve(where: string){
    const data = {
      state: "0"
    }
    return this.http.put<any>(this.url+"/update_reserve/id_reserve = '"+where+"'", data, {headers: this.getCustomHeaders()});

  }

}