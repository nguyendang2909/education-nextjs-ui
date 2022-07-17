export const courseParamSplitter = '-id.';

// export const courseCategoryParamSplitter = '-id.';

export const teacherParamSplitter = '-id.';

export const APPBAR_MOBILE = 64;

export const APPBAR_DESKTOP = 92;

export const DRAWER_WIDTH = 280;

export const DEFAULT_PAGE_SIZE = 50;

export const LAYOUT_CONFIG = {
  classRoom: {
    appBarHeightDesktop: 92,
    appBarHeightMobile: 64,
  },
  main: {
    topbar: {
      first: {
        height: 72,
        mobileHeight: 64,
      },
      second: {
        height: 44,
        mobileHeight: 44,
      },
    },
  },
};

export const APP_URL = {
  admin: {
    home: '/admin',
    courses: '/admin/khoa-hoc',
    courseCategories: '/admin/danh-muc-khoa-hoc',
    orders: '/admin/don-hang',
    users: '/admin/user',
  },
  cart: '/gio-hang',
  checkout: '/thanh-toan',
  checkoutMomo: '/thanh-toan/momo',
  checkoutMoneyTransfer: '/thanh-toan/chuyen-khoan',
  classrooms: '/lop-hoc',
  courses: '/khoa-hoc',
  courseUnlock: '/khoa-hoc/kich-hoat',
  home: '/',
  login: '/login',
  notFound: '/404',
  orderConfirm: '/don-hang/xac-nhan',
  orderMoneyTransfer: '/don-hang/chuyen-khoan',
  orders: '/don-hang',
  privacyPolicy: '/chinh-sach-bao-mat',
  register: '/register',
  registerTeacher: '/dang-ky-giang-vien',
  teacher: {
    courseQuestions: '/giang-vien/cau-hoi',
    courses: '/giang-vien/khoa-hoc',
    createCourse: '/giang-vien/khoa-hoc/khoa-hoc-moi',
    home: '/giang-vien',
    management: '/giang-vien/quan-ly',
    orders: '/giang-vien/don-hang',
    revenue: '/giang-vien/doanh-thu',
    register: '/giang-vien/dang-ky',
  },
  teachers: '/giang-vien',
  termsOfService: '/dieu-khoan-dich-vu',
  user: {
    courses: '/tai-khoan/khoa-hoc',
    management: '/tai-khoan/quan-ly',
    basicInfo: '/tai-khoan/thong-tin-co-ban',
  },
};

export const APP_API = {
  admin: {
    count: {
      users: '/admin/users/count',
      orders: '/admin/orders/count',
      courses: '/admin/courses/count',
      courseCategories: '/admin/course-categories/count',
      courseSubcategories: '/admin/course-subcategories/count',
    },
    courseCategories: '/admin/course-categories',
    courses: '/admin/courses',
    courseSubcategories: '/admin/course-subcategories',
    courseCoverImage: '/admin/courses/cover-image',
    courseBanner: '/admin/courses/banner',
    courseParts: '/admin/course-parts',
    lessons: '/admin/lessons',
    orders: '/admin/orders',
    userAvatar: '/admin/users/avatar',
    users: '/admin/users',
  },
  auth: {
    changeForgotPassword: '/auth/change-forgot-password',
  },
  cartPrice: '/carts/price',
  carts: '/carts',
  cartsRegisterFreeCourse: '/carts/free-course',
  count: {
    carts: '/carts/count',
    courseParts: '/course-parts/count',
    courseQuestions: '/course-questions/count',
    courseRatings: '/course-ratings/count',
    courses: '/courses/count',
    orders: '/orders/count',
  },
  courseUnlock: '/courses/unlock',
  courseAnswers: '/course-answers',
  courseParts: '/course-parts',
  courseRatings: '/course-ratings',
  courses: '/courses',
  courseCategories: '/course-categories',
  courseIntroductionVideo: '/courses/video',
  courseQuestions: '/course-questions',
  courseSubcategories: '/course-subcategories',
  currentUser: '/users/current',
  forgotPassword: '/auth/forgot-password',
  learnCourse: '/courses/learn',
  lessons: '/lessons',
  lessonsVideo: '/lessons/video',
  lessonsTrialVideo: '/lessons/trial-video',
  login: '/auth/login',
  loginFacebook: '/auth/facebook',
  loginGoogle: '/auth/google',
  orders: '/orders',
  payments: '/payments',
  teachers: {
    count: {
      courseQuestions: '/teacher/course-questions/count',
      countOrderItems: '/teacher/order-items/count',
    },
    countCourses: '/teacher/courses/count',
    courseIntroductionVideo: '/teacher/courses/video',
    courseQuestions: '/teacher/course-questions',
    courses: '/teacher/courses',
    coursesImage: '/teacher/courses/image',
    coursesVideo: '/teacher/courses/video',
    courseParts: '/teacher/course-parts',
    lessons: '/teacher/lessons',
    lessonVideo: '/teacher/lessons/video',
    orderItems: '/teacher/order-items',
    revenue: '/teacher/order-items/revenue',
  },
  user: '/users/current',
  userAvatar: '/users/current/avatar',
  users: '/users',
};
