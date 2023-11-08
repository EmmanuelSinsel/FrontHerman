import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { token_data } from 'src/models/models';
import { AuthService } from 'src/services/auth.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private Auth: AuthService,
              private router: Router){}
  ngOnInit() {
    const token: string | null = localStorage.getItem('token_admin');
    console.log(token)
    if(token != null){
      localStorage.setItem('token_admin',token)
      let auth: token_data = {token: token}
      this.Auth.verify_token(auth).subscribe(
        (res: any) => {
          console.log(res)
          if(res['status']=="0"){
            this.router.navigate(['admin/login']);
          }
        },
        (error) => {
  
        }
      );
    }
    else{
      this.router.navigate(['admin/login']);
    }
  }
}
