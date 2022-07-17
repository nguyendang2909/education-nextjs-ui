import { Button } from '@mui/material';
import { FC } from 'react';
import { ButtonToCourses } from '../../components/Button/ActionButton';
import { NotificationBox } from '../../components/Notification/NotificationBox';

export const ClassroomsEmpty: FC = () => {
  return (
    <>
      <NotificationBox
        title={'bạn chưa đăng ký khoá học nào'}
        subtitle={'hãy tiếp tục tìm kiếm nhé'}
        actions={
          <>
            <ButtonToCourses />
          </>
        }
      />
    </>
  );
};
