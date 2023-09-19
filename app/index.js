import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';


const Home = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  
    const login_data = JSON.stringify({ 
      'email' : email, 
      'password' : password, 
      'device_name' : Device.device_name
    });

    axios.post('http://myhomehub.test/api/sanctum/token', login_data, { headers: {
      'Content-Type': 'application/json',
    } } )
      .then( response => {

        console.log( response );

        try {

          AsyncStorage.setItem( 'auth-token', response.data );
          console.log( "auth token set" );

        } catch ( e ) {

          console.log( e );

        }

        // Move to the next screen then get their properties from the api
        router.push('/dashboard');  

      })
      .catch( error => {
        console.log( "ERROR: " + error );
      });

  }

  const handleRegister = () => {

    router.push('/register');

  }

  return (
    
        <>
          <StatusBar style="auto" />
        <View style={styles.wrapper}>

            {/* Image Here */}
            <View>

              <Image source={ require( "./assets/logo--black.png" ) } style={ styles.logo_image } />
              
              <Text style={styles.title}>My Home Hub</Text>

            </View>

              <View style={styles.container}>

                  <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor={'black'}
                      onChangeText={(text) => setEmail(text)}
                      value={email}
                  />

                  <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={'black'}
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                      secureTextEntry={true} // Mask the password input
                  />

                  <TouchableOpacity style={ [styles.button, styles.bottomSpacing ] } title="Login" onPress={handleLogin} >
                      <Text style={styles.button}>Login</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.button} title="Register" onPress={ handleRegister } >
                      <Text style={styles.button}>Register</Text>
                  </TouchableOpacity>

              </View>

          </View>
      </>

    
  );
};

const styles = StyleSheet.create({
  logo_image: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
  },
  wrapper: {
    marginTop: 180,
    marginBottom: 'auto',
  },
  container: {
    margin: 16,
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#60d394', // Background color of the button
    padding: 10, // Padding around the button's content
    borderRadius: 5, // Border radius to round the edges of the button
    color: 'white', // Text color
    textAlign: 'center', // Alignment of the text
  },
  buttonText: {
    color: 'white', // Text color
    fontWeight: 900, // Bold text
    fontSize: 32, // Font size of the text
  },
  bottomSpacing: {
    marginBottom: 16,
  }
});

export default Home;
