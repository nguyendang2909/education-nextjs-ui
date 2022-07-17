import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { BoxSpacing } from '../../../components/Box';
import { Breadcrumb, BreadcrumbHome } from '../../../components/Breadcrumbs';
import {
  ContainerSpacing,
  ContainerSpacingBottom,
} from '../../../components/Container';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { NotFoundContainer } from '../../../components/NotFound/NotFoundContainer';
import { AppPage } from '../../../components/Page/AppPage';
import { PrivateMainLayout } from '../../../Layout/PrivateMainLayout';
import { Formatter } from '../../../lib/formatter';
import { Messages, setMessage } from '../../../lib/messages';
import { ordersService } from '../../../lib/orders.servie';
import { MoneyTransferSteps } from '../../../modules/Checkout/MoneyTransferSteps';
import { OrderItemsTable } from '../../../modules/Order/OrderItemsTable';
import { NextPageWithLayout } from '../../../types/components.type';
import { ListItemPaddingReponsive } from '../../gio-hang';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const pageTitle = 'hoàn thành đơn hàng';

  const id = +(router.query.id as string);

  const {
    data: order,
    isError,
    isSuccess,
    isLoading,
  } = useQuery(['order', id], () => ordersService.getOneById(id), {
    enabled: router.isReady && id > 0,
  });

  return (
    <AppPage title={pageTitle}>
      <ContainerSpacingBottom>
        <Breadcrumbs>
          <BreadcrumbHome></BreadcrumbHome>
          <Breadcrumb
            title={Messages.cart.checkout}
            icon={faCreditCard}
          ></Breadcrumb>
        </Breadcrumbs>
        <Typography variant="h1">{setMessage(pageTitle)}</Typography>
      </ContainerSpacingBottom>

      {isLoading && <LoadingContainer />}

      {isError && <NotFoundContainer />}

      {isSuccess && (
        <>
          {order ? (
            <>
              <ContainerSpacing>
                <Stack direction="row" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <BoxSpacing>
                      <MoneyTransferSteps />
                    </BoxSpacing>
                    {!!order.orderItem && (
                      <BoxSpacing>
                        <OrderItemsTable data={order.orderItem} />
                      </BoxSpacing>
                    )}
                  </Grid>

                  <Grid
                    paddingBottom={{
                      xs: 5,
                      md: 0,
                    }}
                    minWidth={{
                      xs: '100%',
                      md: '400px',
                    }}
                  >
                    <Card>
                      <CardHeader
                        title={setMessage(Messages.cart.bill)}
                        subheader={Formatter.formatOrderId(order.id || id)}
                      ></CardHeader>
                      <CardContent>
                        <List
                          sx={{ fontSize: '1.3rem', color: 'text.secondary' }}
                        >
                          <ListItemPaddingReponsive divider>
                            <Grid container>
                              <Box>Giá</Box>
                              <Box sx={{ textAlign: 'right', flexGrow: 1 }}>
                                {!!order.price
                                  ? Formatter.formatMoney(order.price)
                                  : 0}
                              </Box>
                            </Grid>
                          </ListItemPaddingReponsive>
                          <ListItemPaddingReponsive divider>
                            <Grid container>
                              <Box>{setMessage(Messages.course.savePrice)}</Box>
                              <Box sx={{ textAlign: 'right', flexGrow: 1 }}>
                                {!!order.savePrice
                                  ? Formatter.formatMoney(order.savePrice)
                                  : 0}
                              </Box>
                            </Grid>
                          </ListItemPaddingReponsive>
                          <ListItemPaddingReponsive>
                            <Grid container sx={{ color: 'text.primary' }}>
                              <Box>
                                {setMessage(Messages.cart.totalPayment)}
                              </Box>
                              <Box
                                sx={{
                                  textAlign: 'right',
                                  flexGrow: 1,
                                  fontWeight: 700,
                                }}
                              >
                                {!!order.totalPrice
                                  ? Formatter.formatMoney(order.totalPrice)
                                  : 0}
                              </Box>
                            </Grid>
                          </ListItemPaddingReponsive>
                        </List>

                        {/* <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  size="large"
                  variant="contained"
                  fullWidth
                  disabled={!payCarts}
                >
                  {Messages.action.pay}
                </LoadingButton> */}
                      </CardContent>
                    </Card>
                  </Grid>
                </Stack>
              </ContainerSpacing>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </AppPage>
  );
};

Page.layout = PrivateMainLayout;

export default Page;
