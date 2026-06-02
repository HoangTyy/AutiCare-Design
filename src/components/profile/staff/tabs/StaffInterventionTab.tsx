import React, { useState } from 'react';

interface InterventionRecord {
  id: string;
  childName: string;
  age: number;
  parentName: string;
  level: string;
  levelColor: 'green' | 'amber' | 'red';
  status: 'active' | 'graduated';
  progress: number; // Tỷ lệ hoàn thành mục tiêu %
  startDate: string;
  objectives: string[];
  recentNote: string;
}

const translations = {
  vi: {
    title: "Hồ sơ can thiệp lâm sàng",
    subtitle: "Giám sát giáo án, đo lường chỉ số tiến bộ phát triển hành vi và ngôn ngữ của các bé",
    btnCreate: "➕ Tạo hồ sơ can thiệp mới",
    filterActive: "Đang can thiệp 🩺",
    filterGraduated: "Đã hoàn thành trị liệu 🎓",
    lblAge: "Tuổi:",
    lblParent: "Phụ huynh:",
    lblLevel: "Cấp độ tự kỷ:",
    lblStartDate: "Ngày bắt đầu can thiệp:",
    lblProgress: "Tiến trình đạt mục tiêu:",
    lblObjectives: "Mục tiêu can thiệp chính:",
    lblRecentNote: "Đánh giá buổi học gần nhất:",
    statusActive: "Đang trị liệu",
    statusGraduated: "Đã tốt nghiệp",
    levelLight: "Mức 1 - Tự lập có hỗ trợ ít",
    levelMedium: "Mức 2 - Cần hỗ trợ nhiều",
    levelSevere: "Mức 3 - Cần hỗ trợ đặc biệt nghiêm trọng",
    emptySearch: "Không tìm thấy hồ sơ trẻ phù hợp",
    placeholderSearch: "🔍 Tìm tên trẻ, mã hồ sơ...",
    lblChartTitle: "Phân tích tiến độ phát triển 5 lĩnh vực chính",
    toastCreateSuccess: "✨ Đã tạo hồ sơ can thiệp mới lâm sàng thành công!",
    lblDetailBtn: "Xem bệnh án chi tiết",
    emptyStateTitle: "Không tìm thấy hồ sơ can thiệp phù hợp",
    emptyStateSub: "Vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để kiểm tra lại.",
    statTotalRecords: "Tổng hồ sơ can thiệp",
    statActiveRecords: "Đang trị liệu 🩺",
    statGraduatedRecords: "Đã tốt nghiệp 🎓",
    statAvgMastery: "Mastery trung bình ✨",
    expertStatsTitle: "Báo Cáo Tiến Độ Trị Liệu Tổng Hợp 📊",
    expertStatsSubtitle: "Tỷ lệ hoàn thành mục tiêu can thiệp (Mastery Progress) của từng trẻ đang phụ trách"
  },
  en: {
    title: "Clinical Intervention Records",
    subtitle: "Monitor treatment plans, track development progress, and manage sensory-behavior milestones",
    btnCreate: "➕ Create Intervention Record",
    filterActive: "Under Active Therapy 🩺",
    filterGraduated: "Graduated Therapy 🎓",
    lblAge: "Age:",
    lblParent: "Parent:",
    lblLevel: "ASD Level:",
    lblStartDate: "Intervention Start Date:",
    lblProgress: "Objective Mastery Progress:",
    lblObjectives: "Core Intervention Objectives:",
    lblRecentNote: "Latest Session Diagnostic Note:",
    statusActive: "Active Therapy",
    statusGraduated: "Graduated",
    levelLight: "Level 1 - Requiring Support",
    levelMedium: "Level 2 - Requiring Substantial Support",
    levelSevere: "Level 3 - Requiring Very Substantial Support",
    emptySearch: "No child records match search criteria",
    placeholderSearch: "🔍 Search child name, record ID...",
    lblChartTitle: "5 Development Domains Analytics Progress",
    toastCreateSuccess: "✨ New clinical intervention record created successfully!",
    lblDetailBtn: "View Detailed Medical Record",
    emptyStateTitle: "No clinical intervention records found",
    emptyStateSub: "Please adjust your search keyword or filters and try again.",
    statTotalRecords: "Total Intervention Records",
    statActiveRecords: "Active Therapy 🩺",
    statGraduatedRecords: "Graduated 🎓",
    statAvgMastery: "Avg Mastery Rate ✨",
    expertStatsTitle: "Intervention Performance Analytics 📊",
    expertStatsSubtitle: "Objective mastery progress of children currently under your charge"
  }
};

