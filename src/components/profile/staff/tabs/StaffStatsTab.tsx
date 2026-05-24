import React from 'react';

interface StaffStatsTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Phân tích thống kê hiệu suất chuyên môn",
    subtitle: "Theo dõi chỉ số can thiệp lâm sàng, tiến bộ mục tiêu của trẻ và đánh giá phản hồi từ phụ huynh",
    statTotalCases: "Hồ sơ phụ trách 📂",
    statHoursCompleted: "Giờ trị liệu thực tế ⏱️",
    statSatisfaction: "Đánh giá hài lòng ⭐",
    statGraduated: "Học viên tốt nghiệp 🎓",
    expertStatsTitle: "Biểu đồ hoàn thành mục tiêu (Mastery Progress)",
    expertStatsSubtitle: "Tỷ lệ đạt mục tiêu can thiệp lâm sàng được thiết lập trong giáo án của từng trẻ",
    chartTitleSkills: "Phân bổ thời lượng rèn luyện kỹ năng trong tuần",
    actualHours: "Số giờ thực hiện",
    baselineTarget: "Chuẩn yêu cầu tối thiểu",
    milestoneTitle: "Mục tiêu trị liệu trọng điểm trong tuần",
    milestone1: "🎯 Trần Gia Bảo: Giao tiếp mắt chủ động đạt > 5 giây khi giao tiếp",
    milestone2: "🎯 Đỗ Hoàng Hải: Ngồi yên ghép tranh bento gỗ liên tục > 10 phút",
    milestone3: "🎯 Phạm Minh Đăng: Bắt chước chuẩn xác 5 âm cơ bản (a, o, u, ba, ma)",
    milestone4: "🎯 Duy trì ôm chặt Deep Pressure điều hòa cảm giác cho bé Đăng",
  },
  en: {
    title: "Clinical Performance Analytics Dashboard",
    subtitle: "Track clinical intervention metrics, children objective mastery progress, and parent feedback",
    statTotalCases: "Active Cases 📂",
    statHoursCompleted: "Therapy Hours ⏱️",
    statSatisfaction: "Satisfaction Rating ⭐",
    statGraduated: "Therapy Graduates 🎓",
    expertStatsTitle: "Objective Mastery Progress Chart",
    expertStatsSubtitle: "Percentage of clinical intervention objectives achieved in each child's therapy plan",
    chartTitleSkills: "Weekly Skill Category Training Distribution",
    actualHours: "Actual Hours Completed",
    baselineTarget: "Recommended Baseline",
    milestoneTitle: "Key Clinical Milestones This Week",
    milestone1: "🎯 Tran Gia Bao: Maintain eye contact > 5 seconds during conversations",
    milestone2: "🎯 Do Hoang Hai: Stay seated completing wood puzzle for > 10 mins",
    milestone3: "🎯 Pham Minh Dang: Imitate 5 basic sounds correctly (a, o, u, ba, ma)",
    milestone4: "🎯 Execute Deep Pressure sensory regulation for kid Minh Dang",
  }
};

