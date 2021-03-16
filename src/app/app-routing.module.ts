import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SelectRecipeComponent } from './recipes/select-recipe/select-recipe.component';
import { ResolverDataService } from './resolver-data.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'',redirectTo:'/recipes',pathMatch:'full'},
  {path:'recipes',component: RecipesComponent,children:[
    {path:'',component:SelectRecipeComponent, resolve: [ResolverDataService] },
    {path:'new',component:EditRecipeComponent, resolve: [ResolverDataService]},
    {path:':id',component:RecipeDetailComponent, resolve: [ResolverDataService]},
    {path:':id/edit',component:EditRecipeComponent,resolve: [ResolverDataService]},
  ]},
  {path:'shopping-list',component:ShoppingListComponent},
  {path:'auth',component:AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
