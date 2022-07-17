import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Formatter } from '../../lib/formatter';
import { Messages, setMessage } from '../../lib/messages';
import { styled } from '../../styles/theme';
import { BoxRightText } from '../../components/Box';
import { GridNoWrap } from '../../components/Grid';
import { TypographyTwoLine } from '../../components/Text/Typography';

type CartCoursePriceProps = {
  promotionPrice?: number | null;
  price?: number;
};

export const CartCoursePrice: FC<CartCoursePriceProps> = ({
  promotionPrice,
  price,
}) => {
  console.log(promotionPrice);

  console.log(price);
  return (
    <>
      {!!promotionPrice || promotionPrice === 0 ? (
        <>
          <Typography
            sx={{
              color: 'text.secondary',
              textDecoration: 'line-through',
              fontSize: '0.875rem',
            }}
            component="span"
          >
            {Formatter.formatMoney(price)}
          </Typography>{' '}
          <Typography component="span">
            {Formatter.formatMoney(promotionPrice)}
          </Typography>
        </>
      ) : (
        <>
          <Typography component="span">
            {Formatter.formatMoney(price)}
          </Typography>
        </>
      )}
    </>
  );
};

type CartPriceProps = {
  promotionPrice?: number;
  price?: number;
  totalCourses: number;
};

export const TypographyCartPricePrimary = styled(Typography)(({ theme }) => ({
  color: theme.palette.price.primary,
  fontSize: theme.spacing(3),
}));

export const TypographyCartPriceSecondary = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'line-through',
  fontSize: theme.spacing(2),
}));

export const CartPriceBox: FC<CartPriceProps> = ({
  price,
  promotionPrice,
  totalCourses,
}) => {
  const formattedPrice = Formatter.formatMoney(price);

  const formattedPromotionPrice = Formatter.formatMoney(promotionPrice);

  return (
    <>
      {promotionPrice !== undefined && price !== undefined && (
        <Box>
          <GridNoWrap container>
            <Grid item sx={{ margin: 'auto 0' }}>
              <TypographyTwoLine>
                {setMessage(Messages.cart.totalPayment)} ({totalCourses}{' '}
                {Messages.course.name}) :{'\u00a0'}
              </TypographyTwoLine>
            </Grid>
            <Grid item sx={{ margin: 'auto' }}>
              <TypographyCartPricePrimary>
                {formattedPromotionPrice}
              </TypographyCartPricePrimary>
            </Grid>
          </GridNoWrap>
          <BoxRightText>
            {price > promotionPrice && (
              <TypographyCartPriceSecondary>
                {formattedPrice}
              </TypographyCartPriceSecondary>
            )}
          </BoxRightText>

          {/* {'\u00a0'}
          {promotionPrice !== undefined ? (
            <>
              <TypographyCartPricePrimary>
                {formattedPromotionPrice}
              </TypographyCartPricePrimary>
            </>
          ) : (
            <>
              <TypographyCartPricePrimary>
                {formattedPrice}
              </TypographyCartPricePrimary>
            </>
          )} */}
        </Box>
      )}
    </>
  );
};
