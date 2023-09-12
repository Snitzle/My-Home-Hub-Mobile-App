import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Home = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    // Perform login logic here, e.g., make an API request to authenticate the user
    console.log('Email:', email);
    console.log('Password:', password);

    // You can add your authentication logic and navigation code here

  };

  return (
    <>
        
        <View style={styles.wrapper}>

            <View style={styles.container}>

                <Text style={styles.title}>My Home Hub</Text>

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
                
                <TouchableOpacity style={styles.button} title="Login" onPress={handleLogin} >
                    <Text style={styles.button}>Register</Text>
                </TouchableOpacity>

            </View>

        </View>

    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 180,
    marginBottom: 'auto',
  },
  container: {
    margin: 16,
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
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
