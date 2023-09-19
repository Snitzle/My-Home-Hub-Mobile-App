import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";


const Dashboard = () => {

    const [ data, setData ] = useState( [] );

    const property_list = [];

    useEffect( () => {

        AsyncStorage.getItem( 'auth-token' ).then( token => {

            axios.get( 'http://myhomehub.test/api/properties', { headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            } } )
            .then( response => {            

                setData( response.data );

            })
            .catch( error => {
                console.log( "ERROR: " + error );
            } );

        } );

        

    }, [] );

    return (
        <SafeAreaView>
            <View>

                <StatusBar backgroundColor="black" style="" />

                <FlatList 
                    data={ data }
                    keyExtractor={ ( item, index ) => index.toString() }
                    renderItem={ ( { item } ) => (
                        <TouchableOpacity style={ [styles.button, styles.bottomSpacing ] } title="Login" >
                            <Text style={ styles.buttonText } >{ item.name }</Text>
                        </TouchableOpacity>
                    ) }
                />
                
            </View>
        </SafeAreaView>
    
    );

}


const styles = StyleSheet.create({ 

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

export default Dashboard;