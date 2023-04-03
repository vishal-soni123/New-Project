import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {  Router, Route } from '@angular/router';
import { MustMatch } from '../passmatch/must-match.validator';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  submitted = false;editForm!: FormGroup;
  hidden:boolean =false;
  onedit:boolean=false;
  x:any=[];
  constructor(private formBuilder: FormBuilder,private router: Router) {

    const Temp:any = localStorage.getItem('data');
    console.log(Temp)
    if(Temp!=null){
      this.x=JSON.parse(Temp);
    }else{
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
      this.editForm = this.formBuilder.group({
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
  get f() { return this.editForm.controls; }


  onReset() {
      this.submitted = false;
      this.editForm.reset();
  }

  delete(data:any,index:any){
    this.x.splice(index,1);
    localStorage.setItem('data',JSON.stringify(this.x)); 
   }
   editID:number | undefined;
   edit(data:any, valID:any){
    this.hidden= true;
    this.editID = valID;
  
    if(data!=null){
      this.editForm.patchValue({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        gender:data.gender,
        password:data.password,
        confirmPassword:data.confirmPassword
      })
    }else{
      this.editForm.patchValue({
      
      })
    }
    console.log(this.editForm.value)
   }
  index!:number;
  
   save(data:any,item:any){
    this.submitted = true;

    if (this.editForm.invalid) {
        return;
    }else{
      this.index=item;
      this.onedit=true;
      let y = data;

      if(this.onedit==true){
        this.x.splice(this.index,1,this.editForm.value);
        console.log(this.x);
        localStorage.setItem('data',JSON.stringify(this.x)); 
      
      }
      console.log(this.editForm.value)

    }
   }

}
