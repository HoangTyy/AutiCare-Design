import React, { useState } from 'react';

export interface Exercise {
  exercise_id: number;
  center_id: number;
  exercise_level_id: number;
  exercise_category_id: number;
  created_by: string;
  exercise_name: string;
  exercise_description: string;
  exercise_target: string;
  status: 'Active' | 'Inactive';
  tutorial_url: string;
  created_at: string;
  updated_at: string;
}

interface ExercisesTabProps {
  lang: 'vi' | 'en';
}

type ModalMode = 'create' | 'edit' | 'detail' | 'delete';

const mockLevels = [
  { id: 1, nameVi: "Dễ", nameEn: "Easy" },
  { id: 2, nameVi: "Bình Thường", nameEn: "Medium" },
  { id: 3, nameVi: "Khó", nameEn: "Hard" }
];

const mockCategories = [
  { id: 1, nameVi: "Giáo dục thể chất", nameEn: "Physical Education" },
  { id: 2, nameVi: "Vận động thô", nameEn: "Gross Motor" },
  { id: 3, nameVi: "Vận động tinh", nameEn: "Fine Motor" },
  { id: 4, nameVi: "Phát triển ngôn ngữ", nameEn: "Language Development" },
  { id: 5, nameVi: "Giao tiếp xã hội", nameEn: "Social Communication" }
];

const mockCenters = [
  { id: 1, name: "AutiCare Central Saigon" },
  { id: 2, name: "AutiCare Hanoi North" },
  { id: 3, name: "AutiCare Da Nang Beach" }
];

const initialExercises: Exercise[] = [
  {
    exercise_id: 101,
    center_id: 1,
    exercise_level_id: 1,
    exercise_category_id: 3,
    created_by: "Dr. Nguyễn Văn A",
    exercise_name: "Xỏ hạt chuỗi gỗ hạt lớn",
    exercise_description: "Hướng dẫn trẻ sử dụng ngón trỏ và ngón cái để cầm sợi dây và luồn qua lỗ các hạt gỗ có kích thước lớn. Giúp tăng cường phối hợp tay mắt và sự kiên nhẫn.",
    exercise_target: "Trẻ tự xỏ được 5 hạt gỗ trong vòng 3 phút mà không làm rơi dây.",
    status: "Active",
    tutorial_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    created_at: "2026-05-10",
    updated_at: "2026-05-12"
  },
  {
    exercise_id: 102,
    center_id: 1,
    exercise_level_id: 2,
    exercise_category_id: 2,
    created_by: "Cô Lê Thị B",
    exercise_name: "Thăng bằng trên vạch kẻ thẳng",
    exercise_description: "Vẽ một đường thẳng dài 3m trên sàn. Hướng dẫn trẻ đi từng bước nối gót trên đường thẳng, hai tay dang ngang để giữ thăng bằng cảm giác cơ thể.",
    exercise_target: "Đi hết chiều dài vạch mà không bước chân lệch ra ngoài quá 2 lần.",
    status: "Active",
    tutorial_url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    created_at: "2026-05-15",
    updated_at: "2026-05-15"
  },
  {
    exercise_id: 103,
    center_id: 2,
    exercise_level_id: 3,
    exercise_category_id: 4,
    created_by: "Dr. Trần Thu Hằng",
    exercise_name: "Kể chuyện theo tranh chuỗi",
    exercise_description: "Sử dụng 4 bức tranh diễn tả chuỗi hành động sinh hoạt hàng ngày (đánh răng, rửa mặt, ăn sáng, đi học). Yêu cầu trẻ sắp xếp đúng thứ tự và nói câu ngắn kể về bức tranh.",
    exercise_target: "Sắp xếp đúng 100% và nói được câu có ít nhất 4 từ đơn kể lại hành động.",
    status: "Active",
    tutorial_url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    created_at: "2026-05-18",
    updated_at: "2026-05-20"
  }
];

