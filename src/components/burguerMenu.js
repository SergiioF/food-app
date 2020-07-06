import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';

import { MaterialIcons } from '@expo/vector-icons';

export default function BurguerMenu(props) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function profile() {
      const userProfile = await AsyncStorage.getItem('name');

      if (userProfile !== null) {

        const profileSettings = JSON.parse(userProfile);
        setUserData(profileSettings);
      }
    }
    profile();
  }, []);

  function LogOut() {
    AsyncStorage.removeItem('name');
    props.navigation.navigate('Login');
  }
 
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.session}>
          <View style={styles.userSession}>
            {'picture' in userData ? (
              <Image
                style={{ width: 80, height: 80, borderRadius: 40 }}
                source={{ uri: userData.picture.data.url }}
                resizeMode="cover"
              />
            ) : (
              <MaterialIcons name="account-circle" size={80} color="#fff" />
            )}
            {userData ? (
              <Text style={styles.userDetails}>{userData.name}</Text>
            ) : (
              <Text style={styles.userDetails}>User</Text>
            )}
            
          </View>
        </View>
        <View style={styles.drawerLine}>
          <DrawerItems {...props} />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.searchForm} onPress={LogOut}>
        <MaterialIcons
          style={styles.icon}
          name="exit-to-app"
          size={20}
          color="#999"
        />
        <Text style={styles.input}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchForm: {
    bottom: 15,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: '#333',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
  },
  session: {
    height: 160,
    backgroundColor: '#4da0ff',
  },
  userSession: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  drawerLine: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#fff',
  },
  userDetails: {
    top: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  userID: {
    top: 10,
    fontSize: 15,
    color: '#DDD',
  },
});
