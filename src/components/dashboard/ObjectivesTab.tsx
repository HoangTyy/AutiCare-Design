import React, { useState } from 'react';

interface Objective {
  id: string;
  nameVi: string;
  nameEn: string;
  targetDate: string;
  status: 'Completed' | 'Processing';
}

interface ObjectivesTabProps {
  lang: 'vi' | 'en';
}
interface PlanPhase{
  id: string;
  name: string,
  start_date: string,
  end_date: string,
  status: 'Completed' | 'Processing',
  create_date: string,
  updated_date: string
}
const translations = {
  vi: {
    title: "Chi tiết giai đoạn",
    searchPlaceholder: "Tìm kiếm mục tiêu...",
    addNew: "Thêm mục tiêu",
    id: "ID",
    name: "Tên Mục tiêu",
    category: "Danh mục",
    targetDate: "Ngày hoàn thành",
    status: "Trạng thái",
    actions: "Thao tác",
    active: "Hoàn thành",
    inactive: "Chưa hoàn thành",
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
    formStatus: "Trạng thái",
    operationSuccess: "Thao tác thành công!"
  },
  en: {
    title: "Plan phase details",
    searchPlaceholder: "Search objectives...",
    addNew: "Add Objective",
    id: "ID",
    name: "Objective Name",
    category: "Category",
    targetDate: "Target date",
    status: "Status",
    actions: "Actions",
    active: "Completed",
    inactive: "Processing",
    noResults: "No matching results found",
    createTitle: "Create Objective",
    editTitle: "Edit Objective",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete objective",
    deleteSub: "This action cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Confirm Delete",
    formNameVi: "Objective Name (Vietnamese)",
    formNameEn: "Objective Name (English)",
    formStatus: "Status",
    operationSuccess: "Operation Successful!"
  }
};

interface CreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
  t: any;
}

const handleMock = (e: any) =>{
  return e;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, closeModal, handleSave, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in">
        <div className="modal-header">
          <h3>{t.createTitle}</h3>
          <button className="close-modal" onClick={closeModal}>×</button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-group">
                <label>Objective name</label>
                <input type="text" name="nameEn" required spellCheck="false" />
              </div>
              <div className="form-group">
                <label>Target date</label>
                <input type="text" name="targetDate" required spellCheck="false" />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn-primary">{t.save}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedObj: any;
  t: any;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, closeModal, handleSave, selectedObj, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in">
        <div className="modal-header">
          <h3>{t.editTitle}</h3>
          <button className="close-modal" onClick={closeModal}>×</button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-group">
                <label>Objective name</label>
                <input 
                  type="text" 
                  name="nameEn"
                  defaultValue={selectedObj?.nameEn || ''} 
                  required 
                  spellCheck="false" 
                />
              </div>
              <div className="form-group">
                <label>Target date</label>
                <input 
                  type="text" 
                  name="targetDate"
                  defaultValue={selectedObj?.targetDate || ''} 
                  required 
                  spellCheck="false" 
                />
              </div>
              <div className="form-group">
                <label>{t.formStatus}</label>
                <select name="status" defaultValue={selectedObj?.status || 'Active'}>
                  <option value="Active">{t.active}</option>
                  <option value="Inactive">{t.inactive}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn-primary">{t.save}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleDelete: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedObj: any;
  lang: string;
  t: any;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, handleDelete, selectedObj, lang, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in">
        <div className="modal-header">
          <h3>{t.deleteTitle}</h3>
          <button className="close-modal" onClick={closeModal}>×</button>
        </div>

        <form onSubmit={handleDelete}>
          <div className="modal-body">
            <div className="delete-confirm">
              <div className="warning-icon">⚠️</div>
              <p>
                {t.deleteConfirm} "{lang === 'vi' ? selectedObj?.nameVi : selectedObj?.nameEn}"?
              </p>
              <p className="sub-text">{t.deleteSub}</p>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn-primary btn-danger">{t.confirmDelete}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ReadModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedObj: any;
  t: any;
}

