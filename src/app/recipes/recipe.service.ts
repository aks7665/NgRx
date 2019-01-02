import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions'; 
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from '../../../node_modules/rxjs';
import { Store } from '../../../node_modules/@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  private recipes:Recipe[] = [
    new Recipe('Test Recipe','This is test recipe description','https://www.w3schools.com/htmL/pic_trulli.jpg',[new Ingredient("Corn", 10),new Ingredient("Sugar",5)]),
    new Recipe('Test Recipe2','This is test recipe description','https://www.w3schools.com/htmL/pic_trulli.jpg',[new Ingredient("Buns", 10),new Ingredient("Cheese",5)])
  ];

  constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients : Ingredient[]}}>) { }

  getRecipe () {
    return this.recipes.slice();
  }

  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipeSingle (index : number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
     this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number,newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}