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
import GetLocation from 'react-native-get-location'
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import GlobalRecipes from '../components/GlobalRecipes';

function NewRecipe({ title, image, description, coordinates }): JSX.Element {

  useEffect(() => {
    GlobalRecipes.init();
  }, []);

  const save = () => {
    GlobalRecipes.instance.saveRecipe({
      title: title,
      image: image,
      description: description,
      city: coordinates
    });
    navigation.pop();
  }

  const cancel = () => {
    navigation.pop();
  }

  const selectRecipeText = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true
    }
    launchImageLibrary(options).then((result) => {
      console.log(result.assets[0].uri);
      TextRecognition.recognize(result.assets[0].uri).then((textResult) => {
        console.log(textResult);
        setText(textResult.text)
      })
    })
  }

  return (
    <View>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.label}>{title}</Text>
        <View>
          <Image style={styles.image} source={image ? { uri: 'data:image/png;base64,' + image } : require('../assets/placeholder.png')}></Image>
        </View>
        
        <Text style={styles.label}>Ingredients and Preparation</Text>
        <Text style={styles.preparation}>{description}</Text>
        <Text style={styles.label}>City: <Text style={{fontWeight: 'normal'}}>{coordinates}</Text></Text> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  preparation: {
    color: 'black',
    marginLeft: 15,
    marginTop: 15,
    fontSize: 15
  },
  label: {
    color: 'black',
    marginLeft: 15,
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 18
  },
  image: {
    marginTop: 15,
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 15,
    resizeMode: 'contain',
    borderRadius: 10,
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width - 30 - 175,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#275a8a',
    padding: 10,
    borderRadius: 10,
    width: 75,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    padding: 10,
    marginTop: 5,
    marginHorizontal: 15,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15
  },
  mainContainer: {
    alignContent: 'center',
    backgroundColor: '#bad2e8',
    borderBottomColor: '#275a8a',
    paddingBottom: 15,
    borderBottomWidth: 1
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

export default NewRecipe;
