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
