import { combineReducers } from 'redux';
import { InjectedReducersType } from '../types/injector-typings';
import cartReducer from './reducers/cart.reducer';
import courseCategoriesReducer from './reducers/course-categories.reducer';
import userReducer from './reducers/user.reducer';

const reducers: InjectedReducersType = {
  courseCategory: courseCategoriesReducer,
  user: userReducer,
  cart: cartReducer,
};

export default combineReducers(reducers);
