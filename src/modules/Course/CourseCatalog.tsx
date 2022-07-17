import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { BoxCenter } from '../../components/Box';
import { NextLink } from '../../components/Link';
import { APP_URL } from '../../config';
import { coursesService } from '../../lib/courses.service';
import { Messages } from '../../lib/messages';
import { CourseCategoryData } from '../../types/fetch-data.type';
import { CourseCatalogPanelContent } from './CourseCatalogPanelContent';

type CourseCatalogProps = {
  courseCategories: CourseCategoryData[];
};

export const CourseCatalog: FC<CourseCatalogProps> = ({ courseCategories }) => {
  const [courseCategoryId, setCourseCategoryId] = useState<number>(
    courseCategories[0].id || 0,
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCourseCategoryId(+newValue);
  };

  const coursesQueryResult = useQuery(
    ['coursesCatalog', courseCategoryId],
    () =>
      coursesService.getMany({
        sortBy: 'popularity',
        pageSize: 20,
        courseCategoryId: !!courseCategoryId ? courseCategoryId : undefined,
      }),
  );

  return (
    <>
      <TabContext value={courseCategoryId.toString()}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} variant="scrollable">
            <Tab label={Messages.common.all} value="0" />

            {courseCategories.map((courseCategory, index) => {
              return (
                <Tab
                  key={index}
                  label={courseCategory.name}
                  value={courseCategory.id?.toString() || ''}
                />
              );
            })}
          </TabList>
        </Box>

        <TabPanel value="0">
          <CourseCatalogPanelContent coursesQueryResult={coursesQueryResult} />
        </TabPanel>

        {courseCategories.map((courseCategory, index) => {
          return (
            <TabPanel
              key={index}
              value={courseCategory.id?.toString() || ''}
              sx={{ padding: 0 }}
            >
              <CourseCatalogPanelContent
                coursesQueryResult={coursesQueryResult}
              />
            </TabPanel>
          );
        })}
      </TabContext>

      <BoxCenter>
        <NextLink
          href={{
            pathname: `${APP_URL.courses}`,
            query: {
              courseCategoryId: !!+courseCategoryId
                ? courseCategoryId
                : undefined,
            },
          }}
        >
          <Button
            variant="outlined"
            endIcon={<FontAwesomeIcon icon={faAngleDown} />}
          >
            {Messages.action.seeMore}
          </Button>
        </NextLink>
      </BoxCenter>
    </>
  );
};
