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

    init(props) {
        AsyncStorage.getItem("username").then((username) => {
            console.log("username", username)
            if(username != null && username != undefined) {
                this.user = {
                    username: username
                }
            } else {
                user = undefined;
            }
        })

    }

    async login(username, password) {
        user = {
            username: username
        }

        AsyncStorage.setItem("username", username)

        return true;
    }
}

export default GlobalRecipes;