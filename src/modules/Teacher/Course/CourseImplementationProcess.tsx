import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { BoxSpacing, BoxSpacingBottom } from '../../../components/Box';
import { TypographyCenter } from '../../../components/Text/Typography';
import { CourseImplementationSteps } from './CourseImplementationSteps';
import firstStepImage from '../../../../public/static/images/teachers/course_implementation_process/step1.png';
import secondStepImage from '../../../../public/static/images/teachers/course_implementation_process/step2.png';
import thirdStepImage from '../../../../public/static/images/teachers/course_implementation_process/step3.png';
import Image from 'next/image';
import { appShortTitle } from '../../../lib/messages';

export const CourseImplementationProcess: FC = () => {
  return (
    <>
      <BoxSpacingBottom>
        <TypographyCenter variant="h2">
          Quy trình triển khai khóa học
        </TypographyCenter>
      </BoxSpacingBottom>

      <BoxSpacing>
        <CourseImplementationSteps />
      </BoxSpacing>

      <BoxSpacing>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ padding: 2, mt: 'auto', mb: 'auto' }}>
            <BoxSpacingBottom>
              <Typography variant="h3">
                Lên kế hoạch hợp tác và Kế hoạch khóa học
              </Typography>
            </BoxSpacingBottom>
            <Typography gutterBottom>
              {appShortTitle} và bạn sẽ thống nhất kế hoạch hợp tác thông qua
              các điều khoản, chính sách mà chúng tôi đã thiết lập cho tất cả
              giảng viên.
            </Typography>
            <Typography>
              Bắt đầu triển khai từ nghiên cứu, {appShortTitle} sẽ giúp bạn tìm
              ra các chủ đề mà người dùng quan tâm. Bạn sẽ lên kế hoạch cho cấu
              trúc chương trình, viết nó ra Docs hoặc Excel và gửi cho Đội ngũ
              phát triển của {appShortTitle} hỗ trợ bạn
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} padding={2}>
            <Box sx={{ height: '100%' }}>
              <Image src={firstStepImage} alt="len_ke_hoach_hop_tac" />
            </Box>
          </Grid>
        </Grid>
      </BoxSpacing>

      <BoxSpacing>
        <Grid
          container
          sx={{
            flexDirection: { xs: 'column-reverse', md: 'row' },
          }}
        >
          <Grid item xs={12} md={6} padding={2}>
            <Box sx={{ height: '100%' }}>
              <Image src={secondStepImage} alt="len_ke_hoach_hop_tac" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ padding: 2, mt: 'auto', mb: 'auto' }}>
            <BoxSpacingBottom>
              <Typography variant="h3">
                Sản xuất khóa học của bạn dạng video
              </Typography>
            </BoxSpacingBottom>
            <Typography gutterBottom>
              Bắt đầu sản xuất các Video bài giảng sau khi bạn đã triển khai
              xong Kế hoạch khóa học và xây dựng các tài nguyên. Đừng lo nếu bạn
              chưa bao giờ sản xuất video Khóa học, {appShortTitle} Learning có
              sẵn các khóa học cho giảng viên về cách triển khai quay khóa học
              Online hiệu quả.
            </Typography>
            <Typography>
              Chúng tôi cũng có các tiêu chuẩn về Hình ảnh, Âm thanh để bạn có
              thể giữ cho chất lượng khóa học tốt nhất, và Đội ngũ biên tập luôn
              sẵn sàng hỗ trợ bạn trong việc hiệu chỉnh các khóa học để có chất
              lượng cao.
            </Typography>
          </Grid>
        </Grid>
      </BoxSpacing>

      <BoxSpacing>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ padding: 2, mt: 'auto', mb: 'auto' }}>
            <BoxSpacingBottom>
              <Typography variant="h3">
                Khai thác khóa học và gia tăng thu nhập của bạn
              </Typography>
            </BoxSpacingBottom>
            <Typography gutterBottom>
              {appShortTitle} và giảng viên sẽ cùng nhau đồng hành trong việc
              khai thác tác phẩm để có thể mang lại hiệu quả cao nhất cho khóa
              học.
            </Typography>
            <Typography>
              Đội ngũ Marketing, Bán hàng của {appShortTitle} cùng với sự am
              hiểu về sản phẩm, học viên của giảng viên sẽ tạo ra công thức bán
              hàng thành công với thu nhập rất tốt mỗi tháng.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} padding={2}>
            <Box sx={{ height: '100%s' }}></Box>
            <Image src={thirdStepImage} alt="len_ke_hoach_hop_tac" />
          </Grid>
        </Grid>
      </BoxSpacing>
    </>
  );
};
