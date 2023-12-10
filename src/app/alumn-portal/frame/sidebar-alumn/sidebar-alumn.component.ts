import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-sidebar-alumn',
  templateUrl: './sidebar-alumn.component.html',
  styleUrls: ['./sidebar-alumn.component.css']
})
export class SidebarAlumnComponent {
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
        this.location.go("alumn/home");
        break;
      }
      case 2: {
        this.location.go('alumn/books');
        break;
      }
      case 3: {
        this.location.go('alumn/loans');
        break;
      }
    }
  }
}
