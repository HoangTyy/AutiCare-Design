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
    title: "Quản lý Trung tâm Early Intervention",
    searchPlaceholder: "Tìm kiếm trung tâm...",
    addNew: "Thêm trung tâm mới",
    id: "ID",
    name: "Tên Trung tâm",
    date: "Ngày tạo",
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
    formStatus: "Trạng thái",
    operationSuccess: "Thao tác thành công!",
    btnDetails: "Chi tiết"
  },
  en: {
    title: "Manage Early Intervention Centers",
    searchPlaceholder: "Search centers...",
    addNew: "Add New Center",
    id: "ID",
    name: "Center Name",
    date: "Created At",
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
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');

  const openModal = (mode: 'create' | 'edit' | 'delete', center: Center | null = null) => {
    setModalMode(mode);
    setSelectedCenter(center);
    if (center) {
      setFormName(center.name);
      setFormStatus(center.status);
    } else {
      setFormName('');
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
      const newCenter: Center = {
        id: `AC-00${centers.length + 1}`,
        name: formName,
        date: new Date().toISOString().split('T')[0],
        status: formStatus,
        levels: [],
        categories: []
      };
      onUpdateCenters([...centers, newCenter]);
    } else if (modalMode === 'edit' && selectedCenter) {
      const updated = centers.map(c => c.id === selectedCenter.id ? { ...c, name: formName, status: formStatus } : c);
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
    <div className="centers-tab-container" style={{ animation: 'fadeIn 0.3s ease-out' }}>
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
              <th>{t.date}</th>
              <th>{t.status}</th>
              <th style={{ textAlign: 'right', width: '220px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
                <tr key={center.id}>
                  <td className="id-col">{center.id}</td>
                  <td className="name-col">{center.name}</td>
                  <td>{center.date}</td>
                  <td>
                    <span className={`badge ${center.status.toLowerCase()}`}>
                      {center.status === 'Active' ? t.active : t.inactive}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => onManageDetail(center)}
                        style={{
                          background: 'rgba(13, 148, 136, 0.1)',
                          border: '1px solid rgba(13, 148, 136, 0.2)',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'var(--primary)';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'rgba(13, 148, 136, 0.1)';
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                      >
                        📂 {t.btnDetails}
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
                      <label>{t.formStatus}</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as 'Active' | 'Inactive')}
                      >
                        <option value="Active">{t.active}</option>
                        <option value="Inactive">{t.inactive}</option>
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

export default CentersTab;
