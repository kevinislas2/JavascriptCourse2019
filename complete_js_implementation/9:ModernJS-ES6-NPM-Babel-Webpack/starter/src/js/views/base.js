"use strict";
export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchResultList : document.querySelector('.results__list'),
    searchResults : document.querySelector('.results'),
    resultsPages : document.querySelector('.results__pages'),
    recipeHTML : document.querySelector('.recipe'),
    shoppingListHTML : document.querySelector('.shopping__list'),
    likesMenuHTML : document.querySelector('.likes__field'),
    likeList : document.querySelector('.likes__list'),
};

export const elementDOMStrings = {
    loader: 'loader',
    ingredientList : 'recipe__ingredient-list',
};

export const renderLoader = (parentElement) => {
    const loader = `
        <div class="${elementDOMStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parentElement.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    let loader = document.querySelector(`.${elementDOMStrings.loader}`);

    if(loader) {
        //Apparently this may not be supported
        // loader.remove();

        loader.parentElement.removeChild(loader);
    };
};

export const limitRecipeTitle = (title, limit = 17) => {

    if(title.length > limit) {
        const newTitle = [];
        title.split(' ').reduce( (acc, current) => {
            if(acc + current.length <= limit) {
                newTitle.push(current);
            };
            return acc + current.length;
        }, 0);

        return newTitle.join(' ') + '...';
    };
    return title;
};