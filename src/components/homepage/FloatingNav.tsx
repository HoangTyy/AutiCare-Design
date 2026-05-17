import React from 'react';

interface FloatingNavProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
  lang: 'vi' | 'en';
}

const FloatingNav: React.FC<FloatingNavProps> = ({ activeSection, onSectionClick, lang }) => {
  const sections = [
    { id: 'hero', labelVi: 'Trang chủ', labelEn: 'Home' },
    { id: 'category', labelVi: 'Danh mục', labelEn: 'Categories' },
    { id: 'reviews', labelVi: 'Đánh giá', labelEn: 'Reviews' },
    { id: 'about', labelVi: 'Về chúng tôi', labelEn: 'About us' },
    { id: 'cta', labelVi: 'Liên hệ', labelEn: 'Contact' },
    { id: 'footer', labelVi: 'Chân trang', labelEn: 'Footer' },
  ];

  return (
    <div className="floating-nav-container">
      <div className="floating-nav-card glass">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          const label = lang === 'vi' ? sec.labelVi : sec.labelEn;

          return (
            <button
              key={sec.id}
              className={`floating-dot-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSectionClick(sec.id)}
              aria-label={label}
            >
              <span className="dot-bullet" />
              <span className="dot-tooltip">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingNav;
