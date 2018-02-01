import constants from 'core/types';

const initialState = {
  asset: null
};

export function providerReducer(state = initialState, action) {
  switch (action.type) {

  case constants.ADD_ASSET:
    return Object.assign({}, state, {
      asset: action.asset
    });
    
  default:
    return state;
  }
}