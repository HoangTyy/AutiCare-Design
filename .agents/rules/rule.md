---
trigger: always_on
---

BẮT BUỘC: mỗi khi bắt đầu code, phải nắm lại tổng quan ngữ cảnh thiết kế trong file "context.md" và đọc lại "Logs.md".
- Luôn cho Implementation và Walkthrough và là tiếng Việt.
1. Project này sẽ tập trung toàn lực vào Design, tên Web sẽ là AutiCare, hãy sử dụng cách thiết kế với các công nghệ hiện đại, chuyển động mượt mà.
2. Phân bố thư mục phải thật chỉnh chu, dễ kiểm soát, dễ tìm.
3. Sau khi thay đổi, chỉnh sửa, thiết kế, phải ghi nhận tất cả lại vào file "Logs.md".
4. Mỗi khi thiết kế xong, luôn ghi lại tổng quan về thiết kế cực kỳ chi tiết vào file "context.md". Mục tiêu là để các agent AI về sau luôn nắm được tổng quan về thiết kế của dự án hiện tại.
5. Do đang ở giai đoạn toàn lực thiết kế, tất cả các trang phải tương thích với chức năng Design Lab hiện có, mỗi trang có một Design Lab riêng, đang ở trang nào thì chỉ chỉnh được trang đó, sau khi có thay đổi về bố cục giao diện của trang, phải chỉnh lại Design Lab tương ứng của trang ngay.
6. Hạn chế sử dụng thiết kế trông như "AI làm", hạn chế góc bo tròn quá nhiều.
7. Mỗi trang đều phải có nút chuyển Tiếng Anh/ Tiếng Việt, và toàn bộ trang phải có hỗ trợ tiếng Anh/ Việt để nút chuyển đổi hoạt động.
8. Tất cả các trang phải có Reponsive.
9 Luôn dùng font chữ "Be Vietnam Pro" cho tất cả các trang, riêng Header thì tùy
10. 1 Trang hiển thị sẽ là một file .tsx khác nhau ( ví dụ như Dashboard, có nhiều tab, thì mỗi tab một file .tsx, không gom toàn bộ component vào một file .tsx)