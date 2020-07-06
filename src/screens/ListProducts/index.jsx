import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import Products from '../../components/products';
import styles from './styles';

function ListProduct() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Products />
      </ScrollView>
    </SafeAreaView>
  );
}
export default ListProduct;
