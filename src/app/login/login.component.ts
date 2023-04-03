import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {  Router, Route } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  x:any=[];
  constructor(private formBuilder: FormBuilder,private router: Router) {
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

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }else{
        const Temp:any = localStorage.getItem('data');
        if(Temp==null){alert("Please Register")}
        this.x.forEach((value:any) => {
            if(value.email==this.loginForm.value.email && value.password==this.loginForm.value.password){
              this.router.navigate(['home']);
            }else{
              this.router.navigate(['/']);
              alert("Your details not matching");           
            }
        });
      }
      console.log(this.loginForm.value);
  }

  onReset() {
      this.submitted = false;
      this.loginForm.reset();
  }


}
