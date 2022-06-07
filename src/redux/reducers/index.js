import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import markers from './markers';

const reducer = combineReducers({
  form,
  markers
});

export default reducer;
