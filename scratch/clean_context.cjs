const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, '..', 'context.md');
let content = fs.readFileSync(contextPath, 'utf8');

const lines = content.split('\n');
let indexAdminProfile = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('AdminProfileTab.tsx') && lines[i].includes('Phân hệ quản lý hồ sơ')) {
    indexAdminProfile = i;
    break;
  }
}

console.log('indexAdminProfile:', indexAdminProfile);

if (indexAdminProfile !== -1) {
  lines[indexAdminProfile] = '           - `AdminProfileTab.tsx`: [NEW] Phân hệ quản lý hồ sơ cá nhân của Admin được thiết kế theo phong cách **Playful Geometric Memphis Design System** có độ tương phản cực kỳ cao (nền card trắng sữa tinh khiết `#FFFFFF`, viền Slate dày `3px`, bóng Memphis offset cứng `8px 8px 0px #1E293B`, Candy buttons nẩy bounce sinh động, các nét đứt dashed Slate phân tách nhẹ nhàng). Hỗ trợ song ngữ dịch thuật 100%, 10 trường thông tin chi tiết, responsive co dãn 100% và cơ chế View/Edit linh hoạt. Phân hệ được đồng bộ hóa thời gian thực trực tiếp với Sidebar footer tài khoản (`.user-profile`) ở chân Sidebar trái. Đặc biệt, tích hợp một **Bộ giả lập Vai trò Ẩn (Hidden Role Simulator - Design Lab)** ở góc trên bên phải Card qua nút absolute bánh răng `⚙️` kích hoạt dropdown chọn nhanh giữa 4 vai trò giả lập: `admin` (chỉ thấy 4 trường cơ bản), `Center Director` (thêm trường trung tâm), `doctor` & `teacher` (thấy đầy đủ 10 trường) giúp kiểm thử linh hoạt cấu trúc hiển thị động ở cả 2 chế độ Xem/Sửa. **Hệ thống tích hợp bộ dữ liệu mẫu thông tin động `MOCK_PROFILES` thực tế phù hợp theo từng vai trò giả lập có khả năng phản ứng chuyển ngữ song hành tức thời khi đổi ngôn ngữ. Khi nhấp chọn vai trò mới, hệ thống tự động cập nhật toàn bộ lưới thông tin chi tiết đồng thời đồng bộ hóa tức thời đổi ngay avatar emoji và họ tên ở chân Sidebar trái thời gian thực mà không cần bấm Lưu, đem lại cảm giác chuyên nghiệp tối đa cho toàn bộ Dashboard. Phân hệ cũng tích hợp thêm nút Candy "🔒 Đổi mật khẩu" (Change Password) mở ra một Modal Pop-Dialog Memphis tuyệt đẹp có độ phủ mờ Slate 900 blur, bóng đổ 3D offset cứng `12px 12px 0px #1E293B`, banner lỗi đỏ có hiệu ứng rung lắc (shake) khi nhập sai quy cách, inputs focus nẩy nổi viền tím Violet và nút Xác nhận vàng Amber ngọt ngào. Đặc biệt, theo yêu cầu mới nhất, chúng tôi đã di chuyển toàn bộ biểu mẫu chỉnh sửa thông tin từ inline edit (chỉnh sửa trực tiếp trên Card chính) sang dạng **Modal Pop-Dialog Chỉnh sửa Hồ sơ (Edit Profile Modal)** lơ lửng, giúp Card chính của tab phẳng phiu sạch bóng 100% Xem tĩnh (View Mode) tối giản. Modal chỉnh sửa rộng rãi bề thế `width: min(780px, calc(100% - 2rem))` có uploader emoji avatar kẹp bên cạnh ô hiển thị ảnh đại diện 80px (nay đã nâng cấp thành uploader hình ảnh thật Base64 từ thiết bị máy tính và hover overlay 📷 cực đẹp), biểu mẫu grid 2 cột (trong đó ba trường hệ thống cố định Username, System Invite Code và đặc biệt là Trung tâm trực thuộc Affiliated Center đã được loại bỏ hoàn toàn ra khỏi biểu mẫu chỉnh sửa để đảm bảo tính an toàn dữ liệu và tối giản hóa tối đa thị giác) có khả năng cô lập dữ liệu an toàn và chỉ đồng bộ Sidebar chân trái khi bấm Lưu thành công. Song song đó, tiêu đề trang ("HỒ SƠ CÁ NHÂN ADMIN / ADMIN PROFILE") và mô tả trang phụ đã được thiết kế đồng bộ hóa 100% theo vai trò giả lập đang chọn thời gian thực, đồng thời loại bỏ hoàn toàn nút/badge trạng thái "View Mode / Chế độ xem" (.profile-status-badge) ở góc phải và cập nhật tức thời vai trò dịch thuật tương ứng xuống chân Sidebar trái (.user-role). Đặc biệt, loại bỏ hoàn toàn thanh cuộn dọc (scrollbar) bằng cách đặt thuộc tính `.edit-profile-modal .modal-scrollable-body` với `max-height: none` và `overflow-y: visible` giúp toàn bộ biểu mẫu hiển thị phẳng phiu, dãn cao tự nhiên và vừa khít 100%, tạo cảm giác vô cùng chuyên nghiệp và nhất quán.**';
  
  fs.writeFileSync(contextPath, lines.join('\n'), 'utf8');
  console.log('Successfully updated AdminProfileTab context with center_name removal in context.md!');
} else {
  console.log('Could not find AdminProfileTab in context.md!');
}
