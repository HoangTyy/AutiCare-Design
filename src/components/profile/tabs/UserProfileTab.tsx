import React, { useState, useRef } from 'react';
import type { UserProfile } from '../UserProfilePage';

interface UserProfileTabProps {
  lang: 'vi' | 'en';
  profile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
}

const translations = {
  vi: {
    username: "Tên đăng nhập (Username)",
    email: "Địa chỉ Email",
    avatarSelect: "Bộ sưu tập Sticker Avatar (Hoặc click trực tiếp vào Avatar tròn ở trên để tải ảnh lên)",
    phonenumber: "Số điện thoại",
    fullName: "Họ và tên",
    address: "Địa chỉ liên hệ",
    job: "Vai trò phụ huynh & Nghề nghiệp",
    cancel: "Hủy bỏ",
    save: "Lưu thông tin hồ sơ",
    successMsg: "✨ Cập nhật hồ sơ cá nhân thành công!",
    jobTitle: "Vai trò",
    emailTitle: "Liên hệ",
    phoneTitle: "Điện thoại",
    addressTitle: "Địa chỉ",
    usernamePlaceholder: "Ví dụ: phuhuynh_minhanh",
    fullNamePlaceholder: "Ví dụ: Nguyễn Thị Minh Anh",
    emailPlaceholder: "Ví dụ: phuhuynh.minhanh@gmail.com",
    phonePlaceholder: "Ví dụ: 0987654321",
    jobPlaceholder: "Ví dụ: Mẹ bé Đức Minh / Kế toán viên",
    addressPlaceholder: "Ví dụ: 456 Hòa Bình, P. 12, Q. Tân Bình, TP. HCM",
    clickToUpload: "Nhấp vào ảnh để tải lên từ thiết bị",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    currentPassword: "Mật khẩu hiện tại",
    newPassword: "Mật khẩu mới",
    confirmNewPassword: "Xác nhận mật khẩu mới",
    updatePassword: "Cập nhật mật khẩu",
    passwordPlaceholder: "Nhập mật khẩu...",
    passwordSuccessMsg: "✨ Thay đổi mật khẩu thành công!",
    subTitle: "Quản lý và cấu hình thông tin tài khoản Phụ huynh AutiCare"
  },
  en: {
    username: "Username",
    email: "Email Address",
    avatarSelect: "Select Sticker Avatar (Or click directly on Avatar above to upload photo)",
    phonenumber: "Phone Number",
    fullName: "Full Name",
    address: "Physical Address",
    job: "Parent Role & Occupation",
    cancel: "Cancel",
    save: "Save Profile Information",
    successMsg: "✨ Profile updated successfully!",
    jobTitle: "Role",
    emailTitle: "Email",
    phoneTitle: "Phone",
    addressTitle: "Address",
    usernamePlaceholder: "e.g. parent_minhanh",
    fullNamePlaceholder: "e.g. Nguyen Thi Minh Anh",
    emailPlaceholder: "e.g. parent.minhanh@gmail.com",
    phonePlaceholder: "e.g. 0987654321",
    jobPlaceholder: "e.g. Mother of Duc Minh / Accountant",
    addressPlaceholder: "e.g. 456 Hoa Binh Str, Tan Binh Dist, HCMC",
    clickToUpload: "Click on photo to upload from device",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    updatePassword: "Update Password",
    passwordPlaceholder: "Enter password...",
    passwordSuccessMsg: "✨ Password changed successfully!",
    subTitle: "Manage and configure your AutiCare Parent account information"
  }
};

const STICKER_AVATARS = [
  { char: '🦖', name: 'Dino Care' },
  { char: '🧸', name: 'Teddy Doc' },
  { char: '☀️', name: 'Sunny Hope' },
  { char: '☁️', name: 'Soft Cloud' },
  { char: '🦁', name: 'Brave Lion' },
  { char: '🦉', name: 'Wise Owl' },
  { char: '🍎', name: 'Healthy Apple' },
  { char: '🌈', name: 'Rainbow Joy' }
];

