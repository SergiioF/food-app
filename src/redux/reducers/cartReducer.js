import produce from 'immer';

const INITIAL_STATE = [];

export default function addToCart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex(
          (idx) => idx.name === action.item.name
        );

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({
            ...action.item,
            amount: 1,
          });
        }
      });
    case 'REMOVE_FROM_CART':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((idx) => idx.name === action.name);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case 'UPDATE_AMOUNT':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((idx) => idx.name === action.name);
        if (action.amount <= 0) {
          draft.splice(productIndex, 1);
        } else if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });

    default:
      return state;
  }
}
