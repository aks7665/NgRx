import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {
  
  recipes:Recipe[];
  subscription: Subscription;

  constructor(private recipeService:RecipeService, private router:Router, private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipe: Recipe[]) => { 
        this.recipes = recipe 
      } 
    );
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.aRoute});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
