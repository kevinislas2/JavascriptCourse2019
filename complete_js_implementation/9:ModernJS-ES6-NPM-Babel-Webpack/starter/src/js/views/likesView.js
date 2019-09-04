import {elements, limitRecipeTitle} from './base';

export const toggleLikeBtn = isLiked => {

    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'; 

    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikesMenu = numLikes => {

    elements.likesMenuHTML.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (id, like) => {
    const markup = 
    `
    <li>
        <a class="likes__link" href="#${id}">
            <figure class="likes__fig">
                <img src="${like.image}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;

    elements.likeList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const element = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;

    if(element) {
        element.parentElement.removeChild(element);
    }
}