
/*
const second = () => {

    setTimeout( () => {
        console.log('Async Hey There');
    }, 2000);
}


const first = () => {
    console.log('Hey There');
    second();
    console.log('The end');
}

first();
*/

/*
function getRecipe() {
    //SetTimeout simulates a REST call
    setTimeout( () => {
        const recipeID = [523, 883, 432, 974];
        console.log(recipeID);

        setTimeout( (id) => {
            const recipe = {
                title: 'Fresh tomato pasta', 
                publisher: 'Jonas'};
            console.log(`${id}: ${recipe.title}`);

            setTimeout( (publisher) => {
                const recipe = {
                    title: 'Italian Pizza',
                    publisher: 'Jonas'
                };
                console.log(recipe);
            }, 1500, recipe.publisher);
        }, 1500, recipeID[2]);

    }, 1500);
}
getRecipe();

*/

const getIDs = new Promise( (resolve, reject) => {

    setTimeout( () => {
        resolve([523, 883, 432, 974]);
        // reject("Simulated error");
    }, 1500);
});

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = {
                title: 'Fresh tomato pasta', 
                publisher: 'Jonas'};
            resolve(recipe);
        }, 1500, recID);
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {
                title: 'Italian Pizza',
                publisher: 'Jonas'
            };
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
}

/*
//IDs is the array at resolve
getIDs
.then((IDs) => {
    console.log(IDs);
    return getRecipe(IDs[2]);
}).then(recipe => {
    console.log(recipe);
    return getRelated(recipe.publisher);
}).then(recipe => {
    console.log(recipe);
}).catch(error => {
    console.log(error);
});

*/

/*
async function getRecipesAW() {
    const IDs = await getIDs;
    console.log(IDs);

    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);

    const related = await getRelated(recipe.publisher);
    console.log(related);

    //If we return from here, we return a pending promise

    return related;
}
let r = getRecipesAW();
console.log(r);             //Promise pending

r.then(related => {
    console.log("Finished");
    console.log(related);
});

*/

/**********************Fetch data
 * Previously we used XmlHttpRequest
 * Modern js uses fetch
*/

// Fails unless Cross Origin Resource Sharing (CORS) policy

/*
function getWeather(woeid) {
    fetch(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
        ).then(result => {
            console.log(result);
            return result.json();       //Returns promise
        }).then(data => {

            //data is undefined on error,
            const today = data.consolidated_weather[0];
            
            console.log(
`Temperatures in \
${data.title} stay between ${today.min_temp} \
and ${today.max_temp}`);
    
        }).catch(error => {
            console.log(error);
        });
}

getWeather('2487956');
getWeather('44418');
// getWeather('43242342345');      //Error

*/

async function getWeatherAW(woeid) {

    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);

        if(result) {
            const data = await result.json();
            // console.log(data);
            const today = data.consolidated_weather[0];
            console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`);

            return data;
        }
    } catch(error) {
        console.log(error);
    }
}

// Wont work, getWeather return a promise
// const dataLondon = getWeatherAW('44418');

getWeatherAW('44418').then(data => {console.log(data)});