const MOCK_RECORDS: InterventionRecord[] = [
  {
    id: "REC-2026-004",
    childName: "Trần Gia Bảo",
    age: 4,
    parentName: "Nguyễn Thanh Hằng",
    level: "levelLight",
    levelColor: "green",
    status: "active",
    progress: 78,
    startDate: "2026-01-15",
    objectives: [
      "Giao tiếp bằng mắt chủ động đạt > 5 giây khi nói chuyện",
      "Gọi tên quay lại đáp ứng trong 8/10 lần thử nghiệm",
      "Sử dụng cụm từ 3 từ để biểu đạt nhu cầu cá nhân"
    ],
    recentNote: "Bé phản ứng rất nhanh khi cô giáo gọi tên hôm nay. Tuy nhiên, khả năng giao tiếp mắt cần duy trì đều đặn ở các môi trường ồn ào."
  },
  {
    id: "REC-2026-011",
    childName: "Đỗ Hoàng Hải",
    age: 5,
    parentName: "Đỗ Thùy Linh",
    level: "levelMedium",
    levelColor: "amber",
    status: "active",
    progress: 52,
    startDate: "2026-02-10",
    objectives: [
      "Ngồi yên tập trung thực hiện nhiệm vụ bento gỗ > 10 phút",
      "Giảm hành vi vỗ tay tự kích thích khi phấn khích",
      "Đáp lại câu hỏi đơn giản Có/Không một cách độc lập"
    ],
    recentNote: "Bé đã chịu ngồi ghép tranh gỗ được 8 phút. Hành vi vỗ tay tự kích thích có xu hướng giảm nhẹ khi được ôm chặt (Deep Pressure)."
  },
  {
    id: "REC-2026-009",
    childName: "Phạm Minh Đăng",
    age: 3,
    parentName: "Phạm Hoàng Nam",
    level: "levelSevere",
    levelColor: "red",
    status: "active",
    progress: 35,
    startDate: "2026-03-01",
    objectives: [
      "Phản xạ nhìn theo vật thể di động và hướng chỉ tay của cô",
      "Bắt chước 5 âm cơ bản (a, o, u, ba, ma)",
      "Chấp nhận tương tác cầm tay chỉ việc trong trò chơi cát trị liệu"
    ],
    recentNote: "Buổi trị liệu cảm giác đạt kết quả khả quan, bé ít khóc ré khi tiếp xúc với cát mịn, bắt đầu phát âm 'ba' khi cô khuyến khích."
  },
  {
    id: "REC-2026-002",
    childName: "Phan Khánh Ngọc",
    age: 6,
    parentName: "Phan Thu Trang",
    level: "levelLight",
    levelColor: "green",
    status: "graduated",
    progress: 95,
    startDate: "2025-08-20",
    objectives: [
      "Hòa nhập vui chơi tương tác nhóm 3 trẻ không xung đột",
      "Tự thực hiện vệ sinh cá nhân rửa tay theo quy trình 6 bước",
      "Kể lại ngắn gọn một câu chuyện tranh 4 khung cảnh đơn giản"
    ],
    recentNote: "Hồ sơ hoàn thành can thiệp xuất sắc. Bé đã sẵn sàng vào học lớp 1 trường hòa nhập thông thường. Sẽ kiểm tra định kỳ 6 tháng."
  }
];

