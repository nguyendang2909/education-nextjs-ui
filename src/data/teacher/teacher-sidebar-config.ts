import {
  faBook,
  faCoins,
  faHome,
  faQuestion,
  faRotateBack,
} from '@fortawesome/free-solid-svg-icons';
import { APP_URL } from '../../config';
import { appShortTitle, Messages } from '../../lib/messages';
import { NavMenuItem } from '../../types';

export const teacherSidebarConfig: NavMenuItem[] = [
  { name: `trở về ${appShortTitle}`, path: APP_URL.home, icon: faRotateBack },
  {
    name: Messages.page.home,
    path: APP_URL.teacher.management,
    icon: faHome,
  },
  {
    name: `${Messages.action.manage} ${Messages.course.name}`,
    path: APP_URL.teacher.courses,
    icon: faBook,
  },
  {
    name: `${Messages.action.manage} ${Messages.course.question}`,
    path: APP_URL.teacher.courseQuestions,
    icon: faQuestion,
  },
  {
    name: `${Messages.action.manage} ${Messages.order.revenue}`,
    path: APP_URL.teacher.revenue,
    icon: faCoins,
  },
];
