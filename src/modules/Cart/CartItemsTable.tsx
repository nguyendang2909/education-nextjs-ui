import {
  Grid,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FC, Fragment } from 'react';
import { BoxBackground } from '../../components/Box';
import { GridNoWrap } from '../../components/Grid';
import { TableCellReponsive } from '../../components/Table';
import { TableCellIndex } from '../../components/Table/TableCell';
import {
  TypographyCapitalize,
  TypographyTwoLine,
} from '../../components/Text/Typography';
import { Messages, setMessage } from '../../lib/messages';
import { requestService } from '../../lib/request';
import { OrderItemData } from '../../types/fetch-data.type';
import { CartCoursePrice } from './CartPrice';

type CartItemsTableProps = {
  data: OrderItemData[];
};

export const CartItemsTable: FC<CartItemsTableProps> = ({ data }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Đơn hàng của bạn
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellIndex />
              <TableCellReponsive>
                <Typography>{setMessage(Messages.course.name)}</Typography>
              </TableCellReponsive>

              <Hidden smDown>
                <TableCellReponsive sx={{ textAlign: 'center' }}>
                  <TypographyCapitalize>
                    {Messages.cart.price}
                  </TypographyCapitalize>
                </TableCellReponsive>
              </Hidden>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => {
              const cartCoursePrice = (
                <CartCoursePrice
                  promotionPrice={
                    item.price !== undefined
                      ? item.promotionPrice
                      : item.course?.promotionPrice
                  }
                  price={
                    item.price !== undefined ? item.price : item.course?.price
                  }
                />
              );

              return (
                <Fragment key={index}>
                  {!!item.id && !!item.course && !!item.course.id && (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>

                      <TableCellReponsive>
                        <GridNoWrap container spacing={1}>
                          <Grid item>
                            <BoxBackground
                              sx={{
                                width: '80px',
                                height: '80px',
                                backgroundImage: item.course.coverImageURL
                                  ? `url("${requestService.getURL(
                                      item.course.coverImageURL,
                                    )}")`
                                  : undefined,
                              }}
                            />
                          </Grid>
                          <Grid item sx={{ flexGrow: 1 }}>
                            <TypographyTwoLine>
                              {setMessage(item.course.name)}
                            </TypographyTwoLine>
                          </Grid>
                        </GridNoWrap>
                      </TableCellReponsive>

                      <Hidden smDown>
                        <TableCellReponsive sx={{ textAlign: 'right' }}>
                          {cartCoursePrice}
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
    </>
  );
};