const UserProfileTab: React.FC<UserProfileTabProps> = ({
  lang,
  profile,
  onSave
}) => {
  const t = translations[lang];

  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [phonenumber, setPhonenumber] = useState(profile.phonenumber);
  const [fullName, setFullName] = useState(profile.full_name);
  const [address, setAddress] = useState(profile.address);
  const [job, setJob] = useState(profile.job);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      username,
      email,
      avatar,
      phonenumber,
      full_name: fullName,
      address,
      job
    });
    
    setIsEditing(false); // Quay về chế độ Xem sau khi lưu thành công
    
    // Show premium toast feedback
    setToastMessage(t.successMsg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCancelEdit = () => {
    setUsername(profile.username);
    setEmail(profile.email);
    setAvatar(profile.avatar);
    setPhonenumber(profile.phonenumber);
    setFullName(profile.full_name);
    setAddress(profile.address);
    setJob(profile.job);
    setIsEditing(false); // Quay về chế độ Xem sau khi hủy bỏ thay đổi
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordModalOpen(false);
    
    // Show premium password toast feedback
    setToastMessage(t.passwordSuccessMsg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleStickerSelect = (stickerChar: string) => {
    setAvatar(stickerChar);
  };

  const isEmoji = (str: string) => {
    const charCount = [...str].length;
    if (charCount === 1) {
      const codePoint = str.codePointAt(0);
      return codePoint ? codePoint > 0x1f000 : false;
    }
    return false;
  };

  return (
    <div className="profile-tab-content">
      {toastMessage && (
        <div className="profile-toast animate-toast">
          {toastMessage}
        </div>
      )}

      {/* Unified Single Geometric Card */}
      <div className="profile-single-card-board">
        {/* Upper Card Section: Interactive Avatar + Basic info */}
        <div className="profile-single-header">
          {/* Avatar Container */}
          <div className="profile-single-avatar-zone">
            <div 
              className={`profile-card-avatar-container ${isEditing ? 'editable' : 'readonly'}`}
              onClick={isEditing ? handleAvatarClick : undefined}
              title={isEditing ? t.clickToUpload : undefined}
            >
              <div className="profile-card-avatar-display">
                {isEmoji(avatar) ? (
                  <span className="profile-card-emoji">{avatar}</span>
                ) : avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:image/') ? (
                  <img src={avatar} alt="Avatar" className="profile-card-img" />
                ) : (
                  <span className="profile-card-text">{avatar.substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              
              {isEditing && (
                <div className="profile-avatar-hover-overlay">
                  <span className="profile-avatar-overlay-icon">📷</span>
                  <span className="profile-avatar-overlay-text">
                    {lang === 'vi' ? 'Thay ảnh' : 'Change'}
                  </span>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>

            {isEditing && (
              <div className="profile-avatar-hint" style={{ marginTop: '0.6rem', marginBottom: 0 }}>
                💡 {t.clickToUpload}
              </div>
            )}
          </div>

          {/* Quick Info Text Block */}
          <div className="profile-single-info-zone">
            <h2 className="profile-card-fullname">{fullName}</h2>
            <div className="profile-card-username">@{username}</div>
            
            <div className="profile-header-quick-info">
              <div className="profile-quick-item">
                <span className="profile-quick-icon">🦖</span>
                <span className="profile-quick-text">
                  <strong>{t.jobTitle}:</strong> {job}
                </span>
              </div>
              <div className="profile-quick-item">
                <span className="profile-quick-icon">✉️</span>
                <span className="profile-quick-text">
                  <strong>{t.emailTitle}:</strong> {email}
                </span>
              </div>
              <div className="profile-quick-item">
                <span className="profile-quick-icon">📞</span>
                <span className="profile-quick-text">
                  <strong>{t.phoneTitle}:</strong> {phonenumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Sticker Selector (Displayed only in Edit mode) */}
        {isEditing && (
          <div className="profile-sticker-selector-board" style={{ marginTop: '1.2rem', marginBottom: '1.5rem', transform: 'none', boxShadow: '4px 4px 0px #1E293B' }}>
            <h3 className="profile-section-title">{t.avatarSelect}</h3>
            <div className="profile-page-sticker-grid">
              {STICKER_AVATARS.map((sticker) => (
                <button
                  key={sticker.char}
                  type="button"
                  className={`profile-page-sticker-btn ${avatar === sticker.char ? 'active' : ''}`}
                  onClick={() => handleStickerSelect(sticker.char)}
                  title={sticker.name}
                >
                  {sticker.char}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Visual Dashed Memphis Separator */}
        <div className="profile-dashed-separator"></div>

        {/* Form Description */}
        <div className="profile-board-header" style={{ borderBottom: 'none', marginBottom: '1rem', paddingBottom: 0 }}>
          <h3 className="profile-board-title">{t.subTitle}</h3>
        </div>

        {/* Lower Card Section: Detailed fields grid */}
        <form onSubmit={handleSubmit} className="profile-page-form">
          <div className="profile-form-fields-grid">
            
            <div className="profile-page-form-group">
              <label className="profile-page-field-label">{t.username}</label>
              {!isEditing ? (
                <div className="profile-page-static-value">@{username}</div>
              ) : (
                <input
                  type="text"
                  className="profile-page-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder={t.usernamePlaceholder}
                  spellCheck="false"
                />
              )}
            </div>

            <div className="profile-page-form-group">
              <label className="profile-page-field-label">{t.fullName}</label>
              {!isEditing ? (
                <div className="profile-page-static-value">{fullName}</div>
              ) : (
                <input
                  type="text"
                  className="profile-page-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder={t.fullNamePlaceholder}
                  spellCheck="false"
                />
              )}
            </div>

            <div className="profile-page-form-group">
              <label className="profile-page-field-label">{t.email}</label>
              {!isEditing ? (
                <div className="profile-page-static-value">{email}</div>
              ) : (
                <input
                  type="email"
                  className="profile-page-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t.emailPlaceholder}
                  spellCheck="false"
                />
              )}
            </div>

            <div className="profile-page-form-group">
              <label className="profile-page-field-label">{t.phonenumber}</label>
              {!isEditing ? (
                <div className="profile-page-static-value">{phonenumber}</div>
              ) : (
                <input
                  type="text"
                  className="profile-page-input"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  required
                  placeholder={t.phonePlaceholder}
                  spellCheck="false"
                />
              )}
            </div>

            <div className="profile-page-form-group profile-page-group-full">
              <label className="profile-page-field-label">{t.job}</label>
              {!isEditing ? (
                <div className="profile-page-static-value">{job}</div>
              ) : (
                <input
                  type="text"
                  className="profile-page-input"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  required
                  placeholder={t.jobPlaceholder}
                  spellCheck="false"
                />
              )}
            </div>

            <div className="profile-page-form-group profile-page-group-full">
              <label className="profile-page-field-label">{t.address}</label>
              {!isEditing ? (
                <div className="profile-page-static-value profile-page-textarea-static">{address}</div>
              ) : (
                <textarea
                  className="profile-page-input profile-page-textarea"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder={t.addressPlaceholder}
                  spellCheck="false"
                  rows={3}
                />
              )}
            </div>

          </div>

          {/* Form Actions Footer */}
          <div className="profile-page-form-footer" style={{ borderTop: '2px dashed #E2E8F0', paddingTop: '1.5rem', marginTop: '0.6rem' }}>
            {!isEditing ? (
              <>
                <button 
                  type="button" 
                  className="profile-page-btn-secondary" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsPasswordModalOpen(true);
                  }}
                >
                  🔒 {t.changePassword}
                </button>
                <button 
                  type="button" 
                  className="profile-page-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  ✨ {t.editProfile}
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  className="profile-page-btn-secondary" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCancelEdit();
                  }}
                >
                  ❌ {t.cancel}
                </button>
                <button 
                  type="submit" 
                  className="profile-page-btn-primary"
                >
                  💾 {lang === 'vi' ? 'Lưu' : 'Save'}
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsPasswordModalOpen(false)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h3 className="profile-modal-title">🔑 {t.changePassword}</h3>
              <button 
                type="button" 
                className="profile-modal-close-btn" 
                onClick={() => setIsPasswordModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="profile-modal-body">
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.currentPassword}</label>
                  <input
                    type="password"
                    className="profile-page-input"
                    required
                    placeholder={t.passwordPlaceholder}
                    spellCheck="false"
                  />
                </div>
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.newPassword}</label>
                  <input
                    type="password"
                    className="profile-page-input"
                    required
                    placeholder={t.passwordPlaceholder}
                    spellCheck="false"
                  />
                </div>
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.confirmNewPassword}</label>
                  <input
                    type="password"
                    className="profile-page-input"
                    required
                    placeholder={t.passwordPlaceholder}
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="profile-modal-footer">
                <button
                  type="button"
                  className="profile-page-btn-secondary"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  {t.cancel}
                </button>
                <button type="submit" className="profile-page-btn-primary">
                  {t.updatePassword}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileTab;
