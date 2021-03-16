import { Component, Input, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import{RecipeService} from '../../service/recipe.service'
import{Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../../service/shopping.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

 
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

//@Input() rescipe: Recipe;
rescipe: Recipe;
id: number;

  ngOnInit(): void {
    // const recipeId = +this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.rescipe = this.recipeService.getRecpieById(this.id);
        console.log(this.rescipe)
      }
    )
    //  this.recipeService.SelectedRecipe.subscribe(
    //    (data: Recipe) => {
    //     // console.log(data);
    //      this.rescipe = data;
    //    }
    //  )
    // alert(this.rescipe);
  }
  
  getShoppingList(ing:Ingredient[]){
    //console.log(ing);
  //  ing.forEach((element) => {
  //    this.shoppingService.AddShoppingDetails(element);
  //    alert(element.name);
  //  })
  this.shoppingService.AddShoppingList(ing);
  }

  editRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  deleteRecepie(){
    console.log(this.id)
    this.recipeService.DeleteRecepie(this.id);
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  constructor(private recipeService: RecipeService, private shoppingService : ShoppingService, private route: ActivatedRoute,
    private router: Router ){}



}
