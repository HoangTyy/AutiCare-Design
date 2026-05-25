const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, '..', 'context.md');
let content = fs.readFileSync(contextPath, 'utf8');

const lines = content.split('\n');
let indexDetailView = -1;
let indexSmartDesignLab = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('CenterDetailView.tsx')) {
    indexDetailView = i;
  }
  if (lines[i].includes('Smart Design Lab') && lines[i].includes('3.')) {
    indexSmartDesignLab = i;
  }
}

console.log('indexDetailView:', indexDetailView);
console.log('indexSmartDesignLab:', indexSmartDesignLab);

if (indexDetailView !== -1 && indexSmartDesignLab !== -1) {
  const replacementLines = [
    '        - `CenterDetailView.tsx`: Sub-shell navigation ("Tổng quan", "Cấp độ bài tập", "Danh mục bài tập") for selected center details.',
    '        - `CenterLevelsTab.tsx`: Manages center-specific exercise difficulty levels (e.g., Dễ, Trung bình, Khó).',
    '        - `CenterCategoriesTab.tsx`: Manages center-specific exercise categories with high-contrast tree-line hierarchy and Cyber Blue glow highlights.',
    '        - `StaffsTab.tsx`: Manages staff roster with reactive search and CRUD.',
    '        - `AdminProfileTab.tsx`: [NEW] Phân hệ quản lý hồ sơ cá nhân của Admin được thiết kế theo phong cách **Playful Geometric Memphis Design System** có độ tương phản cực kỳ cao (nền card trắng sữa tinh khiết `#FFFFFF`, viền Slate dày `3px`, bóng Memphis offset cứng `8px 8px 0px #1E293B`, Candy buttons nẩy bounce sinh động, các nét đứt dashed Slate phân tách nhẹ nhàng). Hỗ trợ song ngữ dịch thuật 100%, 10 trường thông tin chi tiết, responsive co dãn 100% và cơ chế View/Edit linh hoạt. Phân hệ được đồng bộ hóa thời gian thực trực tiếp với Sidebar footer tài khoản (`.user-profile`) ở chân Sidebar trái. Đặc biệt, tích hợp một **Bộ giả lập Vai trò Ẩn (Hidden Role Simulator - Design Lab)** ở góc trên bên phải Card qua nút absolute bánh răng `⚙️` kích hoạt dropdown chọn nhanh giữa 4 vai trò giả lập: `admin` (chỉ thấy 4 trường cơ bản), `Center Director` (thêm trường trung tâm), `doctor` & `teacher` (thấy đầy đủ 10 trường) giúp kiểm thử linh hoạt cấu trúc hiển thị động ở cả 2 chế độ Xem/Sửa. **Hệ thống tích hợp bộ dữ liệu mẫu thông tin động `MOCK_PROFILES` thực tế phù hợp theo từng vai trò giả lập có khả năng phản ứng chuyển ngữ song hành tức thời khi đổi ngôn ngữ. Khi nhấp chọn vai trò mới, hệ thống tự động cập nhật toàn bộ lưới thông tin chi tiết đồng thời đồng bộ hóa tức thời đổi ngay avatar emoji và họ tên ở chân Sidebar trái thời gian thực mà không cần bấm Lưu, đem lại cảm giác chuyên nghiệp tối đa cho toàn bộ Dashboard. Phân hệ cũng tích hợp thêm nút Candy "🔒 Đổi mật khẩu" (Change Password) mở ra một Modal Pop-Dialog Memphis tuyệt đẹp có độ phủ mờ Slate 900 blur, bóng đổ 3D offset cứng `12px 12px 0px #1E293B`, banner lỗi đỏ có hiệu ứng rung lắc (shake) khi nhập sai quy cách, inputs focus nẩy nổi viền tím Violet và nút Xác nhận vàng Amber ngọt ngào. Đặc biệt, theo yêu cầu mới nhất, chúng tôi đã di chuyển toàn bộ biểu mẫu chỉnh sửa thông tin từ inline edit (chỉnh sửa trực tiếp trên Card chính) sang dạng **Modal Pop-Dialog Chỉnh sửa Hồ sơ (Edit Profile Modal)** lơ lửng, giúp Card chính của tab phẳng phiu sạch bóng 100% Xem tĩnh (View Mode) tối giản. Modal chỉnh sửa rộng rãi bề thế `width: min(780px, calc(100% - 2rem))` có uploader emoji avatar kẹp bên cạnh ô hiển thị ảnh đại diện 80px (nay đã nâng cấp thành uploader hình ảnh thật Base64 từ thiết bị máy tính và hover overlay 📷 cực đẹp), biểu mẫu grid 2 cột (trong đó hai trường Username và System Invite Code bị khóa cứng disabled/read-only không thể chỉnh sửa kèm chú thích hệ thống cố định) cuộn dọc an toàn với custom scrollbar màu tím và nút Hủy (Cancel) / Lưu (Save) Candy ở chân modal, có khả năng cô lập dữ liệu an toàn và chỉ đồng bộ Sidebar chân trái khi bấm Lưu thành công. Song song đó, tiêu đề trang ("HỒ SƠ CÁ NHÂN ADMIN / ADMIN PROFILE") và mô tả trang phụ đã được thiết kế đồng bộ hóa 100% theo vai trò giả lập đang chọn thời gian thực, đồng thời loại bỏ hoàn toàn nút/badge trạng thái "View Mode / Chế độ xem" (.profile-status-badge) ở góc phải và cập nhật tức thời vai trò dịch thuật tương ứng xuống chân Sidebar trái (.user-role), tạo cảm giác vô cùng chuyên nghiệp và nhất quán.**'
  ];

  // Thay thế đoạn từ indexDetailView đến trước indexSmartDesignLab bằng replacementLines
  lines.splice(indexDetailView, indexSmartDesignLab - indexDetailView, ...replacementLines);

  fs.writeFileSync(contextPath, lines.join('\n'), 'utf8');
  console.log('Successfully cleaned context.md!');
} else {
  console.log('Could not locate sections in context.md!');
}
