import React, { useState } from 'react';

interface Staff {
  staffId: string;
  fullName: string;
  qualifications: string;
  staffType: string;
  experienceYear: number;
  inviteCode: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'Active' | 'Inactive' | 'Banned';
  username: string;
  email: string;
  phoneNumber: string;
  centerName: string;
  isVerified: boolean;
}

interface StaffsTabProps {
  lang: 'vi' | 'en';
}

type ModalMode = 'create' | 'edit' | 'delete' | 'view' | 'ban';

const translations = {
  vi: {
    title: 'Quản lý Nhân sự',
    searchPlaceholder: 'Tìm kiếm nhân sự...',
    addNew: 'Thêm nhân sự',

    staffId: 'Staff ID',
    fullName: 'Full Name',
    qualifications: 'Qualifications',
    staffType: 'Staff Type',
    experienceYear: 'Experience Year',
    inviteCode: 'Invite Code',
    description: 'Description',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    status: 'Status',
    username: 'Username',
    email: 'Email',
    phoneNumber: 'Phone Number',
    centerName: 'Tên trung tâm',
    isVerified: 'Is Verified?',

    actions: 'Thao tác',
    active: 'Hoạt động',
    inactive: 'Tạm ngưng',
    banned: 'Đã khóa',
    noResults: 'Không tìm thấy kết quả phù hợp',

    createTitle: 'Thêm mới nhân sự',
    editTitle: 'Cập nhật nhân sự',
    deleteTitle: 'Xác nhận xóa',
    viewTitle: 'Chi tiết nhân sự',
    banTitle: 'Khóa nhân sự',

    deleteConfirm: 'Bạn có chắc chắn muốn xóa nhân sự',
    banConfirm: 'Bạn có chắc chắn muốn khóa nhân sự',
    deleteSub: 'Hành động này không thể hoàn tác.',
    banSub: 'Nhân sự sẽ không thể đăng nhập sau khi bị khóa.',

    cancel: 'Hủy bỏ',
    close: 'Đóng',
    save: 'Lưu thay đổi',
    create: 'Tạo mới',
    confirmDelete: 'Xác nhận xóa',
    confirmBan: 'Xác nhận khóa',
    operationSuccess: 'Thao tác thành công!'
  },
  en: {
    title: 'Manage Staffs',
    searchPlaceholder: 'Search staff members...',
    addNew: 'Add Staff',

    staffId: 'Staff ID',
    fullName: 'Full Name',
    qualifications: 'Qualifications',
    staffType: 'Staff Type',
    experienceYear: 'Experience Year',
    inviteCode: 'Invite Code',
    description: 'Description',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    status: 'Status',
    username: 'Username',
    email: 'Email',
    phoneNumber: 'Phone Number',
    centerName: 'Center Name',
    isVerified: 'Is Verified?',

    actions: 'Actions',
    active: 'Active',
    inactive: 'Inactive',
    banned: 'Banned',
    noResults: 'No matching results found',

    createTitle: 'Create New Staff',
    editTitle: 'Update Staff',
    deleteTitle: 'Confirm Delete',
    viewTitle: 'Staff Details',
    banTitle: 'Ban Staff',

    deleteConfirm: 'Are you sure you want to delete staff member',
    banConfirm: 'Are you sure you want to ban staff member',
    deleteSub: 'This action cannot be undone.',
    banSub: 'This staff member will not be able to log in after being banned.',

    cancel: 'Cancel',
    close: 'Close',
    save: 'Save Changes',
    create: 'Create',
    confirmDelete: 'Confirm Delete',
    confirmBan: 'Confirm Ban',
    operationSuccess: 'Operation Successful!'
  }
};

