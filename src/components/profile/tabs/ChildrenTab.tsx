import React, { useState } from 'react';

interface ChildrenTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Hồ sơ các Trẻ Can thiệp",
    subtitle: "Quản lý danh sách hồ sơ các trẻ được theo dõi chẩn đoán hoặc đang tham gia trị liệu can thiệp sớm",
    childName: "Họ và tên trẻ",
    dob: "Ngày sinh",
    gender: "Giới tính",
    level: "Mức độ tự kỷ",
    lastAssessed: "Đánh giá gần nhất",
    levelMild: "Nhẹ (Mức độ 1 - Cần hỗ trợ)",
    levelModerate: "Trung bình (Mức độ 2 - Cần hỗ trợ nhiều)",
    levelSevere: "Nặng (Mức độ 3 - Cần hỗ trợ rất nhiều)",
    male: "Nam",
    female: "Nữ",
    addBtn: "✨ Thêm hồ sơ con em",
    noData: "Không có hồ sơ bé nào.",
    addModalTitle: "👶 Thêm Hồ Sơ Trẻ Mới",
    nameLabel: "Họ và tên của bé",
    dobLabel: "Ngày sinh",
    genderLabel: "Giới tính của bé",
    levelLabel: "Mức độ chẩn đoán ban đầu",
    cancel: "Hủy",
    submit: "Tạo hồ sơ 🚀",
    successMsg: "✨ Thêm hồ sơ trẻ thành công! Bé: ",
    namePlaceholder: "Ví dụ: Nguyễn Minh Khang...",
    diagnosticDate: "Ngày chẩn đoán",
    detailBtn: "Hồ sơ chi tiết 📁"
  },
  en: {
    title: "Children Intervention Profiles",
    subtitle: "Manage profiles of children undergoing diagnostic tracking or early intervention therapy",
    childName: "Child's Full Name",
    dob: "Date of Birth",
    gender: "Gender",
    level: "Autism Severity Level",
    lastAssessed: "Last Assessment",
    levelMild: "Mild (Level 1 - Requiring Support)",
    levelModerate: "Moderate (Level 2 - Requiring Substantial Support)",
    levelSevere: "Severe (Level 3 - Requiring Very Substantial Support)",
    male: "Male",
    female: "Female",
    addBtn: "✨ Add Child Profile",
    noData: "No children profiles found.",
    addModalTitle: "👶 Add New Child Profile",
    nameLabel: "Child's Full Name",
    dobLabel: "Date of Birth",
    genderLabel: "Child's Gender",
    levelLabel: "Initial Diagnostic Severity",
    cancel: "Cancel",
    submit: "Create Profile 🚀",
    successMsg: "✨ Child profile added successfully! Name: ",
    namePlaceholder: "e.g. Nguyen Minh Khang...",
    diagnosticDate: "Diagnosis Date",
    detailBtn: "Detailed Profile 📁"
  }
};

const INITIAL_CHILDREN = [
  {
    id: "CHD-2026-01",
    name: "Nguyễn Đức Minh",
    dob: "2021-08-14",
    gender: "male",
    level: "moderate",
    lastAssessed: "2026-05-15",
    avatar: "👦"
  },
  {
    id: "CHD-2026-02",
    name: "Nguyễn Minh Vy",
    dob: "2022-11-02",
    gender: "female",
    level: "mild",
    lastAssessed: "2026-05-18",
    avatar: "👧"
  }
];