const StaffStatsTab: React.FC<StaffStatsTabProps> = ({ lang }) => {
  const t = translations[lang];

  // Mock static stats for this expert (TS. BS. Nguyễn Minh Anh)
  const statsData = {
    totalCases: 4,
    hoursCompleted: 320,
    satisfaction: 98,
    graduated: 1
  };

  const records = [
    { id: 'REC-2026-004', childName: lang === 'vi' ? 'Trần Gia Bảo' : 'Tran Gia Bao', progress: 78, color: '#34D399', depth: '#059669', levelColor: 'green' },
    { id: 'REC-2026-011', childName: lang === 'vi' ? 'Đỗ Hoàng Hải' : 'Do Hoang Hai', progress: 52, color: '#FBBF24', depth: '#D97706', levelColor: 'amber' },
    { id: 'REC-2026-009', childName: lang === 'vi' ? 'Phạm Minh Đăng' : 'Pham Minh Dang', progress: 35, color: '#F472B6', depth: '#BE185D', levelColor: 'red' },
    { id: 'REC-2026-002', childName: lang === 'vi' ? 'Phan Khánh Ngọc' : 'Phan Khanh Ngoc', progress: 95, color: '#34D399', depth: '#059669', levelColor: 'green' }
  ];

  return (
    <div className="overview-tab-wrapper staff-stats-tab-wrapper" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      
      {/* Header section */}
      <div className="intervention-header-zone" style={{ marginBottom: '2rem' }}>
        <div className="intervention-title-block">
          <h2 className="intervention-tab-title">{t.title}</h2>
          <p className="intervention-tab-subtitle">{t.subtitle}</p>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="staff-stats-bento-grid" style={{ marginBottom: '2rem' }}>
        <div className="bento-stat-sticker">
          <div className="bento-stat-icon-wrapper bg-blue-light">📂</div>
          <div className="bento-stat-info">
            <span className="bento-stat-label">{t.statTotalCases}</span>
            <span className="bento-stat-value">{statsData.totalCases}</span>
          </div>
        </div>

        <div className="bento-stat-sticker">
          <div className="bento-stat-icon-wrapper bg-green-light">⏱️</div>
          <div className="bento-stat-info">
            <span className="bento-stat-label">{t.statHoursCompleted}</span>
            <span className="bento-stat-value">{statsData.hoursCompleted}h</span>
          </div>
        </div>

        <div className="bento-stat-sticker">
          <div className="bento-stat-icon-wrapper bg-amber-light">⭐</div>
          <div className="bento-stat-info">
            <span className="bento-stat-label">{t.statSatisfaction}</span>
            <span className="bento-stat-value">{statsData.satisfaction}%</span>
          </div>
        </div>

        <div className="bento-stat-sticker">
          <div className="bento-stat-icon-wrapper bg-purple-light">🎓</div>
          <div className="bento-stat-info">
            <span className="bento-stat-label">{t.statGraduated}</span>
            <span className="bento-stat-value">{statsData.graduated}</span>
          </div>
        </div>
      </div>

      {/* Charts Layout */}
      <div 
        className="director-charts-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.8rem',
          marginBottom: '2rem'
        }}
      >
        {/* Chart 1: 3D Mastery columns */}
        <div 
          className="staff-mastery-chart-card"
          style={{
            background: '#FFFFFF',
            border: '3px solid #1E293B',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '6px 6px 0px #1E293B',
            boxSizing: 'border-box'
          }}
        >
          <h4 style={{ margin: 0, color: '#1E293B', fontSize: '0.98rem', fontWeight: 900 }}>
            📊 {t.expertStatsTitle}
          </h4>
          <p style={{ margin: '4px 0 1.5rem 0', color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>
            {t.expertStatsSubtitle}
          </p>

          <div className="chart-3d-bars-container">
            <div className="chart-grid-line line-75"></div>
            <div className="chart-grid-line line-50"></div>
            <div className="chart-grid-line line-25"></div>
            
            <div className="chart-bars-flex">
              {records.map((rec) => {
                const barVal = rec.progress;
                const barFill = rec.color;
                const barDepth = rec.depth;
                
                return (
                  <div key={rec.id} className="chart-bar-column">
                    <div className="chart-bar-3d-wrap-element" style={{ height: `${barVal}%` }}>
                      {/* Front face */}
                      <div className="bar-face-front" style={{ backgroundColor: barFill }}>
                        <span className="bar-value-label">{barVal}%</span>
                      </div>
                      {/* Depth face */}
                      <div className="bar-face-depth" style={{ backgroundColor: barDepth }}></div>
                    </div>
                    
                    <span className="bar-child-name" style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '8px' }}>
                      {rec.childName}
                    </span>
                    <span className="bar-child-id">{rec.id}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chart 2: SVG Skill Categories Wave */}
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
          <h4 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', fontSize: '0.98rem', fontWeight: 900 }}>
            ⏱️ {t.chartTitleSkills}
          </h4>

          <div style={{ height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="waveExpertGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="50" x2="400" y2="50" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Area path */}
              <path d="M0 200 L0 150 Q60 80 120 160 T240 90 T360 50 L400 50 L400 200 Z" fill="url(#waveExpertGrad)" />

              {/* Line Actual hours */}
              <path d="M0 150 Q60 80 120 160 T240 90 T360 50 L400 50" fill="none" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />

              {/* Line Baseline Target */}
              <path d="M0 170 Q80 140 160 110 T320 80 L400 70" fill="none" stroke="#F472B6" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />

              {/* Peak pulse dots */}
              <circle cx="240" cy="90" r="5" fill="#8B5CF6" stroke="#1E293B" strokeWidth="2" />
              <circle cx="240" cy="90" r="10" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="5;14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '3px', background: '#8B5CF6', borderRadius: '2px' }}></span>
                <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 800 }}>{t.actualHours}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '3px', background: '#F472B6', borderStyle: 'dashed', borderRadius: '2px' }}></span>
                <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 800 }}>{t.baselineTarget}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Milestones checklist */}
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
          📋 {t.milestoneTitle}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {[t.milestone1, t.milestone2, t.milestone3, t.milestone4].map((milestone, idx) => (
            <div 
              key={idx}
              className="performance-item-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#F8FAFC',
                border: '2px solid #1E293B',
                borderRadius: '14px',
                padding: '0.9rem 1.2rem',
                boxShadow: '2.5px 2.5px 0px #1E293B',
                boxSizing: 'border-box',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#1E293B'
              }}
            >
              {milestone}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StaffStatsTab;
