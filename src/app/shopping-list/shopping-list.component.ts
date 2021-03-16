import { Component, OnInit } from '@angular/core';
import{Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../service/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[] = [
  
  ]
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.ingredients  ;
  }

  EditItem(index: number){
    //console.log(index);
    this.shoppingService.editIngrediant.next(index);
  }

  // AddShoppingDetails(ingediant: Ingredient){
  //   this.ingredients.push(
  //     ingediant
  //   )
  // }

}
