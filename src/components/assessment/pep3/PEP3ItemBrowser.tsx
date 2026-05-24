import React, { useState } from 'react';
import { pep3ItemsList, type PEP3Item } from './database';

interface PEP3ItemBrowserProps {
  lang: 'vi' | 'en';
  childName: string;
  onBack: () => void;
}

const PEP3ItemBrowser: React.FC<PEP3ItemBrowserProps> = ({ lang, childName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubtest, setSelectedSubtest] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'CHILD' | 'CAREGIVER'>('ALL');
  const [filterCustomizedOnly, setFilterCustomizedOnly] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [tempNote, setTempNote] = useState('');
  
  // State to store child-specific adaptations in real-time
  const [childAdaptations, setChildAdaptations] = useState<Record<number, string>>({
    1: lang === 'vi' 
      ? `Đổi cốc nhựa trong tiêu chuẩn sang Cốc Khủng Long nhựa dẻo màu xanh lá (vật liệu yêu thích của bé). Bé rất hứng thú lật cốc tìm đồ chơi.`
      : `Swapped standard clear plastic cup with a green flexible Dinosaur cup (child's favorite). Child highly engaged in lifting it.`,
    4: lang === 'vi'
      ? `Bé nhạy cảm với tiếng bút sáp chì gõ xuống bàn. Thay thế bằng bút lông mềm đầu tròn dạ quang để bé vẽ đường dọc vẽ rất nhanh.`
      : `Child sensitive to wax crayon tapping sounds. Swapped with soft glow round felt-tip markers, drew lines very fast.`
  });
  const pep3Items = pep3ItemsList as PEP3Item[];

  const rawSubtests = [
    { value: 'CVP', label: lang === 'vi' ? 'CVP - Nhận thức có lời/trước lời' : 'CVP - Cognitive Verbal/Preverbal', isCaregiver: false },
    { value: 'EL', label: lang === 'vi' ? 'EL - Ngôn ngữ diễn đạt' : 'EL - Expressive Language', isCaregiver: false },
    { value: 'RL', label: lang === 'vi' ? 'RL - Tiếp thu ngôn ngữ' : 'RL - Receptive Language', isCaregiver: false },
    { value: 'FM', label: lang === 'vi' ? 'FM - Vận động tinh' : 'FM - Fine Motor', isCaregiver: false },
    { value: 'GM', label: lang === 'vi' ? 'GM - Vận động thô' : 'GM - Gross Motor', isCaregiver: false },
    { value: 'VMI', label: lang === 'vi' ? 'VMI - Liên kết tay - mắt' : 'VMI - Visual-Motor Imitation', isCaregiver: false },
    { value: 'AE', label: lang === 'vi' ? 'AE - Diễn đạt cảm xúc' : 'AE - Affective Expression', isCaregiver: false },
    { value: 'SR', label: lang === 'vi' ? 'SR - Tương tác xã hội' : 'SR - Social Reciprocity', isCaregiver: false },
    { value: 'CMB', label: lang === 'vi' ? 'CMB - Hành vi vận động đặc trưng' : 'CMB - Characteristic Motor Behaviors', isCaregiver: false },
    { value: 'CVB', label: lang === 'vi' ? 'CVB - Hành vi lời nói đặc trưng' : 'CVB - Characteristic Verbal Behaviors', isCaregiver: false },
    { value: 'PB', label: lang === 'vi' ? 'PB - Các vấn đề về hành vi' : 'PB - Problem Behaviors', isCaregiver: true },
    { value: 'PSC', label: lang === 'vi' ? 'PSC - Tính tự lập (Tự chăm sóc)' : 'PSC - Personal Self-Care', isCaregiver: true },
    { value: 'AB', label: lang === 'vi' ? 'AB - Hành vi thích ứng' : 'AB - Adaptive Behaviors', isCaregiver: true }
  ];

  const subtestOptions = [
    { value: 'ALL', label: lang === 'vi' ? (categoryFilter === 'CHILD' ? 'Tất cả 10 tiểu test của Trẻ' : categoryFilter === 'CAREGIVER' ? 'Tất cả 3 tiểu test Chăm Sóc' : 'Tất cả 13 tiểu test') : (categoryFilter === 'CHILD' ? 'All 10 Child Subtests' : categoryFilter === 'CAREGIVER' ? 'All 3 Caregiver Subtests' : 'All 13 Subtests') },
    ...rawSubtests.filter(opt => {
      if (categoryFilter === 'ALL') return true;
      if (categoryFilter === 'CHILD') return !opt.isCaregiver;
      if (categoryFilter === 'CAREGIVER') return opt.isCaregiver;
      return true;
    })
  ];

  const translations = {
    vi: {
      title: 'Trình duyệt & Tùy biến 172 Bài tập PEP-3',
      sub: 'Danh sách bài tập chuẩn lâm sàng tích hợp tùy biến vật liệu cho trẻ:',
      searchPlaceholder: 'Tìm kiếm bài tập theo tên hoặc vật liệu...',
      filterSubtest: 'Tiểu test:',
      filterCustomized: 'Chỉ hiển thị bài tập đã tùy biến',
      btnBack: 'Quay lại cẩm nang',
      btnSave: 'Lưu tùy biến',
      btnCancel: 'Hủy bỏ',
      btnAdapt: '✏️ Thêm vật liệu riêng của bé',
      adaptedSticker: '✨ Đã tùy biến cho bé',
      labelMaterial: '📦 Vật liệu tiêu chuẩn:',
      labelAdmin: '🎯 Cách thực hiện tiêu chuẩn:',
      labelScoring: '📊 Tiêu chuẩn chấm điểm:',
      labelAdaptGuide: '🩺 Ghi chú thích ứng y khoa (Gợi ý lâm sàng):',
      labelChildNotes: '💡 Tùy biến thực tế của riêng bé',
      emptyResults: '🔍 Không tìm thấy bài tập nào phù hợp với bộ lọc hiện tại.',
      itemsCountText: 'Hiển thị',
      itemsTotalText: 'trong tổng số 172 bài tập PEP-3',
      inputPlaceholder: 'Nhập ghi chú vật liệu thay thế cụ thể để bé hợp tác thực hiện (Ví dụ: Thay khối gỗ bằng mô hình đồ chơi khủng long nhựa mềm hoạt họa...)'
    },
    en: {
      title: 'Browse & Customize 172 PEP-3 Tasks',
      sub: 'Clinical item index with custom material adaptations for:',
      searchPlaceholder: 'Search items by name or standard materials...',
      filterSubtest: 'Subtest:',
      filterCustomized: 'Show customized items only',
      btnBack: 'Back to Guide',
      btnSave: 'Save Adaptation',
      btnCancel: 'Cancel',
      btnAdapt: '✏️ Customize for Child',
      adaptedSticker: '✨ Adapted for',
      labelMaterial: '📦 Standard Materials:',
      labelAdmin: '🎯 Standard Administration:',
      labelScoring: '📊 Scoring Criteria:',
      labelAdaptGuide: '🩺 Clinical Adaptation Guideline:',
      labelChildNotes: '💡 Customized Child Adaptation',
      emptyResults: '🔍 No items matched your search or filters.',
      itemsCountText: 'Showing',
      itemsTotalText: 'of 172 clinical PEP-3 items',
      inputPlaceholder: 'Enter custom replacement materials to elicit child cooperation (e.g., Swap wooden blocks with soft dinosaur toys...)'
    }
  };

  const t = translations[lang];

  // Filtering Logic
  const filteredItems = pep3Items.filter(item => {
    const matchesSearch = 
      item.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.materials[lang].toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.subtestCode.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSubtest = selectedSubtest === 'ALL' || item.subtestCode === selectedSubtest;
    
    const isCaregiverSubtest = ['PB', 'PSC', 'AB'].includes(item.subtestCode);
    const matchesCategory = 
      categoryFilter === 'ALL' ||
      (categoryFilter === 'CHILD' && !isCaregiverSubtest) ||
      (categoryFilter === 'CAREGIVER' && isCaregiverSubtest);

    const isCustomized = !!childAdaptations[item.id];
    const matchesCustomized = !filterCustomizedOnly || isCustomized;

    return matchesSearch && matchesSubtest && matchesCategory && matchesCustomized;
  });

  const handleOpenAdaptForm = (itemId: number) => {
    setEditingItemId(itemId);
    setTempNote(childAdaptations[itemId] || '');
  };

  const handleSaveAdaptation = (itemId: number) => {
    if (tempNote.trim()) {
      setChildAdaptations(prev => ({
        ...prev,
        [itemId]: tempNote
      }));
    } else {
      // If note is empty, remove the adaptation
      const updated = { ...childAdaptations };
      delete updated[itemId];
      setChildAdaptations(updated);
    }
    setEditingItemId(null);
  };

  return (
    <div className="pep3-item-browser-container">
      <div className="pep3-flow-header">
        <h1>{t.title}</h1>
        <p>{t.sub} <strong>{childName}</strong></p>
      </div>

      {/* Category Tabs Filter */}
      <div className="category-filter-tabs">
        <button 
          className={`category-tab-btn ${categoryFilter === 'ALL' ? 'active-all' : ''}`}
          onClick={() => setCategoryFilter('ALL')}
        >
          {lang === 'vi' ? '🏷️ Tất cả bài tập (172)' : '🏷️ All Items (172)'}
        </button>
        <button 
          className={`category-tab-btn ${categoryFilter === 'CHILD' ? 'active-child' : ''}`}
          onClick={() => {
            setCategoryFilter('CHILD');
            if (['PB', 'PSC', 'AB'].includes(selectedSubtest)) {
              setSelectedSubtest('ALL');
            }
          }}
        >
          {lang === 'vi' ? '👦 Đánh giá Trẻ (134)' : '👦 Child Assessment (134)'}
        </button>
        <button 
          className={`category-tab-btn ${categoryFilter === 'CAREGIVER' ? 'active-caregiver' : ''}`}
          onClick={() => {
            setCategoryFilter('CAREGIVER');
            if (!['ALL', 'PB', 'PSC', 'AB'].includes(selectedSubtest)) {
              setSelectedSubtest('ALL');
            }
          }}
        >
          {lang === 'vi' ? '👩‍👦 Người Chăm Sóc (38)' : '👩‍👦 Caregiver Report (38)'}
        </button>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="items-search-toolbar">
        <div className="toolbar-search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        <div className="toolbar-filters-row">
          <div className="filter-group-pill">
            <label>{t.filterSubtest}</label>
            <select 
              value={selectedSubtest}
              onChange={(e) => setSelectedSubtest(e.target.value)}
            >
              {subtestOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <label className="filter-checkbox-sticker">
            <input 
              type="checkbox" 
              checked={filterCustomizedOnly}
              onChange={(e) => setFilterCustomizedOnly(e.target.checked)}
            />
            <span>{t.filterCustomized}</span>
          </label>
        </div>
      </div>

      <div className="items-counter-badge">
        <span>{t.itemsCountText} <strong>{filteredItems.length}</strong> {t.itemsTotalText}</span>
      </div>

      {/* Items Grid Layout */}
      {filteredItems.length > 0 ? (
        <div className="pep3-items-grid">
          {filteredItems.map((item) => {
            const hasCustomNote = !!childAdaptations[item.id];
            const isEditing = editingItemId === item.id;

            return (
              <div 
                key={item.id} 
                className={`pep3-item-card ${hasCustomNote ? 'adapted-card' : ''}`}
              >
                {/* Header Section */}
                <div className="item-card-header-row">
                  <span className="item-code-badge">Item #{item.id}</span>
                  <span className="item-subtest-code">{item.subtestCode}</span>
                </div>

                <h3>{item.name[lang]}</h3>
                <small className="item-subtest-fullname">{item.subtestName[lang]}</small>

                {/* Details Section */}
                <div className="item-details-body">
                  <div className="item-detail-paragraph">
                    <strong>{t.labelMaterial}</strong>
                    <p>{item.materials[lang]}</p>
                  </div>
                  <div className="item-detail-paragraph">
                    <strong>{t.labelAdmin}</strong>
                    <p>{item.administration[lang]}</p>
                  </div>
                  <div className="item-detail-paragraph">
                    <strong>{t.labelScoring}</strong>
                    <div className="scoring-details-list">
                      <div className="score-row">
                        <span className="score-badge zero">0đ</span>
                        <p>{item.scoring[lang]["0"]}</p>
                      </div>
                      <div className="score-row">
                        <span className="score-badge one">1đ</span>
                        <p>{item.scoring[lang]["1"]}</p>
                      </div>
                      <div className="score-row">
                        <span className="score-badge two">2đ</span>
                        <p>{item.scoring[lang]["2"]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Standard Medical Adaptation Box */}
                  <div className="adaptation-note-box">
                    <strong>{t.labelAdaptGuide}</strong>
                    <p>{item.adaptationGuide[lang]}</p>
                  </div>

                  {/* Child customized note space */}
                  {hasCustomNote && !isEditing && (
                    <div className="child-custom-note-sticker">
                      <span className="sticker-label">{t.adaptedSticker} {childName} 👦</span>
                      <p>{childAdaptations[item.id]}</p>
                    </div>
                  )}

                  {/* Edit Form */}
                  {isEditing && (
                    <div className="child-edit-adaptation-form">
                      <label><strong>{t.labelChildNotes} ({childName}):</strong></label>
                      <textarea
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder={t.inputPlaceholder}
                      />
                      <div className="form-action-buttons">
                        <button 
                          className="pep3-btn btn-secondary btn-sm"
                          onClick={() => setEditingItemId(null)}
                        >
                          {t.btnCancel}
                        </button>
                        <button 
                          className="pep3-btn btn-primary btn-sm"
                          onClick={() => handleSaveAdaptation(item.id)}
                        >
                          {t.btnSave}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                {!isEditing && (
                  <div className="item-card-footer-actions">
                    <button 
                      className={`pep3-btn btn-secondary ${hasCustomNote ? 'btn-adapted-active' : ''}`}
                      onClick={() => handleOpenAdaptForm(item.id)}
                    >
                      {t.btnAdapt}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-results-box">
          <span className="empty-icon">🔍</span>
          <p>{t.emptyResults}</p>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="pep3-flow-footer">
        <button className="pep3-btn btn-secondary" onClick={onBack}>
          {t.btnBack}
        </button>
      </div>
    </div>
  );
};

export default PEP3ItemBrowser;
