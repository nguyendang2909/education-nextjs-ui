import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { FC, Fragment } from 'react';
import { IconWrapper } from '../../components/Icon';
import { NextLink } from '../../components/Link';
import { courseCategoriesService } from '../../lib/course-categories.service';
import { Messages, setMessage } from '../../lib/messages';
import { CourseCategoryData } from '../../types/fetch-data.type';

type CourseCategoryGridCardsProps = {
  courseCategories: CourseCategoryData[];
};

export const CourseCategoryGridCards: FC<CourseCategoryGridCardsProps> = ({
  courseCategories,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {courseCategories.map((courseCategory, index) => {
          return (
            <Fragment key={index}>
              {courseCategory.id && (
                <Grid item xs={6} sm={4} md={3}>
                  <NextLink
                    href={courseCategoriesService.getPageLinkFromIdAndName(
                      courseCategory.id,
                      courseCategory.name,
                    )}
                    passHref
                  >
                    <Card>
                      <CardActionArea>
                        <CardContent>
                          <IconWrapper>
                            <FontAwesomeIcon
                              icon={courseCategory.icon || 'question'}
                            />
                          </IconWrapper>
                          <Typography
                            variant="h4"
                            noWrap
                            sx={{
                              fontWeight: 'bold',
                              // textTransform: 'uppercase',
                              textAlign: 'center',
                            }}
                          >
                            {setMessage(courseCategory.name)}
                          </Typography>
                          <Typography
                            noWrap
                            sx={{
                              // fontWeight: 'bold',
                              // textTransform: 'uppercase',
                              textAlign: 'center',
                            }}
                          >
                            {'('}
                            {setMessage(
                              courseCategory.countCourses?.toString() || '0',
                              Messages.course.name,
                            )}
                            {')'}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </NextLink>
                </Grid>
              )}
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};
