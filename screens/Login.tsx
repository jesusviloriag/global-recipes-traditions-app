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

function Login({ navigation }): JSX.Element {

  useEffect(() => {
    GlobalRecipes.init();
  }, []);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const clear = () => {
    setUsername('');
    setPassword('');
  }

  const login = () => {
    if(username && password) {
      GlobalRecipes.login(username, password).then((response) => {
        if(response) {
          navigation.navigate("Home")
        } else {
          alert("Login failed please check login information")
        }
      });
    } else {
      alert("Please fill all the information")
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.mainContainer}>
        <View style={{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <Image style={styles.splashLogo} source={require('../assets/diet.png')}></Image>
          <Text style={{fontSize: 30, fontFamily: 'FishGrill', color: 'black', marginTop: 15}}>Local Recipes</Text>
          <Text style={{fontSize: 12, color: 'black', marginVertical: 15}}>Please enter your information to log in</Text>

          <Text style={{textAlign: 'left', width: 250, fontSize: 22, fontFamily: 'FishGrill', color: 'black', marginTop: 15}}>Username: </Text>
          
          <TextInput
            editable
            onChangeText={text => setUsername(text)}
            placeholder={"Login"}
            value={username}
            style={styles.textField}
          />

          <Text style={{textAlign: 'left', width: 250,fontSize: 22, fontFamily: 'FishGrill', color: 'black', marginTop: 15}}>Password: </Text>

          <TextInput
            editable
            onChangeText={text => setPassword(text)}
            secureTextEntry={true} 
            placeholder={"Password"}
            value={password}
            style={styles.textField}
          />

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => clear()} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => login()} style={[styles.button,{marginLeft: 15}]}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>            
          </View>
        </View>   

        <View style={{height: 500}}></View>     
      </ScrollView>
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

export default Login;
