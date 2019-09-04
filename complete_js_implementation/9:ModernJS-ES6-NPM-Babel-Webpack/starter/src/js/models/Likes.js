export default class Likes {
    constructor() {
        this.likes = new Map();
    };

    addLike(id, title, author, image) {

        const like = {
            title,
            author,
            image
        };
        this.likes.set(id, like);

        //Persist data in localStorage
        this.persistData();

        return [id, like];
    };

    removeLike(id) {
        if(this.likes.has(id)) {
            this.likes.delete(id);
        };

        //Remove from localStorage
        this.persistData();
    };

    isLiked(id) {
        return this.likes.has(id);
    }

    getNumLikes() {
        return this.likes.size;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(Array.from(this.likes.entries())));
    }

    loadData() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        if(storage) {
            this.likes = new Map(storage);
        }
    }
};