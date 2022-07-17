import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { ContainerSpacing } from '../../../components/Container';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { NotFoundContainer } from '../../../components/NotFound/NotFoundContainer';
import {
  TableCellIndex,
  TableCellTextCenter,
  TableCellTextRight,
} from '../../../components/Table/TableCell';
import { TeacherLayout } from '../../../Layout/TeacherLayout';
import { Messages, setMessage } from '../../../lib/messages';
import { teacherOrderItemsService } from '../../../lib/teacher-order-items.servie';
import { TransactionHistoryForm } from '../../../modules/Teacher/Revenue/TransactionHistoryForm';
import { NextPageWithLayout } from '../../../types/components.type';
import { useRouter } from 'next/router';
import { urlQueryService } from '../../../lib/url-query.service';
import { Fragment, useEffect } from 'react';
import {
  TypographyBold,
  TypographyColorSecond,
} from '../../../components/Text/Typography';
import { Formatter } from '../../../lib/formatter';
import { BoxSpacingBottom } from '../../../components/Box';
import _ from 'lodash';
import { AppTablePagination } from '../../../components/Table/AppTablePagination';
import { TeacherPage } from '../../../components/Page/TeacherPage';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  // const routerOptions = { router };

  const queryOptions = { query: router.query };

  const pageTitle = `${Messages.action.manage} ${Messages.order.revenue}`;

  const startDate = urlQueryService.getOne('startDate', queryOptions);

  const endDate = urlQueryService.getOne('endDate', queryOptions);

  const submitTime = urlQueryService.getOneAsNumber('submitTime', queryOptions);

  const { pageSize, currentPage } = urlQueryService.getPaginated(queryOptions);

  const findAllOptions = {
    startDate,
    endDate,
  };

  const findManyOptions = {
    pageSize,
    currentPage,
    startDate,
    endDate,
  };

  const {
    data: revenue,
    refetch: refetchRevenue,
    isError,
    isLoading,
    isSuccess,
    isFetching: isFetchingRevenue,
  } = useQuery(
    'teacherRevenue',
    () => teacherOrderItemsService.getRevenue(findAllOptions),
    { enabled: router.isReady && !!startDate && !!endDate },
  );

  const {
    data: orderItems,
    refetch: refetchOrderItems,
    isFetching: isFetchingOrderItems,
  } = useQuery('teacherCourseOrder', () =>
    teacherOrderItemsService.getMany(findManyOptions),
  );

  useEffect(() => {
    if (router.isReady) {
      refetchRevenue();
    }
  }, [router.isReady, refetchRevenue, startDate, endDate, submitTime]);

  useEffect(() => {
    refetchOrderItems();
  }, [
    router.isReady,
    refetchOrderItems,
    submitTime,
    startDate,
    endDate,
    currentPage,
    pageSize,
  ]);

  const pagination = <AppTablePagination count={revenue?.countCourses} />;

  return (
    <TeacherPage
      title={pageTitle}
      header={{
        breadcrumbs: [
          {
            title: pageTitle,
            icon: faBagShopping,
          },
        ],
      }}
    >
      <ContainerSpacing>
        <Typography gutterBottom>Truy vấn lịch sử giao dịch</Typography>
        <TransactionHistoryForm />
      </ContainerSpacing>

      {isError && <NotFoundContainer />}

      {isLoading && <LoadingContainer />}

      {isSuccess && !!revenue && (
        <>
          <ContainerSpacing>
            {isFetchingRevenue && <LoadingContainer />}
            <Box>
              <Card>
                <CardHeader title="Chi tiết doanh thu"></CardHeader>
                <CardContent>
                  <BoxSpacingBottom>
                    <TypographyColorSecond variant="body2">
                      Khoảng thời gian
                    </TypographyColorSecond>
                    <TypographyBold>
                      {revenue.startDate || ''} - {revenue.endDate || ''}
                    </TypographyBold>
                  </BoxSpacingBottom>

                  <BoxSpacingBottom>
                    <TypographyColorSecond variant="body2">
                      Khoá học đã bán
                    </TypographyColorSecond>
                    <TypographyBold>{revenue.countCourses}</TypographyBold>
                  </BoxSpacingBottom>

                  <BoxSpacingBottom>
                    <TypographyColorSecond variant="body2">
                      Doanh thu
                    </TypographyColorSecond>
                    <TypographyBold color="blue" fontSize="1.3rem">
                      {Formatter.formatMoney(revenue.revenue)}
                    </TypographyBold>
                  </BoxSpacingBottom>
                </CardContent>
              </Card>
            </Box>
          </ContainerSpacing>

          <ContainerSpacing>
            <TableContainer>
              {isFetchingOrderItems && <LoadingContainer />}
              <Table>
                <TableHead>
                  <TableRow>{pagination}</TableRow>
                  <TableRow>
                    <TableCellIndex />
                    <TableCellTextCenter>
                      {setMessage(Messages.order.purchase)}
                    </TableCellTextCenter>
                    <TableCellTextCenter sx={{ maxWidth: 100, width: 100 }}>
                      Số tiền
                    </TableCellTextCenter>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems?.map((item, index) => {
                    const rowId = pageSize * (currentPage - 1) + index + 1;

                    return (
                      <Fragment key={index}>
                        <TableRow hover>
                          <TableCell>{rowId}</TableCell>
                          <TableCell>{item.course?.name}</TableCell>
                          <TableCellTextRight>
                            {Formatter.formatMoney(
                              _.isNumber(item.promotionPrice)
                                ? item.promotionPrice
                                : item.price,
                            )}
                          </TableCellTextRight>
                        </TableRow>
                      </Fragment>
                    );
                  })}
                </TableBody>

                <TableFooter>
                  <TableRow>{pagination}</TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </ContainerSpacing>
        </>
      )}
    </TeacherPage>
  );
};

Page.layout = TeacherLayout;

export default Page;
