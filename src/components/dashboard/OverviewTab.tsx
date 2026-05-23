import React from 'react';
import type { Center } from './CenterDetailView';

interface OverviewTabProps {
  lang: 'vi' | 'en';
  centers: Center[];
}

const translations = {
  vi: {
    title: "Tổng quan hoạt động hệ thống",
    subtitle: "Báo cáo thống kê trực quan chỉ số hoạt động, lưu lượng và hiệu suất toàn mạng lưới AutiCare",
    statTotalCenters: "Trung tâm hoạt động 🏫",
    statTotalStaffs: "Chuyên gia & Nhân sự 👥",
    statTotalChildren: "Trẻ đang can thiệp 👶",
    statTotalHours: "Giờ can thiệp tích lũy ⏱️",
    chartTitleHours: "Tổng số giờ can thiệp tích lũy theo tháng (Toàn hệ thống)",
    chartTitleDomains: "Tỷ lệ phân bổ bài tập kỹ năng phát triển chính",
    tableTitle: "Mạng lưới cơ sở & Hoạt động thực tế",
    colCenterName: "Tên trung tâm",
    colRegion: "Khu vực",
    colStaffCount: "Số nhân sự",
    colLevelCount: "Số cấp độ",
    colStatus: "Trạng thái",
    statusActive: "Hoạt động",
    statusInactive: "Tạm ngưng",
    baselineTarget: "Chuẩn phát triển chuẩn",
    actualProgress: "Đạt được thực tế",
    badgeSystemStats: "Thống kê hệ thống"
  },
  en: {
    title: "System Overview Dashboard",
    subtitle: "Visual statistics dashboard of operations, enrollment traffic, and network-wide performance metrics",
    statTotalCenters: "Active Centers 🏫",
    statTotalStaffs: "Experts & Staffs 👥",
    statTotalChildren: "Active Autistic Children 👶",
    statTotalHours: "Cumulative Treatment Hours ⏱️",
    chartTitleHours: "Cumulative Monthly Treatment Hours (Network Wide)",
    chartTitleDomains: "Skill category distribution ratio (Network Wide)",
    tableTitle: "Early Intervention Facility Network & Analytics",
    colCenterName: "Facility name",
    colRegion: "Region",
    colStaffCount: "Staff count",
    colLevelCount: "Levels",
    colStatus: "Status",
    statusActive: "Active",
    statusInactive: "Inactive",
    baselineTarget: "Developmental Baseline",
    actualProgress: "Actual Performance",
    badgeSystemStats: "System Stats"
  }
};

