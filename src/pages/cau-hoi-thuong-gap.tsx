import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { AccordionDetails, Container, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { AppAccordion, AppAccordionSummary } from '../components/Accordin';
import { AppPage } from '../components/Page/AppPage';
import { TypographyBold } from '../components/Text/Typography';
import { appShortTitle, Messages } from '../lib/messages';
import { NextPageWithLayout } from '../types/components.type';

const Page: NextPageWithLayout = () => {
  const pageTitle = Messages.app.frequentlyAskedQuestions;

  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChangeAccordion =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <AppPage
      title={pageTitle}
      header={{
        breadcrumbs: [
          {
            title: Messages.app.frequentlyAskedQuestions,
            icon: faQuestion,
          },
        ],
      }}
    >
      <Container>
        <Typography gutterBottom>
          Khi bắt đầu tham gia hình thức học Online, có thể bạn sẽ gặp nhiều bỡ
          ngỡ và có những thắc mắc không biết hỏi ai. Dưới đây là một số câu hỏi
          thường gặp mà {appShortTitle} sẽ trả lời cụ thể cho bạn. Hãy cùng tìm
          hiểu ngay nhé:
        </Typography>

        <AppAccordion
          expanded={expanded === 'panel1'}
          onChange={handleChangeAccordion('panel1')}
        >
          <AppAccordionSummary id="cau-hoi-1">
            <TypographyBold>Học online có hiệu quả không?</TypographyBold>
          </AppAccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              Nội dung các chương trình học của Gitiho bám sát thực tế, có nhiều
              bài tập thực hành, giảng viên giải thích chi tiết rõ ràng.
            </Typography>
            <Typography gutterBottom>
              Các khóa học không đơn thuần chỉ dạy sử dụng công cụ mà mục tiêu
              đưa ra định hướng phát triển khả năng tư duy sử dụng để học xong
              ứng dụng được linh hoạt vào công việc.
            </Typography>
            <Typography gutterBottom>
              Trong quá trình học và vận dụng, có gì vướng mắc, bạn để lại câu
              hỏi trong kênh thảo luận để tương tác hỏi đáp với giảng viên,
              giảng viên sẽ hỗ trợ bạn ạ
            </Typography>
          </AccordionDetails>
        </AppAccordion>

        <AppAccordion
          expanded={expanded === 'panel2'}
          onChange={handleChangeAccordion('panel2')}
        >
          <AppAccordionSummary id="cau-hoi-2">
            <TypographyBold>Thời gian học thế nào</TypographyBold>
          </AppAccordionSummary>
          <AccordionDetails>
            Học Online tức là bạn có thể học bất cứ lúc nào bạn muốn và bạn có
            thể làm chủ không gian, thời gian học của mình. Bạn cũng có thể học
            trên điện thoại hay các thiết bị di động đó bạn.
          </AccordionDetails>
        </AppAccordion>

        <AppAccordion
          expanded={expanded === 'panel3'}
          onChange={handleChangeAccordion('panel3')}
        >
          <AppAccordionSummary id="cau-hoi-3">
            <TypographyBold>Cách thức học như thế nào?</TypographyBold>
          </AppAccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              Bạn sẽ học qua các video bài giảng quay sẵn với hệ thống kiến thức
              chi tiết từ căn bản, giao diện học tập thuận tiện, dễ học. Giảng
              viên sẽ vừa giảng lý thuyết vừa thực hành chi tiết các thao tác
              hướng dẫn bạn.
            </Typography>
          </AccordionDetails>
        </AppAccordion>

        <AppAccordion
          expanded={expanded === 'panel4'}
          onChange={handleChangeAccordion('panel4')}
        >
          <AppAccordionSummary id="cau-hoi-4">
            <TypographyBold>
              Có được hỗ trợ trong quá trình học không?
            </TypographyBold>
          </AppAccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              Trong quá trình học và vận dụng, có gì vướng mắc, bạn để lại câu
              hỏi trong kênh thảo luận để tương tác hỏi đáp với giảng viên,
              giảng viên hỗ trợ nhiệt tình 24/7
            </Typography>
          </AccordionDetails>
        </AppAccordion>

        <AppAccordion
          expanded={expanded === 'panel5'}
          onChange={handleChangeAccordion('panel5')}
        >
          <AppAccordionSummary id="cau-hoi-5">
            <TypographyBold>Khoá học có thời hạn bao lâu?</TypographyBold>
          </AppAccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              Đối với mọi khóa học trên {appShortTitle}, bạn chỉ cần thanh toán
              một lần và được quyền sở hữu bài học mãi mãi. Điều này đồng nghĩa
              với việc bạn có thể xem lại bài học bất cứ lúc nào bạn muốn.
            </Typography>
          </AccordionDetails>
        </AppAccordion>
      </Container>
    </AppPage>
  );
};

export default Page;
