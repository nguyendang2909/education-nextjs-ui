import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SortDirection } from '../components/Table/TableSort';
import {
  ECourseImageType,
  ECoursePublish,
  EGender,
  ELessonType,
  EOrderStatus,
  EPaymentMethod,
  ERegisterTeacher,
  ERole,
} from './enums';
import {
  CartItemData,
  CommonData,
  CourseData,
  OrderData,
  SortOptions,
} from './fetch-data.type';

type AFindAllDto = {
  isActive?: boolean;
  updatedBy?: number;
  createdBy?: number;
};

type FindManyDto = {
  currentPage?: number;
  pageSize?: number;
};

type TFindManyDto = FindManyDto & {
  sortCreatedAt?: SortDirection;
};

type AFindManyDto = AFindAllDto &
  FindManyDto & {
    sortCreatedAt?: SortDirection;
  };

type AUpdateDto = {
  isActive?: boolean;
};

export type CreateLessonDto = {
  name: string;
  videoURL?: string;
  trial: boolean;
  coursePartId?: number;
  orderPosition?: number;
  uploadFilename?: string;
  uploadFileType?: string;
};

export type FindOneCourseDto = {};

export type FindAllCoursesDto = {
  name?: string;
  courseSubcategoryId?: number;
  courseCategoryId?: number;
  teacherId?: number;
  price?: number;
  // commonPrice?: string | number;
  purchase?: boolean;
  showCountQuestions?: boolean;

  duration?: string;
  free?: boolean;
  promotion?: boolean;
};

export type CourseSortBy = 'newest' | 'popularity' | 'relevant';

export type FindManyCoursesDto = FindAllCoursesDto &
  FindManyDto & {
    sortBy?: CourseSortBy;
  };

export type TCreateCourseDto = {
  name: string;
  courseCategoryId: number;
  courseSubcategoryId: number;
  subTitle?: string;
  introductionVideoURL?: string;
  about?: string;
  price?: number;
  promotionPrice?: number;
  promotionStartTime?: Date;
  promotionEndTime?: Date;
  output?: string;
  certificate?: boolean;
};

export type TUpdateCourseDto = Partial<TCreateCourseDto> & {
  publish?: ECoursePublish;
};

export type TUpdateCourseImageDto = {
  documentType: ECourseImageType;
};

export type AUpdateCourseDto = {
  about?: string;
  courseCategoryId?: number;
  courseSubcategoryId?: number;
  certificate?: boolean;
  introductionVideoURL?: string;
  isActive?: boolean;
  name?: string;
  output?: string;
  price?: number;
  promotionPrice?: number;
  promotionStartTime?: Date;
  promotionEndTime?: Date;
  publish?: ECoursePublish;
  subTitle?: string;
};

export type TFindAllCoursesDto = {
  name?: string;
  courseSubcategoryId?: string;
  courseCategoryId?: string;
  publish?: ECoursePublish;
  commonPrice?: string;
};

export type TFindManyCoursesDto = TFindManyDto &
  TFindAllCoursesDto & {
    sortName?: SortDirection;
    sortId?: SortDirection;
  };

export type AFindAllCoursesDto = AFindAllDto & {
  name?: string;
  courseSubcategoryId?: string;
  courseCategoryId?: string;
  publish?: ECoursePublish;
  commonPrice?: string;
  userId?: string;
};

export type AFindManyCoursesDto = FindManyDto & AFindAllCoursesDto;

// export type FindOneCoursePurchaseDto = {
//   id?: number;
//   courseId?: number;
//   buyerId?: number;
//   paid?: string;
// };

// export type FindAllCoursePurchasesDto = {
//   courseId?: number;
//   buyerId?: number;
//   paid?: string;
// };

// export type FindManyCoursePurchasesDto = FindAllCoursePurchasesDto &
//   FindManyDto;

export type CreateCoursePurchaseDto = {
  courseId?: number;
  userId?: number;
};

export type FindAllCartsDto = {
  courseId?: number | number[];
  userId?: number;
  id?: number | number[];
};

export type FindOneCartDto = {
  id?: number;
  courseId?: number;
  userId?: number;
};

export type FindManyCartsDto = FindAllCartsDto & FindManyDto;

export type FindCartPriceDto = {
  courseId?: number | number[];
};

export type TCreateCoursePartDto = {
  name: string;
  orderPosition?: number;
  courseId: number;
};

export type TUpdateCoursePartDto = Partial<
  Omit<TCreateCoursePartDto, 'courseId'>
>;

