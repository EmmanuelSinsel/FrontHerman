import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { token_data } from 'src/models/models';
import { AuthService } from 'src/services/auth.service' 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent {
  showFiller = false;
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

  route(index: number){
    switch(index){
      case 1: {
        this.router.navigate(['loans']);
        break;
      }
      case 2: {
        this.router.navigate(['returns']);
        break;
      }
      case 3: {
        this.router.navigate(['reserves']);
        break;
      }
      case 4: {
        this.router.navigate(['books']);
        break;
      }
      case 5: {
        this.router.navigate(['authors']);
        break;
      }
      case 6: {
        this.router.navigate(['generes']);
        break;
      }
      case 7: {
        this.router.navigate(['']);
        break;
      }
      case 8: {
        this.router.navigate(['']);
        break;
      }
      case 9: {
        this.router.navigate(['']);
        break;
      }
      case 10: {
        this.router.navigate(['']);
        break;
      }
      case 11: {
        this.router.navigate(['']);
        break;
      }
      case 12: {
        this.router.navigate(['']);
        break;
      }
    }
  }
}
