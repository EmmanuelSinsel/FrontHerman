import { Injectable } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from  '@angular/common/http';
import { login, password_recover, recover_data, reset_password } from 'src/models/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private app: AppModule,
    private http: HttpClient) {}
  url: string = this.app.url;

  getCustomHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('token', '');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  login(data: login){
    console.log(data)
    var headers = this.getCustomHeaders();
    const params = {
        type : data.type,
        token : data.token,
        email : data.email,
        password : data.password
      };
    return this.http.post(this.url+"/login", params, {headers});
  }
  logout(){

  }
  verify_token(){

  }
  send_verification_email(){

  }
  verificate_email(){

  }
  send_password_reset(data: password_recover){
    console.log(data)
    var headers = this.getCustomHeaders();
    const params = {
        email : data.email,
        type: data.type
      };
    return this.http.post(this.url+"/password_recover", params, {headers});
  }
  verify_password_reset(data: recover_data){
    console.log(data)
    var headers = this.getCustomHeaders();
    const params = {
        token : data.token,
      };
    return this.http.post(this.url+"/password_token_verify", params, {headers});
  }
  reset_password(data: reset_password){
    console.log(data)
    var headers = this.getCustomHeaders();
    const params = {
        password : data.password,
        token : data.token
      };
    return this.http.post(this.url+"/password_reset", params, {headers});
  }
}
