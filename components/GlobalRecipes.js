import AsyncStorage from '@react-native-async-storage/async-storage';

const backendUrl = 'http://10.0.0.224:8080/api/';

const appName = "globalRecipes"

const tokenPrefix = '&csrf=';

const pagePrefix = '&page=';

class GlobalRecipes {
    static instance = undefined;

    token = undefined;
    user = undefined;
    userEdited = false;

    static init(props) {
        if(!this.instance) {
            this.instance = new GlobalRecipesService();
            this.instance.init(props)
        }
    }

    static login(username, password) {
        var _this = this;
        console.log(backendUrl + "authenticate");
        return fetch(backendUrl + "authenticate", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                rememberMe: true
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                _this.instance =  new GlobalRecipesService();
                _this.instance.token = responseJson.id_token;

                console.log('tokens', _this.instance.token);

                return fetch(backendUrl + 'account',{
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + _this.instance.token
                    }
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);

                        console.log("good to go")

                        if((responseJson)&&(responseJson.login)){
                            AsyncStorage.setItem('@userstore:user',JSON.stringify(responseJson) + '');
                            AsyncStorage.setItem('@userstore:token',GlobalRecipes.instance.token);
                            GlobalRecipes.instance.user = responseJson;
                            GlobalRecipes.instance.userEdited = true;

                            console.log("good to go 2")
                            return responseJson;
                        }else{
                            return false;
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    static register(username, password, email) {

        return fetch(backendUrl + "register", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: username,
                password: password,
                email: email
            })
        })
            .then((response) => {
                console.log(response);

                if(response.ok == false){
                    console.log(response.headers.map);
                    if(response.headers && response.headers.map){
                        console.log(response.headers.map['x-' + appName + '-error']);
                        if(response.headers.map['x-' + appName + '-error'] === "Email is already in use!"){
                            throw "EMAIL EXISTS"
                        }else{
                            throw "LOGIN EXISTS"
                        }
                    }
                }

                return response;
            })
            .catch((error) => {
                return {
                    error: true,
                    type: 'backend',
                    message: error
                }
            });
    }

    static account(token){
        var _this = this;
        return fetch(backendUrl + 'account',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                if((responseJson)&&(responseJson.login)){
                    _this.instance =  new GlobalRecipesService();
                    _this.instance.token = token;
                    AsyncStorage.setItem('@userstore:user',JSON.stringify(responseJson) + '');
                    AsyncStorage.setItem('@userstore:token',token);
                    GlobalRecipes.instance.user = responseJson;
                    GlobalRecipes.instance.userEdited = true;
                    return responseJson;
                }else{
                    return false;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

class GlobalRecipesService {

    user = undefined;
    token = undefined;

    allRecipes = [];

    init(props) {
        let _this = this;
        AsyncStorage.getItem("@userstore:user").then((userStr) => {
            
            if(userStr) {
                let user = JSON.parse(userStr);
                console.log("@userstore:user", user);
                if(user != null && user != undefined) {
                    _this.user = user;
                } else {
                    _this.user = undefined;
                }

                AsyncStorage.getItem("@userstore:token").then((token) => {
                    console.log("@userstore:token", token);
                    if(token != null && token != undefined) {
                        _this.token = token;
                    } else {
                        _this.token = undefined;
                    }
                });
            }
        });
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
                "X-RapidAPI-Key":"<your RapidAPI Key>"
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
        let _this = this;
        return fetch(backendUrl + 'recipes',{
            method: 'POST',
            body: JSON.stringify({
                title: recipe.title,
                image: recipe.image,
                imageContentType: 'image/png',
                description: recipe.description,
                city: recipe.city
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + _this.token
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        });
    }

    async getAllRecipes() {
        let _this = this;
        return fetch(backendUrl + 'recipes',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + _this.token
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            _this.allRecipes = responseJson;
            return responseJson;
        });
    }

    async getAllUserRecipes(id) {
        let _this = this;
        console.log(backendUrl + 'recipes/user/?id=' + id);
        return fetch(backendUrl + 'recipes/user/?id=' + id,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + _this.token
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            _this.allRecipes = responseJson;
            return responseJson;
        });
    }

    async saveUser(user) {
        let userStr = JSON.stringify(user);
        AsyncStorage.setItem("@userstore:user", userStr);
        this.user = user;
        return true;
    }

    async logout() {
        AsyncStorage.removeItem("@userstore:user");
        AsyncStorage.removeItem("@userstore:token");
        AsyncStorage.removeItem("@recipestore:recipe");
        return true;
    }
}

export default GlobalRecipes;