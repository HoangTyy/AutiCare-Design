import React from 'react';
import './DesignCode.css';

interface Props {
  lang: 'vi' | 'en';
  setLang: (l: 'vi' | 'en') => void;
  onBack: () => void;
}

const DesignCodeHomepage: React.FC<Props> = ({ lang, setLang, onBack }) => {
  const S = (n: number) => <span className="dc-section-number homepage">{n}</span>;

  return (
    <div className="design-code-page">
      {/* Topbar */}
      <div className="dc-topbar">
        <div className="dc-topbar-left">
          <button className="dc-back-btn" onClick={onBack}>← {lang === 'vi' ? 'Quay lại' : 'Go Back'}</button>
          <span className="dc-page-badge homepage">Homepage</span>
        </div>
        <div className="dc-topbar-right">
          <div className="lang-switch" style={{ background: 'rgba(255,255,255,0.06)', padding: '2px', borderRadius: '8px' }}>
            <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')} style={lang === 'vi' ? { background: '#0084FF', color: '#fff', borderRadius: '6px' } : { color: '#94A3B8' }}>VN</button>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')} style={lang === 'en' ? { background: '#0084FF', color: '#fff', borderRadius: '6px' } : { color: '#94A3B8' }}>EN</button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="dc-hero homepage">
        <h1>{lang === 'vi' ? 'Tài liệu thiết kế' : 'Design Documentation'} — <span className="accent">Homepage</span></h1>
        <p>{lang === 'vi' ? 'Tổng hợp tất cả thành phần, token, animation và kiến trúc layout của trang Landing Page.' : 'Complete catalog of all components, tokens, animations and layout architecture of the Landing Page.'}</p>
      </div>

      <div className="dc-content">
        {/* 1. Global Design Tokens */}
        <div className="dc-section">
          <div className="dc-section-header">{S(1)}<h2>{lang === 'vi' ? 'Design Tokens toàn cục' : 'Global Design Tokens'}</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Các biến CSS cốt lõi định nghĩa hệ thống màu sắc, kích thước bo góc và bóng đổ cho toàn bộ Landing Page.' : 'Core CSS variables defining the color system, border radius and shadow system for the entire Landing Page.'}</p>
          <div className="dc-token-grid">
            {[
              ['--primary', '#0084FF', 'Màu chủ đạo'],
              ['--secondary', '#2AC176', 'Màu phụ (CTA)'],
              ['--accent', '#FF6B6B', 'Màu nhấn cảnh báo'],
              ['--warning', '#FFD93D', 'Màu cảnh báo'],
              ['--bg-main', '#FFF8D1', 'Nền trang chính'],
              ['--text-main', '#1A1C1E', 'Màu chữ chính'],
              ['--text-muted', '#4A4D50', 'Màu chữ phụ'],
            ].map(([name, val, desc]) => (
              <div className="dc-token" key={name}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: val, flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }} />
                <div>
                  <div className="dc-token-name">{name}</div>
                  <div className="dc-token-value">{val} — {lang === 'vi' ? desc : desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="dc-code" style={{ marginTop: '1rem' }}>
            <span className="com">/* Border Radius Tokens */</span>{'\n'}
            <span className="key">--radius-sm</span>: <span className="val">12px</span>;{'\n'}
            <span className="key">--radius-md</span>: <span className="val">20px</span>;{'\n'}
            <span className="key">--radius-lg</span>: <span className="val">32px</span>;{'\n'}
            <span className="key">--radius-xl</span>: <span className="val">48px</span>;{'\n'}
            <span className="key">--radius-full</span>: <span className="val">9999px</span>;{'\n\n'}
            <span className="com">/* Shadow Tokens */</span>{'\n'}
            <span className="key">--shadow-sm</span>: <span className="val">0 4px 6px rgba(0,0,0,0.05)</span>;{'\n'}
            <span className="key">--shadow-md</span>: <span className="val">0 8px 15px rgba(0,0,0,0.08)</span>;{'\n'}
            <span className="key">--shadow-lg</span>: <span className="val">0 15px 30px rgba(0,0,0,0.12)</span>;
          </div>
        </div>

        {/* 2. Color Palette */}
        <div className="dc-section">
          <div className="dc-section-header">{S(2)}<h2>{lang === 'vi' ? 'Bảng màu' : 'Color Palette'}</h2></div>
          <div className="dc-swatch-grid">
            {[
              ['Primary Blue', '#0084FF'], ['Primary Dark', '#0066CC'], ['Secondary Green', '#2AC176'],
              ['Accent Red', '#FF6B6B'], ['Warning Yellow', '#FFD93D'], ['Background Cream', '#FFF8D1'],
              ['Text Dark', '#1A1C1E'], ['Text Muted', '#4A4D50'], ['White', '#FFFFFF'],
            ].map(([name, hex]) => (
              <div className="dc-swatch" key={hex}>
                <div className="dc-swatch-color" style={{ background: hex }} />
                <div className="dc-swatch-info">
                  <div className="dc-swatch-name">{name}</div>
                  <div className="dc-swatch-hex">{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Typography */}
        <div className="dc-section">
          <div className="dc-section-header">{S(3)}<h2>Typography</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Hệ thống 3 font chữ phân vai rõ ràng: Titan One cho logo, Fredoka cho UI playful, Be Vietnam Pro cho nội dung.' : '3-font system with clear roles: Titan One for logo, Fredoka for playful UI, Be Vietnam Pro for content.'}</p>
          {[
            ['Titan One', 'cursive', 'Logo / Brand', '2.2rem', 'AutiCare'],
            ['Fredoka', 'sans-serif', 'Nav Links / UI', '0.9rem', 'Trang chủ — Danh mục — Đánh giá'],
            ['Be Vietnam Pro', 'sans-serif', 'Body / Content', '1rem', 'Giải pháp toàn diện hỗ trợ giáo viên và phụ huynh'],
          ].map(([name, fallback, usage, size, sample]) => (
            <div className="dc-font-specimen" key={name}>
              <div className="dc-font-meta">
                <span className="dc-font-name">{name}</span>
                <span className="dc-font-usage">{usage} — {size}</span>
              </div>
              <div className="dc-font-preview" style={{ fontFamily: `'${name}', ${fallback}`, fontSize: size }}>{sample}</div>
            </div>
          ))}
          <div className="dc-card" style={{ marginTop: '0.75rem' }}>
            <div className="dc-card-title">{lang === 'vi' ? 'Thang chữ' : 'Type Scale'} <span className="tag css">CSS</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Element</th><th>Size</th><th>Weight</th></tr></thead>
              <tbody>
                <tr><td>h1 (Hero)</td><td>4.5rem</td><td>800</td></tr>
                <tr><td>h2 (Section)</td><td>3rem</td><td>800</td></tr>
                <tr><td>h3 (Card)</td><td>1.8rem</td><td>700</td></tr>
                <tr><td>body</td><td>1rem</td><td>400</td></tr>
                <tr><td>nav link</td><td>0.9rem</td><td>600</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Navbar */}
        <div className="dc-section">
          <div className="dc-section-header">{S(4)}<h2>Navbar</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Thanh điều hướng sticky 3 cột: Nav Links (trái) — Neon Logo (giữa) — Icons + Lang Switch (phải). Nền #FFF8D1 với viền dưới mờ.' : 'Sticky 3-column navbar: Nav Links (left) — Neon Logo (center) — Icons + Lang Switch (right). Background #FFF8D1 with subtle bottom border.'}</p>
          <div className="dc-info-grid">
            <div className="dc-card">
              <div className="dc-card-title">Layout <span className="tag layout">Grid</span></div>
              <div className="dc-card-body">
                <code>grid-template-columns: 1fr auto 1fr</code><br />
                Position: <code>sticky, top: 0, z-index: 1000</code><br />
                Background: <code>#FFF8D1</code><br />
                Border: <code>1px solid rgba(0,0,0,0.05)</code>
              </div>
            </div>
            <div className="dc-card">
              <div className="dc-card-title">Neon Logo <span className="tag anim">Animation</span></div>
              <div className="dc-card-body">
                Font: <code>Titan One, 2.2rem</code><br />
                Color: <code>#0084FF</code><br />
                Effect: Multi-layer <code>text-shadow</code> (7 layers)<br />
                Animation: <code>neon-pulse 1.5s infinite alternate</code>
              </div>
            </div>
          </div>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Thành phần con' : 'Sub-components'}</div>
            <table className="dc-props-table">
              <thead><tr><th>Component</th><th>{lang === 'vi' ? 'Mô tả' : 'Description'}</th><th>Style</th></tr></thead>
              <tbody>
                <tr><td>.nav-links a</td><td>Fredoka 600, #0084FF</td><td>hover: opacity 0.7</td></tr>
                <tr><td>.icon-btn</td><td>SVG 20×20, transparent bg</td><td>hover: scale(1.1)</td></tr>
                <tr><td>.lang-switch</td><td>VN/EN toggle pills</td><td>active: #0084FF bg, white text</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Hero Section */}
        <div className="dc-section">
          <div className="dc-section-header">{S(5)}<h2>Hero Section</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Khu vực hero 650px với ảnh nền full-bleed, lớp overlay tối (brightness 0.7), tiêu đề Bubble Text và 2 nút CTA TiltButton.' : '650px hero area with full-bleed background image, dark overlay (brightness 0.7), Bubble Text title and 2 TiltButton CTAs.'}</p>
          <div className="dc-info-grid">
            <div className="dc-card">
              <div className="dc-card-title">Background Overlay <span className="tag css">CSS</span></div>
              <div className="dc-card-body">
                Size: <code>height: 650px</code><br />
                Image: <code>hero-bg.png, background-size: cover</code><br />
                Filter: <code>brightness(0.7)</code><br />
                Z-index: overlay=1, content=2
              </div>
            </div>
            <div className="dc-card">
              <div className="dc-card-title">Bubble Text <span className="tag css">CSS</span></div>
              <div className="dc-card-body">
                {lang === 'vi' ? 'Kỹ thuật viền chữ sử dụng 5 lớp' : '5-layer text stroke technique'} <code>text-shadow</code><br />
                Color: white + <code>var(--primary)</code> stroke<br />
                Letter-spacing: <code>2px</code>
              </div>
            </div>
          </div>
          <div className="dc-card">
            <div className="dc-card-title">TiltButton CTA Pair <span className="tag tsx">TSX</span></div>
            <div className="dc-card-body">
              {lang === 'vi' ? 'Sử dụng thư viện' : 'Uses library'} <code>react-tilt-button</code><br />
              Props: <code>elevation=6, radius=24, tilt=10</code><br />
              Variant 1: <code>surfaceColor="var(--primary)", textColor="white"</code><br />
              Variant 2: <code>surfaceColor="white", textColor="var(--primary)"</code>
            </div>
          </div>
        </div>

        {/* 6. Mission Section */}
        <div className="dc-section">
          <div className="dc-section-header">{S(6)}<h2>Mission Section</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Grid 2 cột với thẻ Glass Card chứa ảnh + thông tin + nút TiltButton. Có hiệu ứng hover nâng lên.' : '2-column grid with Glass Cards containing image + info + TiltButton. Hover lift effect.'}</p>
          <div className="dc-card">
            <div className="dc-card-title">Glass Card Architecture <span className="tag layout">Layout</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Property</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>grid</td><td>repeat(2, 1fr), gap: 3rem</td></tr>
                <tr><td>.glass</td><td>background: rgba(255,255,255,0.8), backdrop-filter: blur(8px)</td></tr>
                <tr><td>img wrapper</td><td>height: 300px, overflow: hidden, object-fit: cover</td></tr>
                <tr><td>hover</td><td>transform: translateY(-10px)</td></tr>
                <tr><td>section title</td><td>Bubble Text, color: var(--primary), margin: 6rem 0 4rem</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 7. CTA Banner */}
        <div className="dc-section">
          <div className="dc-section-header">{S(7)}<h2>CTA Banner</h2></div>
          <div className="dc-card">
            <div className="dc-card-title">Banner Layout <span className="tag layout">Layout</span></div>
            <div className="dc-card-body">
              Background: <code>var(--secondary)</code> (#2AC176)<br />
              Layout: <code>flex, justify-content: space-between, align-items: center</code><br />
              Padding: <code>4rem</code>, border-radius: <code>var(--radius-xl)</code><br />
              Title: Bubble Text white + primary stroke<br />
              CTA: TiltButton white variant — <code>elevation=6, radius=24</code>
            </div>
          </div>
        </div>

        {/* 8. Animations */}
        <div className="dc-section">
          <div className="dc-section-header">{S(8)}<h2>{lang === 'vi' ? 'Danh mục Animation' : 'Animation Catalog'}</h2></div>
          <div className="dc-anim-row">
            <div className="dc-anim-box">
              <div className="dc-anim-demo" style={{ background: '#0084FF', animation: 'float 3s ease-in-out infinite' }} />
              <div className="dc-anim-label">float</div>
              <div className="dc-anim-desc">translateY 0→-10px→0, 3s loop</div>
            </div>
            <div className="dc-anim-box">
              <div className="dc-anim-demo" style={{ background: '#0084FF', textAlign: 'center', lineHeight: '48px', color: 'white', fontFamily: 'Titan One', fontSize: '0.9rem', animation: 'neon-pulse 1.5s infinite alternate' }}>AC</div>
              <div className="dc-anim-label">neon-pulse</div>
              <div className="dc-anim-desc">text-shadow intensity 1.5s</div>
            </div>
            <div className="dc-anim-box">
              <div className="dc-anim-demo" style={{ background: '#F1F5F9', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-10px)')} onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')} />
              <div className="dc-anim-label">hover lift</div>
              <div className="dc-anim-desc">translateY(-10px) on hover</div>
            </div>
            <div className="dc-anim-box">
              <div className="dc-anim-demo" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }} />
              <div className="dc-anim-label">.glass</div>
              <div className="dc-anim-desc">backdrop-filter: blur(8px)</div>
            </div>
          </div>
        </div>

        {/* 9. Design Lab */}
        <div className="dc-section">
          <div className="dc-section-header">{S(9)}<h2>Design Lab (ThemeCustomizer)</h2></div>
          <p className="dc-section-desc">{lang === 'vi' ? 'Công cụ tùy chỉnh theme real-time, nằm ở góc phải dưới. Cho phép thay đổi tất cả CSS variables của Landing Page.' : 'Real-time theme customizer positioned bottom-right. Allows changing all Landing Page CSS variables.'}</p>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Cấu trúc' : 'Structure'} <span className="tag tsx">TSX</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Component</th><th>{lang === 'vi' ? 'Mô tả' : 'Description'}</th></tr></thead>
              <tbody>
                <tr><td>.customizer-toggle</td><td>60×60px circle, emoji 🎨, z-index: 2000</td></tr>
                <tr><td>.customizer-panel</td><td>320px wide, max-height: 400px scroll, border: 2px solid primary</td></tr>
                <tr><td>.color-field</td><td>Label + color input + text input combo</td></tr>
                <tr><td>Copy Config</td><td>{lang === 'vi' ? 'Xuất toàn bộ config ra clipboard' : 'Export all config to clipboard'}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="dc-card">
            <div className="dc-card-title">Landing Color Keys</div>
            <div className="dc-card-body">
              <code>--primary</code>, <code>--secondary</code>, <code>--accent</code>, <code>--bg-main</code>, <code>--text-main</code>
            </div>
          </div>
        </div>

        {/* 10. i18n */}
        <div className="dc-section">
          <div className="dc-section-header">{S(10)}<h2>{lang === 'vi' ? 'Hệ thống đa ngôn ngữ' : 'i18n System'}</h2></div>
          <div className="dc-card">
            <div className="dc-card-title">{lang === 'vi' ? 'Kiến trúc' : 'Architecture'} <span className="tag tsx">TSX</span></div>
            <div className="dc-card-body">
              {lang === 'vi' ? 'State-based dictionary trong' : 'State-based dictionary in'} <code>App.tsx</code><br />
              Type: <code>Language = 'vi' | 'en'</code><br />
              {lang === 'vi' ? 'Tổng cộng 17 translation keys cho Landing Page' : 'Total 17 translation keys for Landing Page'}<br />
              Keys: <code>home, category, reviews, about, collections, dashboard, login, heroTitle, heroSub, btnStartScreening, btnViewDemo, missionTitle, missionSub, card1Title, card1Sub, card2Title, card2Sub, btnLearnMore, btnViewReports, ctaTitle, ctaSub, btnJoinNow</code>
            </div>
          </div>
        </div>

        {/* 11. Responsive */}
        <div className="dc-section">
          <div className="dc-section-header">{S(11)}<h2>Responsive Design</h2></div>
          <div className="dc-card">
            <div className="dc-card-title">Breakpoint: 968px <span className="tag css">CSS</span></div>
            <table className="dc-props-table">
              <thead><tr><th>Component</th><th>{lang === 'vi' ? 'Thay đổi' : 'Change'}</th></tr></thead>
              <tbody>
                <tr><td>.hero h1</td><td>4.5rem → 3rem</td></tr>
                <tr><td>.mission-grid</td><td>2 cols → 1 col</td></tr>
                <tr><td>.banner-content</td><td>flex-row → flex-column, text-align: center</td></tr>
                <tr><td>.brand-name</td><td>2.2rem → 1.5rem</td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DesignCodeHomepage;
