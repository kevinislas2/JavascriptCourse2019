"use strict";

import axios from 'axios';
import {apiURL, apiKey} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    };

    async getRecipe() {
        try {
            const res = await axios(`${apiURL}/get?key=${apiKey}&rId=${this.id}`);
            // const res = await axios('http://www.mocky.io/v2/5d6df6dc30000048c38fbd20');
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

            this.calcTime();
            this.calcServings();
            this.parseIngredients();
        } catch(error) {
            alert(error);
        };
    };

    calcTime() {
        //Assuming 15 minutes per three ingredients
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;
    };

    calcServings() {
        this.servings = 4;
    };

    parseIngredients() {
        const tableSpoon = 'tbsp';
        const ounce = 'oz';
        const teaspoon = 'tsp';
        const cup = 'cup';
        const pound = 'pound';
        const g = 'g';
        const kg = 'kg';

        const unitDictionary = new Map();
        unitDictionary.set('tablespoons', tableSpoon);
        unitDictionary.set('tablespoon', tableSpoon);
        unitDictionary.set('ounce', ounce);
        unitDictionary.set('ounces', ounce);
        unitDictionary.set('teaspoon', teaspoon);
        unitDictionary.set('teaspoons', teaspoon);
        unitDictionary.set('cups', cup);
        unitDictionary.set('pounds', pound);
        unitDictionary.set('g', g);
        unitDictionary.set('kg', kg);

        const units = new Set(unitDictionary.values());

        const newIngredients = this.ingredients.map(el => {

            // 1) Uniform units
            let ingredientString = el.toLowerCase();
            const ingredientStringParsedArray = [];

            let openParenthesis = 0;
            for(let word of ingredientString.split(' ')) {
                
                const wordNoParenthesis = [];
                for(let char of word) {
                    //Ignore strings inside a parenthesis
                    if(char === '(') {
                        ++openParenthesis;
                    } else if(char === ')') {
                        --openParenthesis;
                    } else if(openParenthesis === 0) {
                        wordNoParenthesis.push(char);
                    };
                };
                const processedWord = wordNoParenthesis.join('');
                if(openParenthesis === 0 && processedWord) {
                    ingredientStringParsedArray.push(unitDictionary.get(processedWord) || processedWord);
                };
            };
            // ingredientString = ingredientStringParsedArray.join(' ');
            // 3) Parse ingredients into count, unit and ingredient
            // We use eval which may be insecure
            // A recipe may execute malicious code

            const unitsIndex = ingredientStringParsedArray.findIndex(el2 => {
                return units.has(el2);
            });
            
            let count = 0;
            let countIndexes = [];
            let temp;

            //if we have units then process previous elements to find
            if(unitsIndex > - 1) {
                try {
                    for(let i = unitsIndex-1; i >= 0; --i) {
                        if(temp = parseFloat(eval(ingredientStringParsedArray[i]))) {
                            count += temp;
                            countIndexes.push(i);
                        };
                    };
                } catch(error) {
                    //eval encountered a string
                };
            } else {
                //Search in first two elements
                try {
                    for(let i = 0; i < 2; ++i) {
                        if(temp = parseFloat(eval(ingredientStringParsedArray[i]))) {
                            count += temp;
                            countIndexes.push(i);
                        };
                    };
                } catch(error) {
                    //eval encountered a string
                };
            };

            let objIngredient = {
                count: count ? count : 1,
                unit: unitsIndex > -1 ? ingredientStringParsedArray[unitsIndex] : '',
                ingredient: '',
            };
            // Get ingredient
            let ingredientArray = [];
            for(let i = 0; i < ingredientStringParsedArray.length; ++i) {
                if(i !== unitsIndex && !countIndexes.includes(i)) {
                    ingredientArray.push(ingredientStringParsedArray[i]);
                };
            };
            objIngredient.ingredient = ingredientArray.join(' ');

            return objIngredient;
        });
        this.ingredients = newIngredients;
    };

    updateServings(type) {
        //Servings

        let newServings = this.servings;
        switch(type) {
            case 'dec':
                --newServings;
                break;
            case 'inc':
                ++newServings;
                break;
            default:
                console.log(`unknown update servings type ${type}`);
        };

        if(newServings !== 0) { 
            //Ingredients
            this.ingredients.forEach(ingredient => {
                ingredient.count *= (newServings / this.servings);
            });
            // this.time *= (newServings / this.servings);
            this.servings = newServings;
        } else {
            alert('Can\`t set servings to 0!');
        };
    };
};