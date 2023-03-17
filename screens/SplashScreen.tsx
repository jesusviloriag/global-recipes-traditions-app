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
  Image,
  Dimensions
} from 'react-native';

import { useEffect, useState } from 'react';

import GlobalRecipes from '../components/GlobalRecipes';

function SplashScreen({ navigation }): JSX.Element {

  const navigateToNextScreen = () => {
    setTimeout( () => {
      if(GlobalRecipes.instance.user) {
        navigation.navigate("Home")
      } else {
        navigation.navigate("Login")
      }     
    }, 1500)
  }

  useEffect(() => {
    navigateToNextScreen();
    GlobalRecipes.init();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.mainContainer, {flexDirection:'row', height: 150, marginTop: -50}]}>
        <Image style={styles.splashLogo} source={require('../assets/diet.png')}></Image>
      </View>
      <View style={[styles.mainContainer, {flexDirection:'row', height: 150, marginTop: 25}]}>
        <Text style={{fontSize: 46, fontFamily: 'FishGrill', color: 'black'}}>Local Recipes</Text>
      </View>
      <View style={[styles.mainContainer, {bottom: 0, flexDirection:'row', height: 150, marginTop: 25, position: 'absolute'}]}>
        <Text style={{fontSize: 18}}>Powered by Guaire</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#bad2e8'
  },
  splashLogo: {
    height: 150,
    width: 150
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

export default SplashScreen;
