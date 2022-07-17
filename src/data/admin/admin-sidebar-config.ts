import {
  faBook,
  faCartShopping,
  faHome,
  faList,
  faRotateBack,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { APP_URL } from '../../config';
import { appShortTitle, Messages } from '../../lib/messages';
import { NavMenuItem } from '../../types';

export const adminSidebarConfig: NavMenuItem[] = [
  { name: `trở về ${appShortTitle}`, path: APP_URL.home, icon: faRotateBack },
  {
    name: Messages.page.home,
    path: APP_URL.admin.home,
    icon: faHome,
  },
  {
    name: 'Quản lý danh mục khoá học',
    path: APP_URL.admin.courseCategories,
    query: { isActive: true },
    icon: faList,
  },
  {
    name: `${Messages.action.manage} ${Messages.course.name}`,
    path: APP_URL.admin.courses,
    query: { isActive: true },
    icon: faBook,
  },
  {
    name: `${Messages.action.manage} ${Messages.user.name}`,
    path: APP_URL.admin.users,
    query: { isActive: true },
    icon: faUserGroup,
  },
  {
    name: `${Messages.action.manage} ${Messages.cart.order}`,
    path: APP_URL.admin.orders,
    query: { isActive: true },
    icon: faCartShopping,
  },
];