const ChildrenTab: React.FC<ChildrenTabProps> = ({ lang }) => {
  const t = translations[lang];

  const [children, setChildren] = useState(INITIAL_CHILDREN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [level, setLevel] = useState("mild");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCreateChild = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `CHD-2026-0${children.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    
    const newChild = {
      id: newId,
      name: name,
      dob: dob,
      gender: gender,
      level: level,
      lastAssessed: today,
      avatar: gender === 'male' ? "👦" : "👧"
    };

    setChildren([...children, newChild]);
    setIsModalOpen(false);

    // Reset Form
    setName("");
    setDob("");
    setGender("male");
    setLevel("mild");

    // Show Toast
    setToastMessage(t.successMsg + name);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const getLevelBadgeClass = (lvl: string) => {
    switch (lvl) {
      case 'severe': return 'level-severe';
      case 'moderate': return 'level-moderate';
      default: return 'level-mild';
    }
  };

  const getLevelLabel = (lvl: string) => {
    switch (lvl) {
      case 'severe': return t.levelSevere;
      case 'moderate': return t.levelModerate;
      default: return t.levelMild;
    }
  };

  return (
    <div className="profile-tab-content">
      {toastMessage && (
        <div className="profile-toast animate-toast">
          {toastMessage}
        </div>
      )}

      <div className="tab-section-header support-header-flex">
        <div>
          <h2 className="tab-section-title">👶 {t.title}</h2>
          <p className="tab-section-subtitle">{t.subtitle}</p>
        </div>
        <button 
          type="button" 
          className="profile-page-btn-primary support-create-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          {t.addBtn}
        </button>
      </div>

      {/* Children Grid */}
      <div className="children-sticker-grid">
        {children.map((child, idx) => (
          <div 
            key={child.id} 
            className="profile-sticker-card child-card"
            style={{ 
              animationDelay: `${idx * 80}ms`,
              transform: `rotate(${(idx % 2 === 0 ? 0.3 : -0.3)}deg)` 
            }}
          >
            <div className="child-card-header">
              <span className="child-card-code">{child.id}</span>
              <span className={`child-gender-badge gender-${child.gender}`}>
                {child.gender === 'male' ? "♂️" : "♀️"}
              </span>
            </div>
            
            <div className="child-card-body">
              <div className="child-avatar-display">{child.avatar}</div>
              <h3 className="child-card-name">{child.name}</h3>
              
              <div className="child-card-details">
                <div className="child-detail-row">
                  <span className="child-detail-label">📅 {t.dob}:</span>
                  <span className="child-detail-value">{child.dob}</span>
                </div>
                <div className="child-detail-row">
                  <span className="child-detail-label">⚧ {t.gender}:</span>
                  <span className="child-detail-value">
                    {child.gender === 'male' ? t.male : t.female}
                  </span>
                </div>
                <div className="child-detail-row child-detail-level">
                  <span className="child-detail-label">⚡ {t.level}:</span>
                  <span className={`level-badge ${getLevelBadgeClass(child.level)}`}>
                    {getLevelLabel(child.level)}
                  </span>
                </div>
                <div className="child-detail-row">
                  <span className="child-detail-label">🩺 {t.lastAssessed}:</span>
                  <span className="child-detail-value font-highlight">{child.lastAssessed}</span>
                </div>
              </div>
            </div>

            <div className="child-card-footer">
              <button 
                type="button" 
                className="profile-page-btn-secondary child-detail-btn"
                onClick={() => alert(lang === 'vi' ? 'Xem hồ sơ chi tiết bé ' + child.name : 'Showing detailed profile for ' + child.name)}
              >
                {t.detailBtn}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Child Modal */}
      {isModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header child-modal-header">
              <h3 className="profile-modal-title">{t.addModalTitle}</h3>
              <button 
                type="button" 
                className="profile-modal-close-btn" 
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateChild}>
              <div className="profile-modal-body">
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.nameLabel}</label>
                  <input
                    type="text"
                    className="profile-page-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder={t.namePlaceholder}
                    spellCheck="false"
                  />
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.dobLabel}</label>
                  <input
                    type="date"
                    className="profile-page-input"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.genderLabel}</label>
                  <select
                    className="profile-page-input filter-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ background: '#F8FAFC' }}
                  >
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                  </select>
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.levelLabel}</label>
                  <select
                    className="profile-page-input filter-select"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    style={{ background: '#F8FAFC' }}
                  >
                    <option value="mild">{t.levelMild}</option>
                    <option value="moderate">{t.levelModerate}</option>
                    <option value="severe">{t.levelSevere}</option>
                  </select>
                </div>
              </div>
              <div className="profile-modal-footer">
                <button
                  type="button"
                  className="profile-page-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t.cancel}
                </button>
                <button type="submit" className="profile-page-btn-primary">
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenTab;
