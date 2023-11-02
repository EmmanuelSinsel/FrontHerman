import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { login } from 'src/models/models';
import { AuthService } from 'src/services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-alumn',
  templateUrl: './login-alumn.component.html',
  styleUrls: ['./login-alumn.component.css'],
  providers: [HttpClient]
})
export class LoginAlumnComponent {
  data: login = new login()
  
  constructor(private Auth: AuthService,
              private router: Router){}

  login(){
    this.data.type = "0";
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
}
