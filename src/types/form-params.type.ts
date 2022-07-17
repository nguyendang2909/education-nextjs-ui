import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { EGender, ELessonType, EOrderStatus, EPaymentMethod } from './enums';
import { CourseData } from './fetch-data.type';

export type LoginParams = {
  username: string;
  password: string;
  remember: boolean;
};

export type RegisterParams = {
  email?: string;
  phoneNumber?: string;
  password: string;
  rePassword: string;
  fullname?: string;
};

export type ForgotPasswordParams = {
  email: string;
};

export type ChangeLostPasswordParams = {
  password: string;
  retypePassword: string;
};

export type UpdateParams = {
  id: number;
};

export type UpdatePasswordParams = {
  password: string;
  rePassword: string;
};

export type AddToCartParams = {
  courseId: number;
};

export type UpdateCourseParams = Omit<Partial<CourseData>, 'id'> & {
  promotion?: boolean;
  file?: File;
};

export type CreateLessonParams = {
  name: string;
  trial: boolean;
  coursePartId: number;
  orderPosition?: number;
  file?: File;
  type: ELessonType;
};

export type UpdateLessonParams = Partial<
  Omit<CreateLessonParams, 'coursePartId'>
>;

export type CreateCoursePartParams = {
  courseId: number;
  name: string;
  orderPosition?: number;
};

export type UpdateCoursePartParams = Partial<CreateCoursePartParams>;

export type ACreateCourseCategoryParams = {
  name: string;
  icon: IconProp;
  orderPosition: number;
};

export type AUpdateCourseCategoryParams = Partial<ACreateCourseCategoryParams>;

export type CreateCourseSubcategoryParams = {
  courseCategoryId: number;
  name: string;
  orderPosition: number;
};

export type AUpdateCourseSubcategoryParams = {
  courseCategoryId?: number;
  name?: string;
  orderPosition?: number;
};

export type CreateCourseParams = {
  name: string;
  courseCategoryId?: number | '';
  courseSubcategoryId: number | '';
  subTitle?: string;
  teacher?: number;
  introductionVideoURL?: string;
  about?: string;
  // courseParts?: CoursePart[];
  price?: number;
  promotionPrice?: number;
  // promotionStartTime?: Date;
  // promotionEndTime?: Date;
  sell?: boolean;
};

export type CreateCourseRatingParams = {
  rating: number;
  comment: string;
};

export type UpdateUserParams = {
  // email?: string;
  // phoneNumber?: string;
  // password: string;
  // rePassword: string;
  fullname?: string;
  birthday?: Date;
  address?: string;
  title?: string;
  experience?: string;
  description?: string;
  gender?: EGender;
  avatar?: File;
  password?: string;
  retypePassword?: string;
  oldPassword?: string;
};

export type CreateCourseQuestionParams = {
  content: string;
};

export type CreateCourseAnswerParams = {
  content: string;
};

export type CourseUnlockParams = {
  unlockCode: string;
};

export type CreateOrderParams = {
  paymentMethod: EPaymentMethod;
};

export type UpdateOrderParams = {
  paymentMethod?: EPaymentMethod;
  status?: EOrderStatus;
};
