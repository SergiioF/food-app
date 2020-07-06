import React, { useState, useEffect } from 'react';
import {
  Platform,
  Text,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import apiData from '../../data/apiData.json';

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function loadHome() {
      const { banner } = apiData;
      setBanner(banner);
    }
    loadHome();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
          <View style={{ width, alignItems: 'center' }}>
            <Swiper
              style={{ height: width / 2, marginTop: 10 }}
              showsButtons={false}
              autoplay
              autoplayTimeout={3}
            >
              {banner.map((itembann) => (
                <Image
                  key={itembann}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: itembann }}
                />
              ))}
            </Swiper>
            <View style={{ height: 20 }} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 40,
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity style={styles.divFood}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                width: width / 2 - 20 - 10,
              }}
            >
              <TouchableOpacity style={{ marginRight: 10 }}>
                <AntDesign name="star" size={28} color="#FFFF00" />
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Destacados
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.divFood}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                width: width / 2 - 20 - 10,
              }}
            >
              <TouchableOpacity style={{ marginRight: 10 }}>
                <AntDesign name="heart" size={28} color="#fd4747" />
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Favoritos
              </Text>
            </View>
          </TouchableOpacity>
         
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 40,
            justifyContent: 'center',
          }}
        >
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

Home.navigationOptions = ({ navigation }) => ({
  headerTitle: () => null,
  headerLeft: () =>
    Platform.select({
      ios: null,
      android: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons
            style={styles.icon}
            name="menu"
            size={34}
            color="#000"
          />
        </TouchableOpacity>
      ),
    }),
});

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  icon: {
    paddingLeft: 10,
  },
  imageFood: {
    width: width / 4 - 20 - 10,
    height: width / 4 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  divFood: {
    width: width / 2 - 20,
    paddingVertical: 10,
    borderRadius: 3,
    marginBottom: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  },
});
