import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients : Ingredient[] = [];
  editIngrediant = new Subject<number>();

  constructor() { }

  AddShoppingDetails(ingediant: Ingredient){
    this.ingredients.push(
      ingediant
    )
  }
  AddShoppingList(ingrediant: Ingredient[]){
    this.ingredients.push(...ingrediant)
    console.log(ingrediant);
  }

  getIngrediantById(index:number){
    return this.ingredients[index]    
  }

  updateshoppingDetail(index:number,newIngrediant: Ingredient){
    this.ingredients[index] = newIngrediant;
  }

  deletingDetail(index:number){
    this.ingredients.splice(index,1);
  }
}
