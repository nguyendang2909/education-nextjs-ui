import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { BoxSpacing, BoxSpacingBottom } from '../../components/Box';
import {
  TypographyBold,
  TypographyItalic,
} from '../../components/Text/Typography';
import { appShortTitle, Messages, setMessage } from '../../lib/messages';
// import { styled, theme } from '../../styles/theme';

// const GridStepIcon = styled(Grid)(({ theme }) => ({
//   width: theme.spacing(5),
//   height: theme.spacing(5),
// }));

// const StepIcon = styled(FontAwesomeIcon)(() => ({
//   width: theme.spacing(5),
//   height: theme.spacing(5),
// }));

// const GridStepContent = styled(Grid)(() => ({
//   flexGrow: 1,
// }));

export const MoneyTransferSteps: FC = () => {
  return (
    <>
      <BoxSpacingBottom>
        <TypographyBold>
          Khóa học sẽ được kích hoạt sau khi {appShortTitle} kiểm tra tài khoản
          và xác nhận việc thanh toán của bạn thành công. (Thời gian kiểm tra và
          xác nhận tài khoản ít nhất là 1 giờ)
        </TypographyBold>
      </BoxSpacingBottom>

      <BoxSpacing>
        <Typography>{setMessage(Messages.cart.moneyTransfer)}</Typography>
        <Typography gutterBottom>
          Bạn có thể đến bất kỳ ngân hàng nào ở Việt Nam (hoặc sử dụng Internet
          Banking) để chuyển tiền theo thông tin bên dưới:
        </Typography>
      </BoxSpacing>

      <BoxSpacing>
        <Typography>
          <Typography component="span" sx={{ fontWeight: 700 }}>
            • Số tài khoản:{' '}
          </Typography>
          <Typography component="span">0000000000</Typography>
        </Typography>

        <Typography>
          <Typography component="span" sx={{ fontWeight: 700 }}>
            • Chủ tài khoản:{' '}
          </Typography>
          <Typography component="span">0000000000</Typography>
        </Typography>
        <Typography>
          <Typography component="span" sx={{ fontWeight: 700 }}>
            • Ngân hàng:{' '}
          </Typography>
          <Typography component="span">0000000000</Typography>
        </Typography>
      </BoxSpacing>

      <BoxSpacing>
        <TypographyItalic>Ghi chú khi chuyển khoản:</TypographyItalic>
        <Typography>
          • Tại mục {'"'}Ghi chú{'"'} khi chuyển khoản, bạn ghi rõ một trong
          những thông tin: Số điện thoại. Họ và tên. Email đăng ký học (thay{' '}
          {'"'}@{'"'}
          thành {'"'}.{'"'}). Mã đơn hàng
        </Typography>
        <Typography>
          • Ví dụ: SDT 0971018798. Nguyen Thi A. abc.gmail.com. Don hang 1232
        </Typography>
      </BoxSpacing>
    </>
  );
};
