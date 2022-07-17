import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Tooltip } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import {
  fetchCartCountThunk,
  setCartCount,
} from '../../store/reducers/cart.reducer';
import { IconButtonMenuTop } from '../../components/IconButton';
import { NextLink } from '../../components/Link';
import { Messages, setMessage } from '../../lib/messages';

export const CartMenu: FC = () => {
  const dispatch = useDispatch();

  const currentUserId = useAppSelector(state => state.user?.info?.id);

  const cartCount = useAppSelector(state => state.cart?.count);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchCartCountThunk());
    } else {
      dispatch(setCartCount(0));
    }
  }, [dispatch, currentUserId]);

  return (
    <Tooltip title={setMessage(Messages.cart.name)}>
      <Badge badgeContent={cartCount} color="primary">
        <NextLink href="/gio-hang" passHref>
          <IconButtonMenuTop>
            <FontAwesomeIcon icon={faCartShopping} />
          </IconButtonMenuTop>
        </NextLink>
      </Badge>
    </Tooltip>
  );
};
