import { Avatar, AvatarClasses, SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { Messages } from '../../lib/messages';
import { requestService } from '../../lib/request';
import { UserData } from '../../types/fetch-data.type';

type AvatarUserProps = {
  data?: UserData;
  alt?: string;
  children?: React.ReactNode;
  classes?: Partial<AvatarClasses>;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {
    sx?: SxProps<Theme>;
  };
  sizes?: string;
  src?: string;
  srcSet?: string;
  sx?: SxProps<Theme>;
  variant?: 'circular' | 'rounded' | 'square';
};

export const AvatarUser: FC<AvatarUserProps> = ({
  data: user,
  ...avatarProps
}) => {
  return (
    <Avatar
      alt={Messages.user.avatar}
      src={
        user?.displayAvatarURL
          ? requestService.getURL(user?.displayAvatarURL)
          : undefined
      }
      {...avatarProps}
    >
      {(!!user?.displayName && user.displayName[0]) ||
        (!!user?.displayEmail && user.displayEmail[0])}
    </Avatar>
  );
};
