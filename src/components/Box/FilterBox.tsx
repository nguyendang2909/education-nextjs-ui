import { Typography } from '@mui/material';
import { FC } from 'react';
import { BoxPadding } from '.';

type FilterTitleBoxProps = {
  title: string;
};

export const FilterTitleBox: FC<FilterTitleBoxProps> = ({ title }) => {
  return (
    <BoxPadding sx={{ backgroundColor: '#f2f3f5' }}>
      <Typography variant="h4">{title}</Typography>
    </BoxPadding>
  );
};
