import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { BoxSpacing } from '../../../components/Box';
import { ButtonLink } from '../../../components/Button/ButtonLink';
import { AppLink } from '../../../components/Link';

import { APP_URL } from '../../../config';
import { Formatter } from '../../../lib/formatter';
import { Messages, setMessage } from '../../../lib/messages';
import { EOrderStatus } from '../../../types/enums';
import { OrderData } from '../../../types/fetch-data.type';
import { OrderItemsTable } from '../OrderItemsTable';

type OrderCardProps = {
  order: OrderData;
  onCancelOrder: (id: number) => void;
};

export const OrderCard: FC<OrderCardProps> = ({ order, onCancelOrder }) => {
  const { id: orderId } = order;

  return (
    <>
      {!!orderId && (
        <Card>
          <CardHeader
            title={`${setMessage(Messages.order.id)}: ${Formatter.formatOrderId(
              orderId,
            )}`}
            action={
              <>
                {!!order.status && (
                  <>
                    {!!order.statusChangeTime && (
                      <Typography
                        component="span"
                        color="text.secondary"
                        pr={1}
                      >
                        <Tooltip
                          title={Formatter.formatTime(order.statusChangeTime)}
                        >
                          <span>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                          </span>
                        </Tooltip>
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      color="primary.main"
                      textTransform="uppercase"
                      component="span"
                    >
                      {Formatter.formatOrderStatus(order.status)}
                    </Typography>
                  </>
                )}
              </>
            }
          ></CardHeader>

          <CardContent>
            <Divider />

            {!!order.orderItem && (
              <AppLink href={`${APP_URL.orders}/${orderId}`}>
                <BoxSpacing>
                  <OrderItemsTable data={order.orderItem} showHeader={false} />
                </BoxSpacing>
              </AppLink>
            )}

            <CardActions sx={{ justifyContent: 'right' }}>
              {order.status === EOrderStatus.WaitForPayment && (
                <Stack spacing={3} direction="row">
                  <Button
                    onClick={() => {
                      onCancelOrder(orderId);
                    }}
                  >{`${Messages.action.cancel} ${Messages.order.name}`}</Button>
                  <ButtonLink
                    variant="contained"
                    href={`${APP_URL.orders}/${orderId}`}
                  >
                    {Messages.action.pay}
                  </ButtonLink>
                </Stack>
              )}
            </CardActions>
          </CardContent>
        </Card>
      )}
    </>
  );
};
