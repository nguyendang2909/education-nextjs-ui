import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBagShopping,
  faBook,
  faPersonChalkboard,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { APP_URL } from '../config';
import { Messages } from '../lib/messages';
import { ERole } from '../types/enums';

export type AccountMenuItem = {
  name: string;
  path: string;
  icon?: IconProp;
  info?: string;
  roles?: ERole[];
  // children?: AccountMenuItem;
};

export const ACCOUNT_MENU_CONFIG: AccountMenuItem[] = [
  {
    name: 'Khoá học của tôi',
    icon: faBook,
    path: APP_URL.classrooms,
  },
  {
    name: `${Messages.order.name} của tôi`,
    icon: faBagShopping,
    path: APP_URL.orders,
  },
  {
    name: `${Messages.action.register} ${Messages.teacher.name}`,
    icon: faPersonChalkboard,
    path: APP_URL.teacher.register,
    roles: [ERole.Member],
  },
  {
    name: 'Quản lý tài khoản',
    icon: faUserTie,
    path: APP_URL.user.management,
  },
];
