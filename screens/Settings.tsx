/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList
} from 'react-native';

import { useEffect, useState } from 'react';

import GlobalRecipes from '../components/GlobalRecipes';
import Recipe from '../components/Recipe';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function Profile({ navigation }): JSX.Element {

  const [username, setUsername] = React.useState('');
  const [avatar, setAvatar] = React.useState(null);

  useEffect(() => {
    GlobalRecipes.init();
    setUsername(GlobalRecipes.instance.user.username)
    setAvatar(GlobalRecipes.instance.user.avatar)
  }, []);

  const createNewRecipe = () => {
    navigation.navigate("NewRecipe");
  }

  const save = () => {
    GlobalRecipes.instance.saveUser({
      username: username,
      avatar: avatar
    });
    navigation.pop();
  }

  const cancel = () => {
    navigation.pop();
  }

  const selectProfilePicture = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true
    }
    launchImageLibrary(options).then((result) => {
      setAvatar(result.assets[0].base64);
    })
  }

  const logout = () => {
    GlobalRecipes.instance.logout().then((result) => {
      if(result) {
        navigation.navigate("Login");
      }
    });
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={{flexDirection: 'row', padding: 15}}>
        <TouchableOpacity onPress={() => {selectProfilePicture()}}>
          <Image style={{height: 100, width: 100, resizeMode: 'contain', borderRadius: 50}} source={ avatar ? { uri: 'data:image/png;base64,' + avatar } : require('../assets/user.png')}></Image>
        </TouchableOpacity>        
        <View style={{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            editable
            onChangeText={text => setUsername(text)}
            placeholder={"Text"}
            value={username}
            style={styles.textField}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => logout()} style={[styles.button,{backgroundColor: '#eb4034', marginLeft: 15, width: Dimensions.get("window").width - 30}]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity> 
      <View style={{position: 'absolute', bottom: 15, width: Dimensions.get("window").width, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => cancel()} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => save()} style={[styles.button,{marginLeft: 15}]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#275a8a',
    padding: 10,
    marginTop: 25,
    borderRadius: 10,
    width: 75,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 250
  },
  mainContainer: {
    alignContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75,
    backgroundColor: '#bad2e8'
  },
  splashLogo: {
    height: 75,
    width: 75,
    marginTop: 100
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Profile;
