import { useQuery } from 'react-query';
import { courseCategoriesService } from '../lib/course-categories.service';

export const useCourseCategories = () => {
  return useQuery('courseCategories', () =>
    courseCategoriesService.getAll({ countCourses: true }),
  );
};
