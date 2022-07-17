import { Breadcrumbs, SxProps, Theme } from '@mui/material';
import React from 'react';
import { Breadcrumb, BreadcrumbHome } from '.';
import { courseCategoriesService } from '../../lib/course-categories.service';
import { courseSubcategoriesService } from '../../lib/course-subcategories.service';
import { CourseSubcategoryData } from '../../types/fetch-data.type';

type FCProps = {
  data?: CourseSubcategoryData;
  sx?: SxProps<Theme>;
};

export const CourseBreadcrumbs: React.FC<FCProps> = ({ data, sx = {} }) => {
  const courseSubcategory = data;

  if (!courseSubcategory) {
    return <></>;
  }

  const courseCategory = courseSubcategory?.courseCategory;

  const courseCategoryId = courseCategory?.id;

  const courseCategoryName = courseCategory?.name;

  const courseCategoryIcon = courseCategory?.icon || 'question';

  const courseSubcategoryId = courseSubcategory?.id;

  const courseSubcategoryName = courseSubcategory?.name;

  return (
    <Breadcrumbs sx={{ ...sx }}>
      <BreadcrumbHome sx={{ ...sx }} />
      {!!courseCategoryId && (
        <Breadcrumb
          title={courseCategoryName}
          path={courseCategoriesService.getPageLinkFromIdAndName(
            courseCategoryId,
            courseCategoryName,
          )}
          icon={courseCategoryIcon}
          sx={{ ...sx }}
        />
      )}
      {!!courseSubcategoryId && (
        <Breadcrumb
          sx={{ ...sx }}
          title={courseSubcategoryName}
          path={courseSubcategoriesService.getPageLinkFromIdAndName(
            courseSubcategoryId,
            courseSubcategoryName,
          )}
        />
      )}
    </Breadcrumbs>
  );
};
