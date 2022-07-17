import { Stack } from '@mui/material';
import { FC, Fragment } from 'react';
import { BoxSpacing } from '../../components/Box';
import { UserCommentBox } from '../../components/User/UserAvatarBox';
import { CourseRatingData } from '../../types/fetch-data.type';

type CourseRatingsStackProps = {
  courseRatings: CourseRatingData[];
};

export const CourseRatingsStack: FC<CourseRatingsStackProps> = ({
  courseRatings,
}) => {
  return (
    <Stack>
      {courseRatings.map((courseRating, index) => {
        const { user, rating, comment } = courseRating;

        return (
          <Fragment key={index}>
            <BoxSpacing
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <UserCommentBox
                fullname={user?.displayName}
                avatarURL={user?.displayAvatarURL}
                rating={rating}
                createdAt={user?.updatedAt}
                content={comment}
              ></UserCommentBox>
            </BoxSpacing>
          </Fragment>
        );
      })}
    </Stack>
  );
};
