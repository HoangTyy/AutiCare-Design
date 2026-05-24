import React, { useState } from 'react';

interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  avatarColor: string;
  lastTested: string;
}

interface PEP3SelectChildProps {
  lang: 'vi' | 'en';
  onSelect: (child: Child) => void;
  onBack: () => void;
}

const PEP3SelectChild: React.FC<PEP3SelectChildProps> = ({ lang, onSelect, onBack }) => {
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const childrenList: Child[] = [
    {
      id: 'child_1',
      name: lang === 'vi' ? 'Nguyễn Gia Bảo' : 'Gia Bao Nguyen',
      age: 3,
      gender: 'male',
      avatarColor: '#E0F2FE', // Blue nhạt
      lastTested: lang === 'vi' ? 'Chưa từng đánh giá' : 'Never assessed'
    },
    {
      id: 'child_2',
      name: lang === 'vi' ? 'Trần Minh Anh' : 'Minh Anh Tran',
      age: 4.5,
      gender: 'female',
      avatarColor: '#FCE7F3', // Pink nhạt
      lastTested: lang === 'vi' ? 'Đánh giá 15/04/2026' : 'Assessed on 04/15/2026'
    },
    {
      id: 'child_3',
      name: lang === 'vi' ? 'Lê Tuệ Lâm' : 'Tue Lam Le',
      age: 5,
      gender: 'female',
      avatarColor: '#EDE9FE', // Violet nhạt
      lastTested: lang === 'vi' ? 'Chưa từng đánh giá' : 'Never assessed'
    }
  ];

  const translations = {
    vi: {
      title: 'Chọn trẻ thực hiện đánh giá',
      subtitle: 'Vui lòng chọn trẻ để kết nối kết quả bài test PEP-3 vào Hồ sơ phát triển cá nhân',
      genderMale: 'Nam',
      genderFemale: 'Nữ',
      ageSuffix: 'tuổi',
      lastAssessed: 'Lần cuối:',
      btnBack: 'Quay lại',
      btnContinue: 'Tiếp tục',
      requiredHint: 'Vui lòng chọn một trẻ để bắt đầu.'
    },
    en: {
      title: 'Select Child for Assessment',
      subtitle: 'Please select a child to link PEP-3 test results to their personal development profile',
      genderMale: 'Male',
      genderFemale: 'Female',
      ageSuffix: 'y.o',
      lastAssessed: 'Last tested:',
      btnBack: 'Back',
      btnContinue: 'Continue',
      requiredHint: 'Please select a child to continue.'
    }
  };

  const t = translations[lang];

  const handleContinue = () => {
    const selectedChild = childrenList.find(c => c.id === selectedChildId);
    if (selectedChild) {
      onSelect(selectedChild);
    }
  };

  return (
    <div className="pep3-select-child-container">
      <div className="pep3-flow-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="children-stickers-grid">
        {childrenList.map((child) => {
          const isSelected = selectedChildId === child.id;
          return (
            <button
              key={child.id}
              type="button"
              className={`child-sticker-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedChildId(child.id)}
              style={{ '--child-accent': child.avatarColor } as React.CSSProperties}
            >
              <div className="child-avatar-zone" style={{ backgroundColor: child.avatarColor }}>
                <span className="avatar-icon">
                  {child.gender === 'male' ? '👦' : '👧'}
                </span>
              </div>
              <div className="child-sticker-info">
                <h3>{child.name}</h3>
                <div className="child-meta-tags">
                  <span className="child-meta-tag tag-age">
                    {child.age} {t.ageSuffix}
                  </span>
                  <span className={`child-meta-tag tag-gender ${child.gender}`}>
                    {child.gender === 'male' ? t.genderMale : t.genderFemale}
                  </span>
                </div>
                <span className="child-last-tested">
                  {t.lastAssessed} <strong>{child.lastTested}</strong>
                </span>
              </div>
              {isSelected && <span className="child-selected-badge">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="pep3-flow-footer">
        <button className="pep3-btn btn-secondary" onClick={onBack}>
          {t.btnBack}
        </button>
        <div className="footer-right-actions">
          {!selectedChildId && <span className="required-hint-text">{t.requiredHint}</span>}
          <button
            className={`pep3-btn btn-primary ${!selectedChildId ? 'disabled' : ''}`}
            disabled={!selectedChildId}
            onClick={handleContinue}
          >
            {t.btnContinue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PEP3SelectChild;
