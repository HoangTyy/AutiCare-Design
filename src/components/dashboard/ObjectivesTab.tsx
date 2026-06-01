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

interface PlanPhase {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: 'Completed' | 'Processing';
  create_date: string;
  updated_date: string;
}

const translations = {
  vi: {
    title: "Mục Tiêu Giai Đoạn",
    searchPlaceholder: "Tìm kiếm mục tiêu...",
    addNew: "Thêm mục tiêu mới",
    id: "Mã số",
    name: "Tên Mục tiêu",
    category: "Danh mục",
    targetDate: "Ngày hoàn thành",
    status: "Trạng thái",
    actions: "Thao tác",
    active: "Hoàn thành",
    inactive: "Đang xử lý",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm Mới Mục Tiêu",
    editTitle: "Chỉnh Sửa Mục Tiêu",
    deleteTitle: "Xác Nhận Xóa",
    viewTitle: "Chi Tiết Mục Tiêu",
    deleteConfirm: "Bạn có chắc chắn muốn xóa mục tiêu",
    deleteSub: "Hành động này không thể hoàn tác.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    create: "Thêm mới",
    confirmDelete: "Xác nhận xóa",
    formNameVi: "Tên Mục tiêu (Tiếng Việt)",
    formNameEn: "Tên Mục tiêu (Tiếng Anh)",
    formStatus: "Trạng thái",
    formTargetDate: "Ngày hoàn thành",
    operationSuccess: "Thao tác thành công!",
    close: "Đóng cửa sổ",
    phaseInfo: "Thông tin giai đoạn",
    duration: "Thời hạn can thiệp",
  },
  en: {
    title: "Phase Objectives",
    searchPlaceholder: "Search objectives...",
    addNew: "Add New Objective",
    id: "ID",
    name: "Objective Name",
    category: "Category",
    targetDate: "Target Date",
    status: "Status",
    actions: "Actions",
    active: "Completed",
    inactive: "Processing",
    noResults: "No matching results found",
    createTitle: "Create Objective",
    editTitle: "Edit Objective",
    deleteTitle: "Confirm Delete",
    viewTitle: "Objective Details",
    deleteConfirm: "Are you sure you want to delete objective",
    deleteSub: "This action cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    create: "Create",
    confirmDelete: "Confirm Delete",
    formNameVi: "Objective Name (Vietnamese)",
    formNameEn: "Objective Name (English)",
    formStatus: "Status",
    formTargetDate: "Target Date",
    operationSuccess: "Operation Successful!",
    close: "Close Window",
    phaseInfo: "Phase Information",
    duration: "Duration Time",
  }
};

const handleMock = (e: any) => {
  return e;
};

