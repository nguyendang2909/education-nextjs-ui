import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  Stack,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import { BoxSpacingBig, BoxSpacingBottom } from '../../components/Box';
import { Breadcrumb, BreadcrumbHome } from '../../components/Breadcrumbs';
import {
  ContainerSpacing,
  ContainerSpacingBottom,
} from '../../components/Container';
import { LoadingContainer } from '../../components/Container/LoadingContainer';
import { NotFoundContent } from '../../components/NotFound';
import { OrderStepper } from '../../modules/Order/OrderStepper';
import { cartsService } from '../../lib/carts.service';
import { Messages, messagesService, setMessage } from '../../lib/messages';
import { NextPageWithLayout } from '../../types/components.type';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { urlQueryService } from '../../lib/url-query.service';
import { NotFoundContainer } from '../../components/NotFound/NotFoundContainer';
import { ListItemPaddingReponsive } from '../gio-hang';
import { Formatter } from '../../lib/formatter';
import { PrivateMainLayout } from '../../Layout/PrivateMainLayout';
import { CreateOrderParams } from '../../types/form-params.type';
import { EPaymentMethod } from '../../types/enums';
import { toast } from 'react-toastify';
import { notificationService } from '../../lib/notificationService';
import { CartItemsTable } from '../../modules/Cart/CartItemsTable';
import { useDispatch } from 'react-redux';
import { fetchCartCountThunk } from '../../store/reducers/cart.reducer';
import { ordersService } from '../../lib/orders.servie';
import { APP_URL } from '../../config';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const pageTitle = setMessage(Messages.action.pay);

  const payCartId = urlQueryService.getOneOrManyAsNumber('cartId', {
    query: router.query,
  });

  const {
    data: cartPriceData,
    isSuccess,
    isError,
    isLoading,
  } = useQuery('cartPrice', () => cartsService.getPrice({ id: payCartId }), {
    enabled: router.isReady,
  });

  const { data: payCarts } = useQuery(
    'payCarts',
    () => cartsService.getMany({ id: payCartId }),
    { enabled: router.isReady },
  );

  const { getFieldProps, handleSubmit, isSubmitting, values } =
    useFormik<CreateOrderParams>({
      initialValues: {
        paymentMethod: EPaymentMethod.MoneyTransfer,
      },
      onSubmit: async values => {
        try {
          if (!payCarts) {
            toast.error('Bạn chưa chọn khoá học');

            return;
          }

          const cartId = payCarts
            .map(cartItem => cartItem.id)
            .filter(item => !!item) as number[];

          const created = await ordersService.create({
            ...values,
            cartId: cartId,
          });

          dispatch(fetchCartCountThunk());

          if (!created.id) {
            throw new Error('Lỗi xác nhận đơn hàng, vui lòng thử lại');
          }

          router.push(`${APP_URL.orders}/${created.id}`);
        } catch (err) {
          notificationService.handleError(err);
        }
      },
    });

  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(pageTitle)}</title>
      </Head>

      <ContainerSpacingBottom>
        <Breadcrumbs>
          <BreadcrumbHome />
          <Breadcrumb title={pageTitle} icon={faCreditCard} />
        </Breadcrumbs>
        <Typography variant="h1">{pageTitle}</Typography>
      </ContainerSpacingBottom>

      {isError && (
        <ContainerSpacing>
          <NotFoundContent />
        </ContainerSpacing>
      )}

      {isLoading && <LoadingContainer />}

      {isError && <NotFoundContainer />}

      {isSuccess && (
        <>
          {!!cartPriceData ? (
            <>
              <ContainerSpacing>
                <form noValidate onSubmit={handleSubmit}>
                  <Stack
                    direction={{
                      xs: 'column',
                      md: 'row',
                    }}
                    justifyContent="space-between"
                    spacing={3}
                  >
                    <Grid item xs={12} md={8}>
                      <BoxSpacingBottom>
                        <OrderStepper step={1} />
                      </BoxSpacingBottom>

                      <Divider />

                      {!!payCarts && (
                        <BoxSpacingBig>
                          <CartItemsTable data={payCarts} />
                        </BoxSpacingBig>
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
                        ></CardHeader>
                        <CardContent>
                          <List
                            sx={{ fontSize: '1.3rem', color: 'text.secondary' }}
                          >
                            <ListItemPaddingReponsive divider>
                              <Grid container>
                                <Box>Giá</Box>
                                <Box sx={{ textAlign: 'right', flexGrow: 1 }}>
                                  {!!cartPriceData.price
                                    ? Formatter.formatMoney(cartPriceData.price)
                                    : 0}
                                </Box>
                              </Grid>
                            </ListItemPaddingReponsive>
                            <ListItemPaddingReponsive divider>
                              <Grid container>
                                <Box>
                                  {setMessage(Messages.course.savePrice)}
                                </Box>
                                <Box sx={{ textAlign: 'right', flexGrow: 1 }}>
                                  {!!cartPriceData.savePrice
                                    ? Formatter.formatMoney(
                                        cartPriceData.savePrice,
                                      )
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
                                  {!!cartPriceData.totalPrice
                                    ? Formatter.formatMoney(
                                        cartPriceData.totalPrice,
                                      )
                                    : 0}
                                </Box>
                              </Grid>
                            </ListItemPaddingReponsive>
                          </List>

                          <LoadingButton
                            type="submit"
                            loading={isSubmitting}
                            size="large"
                            variant="contained"
                            fullWidth
                            disabled={!payCarts}
                          >
                            {Messages.action.confirm} {Messages.order.name}
                          </LoadingButton>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Stack>
                </form>
              </ContainerSpacing>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

Page.layout = PrivateMainLayout;

export default Page;
