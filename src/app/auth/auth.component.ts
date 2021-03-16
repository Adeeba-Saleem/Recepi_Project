import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin = true;
  isLoading=false;
  error:string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  switchMode(){
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password
    if(!form.valid){
      return;
    }
    if(this.isLogin){
      this.authService.login(email,password).subscribe(responsedata => {
        form.reset(form)
        console.log(responsedata);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes'])
      },error => {
        console.log(error)
        this.error = error;
        this.isLoading = false;
      })
    }else{
      this.authService.signup(email,password).subscribe(responsedata => {
        console.log(responsedata);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes'])
      },error => {
        this.error = error;
        this.isLoading = false;
      })
    }
      
  }

  reset(form: NgForm){
    form.reset()
  }

}
