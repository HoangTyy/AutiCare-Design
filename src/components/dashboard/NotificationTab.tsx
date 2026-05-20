import React, { useState } from 'react';

interface NotificationItem {
  notification_id: number;     
  title: string;               
  description: string;         
  type: 'individual' | 'role'; 
  target_value: string;        // Lưu giá trị cụ thể của User ID hoặc Role Name
  created_at: string;          
  deleted_at: string | null;   
}

interface NotificationTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Quản lý Thông báo Hệ thống",
    searchPlaceholder: "Tìm kiếm tiêu đề, nội dung...",
    addNew: "Thêm thông báo mới",
    id: "Mã thông báo (ID)",
    name: "Tiêu đề thông báo",
    targetDate: "Ngày tạo",
    status: "Trạng thái",
    type: "Đối tượng nhận",
    actions: "Thao tác",
    active: "Hoạt động",
    inactive: "Đã ẩn (Xóa tạm)",
    noResults: "Không tìm thấy thông báo phù hợp",
    createTitle: "Tạo thông báo hệ thống mới",
    deleteTitle: "Xác nhận ẩn thông báo",
    deleteConfirm: "Bạn có chắc chắn muốn ẩn thông báo",
    deleteSub: "Hành động này sẽ chuyển trạng thái hoạt động thành Đã ẩn.",
    cancel: "Hủy bỏ",
    save: "Gửi thông báo",
    confirmDelete: "Xác nhận",
    formId: "Mã thông báo (ID)",
    formTitle: "Tiêu đề thông báo",
    formDescription: "Nội dung chi tiết",
    formType: "Gửi tới đối tượng",
    viewTitle: "Chi tiết thông báo",
    close: "Đóng lại",
    typeIndividual: "Gửi cho 1 người cụ thể",
    typeRole: "Gửi cho nhóm có Role nhất định",
    selectUser: "Chọn người nhận cụ thể",
    selectRole: "Chọn nhóm quyền (Role)"
  },
  en: {
    title: "System Notification Management",
    searchPlaceholder: "Search title, description...",
    addNew: "Add New Notification",
    id: "ID",
    name: "Title",
    targetDate: "Created At",
    status: "Status",
    type: "Recipient Type",
    actions: "Actions",
    active: "Active",
    inactive: "Deleted (Hidden)",
    noResults: "No matching notifications found",
    createTitle: "Create Notification",
    deleteTitle: "Confirm delete Notification",
    deleteConfirm: "Are you sure you want to delete this notification?",
    deleteSub: "This action will switch the status to deleted.",
    cancel: "Cancel",
    save: "Send Notification",
    confirmDelete: "Confirm",
    formId: "ID",
    formTitle: "Title",
    formDescription: "Description",
    formType: "Send To",
    viewTitle: "Notification Details",
    close: "Close",
    typeIndividual: "Specific user",
    typeRole: "Specific Role",
    selectUser: "Select Specific User",
    selectRole: "Select Role"
  }
};

// Mock list phục vụ cho Dropdown tương ứng
const mockUsers = [
  { id: 'usr_001', name: 'Nguyễn Văn A (ID: usr_001)' },
  { id: 'usr_002', name: 'Trần Thị B (ID: usr_002)' },
  { id: 'usr_003', name: 'Lê Văn C (ID: usr_003)' },
];

const mockRoles = [
  { id: 'admin', name: 'Quản trị viên (Admin)' },
  { id: 'manager', name: 'Quản lý (Manager)' },
  { id: 'employee', name: 'Nhân viên (Employee)' },
];

// Định nghĩa style ép chữ đen cho tất cả modal
const modalTextStyle: React.CSSProperties = {
  color: '#1e293b', // Chữ đen/Xám đậm
};

// --- MODAL COMPONENTS ---

