import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '../../../../node_modules/@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm : FormGroup;

  constructor(private aroute:ActivatedRoute, private recipeService: RecipeService, private router:Router, private aRoute: ActivatedRoute) { }

  ngOnInit() { 
    this.aroute.params.subscribe(
      (params : Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['descripton'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.aroute});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required])
      })
    )
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDesc = "";
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipeSingle(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if(recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.aroute});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
