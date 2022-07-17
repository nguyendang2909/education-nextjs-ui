import Head from 'next/head';
import { Messages, messagesService, setMessage } from '../lib/messages';
import { NextPageWithLayout } from '../types/components.type';
import { useQuery } from 'react-query';
import { cartsService } from '../lib/carts.service';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Grid,
  Hidden,
  List,
  ListItem,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import {
  TypographyCapitalize,
  TypographyColorSecond,
  TypographyTwoLine,
} from '../components/Text/Typography';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchCartCountThunk } from '../store/reducers/cart.reducer';
import { BoxBackground } from '../components/Box';
import { requestService } from '../lib/request';
import { TableCellReponsive } from '../components/Table';
import { GridNoWrap } from '../components/Grid';
import { CartCoursePrice } from '../modules/Cart/CartPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClose } from '@fortawesome/free-solid-svg-icons';
import { IconButtonLarge } from '../components/IconButton';
import { CartEmpty } from '../modules/Cart/CartEmpty';
import { Formatter } from '../lib/formatter';
import { ContainerSpacing, ContainerSpacingBig } from '../components/Container';
import { APP_URL } from '../config';
import _ from 'lodash';
import { NextLink } from '../components/Link';
import { useRouter } from 'next/router';
import { urlQueryService } from '../lib/url-query.service';
import { Breadcrumb, BreadcrumbHome } from '../components/Breadcrumbs';
import { coursesService } from '../lib/courses.service';
import { CoursesSlider } from '../modules/Course/CourseSlider';
import { NotFoundContent } from '../components/NotFound';
import { LoadingContainer } from '../components/Container/LoadingContainer';
import { PrivateMainLayout } from '../Layout/PrivateMainLayout';

