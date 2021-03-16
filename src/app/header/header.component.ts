import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../data-storage.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../service/recipe.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  userObs: Subscription;
//  @Output() selectedFeature = new EventEmitter<string>();

  constructor(private service : DataStorageService ,private authService: AuthService) { }
  ngOnDestroy(): void {
   this.userObs.unsubscribe()
  }

  logout(){
    this.authService.logout()
  }

  ngOnInit(): void {
   this.userObs = this.authService.user.subscribe(user=> {
      this.isAuthenticated = !user ? false : true;
      console.log("Authenticated user login(true) or logout(false)",this.isAuthenticated);
    })
  }

  // onSelect(feature: string){
  //   this.selectedFeature.emit(
  //     feature
  //   )
  // }

  saveData(){
    this.service.postData()
  }

  fetchData(){
    this.service.fetchData().subscribe()
   
  }

}
