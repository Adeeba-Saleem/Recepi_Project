import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { User } from './user.model';

interface auth{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private setTimeOut: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email:string,password:string){
    return this.http.post<auth>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsCj6umQPsS9aTfdMO51KALFIhNDJkrKM",
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(
      catchError(error => {
        console.log(error);
        let errorMessage = 'Error is unknown';
        if(!error.error || !error.error.error){
          return throwError(errorMessage)
        }
        switch(error.error.error.message){
          case 'EMAIL_EXISTS' :
            errorMessage = 'The email is already exists';
        }
        return throwError(errorMessage);
      }),
      tap(resData => {
       this.AuthenticationHandling(resData.email,resData.localId,resData.idToken,resData.expiresIn);
      })
    )
  }

  login(email:string,password:string){

   return this.http.post<auth>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsCj6umQPsS9aTfdMO51KALFIhNDJkrKM",{
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(
      catchError(error => {
        console.log(error);
        let errorMessage = 'Error is unknown';
        if(!error.error || !error.error.error){
          return throwError(errorMessage)
        }
        switch(error.error.error.message){
          case 'INVALID_PASSWORD' :
            errorMessage = 'Password is invalid';
            break;
          case 'EMAIL_NOT_FOUND' :
            errorMessage = 'Email is incorrect'; 
            break;
        }
        return throwError(errorMessage);
      }),
      tap(resData => {
       this.AuthenticationHandling(resData.email,resData.localId,resData.idToken,resData.expiresIn);
      })
      
    )
  }

logout(){
  this.user.next(null);
  this.router.navigate(['/auth']);
  localStorage.removeItem('userData');

  if(this.setTimeOut){
    clearTimeout(this.setTimeOut);
  }
  this.setTimeOut = null;
}

autoLogout(timeoutSeconds:number){
 this.setTimeOut = setTimeout(() => {
    this.logout()
  },timeoutSeconds)
}

  AuthenticationHandling(email:string,localId:string,idToke:string,expiresIn:string){
    const expirationDate = new Date(new Date().getTime()+ +expiresIn + 1000);
    const user = new User(email,localId,idToke,expirationDate)
    this.user.next(user);
    this.autoLogout(+expiresIn*1000)
    localStorage.setItem('userData',JSON.stringify(user));
    // console.log("token id", idToke)
  }

  autoLogin(){
    const userData: {email:string,id:string,_token:string,_expirationDate:string} = JSON.parse(localStorage.getItem('userData'))

    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._expirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const logoutExpiraionTime = new Date(userData._expirationDate).getTime()- new Date().getTime()
      this.autoLogout(logoutExpiraionTime); 
    }

  }

  
}
