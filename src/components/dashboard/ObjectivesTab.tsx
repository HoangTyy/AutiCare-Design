import React, { useState } from 'react';

interface Objective {
  id: string;
  nameVi: string;
  nameEn: string;
  categoryVi: string;
  categoryEn: string;
  date: string;
  status: 'Active' | 'Inactive';
}

interface ObjectivesTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Mục tiêu Huấn luyện",
    searchPlaceholder: "Tìm kiếm mục tiêu...",
    addNew: "Thêm mục tiêu",
    id: "ID",
    name: "Tên Mục tiêu",
    category: "Danh mục",
    date: "Ngày tạo",
    status: "Trạng thái",
    actions: "Thao tác",
    active: "Hoạt động",
    inactive: "Tạm ngưng",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm mới mục tiêu",
    editTitle: "Chỉnh sửa mục tiêu",
    deleteTitle: "Xác nhận xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa mục tiêu",
    deleteSub: "Hành động này không thể hoàn tác.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    confirmDelete: "Xác nhận xóa",
    formNameVi: "Tên Mục tiêu (Tiếng Việt)",
    formNameEn: "Tên Mục tiêu (Tiếng Anh)",
    formCategoryVi: "Danh mục (Tiếng Việt)",
    formCategoryEn: "Danh mục (Tiếng Anh)",
    formStatus: "Trạng thái",
    operationSuccess: "Thao tác thành công!"
  },
  en: {
    title: "Manage Training Objectives",
    searchPlaceholder: "Search objectives...",
    addNew: "Add Objective",
    id: "ID",
    name: "Objective Name",
    category: "Category",
    date: "Created At",
    status: "Status",
    actions: "Actions",
    active: "Active",
    inactive: "Inactive",
    noResults: "No matching results found",
    createTitle: "Create New Objective",
    editTitle: "Edit Training Objective",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete objective",
    deleteSub: "This action cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Confirm Delete",
    formNameVi: "Objective Name (Vietnamese)",
    formNameEn: "Objective Name (English)",
    formCategoryVi: "Category (Vietnamese)",
    formCategoryEn: "Category (English)",
    formStatus: "Status",
    operationSuccess: "Operation Successful!"
  }
};

const ObjectivesTab: React.FC<ObjectivesTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedObj, setSelectedObj] = useState<Objective | null>(null);

  const [objectives] = useState<Objective[]>([
    { id: 'OBJ-001', nameVi: 'Kỹ năng Giao tiếp mắt', nameEn: 'Eye Contact Skills', categoryVi: 'Tương tác xã hội', categoryEn: 'Social Interaction', date: '2026-05-10', status: 'Active' },
    { id: 'OBJ-002', nameVi: 'Phát âm nguyên âm đơn', nameEn: 'Single Vowel Pronunciation', categoryVi: 'Trị liệu Ngôn ngữ', categoryEn: 'Speech Therapy', date: '2026-05-12', status: 'Active' },
    { id: 'OBJ-003', nameVi: 'Nhận biết các màu sắc cơ bản', nameEn: 'Basic Color Recognition', categoryVi: 'Nhận thức', categoryEn: 'Cognitive Skills', date: '2026-05-15', status: 'Active' },
  ]);

  const openModal = (mode: 'create' | 'edit' | 'delete', obj: Objective | null = null) => {
    setModalMode(mode);
    setSelectedObj(obj);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedObj(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.operationSuccess);
    closeModal();
  };

  const filteredObjectives = objectives.filter(obj => {
    const term = searchTerm.toLowerCase();
    const name = lang === 'vi' ? obj.nameVi : obj.nameEn;
    const cat = lang === 'vi' ? obj.categoryVi : obj.categoryEn;
    return (
      name.toLowerCase().includes(term) ||
      obj.id.toLowerCase().includes(term) ||
      cat.toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-content-area">
      <div className="table-header">
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
              <th style={{ width: '100px' }}>{t.id}</th>
              <th>{t.name}</th>
              <th>{t.category}</th>
              <th>{t.date}</th>
              <th>{t.status}</th>
              <th style={{ textAlign: 'right', width: '100px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredObjectives.length > 0 ? (
              filteredObjectives.map((obj) => (
                <tr key={obj.id}>
                  <td className="id-col">{obj.id}</td>
                  <td className="name-col">{lang === 'vi' ? obj.nameVi : obj.nameEn}</td>
                  <td>{lang === 'vi' ? obj.categoryVi : obj.categoryEn}</td>
                  <td>{obj.date}</td>
                  <td>
                    <span className={`badge ${obj.status.toLowerCase()}`}>
                      {obj.status === 'Active' ? t.active : t.inactive}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button className="edit-btn-v2" title={t.editTitle} onClick={() => openModal('edit', obj)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                      <button className="delete-btn-v2" title={t.deleteTitle} onClick={() => openModal('delete', obj)}>
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
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
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

            <form onSubmit={handleSave}>
              <div className="modal-body">
                {modalMode === 'delete' ? (
                  <div className="delete-confirm">
                    <div className="warning-icon">⚠️</div>
                    <p>
                      {t.deleteConfirm} "{lang === 'vi' ? selectedObj?.nameVi : selectedObj?.nameEn}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                ) : (
                  <div className="modal-form">
                    <div className="form-group">
                      <label>{t.formNameVi}</label>
                      <input
                        type="text"
                        defaultValue={selectedObj?.nameVi || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formNameEn}</label>
                      <input
                        type="text"
                        defaultValue={selectedObj?.nameEn || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formCategoryVi}</label>
                      <input
                        type="text"
                        defaultValue={selectedObj?.categoryVi || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formCategoryEn}</label>
                      <input
                        type="text"
                        defaultValue={selectedObj?.categoryEn || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formStatus}</label>
                      <select defaultValue={selectedObj?.status || 'Active'}>
                        <option value="Active">{t.active}</option>
                        <option value="Inactive">{t.inactive}</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className={`btn-primary ${modalMode === 'delete' ? 'btn-danger' : ''}`}
                >
                  {modalMode === 'delete' ? t.confirmDelete : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectivesTab;
