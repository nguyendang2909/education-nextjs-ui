import { FC } from 'react';
import { Box, Grid, SxProps, Theme, useTheme } from '@mui/material';
import { Messages } from '../../lib/messages';
import { TypographyCapitalize } from '../Text/Typography';
import { AppLink } from '../Link';
import { teachersService } from '../../lib/teachers.service';
import { AvatarUser } from '../User/AvatarUser';
import { UserData } from '../../types/fetch-data.type';

type TeacherAboutGridProps = {
  data: UserData;
  sx?: SxProps<Theme>;
  title?: string;
  typographyProps?: SxProps<Theme>;
};

export const TeacherAboutGrid: FC<TeacherAboutGridProps> = ({
  data: teacher,
  typographyProps,
  sx = {},
}) => {
  const theme = useTheme();

  if (!teacher.id) {
    return <></>;
  }

  const href = teachersService.getPageLinkFromIdAndName(
    teacher.id,
    teacher.displayName,
  );

  const avatarBox = (
    <Box sx={{ mr: 1 }}>
      <AvatarUser
        data={teacher}
        sx={{ width: theme.spacing(6), height: theme.spacing(6) }}
        // alt={fullname}
        // src={avatarURL && requestService.getURL(avatarURL)}
      ></AvatarUser>
    </Box>
  );

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      {href ? (
        <>
          <AppLink href={href}>{avatarBox}</AppLink>
        </>
      ) : (
        <>{avatarBox}</>
      )}

      <Box>
        <Grid container direction="column">
          <AppLink href={href}>
            <TypographyCapitalize
              variant="subtitle1"
              sx={{ color: 'text.primary', ...typographyProps }}
            >
              {teacher.displayName || ''}
            </TypographyCapitalize>
          </AppLink>
          <TypographyCapitalize
            variant="body2"
            sx={{ color: 'text.secondary', ...typographyProps }}
          >
            {teacher.title || Messages.teacher.name}
          </TypographyCapitalize>
        </Grid>
      </Box>
    </Grid>
  );
};
