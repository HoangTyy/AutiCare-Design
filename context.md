# Project Context: AutiCare Design (Professional Edition)

## Overview
**AutiCare** là nền tảng chuyên biệt hỗ trợ sàng lọc và quản lý trẻ phổ tự kỷ, được thiết kế dành cho giáo viên, phụ huynh và chuyên gia can thiệp sớm. Dự án tập trung toàn lực vào **Design** — xây dựng hệ thống giao diện chuyên nghiệp, hiện đại và thân thiện, kết hợp phong cách "Funtopia" (vui tươi nhưng nghiêm túc) với kiến trúc UI cao cấp. Trang Landing Page sử dụng nền ấm #FFF8D1, hiệu ứng Neon Logo và Glass Card; trang Admin Dashboard áp dụng theme **Midnight Indigo** với Floating Island layout, bảng dữ liệu kiểu thẻ nổi, hệ thống Modal ngữ cảnh và tìm kiếm phân cấp. Toàn bộ thiết kế được tài liệu hóa chi tiết qua 2 trang **Design Code Documentation**, hỗ trợ song ngữ Việt/Anh, và có thể tùy chỉnh real-time qua **Design Lab**.
**Role** Hệ thống được chia thành các góc nhìn của các vai trò như : Guest, Parent, Teacher, Doctor, Center Director, Admin, đây là một hệ thống nhằm kết nối phụ huynh với bác sĩ, phụ huynh với giáo viên, và các bác sĩ, giáo viên sẽ được quản lý bởi các Center khác nhau. Parent có thể tạo hồ sở trẻ và Parent có thể book lịch thăm/khám với bác sĩ để chuẩn đoán phổ tự kỷ cho con em,.... Bác sĩ có thể chẩn đoán và trả kết quả,... đó là sơ lược về tầm nhìn.