const StaffsTab: React.FC<StaffsTabProps> = ({ lang }) => {
  const t = translations[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const [staffs] = useState<Staff[]>([
    {
      staffId: 'ST001',
      fullName: 'Nguyen Van A',
      qualifications: 'Master of Clinical Psychology',
      staffType: 'Doctor',
      experienceYear: 8,
      inviteCode: 'INV-ST-001',
      description: 'Responsible for psychological assessment and intervention counseling.',
      createdAt: '2026-01-10',
      updatedAt: '2026-05-01',
      status: 'Active',
      username: 'nguyenvana',
      email: 'anguyenvan@auticare.vn',
      phoneNumber: '0901234567',
      centerName: 'AutiCare Central Saigon',
      isVerified: true
    },
    {
      staffId: 'ST002',
      fullName: 'Le Thi B',
      qualifications: 'Bachelor of Special Education',
      staffType: 'Teacher',
      experienceYear: 5,
      inviteCode: 'INV-ST-002',
      description: 'Special education intervention teacher.',
      createdAt: '2026-02-15',
      updatedAt: '2026-05-03',
      status: 'Active',
      username: 'lethib',
      email: 'blethi@auticare.vn',
      phoneNumber: '0907654321',
      centerName: 'AutiCare Central Saigon',
      isVerified: true
    },
    {
      staffId: 'ST003',
      fullName: 'Pham Van C',
      qualifications: 'Early Intervention Certificate',
      staffType: 'Teacher',
      experienceYear: 4,
      inviteCode: 'INV-ST-003',
      description: 'Early intervention specialist for autistic children.',
      createdAt: '2026-03-20',
      updatedAt: '2026-05-05',
      status: 'Banned',
      username: 'phamvanc',
      email: 'phamvanc.saigon@auticare.vn',
      phoneNumber: '0903334445',
      centerName: 'AutiCare Hanoi North',
      isVerified: false
    }
  ]);

  const openModal = (mode: ModalMode, staff: Staff | null = null) => {
    setModalMode(mode);
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.operationSuccess);
    closeModal();
  };

  const getStatusLabel = (status?: Staff['status']) => {
    if (status === 'Active') return t.active;
    if (status === 'Banned') return t.banned;
    return t.inactive;
  };

  const filteredStaffs = staffs.filter((staff) => {
    const term = searchTerm.toLowerCase();

    return (
      staff.staffId.toLowerCase().includes(term) ||
      staff.fullName.toLowerCase().includes(term) ||
      staff.staffType.toLowerCase().includes(term) ||
      staff.email.toLowerCase().includes(term) ||
      staff.phoneNumber.toLowerCase().includes(term) ||
      staff.centerName.toLowerCase().includes(term) ||
      staff.username.toLowerCase().includes(term)
    );
  });

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

        @media (max-width: 720px) {
          .modal-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
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
              <th style={{ width: '100px' }}>{t.staffId}</th>
              <th>{t.fullName}</th>
              <th>{t.staffType}</th>
              <th>{t.createdAt}</th>
              <th>{t.updatedAt}</th>
              <th>{t.status}</th>
              <th style={{ textAlign: 'right', width: '150px' }}>{t.actions}</th>
            </tr>
          </thead>

          <tbody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff) => (
                <tr key={staff.staffId}>
                  <td className="id-col">{staff.staffId}</td>
                  <td className="name-col">{staff.fullName}</td>
                  <td>{staff.staffType}</td>
                  <td>{staff.createdAt}</td>
                  <td>{staff.updatedAt}</td>
                  <td>
                    <span className={`badge ${staff.status.toLowerCase()}`}>
                      {getStatusLabel(staff.status)}
                    </span>
                  </td>
                  <td>
                    <div
                      className="action-btns"
                      style={{ justifyContent: 'flex-end', display: 'flex', gap: '5px' }}
                    >
                      <button
                        className="view-btn-v2"
                        title={t.viewTitle}
                        onClick={() => openModal('view', staff)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      </button>

                      <button
                        className="edit-btn-v2"
                        title={t.editTitle}
                        onClick={() => openModal('edit', staff)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>

                      <button
                        className="ban-btn-v2"
                        title={t.banTitle}
                        onClick={() => openModal('ban', staff)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M17 8V7a5 5 0 0 0-10 0v1H5v13h14V8h-2zm-8 0V7a3 3 0 0 1 6 0v1H9z" />
                        </svg>
                      </button>

                      <button
                        className="delete-btn-v2"
                        title={t.deleteTitle}
                        onClick={() => openModal('delete', staff)}
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
                <td colSpan={10} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
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
                {modalMode === 'view' && t.viewTitle}
                {modalMode === 'ban' && t.banTitle}
              </h3>

              <button className="close-modal" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                {modalMode === 'delete' && (
                  <div className="delete-confirm">
                    <div className="warning-icon">⚠️</div>
                    <p>
                      {t.deleteConfirm} "{selectedStaff?.fullName}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                )}

                {modalMode === 'ban' && (
                  <div className="delete-confirm">
                    <div className="warning-icon">🔒</div>
                    <p>
                      {t.banConfirm} "{selectedStaff?.fullName}"?
                    </p>
                    <p className="sub-text">{t.banSub}</p>
                  </div>
                )}

                {modalMode === 'view' && selectedStaff && (
                 
                  <div className="modal-form modal-form-grid">
                    
                      <div className="form-group">
                        <label>{t.staffId}</label>
                        <input type="text" defaultValue={selectedStaff?.staffId || ''} disabled />
                      </div>
                    

                    <div className="form-group">
                      <label>{t.fullName}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.fullName || ''}
                        required
                        spellCheck="false" disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.qualifications}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.qualifications || ''}
                        required
                        spellCheck="false" disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.staffType}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.staffType || ''}
                        required
                        spellCheck="false" disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.experienceYear}</label>
                      <input
                        type="number"
                        min="0"
                        defaultValue={selectedStaff?.experienceYear ?? 0}
                        required disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.inviteCode}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.inviteCode || 'Auto generated'}
                        disabled
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label>{t.description}</label>
                      <textarea
                        defaultValue={selectedStaff?.description || ''}
                        rows={3}
                        spellCheck="false" disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.username}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.username || ''}
                        required
                        spellCheck="false" disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.email}</label>
                      <input
                        type="email"
                        defaultValue={selectedStaff?.email || ''}
                        required
                        spellCheck="false" disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.phoneNumber}</label>
                      <input
                        type="tel"
                        defaultValue={selectedStaff?.phoneNumber || ''}
                        required
                        spellCheck="false" disabled
                      />
                    </div>
                  </div>
                )}

                {(modalMode === 'create' || modalMode === 'edit') && (
                  <div className="modal-form modal-form-grid">
                    {modalMode === 'edit' && (
                      <div className="form-group">
                        <label>{t.staffId}</label>
                        <input type="text" defaultValue={selectedStaff?.staffId || ''} disabled />
                      </div>
                    )}

                    <div className="form-group">
                      <label>{t.fullName}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.fullName || ''}
                        required
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.qualifications}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.qualifications || ''}
                        required
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.staffType}</label>
                      <select defaultValue={selectedStaff?.staffType }>
                          <option value="Doctor">Doctor</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Admin">Administrator</option>
                        </select>
                    </div>

                    <div className="form-group">
                      <label>{t.experienceYear}</label>
                      <input
                        type="number"
                        min="0"
                        defaultValue={selectedStaff?.experienceYear ?? 0}
                        required
                      />
                    </div>

                    {(modalMode!='create')&&(
                      <div className="form-group">
                      <label>{t.inviteCode}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.inviteCode || 'Auto generated'}
                        disabled
                      />
                    </div>
                    )}

                    <div className="form-group form-group-full">
                      <label>{t.description}</label>
                      <textarea
                        defaultValue={selectedStaff?.description || ''}
                        rows={3}
                        spellCheck="false"
                      />
                    </div>

                    {modalMode === 'edit' && (
                      <div className="form-group">
                        <label>{t.status}</label>
                        <select defaultValue={selectedStaff?.status || 'Inactive'} disabled>
                          <option value="Active">{t.active}</option>
                          <option value="Inactive">{t.inactive}</option>
                          <option value="Banned">{t.banned}</option>
                        </select>
                      </div>
                    )}

                    <div className="form-group">
                      <label>{t.username}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.username || ''}
                        required
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.email}</label>
                      <input
                        type="email"
                        defaultValue={selectedStaff?.email || ''}
                        required
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.phoneNumber}</label>
                      <input
                        type="tel"
                        defaultValue={selectedStaff?.phoneNumber || ''}
                        required
                        spellCheck="false"
                      />
                    </div>

                    {modalMode === 'edit' && (
                      <div className="form-group">
                        <label>{t.isVerified}</label>
                        <input
                          type="checkbox"
                          checked={selectedStaff?.isVerified || false}
                          disabled
                          readOnly
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  {modalMode === 'view' ? t.close : t.cancel}
                </button>

                {modalMode !== 'view' && (
                  <button
                    type="submit"
                    className={`btn-primary ${
                      modalMode === 'delete' || modalMode === 'ban' ? 'btn-danger' : ''
                    }`}
                  >
                    {modalMode === 'delete'
                      ? t.confirmDelete
                      : modalMode === 'ban'
                        ? t.confirmBan
                        : modalMode === 'create'
                          ? t.create
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

export default StaffsTab;
