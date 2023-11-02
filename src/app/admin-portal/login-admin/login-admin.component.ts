import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { login, password_recover, recover_data, reset_password } from 'src/models/models';
import { AuthService } from 'src/services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
  providers: [HttpClient]
})
export class LoginAdminComponent {
  data: login = new login()
  password_recover: password_recover = new password_recover()
  recover_data: recover_data = new recover_data()
  rpassword: reset_password = new reset_password()
  showLogin: boolean = true
  showPR1: boolean = false
  showPR2: boolean = false
  showPR3: boolean = false
  pr_email: string = ""
  constructor(private Auth: AuthService,
              private router: Router){}

  ngOnInit() {
    const token: string | null = localStorage.getItem('token');
    console.log(token)
    if(token != null){
      localStorage.setItem('token',token)
      let auto_login: login = {email:"", password:"",token: token, type:"1"}
      this.Auth.login(auto_login).subscribe(
        (res: any) => {
          console.log(res)
          if(res['status']=="400"){
            this.router.navigate(['admin']);
          }
        },
        (error) => {
  
        }
      );
    }
  }
  login(){
    this.data.type = "1";
    this.Auth.login(this.data).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="1"){
          localStorage.setItem('token',res['token'])
          this.router.navigate(['admin']);
        }
      },
      (error) => {

      }
    );
  }
  pr_init(){
    console.log("asda")
    this.showLogin = false
    this.showPR1 = true
  }
  pr(){
    this.pr_email = this.password_recover.email
    this.password_recover.type="1"
    this.Auth.send_password_reset(this.password_recover).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="1"){
          this.showPR1 = false
          this.showPR2 = true
        }
      },
      (error) => {

      }
    );
  }
  pr_verify(){
    this.Auth.verify_password_reset(this.recover_data).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="1"){
          this.showPR2 = false
          this.showPR3 = true
        }
      },
      (error) => {

      }
    );
  }
  pr_reset(){
    if(this.rpassword.password == this.rpassword.confirm_password){
      this.rpassword.token =this.recover_data.token
      this.Auth.reset_password(this.rpassword).subscribe(
        (res: any) => {
          console.log(res)
          if(res['status']=="1"){
            this.showPR3 = false
            this.showLogin = true
          }
        },
        (error) => {
  
        }
      );
    }

  }
}
