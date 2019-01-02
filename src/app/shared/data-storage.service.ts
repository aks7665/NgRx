import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: Http,private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://ngrecipebook-as.firebaseio.com/recipe.json',this.recipeService.getRecipe());  
  }

  getRecipes() {
    // return this.http.put('https://ngrecipebook-as.firebaseio.com/recipe.json',this.recipeService.getRecipe());  
    this.http.get('https://ngrecipebook-as.firebaseio.com/recipe.json').map(
      (response: Response) => { 
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes) {
          if(!recipe['ingredients']) {
            recipe['ingredients'] = [];
            // console.log(recipe);
          }
        }
        return recipes;
      }
    ).subscribe(
      (recipes :Recipe[]) => {
        this.recipeService.setRecipe(recipes);
      }
    )
  }

}
