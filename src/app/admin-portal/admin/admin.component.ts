import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { token_data } from 'src/models/models';
import { AuthService } from 'src/services/auth.service' 
import { SidebarComponent } from 'src/app/admin-portal/frame/sidebar/sidebar.component'
import {Location} from '@angular/common';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent {
  showFiller = false;

  constructor(private Auth: AuthService,
              private router: Router,
              private Sidebar: SidebarComponent,
              private location: Location){
              }
  href: string = ""
  index: Number = 0;
  ngOnInit() {
    this.index_change()
    //this.location.go('admin');
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
  index_change(){
    let path = this.location.path();
    console.log(path)
    if (path == "/admin/loans") {
      this.index = 1
    }
    if (path == "/admin/returns") {
      this.index = 2
    }
    if (path == "/admin/reserves") {
      this.index = 3
    }
    if (path == "/admin/books") {
      this.index = 4
    }
    if (path == "/admin/authors") {
      this.index = 5
    }
    if (path == "/admin/generes") {
      this.index = 6
    }
    if (path == "/admin/historial") {
      this.index = 7
    }
    if (path == "/admin/advices") {
      this.index = 8
    }
    if (path == "/admin/admin-accounts") {
      this.index = 9
    }
    if (path == "/admin/loan") {
      this.index = 10
    }
    if (path == "/admin/loan") {
      this.index = 11
    }
    if (path == "/admin/loan") {
      this.index = 12
    }
  }
  
}
