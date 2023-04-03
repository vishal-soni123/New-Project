import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { MustMatch } from '../passmatch/must-match.validator';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private router: Router) { 
    const Temp:any = localStorage.getItem('data');
    console.log(Temp)
    if(Temp!=null){ 
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['Registration']);
    }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          gender: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
         
      },{
        validator: MustMatch('password', 'confirmPassword')
    });
  }

 
  get f() { return this.registerForm.controls; }
  x:any=[];
  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }else{
        this.x.push(this.registerForm.value);
        localStorage.setItem('data',JSON.stringify(this.x));
        const Temp:any = localStorage.getItem('data');
        alert("Register Successfull");
        console.log(Temp)
        if(Temp!=null){
          this.x=JSON.parse(Temp);
        }
        this.router.navigate(['/']);
      }
      
      console.log(this.registerForm.value)
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }


}
