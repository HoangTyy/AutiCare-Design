import React, { useState } from 'react';
import type { Center } from './CenterDetailView';

interface CentersTabProps {
  lang: 'vi' | 'en';
  centers: Center[];
  onManageDetail: (center: Center) => void;
  onUpdateCenters: (newCenters: Center[]) => void;
}

const translations = {
  vi: {
    title: "Quản lý trung tâm",
    searchPlaceholder: "Tìm kiếm trung tâm...",
    addNew: "Thêm trung tâm mới",
    id: "ID",
    name: "Tên Trung tâm",
    date: "Ngày tạo",
    director: "Giám đốc trung tâm",
    status: "Trạng thái",
    actions: "Thao tác",
    active: "Hoạt động",
    inactive: "Tạm ngưng",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm mới trung tâm",
    editTitle: "Chỉnh sửa trung tâm",
    deleteTitle: "Xác nhận xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa trung tâm",
    deleteSub: "Hành động này không thể hoàn tác.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    confirmDelete: "Xác nhận xóa",
    formName: "Tên Trung tâm",
    formAddress: "Địa chỉ",
    formPhone: "Số điện thoại",
    formEmail: "Email",
    formDirector: "Chỉ định Giám đốc",
    formStatus: "Trạng thái",
    operationSuccess: "Thao tác thành công!",
    btnDetails: "Chi tiết"
  },
  en: {
    title: "Manage center",
    searchPlaceholder: "Search centers...",
    addNew: "Add New Center",
    id: "ID",
    name: "Center Name",
    date: "Created At",
    director: "Center Director",
    status: "Status",
    actions: "Actions",
    active: "Active",
    inactive: "Inactive",
    noResults: "No matching results found",
    createTitle: "Create New Center",
    editTitle: "Edit Center Info",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete center",
    deleteSub: "This action cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Confirm Delete",
    formName: "Center Name",
    formAddress: "Address",
    formPhone: "Phone Number",
    formEmail: "Email",
    formDirector: "Assign Center Director",
    formStatus: "Status",
    operationSuccess: "Operation Successful!",
    btnDetails: "Details"
  }
};

const CentersTab: React.FC<CentersTabProps> = ({
  lang,
  centers,
  onManageDetail,
  onUpdateCenters
}) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDirector, setFormDirector] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');

  const openModal = (mode: 'create' | 'edit' | 'delete', center: Center | null = null) => {
    setModalMode(mode);
    setSelectedCenter(center);
    if (center) {
      setFormName(center.name);
      setFormAddress(center.address || '');
      setFormPhone(center.phone_number || '');
      setFormEmail(center.email || '');
      setFormDirector('');
      setFormStatus(center.status);
    } else {
      setFormName('');
      setFormAddress('');
      setFormPhone('');
      setFormEmail('');
      setFormDirector('');
      setFormStatus('Active');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCenter(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const currentDate = new Date().toISOString().split('T')[0];
      const newCenter: Center = {
        id: `AC-00${centers.length + 1}`,
        name: formName,
        address: formAddress,
        phone_number: formPhone,
        email: formEmail,
        date: currentDate,
        status: formStatus,
        levels: [],
        categories: [],
        roles: [
          { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true },
          { id: 'R-DOC', nameVi: 'Bác sĩ chuyên khoa', nameEn: 'Clinical Doctor', permissions: ['view_analytics', 'manage_exercises', 'manage_levels'], status: 'Active', priority: 2, isDefault: true },
          { id: 'R-TCH', nameVi: 'Giáo viên can thiệp', nameEn: 'Intervention Teacher', permissions: ['manage_exercises', 'view_analytics'], status: 'Active', priority: 3, isDefault: true },
        ],
        staffs: formDirector.trim() ? [
          { id: `S-001`, name: formDirector, roleId: 'R-DIR', email: formEmail, phone: formPhone, joinedDate: currentDate, status: 'Active' }
        ] : []
      };
      onUpdateCenters([...centers, newCenter]);
    } else if (modalMode === 'edit' && selectedCenter) {
      const updated = centers.map(c => c.id === selectedCenter.id ? { ...c, name: formName, address: formAddress, phone_number: formPhone, email: formEmail, status: formStatus } : c);
      onUpdateCenters(updated);
    }
    alert(t.operationSuccess);
    closeModal();
  };

  const handleDelete = () => {
    if (selectedCenter) {
      onUpdateCenters(centers.filter(c => c.id !== selectedCenter.id));
    }
    alert(t.operationSuccess);
    closeModal();
  };

  const filteredCenters = centers.filter(center => {
    const term = searchTerm.toLowerCase();
    return (
      center.name.toLowerCase().includes(term) ||
      center.id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-content-area" style={{ animation: 'fadeIn 0.3s ease-out' }}>
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
              <th style={{ width: '150px' }}>{t.id}</th>
              <th>{t.name}</th>
              <th>{t.director}</th>
              <th style={{ textAlign: 'right', width: '220px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
                <tr key={center.id}>
                  <td className="id-col">{center.id}</td>
                  <td className="name-col">{center.name}</td>
                  <td>
                    {center.staffs?.find(s => s.roleId === 'R-DIR')?.name || (lang === 'vi' ? 'Chưa phân công' : 'Unassigned')}
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        className="edit-btn-v2"
                        title={t.btnDetails}
                        onClick={() => onManageDetail(center)}
                        style={{ color: '#0EA5E9' }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
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
                      {t.deleteConfirm} "{selectedCenter?.name}"?
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
                  <div className="modal-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
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
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>{t.formAddress}</label>
                      <input
                        type="text"
                        value={formAddress}
                        onChange={(e) => setFormAddress(e.target.value)}
                        placeholder="..."
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formPhone}</label>
                      <input
                        type="text"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="..."
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formEmail}</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="..."
                        spellCheck="false"
                      />
                    </div>
                    {modalMode === 'create' && (
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>{t.formDirector}</label>
                        <input
                          type="text"
                          value={formDirector}
                          onChange={(e) => setFormDirector(e.target.value)}
                          placeholder="..."
                          spellCheck="false"
                        />
                      </div>
                    )}
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

export default CentersTab;
