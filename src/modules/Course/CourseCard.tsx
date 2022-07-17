import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  Rating,
  Box,
  Theme,
  SxProps,
  Stack,
  CardActionArea,
} from '@mui/material';
import { coursesService } from '../../lib/courses.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setMessage } from '../../lib/messages';
import { CourseData } from '../../types/fetch-data.type';
import { Formatter } from '../../lib/formatter';
import { requestAPI, requestService } from '../../lib/request';
import {
  TypographyPrice,
  TypographyTwoLine,
} from '../../components/Text/Typography';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { AppLink } from '../../components/Link';
import { specialCharacters } from '../../lib/special-characters';
import { CardZ8 } from '../../components/Card';

type FCProps = {
  data: CourseData;
  sx?: SxProps<Theme>;
};

export const CourseCard: React.FC<FCProps> = ({ data, sx }) => {
  const theme = useTheme();

  const course = data;

  const {
    id,
    name: courseName,
    courseSubcategory,
    // boughtUsers,
    // subTitle,
    user: teacher,
    // introductionVideoURL,
    // about,
    // coursePart,
    price,
    promotionPrice,
    // promotionStartTime,
    // promotionEndTime,
    // publish,
    coverImageURL,
    // output,
    countStudents,
    countRatings,
    averageRatings,
  } = course;

  if (!course || !course.id) {
    return <></>;
  }

  if (!id) {
    return <></>;
  }

  const courseLink = coursesService.getPageLinkFromCourseIdAndName(
    id,
    courseName,
  );

  const courseCategoryId = courseSubcategory?.courseCategory?.id;

  const courseCategoryName = courseSubcategory?.courseCategory?.name;

  const courseCategoryIcon =
    courseSubcategory?.courseCategory?.icon || 'question';

  // const courseSubcategoryId = courseSubcategory?.id;

  // const courseSubcategoryName = courseSubcategory?.name;

  const formattedPrice = Formatter.formatMoney(price);

  const formattedPromotionPrice = Formatter.formatMoney(promotionPrice);

  return (
    <>
      <CardZ8 sx={{ ...sx }}>
        <AppLink href={courseLink}>
          <CardActionArea>
            <CardMedia
              component={Box}
              sx={{
                height: '150px',
                backgroundImage: coverImageURL
                  ? `url("${requestService.getURL(coverImageURL)}")`
                  : undefined,
              }}
            ></CardMedia>
            <CardContent sx={{ padding: 2 }}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{ color: theme.palette.secondary.main }}
              >
                {!!courseCategoryId ? (
                  <>
                    <FontAwesomeIcon icon={courseCategoryIcon} />
                    {'\u00A0'}
                    {setMessage(courseCategoryName)}
                  </>
                ) : (
                  <>{'\u00A0'}</>
                )}
              </Typography>

              <TypographyTwoLine
                sx={{
                  color: 'text.primary',
                  fontWeight: 'bold',
                  lineHeight: '1.5em',
                  height: '3em',
                }}
              >
                {setMessage(courseName)}
              </TypographyTwoLine>

              <Typography
                variant="body2"
                component="span"
                noWrap
                color="text.secondary"
              >
                {setMessage(teacher?.displayName) || specialCharacters.space}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <TypographyPrice>
                  {promotionPrice === null
                    ? formattedPrice
                    : formattedPromotionPrice}
                </TypographyPrice>
                <Typography
                  variant="caption"
                  color="GrayText"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {promotionPrice === null ? '' : formattedPrice}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center">
                  {averageRatings && (
                    <>
                      <Rating
                        defaultValue={averageRatings}
                        precision={0.5}
                        readOnly
                      ></Rating>
                      ({countRatings})
                    </>
                  )}
                </Stack>
                <Typography sx={{ color: 'text.primary' }}>
                  <FontAwesomeIcon icon={faUsers} /> {countStudents || 0}{' '}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </AppLink>
      </CardZ8>
    </>
  );
};
