export enum ERole {
  Admin = 'admin',
  Member = 'member',
  Teacher = 'teacher',
}

export enum ECoursePublish {
  NotPublished = 'notPublished',
  Rejected = 'rejected',
  Pending = 'pending',
  Published = 'published',
}

export const coursePublishStatus = {
  [ECoursePublish.NotPublished]: 'không đăng bán',
  [ECoursePublish.Rejected]: 'bị từ chối',
  [ECoursePublish.Pending]: 'đang yêu cầu',
  [ECoursePublish.Published]: 'đã đăng bán',
};

export enum ELessonType {
  Video = 'video',
  // File = 'file',
  Test = 'test',
  Text = 'text',
}

export enum EGender {
  male = 'male',
  female = 'female',
  unknown = 'unknown',
}

export enum ERegisterTeacher {
  pending = 'pending',
  reject = 'reject',
  notRegistered = 'notRegistered',
  accept = 'accept',
}

export enum ECourseImageType {
  Banner = 'banner',
  CoverImage = 'coverImage',
}

export enum EVideoProcessingStatus {
  Processing = 'processing',
  Done = 'done',
  None = 'none',
  Error = 'error',
}

export enum EPaymentMethod {
  Momo = 'momo',
  MoneyTransfer = 'moneyTransfer',
}

export enum EOrderStatus {
  // WaitForConfirmation = 'waitForConfirmation',
  WaitForPayment = 'waitForPayment',
  Cancel = 'cancel',
  Success = 'success',
}
