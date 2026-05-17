import React, { useState } from 'react';

interface Staff {
  id: string;
  name: string;
  roleVi: string;
  roleEn: string;
  date: string;
  status: 'Active' | 'Inactive';
}

interface StaffsTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Quản lý Nhân sự",
    searchPlaceholder: "Tìm kiếm nhân viên...",
    addNew: "Thêm nhân viên",
    id: "ID",
    name: "Họ và Tên",
    role: "Chức vụ",
    date: "Ngày tham gia",
    status: "Trạng thái",
    actions: "Thao tác",
    active: "Hoạt động",
    inactive: "Tạm ngưng",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm mới nhân sự",
    editTitle: "Chỉnh sửa nhân sự",
    deleteTitle: "Xác nhận xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa nhân sự",
    deleteSub: "Hành động này không thể hoàn tác.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    confirmDelete: "Xác nhận xóa",
    formName: "Họ và Tên",
    formRole: "Chức vụ",
    formStatus: "Trạng thái",
    operationSuccess: "Thao tác thành công!"
  },
  en: {
    title: "Manage Staff Members",
    searchPlaceholder: "Search staff members...",
    addNew: "Add Staff Member",
    id: "ID",
    name: "Full Name",
    role: "Role",
    date: "Joined Date",
    status: "Status",
    actions: "Actions",
    active: "Active",
    inactive: "Inactive",
    noResults: "No matching results found",
    createTitle: "Create New Staff",
    editTitle: "Edit Staff Member",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete staff member",
    deleteSub: "This action cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Confirm Delete",
    formName: "Full Name",
    formRole: "Role",
    formStatus: "Status",
    operationSuccess: "Operation Successful!"
  }
};

const StaffsTab: React.FC<StaffsTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const [staffs] = useState<Staff[]>([
    { id: 'ST-001', name: 'Dr. Nguyễn Văn A', roleVi: 'Chuyên gia tâm lý', roleEn: 'Psychologist', date: '2026-01-10', status: 'Active' },
    { id: 'ST-002', name: 'Cô Lê Thị B', roleVi: 'Giáo viên mầm non đặc biệt', roleEn: 'Special Ed Teacher', date: '2026-02-15', status: 'Active' },
    { id: 'ST-003', name: 'Thầy Phạm Văn C', roleVi: 'Chuyên gia can thiệp sớm', roleEn: 'Early Interventionist', date: '2026-03-20', status: 'Active' },
  ]);

  const openModal = (mode: 'create' | 'edit' | 'delete', staff: Staff | null = null) => {
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

  const filteredStaffs = staffs.filter(staff => {
    const term = searchTerm.toLowerCase();
    return (
      staff.name.toLowerCase().includes(term) ||
      staff.id.toLowerCase().includes(term) ||
      (lang === 'vi' ? staff.roleVi : staff.roleEn).toLowerCase().includes(term)
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
              <th>{t.role}</th>
              <th>{t.date}</th>
              <th>{t.status}</th>
              <th style={{ textAlign: 'right', width: '100px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff) => (
                <tr key={staff.id}>
                  <td className="id-col">{staff.id}</td>
                  <td className="name-col">{staff.name}</td>
                  <td>{lang === 'vi' ? staff.roleVi : staff.roleEn}</td>
                  <td>{staff.date}</td>
                  <td>
                    <span className={`badge ${staff.status.toLowerCase()}`}>
                      {staff.status === 'Active' ? t.active : t.inactive}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button className="edit-btn-v2" title={t.editTitle} onClick={() => openModal('edit', staff)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                      <button className="delete-btn-v2" title={t.deleteTitle} onClick={() => openModal('delete', staff)}>
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
                      {t.deleteConfirm} "{selectedStaff?.name}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                ) : (
                  <div className="modal-form">
                    <div className="form-group">
                      <label>{t.formName}</label>
                      <input
                        type="text"
                        defaultValue={selectedStaff?.name || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formRole}</label>
                      <input
                        type="text"
                        defaultValue={lang === 'vi' ? selectedStaff?.roleVi : selectedStaff?.roleEn || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formStatus}</label>
                      <select defaultValue={selectedStaff?.status || 'Active'}>
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

export default StaffsTab;
