import { PayloadAction, Action, ThunkAction } from '@reduxjs/toolkit';
import { CourseCategoryState, RootState } from '../../types/states.type';
import { createSlice } from '../../lib/@reduxjs/toolkit';
import { CourseCategoryData } from '../../types/fetch-data.type';
import { requestAPI } from '../../lib/request';
import { notificationService } from '../../lib/notificationService';
import _ from 'lodash';

const name = 'courseCategory';

const initialState: CourseCategoryState = {
  data: [],
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCourseCategories: (
      state: CourseCategoryState,
      action: PayloadAction<CourseCategoryData[]>,
    ) => {
      const { payload } = action;

      state.data = payload;
    },
  },
});

export const { setCourseCategories } = slice.actions;

export const fetchCourseCategoriesThunk =
  (): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      const data = await requestAPI.get<CourseCategoryData[]>(
        '/course-categories',
        {
          params: {
            loadMenu: true,
          },
        },
      );

      if (_.isArray(data)) {
        dispatch(setCourseCategories(data));
      }
    } catch (err) {
      notificationService.handleError(err);
    }
  };

export default slice.reducer;
