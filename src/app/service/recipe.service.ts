import { Injectable,EventEmitter } from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
Recepies: Recipe[] = [
  new Recipe('hi','hello','https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',[
    new Ingredient('2hsbhd',10),
    new Ingredient('ddd',25)
  ])
]; 
SelectedRecipe= new EventEmitter<Recipe>();

  constructor() { }

  displayDetail(reci : Recipe){
  this.SelectedRecipe.emit(reci);
  // console.log(this.SelectedRecipe)
  }

  fetchData(recepie: Recipe[]){
    this.Recepies = recepie;
  }

  getRecpieById(index:number){
   return this.Recepies[index]
  }

  AddRecepie(recepie:Recipe){
    this.Recepies.push(
      recepie
    )
  }

  updateRecepie(index:number,recepie: Recipe){
    this.Recepies[index] = recepie;
  }

  DeleteIngrediant(indexRec:number,indexIng:number){
    this.Recepies[indexRec].ingredients.splice(indexIng,1);

    
  }
  DeleteRecepie(index:number){
    this.Recepies.splice(index,1);
  }
}
