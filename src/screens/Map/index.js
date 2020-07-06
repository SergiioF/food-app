import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'
import Bag from '../../../assets/bag.png'

export default function Map() {

    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03
                })
            }
        }
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <Text style={styles.label}>SUCURSAL MAS CERCANA</Text>

            <MapView initialRegion={currentRegion} style={styles.map} >
                <StatusBar barStyle="dark-content" backgroundColor="#ffff" />
                
                <Marker coordinate={currentRegion} /> 
                <Marker coordinate={{ latitude: -25.484661, longitude: -54.763737 }}>
                    <Image style={styles.avatar} source={ Bag } />
                </Marker>
            </MapView>


            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar"
                    placeholderColor="#999"
                    autoCapitalize="sentences"
                />
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff'
    },
    label: {
        marginTop: 10,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        color: '#444',
        marginBottom: 8,
        fontSize: 17,
        textAlign: "left"
    },
    searchForm: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})