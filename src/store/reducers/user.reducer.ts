import { PayloadAction, Action, ThunkAction } from '@reduxjs/toolkit';
import { UserState, RootState } from '../../types/states.type';
import { createSlice } from '../../lib/@reduxjs/toolkit';
import { UserData } from '../../types/fetch-data.type';
import { requestAPI } from '../../lib/request';
import { EGender } from '../../types/enums';
import { usersService } from '../../lib/users.service';
import _ from 'lodash';

const name = 'user';

const initialState: UserState = {
  info: {
    id: undefined,
    fullname: undefined,
    role: undefined,
    email: undefined,
    birthday: undefined,
    address: undefined,
    gender: undefined,
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrentUser: (state: UserState, action: PayloadAction<UserData>) => {
      state.info = action.payload;

      state.logged = true;
    },
    logout: (state: UserState) => {
      state.info = {};

      state.logged = false;
    },
  },
});

export const { setCurrentUser, logout } = slice.actions;

export const fetchCurrentUserThunk =
  (): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
    try {
      const data = await usersService.getCurrent();

      if (_.isObject(data) && data.id) {
        dispatch(setCurrentUser(data));
      }
    } catch (err) {
      dispatch(logout());
    }
  };

export default slice.reducer;
