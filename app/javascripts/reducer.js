import { combineReducers } from 'redux';
import controllerReducer from 'components/Controller/reducer';

export default combineReducers({
  controller: controllerReducer
});
