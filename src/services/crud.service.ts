import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<any>(this.url+"/list_loan/"+where, {headers: this.getCustomHeaders()});
  }
  register_loan(data: loan){
    let params = {
      id_alumn: data.id_alumn,
      id_book: data.id_book,
      date_transaction: data.date_transaction,
      date_deadline: data.date_deadline,
      notation: data.notation,
      id_library: data.id_library,
      state: "1"
    }
    return this.http.post<any>(this.url+"/insert_loan/", params, {headers: this.getCustomHeaders()});
  }
  update_loan(){
    
  }
  delete_loan(){
    
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
  get_book(where: string){
    if(where==""){
      where="*"
    }
    return this.http.get<any>(this.url+"/list_book/"+where, {headers: this.getCustomHeaders()});
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
}
