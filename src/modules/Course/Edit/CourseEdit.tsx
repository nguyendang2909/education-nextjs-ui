import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { CourseAboutEditCard } from './EditCourseAbout';
import { CourseCoverImageEditCard } from './EditCourseCoverImage';
import { CourseIntroductionEditCard } from './EditCourseIntroduction';
import { CourseOutputEditCard } from './EditCourseOutput';
import { CoursePriceEditCard } from './EditCoursePrice';
import { CourseTitleEditCard } from './EditCourseTitle';
import { Messages, setMessage } from '../../../lib/messages';
import { CourseData } from '../../../types/fetch-data.type';
import { ContainerSpacing } from '../../../components/Container';
import { CourseBannerEditCard } from './EditCourseBanner';

type CourseEditProps = {
  course: CourseData;
  refetch: () => void;
};

enum ETab {
  generelInformation = 'generel_information',
  content = 'content',
  about = 'about',
}

export const CourseEdit: FC<CourseEditProps> = ({ course, refetch }) => {
  const [tab, setTab] = useState<ETab>(ETab.generelInformation);

  // const {
  //   id: courseId,
  //   certificate: courseCertificate,
  //   name: courseName,
  //   introductionVideoURL,
  //   coverImageURL,
  //   price,
  //   promotionPrice,
  //   name,
  //   subTitle,
  //   about,
  //   publish,
  //   output,
  //   coursePart,
  //   bannerURL,
  //   duration: courseDuration,
  // } = course;

  // const pageTitle = `${Messages.course.name} "${
  //   courseName ? setMessage(course.name) : ''
  // }"`;

  // const handleChangeTab = (event: React.SyntheticEvent, newValue: ETab) => {
  //   setTab(newValue);
  // };

  return (
    <>
      {/* {courseId && (
        <ContainerSpacing>
          <Box sx={{ paddingBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
              {setMessage(pageTitle)}
            </Typography>
          </Box>

          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab}>
                <Tab
                  label={Messages.common.generalInformation}
                  value={ETab.generelInformation}
                />
                <Tab label={Messages.common.about} value={ETab.about} />
                <Tab label={Messages.course.content} value={ETab.content} />
              </TabList>
            </Box>

            <TabPanel value={ETab.generelInformation}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
                    <Grid item>
                      <CourseCoverImageEditCard
                        onFinish={refetch}
                        courseId={courseId}
                        coverImageURL={coverImageURL}
                        sx={{ height: '100%' }}
                      />
                    </Grid>
                    <Grid item flex="1 0">
                      <CourseTitleEditCard
                        id={courseId}
                        certificate={courseCertificate}
                        name={name}
                        subTitle={subTitle}
                        duration={courseDuration}
                        onFinish={refetch}
                        sx={{ height: '100%' }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <CourseBannerEditCard
                    courseId={courseId}
                    bannerURL={bannerURL}
                    onFinish={refetch}
                  />
                </Grid>

                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <CourseIntroductionEditCard
                        id={courseId}
                        introductionVideoURL={introductionVideoURL}
                        onFinish={refetch}
                        sx={{ height: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CoursePriceEditCard
                        price={price}
                        promotionPrice={promotionPrice}
                        publish={publish}
                        id={courseId}
                        onFinish={refetch}
                        sx={{ height: '100%' }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={ETab.about}>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <CourseAboutEditCard
                    id={courseId}
                    about={about}
                    onFinish={refetch}
                  />
                </Grid>
                <Grid item>
                  <CourseOutputEditCard
                    id={courseId}
                    output={output}
                    onFinish={refetch}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={ETab.content}>
              <Grid item>
                <CourseContentEditCard
                  id={courseId}
                  data={coursePart}
                  onFinish={refetch}
                />
              </Grid>
            </TabPanel>
          </TabContext>
        </ContainerSpacing>
      )} */}
    </>
  );
};
