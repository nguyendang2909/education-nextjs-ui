import { Fragment } from 'react';
import { useRef, useState } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  ListItemIcon,
  SxProps,
  Theme,
} from '@mui/material';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextLink } from '../Link';
import { setMessage } from '../../lib/messages';

export type MoreMenuItem = {
  name: string;
  icon?: IconProp;
  to?: string;
  onClick?: () => void;
};

type FCProps = {
  items: MoreMenuItem[];
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  icon?: IconProp;
  sx?: SxProps<Theme>;
};

export const MoreMenu: React.FC<FCProps> = ({
  items,
  icon: menuIcon,
  sx = {},
  color = 'default',
}) => {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleSetOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton
        color={color}
        ref={ref}
        onClick={handleSetOpenMenu}
        sx={{ width: 40, height: 40, ...sx }}
      >
        <FontAwesomeIcon icon={menuIcon || 'ellipsis-vertical'} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={handleSetOpenMenu}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {items.map((item, index) => {
          const { name, icon, to, onClick } = item;

          if (to) {
            return (
              <NextLink href={to} key={index}>
                <MenuItem key={name} sx={{ color: 'text.secondary' }}>
                  <MoreMenuItemContent icon={icon} name={name} />
                </MenuItem>
              </NextLink>
            );
          } else if (onClick) {
            return (
              <MenuItem
                key={index}
                onClick={() => {
                  handleSetOpenMenu();
                  onClick();
                }}
                sx={{ color: 'text.secondary' }}
              >
                <MoreMenuItemContent icon={icon} name={name} />
              </MenuItem>
            );
          }

          return (
            <MenuItem key={index} sx={{ color: 'text.secondary' }}>
              <MoreMenuItemContent icon={icon} name={name} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

type MoreMenuItemContentProps = {
  icon?: IconProp;
  name: string;
};

const MoreMenuItemContent: React.FC<MoreMenuItemContentProps> = props => {
  const { icon, name } = props;

  return (
    <>
      <ListItemIcon>{icon && <FontAwesomeIcon icon={icon} />}</ListItemIcon>
      <ListItemText
        primary={setMessage(name)}
        primaryTypographyProps={{ variant: 'body2' }}
      />
    </>
  );
};
