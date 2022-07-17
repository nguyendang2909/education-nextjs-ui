import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { AccountPopover } from './AccountPopover';
import { GuestAuthMenu } from './GuestAuthMenu';

export const AuthMenu: FC = () => {
  const logged = useAppSelector(state => state.user?.logged);

  if (logged === undefined) {
    return <></>;
  }

  if (!logged) {
    return <GuestAuthMenu />;
  }

  return <AccountPopover />;
};
