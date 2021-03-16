import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from 'src/app/data-storage.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { ShoppingService } from 'src/app/service/shopping.service';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
id: number;
editMode = false;
recepie: Recipe;
recepieForm: FormGroup;

  constructor(private route: ActivatedRoute,private recepieService:RecipeService , private ingrediantService: ShoppingService
    ,private storageServive: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; 
        console.log(this.editMode);
        this.recepieForms()
       
      }
    )
  
  }

  private recepieForms(){
    let rName = '';
    let rImage='';
    let rDescrpition='';
    let rIngrediants = new FormArray([]);
    

    if(this.editMode){
      this.recepie = this.recepieService.getRecpieById(this.id);
      console.log("to get edit recepie",this.recepie)
      rName = this.recepie.name;
      rImage = this.recepie.imagePath;
      rDescrpition = this.recepie.description;

      if(this.recepie['ingredients']){
        for(let ingrediant of this.recepie.ingredients){
          rIngrediants.push(
            new FormGroup({
              name: new FormControl(ingrediant.name,Validators.required),
              amount: new FormControl(ingrediant.amount,[,Validators.required,Validators.pattern("^[1-9]+[0-9]*$")])
            })
          )
        }
      }

    }
    this.recepieForm = new FormGroup({
      name : new FormControl(rName,Validators.required),
      imagePath:new FormControl(rImage,Validators.required),
      description: new FormControl(rDescrpition,Validators.required),
      ingredients: rIngrediants,
     
    })
  }

  onSubmit(){
    if(!this.editMode){
      console.log(this.recepieForm)
      this.recepieService.AddRecepie(this.recepieForm.value)
    }else{
    //alert("editForm")
    this.recepieService.updateRecepie(this.id,this.recepieForm.value);
    console.log(this.recepieForm)
    }   
    
  }

  get controls() { // a getter!
    return (<FormArray>this.recepieForm.get('ingredients')).controls;
  }

  AddIngrediant(){
    (<FormArray>this.recepieForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    )
  }

  delete(index: number){
    console.log(index);
  (<FormArray>this.recepieForm.get('ingredients')).removeAt(index);
  }

  reset(){
    this.recepieForm.reset()
  }

}
