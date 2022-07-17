import {
  AccordionDetails,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  List,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { AppAccordion, AppAccordionSummary } from '../../components/Accordin';
import { BoxSpacingBottom } from '../../components/Box';
import {
  TypographyBold,
  TypographyBorderBottom,
} from '../../components/Text/Typography';
import { VideoPlayer } from '../../components/VideoPlayer';
import { APP_API } from '../../config';
import { lessonsService } from '../../lib/lessons.service';
import { Messages, setMessage } from '../../lib/messages';
import { requestService } from '../../lib/request';
import { CoursePartData } from '../../types/fetch-data.type';
import { CoursePartListItem } from '../CoursePart/CoursePartListItem';

type CourseContentCardProps = {
  courseParts: CoursePartData[];
};

export const CourseContentCard: React.FC<CourseContentCardProps> = ({
  courseParts,
}) => {
  const [trialLessonId, setTrialLessonId] = useState<number | undefined>(
    undefined,
  );

  const handleClickTrial = (lessonId: number) => {
    setTrialLessonId(lessonId);
  };

  const handleCloseTrial = () => {
    setTrialLessonId(undefined);
  };

  return (
    <>
      <Card>
        <CardContent>
          <BoxSpacingBottom>
            <TypographyBorderBottom variant="h2">
              {setMessage(Messages.course.content)}
            </TypographyBorderBottom>
          </BoxSpacingBottom>

          {courseParts.length > 0 &&
            courseParts.map((coursePart, index) => {
              return (
                <Fragment key={index}>
                  <CoursePartListItem
                    number={index + 1}
                    data={coursePart}
                    onClickTrial={handleClickTrial}
                  />
                </Fragment>
              );
            })}
        </CardContent>
      </Card>

      <Dialog open={!!trialLessonId} onClose={handleCloseTrial}>
        <Box
          sx={{
            overflow: 'hidden',
            minWidth: { xs: '400px', sm: '500px', md: '600px' },
          }}
        >
          <VideoPlayer
            autoPlay
            url={requestService.getURL(
              `${APP_API.lessonsTrialVideo}/${trialLessonId}`,
            )}
          />
        </Box>
      </Dialog>
    </>
  );
};
