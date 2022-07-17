// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { CourseCategoryData, CourseData, UserData } from './fetch-data.type';

export interface RootState {
  user?: UserState;
  courseCategory?: CourseCategoryState;
  cart?: CartState;
  // teacher: TeacherState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

export type UserState = {
  info?: UserData;
  logged?: boolean;
};

export type CourseCategoryState = {
  data: CourseCategoryData[];
};

export type TeacherState = {
  course: CourseData;
};

export type CartState = {
  count: number;
};

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