const OverviewTab: React.FC<OverviewTabProps> = ({ lang, centers }) => {
  const t = translations[lang];

  // Calculate dynamic stats
  const totalCentersCount = centers.length;
  const totalStaffsCount = centers.reduce((acc, c) => acc + (c.staffs?.length || 0), 0) + 12; // fallback mock padding
  const totalChildrenCount = 148; // mock global active cases
  const totalHoursCount = 3840; // mock global hours

  return (
    <div className="overview-tab-wrapper admin-overview-wrapper" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      
      {/* Header section */}
      <div className="intervention-header-zone" style={{ marginBottom: '2rem' }}>
        <div className="intervention-title-block">
          <h2 className="intervention-tab-title">{t.title}</h2>
          <p className="intervention-tab-subtitle">{t.subtitle}</p>
        </div>
      </div>

      {/* Bento Grid System Indicators */}
      <div className="staff-stats-bento-grid" style={{ marginBottom: '2rem' }}>
        <div className="bento-stat-sticker">
          <div className="bento-stat-icon-wrapper bg-blue-light">🏫</div>
          <div className="bento-stat-info">
            <span className="bento-stat-label">{t.statTotalCenters}</span>
            <span className="bento-stat-value">{totalCentersCount}</span>
          </div>
        </div>

        <div className="bento-stat-sticker">
          <div className="bento-stat-icon-wrapper bg-green-light">👥</div>
          <div className="bento-stat-info">
            <span className="bento-stat-label">{t.statTotalStaffs}</span>
            <span className="bento-stat-value">{totalStaffsCount}</span>
          </div>
        </div>

        <div className="bento-stat-sticker">
          <div className="bento-stat-icon-wrapper bg-amber-light">👶</div>
          <div className="bento-stat-info">
            <span className="bento-stat-label">{t.statTotalChildren}</span>
            <span className="bento-stat-value">{totalChildrenCount}</span>
          </div>
        </div>

        <div className="bento-stat-sticker">
          <div className="bento-stat-icon-wrapper bg-purple-light">⏱️</div>
          <div className="bento-stat-info">
            <span className="bento-stat-label">{t.statTotalHours}</span>
            <span className="bento-stat-value">{totalHoursCount}h</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div 
        className="director-charts-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.8rem',
          marginBottom: '2rem'
        }}
      >
        {/* Chart 1: Column bar 3D */}
        <div 
          className="director-chart-card"
          style={{
            background: '#FFFFFF',
            border: '3px solid #1E293B',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '6px 6px 0px #1E293B',
            boxSizing: 'border-box'
          }}
        >
          <h4 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', fontSize: '0.95rem', fontWeight: 900 }}>
            📈 {t.chartTitleHours}
          </h4>

          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: '25%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: '75%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>

            {[
              { label: 'Jan', val: 420, fill: '#8B5CF6', depth: '#6D28D9' },
              { label: 'Feb', val: 510, fill: '#EC4899', depth: '#BE185D' },
              { label: 'Mar', val: 640, fill: '#34D399', depth: '#059669' },
              { label: 'Apr', val: 590, fill: '#FBBF24', depth: '#D97706' },
              { label: 'May', val: 780, fill: '#60A5FA', depth: '#2563EB' },
              { label: 'Jun', val: 900, fill: '#8B5CF6', depth: '#6D28D9' }
            ].map((bar, idx) => {
              const h = `${(bar.val / 1000) * 100}%`;
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                  <div
                    className="chart-bar-3d-wrap"
                    style={{
                      width: '26px',
                      height: h,
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      transform: 'rotateX(-12deg) rotateY(-15deg)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div 
                      style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        background: bar.fill, 
                        border: '2px solid #1E293B',
                        borderBottom: 'none',
                        borderRadius: '4px 4px 0 0',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 900, color: '#1E293B' }}>
                        {bar.val}h
                      </span>
                    </div>
                    <div 
                      style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        right: '-8px', 
                        width: '8px', 
                        height: '100%', 
                        background: bar.depth, 
                        border: '2px solid #1E293B',
                        borderLeft: 'none',
                        transform: 'skewY(45deg)',
                        transformOrigin: 'left bottom',
                        boxSizing: 'border-box'
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 900, marginTop: '8px' }}>{bar.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: SVG Area Wave */}
        <div 
          className="director-chart-card"
          style={{
            background: '#FFFFFF',
            border: '3px solid #1E293B',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '6px 6px 0px #1E293B',
            boxSizing: 'border-box'
          }}
        >
          <h4 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', fontSize: '0.95rem', fontWeight: 900 }}>
            🧬 {t.chartTitleDomains}
          </h4>

          <div style={{ height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="waveAdminGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0084FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0084FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="50" x2="400" y2="50" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />

              <path d="M0 200 L0 120 Q50 60 100 130 T200 80 T300 110 T400 40 L400 200 Z" fill="url(#waveAdminGrad)" />

              <path d="M0 120 Q50 60 100 130 T200 80 T300 110 T400 40" fill="none" stroke="#0084FF" strokeWidth="3.5" strokeLinecap="round" />

              <path d="M0 150 Q70 140 150 110 T300 70 T400 30" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="5 5" />

              <circle cx="200" cy="80" r="5" fill="#0084FF" stroke="#1E293B" strokeWidth="2" />
              <circle cx="200" cy="80" r="11" fill="none" stroke="#0084FF" strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="5;15" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="40" r="5" fill="#0084FF" stroke="#1E293B" strokeWidth="2" />
            </svg>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '3px', background: '#0084FF', borderRadius: '2px' }}></span>
                <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 800 }}>{t.actualProgress}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '3px', background: '#94A3B8', borderStyle: 'dashed', borderRadius: '2px' }}></span>
                <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 800 }}>{t.baselineTarget}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Centers Summary Table */}
      <div 
        className="director-staff-performance-container"
        style={{
          background: '#FFFFFF',
          border: '3px solid #1E293B',
          borderRadius: '20px',
          padding: '1.5rem 1.8rem',
          boxShadow: '6px 6px 0px #1E293B',
          boxSizing: 'border-box',
          width: '100%'
        }}
      >
        <h4 style={{ margin: '0 0 1.25rem 0', color: '#1E293B', fontSize: '1.02rem', fontWeight: 900 }}>
          🏢 {t.tableTitle}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {centers.map((c, idx) => (
            <div 
              key={c.id}
              className="performance-item-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#F8FAFC',
                border: '2px solid #1E293B',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                boxShadow: '3px 3px 0px #1E293B',
                flexWrap: 'wrap',
                gap: '1.25rem',
                boxSizing: 'border-box'
              }}
            >
              {/* Left Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: '240px' }}>
                <div 
                  style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: '12px', 
                    background: idx % 3 === 0 ? '#EDE9FE' : idx % 3 === 1 ? '#D1FAE5' : '#FEF3C7',
                    border: '2px solid #1E293B',
                    boxShadow: '1.5px 1.5px 0px #1E293B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}
                >
                  🏫
                </div>
                <div>
                  <h5 style={{ margin: 0, color: '#1E293B', fontSize: '0.9rem', fontWeight: 900 }}>
                    {c.name}
                  </h5>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t.colRegion}: {c.province || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t.colStaffCount}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 900 }}>
                    👥 {c.staffs?.length || 0} {lang === 'vi' ? 'người' : 'staffs'}
                  </span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t.colLevelCount}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 900 }}>
                    🧩 {c.levels.length} {lang === 'vi' ? 'cấp độ' : 'levels'}
                  </span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t.colStatus}
                  </span>
                  <span className={`record-status-badge badge-${c.status === 'Active' ? 'active' : 'graduated'}`} style={{ marginTop: '2px', display: 'inline-block' }}>
                    {c.status === 'Active' ? t.statusActive : t.statusInactive}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default OverviewTab;
