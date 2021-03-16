import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './service/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverDataService implements Resolve<Recipe[]> {

 
   constructor(private service: DataStorageService, private reService: RecipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recepies = this.reService.Recepies;

    if(recepies.length === 0){
      return this.service.fetchData()
    }else{
      return recepies;
    }
  
  }
}
