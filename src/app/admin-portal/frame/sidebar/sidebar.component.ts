import { Component, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  constructor(private router: Router,
              private location: Location){}
  public index: Number = 0;
  button_focus = "side-button-selected"
  button_not_focus = "side-button"
  label_focus = "side-button-label-selected"
  label_not_focus = "side-button-label"
  route(index: number){
    console.log(index)
    this.index = index
    switch(index){
      case 1: {
        this.location.go("admin/loans");
        break;
      }
      case 2: {
        this.location.go('admin/returns');
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
        this.location.go('admin/admin-accounts');
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
