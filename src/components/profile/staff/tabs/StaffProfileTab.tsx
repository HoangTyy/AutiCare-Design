import React, { useState, useRef } from 'react';
import type { StaffProfile } from '../StaffProfilePage';

interface StaffProfileTabProps {
  lang: 'vi' | 'en';
  profile: StaffProfile;
  onSave: (updatedProfile: StaffProfile) => void;
}

const translations = {
  vi: {
    title: "Thành viên Ban chuyên môn AutiCare",
    subtitle: "Quản lý thông tin học thuật và hồ sơ năng lực lâm sàng của bạn",
    lblFullName: "Họ và tên chuyên gia",
    lblUsername: "Tên tài khoản (Username)",
    lblEmail: "Địa chỉ Email học thuật",
    lblPhone: "Số điện thoại liên hệ",
    lblTitle: "Học vị & Chức danh chuyên môn",
    lblSpecialty: "Chuyên khoa / Lĩnh vực can thiệp",
    lblExperience: "Thâm niên & Kinh nghiệm lâm sàng",
    lblBio: "Giới thiệu bản thân & Hướng nghiên cứu",
    lblWorkplace: "Nơi công tác (Cơ sở AutiCare)",
    placeholderFullName: "Ví dụ: TS. BS. Nguyễn Minh Anh",
    placeholderPhone: "Ví dụ: 0903.123.456",
    placeholderTitle: "Ví dụ: Tiến sĩ - Bác sĩ Nhi khoa",
    placeholderSpecialty: "Ví dụ: Chẩn đoán & Can thiệp sớm tự kỷ",
    placeholderExperience: "Ví dụ: 10 năm kinh nghiệm",
    placeholderBio: "Hãy chia sẻ đôi nét về bản thân và phương châm làm việc của bạn...",
    btnEdit: "✨ Chỉnh sửa hồ sơ",
    btnChangePassword: "🔒 Thay đổi mật khẩu",
    btnCancel: "❌ Hủy thay đổi",
    btnSave: "💾 Lưu hồ sơ chuyên gia",
    toastSuccess: "✨ Đã cập nhật hồ sơ chuyên gia thành công!",
    toastPasswordSuccess: "✨ Thay đổi mật khẩu bảo mật thành công!",
    avatarHint: "Nhấp để thay ảnh đại diện",
    avatarLabel: "Ảnh đại diện hoạt hình:",
    passwordModalTitle: "Thay đổi mật khẩu chuyên gia",
    passCurrent: "Mật khẩu hiện tại",
    passNew: "Mật khẩu mới",
    passConfirm: "Xác nhận mật khẩu mới",
    passReq: "Trường này là bắt buộc",
    passNotMatch: "Xác nhận mật khẩu mới không khớp!"
  },
  en: {
    title: "AutiCare Specialist Committee Member",
    subtitle: "Manage your academic qualifications and clinical capability profile",
    lblFullName: "Specialist Full Name",
    lblUsername: "Account Username",
    lblEmail: "Academic Email Address",
    lblPhone: "Contact Phone Number",
    lblTitle: "Degree & Professional Title",
    lblSpecialty: "Specialty / Intervention Domain",
    lblExperience: "Clinical Tenure & Experience",
    lblBio: "Biography & Research Interest",
    lblWorkplace: "Affiliated Center (AutiCare)",
    placeholderFullName: "e.g. PhD. MD. Nguyen Minh Anh",
    placeholderPhone: "e.g. 0903.123.456",
    placeholderTitle: "e.g. PhD in Pediatrics",
    placeholderSpecialty: "e.g. Early Diagnosis & Behavior Intervention",
    placeholderExperience: "e.g. 10 years of experience",
    placeholderBio: "Share a few words about yourself and your professional philosophy...",
    btnEdit: "✨ Edit Profile",
    btnChangePassword: "🔒 Change Password",
    btnCancel: "❌ Cancel Changes",
    btnSave: "💾 Save Specialist Profile",
    toastSuccess: "✨ Specialist profile updated successfully!",
    toastPasswordSuccess: "✨ Security password updated successfully!",
    avatarHint: "Click to upload avatar",
    avatarLabel: "Choose Cartoon Avatar:",
    passwordModalTitle: "Change Specialist Password",
    passCurrent: "Current Password",
    passNew: "New Password",
    passConfirm: "Confirm New Password",
    passReq: "This field is required",
    passNotMatch: "Passwords do not match!"
  }
};

const STICKER_AVATARS = ['👩‍⚕️', '👨‍⚕️', '🧠', '🔬', '🎓', '🩺', '🧩', '🌟'];

