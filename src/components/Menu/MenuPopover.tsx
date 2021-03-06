import { ModalProps, Popover } from '@mui/material';
import { styled, alpha } from '@mui/system';
import { FC } from 'react';

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

type FCProps = {
  children: React.ReactNode;
  sx: any;
  open: boolean;
  onClose: ModalProps['onClose'];
  anchorEl: null | Element | ((element: Element) => Element);
};

export const MenuPopover: FC<FCProps> = ({
  children,
  sx,
  ...other
}: FCProps) => {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: 'inherit',
          boxShadow: theme => theme.customShadows.z20,
          border: theme => `solid 1px ${theme.palette.grey[500]}`,
          width: 200,
          ...sx,
        },
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
};
