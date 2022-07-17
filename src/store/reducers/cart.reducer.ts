import { PayloadAction, Action, ThunkAction } from '@reduxjs/toolkit';
import { CartState, RootState } from '../../types/states.type';
import { createSlice } from '../../lib/@reduxjs/toolkit';
import { notificationService } from '../../lib/notificationService';
import { cartsService } from '../../lib/carts.service';
import _ from 'lodash';

const name = 'cart';

const initialState: CartState = {
  count: 0,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCartCount: (state: CartState, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setCartCount } = slice.actions;

export const fetchCartCountThunk =
  (): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
    try {
      const data = await cartsService.count({});

      if (_.isNumber(data)) {
        dispatch(setCartCount(data));
      }
    } catch (err) {
      notificationService.handleError(err);
    }
  };

export default slice.reducer;