const StaffProfileTab: React.FC<StaffProfileTabProps> = ({
  lang,
  profile,
  onSave
}) => {
  const t = translations[lang];
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<StaffProfile>({ ...profile });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Password Change Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarSelect = (avatar: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar
    }));
  };

  const triggerFileInput = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
    setToastMessage(t.toastSuccess);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      setPasswordError(t.passReq);
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError(t.passNotMatch);
      return;
    }
    
    // Simulate successful password change
    setIsPasswordModalOpen(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
    setPasswordError('');
    
    setToastMessage(t.toastPasswordSuccess);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const isBase64Avatar = formData.avatar.startsWith('data:image');

  return (
    <div className="profile-tab-wrapper">
      
      {/* 3D Memphis Floating Toast Message */}
      {showToast && (
        <div className="profile-toast-message shadow-bounce">
          <span className="profile-toast-icon">🎉</span>
          <span className="profile-toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Profile Form Container */}
      <form onSubmit={handleSubmit} className="profile-form-element">
        
        {/* Single Card Board Layout */}
        <div className="profile-single-card-board">
          
          {/* Card Top: Avatar & Academic Header Block */}
          <div className="profile-card-top-block">
            
            {/* Round Avatar Container */}
            <div 
              className={`profile-card-avatar-container ${isEditing ? 'editable' : 'readonly'}`}
              onClick={triggerFileInput}
            >
              {isBase64Avatar ? (
                <img 
                  src={formData.avatar} 
                  alt="Specialist Avatar" 
                  className="profile-card-avatar-display"
                />
              ) : (
                <div className="profile-card-avatar-display emoji-avatar">
                  {formData.avatar}
                </div>
              )}

              {isEditing && (
                <div className="profile-avatar-hover-overlay">
                  <span className="profile-avatar-cam-icon">📷</span>
                  <span className="profile-avatar-hint-text">{lang === 'vi' ? 'Thay ảnh' : 'Change'}</span>
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

            {/* Specialist Quick Metadata */}
            <div className="profile-card-user-meta">
              <h2 className="profile-meta-fullname">{formData.full_name || "Chuyên gia AutiCare"}</h2>
              <div className="profile-meta-username-badge">@{formData.username}</div>
              
              <div className="profile-meta-quick-info">
                <span className="quick-info-item">
                  🎓 <strong>{t.lblTitle}:</strong> {formData.title || "---"}
                </span>
                <span className="quick-info-item">
                  🧬 <strong>{t.lblSpecialty}:</strong> {formData.specialty || "---"}
                </span>
                <span className="quick-info-item">
                  🏢 <strong>{t.lblWorkplace}:</strong> {formData.workplace}
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle description */}
          <div className="profile-card-intro-banner">
            <h3 className="intro-banner-title">{t.title}</h3>
            <p className="intro-banner-sub">{t.subtitle}</p>
          </div>

          {/* Memphis Dashed Tear Separator */}
          <div className="profile-dashed-separator"></div>

          {/* Card Body: Dynamic form or Static display block grid */}
          <div className="profile-card-body-block">
            
            {/* Lưới 2 cột cho các thông tin biểu mẫu */}
            <div className="profile-fields-grid">
              
              {/* Field 1: Họ và tên */}
              <div className="profile-field-group">
                <label className="profile-field-label">{t.lblFullName}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="profile-page-input"
                    placeholder={t.placeholderFullName}
                    required
                  />
                ) : (
                  <div className="profile-page-static-value">{formData.full_name}</div>
                )}
              </div>

              {/* Field 2: Tên tài khoản */}
              <div className="profile-field-group">
                <label className="profile-field-label">{t.lblUsername}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="profile-page-input"
                    disabled
                  />
                ) : (
                  <div className="profile-page-static-value disabled-style">@{formData.username}</div>
                )}
              </div>

              {/* Field 3: Email */}
              <div className="profile-field-group">
                <label className="profile-field-label">{t.lblEmail}</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="profile-page-input"
                    disabled
                  />
                ) : (
                  <div className="profile-page-static-value disabled-style">{formData.email}</div>
                )}
              </div>

              {/* Field 4: Điện thoại */}
              <div className="profile-field-group">
                <label className="profile-field-label">{t.lblPhone}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                    className="profile-page-input"
                    placeholder={t.placeholderPhone}
                  />
                ) : (
                  <div className="profile-page-static-value">{formData.phonenumber || "---"}</div>
                )}
              </div>

              {/* Field 5: Học vị / Chức danh */}
              <div className="profile-field-group">
                <label className="profile-field-label">{t.lblTitle}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="profile-page-input"
                    placeholder={t.placeholderTitle}
                  />
                ) : (
                  <div className="profile-page-static-value">{formData.title || "---"}</div>
                )}
              </div>

              {/* Field 6: Chuyên khoa */}
              <div className="profile-field-group">
                <label className="profile-field-label">{t.lblSpecialty}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="profile-page-input"
                    placeholder={t.placeholderSpecialty}
                  />
                ) : (
                  <div className="profile-page-static-value">{formData.specialty || "---"}</div>
                )}
              </div>

              {/* Field 7: Thâm niên */}
              <div className="profile-field-group">
                <label className="profile-field-label">{t.lblExperience}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="profile-page-input"
                    placeholder={t.placeholderExperience}
                  />
                ) : (
                  <div className="profile-page-static-value">{formData.experience || "---"}</div>
                )}
              </div>

              {/* Field 8: Nơi công tác */}
              <div className="profile-field-group">
                <label className="profile-field-label">{t.lblWorkplace}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="workplace"
                    value={formData.workplace}
                    onChange={handleInputChange}
                    className="profile-page-input"
                    disabled
                  />
                ) : (
                  <div className="profile-page-static-value disabled-style">{formData.workplace}</div>
                )}
              </div>

              {/* Field 9: Giới thiệu bản thân (Span 2) */}
              <div className="profile-field-group span-2">
                <label className="profile-field-label">{t.lblBio}</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="profile-page-textarea"
                    placeholder={t.placeholderBio}
                    rows={4}
                  />
                ) : (
                  <div className="profile-page-static-value profile-page-textarea-static">{formData.bio || "---"}</div>
                )}
              </div>

            </div>

            {/* Avatar Selector Block (Chỉ hiển thị khi chỉnh sửa) */}
            {isEditing && (
              <div className="profile-avatar-selector-block">
                <span className="avatar-selector-label">{t.avatarLabel}</span>
                <div className="avatar-selector-grid">
                  {STICKER_AVATARS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`avatar-selector-btn ${formData.avatar === emoji ? 'active' : ''}`}
                      onClick={() => handleAvatarSelect(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Memphis Dashed Tear Separator */}
          <div className="profile-dashed-separator"></div>

          {/* Card Footer: Action Buttons */}
          <div className="profile-card-footer-block">
            {isEditing ? (
              <div className="profile-action-buttons">
                <button 
                  type="button" 
                  className="profile-cancel-candy-btn"
                  onClick={handleCancel}
                >
                  {t.btnCancel}
                </button>
                <button 
                  type="submit" 
                  className="profile-save-candy-btn"
                >
                  {t.btnSave}
                </button>
              </div>
            ) : (
              <div className="profile-action-buttons">
                <button 
                  type="button" 
                  className="profile-password-candy-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsPasswordModalOpen(true);
                  }}
                >
                  {t.btnChangePassword}
                </button>
                
                <button 
                  type="button" 
                  className="profile-edit-candy-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  {t.btnEdit}
                </button>
              </div>
            )}
          </div>

        </div>
      </form>

      {/* 3D Memphis Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-shell password-modal-shell scale-bounce">
            
            {/* Modal Header */}
            <div className="profile-modal-header password-modal-header">
              <h3 className="profile-modal-title">{t.passwordModalTitle}</h3>
              <button 
                type="button" 
                className="profile-modal-close-btn"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handlePasswordSubmit} className="profile-modal-form">
              <div className="profile-modal-body">
                {passwordError && (
                  <div className="profile-modal-error-banner shake-anim">
                    ⚠️ {passwordError}
                  </div>
                )}
                
                <div className="modal-field-group">
                  <label>{t.passCurrent} *</label>
                  <input 
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                    className="modal-field-input"
                    required
                  />
                </div>

                <div className="modal-field-group">
                  <label>{t.passNew} *</label>
                  <input 
                    type="password"
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                    className="modal-field-input"
                    required
                  />
                </div>

                <div className="modal-field-group">
                  <label>{t.passConfirm} *</label>
                  <input 
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                    className="modal-field-input"
                    required
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="profile-modal-footer">
                <button 
                  type="button" 
                  className="modal-cancel-btn"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  {t.btnCancel}
                </button>
                <button 
                  type="submit" 
                  className="modal-submit-btn"
                >
                  {lang === 'vi' ? 'Xác nhận đổi 🔐' : 'Confirm Change 🔐'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default StaffProfileTab;
