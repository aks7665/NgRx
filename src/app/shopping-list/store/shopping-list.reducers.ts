import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from './../../shared/ingredient.model';
import { Action } from "@ngrx/store";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

const initialState = { 
    ingredients : [
        new Ingredient('Apples', 150),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
}; 

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions ) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload] 
            };
        case ShoppingListActions.ADD_INGREDIENTS: 
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload] 
        };
        case ShoppingListActions.UPDATE_INGREDIENT: 
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[action.payload.index] = updatedIngredient
            return {
                ...state,
                ingredients: ingredients 
        };
        case ShoppingListActions.DELETE_INGREDIENT: 
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(action.payload, 1);
            return {
                ...state,
                ingredients: oldIngredients 
        };
        case ShoppingListActions.START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload 
        };
        default: 
        return state;
    }
} 