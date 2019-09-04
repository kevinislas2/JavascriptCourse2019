// Global app controller

// Our API is https://www.food2fork.com/
//8372655ca96ec6d2b9f864760bc22d1e

// We definitely should not expose the API key within the public
// js

// Search URL
// https://www.food2fork.com/api/search
"use strict";

import Search from './models/Search';
import Recipe from "./models/Recipe";
import ShoppingList from './models/ShoppingList';
import Likes from './models/Likes';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likesView from './views/likesView';

import {elements, renderLoader, clearLoader} from './views/base';

//State pattern
//State library
// https://redux.js.org/ 
// Redux + React

/** Global state of the app 
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const state = {
    search : undefined,
    recipe : undefined,
    list : undefined,
    likes : undefined
};

function initializeEventListeners() {

    elements.searchForm.addEventListener('submit', event => {
        event.preventDefault();
        controlSearch();
    });

    elements.resultsPages.addEventListener('click', event => {
        
        const btn = event.target.closest('.btn-inline');
        
        if(btn) {

            //HTML 5 -data-tag=value
            const goToPage = parseInt(btn.dataset.goto, 10);
            searchView.clearResults();
            searchView.renderResults(state.search.result, goToPage);
        };
    });

    window.addEventListener('hashchange', controlRecipe);
    window.addEventListener('load', controlRecipe);

    //Handle recipe button clicks

    elements.recipeHTML.addEventListener('click', event => {

        // Matches with button decrease and all child elements
        if(event.target.matches('.btn-decrease, .btn-decrease *')) {

            if(state.recipe.servings > 1) {
                state.recipe.updateServings('dec');
                recipeView.updateServiceIngredients(state.recipe);
            };
        //Matches with button increase and all child elements
        } else if(event.target.matches('.btn-increase, .btn-increase *')){
            state.recipe.updateServings('inc');
            recipeView.updateServiceIngredients(state.recipe);
        // Add to shopping list
        } else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
            controlShoppingList();
        // Call like controller
        } else if(event.target.matches('.recipe__love, .recipe__love *')) {
            controlLike();
        };
    });

    elements.shoppingListHTML.addEventListener('click', event => {
        
        const id = event.target.closest('.shopping__item').dataset.itemid;
        if(event.target.matches('.shopping__delete, .shopping__delete *')) {
            
            state.shoppingList.deleteItem(id);

            shoppingListView.deleteItem(id);

            if(state.shoppingList.isEmpty()) {
                document.querySelector('.clear-shopping-list-btn').style.display = 'none';
            } else {
                document.querySelector('.clear-shopping-list-btn').style.display = 'inline';
            };

        } else if(event.target.matches('.shopping__count-value')) {
            const val = parseFloat(event.target.value, 10);
            
            state.shoppingList.updateCount(id, val);

            console.log(state.shoppingList);
        };
    });

    document.querySelector('.clear-shopping-list-btn, .clear-shopping-list-btn *').addEventListener('click', (event) => {
        for(let [key, item] of state.shoppingList.items) {
            state.shoppingList.deleteItem(key);
            shoppingListView.deleteItem(key);
        }
    });

    window.addEventListener("load", () => {
        state.likes = new Likes();
        state.likes.loadData();
        likesView.toggleLikesMenu(state.likes.getNumLikes());

        for(let [key, like] of state.likes.likes) {
            likesView.renderLike(key, like);
        }
    });
};

/***********Search controller */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if(query) {
        // 2) Set up search
        state.search = new Search(query);
        
        // 3) Clean previous search (View)
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            // 4) Search for recipes
            await state.search.getSearchResults();
            clearLoader();

            // // 5) Render results to UI
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert("Error searching recipes :(");
            console.log(error);
            clearLoader();
        };
    };
};

/***********Recipe controller */
const controlRecipe = async () => {

    //We should handle reloads

    //Get id from url
    const id = window.location.hash.slice(1);
    if(id) {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipeHTML);

        //HighlightSelected
        searchView.highlightSelected(id);

        //Create a new recipe object
        state.recipe = new Recipe(id);

        try {
            
            //Get recipe data
            await state.recipe.getRecipe();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(error) {
            alert("Error getting recipe:(");
            console.log(error);
        };

        if(state.likes) {
            likesView.toggleLikeBtn(state.likes.isLiked(id));
            likesView.toggleLikesMenu(state.likes.getNumLikes());
        }
    };
};

/****************Shopping List Controller */
const controlShoppingList = async () => {

    if(!state.shoppingList) {
        state.shoppingList = new ShoppingList();

        for(let ingredient of state.recipe.ingredients) {
            const [item, key] = state.shoppingList.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
            shoppingListView.renderItem(item, key);
        };
        if(!state.shoppingList.isEmpty()) {
            document.querySelector('.clear-shopping-list-btn').style.display = 'inline';
        };
    } else {
        for(let ingredient of state.recipe.ingredients) {
            const [item, key] = state.shoppingList.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
            shoppingListView.renderItem(item, key);
        };
    }
};

/*****************Likes Controller */

const controlLike = () => {

    const currentID = state.recipe.id;

    if(!state.likes.isLiked(currentID)) {
        //Add like to data
        const [id, like] = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        //Add like to UI list
        likesView.renderLike(id, like);
    } else {

        //Remove like from state
        state.likes.removeLike(currentID);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    };

    likesView.toggleLikeBtn(state.likes.isLiked(currentID));

    likesView.toggleLikesMenu(state.likes.getNumLikes());
}


initializeEventListeners();

document.querySelector('.clear-shopping-list-btn').style.display = 'none';