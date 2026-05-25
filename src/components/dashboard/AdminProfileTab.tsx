import React, { useState } from 'react';

export interface AdminProfile {
  username: string;
  email: string;
  avatar: string;
  phone_number: string;
  full_name: string;
  qualification: string;
  experience_years: number;
  invite_code: string;
  description: string;
  center_name: string;
}

interface AdminProfileTabProps {
  lang: 'vi' | 'en';
  profile: AdminProfile;
  onSave: (updatedProfile: AdminProfile) => void;
}

const translations = {
  vi: {
    profileTitle: 'HỒ SƠ CÁ NHÂN ADMIN',
    profileSubtitle: 'Quản lý thông tin tài khoản quản trị hệ thống AutiCare',
    viewMode: 'Chế độ xem',
    editMode: 'Chỉnh sửa hồ sơ',
    btnEdit: '✏️ Chỉnh sửa thông tin',
    btnSave: '💾 Lưu thay đổi',
    btnCancel: '❌ Hủy bỏ',
    toastSaveSuccess: '✨ Đã lưu thông tin hồ sơ Admin thành công!',
    
    // Fields
    username: 'Tên tài khoản',
    email: 'Địa chỉ Email',
    avatar: 'Ảnh đại diện (Emoji)',
    phone_number: 'Số điện thoại',
    full_name: 'Họ và tên',
    qualification: 'Bằng cấp / Học vị',
    experience_years: 'Số năm kinh nghiệm',
    invite_code: 'Mã mời hệ thống',
    description: 'Mô tả bản thân',
    center_name: 'Trực thuộc trung tâm',

    // Placeholders & Helpers
    placeholderUsername: 'Ví dụ: auticare_admin',
    placeholderEmail: 'Ví dụ: admin@auticare.vn',
    placeholderPhone: 'Ví dụ: 0912.345.678',
    placeholderFullName: 'Ví dụ: Nguyễn Văn A',
    placeholderQualification: 'Ví dụ: Thạc sĩ Giáo dục Đặc biệt',
    placeholderExperience: 'Nhập số năm kinh nghiệm',
    placeholderInviteCode: 'Mã giới thiệu trung tâm',
    placeholderDescription: 'Hãy viết một vài dòng giới thiệu về bản thân bạn...',
    placeholderCenterName: 'Tên trung tâm đang trực thuộc quản lý',
    selectAvatarHint: 'Chọn một biểu tượng emoji đại diện:'
  },
  en: {
    profileTitle: 'ADMIN PROFILE',
    profileSubtitle: 'Manage your AutiCare platform administrator account details',
    viewMode: 'View Mode',
    editMode: 'Edit Profile',
    btnEdit: '✏️ Edit Profile Info',
    btnSave: '💾 Save Changes',
    btnCancel: '❌ Cancel',
    toastSaveSuccess: '✨ Admin profile details saved successfully!',
    
    // Fields
    username: 'Username',
    email: 'Email Address',
    avatar: 'Avatar (Emoji)',
    phone_number: 'Phone Number',
    full_name: 'Full Name',
    qualification: 'Qualification / Credentials',
    experience_years: 'Years of Experience',
    invite_code: 'System Invite Code',
    description: 'Bio / Description',
    center_name: 'Affiliated Center',

    // Placeholders & Helpers
    placeholderUsername: 'e.g. auticare_admin',
    placeholderEmail: 'e.g. admin@auticare.vn',
    placeholderPhone: 'e.g. 0912.345.678',
    placeholderFullName: 'e.g. John Doe',
    placeholderQualification: 'e.g. Master of Special Education',
    placeholderExperience: 'Enter years of experience',
    placeholderInviteCode: 'Center invitation code',
    placeholderDescription: 'Write a brief description about yourself...',
    placeholderCenterName: 'Name of the early intervention center managed',
    selectAvatarHint: 'Choose an avatar emoji representative:'
  }
};

const AVAILABLE_EMOJIS = ['⚡', '🛡️', '⚙️', '🧩', '🩺', '🦁', '🦉', '🎓', '🚀', '🌟', '🍀', '🦕'];

