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
- [x] Xây dựng thành công Trang chọn bài test Đánh giá Công cụ (`ToolAssessmentPage.tsx`) song ngữ hoàn hảo hỗ trợ 10 bài test lâm sàng chi tiết chia thành 4 nhóm nội dung.
- [x] Tái thiết kế toàn diện trang Đánh giá Công cụ (`ToolAssessmentPage.css`) sang tông màu sáng kem ấm áp y tế chuyên nghiệp và gần gũi (#FFF8F0), các thẻ trắng sữa (#FFFFFF) có độ bo góc hợp lý và đổ bóng mờ siêu mịn (soft shadows), loại bỏ hoàn toàn neon phát sáng cyber.
- [x] Tích hợp Popup giới thiệu lâm sàng chi tiết cho từng công cụ và hệ thống thông báo Toast lấp lánh phản hồi ngữ cảnh.
- [x] Mở rộng Smart Design Lab (`ThemeCustomizer.tsx`) hỗ trợ chỉnh sửa bảng màu riêng biệt của trang Đánh giá Công cụ theo thời gian thực mà không làm rò rỉ giao diện.
- [x] Khắc phục triệt để các lỗi biên dịch TypeScript `TS6133` (unused variables) trong `ObjectivesTab.tsx` và xác thực quy trình biên dịch sản phẩm `npm run build` thành công 100% không cảnh báo sau khi đổi màu.
- [x] Tái cấu trúc toàn diện, di chuyển toàn bộ mô-đun Sàng lọc (Screening) thành Đánh giá Công cụ (Tool Assessment), chuyển đổi tên lớp CSS và biến `--screening-*` thành `--assessment-*` độc lập hoàn hảo.
- [x] Dọn dẹp hoàn toàn các tệp và thư mục sàng lọc cũ (`src/components/screening/`) và xác thực Vite production build thành công 100% không cảnh báo.

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
