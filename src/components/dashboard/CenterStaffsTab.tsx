import React, { useState } from 'react';
import type { CenterStaff, CenterRole } from './CenterDetailView';

interface CenterStaffsTabProps {
  lang: 'vi' | 'en';
  staffs: CenterStaff[];
  roles: CenterRole[];
  onUpdateStaffs: (newStaffs: CenterStaff[]) => void;
}

const translations = {
  vi: {
    title: "Danh sách Nhân sự Trung tâm",
    searchPlaceholder: "Tìm kiếm nhân viên (Tên, Email, SĐT...)",
    addBtn: "✨ Thêm nhân viên",
    thName: "Họ và Tên",
    thRole: "Vai trò / Chức vụ",
    thContact: "Liên hệ",
    thJoined: "Ngày tham gia",
    thStatus: "Trạng thái",
    thActions: "Hành động",
    active: "Đang làm việc",
    inactive: "Nghỉ việc",
    noResults: "Không tìm thấy nhân viên nào.",
    editTitle: "Chỉnh sửa Thông tin Nhân sự",
    addTitle: "Thêm Nhân sự Mới",
    deleteTitle: "Xóa nhân viên",
    confirmDelete: "Bạn có chắc chắn muốn xóa nhân viên này khỏi hệ thống cơ sở?",
    staffName: "Họ và tên nhân viên",
    roleSelect: "Chọn vai trò chuyên môn",
    emailLabel: "Địa chỉ Email",
    phoneLabel: "Số điện thoại liên lạc",
    joinedDate: "Ngày vào làm",
    statusLabel: "Trạng thái nhân sự",
    btnSave: "Cập nhật dữ liệu",
    btnCancel: "Hủy bỏ",
    btnDelete: "Xóa ngay",
    requiredError: "Vui lòng điền họ tên, email và số điện thoại!",
    unknownRole: "Không xác định",
    rolePlaceholder: "Chọn vai trò..."
  },
  en: {
    title: "Center Staff Directory",
    searchPlaceholder: "Search staff (Name, Email, Phone...)",
    addBtn: "✨ Add Staff Member",
    thName: "Full Name",
    thRole: "Role & Position",
    thContact: "Contact Info",
    thJoined: "Joined Date",
    thStatus: "Status",
    thActions: "Actions",
    active: "Active",
    inactive: "Inactive",
    noResults: "No staff members found.",
    editTitle: "Edit Staff Details",
    addTitle: "Add New Center Staff",
    deleteTitle: "Remove Staff",
    confirmDelete: "Are you sure you want to delete this staff member from this center?",
    staffName: "Full Name",
    roleSelect: "Assign Special Role",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    joinedDate: "Date Joined",
    statusLabel: "Employment Status",
    btnSave: "Save Record",
    btnCancel: "Cancel",
    btnDelete: "Remove",
    requiredError: "Please enter name, email, and phone number!",
    unknownRole: "Unassigned",
    rolePlaceholder: "Select role..."
  }
};

