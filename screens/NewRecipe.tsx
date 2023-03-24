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
        GlobalRecipes.instance.getNearestCities(location.latitude, location.longitude).then((response) => {
          console.log("City: ", response.data[0].name);
          console.log("Amount of Cities: ", response.data.length);
          setCoordinates(response.data[0].name)
        })
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

  const save = () => {
    GlobalRecipes.instance.saveRecipe({
      title: title,
      image: image,
      text: text,
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
    <SafeAreaView>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          editable
          onChangeText={text => setTitle(text)}
          placeholder={"Title"}
          value={title}
          style={styles.textField}
        />

        <Text style={[styles.label, {marginBottom: -10}]}>Image</Text>
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
        
        <Text style={styles.label}>Ingredients and Preparation</Text>
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
        <Text style={styles.label}>City</Text>
        <TextInput
          editable={false}
          onChangeText={text => setCoordinates(text)}
          placeholder={"Coordinates"}
          value={coordinates}
          style={styles.textField}
        />
        <View style={{height: 500}}></View>     
      </ScrollView>
      <View style={{position: 'absolute', bottom: 100, width: Dimensions.get("window").width, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
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
    height: Dimensions.get("window").width - 30,
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
