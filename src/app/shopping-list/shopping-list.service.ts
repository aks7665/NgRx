import { Ingredient } from '../shared/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  startedEditing = new Subject<number>();

  private ingredients:Ingredient[] = [
  new Ingredient("Apples",10),
  new Ingredient("Tomato",5),
  new Ingredient("Banana",8)];

  constructor() { }
  ingredientChanged = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredient : Ingredient[]) {
    this.ingredients.push(...ingredient); // spread operator used to convert array into list
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