const CenterStaffsTab: React.FC<CenterStaffsTabProps> = ({ lang, staffs, roles, onUpdateStaffs }) => {
  const t = translations[lang];
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedStaff, setSelectedStaff] = useState<CenterStaff | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [error, setError] = useState('');

  const filteredStaffs = staffs.filter(staff => {
    const term = search.toLowerCase();
    const role = roles.find(r => r.id === staff.roleId);
    const roleName = role ? (lang === 'vi' ? role.nameVi : role.nameEn).toLowerCase() : '';
    return (
      staff.name.toLowerCase().includes(term) ||
      staff.email.toLowerCase().includes(term) ||
      staff.phone.includes(term) ||
      staff.id.toLowerCase().includes(term) ||
      roleName.includes(term)
    );
  });

  const openModal = (type: 'add' | 'edit' | 'delete', staff?: CenterStaff) => {
    setModalType(type);
    setSelectedStaff(staff || null);
    setError('');

    if (type === 'edit' && staff) {
      setName(staff.name);
      setRoleId(staff.roleId);
      setEmail(staff.email);
      setPhone(staff.phone);
      setJoinedDate(staff.joinedDate);
      setStatus(staff.status);
    } else if (type === 'add') {
      setName('');
      setRoleId(roles.length > 0 ? roles[0].id : '');
      setEmail('');
      setPhone('');
      setJoinedDate(new Date().toISOString().split('T')[0]);
      setStatus('Active');
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError(t.requiredError);
      return;
    }

    if (modalType === 'add') {
      const newStaff: CenterStaff = {
        id: `S-${Math.floor(100 + Math.random() * 900)}`,
        name,
        roleId,
        email,
        phone,
        joinedDate,
        status
      };
      onUpdateStaffs([...staffs, newStaff]);
    } else if (modalType === 'edit' && selectedStaff) {
      const updated = staffs.map(s =>
        s.id === selectedStaff.id
          ? { ...s, name, roleId, email, phone, joinedDate, status }
          : s
      );
      onUpdateStaffs(updated);
    }

    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedStaff) {
      onUpdateStaffs(staffs.filter(s => s.id !== selectedStaff.id));
      setIsModalOpen(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      {/* Title & Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
          {t.title}
        </h3>
        <button
          onClick={() => openModal('add')}
          style={{
            background: 'var(--primary)',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(13, 148, 136, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.2)';
          }}
        >
          {t.addBtn}
        </button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          style={{
            width: '100%',
            padding: '12px 20px 12px 42px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            fontSize: '0.9rem',
            background: 'white',
            color: '#1E293B',
            boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
            transition: 'all 0.2s',
            boxSizing: 'border-box'
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1rem',
            color: '#94A3B8',
            pointerEvents: 'none'
          }}
        >
          🔍
        </span>
      </div>

      {/* Table Container */}
      <div className="table-container" style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>ID</th>
              <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>{t.thName}</th>
              <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>{t.thRole}</th>
              <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>{t.thContact}</th>
              <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>{t.thJoined}</th>
              <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>{t.thStatus}</th>
              <th style={{ padding: '16px 20px', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'right' }}>{t.thActions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff) => {
                const matchedRole = roles.find(r => r.id === staff.roleId);
                const roleLabel = matchedRole ? (lang === 'vi' ? matchedRole.nameVi : matchedRole.nameEn) : t.unknownRole;

                return (
                  <tr key={staff.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>{staff.id}</td>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: '#0F172A' }}>{staff.name}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          background: 'rgba(13, 148, 136, 0.08)',
                          border: '1px solid rgba(13, 148, 136, 0.15)',
                          color: 'var(--primary)',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}
                      >
                        💼 {roleLabel}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>{staff.email}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>📞 {staff.phone}</div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>{staff.joinedDate}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span className={`badge ${staff.status.toLowerCase()}`}>
                        {staff.status === 'Active' ? t.active : t.inactive}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div className="action-btns" style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          className="edit-btn-v2"
                          title={t.editTitle}
                          onClick={() => openModal('edit', staff)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#64748B',
                            padding: '6px',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </button>
                        <button
                          className="delete-btn-v2"
                          title={t.deleteTitle}
                          onClick={() => openModal('delete', staff)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#EF4444',
                            padding: '6px',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                  {t.noResults}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            className="modal-box glass"
            style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '500px',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {modalType === 'delete' ? (
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#0F172A', fontSize: '1.3rem', fontWeight: 800 }}>
                  ⚠️ {t.deleteTitle}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {t.confirmDelete} <br />
                  <strong style={{ color: '#0F172A', fontSize: '1.05rem' }}>
                    "{selectedStaff?.name}"
                  </strong>
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      background: 'white',
                      fontWeight: 700,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {t.btnCancel}
                  </button>
                  <button
                    onClick={handleDelete}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#EF4444',
                      fontWeight: 700,
                      color: 'white',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    {t.btnDelete}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <h3 style={{ margin: '0 0 1.5rem 0', color: '#0F172A', fontSize: '1.3rem', fontWeight: 800 }}>
                  {modalType === 'add' ? t.addTitle : t.editTitle}
                </h3>

                {error && (
                  <div style={{ color: '#EF4444', background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                    ❌ {error}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {t.staffName} *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {t.roleSelect} *
                    </label>
                    <select
                      value={roleId}
                      onChange={(e) => setRoleId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        boxSizing: 'border-box',
                        background: 'white'
                      }}
                    >
                      <option value="" disabled>{t.rolePlaceholder}</option>
                      {roles.map(r => (
                        <option key={r.id} value={r.id}>
                          {lang === 'vi' ? r.nameVi : r.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {t.emailLabel} *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {t.joinedDate}
                    </label>
                    <input
                      type="date"
                      value={joinedDate}
                      onChange={(e) => setJoinedDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {t.statusLabel}
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        boxSizing: 'border-box',
                        background: 'white'
                      }}
                    >
                      <option value="Active">{t.active}</option>
                      <option value="Inactive">{t.inactive}</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      background: 'white',
                      fontWeight: 700,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {t.btnCancel}
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'var(--primary)',
                      fontWeight: 700,
                      color: 'white',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)'
                    }}
                  >
                    {t.btnSave}
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

export default CenterStaffsTab;
