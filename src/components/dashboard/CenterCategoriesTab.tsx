import React, { useState } from 'react';

export interface ExerciseCategory {
  id: string;
  name: string;
  date: string;
  isParent?: boolean;
  isSub?: boolean;
}

interface CenterCategoriesTabProps {
  lang: 'vi' | 'en';
  categories: ExerciseCategory[];
  onUpdateCategories: (newCategories: ExerciseCategory[]) => void;
}

const translations = {
  vi: {
    title: "Danh mục Bài tập",
    searchPlaceholder: "Tìm kiếm danh mục...",
    addNew: "Thêm danh mục",
    id: "ID",
    name: "Tên Danh mục",
    date: "Ngày tạo",
    actions: "Thao tác",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm mới danh mục",
    editTitle: "Chỉnh sửa danh mục",
    deleteTitle: "Xác nhận xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa danh mục bài tập",
    deleteSub: "Hành động này không thể hoàn tác.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    confirmDelete: "Xác nhận xóa",
    formName: "Tên Danh mục",
    formParent: "Danh mục cha",
    none: "Không có",
    operationSuccess: "Thao tác thành công!"
  },
  en: {
    title: "Exercise Categories",
    searchPlaceholder: "Search categories...",
    addNew: "Add Category",
    id: "ID",
    name: "Exercise Category Name",
    date: "Created At",
    actions: "Actions",
    noResults: "No matching results found",
    createTitle: "Create New Category",
    editTitle: "Edit Exercise Category",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete exercise category",
    deleteSub: "This action cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Confirm Delete",
    formName: "Category Name",
    formParent: "Parent Category",
    none: "None",
    operationSuccess: "Operation Successful!"
  }
};

const CenterCategoriesTab: React.FC<CenterCategoriesTabProps> = ({ lang, categories, onUpdateCategories }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedCat, setSelectedCat] = useState<ExerciseCategory | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formIsSub, setFormIsSub] = useState(false);

  const openModal = (mode: 'create' | 'edit' | 'delete', cat: ExerciseCategory | null = null) => {
    setModalMode(mode);
    setSelectedCat(cat);
    if (cat) {
      setFormName(cat.name);
      setFormIsSub(!!cat.isSub);
    } else {
      setFormName('');
      setFormIsSub(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCat(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    if (modalMode === 'create') {
      const newCat: ExerciseCategory = {
        id: String(categories.length > 0 ? Math.max(...categories.map(c => parseInt(c.id) || 0)) + 1 : 1),
        name: formName,
        date: dateStr,
        isParent: !formIsSub,
        isSub: formIsSub
      };
      // To insert subcategory correctly, we insert it after the last parent, or simply push
      // For visual structure in list, parents first then subs
      onUpdateCategories([...categories, newCat]);
    } else if (modalMode === 'edit' && selectedCat) {
      const updated = categories.map(c => c.id === selectedCat.id ? { ...c, name: formName, isParent: !formIsSub, isSub: formIsSub } : c);
      onUpdateCategories(updated);
    }
    alert(t.operationSuccess);
    closeModal();
  };

  const handleDelete = () => {
    if (selectedCat) {
      onUpdateCategories(categories.filter(c => c.id !== selectedCat.id));
    }
    alert(t.operationSuccess);
    closeModal();
  };

  // Specialized search: preserves parent context if children match
  const lowSearch = searchTerm.toLowerCase();
  let filteredRows: any[] = [];

  if (searchTerm) {
    const matchIndices = new Set<number>();

    // Find direct matches
    categories.forEach((row, i) => {
      if (Object.values(row).some(val => String(val).toLowerCase().includes(lowSearch))) {
        matchIndices.add(i);
      }
    });

    const finalIndices = new Set(matchIndices);

    // Add parents if subcategories match
    matchIndices.forEach(idx => {
      const row = categories[idx];
      if (row.isSub) {
        for (let i = idx - 1; i >= 0; i--) {
          const potentialParent = categories[i];
          if (potentialParent.isParent) {
            finalIndices.add(i);
            break;
          }
        }
      }
    });

    filteredRows = categories
      .filter((_, i) => finalIndices.has(i))
      .map((row) => ({
        ...row,
        isHighlight: Object.values(row).some(val => String(val).toLowerCase().includes(lowSearch))
      }));
  } else {
    filteredRows = categories.map((row) => ({
      ...row,
      isHighlight: false
    }));
  }

  return (
    <div className="center-categories-container" style={{ animation: 'fadeIn 0.4s ease-out' }}>
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
              <th>{t.date}</th>
              <th style={{ textAlign: 'right', width: '100px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row, i) => (
                <tr key={i} className={row.isHighlight ? 'neon-highlight' : ''}>
                  <td className="id-col">{row.id}</td>
                  <td className={`name-col ${row.isSub ? 'sub-category-cell' : ''} ${row.isParent ? 'parent-category-cell' : ''}`}>
                    {row.isSub && <span className="sub-indicator">└</span>}
                    {row.name}
                  </td>
                  <td>{row.date}</td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button className="edit-btn-v2" title={t.editTitle} onClick={() => openModal('edit', row)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                      <button className="delete-btn-v2" title={t.deleteTitle} onClick={() => openModal('delete', row)}>
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
                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
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
                      {t.deleteConfirm} "{selectedCat?.name}"?
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
                      <label>{t.formParent}</label>
                      <select
                        value={formIsSub ? 'sub' : 'parent'}
                        onChange={(e) => setFormIsSub(e.target.value === 'sub')}
                      >
                        <option value="parent">--- {t.none} ({lang === 'vi' ? 'Danh mục gốc' : 'Root Category'}) ---</option>
                        <option value="sub">{lang === 'vi' ? 'Thuộc danh mục con' : 'Sub-category'}</option>
                      </select>
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

export default CenterCategoriesTab;
