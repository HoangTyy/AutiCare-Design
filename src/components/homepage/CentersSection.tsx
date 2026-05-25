import React from 'react';

interface CenterInfo {
  id: string;
  name: string;
  date: string;
  status: string;
  address?: string;
  phone?: string;
  phone_number?: string;
  email?: string;
  province?: string;
  levels?: any[];
  categories?: any[];
  roles?: any[];
  staffs?: any[];
}

interface CentersSectionProps {
  id: string;
  lang: 'vi' | 'en';
  centers: CenterInfo[];
  onViewMoreCenters: () => void;
  onSelectCenter?: (center: CenterInfo) => void;
}

const translations = {
  vi: {
    title: 'HỆ THỐNG TRUNG TÂM',
    sub: 'Mạng lưới các cơ sở can thiệp sớm AutiCare trên toàn quốc, mỗi trung tâm đều được trang bị đầy đủ chuyên gia và trang thiết bị hiện đại.',
    address: 'Địa chỉ',
    phone: 'Điện thoại',
    email: 'Email',
    active: 'Đang hoạt động',
    inactive: 'Tạm ngưng',
    viewMore: 'Xem thêm trung tâm',
    viewMoreCount: 'trung tâm khác'
  },
  en: {
    title: 'OUR CENTERS',
    sub: 'A nationwide network of AutiCare early intervention centers, each fully equipped with certified specialists and modern facilities.',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    active: 'Active',
    inactive: 'Inactive',
    viewMore: 'View more centers',
    viewMoreCount: 'more centers'
  }
};

const CenterCard: React.FC<{
  center: CenterInfo;
  idx: number;
  t: typeof translations.vi;
  onClick?: () => void;
}> = ({ center, idx, t, onClick }) => {
  const displayPhone = center.phone_number || center.phone || 'Chưa cập nhật';
  const displayAddress = center.address || 'Chưa cập nhật';
  const displayEmail = center.email || 'Chưa cập nhật';
  const displayProvince = center.province || (displayAddress.includes('Hồ Chí Minh') || displayAddress.includes('Saigon') ? 'TP. Hồ Chí Minh' : (displayAddress.includes('Hà Nội') ? 'Hà Nội' : (displayAddress.includes('Đà Nẵng') ? 'Đà Nẵng' : 'Khác')));

  return (
    <div
      className="center-card glass"
      style={{ animationDelay: `${idx * 0.08}s`, cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className="center-card-accent" />

      <div className="center-card-header">
        <div className="center-card-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18" />
            <path d="M5 21V7l7-4 7 4v14" />
            <path d="M9 21v-4h6v4" />
            <path d="M9 10h1" /><path d="M14 10h1" />
            <path d="M9 14h1" /><path d="M14 14h1" />
          </svg>
        </div>
        <div className="center-card-title-group">
          <h3 className="center-card-name">{center.name}</h3>
          <span className={`center-card-status ${center.status.toLowerCase()}`}>
            <span className="status-pulse" />
            {center.status.toLowerCase() === 'active' ? t.active : t.inactive}
          </span>
        </div>
      </div>

      <div className="center-card-info">
        <div className="center-info-row">
          <div className="center-info-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="center-info-content">
            <span className="center-info-label">{t.address}</span>
            <span className="center-info-value">{displayAddress}</span>
          </div>
        </div>

        <div className="center-info-row">
          <div className="center-info-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div className="center-info-content">
            <span className="center-info-label">{t.phone}</span>
            <span className="center-info-value">{displayPhone}</span>
          </div>
        </div>

        <div className="center-info-row">
          <div className="center-info-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="center-info-content">
            <span className="center-info-label">{t.email}</span>
            <span className="center-info-value">{displayEmail}</span>
          </div>
        </div>
      </div>

      <div className="center-card-footer">
        <span className="center-card-province">{displayProvince}</span>
      </div>
    </div>
  );
};

const CentersSection: React.FC<CentersSectionProps> = ({ id, lang, centers, onViewMoreCenters, onSelectCenter }) => {
  const t = translations[lang];
  const PREVIEW_COUNT = 3;
  
  const previewCenters = centers.slice(0, PREVIEW_COUNT);
  const remainingCount = Math.max(0, centers.length - PREVIEW_COUNT);

  return (
    <section id={id} className="centers-section snap-section container-section">
      <div className="section-header container">
        <h2 className="section-title-premium">{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
      </div>

      <div className="container centers-grid">
        {previewCenters.map((center, idx) => (
          <CenterCard 
            key={center.id} 
            center={center} 
            idx={idx} 
            t={t} 
            onClick={() => onSelectCenter && onSelectCenter(center)}
          />
        ))}
      </div>

      {/* View More Button */}
      {remainingCount > 0 && (
        <div className="centers-view-more container">
          <button className="centers-view-more-btn" onClick={onViewMoreCenters}>
            <span className="view-more-text">{t.viewMore}</span>
            <span className="view-more-badge">+{remainingCount} {t.viewMoreCount}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default CentersSection;
