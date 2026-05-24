import React, { useState, useMemo } from 'react';

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

interface AllCentersPageProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  centers: CenterInfo[];
  onBack: () => void;
}

const translations = {
  vi: {
    pageTitle: 'Hệ Thống Trung Tâm AutiCare',
    pageSub: 'Khám phá mạng lưới cơ sở can thiệp sớm đạt chuẩn quốc tế của AutiCare',
    backToHome: 'Quay lại trang chủ',
    address: 'Địa chỉ',
    phone: 'Điện thoại',
    email: 'Email',
    active: 'Đang hoạt động',
    inactive: 'Tạm ngưng',
    searchPlaceholder: 'Tìm theo tên, địa chỉ, mã trung tâm, tỉnh thành...',
    filterAll: 'Tất cả tỉnh thành',
    filterLabel: 'Khu vực:',
    resultCount: 'trung tâm',
    noResult: 'Không tìm thấy trung tâm phù hợp với tiêu chí tìm kiếm.',
  },
  en: {
    pageTitle: 'AutiCare Center Network',
    pageSub: 'Explore our network of international early intervention facilities',
    backToHome: 'Back to Home',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    active: 'Active',
    inactive: 'Inactive',
    searchPlaceholder: 'Search by name, address, center ID, region...',
    filterAll: 'All provinces',
    filterLabel: 'Region:',
    resultCount: 'centers',
    noResult: 'No matching centers found for your search criteria.',
  }
};

const CenterCard: React.FC<{
  center: CenterInfo;
  idx: number;
  t: typeof translations.vi;
}> = ({ center, idx, t }) => {
  const displayPhone = center.phone_number || center.phone || 'Chưa cập nhật';
  const displayAddress = center.address || 'Chưa cập nhật';
  const displayEmail = center.email || 'Chưa cập nhật';
  const displayProvince = center.province || (displayAddress.includes('Hồ Chí Minh') || displayAddress.includes('Saigon') ? 'TP. Hồ Chí Minh' : (displayAddress.includes('Hà Nội') ? 'Hà Nội' : (displayAddress.includes('Đà Nẵng') ? 'Đà Nẵng' : 'Khác')));

  return (
    <div
      className="center-card glass center-card-modal"
      style={{ animationDelay: `${idx * 0.05}s` }}
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
        <span className="center-card-id">{center.id}</span>
        <span className="center-card-province">{displayProvince}</span>
      </div>
    </div>
  );
};

const AllCentersPage: React.FC<AllCentersPageProps> = ({ lang, setLang, centers, onBack }) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  // Helper function to extract province from address or use province field
  const getProvince = (center: CenterInfo) => {
    const addressStr = center.address || '';
    return center.province || (addressStr.includes('Hồ Chí Minh') || addressStr.includes('Saigon') ? 'TP. Hồ Chí Minh' : (addressStr.includes('Hà Nội') ? 'Hà Nội' : (addressStr.includes('Đà Nẵng') ? 'Đà Nẵng' : 'Khác')));
  };

  // Get unique provinces
  const provinces = useMemo(() => {
    const set = new Set(centers.map(c => getProvince(c)));
    return Array.from(set).sort();
  }, [centers]);

  // Filtered centers
  const filteredCenters = useMemo(() => {
    let results = centers;

    if (selectedProvince) {
      results = results.filter(c => getProvince(c) === selectedProvince);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.address || '').toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q) ||
        getProvince(c).toLowerCase().includes(q)
      );
    }

    return results;
  }, [centers, searchQuery, selectedProvince]);

  return (
    <div className="profile-page-wrapper all-centers-page-wrapper">
      {/* 1. Page Header */}
      <header className="profile-page-header">
        <div className="profile-header-container">
          <div className="profile-header-left" onClick={onBack} style={{ cursor: 'pointer' }}>
            <div className="profile-brand-logo">AutiCare</div>
          </div>
          
          <h1 className="profile-page-title">{t.pageTitle}</h1>
          
          <div className="profile-header-right">
            <div className="profile-lang-switch">
              <button 
                className={`profile-lang-btn ${lang === 'vi' ? 'active' : ''}`} 
                onClick={() => setLang('vi')}
              >
                VN
              </button>
              <button 
                className={`profile-lang-btn ${lang === 'en' ? 'active' : ''}`} 
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            
            <button className="profile-back-btn" onClick={onBack}>
              ⬅ {t.backToHome}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="profile-page-main centers-page-main">
        <div className="profile-content-container all-centers-main-container">
          
          {/* Headline Zone */}
          <div className="all-centers-hero-zone">
            <h2 className="all-centers-main-title">{t.pageTitle}</h2>
            <p className="all-centers-main-sub">{t.pageSub}</p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="all-centers-toolbar-board">
            <div className="centers-search-box all-centers-search">
              <svg className="centers-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="centers-search-input"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="centers-search-clear" onClick={() => setSearchQuery('')}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="centers-filter-box all-centers-filter">
              <span className="filter-label-prefix">{t.filterLabel}</span>
              <select
                className="centers-filter-select"
                value={selectedProvince}
                onChange={e => setSelectedProvince(e.target.value)}
              >
                <option value="">{t.filterAll}</option>
                {provinces.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Count and Status Badge */}
          <div className="all-centers-status-bar">
            <span className="all-centers-result-badge">
              {filteredCenters.length} {t.resultCount}
            </span>
          </div>

          {/* Grid of Centers */}
          <div className="all-centers-grid-zone">
            {filteredCenters.length > 0 ? (
              <div className="all-centers-grid">
                {filteredCenters.map((center, idx) => (
                  <CenterCard key={center.id} center={center} idx={idx} t={t} />
                ))}
              </div>
            ) : (
              <div className="centers-no-result all-centers-empty-state">
                <span className="no-result-icon">🔍</span>
                <p>{t.noResult}</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default AllCentersPage;
