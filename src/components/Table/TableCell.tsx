import { styled, TableCell } from '@mui/material';
import { FC } from 'react';
import { Messages, setMessage } from '../../lib/messages';

export const TableCellTextRight = styled(TableCell)(() => ({
  textAlign: 'right',
}));

export const TableCellTextCenter = styled(TableCell)(() => ({
  textAlign: 'center',
}));

export const TableCellIndex: FC = () => {
  return (
    <TableCellTextCenter sx={{ maxWidth: '1px', width: '1px' }}>
      STT
    </TableCellTextCenter>
  );
};

export const TableCellAction: FC = () => {
  return (
    <TableCellTextCenter sx={{ maxWidth: '150px', width: '150px' }}>
      {setMessage(Messages.action.name)}
    </TableCellTextCenter>
  );
};
