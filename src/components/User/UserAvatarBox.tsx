import { FC } from 'react';
import {
  Avatar,
  Box,
  Grid,
  Rating,
  styled,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { requestService } from '../../lib/request';
import { TypographyColorSecond } from '../Text/Typography';

type UserRatingBoxProps = {
  avatarURL?: string;
  allowDelete?: boolean;
  content?: string;
  createdAt?: string;
  display?: boolean;
  fullname?: string;
  onDelete?: () => void;
  rating?: number;
  reply?: () => void;
  sx?: SxProps<Theme>;
  // updatedAt?: string;
  typographyProps?: SxProps<Theme>;
};

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

export const UserCommentBox: FC<UserRatingBoxProps> = ({
  createdAt,
  fullname,
  content,
  avatarURL,
  typographyProps,
  reply,
  rating,
  sx,
  display = true,
  allowDelete = false,
  onDelete,
}) => {
  const avatarText = fullname ? fullname[0] : '';

  const name = fullname || '';

  return (
    <>
      {display && (
        <Box sx={{ ...sx }}>
          <Grid container>
            <Box sx={{ mr: 1 }}>
              <UserAvatar
                alt={name}
                src={avatarURL && requestService.getURL(avatarURL)}
              >
                {avatarText}
              </UserAvatar>
            </Box>

            <Box
              sx={{
                backgroundColor: '#f0f2f5',
                padding: '8px',
                borderRadius: '16px',
              }}
            >
              <Grid container direction="column">
                <Typography variant="subtitle1" sx={{ ...typographyProps }}>
                  {name}
                </Typography>
                {rating && <Rating defaultValue={rating} readOnly></Rating>}
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                  {content || ''}
                </Typography>

                <Grid container sx={{ gap: '16px' }}>
                  {reply && (
                    <TypographyColorSecond
                      sx={{ cursor: 'pointer', fontWeight: 700 }}
                      onClick={reply}
                    >
                      Trả lời
                    </TypographyColorSecond>
                  )}

                  {allowDelete && (
                    <TypographyColorSecond
                      sx={{ cursor: 'pointer' }}
                      onClick={onDelete}
                    >
                      Xoá
                    </TypographyColorSecond>
                  )}
                  <TypographyColorSecond>
                    {createdAt && new Date(createdAt).toLocaleString('vi')}
                  </TypographyColorSecond>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
};
