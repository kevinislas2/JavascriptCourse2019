"use strict";

import axios from 'axios';
import {apiURL, apiKey} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    };
    
    async getSearchResults() {
        try {
            const res = await axios(`${apiURL}/search?key=${apiKey}&q=${this.query}`);
            // const res = await axios('http://www.mocky.io/v2/5d6df62d3000003ed18fbd1c');
            this.result = res.data.recipes;
        } catch(error) {
            alert(error);
        };
    };
};