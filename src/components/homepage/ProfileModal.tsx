import React, { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
  onOpenInvoices: () => void;
  onOpenSupportTickets: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, lang, onOpenInvoices, onOpenSupportTickets }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [isUpdating, setIsUpdating] = useState(false);

  // Mock User Data
  const [profile, setProfile] = useState({
    fullName: 'Auticare Admin',
    email: 'admin@auticare.com',
    phone: '0987654321'
  });

  if (!isOpen) return null;

  const t = {
    vi: {
      title: 'Quản lý Tài khoản',
      myProfile: 'Thông tin cá nhân',
      changePass: 'Đổi mật khẩu',
      fullName: 'Họ và tên',
      email: 'Email',
      phone: 'Số điện thoại',
      saveChanges: 'Lưu thay đổi',
      currentPass: 'Mật khẩu hiện tại',
      newPass: 'Mật khẩu mới',
      confirmPass: 'Xác nhận mật khẩu mới',
      invoices: 'Hóa đơn của tôi',
      support: 'Yêu cầu hỗ trợ',
      successMsg: 'Cập nhật thành công!'
    },
    en: {
      title: 'Account Management',
      myProfile: 'My Profile',
      changePass: 'Change Password',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      saveChanges: 'Save Changes',
      currentPass: 'Current Password',
      newPass: 'New Password',
      confirmPass: 'Confirm New Password',
      invoices: 'My Invoices',
      support: 'Support Tickets',
      successMsg: 'Updated successfully!'
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      alert(t.successMsg);
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in profile-modal-layout" style={{ maxWidth: '800px', padding: '0', overflow: 'hidden', minHeight: '500px' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', backgroundColor: '#F8FAFC', padding: '1.5rem', borderRight: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0F172A' }}>
            {t.title}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <button 
                onClick={() => setActiveTab('profile')}
                style={{ 
                  width: '100%', textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', 
                  backgroundColor: activeTab === 'profile' ? '#0084FF' : 'transparent',
                  color: activeTab === 'profile' ? 'white' : '#475569',
                  border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s'
                }}
              >
                👤 {t.myProfile}
              </button>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <button 
                onClick={() => setActiveTab('password')}
                style={{ 
                  width: '100%', textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', 
                  backgroundColor: activeTab === 'password' ? '#0084FF' : 'transparent',
                  color: activeTab === 'password' ? 'white' : '#475569',
                  border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s'
                }}
              >
                🔒 {t.changePass}
              </button>
            </li>
            <li style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>
              <button 
                onClick={() => {
                  onClose();
                  onOpenInvoices();
                }}
                style={{ 
                  width: '100%', textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', 
                  backgroundColor: 'white', color: '#0F172A', border: '1px solid #E2E8F0',
                  cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                💳 {t.invoices}
              </button>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <button 
                onClick={() => {
                  onClose();
                  onOpenSupportTickets();
                }}
                style={{ 
                  width: '100%', textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', 
                  backgroundColor: 'white', color: '#0F172A', border: '1px solid #E2E8F0',
                  cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                🎧 {t.support}
              </button>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '2rem', position: 'relative' }}>
          <button className="close-modal" onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>×</button>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: '#0F172A' }}>
            {activeTab === 'profile' ? t.myProfile : t.changePass}
          </h2>

          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>{t.fullName}</label>
                <input 
                  type="text" 
                  value={profile.fullName} 
                  onChange={e => setProfile({...profile, fullName: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>{t.email}</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  onChange={e => setProfile({...profile, email: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>{t.phone}</label>
                <input 
                  type="tel" 
                  value={profile.phone} 
                  onChange={e => setProfile({...profile, phone: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: '0.75rem 2rem' }}
                disabled={isUpdating}
              >
                {isUpdating ? '...' : t.saveChanges}
              </button>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>{t.currentPass}</label>
                <input 
                  type="password" 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>{t.newPass}</label>
                <input 
                  type="password" 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>{t.confirmPass}</label>
                <input 
                  type="password" 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: '0.75rem 2rem' }}
                disabled={isUpdating}
              >
                {isUpdating ? '...' : t.saveChanges}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
