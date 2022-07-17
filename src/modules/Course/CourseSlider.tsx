import Slider from 'react-slick';
import { Box } from '@mui/material';
import { FC, Fragment } from 'react';
import { CourseData } from '../../types/fetch-data.type';
import { CourseCard } from './CourseCard';
import {
  NextArrowSlider,
  PrevArrowSlider,
} from '../../components/Slider/arrow';

type CoursesSliderProps = {
  courses: CourseData[];
};

export const CoursesSlider: FC<CoursesSliderProps> = ({ courses }) => {
  return (
    <>
      <Slider
        dots={false}
        infinite={false}
        speed={500}
        slidesToShow={3.7}
        slidesToScroll={1}
        initialSlide={0}
        arrows={true}
        nextArrow={<NextArrowSlider />}
        prevArrow={<PrevArrowSlider />}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2.7,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1.7,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1.3,
            },
          },
        ]}
      >
        {courses.map((course, index) => {
          const { id: courseId } = course;

          return (
            <Fragment key={index}>
              {!!courseId && (
                <Box
                  sx={{
                    padding: '16px 32px 36px 0px',
                    marginLeft: '1px',
                  }}
                >
                  <CourseCard data={course}></CourseCard>
                </Box>
              )}
            </Fragment>
          );
        })}
      </Slider>
    </>
  );
};
