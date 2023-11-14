import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router){}

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
