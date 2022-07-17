import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormControlLabel,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { BoxSpacing, BoxSpacingBottom } from '../../../components/Box';
import { ContainerSpacing } from '../../../components/Container';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { GridAlignItemsCenter, GridFlexGrow } from '../../../components/Grid';
import { MoreMenu } from '../../../components/Menu/MoreMenu';
import { NotFoundContainer } from '../../../components/NotFound/NotFoundContainer';
import { AppPage } from '../../../components/Page/AppPage';
import { AppTablePagination } from '../../../components/Table/AppTablePagination';
import {
  TableCellIndex,
  TableCellTextCenter,
  TableCellTextRight,
} from '../../../components/Table/TableCell';
import { TablePopoverFilter } from '../../../components/Table/TablePopoverFilter';
import { SortDirection } from '../../../components/Table/TableSort';
import { TypographyCenter } from '../../../components/Text/Typography';
import { AdminLayout } from '../../../Layout/AdminLayout';
import { adminOrdersService } from '../../../lib/admin-orders.service';
import { Formatter } from '../../../lib/formatter';
import { iconFormatter } from '../../../lib/icon-formatter';
import { Messages, setMessage, setSuccessMessage } from '../../../lib/messages';
import { notificationService } from '../../../lib/notificationService';
import { urlQueryService } from '../../../lib/url-query.service';
import { AdminOrderSearchFields } from '../../../modules/Order/AdminOrderSearchFields';
import {
  TableCellRecordStatus,
  TableHeaderCellRecordStatus,
} from '../../../modules/Record';
import { TableHeaderCellCreatedAt } from '../../../modules/Record/TableCellCreatedAt';
import { NextPageWithLayout } from '../../../types/components.type';
import { EOrderStatus, EPaymentMethod } from '../../../types/enums';
import {
  AFindAllOrdersDto,
  AFindManyOrdersDto,
  AUpdateOrderDto,
} from '../../../types/request.dto';

