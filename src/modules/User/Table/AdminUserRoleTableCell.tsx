import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Menu, MenuItem, TableCell } from '@mui/material';
import { FC, useState, MouseEvent } from 'react';
import { adminUsersService } from '../../../lib/admin-users.service';
import { Formatter } from '../../../lib/formatter';
import { setMessage } from '../../../lib/messages';
import { notificationService } from '../../../lib/notificationService';
import { ERole } from '../../../types/enums';
import { UserData } from '../../../types/fetch-data.type';

type AdminRoleTableCellProps = {
  user: UserData;
  refetch: () => void;
};

export const AdminUserRoleTableCell: FC<AdminRoleTableCellProps> = ({
  user,
  refetch,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUpdateRole = async (role: ERole) => {
    setAnchorEl(null);

    try {
      if (user?.id) {
        await adminUsersService.update(user.id, {
          role,
        });

        refetch();
      }
    } catch (err) {
      notificationService.handleError(err);
    }
  };

  return (
    <TableCell>
      {!!user.id && (
        <>
          <Button
            variant="text"
            endIcon={<FontAwesomeIcon icon={faAngleDown} />}
            onClick={handleClick}
          >
            {!!user.role ? setMessage(Formatter.formatRole(user.role)) : ''}
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleUpdateRole(ERole.Teacher);
              }}
            >
              {setMessage(Formatter.formatRole(ERole.Teacher))}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleUpdateRole(ERole.Member);
              }}
            >
              {setMessage(Formatter.formatRole(ERole.Member))}
            </MenuItem>
          </Menu>
        </>
      )}
    </TableCell>
  );
};
