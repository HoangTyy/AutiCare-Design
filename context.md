# Project Context: AutiCare Design (Professional Edition)

## Overview
**AutiCare** là nền tảng chuyên biệt hỗ trợ sàng lọc và quản lý trẻ phổ tự kỷ, được thiết kế dành cho giáo viên, phụ huynh và chuyên gia can thiệp sớm. Dự án tập trung toàn lực vào **Design** — xây dựng hệ thống giao diện chuyên nghiệp, hiện đại và thân thiện, kết hợp phong cách "Funtopia" (vui tươi nhưng nghiêm túc) với kiến trúc UI cao cấp. Trang Landing Page sử dụng nền ấm #FFF8D1, hiệu ứng Neon Logo và Glass Card; trang Admin Dashboard áp dụng theme **Midnight Indigo** với Floating Island layout, bảng dữ liệu kiểu thẻ nổi, hệ thống Modal ngữ cảnh và tìm kiếm phân cấp. Toàn bộ thiết kế được tài liệu hóa chi tiết qua 2 trang **Design Code Documentation**, hỗ trợ song ngữ Việt/Anh, và có thể tùy chỉnh real-time qua **Design Lab**.

## Design Philosophy
- **Dynamic & Reactive Theming**: Fully reactive to the **Design Lab** with a default **Slate & Teal** premium theme.
- **Signature Aesthetics**: Uses a deep slate shell (#0F172A) with a subtle off-white workspace (#F8FAFC).
- **Floating Row Architecture**: Data tables use a unique **Floating Card** design with high-legibility Slate-800 text.
- **Interactive Modals**: Integrated smooth, **backdrop-blurred** modals for all CRUD operations.

## Technology Stack
- **Frontend**: React (Vite) + TypeScript.
- **Typography**: Titan One (Logo), Fredoka (UI), Inter (System).
- **i18n**: Custom state-based translation dictionary (VN/EN).

## Key Modules
1. **Landing Page**: Redesigned header with Nav Links (Left), Neon Logo (Center), and Minimalist Icons (Right).
2. **Admin Dashboard**: 
    - **Sidebar & Topbar**: Unified **Midnight Indigo** theme with neon branding and glassmorphism interactive states.
    - **Contextual UI**: Modals and breadcrumbs dynamically update based on the active tab for precise user guidance.
    - **Workspace**: Modular "Floating Island" layout with **Live Search capabilities** and an integrated **Modal System**.
3. **Smart Design Lab**: Context-aware customizer with granular contrast control and descriptive component labels for precise theming.
4. **Design Code Documentation**: 2 interactive dark-themed pages documenting every UI component, token, animation, and layout pattern. Accessed via `</>` buttons from Homepage and Admin.

## Current State
- [x] Implemented context-aware modal titles (e.g., "Thêm mới trung tâm").
- [x] Unified Topbar and Sidebar styling using the Midnight Indigo premium theme.
- [x] Cleaned up CSS architecture to ensure long-term maintainability.
- [x] Fixed header corner white gap bug with pixel-perfection.
- [x] Disabled native spellcheck in admin forms for a cleaner input experience.
- [x] Refined Delete Modal with context-aware, specific confirmation messages.
- [x] Implemented Cyber Blue Neon Highlights with a slow pulsing "breathing" effect for search results.
- [x] Created Design Code documentation pages for Homepage (11 sections) and Admin Dashboard (11 sections).

 Joseph.
