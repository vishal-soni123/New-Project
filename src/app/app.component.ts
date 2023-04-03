import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'task';
  x:any=[];
  constructor() {
    const Temp:any = localStorage.getItem('data');
    console.log(Temp)
    if(Temp!=null){
      this.x=JSON.parse(Temp);
      this.x.forEach((value:any) => {
     
        console.log(       value.email,
          value.password);
      });
    }
   }
  
  signout(){
    localStorage.removeItem('data');
    localStorage.clear();
  }
}
