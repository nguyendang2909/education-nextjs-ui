import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FC } from 'react';
import { ButtonToCourses } from '../../components/Button/ActionButton';

import { NotificationBox } from '../../components/Notification/NotificationBox';
import { TypographyCenter } from '../../components/Text/Typography';

export const CartEmpty: FC = () => {
  return (
    <>
      <NotificationBox
        title="Giỏ hàng trống"
        subtitle="Hãy tiếp tục tìm kiếm khoá học để bỏ vào giỏ hàng nhé"
        image={
          <>
            <TypographyCenter color="text.secondary">
              <FontAwesomeIcon icon={faCartShopping} size="6x" />
            </TypographyCenter>
          </>
        }
        actions={
          <>
            <ButtonToCourses />
          </>
        }
      />
    </>
  );
};
