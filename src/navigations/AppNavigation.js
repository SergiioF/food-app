import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { MaterialIcons } from '@expo/vector-icons';

import Cart from '../screens/Cart'
import BurgerMenu from '../components/burguerMenu';
import CartLength from '../components/cartHeaderIcon';
import Home from '../screens/Home';
import ListProduct from '../screens/ListProducts';
import Login from '../screens/Login';
import Map from '../screens/Map';

const Auth = createStackNavigator(
  {
    Login,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

const HomeStack = createStackNavigator(
  {
    Home,
  },
  { initialRouteName: 'Home' }
);

const ProductStack = createStackNavigator({
  ListProduct: {
    screen: ListProduct,
    initialRouteName: 'ListProduct',
    navigationOptions: (navigation) => ({
      headerTitle: 'Productos',
      headerRight: () => <CartLength {...navigation} />,
    }),
  },
  Cart: {
    screen: Cart,
    navigationOptions: () => ({
      headerTitle: 'Carrito',
    }),
  }
});

const BottomStack = createBottomTabNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: () => (
        <View style={styles.contentTab}>
          <Text style={styles.tabBarLabel}>Inicio</Text>
        </View>
      ),
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons
          style={styles.tabBarIcon}
          name="home"
          size={26}
          color={tintColor}
        />
      ),
    },
  },
  Map: {
    screen: Map,
    navigationOptions: {
      tabBarLabel: () => (
        <View style={styles.contentTab}>
          <Text style={styles.tabBarLabel}>Mapa</Text>
        </View>
      ),
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons
          style={styles.tabBarIcon}
          name="explore"
          size={26}
          color={tintColor}
        />
      ),
    },
  },
  ProductStack: {
    screen: ProductStack,
    navigationOptions: {
      tabBarLabel: () => (
        <View style={styles.contentTab}>
          <Text style={styles.tabBarLabel}>Productos</Text>
        </View>
      ),
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons
          style={styles.tabBarIcon}
          name="view-list"
          size={26}
          color={tintColor}
        />
      ),
    },
  },
});

BottomStack.navigationOptions = {
  tabBarLabel: () => <Text style={styles.tabBarLabel}>Menu</Text>,
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons name="home" size={34} color={tintColor} />
  ),

  drawerLabel: () => (
    <View style={styles.contentDrawer}>
      <Text style={styles.drawerLabel}>Menu</Text>
    </View>
  ),
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="home" size={24} color={tintColor} />
  ),
};

const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({
    HomeStack,
  }),
  android: createDrawerNavigator(
    {
      BottomStack,
    },
    { contentComponent: BurgerMenu }
  ),
});

const RootSwitch = createSwitchNavigator(
  {
    MainNavigator,
    Auth,
  },
  { initialRouteName: 'Auth' }
);

export default AppContainer = createAppContainer(RootSwitch);

const styles = StyleSheet.create({
  tabBarLabel: {
    bottom: 3,
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#999',
  },
  contentTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentDrawer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerLabel: {
    fontSize: 16,
    color: '#999',
  },
  tabBarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 2,
  },
});
