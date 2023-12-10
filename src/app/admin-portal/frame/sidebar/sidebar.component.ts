import { Component, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { CrudService } from 'src/services/crud.service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  constructor(private router: Router,
              private location: Location,
              private crud: CrudService){}
  public index: Number = 0;
  button_focus = "side-button-selected"
  button_not_focus = "side-button"
  label_focus = "side-button-label-selected"
  label_not_focus = "side-button-label"
  master: string = ""
  ngOnInit(){
    this.crud.get_admin_profile().subscribe(
      (res: any) => {
        console.log(res)
        this.master= res['profile']["master"]
        console.log(this.master)
      }
    );
  }

  route(index: number){
    console.log(index)
    this.index = index
    switch(index){
      case 1: {
        this.location.go("admin/loans");
        break;
      }
      case 2: {
        this.location.go('admin/slopes');
        break;
      }
      case 3: {
        this.location.go('admin/reserves');
        break;
      }
      case 4: {
        this.location.go('admin/books');
        break;
      }
      case 5: {
        this.location.go('admin/authors');
        break;
      }
      case 6: {
        this.location.go('admin/generes');
        break;
      }
      case 7: {
        this.location.go('admin/historial');
        break;
      }
      case 8: {
        this.location.go('admin/advices');
        break;
      }
      case 9: {
        this.location.go('admin/alumn-accounts');
        break;
      }
      case 10: {
        this.location.go('admin/logs');
        break;
      }
      case 11: {
        this.location.go('admin');
        break;
      }
      case 12: {
        this.location.go('admin/admin-accounts');
        break;
      }
      case 13: {
        this.location.go('admin/libraries');
        break;
      }
    }
  }
}
