import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { SidebarAlumnComponent } from '../frame/sidebar-alumn/sidebar-alumn.component';
import {Location} from '@angular/common';
import { token_data } from 'src/models/models';

@Component({
  selector: 'app-alumn',
  templateUrl: './alumn.component.html',
  styleUrls: ['./alumn.component.css']
})
export class AlumnComponent {

  constructor(private Auth: AuthService,
    private router: Router,
    private location: Location){
    }

  ngOnInit() {
    this.index_change()
    //this.location.go('admin');
    const token: string | null = localStorage.getItem('token_alumn');
    console.log(token)
    if(token != null){
      localStorage.setItem('token_alumn',token)
      let auth: token_data = {token: token}
      this.Auth.verify_token(auth).subscribe(
        (res: any) => {
          console.log(res)
          if(res['status']=="0"){
            this.router.navigate(['alumn/login']);
          }
        },
        (error) => {
        }
      );
    }
    else{
      this.index=11
      this.router.navigate(['alumn/login']);
    }
  }
  
  href: string = ""
  index: Number = 0;
  index_change(){
    let path = this.location.path();
    console.log(path)
    if (path == "/alumn/profile") {
      this.index = -1
    }
    if (path == "/alumn/home") {
      this.index = 1
    }
    if (path == "/alumn/books") {
      this.index = 2
    }
    if (path == "/alumn/loans") {
      this.index = 3
    }
  }
}
