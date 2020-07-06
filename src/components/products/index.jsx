import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';

import apiData from '../../data/apiData.json';
import * as cartActions from '../../redux/actions/cartActions';
import styles from './styles';

function ProductList({ addToCart }) {
  const [stateCategories, setStateCategories] = useState([]);
  const [stateFood, setStateFood] = useState([]);
  const [selectCatg, setSelectCatg] = useState(0);

  async function loadHome() {
    const { food, categories } = apiData;
    setStateCategories(categories);
    setStateFood(food);
  }

  useEffect(() => {
    loadHome();
  }, []);

  function handleAddToCart(item) {
    addToCart(item);
  }

  function renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.divCategorie, { backgroundColor: item.color }]}
        onPress={() => setSelectCatg(item.id)}
      >
        <Image
          style={{ width: 100, height: 80 }}
          resizeMode="contain"
          source={{ uri: item.image }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  function renderItemstateFood(item) {
    const catg = selectCatg;
    if (catg === 0 || catg === item.categorie) {
      return (
        <TouchableOpacity style={styles.divstateFood}>
          <Image
            style={styles.imagestateFood}
            resizeMode="contain"
            source={{ uri: item.image }}
          />
          <View style={styles.contentCard} />
          <Text
            style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}
          >
            {item.name}
          </Text>
          <Text style={{ fontSize: 20, color: 'green' }}>
            {item.price || '' } $
          </Text>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.contentCardTouchableOpacity}
          >
            <Text style={styles.styleAddToCard}>Add Cart</Text>

            <MaterialIcons name="add-circle" size={30} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }

    return null;
  }

  return (
    <View style={styles.contentList}>
      <Text style={styles.titleCatg}>Categories</Text>
      <FlatList
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        data={stateCategories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
      />

      <FlatList
        data={stateFood}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItemstateFood(item)}
      />

      <View style={{ height: 20 }} />
    </View>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(cartActions, dispatch);

export default connect(null, mapDispatchToProps)(ProductList);
