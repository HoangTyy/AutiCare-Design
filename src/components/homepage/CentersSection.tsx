import React, { useState, useMemo } from 'react';

interface CenterInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
  province: string;
}

interface CentersSectionProps {
  id: string;
  lang: 'vi' | 'en';
}

const allCentersData: CenterInfo[] = [
  {
    id: 'AC-001',
    name: 'AutiCare Central Saigon',
    address: '123 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh',
    phone: '+84 28 3930 1234',
    email: 'saigon.central@auticare.edu.vn',
    status: 'Active',
    province: 'TP. Hồ Chí Minh'
  },
  {
    id: 'AC-002',
    name: 'AutiCare Hanoi North',
    address: '456 Hoàng Hoa Thám, Quận Tây Hồ, Hà Nội',
    phone: '+84 24 3762 5678',
    email: 'hanoi.north@auticare.edu.vn',
    status: 'Active',
    province: 'Hà Nội'
  },
  {
    id: 'AC-003',
    name: 'AutiCare Da Nang Beach',
    address: '789 Võ Nguyên Giáp, Quận Sơn Trà, Đà Nẵng',
    phone: '+84 23 6384 9012',
    email: 'danang.beach@auticare.edu.vn',
    status: 'Active',
    province: 'Đà Nẵng'
  },
  {
    id: 'AC-004',
    name: 'AutiCare Thủ Đức Innovation',
    address: '55 Đường Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh',
    phone: '+84 28 3720 4455',
    email: 'thuduc.innovation@auticare.edu.vn',
    status: 'Active',
    province: 'TP. Hồ Chí Minh'
  },
  {
    id: 'AC-005',
    name: 'AutiCare Cầu Giấy',
    address: '12 Trần Thái Tông, Quận Cầu Giấy, Hà Nội',
    phone: '+84 24 3795 6688',
    email: 'caugiay@auticare.edu.vn',
    status: 'Active',
    province: 'Hà Nội'
  },
  {
    id: 'AC-006',
    name: 'AutiCare Hải Phòng Harbor',
    address: '278 Lạch Tray, Quận Ngô Quyền, Hải Phòng',
    phone: '+84 22 5383 7799',
    email: 'haiphong.harbor@auticare.edu.vn',
    status: 'Active',
    province: 'Hải Phòng'
  },
  {
    id: 'AC-007',
    name: 'AutiCare Cần Thơ Delta',
    address: '90 Đường 3/2, Quận Ninh Kiều, Cần Thơ',
    phone: '+84 29 2381 2233',
    email: 'cantho.delta@auticare.edu.vn',
    status: 'Active',
    province: 'Cần Thơ'
  },
  {
    id: 'AC-008',
    name: 'AutiCare Nha Trang Coastal',
    address: '44 Trần Phú, Phường Lộc Thọ, Nha Trang, Khánh Hòa',
    phone: '+84 25 8352 1100',
    email: 'nhatrang.coastal@auticare.edu.vn',
    status: 'Inactive',
    province: 'Khánh Hòa'
  },
  {
    id: 'AC-009',
    name: 'AutiCare Bình Dương Smart',
    address: '15 Đại lộ Bình Dương, TX. Thuận An, Bình Dương',
    phone: '+84 27 4382 9900',
    email: 'binhduong.smart@auticare.edu.vn',
    status: 'Active',
    province: 'Bình Dương'
  }
];

const PREVIEW_COUNT = 3;

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
    viewMoreCount: 'trung tâm khác',
    modalTitle: 'Tất cả Trung tâm AutiCare',
    modalSub: 'Tìm cơ sở can thiệp sớm gần bạn nhất',
    searchPlaceholder: 'Tìm theo tên, địa chỉ, mã trung tâm...',
    filterAll: 'Tất cả tỉnh thành',
    filterLabel: 'Lọc theo khu vực',
    resultCount: 'kết quả',
    noResult: 'Không tìm thấy trung tâm phù hợp.',
    close: 'Đóng'
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
    viewMoreCount: 'more centers',
    modalTitle: 'All AutiCare Centers',
    modalSub: 'Find the nearest early intervention center',
    searchPlaceholder: 'Search by name, address, center ID...',
    filterAll: 'All provinces',
    filterLabel: 'Filter by region',
    resultCount: 'results',
    noResult: 'No matching centers found.',
    close: 'Close'
  }
};

