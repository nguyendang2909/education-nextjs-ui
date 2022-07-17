import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { NextLink } from '../../components/Link';
import { classroomsService } from '../../lib/classrooms.service';
import { coursesService } from '../../lib/courses.service';
import { Messages, setMessage } from '../../lib/messages';
import { CourseData, OrderItemData } from '../../types/fetch-data.type';

type CourseLearnNavProps = {
  courseOrder?: OrderItemData;
  course: CourseData;
  promotionPrice?: number;
  onClickRegisterToLearn: () => void;
  onClickAddToCart: () => void;
};

export const CourseLearnNav: FC<CourseLearnNavProps> = ({
  onClickAddToCart,
  onClickRegisterToLearn,
  courseOrder,
  course,
}) => {
  const router = useRouter();

  const courseId = coursesService.getIdFromParamId(router.query.id as string);

  if (!router.isReady) {
    return <></>;
  }

  if (courseOrder?.id) {
    return (
      <>
        <NextLink
          href={classroomsService.getPageLinkFromCourseId(courseId)}
          passHref
        >
          <Button fullWidth size="large" variant="contained" sx={{ mb: 2 }}>
            Vào học
          </Button>
        </NextLink>
      </>
    );
  }

  return (
    <Stack spacing={2}>
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={onClickRegisterToLearn}
      >
        Đăng ký học
      </Button>

      <Box>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<FontAwesomeIcon icon={faCartPlus} />}
          onClick={onClickAddToCart}
          disabled={course.price === 0 || course.promotionPrice === 0}
        >
          {setMessage(Messages.action.addTo, Messages.cart.name)}
        </Button>

        {/* <Typography align="center" variant="body2" color="text.secondary">
          Hoàn tiền trong 7 ngày nếu không hài lòng
        </Typography> */}
      </Box>
    </Stack>
  );
};
