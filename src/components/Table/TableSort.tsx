import {
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';

import { urlQueryService } from '../../lib/url-query.service';
import { IconButtonMedium } from '../Button/IconButton';

export type SortDirection = 'ASC' | 'DESC' | undefined;

type TableSortProps = {
  urlQueryName: string;
};

export const TableSort: FC<TableSortProps> = ({ urlQueryName }) => {
  const router = useRouter();

  const direction = urlQueryService.getOne(urlQueryName, {
    query: router.query,
  }) as SortDirection;

  const handleClickSort = () => {
    let newDirection: SortDirection;

    switch (direction) {
      case 'ASC':
        newDirection = 'DESC';
        break;

      case 'DESC':
        newDirection = undefined;
        break;

      default:
        newDirection = 'ASC';
        break;
    }

    urlQueryService.setUrlQuery({ [urlQueryName]: newDirection }, { router });
  };

  return (
    <>
      <IconButtonMedium
        onClick={handleClickSort}
        sx={{ color: direction ? 'info.main' : 'text.secondary' }}
      >
        <FontAwesomeIcon
          icon={
            direction ? (direction === 'ASC' ? faSortAsc : faSortDesc) : faSort
          }
        />
      </IconButtonMedium>
    </>
  );
};
