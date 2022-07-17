import {
  faBook,
  faCamera,
  faFileSignature,
  faSackDollar,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { AppStepConnector } from '../../../components/Step';

export const CourseImplementationSteps: FC = () => {
  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={4}
          connector={<AppStepConnector />}
        >
          <Step>
            <StepLabel
              icon={
                <Avatar variant="rounded" sx={{ width: 44, height: 44 }}>
                  <Typography color="primary.main">
                    <FontAwesomeIcon icon={faFileSignature} />
                  </Typography>
                </Avatar>
              }
            >
              <Typography variant="h4">Kế hoạch hợp tác</Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              icon={
                <Avatar variant="rounded" sx={{ width: 44, height: 44 }}>
                  <Typography color="primary.main">
                    <FontAwesomeIcon icon={faVideo} />
                  </Typography>
                </Avatar>
              }
            >
              <Typography variant="h4">Sản xuất khóa học</Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              icon={
                <Avatar variant="rounded" sx={{ width: 44, height: 44 }}>
                  <Typography color="primary.main">
                    <FontAwesomeIcon icon={faSackDollar} />
                  </Typography>
                </Avatar>
              }
            >
              <Typography variant="h4">Khai thác khóa học</Typography>
            </StepLabel>
          </Step>
        </Stepper>
      </Stack>
    </>
  );
};
