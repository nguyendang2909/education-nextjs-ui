import { Card, CardContent, SxProps, Theme } from '@mui/material';
import React from 'react';
import ReactPlayer from 'react-player';
import { APP_API } from '../../../config';
import { requestAPI, requestService } from '../../../lib/request';

type CourseIntroductionProps = {
  introductionVideoURL?: string;
  coverImageURL?: string;
  autoPlay?: boolean;
  courseId: number;
};

export const CourseIntroductionInEditMode: React.FC<
  CourseIntroductionProps
> = props => {
  const {
    introductionVideoURL,
    coverImageURL,
    autoPlay = true,
    courseId,
  } = props;

  if (introductionVideoURL) {
    return (
      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%' /* 720 / 1280 = 0.5625 */,
        }}
      >
        <ReactPlayer
          style={{ position: 'absolute', top: 0, left: 0 }}
          width="100%"
          height="100%"
          playing={autoPlay}
          url={requestService.getURL(
            `${APP_API.teachers.courseIntroductionVideo}/${courseId}`,
          )}
          controls
        />
      </div>
    );
  }

  if (coverImageURL) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="anh-bia-khoa-hoc" src={coverImageURL} />;
  }

  return <></>;
};
