import React from 'react';
import './DesignCode.css';

interface Props {
  lang: 'vi' | 'en';
  setLang: (l: 'vi' | 'en') => void;
  onBack: () => void;
}

const DesignCodeAdmin: React.FC<Props> = ({ lang, setLang, onBack }) => {
  const S = (n: number) => <span className="dc-section-number admin">{n}</span>;

  return (
    <div className="design-code-page">
      <div className="dc-topbar">
        <div className="dc-topbar-left">
          <button className="dc-back-btn" onClick={onBack}>← {lang === 'vi' ? 'Quay lại' : 'Go Back'}</button>
          <span className="dc-page-badge admin">Admin Dashboard</span>
        </div>
        <div className="dc-topbar-right">
          <div className="lang-switch" style={{ background: 'rgba(255,255,255,0.06)', padding: '2px', borderRadius: '8px' }}>
            <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')} style={lang === 'vi' ? { background: '#5EEAD4', color: '#0F172A', borderRadius: '6px' } : { color: '#94A3B8' }}>VN</button>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')} style={lang === 'en' ? { background: '#5EEAD4', color: '#0F172A', borderRadius: '6px' } : { color: '#94A3B8' }}>EN</button>
          </div>
        </div>
      </div>

      <div className="dc-hero admin">
        <h1>{lang === 'vi' ? 'Tài liệu thiết kế' : 'Design Documentation'} — <span className="accent-admin">Admin Dashboard</span></h1>
        <p>{lang === 'vi' ? 'Tổng hợp tất cả thành phần, token, animation và kiến trúc layout của trang quản trị Admin.' : 'Complete catalog of all components, tokens, animations and layout architecture of the Admin Dashboard.'}</p>
      </div>

      <div className="dc-content">
        {/* 1. Admin Tokens */}
        <div className="dc-section">
          <div className="dc-section-header">{S(1)}<h2>{lang === 'vi' ? 'Admin Design Tokens' : 'Admin Design Tokens'}</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Các biến CSS riêng của Admin được khai báo trong .admin-theme-root, ghi đè các token toàn cục.' : 'Admin-specific CSS variables declared in .admin-theme-root, overriding global tokens.'}</p>
          <div className="dc-token-grid">
            {[
              ['--primary', '#0a8a48', 'Admin primary green'],
              ['--secondary', '#2f8367', 'Admin secondary'],
              ['--accent', '#EF4444', 'Danger/Delete red'],
              ['--bg-main', '#e6eac2', 'Shell background'],
              ['--admin-sidebar', '#358249', 'Sidebar base'],
              ['--text-main', '#1A3A26', 'Admin text dark'],
              ['--text-muted', '#64748B', 'Admin text muted'],
            ].map(([name, val, desc]) => (
              <div className="dc-token" key={name}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: val, flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }} />
                <div>
                  <div className="dc-token-name">{name}</div>
                  <div className="dc-token-value">{val} — {desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Layout Architecture */}
        <div className="dc-section">
          <div className="dc-section-header">{S(2)}<h2>{lang === 'vi' ? 'Kiến trúc Layout' : 'Layout Architecture'}</h2></div>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Hệ thống Flex chính' : 'Main Flex System'} <span className="tag layout">Layout</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Property</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>.admin-dashboard</td><td>display: flex, padding: 12px, gap: 12px</td></tr>
                <tr><td>.dashboard-sidebar</td><td>width: 280px, sticky, height: calc(100vh - 24px)</td></tr>
                <tr><td>.dashboard-main</td><td>flex: 1, border-radius: 24px, flex-direction: column</td></tr>
                <tr><td>{lang === 'vi' ? 'Mô hình' : 'Pattern'}</td><td>{lang === 'vi' ? '"Floating Island" — các khối bo tròn nổi trên nền shell' : '"Floating Island" — rounded blocks floating on shell bg'}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Sidebar */}
        <div className="dc-section">
          <div className="dc-section-header">{S(3)}<h2>Sidebar</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Sidebar cố định 280px với gradient Midnight Indigo, logo neon, menu nhóm có thể mở/đóng, và footer user profile.' : 'Fixed 280px sidebar with Midnight Indigo gradient, neon logo, collapsible group menu, and footer user profile.'}</p>
          <div className="dc-info-grid">
            <div className="dc-card">
              <div className="dc-card-title">Logo Header <span className="tag anim">Animation</span></div>
              <div className="dc-card-body">
                Font: <code>Titan One, 2rem</code><br />
                Effect: <code>text-shadow</code> 5-layer cyan glow<br />
                Animation: <code>neonPulse 2s infinite alternate</code><br />
                Subtitle: <code>0.65rem, uppercase, letter-spacing: 4px</code>
              </div>
            </div>
            <div className="dc-card">
              <div className="dc-card-title">Gradient Background <span className="tag css">CSS</span></div>
              <div className="dc-card-body">
                <code>linear-gradient(165deg, #111827 0%, #1e1b4b 50%, #0f172a 100%)</code><br />
                Border-radius: <code>24px</code><br />
                Box-shadow: <code>0 20px 40px rgba(0,0,0,0.4)</code>
              </div>
            </div>
          </div>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Hệ thống Menu' : 'Menu System'} <span className="tag tsx">TSX</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Component</th><th>{lang === 'vi' ? 'Mô tả' : 'Description'}</th><th>Visual</th></tr></thead>
              <tbody>
                <tr><td>.group-toggle</td><td>{lang === 'vi' ? 'Nút nhóm có icon + arrow' : 'Group button with icon + arrow'}</td><td>uppercase, #94A3B8, hover: white</td></tr>
                <tr><td>.nav-item</td><td>{lang === 'vi' ? 'Menu item con' : 'Child menu item'}</td><td>hover: translateX(6px), glow</td></tr>
                <tr><td>.nav-item.active</td><td>{lang === 'vi' ? 'Item đang chọn' : 'Active item'}</td><td>#5EEAD4, neon bar left (::before)</td></tr>
                <tr><td>.user-profile</td><td>{lang === 'vi' ? 'Card user ở footer' : 'User card in footer'}</td><td>Avatar gradient + name + role</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Topbar */}
        <div className="dc-section">
          <div className="dc-section-header">{S(4)}<h2>Topbar</h2></div>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Thanh điều hướng trên cùng' : 'Top Navigation Bar'} <span className="tag css">CSS</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Property</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>background</td><td>linear-gradient(90deg, #1e1b4b, #111827)</td></tr>
                <tr><td>position</td><td>sticky, top: -1px, z-index: 10</td></tr>
                <tr><td>border-radius</td><td>24px 24px 20px 20px (khớp parent)</td></tr>
                <tr><td>margin</td><td>-1px -1px 24px -1px (anti-gap trick)</td></tr>
                <tr><td>{lang === 'vi' ? 'Thành phần' : 'Elements'}</td><td>Breadcrumb, Back btn, Lang switch, 🔔, ⚙️</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Data Table */}
        <div className="dc-section">
          <div className="dc-section-header">{S(5)}<h2>{lang === 'vi' ? 'Bảng dữ liệu (Floating Row)' : 'Data Table (Floating Row)'}</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Kiến trúc bảng "Floating Card" với border-spacing tạo khoảng cách giữa các hàng, tạo cảm giác mỗi hàng là một thẻ riêng biệt.' : '"Floating Card" table architecture with border-spacing between rows, making each row feel like a separate card.'}</p>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Kiến trúc bảng' : 'Table Architecture'} <span className="tag css">CSS</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Property</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>border-collapse</td><td>separate</td></tr>
                <tr><td>border-spacing</td><td>0 8px</td></tr>
                <tr><td>tbody tr</td><td>bg: #FFF, shadow: 0 2px 4px rgba(0,0,0,0.02)</td></tr>
                <tr><td>td border-radius</td><td>first: 12px left, last: 12px right</td></tr>
                <tr><td>hover</td><td>translateY(-2px) + border-color: primary + left accent 4px</td></tr>
              </tbody>
            </table>
          </div>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Phân cấp danh mục (Parent/Sub)' : 'Category Hierarchy (Parent/Sub)'} <span className="tag css">CSS</span></div>
            <div className="dc-card-body">
              Parent: <code>font-weight: 800, color: #0F172A</code><br />
              Sub: <code>padding-left: 3.5rem, color: #64748B</code><br />
              {lang === 'vi' ? 'Đường nối' : 'Tree lines'}: <code>::before</code> (vertical 1.5px #1E293B) + <code>::after</code> (horizontal 12px)
            </div>
          </div>
        </div>

        {/* 6. Search System */}
        <div className="dc-section">
          <div className="dc-section-header">{S(6)}<h2>{lang === 'vi' ? 'Hệ thống tìm kiếm' : 'Search System'}</h2></div>
          <div className="dc-info-grid">
            <div className="dc-card">
              <div className="dc-card-title">{lang === 'vi' ? 'Thanh tìm kiếm' : 'Search Bar'} <span className="tag css">CSS</span></div>
              <div className="dc-card-body">
                Bg: <code>#F1F5F9</code>, border-radius: <code>12px</code><br />
                Focus: white bg, primary border, <code>box-shadow: 0 0 0 4px</code><br />
                Icon: emoji 🔍 grayscale
              </div>
            </div>
            <div className="dc-card">
              <div className="dc-card-title">Neon Highlight <span className="tag anim">Animation</span></div>
              <div className="dc-card-body">
                Color: Cyber Blue <code>#00F2FF</code><br />
                Border-left: <code>5px solid</code><br />
                Animation: <code>neonPulseBlue 2s infinite alternate</code><br />
                {lang === 'vi' ? 'Hiệu ứng chớp tắt chậm với cubic-bezier' : 'Slow breathing pulse with cubic-bezier'}
              </div>
            </div>
          </div>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Tìm kiếm phân cấp (Exercise Categories)' : 'Hierarchical Search (Exercise Categories)'} <span className="tag tsx">TSX</span></div>
            <div className="dc-card-body">
              {lang === 'vi'
                ? '• Khi tìm sub-category, tự động giữ lại parent category trong kết quả.\n• Chỉ hàng khớp trực tiếp mới có neon highlight.\n• Các tab khác sử dụng filter đơn giản trên tất cả cột.'
                : '• When searching sub-categories, parent categories are automatically retained.\n• Only directly matching rows get neon highlight.\n• Other tabs use simple all-column filtering.'}
            </div>
          </div>
        </div>

        {/* 7. Modal System */}
        <div className="dc-section">
          <div className="dc-section-header">{S(7)}<h2>{lang === 'vi' ? 'Hệ thống Modal' : 'Modal System'}</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Modal CRUD với 3 chế độ: Create, Edit, Delete. Có overlay blur, animation scale-in, và tiêu đề ngữ cảnh.' : 'CRUD modal with 3 modes: Create, Edit, Delete. Blur overlay, scale-in animation, and context-aware titles.'}</p>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Cấu trúc Modal' : 'Modal Structure'} <span className="tag css">CSS</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Component</th><th>Style</th></tr></thead>
              <tbody>
                <tr><td>.modal-overlay</td><td>rgba(15,23,42,0.4), backdrop-filter: blur(8px)</td></tr>
                <tr><td>.admin-modal</td><td>max-width: 500px, border-radius: 24px</td></tr>
                <tr><td>.animate-in</td><td>@keyframes modalScale: scale(0.9)→1, 0.3s cubic-bezier</td></tr>
                <tr><td>.modal-header</td><td>{lang === 'vi' ? 'Tiêu đề ngữ cảnh + nút đóng tròn' : 'Context title + circle close button'}</td></tr>
                <tr><td>.modal-footer</td><td>bg: #F8FAFC, flex-end, gap: 0.75rem</td></tr>
              </tbody>
            </table>
          </div>
          <div className="dc-info-grid">
            <div className="dc-card">
              <div className="dc-card-title">{lang === 'vi' ? 'Chế độ Create/Edit' : 'Create/Edit Mode'} <span className="tag tsx">TSX</span></div>
              <div className="dc-card-body">
                {lang === 'vi' ? 'Form gồm' : 'Form contains'}: input (Name), textarea (Description)<br />
                Tab Categories: {lang === 'vi' ? 'thêm select Parent Category' : 'adds Parent Category select'}<br />
                <code>spellCheck="false"</code> {lang === 'vi' ? 'để tắt gạch đỏ' : 'to disable red squiggles'}
              </div>
            </div>
            <div className="dc-card">
              <div className="dc-card-title">{lang === 'vi' ? 'Chế độ Delete' : 'Delete Mode'} <span className="tag tsx">TSX</span></div>
              <div className="dc-card-body">
                ⚠️ Warning icon + {lang === 'vi' ? 'thông báo ngữ cảnh' : 'context-aware message'}<br />
                {lang === 'vi' ? 'Ví dụ' : 'Example'}: "Are you sure you want to delete <strong>exercise level</strong> "Dễ"?"<br />
                {lang === 'vi' ? 'Sử dụng' : 'Uses'} <code>getTabSingular()</code>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Button Variants */}
        <div className="dc-section">
          <div className="dc-section-header">{S(8)}<h2>{lang === 'vi' ? 'Các biến thể nút' : 'Button Variants'}</h2></div>
          <div className="dc-card">
            <table className="dc-props-table">
              <thead><tr><th>Class</th><th>{lang === 'vi' ? 'Vai trò' : 'Role'}</th><th>Style</th></tr></thead>
              <tbody>
                <tr><td>.add-btn</td><td>{lang === 'vi' ? 'Thêm mới' : 'Add new'}</td><td>primary bg, white text, radius: 12px, hover: lift</td></tr>
                <tr><td>.btn-primary</td><td>{lang === 'vi' ? 'Hành động chính' : 'Primary action'}</td><td>primary bg, radius: 10px, bold</td></tr>
                <tr><td>.btn-secondary</td><td>{lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}</td><td>white bg, gray border</td></tr>
                <tr><td>.btn-danger</td><td>{lang === 'vi' ? 'Xóa' : 'Delete'}</td><td>#F43F5E bg</td></tr>
                <tr><td>.edit-btn-v2</td><td>{lang === 'vi' ? 'Chỉnh sửa (icon)' : 'Edit (icon)'}</td><td>transparent, hover: bg 5%</td></tr>
                <tr><td>.delete-btn-v2</td><td>{lang === 'vi' ? 'Xóa (icon)' : 'Delete (icon)'}</td><td>transparent, hover: bg 5%</td></tr>
                <tr><td>.view-toggle-btn</td><td>{lang === 'vi' ? 'Quay lại Homepage' : 'Back to Homepage'}</td><td>primary bg, radius: 20px, inline</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 9. Badge & Status */}
        <div className="dc-section">
          <div className="dc-section-header">{S(9)}<h2>{lang === 'vi' ? 'Badge & Trạng thái' : 'Badge & Status'}</h2></div>
          <div className="dc-card">
            <div className="dc-card-title">.badge.active <span className="tag css">CSS</span></div>
            <div className="dc-card-body">
              Background: <code>#DCFCE7</code>, color: <code>#166534</code><br />
              {lang === 'vi' ? 'Chấm tròn xanh 6px' : 'Green 6px dot'} (<code>::before</code>, bg: #22C55E)<br />
              Padding: <code>0.35rem 0.75rem</code>, border-radius: <code>6px</code>, font-weight: <code>700</code>
            </div>
            <div className="dc-preview">
              <span style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, background: '#DCFCE7', color: '#166534', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 6, height: 6, background: '#22C55E', borderRadius: '50%' }} />
                {lang === 'vi' ? 'Hoạt động' : 'Active'}
              </span>
            </div>
          </div>
        </div>

        {/* 10. Animation Catalog */}
        <div className="dc-section">
          <div className="dc-section-header">{S(10)}<h2>{lang === 'vi' ? 'Danh mục Animation' : 'Animation Catalog'}</h2></div>
          <div className="dc-anim-row">
            <div className="dc-anim-box">
              <div className="dc-anim-demo" style={{ background: '#1e1b4b', textAlign: 'center', lineHeight: '48px', color: 'white', fontFamily: 'Titan One', fontSize: '0.7rem', textShadow: '0 0 10px rgba(0,210,255,0.7)' }}>AC</div>
              <div className="dc-anim-label">neonPulse</div>
              <div className="dc-anim-desc">{lang === 'vi' ? 'Logo sidebar, 2s' : 'Sidebar logo, 2s'}</div>
            </div>
            <div className="dc-anim-box">
              <div className="dc-anim-demo" style={{ background: 'rgba(0,242,255,0.1)', borderLeft: '5px solid #00F2FF', animation: 'neonPulseBlue 2s infinite alternate cubic-bezier(0.4,0,0.6,1)' }} />
              <div className="dc-anim-label">neonPulseBlue</div>
              <div className="dc-anim-desc">{lang === 'vi' ? 'Search highlight, 2s' : 'Search highlight, 2s'}</div>
            </div>
            <div className="dc-anim-box">
              <div className="dc-anim-demo" style={{ background: 'white', borderRadius: '24px', animation: 'modalScale 1s infinite alternate' }} />
              <div className="dc-anim-label">modalScale</div>
              <div className="dc-anim-desc">{lang === 'vi' ? 'Modal mở, 0.3s' : 'Modal open, 0.3s'}</div>
            </div>
            <div className="dc-anim-box">
              <div className="dc-anim-demo" style={{ background: '#F8FAFC', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)')} onMouseLeave={e => (e.currentTarget.style.transform = 'none')} />
              <div className="dc-anim-label">row hover</div>
              <div className="dc-anim-desc">translateY(-2px)</div>
            </div>
          </div>
        </div>

        {/* 11. Color Palette */}
        <div className="dc-section">
          <div className="dc-section-header">{S(11)}<h2>{lang === 'vi' ? 'Bảng màu Admin' : 'Admin Color Palette'}</h2></div>
          <div className="dc-swatch-grid">
            {[
              ['Primary Green', '#0a8a48'], ['Secondary', '#2f8367'], ['Accent Red', '#EF4444'],
              ['Shell BG', '#e6eac2'], ['Sidebar Gradient Start', '#111827'], ['Sidebar Gradient Mid', '#1e1b4b'],
              ['Sidebar Gradient End', '#0f172a'], ['Topbar Start', '#1e1b4b'], ['Topbar End', '#111827'],
              ['Active Teal', '#5EEAD4'], ['Cyber Blue', '#00F2FF'], ['Text Dark', '#1A3A26'],
              ['Text Muted', '#64748B'], ['Row White', '#FFFFFF'], ['Row Hover', '#F8FAFC'],
              ['Badge Green BG', '#DCFCE7'], ['Badge Green Text', '#166534'], ['Danger Pink', '#F43F5E'],
            ].map(([name, hex]) => (
              <div className="dc-swatch" key={name}>
                <div className="dc-swatch-color" style={{ background: hex }} />
                <div className="dc-swatch-info">
                  <div className="dc-swatch-name">{name}</div>
                  <div className="dc-swatch-hex">{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DesignCodeAdmin;