export const ReadModal: React.FC<ReadModalProps> = ({ isOpen, closeModal, selectedObj, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in">
        <div className="modal-header">
          <h3>{t.viewTitle || 'Objective Details'}</h3>
          <button className="close-modal" onClick={closeModal}>×</button>
        </div>

        <div className="modal-body">
          <div className="modal-form">
            <div className="form-group">
              <label>Objective name (VI)</label>
              <p className="view-detail-text">{selectedObj?.nameVi || '---'}</p>
            </div>
            <div className="form-group">
              <label>Objective name (EN)</label>
              <p className="view-detail-text">{selectedObj?.nameEn || '---'}</p>
            </div>
            <div className="form-group">
              <label>Target date</label>
              <p className="view-detail-text">{selectedObj?.targetDate || '---'}</p>
            </div>
            <div className="form-group">
              <label>{t.formStatus}</label>
              <span className={`status-badge ${selectedObj?.status?.toLowerCase()}`}>
                {selectedObj?.status === 'Active' ? t.active : t.inactive}
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={closeModal}>{t.close || 'Close'}</button>
        </div>
      </div>
    </div>
  );
};

const ObjectivesTab: React.FC<ObjectivesTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete' | 'read'>('create');
  const [selectedObj, setSelectedObj] = useState<Objective | null>(null);

  const [objectives] = useState<Objective[]>([
    { id: 'OBJ-001', nameVi: 'Kỹ năng Giao tiếp mắt', nameEn: 'Eye Contact Skills', targetDate: '2026-05-10', status: 'Completed' },
    { id: 'OBJ-002', nameVi: 'Phát âm nguyên âm đơn', nameEn: 'Single Vowel Pronunciation', targetDate: '2026-05-12', status: 'Completed' },
    { id: 'OBJ-003', nameVi: 'Nhận biết các màu sắc cơ bản', nameEn: 'Basic Color Recognition', targetDate: '2026-05-15', status: 'Processing' },
  ]);
  // Tách phần tử thứ nhất thành planPhase
  const [planPhase] = useState<PlanPhase>({
  id: 'PP-008',
  name: 'Phase 1',
  start_date: '2026-01-01',
  end_date: '2026-06-01',
  create_date: '2026-01-01',
  updated_date: '2026-01-01',
  status: 'Processing'
});
  const openModal = (mode: 'create' | 'edit' | 'delete' | 'read', obj: Objective | null = null) => {
    setModalMode(mode);
    setSelectedObj(obj);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedObj(null);
  };

  const filteredObjectives = objectives.filter(obj => {
    const term = searchTerm.toLowerCase();
    const name = lang === 'vi' ? obj.nameVi : obj.nameEn;
    return (
      name.toLowerCase().includes(term) ||
      obj.id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-content-area">
     
      <div className="table-header">
       <h2 className="table-title">
        {t.title} 
      </h2>
      <div className="phase-details" style={{ marginTop: '10px', lineHeight: '1.6', color:'black' }}>
        <p><strong>ID:</strong> {planPhase.id}</p>
        <p><strong>Name:</strong> {planPhase.name}</p>
        <p><strong>Duration:</strong> {planPhase.start_date} <strong>to</strong> {planPhase.end_date}</p>
        <p><strong>Status:</strong> {planPhase.status}</p>
      </div>
      
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
              <th>{t.targetDate}</th>
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
                  <td>{obj.targetDate}</td>
                  <td>
                    <span className={`badge ${obj.status.toLowerCase()}`}>
                      {obj.status === 'Completed' ? t.active : t.inactive}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end', display: 'flex', gap: '5px' }}>
                      {/* Nút Xem chi tiết (Mới thêm) */}
                      <button 
                        className="view-btn-v2" 
                        title={t.title || "Xem chi tiết"} 
                        onClick={() => openModal('read', obj)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                      </button>

                      {/* Nút Chỉnh sửa */}
                      <button 
                        className="edit-btn-v2" 
                        title={t.editTitle} 
                        onClick={() => openModal('edit', obj)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>

                      {/* Nút Xóa */}
                      <button 
                        className="delete-btn-v2" 
                        title={t.deleteTitle} 
                        onClick={() => openModal('delete', obj)}
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

    <CreateModal 
      isOpen={isModalOpen && modalMode === 'create'} 
      closeModal={closeModal} 
      handleSave={handleMock(selectedObj)} 
      t={t} 
    />

    <EditModal 
      isOpen={isModalOpen && modalMode === 'edit'} 
      closeModal={closeModal} 
      handleSave={handleMock(selectedObj)} 
      selectedObj={selectedObj} 
      t={t} 
    />

    <DeleteModal 
      isOpen={isModalOpen && modalMode === 'delete'} 
      closeModal={closeModal} 
      handleDelete={handleMock(selectedObj)} 
      selectedObj={selectedObj} 
      lang={lang} 
      t={t} 
    />

    <ReadModal 
      isOpen={isModalOpen && modalMode === 'read'} 
      closeModal={closeModal} 
      selectedObj={selectedObj} 
      t={t}
    />
</div>
);
}
export default ObjectivesTab;
