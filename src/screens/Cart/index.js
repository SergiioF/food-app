import React from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';

import * as cartActions from '../../redux/actions/cartActions';

const { width } = Dimensions.get('window');

function Cart({ cart, total, removeFromCart, updateAmount }) {
  function incrementAmount(item) {
    updateAmount(item.name, item.amount + 1);
  }

  function decrementAmount(item) {
    updateAmount(item.name, item.amount - 1);
  }

  function renderItem(item) {
    return (
      <ScrollView>
        <View
          style={{
            width: width - 20,
            margin: 10,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderColor: '#cccccc',
            paddingBottom: 10,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: width / 3, height: width / 3 }}
            source={{ uri: item.image }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              padding: 10,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  {item.name}
                </Text>
                <TouchableOpacity onPress={() => removeFromCart(item.name)}>
                  <MaterialIcons name="delete" size={30} color="#fd4747" />
                </TouchableOpacity>
              </View>
              <Text>Lorem Ipsum de food</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{ fontWeight: 'bold', color: '#33c37d', fontSize: 20 }}
              >
                $ {item.subtotal}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => decrementAmount(item)}>
                  <MaterialIcons
                    name="remove-circle"
                    size={30}
                    color="#f95151"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: 8,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}
                >
                  {item.amount}
                </Text>
                <TouchableOpacity onPress={() => incrementAmount(item)}>
                  <MaterialIcons name="add-circle" size={30} color="#33c37d" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
      <View style={{ height: 10 }} />

      <View style={{ flex: 1 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginBottom: 10
        }}>
          <Text style={{
            fontSize: 26
          }}>
            TOTAL:
          </Text>
          <Text style={{
            fontSize: 26
          }}>
            {total} $
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#59d27b',
              width: width - 40,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              CHECKOUT
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer.map((item) => ({
    ...item,
    subtotal: item.price * item.amount,
  })),
  total: state.cartReducer.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(cartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
