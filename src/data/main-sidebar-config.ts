import {
  faBookOpenReader,
  faGear,
  faHome,
  faSchool,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { APP_URL } from '../config';
import { Messages } from '../lib/messages';
import { NavMenuItem } from '../types';
import { ERole } from '../types/enums';

export const mainSidebarConfig: NavMenuItem[] = [
  {
    name: Messages.page.home,
    path: APP_URL.home,
    icon: faHome,
  },
  {
    name: Messages.course.my,
    path: APP_URL.classrooms,
    icon: faBookOpenReader,
    requiredRoles: [ERole.Admin, ERole.Teacher, ERole.Member],
  },
  {
    name: Messages.course.unlock,
    path: APP_URL.courseUnlock,
    icon: faUnlock,
  },
  {
    name: Messages.teacher.management,
    path: APP_URL.teacher.management,
    icon: faSchool,
    requiredRoles: [ERole.Teacher],
  },
  {
    name: Messages.admin.management,
    path: APP_URL.admin.home,
    icon: faGear,
    requiredRoles: [ERole.Admin],
  },
];
