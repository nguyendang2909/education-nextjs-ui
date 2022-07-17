import { Box, Container } from '@mui/material';
import { TypographyCenter } from '../../components/Text/Typography';
import { appShortTitle, Messages } from '../../lib/messages';

export const SecondFooter = () => {
  return (
    <Box sx={{ backgroundColor: '#304d6c' }}>
      <Container>
        <Box pt={2} pb={2}>
          <TypographyCenter variant="body2" sx={{ color: 'primary.contrast' }}>
            @ 2020 - Bản quyền của Công ty cổ phần công nghệ giáo dục{' '}
            {appShortTitle}
            <br /> Giấy chứng nhận Đăng ký doanh nghiệp số:{' '}
            {Messages.app.businessRegistrationNumber}, cấp bởi Sở kế hoạch và
            đầu tư TP. Hà Nội
          </TypographyCenter>
        </Box>
      </Container>
    </Box>
  );
};
