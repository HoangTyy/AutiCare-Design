const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, '..', 'context.md');
let content = fs.readFileSync(contextPath, 'utf8');

const targetText = 'cực kỳ chuyên nghiệp và trực quan.';

const replacementText = 'cực kỳ chuyên nghiệp và trực quan. **Đặc biệt, theo yêu cầu bảo mật hệ thống mới nhất, hai trường Username và System Invite Code được khóa cứng (disabled & read-only) trong Modal Chỉnh sửa hồ sơ kèm nhãn chỉ dẫn màu xám dịu, đảm bảo các trường định danh này là bất biến không thể gõ sửa. Đồng thời, hệ thống tích hợp chức năng Upload hình ảnh cá nhân từ thiết bị máy tính làm ảnh đại diện avatar (chuyển đổi thông minh sang chuỗi Base64 Data URL qua FileReader), hỗ trợ render linh hoạt cả ảnh thật dạng <img> hoặc Emoji văn bản <span>, cùng lớp phủ mờ Slate hover 📷 "Tải ảnh lên" lôi cuốn. Ảnh avatar sau khi tải lên và bấm Lưu sẽ lập tức đồng bộ thời gian thực 100% lên chân Sidebar trái của Admin Dashboard.**';

if (content.includes(targetText)) {
  content = content.replace(targetText, replacementText);
  fs.writeFileSync(contextPath, content, 'utf8');
  console.log('Successfully updated context.md with lock fields and photo upload details using Node.js.');
} else {
  console.log('Target text not found in context.md. Checking fallback...');
  const fallbackTarget = 'uploader emoji avatar kẹp bên cạnh ô hiển thị ảnh đại diện 80px';
  if (content.includes(fallbackTarget)) {
    const newText = 'uploader emoji avatar kẹp bên cạnh ô hiển thị ảnh đại diện 80px (nay đã nâng cấp thành uploader hình ảnh thật Base64 từ thiết bị máy tính và hover overlay 📷 cực đẹp)';
    content = content.replace(fallbackTarget, newText);
    
    // Add additional info about disabled fields and sidebar synchronization
    const lockText = 'biểu mẫu grid 2 cột';
    const newLockText = 'biểu mẫu grid 2 cột (trong đó hai trường Username và System Invite Code bị khóa cứng disabled/read-only không thể chỉnh sửa kèm chú thích hệ thống cố định)';
    content = content.replace(lockText, newLockText);
    
    fs.writeFileSync(contextPath, content, 'utf8');
    console.log('Successfully updated context.md with fallback mapping.');
  } else {
    console.log('Fallback targets not found in context.md.');
  }
}
