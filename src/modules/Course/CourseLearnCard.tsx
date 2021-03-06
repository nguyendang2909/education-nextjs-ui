import {
  faBookBookmark,
  faBookmark,
  faCalendarCheck,
  faCirclePlay,
  faClock,
  faLaptopFile,
  faUsers,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  SxProps,
  CardMedia,
  Box,
} from '@mui/material';
import { Formatter } from '../../lib/formatter';
import { CourseData, OrderItemData } from '../../types/fetch-data.type';
import { requestService } from '../../lib/request';
import { FC } from 'react';
import { CourseLearnNav } from './CourseLearnNav';
import { Messages } from '../../lib/messages';

type CourseLearnCardProps = {
  course: CourseData;
  courseOrder?: OrderItemData;
  sx?: SxProps<Theme>;
  onClickAddToCart: () => void;
  onClickRegisterToLearn: () => void;
};

export const CourseLearnCard: FC<CourseLearnCardProps> = ({
  sx = {},
  course,
  courseOrder,
  onClickAddToCart,
  onClickRegisterToLearn,
}) => {
  return (
    <>
      {!!course?.id && (
        <>
          <Card sx={{ width: '350px', ...sx }}>
            <CardMedia
              component={Box}
              sx={{
                height: '200px',
                backgroundImage: course.coverImageURL
                  ? `url("${requestService.getURL(course.coverImageURL)}")`
                  : undefined,
              }}
            ></CardMedia>
            <CardContent>
              {!!course.promotionPrice || course.promotionPrice === 0 ? (
                <Box component="div" sx={{ mb: 2 }}>
                  <Typography
                    component="span"
                    sx={{ fontSize: 24, mr: 1, fontWeight: 'bold' }}
                  >
                    {Formatter.formatMoney(course?.promotionPrice)}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ fontSize: 16, textDecoration: 'line-through' }}
                  >
                    {Formatter.formatMoney(course.price)}
                  </Typography>
                </Box>
              ) : (
                <Typography sx={{ fontSize: 24, mr: 1, fontWeight: 'bold' }}>
                  {Formatter.formatMoney(course.price)}
                </Typography>
              )}

              <CourseLearnNav
                course={course}
                courseOrder={courseOrder}
                onClickRegisterToLearn={onClickRegisterToLearn}
                onClickAddToCart={onClickAddToCart}
              />

              <List>
                {!!course.countStudents && course.countStudents > 0 ? (
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faUsers} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography component="span">
                        {course.countStudents} {Messages.course.student}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ) : (
                  <></>
                )}

                {!!course.duration && course.duration > 0 ? (
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faClock} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography>{course.duration} ph??t</Typography>
                    </ListItemText>
                  </ListItem>
                ) : (
                  <></>
                )}

                {!!course.countLessons && course.countLessons > 0 ? (
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faCirclePlay} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {`${course.countLessons} b??i gi???ng`}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ) : (
                  <></>
                )}

                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faWifi} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>H???c online m???i l??c, m???i n??i</Typography>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faLaptopFile} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>H???c tr??n m??y t??nh, ??i???n tho???i</Typography>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faBookBookmark} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>S??? h???u kho?? h???c tr???n ?????i</Typography>
                  </ListItemText>
                </ListItem>

                {/* <ListItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPercent} />
          </ListItemIcon>
          <ListItemText>
            <Typography>
              Gi???m th??m <b>20k</b> khi thanh to??n online
            </Typography>
          </ListItemText>
        </ListItem> */}

                {!!course.updatedAt && (
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faCalendarCheck} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography>
                        C???p nh???t: {Formatter.formatTimeToDate(course.updatedAt)}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};