export const ListItemPaddingReponsive = styled(ListItem)(() => ({
  padding: '3% 5% 3% 0%',
}));

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const buyCartId = urlQueryService.getOneAsNumber('cartId', {
    query: router.query,
  });

  const theme = useTheme();

  const pageTitle = setMessage(Messages.cart.name);

  const [payCartIds, setPayCartIds] = useState<number[]>([]);

  const {
    data: cartItems,
    refetch,
    isSuccess,
    isError,
    isLoading,
  } = useQuery('cart', () => cartsService.getMany());

  const payCartIdsLength = payCartIds.length;

  const { data: cartPriceData, refetch: refetchCartPriceData } = useQuery(
    'cartPrice',
    () => cartsService.getPrice({ id: payCartIds }),
    { enabled: router.isReady && payCartIdsLength > 0, staleTime: Infinity },
  );

  const { data: coursesMayLike } = useQuery(
    'coursesMayLike',
    () => coursesService.getMany({ sortBy: 'popularity', pageSize: 20 }),
    { enabled: router.isReady, staleTime: Infinity },
  );

  useEffect(() => {
    if (router.isReady && cartItems) {
      if (buyCartId) {
        setPayCartIds(prev => [...prev, buyCartId].sort((a, b) => a - b));
      } else {
        setPayCartIds(
          cartItems
            ?.map(cartItem => {
              return cartItem.id;
            })
            .filter(cartId => !!cartId) as number[],
        );
      }
    }
  }, [buyCartId, router.isReady, cartItems]);

  useEffect(() => {
    if (router.isReady && payCartIds.length > 0) {
      refetchCartPriceData();
    }
  }, [router.isReady, refetchCartPriceData, payCartIds.length]);

  const deleteCartItem = async (cartItemId: number) => {
    try {
      await cartsService.delete(cartItemId);

      refetch();

      dispatch(fetchCartCountThunk());
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleChangeCheckbox = (
    evt: ChangeEvent<HTMLInputElement>,
    cartId: number,
  ) => {
    const checked = evt.target.checked;

    if (payCartIdsLength === 0) {
      if (checked) {
        setPayCartIds(prev => [cartId]);

        return;
      }
    }

    for (const payCartId of payCartIds) {
      if (payCartId === cartId) {
        if (checked) {
          return;
        }

        setPayCartIds(prev =>
          prev.filter(item => item !== cartId).sort((a, b) => a - b),
        );

        return;
      }
    }

    setPayCartIds(prev => [...prev, cartId].sort((a, b) => a - b));
  };

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    if (checked) {
      if (cartItems) {
        setPayCartIds(
          cartItems
            .map(cartItem => {
              return cartItem.id;
            })
            .filter(cartId => !!cartId)
            .sort((a, b) => (a || 0) - (b || 0)) as number[],
        );

        return;
      }
    }

    setPayCartIds([]);
  };

  const cartPrice = cartPriceData?.price || 0;

  const cartTotalPrice = cartPriceData?.totalPrice || 0;

  const cartSavePrice = cartPriceData?.savePrice || 0;

  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(pageTitle)}</title>
      </Head>

      <ContainerSpacing>
        <Breadcrumbs>
          <BreadcrumbHome />
          <Breadcrumb title={Messages.cart.name} icon={faCartShopping} />
        </Breadcrumbs>
        <Typography variant="h1">{pageTitle}</Typography>
      </ContainerSpacing>

      {isLoading && <LoadingContainer />}

      {isError && (
        <ContainerSpacing>
          <NotFoundContent />
        </ContainerSpacing>
      )}

      {isSuccess && (
        <>
          {!!cartItems && cartItems.length > 0 ? (
            <>
              <ContainerSpacing
                sx={{
                  padding: 0,
                }}
              >
                <Stack
                  direction={{
                    xs: 'column',
                    md: 'row',
                  }}
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Grid item xs={12} md={8}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Checkbox
                                checked={_.isEqual(
                                  payCartIds,
                                  cartItems
                                    .map(cartItem => {
                                      return cartItem.id;
                                    })
                                    .filter(id => !!id)
                                    .sort((a, b) => (a || 0) - (b || 0)),
                                )}
                                onChange={handleCheckAll}
                              />
                            </TableCell>

                            <TableCellReponsive>
                              <TypographyCapitalize>
                                {Messages.course.name}
                              </TypographyCapitalize>
                            </TableCellReponsive>

                            <Hidden smDown>
                              <TableCellReponsive sx={{ textAlign: 'center' }}>
                                <TypographyCapitalize>
                                  {Messages.cart.price}
                                </TypographyCapitalize>
                              </TableCellReponsive>
                            </Hidden>

                            <Hidden smDown>
                              <TableCell
                                sx={{ width: theme.spacing(10) }}
                              ></TableCell>
                            </Hidden>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {cartItems.map((item, index) => {
                            const { course = {}, id: cartItemId } = item;

                            const {
                              id: courseId,
                              name: courseName,
                              price: coursePrice,
                              promotionPrice: coursePromotionPrice,
                              coverImageURL,
                            } = course;

                            const cartCoursePrice = (
                              <CartCoursePrice
                                promotionPrice={coursePromotionPrice}
                                price={coursePrice}
                              />
                            );

                            return (
                              <Fragment key={index}>
                                {!!courseId && !!cartItemId && (
                                  <TableRow>
                                    <TableCell>
                                      <Checkbox
                                        checked={payCartIds.includes(
                                          cartItemId,
                                        )}
                                        onChange={event => {
                                          handleChangeCheckbox(
                                            event,
                                            cartItemId,
                                          );
                                        }}
                                      ></Checkbox>
                                    </TableCell>

                                    <TableCellReponsive>
                                      <GridNoWrap container spacing={1}>
                                        <Grid item>
                                          <BoxBackground
                                            sx={{
                                              width: '80px',
                                              height: '80px',
                                              backgroundImage: coverImageURL
                                                ? `url("${requestService.getURL(
                                                    coverImageURL,
                                                  )}")`
                                                : undefined,
                                            }}
                                          />
                                        </Grid>

                                        <Grid item sx={{ flexGrow: 1 }}>
                                          <TypographyTwoLine>
                                            {setMessage(courseName)}
                                          </TypographyTwoLine>
                                          <Hidden smUp>
                                            {cartCoursePrice}{' '}
                                            <Button
                                              onClick={() => {
                                                deleteCartItem(cartItemId);
                                              }}
                                            >
                                              {Messages.action.delete}
                                            </Button>
                                          </Hidden>
                                        </Grid>
                                      </GridNoWrap>
                                    </TableCellReponsive>

                                    <Hidden smDown>
                                      <TableCellReponsive
                                        sx={{ textAlign: 'right' }}
                                      >
                                        {cartCoursePrice}
                                      </TableCellReponsive>
                                    </Hidden>

                                    <Hidden smDown>
                                      <TableCellReponsive>
                                        <IconButtonLarge
                                          onClick={() => {
                                            deleteCartItem(cartItemId);
                                          }}
                                        >
                                          <FontAwesomeIcon icon={faClose} />
                                        </IconButtonLarge>
                                      </TableCellReponsive>
                                    </Hidden>
                                  </TableRow>
                                )}
                              </Fragment>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
                                {!!payCartIdsLength
                                  ? Formatter.formatMoney(cartPrice)
                                  : 0}
                              </Box>
                            </Grid>
                          </ListItemPaddingReponsive>
                          <ListItemPaddingReponsive divider>
                            <Grid container>
                              <Box>{setMessage(Messages.course.savePrice)}</Box>
                              <Box sx={{ textAlign: 'right', flexGrow: 1 }}>
                                {!!payCartIdsLength
                                  ? Formatter.formatMoney(cartSavePrice)
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
                                {!!payCartIdsLength
                                  ? Formatter.formatMoney(cartTotalPrice)
                                  : 0}
                              </Box>
                            </Grid>
                          </ListItemPaddingReponsive>
                        </List>

                        <NextLink
                          href={{
                            pathname: APP_URL.orderConfirm,
                            query: {
                              cartId: payCartIds,
                            },
                          }}
                        >
                          <Button
                            size="large"
                            variant="contained"
                            fullWidth
                            disabled={payCartIdsLength === 0}
                          >
                            {Messages.action.continue} {Messages.action.pay}
                          </Button>
                        </NextLink>
                      </CardContent>
                    </Card>
                  </Grid>
                </Stack>
              </ContainerSpacing>

              {!!coursesMayLike && (
                <ContainerSpacingBig>
                  <TypographyColorSecond>
                    CÓ THỂ BẠN CŨNG THÍCH
                  </TypographyColorSecond>

                  <CoursesSlider courses={coursesMayLike} />
                </ContainerSpacingBig>
              )}
            </>
          ) : (
            <>
              <Container>
                <CartEmpty />
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

Page.layout = PrivateMainLayout;

export default Page;
