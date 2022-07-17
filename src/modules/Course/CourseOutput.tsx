import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { BoxSpacingBottom } from '../../components/Box';
import { TypographyBorderBottom } from '../../components/Text/Typography';
import groupImage from '../../../public/static/images/course/group.png';
import Image from 'next/image';
import { appShortTitle } from '../../lib/messages';

type CourseOutputCardProps = {
  courseOutput: string;
};

export const CourseOutput: React.FC<CourseOutputCardProps> = ({
  courseOutput,
}) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={7}>
          <BoxSpacingBottom>
            <TypographyBorderBottom variant="h2">
              Bạn sẽ học được gì nếu đăng ký khóa học này tại {appShortTitle}
            </TypographyBorderBottom>
          </BoxSpacingBottom>

          <CourseOutputGrid courseOutput={courseOutput} />
        </Grid>

        <Hidden mdDown>
          <Grid item md={5}>
            <Image src={groupImage} layout="responsive" alt="khoa-hoc-online" />
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

type CourseOutputGridProps = {
  courseOutput: string;
};

export const CourseOutputGrid: React.FC<CourseOutputGridProps> = ({
  courseOutput,
}) => {
  const items = courseOutput.split('\n');

  if (!items || !items.length) {
    return <></>;
  }

  return (
    <List
      component={Grid}
      container
      direction="row"
      sx={{ alignItems: 'flex-start' }}
    >
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {!!item && (
              // <ListItem component={Grid} item xs={12} md={6}></ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="#17aa1c"
                  ></FontAwesomeIcon>
                </ListItemIcon>
                <ListItemText primary={item}></ListItemText>
              </ListItem>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};
