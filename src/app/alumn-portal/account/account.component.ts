import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CrudService } from 'src/services/crud.service';
import {Location} from '@angular/common';
export class alumn_data{
  id_alumn: string = ""
  account_number: string = ""
  user: string = ""
  password: string = ""
  school_group: string = ""
  carreer: string = ""
  first_name: string = ""
  last_name: string = ""
  phone: string = ""
  email: string = ""
  last_preference: string = ""
  library_id: string = ""
  state: string = "1"
  token: string = ""
}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  //PROFILE
  profile: alumn_data = new alumn_data
  id_alumn: string = ""
  account_number: string = ""
  user: string = ""
  password: string = ""
  school_group: string = ""
  carreer: string = ""
  first_name: string = ""
  last_name: string = ""
  phone: string = ""
  email: string = ""
  last_preference: string = ""
  library_id: string = ""
  //RESUME

  constructor(private crud: CrudService,
    private router: Router,private location: Location){}

  ngOnInit() {
    this.get_data()
  }
  async get_data(){
    this.crud.get_alumn_profile().subscribe(
      (res: any) => {
        console.log(res)
        res = res["profile"]
        this.id_alumn = res['id']
        this.account_number = res['account_number']
        this.user = res['user']
        this.school_group = res['school_group']
        this.carreer = res['carreer']
        this.first_name = res['first_name']
        this.last_name = res['last_name']
        this.phone = res['phone']
        this.email = res['email']
        this.library_id = res['library_id']
      }
    );
  }

  update_alumn(){
    let data = new alumn_data
    data.account_number = this.account_number 
    data.user =           this.user 
    data.school_group =   this.school_group
    data.carreer =        this.carreer
    data.first_name =     this.first_name 
    data.last_name =      this.last_name 
    data.phone =          this.phone
    data.email =          this.email 
    data.library_id = String(this.library_id)
    const token = localStorage.getItem("token_alumn")
    if(token != null){
      data.token = token
    }
    this.crud.update_alumn(data,this.id_alumn).subscribe(
      (res: any) => {
        console.log(res)
        if(res['status']=="200"){
          window.alert("Cuenta Actualizada")
        }
      },
      (error) => {
      }
    );
  }

  logout(){
    localStorage.removeItem("token_alumn")
    this.router.navigate(['alumn/login']);
  }
  return(){
    this.location.go("admin");
    window.location.reload();
  }
}