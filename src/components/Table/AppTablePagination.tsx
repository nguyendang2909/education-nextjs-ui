import { TablePagination } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { urlQueryService } from '../../lib/url-query.service';

type AppTablePaginationProps = {
  count?: number;
};

export const AppTablePagination: FC<AppTablePaginationProps> = ({ count }) => {
  const router = useRouter();

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const { pageSize, currentPage } = urlQueryService.getPaginated(queryOptions);

  return (
    <TablePagination
      page={currentPage - 1}
      count={count || 0}
      rowsPerPage={pageSize}
      onPageChange={(event, page) => {
        urlQueryService.replaceUrlQuery(
          {
            currentPage: page + 1,
          },
          routerOptions,
        );
      }}
      onRowsPerPageChange={evt => {
        urlQueryService.replaceUrlQuery(
          { pageSize: evt.target.value },
          routerOptions,
        );
      }}
    ></TablePagination>
  );
};