export type TCreateLessonDto = {
  name: string;
  coursePartId: number;
  type: ELessonType;
  videoURL?: string;
  trial?: boolean;
  orderPosition?: number;
  uploadFilename?: string;
  uploadFileType?: string;
};

export type TFindManyCoursePartsDto = {
  courseId?: number;
};

export type TUpdateLessonDto = Partial<
  Omit<TCreateLessonDto, 'coursePartId' | 'type'>
>;

export type CreateCourseRatingDto = {
  rating: number;
  comment: string;
  courseId: number;
};

export type FindAllCourseRatingsDto = {
  rating?: number;
  courseId?: number;
  userId?: number;
  teacherId?: number;
};

export type FindManyCourseRatingsDto = FindManyDto & FindAllCourseRatingsDto;

export type UpdateUserDto = {
  fullname?: string;
  birthday?: string;
  address?: string;
  gender?: EGender;
  title?: string;
  experience?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  oldPassword?: string;
  registerTeacher?: ERegisterTeacher;
};

export type AUpdateUserDto = UpdateUserDto & {
  isActive?: boolean;
  role?: ERole;
};

export type CreateCourseQuestionDto = {
  content: string;
  courseId: number;
};

export type FindAllCourseQuestionsDto = {
  courseId: number;
  userId?: number;
};

export type TFindAllCourseQuestionsDto = {
  courseId?: number;
};

export type FindManyCourseQuestionsDto = FindManyDto &
  FindAllCourseQuestionsDto;

export type TFindManyCourseQuestionsDto = FindManyDto &
  TFindAllCourseQuestionsDto;

export type CreateCourseAnswerDto = {
  content: string;
  courseQuestionId: number;
};

export type FindAllCourseCategories = {
  loadMenu?: boolean;
  countCourses?: boolean;
};

export type AFindAllCourseCategoriesDto = AFindAllDto & {
  name?: string;
  countCourses?: boolean;
};

export type AFindAllCourseSubcategoriesDto = AFindAllDto & {
  name?: string;
  courseCategoryId?: number;
};

export type AFindAllUsersDto = AFindAllDto & {
  fullname?: string;
  role?: ERole | string;
  email?: string;
  phoneNumber?: string;
  registerTeacher?: boolean | string;
};

export type CourseUnlockDto = {
  unlockCode: string;
};

export type AFindManyUsersDto = FindManyDto & AFindAllUsersDto;

export type CreateOrderDto = {
  paymentMethod: EPaymentMethod;
  cartId: number[];
};

export type UpdateOrderDto = {
  paymentMethod?: EPaymentMethod;
  status?: EOrderStatus;
};

export type FindAllOrdersDto = {
  status?: EOrderStatus;
};

export type FindManyOrdersDto = FindManyDto & FindAllOrdersDto;

export type AFindAllOrdersDto = AFindAllDto & {
  id?: number;
  paymentMethod?: EPaymentMethod;
  cartId?: number | number[];
  status?: EOrderStatus;
};

export type AFindManyOrdersDto = AFindManyDto & AFindAllOrdersDto;

export type ACreateOrderDto = {
  paymentMethod: EPaymentMethod;
  cartId: number[];
  userId: number;
  status?: EOrderStatus;
};

export type AUpdateOrderDto = AUpdateDto & {
  paymentMethod?: EPaymentMethod;
  cartId?: number[];
  status?: EOrderStatus;
};

// export type AUpdateCourseCategoryDto = AUpdateDto & {
//   name?: string;
//   orderPosition?:
//   icon: 'string';
// };

export type ACreateCourseCategoryDto = {
  name: string;
  icon: IconProp;
  orderPosition: number;
};

export type AUpdateCourseCategoryDto = AUpdateDto &
  Partial<ACreateCourseCategoryDto> & {};

export type ACreateCourseSubcategoryDto = {
  name: string;
  courseCategoryId: number;
  orderPosition: number;
};

export type AUpdateCourseSubcategoryDto = Partial<ACreateCourseSubcategoryDto> &
  AUpdateDto;

export type ForgotPasswordDto = {
  email: string;
};

export type ChangeForgotPasswordDto = {
  password: string;
  authJwt: string;
};

export type TFindAllOrderItemsDto = {
  courseId?: number;
  userId?: number;
  startDate?: string;
  endDate?: string;
};

export type TFindManyOrderItemsDto = TFindManyDto & TFindAllOrderItemsDto;

export type TFindRevenue = {
  startDate?: string;
  endDate?: string;
};