const translations = {
  vi: {
    title: "Quản lý bài tập can thiệp",
    searchPlaceholder: "Tìm kiếm bài tập theo tên hoặc ID...",
    addNew: "Thêm bài tập",
    id: "Mã bài tập",
    name: "Tên bài tập",
    level: "Cấp độ",
    category: "Danh mục",
    status: "Trạng thái",
    actions: "Thao tác",
    active: "Hoạt động",
    inactive: "Tạm ngưng",
    noResults: "Không tìm thấy bài tập nào",
    createTitle: "Tạo bài tập mới",
    editTitle: "Cập nhật bài tập",
    detailTitle: "Chi tiết bài tập",
    deleteTitle: "Xác nhận xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa bài tập",
    deleteSub: "Hành động này sẽ xóa vĩnh viễn bài tập và không thể hoàn tác.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    confirmDelete: "Xác nhận xóa",
    formName: "Tên bài tập (nvarchar)",
    formDesc: "Mô tả bài tập (text)",
    formTarget: "Mục tiêu bài tập (nvarchar)",
    formStatus: "Trạng thái",
    formUrl: "Link video hướng dẫn (Youtube URL)",
    formLevel: "Cấp độ độ khó",
    formCategory: "Danh mục huấn luyện",
    formCenter: "Trung tâm trực thuộc",
    createdBy: "Người tạo",
    createdAt: "Ngày tạo",
    updatedAt: "Cập nhật lúc",
    unassigned: "Chưa phân công",
    operationSuccess: "Thao tác thành công!",
    btnDetails: "Xem chi tiết",
    btnEdit: "Chỉnh sửa bài tập",
    btnDelete: "Xóa bài tập",
    viewVideo: "Xem video hướng dẫn"
  },
  en: {
    title: "Manage Intervention Exercises",
    searchPlaceholder: "Search exercise by name or ID...",
    addNew: "Add Exercise",
    id: "Exercise ID",
    name: "Exercise Name",
    level: "Level",
    category: "Category",
    status: "Status",
    actions: "Actions",
    active: "Active",
    inactive: "Inactive",
    noResults: "No exercises found",
    createTitle: "Create New Exercise",
    editTitle: "Update Exercise Info",
    detailTitle: "Exercise Detail View",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete exercise",
    deleteSub: "This action will permanently delete this exercise and cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Confirm Delete",
    formName: "Exercise Name (nvarchar)",
    formDesc: "Description (text)",
    formTarget: "Target/Objective (nvarchar)",
    formStatus: "Status",
    formUrl: "Tutorial Video (Youtube URL)",
    formLevel: "Difficulty Level",
    formCategory: "Training Category",
    formCenter: "Affiliated Center",
    createdBy: "Created By",
    createdAt: "Created At",
    updatedAt: "Updated At",
    unassigned: "Unassigned",
    operationSuccess: "Operation Successful!",
    btnDetails: "View Details",
    btnEdit: "Edit Exercise",
    btnDelete: "Delete Exercise",
    viewVideo: "Watch Tutorial Video"
  }
};

