import {
  Box,
  Grid,
  Hidden,
  Link,
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
import { AppLink, NextLink } from '../../components/Link';
import { TableCellReponsive } from '../../components/Table';
import { TableCellIndex } from '../../components/Table/TableCell';
import {
  TypographyCapitalize,
  TypographyTwoLine,
} from '../../components/Text/Typography';
import { APP_URL } from '../../config';
import { Messages, setMessage } from '../../lib/messages';
import { requestService } from '../../lib/request';
import { OrderItemData } from '../../types/fetch-data.type';
import { CartCoursePrice } from '../Cart/CartPrice';

type OrderItemsTableProps = {
  data: OrderItemData[];
  showHeader?: boolean;
};

export const OrderItemsTable: FC<OrderItemsTableProps> = ({
  data,
  showHeader = true,
}) => {
  return (
    <>
      {showHeader && (
        <Typography variant="h3" gutterBottom>
          Chi tiết đơn hàng
        </Typography>
      )}

      <TableContainer>
        <Table>
          {showHeader && (
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
          )}

          <TableBody>
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  {!!item.id && !!item.course && !!item.course.id && (
                    <TableRow hover>
                      {showHeader && (
                        <TableCell>
                          <AppLink href={`/${item.course.id}`}>
                            <Box sx={{ color: 'text.primary' }}>
                              {index + 1}
                            </Box>
                          </AppLink>
                        </TableCell>
                      )}

                      <TableCellReponsive>
                        <AppLink href={`/${item.course.id}`}>
                          <GridNoWrap
                            container
                            spacing={1}
                            sx={{ color: 'text.primary' }}
                          >
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
                        </AppLink>
                      </TableCellReponsive>

                      <Hidden smDown>
                        <TableCellReponsive sx={{ textAlign: 'right' }}>
                          <CartCoursePrice
                            promotionPrice={item.promotionPrice}
                            price={item.price}
                          />
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
