import { Injectable } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from  '@angular/common/http';
import { login, password_recover, recover_data, register, reset_password, token_data } from 'src/models/models';
import { alumn_register } from 'src/app/admin-portal/admin-functions/alumn-accounts/alumn-accounts.component';


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
  //LOGIN
  login(data: login){
    var headers = this.getCustomHeaders();
    const params = {
        type : data.type,
        token : data.token,
        email : data.email,
        password : data.password
      };
    return this.http.post(this.url+"/login", params, {headers});
  }
  //PASSWORD RECOVER
  verify_token(data: token_data){
    var headers = this.getCustomHeaders();
    const params = {
        token : data.token
      };
    return this.http.post(this.url+"/authenticate", params, {headers});
  }
  send_password_reset(data: password_recover){
    var headers = this.getCustomHeaders();
    const params = {
        email : data.email,
        type: data.type
      };
    return this.http.post(this.url+"/password_recover", params, {headers});
  }
  verify_password_reset(data: recover_data){
    var headers = this.getCustomHeaders();
    const params = {
        token : data.token,
      };
    return this.http.post(this.url+"/password_token_verify", params, {headers});
  }
  reset_password(data: reset_password){
    var headers = this.getCustomHeaders();
    const params = {
        password : data.password,
        token : data.token
      };
    return this.http.post(this.url+"/password_reset", params, {headers});
  }
  //REGISTER
  register_alumn(alumn: register){
    let params = {
      account_number: alumn.account_number,
      email: alumn.email,
      carreer: alumn.carreer,
      first_name: alumn.first_name,
      last_name: alumn.last_name,
      phone: alumn.phone,
      school_group: alumn.group,
      password: alumn.password,
      library_id: alumn.library_id,
      user: alumn.user,
      state:"1"
    }
    return this.http.post<any>(this.url+"/insert_alumn/",params, {headers: this.getCustomHeaders()});
  }
  send_email_verification(data: password_recover){
    const params = {
        email : data.email,
        type: data.type
      };
      return this.http.post<any>(this.url+"/send_email_verification",params, {headers: this.getCustomHeaders()});
  }
  verify_email(data: recover_data){
    const params = {
      token : data.token
    };
    return this.http.post<any>(this.url+"/verify_email",params, {headers: this.getCustomHeaders()});
  }

  async log(token: string, log: string){
    var headers = this.getCustomHeaders();
    const params = {
        token : token,
        log : log
      };
    this.http.post(this.url+"/log", params, {headers}).subscribe(
      (res: any) => {
      },
      (error) => {
      }
    );
  }
}
