import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';

function cartHeaderIcon({ cartSize, navigation } ) {

  function loadCart(){
    navigation.navigate('Cart')
  }

  return (
    <View style={{ marginRight:5, width: 30, height:30, alignContent:"center", justifyContent:"center" }}>
      <TouchableOpacity style={{ position: 'absolute' }} onPress={loadCart}>
        <MaterialIcons name="shopping-cart" size={26} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#9fd236',
          width: 18,
          height: 18,
          borderRadius: 15,
          marginRight: 25,
          left: 10,
          top: -15,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: '700',
            fontSize: 12,
          }}
        >
          {cartSize || 0}
        </Text>
      </View>
    </View>
  );
}

export default connect(
  (state) => ({
    cartSize: state.cartReducer.length,
  }),
  null
)(cartHeaderIcon);
