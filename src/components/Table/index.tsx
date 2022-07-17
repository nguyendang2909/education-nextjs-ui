import { styled, TableCell } from '@mui/material';

export const TableCellReponsive = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));
