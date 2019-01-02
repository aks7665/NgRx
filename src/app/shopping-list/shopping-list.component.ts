
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { Observable } from '../../../node_modules/rxjs';
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions'; 

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
 
  constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients : Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList')
    // this.slService.ingredientChanged.subscribe(
    //   (ingredients: Ingredient[]) => { 
    //     this.ingredients = ingredients;
    //    }
    // )
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
