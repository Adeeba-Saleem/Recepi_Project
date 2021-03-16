import { Component, OnInit } from '@angular/core';
import{Recipe} from './recipe.model';
import{RecipeService} from '../service/recipe.service'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  //SelectedRecipe: Recipe;
 
  constructor(public RecipeService: RecipeService) { }

  ngOnInit(): void {
    //this.RecipeService.SelectedRecipe = this.SelectedRecipe;
  }

  // displayDetail(reci : Recipe){
  //   this.SelectedRecipe = reci;
  // }

}