interface CreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
  t: any;
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
            <div className="modal-form modal-form-grid">
              <div className="form-group">
                <label>{t.formNameVi}</label>
                <input type="text" name="nameVi" required spellCheck="false" />
              </div>
              <div className="form-group">
                <label>{t.formNameEn}</label>
                <input type="text" name="nameEn" required spellCheck="false" />
              </div>
              <div className="form-group form-group-full">
                <label>{t.formTargetDate}</label>
                <input type="date" name="targetDate" required />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn-primary">{t.create}</button>
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
            <div className="modal-form modal-form-grid">
              <div className="form-group">
                <label>{t.formNameVi}</label>
                <input 
                  type="text" 
                  name="nameVi"
                  defaultValue={selectedObj?.nameVi || ''} 
                  required 
                  spellCheck="false" 
                />
              </div>
              <div className="form-group">
                <label>{t.formNameEn}</label>
                <input 
                  type="text" 
                  name="nameEn"
                  defaultValue={selectedObj?.nameEn || ''} 
                  required 
                  spellCheck="false" 
                />
              </div>
              <div className="form-group">
                <label>{t.formTargetDate}</label>
                <input 
                  type="date" 
                  name="targetDate"
                  defaultValue={selectedObj?.targetDate || ''} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{t.formStatus}</label>
                <select name="status" defaultValue={selectedObj?.status || 'Processing'}>
                  <option value="Completed">{t.active}</option>
                  <option value="Processing">{t.inactive}</option>
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
        <div className="modal-header" style={{ background: 'linear-gradient(90deg, #FEF2F2 0%, #FFF5F5 100%)', borderBottom: '3px solid #1E293B' }}>
          <h3 style={{ color: '#DC2626' }}>{t.deleteTitle}</h3>
          <button className="close-modal" onClick={closeModal}>×</button>
        </div>

        <form onSubmit={handleDelete}>
          <div className="modal-body">
            <div className="delete-confirm">
              <div className="warning-icon" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>⚠️</div>
              <p style={{ textAlign: 'center', fontWeight: 800, color: '#1E293B', fontSize: '1.05rem' }}>
                {t.deleteConfirm} "{lang === 'vi' ? selectedObj?.nameVi : selectedObj?.nameEn}"?
              </p>
              <p className="sub-text" style={{ textAlign: 'center', color: '#64748B', fontSize: '0.85rem', marginTop: '0.5rem' }}>{t.deleteSub}</p>
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
          <h3>{t.viewTitle}</h3>
          <button className="close-modal" onClick={closeModal}>×</button>
        </div>

        <div className="modal-body">
          <div className="modal-form modal-form-grid">
            <div className="form-group">
              <label>{t.formNameVi}</label>
              <div className="static-field-block">{selectedObj?.nameVi || '---'}</div>
            </div>
            <div className="form-group">
              <label>{t.formNameEn}</label>
              <div className="static-field-block">{selectedObj?.nameEn || '---'}</div>
            </div>
            <div className="form-group">
              <label>{t.formTargetDate}</label>
              <div className="static-field-block">{selectedObj?.targetDate || '---'}</div>
            </div>
            <div className="form-group">
              <label>{t.formStatus}</label>
              <div style={{ marginTop: '6px' }}>
                <span className={`badge ${selectedObj?.status?.toLowerCase()}`} style={{ display: 'inline-flex !important' }}>
                  {selectedObj?.status === 'Completed' ? t.active : t.inactive}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={closeModal}>{t.close}</button>
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
    <div className="dashboard-content-area objectives-tab-container">
      <style>{`
        .objectives-tab-container {
          font-family: "Be Vietnam Pro", sans-serif;
        }

        /* Phase Info Bento Card Memphis */
        .phase-info-card {
          background: #FFFFFF !important;
          border: 3px solid #1E293B !important;
          box-shadow: 6px 6px 0px #1E293B !important;
          border-radius: 20px !important;
          padding: 1.5rem !important;
          margin-top: 1rem !important;
          margin-bottom: 2rem !important;
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 1.5rem !important;
          position: relative !important;
          overflow: hidden !important;
          transition: all 150ms cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        .phase-info-card:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 8px 8px 0px #1E293B !important;
        }

        .phase-info-item {
          display: flex !important;
          flex-direction: column !important;
          gap: 0.35rem !important;
          padding-right: 1.5rem !important;
          border-right: 2px dashed #E2E8F0 !important;
        }

        .phase-info-item:last-child {
          border-right: none !important;
          padding-right: 0 !important;
        }

        .phase-info-label {
          font-size: 0.72rem !important;
          font-weight: 800 !important;
          color: #64748B !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        .phase-info-value {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
          color: #1E293B !important;
          display: flex !important;
          align-items: center !important;
        }

        .phase-info-value .phase-id-badge {
          background: #F1F5F9 !important;
          border: 2px solid #1E293B !important;
          padding: 0.15rem 0.6rem !important;
          border-radius: 8px !important;
          font-size: 0.8rem !important;
          font-weight: 800 !important;
          box-shadow: 1.5px 1.5px 0px #1E293B !important;
        }

        /* Modal Grid Layout */
        .modal-form-grid {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 14px 18px !important;
        }

        .modal-form-grid .form-group-full {
          grid-column: 1 / -1 !important;
        }

        /* Static values for view detail mode */
        .static-field-block {
          background: #F8FAFC !important;
          border: 2px solid #E2E8F0 !important;
          border-radius: 12px !important;
          padding: 0.75rem 1rem !important;
          color: #1E293B !important;
          font-size: 0.95rem !important;
          font-weight: 700 !important;
          min-height: 44px !important;
          box-sizing: border-box !important;
          display: flex !important;
          align-items: center !important;
        }

        @media (max-width: 900px) {
          .phase-info-card {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .phase-info-item:nth-child(2) {
            border-right: none !important;
          }
        }

        @media (max-width: 600px) {
          .phase-info-card {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .phase-info-item {
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px dashed #E2E8F0 !important;
            padding-bottom: 0.75rem !important;
          }
          .phase-info-item:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>

      {/* HEADER CARD MEMPHIS */}
      <div className="table-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="table-title">{t.title}</h2>
      </div>

      {/* PHASE BENTO CARD DETAIL */}
      <div className="phase-info-card">
        <div className="phase-info-item">
          <span className="phase-info-label">🔑 {lang === 'vi' ? 'Mã Giai Đoạn' : 'Phase ID'}</span>
          <span className="phase-info-value">
            <span className="phase-id-badge">{planPhase.id}</span>
          </span>
        </div>
        <div className="phase-info-item">
          <span className="phase-info-label">📌 {lang === 'vi' ? 'Tên Giai Đoạn' : 'Phase Name'}</span>
          <span className="phase-info-value">{planPhase.name}</span>
        </div>
        <div className="phase-info-item">
          <span className="phase-info-label">📅 {t.duration}</span>
          <span className="phase-info-value" style={{ fontSize: '0.85rem' }}>
            {planPhase.start_date} ➔ {planPhase.end_date}
          </span>
        </div>
        <div className="phase-info-item">
          <span className="phase-info-label">⚡ {t.formStatus}</span>
          <span className="phase-info-value">
            <span className={`badge ${planPhase.status.toLowerCase()}`}>
              {planPhase.status === 'Completed' ? t.active : t.inactive}
            </span>
          </span>
        </div>
      </div>

      {/* TOOLBAR ACTIONS */}
      <div className="table-header" style={{ border: 'none', background: 'transparent', padding: 0, marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#1E293B', margin: 0 }}>
          🎯 {lang === 'vi' ? 'Danh sách mục tiêu' : 'Objectives list'}
        </h3>
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

      {/* DATA TABLE */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '120px' }}>{t.id}</th>
              <th>{t.name}</th>
              <th>{t.targetDate}</th>
              <th>{t.status}</th>
              <th style={{ textAlign: 'right', width: '150px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredObjectives.length > 0 ? (
              filteredObjectives.map((obj) => (
                <tr key={obj.id} className="floating-row">
                  <td className="id-col">{obj.id}</td>
                  <td className="name-col" style={{ fontWeight: 700 }}>
                    {lang === 'vi' ? obj.nameVi : obj.nameEn}
                  </td>
                  <td>{obj.targetDate}</td>
                  <td>
                    <span className={`badge ${obj.status.toLowerCase()}`}>
                      {obj.status === 'Completed' ? t.active : t.inactive}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end', display: 'flex', gap: '6px' }}>
                      {/* Nút Xem chi tiết */}
                      <button 
                        className="view-btn-v2" 
                        title={t.viewTitle} 
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
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
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
};

export default ObjectivesTab;
