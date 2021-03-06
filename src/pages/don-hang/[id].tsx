import {
  faMoneyBillTransfer,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  List,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { BoxSpacing, BoxSpacingBig } from '../../components/Box';
import { ContainerSpacing } from '../../components/Container';
import { LoadingContainer } from '../../components/Container/LoadingContainer';
import { NotFoundContainer } from '../../components/NotFound/NotFoundContainer';
import { AppPage } from '../../components/Page/AppPage';
import { APP_URL } from '../../config';
import { PrivateMainLayout } from '../../Layout/PrivateMainLayout';
import { Formatter } from '../../lib/formatter';
import { appShortTitle, Messages, setMessage } from '../../lib/messages';
import { notificationService } from '../../lib/notificationService';
import { ordersService } from '../../lib/orders.servie';
import { urlQueryService } from '../../lib/url-query.service';
import { NextPageWithLayout } from '../../types/components.type';
import { EOrderStatus, EPaymentMethod } from '../../types/enums';
import { UpdateOrderParams } from '../../types/form-params.type';
import momoPayment from '../../../public/static/images/payments/momo.png';
import { ListItemPaddingReponsive } from '../gio-hang';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { OrderItemsTable } from '../../modules/Order/OrderItemsTable';
import { OrderStepper } from '../../modules/Order/OrderStepper';
import { paymentsService } from '../../lib/payments.service';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const queryOptions = { query: router.query };

  const id = urlQueryService.getOneAsNumber('id', queryOptions) as number;

  const {
    data: order,
    isError,
    isSuccess,
    isLoading,
  } = useQuery(['order', id], () => ordersService.getOneById(id), {
    enabled: router.isReady && id > 0,
  });

  const formik = useFormik<UpdateOrderParams>({
    enableReinitialize: true,
    initialValues: {
      paymentMethod: order?.paymentMethod || EPaymentMethod.MoneyTransfer,
    },
    onSubmit: async values => {
      try {
        if (!values.paymentMethod) {
          toast.error('C???n nh???p ph????ng th???c thanh to??n');

          return;
        }

        const payUrl = await paymentsService.getPayUrl(
          id,
          values.paymentMethod,
        );

        // if (payUrl.includes('http')) {
        //   window.open(payUrl);
        // } else {
        //   router.push(payUrl);
        // }

        router.push(payUrl);

        // router.push(payUrl);

        // switch (values.paymentMethod) {
        //   case EPaymentMethod.MoneyTransfer:
        //     router.push(
        //       `${APP_URL.orderMoneyTransfer}/${Formatter.formatOrderId(id)}`,
        //     );
        //     break;

        //   default:
        //     router.push(`${APP_URL.orders}/${Formatter.formatOrderId(id)}`);
        // }
      } catch (err) {
        notificationService.handleError(err);
      }
    },
  });

  const pageTitle = id
    ? `${Messages.order.name} #${Formatter.formatOrderId(id)}`
    : `${Messages.order.name}`;

  const paymentBox = () => {
    switch (order?.status) {
      case EOrderStatus.WaitForPayment:
        return (
          <LoadingButton
            type="submit"
            loading={formik.isSubmitting}
            size="large"
            variant="contained"
            fullWidth
            disabled={!order || !formik.values.paymentMethod}
          >
            {Messages.action.pay}
          </LoadingButton>
        );

      case EOrderStatus.Success:
        return (
          <Typography color="primary.main" variant="h4" gutterBottom>
            ????n h??ng ???? thanh to??n th??nh c??ng!
          </Typography>
        );

      case EOrderStatus.Cancel:
        return (
          <Typography color="error.main" variant="h4" gutterBottom>
            ????n h??ng ???? b??? hu???!
          </Typography>
        );

      default:
        return '';
    }
  };

  return (
    <AppPage
      title={pageTitle}
      header={{
        breadcrumbs: [
          {
            title: Messages.order.name,
            icon: faShoppingBag,
            path: APP_URL.orders,
          },
        ],
      }}
    >
      {isLoading && <LoadingContainer />}

      {isError && <NotFoundContainer />}

      {isSuccess && order && (
        <ContainerSpacing>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack
              direction={{
                xs: 'column',
                md: 'row',
              }}
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item xs={12} md={8}>
                {!!order.status && order.status !== EOrderStatus.Cancel && (
                  <>
                    <BoxSpacing>
                      <OrderStepper
                        step={order.status === EOrderStatus.Success ? 3 : 2}
                      />
                    </BoxSpacing>
                  </>
                )}

                {!!order.status &&
                  order.status === EOrderStatus.WaitForPayment && (
                    <>
                      <BoxSpacingBig>
                        <Typography variant="h3" gutterBottom>
                          Ph????ng th???c thanh to??n
                        </Typography>

                        <RadioGroup {...formik.getFieldProps('paymentMethod')}>
                          <FormControlLabel
                            value={EPaymentMethod.MoneyTransfer}
                            control={<Radio />}
                            label={
                              <Stack direction="row" spacing={2}>
                                <Box>
                                  <FontAwesomeIcon
                                    icon={faMoneyBillTransfer}
                                    fontSize={24}
                                  />
                                </Box>
                                <Typography>Chuy???n kho???n ng??n h??ng</Typography>
                              </Stack>
                            }
                          />

                          <Collapse
                            in={
                              formik.values.paymentMethod ===
                              EPaymentMethod.MoneyTransfer
                            }
                          >
                            <Paper sx={{ padding: 2, marginBottom: 3 }}>
                              <Typography>
                                Kh??a h???c s??? ???????c k??ch ho???t sau khi{' '}
                                {appShortTitle} ki???m tra t??i kho???n v?? x??c nh???n
                                vi???c thanh to??n c???a b???n th??nh c??ng.
                                <br />
                                (Th???i gian ki???m tra v?? x??c nh???n t??i kho???n ??t
                                nh???t l?? 1 gi???)
                              </Typography>
                            </Paper>
                          </Collapse>

                          <FormControlLabel
                            value={EPaymentMethod.Momo}
                            label={
                              <Stack direction="row" spacing={2}>
                                <Box>
                                  <Image
                                    src={momoPayment}
                                    // layout="responsive"
                                    width={30}
                                    height={30}
                                    alt="Momo"
                                  />
                                </Box>
                                <Typography>V?? Momo</Typography>
                              </Stack>
                            }
                            control={<Radio />}
                          />
                          <Collapse
                            in={
                              formik.values.paymentMethod ===
                              EPaymentMethod.Momo
                            }
                          >
                            <Paper sx={{ padding: 2, marginBottom: 3 }}>
                              <Typography>
                                Sau khi nh???n Thanh to??n, h??? th???ng s??? hi???n th??? m??
                                QR k??m h?????ng d???n.
                                <br />
                                B???n c???n t???i v?? c??i ???ng d???ng Momo tr??n ??i???n tho???i
                                v?? s??? d???ng ????? qu??t m?? QR tr??n ????? thanh to??n.
                              </Typography>
                            </Paper>
                          </Collapse>
                        </RadioGroup>
                      </BoxSpacingBig>

                      <Divider />
                    </>
                  )}

                {order.status === EOrderStatus.Success && (
                  <>
                    <BoxSpacing>
                      {!!order.paymentMethod && (
                        <Typography>
                          Ph????ng th???c thanh to??n:{' '}
                          <b>
                            {setMessage(
                              Formatter.formatPaymentMethod(
                                order.paymentMethod,
                              ),
                            )}
                          </b>
                        </Typography>
                      )}
                    </BoxSpacing>
                  </>
                )}

                {!!order.orderItem && (
                  <BoxSpacingBig>
                    <OrderItemsTable data={order.orderItem} />
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
                    <List sx={{ fontSize: '1.3rem', color: 'text.secondary' }}>
                      <ListItemPaddingReponsive divider>
                        <Grid container>
                          <Box>Gi??</Box>
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
                          <Box>{setMessage(Messages.cart.totalPayment)}</Box>
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

                    {paymentBox()}
                  </CardContent>
                </Card>
              </Grid>
            </Stack>
          </form>
        </ContainerSpacing>
      )}
    </AppPage>
  );
};

Page.layout = PrivateMainLayout;

export default Page;
