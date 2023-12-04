import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CrudService } from 'src/services/crud.service';
import { SidebarComponent } from '../frame/sidebar/sidebar.component';

export class admin_data{
  id_admin: string = ""
  user: string = ""
  password: string = ""
  first_name: string = ""
  last_name: string = ""
  full_name: string = ""
  phone: string = ""
  email: string = ""
  state: string = "1"
  token: string = ""
}

@Component({
  selector: 'app-logout-admin',
  templateUrl: './logout-admin.component.html',
  styleUrls: ['./logout-admin.component.css']
})
export class LogoutAdminComponent {
  //PROFILE
  profile: admin_data = new admin_data
  user: string = ""
  password: string = ""
  first_name: string = ""
  last_name: string = ""
  full_name: string = ""
  phone: string = ""
  email: string = ""
  id: string = ""
  //RESUME

  constructor(private crud: CrudService,
    private router: Router,){}

  ngOnInit() {
    this.get_data()
  }
  async get_data(){
    this.crud.get_admin_profile().subscribe(
      (res: any) => {
        console.log(res)
        res = res["profile"]
        this.user = res['user']
        this.password = ""
        this.first_name = res["first_name"]
        this.last_name = res["last_name"]
        this.phone = res["phone"]
        this.email = res["email"]
        this.id= res["id"]
      }
    );
  }

  update_admin(){
    let data = new admin_data
    data.user = this.user
    data.password = this.password
    data.first_name = this.first_name
    data.last_name = this.last_name
    data.phone = this.phone
    data.email = this.email
    data.state = "1"
    const token = localStorage.getItem("token_admin")
    if(token != null){
      data.token = token
    }
    this.crud.update_admin(data,this.id).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="200"){
          window.alert("Administrador Actualizado")
        }
      },
      (error) => {
      }
    );
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['admin/login']);
  }

}