export const AdminProfileTab: React.FC<AdminProfileTabProps> = ({ lang, profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AdminProfile>({ ...profile });
  const [showToast, setShowToast] = useState(false);

  const t = translations[lang];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'experience_years' ? (parseInt(value) || 0) : value
    }));
  };

  const handleEmojiSelect = (emoji: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar: emoji
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormData({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="dashboard-content-area admin-profile-container">
      {showToast && (
        <div className="profile-toast-floating animate-bounce">
          {t.toastSaveSuccess}
        </div>
      )}

      <div className="profile-header-zone">
        <div className="profile-header-meta">
          <h2 className="profile-main-title">{t.profileTitle}</h2>
          <p className="profile-main-subtitle">{t.profileSubtitle}</p>
        </div>
        <div className={`profile-status-badge ${isEditing ? 'editing' : 'viewing'}`}>
          {isEditing ? t.editMode : t.viewMode}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-profile-form">
        {/* Floating Island Layout */}
        <div className="profile-island-card">
          
          {/* Top Zone: Avatar and Basic Info */}
          <div className="profile-top-bar-details">
            <div className="profile-avatar-circle-wrapper">
              <span className="profile-avatar-display">{formData.avatar}</span>
              {isEditing && <span className="profile-avatar-edit-hint">✏️</span>}
            </div>
            
            <div className="profile-quick-intro-info">
              <h3 className="profile-display-name">
                {formData.full_name || (lang === 'vi' ? 'Chưa Cập Nhật' : 'Not Updated')}
              </h3>
              <p className="profile-display-username">@{formData.username}</p>
              <div className="profile-badges-row">
                <span className="profile-badge-pill role-pill">Administrator</span>
                {formData.center_name && (
                  <span className="profile-badge-pill center-pill">🏢 {formData.center_name}</span>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="profile-emoji-picker-container">
              <label className="picker-label">{t.selectAvatarHint}</label>
              <div className="emoji-picker-grid">
                {AVAILABLE_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`emoji-selector-btn ${formData.avatar === emoji ? 'selected' : ''}`}
                    onClick={() => handleEmojiSelect(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Solid separator line */}
          <div className="profile-section-divider"></div>

          {/* Content Zone: 2 Column Fields Grid */}
          <div className="profile-fields-grid">
            
            {/* Field 1: Full Name */}
            <div className="form-group-item">
              <label>{t.full_name}</label>
              {isEditing ? (
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder={t.placeholderFullName}
                  required
                />
              ) : (
                <div className="static-field-value">{formData.full_name || '—'}</div>
              )}
            </div>

            {/* Field 2: Username */}
            <div className="form-group-item">
              <label>{t.username}</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder={t.placeholderUsername}
                  required
                />
              ) : (
                <div className="static-field-value">@{formData.username}</div>
              )}
            </div>

            {/* Field 3: Email */}
            <div className="form-group-item">
              <label>{t.email}</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.placeholderEmail}
                  required
                />
              ) : (
                <div className="static-field-value">{formData.email}</div>
              )}
            </div>

            {/* Field 4: Phone Number */}
            <div className="form-group-item">
              <label>{t.phone_number}</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder={t.placeholderPhone}
                />
              ) : (
                <div className="static-field-value">{formData.phone_number || '—'}</div>
              )}
            </div>

            {/* Field 5: Qualification */}
            <div className="form-group-item">
              <label>{t.qualification}</label>
              {isEditing ? (
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder={t.placeholderQualification}
                />
              ) : (
                <div className="static-field-value">{formData.qualification || '—'}</div>
              )}
            </div>

            {/* Field 6: Experience Years */}
            <div className="form-group-item">
              <label>{t.experience_years}</label>
              {isEditing ? (
                <input
                  type="number"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleInputChange}
                  placeholder={t.placeholderExperience}
                  min="0"
                  max="70"
                />
              ) : (
                <div className="static-field-value">
                  {formData.experience_years} {lang === 'vi' ? 'năm' : 'years'}
                </div>
              )}
            </div>

            {/* Field 7: Affiliated Center */}
            <div className="form-group-item">
              <label>{t.center_name}</label>
              {isEditing ? (
                <input
                  type="text"
                  name="center_name"
                  value={formData.center_name}
                  onChange={handleInputChange}
                  placeholder={t.placeholderCenterName}
                />
              ) : (
                <div className="static-field-value">{formData.center_name || '—'}</div>
              )}
            </div>

            {/* Field 8: System Invite Code */}
            <div className="form-group-item">
              <label>{t.invite_code}</label>
              {isEditing ? (
                <input
                  type="text"
                  name="invite_code"
                  value={formData.invite_code}
                  onChange={handleInputChange}
                  placeholder={t.placeholderInviteCode}
                />
              ) : (
                <div className="static-field-value secure-invite-field">{formData.invite_code || '—'}</div>
              )}
            </div>

            {/* Field 9: Description (Span 2) */}
            <div className="form-group-item full-width-field">
              <label>{t.description}</label>
              {isEditing ? (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t.placeholderDescription}
                  rows={4}
                />
              ) : (
                <div className="static-field-value text-area-static">{formData.description || '—'}</div>
              )}
            </div>

          </div>

          {/* Bottom Footer Actions */}
          <div className="profile-footer-actions">
            {!isEditing ? (
              <button
                type="button"
                className="profile-btn-primary candy-btn-edit"
                onClick={() => setIsEditing(true)}
              >
                {t.btnEdit}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="profile-btn-secondary candy-btn-cancel"
                  onClick={handleCancel}
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  className="profile-btn-primary candy-btn-save"
                >
                  {t.btnSave}
                </button>
              </>
            )}
          </div>

        </div>
      </form>
    </div>
  );
};

export default AdminProfileTab;
