import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HeadersModule {
  public getCustomHeaders(): any {
    var token = localStorage.getItem("token_admin");
    if(token != null){
      let headers = new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "token":  token
      });
      return headers
    }
  }
}