## Design Philosophy
- **Dynamic & Reactive Theming**: Fully reactive to the **Design Lab** with a default **Slate & Teal** premium theme.
- **Signature Aesthetics**: Uses a deep slate shell (#0F172A) with a subtle off-white workspace (#F8FAFC).
- **Floating Row Architecture**: Data tables use a unique **Floating Card** design with high-legibility Slate-800 text.
- **Interactive Modals**: Integrated smooth, **backdrop-blurred** modals for all CRUD operations.
- **Decoupled Modularity (Rule 10)**: High-maintainability split-file architecture where each operational tab is a separate `.tsx` component under `src/components/dashboard/`.
- **Center Ownership Data Model**: Exercise Levels and Exercise Categories belong entirely to individual Centers, supporting custom tailored configurations per Early Intervention facility.

## Technology Stack
- **Frontend**: React (Vite) + TypeScript.
- **Typography**: Titan One (Logo), Fredoka (UI), Inter (System), Be Vietnam Pro (Default body font for highly legible Vietnamese content).
- **i18n**: Custom state-based translation dictionary (VN/EN) integrated reactively inside every tab.

## Key Modules
1. **Landing Page**: Redesigned header with Nav Links (Left), Neon Logo (Center), and Minimalist Icons (Right). Redesigned homepage with high-end, elegant light warm cream (#FFF8F0) background, 3D WebGL Three.js interactive floating particle sphere (ThreeBackground.tsx), five snap-scrollable desktop sections (Hero, Categories Bento Grid, Glowing Reviews, Statistic About Counters, Gradient CTA Banner), developers and Mentor footer, and a custom right-floating glassmorphic section nav indicator (FloatingNav.tsx).
2. **Admin Dashboard**: 
    - **Sidebar & Topbar**: Unified **Midnight Indigo** theme with neon branding and glassmorphism interactive states.
    - **Contextual UI**: Modals and breadcrumbs dynamically update based on the active tab for precise user guidance.
    - **Workspace**: Modular "Floating Island" layout with **Live Search capabilities** and an integrated **Modal System**.
    - **Decoupled Sub-Tabs (`src/components/dashboard/`)**:
        - `CentersTab.tsx`: Lists and handles CRUD operations for Early Intervention Centers.
        - `CenterDetailView.tsx`: Sub-shell navigation ("Tổng quan", "Cấp độ bài tập", "Danh mục bài tập") for selected center details.
        - `CenterLevelsTab.tsx`: Manages center-specific exercise difficulty levels (e.g., Dễ, Trung bình, Khó).
        - `CenterCategoriesTab.tsx`: Manages center-specific exercise categories with high-contrast tree-line hierarchy and Cyber Blue glow highlights.
        - `StaffsTab.tsx`: Manages staff roster with reactive search and CRUD.
        - `ObjectivesTab.tsx`: Manages behavioral training objectives.
        - `BlogsTab.tsx`: Manages communications blog articles.
3. **Smart Design Lab**: Context-aware customizer with granular contrast control and descriptive component labels for precise theming.
4. **Design Code Documentation**: 2 interactive dark-themed pages documenting every UI component, token, animation, and layout pattern. Accessed via `</>` buttons from Homepage and Admin.
5. **Tool Assessment Page (Trang Đánh giá Công cụ)**: Giao diện đánh giá độc lập áp dụng **Playful Geometric Design System** theo phong cách "Medical Playful" — cấu trúc nội dung nghiêm túc, decoration xung quanh sống động và có cá tính. Design tokens: nền `#FFFDF5` warm cream với polka-dot pattern overlay (28px grid), hard shadow system (`--shadow-sm/md/lg`: offset chunky `N px N px 0px #1E293B`, không blur). Font toàn trang: `Be Vietnam Pro` (Rule 9). Mỗi trong 4 nhóm công cụ lâm sàng có màu định danh riêng: Nhóm 1 Chẩn đoán chuyên sâu = Amber `#FBBF24`, Nhóm 2 Sàng lọc nhanh = Pink `#F472B6`, Nhóm 3 Hành vi thích ứng = Violet `#8B5CF6`, Nhóm 4 Tâm vận động = Blue `#60A5FA`. Group Cards active hiển thị hard shadow màu nhóm + wiggle icon animation. Tool Cards dạng Sticker Card (`border: 2px solid #1E293B`, shadow offset). Buttons kiểu Candy (violet pill, chunky border, hard shadow, bounce hover translate). Modal dạng Pop Dialog (`box-shadow: 12px 12px 0 #1E293B`, dot-pattern header band, entrance scale bounce). Toasts pop bounce. 4 floating decoration shapes (circles/triangle/square) animated nhẹ nhàng ở góc trang, ẩn trên mobile. Design Lab hỗ trợ 10 biến màu (6 base + 4 màu nhóm) real-time qua `.assessment-theme-root`. Accessibility: `prefers-reduced-motion` compliant.

## Current State
- [x] Reorganized Exercise Levels & Exercise Categories to belong to individual Centers instead of being global.
- [x] Restructured dashboard code by breaking it down into 7 decoupled files (Rule 10).
- [x] Created `CenterDetailView.tsx` with deep inner navigation for specific center settings.
- [x] Expanded detailed center sub-navigation from 3 to 5 sub-tabs (Overview Info, Exercise Levels, Exercise Categories, Center Roles, Center Staffs).
- [x] Developed modular `CenterRolesTab.tsx` and `CenterStaffsTab.tsx` specifically scoped under individual centers to manage center-owned roles, permissions, and staff roster.
- [x] Implemented standard database schema metadata fields directly in the Overview Info cards (center_id, center_name, address, phone_number, email, date) to map system data structures cleanly.
- [x] Integrated an inline editing form popup to edit and sync center metadata instantly.
- [x] Implemented secure, double-confirmation center deletion that prevents accidental deletes by verifying the center ID in an red-themed glass confirmation modal.
- [x] Built a gorgeous "Statistical Analysis" bento section in the center overview with custom interactive SVG charts (a vertical column chart showing cumulative hours with hover tooltips, and a linear wave area chart showing development domains against standards) labeled with a pulsing green neon badge "Biểu đồ ví dụ" (VN) / "Example Chart" (EN).
- [x] Confirmed a 100% clean production build free of any TypeScript compiler or syntax errors.
- [x] Restored premium Slate & Teal colors to `.admin-theme-root` in `src/index.css` as the CSS default values to completely eliminate layout background glitches or flashes of wrong color variables.
- [x] Hardened theme syncing in `src/App.tsx` and `ThemeCustomizer.tsx` with top-level class wrapping, next-frame scheduling via `requestAnimationFrame`, and defensive root elements fallback for seamless visual rendering.
- [x] Designed a professional Discord-style role management panel (CenterRolesTab.tsx) that models early intervention centers as Discord Guilds, incorporating custom roles and 3 locked system default roles (Center Director, Clinical Doctor, Intervention Teacher).
- [x] Implemented a seamless reordering priority vertical checklist using HTML5 drag-and-drop. Dragging cards triggers an instant real-time swap animation, automatically updating priorities from top to bottom (priority 1 is highest priority).
- [x] Upgraded drag interactions with a premium dynamic sliding translation where other role cards automatically animate and slide up/down by exactly 62px (card height + gap) to make room in real-time as the cursor hovers. Actual list state mutation and save are deferred until the drop event, completely eliminating jumping glitches or visual jitter, resulting in a world-class reordering experience.
- [x] Enforced robust security constraints by making all system default roles completely read-only, disabling name, status inputs, delete buttons, and all permission toggles for a highly stable and secure system layout.
- [x] Configured 8 granular system-wide permissions (manage_center, manage_staffs, manage_roles, view_analytics, manage_levels, manage_categories, manage_exercises, manage_blogs) with icons and bilingual descriptions.
- [x] Replaced automatic instant-saving with a manual commit workflow using two state comparison buffers (initialRoles and currentRoles) to ensure zero unauthorized updates to the database.
- [x] Developed a gorgeous Discord-style floating bottom Save Bar (Cẩn thận! Bạn có những thay đổi chưa lưu) that slides up using a 3D elastic spring animation only when changes exist. If the user manually reverts all changes back to their original values, the bar automatically detects the match and slides away without requiring action.
- [x] Integrated Discard (Reset) and Save buttons inside the floating bar. Saving writes the state to the parent, updates the local initial Roles buffer to clear the difference, and flashes a premium green success toast (✨ Đã lưu thay đổi thành công).
- [x] Resolved a critical global theme leakage bug where returning to the Landing Page after visiting the Admin Dashboard left a pitch-black/slate background on the homepage. Fixed by introducing unique React key props to the wrapper div elements in `src/App.tsx` (`key="admin-view"` and `key="landing-view"`) to completely prevent DOM node reuse, and refactored `ThemeCustomizer.tsx` to strictly target the `.admin-theme-root` element (avoiding polluting the global `document.documentElement` element when transitioning to the admin theme).
- [x] Overhauled the Homepage landing structure (excluding header) into a premium, world-class design utilizing curated palettes, elegant rounded corners, and dynamic animations.
- [x] Overhauled the Homepage landing background from static scattered dots into a gorgeous, highly interactive **3D WebGL Neural Constellation Network** in `ThreeBackground.tsx`. Built 110 pulsing glow particles floating in 3D, dynamically connected by thin neural-like wire lines. Integrated mouse physical attractor forces that attract floating nodes to the cursor, and configured a dynamic link system that automatically draws vivid neon connection lines from the user's cursor to nearest nodes as the mouse moves over the viewport, perfectly symbolizing clinical early child brain interventions.
- [x] Restored the dynamic WebGL render loop by replacing raw array modifications with standard Three.js reference-tracked Float32Array updates and the `positionsAttr.setXYZ` API. This completely resolved the memory synchronization/freeze issue and successfully restored fluid 60 FPS constellation movement.
- [x] Resolved a critical scroll snap bug where the Footer could not be scrolled into view on Desktop. Discovered that the `<Footer>` tag was placed outside `<main>`, causing cross-boundary snapping conflicts where the browser repeatedly snapped back to the `#cta` section. Fixed by moving `<Footer>` inside the `<main>` tag so all sections are layout siblings under the same container, and declared `scroll-snap-align: end` for `.footer-section` to snap flawlessly to the footer at the very bottom.
- [x] Completed visual browser verification and compiled Vite successfully with 100% clean production build outputs.
- [x] Resolved a minor TypeScript compilation issue where the unused `setView` prop in `HeroSection.tsx` blocked production build compilation, updating it in both the component definition and `App.tsx` instance to produce a 100% warning-free build.
- [x] Performed automated browser interactive visual layout verification to confirm correct landing page split columns, centered bento 3D action buttons, correct bilingual quotes, and synchronized footer snapping.
- [x] Expanded the "Create New Center" modal form to include `address`, `phone_number`, `email`, and `Assign center director`. Form logic now automatically generates system default roles and assigns the new director to the `staffs` roster of the freshly created center. Redesigned the modal body into a clean 2-column CSS grid.
- [x] Restructured Action Buttons UI: Removed the "Edit" and "Delete" buttons from the `CentersTab` list view to declutter the table. Re-integrated them directly inside the `CenterDetailView` overview card header to ensure users review center details before performing destructive or modifying actions.
- [x] Enhanced the Center Editing form to support dynamic assignment and modification of the Center Director, automatically maintaining synchronization with the internal staff roster (role `R-DIR`).
- [x] Replaced the `Center Director` column with `Physical Address` column in the center list view of `CentersTab.tsx`. Displays the geographic address of the center, falling back to "Chưa cập nhật / Not updated" if empty. This provides a direct spatial context of the clinics at first glance.
- [x] Xây dựng thành công Trang chọn bài test Đánh giá Công cụ (`ToolAssessmentPage.tsx`) song ngữ hoàn hảo hỗ trợ 10 bài test lâm sàng chi tiết chia thành 4 nhóm nội dung.
- [x] Tái thiết kế toàn diện trang Đánh giá Công cụ (`ToolAssessmentPage.css`) sang tông màu sáng kem ấm áp y tế chuyên nghiệp và gần gũi (#FFF8F0), các thẻ trắng sữa (#FFFFFF) có độ bo góc hợp lý và đổ bóng mờ siêu mịn (soft shadows), loại bỏ hoàn toàn neon phát sáng cyber.
- [x] Tích hợp Popup giới thiệu lâm sàng chi tiết cho từng công cụ và hệ thống thông báo Toast lấp lánh phản hồi ngữ cảnh.
- [x] Mở rộng Smart Design Lab (`ThemeCustomizer.tsx`) hỗ trợ chỉnh sửa bảng màu riêng biệt của trang Đánh giá Công cụ theo thời gian thực mà không làm rò rỉ giao diện.
- [x] Khắc phục triệt để các lỗi biên dịch TypeScript `TS6133` (unused variables) trong `ObjectivesTab.tsx` và xác thực quy trình biên dịch sản phẩm `npm run build` thành công 100% không cảnh báo sau khi đổi màu.
- [x] Tái cấu trúc toàn diện, di chuyển toàn bộ mô-đun Sàng lọc (Screening) thành Đánh giá Công cụ (Tool Assessment), chuyển đổi tên lớp CSS và biến `--screening-*` thành `--assessment-*` độc lập hoàn hảo.
- [x] Dọn dẹp hoàn toàn các tệp và thư mục sàng lọc cũ (`src/components/screening/`) và xác thực Vite production build thành công 100% không cảnh báo.
- [x] Nâng cấp tương tác duyệt danh sách trung tâm (`CentersTab.tsx`): Cho phép người dùng click trực tiếp vào bất kỳ vị trí nào trên hàng dữ liệu trung tâm (`<tr>`) để điều hướng trực tiếp sang trang Chi tiết trung tâm (`CenterDetailView`). Cấu hình thuộc tính `cursor: pointer` tạo bàn tay chỉ hướng trực quan khi rê chuột, cùng cơ chế `e.stopPropagation()` ở nút biểu tượng con mắt cũ để tránh đúp sự kiện click chuột.

## Homepage Design Context Update - Neo-Brutalism AutiCare Palette (2026-05-21)

Trang Landing Page hien tai da duoc tai thiet ke theo phong cach **Neo-Brutalism** nhung van giu nguyen he mau thuong hieu AutiCare va kha nang tuy bien cua **Design Lab**. He mau khong chuyen sang palette neo-brutalism mac dinh trong brief, ma mapping truc tiep len token hien co: Primary Blue `#0084FF`, Secondary Green `#2AC176`, Accent Coral `#FF6B6B`, Warning Yellow `#FFD93D`, Warm Cream Background `#FFF8D1`, va Ink Black `#000000` lam mau cau truc cho border/shadow/text emphasis. Muc tieu la tao cam giac "digital sticker board" manh me, tre trung, co tinh cach, nhung khong lam mat ban sac mau sac AutiCare da co.

## Homepage Auth Modal Context Update - Create Account Fit Fix (2026-05-21)

Auth Modal cua Homepage hien dang la modal duy nhat chua 3 trang thai `signIn`, `signUp`, va `forgot`, khong tach thanh route rieng. Component `src/components/auth/AuthModal.tsx` gan class theo mode truc tiep tren shell (`auth-mode-signIn`, `auth-mode-signUp`, `auth-mode-forgot`) de CSS co the dieu chinh mat do tung form ma van giu slip transition khi chuyen qua lai. Form mac dinh la Sign in, co demo account `Auticare Admin`; Sign up/Create Account co nhieu field hon nen duoc can noi dung tu phia tren thay vi center tuyet doi.

Vung `.auth-form-zone` trong `src/App.css` khong con khoa bang `overflow: hidden`; thay vao do dung scroll doc noi bo voi scrollbar nho theo mau Slate/Playful Geometric. Shell modal co `max-height: min(820px, calc(100vh - 2rem))`, va rieng `auth-mode-signUp` co grid desktop rong hon cho cot form (`0.72fr 1.28fr`), min-height poster 620px, spacing form/input/subtitle duoc nen nhe de toan bo Full name, Email, Password, Confirm password, submit va switch row hien thi day du. Tren desktop co chieu cao thap, media query giam padding va heading; tren mobile, Create Account luon ep ve 1 cot va bo max-height noi bo de overlay cuon tu nhien. Thiet ke van giu Playful Geometric: nen cream, card trang, border Slate 2px, hard shadow, rounded 24px, nut pill violet.

### Tong Quan Visual System Homepage
- **Canvas / Background**: `app-shell` va cac section Landing su dung nen kem `--bg-main` ket hop dot-grid va graph-paper texture bang `radial-gradient` + `linear-gradient`. Nen khong con flat/glass nhu truoc; texture giup trang co chat giay in, collage, va giam cam giac "AI clean SaaS".
- **Structural Ink**: Moi phan tu quan trong tren Homepage dung border den day 3-4px va hard shadow offset. Shadow khong co blur, dung cac token CSS trong `src/App.css`: `--neo-shadow-sm`, `--neo-shadow-md`, `--neo-shadow-lg`.
- **Cards / Panels**: Class `.glass` tren Homepage khong con glassmorphism/backdrop blur; no duoc override thanh panel trang co border den, shadow cung, radius 0. Dieu nay giu lai API class hien co trong component nhung doi han hanh vi visual.
- **Typography**: Van dung `Be Vietnam Pro` theo Rule 9. Homepage headline/title duoc set `font-weight: 900`, uppercase, tight line-height, text-shadow cung bang mau AutiCare (xanh/vang/trang) thay cho gradient/glow mem. Logo van dung `Titan One` nhung duoc dong goi trong sticker box.
- **Motion**: Motion chuyen tu smooth/glow sang co hoc: hover card lift len va shadow lon hon, button active translate che shadow, logo wobble nhe, image hero float kieu sticker. Co `prefers-reduced-motion` de tat animation khi nguoi dung yeu cau.

### Navbar
- Navbar khong con full-width blur bar. Hien tai la mot block co `border: 4px solid #000`, hard shadow, nam cach top 14px va can giua theo viewport.
- Logo AutiCare la sticker mau Primary Blue voi border den va shadow cung, dung `Titan One`; hover/click van scroll ve Hero.
- Nav link la text uppercase dam. Active/hover doi sang nen Warning Yellow, border den, shadow 3px va rotation nhe.
- Icon buttons va language switch VN/EN deu la square neo-brutalist controls, giu day du chuc nang: Search icon, Design Code, Admin Dashboard, doi ngon ngu.

### Hero Section
- Hero giu `ThreeBackground` WebGL, nhung noi dung chinh chuyen thanh collage board: `.hero-content` co border den, shadow lon, rotate nhe va nen chia block trang/xanh duong nhat.
- H1 dung text-shadow Primary Blue, uppercase lon, khong gradient/glow.
- Description nam trong sticker panel nen kem, border den 3px, shadow cung, font dam de tang do doc.
- CTA `START ASSESSMENT / BAT DAU DANH GIA` van dung `TiltButton` nhung radius da doi ve `0`, CSS ep border den va hard shadow de co cam giac nut vat ly.
- Hero image duoc dat trong framed sticker panel trang, phia sau co hinh nen vang xoay nhe. Cac decorative badges `EARLY INTERVENTION`, `AUTICARE`, `+ CARE` duoc tao bang pseudo-elements trong CSS.

### Categories Section
- `CategoriesSection.tsx` van giu du lieu song ngu va 4 cards hien co. Moi card hien tai la sticker card: radius 0, border den, hard shadow, rotation xen ke, hover lift.
- Badge tag cua tung card nam cheo tren goc, border den, shadow cung. Mau badge van lay tu `cat.borderColor`, tuong ung palette AutiCare: Blue, Green, Coral, Yellow.
- Icon box la square co border/shadow; hover xoay va scale nhe.
- Nut "View exercises" / "Xem chi tiet bai tap" dung `TiltButton` radius 0, hard shadow, press interaction.

### Reviews Section
- Review cards chuyen sang sticker cards co rotation nhe tung card. Rating stars duoc lam dam hon voi stroke den.
- Quote khong con italic mem; text dam, den, de doc trong phong cach editorial zine.
- Avatar reviewer la circle badge co border den, shadow cung, nen Secondary Green.
- Badge tag cua review dung Primary Blue, absolute tren card, rotation nhe.

### About Section
- About layout van la 2 cot desktop va stack mobile. Stats panel va vision panel la hai sticker boards xoay nguoc nhau nhe.
- Stat cards dung nen kem/trang xen ke, border den 3px, shadow cung. So thong ke co `-webkit-text-stroke` den nhe de day chat poster.
- Vision panel co dot pattern rieng, heading uppercase text-shadow Secondary Green, nut action radius 0.

### CTA Section
- CTA banner la color-block lon voi hai mau Accent Coral va Warning Yellow, border den, shadow lon, rotation nhe.
- Decorative circle badge `GO` mau Primary Blue xoay cham o goc tren.
- CTA title co text-shadow trang cung; paragraph nam trong panel trang co border/shadow.
- Button CTA dung nen trang, border/shadow neo-brutalist, press interaction.

### Footer
- Footer giu thong tin team, mentor, quick links va contact. Visual chuyen thanh grid cac column card rieng, moi card border den/shadow cung va rotate nhe.
- Footer logo la sticker, social buttons la square controls mau Primary Blue, hover Warning Yellow.
- Mentor card co badge Accent Coral, dev dots dung Secondary Green.
- Footer bottom la panel rieng co border den/shadow cung.

### Responsive & Design Lab Compatibility
- Desktop van giu scroll snap theo tung section. Tablet chuyen Bento/Reviews/Footer ve 2 cot. Mobile stack 1 cot, an floating nav, giam rotation bang override `transform: none !important` cho card/panel de khong vo layout.
- Design Lab Landing van su dung `ThemeCustomizer.tsx` voi cac bien `--primary`, `--secondary`, `--accent`, `--bg-main`, `--text-main`. CSS Homepage moi dung cac bien nay lam token neo-brutalist (`--neo-blue`, `--neo-green`, `--neo-red`, `--neo-paper`) nen khi doi mau trong Design Lab, visual sticker/color-block cap nhat theo.
- Build verification ngay sau redesign bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367` so sanh `"view"` voi `"edit"`). Chua ghi nhan loi TypeScript moi tu cac file Homepage da sua.

### Header Refinement - Zoom 100% Fit (2026-05-21)
- Header Homepage da duoc noi rong de vua hon o zoom 100% tren desktop. `.navbar` hien dung `width: min(1360px, calc(100% - 20px))`, thay cho gioi han 1180px cu. Dieu nay tao them khong gian cho nav links ben trai, logo giua, icon/doi ngon ngu ben phai.
- `.navbar .nav-content` override `max-width: none` de khong bi class `.container` ep vao gioi han noi dung cu. Grid header hien la `minmax(470px, 1fr) auto minmax(430px, 1fr)`, giup bo cuc on dinh hon khi zoom 100% va tranh wrap som tren desktop, dong thoi co them cho nut Login.
- Logo `AUTICARE` trong `.neon-text` va `.neon-text-static` da doi chu sang trang `#FFFFFF` kem `text-shadow: 2px 2px 0 #000000`. Nen logo van lay Primary Blue tu Design Lab, nhung chu khong con bi toi/kho nhin tren mau xanh dam.
- Build verification sau tinh chinh header van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`), khong phai loi phat sinh tu CSS header.

### Auth Modal - Sign in / Sign up / Forgot Password (2026-05-21)
- Homepage hien co them `AuthModal` tai `src/components/auth/AuthModal.tsx`. Day la modal xac thuc noi bo trong Landing Page, khong tao route/page rieng. Modal duoc mo tu nut `Login` tren header trong `src/App.tsx`.
- Moi lan mo modal, state mac dinh la `Sign in`. Modal quan ly 3 mode: `signIn`, `signUp`, `forgot`. `modeOrder` duoc dung de xac dinh huong slip animation khi chuyen form.
- `Sign in` gom email, password, remember me, link Forgot Password, link Register, va nut **Sign in with Google**. Google button la UI-only theo yeu cau, chua ket noi provider/backend.
- `Sign up` gom full name, email, password, confirm password va link quay lai Sign in. `Forgot Password` gom email va nut gui lien ket khoi phuc, kem link Back to Sign in.
- Chuyen doi form dung hieu ung **Slip** trong cung modal: `auth-slip-forward` truot tu phai sang trai cho Register/Forgot, `auth-slip-backward` truot nguoc khi quay lai Sign in. Panel form duoc render lai bang `key={mode}` de animation chay moi lan doi mode.
- Modal giu style Neo-Brutalism cua Homepage: overlay dot pattern tren nen kem, shell border den 4px va hard shadow 16px, poster ben trai Primary Blue co grid pattern, sticker `SECURE` va `CARE ID`, logo AutiCare dang poster, input/nut deu co border den va hard shadow.
- Modal co accessibility co ban: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, nut close co `aria-label`, dong bang overlay click hoac phim `Escape`.
- Responsive: desktop modal 2 cot poster/form, mobile chuyen 1 cot, poster thu gon, an poster grid, giam shadow va bo rotation de khong tran viewport.
- Build verification sau khi them modal van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`); khong ghi nhan loi moi tu Auth Modal.

### Demo Authentication State - Auticare Admin (2026-05-21)
- Homepage hien co state dang nhap UI-only trong `src/App.tsx`: `currentUserName`. Khi null, header hien nut `Login`; khi co gia tri, header hien chip user va nut Sign out.
- Tai khoan mau mac dinh la `Auticare Admin`. Form Sign in trong `AuthModal.tsx` da dien san email `admin@auticare.vn` va password `auticare-admin`. Nguoi dung khong can nhap du lieu; chi can bam nut Sign in.
- `AuthModal` nhan prop `onSignIn`. Khi submit form Sign in hoac bam `Sign in with Google`, component goi `onSignIn()`, dong modal, va App set `currentUserName` thanh `Auticare Admin`.
- Header sau dang nhap: an nut Login, hien `.auth-user-chip` voi text `Auticare Admin` va `.auth-signout-btn`. Bam Sign out se `setCurrentUserName(null)`, dua UI ve trang thai chua dang nhap.
- CSS session tren header giu Neo-Brutalism: user chip nen Secondary Green, border den day, hard shadow; Sign out la nut trang border den, hard shadow, co hover/active co hoc nhu cac nut header khac.
- Day moi la demo interaction phuc vu thiet ke, chua ket noi backend/session storage/provider Google that.

### Homepage Typography & 90% Density Calibration (2026-05-21)
- Homepage hien tai duoc chuan hoa de **tat ca noi dung ngoai Header** dung font `Be Vietnam Pro`: vung `main`, tung `.snap-section`, Footer, FloatingNav, Auth Modal va Landing Design Lab. Header duoc tach scope rieng, khong bi rule typography cua section ep truc tiep; logo `AutiCare` van dung `Titan One`.
- `src/App.css` co rule scope moi cho `.app-shell.landing-active main`, `.footer-section`, `.floating-nav-container`, `.auth-modal-overlay`, `.theme-customizer` de dam bao font Be Vietnam Pro ap dung dong bo cho noi dung thiet ke, dung Rule 9 ma khong lam Header bi doi ngoai y muon.
- Mat do hien thi desktop da duoc thu gon de browser zoom 100% cho cam giac gan voi zoom 90% cu. Container noi dung Landing va Footer hien su dung max-width 1080px, thay vi mac dinh 1200px cua `.container`. Header van giu thiet lap rieng `.navbar .nav-content { max-width: none; }`.
- Desktop snap section giam top offset tu 96px ve 82px de co them khong gian doc ben trong viewport. Hero panel giam max-width ve 1080px, padding/gap/description/image giam nhe, giup Hero khong mat noi dung khi o zoom 100%.
- Section title va subtitle giam clamp font-size, padding, margin va max-width. Bento cards giam gap, padding, min-height va body text; Reviews cards giam padding/min-height/text; About stats/vision giam spacing, stat number va body text.
- CTA banner giam width/padding/font/button; Footer giam padding section, grid gap, card padding, social icon, list gap va copyright padding. Tat ca thay doi chi nham dieu chinh density, khong thay doi mau sac, border den day, hard shadow, rotation sticker, hay Design Lab color-variable mapping.
- Build verification sau thay doi density van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`), khong phai loi tu Homepage CSS.

### Homepage Hero Readability & Category Grid Alignment (2026-05-21)
- Hero headline `.glow-text` da duoc dieu chinh de tang do doc tren nen trang cua collage board. Shadow xanh Primary Blue offset lon da duoc thay bang chu den co `-webkit-text-stroke: 1px #000`, `paint-order: stroke fill`, shadow trang 3px va shadow vang 6px. Cach nay giu DNA poster/neo-brutalism nhung khong tao cam giac chu bi nhan doi kho nhin.
- Section Danh muc `.bento-grid` duoc them `margin-left/right: auto` va offset desktop rieng trong media query `@media (min-width: 1121px)` voi `.category .bento-grid { left: -2.8rem; }`. Muc tieu la sua cam giac 4 sticker cards bi lech sang phai tai desktop 100% zoom, trong khi khong anh huong tablet/mobile.
- Cac card Danh muc van giu 4 cot desktop, sticker rotation xen ke, badge mau theo tung category, border den day, hard shadow va nut TiltButton radius 0.
- Build verification sau thay doi CSS van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`), khong phai loi tu Homepage CSS.

### Homepage Hero Line Spacing & TiltButton Surface Fix (2026-05-21)
- Hero headline `.glow-text` hien dung `line-height: 1.08` thay vi `0.95`, va `margin-bottom: 1.15rem`. Muc tieu la tao them khoang cach doc giua cac dong title dai co dau tieng Viet, tranh dau/chu dong tren de vao dong duoi khi headline wrap tren desktop 100% zoom.
- Cac nut trong Homepage su dung `react-tilt-button` duoc override theo class noi bo cua thu vien: `.soft-btn`, `.soft-btn__wrapper`, `.soft-btn__content`, `.soft-btn__inner`. Trước do nut bi hien nhu mot surface mau nho nam trong khung trang do outer button co border/padding va content cua thu vien tru di elevation.
- CSS moi dat `--button-raise-level: 0px`, an `.soft-btn__wrapper::before`, dua border den vao `.soft-btn__content`, ep wrapper/content/inner full width-height, va bo padding o button goc. Ket qua: surface mau lap day toan bo nut, van giu border den 4px, hard shadow va active press interaction.
- Hero button co width toi da 360px, height 58px va text nowrap de tranh vo dong "BAT DAU DANH GIA" thanh hai dong. Bento/About/CTA buttons fill theo container, text can giua voi padding noi bo tren `.soft-btn__inner`.
- Build verification van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`), khong phai loi tu Homepage CSS.

### Homepage Header Notification & Design Code in Design Lab (2026-05-21)
- Header Homepage khong con hien icon `<>` truc tiep trong `.nav-icons`. Chuc nang mo trang Design Code Homepage da duoc di chuyen vao Design Lab de Header gon hon va dung y do "tools nam trong lab".
- `ThemeCustomizer.tsx` hien nhan prop tuy chon `onDesignCode`. Khi prop nay ton tai, panel Design Lab render nut `.design-code-lab-btn` ngay ben duoi hint text, gom icon text `<>` trong `.design-code-icon` va label `Design Code`. Landing truyen `onDesignCode={() => setView('designHomepage')}` tu `src/App.tsx`.
- Header co them notification icon dang chuong trong `.notification-menu`, nam o vi tri cu cua Design Code. Button co `.notification-dot` mau Accent Coral de bao hieu co thong bao moi, aria-label va aria-expanded theo ngon ngu hien tai.
- Click notification button se toggle `.notification-panel`, mot dropdown sticker card co border den 4px, hard shadow, mui tam giac o tren va 3 item button mau. Moi `.notification-item` co title xanh Primary Blue va body text den, hover/active theo co hoc.
- Noi dung thong bao mau song ngu theo `lang`: System Update / Cap nhat he thong, Account warning / Canh bao tai khoan, Meeting invite / Loi moi hop. Day la UI demo, chua ket noi backend notification store.
- Build verification van bi chan boi loi TypeScript co san trong `src/components/dashboard/StaffsTab.tsx` dong 471 va 512 (`TS2367`), khong phai loi tu Header/Design Lab/Notification.

### Homepage Playful Geometric Redesign Layer (2026-05-21)
- Homepage Landing hien da chuyen tu Neo-Brutalism den day sang **Playful Geometric** theo triet ly "Stable Grid, Wild Decoration". Kien truc React/component khong doi; thay doi chu yeu duoc gom thanh mot layer override o cuoi `src/App.css` ten `Playful Geometric Landing Layer`.
- Token Landing mac dinh trong `ThemeCustomizer.tsx` da doi sang: Primary/Violet `#8B5CF6`, Secondary/Pink `#F472B6`, Accent/Mint `#34D399`, Background/Cream `#FFFDF5`, Text/Slate `#1E293B`. Design Lab van co the chinh cac bien `--primary`, `--secondary`, `--accent`, `--bg-main`, `--text-main`.
- Do Rule 9 cua project, Homepage van dung `Be Vietnam Pro` cho tat ca noi dung thay vi Outfit/Plus Jakarta trong design brief. Header logo van giu `Titan One`.
- Visual system moi:
  - Ink khong con pure black ma chuyen sang Slate `#1E293B`.
  - Border mac dinh 2px, hard shadow khong blur `4px/6px/10px`, shadow nhe bang Slate-200 `#E2E8F0`.
  - Radius mac dinh lon hon: navbar 24px, cards 24px, hero/banner 32px, buttons rounded-full.
  - Background paper cream co dot-grid va diagonal/confetti pattern.
- Header:
  - `.navbar` la paper pill/card bo goc 24px, white background, slate border 2px, hard shadow 4px.
  - Nav links la pill controls; active/hover fill Amber `#FBBF24`.
  - Logo AutiCare la sticker rounded speech-bubble mau Violet, chu trang, khong dung neon glow.
  - Icon buttons rounded square 16px; Login/Auth chip/Sign out la pill controls.
- Hero:
  - `.hero-content` la blob/collage card bo goc `32px 32px 32px 8px`, shadow nhe Slate-200.
  - Nen hero card co primitive shapes: yellow circle sau text, violet/mint tint ben phai, dot-grid image frame.
  - Title `.glow-text` dung slate text + yellow hard shadow de doc ro, khong con stroke/glow den day.
  - Description la speech-bubble card white, border slate 2px, shadow nhe.
  - Image frame dung blob radius `42% 58%...`, dot pattern va hard shadow.
- Cards/Sections:
  - Categories, Reviews, About, Footer cards deu thanh sticker cards bo goc 24px, border slate 2px, hard shadow nhe.
  - Card shadows xoay mau theo thu tu: violet, pink, amber, mint de tao confetti effect.
  - Hover card dung bounce transition `cubic-bezier(0.34, 1.56, 0.64, 1)`, translate/rotate/scale nhe.
  - Icon boxes va avatar la circle chips co border/shadow, icon wiggle khi hover bento card.
- Buttons:
  - `react-tilt-button` tiep tuc duoc dung, nhung CSS override thanh Candy Button: rounded-full, border slate 2px, hard shadow, full surface fill, active press.
  - Hero/About/CTA buttons giu nowrap; Bento buttons can giua trong card.
- CTA/Footer/Auth/Notification/Design Lab:
  - CTA banner la color block Violet + Amber, rounded asymmetric.
  - Footer cards, mentor card, footer bottom deu bo goc va shadow nhe.
  - Auth Modal, Notification dropdown, Design Lab panel/button duoc dong bo Playful Geometric: rounded panels, slate border, hard shadow, dot/paper backgrounds.
- Responsive:
  - Mobile giam shadow token ve 2-4px, giam opacity decoration shapes de tranh overlap text. Cac rule stack mobile hien co van giu.
- Build verification:
  - Khắc phục hoàn toàn lỗi TypeScript TS2367 tồn đọng trong `StaffsTab.tsx` do so sánh vô nghĩa trong view mode, đưa toàn bộ dự án về trạng thái biên dịch thành công 100% không còn lỗi.

### Homepage Experts Popup & Actions Refinement (2026-05-21)
- **Nút bấm chính Hero (Landing Page)**: 2 nút "START ASSESSMENT" và "BOOK AN EXPERT NOW" sử dụng `react-tilt-button` đã được loại bỏ hoàn toàn các thẻ `<button.action-item>` bọc ngoài, giải quyết triệt để lỗi khung viền vuông đen. Cả hai nút có kích thước tối đa được căn chỉnh về `290px` (`width: min(290px, 100%)`) và hiển thị dạng **Candy Button** pill-shape bo tròn hoàn hảo (`border-radius: 999px`), có viền nổi `2px` và bóng đổ cứng của Slate `#1E293B`. Nhờ việc thu gọn kích thước này, hai nút được xếp song song nằm ngang hoàn chỉnh trên desktop, đưa nút "BOOK AN EXPERT" sang bên phải nút "START ASSESSMENT" mà không bị tự động xuống dòng do thiếu khoảng trống.
- **Popup Đặt lịch Chuyên gia (Experts Popup)**:
  - **Layout & Positioning**: Modal được đặt trực tiếp dưới `.hero.snap-section` (ngoài `.hero-content` có `transform`) để giải quyết triệt để giới hạn `position: fixed` của trình duyệt đối với các phần tử tổ tiên có transform, giúp popup hiển thị trên lớp cao nhất của toàn bộ màn hình, trên tất cả hình ảnh, logo và hiệu ứng WebGL.
  - **Backdrop Overlay**: Lớp phủ nền `.experts-popup-overlay` áp dụng màu nền tối sang trọng `rgba(15, 23, 42, 0.65)` (Slate 900) kết hợp hiệu ứng mờ mịn hậu cảnh `backdrop-filter: blur(8px) !important` và `z-index: 999999` để đảm bảo che phủ toàn bộ website khi mở.
  - **Thiết kế Thẻ Chuyên gia (Expert Card)**: Đạt tiêu chuẩn Playful Geometric, bo góc `20px`, viền Slate `#1E293B` dày `2px`, đổ bóng cứng lệch góc, hiệu ứng hover nâng nhẹ và xoay nghiêng `0.4deg` sinh động. Avatar dạng sticker tròn viền đen, màu nền pastel Memphis luân phiên (Violet, Pink, Yellow). Nút "Đặt lịch ngay" dạng Candy Button pill-shape màu Mint mát mắt.
- **Popup Hồ sơ Chi tiết Chuyên gia (Expert Detail View)**:
  - **Kích thước phóng khoáng và hoành tráng (Grander Scale)**: Kích thước tối đa `.expert-detail-panel` được mở rộng vượt trội lên `width: min(920px, calc(100% - 2rem))` (chiều ngang tăng gần 40%) và `max-height: min(880px, calc(100vh - 4rem))`. Điều này mang lại không gian cực kỳ thoáng đãng, phóng khoáng, tối ưu hóa hiển thị bento grid và các thẻ nhận xét phụ huynh, tạo trải nghiệm sticker dashboard đẳng cấp.
  - **Bố cục tiêu đề thẳng hàng & Chuyên nghiệp (Header Flex Layout)**:
    - Loại bỏ hoàn toàn lỗi đè chữ bằng cách phát triển lớp CSS `.header-info-group` cấu trúc Flexbox (`display: flex`, `align-items: center`, `gap: 1.5rem`) bọc avatar sticker và khối text chứa tên, chức danh nằm song song một cách chuẩn mực.
    - Cung cấp padding `1.75rem 2rem 1.25rem 2rem` đầy đủ cho `.experts-header` khi nằm trong panel chi tiết để thẳng hàng tuyệt đối với vùng nội dung chính bên dưới, loại bỏ tình trạng chữ sát sạt viền ngoài.
    - Avatar sticker `.detail-avatar` được phóng to lên `4.8rem` x `4.8rem` với font-size `1.5rem` và bóng đổ cứng `4px` chắc chắn.
    - Dòng chức vụ chuyên gia `.detail-expert-title` đổi sang màu Slate 600 dịu nhẹ, thanh lịch (`color: #475569`), tăng cỡ chữ lên `1.05rem` và font-weight `700`. Tên chuyên gia `h3` tăng cỡ chữ động lên `clamp(1.4rem, 2.5vw, 1.95rem)` đầy cá tính.
  - **Đồng bộ màu sắc avatar động (Dynamic Color Synchronization)**: Hệ thống tự động đối chiếu tên chuyên gia với danh sách chính để gán màu nền sticker tương đương (`#EDE9FE` cho TS. Minh, `#FCE7F3` cho Cô Lan, và `#FEF3C7` cho BS. Đức), duy trì tính nhất quán thị giác tối đa từ bên ngoài vào chi tiết.
  - **Cấu trúc Bento Grid thông thoáng**: Lưới bento `.expert-detail-bento` tăng khoảng cách gap lên `1.5rem`. Thẻ sticker `.detail-bento-card` nâng padding lên `1.5rem` kèm bóng đổ cứng sâu hơn (`6px`). Cỡ chữ tiêu đề bento card tăng lên `1.08rem`, nội dung `0.96rem` và số năm kinh nghiệm nổi bật phình to lên `2.2rem`.
  - **Danh sách nhận xét phụ huynh rộng rãi**: Thẻ đánh giá sticker `.feedback-item-card` nâng padding lên `1.35rem`, bóng đổ cứng `5px` và comment text `.feedback-comment` tăng cỡ lên `0.94rem` dễ đọc.
  - **Chân trang đồng điệu**: Phân vùng `.expert-detail-footer` nâng padding lên `1.5rem 2rem`, đổi sang nền trắng thuần và border nét đứt dashed mảnh màu xám Slate tạo nhịp điệu đồ họa liền mạch với đầu trang.
  - **Responsive di động hoàn hảo (Mobile Layout Adapts)**: Trên màn hình di động (`< 640px`), modal tự động thu hẹp padding đầu trang `.experts-header` xuống `1.15rem`, giảm gap `.header-info-group` xuống `0.85rem`, co nhỏ avatar xuống `3.6rem` x `3.6rem` và chữ số tiêu đề `h3` xuống `1.35rem` để hiển thị sắc nét, thẳng hàng và không bị tràn lề.

### Manage plans & Plan phase sub-system (2026-05-22)
- **Kiến trúc dữ liệu**:
  - Mỗi Kế hoạch Can thiệp (`Plan`) được liên kết với một ID chuyên gia can thiệp (`center_staff_id`) và trẻ phổ tự kỷ (`child_id`), nắm giữ các metadata gồm `plan_name`, `academic_year`, `assessment_tool`, `child_strengths`, `child_weaknesses`, `child_interests`, `family_feedback`, `start_date`, `end_date`, `status` và danh sách các giai đoạn lồng ghép (`phases`).
  - Mỗi giai đoạn (`PlanPhase`) chứa các thuộc tính `phase_name`, `phase_type`, `status` và hai danh sách con độc lập: Hoạt động can thiệp (`activities`) và Mục tiêu hành vi (`objectives`).
- **Giao diện Danh sách (PlansTab)**:
  - Áp dụng hoàn hảo phong cách **Playful Geometric Design** hệ thống: Sử dụng cấu trúc HTML & CSS đồng bộ hoàn toàn với các Tab quản lý khác trong Admin Dashboard (không sử dụng inline style).
  - Sử dụng các lớp CSS chung như `.dashboard-content-area`, `.table-header`, `.table-title`, `.table-actions`, `.search-bar`, `.add-btn` và `.data-table-wrapper` bao quanh `.data-table`.
  - Bộ nút thao tác cuối hàng (Actions) đồng bộ 100% bằng các icon SVG chất lượng cao: `view-btn-v2` (icon con mắt), `edit-btn-v2` (icon bút chì) và `delete-btn-v2` (icon thùng rác).
  - Tích hợp popup CRUD đồng bộ sử dụng `.modal-overlay`, `.admin-modal`, `.modal-header`, `.modal-body` và `.modal-footer` cùng với CSS form grid `.modal-form-grid` (có cấu trúc co giãn tự động 1 cột trên mobile < 720px) và modal xóa `.delete-confirm`.
- **Giao diện Chi tiết (PlanDetailView)**:
  - Tương tự triết lý của `CenterDetailView`, component này sử dụng hệ thống sub-navigation bên trong để hiển thị chi tiết Kế hoạch và danh sách Giai đoạn.
  - **Triết lý thiết kế Tương phản Thị giác (Visual Contrast & Flat Design)**:
    - **Phần thông tin chung (Plan Detail / Plan Profile Card)**: Được tinh giản tối đa, triệt tiêu sự màu mè sặc sỡ và chunky. Sử dụng cấu trúc phẳng (Flat Card) với đường viền Slate mỏng nhẹ (`1px solid #CBD5E1`), bóng đổ mờ mịn siêu nhẹ (`0 4px 20px rgba(15, 23, 42, 0.03)`). Tiêu đề và badge nhãn (`Plan Profile`) tối giản, màu Slate xám trầm trung tính `#64748B` trên nền `#F1F5F9`. Bốn hộp thông tin trẻ (Điểm mạnh, Điểm yếu, Sở thích, Phản hồi) xếp thành lưới Bento Grid 2 cột phẳng tĩnh lặng (nền `#F8FAFC`, viền `#E2E8F0`, không nhấc nổi hover), giúp thông tin hiển thị khoa học và sang trọng như một bệnh án y tế chuẩn mực. Các nút bấm góc trên cũng được phẳng hóa thanh nhã (Flat Buttons) không có bóng đổ cứng đen sẫm.
    - **Phần Giai đoạn can thiệp (Plan Phase / Phase-management-card)**: Giữ nguyên phong cách Playful Geometric đậm nét (viền đen sẫm dày `3px solid #1E293B` và bóng đổ cứng chắc chắn `8px 8px 0px #1E293B`) kết hợp hiệu ứng nhấc nổi 3D khi hover. Khi phần thông tin tĩnh ở trên phẳng lặng chìm xuống, vùng Giai đoạn can thiệp lồng ghép bên dưới tự động trở thành tiêu điểm thị giác cực mạnh, thu hút mọi tương tác làm việc của chuyên gia.
  - Mỗi Giai đoạn khi click vào chi tiết sẽ mở ra một vùng Workspace lồng ghép với 3 sub-tabs điều hướng bằng các thẻ tab bo góc nhô cao (`overview`, `activities`, `objectives`), đảm bảo tính chặt chẽ trong phân lớp giao diện và trải nghiệm editorial dashboard chuyên nghiệp.
  - Hỗ trợ đầy đủ i18n song ngữ (VN/EN) đồng bộ tức thời khi bấm nút chuyển đổi ngôn ngữ ở Header.
  - **Tối ưu hóa và loại bỏ Inline CSS**: Toàn bộ CSS định hình giao diện cho chi tiết kế hoạch đã được đưa vào khối `<style>` cục bộ và hệ thống class của Admin Dashboard, xóa bỏ hoàn toàn inline styles thô ráp.
  - **Lưới Form Grid 2 Cột và 5 Modals Hệ Thống**: Nâng cấp toàn diện 5 popup Modals (Chỉnh sửa Kế hoạch, Xóa Kế hoạch, Thêm/Sửa Giai đoạn, Thêm/Sửa Hoạt động, Thêm/Sửa Mục tiêu) sang cấu trúc chung thống nhất với lớp nền mờ `.modal-overlay`, khung gỗ `.admin-modal`, tiêu đề `.modal-header`, thân hộp `.modal-body` và chân nút `.modal-footer`. Các form nhập liệu sử dụng cấu trúc lưới `.modal-form-grid` (2 cột co giãn linh hoạt) và lớp `.form-group-full` cho các ô textarea nhập liệu lớn như điểm mạnh, điểm yếu hay sở thích của trẻ.
  - **Đồng bộ hóa Action Buttons**: Thay thế hoàn toàn bộ nút Candy emoji thô ráp thành bộ biểu tượng vector chất lượng cao dùng SVG chuẩn (`view-btn-v2`, `edit-btn-v2`, `delete-btn-v2`) cho mọi hành động quản lý trong danh sách Giai đoạn, Hoạt động can thiệp, và Mục tiêu.
  - **Bảo toàn và Khôi phục Nguyên Trạng các Tab Quản Lý Khác**: Tuân thủ tuyệt đối quy tắc chỉ cho phép thay đổi phần Kế hoạch và Giai đoạn can thiệp. Hai tệp tin `BlogsTab.tsx` và `NotificationTab.tsx` được khôi phục nguyên vẹn 100% về trạng thái ban đầu của dự án, đảm bảo an toàn hệ thống và tính sạch sẽ tối đa cho mã nguồn.

### Plan Phase Workspace Frame & Backdrop Click Modals Closure (2026-05-22)
- **Đóng khung Phase Workspace (Playful Geometric Frame)**:
  - Nâng cấp trải nghiệm quản lý chi tiết Giai đoạn can thiệp bằng cách bọc toàn bộ không gian làm việc chi tiết Phase Workspace (bao gồm nút quay lại `t.backToPhases`, thông tin Giai đoạn, các sub-tabs con điều hướng và toàn bộ danh sách Hoạt động / Mục tiêu) vào một khung gỗ `.phase-detail-workspace-card` lớn.
  - Khung gỗ này áp dụng đầy đủ triết lý thiết kế Playful Geometric: viền Slate sẫm dày (`3px solid #1E293B`), bóng đổ cứng 3D offset (`8px 8px 0px #1E293B`), và bo góc lớn (`24px`). Khi người dùng hover chuột, khung sẽ nhấc nổi nhẹ (`transform: translate(-2px, -2px)`) và bóng đổ sẽ nở rộng (`10px 10px 0px #1E293B`) để phản hồi sống động.
  - Phẳng hóa và làm thanh lịch hóa card chi tiết bên trong thành `.phase-detail-inner` (loại bỏ viền đen dày và bóng đổ cứng lặp lại), triệt tiêu hoàn toàn cảm giác thô kệch, nặng nề do lồng khung 3D liên tiếp, mang lại không gian làm việc thoáng đãng, chuyên nghiệp bậc nhất.
- **Tích hợp Click out to Close Popups (Tương tác Đóng Modal Ngoài Overlay)**:
  - Nâng cấp tính năng đóng cửa sổ Popups cho cả 5 Modal trong `PlanDetailView.tsx` (Chỉnh sửa Kế hoạch, Xóa Kế hoạch, Thao tác Giai đoạn, Thao tác Hoạt động, Thao tác Mục tiêu).
  - Khi người dùng click vào lớp nền mờ `.modal-overlay` bao ngoài, modal sẽ tự động được đóng lại, giúp tối ưu hóa thao tác đóng nhanh không cần click chính xác nút hủy bỏ hoặc dấu nhân (x).
  - Tích hợp kỹ thuật chặn nổi bọt sự kiện `onClick={(e) => e.stopPropagation()}` trực tiếp trên container `.admin-modal` chứa nội dung form. Điều này đảm bảo khi người dùng đang click và tương tác bên trong form modal (nhập liệu, chọn dropdown, nhấn nút lưu) thì không bị kích hoạt sự kiện click out, bảo vệ dữ liệu form đang nhập một cách tuyệt đối an toàn.

### Phase Details Layout Split (Card Separation & Single Objectives Focus - 2026-05-22)
- **Loại bỏ hoàn toàn cơ chế chia Tab con (Sub-Tabs)**:
  - Xóa bỏ hoàn toàn thanh điều hướng `sub-tabs-container` để loại bỏ cơ chế click chuyển tab.
  - Dọn dẹp triệt để các biến trạng thái điều phối tab `phaseActiveTab` và `setPhaseActiveTab` ở cả khai báo và sự kiện click để đảm bảo dự án biên dịch sạch 100% không cảnh báo.
- **Loại bỏ hoàn toàn Hoạt động can thiệp (Manage Activities)**:
  - Theo phản hồi và yêu cầu mới nhất của người dùng, phân vùng **Hoạt động can thiệp (Manage Activities)** đã bị loại bỏ hoàn toàn khỏi giao diện chi tiết Giai đoạn.
  - Tất cả các biến state cục bộ (`isActModalOpen`, `actModalMode`, `selectedAct`, `actName`, `actDesc`, `actDuration`), các hàm modal xử lý (`openActModal`, `handleSaveAct`) và khối JSX chứa modal của Activity đều được dọn dẹp triệt để nhằm giữ sạch mã nguồn và tránh cảnh báo/lỗi biên dịch `TS6133` (unused variables).
- **Phân tách giao diện thành 2 Card dọc độc lập xếp chồng**:
  - **Card 1 (Phía trên) - Phase Overview**: Nền trắng sữa phẳng tĩnh lặng, bo góc và đổ bóng mịn màng. Hiển thị toàn bộ siêu dữ liệu hành chính của giai đoạn (PH-ID, PL-ID, Loại giai đoạn, Ngày bắt đầu/kết thúc, v.v.) qua lưới `.overview-grid` chuyên nghiệp.
  - **Card 2 (Phía dưới) - Manage Objectives**: Chỉ tập trung duy nhất vào việc quản lý mục tiêu hành vi can thiệp (`Manage Objectives`). Thiết kế áp dụng phong cách Playful Geometric nổi bật (viền đen sẫm dày `3px solid #1E293B` và bóng đổ cứng chắc chắn `8px 8px 0px #1E293B`) kết hợp hiệu ứng nhấc nổi 3D khi hover. Bên trong chứa nút "Thêm mục tiêu mới" Candy Button màu hồng ngọt ngào và danh sách mục tiêu can thiệp hiển thị qua lưới `.cards-grid` đi kèm các vector icon SVG sắc nét để thực hiện CRUD (Sửa/Xóa).
  - Bố cục mới này giúp các chuyên gia lâm sàng tập trung cao độ vào các mục tiêu can thiệp cốt lõi của từng Giai đoạn can thiệp mà không bị phân tán thông tin.
- **Tinh chỉnh giao diện Phase Details chi tiết (2026-05-22)**:
  - **Loại bỏ emoji**: Biểu tượng bánh răng (`⚙️`) đã được gỡ bỏ hoàn toàn khỏi tiêu đề của Card Phase Overview nhằm giảm độ "màu mè", giúp trang chi tiết hiển thị giống như một bảng hồ sơ chuyên môn thực sự.
  - **Đồng bộ hóa Nút bấm**: Nút "+ Add Objective" đã được chuyển đổi từ kiểu Candy hồng cũ (`add-obj-btn`) sang nút phẳng chuẩn mực (`add-btn`) màu Primary Teal của hệ thống Admin Dashboard. Việc này giúp loại bỏ cảm giác thiết kế lộn xộn, đồng điệu tuyệt đối với các nút thêm mới khác.
  - **Bổ sung thuộc tính Trạng thái (Status)**: Thêm thuộc tính `Status` vào trực tiếp trong lưới thông tin của Phase Overview. Trạng thái hiển thị sống động thông qua badge `.phase-status-badge` có màu sắc động tương ứng với `Active` (hoạt động) và `Inactive` (không hoạt động), tự động phản hồi theo sự thay đổi ngôn ngữ Việt/Anh của hệ thống.


### Appointment Scheduling Management System (Dashboard) (2026-05-22)
- **Database Schema Integration**: Cập nhật logic hiển thị và quản lý bám sát schema mới `appointment_slot`. Một bảng duy nhất quản lý các khung giờ với định dạng `datetime`.
- **Admin Dashboard (`ScheduleTab.tsx`)**:
  - Giao diện cung cấp Data Table để **Quản lý Lịch trống** cho Bác sĩ và Điều phối viên.
  - Tích hợp Modal bật lên cho phép tạo khung giờ trực tiếp (Create Appointment Slot) bằng trường `datetime-local` HTML5 natively, kết hợp staff ID và loại hình khám Online/Offline.
  - Logic Xóa khung giờ (Delete Appointment Slot): Cung cấp cảnh báo an toàn. Nút xóa sẽ bị mờ và khóa tương tác (`not-allowed`) với những khung giờ đã mang trạng thái `Booked` (Đã có người đặt).
- **Visual Status Badges**: Cập nhật file `.css` bổ sung `.badge-status` dạng pill siêu thực tế với màu xanh (`Available`) và đỏ nhạt (`Booked`) dành riêng cho chức năng quản lý lịch trình trong Dashboard.
## Homepage Expert Booking Flow Context Update (2026-05-22)

Luồng đặt lịch chuyên gia từ trang chủ AutiCare đã được nâng cấp toàn diện từ hộp thoại thông báo `alert` thô sơ sang giao diện đặt lịch **Playful Geometric** thông minh tích hợp chọn ngày/giờ tư vấn và chốt hẹn bằng chiếc **Vé hẹn AutiCare (Appointment Ticket)** độc đáo.

### 1. Kiến trúc Trạng thái & Logic Đặt lịch (State & Flow Logic)
- **Quản lý Trạng thái Động (Reactive Booking States)**: Tích hợp trực tiếp bên trong `src/components/homepage/HeroSection.tsx`, quản lý 5 trạng thái đồng bộ:
  - `bookingExpert`: Lưu thông tin chuyên gia đang được đặt lịch (Tiến sĩ Minh, Cô Lan, hoặc Bác sĩ Đức).
  - `selectedDate`: Lưu trữ chuỗi ngày được người dùng chọn (ví dụ: `Thứ Sáu, 22/05` / `Friday, 22/05`).
  - `selectedTimeSlot`: Lưu trữ ca tư vấn 2 tiếng được chọn.
  - `bookingSuccess`: Cờ boolean đánh dấu việc hoàn tất quy trình và kích hoạt màn hình hiển thị Vé hẹn.
  - `ticketCode`: Mã vé ngẫu nhiên duy nhất được sinh tự động khi chốt hẹn thành công (định dạng `AC-XXXX` với XXXX là 4 chữ số ngẫu nhiên).
- **Bộ sinh Ngày tự động (Auto-generated Schedule Dates)**: Hàm `getNextDays()` tự động tính toán và sinh ra **4 ngày khả dụng tiếp theo** kể từ ngày hiện tại của thiết bị người dùng. Đặc biệt, tên các thứ và định dạng ngày được nội địa hóa động 100% theo ngôn ngữ được chọn trên Header (ví dụ: tiếng Việt ra `Thứ Bảy, 23/05` còn tiếng Anh ra `Saturday, 23/05`), đảm bảo tính chính xác về mặt thời gian và trải nghiệm người dùng bản địa.
- **Khung ca tư vấn cố định (Fixed Consultation Slots)**: Định nghĩa cứng mảng 5 ca tư vấn, mỗi ca kéo dài đúng 2 tiếng/phiên theo chuẩn y tế:
  - Ca 1: `08:00 - 10:00`
  - Ca 2: `10:00 - 12:00`
  - Ca 3: `13:00 - 15:00`
  - Ca 4: `15:00 - 17:00`
  - Ca 5: `18:00 - 20:00`

### 2. Giao diện Đặt lịch Bento Grid (Bento Geometric Selection Panels)
- **Lớp phủ nền mờ mịn (Backdrop Blur Overlay)**: Lớp phủ `.booking-popup-overlay` áp dụng màu nền Slate 900 `rgba(15, 23, 42, 0.65)` kết hợp hiệu ứng kính mờ mịn màng `backdrop-filter: blur(8px) !important` và `z-index: 1000002` để đảm bảo đè lên toàn bộ giao diện Landing Page (bao gồm cả ThreeJS WebGL).
- **Lưới Bento Chọn Ngày & Giờ**: 
  - Khung lưới `.date-grid` (4 cột) và `.time-grid` (3 cột) hiển thị các lựa chọn dưới dạng sticker bento bo góc tròn vừa phải `12px`, viền xám Slate `#1E293B` dày 2px và đổ bóng cứng đặc trưng.
  - Hiệu ứng Hover nâng nhẹ (`transform: translateY(-2px)`) kết hợp bóng đổ dịch chuyển làm tăng tính phản hồi vật lý.
  - Khi được chọn, thẻ ngày sẽ đổi sang nền xanh Violet (`--primary`) và thẻ giờ đổi sang nền Mint (`--secondary`), chữ chuyển sang màu tương phản cao, tạo nhịp điệu thị giác rực rỡ và trực quan.
- **Chốt chặn an toàn (Validation Flow)**: Nút "Xác nhận đặt lịch / Confirm Booking" mặc định bị vô hiệu hóa (`.disabled-btn`), giảm độ mờ và hiển thị dòng chữ nhắc nhở màu đỏ `.booking-required-hint` cho đến khi người dùng chọn đủ cả Ngày và Giờ, ngăn ngừa dữ liệu rỗng.

### 3. Thiết kế Đồ họa Vé hẹn AutiCare Độc đáo (Appointment Ticket Masterpiece)
Khi người dùng bấm xác nhận, hệ thống ẩn khu vực lựa chọn và kích hoạt màn hình thành công rực rỡ với tâm điểm là chiếc **Vé hẹn AutiCare (Appointment Ticket)**.
- **Họa tiết Nền Memphis**: Nền vé `.booking-ticket-card` được phủ họa tiết Memphis chấm tròn cổ điển `radial-gradient(#1e293b 8%, transparent 8%)` với kích thước grid `16px 16px` trên nền kem ấm nhạt `#FFFDF5`, tạo chất cảm giấy in tự nhiên.
- **Chi tiết Răng cưa & Nét đứt (Perforated & Ticket Ridges)**:
  - Đường phân tách vé đứt quãng giả lập bằng viền nét đứt dày dặn `border-bottom: 2px dashed #1E293B`.
  - Hai bên sườn có các lỗ khoét bán nguyệt lõm vào trong (sử dụng pseudo-elements `::before` và `::after` với `radial-gradient` trong CSS) mô phỏng răng cưa xé vé cổ điển.
- **Nhãn Trạng thái CONFIRMED**: Sticker màu mint `.ticket-stamp` nghiêng góc `5deg` nằm chéo ở góc vé với chữ viết hoa đậm `CONFIRMED` bao quanh bởi đường viền đôi cá tính.
- **Mã vạch giả lập (Barcoded Ticket System)**: Thiết kế một khối mã vạch chân thực `.ticket-barcode` ở chân vé bằng cách sử dụng một chuỗi các đường thẳng đứng (`border-left`) có độ rộng và khoảng cách dày mỏng khác nhau, tạo cảm giác chuyên nghiệp giống như vé vào cổng thực tế.
- **Sticker Rung Rinh Chúc Mừng**: Ở đỉnh vé có một biểu tượng sticker tích tròn màu Mint `.success-tick-sticker` tự động kích hoạt hiệu ứng rung lắc nhẹ (`animation: wobble 1s ease-in-out infinite`) để ăn mừng khoảnh khắc đặt lịch thành công của phụ huynh.

### 4. Tương thích Design Lab & Responsive di động
- **Đồng bộ Design Lab (Color Token Mapping)**:
  - Lưới chọn ngày ánh xạ trực tiếp biến CSS `--primary` (được cập nhật động từ thanh trượt màu Violet của Design Lab).
  - Lưới chọn giờ và các nút thành công ánh xạ trực tiếp biến CSS `--secondary` (Mint) hoặc `--accent` (Mint sáng).
  - Khi người dùng điều chỉnh màu sắc trên bảng điều khiển Smart Design Lab, toàn bộ giao diện đặt lịch, các trạng thái active và màu chủ đạo của Vé hẹn AutiCare sẽ tự động đổi màu theo thời gian thực một cách hoàn hảo.
- **Hỗ trợ Responsive Toàn diện (Mobile Optimization)**:
  - Trên màn hình di động nhỏ (`< 640px`), các lưới Bento chọn ngày và giờ tự động co dãn và chuyển thành layout 1 cột xếp dọc thẳng hàng để tối ưu không gian cuộn.
  - Các bóng đổ cứng được giảm kích thước từ `8px` xuống `3px` để tránh hiện tượng tràn lề thiết bị.
  - Chiếc Vé hẹn AutiCare tự động thu nhỏ padding từ `2rem` xuống `1.25rem` và mã vạch co nhỏ lại để hiển thị trọn vẹn, sắc nét trên mọi dòng điện thoại thông minh hiện nay.

### 5. Thiết kế Mở rộng Không gian Rộng rãi & Dashboard 2 Cột Song Song (2026-05-22)
Đáp ứng nhu cầu về giao diện rộng mở, trực quan, dễ bấm chọn và cực kỳ sang trọng, luồng Đặt lịch Chuyên gia đã được nâng cấp thiết kế tối ưu hóa diện tích hiển thị vượt trội trên màn hình lớn.

- **Loại bỏ ghi chú thời lượng tư vấn (Clean Typography)**: Xóa bỏ hoàn toàn các đoạn chú thích tĩnh `(2 tiếng/phiên)` và `(2 hours/session)` tại khóa tiêu đề chọn giờ `bookingSelectTime` ở cả hai bản dịch Việt/Anh. Giao diện trở nên tinh giản, gọn gàng, giảm mật độ chữ thừa thãi.
- **Nâng cấp Modal Chọn Chuyên Gia Rộng Rãi (`.experts-panel`)**:
  - **Không gian hoành tráng**: Nới rộng chiều rộng tối đa lên `1140px` (`width: min(1140px, 95%) !important`) và chiều cao tối đa lên `850px` trên desktop.
  - **Bố cục Lưới 3 cột đứng (`.expert-list`)**: Thay vì danh sách xếp dọc đơn điệu, 3 chuyên gia hàng đầu được xếp thành **lưới 3 cột đứng** (`grid-template-columns: repeat(3, 1fr) !important; gap: 1.75rem !important`) cực kỳ thoáng đãng, lấp đầy không gian mới một cách cân đối.
  - **Thẻ Hồ sơ Dọc (Vertical Profile Cards - `.expert-card`)**:
    - Tái cấu trúc thẻ chuyên gia thành dạng thẻ đứng (`flex-direction: column !important; text-align: center !important`).
    - Phóng to `.expert-avatar` sticker lên `5.5rem` x `5.5rem` với cỡ chữ viết tắt `1.45rem` nổi bật trên cùng của thẻ có viền Slate và bóng đổ đậm cá tính.
    - Khối text `.expert-info` được căn giữa (`align-items: center !important; text-align: center !important; flex-grow: 1 !important`), tạo khoảng cách đều đặn và thoáng mắt.
    - Xếp dọc các nút tương tác bên dưới `.expert-actions-row` (`flex-direction: column !important; width: 100% !important; gap: 0.75rem !important`) và kéo giãn các nút bấm Candy Button full width `100%` ở đáy thẻ, mang lại bố cục cân đối và dễ click chọn.
- **Nâng cấp Dashboard Đặt Lịch 2 Cột Song Song (`.booking-panel`)**:
  - **Không gian hoành tráng**: Mở rộng chiều rộng tối đa từ `650px` lên `980px` (`width: min(980px, 95%) !important`) giúp giao diện cực kỳ rộng rãi.
  - **Dashboard 2 cột song song (`.booking-content-scroll`)**: Thay đổi bố cục cuộn dọc chật hẹp cũ thành cấu trúc **2 cột song song thời thượng** (`display: grid !important; grid-template-columns: 1.15fr 0.85fr !important; gap: 2.5rem !important; align-items: start !important; max-height: none !important`), mang lại giao diện trực quan như một bảng điều khiển trung tâm.
    - **Cột Trái (Chọn ngày tư vấn - `.date-grid`)**: Được tái cấu trúc thành **Lưới Grid 2x2** (`grid-template-columns: repeat(2, 1fr) !important`). Các thẻ ngày `.date-card` được nới rộng kích thước (`padding: 1.25rem 0.85rem !important`), chữ số ngày hiển thị to rõ rệt, khoảng cách chạm bấm vô cùng thoải mái.
    - **Cột Phải (Chọn giờ tư vấn - `.time-grid`)**: Được tái cấu trúc thành **Danh sách dọc đơn cột** (`grid-template-columns: 1fr !important`). Mỗi mốc giờ `.time-slot-card` được thiết kế dưới dạng **dải pill ngang thanh lịch** (`padding: 0.95rem 1.25rem !important; justify-content: flex-start !important`), tích hợp icon đồng hồ nhỏ bên trái, tạo bố cục xếp dọc cực thoáng mắt, dễ nhìn và dễ lựa chọn.
- **Tính tương thích responsive**: Tự động co dãn thông minh, khi ở màn hình di động nhỏ dưới 768px sẽ co lại thành layout 1 cột dọc cuộn trong suốt mượt mà, tối ưu hóa trải nghiệm bấm chạm 100% cho phụ huynh trên điện thoại.

### 6. Thiết Kế Chi Tiết Time Slots & Vé Hẹn Tư Vấn Động (2026-05-22)
Nhằm mang lại trải nghiệm đặt lịch chi tiết, trực quan và chuyên nghiệp tối đa cho phụ huynh, hệ thống chọn khung ca tư vấn (Time Slots) và Vé hẹn AutiCare thành công đã được chi tiết hóa toàn diện.

- **Cấu trúc Dữ liệu Ca Tư Vấn Thông Minh**: Thay thế mảng tĩnh chuỗi đơn giản cũ bằng mảng đối tượng động chứa đầy đủ thông tin: định dạng mốc giờ 2 tiếng (`time`), hình thức ca tư vấn (`type` nhận 'Online' | 'Offline') và trạng thái hiện thời của ca (`status` nhận 'available' | 'booked').
- **Thiết kế Nhãn Sticker Đa Dạng (Playful Geometric Badges)**:
  - Mỗi dải ca tư vấn nằm ngang hiển thị thời gian ở bên trái và cụm **nhãn dán (badges)** sặc sỡ phong cách Memphis ở bên phải:
    - **Nhãn Hình thức**: Nhãn `.online` dùng tông màu tím nhạt (`#EDE9FE`, chữ tím `#6D28D9`), nhãn `.offline` dùng tông màu vàng hổ phách nhạt (`#FEF3C7`, chữ hổ phách `#B45309`).
    - **Nhãn Trạng thái**: Nhãn `.available` (Đang trống) dùng tông màu xanh mint tươi tắn (`#D1FAE5`, chữ xanh đậm `#047857`), nhãn `.booked` (Đã bận) dùng tông màu xám nhạt (`#E2E8F0`, chữ xám `#475569`).
  - Thiết kế có sự tương thích cao: Khi dải ca giờ được click chọn `.selected` (chuyển sang nền Violet của hệ thống), các nhãn sticker này tự động chuyển nền về trắng thuần `#FFFFFF` để đảm bảo độ tương phản màu tốt nhất và giữ tính thẩm mỹ cao cấp.
- **Cơ chế Khóa Ca Đã Bận (Smart Blocker Interactivity)**:
  - Đối với các ca giờ đã bị bận (`status === 'booked'`), hệ thống tự động khóa tương tác bằng thuộc tính HTML `disabled` và áp dụng lớp kiểu dáng `.booked` chuyên biệt.
  - Về mặt visual, các ca bận bị làm mờ đi (`opacity: 0.55`), đổi nền sang màu xám Slate nhẹ `#F1F5F9` và đổi con trỏ chuột thành biểu tượng cấm bấm (`not-allowed`), ngăn chặn hoàn toàn việc click nhầm.
- **Tích hợp Vé hẹn Động Song Ngữ (Dynamic i18n Ticket)**:
  - Khi chốt hẹn thành công, chiếc **Vé hẹn AutiCare (Appointment Ticket)** Memphis tự động cập nhật dòng "Hình thức / Format" dựa trên thuộc tính `type` của ca tư vấn được chọn thay vì hiển thị tĩnh:
    - Chọn ca **Online**: Vé tự động xuất dòng **"Trực tuyến (Zoom/Google Meet)"** (VN) / **"Online (Zoom/Google Meet)"** (EN).
    - Chọn ca **Offline**: Vé tự động xuất dòng **"Trực tiếp (Tại trung tâm)"** (VN) / **"Offline (At Clinical Center)"** (EN).
  - Tích hợp 4 nhãn song ngữ đa ngôn ngữ cho hình thức và trạng thái ca tư vấn trên lưới chọn giờ, hoạt động mượt mà và đồng bộ khi người dùng click chuyển đổi ngôn ngữ Việt - Anh trên thanh Header.

### Intervention Exercises Management System (Dashboard) (2026-05-22)

- **Kiến trúc Tách biệt & Đóng gói (Decoupled Module - Rule 10)**:
  - Toàn bộ tính năng Quản lý bài tập can thiệp được đóng gói trọn vẹn trong một component duy nhất `ExercisesTab.tsx` đặt dưới thư mục `src/components/dashboard/`, đảm bảo cấu trúc dự án chuyên nghiệp, dễ tìm kiếm, dễ bảo trì.
  - Tích hợp mượt mà vào luồng switch-case của `AdminDashboard.tsx` qua tab `'exercises'` và đăng ký trực quan trên menu Sidebar của nhóm huấn luyện ("training").
- **Kiến trúc Dữ liệu & Schema Schema SQLite/PostgreSQL**:
  - Giao diện quản trị ánh xạ trực tiếp và quản lý chuẩn xác cấu trúc thực thể `exercise`: `exercise_id` (integer/PK), `exercise_name` (nvarchar), `exercise_description` (text), `exercise_target` (nvarchar), `status` (varchar), `tutorial_url` (tutorial video - youtube link), `exercise_level_id` (integer/FK), `exercise_category_id` (integer/FK) cùng các siêu dữ liệu `center_id`, `created_by`, `created_at`, `updated_at`.
- **Ràng buộc Nghiệp vụ Cập nhật nghiêm ngặt (Strict Update Rules)**:
  - Form chỉnh sửa (Update Mode) tuân thủ chặt chẽ chỉ cho phép sửa đổi 3 thuộc tính: Mô tả chi tiết (`exercise_description`), Mục tiêu trị liệu (`exercise_target`) và Link video YouTube hướng dẫn (`tutorial_url`).
  - Toàn bộ các trường dữ liệu quan trọng như Tên bài tập, Cấp độ, Danh mục huấn luyện được tự động đưa về trạng thái chỉ đọc (read-only/disabled) với nền xám `#F1F5F9` và con trỏ khóa `not-allowed`, ngăn chặn mọi thay đổi cấu trúc bài tập ngoài ý muốn.
- **Visual Design - Playful Geometric & Bento Card Grid**:
  - **Lưới Bento Thông tin Chi tiết**: Modal Xem chi tiết bài tập được thiết kế theo cấu trúc Bento Grid sặc sỡ cá tính. Các khối thông tin ID bài tập, Cấp độ khó, Danh mục huấn luyện và Trung tâm liên kết được bọc trong các hộp sticker riêng biệt có viền Slate dày `2px`, đổ bóng cứng offset 3D `4px 4px 0px #1E293B`, màu nền kem Memphis `#FFFDF5`.
  - **Bảng dữ liệu kiểu thẻ nổi (Floating Cards Table)**: Bảng danh sách bài tập thừa hưởng các token CSS đặc trưng với viền Slate dày dặn `3px solid #1E293B` và bóng đổ cứng offset 3D `8px 8px 0px #1E293B`. Hàng dữ liệu nhấc nổi 3D khi hover chuột, kết hợp các nút Candy Button hình viên thuốc pill-shape sặc sỡ chứa icon SVG chất lượng cao (mắt xanh trời cho Xem, bút cam cho Sửa, thùng rác đỏ cho Xóa) tạo trải nghiệm tương tác đậm đà cá tính.
  - **Mockup Youtube Video Player**: Trong thẻ chi tiết, nếu có URL video hướng dẫn, hệ thống tự động dựng một khung phát video mockup màu xanh da trời `.tutorial-video-block` có nút hành động pill đỏ neon bắt mắt "Play YouTube ▶", kết nối trực tiếp đến video thực tế.
- **Tìm kiếm nâng cao & Bộ lọc thông minh (Live Search & Fast Filters)**:
  - Khung tìm kiếm thời gian thực cho phép truy xuất nhanh theo cả Tên bài tập và Mã ID bài tập (`EX-XXX`).
  - Tích hợp 2 bộ lọc nhanh dạng dropdown: lọc theo Cấp độ khó (Dễ/Bình thường/Khó) và Danh mục huấn luyện, tự động phản hồi tức thì trạng thái danh sách bảng mà không cần tải lại trang.
- **Tương thích Design Lab & Đa ngôn ngữ (i18n)**:
  - Toàn bộ các nút bấm chính, Candy Button, và form modal liên kết trực tiếp với các token màu CSS của Design Lab (như `var(--primary)`), tự động phản ứng và thay đổi màu sắc ngay lập tức khi chuyên gia trượt thay đổi màu sắc trên bảng điều khiển.
  - Tích hợp từ điển song ngữ Việt/Anh (`translations.vi` / `translations.en`) đồng bộ hóa 100% khi nhấn nút chuyển đổi ngôn ngữ trên Topbar, hỗ trợ từ các nhãn form, tên cấp độ cho đến các popup cảnh báo xóa.
  - Tuân thủ Rule 9: Sử dụng duy nhất font chữ `Be Vietnam Pro` cho toàn bộ nội dung hiển thị trong mô-đun để tối ưu hoá khả năng đọc tiếng Việt.

### 7. Đồng bộ hóa giao diện và nút hành động Quản lý bài tập (ExercisesTab) với Quản lý nhân sự (StaffsTab) (2026-05-22)
Nhằm đạt được sự đồng bộ tuyệt đối 100% về ngôn ngữ thiết kế, cấu trúc thẩm mỹ và tính nhất quán trải nghiệm người dùng trong hệ thống Admin Dashboard, mô-đun Quản lý bài tập can thiệp (`ExercisesTab.tsx`) đã được tái thiết kế và tinh chỉnh sâu sắc để đồng điệu hoàn hảo với mô-đun Quản lý nhân sự (`StaffsTab.tsx`).

- **Đồng bộ hóa bộ lọc dữ liệu (Modern Select Filters)**:
  - Loại bỏ hoàn toàn kiểu viền đen dày cộp Memphis thô cứng cũ (`border: 2px solid #1E293B`) của hai thẻ chọn bộ lọc Cấp độ (Level Filter) và Danh mục (Category Filter).
  - Thay thế bằng cấu trúc bộ lọc hiện đại thông qua lớp CSS `.filter-select` cục bộ: sử dụng viền xám siêu mỏng nhẹ (`1px solid #E2E8F0`), nền xám nhạt (`#F1F5F9`), bo góc `12px` thanh thoát, cỡ chữ `0.85rem` và font chữ `Be Vietnam Pro` đậm nét.
  - Tích hợp hiệu ứng focus phát sáng nhẹ nhàng (`border-color: var(--primary); box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1); background: white`) tương tự như thanh tìm kiếm `.search-bar`, tạo sự cân bằng và đối xứng hoàn mỹ về mặt bố cục.
- **Phẳng hóa các nhãn Cấp độ (Flat Level Badges)**:
  - Loại bỏ thuộc tính viền đen Memphis thô cứng `border: 1.5px solid #1E293B` trên nhãn hiển thị Cấp độ trong danh sách bảng.
  - Giữ lại cấu trúc nhãn dạng phẳng (Flat Badge) với màu sắc pastel dịu mắt (xanh mint cho Dễ, xám cho Bình thường, cam nhạt cho Khó), đồng bộ hoàn toàn với nhãn trạng thái của `StaffsTab.tsx`, mang lại cảm giác dễ chịu và tập trung cao độ khi duyệt dữ liệu.
- **Đồng bộ hóa bộ nút thao tác cuối hàng (Unified Action Buttons)**:
  - Sử dụng chung bộ lớp `.action-btns button` cấp độ hệ thống trong `AdminDashboard.css`.
  - Thay vì bị áp cứng màu xanh lá cũ, bộ nút action cuối hàng của `ExercisesTab.tsx` nay đã đồng điệu hoàn hảo với `StaffsTab.tsx`:
    - **Nút Xem chi tiết (`.view-btn-v2`)**: Khi hover chuyển sang nền xanh dương pastel `#EFF6FF`, viền `#BFDBFE` và icon màu xanh dương Primary.
    - **Nút Chỉnh sửa (`.edit-btn-v2`)**: Khi hover chuyển sang nền xanh dương pastel `#EFF6FF`, viền `#BFDBFE` và icon màu xanh dương Primary.
    - **Nút Xóa (`.delete-btn-v2`)**: Khi hover chuyển sang nền đỏ pastel `#FEF2F2`, viền `#FECACA` và icon đỏ hồng `#EF4444`.
    - Tất cả các nút khi hover đều có chuyển động nhấc nhẹ tinh tế (`transform: translateY(-1.5px)`) bằng transition mượt mà, tăng cường phản hồi xúc giác (micro-interactions).
- **Phẳng hóa nút phát YouTube trong Modal Chi tiết bài tập**:
  - Tái thiết kế nút "Play YouTube ▶" từ dạng shadow Memphis nổi sặc sỡ sang dạng phẳng thanh nhã (Flat Button): sử dụng màu nền Primary (`var(--primary)`), chữ trắng, bo góc `10px`, loại bỏ hoàn toàn viền đen dày thô và shadow cứng, giúp nút nằm cân đối và chuyên nghiệp tuyệt đối bên cạnh thanh URL bị khóa của biểu mẫu.