interface CreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (data: { title: string; description: string; type: 'individual' | 'role'; target_value: string }) => void;
  t: any;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, closeModal, handleSave, t }) => {
  const [sendType, setSendType] = useState<'individual' | 'role'>('individual');

  if (!isOpen) return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSave({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      type: sendType,
      target_value: formData.get('target_value') as string,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in" style={modalTextStyle}>
        <div className="modal-header">
          <h3 style={{ color: '#0f172a' }}>{t.createTitle}</h3>
          <button className="close-modal" onClick={closeModal} style={{ color: '#1e293b' }}>×</button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="modal-form">
              <div className="form-group">
                <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formTitle}</label>
                <input type="text" name="title" required spellCheck="false" style={{ color: '#1e293b' }} />
              </div>
              <div className="form-group">
                <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formDescription}</label>
                <textarea 
                  name="description" 
                  required 
                  spellCheck="false" 
                  rows={4} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', color: '#1e293b' }} 
                />
              </div>

              {/* Lựa chọn Gửi To bằng Radio Buttons */}
              <div className="form-group">
                <label style={{ color: '#1e293b', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>{t.formType}</label>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#1e293b' }}>
                    <input 
                      type="radio" 
                      name="send_type_radio" 
                      checked={sendType === 'individual'} 
                      onChange={() => setSendType('individual')}
                    />
                    {t.typeIndividual}
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#1e293b' }}>
                    <input 
                      type="radio" 
                      name="send_type_radio" 
                      checked={sendType === 'role'} 
                      onChange={() => setSendType('role')}
                    />
                    {t.typeRole}
                  </label>
                </div>
              </div>

              {/* Dropdown tương ứng dựa theo Radio được chọn */}
              <div className="form-group">
                <label style={{ color: '#1e293b', fontWeight: 600 }}>
                  {sendType === 'individual' ? t.selectUser : t.selectRole}
                </label>
                <select name="target_value" required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', color: '#1e293b', backgroundColor: '#fff' }}>
                  {sendType === 'individual' ? (
                    mockUsers.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))
                  ) : (
                    mockRoles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))
                  )}
                </select>
              </div>

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeModal} style={{ color: '#1e293b' }}>{t.cancel}</button>
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
  handleDelete: () => void;
  selectedObj: NotificationItem | null;
  t: any;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, handleDelete, selectedObj, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in" style={modalTextStyle}>
        <div className="modal-header">
          <h3 style={{ color: '#0f172a' }}>{t.deleteTitle}</h3>
          <button className="close-modal" onClick={closeModal} style={{ color: '#1e293b' }}>×</button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
          <div className="modal-body">
            <div className="delete-confirm" style={{ color: '#1e293b' }}>
              <div className="warning-icon">⚠️</div>
              <p style={{ color: '#1e293b', fontWeight: 500 }}>
                {t.deleteConfirm} "{selectedObj?.title}" ({t.id}: {selectedObj?.notification_id})?
              </p>
              <p className="sub-text" style={{ color: '#64748b' }}>{t.deleteSub}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeModal} style={{ color: '#1e293b' }}>{t.cancel}</button>
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
  selectedObj: NotificationItem | null;
  t: any;
}

export const ReadModal: React.FC<ReadModalProps> = ({ isOpen, closeModal, selectedObj, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in" style={modalTextStyle}>
        <div className="modal-header">
          <h3 style={{ color: '#0f172a' }}>{t.viewTitle}</h3>
          <button className="close-modal" onClick={closeModal} style={{ color: '#1e293b' }}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-form">
            <div className="form-group">
              <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formId}</label>
              <p className="view-detail-text" style={{ color: '#334155' }}>{selectedObj?.notification_id || '---'}</p>
            </div>
            <div className="form-group">
              <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formTitle}</label>
              <p className="view-detail-text" style={{ color: '#334155' }}>{selectedObj?.title || '---'}</p>
            </div>
            <div className="form-group">
              <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formDescription}</label>
              <p className="view-detail-text" style={{ whiteSpace: 'pre-wrap', color: '#334155' }}>{selectedObj?.description || '---'}</p>
            </div>
            <div className="form-group">
              <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formType}</label>
              <p className="view-detail-text" style={{ color: '#334155' }}>
                {selectedObj?.type === 'individual' ? `${t.typeIndividual} (ID: ${selectedObj?.target_value})` : `${t.typeRole} (Role: ${selectedObj?.target_value})`}
              </p>
            </div>
            <div className="form-group">
              <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.targetDate}</label>
              <p className="view-detail-text" style={{ color: '#334155' }}>{selectedObj?.created_at || '---'}</p>
            </div>
            <div className="form-group">
              <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.status}</label>
              <div>
                <span className={`status-badge ${selectedObj?.deleted_at ? 'processing' : 'completed'}`}>
                  {selectedObj?.deleted_at ? t.inactive : t.active}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={closeModal} style={{ color: '#1e293b' }}>{t.close}</button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN TAB COMPONENT ---

