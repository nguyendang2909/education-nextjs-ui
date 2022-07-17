import { faCodePullRequest, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
} from '@mui/material';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { IconWrapper } from '../../components/Icon';
import { NextLink } from '../../components/Link';
import { TypographyCenter } from '../../components/Text/Typography';
import { APP_URL } from '../../config';
import { AdminLayout } from '../../Layout/AdminLayout';
import { adminCourseCategoriesService } from '../../lib/admin-course-categories.service';
import { adminCoursesService } from '../../lib/admin-courses.service';
import { Messages } from '../../lib/messages';
import { NextPageWithLayout } from '../../types/components.type';
import { ECoursePublish } from '../../types/enums';

const Page: NextPageWithLayout = () => {
  const { data: countRequestPublishCourses } = useQuery(
    'countAllRequestPublishCourses',
    () =>
      adminCoursesService.count({
        publish: ECoursePublish.Pending,
        isActive: true,
      }),
  );

  const { data: countCourseCategories } = useQuery(
    'countAllCourseCategories',
    () => adminCourseCategoriesService.count({ isActive: true }),
  );

  return (
    <>
      <Head>
        <title>Trang quản lý admin</title>
      </Head>

      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <NextLink
                  href={{
                    pathname: APP_URL.admin.courses,
                    query: {
                      publish: ECoursePublish.Pending,
                      isActive: true,
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <IconWrapper>
                        <FontAwesomeIcon icon={faCodePullRequest} />
                      </IconWrapper>
                      <TypographyCenter sx={{ fontWeight: 700 }}>
                        {countRequestPublishCourses} yêu cầu
                      </TypographyCenter>
                      <TypographyCenter>đăng tải khoá học</TypographyCenter>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <NextLink
                  href={{
                    pathname: APP_URL.admin.courseCategories,
                    query: {
                      isActive: true,
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <IconWrapper>
                        <FontAwesomeIcon icon={faList} />
                      </IconWrapper>
                      <TypographyCenter sx={{ fontWeight: 700 }}>
                        {countCourseCategories} danh mục
                      </TypographyCenter>
                      <TypographyCenter>
                        trong {Messages.courseCategory.name}
                      </TypographyCenter>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

Page.layout = AdminLayout;

export default Page;
