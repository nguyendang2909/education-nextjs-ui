import { TableCell, Box } from '@mui/material';
import { NextRouter } from 'next/router';
import { FC } from 'react';
import { StackSpaceBetween } from '../../components/Stack';
import { TableSort } from '../../components/Table/TableSort';
import { Messages, setMessage } from '../../lib/messages';

type TableHeaderCellCreatedAtProps = {};

export const TableHeaderCellCreatedAt: FC<
  TableHeaderCellCreatedAtProps
> = () => {
  return (
    <>
      <TableCell sx={{ width: '200px', maxWidth: '200px' }}>
        <StackSpaceBetween>
          {setMessage(Messages.common.time)}
          <Box>
            <TableSort urlQueryName="sortCreatedAt" />
          </Box>
        </StackSpaceBetween>
      </TableCell>
    </>
  );
};
