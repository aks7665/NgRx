import * as ShoppingListActions from './../store/shopping-list.actions';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';
import { Store } from '../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients : Ingredient[]}}>) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index : this.editedItemIndex, ingredient: newIngredient z}));
    } else {
      // this.slService.addIngredient(newIngredient); 
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset(); 
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
