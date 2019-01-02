import { Ingredient } from './../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions'; 

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe; 
  id: number;

  constructor(private recipeService: RecipeService,private aRoute: ActivatedRoute,private router: Router, private store: Store<{shoppingList: {ingredients : Ingredient[]}}>) { }

  ngOnInit() {
    const id  = this.aRoute.params.subscribe(
      (params :Params) => {
        this.id = params['id'];
        this.recipe = this.recipeService.getRecipeSingle(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo: this.aRoute})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
