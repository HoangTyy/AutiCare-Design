# Project Logs

## [2026-05-25] - Phát triển Phân hệ Hồ sơ Cá nhân Admin & Đồng bộ hóa chân Sidebar
- **Implementation**:
  * **Tạo mới component `AdminProfileTab.tsx`**: Xây dựng thành công tệp component độc lập hiển thị chi tiết hồ sơ cá nhân của Admin bao gồm 10 trường theo yêu cầu, hỗ trợ song hành 2 chế độ View/Edit mượt mà, bộ chọn avatar emoji trực quan và Candy buttons nẩy bounce sinh động.
  * **Tích hợp router tab `adminProfile` trong `AdminDashboard.tsx`**: Đăng ký tab mới, tạo state lưu trữ `adminInfo` ở cấp Dashboard để liên kết đồng bộ thông tin thời gian thực.
  * **Tương tác Sidebar Footer**: Thay thế khối hiển thị `.user-profile` tĩnh ở chân Sidebar thành một nút bấm tương tác (`cursor: pointer`), nhấp chọn sẽ tự động chuyển hướng sang tab xem/sửa hồ sơ Admin. Thay đổi họ tên/avatar trong Profile sẽ lập tức cập nhật đồng bộ lên Sidebar footer tức thì.
  * **Bổ sung CSS tối cao cấp `AdminDashboard.css`**: Ban đầu thiết kế theo theme tối Midnight Indigo, sau đó nâng cấp toàn diện sang **Playful Geometric Memphis Design System** có độ tương phản cực kỳ cao (nền card trắng sữa tinh khiết `#FFFFFF`, viền Slate dày `3px`, bóng đổ Memphis cứng `8px 8px 0px #1E293B`, nút Candy pill-shape sặc sỡ và dải nét đứt dashed Slate). Điều này giúp tiêu đề chính "ADMIN PROFILE", tiêu đề phụ và toàn bộ nội dung hiển thị sắc nét 100%, chấm dứt hoàn toàn hiện tượng "tịt màu" (chìm chữ) trên nền sáng off-white `#F8FAFC` của Dashboard Workspace.
- **Walkthrough**:
  * Người dùng nhấp chọn thông tin tài khoản AD ở chân Sidebar sẽ chuyển mượt mà sang trang xem Hồ sơ Cá nhân Admin.
  * Giao diện hỗ trợ song ngữ Việt-Anh dịch thuật 100% tất cả nhãn dán, placeholder, bio mô tả và responsive co dãn mượt mà trên di động.
  * Việc chỉnh sửa thông tin, chọn emoji avatar mới và lưu lại sẽ lập tức đồng bộ thời gian thực 100% lên Sidebar footer bên dưới và hiện Toast lơ lửng cực đẹp.
- **Build Verification**:
  * Các tệp tin được chỉnh sửa và thêm mới hoàn toàn sạch lỗi compile TypeScript (mặc dù dự án chung bị chặn build bởi tệp sự kiện `EventsTab.tsx` của remote cũ).

