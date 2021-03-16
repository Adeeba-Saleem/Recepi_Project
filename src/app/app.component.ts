import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authSerice: AuthService){}  

  ngOnInit(): void {
   this.authSerice.autoLogin();
  }
  title = 'shopping-project';
  feature: string = 'recipe';

  onNavigate(feature: string){
    this.feature = feature;
  }


}
