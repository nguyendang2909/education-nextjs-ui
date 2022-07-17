import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { alpha } from '@mui/material';
import { styled } from '../../styles/theme';

export const FontAwesomeIconSpacing = styled(FontAwesomeIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const IconWrapper = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
  color: theme.palette.info.main,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.grey[400],
    0,
  )} 0%, ${alpha(theme.palette.grey[400], 0.24)} 100%)`,
}));
