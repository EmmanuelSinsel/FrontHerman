import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { login, password_recover, recover_data, register, reset_password } from 'src/models/models';
import { AuthService } from 'src/services/auth.service'
import { Router } from '@angular/router';
import { windowWhen } from 'rxjs';
import { CrudService } from 'src/services/crud.service';


@Component({
  selector: 'app-login-alumn',
  templateUrl: './login-alumn.component.html',
  styleUrls: ['./login-alumn.component.css'],
  providers: [HttpClient]
})
export class LoginAlumnComponent {
  //ELEMENTS
  @ViewChild('cont') elementView: ElementRef | undefined;
  //DATA SENDERS
  data: login = new login()
  password_recover: password_recover = new password_recover()
  recover_data: recover_data = new recover_data()
  rpassword: reset_password = new reset_password()
  //FLAGS
  showLogin: boolean = true
  showPR1: boolean = false
  showPR2: boolean = false
  showPR3: boolean = false
  showLoginError: boolean = false
  loginError: string = ""
  showTokenError: boolean = false
  tokenError: string = ""
  showPasswordResetError: boolean = false
  prError: string = ""
  pr_email: string = ""
  //REGISTER
  r1: boolean = false
  r2: boolean = false
  r3: boolean = false
  r4: boolean = false
  register_data: register = new register()
  activation_data: recover_data = new recover_data()

  constructor(private Auth: AuthService,
              private crud: CrudService,
              private router: Router){}
  ngOnInit() {
    if(this.elementView != null){
      console.log(this.elementView.nativeElement.offsetHeight)
    }
    const token: string | null = localStorage.getItem('token_alumn');
    console.log(token)
    if(token != null){
      localStorage.setItem('token_alumn',token)
      let auto_login: login = {email:"", password:"",token: token, type:"1"}
      this.Auth.login(auto_login).subscribe(
        (res: any) => {
          console.log(res)
          if(res['status']=="400"){
            this.router.navigate(['alumn']);
          }
        },
        (error) => {
  
        }
      );
    }
  }
  login(){
    this.data.type = "0";
    this.Auth.login(this.data).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="1"){
          localStorage.setItem('token_alumn',res['token'])
          this.router.navigate(['alumn']);
        }
        if(res['status']=="0"){
          this.showLoginError = true
          this.loginError = "Contraseña incorrecta"
        }
        if(res['status']=="2"){
          this.showLoginError = true
          this.loginError = "Usuario inexistente"
        }
      },
      (error) => {

      }
    );
  }
  pr_init(){
    this.showLogin = false
    this.showPR1 = true
  }
  pr(){
    this.pr_email = this.password_recover.email
    this.password_recover.type="0"
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
          this.showTokenError = false
        }
        if(res['status']=="0"){
          this.showTokenError = true
          this.tokenError = "Token Invalido"
        }
        if(res['status']=="2"){
          this.showTokenError = true
          this.tokenError = "Token Expirado"
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
            this.showPasswordResetError = false
          }
        },
        (error) => {
  
        }
      );
    }
    else{
      this.showPasswordResetError = true
      this.prError = "Las contraseñas no coinciden"
    }
  }
  //REGISTER
  r_init(){
    this.r1=true
    this.showLogin=false
  }
  r_data(){
    if(this.register_data.account_number!="" &&
      this.register_data.user!="" &&
      this.register_data.email!="" &&
      this.register_data.password!=""){
        this.r2=true
        this.r1=false
      }else{
        window.alert("Datos faltantes")
      }

  }
  r_msg(){
    if(this.register_data.group != "" &&
      this.register_data.carreer != "" &&
      this.register_data.first_name != "" &&
      this.register_data.last_name != "" &&
      this.register_data.phone != "" &&
      this.register_data.library_id != ""){
        this.Auth.register_alumn(this.register_data).subscribe(
          (res: any) => {
            if(res['status']=="200"){
              let temp: password_recover = new password_recover()
              temp.email = this.register_data.email
              temp.type = "0"
              this.Auth.send_email_verification(temp).subscribe(
                (res: any) => {
                  console.log(res)
                  if(res['status']=="1"){
                    this.r3=true
                    this.r2=false
                  }
                },
                (error) => {
                }
              );
            }
            if(res['status']=="0"){
              window.alert("Alumno ya registrado")
            }
          },
          (error) => {
          }
        );
    }else{
      window.alert("Datos faltantes")
    }
  }
  r_verify(){
    this.Auth.verify_email(this.activation_data).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="1"){
          window.alert("Correo Verificado")
          this.showLogin= true
          this.r3=false
          this.register_data = new register()
          this.activation_data= new recover_data()
        }
      },
      (error) => {

      }
    );
  }
}
