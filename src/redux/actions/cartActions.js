export function addToCart(item) {
  return {
    type: 'ADD_TO_CART',
    item,
  };
}

export function removeFromCart(name) {
  return {
    type: 'REMOVE_FROM_CART',
    name,
  };
}

export function updateAmount(name, amount) {
  return {
    type: 'UPDATE_AMOUNT',
    name,
    amount,
  };
}
