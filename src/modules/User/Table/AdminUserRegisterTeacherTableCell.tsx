import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Menu, MenuItem, TableCell } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { TableCellTextCenter } from '../../../components/Table/TableCell';
import { adminUsersService } from '../../../lib/admin-users.service';
import { Formatter } from '../../../lib/formatter';
import { iconFormatter } from '../../../lib/icon-formatter';
import { setMessage } from '../../../lib/messages';
import { notificationService } from '../../../lib/notificationService';
import { ERegisterTeacher } from '../../../types/enums';
import { UserData } from '../../../types/fetch-data.type';

type AdminUserRegisterTeacherTableCellProps = {
  user: UserData;
  refetch: () => void;
};

export const AdminUserRegisterTeacherTableCell: FC<
  AdminUserRegisterTeacherTableCellProps
> = ({ user, refetch }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmit = async (registerTeacher: ERegisterTeacher) => {
    setAnchorEl(null);

    try {
      if (user?.id) {
        await adminUsersService.update(user.id, {
          registerTeacher,
        });

        refetch();
      }
    } catch (err) {
      notificationService.handleError(err);
    }
  };

  return (
    <TableCellTextCenter sx={{ maxWidth: 180, width: 180 }}>
      {!!user.id && (
        <>
          <Button
            onClick={handleClick}
            startIcon={
              <>
                {!!user.registerTeacher && (
                  <FontAwesomeIcon
                    icon={iconFormatter.formatRegisterTeacher(
                      user.registerTeacher,
                    )}
                  />
                )}
              </>
            }
            endIcon={
              <>
                {user.registerTeacher === ERegisterTeacher.pending && (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </>
            }
          >
            {user.registerTeacher === ERegisterTeacher.pending &&
              Formatter.formatRegisterTeacher(user.registerTeacher)}
          </Button>

          {user.registerTeacher === ERegisterTeacher.pending && (
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  handleSubmit(ERegisterTeacher.accept);
                }}
              >
                {setMessage(
                  Formatter.formatRegisterTeacher(ERegisterTeacher.accept),
                )}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleSubmit(ERegisterTeacher.reject);
                }}
              >
                {setMessage(
                  Formatter.formatRegisterTeacher(ERegisterTeacher.reject),
                )}
              </MenuItem>
            </Menu>
          )}
        </>
      )}
    </TableCellTextCenter>
  );
};
