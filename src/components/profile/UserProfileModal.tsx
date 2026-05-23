import React, { useState } from 'react';

export interface UserProfile {
  username: string;
  email: string;
  avatar: string;
  phonenumber: string;
  full_name: string;
  address: string;
  job: string;
}

interface UserProfileModalProps {
  isOpen: boolean;
  lang: 'vi' | 'en';
  profile: UserProfile;
  onClose: () => void;
  onSave: (updatedProfile: UserProfile) => void;
}

const translations = {
  vi: {
    title: "Hồ sơ cá nhân",
    subTitle: "Quản lý thông tin tài khoản AutiCare của bạn",
    username: "Tên đăng nhập (Username)",
    email: "Địa chỉ Email",
    avatar: "Ảnh đại diện (Avatar URL)",
    avatarSelect: "Chọn nhãn dán đại diện (Sticker Avatar)",
    phonenumber: "Số điện thoại",
    fullName: "Họ và tên",
    address: "Địa chỉ",
    job: "Nghề nghiệp / Vai trò",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    successMsg: "✨ Cập nhật hồ sơ cá nhân thành công!",
    placeholderText: "Nhập thông tin..."
  },
  en: {
    title: "User Profile",
    subTitle: "Manage your AutiCare account information",
    username: "Username",
    email: "Email Address",
    avatar: "Avatar URL",
    avatarSelect: "Select Sticker Avatar",
    phonenumber: "Phone Number",
    fullName: "Full Name",
    address: "Physical Address",
    job: "Job / Role",
    cancel: "Cancel",
    save: "Save Changes",
    successMsg: "✨ Profile updated successfully!",
    placeholderText: "Enter details..."
  }
};

// Cute medical/care sticker avatar options
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

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  lang,
  profile,
  onClose,
  onSave
}) => {
  const t = translations[lang];

  // Local state initialized with current profile values
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [phonenumber, setPhonenumber] = useState(profile.phonenumber);
  const [fullName, setFullName] = useState(profile.full_name);
  const [address, setAddress] = useState(profile.address);
  const [job, setJob] = useState(profile.job);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

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
    
    // Show premium toast feedback
    setToastMessage(t.successMsg);
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 1800);
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
    <div className="auth-modal-overlay" onClick={onClose}>
      {toastMessage && (
        <div className="profile-toast animate-toast">
          {toastMessage}
        </div>
      )}

      <div 
        className="profile-modal-panel animate-in" 
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif"
        }}
      >
        <div className="profile-modal-header">
          <div className="profile-title-group">
            <h2 className="profile-title">{t.title}</h2>
            <p className="profile-subtitle">{t.subTitle}</p>
          </div>
          <button className="close-profile-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        <form onSubmit={handleSubmit} className="profile-modal-form">
          <div className="profile-avatar-section">
            <div className="profile-avatar-display">
              {isEmoji(avatar) ? (
                <span className="profile-avatar-emoji">{avatar}</span>
              ) : avatar.startsWith('http') || avatar.startsWith('/') ? (
                <img src={avatar} alt="Avatar" className="profile-avatar-img" />
              ) : (
                <span className="profile-avatar-text">{avatar.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            
            <div className="profile-avatar-selector-area">
              <label className="profile-field-label">{t.avatarSelect}</label>
              <div className="profile-sticker-grid">
                {STICKER_AVATARS.map((sticker) => (
                  <button
                    key={sticker.char}
                    type="button"
                    className={`profile-sticker-btn ${avatar === sticker.char ? 'active' : ''}`}
                    onClick={() => handleStickerSelect(sticker.char)}
                    title={sticker.name}
                  >
                    {sticker.char}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-fields-grid">
            <div className="profile-form-group">
              <label className="profile-field-label">{t.username}</label>
              <input
                type="text"
                className="profile-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder={t.placeholderText}
                spellCheck="false"
              />
            </div>

            <div className="profile-form-group">
              <label className="profile-field-label">{t.fullName}</label>
              <input
                type="text"
                className="profile-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder={t.placeholderText}
                spellCheck="false"
              />
            </div>

            <div className="profile-form-group">
              <label className="profile-field-label">{t.email}</label>
              <input
                type="email"
                className="profile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t.placeholderText}
                spellCheck="false"
              />
            </div>

            <div className="profile-form-group">
              <label className="profile-field-label">{t.phonenumber}</label>
              <input
                type="text"
                className="profile-input"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                required
                placeholder={t.placeholderText}
                spellCheck="false"
              />
            </div>

            <div className="profile-form-group profile-group-full">
              <label className="profile-field-label">{t.job}</label>
              <input
                type="text"
                className="profile-input"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
                placeholder={t.placeholderText}
                spellCheck="false"
              />
            </div>

            <div className="profile-form-group profile-group-full">
              <label className="profile-field-label">{t.address}</label>
              <textarea
                className="profile-input profile-textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder={t.placeholderText}
                spellCheck="false"
                rows={2}
              />
            </div>
            
            <div className="profile-form-group profile-group-full" style={{ marginTop: '0.2rem' }}>
              <label className="profile-field-label">{t.avatar}</label>
              <input
                type="text"
                className="profile-input"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                spellCheck="false"
              />
            </div>
          </div>

          <div className="profile-modal-footer">
            <button 
              type="button" 
              className="profile-btn-secondary" 
              onClick={onClose}
            >
              {t.cancel}
            </button>
            <button 
              type="submit" 
              className="profile-btn-primary"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileModal;