## [2026-05-24] - Cải tiến Giao diện Hệ thống Trung tâm trên Homepage
- **Implementation**:
  - **Xóa hiển thị Mã trung tâm (Center ID)** khỏi tệp [CentersSection.tsx](file:///e:/Đồ án tốt nghiệp/AutiCare-Design/src/components/homepage/CentersSection.tsx) (bản xem trước ở trang chủ) và tệp [AllCentersPage.tsx](file:///e:/Đồ án tốt nghiệp/AutiCare-Design/src/components/homepage/AllCentersPage.tsx) (trang danh sách đầy đủ tất cả trung tâm).
  - **Tối ưu hóa UI/UX**: Loại bỏ hoàn toàn nhãn hiển thị `<span className="center-card-id">{center.id}</span>` ở phần footer của các thẻ trung tâm dạng sticker. Điều này giúp giao diện trở nên sạch sẽ, thông thoáng hơn, đồng thời bảo mật tốt hơn các mã định danh nội bộ của hệ thống.
  - **Bảo toàn phong cách thiết kế**: Giữ nguyên cấu trúc lưới Playful Geometric, nền kem ấm `#FFF8F0` / `#FFFDF5`, viền Slate `#1E293B`, hiệu ứng hover nảy bounce nhẹ nhàng và hiển thị tỉnh thành đầy đủ.
- **Walkthrough**:
  - Các card trung tâm hiển thị trên trang chủ và trang phụ All Centers Page giờ chỉ hiển thị Tỉnh/Thành phố ở phần chân thẻ (footer) một cách tinh gọn và cân đối, không còn dòng mã ID kỹ thuật thô kệch.

## [2026-05-24] - Tinh chỉnh dọn dẹp tab Hồ sơ Can thiệp Chuyên gia & Bàn giao Hoàn chỉnh Phân hệ Thống kê
- **Dọn dẹp triệt để trùng lặp trong `StaffInterventionTab.tsx`**:
  * *Vấn đề*: Do tab Phân tích Thống kê (`stats` - `StaffStatsTab.tsx`) mới đã được thiết kế chuyên biệt để hiển thị bento grid, 3D Mastery Progress chart, và SVG skill categories wave, nên khối `.staff-intervention-analytics-board` ở đầu tab Hồ sơ can thiệp trở nên dư thừa và gây loãng thông tin.
  * *Giải pháp*: Loại bỏ hoàn toàn khối bento indicators và 3D chart trong `StaffInterventionTab.tsx`, trả lại giao diện thông thoáng tập trung 100% vào danh sách hồ sơ can thiệp lâm sàng của trẻ, thanh công cụ tìm kiếm và lọc trạng thái.
- **Xác thực và Biên dịch**:
  * Chạy biên dịch sản phẩm bằng `cmd.exe /c npm run build` thành công rực rỡ 100% không cảnh báo hay lỗi chỉ trong **298ms**, xuất bản bundle production sạch sẽ.

## [2026-05-24] - Thiết kế 3 Phân hệ Thống kê Trực quan (Statistics Portal) & Khắc phục Lỗi Cú pháp Center Profile
- **Thiết kế Thống kê cá nhân hóa cho Chuyên gia trong `StaffInterventionTab.tsx`**:
  * **Lưới chỉ số Bento (Bento Indicator Board)**: Bổ sung 4 sticker card trắng sữa Memphis ở đầu trang trị liệu, tính toán động các chỉ số: Tổng hồ sơ, Đang trị liệu, Đã tốt nghiệp và Mastery rate trung bình.
  * **Biểu đồ cột 3D Mastery Progress**: Xây dựng biểu đồ 3D bar chart Memphis bằng HTML & CSS transform (rotate/skewY) tuyệt đẹp, đo lường tiến trình hoàn thành mục tiêu của từng bé. Cột có màu sắc đặc trưng của cấp độ ASD (Mức 1 = Xanh lá, Mức 2 = Vàng cam, Mức 3 = Hồng đỏ) và hiệu ứng hover đàn hồi mượt mà.
  * **Song ngữ & Responsive**: Tích hợp từ điển dịch thuật Việt - Anh (i18n) hoàn chỉnh cho tất cả nhãn chỉ số và responsive co giãn linh hoạt trên di động (chuyển grid bento sang 1 cột, co nhỏ 3D bars).
- **Khắc phục lỗi cú pháp & biên dịch trong `CenterDetailView.tsx`**:
  * *Phát hiện lỗi*: Một cặp thẻ đóng `</div>` và `)}` dư thừa ở dòng 804-805 làm lệch toàn bộ cấu trúc đóng ngoặc của component, gây lỗi cú pháp nghiêm trọng `TS1128` (Declaration or statement expected).
  * *Cách khắc phục*: Loại bỏ triệt để 2 dòng dư thừa này, khôi phục cấu trúc tab `overview` chuẩn chỉnh.
  * *Xử lý lỗi TS6133*: Loại bỏ biến `color` khai báo nhưng không sử dụng ở dòng 1065 của danh sách hiệu suất nhân sự, giúp khôi phục bản build sản phẩm siêu sạch.
- **Bổ sung CSS Memphis cao cấp trong `App.css`**:
  * Viết hơn 200 dòng CSS Memphis định kiểu cho `.staff-stats-bento-grid`, `.bento-stat-sticker` có viền Slate `3px` và bóng đổ cứng `5px`, `.staff-mastery-chart-card` bóng đổ 3D `6px`, các mặt 3D columns `.bar-face-front/depth` và hiệu ứng hover elastic.
- **Biên dịch sản phẩm thành công 100%**: Chạy lệnh `cmd.exe /c npm run build` biên dịch sạch sẽ không còn bất kỳ cảnh báo hay lỗi TypeScript nào trong **291ms**!

## [2026-05-24] - Tinh chỉnh Bố cục Card Lịch hẹn Chuyên gia & Khắc phục Triệt để Lỗi CSS Modal Vé Hẹn
- **Tinh chỉnh Card Lịch hẹn Chuyên gia ngoài danh sách (Sticker Card Layout Polish)**:
  - *Vấn đề*: Nhãn (label) và giá trị (value) của các trường chi tiết ngoài card danh sách Chuyên gia bị dính liền thô kệch vào nhau, không có khoảng trống ngăn cách và chen chúc sát lề trái, gây khó nhìn.
  - *Giải pháp*:
    * Nâng cấp bộ chọn có độ cụ thể cao (High Specificity selector) `.appointment-sticker-grid .staff-apt-card .appointment-card-details` trong `src/App.css`, thiết lập `gap: 0.8rem` dãn cách dòng cực kỳ thoáng đãng.
    * Định dạng `.detail-row` sử dụng Flexbox ngang (`flex-direction: row`), đẩy hai đầu cân đối hoàn mỹ (`justify-content: space-between !important;`) giúp nhãn nằm sát lề trái, giá trị nằm sát lề phải, tạo khoảng trắng đối xứng chuẩn AutiCare Memphis.
    * Quy định font chữ `Be Vietnam Pro` in đậm cực mịn (`font-weight: 800`), phối hợp màu sắc tương phản cao (Nhãn màu xám Slate đậm `#475569`, Giá trị màu đen Slate `#1E293B`) giúp phụ huynh và chuyên gia dễ dàng đọc quét thông tin tức thời.
- **Khắc phục triệt để lỗi CSS trong suốt & Dính chữ của Modal Vé hẹn Chuyên gia (Clinical Ticket Modal Fix)**:
  - *Phát hiện nguyên nhân*: Modal vé Chuyên gia trước đây sử dụng các class thô sơ cục bộ (`.horizontal-ticket-shell`, `.ticket-details-bento-grid`, `.bento-info-item`) chưa được định nghĩa đầy đủ hoặc thiếu màu nền, khiến toàn bộ chiếc vé bị trong suốt hoàn toàn, lộ các card mờ phía sau. Đồng thời, text chi tiết hiển thị dạng inline dính tịt thô kệch.
  - *Cách khắc phục*:
    * **Tái cấu trúc JSX**: Đồng bộ hóa 100% các class trong `StaffAppointmentsTab.tsx` sang hệ thống class Memphis chuẩn của Phụ huynh để thừa hưởng trực tiếp CSS chất lượng cao. Đổi modal shell thành `.profile-admin-modal.appointment-detail-modal-shell.appointment-ticket-card`.
    * **Khắc phục lỗi trong suốt**: Nhận diện thành công màu nền giấy kem ấm áp `#FFFDF5`, viền đen Slate dày dặn `3px solid #1E293B` và bóng đổ cứng 3D Memphis `12px 12px 0px #1E293B` từ `.profile-admin-modal`, loại bỏ hoàn toàn tình trạng trong suốt.
    * **Bento Grid & Info Sticker**: Đổi Bento grid sang `.ticket-details-grid` hiển thị 2 cột cân đối. Các trường chi tiết bọc trong sticker trắng sữa `.appointment-modal-info-item` có viền Slate `2px` và bóng đổ Memphis cứng `2px 2px 0px #1E293B` cực kỳ bắt mắt, có hiệu ứng hover nẩy đàn hồi.
    * **Đục khuyết tròn lẹm sườn chân thực**: Sử dụng absolute position và background đồng bộ với overlay cho `.ticket-punch-left` và `.ticket-punch-right` đục lẹm 2 bên sườn vé chân thực 100%, căn chỉnh chuẩn xác theo đường dashed tear line ngăn cách.
    * **Notes Box & Barcode & Footer**: Đồng bộ hóa hộp ghi chú chuẩn bị lâm sàng viền Slate kẹp tiêu đề vàng ấm nhạt, vẽ cụm barcode CSS giả lập sắc nét ở góc chân vé. Chuyển đổi footer actions sang `.ticket-actions-footer` flexbox thông thoáng và Candy Button "Đóng cửa sổ" `.ticket-close-candy` pill-shape nẩy bounce sinh động.
  - *Xác thực*: Chạy lệnh build kiểm tra `cmd.exe /c npm run build` biên dịch sạch sẽ không cảnh báo/lỗi chỉ trong **306ms**.

## [2026-05-24] - Tái Thiết kế Vé hẹn ngang & Tích hợp Tính năng Dời lịch hẹn (BookedAppointmentsTab.tsx) cho trang cá nhân Phụ huynh
- **Khắc phục lỗi vỡ giao diện danh sách lịch hẹn ngoài (Viewlist Memphis Card Fix)**:
  - *Phát hiện nguyên nhân*: Trong quá trình tích hợp layout ngang cho Vé hẹn chi tiết, một số class của Card lịch hẹn ngoài bị thay đổi ngoài ý muốn (chuyển sang `.appointment-card-memphis` và `.appointments-grid-container` chưa được định nghĩa trong CSS), đồng thời thiếu 2 thuộc tính chi tiết quan trọng (Hình thức hẹn và Địa điểm khám) khiến card bị mất khung viền, mất nền trắng sữa, chữ viết dính lề lệch lạc trên màn hình chính của Phụ huynh.
  - *Cách khắc phục*:
    * Khôi phục 100% cấu trúc container danh sách về lớp CSS `.appointment-sticker-grid` và cấu trúc card lịch hẹn về `.profile-sticker-card.appointment-card.click-allowed` nguyên bản Memphis của AutiCare.
    * Khôi phục hiển thị mã ID cuộc hẹn về `.appointment-card-code`.
    * Tái cấu trúc lưới chi tiết `.appointment-card-details` chứa đầy đủ 5 thuộc tính: Loại lịch hẹn (Type), Hình thức hẹn (Method), Ngày hẹn (Date), Khung giờ (Time), Địa điểm khám (Location) xếp hàng ngang dọc cân đối.
    * Tích hợp lại Candy Button "Tham gia cuộc họp 🚀" (Google Meet) phản ứng nhanh cho lịch hẹn Online Đã xác nhận.
    * Mang lại giao diện danh sách lịch hẹn ngoài sặc sỡ, nhấc nổi 3D nghiêng nhẹ nghệ thuật (`transform: rotate(0.35deg / -0.35deg)`), bo góc `20px` với viền Slate `3px` và đổ bóng cứng `6px` hoàn hảo, sửa triệt để 100% lỗi vỡ giao diện.
- **Tái cấu trúc bố cục Vé hẹn khám lâm sàng (Clinical Ticket) dạng ngang song song**:
  - **Giãn rộng chiều ngang**: Nâng kích thước tối đa của Modal Vé hẹn từ 600px lên **780px** (`width: min(780px, calc(100% - 2rem)) !important;`) giúp chiếc vé cân đối và bề thế.
  - **Bố cục song song (Desktop Side-by-Side)**: Thiết lập lớp bọc `.ticket-horizontal-content-layout` dạng Grid 2 cột (`1.25fr 1fr`), đưa lưới thông tin bento (Details Grid) sang cột trái và Hộp chỉ dẫn chuẩn bị lâm sàng (Preparation Notes) sang cột phải. Giúp chiều cao của tấm vé thu gọn đến 40% theo chiều dọc, tối ưu hóa không gian hiển thị và không còn bất kỳ thanh cuộn (scrollbar) dọc nào.
  - **Tái thiết kế Details Bento Grid 2 cột**: Thay đổi grid từ 3 cột thành 2 cột (`repeat(2, 1fr)`). Sắp xếp lại thứ tự thông tin khoa học: Loại khám (Type) & Hình thức (Method) ở hàng 1; Ngày (Date) & Giờ (Time) ở hàng 2; Trẻ khám (Patient Child - span 2) ở hàng 3; Địa điểm (Location - span 2) ở hàng 4.
  - **Đóng khung hộp "Chỉ dẫn chuẩn bị lâm sàng" (.ticket-notes-box) Memphis 3D**:
    * Nâng cấp hộp ghi chú thành sticker khung cứng Memphis siêu cao cấp: Viền đen Slate dày dặn `3px solid #1E293B`, bo góc rộng `20px`, bóng đổ cứng 3D nổi bật `6px 6px 0px #1E293B`.
    * Tiêu đề `.appointment-modal-notes-title`: Sử dụng dải nền màu vàng ấm nhạt `#FEF08A` rực rỡ, chữ Slate in đậm viết hoa kèm icon sticker kẹp giấy `📋` độc quyền.
    * Tách nội dung văn bản thô thành các gạch đầu dòng danh sách `.notes-list-item` có emoji sinh động (📂 và ⏰) và chia thông tin rõ ràng: Hồ sơ cần mang và Thời gian tập trung, giúp phụ huynh tiếp nhận thông tin trực quan 100%.
- **Tích hợp Tính năng Dời lịch hẹn (Reschedule Appointments Flow)**:
  - **Nút "Dời lịch hẹn 🗓️" lấp lánh**: Bổ sung Candy Button `.ticket-reschedule-candy` màu vàng pastel nổi bật vào Footer của Modal Ticket, có viền Slate dày và hover bounce đàn hồi.
  - **Điều kiện kích hoạt**: Nút chỉ xuất hiện đối với lịch hẹn có trạng thái Đã xác nhận (`confirmed` - "đã duyệt") hoặc Đang chờ duyệt (`pending`). Tự động ẩn hoàn toàn đối với lịch hẹn Đã hoàn thành (`completed`).
  - **Xây dựng Modal phụ Dời lịch (Reschedule Modal)**:
    * Thiết kế modal `.reschedule-modal-shell` với bóng đổ Memphis 3D `12px 12px 0px #1E293B`, nền giấy kem ấm `#FFFDF5`, bo góc `28px` cực kỳ đồng bộ.
    * **Vùng lịch hẹn gốc (.reschedule-current-box)**: Hiển thị ngày và giờ cũ trong hộp sticker viền dashed Slate nét đứt mộc mạc.
    * **Lưới chọn Ngày mới**: Sinh tự động danh sách 4 ngày tiếp theo từ ngày mai. Các nút pill-shape `.reschedule-date-card` phản ứng đổi màu tím pastel và lún xuống khi click chọn.
    * **Lưới chọn Khung giờ mới**: Danh sách 5 khung giờ 2 tiếng tiêu chuẩn với các nút `.reschedule-time-slot-card` đổi màu hồng pastel khi được chọn.
  - **Validation Bắt buộc (Ngày/Giờ phải khác hiện tại)**:
    * Thiết lập banner cảnh báo lỗi đỏ tươi `.reschedule-error-banner` có animation rung lắc (shake) và tự động vô hiệu hóa (disable) nút Xác nhận nếu phụ huynh chọn trùng ngày và giờ cũ.
  - **Đồng bộ hóa dữ liệu thời gian thực (Reactive State Updates)**:
    * Lift-up mảng `MOCK_APPOINTMENTS` tĩnh thành reactive state `appointments` của React.
    * Sau khi dời lịch hợp lệ, cập nhật ngay ngày/giờ mới, tự động chuyển đổi trạng thái cuộc hẹn về **Đang chờ duyệt (`pending`)** để phòng khám thẩm định lại. Cập nhật đồng bộ tức thời ra màn hình Dashboard chính và Modal Ticket chi tiết.
- **Tối ưu Responsive & Song ngữ hoàn hảo**:
  - Giao diện co giãn hoàn mỹ: Dưới 768px (Tablet), layout ngang tự động chuyển dọc mượt mà, lưới chọn giờ dãn rộng, ẩn lẹm khuyết tròn 2 bên lề vé. Dưới 640px (Mobile), Bento Grid co gọn về 1 cột dọc an toàn 100% không vỡ khung.
  - Hỗ trợ dịch thuật song ngữ Anh - Việt đầy đủ cho mọi nhãn dán, placeholder, thông báo lỗi và thông tin dời lịch hẹn.
- **Biên dịch sản phẩm thành công 100%**: Chạy lệnh `cmd.exe /c npm run build` biên dịch sạch sẽ không còn bất kỳ cảnh báo hay lỗi TypeScript nào trong **264ms**.

## [2026-05-24] - Nâng cấp Vé hẹn khám Lâm sàng dạng ngang và Sticker ghi chú cho Phụ huynh
- **Khắc phục lỗi CSS hiển thị lưới chi tiết vé hẹn (Details Grid Layout & Info Items Fix)**:
  - Sửa đổi tệp `src/App.css` khôi phục cấu trúc lưới bento và các ô thông tin mini sticker card Memphis tương phản cao sắc nét.
- **Tích hợp Tấm vé hẹn khám Lâm sàng Độc quyền (Clinical Ticket Design)**:
  - Tái thiết kế Modal Popup chi tiết to hơn, rộng rãi hơn (`width: min(780px, calc(100% - 2rem))`) và đảm bảo **hiển thị trọn vẹn 100% nội dung không có bất kỳ thanh cuộn dọc (scrollbar) nào** bằng cách sử dụng chiều cao tự động co giãn (`height: auto; max-height: none; overflow-y: visible`).
  - Giao diện được thiết kế mô phỏng chân thực **Tấm vé (Clinical Ticket) sau khi book lịch thành công**:
    * **Lỗ khuyết vé (Ticket Punch Cutouts)**: Đục khuyết hai hình tròn lẹm vào hai bên thân vé (`.ticket-punch-left/right`) trùng với màu overlay tối của modal để tạo cảm giác chiếc vé xem phim/vé tàu thực tế bị bấm góc.
    * **Đường xé vé (Dashed Tear Line)**: Thiết kế đường dashed line đứt nét Slate dày dặn nằm ngang ngăn cách giữa Cuống vé (Doctor Stub) và Bento Grid chi tiết.
    * **Cuống vé (Ticket Stub)**: Nơi chứa thông tin bác sĩ phụ trách dạng Sticker Card màu trắng sữa tương phản cao và mã ID vé.
    * **Mã Barcode Giả Lập (Barcode Section)**: Vẽ một cụm barcode CSS chân thực ở chân vé với các vạch Slate dọc dày mỏng ngẫu nhiên (`.barcode-line-element.thin/medium/thick`) cùng mã số in đậm bên dưới tạo cảm giác tấm vé đã được xuất bản và xác thực hệ thống.
  - Tích hợp một hộp sticker note chỉ dẫn chuẩn bị lâm sàng (`.ticket-notes-box`) màu kem ngọt ngào có viền nét đứt dashed màu hồng pink nổi bật, hướng dẫn phụ huynh các giấy tờ học bạ lâm sàng cần chuẩn bị.
  - Hỗ trợ Candy Buttons Memphis chân thực: nút Đóng cửa sổ và nút Tham gia cuộc họp 🚀 (đối với cuộc họp Online đã xác nhận được tô màu xanh Mint `#34D399` cực kỳ bắt mắt).
  - Tương thích tốt với Design Lab và hiển thị mượt mà trên di động (được responsive chuyển thành grid 1 cột, ẩn vết đục khuyết để tránh tràn viền di động).
- **Sửa đổi Dữ liệu mẫu (MOCK_APPOINTMENTS)**:
  - Tinh chỉnh khung giờ của cả 3 cuộc hẹn mẫu có khoảng cách đúng **2 tiếng** (09:00 - 11:00, 14:00 - 16:00, 08:30 - 10:30).
  - Bổ sung trường `meetingType` hỗ trợ 2 hình thức: `'online'` (Trực tuyến qua Google Meet) hoặc `'offline'` (Trực tiếp tại phòng khám cơ sở).
- **Thiết kế Bộ lọc Trạng thái (Filter by Status)**:
  - Tích hợp thanh bộ lọc trạng thái `.appointments-filter-bar` và bộ nút `.appointment-filter-btn` dạng pill-shaped buttons Memphis đẹp mắt ở đầu trang (Tất cả trạng thái, Đã xác nhận, Chờ duyệt, Đã hoàn thành).
  - Định kiểu Candy Button pill-shape với viền Slate dày `2.5px`, bóng đổ lệch góc `3px`, hover nảy đàn hồi và active đổi màu nền sang tím Violet rực rỡ và lún xuống.
  - Tích hợp responsive co giãn linh hoạt và tự động chuyển sang cuộn ngang (horizontal scroll) mượt mà trên các thiết bị di động (< 900px) bằng cách ẩn thanh cuộn và giữ flex-nowrap.
  - Hỗ trợ lọc danh sách cuộc hẹn động thời gian thực và xây dựng vùng hiển thị trống `.appointment-empty-state` tinh tế với nét đứt Slate dày dặn và icon kính lúp 🔍 động khi không tìm thấy kết quả phù hợp.
- **Hiển thị địa điểm linh hoạt & Hành động nhanh**:
  - **Online**: Hiển thị địa chỉ là `Google Meet (Phòng trực tuyến)` với đường nét in đậm tím violet. Đối với các lịch hẹn Online Đã xác nhận (`confirmed`), tích hợp thêm một Candy Button `.appointment-meet-btn` nổi bật giúp phụ huynh click trực tiếp "Tham gia cuộc họp 🚀" ngay trên thẻ.
  - **Offline**: Hiển thị địa chỉ phòng khám lâm sàng như hiện tại: `{t.room} {apt.room} (Cơ sở AutiCare)`.
  - Hiển thị badge loại hình thức gặp mặt `.appointment-meeting-type-badge` (online/offline) nền pastel Memphis sinh động.
- **Hỗ trợ Song ngữ & Biên dịch hoàn chỉnh**:
  - Tích hợp dịch thuật song ngữ Việt - Anh (i18n) hoàn hảo cho tất cả các nhãn mới (Hình thức hẹn, Trực tuyến, Trực tiếp, Tham gia cuộc họp, Tất cả trạng thái...).
  - Biên dịch sản phẩm thành công 100% bằng lệnh `cmd.exe /c npm run build` sạch sẽ trong **408ms**, không có lỗi TypeScript hay cú pháp CSS nào.

## [2026-05-23] - Tinh chỉnh Chiều Rộng Cố Định Cho Nút Back To Home Chống Giật Header Song Ngữ
- **Khắc phục hoàn toàn lỗi co giãn nút Back to Home (`.profile-back-btn`)**:
  - Chuyển cấu hình `min-width: 190px !important;` thành chiều rộng cố định tuyệt đối `width: 220px !important;` cho cả màn hình máy tính và thiết bị di động.
  - Tích hợp `white-space: nowrap !important;` để ngăn chặn hoàn toàn việc ngắt dòng văn bản chữ tiếng Việt in hoa `"QUAY LẠI TRANG CHỦ"`.
  - Khắc phục triệt để lỗi khi đổi sang tiếng Việt, text `"QUAY LẠI TRANG CHỦ"` (dài ~205px) vượt quá `min-width: 190px`, tự động làm phình nút và đẩy lệch toàn bộ cấu trúc Grid đối xứng của Header. Với kích thước cố định `220px`, nút Back to Home luôn đứng im 100% không bao giờ thay đổi kích thước, mang lại sự ổn định tuyệt đối cho toàn bộ cụm điều hướng và ngôn ngữ (VN/EN) trên Header.

## [2026-05-23] - Chuyển đổi "Hệ Thống Trung Tâm" từ Popup Modal sang Trang độc lập (All Centers Page) & Sửa lỗi TypeScript
- **Khắc phục lỗi giật màn hình Header khi chuyển đổi ngôn ngữ (VN/EN Header Stability)**:
  - Phát hiện lỗi giật màn hình (Layout Shift) khi bấm nút VN/EN đổi ngôn ngữ làm chữ nút Back to Home co giãn đột ngột, đẩy toàn bộ tiêu đề ở giữa và các nút bên cạnh lệch vị trí.
  - Cấu hình lại `.profile-header-container` sử dụng **bố cục Grid đối xứng 3 cột (`grid-template-columns: 1.2fr auto 1.2fr !important;`)** độc lập. Giúp định vị logo bên trái, tiêu đề chính giữa, và cụm nút bên phải một cách đối xứng tuyệt đối. Tiêu đề ở giữa luôn đứng im cân đối ở tâm màn hình không bao giờ bị đẩy lệch lề.
  - Cố định chiều rộng tối thiểu cho nút Back to Home `.profile-back-btn` (`min-width: 190px !important;`) và căn giữa chữ để text thay đổi từ "Quay lại trang chủ" (VI) sang "Back to Home" (EN) mượt mà, không làm thay đổi chiều rộng của nút.
- **Đột phá thiết kế: Khắc phục lỗi nhạt màu card (High Contrast & Playful Memphis Card Style)**:
  - Khắc phục triệt để lỗi thẻ `.center-card` bị tịt màu/chìm lỉm trên nền kem ấm `#FFFDF5` của trang do màu nền `--neo-paper` trùng với màu nền và bóng đổ `--neo-shadow-md` bị nhạt màu xám mờ `#E2E8F0`.
  - Override màu nền của các card trung tâm thành màu trắng tinh khiết `#FFFFFF !important` tạo độ tương phản 100%.
  - Tích hợp viền Slate dày dặn `3px solid #1E293B !important` và bóng đổ cứng Slate đậm `6px 6px 0px #1E293B !important` tạo hiệu ứng 3D nhấc nổi sắc nét.
  - Bổ sung hiệu ứng hover đàn hồi mượt mà (`transform: translate(-4px, -6px) rotate(-0.5deg) !important` và tăng bóng đổ lên `10px 10px 0px #1E293B !important`).
  - Thiết kế lại các icon `.center-card-icon` phía trên dạng sticker tròn viền đen Slate với nền pastel luân phiên (Violet, Pink, Yellow) nổi bật.
  - Phẳng hóa và bổ sung viền đen Slate cho các nhãn tỉnh thành `.center-card-province` với nền màu vàng ấm `#FBBF24` rực rỡ, cùng mã ID `.center-card-id` viền Slate gọn gàng.
  - Giúp các card trung tâm có vẻ ngoài vô cùng cao cấp, bắt mắt, "Wow" ngay từ cái nhìn đầu tiên và ăn khớp hoàn chỉnh với tinh thần Memphis Playful Geometric.
- **Đồng bộ hóa dữ liệu thời gian thực cho mạng lưới trung tâm**:
  - Phát hiện lỗi mất các card trung tâm mới tạo do lưu trữ state cục bộ rời rạc trong `AdminDashboard`.
  - Di chuyển (Lift-up) thành công toàn bộ state `centers` (bao gồm mảng dữ liệu mặc định 9 trung tâm can thiệp sớm trên 7 tỉnh thành) từ cục bộ `AdminDashboard.tsx` lên component cha cao nhất `App.tsx`.
  - Cấu hình truyền props `centers` (và `setCenters` cho Admin) xuống cho `<AdminDashboard>`, `<CentersSection>` và `<AllCentersPage>`.
  - Loại bỏ hoàn toàn các biến dữ liệu tĩnh `allCentersData` khai báo cứng cục bộ tại `CentersSection.tsx` và `AllCentersPage.tsx` để đọc dữ liệu hoàn toàn động từ props.
  - Cập nhật interface `Center` và `CenterInfo` hỗ trợ đầy đủ các thuộc tính tùy chọn (`province`, `address`, `phone_number`, `email`) cùng cơ chế fallback rendering an toàn.
  - Giúp đồng bộ hóa tuyệt đối dữ liệu trung tâm trên toàn bộ ứng dụng SPA. Khi quản trị viên tạo trung tâm mới hoặc xóa trung tâm trong Admin Dashboard, các thay đổi sẽ lập tức hiển thị đồng bộ ngoài Homepage và All Centers Page thời gian thực, sửa triệt để lỗi mất card trung tâm mới tạo.
- **Tạo mới component Trang danh sách trung tâm**: `src/components/homepage/AllCentersPage.tsx`
  - Thiết kế trang độc lập đầy đủ (Full Page View) với cấu trúc header cố định có logo, tiêu đề trang và bộ dịch ngôn ngữ.
  - Tích hợp dữ liệu giả lập 9 trung tâm can thiệp sớm trên 7 tỉnh thành.
  - Xây dựng thanh Toolbar tìm kiếm (Search) theo từ khóa và bộ lọc Tỉnh thành (Region Filter) theo phong cách Playful Geometric cao cấp.
  - Grid hiển thị 3 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile. Các card sticker kế thừa thiết kế Neo-brutalism đồng bộ.
- **Tái cấu trúc component Homepage (`src/components/homepage/CentersSection.tsx`)**:
  - Loại bỏ hoàn toàn code hiển thị modal cục bộ cồng kềnh.
  - Chuyển giao sự kiện bấm nút "Xem thêm trung tâm +6 trung tâm khác" thông qua callback prop `onViewMoreCenters` lên component cha.
- **Đồng bộ hóa Route/State tại component chính (`src/App.tsx`)**:
  - Đăng ký view mới `'centers'` vào tập hợp quản lý View của SPA.
  - Tích hợp rẽ nhánh render trang `AllCentersPage` song ngữ hoàn chỉnh.
  - Kết nối prop `onViewMoreCenters` từ `CentersSection` để chuyển hướng view mượt mà.
- **Bổ sung CSS mới (`src/App.css`)**:
  - Thêm hơn 150 dòng CSS định kiểu Playful Geometric cho `AllCentersPage` (hero zone, toolbar board, grid layout, responsive breakpoints 1024px và 768px).
- **Khắc phục triệt để 4 lỗi compile TypeScript trong `PlanDetailView.tsx`**:
  - Khai báo kiểu dữ liệu tường minh `objectiveId: number` cho tham số của hàm `toggleExpandRow`.
  - Khai báo kiểu `useState<number | null>(null)` cho biến state `expandedObjId` để tránh lỗi suy luận kiểu dữ liệu.
  - Ép kiểu tường minh `status: objDesc as 'Completed' | 'In process'` khi lưu thông tin mục tiêu (Objective) để tương thích với kiểu dữ liệu của Schema.
  - Thay đổi thuộc tính lỗi `italic: 'true'` thành `fontStyle: 'italic'` hợp lệ trong React style object cho thẻ `<p>` thông báo không tìm thấy activity.

## [2026-05-23] - Nâng cấp Centers Section: Xem thêm Trung tâm + Tìm kiếm + Lọc Tỉnh thành
- **Mở rộng dữ liệu**: Từ 2 center lên **9 center** mock data trải dài 7 tỉnh thành (TP.HCM, Hà Nội, Đà Nẵng, Hải Phòng, Cần Thơ, Khánh Hòa, Bình Dương). Mỗi center có thêm trường `province`.
- **Preview 3 card**: Homepage chỉ hiển thị 3 center đầu tiên dạng grid 3 cột.
- **Nút "Xem thêm trung tâm"**: Neo-brutalism button với badge `+6 trung tâm khác`, hover chuyển màu primary.
- **Modal Fullscreen**: Khi bấm "Xem thêm" → hiển thị modal chứa toàn bộ 9 center.
  - **Thanh tìm kiếm (Search)**: Tìm theo tên, địa chỉ, mã trung tâm, email, tỉnh thành. Có nút xóa nhanh (X).
  - **Bộ lọc tỉnh thành (Filter)**: Dropdown chọn tỉnh thành, tự động trích từ dữ liệu. Có option "Tất cả tỉnh thành".
  - **Hiển thị số kết quả**: Badge "N kết quả" dưới thanh toolbar.
  - **Empty state**: Khi không tìm thấy → hiện icon 🔍 + thông báo.
  - **Scroll nội dung**: Grid 2 cột trong modal, scrollbar custom.
- **Reusable CenterCard component**: Extract thành component dùng chung cho cả section và modal.
- **Footer card**: Thêm badge `province` hiển thị tỉnh thành bên cạnh mã trung tâm.
- **CSS mới**: ~300 dòng bao gồm View More button, Modal overlay/header/toolbar/grid, search/filter box, responsive (1024px, 768px, 640px).
- **Song ngữ đầy đủ**: Tất cả labels modal, placeholder, empty state đều có VI/EN.
- **Biên dịch & Xác thực**: Build thành công 100% trong **281ms**, 68 modules.

## [2026-05-23] - Tạo mới Section "Hệ Thống Trung Tâm" trên Homepage
- **File mới tạo**: `src/components/homepage/CentersSection.tsx`
  - Hiển thị danh sách 3 trung tâm AutiCare (Central Saigon, Hanoi North, Da Nang Beach) dạng card grid.
  - Mỗi card gồm: Tên trung tâm, Trạng thái (Active/Inactive với pulse animation), Địa chỉ, Số điện thoại, Email, Mã trung tâm.
  - Accent bar gradient đầu mỗi card, icon SVG building, hover effect neo-brutalism.
  - Hỗ trợ song ngữ VI/EN đầy đủ.
  - Badge tổng kết "3 trung tâm trên toàn quốc" ở cuối section.
- **Tích hợp vào App.tsx**:
  - Import `CentersSection`, thêm nav link "Trung tâm/Centers".
  - Thêm vào IntersectionObserver để tracking active section.
  - Render giữa AboutSection và CtaSection.
- **Tích hợp FloatingNav.tsx**: Thêm dot indicator cho section centers.
- **CSS mới (App.css)**: ~270 dòng CSS bao gồm grid layout, card styles, accent bars, status pulse animation, slide-up animation, responsive breakpoints (1024px, 640px).
- **Biên dịch & Xác thực**:
  - Build thành công 100% trong **278ms**, 68 modules transformed, không có lỗi.

## [2026-05-23] - Đơn giản hóa Dữ liệu Mẫu Hồ sơ Phụ huynh
- **Cập nhật dữ liệu giả lập trong state `userProfile` (App.tsx)**:
  - `full_name`: `'Nguyễn Thị Minh Anh (Mẹ Bé Khủng Long Dino)'` → `'Nguyễn Thị A'`
  - `username`: `'me_dino_sieuquay'` → `'nguyenthia_02'`
  - `email`: `'me.dino.sieunhan@gmail.com'` → `'nguyenthia02@gmail.com'`
  - `phonenumber`: `'0999.888.777'` → `'0912.345.678'`
  - `job`: `'Kế toán viên kiêm Chuyên gia dẹp loạn Khủng long con'` → `'Kế toán'`
  - `address`: `'Số 99 Đường Cầu Vồng, ...'` → `'123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh'`
- **Biên dịch & Xác thực**:
  - Chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công 100% trong **263ms**, không có lỗi.

## [2026-05-23] - Thiết kế Dữ liệu Mẫu "Fake Fake" Hoạt Hình Cho Hồ sơ Phụ huynh
- **Cập nhật bộ dữ liệu giả lập ngộ nghĩnh (App.tsx)**:
  - Thay đổi toàn bộ các trường thông tin khô khan của Phụ huynh trong state `userProfile` sang định dạng giả lập đáng yêu và hài hước:
    * `full_name`: `Nguyễn Thị Minh Anh (Mẹ Bé Khủng Long Dino)`
    * `username`: `me_dino_sieuquay`
    * `email`: `me.dino.sieunhan@gmail.com`
    * `phonenumber`: `0999.888.777`
    * `job`: `Kế toán viên kiêm Chuyên gia dẹp loạn Khủng long con`
    * `address`: `Số 99 Đường Cầu Vồng, Phường Hạnh Phúc, Quận Vui Vẻ, TP. Hồ Chí Minh`
- **Biên dịch & Xác thực**:
  - Chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong **277ms** sạch sẽ hoàn toàn không có bất kỳ lỗi nào, bảo đảm dự án vận hành an toàn và mượt mà.

## [2026-05-23] - Cố định thanh Header khi lăn chuột ở trang Profile (Sticky Header Layout)
- **Tối ưu hóa hành vi cuộn của trang Hồ sơ Phụ huynh (App.css)**:
  - Nâng cấp lớp CSS `.profile-page-header` với các thuộc tính: `position: sticky;`, `top: 0;`, `z-index: 100;`.
  - Cơ chế hoạt động: Khi người dùng lăn chuột cuộn nội dung phía dưới, thanh Header (chứa logo AutiCare, bộ chuyển đổi ngôn ngữ VN/EN và nút Quay về trang chủ) sẽ luôn được giữ cố định chặt chẽ ở trên cùng màn hình.
  - Kết quả: Phụ huynh có thể dễ dàng chuyển đổi ngôn ngữ hoặc quay lại trang chủ tức thời ở bất kỳ vị trí nào trên trang mà không cần phải cuộn ngược lên đầu trang.
- **Biên dịch & Xác thực**:
  - Chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong **268ms** sạch sẽ không còn bất kỳ lỗi nào, bảo đảm dự án vận hành mượt mà và an toàn.

## [2026-05-23] - Tinh giản trường Vai trò thành Nghề nghiệp duy nhất ở Hồ sơ Phụ huynh
- **Cập nhật nhãn dán và dữ liệu mẫu mặc định**:
  - Đổi giá trị mặc định của trường dữ liệu `job` từ `'Phụ huynh trẻ tự kỷ / Kế toán viên'` thành `'Kế toán viên'` trong state `userProfile` (`src/App.tsx`) để tinh gọn và chuyên sâu hóa thông tin của phụ huynh.
  - Sửa đổi từ điển i18n song ngữ trong `UserProfileTab.tsx`:
    - Tiếng Việt (VI): Đổi nhãn form `job` thành `"Nghề nghiệp"`, nhãn nhanh `jobTitle` ở đầu thẻ thành `"Nghề nghiệp"`, và `jobPlaceholder` gợi ý nhập liệu thành `"Ví dụ: Kế toán viên"`.
    - Tiếng Anh (EN): Đổi nhãn form `job` thành `"Occupation"`, nhãn nhanh `jobTitle` thành `"Occupation"`, và `jobPlaceholder` gợi ý thành `"e.g. Accountant"`.
- **Biên dịch & Xác thực**:
  - Chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong **255ms** sạch sẽ không còn bất kỳ lỗi nào, bảo đảm dự án vận hành mượt mà và an toàn.

## [2026-05-23] - Khắc phục lỗi giật màn hình do thanh cuộn dọc (Scrollbar Layout Shift Jitter Fix)
- **Tích hợp giải pháp khắc phục triệt để hiện tượng giật màn hình (index.css)**:
  - Bổ sung thuộc tính CSS hiện đại tiêu chuẩn W3C `scrollbar-gutter: stable;` cho phần tử `html` toàn cục trong tệp `src/index.css`.
  - Cơ chế hoạt động: Trình duyệt luôn luôn chừa sẵn một khoảng không gian trống cố định bằng đúng chiều rộng của thanh cuộn ở lề phải ngay cả khi nội dung ngắn và không có thanh cuộn dọc. Nhờ vậy, khi thanh cuộn xuất hiện ở các tab dài (Children, User Profile, Support Tickets) hoặc biến mất ở các tab ngắn, chiều rộng của khung chứa nội dung chính không bao giờ bị thay đổi.
  - Kết quả: Triệt tiêu hoàn toàn 100% hiện tượng dịch chuyển layout (layout shift) hay giật màn hình khi chuyển đổi tab qua lại, mang lại trải nghiệm cuộn và duyệt tab vô cùng mượt mà, Premium.
- **Biên dịch & Xác thực**:
  - Chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong **268ms** sạch sẽ không còn bất kỳ lỗi TypeScript hay CSS nào, bảo đảm dự án vận hành an toàn và mượt mà trên mọi thiết bị.

## [2026-05-23] - Gộp Hồ sơ Phụ huynh thành 1 Thẻ duy nhất (Single Card Board Layout)
- **Tái cấu trúc giao diện UserProfileTab.tsx thành Thẻ đơn (Single Card)**:
  - Loại bỏ hoàn toàn bố cục 2 cột cũ cồng kềnh (cột trái chứa sticker avatar và cột phải chứa form chi tiết).
  - Gộp tất cả thông tin lại vào **1 thẻ duy nhất** `.profile-single-card-board` phẳng phiu, tối giản và hiện đại theo phong cách Playful Geometric Memphis.
- **Thiết kế phân vùng thẻ đơn khoa học**:
  - **Phần Đầu Thẻ (Profile Header Zone)**: Bố cục Flexbox ngang trên Desktop chứa Avatar tương tác 120px (có hover camera uploader và input file ẩn) xếp cạnh Họ tên lớn, Username (@parent_minhanh) và bộ quick info liên hệ nhanh (Vai trò, Email, Điện thoại) có icon emoji sinh động.
  - **Đường Phân Cách**: Bổ sung nét dashed Memphis đứt quãng `.profile-dashed-separator` tinh tế tạo điểm nhấn nghệ thuật.
  - **Phần Thân Thẻ (Detailed Fields Grid)**: Lưới 2 cột hiển thị đầy đủ 6 trường thông tin chi tiết (ở chế độ Xem tĩnh là các static block nhẹ nhàng, ở chế độ Chỉnh sửa là các input/textarea nhập liệu động).
  - **Phần Đuôi Thẻ**: Nơi tập hợp các nút tương tác (🔒 Change Password, ✨ Edit Profile, ❌ Cancel, 💾 Save) được định kiểu Candy Button viên thuốc pill-shape đẹp mắt, có chặn submit form mặc định triệt để.
  - **Avatar Selector**: Tích hợp hiển thị bộ chọn Sticker Avatar động nằm gọn gàng bên trong thẻ đơn khi ở chế độ chỉnh sửa.
- **Tinh chỉnh CSS và Responsive Tối ưu (App.css)**:
  - Định kiểu card đơn `.profile-single-card-board` viền Slate dày `3px`, bóng đổ cứng 3D Memphis lệch góc `8px 8px 0px #1E293B`, bo góc rộng rãi `24px` và xoay nhẹ `-0.2deg`.
  - **Tối ưu responsive hoàn hảo**: Khi co nhỏ màn hình di động (< 768px), phần đầu thẻ tự động chuyển sang dạng cột đứng (flex-direction: column), căn giữa toàn bộ avatar và chữ vô cùng cân đối, trơn tru.
- **Biên dịch & Xác thực**:
  - Chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong **270ms** sạch sẽ không còn bất kỳ lỗi TypeScript hay CSS nào.

## [2026-05-23] - Tích hợp hệ thống Cột Tab điều hướng bên trái (Parent Portal Dashboard) cho trang Cá nhân Phụ huynh
- **Tái cấu trúc trang cá nhân thành Parent Dashboard Shell (`UserProfilePage.tsx`)**:
  - Triển khai cột Sidebar điều hướng bên trái chứa 6 phân hệ cốt lõi song ngữ: `Hồ Sơ Cá Nhân` (User Profile), `Hóa Đơn & Thanh Toán` (Invoices), `Hỗ Trợ Kỹ Thuật` (Support Tickets), `Lịch Hẹn Đã Đặt` (Booked Appointments), `Thời Khóa Biểu Tuần` (Weekly Schedule), và `Hồ Sơ Con Em` (Children Profiles).
  - Tích hợp state `activeTab` điều phối luồng hiển thị, tự động render động các component con tương ứng ở vùng nội dung bên phải.
- **Phát triển 6 Phân hệ Tab con độc lập (Quy tắc 10 & 11)**:
  - `UserProfileTab.tsx`: Tab quản lý thông tin phụ huynh mẫu (Nguyễn Thị Minh Anh) với tính năng static block ở chế độ Xem và form dynamic ở chế độ Chỉnh sửa, cùng Modal đổi mật khẩu.
  - `InvoicesTab.tsx`: Tab lịch sử hóa đơn thanh toán Playful Geometric. Hiển thị tổng chi tiêu can thiệp và danh sách hóa đơn Sticker Card (Paid/Unpaid) có nút tải PDF 💾 và xem chi tiết.
  - `SupportTicketsTab.tsx`: Tab gửi yêu cầu hỗ trợ. Cho phép phụ huynh xem trạng thái xử lý (Pending/Resolved/Closed) và có nút Candy Button mở Modal Playful để tạo yêu cầu mới.
  - `BookedAppointmentsTab.tsx`: Tab quản lý lịch hẹn khám chẩn đoán/đánh giá năng lực của trẻ với bác sĩ (TS. Minh, BS. Đức, Cô Lan), hiển thị khung giờ, vị trí phòng khám lâm sàng.
  - `ScheduleTab.tsx`: Tab thời khóa biểu trị liệu ca học trong tuần của bé dưới dạng Timeline sinh động (ABA Therapy, Speech Therapy...) với tên giáo viên phụ trách.
  - `ChildrenTab.tsx`: Tab quản lý danh sách hồ sơ các trẻ được theo dõi can thiệp, có nút "Thêm hồ sơ con em" mở Modal Playful để lưu trữ trẻ mới thời gian thực.
- **Thiết kế Stylesheet Playful Geometric & Tối ưu Responsive Sidebar (`App.css`)**:
  - Định kiểu layout 2 cột Dashboard rộng rãi. Sidebar pill-shape buttons có hover lift-up xoay nhẹ và active màu tím Violet nổi bật.
  - Thiết kế các sticker card 3D, badge màu trạng thái neon Memphis, timeline và avatar emoji tròn sinh động cho các tab.
  - **Tối ưu responsive hoàn hảo**: Khi co nhỏ màn hình di động (< 900px), thanh Sidebar dọc bên trái tự động chuyển hóa thành một thanh cuộn ngang Tab Bar (horizontal scroll) ở đầu trang giúp tối ưu không gian hiển thị xuất sắc.
- **Biên dịch & Xác thực**:
  - Dự án chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong 278ms mà không còn bất cứ lỗi TypeScript hay CSS nào.

## [2026-05-23] - Ngăn chặn triệt để hành vi Submit Form ngoài ý muốn khi nhấn nút Edit Profile
- **Chặn tuyệt đối sự kiện nổi bọt và submit mặc định**:
  - Tích hợp `e.preventDefault()` và `e.stopPropagation()` vào tất cả các sự kiện `onClick` của các nút tương tác phụ (`✨ Edit Profile`, `🔒 Change Password`, `❌ Cancel`) trong form của `UserProfilePage.tsx`.
  - Khắc phục triệt để lỗi khi người dùng click vào nút `✨ Edit Profile` thì form bị tự động submit, kích hoạt hàm `handleSubmit`, cập nhật dữ liệu và hiển thị ngay Toast báo thành công khiến giao diện lập tức quay về View Mode mà không kịp hiển thị chế độ Chỉnh sửa.
- **Biên dịch & Xác thực**:
  - Dự án chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong 266ms không còn bất cứ lỗi TypeScript hay cảnh báo nào, hot reload hoạt động hoàn hảo trên mọi thiết bị.

## [2026-05-23] - Tối ưu hóa Chế độ Xem (View) bằng Static Text Blocks và Chế độ Chỉnh sửa (Edit) linh hoạt
- **Chuyển đổi input thô cứng sang Static Text Blocks ở View Mode**:
  - Loại bỏ hoàn toàn các ô input disabled xám xịt thô cứng ở chế độ Xem (View Mode) để mang lại trải nghiệm xem thoáng mắt, cao cấp.
  - Thay thế các input và textarea bằng các khối hiển thị tĩnh `.profile-page-static-value` phẳng phiu, sang trọng có màu nền Slate cực nhẹ `#F8FAFC`, bo tròn `12px` và viền mịn, giúp hồ sơ hiển thị trang nhã như một tấm thẻ định danh điện tử chuẩn mực.
  - Định dạng địa chỉ liên hệ tĩnh `.profile-page-textarea-static` rộng rãi, tự động ngắt dòng thông minh (`white-space: pre-wrap`).
- **Hiện lên các trường để chỉnh sửa khi nhấn nút "Edit Profile" (Edit Mode)**:
  - Khi nhấp chọn nút **✨ Edit Profile**, giao diện lập tức chuyển trạng thái `isEditing === true`.
  - Thay thế hoàn toàn các static block bằng các ô nhập liệu `<input>` và `<textarea>` thực sự của hệ thống để phụ huynh có thể gõ và chỉnh sửa thông tin trực tiếp.
  - Đồng thời hiển thị dải nút **Cancel** (Hủy bỏ mọi thay đổi, khôi phục dữ liệu ban đầu và quay về View Mode) và **Save** (Lưu thông tin, submit đồng bộ lên Topbar, hiển thị Toast lấp lánh và tự động đưa giao diện về View Mode).
- **Biên dịch & Xác thực**:
  - Dự án chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong 267ms không còn lỗi TypeScript hay cảnh báo nào.

## [2026-05-23] - Tích hợp Chế độ Xem & Chỉnh sửa (View/Edit Mode) song hành cho Hồ sơ cá nhân
- **Triển khai chế độ View Mode mặc định**:
  - Khi người dùng truy cập trang, toàn bộ các trường nhập liệu tự động bị khóa (`disabled={true}`).
  - Khóa hành vi click thay avatar trên container và không hiển thị hover overlay hay chỉ dẫn thay đổi avatar.
  - Ẩn hoàn toàn bộ chọn Sticker Avatar hoạt hình để đảm bảo giao diện xem thông thoáng và sạch sẽ.
  - Phím chức năng footer hiển thị 2 nút: **Change Password** (Đổi mật khẩu bảo mật) và **Edit Profile** (Chuyển đổi giao diện sang chế độ Edit).
- **Phát triển tương tác Edit Mode linh hoạt**:
  - Khi nhấp chọn **Edit Profile**, hệ thống mở khóa toàn bộ các trường nhập liệu (`disabled={false}`).
  - Cho phép người dùng nhấp trực tiếp vào avatar để mở File Uploader, hiển thị mượt mà hover overlay có icon máy ảnh 📷 kèm văn bản hướng dẫn và nhãn gợi ý pastel nổi bật.
  - Mở ra bộ chọn Sticker Avatar hoạt hình giúp phụ huynh tha hồ cấu hình hình ảnh ngộ nghĩnh.
  - Dải nút hành động footer cập nhật động 100% thành 2 nút: **Cancel** (Hủy bỏ mọi thay đổi, khôi phục lại dữ liệu ban đầu của profile và trả giao diện về View Mode) và **Save** (Lưu thông tin hồ sơ, submit form gửi dữ liệu lên parent, đồng bộ thời gian thực lên Topbar, hiển thị Toast lấp lánh và đưa giao diện tự động quay về View Mode).
- **Tinh chỉnh CSS & Giải quyết triệt để lỗi unclosed block**:
  - Thiết kế kiểu dáng phẳng phiu tinh tế cho các trường input bị disabled (`.profile-page-input:disabled`) với màu nền Slate nhẹ `#F1F5F9` và con trỏ `not-allowed`.
  - Phân tách lớp `.profile-card-avatar-container` thành `.readonly` (cursor default, không zoom co scale khi hover) và `.editable` (cursor pointer).
  - Dọn dẹp hoàn toàn các đoạn code CSS bị trùng lặp ở cuối tệp `src/App.css` và khắc phục lỗi thiếu dấu đóng ngoặc ở media query 640px.
- **Biên dịch & Xác thực**:
  - Dự án chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công rực rỡ 100% chỉ trong 260ms không còn bất cứ cảnh báo hay lỗi cú pháp nào.

## [2026-05-23] - Nâng cấp biểu mẫu Hồ sơ cá nhân: Overhaul 2 nút thành Edit Profile & Change Password
- **Sửa đổi dải nút hành động Form Actions footer**:
  - Sửa đổi 2 nút hành động ở cuối biểu mẫu Hồ sơ cá nhân ("Hủy bỏ thay đổi" và "Lưu thông tin hồ sơ") thành 2 nút mới:
    * **Edit Profile (Chỉnh sửa hồ sơ)**: Giữ vai trò submit form để cập nhật dữ liệu và đồng bộ hóa thời gian thực lên Header Topbar.
    * **Change Password (Thay đổi mật khẩu)**: Kiểu nút thứ cấp, click vào mở Modal thay đổi mật khẩu.
  - Loại bỏ hoàn toàn hàm `handleReset` không còn sử dụng để triệt tiêu hoàn toàn cảnh báo TypeScript TS6133 (strict unused variables).
- **Tích hợp Modal Thay đổi mật khẩu Playful Geometric**:
  - Tạo mới state `isPasswordModalOpen` đóng/mở Modal và hàm `handlePasswordSubmit` xử lý submit mật khẩu thành công, hiển thị Toast thông báo 3D lơ lửng màu xanh lá `✨ Thay đổi mật khẩu thành công!`.
  - Thiết kế Modal chuẩn Playful Geometric: nền kem `#FFFDF5`, viền Slate dày `3px`, bóng đổ cứng 3D `12px 12px 0px #1E293B`, dải tiêu đề màu tím pastel `#EDE9FE` và hiệu ứng xuất hiện đàn hồi mượt mà (`@keyframes scaleBounce`).
  - Hỗ trợ các trường bảo mật song ngữ: Mật khẩu hiện tại, Mật khẩu mới, Xác nhận mật khẩu mới.
- **Xác thực và Biên dịch**:
  - Dự án chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong 254ms không lỗi kiểu dữ liệu hay cú pháp CSS nào.

## [2026-05-23] - Tích hợp Tải ảnh đại diện trực tiếp và Tối giản hóa giao diện Hồ sơ Phụ huynh
- **Tối giản hóa giao diện Hồ sơ cá nhân**:
  - Loại bỏ hoàn toàn nhãn đè biên `.profile-sticker-badge` ("Identity Card" / "Thẻ định danh") khỏi `.profile-card-sticker` giúp giao diện phẳng phiu và thanh lịch hơn theo đúng mong muốn của người dùng.
  - Xóa bỏ trường nhập liệu "Ảnh đại diện (Avatar URL)" dạng text thô kệch trong form nhập liệu bên phải, tối ưu quy trình thao tác của cha mẹ.
- **Tích hợp tính năng Tải ảnh trực tiếp (File Uploader)**:
  - Cho phép người dùng nhấp trực tiếp vào Avatar tròn `.profile-card-avatar-display` để kích hoạt trình chọn tệp của thiết bị (máy tính hoặc điện thoại).
  - Sử dụng đối tượng `FileReader` để tự động đọc tệp hình ảnh được chọn và chuyển đổi thành chuỗi dữ liệu Base64 (`readAsDataURL`), lưu trữ và hiển thị trực tiếp lên Avatar tròn thời gian thực.
  - Tích hợp hiệu ứng Playful Geometric: thiết kế lớp phủ mờ `.profile-avatar-hover-overlay` chứa icon máy ảnh 📷 và chữ hướng dẫn ("Thay ảnh" / "Change") tự động hiển thị mượt mà bằng transition khi hover vào avatar, đồng thời Avatar co nhẹ cực kỳ sống động.
  - Bổ sung nhãn chú thích dưới ảnh `.profile-avatar-hint` chỉ dẫn "Nhấp vào ảnh để thay đổi" / "Click photo to change", tự động đổi sang màu tím pastel ngọt ngào khi di chuột vào Avatar.
- **Xác thực và Biên dịch**:
  - Chạy thử nghiệm thành công bản dựng production bằng lệnh `cmd.exe /c npm run build` đạt kết quả 100% sạch sẽ không cảnh báo hay lỗi kiểu dữ liệu TypeScript.

## [2026-05-23] - Khắc phục lỗi tràn Identity Card và Tối ưu bối cảnh Phụ huynh cho Hồ sơ cá nhân
- **Khắc phục lỗi tràn nhãn đè biên `.profile-sticker-badge`**:
  - Tích hợp thuộc tính `min-width: 290px` cho `.profile-card-sticker` trong `src/App.css` đảm bảo chiều rộng an toàn trên desktop/tablet.
  - Tinh gọn padding (`0.3rem 0.75rem`) và giảm nhẹ font-size (`0.7rem`) của `.profile-sticker-badge` giúp nhãn dán định danh cân đối, sắc nét.
  - Thiết lập responsive di động (`@media (max-width: 640px)`): đặt `.profile-card-sticker` có `min-width: unset; width: 100%; max-width: 320px; margin: 0 auto;` và thu nhỏ font-size của nhãn xuống `0.68rem` để vừa khít và thẩm mỹ hoàn hảo trên màn hình điện thoại siêu nhỏ.
- **Tối ưu hóa bối cảnh Phụ huynh cho Hồ sơ cá nhân (`UserProfilePage.tsx`)**:
  - Cập nhật tài nguyên dịch thuật song ngữ (`translations`): chuyển `"tài khoản chuyên gia AutiCare"` thành `"tài khoản Phụ huynh AutiCare"`, và `"specialist account"` thành `"Parent account"` trong tiêu đề phụ.
  - Thay đổi nhãn vai trò `job` thành `"Vai trò phụ huynh & Nghề nghiệp"` (VI) / `"Parent Role & Occupation"` (EN).
  - Tích hợp hệ thống placeholder gợi ý chi tiết đậm chất phụ huynh thực tế và trực quan cho tất cả các trường (Ví dụ: Mẹ bé Đức Minh / Kế toán viên, phuhuynh.minhanh@gmail.com...).
- **Xác thực và Biên dịch**:
  - Chạy lệnh biên dịch production `cmd.exe /c npm run build` thành công xuất sắc 100% chỉ trong 252ms không có lỗi TypeScript hay cảnh báo.

## [2026-05-23] - Triển khai Trang Hồ sơ Cá nhân (UserProfilePage) độc lập tại Trang chủ Homepage
- **Triển khai trang Hồ sơ cá nhân độc lập (UserProfilePage.tsx)**:
  - Tạo mới component src/components/profile/UserProfilePage.tsx quản lý 7 trường thông tin yêu cầu: username (varchar), email (varchar), avatar (varchar), phonenumber (varchar), full_name (nvarchar), address (nvarchar), job (nvarchar).
  - Tích hợp bộ sưu tập sticker hoạt hình ngộ nghĩnh (Dino, Teddy, Sunny...) làm ảnh đại diện động cho phép lựa chọn và thay đổi trực tiếp, sinh động.
- **Thiết kế giao diện Playful Geometric cao cấp (`App.css`)**:
  - Bố cục 2 cột chuyên nghiệp: Cột trái chứa Thẻ định danh và Bộ chọn sticker avatar; Cột phải chứa Form nhập liệu khổng lồ.
  - Cấu trúc viền Slate `#1E293B` dày dặn `3px`, bóng đổ cứng lệch góc `12px 12px 0px #1E293B` tạo hiệu ứng 3D nhấc nổi, màu nền giấy kem y học `#FFFDF5`.
  - Các nút hành động dạng Candy Buttons pill-shape bo tròn hoàn hảo, có độ nảy co giãn (active bounce transition) mượt mà.
  - Xây dựng thông báo thành công (Toast Message) lơ lửng màu xanh lá với hiệu ứng trồi sụt 3D lôi cuốn.
- **Tích hợp & Đồng bộ hóa thời gian thực (`App.tsx`)**:
  - Thêm `'profile'` vào kiểu dữ liệu `View` và khai báo case render trang `UserProfilePage`.
  - Chuyển đổi tên hiển thị ở header `.auth-user-chip` thành nút bấm click được (`cursor: pointer`) với hiệu ứng hover màu vàng ấm. Nhấp chọn sẽ chuyển hướng view sang trang profile.
  - Triển khai cơ chế đồng bộ hóa dữ liệu thời gian thực: Khi thay đổi Họ và tên trong Profile, tên hiển thị trên thanh Header Topbar tự động cập nhật ngay lập tức sau khi nhấn Lưu.
  - Định dạng nhập liệu bằng type-only import (`import type { UserProfile }`) từ `UserProfilePage.tsx` để tuân thủ nghiêm ngặt rule `verbatimModuleSyntax` trong cấu hình TypeScript của dự án.
- **Bản dựng & i18n**:
  - Thiết kế song ngữ Việt - Anh (i18n) hoàn mỹ cho toàn bộ các ô nhập liệu, nhãn hiển thị và thông báo toast.
  - Chạy lệnh biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc 100% không còn bất kỳ lỗi TypeScript hay cảnh báo nào.

## [2026-05-22] - Nâng cấp tương tác click hàng bảng xem chi tiết trong Quản lý Trung tâm
- **Cải tiến tương tác duyệt danh sách trung tâm (CentersTab)**:
  - Cho phép người dùng click vào bất kỳ đâu trên hàng dữ liệu (`<tr>`) để truy cập ngay màn hình Chi tiết trung tâm (`CenterDetailView`) thay vì chỉ giới hạn nút con mắt.
  - Bổ sung `cursor: pointer` vào style inline của thẻ `<tr>` giúp người dùng dễ dàng nhận biết vùng tương tác khi di chuột qua.
  - Tích hợp hàm chặn nổi bọt sự kiện `e.stopPropagation()` trên nút xem chi tiết cũ để ngăn chặn việc kích hoạt kép sự kiện click của hàng.
- **Biên dịch & Xác thực**:
  - Chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công rực rỡ 100% không cảnh báo hay lỗi kiểu dữ liệu TypeScript.

## [2026-05-22] - Đồng bộ hóa giao diện và nút hành động Quản lý bài tập (ExercisesTab) với Quản lý nhân sự (StaffsTab)
- **Đồng bộ hóa các bộ lọc Select**:
  - Định nghĩa lớp CSS `.filter-select` cục bộ trong component `ExercisesTab.tsx` với thiết kế hiện đại: nền xám nhạt (`#F1F5F9`), viền xám mỏng (`1px solid #E2E8F0`), bo góc `12px`, font chữ `Be Vietnam Pro` đậm đà và có hiệu ứng focus phát sáng xanh nhẹ.
  - Loại bỏ hoàn toàn inline style viền đen dày cộp Memphis thô cứng cũ trên hai bộ chọn Cấp độ (Level Filter) và Danh mục (Category Filter) để ăn khớp 100% với giao diện thanh tìm kiếm `.search-bar` hiện có.
- **Phẳng hóa Badge Cấp độ (Level Badge)**:
  - Loại bỏ thuộc tính `border: 1.5px solid #1E293B` của nhãn hiển thị Cấp độ trong danh sách bảng phẳng, đưa về chuẩn thiết kế nhãn trạng thái phẳng không viền đen của hệ thống.
- **Tối giản hóa nút phát YouTube trong Modal Chi tiết bài tập**:
  - Tái thiết kế nút "Play YouTube ▶" trong cửa sổ Xem chi tiết bài tập từ dạng shadow Memphis sặc sỡ sang nút phẳng (Flat Button) tinh tế và sang trọng: nền Primary (`var(--primary)`), chữ trắng, bo góc 10px, loại bỏ hoàn toàn shadow và viền đen dày thô, tạo sự đồng bộ tối đa với form grid 2 cột.
- **Kiểm định & Biên dịch**:
  - Dự án chạy biên dịch sản phẩm `cmd.exe /c npm run build` thành công xuất sắc chỉ trong 286ms, hoàn toàn sạch sẽ không một lỗi TypeScript hay cảnh báo.

## [2026-05-22] - Triển khai chức năng Quản lý bài tập can thiệp (Manage exercises)
- **Tích hợp mô-đun quản lý bài tập can thiệp mới (ExercisesTab)**:
  - Triển khai đầy đủ tính năng hiển thị danh sách (View list), tìm kiếm nâng cao (Search) và bộ lọc (Filters) bài tập theo Cấp độ và Danh mục huấn luyện.
  - Tích hợp tính năng tạo bài tập mới (Create exercise) hỗ trợ các thuộc tính quan trọng: Tên, Mô tả, Mục tiêu cần đạt, Trạng thái hoạt động, Link video YouTube hướng dẫn, Cấp độ độ khó và Danh mục huấn luyện.
  - Tích hợp tính năng cập nhật bài tập (Update exercise) tuân thủ chặt chẽ ràng buộc nghiệp vụ: chỉ cho phép cập nhật Mô tả (Description), Mục tiêu (Target) và Link video hướng dẫn (tutorial_url). Các trường thông tin khác được cấu hình ở chế độ chỉ đọc (read-only/disabled) hoặc ẩn để đảm bảo tính an toàn dữ liệu.
  - Xây dựng giao diện xem chi tiết bài tập (View detail) dưới dạng thẻ sticker bento grid tinh tế, trực quan, tích hợp trình phát video YouTube mockup thông minh.
  - Triển khai tính năng xóa bài tập (Delete exercise) với hộp thoại xác nhận 3D Playful Geometric an toàn.
- **Tích hợp vào Admin Dashboard**:
  - Đăng ký tab `'exercises'` vào danh sách tab của `AdminDashboard.tsx`.
  - Cập nhật menu điều hướng Sidebar trong nhóm "training" (Nội dung Huấn luyện) cho phép chuyên gia truy cập nhanh chóng.
  - Thêm case render `<ExercisesTab lang={lang} />` vào switch-case của hàm `renderActiveTab()`.
- **Thẩm mỹ & Đa ngôn ngữ (i18n)**:
  - Thiết kế đồng bộ hoàn hảo theo phong cách **Playful Geometric** đặc trưng của AutiCare: Viền Slate dày (`3px solid #1E293B`), bóng đổ cứng 3D chunky offset, bo góc `24px`, màu sắc tương phản cao Memphis rực rỡ và các Candy Button hình viên thuốc cực kỳ Premium.
  - Tuân thủ Rule 9: Sử dụng duy nhất font chữ `Be Vietnam Pro` cho toàn bộ nội dung hiển thị trong mô-đun để tối ưu hoá khả năng đọc tiếng Việt.
  - Hỗ trợ song ngữ Việt/Anh (i18n) hoàn chỉnh cho toàn bộ giao diện, nút bấm, thông báo toast/alert của mô-đun.
- **Biên dịch & Đóng gói**:
  - Biên dịch thành công 100% bản dựng production bằng lệnh `cmd.exe /c npm run build`, đảm bảo dự án sạch sẽ không phát sinh bất kỳ lỗi TypeScript hay cảnh báo nào.

## [2026-05-22] - Thay thế cột Center Director thành Physical Address tại danh sách Trung tâm
- **Thay đổi giao diện danh sách Trung tâm (Centers Tab)**:
  - Loại bỏ hoàn toàn cột hiển thị **Center Director (Giám đốc trung tâm)** trong bảng danh sách các cơ sở trung tâm (`CentersTab.tsx`) để đáp ứng trải nghiệm mới.
  - Thay thế bằng cột mới **Physical Address (Địa chỉ cơ sở)** hiển thị rõ ràng thông tin địa lý của trung tâm trực tiếp ngoài danh sách.
- **Tải dữ liệu & Hỗ trợ Đa ngôn ngữ (i18n)**:
  - Bổ sung cấu trúc ngôn ngữ song ngữ mới `physicalAddress: "Địa chỉ cơ sở"` (VI) và `physicalAddress: "Physical Address"` (EN) vào bộ tài nguyên dịch thuật `translations`.
  - Thay thế logic trích xuất thông tin staffs sang dùng trường `center.address` lấy trực tiếp từ schema cơ sở dữ liệu.
  - Tích hợp fallback thông minh: Khi địa chỉ trống, hiển thị `Chưa cập nhật` (VI) hoặc `Not updated` (EN) tùy thuộc ngôn ngữ hệ thống đang chọn.
- **Biên dịch & Xác thực**:
  - Chạy thành công bản dựng production bằng lệnh `cmd.exe /c npm run build`, đảm bảo dự án biên dịch sạch 100% không cảnh báo hay lỗi kiểu dữ liệu TypeScript.

## [2026-05-22] - Giải quyết Xung đột Git & Đồng bộ hóa Hệ thống (Kế hoạch Can thiệp & Đặt lịch Chuyên gia)
- **Giải quyết xung đột (Git Conflicts)**:
  - Khắc phục hoàn toàn xung đột mã nguồn trong `src/components/AdminDashboard.tsx`, tích hợp tab Kế hoạch can thiệp (`plans`) và Đặt lịch trống (`schedule`) chạy song song hoàn hảo trong Admin Dashboard.
  - Giải quyết xung đột trong `Logs.md` bằng cách gộp nhật ký làm việc của hai nhánh cục bộ và nhánh từ xa.
  - Giải quyết xung đột trong `context.md` tại phân vùng ghi nhận thiết kế, bảo lưu toàn vẹn tài liệu của cả hai tính năng lớn: Hệ thống Giai đoạn can thiệp (local) và Quy trình Đặt lịch chuyên gia dynamic kèm Vé hẹn AutiCare Memphis (remote).
- **Đồng bộ hóa & Xác thực**:
  - Chạy `git pull` và `git push` thành công, đưa toàn bộ mã nguồn đã đồng bộ lên kho lưu trữ GitHub từ xa nhánh `main`.
  - Vite Dev Server tự động cập nhật HMR thành công không phát sinh bất kỳ lỗi biên dịch hay xung đột cú pháp nào.

## [2026-05-22] - Tinh chỉnh Giao diện Phase Details (Bỏ emoji, đồng bộ nút bấm & thêm Status)
- **Loại bỏ emoji bánh răng (`⚙️`)**:
  - Loại bỏ hoàn toàn biểu tượng bánh răng `⚙️` khỏi tiêu đề **Phase Overview** trong trang Chi tiết Giai đoạn can thiệp (`PlanDetailView.tsx`) nhằm làm cho giao diện tinh tế, thanh nhã và chuyên nghiệp hơn.
- **Đồng bộ hóa nút "+ Add Objective"**:
  - Chuyển đổi nút thêm mục tiêu can thiệp từ class Playful neon cũ (`add-obj-btn`) sang class nút phẳng chuẩn hệ thống (`add-btn`), giúp đồng bộ 100% về kích thước, màu sắc Primary Teal/Indigo và giao diện phẳng thanh lịch với các nút thêm mới khác trong Admin Dashboard.
- **Tích hợp thuộc tính Status (Trạng thái)**:
  - Thêm trường hiển thị **Status (Trạng thái)** trực tiếp vào lưới thông tin tổng quan của Giai đoạn (`overview-grid`).
  - Trạng thái được render động dưới dạng badge màu `.phase-status-badge` hoạt động (Active) hoặc không hoạt động (Inactive) thông qua từ điển dịch thuật song ngữ `t.active` và `t.inactive` tương ứng với giá trị `selectedPhase.status`.
- **Biên dịch và Xác thực**:
  - Dự án chạy `npm run build` hoàn thành biên dịch sạch sẽ 100% không phát sinh bất kỳ lỗi cú pháp hay cảnh báo kiểu dữ liệu nào.

## [2026-05-22] - Loại bỏ hoàn toàn Hoạt động can thiệp (Manage Activities) khỏi Phase Details
- **Tối giản hóa giao diện Giai đoạn can thiệp**:
  - Loại bỏ hoàn toàn phân vùng **Hoạt động can thiệp (Manage Activities)** ra khỏi trang Chi tiết Giai đoạn (`PlanDetailView.tsx`) theo mong muốn của người dùng.
  - Giao diện sau thay đổi gồm hai card xếp dọc độc lập: Card 1 (Trên) hiển thị thông tin tổng quan của Giai đoạn (Phase Overview), Card 2 (Dưới) hiển thị duy nhất phân vùng quản lý mục tiêu hành vi (Manage Objectives).
- **Dọn dẹp triệt để mã nguồn**:
  - Xóa bỏ/comment sạch sẽ các biến state cục bộ liên quan đến Activity: `isActModalOpen`, `actModalMode`, `selectedAct`, `actName`, `actDesc`, `actDuration` để đảm bảo trình biên dịch TypeScript không báo lỗi unused variables (`TS6133`).
  - Xóa bỏ các hàm modal xử lý liên quan: `openActModal`, `handleSaveAct`.
  - Loại bỏ khối JSX của cửa sổ modal CRUD Activity `{isActModalOpen && (...)}` ở cuối component.
- **Biên dịch và Xác thực**:
  - Dự án chạy `cmd.exe /c npm run build` biên dịch thành công 100% sạch sẽ và mượt mà chỉ trong 245ms.

## [2026-05-22] - Tách biệt Giao diện và Sửa lỗi Cấu trúc JSX cho Phase Details
- **Tách biệt Phase Details & Objectives thành 2 Card riêng**:
  - Tách hoàn toàn giao diện con của tab "Overview" trong Phase Details thành hai phần cấu trúc riêng biệt (`.phase-detail-card` cho Metadata/Overview và một `.phase-detail-card` độc lập phía dưới cho Objectives Management).
  - Loại bỏ nút tab "Manage Objectives" trùng lặp cũ nhằm tối giản hoá thanh Tab bar và tập trung trải nghiệm trực quan.
- **Sửa lỗi cú pháp JSX & Tối ưu hóa DOM Tree**:
  - Dọn dẹp các dấu đóng ngoặc nhọn `{` `}` dư thừa, các thẻ đóng `div` lạc lõng sinh ra do việc chuyển dịch code trước đó.
  - Sắp xếp lại luồng rẽ nhánh điều kiện `{phaseActiveTab === 'overview' && (...)}` để chứa đúng một cây phân cấp JSX hợp lệ với một thẻ bọc ngoài duy nhất `.tab-pane-content`, giải quyết triệt để lỗi biên dịch `[PARSE_ERROR] Expected ',' or ')' but found '{'`.
- **Biên dịch và Chạy Thử**:
  - Khởi động thành công Dev Server thông qua tác vụ nền `npm run dev`.
  - Biên dịch hoàn tất 100% bản dựng Production thành công rực rỡ không cảnh báo/lỗi bằng lệnh `npm run build`.

## [2026-05-22] - Đóng khung Plan Phase & Tích hợp Click out to Close Popups (Phase 2)
- **Đóng khung Phase Workspace (Playful Geometric Frame)**: Thiết kế và tích hợp khung bao bọc vững chãi cho khu vực quản lý chi tiết Giai đoạn can thiệp (Plan Phase Detail Workspace) trong `PlanDetailView.tsx`.
  - Toàn bộ Workspace (bao gồm nút Back `t.backToPhases` và các tab con, hoạt động, mục tiêu) được đóng gói bên trong thẻ `.phase-detail-workspace-card` lớn.
  - Áp dụng các token CSS Playful Geometric đặc trưng: viền Slate dày (`3px solid #1E293B`), bóng đổ cứng 3D offset (`8px 8px 0px #1E293B`), bo góc (`24px`), nền trắng sạch sẽ (`#FFFFFF`), kết hợp hiệu ứng hover nhấc nổi nhẹ (`transform: translate(-2px, -2px)` và tăng bóng đổ lên `10px 10px 0px #1E293B`).
  - Thay thế card `.phase-detail-card` bên trong thành cấu trúc phẳng `.phase-detail-inner` để loại bỏ việc lặp lại bóng đổ cứng thô kệch lồng nhau, giúp không gian thông tin bên trong thoáng đạt và chuyên nghiệp.
- **Tích hợp Click out to Close Popups cho hệ thống Modals**: Cập nhật cả 5 cửa sổ Popups/Modals CRUD trong `PlanDetailView.tsx` (Edit Plan, Delete Plan Confirmation, Phase CRUD, Activity CRUD, Objective CRUD) để tối ưu hóa tương tác:
  - Cho phép người dùng đóng nhanh modal bằng cách click vào lớp nền mờ bên ngoài (`.modal-overlay`).
  - Tích hợp hàm chặn nổi bọt sự kiện `onClick={(e) => e.stopPropagation()}` trên thẻ con `.admin-modal` chứa nội dung form nhằm ngăn chặn việc đóng nhầm modal ngoài ý muốn khi đang thao tác nhập liệu bên trong form.
- **Đóng gói sản phẩm**: Biên dịch dự án hoàn hảo 100% bằng `cmd.exe /c npm run build`, bảo đảm không có bất kỳ lỗi TypeScript hay Vite bundler nào phát sinh.

## [2026-05-22] - Tinh giản tối đa Plan Detail (Phẳng hóa) & Tối ưu hóa Plan Phase
- **Đơn giản hóa triệt để Plan Detail (Plan Profile Card)**: Tinh chỉnh thẩm mỹ vùng thông tin chi tiết Kế hoạch (`PlanDetailView.tsx`) để trút bỏ hoàn toàn lớp vỏ sặc sỡ và "màu mè" cũ, chuyển sang phong cách phẳng (Flat Design) và thanh lịch.
  - Loại bỏ hoàn toàn viền đen sẫm dày (`3px solid #1E293B`) và bóng đổ cứng (`8px 8px 0px #1E293B`) của `.plan-profile-card`. Thay thế bằng viền Slate mảnh nhẹ (`1px solid #CBD5E1`) và bóng đổ mờ mịn siêu nhẹ (`0 4px 20px rgba(15, 23, 42, 0.03)`).
  - Thay thế badge tiêu đề `Plan Profile` màu tím neon sặc sỡ bằng một nhãn chữ tinh tế, màu trung tính nhã nhặn (nền xám Slate nhạt `#F1F5F9`, chữ xám trầm `#64748B`, viền mảnh `#E2E8F0`).
  - Giảm cỡ chữ `.profile-title` xuống `1.6rem` và độ đậm `font-weight: 800` để tiêu đề cân đối, sang trọng.
  - Tinh giản Bento Grid 4 hộp Điểm mạnh, Điểm yếu, Sở thích, Phản hồi: phẳng hoàn toàn, nền `#F8FAFC`, viền siêu mỏng `#E2E8F0`, loại bỏ transition nhấc nổi hover (`transform`) để làm cho vùng thông tin này thực sự tĩnh lặng và sạch sẽ.
  - Tinh giản các nút thao tác ở góc trên (`.back-btn-v2`, `.edit-detail-btn-v2`, `.delete-detail-btn-v2`) thành thiết kế nút phẳng modern, thanh thoát: viền mỏng `1px solid #CBD5E1`, nền trắng tinh khiết, hover đổi nền xám nhẹ, loại bỏ bóng đổ cứng thô ráp.
  - Tinh giản trạng thái `.plan-status-badge` (không viền đen thô, border transparent) và `.assessment-tool-box` (nền xám nhạt dịu mắt).
- **Làm nổi bật Plan Phase (Visual Focal Point)**: Duy trì và nâng cấp phân cấp thị giác để dẫn mắt chuyên gia xuống khu vực quản lý giai đoạn can thiệp lồng ghép bên dưới.
  - Vùng `.phase-management-card` bên dưới vẫn giữ nguyên bóng đổ cứng Slate chắc chắn (`8px 8px 0px #1E293B`) và đường viền dày (`3px solid #1E293B`) của phong cách Playful Geometric để tự động trở thành tiêu điểm làm việc chính khi phần thông tin chung chìm xuống.
  - Tương tác hàng bảng `.phase-row` trong danh sách: khi hover chuột, hàng bảng nhấc nổi 3D (`transform: translateY(-4px) scale(1.008)`), đổi nền sang tím pastel ngọt ngào `#FAF5FF` và có bóng đổ cứng Slate `6px 6px 0px #1E293B`.
- **Đóng gói sản phẩm**: Biên dịch dự án thành công 100% bằng `npm run build` qua `cmd.exe`, hoàn toàn không có lỗi TypeScript hay cú pháp, sẵn sàng hoạt động ổn định.


## [2026-05-16] - Initial Setup & Design Lab
- **Initialize**: Created React + TypeScript project using Vite.

## [2026-05-16] - AutiCare Rebranding & Tilt Buttons
- **Rebranding**: Renamed project to **AutiCare**.

## [2026-05-16] - Language Switcher (i18n) Implementation
- **Feature**: Fully implemented the **Language Switcher (VN/EN)** logic.

## [2026-05-16] - Admin Dashboard Implementation
- **New Module**: Developed the **Admin Dashboard** interface with hierarchical navigation.

## [2026-05-16] - Context-Aware Design Lab & Admin Aesthetics
- **Design Lab Refactoring**: Updated `ThemeCustomizer` to be context-aware. 

## [2026-05-16] - Bug Fixes
- **Fixes**: Resolved background customization reactivity and header button overlap.

## [2026-05-16] - Admin Dashboard: Mock Data & Custom Icons
- **Mock Data**: Updated "Exercise Levels" and "Exercise Categories" with specific requested data.
- **Hierarchy**: Implemented a **High-Contrast Tree-Line Structure** for Exercise Categories.

## [2026-05-16] - Landing Header Redesign & Neon Logo
- **Layout**: Redesigned Landing Page Header with centered Neon Blue Logo.

## [2026-05-16] - Dashboard Architecture Redesign
- **Aesthetics**: Replaced the sharp 90-degree corner with a **Floating Content Architecture** (24px rounded corners).
- **Auto-Contrast Engine**: Implemented an intelligent **Text Contrast Algorithm**.
- **Signature Theme**: Established the **Slate & Teal Premium Theme** as the default.
- **Floating Row Table**: Redesigned the data table with a unique **Card-Style Architecture**.
- **Interactive Components**: 
    - **Workspace**: Modular "Floating Island" layout with **Live Search capabilities** and an integrated **Modal System** for CRUD operations.
- **Sidebar Identity & Overhaul**:
    - **Rebranding**: Replaced "AutiCare Admin" with the high-impact **"AUTICARE"** logo (Titan One).
    - **Neon Aesthetic**: Integrated a vibrant **Blue Neon Glow** with a pulse animation.
    - **Premium Color Palette**: Transitioned from slate to a sophisticated **Midnight Indigo Gradient** (#111827 to #1E1B4B).
    - **Glassmorphism**: Implemented soft-glassmorphism hover states and enhanced **Teal Glow** indicators for active sections.
- **Header Uniformity**: Extended the **Midnight Indigo Theme** to the dashboard topbar, creating a unified shell.
- **Context-Aware Modal Titles**: Refined modal headers to display specific item types (e.g., "Create new center", "Edit level") instead of generic terms.
- **Code Integrity**: Pruned redundant CSS definitions to ensure a clean, stable stylesheet.

## [2026-05-16] - Admin Dashboard: UI Refinement
- **Fix**: Resolved a visual bug where a small white border/gap appeared at the top corners of the header.
- **Refinement**: Implemented a pixel-perfection fix using negative margins (-1px) and matching border-radii to eliminate sub-pixel anti-aliasing gaps between the header and the main container.

## [2026-05-16] - Admin Dashboard: Form Improvements
- **Feature**: Disabled browser native spellcheck for "Name" and "Description" fields in the admin modal to eliminate unwanted red squiggly lines during input.

## [2026-05-16] - Design Lab: Label Refinement
- **UX Improvement**: Updated the Design Lab with descriptive, component-specific labels (e.g., "Nền vùng Workspace chính", "Nền thanh điều hướng Topbar") instead of generic CSS keys.
- **Cleanup**: Removed redundant manual color fields and unified the dynamic list rendering.

## [2026-05-16] - Admin Dashboard: Search Functionality
- **Feature**: Implemented live search functionality that filters mock data across all columns in real-time.
- **UX**: Added an empty state message when no matching results are found.

## [2026-05-16] - Admin Dashboard: UX Refinement
- **UX**: Improved the Delete Modal with context-aware confirmation messages (e.g., "Are you sure you want to delete exercise level 'Dễ'").

## [2026-05-16] - Admin Dashboard: Hierarchical Search & Highlighting
- **Feature**: Specialized search for "Exercise Categories" that preserves parent/child context. If a sub-category matches, its parent is automatically shown.
- **Visual**: Implemented **Neon Neon Highlight** rows with a pulsing animation to emphasize search matches.

## [2026-05-16] - Admin Dashboard: Cyber Blue Search Highlight
- **Visual Improvement**: Replaced the teal highlight with a vibrant **Cyber Blue Neon** (#00F2FF).
- **Animation**: Implemented a slow, breathing pulse effect (cubic-bezier) for a premium, high-tech search experience.

## [2026-05-16] - Design Code Documentation Pages
- **New Feature**: Created 2 interactive documentation pages: `/DesignCode/Homepage` and `/DesignCode/AdminDashboard`.
- **DesignCodeHomepage.tsx**: 11 sections covering Global Tokens, Color Palette, Typography, Navbar, Hero, Mission, CTA Banner, Animations, Design Lab, i18n, and Responsive.
- **DesignCodeAdmin.tsx**: 11 sections covering Admin Tokens, Layout Architecture, Sidebar, Topbar, Data Table, Search System, Modal System, Button Variants, Badge/Status, Animations, and Admin Color Palette.
- **DesignCode.css**: Shared dark-themed documentation styling with swatches, code blocks, font specimens, and section cards.
- **Navigation**: Added `</>` icon buttons on Homepage navbar and Admin topbar for quick access.

## [2026-05-17] - Refactoring Dashboard & Center Ownership
- **Feature**: Reorganized Exercise Levels & Exercise Categories to belong to individual Centers instead of being global.
- **Folder Restructuring & Code Splitting**: Restructured components under `src/components/dashboard/` and broke the monolithic dashboard down into 7 decoupled files (Rule 10):
    - `StaffsTab.tsx`: Encapsulated staff members management.
    - `ObjectivesTab.tsx`: Encapsulated training objectives.
    - `BlogsTab.tsx`: Encapsulated blogs.
    - `CenterLevelsTab.tsx`: Encapsulated center-specific exercise levels.
    - `CenterCategoriesTab.tsx`: Encapsulated center-specific exercise categories with parent/sub hierarchy & specialized Cyber Blue search glow.
    - `CentersTab.tsx`: Handles list and CRUD of centers.
    - `CenterDetailView.tsx`: Acts as sub-tab router (Overview, Levels, Categories) for a selected Center.
- **Admin Dashboard Integration**: Updated `AdminDashboard.tsx` to handle route selection, pass center-specific data, and synchronize edits.
- **Build Stabilization**: Resolved all TypeScript, `verbatimModuleSyntax`, unused warning/error issues and established a 100% clean Vite production bundle build.

## [2026-05-17] - Center Detailed Features & Statistical Charts
- **Sub-Tabs Management**: Expanded `CenterDetailView.tsx` from 3 to 5 sub-tabs to include Center Roles (`CenterRolesTab.tsx`) and Center Staffs (`CenterStaffsTab.tsx`) directly scoped under the selected center.
- **CenterRolesTab.tsx**: Created a fully modular role & permission roster with full CRUD (Add/Edit/Delete) with a beautiful glassmorphic modal, search filtering, and VN/EN localization.
- **CenterStaffsTab.tsx**: Created a fully modular staff directory displaying name, contact info, joined date, employment status, and mapping them dynamically to custom roles inside the active center.
- **System Database Schema**: Enhanced the Center Overview panel to display standardized system schema fields (`center_id`, `center_name`, `address`, `phone_number`, `email`, `date`) directly mapped to SQLite/PostgreSQL metadata.
- **Interactive Metadata Editing**: Integrated an inline editing form popup to edit and sync center metadata instantly.
- **Secure Center Deletion**: Implemented a secure delete action button under the Overview panel with a safe double-confirmation modal requiring the user to type the center ID before deletion.
- **Interactive Statistical Analysis**: Constructed a beautiful grid section inside the Overview tab holding two pure SVG custom-designed mock charts:
    - *Chart 1*: An animated column bar chart mapping cumulative intervention hours with custom-designed HTML tooltips showing exact hours on hover.
    - *Chart 2*: An SVG linear area wave path mapping actual intervention hours against standard baseline curves.
    - Both charts are clearly labeled with a breathing neon teal pulsing badge: "Biểu đồ ví dụ" (VN) / "Example Chart" (EN).
- **Styling**: Appended rich animations, tooltips, grid lines, and glowing gradients inside `AdminDashboard.css`.
- **Build Verification**: Compiled the entire project with `npm run build` resulting in a 100% clean production bundle without warnings or TypeScript type errors.

## [2026-05-17] - Premium Slate Theme Restoration
- **CSS Variable Restoration**: Restored the Slate & Teal premium palette variables in `.admin-theme-root` in `src/index.css` as the CSS stylesheet default colors. This eliminates any flash of wrong background colors or fallback to muddy green (#e6eac2).
- **Hardened Theme Sync**: Integrated `.admin-theme-root` class into the top-level parent wrapper in `src/App.tsx` and implemented a requestAnimationFrame and documentElement fallback logic inside `src/components/ThemeCustomizer.tsx`'s useEffect to guarantee successful visual theme synchronization 100% of the time, even during fast transitions or mount renders.
- **Verification**: Verified and compiled with a 100% clean, error-free Vite production build.

## [2026-05-18] - Discord-style Center Roles & Locked Default Roles
- **Reorder priority with HTML5 Drag & Drop**: Implemented a vertical list in the left pane of `CenterRolesTab.tsx` with a grab handle `⣿` and standard HTML5 events. As users drag, roles swap positions instantly in real-time, just like Discord roles reordering. The system automatically recalculates and saves `priority` based on index.
- **Locked System Default Roles**: Auto-initialized 3 system-defined roles (`Center Director`, `Clinical Doctor`, `Intervention Teacher`) with `isDefault: true`. In accordance with your comments, these roles are made **completely read-only**—their name inputs, status dropdowns, delete buttons, and permission slide-switches are strictly disabled and styled in a clean, locked gray layout to prevent unauthorized modifications.
- **Predefined System Permissions**: Established 8 modular permissions (`manage_center`, `manage_staffs`, `manage_roles`, `view_analytics`, `manage_levels`, `manage_categories`, `manage_exercises`, `manage_blogs`) complete with icons and bilingual descriptions. Toggling them for custom roles synchronizes the parent state instantly.
- **Reactive Sync & Auto-Saved Indicator**: Added a flashing neon green indicator in the top-right reading "✨ Đã tự động lưu / Auto-synced" that triggers on reordering, renaming, status shifts, or toggled switches.
- **Mock Database Alignment**: Re-structured center mock models in `AdminDashboard.tsx` to hold the custom `permissions` array, `priority` ranking, and `isDefault` flags. Synchronized staff `roleId` values for Hanoi, Saigon, and Danang.
- **Build Verification**: Executed `npm run build`, compiling Vite and TypeScript successfully with zero compiler warnings or type mismatch errors.

## [2026-05-18] - High-Fidelity Sliding Role Dragging Animation
- **Sliding Translation Effect**: Upgraded the vertical dragging interaction in `CenterRolesTab.tsx` with a highly optimized sliding translation effect. Instead of snapping instantly, cards now animate smoothly and slide by exactly `62px` (card height + gap) to physically open up space for the dragged item as the mouse hovers over different indexes.
- **De-jittered Dragging State**: The actual list array mutation and state synchronization are deferred until the drop event (`onDragEnd`), ensuring zero visual jitter, layout jumping, or state feedback loops during mouse movement.
- **Build Verification**: Compiled the entire project successfully with a 100% clean `npm run build` output.

## [2026-05-18] - Manual Save Bar & Unsaved Changes Warning Panel
- **Feature**: Replaced the automatic instant save-to-database behavior in `CenterRolesTab.tsx` with a manual commit workflow.
- **Local State Buffer**: Integrated `initialRoles` and `currentRoles` state comparison buffers. All reordering, name edits, status adjustments, permission toggles, creation, and deletion are now kept local in the user's pending state.
- **Discord-style Floating Warning Bar**: Developed a gorgeous, glassmorphic dark floating bottom warning bar (`⚠️ Cẩn thận! Bạn có những thay đổi chưa lưu.`) that slides up smoothly from the bottom with a 3D elastic spring transform (`translateY(0)`) only when a discrepancy exists between `currentRoles` and `initialRoles`.
- **Auto-Detect Reversion**: If the user edits a field and then manually changes it back to match the original state exactly, the system automatically detects the match and slides the warning bar away (`translateY(100px)`) without requiring any button clicks.
- **Action Handlers**:
    - **Lưu thay đổi (Save Changes)**: Synchronizes the pending local state with the parent database, updates `initialRoles` to clear the diff, slides the warning bar away, and triggers a flashing green success toast ("✨ Đã lưu thay đổi thành công").
    - **Hủy bỏ (Discard Changes)**: Reverts the current local state back to the initial roles, restoring all fields and order immediately, and slides the warning bar away.
- **Visual Validation**: Verified all actions interactively via browser automation and confirmed that the floating bar matches the high-end AutiCare premium dark indigo design language.
- **Build Verification**: Compiled the workspace successfully with a 100% clean production build (`npm run build`).

## [2026-05-18] - Global Theme Background Mismatch Fix
- **Bug Fix**: Resolved a critical theme style leakage bug where returning to the Landing Page after visiting the Admin Dashboard caused the homepage background below the header to render in pitch-black/slate color (#0F172A) instead of the light warm cream (#FFF8D1) of the brand design.
- **React DOM Reuse**: Added unique React `key` props (`key="admin-view"` and `key="landing-view"`) to the wrapping `div` elements inside `src/App.tsx` to force React to unmount the reused DOM elements, completely resetting any inline style overrides when transitioning between views.
- **ThemeCustomizer Refinement**: Hardened the target selector inside `src/components/ThemeCustomizer.tsx`'s theme-syncing effect to target the `.admin-theme-root` element exclusively without falling back to the global `document.documentElement` for the admin view. This fully isolates theme color scopes.
- **Visual Verification**: Verified in browser tests that switching back and forth from the Admin Dashboard completely resets the Landing Page background to a beautiful, uniform cream color.
- **Build Verification**: Compiled the workspace successfully with a 100% clean production build (`npm run build`).

## [2026-05-18] - Homepage Redesign & 3D Interactive Particle Overhaul
- **Thiết kế & Nâng cấp Giao diện Trang chủ**: Thay đổi hoàn chỉnh diện mạo trang chủ (trừ Header) thành một thiết kế siêu cao cấp, hiện đại, sử dụng bảng màu hài hòa, tinh tế kết hợp nền kem ấm (#FFF8F0) và các đường nét bo góc mềm mại, sang trọng.
- **ThreeBackground.tsx**: Tích hợp nền WebGL 3D tương tác sử dụng Three.js để render một quả cầu hạt phát sáng rực rỡ (Particle Sphere Shell) chuyển động xoay chậm. Hệ thống tự động bám theo tọa độ con trỏ chuột của người dùng để dịch chuyển camera 3D (Parallax Effect), đồng thời tích hợp `IntersectionObserver` giúp tự động tạm dừng render khi người dùng cuộn trang khỏi vùng Hero, giảm tải 100% cho GPU/CPU.
- **Tách cấu trúc Modular (Rule 10 & 11)**: Chia nhỏ trang chủ monolithic cũ thành các Component riêng biệt, dễ bảo trì:
    - `FloatingNav.tsx`: Bảng dấu chấm tròn glassmorphic lơ lửng điều hướng nhanh 5 Section.
    - `HeroSection.tsx`: Banner chính với các nút nghiêng 3D (`TiltButton`) tương tác cao.
    - `CategoriesSection.tsx`: Lưới bento hiển thị 4 nhóm dịch vụ chẩn đoán & can thiệp sớm của trẻ bằng các thẻ bento bo góc sang trọng, phát sáng viền.
    - `ReviewsSection.tsx`: Hộp chứa trích dẫn nhận xét chân thực từ cha mẹ và bác sĩ với viền dạ quang neon dịu nhẹ.
    - `AboutSection.tsx`: Bảng số liệu thống kê trực quan với đồ họa số và huy hiệu sáng lấp lánh.
    - `CtaSection.tsx`: Khung chuyển đổi lớn màu gradient thu hút hành động đăng ký.
    - `Footer.tsx`: Chân trang chuyên nghiệp ghi nhận rõ ràng nhóm phát triển gồm Lê Nhựt Anh, Huỳnh Hoàng Tỹ, Nguyễn Lê Khắc Vũ, Đặng Công Khanh, Phan việt Phát và Mentor Quách Luyl Đa.
- **Đồng bộ Cuộn trang (Scroll Snapping & Section Observer)**:
    - Áp dụng kỹ thuật cuộn trang nguyên bản (`scroll-snap-type: y mandatory`) trên màn hình máy tính (Desktop) giúp trải nghiệm lướt qua từng Section mượt mà như một slide trình chiếu, đồng thời tự động vô hiệu hóa trên điện thoại di động (Mobile) để duy trì khả năng đọc bình thường.
    - Sử dụng `IntersectionObserver` trong `src/App.tsx` để đồng bộ hóa và phát sáng tiêu đề danh mục Navbar lẫn các dấu chấm tròn bên phải theo thời gian thực tương ứng với vùng cuộn hiện tại của người dùng.
- **Đa Ngôn Ngữ Song Hành (Bilingual Translation)**: Tích hợp hoàn toàn các bản dịch Việt - Anh chi tiết cho tất cả các thẻ nội dung mới, hỗ trợ cập nhật trạng thái ngôn ngữ qua nút switch VN/EN.
- **Build Verification**: Biên dịch toàn bộ hệ thống sang phiên bản đóng gói sản phẩm (`npm run build`) thành công 100% không cảnh báo lỗi TypeScript hay CSS.

## [2026-05-18] - Final Landing Page Refinement & Visual Verification
- **Vite Build Stabilization**: Loại bỏ prop `setView` không dùng trong [HeroSection.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/components/homepage/HeroSection.tsx) và cập nhật đồng bộ trong [App.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/App.tsx) để giải quyết dứt điểm lỗi biên dịch TypeScript `TS6133`, giúp chạy lệnh build thành công 100% không lỗi hay cảnh báo.
- **Scroll Snapping & Footer Fix**: Di chuyển thẻ [Footer.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/components/homepage/Footer.tsx) từ bên ngoài vào bên trong thẻ `<main>` để đưa tất cả các phần cuộn về cùng một cấp cha, đồng thời định nghĩa `scroll-snap-align: end` cho lớp `.footer-section`. Điều này loại bỏ hoàn toàn lỗi kẹt cuộn snap ranh giới (cross-boundary), giúp trang snap mượt mà vào Footer và điều hướng nhanh bằng dot menu hoạt động hoàn hảo 100%.
- **Interactive 3D WebGL Constellation**: Thay thế nền đóm màu tĩnh đơn điệu bằng một **Mạng lưới Thần kinh 3D Tương tác (glowing 3D constellation neural network)** trong [ThreeBackground.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/components/homepage/ThreeBackground.tsx) với 110 nút phát sáng neon tự động trôi nổi, kết nối bằng các đường dây thần kinh mảnh có độ mờ giảm dần theo khoảng cách. Tích hợp lực hút vật lý kéo các nút bám sát theo tọa độ chuột và tự động vẽ các luồng ánh sáng neon kết nối trực tiếp từ con trỏ chuột của người dùng đến các nút xung quanh khi di chuột, mang lại hiệu ứng thị giác đỉnh cao, biểu thị trực quan cho y học can thiệp sớm của AutiCare.
- **Visual Verification**: Thực hiện kiểm định trực quan tự động bằng tác nhân trình duyệt (Browser Subagent), xác nhận bố cục đôi Hero, nền tinh vân 3D tương tác tuyệt đẹp, vị trí căn giữa hoàn hảo của các nút 3D Bento, các nội dung trích dẫn phụ huynh bằng tiếng Việt và cuộn snap chân trang khớp 100% thiết kế cao cấp.
- **Tài liệu hóa**: Cập nhật báo cáo thiết kế trong [context.md](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/context.md) và ghi nhận nhật ký phát triển đầy đủ.
# Project Logs

## [2026-05-16] - Initial Setup & Design Lab
- **Initialize**: Created React + TypeScript project using Vite.

## [2026-05-16] - AutiCare Rebranding & Tilt Buttons
- **Rebranding**: Renamed project to **AutiCare**.

## [2026-05-16] - Language Switcher (i18n) Implementation
- **Feature**: Fully implemented the **Language Switcher (VN/EN)** logic.

## [2026-05-16] - Admin Dashboard Implementation
- **New Module**: Developed the **Admin Dashboard** interface with hierarchical navigation.

## [2026-05-16] - Context-Aware Design Lab & Admin Aesthetics
- **Design Lab Refactoring**: Updated `ThemeCustomizer` to be context-aware. 

## [2026-05-16] - Bug Fixes
- **Fixes**: Resolved background customization reactivity and header button overlap.

## [2026-05-16] - Admin Dashboard: Mock Data & Custom Icons
- **Mock Data**: Updated "Exercise Levels" and "Exercise Categories" with specific requested data.
- **Hierarchy**: Implemented a **High-Contrast Tree-Line Structure** for Exercise Categories.

## [2026-05-16] - Landing Header Redesign & Neon Logo
- **Layout**: Redesigned Landing Page Header with centered Neon Blue Logo.

## [2026-05-16] - Dashboard Architecture Redesign
- **Aesthetics**: Replaced the sharp 90-degree corner with a **Floating Content Architecture** (24px rounded corners).
- **Auto-Contrast Engine**: Implemented an intelligent **Text Contrast Algorithm**.
- **Signature Theme**: Established the **Slate & Teal Premium Theme** as the default.
- **Floating Row Table**: Redesigned the data table with a unique **Card-Style Architecture**.
- **Interactive Components**: 
    - **Workspace**: Modular "Floating Island" layout with **Live Search capabilities** and an integrated **Modal System** for CRUD operations.
- **Sidebar Identity & Overhaul**:
    - **Rebranding**: Replaced "AutiCare Admin" with the high-impact **"AUTICARE"** logo (Titan One).
    - **Neon Aesthetic**: Integrated a vibrant **Blue Neon Glow** with a pulse animation.
    - **Premium Color Palette**: Transitioned from slate to a sophisticated **Midnight Indigo Gradient** (#111827 to #1E1B4B).
    - **Glassmorphism**: Implemented soft-glassmorphism hover states and enhanced **Teal Glow** indicators for active sections.
- **Header Uniformity**: Extended the **Midnight Indigo Theme** to the dashboard topbar, creating a unified shell.
- **Context-Aware Modal Titles**: Refined modal headers to display specific item types (e.g., "Create new center", "Edit level") instead of generic terms.
- **Code Integrity**: Pruned redundant CSS definitions to ensure a clean, stable stylesheet.

## [2026-05-16] - Admin Dashboard: UI Refinement
- **Fix**: Resolved a visual bug where a small white border/gap appeared at the top corners of the header.
- **Refinement**: Implemented a pixel-perfection fix using negative margins (-1px) and matching border-radii to eliminate sub-pixel anti-aliasing gaps between the header and the main container.

## [2026-05-16] - Admin Dashboard: Form Improvements
- **Feature**: Disabled browser native spellcheck for "Name" and "Description" fields in the admin modal to eliminate unwanted red squiggly lines during input.

## [2026-05-16] - Design Lab: Label Refinement
- **UX Improvement**: Updated the Design Lab with descriptive, component-specific labels (e.g., "Nền vùng Workspace chính", "Nền thanh điều hướng Topbar") instead of generic CSS keys.
- **Cleanup**: Removed redundant manual color fields and unified the dynamic list rendering.

## [2026-05-16] - Admin Dashboard: Search Functionality
- **Feature**: Implemented live search functionality that filters mock data across all columns in real-time.
- **UX**: Added an empty state message when no matching results are found.

## [2026-05-16] - Admin Dashboard: UX Refinement
- **UX**: Improved the Delete Modal with context-aware confirmation messages (e.g., "Are you sure you want to delete exercise level 'Dễ'").

## [2026-05-16] - Admin Dashboard: Hierarchical Search & Highlighting
- **Feature**: Specialized search for "Exercise Categories" that preserves parent/child context. If a sub-category matches, its parent is automatically shown.
- **Visual**: Implemented **Neon Neon Highlight** rows with a pulsing animation to emphasize search matches.

## [2026-05-16] - Admin Dashboard: Cyber Blue Search Highlight
- **Visual Improvement**: Replaced the teal highlight with a vibrant **Cyber Blue Neon** (#00F2FF).
- **Animation**: Implemented a slow, breathing pulse effect (cubic-bezier) for a premium, high-tech search experience.

## [2026-05-16] - Design Code Documentation Pages
- **New Feature**: Created 2 interactive documentation pages: `/DesignCode/Homepage` and `/DesignCode/AdminDashboard`.
- **DesignCodeHomepage.tsx**: 11 sections covering Global Tokens, Color Palette, Typography, Navbar, Hero, Mission, CTA Banner, Animations, Design Lab, i18n, and Responsive.
- **DesignCodeAdmin.tsx**: 11 sections covering Admin Tokens, Layout Architecture, Sidebar, Topbar, Data Table, Search System, Modal System, Button Variants, Badge/Status, Animations, and Admin Color Palette.
- **DesignCode.css**: Shared dark-themed documentation styling with swatches, code blocks, font specimens, and section cards.
- **Navigation**: Added `</>` icon buttons on Homepage navbar and Admin topbar for quick access.

## [2026-05-17] - Refactoring Dashboard & Center Ownership
- **Feature**: Reorganized Exercise Levels & Exercise Categories to belong to individual Centers instead of being global.
- **Folder Restructuring & Code Splitting**: Restructured components under `src/components/dashboard/` and broke the monolithic dashboard down into 7 decoupled files (Rule 10):
    - `StaffsTab.tsx`: Encapsulated staff members management.
    - `ObjectivesTab.tsx`: Encapsulated training objectives.
    - `BlogsTab.tsx`: Encapsulated blogs.
    - `CenterLevelsTab.tsx`: Encapsulated center-specific exercise levels.
    - `CenterCategoriesTab.tsx`: Encapsulated center-specific exercise categories with parent/sub hierarchy & specialized Cyber Blue search glow.
    - `CentersTab.tsx`: Handles list and CRUD of centers.
    - `CenterDetailView.tsx`: Acts as sub-tab router (Overview, Levels, Categories) for a selected Center.
- **Admin Dashboard Integration**: Updated `AdminDashboard.tsx` to handle route selection, pass center-specific data, and synchronize edits.
- **Build Stabilization**: Resolved all TypeScript, `verbatimModuleSyntax`, unused warning/error issues and established a 100% clean Vite production bundle build.

## [2026-05-17] - Center Detailed Features & Statistical Charts
- **Sub-Tabs Management**: Expanded `CenterDetailView.tsx` from 3 to 5 sub-tabs to include Center Roles (`CenterRolesTab.tsx`) and Center Staffs (`CenterStaffsTab.tsx`) directly scoped under the selected center.
- **CenterRolesTab.tsx**: Created a fully modular role & permission roster with full CRUD (Add/Edit/Delete) with a beautiful glassmorphic modal, search filtering, and VN/EN localization.
- **CenterStaffsTab.tsx**: Created a fully modular staff directory displaying name, contact info, joined date, employment status, and mapping them dynamically to custom roles inside the active center.
- **System Database Schema**: Enhanced the Center Overview panel to display standardized system schema fields (`center_id`, `center_name`, `address`, `phone_number`, `email`, `date`) directly mapped to SQLite/PostgreSQL metadata.
- **Interactive Metadata Editing**: Integrated an inline editing form popup to edit and sync center metadata instantly.
- **Secure Center Deletion**: Implemented a secure delete action button under the Overview panel with a safe double-confirmation modal requiring the user to type the center ID before deletion.
- **Interactive Statistical Analysis**: Constructed a beautiful grid section inside the Overview tab holding two pure SVG custom-designed mock charts:
    - *Chart 1*: An animated column bar chart mapping cumulative intervention hours with custom-designed HTML tooltips showing exact hours on hover.
    - *Chart 2*: An SVG linear area wave path mapping actual intervention hours against standard baseline curves.
    - Both charts are clearly labeled with a breathing neon teal pulsing badge: "Biểu đồ ví dụ" (VN) / "Example Chart" (EN).
- **Styling**: Appended rich animations, tooltips, grid lines, and glowing gradients inside `AdminDashboard.css`.
- **Build Verification**: Compiled the entire project with `npm run build` resulting in a 100% clean production bundle without warnings or TypeScript type errors.

## [2026-05-17] - Premium Slate Theme Restoration
- **CSS Variable Restoration**: Restored the Slate & Teal premium palette variables in `.admin-theme-root` in `src/index.css` as the CSS stylesheet default colors. This eliminates any flash of wrong background colors or fallback to muddy green (#e6eac2).
- **Hardened Theme Sync**: Integrated `.admin-theme-root` class into the top-level parent wrapper in `src/App.tsx` and implemented a requestAnimationFrame and documentElement fallback logic inside `src/components/ThemeCustomizer.tsx`'s useEffect to guarantee successful visual theme synchronization 100% of the time, even during fast transitions or mount renders.
- **Verification**: Verified and compiled with a 100% clean, error-free Vite production build.

## [2026-05-18] - Discord-style Center Roles & Locked Default Roles
- **Reorder priority with HTML5 Drag & Drop**: Implemented a vertical list in the left pane of `CenterRolesTab.tsx` with a grab handle `⣿` and standard HTML5 events. As users drag, roles swap positions instantly in real-time, just like Discord roles reordering. The system automatically recalculates and saves `priority` based on index.
- **Locked System Default Roles**: Auto-initialized 3 system-defined roles (`Center Director`, `Clinical Doctor`, `Intervention Teacher`) with `isDefault: true`. In accordance with your comments, these roles are made **completely read-only**—their name inputs, status dropdowns, delete buttons, and permission slide-switches are strictly disabled and styled in a clean, locked gray layout to prevent unauthorized modifications.
- **Predefined System Permissions**: Established 8 modular permissions (`manage_center`, `manage_staffs`, `manage_roles`, `view_analytics`, `manage_levels`, `manage_categories`, `manage_exercises`, `manage_blogs`) complete with icons and bilingual descriptions. Toggling them for custom roles synchronizes the parent state instantly.
- **Reactive Sync & Auto-Saved Indicator**: Added a flashing neon green indicator in the top-right reading "✨ Đã tự động lưu / Auto-synced" that triggers on reordering, renaming, status shifts, or toggled switches.
- **Mock Database Alignment**: Re-structured center mock models in `AdminDashboard.tsx` to hold the custom `permissions` array, `priority` ranking, and `isDefault` flags. Synchronized staff `roleId` values for Hanoi, Saigon, and Danang.
- **Build Verification**: Executed `npm run build`, compiling Vite and TypeScript successfully with zero compiler warnings or type mismatch errors.

## [2026-05-18] - High-Fidelity Sliding Role Dragging Animation
- **Sliding Translation Effect**: Upgraded the vertical dragging interaction in `CenterRolesTab.tsx` with a highly optimized sliding translation effect. Instead of snapping instantly, cards now animate smoothly and slide by exactly `62px` (card height + gap) to physically open up space for the dragged item as the mouse hovers over different indexes.
- **De-jittered Dragging State**: The actual list array mutation and state synchronization are deferred until the drop event (`onDragEnd`), ensuring zero visual jitter, layout jumping, or state feedback loops during mouse movement.
- **Build Verification**: Compiled the entire project successfully with a 100% clean `npm run build` output.

## [2026-05-18] - Manual Save Bar & Unsaved Changes Warning Panel
- **Feature**: Replaced the automatic instant save-to-database behavior in `CenterRolesTab.tsx` with a manual commit workflow.
- **Local State Buffer**: Integrated `initialRoles` and `currentRoles` state comparison buffers. All reordering, name edits, status adjustments, permission toggles, creation, and deletion are now kept local in the user's pending state.
- **Discord-style Floating Warning Bar**: Developed a gorgeous, glassmorphic dark floating bottom warning bar (`⚠️ Cẩn thận! Bạn có những thay đổi chưa lưu.`) that slides up smoothly from the bottom with a 3D elastic spring transform (`translateY(0)`) only when a discrepancy exists between `currentRoles` and `initialRoles`.
- **Auto-Detect Reversion**: If the user edits a field and then manually changes it back to match the original state exactly, the system automatically detects the match and slides the warning bar away (`translateY(100px)`) without requiring any button clicks.
- **Action Handlers**:
    - **Lưu thay đổi (Save Changes)**: Synchronizes the pending local state with the parent database, updates `initialRoles` to clear the diff, slides the warning bar away, and triggers a flashing green success toast ("✨ Đã lưu thay đổi thành công").
    - **Hủy bỏ (Discard Changes)**: Reverts the current local state back to the initial roles, restoring all fields and order immediately, and slides the warning bar away.
- **Visual Validation**: Verified all actions interactively via browser automation and confirmed that the floating bar matches the high-end AutiCare premium dark indigo design language.
- **Build Verification**: Compiled the workspace successfully with a 100% clean production build (`npm run build`).

## [2026-05-18] - Global Theme Background Mismatch Fix
- **Bug Fix**: Resolved a critical theme style leakage bug where returning to the Landing Page after visiting the Admin Dashboard caused the homepage background below the header to render in pitch-black/slate color (#0F172A) instead of the light warm cream (#FFF8D1) of the brand design.
- **React DOM Reuse**: Added unique React `key` props (`key="admin-view"` and `key="landing-view"`) to the wrapping `div` elements inside `src/App.tsx` to force React to unmount the reused DOM elements, completely resetting any inline style overrides when transitioning between views.
- **ThemeCustomizer Refinement**: Hardened the target selector inside `src/components/ThemeCustomizer.tsx`'s theme-syncing effect to target the `.admin-theme-root` element exclusively without falling back to the global `document.documentElement` for the admin view. This fully isolates theme color scopes.
- **Visual Verification**: Verified in browser tests that switching back and forth from the Admin Dashboard completely resets the Landing Page background to a beautiful, uniform cream color.
- **Build Verification**: Compiled the workspace successfully with a 100% clean production build (`npm run build`).

## [2026-05-18] - Homepage Redesign & 3D Interactive Particle Overhaul
- **Thiết kế & Nâng cấp Giao diện Trang chủ**: Thay đổi hoàn chỉnh diện mạo trang chủ (trừ Header) thành một thiết kế siêu cao cấp, hiện đại, sử dụng bảng màu hài hòa, tinh tế kết hợp nền kem ấm (#FFF8F0) và các đường nét bo góc mềm mại, sang trọng.
- **ThreeBackground.tsx**: Tích hợp nền WebGL 3D tương tác sử dụng Three.js để render một quả cầu hạt phát sáng rực rỡ (Particle Sphere Shell) chuyển động xoay chậm. Hệ thống tự động bám theo tọa độ con trỏ chuột của người dùng để dịch chuyển camera 3D (Parallax Effect), đồng thời tích hợp `IntersectionObserver` giúp tự động tạm dừng render khi người dùng cuộn trang khỏi vùng Hero, giảm tải 100% cho GPU/CPU.
- **Tách cấu trúc Modular (Rule 10 & 11)**: Chia nhỏ trang chủ monolithic cũ thành các Component riêng biệt, dễ bảo trì:
    - `FloatingNav.tsx`: Bảng dấu chấm tròn glassmorphic lơ lửng điều hướng nhanh 5 Section.
    - `HeroSection.tsx`: Banner chính với các nút nghiêng 3D (`TiltButton`) tương tác cao.
    - `CategoriesSection.tsx`: Lưới bento hiển thị 4 nhóm dịch vụ chẩn đoán & can thiệp sớm của trẻ bằng các thẻ bento bo góc sang trọng, phát sáng viền.
    - `ReviewsSection.tsx`: Hộp chứa trích dẫn nhận xét chân thực từ cha mẹ và bác sĩ với viền dạ quang neon dịu nhẹ.
    - `AboutSection.tsx`: Bảng số liệu thống kê trực quan với đồ họa số và huy hiệu sáng lấp lánh.
    - `CtaSection.tsx`: Khung chuyển đổi lớn màu gradient thu hút hành động đăng ký.
    - `Footer.tsx`: Chân trang chuyên nghiệp ghi nhận rõ ràng nhóm phát triển gồm Lê Nhựt Anh, Huỳnh Hoàng Tỹ, Nguyễn Lê Khắc Vũ, Đặng Công Khanh, Phan việt Phát và Mentor Quách Luyl Đa.
- **Đồng bộ Cuộn trang (Scroll Snapping & Section Observer)**:
    - Áp dụng kỹ thuật cuộn trang nguyên bản (`scroll-snap-type: y mandatory`) trên màn hình máy tính (Desktop) giúp trải nghiệm lướt qua từng Section mượt mà như một slide trình chiếu, đồng thời tự động vô hiệu hóa trên điện thoại di động (Mobile) để duy trì khả năng đọc bình thường.
    - Sử dụng `IntersectionObserver` trong `src/App.tsx` để đồng bộ hóa và phát sáng tiêu đề danh mục Navbar lẫn các dấu chấm tròn bên phải theo thời gian thực tương ứng với vùng cuộn hiện tại của người dùng.
- **Đa Ngôn Ngữ Song Hành (Bilingual Translation)**: Tích hợp hoàn toàn các bản dịch Việt - Anh chi tiết cho tất cả các thẻ nội dung mới, hỗ trợ cập nhật trạng thái ngôn ngữ qua nút switch VN/EN.
- **Build Verification**: Biên dịch toàn bộ hệ thống sang phiên bản đóng gói sản phẩm (`npm run build`) thành công 100% không cảnh báo lỗi TypeScript hay CSS.

## [2026-05-18] - Final Landing Page Refinement & Visual Verification
- **Vite Build Stabilization**: Loại bỏ prop `setView` không dùng trong [HeroSection.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/components/homepage/HeroSection.tsx) và cập nhật đồng bộ trong [App.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/App.tsx) để giải quyết dứt điểm lỗi biên dịch TypeScript `TS6133`, giúp chạy lệnh build thành công 100% không lỗi hay cảnh báo.
- **Scroll Snapping & Footer Fix**: Di chuyển thẻ [Footer.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/components/homepage/Footer.tsx) từ bên ngoài vào bên trong thẻ `<main>` để đưa tất cả các phần cuộn về cùng một cấp cha, đồng thời định nghĩa `scroll-snap-align: end` cho lớp `.footer-section`. Điều này loại bỏ hoàn toàn lỗi kẹt cuộn snap ranh giới (cross-boundary), giúp trang snap mượt mà vào Footer và điều hướng nhanh bằng dot menu hoạt động hoàn hảo 100%.
- **Interactive 3D WebGL Constellation**: Thay thế nền đóm màu tĩnh đơn điệu bằng một **Mạng lưới Thần kinh 3D Tương tác (glowing 3D constellation neural network)** trong [ThreeBackground.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/components/homepage/ThreeBackground.tsx) với 110 nút phát sáng neon tự động trôi nổi, kết nối bằng các đường dây thần kinh mảnh có độ mờ giảm dần theo khoảng cách. Tích hợp lực hút vật lý kéo các nút bám sát theo tọa độ chuột và tự động vẽ các luồng ánh sáng neon kết nối trực tiếp từ con trỏ chuột của người dùng đến các nút xung quanh khi di chuột, mang lại hiệu ứng thị giác đỉnh cao, biểu thị trực quan cho y học can thiệp sớm của AutiCare.
- **Visual Verification**: Thực hiện kiểm định trực quan tự động bằng tác nhân trình duyệt (Browser Subagent), xác nhận bố cục đôi Hero, nền tinh vân 3D tương tác tuyệt đẹp, vị trí căn giữa hoàn hảo của các nút 3D Bento, các nội dung trích dẫn phụ huynh bằng tiếng Việt và cuộn snap chân trang khớp 100% thiết kế cao cấp.
- **Tài liệu hóa**: Cập nhật báo cáo thiết kế trong [context.md](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/context.md) và ghi nhận nhật ký phát triển đầy đủ.

## [2026-05-18] - Three.js WebGL Restoration & Buffer Optimization
- **WebGL Constellation Loop Fix**: Phục hồi hoàn toàn vòng lặp kết xuất Three.js bằng cách sử dụng các hàm API tiêu chuẩn của thư viện như `positionsAttr.setXYZ` và thao tác trực tiếp trên các mảng Float32 cục bộ được Three.js theo dõi qua tham chiếu (reference). Điều này khắc phục triệt để lỗi mất đồng bộ vùng nhớ đệm WebGL khiến màn hình bị đóng băng, đưa tinh vân hạt 3D trở lại trạng thái chuyển động mượt mà 60 FPS cực kỳ sinh động trên máy người dùng.
- **Build Verification**: Xác thực biên dịch dự án chạy trơn tru thông qua lệnh `npm run build` thành công 100% không cảnh báo lỗi TypeScript hay cú pháp.

## [2026-05-18] - Center Management Form Enhancement
- **Create Center Form Expansion**: Bổ sung thêm các trường quan trọng vào popup "Thêm mới trung tâm" bao gồm: `address` (Địa chỉ), `phone_number` (Số điện thoại), `email` (Thư điện tử), và `Assign center director` (Chỉ định Giám đốc Trung tâm).
- **Auto-Initialization Logic**: Cập nhật logic khi tạo Center mới. Khi người dùng nhập tên Giám đốc, hệ thống sẽ tự động khởi tạo mảng `roles` với các vai trò mặc định (Center Director, Clinical Doctor, Intervention Teacher) và tự động tạo một tài khoản staff mang role `R-DIR` trong mảng `staffs` của cơ sở mới đó.
- **UI/UX Form Grid**: Nâng cấp thiết kế form thành dạng Grid 2 cột (`grid-template-columns: 1fr 1fr; gap: 1rem;`) giúp tiết kiệm không gian và bố cục chuyên nghiệp, giữ vững triết lý thiết kế AutiCare cao cấp.
- **Form Refinement**: Đã loại bỏ hoàn toàn trường `Status` (Trạng thái) khỏi popup Thêm/Sửa trung tâm theo yêu cầu của người dùng để làm gọn UI, trạng thái mặc định ngầm định là Active khi tạo mới.
- **Action Buttons Synchronization**: Đổi tên tiêu đề thành "Manage center" ("Quản lý trung tâm"). Đồng bộ cột Actions của bảng Center thành 3 nút Icon (View, Edit, Delete) giống với các tab Manage Staff/Objective. Tích hợp trực tiếp popup Edit/Delete ngay tại dòng bảng.
- **Center Detail View Cleanup**: Đơn giản hóa giao diện thông tin chi tiết trung tâm bằng cách gỡ bỏ các đoạn text mô tả dài dòng ("The center provides...", "System Database Schema Fields..."). Xóa bỏ hoàn toàn nút `Edit Information` và `Delete Center` bên trong Detail View vì các tính năng này đã được di chuyển ra bảng quản lý tổng bên ngoài. Đổi tiêu đề khối thông tin thành "Center detail" (EN) và "Chi tiết trung tâm" (VN).
- **Centers List View Tweaks**: Gỡ bỏ cột `Created At` khỏi bảng danh sách trung tâm. Khắc phục lỗi thụt lề/padding bên phải của danh sách bằng cách áp dụng thống nhất class `.dashboard-content-area` chuẩn, giúp bảng căn lề phải hoàn hảo như các tab Manage Staff/Objective. Thay thế hoàn toàn cột hiển thị `Status` (Trạng thái) thành cột `Giám đốc trung tâm` (Center Director) được trích xuất động từ danh sách nhân sự của cơ sở. Tăng khoảng cách (width) cho cột ID lên 150px để tạo độ thoáng chuẩn mực với cột Tên trung tâm.
- **Center Detail Enhancement**: Tự động tra cứu và bổ sung thông tin "Giám đốc trung tâm" (Center Director) dựa vào dữ liệu Role `R-DIR` trong danh sách staffs nội bộ và hiển thị trực tiếp lên bảng thông tin chi tiết. Gỡ bỏ hiển thị các kiểu dữ liệu database như `[nvarchar]`, `[varchar]` ở các nhãn thông tin và hỗ trợ hiển thị song ngữ Tiếng Anh đầy đủ cho khu vực này.

## [2026-05-19] - UX/UI Action Buttons Restructuring
- **Action Buttons Relocation**: Di dời 2 nút `Edit` và `Delete` từ cột Actions ở danh sách Manage Center (`CentersTab.tsx`) vào lại bên trong phần Chi tiết cơ sở (`CenterDetailView.tsx`).
- **Detail View UI/UX**: Tích hợp nút `Chỉnh sửa thông tin` và `Xóa cơ sở` một cách hài hòa cạnh tiêu đề `Chi tiết trung tâm`, sử dụng hiệu ứng hover nổi bật theo phong cách thiết kế của AutiCare (nút xóa có viền đỏ nhạt và chữ đỏ báo động). Việc này giúp tinh gọn bảng danh sách và đảm bảo người dùng phải xem kỹ chi tiết cơ sở trước khi thực hiện các hành động nguy hiểm như xóa hay sửa.

## [2026-05-19] - Center Information Editing Upgrade
- **Director Editing**: Bổ sung trường "Giám đốc Trung tâm (Director)" vào form Chỉnh sửa thông tin cơ sở trong `CenterDetailView.tsx`.
- **Dynamic Roster Sync**: Cập nhật logic khi lưu thông tin: hệ thống tự động tìm và thay đổi tên của nhân viên có `roleId` là `R-DIR` (Giám đốc). Nếu xóa tên, hệ thống tự động loại bỏ role này khỏi danh sách. Nếu thêm mới khi chưa có, tự động tạo mới nhân sự giữ vị trí Giám đốc với chuẩn ID động `S-XXXX`. Đảm bảo tính nhất quán dữ liệu giữa cấu hình cơ sở và danh sách staffs nội bộ.

## [2026-05-21] - Trang chọn Bài test Sàng lọc & Tích hợp Design Lab
- **Phát triển ScreeningPage.tsx & ScreeningPage.css**: 
    - Xây dựng trang giao diện độc lập với nền tối cao cấp Slate & Indigo lôi cuốn, cung cấp bộ 10 công cụ lâm sàng chuẩn hóa chia làm 4 nhóm lớn (Chẩn đoán Chuyên sâu, Sàng lọc Nhanh, Hành vi Thích ứng & Kỹ năng, Tâm vận động Tổng quát).
    - Hỗ trợ hiển thị song ngữ Việt - Anh toàn diện cho tất cả thông tin giới thiệu, nhóm và chi tiết của từng bài test sàng lọc.
    - Thiết kế Glassmorphism tối cực kỳ premium với hiệu ứng Neon Cyber Blue phát sáng khi chọn nhóm, các góc bo tròn nhẹ nhàng 24px sang trọng, Responsive hoàn chỉnh 100% trên Mobile và Desktop.
    - Xây dựng Popup Modal kính mờ (Bilingual Modal) hiển thị các thông tin lâm sàng chi tiết của bài test: Đối tượng/Độ tuổi, Thời gian trung bình, Chuyên viên thực hiện, Mục đích chính.
    - Đồng bộ trạng thái bài test: PEP-3 hiển thị "Có sẵn / Available", các công cụ khác hiển thị "Sắp ra mắt / Coming Soon". Bấm "Thực hiện bài test" đối với PEP-3 sẽ kích hoạt Toast lấp lánh phản hồi ngữ cảnh (hướng dẫn mở khóa sau Children Profile), bấm đăng ký nhận thông báo đối với các công cụ còn lại.
- **Tích hợp & Khai báo View**: 
    - Khai báo view `'screening'` trong `src/App.tsx`, bọc trong `.screening-theme-root` để cách ly giao diện.
    - Liên kết click button "BẮT ĐẦU SÀNG LỌC" từ `HeroSection.tsx` đến trang Sàng lọc thông qua prop `onStartScreening`.
- **Mở rộng Smart Design Lab (ThemeCustomizer.tsx)**:
    - Mở rộng hỗ trợ view `'screening'`, cho phép chỉnh sửa trực tiếp 6 biến màu đặc trưng của trang Sàng lọc (`--screening-bg`, `--screening-card-bg`, `--screening-accent`, `--screening-border-neon`, `--screening-text`, `--screening-text-muted`) theo thời gian thực.
    - Đảm bảo cơ chế cách ly tuyệt đối, không làm rò rỉ giao diện (leak) khi quay trở về Landing Page.
- **TypeScript Stabilization**:
    - Khắc phục triệt để 2 lỗi biên dịch TypeScript `TS6133` (unused variables: `lang` trong `ReadModal` và `setPlanPhase` trong `ObjectivesTab.tsx`).
- **Build Verification**:
    - Chạy thử nghiệm và biên dịch thành công 100% dự án thông qua lệnh `npm run build` với đầu ra tối ưu, không có lỗi hay cảnh báo nào.

## [2026-05-21] - Tái thiết kế Tông màu Sáng ấm Trang Sàng lọc (Homepage Theme)
- **Tái thiết kế giao diện (`ScreeningPage.css`)**:
    - Thay đổi toàn diện giao diện từ tông tối Cyber/Neon trước đó sang tông màu sáng kem ấm áp chuyên nghiệp (Pastel Slate & Teal kem sáng ấm #FFF8F0), phù hợp tối đa cho bác sĩ lâm sàng và giáo viên sử dụng lâu dài.
    - Chuyển nền trang chính sang dạng gradient kem ấm mượt mà (`#FFF8F0` kết hợp `#FFFBEB`).
    - Thiết kế lại header `.screening-header` sang nền trắng mờ bán trong suốt kết hợp viền mòng két nhạt. Đổi màu chữ tiêu đề tối lịch lãm sang mòng két đậm (#0D9488).
    - Sidebar `.group-card` & `.group-icon` chuyển sang dạng thẻ kem sữa mịn, active hiển thị viền Teal và vạch biên trái. Màu chữ active là Teal đậm.
    - Thay đổi `.tool-card` sang nền trắng sữa sạch sẽ, viền mảnh mịn màng, loại bỏ hoàn toàn các vệt phát sáng neon, đổ bóng mờ dịu mắt (soft shadow).
    - Nút bấm `.btn-card-action` và `.btn-start` chuyển sang màu mòng két ấm áp y tế (Teal #0D9488), hover nổi bật phẳng trực quan.
    - Hộp thoại chi tiết Modal `.modal-content-wrapper` nền trắng kem ấm áp, các bảng thông số lâm sàng nền kem nhạt dịu mắt, overlay mờ sáng tinh tế.
    - Thiết kế lại Toast cảnh báo phông nền trắng thanh lịch, viền mòng két nhạt.
- **Cập nhật Design Lab (`ThemeCustomizer.tsx`)**:
    - Đồng bộ màu sắc mặc định của `screeningColors` sang tông sáng ấm y tế.
    - Cập nhật nhãn hiển thị trong Smart Design Lab từ *"Màu viền Neon nổi bật (Cyber)"* sang *"Màu viền nổi bật (Accent)"*.
- **Xác thực Biên dịch (Build Verification)**:
    - Chạy kiểm thử thành công lệnh biên dịch đóng gói sản phẩm `npm run build` đạt tỉ lệ thành công 100% không cảnh báo hay lỗi cú pháp/TypeScript.

## [2026-05-21] - Tái Cấu Trúc Toàn Diện Mô-đun Đánh giá Công cụ (Tool Assessment)
- **Tái cấu trúc Thư mục và Tập tin (Rule 2)**:
    - Di chuyển và đổi tên cấu trúc thư mục từ `src/components/screening/` sang `src/components/assessment/` chuyên nghiệp, dễ quản lý hơn.
    - Đổi tên tệp giao diện và logic từ `ScreeningPage.tsx` / `ScreeningPage.css` thành `ToolAssessmentPage.tsx` / `ToolAssessmentPage.css`.
    - Xóa sạch hoàn toàn thư mục cũ `src/components/screening/` để tránh dư thừa mã nguồn.
- **Cập nhật mã nguồn và Logic giao diện (`ToolAssessmentPage.tsx` & `ToolAssessmentPage.css`)**:
    - Đổi tên component chính từ `ScreeningPage` sang `ToolAssessmentPage`.
    - Cập nhật toàn bộ các class CSS từ dạng `.screening-*` sang `.assessment-*`.
    - Chuyển đổi toàn bộ các biến CSS tùy chỉnh từ `--screening-*` sang `--assessment-*`.
    - Điều chỉnh thuật ngữ hiển thị từ "Sàng lọc / Screening" sang "Đánh giá công cụ / Tool Assessment" để khớp chuẩn chuyên môn y tế.
    - Duy trì hỗ trợ song ngữ Việt - Anh đầy đủ cho cả 10 công cụ lâm sàng trong 4 nhóm và các modal chi tiết.
- **Cập nhật các Tệp tin Phụ thuộc**:
    - **`src/App.tsx`**: Cập nhật đường dẫn import từ `ToolAssessmentPage`, chuyển đổi route view từ `'screening'` sang `'assessment'`, và cập nhật bản dịch tiếng Việt / tiếng Anh trong từ điển ngôn ngữ.
    - **`src/components/homepage/HeroSection.tsx`**: Cập nhật callback từ `onStartScreening` thành `onStartAssessment` và thay đổi nhãn nút bấm tương ứng.
    - **`src/components/ThemeCustomizer.tsx`**: Đổi tên bộ biến màu mặc định thành `assessmentColors`, ánh xạ các biến CSS `--assessment-*` trong Design Lab, và định vị chính xác vùng cách ly `.assessment-theme-root` giúp thay đổi giao diện theo thời gian thực mà không ảnh hưởng tới trang khác (Rule 5).
    - Chạy thành công lệnh `npm.cmd run build` trên hệ thống Windows, đạt tỉ lệ biên dịch thành công 100% không phát sinh bất kỳ lỗi TypeScript hay CSS nào.

## [2026-05-21] - Áp dụng Playful Geometric Design System cho Trang Tool Assessment
- **Triết lý thiết kế "Medical Playful"**: Áp dụng phong cách **Playful Geometric** (cảm hứng Memphis Group hiện đại) pha trộn chuyên nghiệp y tế — cấu trúc nội dung nghiêm túc, decoration xung quanh sống động và có cá tính. Phương châm "Stable Grid, Wild Decoration".
- **Viết lại hoàn toàn `ToolAssessmentPage.css`**:
    - **Dot-grid pattern background**: Nền `#FFFDF5` (warm cream) kết hợp polka-dot pattern SVG (`radial-gradient` 28px) cố định `background-attachment: fixed` tạo chiều sâu trực quan.
    - **Hệ thống Hard Shadow**: Định nghĩa đầy đủ `--shadow-sm/md/lg/hover/active` dạng hard offset (`4px 4px 0px #1E293B`) theo đúng đặc tả Playful Geometric — không blur, chỉ offset màu tối.
    - **4 màu nhóm công cụ lâm sàng**: Mỗi nhóm có màu định danh riêng: Nhóm 1 Chẩn đoán chuyên sâu (Amber `#FBBF24`), Nhóm 2 Sàng lọc Nhanh (Pink `#F472B6`), Nhóm 3 Hành vi Thích ứng (Violet `#8B5CF6`), Nhóm 4 Tâm vận động (Blue `#60A5FA`).
    - **Floating Decoration Shapes**: Thêm 4 hình trang trí nền tuyệt đối — 2 dashed circle (amber/pink), 1 spinning triangle (violet), 1 rotating square (blue) — hoạt ảnh float/spin chậm nhẹ nhàng, ẩn hoàn toàn trên mobile.
    - **Sticker Card — Group Cards**: Mỗi group card active hiển thị `border: 2px solid [group-color]` + hard shadow màu tương ứng nhóm. Hover: `rotate(-1deg) scale(1.02)` + icon wiggle animation (`rotate: 0->-8->8->0deg`). Transition bouncy `cubic-bezier(0.34, 1.56, 0.64, 1)`.
    - **Sticker Card — Tool Cards**: `border: 2px solid #1E293B`, `box-shadow: 6px 6px 0px #E2E8F0` (soft hard shadow). Hover: `rotate(-0.6deg) translateY(-3px)`. Card Available có violet shadow `rgba(139,92,246,0.25)`.
    - **Candy Buttons**: Nút "Start Assessment" — bg violet, `border: 2px solid #1E293B`, hard shadow, hover translate-lift và shadow mở rộng. Nút "Learn More" — outline pill, hover fill Amber. Nút Notify — Amber candy.
    - **Pop Modal**: `border: 2px solid #1E293B`, `box-shadow: 12px 12px 0px #1E293B`. Header band là dot-pattern SVG (violet/amber tùy status). Entrance animation `scale(0.85) -> scale(1)` bounce. Nút close xoay 90° khi hover.
    - **Pop Toasts**: `border: 2px solid #1E293B`, `box-shadow: 5px 5px 0px #1E293B`, bounce pop entrance.
    - **Accessibility**: Tôn trọng `prefers-reduced-motion`, vô hiệu hóa wiggle/bounce/float animations khi người dùng yêu cầu. Giảm hard shadow về `3px` trên mobile.
- **Cập nhật `ToolAssessmentPage.tsx`**:
    - Thêm `groupIndexMap` record mapping `group_id -> 1|2|3|4` để CSS class `group-N` nhận diện màu nhóm.
    - Thêm 4 decoration div elements (`.assessment-deco-circle-1/2`, `.assessment-deco-triangle`, `.assessment-deco-square`) vào layout wrapper.
    - Thêm class `modal-available` / `modal-coming-soon` vào modal wrapper để CSS band header đổi màu theo trạng thái.
- **Cập nhật `ThemeCustomizer.tsx` — Design Lab**:
    - Bổ sung 4 biến màu nhóm (`--group-1-color` đến `--group-4-color`) vào `assessmentColors` state object.
    - Cập nhật `assessmentColors` default values sang palette Playful Geometric (`--assessment-accent: #8B5CF6` Violet, `--assessment-bg: #FFFDF5`).
    - Cập nhật `assessmentMap` labels với tên mô tả nhóm rõ ràng ("Màu nhóm 1 — Chẩn đoán (Amber)", v.v.).
- **Xác thực Biên dịch (Build Verification)**:
    - Chạy `npm.cmd run build`, Vite biên dịch thành công 100% (✓ 47 modules transformed, ✓ built in 262ms) không có lỗi TypeScript hay CSS.

## [2026-05-21] - Neo-Brutalism Homepage Redesign giu nguyen Palette AutiCare
- **Implementation**:
    - Tai thiet ke toan bo layer giao dien Homepage trong `src/App.css` theo ngon ngu **Neo-Brutalism**: nen giay kem co dot-grid/grid texture, vien den day 4px, hard shadow offset (`4px/8px/12px`), card dang sticker, badge xoay nhe, section title uppercase co text-shadow cung.
    - Giu nguyen bang mau AutiCare hien co va van de Design Lab dieu khien qua cac bien `--primary`, `--secondary`, `--accent`, `--bg-main`, `--text-main`. Palette chu dao tiep tuc la xanh duong `#0084FF`, xanh la `#2AC176`, do coral `#FF6B6B`, vang `#FFD93D`, nen kem `#FFF8D1`.
    - Chuyen Navbar thanh mot block noi bat o giua man hinh voi border den day, hard shadow, logo AutiCare dang sticker mau xanh duong, link hover/active dang nhan co hoc mau vang.
    - Chuyen Hero tu glassmorphism mem sang collage board: headline lon uppercase co text-shadow xanh, description nam trong sticker panel, CTA nhan co hoc, anh minh hoa dat tren panel vien den va nen vang, kem badge `EARLY INTERVENTION`, `AUTICARE`, `+ CARE`.
    - Chuyen Categories, Reviews, About, CTA, Footer sang he thong card Neo-Brutalism: card khong bo goc, border den, shadow cung, rotation nhe xen ke, hover lift va active press.
    - Loai bo blur/glass/gradient mem tren Homepage va thay bang color blocking, pattern texture, outline, shadow cung. Cac nut `TiltButton` trong `HeroSection.tsx`, `CategoriesSection.tsx`, `AboutSection.tsx`, `CtaSection.tsx` da doi `radius={0}` de khop aesthetic goc vuong.
    - Design Lab toggle va panel tren Homepage cung duoc dong bo Neo-Brutalism: panel border day, header xanh duong, nut copy mau do, input focus nen vang va shadow cung.
- **Walkthrough**:
    - Homepage van giu kien truc tach file theo Rule 10: `HeroSection`, `CategoriesSection`, `ReviewsSection`, `AboutSection`, `CtaSection`, `Footer`, `FloatingNav`; thay doi chu yeu tap trung o `App.css` de tranh tao style le tung component.
    - Nguoi dung van co nut doi ngon ngu VN/EN tren header; cac noi dung song ngu hien co khong bi thay doi.
    - Design Lab Landing tiep tuc tac dong truc tiep len palette, nhung toan bo visual moi lay cac mau nay de ve border/color-block/sticker nen khong pha vo kha nang tuy bien.
    - Responsive duoc giu va tang cuong: desktop van scroll snap, tablet chuyen grid 2 cot, mobile stack 1 cot, an floating nav va giam visual rotation de khong gay vo layout.
- **Build Verification**:
    - Da chay `npm.cmd run build`, nhung build bi chan boi loi TypeScript ngoai pham vi Homepage trong `src/components/dashboard/StaffsTab.tsx` tai dong 471 va 512: so sanh type `"view"` voi `"edit"` khong co giao nhau (`TS2367`). Cac thay doi Homepage khong tao loi TypeScript moi trong qua trinh nay.

## [2026-05-21] - Dieu chinh Header Homepage tai Zoom 100%
- **Implementation**:
    - Tang chieu ngang `.navbar` trong `src/App.css` tu `min(1180px, calc(100% - 28px))` len `min(1360px, calc(100% - 20px))` de header du dai hon tren desktop zoom 100%.
    - Override rieng `.navbar .nav-content` voi `max-width: none` va padding gon hon, tranh viec class `.container` gioi han noi dung header lam cac cum link/logo/icon bi nen.
    - Dieu chinh grid header thanh `minmax(470px, 1fr) auto minmax(430px, 1fr)` de cum nav trai, logo giua va cum icon/ngon ngu/phai/Login co khong gian can bang hon.
    - Doi mau chu logo `AUTICARE` trong `.neon-text` va `.neon-text-static` sang trang `#FFFFFF`, them `text-shadow: 2px 2px 0 #000` de chu ro hon tren nen xanh Primary Blue.
- **Walkthrough**:
    - Header van giu phong cach Neo-Brutalism: border den day, hard shadow, sticker logo va interaction co hoc.
    - Thay doi chi tac dong Homepage header/footer logo static, khong thay doi logic chuyen ngon ngu VN/EN, Design Code, Admin Dashboard hay scroll navigation.
    - Design Lab van giu kha nang doi mau Primary Blue; chu logo trang + shadow den giup dam bao do tuong phan tot hon neu nen logo tiep tuc la mau dam.
- **Build Verification**:
    - Da chay lai `npm.cmd run build`; build van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` tai dong 471 va 512 (`TS2367`). Khong ghi nhan loi moi tu thay doi CSS header.

## [2026-05-21] - Them Auth Modal Sign in / Sign up / Forgot Password cho Homepage
- **Implementation**:
    - Tao component moi `src/components/auth/AuthModal.tsx` de quan ly 3 form xac thuc trong cung mot modal: `Sign in`, `Sign up`, va `Forgot password`. Khong tao route hay page rieng, dung dung yeu cau "ko can tach ra trang khac nhau".
    - Tich hop `AuthModal` vao `src/App.tsx`, them state `isAuthModalOpen` va nut `Login` tren header Homepage. Moi lan mo modal, form mac dinh tu reset ve `Sign in`.
    - Form `Sign in` co nut **Sign in with Google**, email/password, remember me, link Forgot Password, link Register. Form `Sign up` co full name, email, password, confirm password. Form `Forgot password` co email va nut gui lien ket khoi phuc.
    - Them animation **Slip** trong `src/App.css`: khi bam `Register`, `Forgot password`, hoac quay lai `Sign in`, panel form truot ngang voi `auth-slip-forward` / `auth-slip-backward` trong cung mot modal.
    - Thiet ke modal giu dung phong cach Neo-Brutalism hien tai: overlay dot pattern, khung modal border den day, hard shadow 16px, poster ben trai mau Primary Blue, sticker `SECURE`, `CARE ID`, logo AutiCare, input border day, nut co hoc hard-shadow.
    - Ho tro song ngu theo `lang` hien co cua Homepage. Copy hien thi co ban co ca `vi` va `en`; nut chuyen VN/EN tren header van doi noi dung modal theo state ngon ngu.
    - Them responsive modal: tren mobile modal chuyen 1 cot, poster thu gon, form full width, shadow giam kich thuoc de khong tran man hinh.
- **Walkthrough**:
    - Nguoi dung bam nut `Login` tren header de mo modal. Modal luon bat dau o `Sign in`.
    - Bam `Register` o cuoi form Sign in se slip sang Sign up. Bam `Dang nhap / Sign in` trong Sign up se slip nguoc ve Sign in.
    - Bam `Forgot password?` se slip sang Forgot Password. Bam `Back to sign in` se slip nguoc ve Sign in.
    - Modal co the dong bang nut `X`, click vao overlay, hoac phim `Escape`.
- **Build Verification**:
    - Da chay `npm.cmd run build`; TypeScript khong bao loi moi tu `AuthModal.tsx`, `App.tsx`, hay `App.css`. Build van bi chan boi loi co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`).

## [2026-05-21] - Kich hoat Sign in Demo Account va Sign out tren Header
- **Implementation**:
    - Them state `currentUserName` trong `src/App.tsx` de quan ly trang thai dang nhap UI-only cho Homepage.
    - Cap nhat `AuthModal.tsx` nhan prop `onSignIn`; khi submit form Sign in hoac bam nut Sign in with Google, modal se goi `onSignIn()`, dong modal, va gan user mau la `Auticare Admin`.
    - Form Sign in hien tai khong can nhap gi. Email/password mau duoc dien san: `admin@auticare.vn` va `auticare-admin`; co them note demo trong modal de nguoi dung biet chi can bam Sign in.
    - Header Homepage sau khi dang nhap an nut Login, hien chip ten `Auticare Admin` va nut `Sign out` / `Dang xuat`. Bam Sign out se xoa state user va dua header ve trang thai Login ban dau.
    - Them CSS cho `.auth-session`, `.auth-user-chip`, `.auth-signout-btn` trong `src/App.css`, giu style Neo-Brutalism: border den day, hard shadow, chip user nen xanh la, nut sign out nen trang.
- **Walkthrough**:
    - Bam Login tren header -> modal mo mac dinh Sign in voi tai khoan mau da dien san.
    - Bam nut Sign in -> modal dong, header hien `Auticare Admin` + Sign out.
    - Bam Sign in with Google cung dang nhap demo tuong tu de phuc vu luong UI.
    - Bam Sign out -> quay lai trang thai chua dang nhap, hien lai nut Login.
- **Build Verification**:
    - Da chay lai `npm.cmd run build`; khong co loi moi tu auth demo state. Build van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`).

## [2026-05-21] - Chuan hoa Font Homepage va Thu gon Mat do Hien thi 100% Zoom
- **Implementation**:
    - Cap nhat `src/App.css` de ep font `Be Vietnam Pro` cho noi dung Homepage ngoai Header: `main`, cac section, Footer, FloatingNav, Auth Modal va Design Lab Landing. Header duoc giu scope rieng, logo AutiCare van dung `Titan One` theo nhan dien hien co.
    - Loai bo viec ep font truc tiep len `.nav-links a` trong nhom rule chung cua Homepage, tranh Header bi keo theo cac rule typography cua body section.
    - Thu gon kich co homepage theo cam giac zoom 90% tai muc browser zoom 100%: giam `padding-top` desktop section, max-width container tu 1200px ve 1080px, giam font headline/section title, giam padding/gap cua Hero, cards, Reviews, About, CTA va Footer.
    - Giam kich thuoc Hero image, card min-height, text body trong card, spacing Footer va padding cac nut TiltButton de cac section vua viewport hon ma khong doi palette, border, hard shadow hay phong cach Neo-Brutalism hien co.
- **Walkthrough**:
    - Khi xem o zoom 100%, moi section Homepage co mat do tuong duong truoc day khi zoom 90%, giup han che mat noi dung o canh duoi/canh phai trong scroll snap desktop.
    - Header khong bi thiet ke lai; thay doi font/scale tap trung vao vung noi dung ben duoi Header.
    - Design Lab van tiep tuc dieu khien palette AutiCare qua cac CSS variables hien co.
- **Build Verification**:
    - Da chay `npm.cmd run build`; khong ghi nhan loi moi tu cac thay doi Homepage/CSS. Build van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`).

## [2026-05-21] - Canh giua Cards Danh muc va Tang do doc Hero Title
- **Implementation**:
    - Cap nhat `src/App.css` cho `.glow-text` o Hero: bo shadow xanh duong offset lon gay kho doc, thay bang chu den co `-webkit-text-stroke: 1px #000`, shadow trang va vang nhe hon de van giu cam giac poster Neo-Brutalism nhung ro chu hon tren nen trang.
    - Cap nhat `.bento-grid` them `margin-left/right: auto` va offset rieng cho desktop `.category .bento-grid { left: -2.8rem; }` tai breakpoint tren 1121px de 4 card Danh muc nam vao tam thi giac thay vi lech sang phai.
    - Khong thay doi mau palette AutiCare, data song ngu hay component JSX; thay doi chi nam trong layer CSS cua Homepage.
- **Walkthrough**:
    - Section Hero hien doc title "THAU HIEU & DONG HANH..." ro hon vi khong con bong xanh day che canh chu.
    - Section Danh muc hien 4 card nam canh giua hon trong viewport desktop; tablet/mobile khong bi offset de tranh vo responsive.
- **Build Verification**:
    - Da chay `npm.cmd run build`; khong ghi nhan loi moi tu CSS Homepage. Build van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`).

## [2026-05-21] - Sua Khoang Cach Hero Title va Button Fill Surface
- **Implementation**:
    - Cap nhat `.glow-text` trong `src/App.css`: tang `line-height` tu `0.95` len `1.08` va tang `margin-bottom` de cac dong cua title Hero co khoang cach ro hon, tranh dau tieng Viet va chu dong tren de len dong duoi.
    - Sua cac nut `TiltButton` cua Homepage (`Hero`, `Danh muc`, `About`, `CTA`) bang cach override truc tiep cac class cua `react-tilt-button`: `.soft-btn`, `.soft-btn__wrapper`, `.soft-btn__content`, `.soft-btn__inner`.
    - Dat `--button-raise-level: 0px`, width/height `100%`, an pseudo side layer `.soft-btn__wrapper::before`, dua border den vao `.soft-btn__content`, va bo padding mac dinh tren button de surface mau lap day toan bo khung nut.
    - Hero button duoc dat width toi da 360px va height 58px; cac button card dung full width theo container, text can giua va co line-height on dinh.
- **Walkthrough**:
    - Hero title "THAU HIEU & DONG HANH CUNG TRE..." khi xuong dong khong con de len nhau, dac biet voi dau tieng Viet.
    - Cac button khong con hien o mau nho nam giua khung trang; phan mau xanh/la/do/vang lap day toan bo nut, giu border den va hard shadow.
- **Build Verification**:
    - Da chay `npm.cmd run build`; khong co loi moi tu CSS Homepage. Build van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`).

## [2026-05-21] - Di chuyen Design Code vao Design Lab va Them Notification Dropdown
- **Implementation**:
    - Go bo nut `Design Code` dang icon `<>` khoi cum icon tren Header Homepage trong `src/App.tsx`.
    - Mo rong `ThemeCustomizer.tsx` voi prop tuy chon `onDesignCode`; rieng Landing truyen `onDesignCode={() => setView('designHomepage')}` de hien nut **Design Code** ben trong Design Lab.
    - Them button `design-code-lab-btn` trong panel Design Lab, gom icon `<>` va label `Design Code`, giu style Neo-Brutalism border den, hard shadow, nen vang.
    - Them notification icon vao Header Homepage, co state `isNotificationsOpen`, aria-label/aria-expanded, cham do thong bao va dropdown click duoc.
    - Dropdown thong bao co 3 item mau: System Update, Account warning, Meeting invite; co ban song ngu VN/EN theo `lang`.
    - Them CSS `.notification-menu`, `.notification-panel`, `.notification-item`, `.notification-title`, `.notification-body`, `.notification-dot` trong `src/App.css`, giu phong cach sticker: border den, hard shadow, nen kem/trang, title xanh AutiCare.
- **Walkthrough**:
    - Tren Header khong con icon `<>`; nguoi dung mo Design Lab bang nut bang mau vang o goc duoi, sau do bam **Design Code** ben trong panel.
    - Bam icon thong bao tren Header se mo/tat danh sach thong bao mau. Moi item la mot button rieng, co hover/active co hoc.
- **Build Verification**:
    - Da chay `npm.cmd run build`; khong co loi moi tu Header/Design Lab/Notification. Build van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`).

## [2026-05-21] - Chuyen Homepage sang Playful Geometric Design System
- **Implementation**:
    - Cap nhat default Landing tokens trong `src/components/ThemeCustomizer.tsx` sang Playful Geometric: Violet `#8B5CF6`, Pink `#F472B6`, Mint `#34D399`, Cream `#FFFDF5`, Slate `#1E293B`.
    - Them layer override **Playful Geometric Landing Layer** o cuoi `src/App.css` de giu kien truc component hien co nhung doi ngon ngu visual: slate ink thay pure black, border 2px, radius 16-34px, hard shadow khong blur, dot-grid va confetti shapes.
    - Header Homepage duoc lam mem hon voi rounded container, slate border, white paper background, nav link pill, logo sticker rounded va icon button rounded square.
    - Hero chuyen thanh collage/blob card: nen trang co yellow/violet/mint shapes, headline slate + yellow shadow, description speech-bubble card, image wrapper blob radius va dot pattern.
    - Cards trong Categories/Reviews/About/Footer chuyen sang sticker cards rounded 24px, shadow mau nhe theo nhom (violet/pink/yellow/mint), hover co bounce scale/rotate nhe.
    - Buttons trong Hero/Cards/About/CTA duoc override thanh candy pill: border slate 2px, hard shadow, rounded-full, surface fill day du, hover/active co hoc.
    - CTA banner chuyen thanh color block violet + amber, Footer/Auth Modal/Notification/Design Lab duoc dong bo voi Playful Geometric: rounded panels, slate border, hard shadow nhe, title xanh/violet.
    - Giu rule project: toan bo Landing van dung `Be Vietnam Pro`; khong ap dung Outfit/Plus Jakarta de tranh vi pham Rule 9.
- **Walkthrough**:
    - Homepage van dung component tree hien co (`HeroSection`, `CategoriesSection`, `ReviewsSection`, `AboutSection`, `CtaSection`, `Footer`, `FloatingNav`) va Design Lab tiep tuc dieu khien palette qua CSS variables.
    - Nguoi dung se thay giao dien bot "neo-brutalism den day", chuyen sang cam giac san choi/sticker book: bo goc lon, mau violet-pink-yellow-mint, dot-grid, blob/image mask, card hover wiggle.
    - Notification dropdown, Auth Modal va nut Design Code trong Design Lab duoc giu chuc nang, chi duoc style lai cho dong bo.
- **Build Verification**:
    - Da chay `npm.cmd run build`; khong co loi moi tu `App.css` hay `ThemeCustomizer.tsx`. Build van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`).

## [2026-05-21] - Sua Modal Create Account Bi Cat Noi Dung
- **Implementation**:
    - Cap nhat `src/components/auth/AuthModal.tsx` de them class theo mode (`auth-mode-signIn`, `auth-mode-signUp`, `auth-mode-forgot`) vao shell modal, giup CSS xu ly rieng tung form ma khong tach trang.
    - Cap nhat `src/App.css` cho auth modal: tang `max-height` len 820px, doi `.auth-form-zone` tu `overflow: hidden` sang scroll doc noi bo, them scrollbar gon theo mau Slate/Playful Geometric.
    - Rieng `auth-mode-signUp` duoc can noi dung tu tren xuong, giam nhe spacing subtitle/form/input/switch row va mo rong cot form tren desktop de cac field Create Account khong bi ket phan duoi.
    - Them media query cho man hinh desktop thap de Sign up tu dong nen heading va padding; them override mobile de Create Account luon ve layout 1 cot, khong bi rule desktop de len.
- **Walkthrough**:
    - Bam `Dang nhap`/`Login`, chuyen qua `Register`/`Create account`: toan bo field Full name, Email, Password, Confirm password, nut submit va dong chuyen ve Sign in deu hien thi day du.
    - Neu man hinh thap hoac zoom lon, phan form ben phai se cuon noi bo thay vi bi cat noi dung; Sign in/Forgot van giu cam giac modal gon nhu truoc.
- **Build Verification**:
    - Da chay `npm.cmd run build`; khong co loi moi tu `AuthModal.tsx` hay `App.css`. Build van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367` so sanh type `"view"` voi `"edit"`).

## [2026-05-21] - Sửa Khung Vuông Nút Bấm & Nâng Cấp Popup Đặt Lịch Chuyên Gia Song Ngữ
- **Implementation**:
    - **Sửa lỗi Khung Vuông ngoài Nút bấm**: Cập nhật `src/components/homepage/HeroSection.tsx`, loại bỏ các thẻ `<button className="action-item">` thừa bọc ngoài hai `TiltButton` chính. Chuyển trực tiếp prop `onClick` vào `TiltButton`. Điều này loại bỏ hoàn toàn các khung viền vuông đen dày và bóng cứng thừa thãi xung quanh các nút bo tròn pill-shape.
    - **Đa ngôn ngữ hóa danh sách chuyên gia (Rule 7)**: Cập nhật `App.tsx` truyền prop `lang` vào `HeroSection`. Cập nhật dữ liệu tĩnh `experts` trong `HeroSection.tsx` thành song ngữ (English/Vietnamese) phản hồi động theo nút chuyển đổi VN/EN trên Header: hiển thị tên, chức danh và giờ trống tương ứng bằng tiếng Việt/Anh chuẩn.
    - **Tái thiết kế toàn diện Popup Đặt lịch (Playful Geometric)**:
        - Bổ sung đè (override) CSS của các lớp `.experts-popup-overlay`, `.experts-panel`, `.close-experts-btn`, `.expert-card`, `.expert-avatar`, `.expert-schedule-btn` tại cuối tệp `src/App.css` (thuộc layer Playful Geometric).
        - Giao diện Popup: Thiết lập bo góc `24px`, viền Slate `2px solid var(--neo-ink)`, đổ bóng mờ mịn `#E2E8F0` kết hợp bóng cứng slate `#1E293B`, nền trắng sữa kết hợp các mảng màu nhạt Memphis.
        - Thẻ Chuyên gia `.expert-card`: Đổ bóng card luân phiên theo màu nhóm cá tính, bo góc `20px` hiện đại, hover card có hiệu ứng nâng nhẹ và xoay góc `0.4deg` rất mượt mà.
        - Avatar Chuyên gia `.expert-avatar`: Dạng sticker hình tròn có viền và đổ bóng, màu nền luân phiên theo palette AutiCare (Violet, Pink, Yellow) cực kỳ sống động.
        - Nút Đóng `.close-experts-btn`: Tái thiết kế thành nút tròn sticker màu Warning Yellow, hover xoay tròn 90 độ mượt mà và chuyển màu hồng Neon nổi bật.
        - Nút Đặt lịch `.expert-schedule-btn`: Chuyển đổi thành **Candy Button** pill-shape (`rounded-full`, viền Slate 2px, màu Mint mát mắt, shadow offset 3px, hiệu ứng hover chuyển xanh/chữ trắng và active co giãn cơ học mượt mà).
        - Hoạt ảnh Xuất hiện: Tích hợp hiệu ứng mở modal scale bounce đàn hồi mượt mà (`play-modal-entrance` sử dụng cubic-bezier).
        - Responsive: Tự động co giãn 1 cột cân đối trên màn hình di động, phình to nút đặt lịch 100% để tối ưu hóa trải nghiệm bấm chạm.
    - **Khắc phục triệt để lỗi TypeScript TS2367**:
        - Cập nhật `src/components/dashboard/StaffsTab.tsx`, loại bỏ các đoạn logic điều kiện `{modalMode === 'edit' && (...)}` thừa thãi bên trong khối `modalMode === 'view'` (nơi TS đã loại trừ chỉ còn kiểu `"view"` nên không thể so sánh với `"edit"`).
        - Điều này hoàn toàn giải quyết lỗi TS tồn tại lâu nay trong project và trả lại trạng thái biên dịch sạch sẽ 100%.
- **Walkthrough**:
    - Trực quan: Giao diện Landing Page tại zoom 100% trên desktop hiển thị 2 nút chính "START ASSESSMENT" và "BOOK AN EXPERT NOW" dạng pill-shape bo tròn hoàn hảo, không còn khung vuông đen thừa thãi bao quanh.
    - Khi bấm "BOOK AN EXPERT NOW", popup chuyên gia xuất hiện với hiệu ứng phóng to đàn hồi cực kỳ cao cấp, giao diện sạch sẽ, màu sắc bắt mắt, các thẻ chuyên gia, nút đóng, nút đặt lịch có chuyển động mượt mà.
    - Khi bấm chuyển VN/EN, toàn bộ popup tự động dịch thông tin chuyên gia và lịch trống sang tiếng Anh/Việt hoàn hảo.
- **Build Verification**:
    - Chạy thành công `npm.cmd run build` trên PowerShell. Dự án biên dịch thành công 100% sạch sẽ hoàn toàn không còn bất kỳ lỗi TypeScript hay CSS nào (built in 344ms).

## [2026-05-21] - Sửa Lỗi Popup Bị Đè Phía Sau Hình Ảnh & Cải Thiện Backdrop Overlay
- **Implementation**:
    - **Khắc phục lỗi Stacking Context (Đè phía sau hình ảnh)**: Di chuyển mã JSX của popup chuyên gia `{showExperts && (...)}` từ vị trí sâu bên trong `.hero-left` và `.hero-content` ra ngoài, đặt ở mức cao nhất trực tiếp trong `.hero.snap-section` trong tệp `src/components/homepage/HeroSection.tsx`. Điều này loại bỏ ảnh hưởng của thuộc tính `transform: rotate(-0.45deg)` trên `.hero-content`, cái vốn tạo ra một stacking context độc lập làm cho các phần tử `position: fixed` bị giới hạn diện tích bao phủ và bị xếp phía sau các phần tử khác như ảnh minh họa hoặc background Three.js.
    - **Cải thiện Backdrop Overlay (Bóng mờ bao phủ toàn trang)**: Cập nhật CSS của lớp `.experts-popup-overlay` tại cuối tệp `src/App.css` dưới layer *Playful Geometric*. Thay đổi nền từ màu trắng kem sáng (`rgba(255, 253, 245, 0.9)`) sang một lớp phủ bóng tối/mờ cực kỳ sang trọng (`rgba(15, 23, 42, 0.65)` - Slate 900) kết hợp hiệu ứng làm mờ hậu cảnh mịn hơn (`backdrop-filter: blur(8px) !important`). Đồng thời thiết lập cứng kích thước vùng chứa (`width: 100vw`, `height: 100vh`) và tăng `z-index: 999999` để đảm bảo che phủ toàn bộ website khi hiển thị.
- **Walkthrough**:
    - Khi bấm nút "BOOK AN EXPERT NOW" / "ĐẶT LỊCH CHUYÊN GIA NGAY", popup xuất hiện ngay lập tức ở lớp trên cùng (không còn bị đè sau ảnh minh họa hay Three.js canvas).
    - Hiệu ứng bóng tối mờ (slate 65% + blur 8px) bao phủ toàn bộ màn hình viewport một cách mượt mà và đẹp mắt, làm nổi bật hoàn hảo khung thông tin chuyên gia Playful Geometric.
- **Build Verification**:
    - Chạy thành công `npm.cmd run build` trên PowerShell. Dự án biên dịch sạch sẽ 100% không còn bất kỳ lỗi nào.

## [2026-05-21] - Cân Chỉnh Hai Nút Bấm Chính Hero Nằm Song Song (Không Bị Gãy Dòng)
- **Implementation**:
    - **Sửa chiều rộng nút bấm**: Cập nhật CSS của `.hero-actions .soft-btn` trong tệp `src/App.css` tại dòng 188. Thay đổi chiều rộng tối đa từ `360px` về `290px` (`width: min(290px, 100%) !important`). 
    - **Giải pháp**: Với kích thước `290px` mỗi nút cộng thêm khoảng cách gap `16px` (tổng chiều ngang yêu cầu là `596px`), hai nút bấm chính (`START ASSESSMENT` và `BOOK AN EXPERT NOW`) đã nằm hoàn hảo side-by-side trên cùng một hàng ngang bên trong cột `.hero-left` trên desktop (có chiều rộng khoảng `620px` tối đa), đưa nút đặt lịch chuyên gia về đúng vị trí bên phải của nút đánh giá theo đúng yêu cầu mà không bị gãy dòng xuống dưới.
- **Walkthrough**:
    - Trên màn hình desktop và máy tính bảng lớn, hai nút bấm chính hiển thị song song nằm trên một hàng ngang cân đối, nút "BOOK AN EXPERT NOW" nằm ngay bên phải nút "START ASSESSMENT".
    - Trên màn hình thiết bị di động nhỏ, các nút tự động co giãn và xếp chồng dọc gọn gàng theo cơ chế responsive có sẵn.
- **Build Verification**:
    - Chạy thành công `npm.cmd run build` trên PowerShell. Dự án biên dịch sạch sẽ 100% không gặp lỗi.

## [2026-05-21] - Khắc Phục Triệt Để Lỗi Gãy Hàng Dọc và Co Rúm Của 2 Nút Bấm Chính Hero Section
- **Implementation**:
    - **Sửa lỗi co rúm nút bấm trên di động**: Phát hiện thuộc tính `flex: 0 0 58px !important;` lỗi tại `@media (max-width: 767px)` của `.hero-actions .soft-btn` trong `src/App.css` ép cứng chiều rộng của nút về 58px khiến nút bị bóp nghẹt méo mó và chữ bị tràn ra ngoài. Tiến hành loại bỏ và thay thế bằng `flex: 0 0 auto !important;` để nút sử dụng chiều cao chung `58px` và co giãn chiều ngang tự nhiên theo tỷ lệ `width: min(320px, 100%) !important;`.
    - **Sửa lỗi gãy hàng dọc trên desktop**: Nâng cấp toàn diện lớp `.hero-actions` trong `src/App.css` dòng 762. Chuyển từ dạng `display: inline-flex` và `flex-wrap: wrap` thành layout Flexbox có kiểm soát. Thiết lập `display: flex !important`, `gap: 1.25rem !important`, và thêm Media Query ép cứng `flex-direction: row !important` và `flex-wrap: nowrap !important` trên desktop (màn hình >= 768px). Đồng thời tự động xếp dọc và căn giữa `flex-direction: column !important; align-items: center !important; justify-content: center !important;` trên các thiết bị di động (màn hình < 768px).
- **Walkthrough**:
    - Trực quan: Hai nút bấm chính "START ASSESSMENT" và "BOOK AN EXPERT NOW" trên desktop hiển thị song song nằm ngang hoàn hảo trên cùng một hàng mà không có bất kỳ khả năng gãy dòng nào. Nút "BOOK AN EXPERT NOW" nằm về bên phải cực kỳ cân đối.
    - Kích thước các nút hiển thị đầy đủ, sắc nét theo phong cách Candy Button Playful Geometric tròn trịa mà không còn bị co cụm méo mó hay tràn chữ.
    - Trên các thiết bị di động, hai nút xếp dọc căn giữa thẳng hàng, tối ưu trải nghiệm bấm chạm.
- **Build Verification**:
    - Biên dịch dự án qua `npm run build` thành công 100% sạch sẽ hoàn toàn không cảnh báo hay lỗi.

## [2026-05-21] - Phát Triển Tính Năng Xem Chi Tiết Chuyên Gia Với Cấu Trúc Bento Grid Và Nhận Xét Phụ Huynh Song Ngữ
- **Implementation**:
    - **Tích hợp nút Xem chi tiết / View Details**: Bổ sung nút bấm `.expert-detail-btn` bên cạnh nút đặt lịch của từng chuyên gia trong popup chính của `src/components/homepage/HeroSection.tsx`. Thiết kế dạng sticker card mini có bo góc tròn, viền Slate 2px và đổ bóng cứng.
    - **Nâng cấp dữ liệu Chuyên gia đa chiều**: Mở rộng cấu trúc dữ liệu `experts` tĩnh trong `HeroSection.tsx` để tích hợp các thuộc tính `qualification` (Bằng cấp), `experienceYears` (Năm kinh nghiệm), `description` (Mô tả chuyên môn/triết lý), và mảng `feedbacks` (Đánh giá phụ huynh thực tế với rating sao và nội dung bình luận song ngữ 100%).
    - **Xây dựng Giao diện Popup Hồ sơ Chuyên gia chi tiết**:
        - Thiết lập lớp phủ toàn màn hình `.experts-detail-overlay` với backdrop blur 8px mịn màng và `z-index: 1000000` (đè tuyệt đối lên mọi thứ, kể cả ThreeJS canvas 3D).
        - Panel chi tiết chuyên gia `.expert-detail-panel` mang đậm phong cách **Playful Geometric**: bo góc tròn lớn `24px`, viền Slate `#1E293B` dày 2px, đổ bóng cứng Slate `12px 12px 0px` cực kỳ cá tính.
        - Khởi tạo bố cục **Bento Grid** `.expert-detail-bento` chia thành 3 thẻ sticker pastel Memphis nổi bật: Thẻ Bằng cấp màu Amber nhạt (`#FEF3C7`), Thẻ Kinh nghiệm màu Mint nhạt (`#D1FAE5`), và Thẻ Triết lý đồng hành chiếm trọn 2 cột màu Violet nhạt (`#EDE9FE`).
        - Phát triển Danh sách nhận xét từ phụ huynh `.feedbacks-section` sử dụng các thẻ đánh giá dạng Sticker độc đáo, viền Slate, đổ bóng cứng, hover xoay nhẹ `0.4deg` wiggle và tích hợp hệ thống sao vàng SVG tỏa sáng động dựa trên số điểm rating.
        - Các nút tương tác lớn tại Footer của popup gồm: nút "Quay lại danh sách / Back to list" màu trắng, và nút "Đặt lịch tư vấn / Schedule consultation" màu Mint, hover đổi sang màu Violet chữ trắng rực rỡ.
        - Tích hợp hiệu ứng scale bounce đàn hồi mượt mà cho popup khi mở ra.
    - **Tối ưu hóa Responsive di động**:
        - Thiết lập tự động chuyển đổi Bento Grid và Feedbacks từ lưới nhiều cột sang dạng 1 cột xếp dọc thẳng hàng trên mobile (màn hình < 640px).
        - Thu nhỏ bóng đổ token từ `12px` xuống `6px` và phình to chiều ngang các nút tương tác lên 100% để tối ưu trải nghiệm bấm chạm.
    - **Đa Ngôn Ngữ Song Hành (i18n)**: Toàn bộ thông tin học vị, năm kinh nghiệm, mô tả và nhận xét của phụ huynh phản hồi động 100% khi người dùng chuyển đổi ngôn ngữ Việt - Anh trên Header.
- **Walkthrough**:
    - Khi người dùng click nút "Xem chi tiết / View Details" trong popup chuyên gia, một panel hồ sơ bento lộng lẫy xuất hiện đàn hồi giữa màn hình.
    - Bố cục bento và nhận xét của phụ huynh hiển thị gọn gàng, sắc nét với màu sắc hài hòa, font chữ `Be Vietnam Pro` đồng bộ đẹp mắt.
    - Khi đổi ngôn ngữ VN/EN, toàn bộ giao diện hồ sơ chi tiết dịch chuẩn xác ngay lập tức.
    - Trên các thiết bị di động, giao diện tự động tối ưu hóa hiển thị dọc mượt mà.
- **Build Verification**:
    - Biên dịch thành công dự án chạy lệnh build client production qua `cmd.exe /c npm run build` thành công 100% không cảnh báo hay lỗi, cho ra sản phẩm cực kỳ sạch sẽ và ổn định.

## [2026-05-21] - Tối Ưu Bố Cục Tiêu Đề Và Mở Rộng Modal Chi Tiết Chuyên Gia Toàn Diện
- **Implementation**:
    - **Mở rộng kích thước Modal toàn diện**: Tăng chiều rộng tối đa `.expert-detail-panel` trong [App.css](file:///d:/0.%20SU26/SEP490/figma/AutiCare-Design/src/App.css) từ `680px` lên `920px` (`width: min(920px, calc(100% - 2rem)) !important`), đồng thời nâng chiều cao tối đa lên `880px` để mở rộng không gian bố cục Bento Grid và feedbacks một cách phóng khoáng và hoành tráng, loại bỏ cảm giác chật chội.
    - **Tách biệt và Căn chỉnh Padding cho Header**: Bổ sung padding `1.75rem 2rem 1.25rem 2rem` đầy đủ cho phần `.experts-header` khi nằm bên trong `.expert-detail-panel`, giúp header thẳng hàng hoàn hảo với phần content bên dưới, chấm dứt hoàn toàn tình trạng chữ và viền đứt nét sát sạt mép viền ngoài.
    - **Giải quyết triệt để lỗi đè của Avatar & Tên Chuyên Gia**:
        - Phát triển lớp CSS `.header-info-group` cấu trúc Flexbox (`display: flex`, `align-items: center`, `gap: 1.5rem`) để sắp xếp avatar sticker và khối text chứa tên, chức danh nằm song song một cách chuyên nghiệp nhất, loại bỏ hoàn toàn việc chồng chéo đè chữ.
        - Phóng to kích thước của `.detail-avatar` lên `4.8rem` x `4.8rem` và tăng chiều dày bóng đổ để hài hòa với kích thước modal mới.
        - Đồng bộ màu nền pastel của avatar chuyên gia động: cập nhật [HeroSection.tsx](file:///d:/0.%20SU26/SEP490/figma/AutiCare-Design/src/components/homepage/HeroSection.tsx) tính toán index tự động để truyền màu nền tương ứng từ danh sách chính (`#EDE9FE` cho TS. Minh, `#FCE7F3` cho Cô Lan, và `#FEF3C7` cho BS. Đức), mang lại sự nhất quán thị giác tuyệt đối.
        - Cải tiến typography: Chuyển màu chữ chức danh chuyên gia `.detail-expert-title` sang màu Slate 600 dịu nhẹ, sang trọng, tăng cỡ chữ lên `1.05rem` và tăng phông chữ của tên chuyên gia `h3` lên `clamp(1.4rem, 2.5vw, 1.95rem)` sắc sảo.
    - **Nâng cấp độ thoáng cho Bento Grid & Sticker Cards**:
        - Tăng khoảng cách `gap` của Bento Grid lên `1.5rem` và padding thẻ sticker `.detail-bento-card` từ `1.25rem` lên `1.5rem` kèm bóng đổ cứng sâu hơn (`6px`). Tương tự tăng cỡ chữ tiêu đề card lên `1.08rem` và nội dung lên `0.96rem`, phình to chữ số kinh nghiệm nổi bật lên `2.2rem`.
        - Nâng cấp thẻ feedbacks `.feedback-item-card` rộng rãi hơn với padding `1.35rem` và comment size lên `0.94rem`.
        - Nâng cấp chân trang `.expert-detail-footer` với viền nét đứt thanh mảnh, nền trắng đồng màu sang trọng và tăng padding lên `1.5rem 2rem`.
    - **Tối ưu responsive di động hoàn thiện**:
        - Thêm các luật ghi đè responsive cho `@media (max-width: 640px)` trong `App.css`: thu nhỏ padding của `.experts-header` xuống `1.15rem`, thu nhỏ avatar xuống `3.6rem` x `3.6rem` và điều chỉnh chữ số h3 xuống `1.35rem` để hiển thị cân đối 100% trên màn hình điện thoại di động nhỏ.
- **Walkthrough**:
    - Trực quan: Modal chi tiết chuyên gia mở ra to rộng, lộng lẫy và thoáng đãng trên màn hình lớn. Không gian Bento Grid Memphis và các feedbacks sticker có bố cục thoáng đãng, các bóng đổ cá tính và màu sắc cực kỳ bắt mắt.
    - Khu vực tiêu đề chuyên gia thẳng hàng tuyệt đẹp: avatar tròn sticker nằm gọn bên trái, tên chuyên gia viết hoa đậm nằm ở giữa trên dòng chức danh Slate 600 thanh lịch, không còn hiện tượng đè chữ hay lấn chiếm lề. Màu nền avatar của Tiến sĩ Minh đồng bộ màu tím nhạt `#EDE9FE` tuyệt đẹp từ danh sách ngoài vào trong chi tiết.
    - Trên màn hình điện thoại di động, bố cục co giãn mượt mà, căn chỉnh lề đều đặn và sắc nét.
- **Build Verification**:
    - Chạy thành công `cmd.exe /c "npm run build"`, dự án được đóng gói sản phẩm hoàn hảo chỉ trong 298ms không một cảnh báo hay lỗi TypeScript nào.

## [2026-05-22] - Tích Hợp Quản Lý Kế Hoạch Can Thiệp (Manage plans) Song Ngữ Trong Admin Dashboard
- **Implementation**:
    - **Tích hợp router tab 'plans'**: Cập nhật hàm `renderActiveTab()` trong [AdminDashboard.tsx](file:///e:/%C4%90%E1%BB%93%20%C3%A1n%20t%E1%BB%91t%20nghi%E1%BB%87p/AutiCare-Design/src/components/AdminDashboard.tsx) để hỗ trợ render tab `plans` với các components `PlansTab` và `PlanDetailView` tương ứng.
    - **Đồng bộ state chi tiết**: Tích hợp biến state `selectedPlanForDetail` và thiết lập logic reset state này về `null` khi người dùng chuyển sang các tab khác trong sidebar.
    - **Cập nhật breadcrumb**: Bổ sung hiển thị `/ [Plan Name]` vào thanh Breadcrumb Topbar khi Admin đang ở trong giao diện xem chi tiết của một Kế hoạch.
    - **Sửa lỗi type verbatimModuleSyntax**: Sửa lỗi TypeScript `TS1484` trong [AdminDashboard.tsx](file:///e:/%C4%90%E1%BB%93%20%C3%A1n%20t%E1%BB%91t%20nghi%E1%BB%87p/AutiCare-Design/src/components/AdminDashboard.tsx) bằng cách tách biệt import loại `type { Plan }` và import component React `PlanDetailView` theo đúng quy tắc nghiêm ngặt của dự án.
    - **Sửa lỗi translations deleteSub**: Khắc phục lỗi thiếu trường `deleteSub` trong [PlanDetailView.tsx](file:///e:/%C4%90%E1%BB%93%20%C3%A1n%20t%E1%BB%91t%20nghi%E1%BB%87p/AutiCare-Design/src/components/dashboard/PlanDetailView.tsx) bằng cách bổ sung khóa `deleteSub` song ngữ (VN/EN) vào các đối tượng từ điển `translations.vi` và `translations.en`.
- **Walkthrough**:
    - **Trực quan**: Trong Admin Dashboard, tab "Kế hoạch Can thiệp" (Manage Plans) hoạt động mượt mà. Admin có thể xem danh sách kế hoạch, tìm kiếm nhanh, thêm mới, sửa, xóa kế hoạch trực tiếp từ popup.
    - Click vào nút "Chi tiết" sẽ dẫn tới trang [PlanDetailView.tsx](file:///e:/%C4%90%E1%BB%93%20%C3%A1n%20t%E1%BB%91t%20nghi%E1%BB%87p/AutiCare-Design/src/components/dashboard/PlanDetailView.tsx) có đầy đủ thông tin chi tiết của Kế hoạch (Điểm mạnh, Điểm yếu, Sở thích, Phản hồi gia đình) cùng sơ đồ quản lý Giai đoạn (Plan Phases) lồng ghép 3 sub-tabs cực kỳ chuyên nghiệp (Tổng quan, Hoạt động can thiệp, Mục tiêu hành vi).
    - Mọi thao tác CRUD trên Phase, Activity và Objective hoạt động hoàn hảo và đồng bộ dữ liệu chuẩn xác lên DB mock của AdminDashboard cha.
    - Responsive hoạt động trơn tru trên mọi thiết bị và hỗ trợ song ngữ Việt/Anh mượt mà qua nút chuyển đổi toàn cục.
- **Build Verification**:
    - Chạy thành công lệnh `cmd /c "npm run build"`, dự án được đóng gói sản phẩm hoàn hảo 100% không còn bất kỳ cảnh báo hay lỗi TypeScript nào.

## [2026-05-22] - Đồng Bộ Hóa Toàn Diện Giao Diện Quản Lý Kế Hoạch (PlansTab)
- **Implementation**:
    - **Loại bỏ inline CSS thô**: Xóa bỏ toàn bộ các thẻ inline style `style={{ ... }}` gây sai lệch bố cục visual khỏi tệp [PlansTab.tsx](file:///e:/Đồ án tốt nghiệp/AutiCare-Design/src/components/dashboard/PlansTab.tsx).
    - **Áp dụng class hệ thống chuẩn**: Đồng bộ các thẻ bao quanh và thẻ bảng sang sử dụng `.dashboard-content-area`, `.table-header`, `.table-title`, `.table-actions`, `.search-bar`, `.add-btn`, `.data-table-wrapper` và `.data-table` của hệ thống.
    - **Đồng bộ hóa Action Buttons**: Thay thế các nút Candy-Btn emoji thô bằng bộ ba nút SVG chuẩn gồm `view-btn-v2` (icon con mắt), `edit-btn-v2` (icon bút chì) và `delete-btn-v2` (icon thùng rác) căn lề phải và có khoảng cách gap mượt mà.
    - **Đồng bộ hóa Modal và Grid Form**: Tái cơ cấu popup Modal sang `.modal-overlay`, `.admin-modal`, `.modal-header`, `.modal-body`, `.modal-footer` cùng với CSS grid `.modal-form-grid` và các trường `.form-group` có `.form-group-full` cho các textarea mô tả rộng, tạo sự đồng bộ hoàn hảo với các tab nhân sự và mục tiêu.
    - **Bảo toàn Responsive & Logic**: Tích hợp block CSS di động cho `.modal-form-grid` tự động co về 1 cột dưới màn hình 720px, bảo đảm độ nhạy và co giãn mượt mà.
- **Walkthrough**:
    - Giao diện danh sách kế hoạch can thiệp hiển thị thống nhất 100% với giao diện quản lý staffs và objectives: cùng màu sắc, cùng kiểu chữ, cùng bóng đổ cứng và kiểu viền bo góc.
    - Bộ nút thao tác cuối dòng nhìn chuyên nghiệp và hiện đại hơn với các biểu tượng vector sắc nét.
    - Popup thêm/sửa kế hoạch hiển thị dưới dạng grid 2 cột cân đối, thoáng đãng và có độ thẩm mỹ cực kỳ cao.
- **Build Verification**:
    - Chạy thành công lệnh đóng gói `npm.cmd run build` đạt kết quả biên dịch 100% sạch sẽ không cảnh báo hay lỗi TypeScript.

## [2026-05-22] - Khôi Phục Nguyên Trạng BlogsTab & NotificationTab
- **Implementation**:
    - **Khôi phục hoàn toàn**: Khôi phục nguyên vẹn 100% hai tệp tin [BlogsTab.tsx](file:///e:/Đồ án tốt nghiệp/AutiCare-Design/src/components/dashboard/BlogsTab.tsx) và [NotificationTab.tsx](file:///e:/Đồ án tốt nghiệp/AutiCare-Design/src/components/dashboard/NotificationTab.tsx) về trạng thái gốc của hệ thống (`origin/main`).
    - **Bảo đảm tính cô lập**: Đảm bảo tuyệt đối không có bất kỳ thay đổi nào ngoài phạm vi chức năng Kế hoạch Can thiệp (`Plan` và `Plan Phase`), tuân thủ nghiêm ngặt chỉ dẫn của người dùng và các quy định của dự án.
    - **Xác thực đóng gói**: Chạy thành công lệnh build dự án đạt kết quả biên dịch 100% không còn bất kỳ cảnh báo hay lỗi kiểu dữ liệu TypeScript nào.

## [2026-05-22] - Phân Tách Phase Overview Và Manage Activity Thành Các Card Dọc Riêng Biệt
- **Implementation**:
    - **Loại bỏ cơ chế chia tab con (Sub-Tabs)**: Loại bỏ hoàn toàn thanh `sub-tabs-container` điều hướng tab cũ trong trang chi tiết Giai đoạn (`PlanDetailView.tsx`). Dọn dẹp triệt để biến trạng thái `phaseActiveTab` và `setPhaseActiveTab` ở cả phần khai báo state và sự kiện click hàng Phase trong danh sách, giải quyết triệt để lỗi biên dịch `TS6133` (unused variable) và `TS2304` (Cannot find name).
    - **Bố cục 2 Card xếp chồng dọc**:
        - **Card 1 (Phía trên)**: Phase Overview hiển thị chi tiết siêu dữ liệu của Phase (Mã PH, Mã PL, Phương pháp, Ngày bắt đầu/kết thúc, Trạng thái, v.v.) qua lưới `.overview-grid`.
        - **Card 2 (Phía dưới)**: Manage Activity & Objectives gộp chung hai mảng quản lý Hoạt động can thiệp (Activities) và Mục tiêu hành vi (Objectives) xếp dọc trong cùng một card. Phần trên là Quản lý hoạt động có nút "Thêm hoạt động", phần dưới là Quản lý mục tiêu có nút "Thêm mục tiêu". Điều này cho phép xem và thao tác đồng thời cả hai phần dữ liệu mà không cần click chuyển tab mỏi mắt.
    - **Bổ sung Nút bấm Thao tác Activities (Edit/Delete)**: Tích hợp đầy đủ cụm nút hành động Sửa (`edit-btn-v2`) và Xóa (`delete-btn-v2`) sử dụng vector icon SVG mảnh mịn sắc nét cho từng thẻ Hoạt động `.item-card-v2` (trong thiết kế cũ đang thiếu nút thao tác này). Gắn chính xác các sự kiện click với hàm modal `openActModal('update', act)` và `openActModal('delete', act)`.
- **Walkthrough**:
    - Trực quan: Trong trang chi tiết Giai đoạn, giao diện hiển thị 2 Card dọc rõ rệt, ngăn nắp theo phong cách Flat / Playful Geometric. Mọi thông tin meta của giai đoạn được phơi bày rõ nét ở card trên, trong khi card dưới hỗ trợ thêm/sửa/xóa các bài hoạt động rèn luyện và mục tiêu can thiệp.
    - Nút bấm hành động của cả Hoạt động và Mục tiêu đều sử dụng icon SVG phẳng sang trọng, hover chuyển màu sắc nét, tạo sự đồng bộ hoàn chỉnh với các tab quản lý khác trong Admin Dashboard.
- **Build Verification**:
    - Đã chạy biên dịch thành công 100% bản dựng sản phẩm thông qua lệnh `cmd.exe /c npm run build` sạch sẽ hoàn toàn không còn bất kỳ cảnh báo hay lỗi kiểu dữ liệu TypeScript nào (hoàn thành chỉ trong 257ms).

## [2026-05-22] - Phát Triển Luồng Đặt Lịch Chuyên Gia Tích Hợp Chọn Ngày/Giờ Và Vé Hẹn AutiCare Song Ngữ Cao Cấp
- **Implementation**:
    - **Tích hợp logic từ điển dịch song ngữ (Rule 7)**: Bổ sung 14 khóa dịch mới vào từ điển `translations` tại [App.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/App.tsx) phục vụ luồng đặt lịch: tiêu đề modal, chọn ngày, chọn giờ, nút xác nhận, màn hình thành công, và các nhãn trên chiếc vé hẹn AutiCare bằng cả hai ngôn ngữ `vi` và `en`.
    - **Logic Đặt Lịch Động (HeroSection.tsx)**:
        - Thiết lập các state mới quản lý chuyên gia đang được đặt lịch (`bookingExpert`), ngày được chọn (`selectedDate`), khung giờ (`selectedTimeSlot`), trạng thái hoàn tất (`bookingSuccess`), và mã vé ngẫu nhiên (`ticketCode` sinh dạng `AC-XXXX`).
        - Lập trình bộ sinh ngày khả dụng tiếp theo tự động (`getNextDays`) tự động tạo 4 ngày kể từ hôm nay theo đúng ngôn ngữ đã chọn (VD: `Thứ Sáu, 22/05` bằng tiếng Việt hoặc `Friday, 22/05` bằng tiếng Anh).
        - Định nghĩa mảng 5 ca tư vấn 2 tiếng/phiên (`08:00 - 10:00`, `10:00 - 12:00`, `13:00 - 15:00`, `15:00 - 17:00`, `18:00 - 20:00`).
        - Chuyển hướng các nút "Schedule" ở cả 2 luồng (danh sách chuyên gia bên ngoài và popup chi tiết hồ sơ bên trong) để mở trực tiếp modal chọn ngày giờ thay vì thông báo alert thô sơ.
    - **Giao Diện Đặt Lịch Playful Geometric (HeroSection.tsx & App.css)**:
        - Xây dựng modal overlay `.booking-popup-overlay` có độ mờ hậu cảnh mịn màng, phủ tuyệt đối với `z-index: 1000002`.
        - Thiết kế lưới chọn ngày `.date-grid` và lưới chọn giờ `.time-grid` dạng các thẻ sticker Bento bo góc vừa phải (`12px`), viền Slate `#1E293B` 2px và bóng đổ cứng cá tính. Tích hợp hiệu ứng hover nâng nhẹ và hiệu ứng đổi màu pastel khi được chọn: chọn ngày sang nền Blue (`--primary`), chọn giờ sang nền Mint (`--secondary`).
        - Thêm dòng thông báo nhắc nhở màu đỏ cảnh báo `.booking-required-hint` và vô hiệu hóa nút xác nhận `.disabled-btn` cho đến khi người dùng chọn đầy đủ thông tin.
    - **Giao Diện Vé Hẹn AutiCare Độc Đáo (Appointment Ticket)**:
        - Khi đặt lịch thành công, hiển thị màn hình chúc mừng có nhãn sticker tích tròn rung rinh vui nhộn `.success-tick-sticker` và một chiếc **Vé hẹn gặp AutiCare** cao cấp.
        - Chiếc vé được phủ họa tiết Memphis radial chấm tròn cổ điển, viền nét đứt đứt quãng răng cưa ở hai mép, thanh Brand AutiCare, nhãn `CONFIRMED` nghiêng cá tính, các trường thông tin hiển thị in đậm rõ ràng, và mã vạch giả lập `.ticket-barcode` bằng các vạch dọc dày mỏng sáng tạo.
    - **Tối ưu responsive di động hoàn thiện (Rule 8)**:
        - Thêm các luật responsive co giãn cho màn hình nhỏ dưới 640px: lưới ngày giờ và thông tin vé hẹn tự động chuyển thành lưới dọc 1 cột để vừa khít màn hình, giảm bóng đổ để giao diện nhẹ nhàng hơn.
- **Walkthrough**:
    - Trực quan: Luồng đặt lịch chuyên gia nâng cấp mang diện mạo cực kỳ đẳng cấp, chuyển động đàn hồi êm ái, màu sắc pastel ấm áp đồng bộ Design Lab. Chiếc vé hẹn AutiCare nhận được phản hồi trực quan sinh động như một vé xem phim Memphis cá tính.
    - Khi người dùng click "Schedule Now" trên chuyên gia, thay vì alert sẽ mở ra modal chọn ngày và giờ tư vấn 2 tiếng. Chọn đầy đủ thông tin và xác nhận sẽ hiển thị vé hẹn đẹp mắt kèm mã xác thực độc nhất.
    - Chuyển đổi ngôn ngữ trên Header hoạt động hoàn hảo 100% trên toàn bộ chi tiết ngày/giờ, vé hẹn và các nhãn liên quan.
- **Build Verification**:
    - Biên dịch thành công dự án production build qua `cmd.exe /c "npm run build"` thành công 100% không cảnh báo hay lỗi TypeScript, khẳng định mã nguồn cực kỳ chuẩn mực và an toàn.

## [2026-05-22] - Nới Rộng Và Tối Ưu Hóa Giao Diện Đặt Lịch Chọn Chuyên Gia & Dashboard 2 Cột Song Song
- **Implementation**:
    - **Loại bỏ ghi chú thời lượng tư vấn (Rule 1)**: Đã xóa hoàn toàn đoạn text `(2 tiếng/phiên)` và `(2 hours/session)` trong từ điển dịch thuật `translations` tại [App.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/App.tsx) đối với khóa `bookingSelectTime` của cả hai ngôn ngữ tiếng Việt (`vi`) và tiếng Anh (`en`). Điều này làm tiêu đề chọn giờ trở nên gọn gàng, thoáng đãng hơn.
    - **Nâng cấp Modal Chọn Chuyên Gia Rộng Rãi (`.experts-panel`)**:
        - Thiết lập chiều rộng tối đa từ `840px` lên `1140px` (`width: min(1140px, 95%) !important`) và nâng chiều cao tối đa lên `850px` trên màn hình lớn.
        - Chuyển đổi danh sách chuyên gia từ layout xếp dọc chật hẹp thành **Lưới 3 cột song song** (`grid-template-columns: repeat(3, 1fr) !important; gap: 1.75rem !important`) cho 3 chuyên gia trên desktop.
        - Thiết kế lại `.expert-card` thành layout **Thẻ Hồ sơ Dọc (Vertical Profile Cards)** với avatar to tròn (`width: 5.5rem`, `height: 5.5rem`) nổi bật trên cùng có viền và bóng đổ đậm, căn giữa phần text `.expert-info` (`text-align: center`) và xếp dọc các nút tương tác bên dưới (`flex-direction: column !important`), các nút Candy Button co giãn `100%` chiều ngang lấp đầy không gian.
    - **Nâng cấp Dashboard Đặt Lịch 2 Cột Song Song (`.booking-panel`)**:
        - Mở rộng chiều rộng modal đặt lịch từ `650px` lên `980px` (`width: min(980px, 95%) !important`).
        - Trên desktop (màn hình >= 768px), tái cấu trúc vùng cuộn dọc `.booking-content-scroll` thành **Dashboard 2 cột song song** (`display: grid`, `grid-template-columns: 1.15fr 0.85fr`, `gap: 2.5rem`), loại bỏ chiều cao cuộn dọc chật hẹp (`max-height: none`).
        - **Cột Trái (Chọn ngày tư vấn)**: Cấu trúc lại lưới ngày `.date-grid` thành **Lưới 2x2** (`grid-template-columns: repeat(2, 1fr)`). Các thẻ ngày `.date-card` được nới rộng (`padding: 1.25rem 0.85rem`), hiển thị ngày số to rõ ràng và cực kỳ dễ chạm bấm.
        - **Cột Phải (Chọn giờ tư vấn)**: Cấu trúc lại lưới giờ `.time-grid` thành **Danh sách dọc 1 cột** (`grid-template-columns: 1fr`). Nới rộng các nút chọn giờ `.time-slot-card` thành các **dải pill ngang thanh lịch** (`padding: 0.95rem 1.25rem`, `justify-content: flex-start`), tạo bố cục vô cùng trực quan và sang trọng.
    - **Đồng bộ responsive (Rule 8)**: Đảm bảo khi co về màn hình nhỏ dưới 768px, cả hai modal tự động cuộn dọc mượt mà, co giãn 100% chiều ngang phù hợp tuyệt đối cho trải nghiệm di động.
- **Walkthrough**:
    - Khi bấm "BOOK AN EXPERT NOW", popup chọn chuyên gia xuất hiện to rộng lộng lẫy trên màn hình máy tính với 3 cột chuyên gia cân đối. Mỗi chuyên gia hiển thị dưới dạng thẻ hồ sơ dọc với avatar to, tên căn giữa và các nút Candy Button kéo dài đầy đặn.
    - Khi bấm Đặt lịch ("Schedule now"), popup Đặt lịch tư vấn xuất hiện dưới dạng một Dashboard 2 cột cực kỳ chuyên nghiệp và sang trọng: bên trái là lưới 2x2 các thẻ ngày to rõ, bên phải là danh sách các dải ca giờ nằm ngang xếp dọc rất thoáng mắt, loại bỏ hoàn toàn các ghi chú thời lượng thừa.
- **Build Verification**:
    - Dự án biên dịch hoàn tất thành công 100% qua lệnh `npm.cmd run build` trên Windows PowerShell mà không phát sinh bất kỳ lỗi TypeScript hay CSS nào (thời gian biên dịch 1.25s).

## [2026-05-22] - Chi Tiết Hóa Khung Giờ Tư Vấn (Time Slots) Với Hình Thức Online/Offline Và Trạng Thái Trống/Bận

- **Implementation**:
    - **Tích hợp Từ điển Song ngữ mới (Rule 7)**: Bổ sung 4 khóa dịch thuật mới phục vụ thuộc tính ca giờ vào tệp [App.tsx](file:///e:/1.%20My%20Projects/3.%20AutiCare%20Design/src/App.tsx): `slotOnline` (Trực tuyến / Online), `slotOffline` (Trực tiếp / Offline), `slotAvailable` (Đang trống / Available), `slotBooked` (Đã bận / Booked).
    - **Cấu trúc Dữ liệu Ca Tư Vấn Đa Chiều (HeroSection.tsx)**:
        - Nâng cấp mảng ca tư vấn tĩnh `timeSlots` từ mảng chuỗi đơn giản thành mảng đối tượng động chứa `id`, `time` (khung giờ 2 tiếng), `type` ('Online' | 'Offline') và `status` ('available' | 'booked').
        - Cài đặt demo 2 ca giờ bận (`slot-2` 10:00 - 12:00 Offline, `slot-5` 18:00 - 20:00 Online) và 3 ca giờ trống còn lại khả dụng.
    - **Logic Tương Tác & Hiển Thị Đặt Lịch Thông Minh (HeroSection.tsx)**:
        - Điều chỉnh lưới render ca tư vấn trong Dashboard để hiển thị các nhãn sticker (badges) nhỏ phản ánh hình thức (Online/Offline) và trạng thái (Trống/Bận) của ca giờ.
        - Khóa tương tác của người dùng bằng cách áp dụng thuộc tính `disabled` của HTML và lớp CSS `.booked` khi ca giờ có trạng thái `status === 'booked'`. Người dùng không thể click chọn các ca bận này.
        - Cập nhật logic hiển thị dòng "Hình thức / Format" trên **Vé hẹn AutiCare (Appointment Ticket)**. Thay vì hiển thị tĩnh một chuỗi cố định, giá trị này tự động trích xuất thuộc tính `type` của ca tư vấn được phụ huynh chọn và kết hợp dịch song ngữ theo ngôn ngữ hiện hành của Landing Page (Online hiển thị Zoom/Meet, Offline hiển thị Địa chỉ phòng khám trung tâm).
    - **Phong cách Thiết kế Playful Geometric Bắt Mắt (App.css)**:
        - Tạo kiểu dáng cho thẻ `.time-slot-card` dạng dải pill nằm ngang bo tròn `16px`, viền Slate 2px, bóng đổ cứng đặc trưng.
        - Xây dựng hệ thống nhãn sticker `.slot-type-badge` và `.slot-status-badge` với viền Slate mỏng `1.5px`, màu nền pastel Memphis sặc sỡ: màu tím nhạt cho Online, màu hổ phách cho Offline, màu xanh mint cho trống và xám nhạt cho bận.
        - Thiết kế thẻ bận `.time-slot-card.booked` làm mờ `opacity: 0.55`, đổi nền sang xám nhạt, viền nhạt hơn và thay đổi con trỏ chuột thành `not-allowed` để phản ánh trực quan trạng thái bị khóa.
        - Xây dựng quy tắc override màu nền trắng cho các nhãn sticker khi thẻ giờ ở trạng thái được chọn `.selected` nhằm duy trì độ tương tương phản cao tuyệt đối và nâng tầm thẩm mỹ.
- **Walkthrough**:
    - Trực quan: Dashboard đặt lịch tư vấn hiển thị danh sách các dải ca giờ vô cùng thoáng đãng và ngập tràn cá tính Playful Geometric. Các nhãn sticker Online/Offline và Trống/Bận nhỏ nhắn, sắc sảo giúp phụ huynh dễ dàng quét thông tin.
    - Các ca giờ đã bị bận (Ca 2 và Ca 5) tự động được làm mờ đi, viền nhạt và khi rê chuột vào sẽ hiện con trỏ cấm, hoàn toàn không thể click chọn.
    - Khi đặt lịch thành công, chiếc Vé hẹn AutiCare hiển thị chính xác và đồng bộ hình thức tư vấn thực tế của ca giờ đã đặt bằng cả tiếng Việt và tiếng Anh.
- **Build Verification**:
    - Biên dịch thành công 100% gói client sản phẩm qua lệnh `npm.cmd run build`. Không phát sinh bất kỳ lỗi TypeScript hay CSS nào, bảo đảm hệ thống vận hành trơn tru và cực kỳ ổn định.

## [2026-05-22] - Xây dựng Tính năng Quản lý Lịch khám (Appointment Scheduling) trên Admin Dashboard
- **Implementation**:
    - **Cấu trúc Dữ liệu Đơn giản (appointment_slot)**: Chuyển đổi logic sang schema mới tinh gọn gồm một bảng duy nhất `appointment_slot`. Các trường `start_time` và `end_time` là chuỗi `datetime`. Trạng thái `status` hiển thị 'Available' hoặc 'Booked'. Hình thức hiển thị 'Online' hoặc 'Offline'.
    - **ScheduleTab.tsx (Dashboard Admin)**: Xây dựng tab giao diện Quản lý Lịch trống dành riêng cho Bác sĩ / Điều phối viên trên Admin Dashboard. Tích hợp bảng danh sách Data Table liệt kê tất cả các slot. Cột thao tác cho phép Xóa (Delete) những slot nào có trạng thái 'Available'. Những slot đã 'Booked' sẽ khóa chức năng xóa (khóa mờ button và ngăn chặn qua alert).
    - **Form Tạo Lịch (Create Appointment Slot)**: Tích hợp Modal bật lên 1 cột cho phép Bác sĩ tạo khung giờ mới. Nhập `staff_id`, chọn `location_type`, và nhập liệu trực tiếp `start_time` / `end_time` dạng `datetime-local`.
    - **AdminDashboard.tsx**: Đăng ký thẻ tab "Lịch trình" / "Quản lý Lịch trống" vào sidebar dưới dạng mục `scheduling`.
    - **CSS Styles (`AdminDashboard.css`)**: Bổ sung bộ class CSS `.badge-status`, `.badge-status.available`, `.badge-status.booked` để hiển thị nhãn trạng thái trực quan dạng viên thuốc (pill) với màu nền xanh lá và đỏ nhạt mờ theo chuẩn thiết kế Playful Geometric.
- **Walkthrough**:
    - Tích hợp 1 bảng mô phỏng thành công (`appointment_slot`).
    - Giao diện mượt mà và trực quan, hỗ trợ đầy đủ tiếng Việt và tiếng Anh.
- **Build Verification**:
    - Xác thực không phát sinh lỗi TypeScript.

### 2026-05-23: Triển khai 4 Hệ thống Lớn (Profile, Invoices, Support Tickets, Plan Feedbacks)
- Tạo mới `ProfileModal.tsx` quản lý thông tin cá nhân trên Homepage.
- Khôi phục `InvoicesTab.tsx` cho Kế toán và `ParentInvoicesModal.tsx` tích hợp luồng PayOS. Cấu hình tự động sinh Hóa đơn ngay sau khi Book chuyên gia ở `HeroSection.tsx`.
- Xây dựng hệ thống Support Ticket với giao diện chat bong bóng thời gian thực qua `ParentSupportTicketsModal.tsx` (phía Phụ huynh) và `SupportTicketsTab.tsx` (phía Admin).
- Thiết kế `PlanFeedbacksTab.tsx` ở Admin Dashboard để quản trị nhận xét/đánh giá từ phụ huynh.
- Cập nhật `AdminDashboard.css` bổ sung CSS hóa đơn và PayOS.
- Đã chạy npm build thành công không lỗi (100% clean production build).

## [2026-05-24] - Phát triển Phân hệ Trang cá nhân Chuyên gia (Staff Portal) & Hệ thống duyệt lịch hẹn lâm sàng thời gian thực
- **Cơ chế Chuyển đổi Vai trò nhanh (Role Switcher Linkage)**:
  - Tích hợp một nút bấm kẹp góc phải Header của cả hai phân hệ: Phụ huynh hiển thị nút **🧑‍⚕️ CHUYÊN GIA PORTAL** (Màu cam/vàng pastel), Chuyên gia hiển thị nút **👶 PHỤ HUYNH PORTAL** (Màu hồng pastel).
  - Tương tác Candy Button: Thiết kế viền Slate `#1E293B` dày dặn `2px`, bóng đổ Memphis cứng `3px`, hover nảy đàn hồi và active đổi màu rực rỡ, giúp kiểm thử qua lại giữa 2 giao diện vô cùng tiện lợi mà không cần đăng nhập phức tạp.
- **Cấu trúc 4 Tab Chuyên gia Độc lập (Decoupled Sub-Tabs - Rule 10 & 11)**:
  - **Lịch hẹn với phụ huynh (`StaffAppointmentsTab.tsx`) - Tiêu điểm chính**:
    * Quản lý danh sách lịch hẹn động của Bác sĩ theo 4 trạng thái: Đã duyệt (`confirmed`), Chưa duyệt (`pending`), Lịch hẹn dời đang đợi duyệt (`reschedule_pending`), và Từ chối (`rejected`).
    * **Candy Buttons Duyệt & Phản hồi thời gian thực**:
      * Ca hẹn *Chưa duyệt (`pending`)*: Nút **Duyệt lịch hẹn ✅** (xanh Mint) và **Từ chối cuộc hẹn ❌** (đỏ Coral).
      * Ca hẹn *Đợi dời lịch (`reschedule_pending`)*: Nút **Đồng ý dời lịch ✅** (Tím pastel - lập tức chấp thuận ngày/giờ dời mới phụ huynh đề xuất và đưa trạng thái về `confirmed`) và **Từ chối dời / Giữ lịch cũ ❌** (Xám Slate - khôi phục ngày/giờ gốc và đưa về `confirmed`).
      * Ca hẹn *Đã duyệt (`confirmed`) + Online*: Tích hợp nút **Tham gia cuộc họp 🚀** mở link Google Meet trực tiếp.
    * **Clinical Ticket Modal dạng ngang**: Khi click vào card cuộc hẹn, mở ra tấm vé to rộng `780px` phân phối song song 2 cột: Details Bento Grid bên trái và sticker ghi chú Memphis chỉ dẫn hồ sơ chuẩn bị lâm sàng bên phải. Đầy đủ mã vạch barcode CSS, cuống vé và 2 lỗ khuyết vé lẹm hai bên sườn, triệt tiêu 100% scrollbar dọc.
  - **Hồ sơ cá nhân Chuyên gia (`StaffProfileTab.tsx`)**:
    * Sử dụng bố cục Thẻ Đơn (Single Card Board Layout) bo góc `24px` xoay nhẹ `-0.2deg` với bóng đổ Memphis `8px 8px 0px #1E293B`.
    * Phân cấp 3 vùng khoa học: Đầu thẻ (Avatar sticker + Họ tên lớn + dải liên hệ liên kết nhanh), Thân thẻ (Chi tiết 9 trường học thuật và thâm niên lâm sàng), Đuôi thẻ (Nút chỉnh sửa hồ sơ và Thay đổi mật khẩu bảo mật mở modal Memphis 3D).
    * Hỗ trợ tải ảnh đại diện trực tiếp Base64 qua File Uploader và hover overlay 📷 máy ảnh mượt mà.
  - **Thời khóa biểu Tuần (`StaffScheduleTab.tsx`)**:
    * Lịch dạy can thiệp cố định của giáo viên trong tuần được sắp đặt dạng 7 cột thứ ngang sặc sỡ luân chuyển màu pastel Memphis Memphis.
    * Mỗi thẻ ca học chứa khung giờ, loại trị liệu (ABA, Giao tiếp, Cảm giác...), tên trẻ, link/phòng học và nút đồng bộ hóa nhanh với Google Calendar lấp lánh.
  - **Hồ sơ can thiệp lâm sàng (`StaffInterventionTab.tsx`)**:
    * Quản lý danh sách các bé đang trị liệu do chuyên gia phụ trách.
    * Card trẻ chứa thông tin tuổi, phụ huynh, ngày bắt đầu, thang cấp độ tự kỷ (ASD Level 1/2/3) đổi màu badge pastel, thanh tiến trình Mastery Progress 3D co dãn sinh động, dải mục tiêu can thiệp và nhật ký chẩn đoán buổi học gần nhất.
- **Tối ưu Responsive & i18n Song ngữ**:
  - Hỗ trợ dịch thuật song ngữ Anh - Việt hoàn hảo cho tất cả các nhãn, placeholder, banner cảnh báo lỗi và toast thông báo thành công.
  - Toàn bộ 4 tab đều tự động chuyển đổi cấu trúc linh hoạt trên mobile: Sidebar chuyển thành cuộn ngang, timeline tuần xếp dọc, Bento grid modal co về 1 cột, ẩn vết khuyết vé an toàn 100% không vỡ giao diện.
- **Build Verification**:
  - Khắc phục triệt để các lỗi biên dịch TypeScript `TS6133` (unused variables) và `TS2339` (missing properties in dictionary).
  - Chạy biên dịch sản phẩm Vite `npm run build` thành công 100% sạch sẽ và cực nhanh chỉ trong **309ms**, hoàn toàn không còn bất kỳ lỗi nào trên toàn bộ dự án.

## [2026-05-24] - Cải tiến Giao diện Hệ thống Trung tâm trên Homepage
- **Implementation**:
  - **Xóa hiển thị Mã trung tâm (Center ID)** khỏi tệp [CentersSection.tsx](file:///e:/Đồ án tốt nghiệp/AutiCare-Design/src/components/homepage/CentersSection.tsx) (bản xem trước ở trang chủ) và tệp [AllCentersPage.tsx](file:///e:/Đồ án tốt nghiệp/AutiCare-Design/src/components/homepage/AllCentersPage.tsx) (trang danh sách đầy đủ tất cả trung tâm).
  - **Tối ưu hóa UI/UX**: Loại bỏ hoàn toàn nhãn hiển thị `<span className="center-card-id">{center.id}</span>` ở phần footer của các thẻ trung tâm dạng sticker. Điều này giúp giao diện trở nên sạch sẽ, thông thoáng hơn, đồng thời bảo mật tốt hơn các mã định danh nội bộ của hệ thống.
  - **Bảo toàn phong cách thiết kế**: Giữ nguyên cấu trúc lưới Playful Geometric, nền kem ấm `#FFF8F0` / `#FFFDF5`, viền Slate `#1E293B`, hiệu ứng hover nảy bounce nhẹ nhàng và hiển thị tỉnh thành đầy đủ.
- **Walkthrough**:
  - Các card trung tâm hiển thị trên trang chủ và trang phụ All Centers Page giờ chỉ hiển thị Tỉnh/Thành phố ở phần chân thẻ (footer) một cách tinh gọn và cân đối, không còn dòng mã ID kỹ thuật thô kệch.
