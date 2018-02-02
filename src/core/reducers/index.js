import { combineReducers } from 'redux'
import { uiReducer }       from 'core/reducers/reducer-ui'
import { providerReducer } from 'core/reducers/reducer-provider'
import { assetReducer }    from 'core/reducers/reducer-asset'

const rootReducer = combineReducers({
  ui      : uiReducer,
  provider: providerReducer,
  asset   : assetReducer
});

export default rootReducer;
