import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';
import { BoxBorderBottom, BoxSpacing } from '../components/Box';
import { TypographyCenter } from '../components/Text/Typography';
import { appShortTitle, messagesService } from '../lib/messages';
import { NextPageWithLayout } from '../types/components.type';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle('Điều khoản dịch vụ')}</title>
      </Head>
      <Container>
        <Box pb={5} pt={5}>
          <TypographyCenter variant="h1">ĐIỀU KHOẢN DỊCH VỤ</TypographyCenter>
        </Box>

        <BoxSpacing>
          <Typography>
            Dưới đây là những điều khoản được áp dụng cho học viên và đối tác
            của
            {appShortTitle}. Xin hãy đọc kỹ toàn bộ thỏa thuận trước khi tham
            gia.
          </Typography>
        </BoxSpacing>

        <BoxBorderBottom>
          <BoxSpacing>
            <Typography variant="h2">ĐIỀU KHOẢN CHUNG</Typography>
          </BoxSpacing>

          <BoxSpacing>
            <Typography variant="h3">
              Điều 1: Thông tin tài khoản cá nhân
            </Typography>
            <Typography>
              Khi đăng ký tài khoản {appShortTitle}, để được hỗ trợ nhanh chóng,
              bạn cần cung cấp đầy đủ và chính xác các thông tin: Họ tên, Email,
              Phone, Giới tính, Ngày sinh, Thành phố,..
              <br />
              Chúng tôi sử dụng thông tin liên lạc của bạn để gửi mã kích hoạt
              khóa học, thông báo chương trình khuyến mãi, xác nhận đổi mật
              khẩu, các thảo luận trong lớp học,..
              <br />
              Thông tin ngày sinh và giới tính dùng để gợi ý đến bạn những khóa
              học phù hợp, cũng như gửi quà tặng đến bạn trong ngày sinh nhật.
              <br />
              Bạn có thể đăng nhập bằng tài khoản {appShortTitle} (email + mật
              khẩu) hoặc đăng nhập bằng Google, Facebook.
              <br />
              Bạn có thể cập nhật thông tin cá nhân hoặc hủy (xóa) tài khoản bất
              kỳ lúc nào khi không còn nhu cầu sử dụng
            </Typography>
          </BoxSpacing>

          <BoxSpacing>
            <Typography variant="h3">Điều 2: Việc bảo mật thông tin</Typography>
            <Typography>
              Bạn có trách nhiệm tự mình bảo quản mật khẩu, nếu mật khẩu bị lộ
              ra ngoài dưới bất kỳ hình thức nào, {appShortTitle} sẽ không chịu
              trách nhiệm về mọi tổn thất phát sinh.
              <br />
              Mọi thông tin cá nhân của bạn sẽ được chúng tôi bảo mật, không
              tiết lộ ra ngoài. Chúng tôi không bán hay trao đổi những thông tin
              này với bất kỳ một bên thứ ba nào khác. Tuy nhiên, trong trường
              hợp cơ quan chức năng yêu cầu, {appShortTitle} buộc phải cung cấp
              những thông tin này theo quy định pháp luật.
              <br />
              Bạn có quyền sở hữu trọn đời các khóa học đã đăng ký: không giới
              hạn số lần tham gia học và thời gian học.
              <br />
              Bạn không được download video, không được chia sẻ video lên
              Internet với bất kỳ hình thức nào. Nếu vi phạm, tài khoản của bạn
              sẽ bị khoá và bạn phải chịu trách nhiệm trước pháp luật về hành vi
              xâm phạm sở hữu trí tuệ.
              <br />
              {appShortTitle} có thể gửi thông báo tình hình học tập, chương
              trình khuyến mãi (nếu có), thông báo khóa học mới sắp ra mắt để
              học viên quan tâm có thể đăng ký ngay để được ưu đãi. Nếu bạn
              không muốn nhận email có thể bấm vào link {'"'}Ngừng nhận email
              {'"'} ở cuối email.
            </Typography>
          </BoxSpacing>

          <BoxSpacing>
            <Typography variant="h3">
              Điều 3: Đánh giá khóa học và thảo luận
            </Typography>
            <Typography>
              Học viên khi tham gia khóa học trên {appShortTitle} có quyền đánh
              giá về chất lượng khóa học.
              <br />
              Trong quá trình học, học viên có bất kỳ thắc mắc hay góp ý nào có
              thể đăng bình luận của mình lên phần Thảo luận - ngay trong giao
              diện bài học để được chuyên viên {appShortTitle} và Giảng viên hỗ
              trợ giải đáp.
              <br />
              Bên cạnh đó, mỗi khóa học trên {appShortTitle} đều có 1 Group Thảo
              luận riêng cho các học viên và giảng viên để trao đổi các vấn đề
              chuyên môn.
            </Typography>
          </BoxSpacing>

          <BoxSpacing>
            <Typography variant="h3">
              Điều 4: Nghiêm cấm sử dụng dịch vụ với các hành vi dưới đây
            </Typography>
            <Typography>
              Sử dụng bất kỳ công cụ hay hình thức nào để can thiệp vào các dịch
              vụ, khóa học trong hệ thống {appShortTitle}.
              <br />
              Phát tán hoặc tuyên truyền cổ vũ các hoạt động phát tán, can thiệp
              và phá hoại nội dung các bài học trên hệ thống của {
                appShortTitle
              }{' '}
              ra bên ngoài. Mọi vi phạm khi bị phát hiện sẽ bị xóa tài khoản và
              có thể xử lý theo quy định của pháp luật về việc vi phạm bản
              quyền.
              <br />
              Sử dụng chung tài khoản: với việc trên 2 người cùng sử dụng chung
              một tài khoản khi bị phát hiện sẽ bị xóa tài khoản ngay lập tức.
              <br />
              Xúc phạm, nhạo báng người khác dưới bất kỳ hình thức nào: chê bai,
              kỳ thị tôn giáo, giới tính, sắc tộc..
              <br />
              Hành vi mạo nhận hay cố ý làm người khác tưởng lầm mình là một
              người sử dụng khác trong hệ thống dịch vụ của {appShortTitle}.
              <br />
              Bàn luận về các vấn đề chính trị, kỳ thị tôn giáo, kỳ thị sắc tộc.
              <br />
              Hành vi, thái độ làm tổn hại đến uy tín của các sản phẩm, dịch vụ,
              khóa học trong hệ thống {appShortTitle} dưới bất kỳ hình thức nào,
              phương thức nào.
              <br />
              Mua bán chuyển nhượng tài khoản, khóa học của {appShortTitle}.
              (chỉ được phân phối khóa học qua hình thức Affiliate)
              <br />
              Mạo danh {appShortTitle} ảnh hưởng đến uy tín của {appShortTitle},
              gây sự nhầm lẫn cho các học viên và đối tác theo bất kỳ phương
              thức nào (dùng địa chỉ email, tên miền website, fanpage có chữ{' '}
              {appShortTitle}
              ..)
              <br />
              Khi phát hiện những hành vi trên từ tài khoản của bạn,{' '}
              {appShortTitle}
              {'\u00a0'}
              có quyền tước bỏ mọi quyền lợi liên quan đối với tài khoản (bao
              gồm việc khóa tài khoản) hoặc sử dụng những thông tin mà bạn cung
              cấp khi đăng ký tài khoản để chuyển cho cơ quan chức năng giải
              quyết theo quy định của pháp luật.
            </Typography>
          </BoxSpacing>

          <BoxSpacing>
            <Typography variant="h3">
              Điều 5: Trường hợp thanh toán tiền thừa
            </Typography>
            <Typography>
              Tiền thanh toán thừa cho khóa học được chuyển vào ví điện tử trong
              tài khoản {appShortTitle} của khách hàng để thanh toán cho các đơn
              hàng tiếp theo.
              <br />
              Trường hợp thanh toán thừa do lỗi hệ thống của {appShortTitle},
              chúng tôi sẽ trả lại tiền thừa hoặc chuyển sang ví điện tử{' '}
              {appShortTitle}
              {'\u00a0'}
              để thanh toán vào đơn hàng tiếp theo (tuỳ theo nguyện vọng của
              bạn).
            </Typography>
          </BoxSpacing>

          <BoxSpacing>
            <Typography variant="h3">
              Điều 6: Chính sách hoàn trả học phí
            </Typography>
            <Typography>
              Học viện Online {appShortTitle} luôn mong muốn tạo điều kiện thuận
              lợi nhất cho bạn để học hỏi và cập nhật những kiến thức hữu ích
              cho công việc cũng như đời sống thông qua các khóa học chất lượng
              trên
              {'\u00a0'}
              {appShortTitle}.
              <br />
              Tuy nhiên, nếu bạn không hài lòng hoặc nội dung khóa học không như
              bạn mong đợi, bạn có thể yêu cầu hoàn lại học phí qua email: cskh@
              {appShortTitle}.vn
              <br />
              1. Trong vòng 7 ngày kể từ ngày thanh toán
              <br />
              2. Học chưa quá 30% số bài học.
              <br />
              3. Mua khóa học và thanh toán trực tiếp qua {appShortTitle}, hoặc
              đại lý được cấp quyền phân phối khoá học bởi {appShortTitle}.
              <br />
              Trường hợp không thanh toán trực tiếp qua {appShortTitle} (mua từ
              Giảng viên, từ 1 tài khoản khác...), {appShortTitle} không thể
              hoàn học phí.
              <br />
              Nội dung email đề nghị hoàn học phí:
              <br />
              Tiêu đề email: Yêu cầu hoàn học phí
              <br />
              Nội dung email, bạn cần ghi rõ:
              <br />
              Họ và tên:
              <br />
              Email đăng ký học:
              <br />
              Tên khóa học:
              <br />
              Số tiền học phí đã nộp:
              <br />
              Cách thức đã nộp học phí: Chuyển khoản/ ATM Online/ Thu tiền tại
              nhà.
              <br />
              Cách thức bạn muốn nhận lại tiền hoàn học phí:
              <br />
              Số tiền hoàn = Số tiền thực nhận về {appShortTitle} (sau khi trừ
              đi phí tại cổng thanh toán)
              <br />
              Thời hạn hoàn tiền: trong vòng 7 ngày làm việc kể từ ngày nhận
              được yêu cầu của bạn.
            </Typography>
          </BoxSpacing>

          <BoxSpacing>
            <Typography variant="h3">
              Điều 7: Chính sách đổi trả đối với thẻ học {appShortTitle}
            </Typography>
            <Typography>
              Nhằm đảm bảo chất lượng cũng như hiệu quả học tập của học viên,
              {'\u00a0'}
              {appShortTitle}
              có chính sách đổi trả đối với sản phẩm thẻ học như sau:
              <br />
              Chính sách hoàn trả học phí và đổi thẻ học:
              <br />
              Đối với các thẻ đã giao nhưng học viên chưa học, thẻ sẽ được đổi
              trả nếu:
              <br />
              Trong vòng 90 ngày kể từ ngày thanh toán
              <br />
              Thẻ bị lỗi kỹ thuật, hư hỏng không sử dụng và kích hoạt được.
              <br />
              Giao sai loại thẻ.
              <br />
              Thẻ học được thanh toán trực tiếp qua {appShortTitle}, hoặc đại lý
              được cấp quyền phân phối khoá học bởi {appShortTitle}.
              <br />
              Đối với các thẻ đã giao và học viên đã vào học, thẻ được đổi trả
              nếu:
              <br />
              Trong vòng 7 ngày kể từ ngày thanh toán
              <br />
              Học chưa quá 30% số bài học.
              <br />
              Quy định về thời gian thông báo và gửi sản phẩm đổi trả
              <br />
              Thời gian thông báo đổi trả: trong vòng 24h kể từ khi nhận sản
              phẩm đối với trường hợp Thẻ sai, thẻ lỗi.
              <br />
              Thời gian gửi đổi thẻ mới: trong vòng 14 ngày từ ngày nhận thẻ.
              <br />
              Số tiền hoàn trả = Số tiền thực nhận về {appShortTitle} (sau khi
              trừ đi phí tại cổng thanh toán, chi phí vận chuyển)
              <br />
              Cách thức yêu cầu đổi trả thẻ học: gửi email tới cskh@
              {appShortTitle}
              .vn.
            </Typography>
          </BoxSpacing>
        </BoxBorderBottom>

        <BoxBorderBottom>
          <BoxSpacing>
            <Typography variant="h2">
              ĐIỀU KHOẢN ĐỐI VỚI AFFILIATE VÀ ĐẠI LÝ
            </Typography>
          </BoxSpacing>
          <BoxSpacing>
            <Typography variant="h3">
              Điều 8. Quy định về việc phân phối khóa học với Affiliate
            </Typography>
            <Typography>
              Chính sách và cơ chế dành cho Affiliate được cập nhật tại
              đâyhttps://
              {appShortTitle}.vn/affiliate. Các chính sách hay thay đổi mới nhất
              sẽ được cập nhật tại trang này thay vì thông báo cho từng
              Affiliate.
              <br />
              Đối tác không được mạo danh {appShortTitle} để truyền thông khóa
              học gây hiểu nhầm cho học viên (không dùng {appShortTitle} trong
              tên người gửi email, trong fanpage, trong kênh Youtube…)
              <br />
              Đối tác không lấy danh nghĩa {appShortTitle} để làm việc với khách
              hàng.
              <br />
              Đối tác không được phép mua các lượt tìm kiếm về từ khóa (như
              Google Adwords), hay mua các tên miền liên quan đến{' '}
              {appShortTitle},{'\u00a0'}
              {appShortTitle}.vn. Trong trường hợp bị phát hiện, đối tác sẽ bị
              phạt doanh thu, mức phạt có thể từ 15 ngày, 30 ngày hoặc 3 tháng
              tuỳ mức độ vi phạm. Trong trường hợp vi phạm nhiều hơn 1 lần, đối
              tác sẽ bị dừng tài khoản Affiliate và Đại lý có thời hạn hoặc vô
              thời hạn.
              <br />
              Đối tác không được chạy quảng cáo nói xấu các đơn vị kinh doanh
              khác nhằm lôi kéo người dùng
              <br />
              Đối tác khi sử dụng email marketing, thông tin truyền thông đi
              phải đạt các chuẩn chung về kênh marketing này (như luôn để chữ từ
              chối nhận email, không chứa phần mềm gián điệp và không được Spam
              khách hàng).
              <br />
              Không được lôi kéo khách hàng mua khóa học bằng cách tặng tiền
              hoặc các vật phẩm có giá trị khác như thẻ cào, sản phẩm vật chất.
              <br />
              Không được lôi kéo khách hàng từ các fanpage do {
                appShortTitle
              }{' '}
              quản lý, từ website và từ landing page (các hành vi như inbox cho
              khách hàng từ các quảng cáo của {appShortTitle}, trả lời comment
              gắn link affiliate trên website và landing page của{' '}
              {appShortTitle} đều bị nghiêm cấm).
              <br />
              Chương trình affiliate không áp dụng với khách hàng Đại Lý: Mua
              lẻ, Mua sỉ bằng tiền ký quỹ.
              <br />
              Affiliate Manager cần có thu nhập Affiliate tối thiểu 1 đơn hàng /
              tháng để đủ điều kiện nhận hoa hồng từ hệ thống
              <br />
              Nếu 3 tháng liên tiếp không có thu nhập AFF, AFF Manager sẽ bị tạm
              dừng quyền hoạt động. Để tiếp tục duy trì vai trò này, manager cần
              đạt thu nhập tối thiểu 1 triệu / tháng. Danh sách AFF đã giới
              thiệu sẽ được giữ nguyên.
              <br />
              Trong 6 tháng kể từ ngày đăng ký,Affiliate không phát sinh doanh
              thu sẽ bị tạm dừng quyền hoạt động.
            </Typography>
          </BoxSpacing>

          <BoxSpacing>
            <Typography variant="h3">
              Điều 9. Quy định về việc phân phối khóa học với Đại lý
            </Typography>
            <Typography>
              Đại lý không được quyền bán / cho / tặng tài khoản tạo sẵn cho học
              viên, chỉ được bán mã kích hoạt khóa học.
              <br />
              Đại lý không được quyền bán giá cao hơn giá niêm yết trên
              {'\u00a0'}
              {appShortTitle}, hoặc thấp hơn 40% giá niêm yết trên{' '}
              {appShortTitle}, trừ khi {appShortTitle} có chiến dịch ưu đãi.
              <br />
              Đại lý cần khi tạo website bán hàng cần thông báo cho{' '}
              {appShortTitle}
              {'\u00a0'}
              biết qua email
              <br />
              Đại lý cần đăng thông tin khoá học chính xác giống như nội dung
              khoá học trên {appShortTitle}, bao gồm video bán hàng, logo trên
              video bán hàng
              <br />
              Các website của đại lý cần có dấu chứng nhận xác thực được cấp bởi
              {appShortTitle}, đặt ở chân trang website
            </Typography>
          </BoxSpacing>
        </BoxBorderBottom>

        <BoxBorderBottom>
          <BoxSpacing>
            <Typography variant="h2">ĐIỀU KHOẢN ĐỐI VỚI GIẢNG VIÊN</Typography>
          </BoxSpacing>
          <BoxSpacing>
            <Typography variant="h3">
              Điều 10. Về chương trình khuyến mại, trao tặng khóa học
            </Typography>
            <Typography>
              {appShortTitle} được chủ động thực hiện các chương trình khuyến
              mại, combo nhằm mục tiêu gia tăng doanh thu cho đối tác và{' '}
              {appShortTitle}
              {'\u00a0'}
              mà không cần báo trước cho đối tác. Đối tác gửi email thông báo
              tới teacher@{appShortTitle}.vn khi không muốn tham gia vào các
              chương trình khuyến mại này hoặc điều chỉnh mức giá trong phần Cài
              đặt khóa học.
              <br />
              {appShortTitle} được chủ động trao tặng khóa học như học bổng
              trong các chương trình, hoạt động online hay offline nhằm mục đích
              đẩy mạnh thương hiệu của đối tác và {appShortTitle}. Đối tác gửi
              email thông báo tới teacher@{appShortTitle}.vn khi không muốn trao
              tặng khóa học.
            </Typography>
          </BoxSpacing>
          <BoxSpacing>
            <Typography variant="h3">
              Điều 11. Về việc tự bán khóa học và hoàn tiền cho học viên.
            </Typography>
            <Typography>
              Giảng viên có quyền tự bán và phân phối khóa học, thu tiền từ học
              viên
              <br />
              Giảng viên có trách nhiệm hoàn tiền cho học viên trong trường hợp
              học viên yêu cầu hoàn tiền và đáp ứng đủ điều kiện trong Điều 6
              nếu Giảng viên là người bán và tự thu tiền học viên.
            </Typography>
          </BoxSpacing>
        </BoxBorderBottom>

        <BoxBorderBottom>
          <BoxSpacing>
            <Typography variant="h2">THANH TOÁN</Typography>
          </BoxSpacing>
          <BoxSpacing>
            <Typography variant="h3">
              Điều 12. Thanh toán hoa hồng, thưởng và thuế thu nhập
            </Typography>
            <Typography>
              Đối Tác của {appShortTitle} sẽ được chia sẻ doanh thu theo thỏa
              thuận của {appShortTitle}
              với Đối Tác. Có thể tham khảo thêm ở phần giới thiệu chương trình
              Affiliate và Hợp tác giảng viên .
              <br />
              Doanh thu từ chương trình đối tác sẽ được hạch toán theo tháng và
              chi trả chậm nhất vào ngày 15 của tháng kế tiếp (có trường hợp trễ
              do hệ thống ngân hàng hoặc trùng vào các ngày nghỉ). Hạn mức thanh
              toán: 500.000đ với Affiliate và 1.000.000 với Giảng viên. Nếu chưa
              đủ hạn mức thì thu nhập sẽ được tự động chuyển sang tháng tiếp
              theo. Affiliate cần hoàn tất hợp đồng điện tử (làm duy nhất một
              lần) trước khi nhận khoản hoa hồng đầu tiên.
              <br />
              ĐUA TOP AFFILIATE: Nhằm khuyến khích các đối tác hoạt động tích
              cực,
              {appShortTitle} có các cuộc đua Top Affiliate nhằm trao giải cho
              những người có kết quả tốt nhất.
              <br />
              {appShortTitle} sẽ khấu trừ thuế thu nhập cá nhân 10% đối với
              doanh thu đối tác đạt trên 2,000,000đ theo quy định của nhà nước
              (bao gồm cả thu nhập từ thưởng đua TOP).
            </Typography>
          </BoxSpacing>
        </BoxBorderBottom>
        <BoxBorderBottom>
          <BoxSpacing>
            <Typography variant="h2">
              HỦY THỎA THUẬN VÀ CẬP NHẬT ĐIỀU KHOẢN
            </Typography>
          </BoxSpacing>
          <BoxSpacing>
            <Typography variant="h3">
              Điều 13. Huỷ thoả thuận hợp tác
            </Typography>
            <Typography>
              Bất kỳ hoạt động gian lận hay các hành vi vi phạm một trong các
              điều khoản nói trên sẽ dẫn đến việc dừng thoả thuận hợp tác, hoặc
              cao hơn là khóa tài khoản và hủy mọi kết quả đạt được tại{' '}
              {appShortTitle} mà không cần thông báo trước.
            </Typography>
          </BoxSpacing>
          <BoxSpacing>
            <Typography variant="h3">
              Điều 14. Về việc cập nhật điều khoản
            </Typography>
            <Typography>
              {appShortTitle} có thể thay đổi, bổ sung hoặc sửa chữa thỏa thuận
              này bất cứ lúc nào nhằm cập nhật những chính sách mới nhất. Các
              cập nhật mới, quan trọng sẽ được thông báo và gửi email tới các
              đối tác liên quan.{'\u00a0'}
            </Typography>
          </BoxSpacing>
        </BoxBorderBottom>
        <BoxSpacing>
          Một khi bạn đã đăng ký tham gia trên {appShortTitle} (bao gồm việc
          đăng ký là Affiliate, Affiliate Manager, Giảng viên), chúng tôi sẽ
          hiểu rằng bạn đã đọc và đồng ý toàn bộ điều khoản được đưa ra trong
          bản thỏa thuận này.
          <br />
          Bản cập nhật mới nhất (nếu có) sẽ được đăng tại tại đây và{'\u00a0'}
          {appShortTitle}
          sẽ không thông báo đến từng đối tác, vì vậy bạn hãy quay lại trang này
          thường xuyên để cập nhật chính sách mới nhất.
        </BoxSpacing>
      </Container>
    </>
  );
};

export default Page;
