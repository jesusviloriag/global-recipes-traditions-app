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
  Button
} from 'react-native';

import { useEffect, useState } from 'react';

import GlobalRecipes from '../components/GlobalRecipes';

function Home({ navigation }): JSX.Element {

  useEffect(() => {
    GlobalRecipes.init();
  }, []);

  const createNewRecipe = () => {
    navigation.navigate("NewRecipe");
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.mainContainer}>
        
        <View style={{height: 500}}></View>     
      </ScrollView>
      <TouchableOpacity 
        onPress={() => {createNewRecipe()}}
        style={{
          position: 'absolute',
          bottom: 95,
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
    height: Dimensions.get('window').height,
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

export default Home;
