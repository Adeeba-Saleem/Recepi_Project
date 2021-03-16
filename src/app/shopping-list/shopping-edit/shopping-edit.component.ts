import { Component, OnInit, Output , EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import{ShoppingService} from '../../service/shopping.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  selectedEditedItem: number;
  editMode = false;
  popEditItem: Ingredient;
@ViewChild('f') popForm: NgForm;
// @Output() shoppingList = new EventEmitter<Ingredient>();
//@ViewChild('nameInput') nameRef: ElementRef;
//@ViewChild('amountInput') amountRef: ElementRef;

  constructor(private shoppingService: ShoppingService) { 
  }

  ngOnInit(): void {
   
    this.shoppingService.editIngrediant.subscribe(
      (index:number) => {
        console.log(index);
        this.editMode = true;
        this.selectedEditedItem = index;
        this.popEditItem = this.shoppingService.getIngrediantById(this.selectedEditedItem);
        console.log(this.popEditItem);
        this.popForm.setValue({
          name: this.popEditItem.name,
          amount: this.popEditItem.amount
        })
      }
    )
 
  }

  AddShoppingList(form:NgForm){
    // const names = name.value;
    // const amounts = amount.value;
    //  const  shoppingItem = new Ingredient(name,amount)
    // this.shoppingList.emit(
    //   shoppingItem
    // )
    if(!this.editMode){
      this.shoppingService.AddShoppingDetails(form.value);
      this.reset(form);
     console.log(form)
    }else{
      this.shoppingService.updateshoppingDetail(this.selectedEditedItem,form.value);
      this.reset(form);
      this.editMode = false;
    }
  }

  reset(form:NgForm){
    form.reset();
  }

  deleteItem(form:NgForm){
    this.shoppingService.deletingDetail(this.selectedEditedItem);
    this.reset(form)
  }



}