// Reusable card renderer
const CenterCard: React.FC<{
  center: CenterInfo;
  idx: number;
  t: typeof translations.vi;
  variant?: 'section' | 'modal';
}> = ({ center, idx, t, variant = 'section' }) => (
  <div
    className={`center-card glass ${variant === 'modal' ? 'center-card-modal' : ''}`}
    style={{ animationDelay: `${idx * 0.08}s` }}
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
          {center.status === 'Active' ? t.active : t.inactive}
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
          <span className="center-info-value">{center.address}</span>
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
          <span className="center-info-value">{center.phone}</span>
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
          <span className="center-info-value">{center.email}</span>
        </div>
      </div>
    </div>

    <div className="center-card-footer">
      <span className="center-card-id">{center.id}</span>
      <span className="center-card-province">{center.province}</span>
    </div>
  </div>
);

const CentersSection: React.FC<CentersSectionProps> = ({ id, lang }) => {
  const t = translations[lang];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  // Get unique provinces
  const provinces = useMemo(() => {
    const set = new Set(allCentersData.map(c => c.province));
    return Array.from(set).sort();
  }, []);

  // Filtered centers for modal
  const filteredCenters = useMemo(() => {
    let results = allCentersData;

    if (selectedProvince) {
      results = results.filter(c => c.province === selectedProvince);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.province.toLowerCase().includes(q)
      );
    }

    return results;
  }, [searchQuery, selectedProvince]);

  const previewCenters = allCentersData.slice(0, PREVIEW_COUNT);
  const remainingCount = allCentersData.length - PREVIEW_COUNT;

  const handleOpenModal = () => {
    setSearchQuery('');
    setSelectedProvince('');
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <section id={id} className="centers-section snap-section container-section">
      <div className="section-header container">
        <h2 className="section-title-premium">{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
      </div>

      <div className="container centers-grid">
        {previewCenters.map((center, idx) => (
          <CenterCard key={center.id} center={center} idx={idx} t={t} />
        ))}
      </div>

      {/* View More Button */}
      <div className="centers-view-more container">
        <button className="centers-view-more-btn" onClick={handleOpenModal}>
          <span className="view-more-text">{t.viewMore}</span>
          <span className="view-more-badge">+{remainingCount} {t.viewMoreCount}</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ===== Full Centers Modal ===== */}
      {isModalOpen && (
        <div className="centers-modal-overlay" onClick={handleCloseModal}>
          <div className="centers-modal" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="centers-modal-header">
              <div className="centers-modal-title-area">
                <h2 className="centers-modal-title">{t.modalTitle}</h2>
                <p className="centers-modal-sub">{t.modalSub}</p>
              </div>
              <button className="centers-modal-close" onClick={handleCloseModal} aria-label={t.close}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="centers-modal-toolbar">
              <div className="centers-search-box">
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
                  autoFocus
                />
                {searchQuery && (
                  <button className="centers-search-clear" onClick={() => setSearchQuery('')}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="centers-filter-box">
                <svg className="centers-filter-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
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

            {/* Result count */}
            <div className="centers-modal-result-bar">
              <span className="centers-result-count">
                {filteredCenters.length} {t.resultCount}
              </span>
            </div>

            {/* Cards Grid */}
            <div className="centers-modal-grid">
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center, idx) => (
                  <CenterCard key={center.id} center={center} idx={idx} t={t} variant="modal" />
                ))
              ) : (
                <div className="centers-no-result">
                  <span className="no-result-icon">🔍</span>
                  <p>{t.noResult}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CentersSection;
