import React, { useState } from 'react';

export interface ExerciseLevel {
  id: string;
  name: string;
  score: string;
  desc: string;
}

interface CenterLevelsTabProps {
  lang: 'vi' | 'en';
  levels: ExerciseLevel[];
  onUpdateLevels: (newLevels: ExerciseLevel[]) => void;
}

const translations = {
  vi: {
    title: "Cấp độ Bài tập",
    searchPlaceholder: "Tìm kiếm cấp độ...",
    addNew: "Thêm cấp độ",
    id: "ID",
    name: "Tên Cấp độ",
    score: "Điểm độ khó",
    desc: "Mô tả",
    actions: "Thao tác",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm mới cấp độ",
    editTitle: "Chỉnh sửa cấp độ",
    deleteTitle: "Xác nhận xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa cấp độ bài tập",
    deleteSub: "Hành động này không thể hoàn tác.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    confirmDelete: "Xác nhận xóa",
    formName: "Tên Cấp độ",
    formScore: "Điểm độ khó",
    formDesc: "Mô tả",
    operationSuccess: "Thao tác thành công!"
  },
  en: {
    title: "Exercise Levels",
    searchPlaceholder: "Search levels...",
    addNew: "Add Level",
    id: "ID",
    name: "Exercise Level Name",
    score: "Complexity Score",
    desc: "Description",
    actions: "Actions",
    noResults: "No matching results found",
    createTitle: "Create New Level",
    editTitle: "Edit Exercise Level",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete exercise level",
    deleteSub: "This action cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Confirm Delete",
    formName: "Level Name",
    formScore: "Complexity Score",
    formDesc: "Description",
    operationSuccess: "Operation Successful!"
  }
};

const CenterLevelsTab: React.FC<CenterLevelsTabProps> = ({ lang, levels, onUpdateLevels }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedLevel, setSelectedLevel] = useState<ExerciseLevel | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formScore, setFormScore] = useState('');
  const [formDesc, setFormDesc] = useState('');

  const openModal = (mode: 'create' | 'edit' | 'delete', level: ExerciseLevel | null = null) => {
    setModalMode(mode);
    setSelectedLevel(level);
    if (level) {
      setFormName(level.name);
      setFormScore(level.score);
      setFormDesc(level.desc);
    } else {
      setFormName('');
      setFormScore('1');
      setFormDesc('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLevel(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newLevel: ExerciseLevel = {
        id: String(levels.length > 0 ? Math.max(...levels.map(l => parseInt(l.id) || 0)) + 1 : 1),
        name: formName,
        score: formScore,
        desc: formDesc
      };
      onUpdateLevels([...levels, newLevel]);
    } else if (modalMode === 'edit' && selectedLevel) {
      const updated = levels.map(l => l.id === selectedLevel.id ? { ...l, name: formName, score: formScore, desc: formDesc } : l);
      onUpdateLevels(updated);
    }
    alert(t.operationSuccess);
    closeModal();
  };

  const handleDelete = () => {
    if (selectedLevel) {
      onUpdateLevels(levels.filter(l => l.id !== selectedLevel.id));
    }
    alert(t.operationSuccess);
    closeModal();
  };

  const filteredLevels = levels.filter(level => {
    const term = searchTerm.toLowerCase();
    return (
      level.name.toLowerCase().includes(term) ||
      level.id.toLowerCase().includes(term) ||
      level.desc.toLowerCase().includes(term)
    );
  });

  return (
    <div className="center-levels-container" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div className="table-header" style={{ padding: '1.5rem 0' }}>
        <h2 className="table-title">{t.title}</h2>
        <div className="table-actions">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={() => openModal('create')}>
            + {t.addNew}
          </button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>{t.id}</th>
              <th>{t.name}</th>
              <th>{t.score}</th>
              <th>{t.desc}</th>
              <th style={{ textAlign: 'right', width: '100px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredLevels.length > 0 ? (
              filteredLevels.map((level) => (
                <tr key={level.id}>
                  <td className="id-col">{level.id}</td>
                  <td className="name-col">{level.name}</td>
                  <td>
                    <span className="badge active" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                      ⭐ {level.score}
                    </span>
                  </td>
                  <td>{level.desc}</td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button className="edit-btn-v2" title={t.editTitle} onClick={() => openModal('edit', level)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                      <button className="delete-btn-v2" title={t.deleteTitle} onClick={() => openModal('delete', level)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                  {t.noResults}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal animate-in">
            <div className="modal-header">
              <h3>
                {modalMode === 'create' && t.createTitle}
                {modalMode === 'edit' && t.editTitle}
                {modalMode === 'delete' && t.deleteTitle}
              </h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>

            {modalMode === 'delete' ? (
              <div>
                <div className="modal-body">
                  <div className="delete-confirm">
                    <div className="warning-icon">⚠️</div>
                    <p>
                      {t.deleteConfirm} "{selectedLevel?.name}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={closeModal}>
                    {t.cancel}
                  </button>
                  <button className="btn-primary btn-danger" onClick={handleDelete}>
                    {t.confirmDelete}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="modal-form">
                    <div className="form-group">
                      <label>{t.formName}</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                        placeholder="..."
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formScore}</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={formScore}
                        onChange={(e) => setFormScore(e.target.value)}
                        required
                        placeholder="..."
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formDesc}</label>
                      <textarea
                        value={formDesc}
                        onChange={(e) => setFormDesc(e.target.value)}
                        placeholder="..."
                        spellCheck="false"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={closeModal}>
                    {t.cancel}
                  </button>
                  <button type="submit" className="btn-primary">
                    {t.save}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterLevelsTab;
