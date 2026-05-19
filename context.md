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