const NotificationTab: React.FC<NotificationTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'delete' | 'read'>('create');
  const [selectedObj, setSelectedObj] = useState<NotificationItem | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { notification_id: 1, title: 'Thông báo cập nhật hệ thống', description: 'Hệ thống sẽ cập nhật phiên bản mới tối nay.', type: 'role', target_value: 'admin', created_at: '2026-05-10 08:00:00', deleted_at: null },
    { notification_id: 2, title: 'Cảnh báo Bảo mật Tài khoản', description: 'Phát hiện đăng nhập lạ vào tài khoản của bạn.', type: 'individual', target_value: 'usr_001', created_at: '2026-05-12 14:30:00', deleted_at: null },
    { notification_id: 3, title: 'Thông báo họp phòng ban', description: 'Thông báo lịch nghỉ lễ chính thức sắp tới.', type: 'role', target_value: 'manager', created_at: '2026-05-15 11:00:00', deleted_at: '2026-05-16 17:00:00' },
  ]);

  const openModal = (mode: 'create' | 'delete' | 'read', obj: NotificationItem | null = null) => {
    setModalMode(mode);
    setSelectedObj(obj);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedObj(null);
  };

  const handleCreate = (data: { title: string; description: string; type: 'individual' | 'role'; target_value: string }) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const nextId = notifications.length > 0 ? Math.max(...notifications.map(n => n.notification_id)) + 1 : 1;
    
    const newItem: NotificationItem = {
      notification_id: nextId,
      title: data.title,
      description: data.description,
      type: data.type,
      target_value: data.target_value,
      created_at: nowStr,
      deleted_at: null
    };
    setNotifications([...notifications, newItem]);
    closeModal();
  };

  const handleDelete = () => {
    if (!selectedObj) return;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setNotifications(notifications.map(item => 
      item.notification_id === selectedObj.notification_id 
        ? { ...item, deleted_at: nowStr }
        : item
    ));
    closeModal();
  };

  const filteredNotifications = notifications.filter(obj => {
    const term = searchTerm.toLowerCase();
    return (
      obj.title.toLowerCase().includes(term) ||
      obj.description.toLowerCase().includes(term)
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
              <th style={{ width: '80px' }}>{t.id}</th>
              <th>{t.name}</th>
              <th style={{ width: '250px' }}>{t.type}</th>
              <th style={{ width: '180px' }}>{t.targetDate}</th>
              <th style={{ width: '150px' }}>{t.status}</th>
              <th style={{ textAlign: 'right', width: '100px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((obj) => (
                <tr key={obj.notification_id}>
                  <td className="id-col">{obj.notification_id}</td>
                  <td className="name-col" title={obj.description}>{obj.title}</td>
                  <td>
                    <span className={`type-tag ${obj.type}`} style={{ fontWeight: 500 }}>
                      {obj.type === 'individual' ? `${t.typeIndividual} (${obj.target_value})` : `${t.typeRole} (${obj.target_value})`}
                    </span>
                  </td>
                  <td>{obj.created_at}</td>
                  <td>
                    <span className={`badge ${obj.deleted_at ? 'processing' : 'completed'}`}>
                      {obj.deleted_at ? t.inactive : t.active}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end', display: 'flex', gap: '8px' }}>
                      <button className="view-btn-v2" title={t.viewTitle} onClick={() => openModal('read', obj)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
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

      <CreateModal 
        isOpen={isModalOpen && modalMode === 'create'} 
        closeModal={closeModal} 
        handleSave={handleCreate} 
        t={t} 
      />

      <DeleteModal 
        isOpen={isModalOpen && modalMode === 'delete'} 
        closeModal={closeModal} 
        handleDelete={handleDelete} 
        selectedObj={selectedObj} 
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

export default NotificationTab;