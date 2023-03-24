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

function Profile({ navigation }): JSX.Element {

  const [recipes, setRecipes] = React.useState('');
  const [user, setUser] = React.useState('');

  useEffect(() => {
    GlobalRecipes.init();
    GlobalRecipes.instance.getAllRecipes().then((allRecipes) => {
      setRecipes(allRecipes);
    });
    setUser(GlobalRecipes.instance.user)
  }, []);

  const createNewRecipe = () => {
    navigation.navigate("NewRecipe");
  }

  React.useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => {

      GlobalRecipes.instance.getAllRecipes().then((allRecipes) => {
        setRecipes(allRecipes);
      });
      setUser(GlobalRecipes.instance.user)
    });

    return focusHandler;

  }, [navigation]);

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', padding: 15}}>
        <Image style={{height: 100, width: 100, resizeMode: 'contain', borderRadius: 50}} source={ user.avatar ? { uri: 'data:image/png;base64,' + user.avatar } :require('../assets/user.png')}></Image>
        <View style={{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25}}>{user?.username}</Text>
        </View>
      </View>
      <FlatList
        style={styles.mainContainer}
        data={recipes}
        renderItem={({item}) => <Recipe title={item.title} text={item.text} image={item.image} coordinates={item.city}></Recipe>}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity 
        onPress={() => {createNewRecipe()}}
        style={{
          position: 'absolute',
          bottom: 25,
          right: 15,
          backgroundColor: '#275a8a',
          borderRadius: 35,
          height: 70,
          width: 70,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}><Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>+</Text></TouchableOpacity>

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
