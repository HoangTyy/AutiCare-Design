const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, '..', 'context.md');
let content = fs.readFileSync(contextPath, 'utf8');

const targetText = '           - `AdminProfileTab.tsx`: [NEW] Phân hệ quản lý hồ sơ cá nhân của Admin được thiết kế theo phong cách **Playful Geometric Memphis Design System** có độ tương phản cực kỳ cao (nền card trắng sữa tinh khiết `#FFFFFF`, viền Slate dày `3px`, bóng Memphis offset cứng `8px 8px 0px #1E293B`, Candy buttons nẩy bounce sinh động, các nét đứt dashed Slate phân tách nhẹ nhàng). Hỗ trợ song ngữ dịch thuật 100%, 10 trường thông tin chi tiết, responsive co dãn 100% và cơ chế View/Edit linh hoạt. Phân hệ được đồng bộ hóa thời gian thực trực tiếp với Sidebar footer tài khoản (`.user-profile`) ở chân Sidebar trái. Đặc biệt, tích hợp một **Bộ giả lập Vai trò Ẩn (Hidden Role Simulator - Design Lab)** ở góc trên bên phải Card qua nút absolute bánh răng `⚙️` kích hoạt dropdown chọn nhanh giữa 4 vai trò giả lập: `admin` (chỉ thấy 4 trường cơ bản), `Center Director` (thêm trường trung tâm), `doctor` & `teacher` (thấy đầy đủ 10 trường) giúp kiểm thử linh hoạt cấu trúc hiển thị động ở cả 2 chế độ Xem/Sửa. **Hệ thống tích hợp bộ dữ liệu mẫu thông tin động `MOCK_PROFILES` thực tế phù hợp theo từng vai trò giả lập có khả năng phản ứng chuyển ngữ song hành tức thời khi đổi ngôn ngữ. Khi nhấp chọn vai trò mới, hệ thống tự động cập nhật toàn bộ lưới thông tin chi tiết đồng thời đồng bộ hóa tức thời đổi ngay avatar emoji và họ tên ở chân Sidebar trái thời gian thực mà không cần bấm Lưu, đem lại cảm giác chuyên nghiệp tối đa cho toàn bộ Dashboard.**';

const replacementText = '           - `AdminProfileTab.tsx`: [NEW] Phân hệ quản lý hồ sơ cá nhân của Admin được thiết kế theo phong cách **Playful Geometric Memphis Design System** có độ tương phản cực kỳ cao (nền card trắng sữa tinh khiết `#FFFFFF`, viền Slate dày `3px`, bóng Memphis offset cứng `8px 8px 0px #1E293B`, Candy buttons nẩy bounce sinh động, các nét đứt dashed Slate phân tách nhẹ nhàng). Hỗ trợ song ngữ dịch thuật 100%, 10 trường thông tin chi tiết, responsive co dãn 100% và cơ chế View/Edit linh hoạt. Phân hệ được đồng bộ hóa thời gian thực trực tiếp với Sidebar footer tài khoản (`.user-profile`) ở chân Sidebar trái. Đặc biệt, tích hợp một **Bộ giả lập Vai trò Ẩn (Hidden Role Simulator - Design Lab)** ở góc trên bên phải Card qua nút absolute bánh răng `⚙️` kích hoạt dropdown chọn nhanh giữa 4 vai trò giả lập: `admin` (chỉ thấy 4 trường cơ bản), `Center Director` (thêm trường trung tâm), `doctor` & `teacher` (thấy đầy đủ 10 trường) giúp kiểm thử linh hoạt cấu trúc hiển thị động ở cả 2 chế độ Xem/Sửa. **Hệ thống tích hợp bộ dữ liệu mẫu thông tin động `MOCK_PROFILES` thực tế phù hợp theo từng vai trò giả lập có khả năng phản ứng chuyển ngữ song hành tức thời khi đổi ngôn ngữ. Khi nhấp chọn vai trò mới, hệ thống tự động cập nhật toàn bộ lưới thông tin chi tiết đồng thời đồng bộ hóa tức thời đổi ngay avatar emoji và họ tên ở chân Sidebar trái thời gian thực mà không cần bấm Lưu, đem lại cảm giác chuyên nghiệp tối đa cho toàn bộ Dashboard. Phân hệ cũng tích hợp thêm nút Candy "🔒 Đổi mật khẩu" (Change Password) mở ra một Modal Pop-Dialog Memphis tuyệt đẹp có độ phủ mờ Slate 900 blur, bóng đổ 3D offset cứng `12px 12px 0px #1E293B`, banner lỗi đỏ có hiệu ứng rung lắc (shake) khi nhập sai quy cách, inputs focus nẩy nổi viền tím Violet và nút Xác nhận vàng Amber ngọt ngào.**';

if (content.includes(targetText)) {
  content = content.replace(targetText, replacementText);
  fs.writeFileSync(contextPath, content, 'utf8');
  console.log('Successfully updated context.md using Node.js script.');
} else {
  console.log('Target text not found in context.md. Checking if already updated...');
  if (content.includes('Change Password')) {
    console.log('Already updated!');
  } else {
    // If exact target text not matched due to formatting/invisible chars, let us do a fallback substring replace
    const subTarget = 'Phân hệ quản lý hồ sơ cá nhân của Admin';
    if (content.includes(subTarget)) {
      console.log('Substring match found, executing replacement.');
      // Locate the line and replace it
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('AdminProfileTab.tsx') && lines[i].includes('Phân hệ quản lý hồ sơ')) {
          lines[i] = replacementText;
          break;
        }
      }
      fs.writeFileSync(contextPath, lines.join('\n'), 'utf8');
      console.log('Successfully updated context.md via fallback lines mapping.');
    } else {
      console.log('Fallback substring not found either!');
    }
  }
}
