import { setMessage } from './messages';

class ClassroomsService {
  getPageLinkFromCourseId(courseId: number): string {
    return `/lop-hoc/${courseId}`;
  }

  getCoursePrice(price?: number): string {
    if (!price) {
      return setMessage('miễn phí');
    }

    return `${price} đ`;
  }
}

export const classroomsService = new ClassroomsService();
