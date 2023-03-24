import AsyncStorage from '@react-native-async-storage/async-storage';

class GlobalRecipes {
    static instance = undefined;

    static init(props) {
        if(!this.instance) {
            this.instance = new GlobalRecipesService();
            this.instance.init(props)
        }
    }
}

class GlobalRecipesService {

    user = undefined;

    allRecipes = [];

    init(props) {
        AsyncStorage.getItem("user").then((userStr) => {
            let user = JSON.parse(userStr);
            console.log("user", user);
            if(user != null && user != undefined) {
                this.user = user;
            } else {
                this.user = undefined;
            }
        })

    }

    async login(username, password) {
        user = {
            username: username
        }
        let userStr = JSON.stringify(user);
        AsyncStorage.setItem("user", userStr)
        this.user = user;

        return true;
    }

    async getNearestCities(latitude, longitude) {

        latitude = latitude + "";
        longitude = longitude + "";

        if(!latitude.includes("-")) {
            latitude = "+" + latitude;
        }

        if(!longitude.includes("-")) {
            longitude = "+" + longitude;
        }

        return fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/locations/' + latitude + longitude + '/nearbyCities?radius=100&minPopulation=100000&limit=1',{
            headers: {
                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                "X-RapidAPI-Key":"<your API key>"
            }
        })
        .then((response) => response.json()).then(async (responseJson) => {
            return responseJson;
        })
    }

    async saveRecipe(recipe) {
        if(!this.allRecipes){
            this.allRecipes = [];
        }
        recipe.id = this.allRecipes.length + 1;
        this.allRecipes.push(recipe);
        let recipesStr = JSON.stringify(this.allRecipes);
        console.log(recipesStr);
        AsyncStorage.setItem("recipes", recipesStr);
        this.picture = undefined;
        return true;
    }

    async getAllRecipes() {
        return AsyncStorage.getItem("recipes").then((recipesStr) => {
            console.log(recipesStr);
            this.allRecipes = JSON.parse(recipesStr);
            return this.allRecipes;
        });
    }

    async saveUser(user) {
        let userStr = JSON.stringify(user);
        AsyncStorage.setItem("user", userStr);
        this.user = user;
        return true;
    }
}

export default GlobalRecipes;