const ExercisesTab: React.FC<ExercisesTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedEx, setSelectedEx] = useState<Exercise | null>(null);

  // Form states
  const [exName, setExName] = useState('');
  const [exDesc, setExDesc] = useState('');
  const [exTarget, setExTarget] = useState('');
  const [exStatus, setExStatus] = useState<'Active' | 'Inactive'>('Active');
  const [exUrl, setExUrl] = useState('');
  const [exLevelId, setExLevelId] = useState(1);
  const [exCatId, setExCatId] = useState(1);
  const [exCenterId, setExCenterId] = useState(1);

  const openModal = (mode: ModalMode, exercise: Exercise | null = null) => {
    setModalMode(mode);
    setSelectedEx(exercise);
    if (exercise) {
      setExName(exercise.exercise_name);
      setExDesc(exercise.exercise_description);
      setExTarget(exercise.exercise_target);
      setExStatus(exercise.status);
      setExUrl(exercise.tutorial_url);
      setExLevelId(exercise.exercise_level_id);
      setExCatId(exercise.exercise_category_id);
      setExCenterId(exercise.center_id);
    } else {
      setExName('');
      setExDesc('');
      setExTarget('');
      setExStatus('Active');
      setExUrl('');
      setExLevelId(1);
      setExCatId(1);
      setExCenterId(1);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEx(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().split('T')[0];
    
    if (modalMode === 'delete') {
      if (selectedEx) {
        setExercises(exercises.filter(ex => ex.exercise_id !== selectedEx.exercise_id));
      }
    } else if (modalMode === 'create') {
      const nextId = exercises.length > 0 ? Math.max(...exercises.map(e => e.exercise_id)) + 1 : 101;
      const newEx: Exercise = {
        exercise_id: nextId,
        center_id: exCenterId,
        exercise_level_id: exLevelId,
        exercise_category_id: exCatId,
        created_by: lang === 'vi' ? 'Hệ thống Admin' : 'Admin System',
        exercise_name: exName,
        exercise_description: exDesc,
        exercise_target: exTarget,
        status: exStatus,
        tutorial_url: exUrl,
        created_at: nowStr,
        updated_at: nowStr
      };
      setExercises([...exercises, newEx]);
    } else if (modalMode === 'edit' && selectedEx) {
      // Nghiệp vụ: Chỉ cho phép cập nhật exercise_description, exercise_target và tutorial_url
      const updated = exercises.map(ex => 
        ex.exercise_id === selectedEx.exercise_id 
          ? { 
              ...ex, 
              exercise_description: exDesc, 
              exercise_target: exTarget, 
              tutorial_url: exUrl,
              updated_at: nowStr
            } 
          : ex
      );
      setExercises(updated);
    }
    alert(t.operationSuccess);
    closeModal();
  };

  const filteredExercises = exercises.filter(ex => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = ex.exercise_name.toLowerCase().includes(term) || ex.exercise_id.toString().includes(term);
    const matchesLevel = levelFilter === 'all' || ex.exercise_level_id.toString() === levelFilter;
    const matchesCategory = categoryFilter === 'all' || ex.exercise_category_id.toString() === categoryFilter;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelName = (levelId: number) => {
    const lvl = mockLevels.find(l => l.id === levelId);
    if (!lvl) return '';
    return lang === 'vi' ? lvl.nameVi : lvl.nameEn;
  };

  const getCategoryName = (catId: number) => {
    const cat = mockCategories.find(c => c.id === catId);
    if (!cat) return '';
    return lang === 'vi' ? cat.nameVi : cat.nameEn;
  };

  const getCenterName = (centerId: number) => {
    const cen = mockCenters.find(c => c.id === centerId);
    return cen ? cen.name : t.unassigned;
  };

  return (
    <div className="dashboard-content-area">
      <style>{`
        .admin-modal {
          max-width: 820px;
          width: min(820px, 95vw);
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 18px;
        }

        .modal-form-grid .form-group {
          margin-bottom: 0;
        }

        .modal-form-grid .form-group-full {
          grid-column: 1 / -1;
        }

        .modal-form-grid input,
        .modal-form-grid select,
        .modal-form-grid textarea,
        .modal-form-grid .view-detail-text {
          width: 100%;
          box-sizing: border-box;
        }

        .filter-select {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          background: #F1F5F9;
          color: #1E293B;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          font-size: 0.85rem;
          font-family: "Be Vietnam Pro", sans-serif;
          transition: all 0.2s ease;
        }

        .filter-select:focus {
          background: white;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
        }

        @media (max-width: 720px) {
          .modal-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="table-header">
        <h2 className="table-title">{t.title}</h2>
        <div className="table-actions" style={{ flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Level Filter */}
          <select 
            className="filter-select"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="all">{lang === 'vi' ? 'Tất cả Cấp độ' : 'All Levels'}</option>
            {mockLevels.map(lvl => (
              <option key={lvl.id} value={lvl.id}>{lang === 'vi' ? lvl.nameVi : lvl.nameEn}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select 
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">{lang === 'vi' ? 'Tất cả Danh mục' : 'All Categories'}</option>
            {mockCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{lang === 'vi' ? cat.nameVi : cat.nameEn}</option>
            ))}
          </select>

          {/* Search bar */}
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <button className="add-btn" onClick={() => openModal('create')}>
            + {t.addNew}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '120px' }}>{t.id}</th>
              <th>{t.name}</th>
              <th style={{ width: '150px' }}>{t.level}</th>
              <th style={{ width: '220px' }}>{t.category}</th>
              <th style={{ width: '140px' }}>{t.status}</th>
              <th style={{ textAlign: 'right', width: '150px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredExercises.length > 0 ? (
              filteredExercises.map((ex) => (
                <tr key={ex.exercise_id}>
                  <td className="id-col">EX-{ex.exercise_id}</td>
                  <td className="name-col">{ex.exercise_name}</td>
                  <td>
                    <span className={`badge ${ex.exercise_level_id === 1 ? 'active' : ex.exercise_level_id === 2 ? 'inactive' : 'banned'}`}>
                      {getLevelName(ex.exercise_level_id)}
                    </span>
                  </td>
                  <td>{getCategoryName(ex.exercise_category_id)}</td>
                  <td>
                    <span className={`badge ${ex.status.toLowerCase()}`}>
                      {ex.status === 'Active' ? t.active : t.inactive}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end', display: 'flex', gap: '5px' }}>
                      
                      {/* View Details */}
                      <button
                        className="view-btn-v2"
                        title={t.btnDetails}
                        onClick={() => openModal('detail', ex)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      </button>

                      {/* Edit */}
                      <button
                        className="edit-btn-v2"
                        title={t.btnEdit}
                        onClick={() => openModal('edit', ex)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button
                        className="delete-btn-v2"
                        title={t.btnDelete}
                        onClick={() => openModal('delete', ex)}
                      >
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

      {/* Modals System */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="admin-modal animate-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalMode === 'create' && t.createTitle}
                {modalMode === 'edit' && t.editTitle}
                {modalMode === 'detail' && t.detailTitle}
                {modalMode === 'delete' && t.deleteTitle}
              </h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                {modalMode === 'delete' && selectedEx && (
                  <div className="delete-confirm">
                    <div className="warning-icon">⚠️</div>
                    <p>
                      {t.deleteConfirm} "EX-{selectedEx.exercise_id} - {selectedEx.exercise_name}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                )}

                {modalMode === 'detail' && selectedEx && (
                  <div className="modal-form modal-form-grid">
                    <div className="form-group">
                      <label>{t.id}</label>
                      <input type="text" value={`EX-${selectedEx.exercise_id}`} disabled />
                    </div>
                    
                    <div className="form-group">
                      <label>{t.name}</label>
                      <input type="text" value={selectedEx.exercise_name} disabled />
                    </div>
                    
                    <div className="form-group">
                      <label>{t.level}</label>
                      <input type="text" value={getLevelName(selectedEx.exercise_level_id)} disabled />
                    </div>
                    
                    <div className="form-group">
                      <label>{t.category}</label>
                      <input type="text" value={getCategoryName(selectedEx.exercise_category_id)} disabled />
                    </div>
                    
                    <div className="form-group">
                      <label>{t.formCenter}</label>
                      <input type="text" value={getCenterName(selectedEx.center_id)} disabled />
                    </div>
                    
                    <div className="form-group">
                      <label>{t.formStatus}</label>
                      <input type="text" value={selectedEx.status === 'Active' ? t.active : t.inactive} disabled />
                    </div>
                    
                    <div className="form-group form-group-full">
                      <label>{t.formTarget}</label>
                      <input type="text" value={selectedEx.exercise_target} disabled />
                    </div>
                    
                    <div className="form-group form-group-full">
                      <label>{t.formDesc}</label>
                      <textarea value={selectedEx.exercise_description} rows={3} disabled />
                    </div>
                    
                    {selectedEx.tutorial_url && (
                      <div className="form-group form-group-full">
                        <label>{t.formUrl}</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <input type="text" value={selectedEx.tutorial_url} disabled style={{ flex: 1 }} />
                          <a 
                            href={selectedEx.tutorial_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ 
                              padding: '10px 18px', 
                              textDecoration: 'none', 
                              borderRadius: '10px', 
                              border: 'none',
                              whiteSpace: 'nowrap',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              background: 'var(--primary)',
                              color: 'white',
                              transition: 'background 0.2s'
                            }}
                          >
                            Play YouTube ▶
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {/* Timestamps */}
                    <div className="form-group form-group-full" style={{ borderTop: '2px dashed #E2E8F0', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8' }}>
                      <div>{t.createdBy}: <span style={{ color: '#475569' }}>{selectedEx.created_by}</span></div>
                      <div>{t.createdAt}: <span style={{ color: '#475569' }}>{selectedEx.created_at}</span></div>
                      <div>{t.updatedAt}: <span style={{ color: '#475569' }}>{selectedEx.updated_at}</span></div>
                    </div>
                  </div>
                )}

                {(modalMode === 'create' || modalMode === 'edit') && (
                  <div className="modal-form modal-form-grid">
                    {modalMode === 'edit' && selectedEx && (
                      <div className="form-group">
                        <label>{t.id}</label>
                        <input type="text" value={`EX-${selectedEx.exercise_id}`} disabled />
                      </div>
                    )}

                    <div className="form-group" style={{ gridColumn: modalMode === 'edit' ? 'auto' : '1 / -1' }}>
                      <label>{t.formName}</label>
                      <input
                        type="text"
                        value={exName}
                        onChange={(e) => setExName(e.target.value)}
                        required
                        disabled={modalMode === 'edit'}
                        placeholder="..."
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.formLevel}</label>
                      <select 
                        value={exLevelId}
                        onChange={(e) => setExLevelId(Number(e.target.value))}
                        disabled={modalMode === 'edit'}
                      >
                        {mockLevels.map(lvl => (
                          <option key={lvl.id} value={lvl.id}>{lang === 'vi' ? lvl.nameVi : lvl.nameEn}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>{t.formCategory}</label>
                      <select 
                        value={exCatId}
                        onChange={(e) => setExCatId(Number(e.target.value))}
                        disabled={modalMode === 'edit'}
                      >
                        {mockCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>{lang === 'vi' ? cat.nameVi : cat.nameEn}</option>
                        ))}
                      </select>
                    </div>

                    {modalMode === 'create' && (
                      <>
                        <div className="form-group">
                          <label>{t.formCenter}</label>
                          <select 
                            value={exCenterId}
                            onChange={(e) => setExCenterId(Number(e.target.value))}
                          >
                            {mockCenters.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group">
                          <label>{t.formStatus}</label>
                          <select 
                            value={exStatus}
                            onChange={(e) => setExStatus(e.target.value as 'Active' | 'Inactive')}
                          >
                            <option value="Active">{t.active}</option>
                            <option value="Inactive">{t.inactive}</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="form-group form-group-full">
                      <label>{t.formTarget}</label>
                      <input
                        type="text"
                        value={exTarget}
                        onChange={(e) => setExTarget(e.target.value)}
                        required
                        placeholder="..."
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label>{t.formDesc}</label>
                      <textarea
                        value={exDesc}
                        onChange={(e) => setExDesc(e.target.value)}
                        required
                        placeholder="..."
                        rows={3}
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label>{t.formUrl}</label>
                      <input
                        type="url"
                        value={exUrl}
                        onChange={(e) => setExUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        spellCheck="false"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  {modalMode === 'detail' ? (lang === 'vi' ? 'Đóng' : 'Close') : t.cancel}
                </button>

                {modalMode !== 'detail' && (
                  <button 
                    type="submit" 
                    className={`btn-primary ${modalMode === 'delete' ? 'btn-danger' : ''}`}
                  >
                    {modalMode === 'delete' 
                      ? t.confirmDelete 
                      : modalMode === 'create' 
                        ? (lang === 'vi' ? 'Tạo mới' : 'Create') 
                        : t.save}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisesTab;
