import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { BoxCenter, BoxSpacing, BoxSpacingBottom } from '.';
import { Messages, setMessage } from '../../lib/messages';
import Asset1 from '../../../public/static/images/reason_to_study/asset_1.svg';
import Asset2 from '../../../public/static/images/reason_to_study/asset_2.svg';
import Asset3 from '../../../public/static/images/reason_to_study/asset_3.svg';
import Asset4 from '../../../public/static/images/reason_to_study/asset_4.svg';

export const ReasonToStudyBox: FC = () => {
  return (
    <Box>
      <BoxSpacingBottom>
        <Typography variant="h2">
          Vì sao{' '}
          <span
            style={{
              color: '#2f8edf',
            }}
          >
            500,000+
          </span>{' '}
          học viên chọn {setMessage(Messages.app.shortTitle)}
        </Typography>
      </BoxSpacingBottom>

      <BoxSpacing>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Stack spacing={2} alignItems="center">
              <Box sx={{ height: 140 }}>
                <Image src={Asset1} alt="ly_do_hoc_tai_Leslei" />
              </Box>
              <BoxCenter>
                <Typography variant="h3">Lộ trình bài bản</Typography>
                <Typography variant="body1">Ứng với từng vị trí</Typography>
              </BoxCenter>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Stack spacing={2} alignItems="center">
              <Box sx={{ height: 140 }}>
                <Image src={Asset2} alt="ly_do_hoc_tai_Leslei" />
              </Box>

              <BoxCenter>
                <Typography variant="h3">Kiến thức thực tiễn</Typography>
                <Typography variant="body1">
                  Giải quyết ngay vấn đề trong công việc
                </Typography>
              </BoxCenter>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Stack spacing={2} alignItems="center">
              <Box sx={{ height: 140 }}>
                <Image src={Asset3} alt="ly_do_hoc_tai_Leslei" />
              </Box>
              <BoxCenter>
                <Typography variant="h3">Học trực tuyến</Typography>
                <Typography variant="body1">Hỗ trợ trục tuyến</Typography>
              </BoxCenter>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Stack spacing={2} alignItems="center">
              <Box sx={{ height: 140 }}>
                <Image src={Asset4} alt="ly_do_hoc_tai_Leslei" />
              </Box>
              <BoxCenter>
                <Typography variant="h3">Cập nhật thường xuyên</Typography>
                <Typography variant="body1">
                  Nội dung học cập nhật hàng tháng
                </Typography>
              </BoxCenter>
            </Stack>
          </Grid>
        </Grid>
      </BoxSpacing>
    </Box>
  );
};