const StaffInterventionTab: React.FC<{ lang: 'vi' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  const [records] = useState<InterventionRecord[]>(MOCK_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'graduated'>('all');
  const [showToast, setShowToast] = useState(false);

  const handleCreateRecord = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredRecords = records.filter(rec => {
    const matchesSearch = rec.childName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rec.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="intervention-tab-wrapper staff-intervention-wrapper">
      
      {/* Toast Alert */}
      {showToast && (
        <div className="profile-toast-message shadow-bounce">
          <span className="profile-toast-icon">📂</span>
          <span className="profile-toast-text">{t.toastCreateSuccess}</span>
        </div>
      )}

      {/* Header với khung viền đen Memphis */}
      <div 
        className="intervention-header-zone"
        style={{
          background: '#FFFFFF',
          border: '3px solid #1E293B',
          borderRadius: '20px',
          padding: '1.5rem 2rem',
          boxShadow: '6px 6px 0px #1E293B',
          boxSizing: 'border-box',
          width: '100%',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        <div className="intervention-title-block">
          <h2 className="intervention-tab-title" style={{ margin: 0, fontWeight: 900, color: '#1E293B', fontSize: '1.4rem' }}>{t.title}</h2>
          <p className="intervention-tab-subtitle" style={{ margin: '6px 0 0 0', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>{t.subtitle}</p>
        </div>
        
        <button 
          type="button" 
          className="intervention-create-btn"
          onClick={handleCreateRecord}
          style={{ margin: 0 }}
        >
          {t.btnCreate}
        </button>
      </div>

      {/* Toolbar Board: Search and Filter */}
      <div className="intervention-toolbar-board">
        <div className="search-box-container">
          <input 
            type="text" 
            placeholder={t.placeholderSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="intervention-search-input"
          />
          {searchTerm && (
            <button className="search-clear-btn" onClick={() => setSearchTerm('')}>✖</button>
          )}
        </div>

        <div className="status-filter-pills">
          <button 
            type="button"
            className={`status-pill-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            {lang === 'vi' ? 'Tất cả hồ sơ' : 'All Records'}
          </button>
          <button 
            type="button"
            className={`status-pill-btn ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            {t.filterActive}
          </button>
          <button 
            type="button"
            className={`status-pill-btn ${statusFilter === 'graduated' ? 'active' : ''}`}
            onClick={() => setStatusFilter('graduated')}
          >
            {t.filterGraduated}
          </button>
        </div>
      </div>

      {/* Main Records Grid */}
      {filteredRecords.length === 0 ? (
        <div className="appointment-empty-state">
          <div className="empty-state-icon">📂</div>
          <h3 className="empty-state-title">{t.emptyStateTitle}</h3>
          <p className="empty-state-sub">{t.emptyStateSub}</p>
        </div>
      ) : (
        <div className="intervention-records-grid">
          {filteredRecords.map((rec) => (
            <div key={rec.id} className={`profile-sticker-card record-card status-${rec.status}`}>
              
              {/* Colored top border based on ASD level */}
              <div className={`record-card-top-accent level-accent-${rec.levelColor}`}></div>

              <div className="record-header">
                <span className="record-id-tag">{rec.id}</span>
                <span className={`record-status-badge badge-${rec.status}`}>
                  {rec.status === 'active' ? t.statusActive : t.statusGraduated}
                </span>
              </div>

              <h3 className="record-child-name">👶 {rec.childName}</h3>
              
              {/* General Grid Info */}
              <div className="record-general-info">
                <div>
                  <strong>{t.lblAge}</strong> <span>{rec.age} {lang === 'vi' ? 'tuổi' : 'years old'}</span>
                </div>
                <div>
                  <strong>{t.lblParent}</strong> <span>{rec.parentName}</span>
                </div>
                <div>
                  <strong>{t.lblStartDate}</strong> <span>{rec.startDate}</span>
                </div>
                <div className="span-2">
                  <strong>{t.lblLevel}</strong>
                  <span className={`asd-level-tag color-${rec.levelColor}`}>
                    {rec.level === 'levelLight' && t.levelLight}
                    {rec.level === 'levelMedium' && t.levelMedium}
                    {rec.level === 'levelSevere' && t.levelSevere}
                  </span>
                </div>
              </div>

              {/* Progress Bar Memphis 3D */}
              <div className="record-progress-section">
                <div className="progress-labels">
                  <strong>{t.lblProgress}</strong>
                  <span className="progress-number">{rec.progress}%</span>
                </div>
                <div className="progress-bar-track-memphis">
                  <div 
                    className="progress-bar-fill-memphis animate-fill" 
                    style={{ width: `${rec.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="card-dashed-line"></div>

              {/* Core Objectives List */}
              <div className="record-objectives-section">
                <h5 className="objectives-title">{t.lblObjectives}</h5>
                <ul className="objectives-bullet-list">
                  {rec.objectives.map((obj, i) => (
                    <li key={i}>🎯 {obj}</li>
                  ))}
                </ul>
              </div>

              {/* Recent Note Box */}
              <div className="record-note-box">
                <h5 className="note-box-title">📝 {t.lblRecentNote}</h5>
                <p className="note-box-content">{rec.recentNote}</p>
              </div>

              {/* Action candy button */}
              <button type="button" className="record-action-btn">
                📊 {t.lblDetailBtn}
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default StaffInterventionTab;
