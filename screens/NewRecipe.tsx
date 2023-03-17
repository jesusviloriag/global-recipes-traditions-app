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
import TextRecognition from 'react-native-text-recognition';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import GlobalRecipes from '../components/GlobalRecipes';

function NewRecipe({ navigation }): JSX.Element {

  const [title, setTitle] = React.useState('');
  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');
  const [coordinates, setCoordinates] = React.useState('');

  useEffect(() => {
    GlobalRecipes.init();

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
    .then(location => {
        //console.log(location);
        setCoordinates("[" + location.latitude + "," + location.longitude + "}")
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  }, []);

  React.useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => {

        if (GlobalRecipes.instance.picture) {
          setImage(GlobalRecipes.instance.picture);
        }

    });

    return focusHandler;

  }, [navigation]);

  const selectRecipeText = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true
    }
    launchImageLibrary(options).then((result) => {
      console.log(result.assets[0].uri);
      TextRecognition.recognize(result.assets[0].uri).then((textResult) => {
        alert(textResult);
      })
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.mainContainer}>
        <TextInput
          editable
          onChangeText={text => setTitle(text)}
          placeholder={"Title"}
          value={title}
          style={styles.textField}
        />

        <View>
          <Image style={styles.image} source={image ? { uri: 'data:image/png;base64,' + image } : require('../assets/placeholder.png')}></Image>
          <TouchableOpacity 
            onPress={() => {navigation.navigate("ImageTaking")}}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 15,
              backgroundColor: '#275a8a',
              borderRadius: 10,
              height: 70,
              width: 70,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center'
            }}><Image source={require('../assets/camera/cameraFlipIcon.png')}></Image></TouchableOpacity>
        </View>
        
        <View>
          <TextInput
            editable
            onChangeText={text => setText(text)}
            placeholder={"Text"}
            multiline
            numberOfLines={8}
            value={text}
            style={styles.textField}
          />
          <TouchableOpacity 
            onPress={() => {selectRecipeText()}}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 15,
              backgroundColor: '#275a8a',
              borderRadius: 10,
              height: 70,
              width: 70,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center'
            }}><Image source={require('../assets/camera/cameraFlipIcon.png')}></Image></TouchableOpacity>
        </View>
        
        <TextInput
          editable={false}
          onChangeText={text => setCoordinates(text)}
          placeholder={"Coordinates"}
          value={coordinates}
          style={styles.textField}
        />
        <View style={{height: 500}}></View>     
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 15,
    resizeMode: 'contain',
    borderRadius: 10,
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width - 30,
  },
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
    marginTop: 15,
    marginHorizontal: 15,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15
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

export default NewRecipe;
