import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  ECoursePublish,
  EGender,
  ELessonType,
  EOrderStatus,
  EPaymentMethod,
  ERegisterTeacher,
  ERole,
  EVideoProcessingStatus,
} from './enums';

export type FetchData<T = any, R extends Record<string, any> = {}> = {
  [P in keyof R]?: R[P];
} & {
  data?: T;
  type?: string;
};

export type SortOptions<T extends CommonData> = {
  [P in keyof T]: 'ASC' | 'DESC' | 1 | -1;
};

export type FetchParams<T extends CommonData> = {} & {
  sortOptions?: SortOptions<T>;
  currentPage?: number;
  pageSize?: number;
  where?: T;
};

export type CommonData = {
  id?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: number;
  updatedBy?: string;
};

export type UserData = CommonData & {
  fullname?: string;
  role?: ERole;
  email?: string;
  birthday?: string;
  address?: string;
  avatarURL?: string;
  isVerified?: boolean;
  rating?: number;
  title?: string;
  phoneNumber?: string;
  facebook?: string;
  experience?: string;
  description?: string;
  gender?: EGender;
  registerTeacher?: ERegisterTeacher;
  facebookId?: string;
  facebookFullname?: string;
  facebookAvatarURL?: string;
  facebookEmail?: string;
  facebookAccessToken?: string;
  googleEmail?: string;
  googleFullname?: string;
  googleAvatarURL?: string;
  googleAccessToken?: string;
  displayName?: string;
  displayEmail?: string;
  displayAvatarURL?: string;
  countCourses?: number;
};

export type CourseSubcategoryData = CommonData & {
  name?: string;
  orderPosition?: number;
  icon?: IconProp;
  courseCategory?: CourseCategoryData;
};

export type CourseCategoryData = CommonData & {
  name?: string;
  orderPosition?: number;
  icon?: IconProp;
  courseSubcategory?: CourseSubcategoryData[];
  countCourses?: number;
};

export type CourseData = CommonData & {
  about?: string;
  bannerURL?: string;
  boughtUsers?: UserData[];
  certificate?: boolean;
  countLessons?: number;
  countStudents?: number;
  coursePart?: CoursePartData[];
  courseSubcategory?: CourseSubcategoryData;
  courseSubcategoryId?: number;
  courseCategoryId?: number;
  coverImageURL?: string;
  duration?: number;
  introductionVideoURL?: string;
  name?: string;
  output?: string;
  price?: number;
  promotionPrice?: number;
  publish?: ECoursePublish;
  // purchase?: CoursePurchaseData;
  countRatings?: number;
  averageRatings?: number;
  // promotionStartTime?: Date;
  // promotionEndTime?: Date;
  rating?: CourseRatingData;
  subTitle?: string;
  user?: UserData;
  countQuestions?: number;
  countCourses?: number;
  introductionVideoProcessingStatus?: EVideoProcessingStatus;
};

export type CartItemData = CommonData & {
  course?: CourseData;
  user?: UserData;
};

export type CoursePartData = CommonData & {
  name?: string;
  course?: CourseData;
  lesson?: LessonData[];
  orderPosition?: number;
  order?: number;
};

export type LessonData = CommonData & {
  duration?: string;
  name?: string;
  videoURL?: string;
  trial?: boolean;
  coursePart?: CoursePartData;
  orderPosition?: number;
  order?: number;
  number?: number;
  type?: ELessonType;
  processingStatus?: EVideoProcessingStatus;
};

// export type CoursePurchaseData = CommonData & {
//   course?: CourseData;
//   price?: number;
//   paid?: boolean;
// };

export type CourseRatingData = CommonData & {
  rating?: number;
  comment?: string;
  user?: UserData;
  course?: CourseData;
};

export type CountCourseRatingsData = {
  '1'?: number;
  '2'?: number;
  '3'?: number;
  '4'?: number;
  '5'?: number;
  count?: number;
  average?: number;
};

export type CourseQuestionData = CommonData & {
  content?: string;
  course?: CourseData;
  user?: UserData;
  courseAnswer?: CourseAnswerData[];
};

export type CourseAnswerData = CommonData & {
  content?: string;
  user?: UserData;
  courseQuestion?: CourseQuestionData;
};

export type CartPriceData = {
  price?: number;
  totalPrice?: number;
  savePrice?: number;
};

export type OrderData = CommonData & {
  paymentMethod?: EPaymentMethod;
  price?: number;
  totalPrice?: number;
  savePrice?: number;
  orderItem?: OrderItemData[];
  status?: EOrderStatus;
  statusChangeTime?: string;
};

export type OrderItemData = CommonData & {
  price?: number;
  promotionPrice?: number;
  order?: OrderData;
  course?: CourseData;
};

export type TRevenueData = {
  revenue: number;
  countCourses: number;
  startDate: string;
  endDate: string;
};
