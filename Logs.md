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
