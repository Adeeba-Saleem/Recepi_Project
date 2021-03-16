import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../service/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

 //@Output() recepieDetail = new EventEmitter<Recipe>();

  constructor(public recipeService: RecipeService) { }

  recipes: Recipe[] = [];


  ngOnInit(): void {
     this.recipes = this.recipeService.Recepies;
  }


}
