import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from './recipes/recipe.model';
import { FormGroup } from '@angular/forms';
import { RecipeService } from './service/recipe.service';
import {exhaustMap, map,take,tap} from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  Recepies: Recipe[] = [];

  constructor(private http: HttpClient, private recepieService: RecipeService, private authService: AuthService) { }

  postData(){
    const recepies = this.recepieService.Recepies;

    this.http.put('https://recepie-book-de551-default-rtdb.firebaseio.com/recepies.json',recepies).subscribe(
      responseData => {
        console.log("save recepie data",responseData);
      }
    )
   
  }

  fetchData(){

    //console.log("token", user)
    return  this.http.get<Recipe[]>('https://recepie-book-de551-default-rtdb.firebaseio.com/recepies.json')
  .pipe(
    map( recepies => {
      return recepies.map(recepie => {
        return{
          ...recepie,
          ingredients: recepie.ingredients? recepie.ingredients: []
        };
      });
    }
 
    ),
    tap(recepies => {
     this.recepieService.fetchData(recepies);
    })
    )
  }


}
