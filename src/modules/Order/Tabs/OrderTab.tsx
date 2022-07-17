import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Pagination,
  Stack,
} from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { BoxSpacing } from '../../../components/Box';
import { ButtonLink } from '../../../components/Button/ButtonLink';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { AppLink } from '../../../components/Link';
import { NotFoundContainer } from '../../../components/NotFound/NotFoundContainer';
import { TypographyUppercase } from '../../../components/Text/Typography';
import { APP_URL, DEFAULT_PAGE_SIZE } from '../../../config';
import { Formatter } from '../../../lib/formatter';
import { Messages, setMessage } from '../../../lib/messages';
import { ordersService } from '../../../lib/orders.servie';
import { urlQueryService } from '../../../lib/url-query.service';
import { EOrderStatus } from '../../../types/enums';
import { OrderCard } from '../Card/OrderCard';

type OrderTabProps = {
  status: EOrderStatus;
};

export const OrderTab: FC<OrderTabProps> = ({ status }) => {
  const router = useRouter();

  const queryOptions = { query: router.query };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const tab =
    (urlQueryService.getOne('tab', queryOptions) as EOrderStatus) ||
    EOrderStatus.WaitForPayment;

  const findAllOptions = {
    status,
  };

  const findManyOptions = {
    ...findAllOptions,
    currentPage,
  };

  const {
    data: orders,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    refetch: refetchOrders,
  } = useQuery(
    `${status}Orders`,
    () => ordersService.getMany(findManyOptions),
    { enabled: tab === status },
  );

  const { data: countOrders, refetch: refetchCountOrders } = useQuery(
    `count${status}Orders`,
    () => ordersService.count(findAllOptions),
    { enabled: tab === status },
  );

  const refetch = useCallback(() => {
    refetchOrders();
    refetchCountOrders();
  }, [refetchCountOrders, refetchOrders]);

  const handleCancelOrder = async (orderId: number) => {
    await ordersService.update(orderId, {
      status: EOrderStatus.Cancel,
    });

    await refetchOrders();
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const pagination = _.isNumber(countOrders) &&
    countOrders > DEFAULT_PAGE_SIZE && (
      <BoxSpacing>
        <Pagination
          sx={{
            justifyContent: 'flex-end',
            display: 'fex',
          }}
          count={Math.ceil(countOrders / 50)}
          page={currentPage}
          onChange={(event: React.ChangeEvent<unknown>, page: number) => {
            setCurrentPage(page);
          }}
        />
      </BoxSpacing>
    );

  return (
    <>
      {isLoading && <LoadingContainer />}

      {isError && <NotFoundContainer />}

      {isSuccess && orders && (
        <>
          {isFetching && <LoadingContainer />}

          <Stack spacing={3}>
            {orders.map((order, index) => {
              return (
                <Fragment key={index}>
                  <OrderCard order={order} onCancelOrder={handleCancelOrder} />
                </Fragment>
              );
            })}
          </Stack>

          {pagination}
        </>
      )}
    </>
  );
};
