import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { author_register } from 'src/app/admin-portal/main-functions/authors/authors.component';
import { book_filter_admin, book_register } from 'src/app/admin-portal/main-functions/books/books.component';
import { category_register } from 'src/app/admin-portal/main-functions/generes/generes.component';
import { loan_register } from 'src/app/admin-portal/main-functions/loans/loans.component';
import { AppModule } from 'src/app/app.module';
import { HeadersModule } from 'src/app/admin-portal/frame/headers/headers.module';
import { fields, loan, search } from 'src/models/models';
import { advice_register } from 'src/app/admin-portal/admin-functions/advices/advices.component';
import { register_list } from 'src/app/admin-portal/admin-functions/historial/historial.component';
import { alumn_register } from 'src/app/admin-portal/admin-functions/alumn-accounts/alumn-accounts.component';
import { AuthService } from './auth.service';
import { admin_register } from 'src/app/admin-portal/admin-functions/admin-accounts/admin-accounts.component';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  now = new Date();
  constructor(
    private app: AppModule,
    private http: HttpClient,
    private auth: AuthService) {}
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
    this.auth.log(data.token,"Prestamo registrado el dia: "+this.now)
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
    this.auth.log(data.token,"Prestamo actualizado el dia: "+this.now)
    return this.http.post<any>(this.url+"/update_loan/", params, {headers: this.getCustomHeaders()});
  }
  delete_loan(){
    
  }

  return_book(where: string){
    const data = {
      date_return: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Libro retornado el dia: "+this.now)
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
  get_books(filter: book_filter_admin){
    let params = {
      title: filter.title,
      isbn:filter.isbn,
      category:filter.category,
      author:filter.author,
      library:filter.library_id
    }
    return this.http.post<any>(this.url+"/get_full_book/",params, {headers: this.getCustomHeaders()});
  }
  register_book(book: book_register){
    let params = {
      title: book.title,
      isbn:book.isbn,
      category:book.category,
      author:book.author,
      stock:book.stock,
      token: book.token,
      state:"1"
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Libro registrado el dia: "+this.now)
    return this.http.post<any>(this.url+"/register_book/",params, {headers: this.getCustomHeaders()});
  }
  update_book(book: book_register, actual_book: string){
    let params = {
      title: book.title,
      isbn:book.isbn,
      category:book.category,
      author:book.author,
      status:book.stock,
      state:"1",
      token: book.token,
      where: actual_book
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Libro actualizado el dia: "+this.now)
    return this.http.post<any>(this.url+"/update_book/",params, {headers: this.getCustomHeaders()});
  }
  delete_book(where:string){
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Libro eliminado el dia: "+this.now)
    return this.http.delete<any>(this.url+"/delete_book/id_book = '"+where+"'", {headers: this.getCustomHeaders()});
  }
  //CATEGORIAS
  get_category(where: string){
    if(where==""){
      where="*"
    }
    return this.http.get<any>(this.url+"/list_category/"+where, {headers: this.getCustomHeaders()});
  }
  register_category(category: category_register){
    let params = {
      category: category.category,
      token: category.token,
      state:"1"
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Categoria registrada el dia: "+this.now)
    return this.http.post<any>(this.url+"/insert_category/",params, {headers: this.getCustomHeaders()});
  }
  update_category(category: category_register, where: string){
    let params = {
      category: category.category,
      token: category.token,
      state:"1"
    }
    console.log(category)
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Categoria actualizada el dia: "+this.now)
    return this.http.put<any>(this.url+"/update_category/id_category = '"+where+"'",params, {headers: this.getCustomHeaders()});
  }
  delete_category(where:string){
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Categoria eliminada el dia: "+this.now)
    return this.http.delete<any>(this.url+"/delete_category/id_category = '"+where+"'", {headers: this.getCustomHeaders()});
  }
  //AUTORES
  get_authors(where: string){
    if(where==""){
      where="*"
    }
    return this.http.get<any>(this.url+"/list_author/"+where, {headers: this.getCustomHeaders()});
  }
  register_author(author: author_register){
    let params = {
      name: author.name,
      token: author.token,
      state:"1"
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Autor registrado el dia: "+this.now)
    return this.http.post<any>(this.url+"/insert_author/",params, {headers: this.getCustomHeaders()});
  }
  update_author(author: author_register, where: string){
    let params = {
      name: author.name,
      token: author.token,
      state:"1"
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Autor actualizado el dia: "+this.now)
    return this.http.put<any>(this.url+"/update_author/id_author = '"+where+"'",params, {headers: this.getCustomHeaders()});
  }
  delete_author(where:string){
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Autor eliminado el dia: "+this.now)
    return this.http.delete<any>(this.url+"/delete_author/id_author = '"+where+"'", {headers: this.getCustomHeaders()});
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
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Reserva entregada el dia: "+this.now)
    return this.http.put<any>(this.url+"/update_reserve/id_reserve = '"+where+"'", data, {headers: this.getCustomHeaders()});
  }

  send_return_mail(email: string, title: string){
    const data = {
      email: email,
      title: title
    }
    return this.http.post<any>(this.url+"/send_return_mail/",data, {headers: this.getCustomHeaders()});
  }

  register_alumn_reserve(alumn: string, book: string, date: string, id: string){
    const data = {
      id_alumn: String(alumn),
      id_book: String(book),
      date_pickup: date,
      id_library: String(id),
      state: "1"
    }
    console.log(data)
    return this.http.post<any>(this.url+"/insert_reserve/",data, {headers: this.getCustomHeaders()});
  }
  //OBSERVACIONES
  get_advice(where: string){
    if(where==""){
      where="*"
    }
    const data = {
      where: where
    }
    return this.http.post<any>(this.url+"/get_full_advice/",data, {headers: this.getCustomHeaders()});
  }

  register_advice(advice: advice_register){
    let params = {
      alumn: advice.account_number,
      advice: advice.advice,
      state:"1"
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Observacion anotada el dia: "+this.now)
    return this.http.post<any>(this.url+"/register_advice/",params, {headers: this.getCustomHeaders()});
  }

  update_advice(advice: advice_register, where: string){
    let params = {
      alumn: advice.account_number,
      advice: advice.advice,
      state:"1"
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Observacion actualizada el dia: "+this.now)
    return this.http.put<any>(this.url+"/update_advice/id_author = '"+where+"'",params, {headers: this.getCustomHeaders()});
  }

  delete_advice(where: string){
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Observacion eliminada el dia: "+this.now)
    return this.http.delete<any>(this.url+"/delete_advice/id_author = '"+where+"'", {headers: this.getCustomHeaders()});
  }
  //ALUMNOS
  get_token_data(){
    let token = localStorage.getItem("token_alumn")
    let params = {
      token: token
    }
    return this.http.post<any>(this.url+"/get_token_data/",params, {headers: this.getCustomHeaders()});
  }
  get_alumn_profile(){
    let token = localStorage.getItem("token_alumn")
    let params = {
      token: token
    }
    return this.http.post<any>(this.url+"/get_alumn_profile/",params,{headers: this.getCustomHeaders()});    
  }
  get_alumns(where: string){
    if(where==""){
      where="*"
    }
    return this.http.get<any>(this.url+"/list_alumn/"+where,{headers: this.getCustomHeaders()});
  }
  register_alumn(alumn: alumn_register){
    let params = {
      account_number: alumn.account_number,
      email: alumn.email,
      carreer: alumn.carreer,
      first_name: alumn.first_name,
      last_name: alumn.last_name,
      phone: alumn.phone,
      school_group: alumn.school_group,
      password: alumn.password,
      library_id: alumn.library_id,
      user: alumn.user,
      token: alumn.token,
      state:"1"
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Alumno registrado el dia: "+this.now)
    return this.http.post<any>(this.url+"/insert_alumn/",params, {headers: this.getCustomHeaders()});
  }
  update_alumn(alumn: alumn_register, where: string){
    let params: any
    if(alumn.password != ""){
      params = {
        account_number: alumn.account_number,
        email: alumn.email,
        carreer: alumn.carreer,
        first_name: alumn.first_name,
        last_name: alumn.last_name,
        phone: alumn.phone,
        school_group: alumn.school_group,
        password: alumn.password,
        library_id: alumn.library_id,
        user: alumn.user,
        token: alumn.token,
        state:"1"
      }
    }else{
      params = {
        account_number: alumn.account_number,
        email: alumn.email,
        carreer: alumn.carreer,
        first_name: alumn.first_name,
        last_name: alumn.last_name,
        phone: alumn.phone,
        school_group: alumn.school_group,
        library_id: alumn.library_id,
        user: alumn.user,
        token: alumn.token,
        state:"1"
      }
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Alumno actualizado el dia: "+this.now)
    return this.http.put<any>(this.url+"/update_alumn/id_alumn = '"+where+"'",params, {headers: this.getCustomHeaders()});
  }
  delete_alumn(where: string){
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Alumno eliminado el dia: "+this.now)
    return this.http.delete<any>(this.url+"/delete_alumn/id_alumn = '"+where+"'", {headers: this.getCustomHeaders()});
  }
  //LOGS
  get_logs(where: string){
    if(where==""){
      where="*"
    }else{
      where = "user = '"+where+"'"
    }
    return this.http.get<any>(this.url+"/list_log/"+where,{headers: this.getCustomHeaders()});
  }
  //ADMINISTRADORES
  get_admin_profile(){
    let token = localStorage.getItem("token_admin")
    let params = {
      token: token
    }
    return this.http.post<any>(this.url+"/get_admin_profile/",params,{headers: this.getCustomHeaders()});    
  }
  get_admins(where: string){
    if(where==""){
      where="*"
    }
    return this.http.get<any>(this.url+"/list_admin/"+where,{headers: this.getCustomHeaders()});
  }

  register_admin(admin: admin_register){
    let params = {
      user: admin.user,
      password: admin.password,
      first_name: admin.first_name,
      last_name: admin.last_name,
      phone: admin.phone,
      email: admin.email,
      token: admin.token,
      state:"1"
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Alumno registrado el dia: "+this.now)
    return this.http.post<any>(this.url+"/insert_admin/",params, {headers: this.getCustomHeaders()});
  }
  update_admin(admin: admin_register, where: string){
    let params: any
    if(admin.password != ""){
      params = {
        user: admin.user,
        password: admin.password,
        first_name: admin.first_name,
        last_name: admin.last_name,
        phone: admin.phone,
        email: admin.email,
        token: admin.token,
        state:"1"
      }
    }else{
      params = {
      user: admin.user,
      first_name: admin.first_name,
      last_name: admin.last_name,
      phone: admin.phone,
      email: admin.email,
      token: admin.token,
      state:"1"
      }
    }
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Alumno actualizado el dia: "+this.now)
    return this.http.put<any>(this.url+"/update_admin/id_admin = '"+where+"'",params, {headers: this.getCustomHeaders()});
  }
  delete_admin(where: string){
    let token = localStorage.getItem("token_admin")
    if(token != null)this.auth.log(token,"Alumno eliminado el dia: "+this.now)
    return this.http.delete<any>(this.url+"/delete_admin/id_admin = '"+where+"'", {headers: this.getCustomHeaders()});
  }
  //ESTADISTICAS
  get_statistics(){
    return this.http.get<any>(this.url+"/get_full_statistics/",{headers: this.getCustomHeaders()});
  }

}