const Page: NextPageWithLayout = () => {
  const pageTitle = Messages.cart.order;

  const router = useRouter();

  const queryOptions = { query: router.query };

  const isActive = urlQueryService.getOneAsBoolean('isActive', queryOptions);

  const status = urlQueryService.getOne('status', queryOptions) as EOrderStatus;

  const id = urlQueryService.getOneAsNumber('id', queryOptions);

  const [acceptRefund, setAcceptRefund] = useState<boolean>(false);

  const sortCreatedAt = urlQueryService.getOne(
    'sortCreatedAt',
    queryOptions,
  ) as SortDirection;

  const paymentMethod = urlQueryService.getOne(
    'paymentMethod',
    queryOptions,
  ) as EPaymentMethod;

  const { pageSize, currentPage } = urlQueryService.getPaginated(queryOptions);

  const findAllOptions: AFindAllOrdersDto = {
    isActive,
    paymentMethod,
    id,
    status,
  };

  const findManyOptions: AFindManyOrdersDto = {
    ...findAllOptions,
    currentPage,
    pageSize,
    sortCreatedAt,
  };

  const {
    data: orders,
    refetch: refetchOrders,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useQuery(
    'admin.orders',
    () => adminOrdersService.getMany(findManyOptions),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  const { data: countOrders, refetch: refetchCountOrders } = useQuery(
    'admin.countOrders',
    () => adminOrdersService.count(findAllOptions),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  const pagination = <AppTablePagination count={countOrders} />;

  useEffect(() => {
    if (router.isReady) {
      refetchOrders();
    }
  }, [
    router.isReady,
    refetchCountOrders,
    pageSize,
    currentPage,
    sortCreatedAt,
    isActive,
    paymentMethod,
    refetchOrders,
    status,
    id,
  ]);

  useEffect(() => {
    if (router.isReady) {
      refetchCountOrders();
    }
  }, [router.isReady, refetchCountOrders, isActive, paymentMethod, status, id]);

  const handleChangeOrder = async (id: number, values: AUpdateOrderDto) => {
    try {
      await adminOrdersService.update(id, values);

      toast.success(
        setSuccessMessage(Messages.action.update, Messages.cart.order),
      );

      refetchOrders();
    } catch (err) {
      notificationService.handleError(err);
    }
  };

  const handleChangeAcceptRefund = (
    event: SyntheticEvent,
    checked: boolean,
  ) => {
    setAcceptRefund(checked);
  };

  return (
    <AppPage title={pageTitle} header={{}}>
      {isError && <NotFoundContainer />}

      {isLoading && <LoadingContainer />}

      {isSuccess && !!orders && (
        <>
          <ContainerSpacing>
            <BoxSpacingBottom>
              <AdminOrderSearchFields isSubmitting={isFetching} />
            </BoxSpacingBottom>
            <BoxSpacing>
              <FormControlLabel
                control={<Switch checked={acceptRefund} />}
                onChange={handleChangeAcceptRefund}
                label={setMessage(
                  Messages.action.accept,
                  Messages.order.refund,
                )}
              />
            </BoxSpacing>
          </ContainerSpacing>

          <ContainerSpacing maxWidth={false}>
            <TableContainer>
              {isFetching && <LoadingContainer />}

              <Table>
                <TableHead>
                  <TableRow>{pagination}</TableRow>
                  <TableRow>
                    <TableCellIndex />

                    <TableCellTextCenter>
                      {setMessage(Messages.cart.orderId)}
                    </TableCellTextCenter>

                    <TableCellTextCenter sx={{ maxWidth: 200, width: 200 }}>
                      <GridAlignItemsCenter container>
                        <GridFlexGrow item>
                          {setMessage(Messages.common.method)}
                        </GridFlexGrow>

                        <Grid item>
                          <TablePopoverFilter
                            urlQueryName="paymentMethod"
                            options={[
                              {
                                text: Formatter.formatPaymentMethod(
                                  EPaymentMethod.Momo,
                                ),
                                value: EPaymentMethod.Momo,
                              },
                              {
                                text: Formatter.formatPaymentMethod(
                                  EPaymentMethod.MoneyTransfer,
                                ),
                                value: EPaymentMethod.MoneyTransfer,
                              },
                            ]}
                          />
                        </Grid>
                      </GridAlignItemsCenter>
                    </TableCellTextCenter>

                    <TableCellTextCenter sx={{ width: 100, maxWidth: 100 }}>
                      {setMessage(Messages.cart.price)}
                    </TableCellTextCenter>

                    <TableCellTextCenter sx={{ width: 200, maxWidth: 200 }}>
                      <GridAlignItemsCenter container>
                        <GridFlexGrow item>
                          {setMessage(Messages.common.status)}
                        </GridFlexGrow>
                        <Grid item>
                          <TablePopoverFilter
                            urlQueryName="status"
                            options={[
                              {
                                text: Formatter.formatOrderStatus(
                                  EOrderStatus.WaitForPayment,
                                ),
                                value: EOrderStatus.WaitForPayment,
                              },
                              {
                                text: Formatter.formatOrderStatus(
                                  EOrderStatus.Success,
                                ),
                                value: EOrderStatus.Success,
                              },
                              {
                                text: Formatter.formatOrderStatus(
                                  EOrderStatus.Cancel,
                                ),
                                value: EOrderStatus.Cancel,
                              },
                            ]}
                          />
                        </Grid>
                      </GridAlignItemsCenter>
                    </TableCellTextCenter>
                    <TableHeaderCellCreatedAt />
                    <TableHeaderCellRecordStatus />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders.map((order, index) => {
                    const rowId = pageSize * (currentPage - 1) + index + 1;

                    const { id: orderId } = order;

                    return (
                      <Fragment key={index}>
                        {!!orderId && (
                          <TableRow>
                            <TableCell>
                              <Typography>{rowId}</Typography>
                            </TableCell>
                            <TableCell>
                              {Formatter.formatOrderId(orderId)}
                            </TableCell>
                            <TableCell>
                              {!!order.paymentMethod &&
                                Formatter.formatPaymentMethod(
                                  order.paymentMethod,
                                )}
                            </TableCell>
                            <TableCellTextRight>
                              {(!!order.totalPrice || order.totalPrice === 0) &&
                                Formatter.formatMoney(order.totalPrice)}
                            </TableCellTextRight>

                            <TableCell>
                              <GridAlignItemsCenter container>
                                <Grid item flexGrow={1}>
                                  <TypographyCenter>
                                    {!!order.status && (
                                      <FontAwesomeIcon
                                        icon={iconFormatter.formatOrderStatus(
                                          order.status,
                                        )}
                                      />
                                    )}
                                  </TypographyCenter>
                                </Grid>
                                <Grid item>
                                  <MoreMenu
                                    items={[
                                      {
                                        name: Formatter.formatOrderStatus(
                                          EOrderStatus.Success,
                                        ),
                                        icon: iconFormatter.formatOrderStatus(
                                          EOrderStatus.Success,
                                        ),
                                        onClick: () => {
                                          handleChangeOrder(orderId, {
                                            status: EOrderStatus.Success,
                                          });
                                        },
                                      },
                                      {
                                        name: Formatter.formatOrderStatus(
                                          EOrderStatus.WaitForPayment,
                                        ),
                                        icon: iconFormatter.formatOrderStatus(
                                          EOrderStatus.WaitForPayment,
                                        ),
                                        onClick: () => {
                                          handleChangeOrder(orderId, {
                                            status: EOrderStatus.WaitForPayment,
                                          });
                                        },
                                      },
                                      {
                                        name: Formatter.formatOrderStatus(
                                          EOrderStatus.Cancel,
                                        ),
                                        icon: iconFormatter.formatOrderStatus(
                                          EOrderStatus.Cancel,
                                        ),
                                        onClick: () => {
                                          handleChangeOrder(orderId, {
                                            status: EOrderStatus.Cancel,
                                          });
                                        },
                                      },
                                    ]}
                                  />
                                </Grid>
                              </GridAlignItemsCenter>
                            </TableCell>
                            <TableCell>
                              {!!order.createdAt &&
                                Formatter.formatTime(order.createdAt)}
                            </TableCell>
                            <TableCellRecordStatus
                              isActive={order.isActive}
                              id={orderId}
                              onChange={adminOrdersService.update}
                              refetch={refetchOrders}
                            />
                          </TableRow>
                        )}
                      </Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </ContainerSpacing>
        </>
      )}
    </AppPage>
  );
};

Page.layout = AdminLayout;

export default Page;
