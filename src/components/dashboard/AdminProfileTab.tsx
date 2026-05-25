import React, { useState } from 'react';

export type MockRole = 'admin' | 'director' | 'doctor' | 'teacher';

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
  role?: MockRole;
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
    selectAvatarHint: 'Chọn một biểu tượng emoji đại diện:',
    
    // New upload features & hints
    systemFieldHint: '🔒 Thông tin hệ thống (Không thể tự chỉnh sửa)',
    uploadHint: 'Tải ảnh lên 📷',
    orChooseEmoji: 'hoặc chọn biểu tượng emoji đại diện bên dưới:',
    
    // Role Simulator
    roleSwitcherTitle: '🎭 Giả lập Vai trò',
    roleAdmin: '🔑 Admin Hệ thống',
    roleDirector: '🏢 Giám đốc Trung tâm',
    roleDoctor: '🩺 Bác sĩ Lâm sàng',
    roleTeacher: '🎓 Giáo viên Can thiệp',
    simulationBadge: 'Giả lập',

    // Change Password
    btnChangePassword: '🔒 Đổi mật khẩu',
    changePasswordTitle: '🔒 ĐỔI MẬT KHẨU TÀI KHOẢN',
    changePasswordSubtitle: 'Hãy thiết lập mật khẩu mới bảo mật hơn cho tài khoản của bạn',
    currentPassword: 'Mật khẩu hiện tại',
    newPassword: 'Mật khẩu mới',
    confirmPassword: 'Xác nhận mật khẩu mới',
    placeholderCurrentPassword: 'Nhập mật khẩu đang dùng',
    placeholderNewPassword: 'Nhập mật khẩu mới (tối thiểu 6 ký tự)',
    placeholderConfirmPassword: 'Nhập lại mật khẩu mới',
    btnConfirmChange: '💾 Xác nhận đổi',
    toastPasswordSuccess: '🔑 Đã đổi mật khẩu Admin thành công!',
    errorPasswordMismatch: '❌ Mật khẩu mới và xác nhận mật khẩu không khớp!',
    errorPasswordLength: '❌ Mật khẩu mới phải có ít nhất 6 ký tự!',
    errorPasswordEmpty: '❌ Vui lòng điền đầy đủ các trường mật khẩu!',
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
    selectAvatarHint: 'Choose an avatar emoji representative:',
    
    // New upload features & hints
    systemFieldHint: '🔒 System property (Cannot be edited)',
    uploadHint: 'Upload Photo 📷',
    orChooseEmoji: 'or select an avatar emoji representative below:',

    // Role Simulator
    roleSwitcherTitle: '🎭 Simulate Role',
    roleAdmin: '🔑 System Admin',
    roleDirector: '🏢 Center Director',
    roleDoctor: '🩺 Clinical Doctor',
    roleTeacher: '🎓 Intervention Teacher',
    simulationBadge: 'Simulated',

    // Change Password
    btnChangePassword: '🔒 Change Password',
    changePasswordTitle: '🔒 CHANGE ACCOUNT PASSWORD',
    changePasswordSubtitle: 'Set a more secure new password for your administrator account',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    placeholderCurrentPassword: 'Enter current password',
    placeholderNewPassword: 'Enter new password (min 6 characters)',
    placeholderConfirmPassword: 'Re-enter new password',
    btnConfirmChange: '💾 Confirm Change',
    toastPasswordSuccess: '🔑 Admin password changed successfully!',
    errorPasswordMismatch: '❌ New password and confirmation do not match!',
    errorPasswordLength: '❌ New password must be at least 6 characters!',
    errorPasswordEmpty: '❌ Please fill in all password fields!',
  }
};

const AVAILABLE_EMOJIS = ['⚡', '🛡️', '⚙️', '🧩', '🩺', '🦁', '🦉', '🎓', '🚀', '🌟', '🍀', '🦕'];

const MOCK_PROFILES: Record<'vi' | 'en', Record<MockRole, AdminProfile>> = {
  vi: {
    admin: {
      username: 'auticare_admin',
      email: 'admin@auticare.vn',
      avatar: '⚡',
      phone_number: '028.3930.1234',
      full_name: "Quản trị viên AutiCare",
      qualification: 'Thạc sĩ Quản lý Giáo dục Đặc biệt',
      experience_years: 10,
      invite_code: 'ATC-ADMIN',
      description: 'Quản trị viên cấp cao của hệ thống AutiCare, chịu trách nhiệm vận hành nền tảng can thiệp sớm toàn quốc.',
      center_name: 'AutiCare Central Saigon',
      role: 'admin'
    },
    director: {
      username: 'director_bao',
      email: 'bao.tq@auticare.vn',
      avatar: '🛡️',
      phone_number: '0903.888.999',
      full_name: "Giám đốc Trần Quốc Bảo",
      qualification: 'Thạc sĩ Quản trị Giáo dục',
      experience_years: 15,
      invite_code: 'ATC-DIR01',
      description: 'Giám đốc trực thuộc trung tâm AutiCare Central Saigon, chịu trách nhiệm điều phối hoạt động can thiệp và chuyên môn lâm sàng.',
      center_name: 'AutiCare Central Saigon',
      role: 'director'
    },
    doctor: {
      username: 'dr_minhanh',
      email: 'minhanh.dr@auticare.vn',
      avatar: '🩺',
      phone_number: '0912.345.678',
      full_name: "ThS. BS. Nguyễn Minh Anh",
      qualification: 'Thạc sĩ Y khoa - Bác sĩ Tâm thần Nhi',
      experience_years: 12,
      invite_code: 'ATC-DR02',
      description: 'Chuyên gia chẩn đoán và điều trị nhi khoa với hơn 12 năm kinh nghiệm trong lĩnh vực phổ tự kỷ ở trẻ em.',
      center_name: 'AutiCare Central Saigon',
      role: 'doctor'
    },
    teacher: {
      username: 'teacher_maichi',
      email: 'maichi.edu@auticare.vn',
      avatar: '🎓',
      phone_number: '0987.654.321',
      full_name: "Cô giáo Lê Thị Mai Chi",
      qualification: 'Cử nhân Giáo dục Đặc biệt',
      experience_years: 6,
      invite_code: 'ATC-TCH03',
      description: 'Giáo viên can thiệp sớm tận tâm, chuyên sâu về phương pháp ABA và PECS giúp trẻ phát triển giao tiếp và hành vi tích cực.',
      center_name: 'AutiCare Central Saigon',
      role: 'teacher'
    }
  },
  en: {
    admin: {
      username: 'auticare_admin',
      email: 'admin@auticare.vn',
      avatar: '⚡',
      phone_number: '028.3930.1234',
      full_name: "AutiCare's System Admin",
      qualification: 'Master of Special Education Management',
      experience_years: 10,
      invite_code: 'ATC-ADMIN',
      description: 'Senior administrator of the AutiCare system, responsible for operational maintenance and platform management.',
      center_name: 'AutiCare Central Saigon',
      role: 'admin'
    },
    director: {
      username: 'director_bao',
      email: 'bao.tq@auticare.vn',
      avatar: '🛡️',
      phone_number: '0903.888.999',
      full_name: "Director Tran Quoc Bao",
      qualification: 'Master of Educational Administration',
      experience_years: 15,
      invite_code: 'ATC-DIR01',
      description: 'Center Director at AutiCare Central Saigon, responsible for clinical operations and early intervention program coordination.',
      center_name: 'AutiCare Central Saigon',
      role: 'director'
    },
    doctor: {
      username: 'dr_minhanh',
      email: 'minhanh.dr@auticare.vn',
      avatar: '🩺',
      phone_number: '0912.345.678',
      full_name: "Dr. Nguyen Minh Anh, MD",
      qualification: 'MD, MSc - Child Psychiatrist / Clinical Autism Specialist',
      experience_years: 12,
      invite_code: 'ATC-DR02',
      description: 'Pediatric specialist with over 12 years of experience in childhood autism screening, diagnosis, and medical advice.',
      center_name: 'AutiCare Central Saigon',
      role: 'doctor'
    },
    teacher: {
      username: 'teacher_maichi',
      email: 'maichi.edu@auticare.vn',
      avatar: '🎓',
      phone_number: '0987.654.321',
      full_name: "Teacher Le Thi Mai Chi",
      qualification: 'Bachelor of Special Education',
      experience_years: 6,
      invite_code: 'ATC-TCH03',
      description: 'Dedicated early childhood education teacher specialized in ABA and PECS methodologies to support social communication goals.',
      center_name: 'AutiCare Central Saigon',
      role: 'teacher'
    }
  }
};

export const AdminProfileTab: React.FC<AdminProfileTabProps> = ({ lang, profile, onSave }) => {
  const [formData, setFormData] = useState<AdminProfile>({ ...profile });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // State for mock role simulation
  const [activeRole, setActiveRole] = useState<MockRole>('admin');
  const [showRolePicker, setShowRolePicker] = useState(false);

  // States for change password modal
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  // States for edit profile modal (MỚI)
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<AdminProfile>({ ...profile });

  // Ref cho file input upload hình ảnh
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const t = translations[lang];

  // Helper check if string is base64 or image url
  const isImageAvatar = (avatarVal: string) => {
    return avatarVal && (avatarVal.startsWith('data:image/') || avatarVal.startsWith('http://') || avatarVal.startsWith('https://') || avatarVal.startsWith('/'));
  };

  // Helper render avatar thông minh
  const renderAvatar = (avatarValue: string, classNameStr: string = 'profile-avatar-display') => {
    if (isImageAvatar(avatarValue)) {
      return (
        <img 
          src={avatarValue} 
          alt="Avatar" 
          className={classNameStr} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }} 
        />
      );
    }
    return <span className={classNameStr}>{avatarValue || '⚡'}</span>;
  };

  // Xử lý đọc file và chuyển thành chuỗi Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEditFormData((prev) => ({
          ...prev,
          avatar: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Sync sample dynamic profiles reactively based on activeRole and lang (only when NOT editing)
  React.useEffect(() => {
    if (!showEditModal) {
      const targetProfile = MOCK_PROFILES[lang][activeRole];
      setFormData(targetProfile);
    }
  }, [lang, activeRole, showEditModal]);

  // Reactive role selection handler that immediately syncs metadata back to Dashboard sidebar
  const selectRole = (role: MockRole) => {
    setActiveRole(role);
    setShowRolePicker(false);
    setShowEditModal(false); // Close edit modal if open
    
    const newProfile = MOCK_PROFILES[lang][role];
    setFormData(newProfile);
    
    // Synchronize to parent dashboard to instantly update sidebar footer AD info!
    onSave(newProfile);
  };

  // Open Edit Modal with fresh snapshot of current profile data
  const openEditModal = () => {
    setEditFormData({ ...formData });
    setShowEditModal(true);
  };

  // Edit Modal form change handlers
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === 'experience_years' ? (parseInt(value) || 0) : value
    }));
  };

  const handleEditEmojiSelect = (emoji: string) => {
    setEditFormData((prev) => ({
      ...prev,
      avatar: emoji
    }));
  };

  // Edit Modal form submit handler
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editFormData); // Sync back to Dashboard parent sidebar
    setFormData(editFormData); // Update static view card
    setShowEditModal(false);
    setToastMessage(t.toastSaveSuccess);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Password submission handler
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError(t.errorPasswordEmpty);
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError(t.errorPasswordLength);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError(t.errorPasswordMismatch);
      return;
    }
    
    // Success flow
    setPasswordError('');
    setShowChangePasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setToastMessage(t.toastPasswordSuccess);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Helper check logic for dynamic fields
  const shouldShowField = (fieldName: keyof AdminProfile) => {
    if (fieldName === 'full_name' || fieldName === 'username' || fieldName === 'email' || fieldName === 'phone_number' || fieldName === 'avatar') {
      return true; // Basic profile info is always visible
    }
    if (fieldName === 'center_name') {
      return activeRole === 'director' || activeRole === 'doctor' || activeRole === 'teacher';
    }
    // Deep clinical/academic fields (qualification, experience_years, invite_code, description)
    return activeRole === 'doctor' || activeRole === 'teacher';
  };

  // Helper labels mapping for visual display
  const getRoleLabel = () => {
    switch (activeRole) {
      case 'admin':
        return lang === 'vi' ? 'Quản trị hệ thống' : 'System Admin';
      case 'director':
        return lang === 'vi' ? 'Giám đốc trung tâm' : 'Center Director';
      case 'doctor':
        return lang === 'vi' ? 'Bác sĩ lâm sàng' : 'Clinical Doctor';
      case 'teacher':
        return lang === 'vi' ? 'Giáo viên can thiệp' : 'Intervention Teacher';
      default:
        return 'Administrator';
    }
  };

  const getDynamicTitle = () => {
    if (lang === 'vi') {
      switch (activeRole) {
        case 'admin': return 'HỒ SƠ CÁ NHÂN ADMIN';
        case 'director': return 'HỒ SƠ CÁ NHÂN GIÁM ĐỐC';
        case 'doctor': return 'HỒ SƠ CÁ NHÂN BÁC SĨ';
        case 'teacher': return 'HỒ SƠ CÁ NHÂN GIÁO VIÊN';
        default: return 'HỒ SƠ CÁ NHÂN ADMIN';
      }
    } else {
      switch (activeRole) {
        case 'admin': return 'ADMIN PROFILE';
        case 'director': return 'DIRECTOR PROFILE';
        case 'doctor': return 'DOCTOR PROFILE';
        case 'teacher': return 'TEACHER PROFILE';
        default: return 'ADMIN PROFILE';
      }
    }
  };

  const getDynamicSubtitle = () => {
    if (lang === 'vi') {
      switch (activeRole) {
        case 'admin': return 'Quản lý thông tin tài khoản quản trị hệ thống AutiCare';
        case 'director': return 'Quản lý thông tin tài khoản giám đốc trung tâm AutiCare';
        case 'doctor': return 'Quản lý thông tin tài khoản bác sĩ lâm sàng AutiCare';
        case 'teacher': return 'Quản lý thông tin tài khoản giáo viên can thiệp AutiCare';
        default: return 'Quản lý thông tin tài khoản quản trị hệ thống AutiCare';
      }
    } else {
      switch (activeRole) {
        case 'admin': return 'Manage your AutiCare platform administrator account details';
        case 'director': return 'Manage your AutiCare center director account details';
        case 'doctor': return 'Manage your AutiCare clinical doctor account details';
        case 'teacher': return 'Manage your AutiCare intervention teacher account details';
        default: return 'Manage your AutiCare platform administrator account details';
      }
    }
  };



  return (
    <div className="dashboard-content-area admin-profile-container">
      {showToast && (
        <div className="profile-toast-floating animate-bounce">
          {toastMessage}
        </div>
      )}

      <div className="profile-header-zone">
        <div className="profile-header-meta">
          <h2 className="profile-main-title">{getDynamicTitle()}</h2>
          <p className="profile-main-subtitle">{getDynamicSubtitle()}</p>
        </div>
      </div>

      <div className="admin-profile-form">
        {/* Floating Island Layout */}
        <div className="profile-island-card" style={{ position: 'relative' }}>
          
          {/* Role Switcher ẩn ở góc phải */}
          <div className="profile-role-switcher-container">
            <button
              type="button"
              className="btn-switch-role-trigger"
              onClick={() => setShowRolePicker(!showRolePicker)}
              title={t.roleSwitcherTitle}
            >
              ⚙️
            </button>
            
            {showRolePicker && (
              <div className="role-picker-dropdown">
                <div className="dropdown-title">{t.roleSwitcherTitle}</div>
                <button
                  type="button"
                  className={`dropdown-role-item ${activeRole === 'admin' ? 'active' : ''}`}
                  onClick={() => selectRole('admin')}
                >
                  {t.roleAdmin}
                </button>
                <button
                  type="button"
                  className={`dropdown-role-item ${activeRole === 'director' ? 'active' : ''}`}
                  onClick={() => selectRole('director')}
                >
                  {t.roleDirector}
                </button>
                <button
                  type="button"
                  className={`dropdown-role-item ${activeRole === 'doctor' ? 'active' : ''}`}
                  onClick={() => selectRole('doctor')}
                >
                  {t.roleDoctor}
                </button>
                <button
                  type="button"
                  className={`dropdown-role-item ${activeRole === 'teacher' ? 'active' : ''}`}
                  onClick={() => selectRole('teacher')}
                >
                  {t.roleTeacher}
                </button>
              </div>
            )}
          </div>
          
          {/* Top Zone: Avatar and Basic Info */}
          <div className="profile-top-bar-details">
            <div className="profile-avatar-circle-wrapper">
              {renderAvatar(formData.avatar, 'profile-avatar-display')}
            </div>
            
            <div className="profile-quick-intro-info">
              <h3 className="profile-display-name">
                {formData.full_name || (lang === 'vi' ? 'Chưa Cập Nhật' : 'Not Updated')}
              </h3>
              <p className="profile-display-username">@{formData.username}</p>
              <div className="profile-badges-row">
                <span className="profile-badge-pill role-pill">{getRoleLabel()}</span>
                {activeRole !== 'doctor' && activeRole !== 'teacher' && (
                  <span className="profile-badge-pill simulation-pill">
                    🎭 {t.simulationBadge}
                  </span>
                )}
                {formData.center_name && shouldShowField('center_name') && (
                  <span className="profile-badge-pill center-pill">🏢 {formData.center_name}</span>
                )}
              </div>
            </div>
          </div>

          {/* Solid separator line */}
          <div className="profile-section-divider"></div>

          {/* Content Zone: 2 Column Fields Grid (100% Static View Mode) */}
          <div className="profile-fields-grid">
            
            {/* Field 1: Full Name */}
            {shouldShowField('full_name') && (
              <div className="form-group-item">
                <label>{t.full_name}</label>
                <div className="static-field-value">{formData.full_name || '—'}</div>
              </div>
            )}

            {/* Field 2: Username */}
            {shouldShowField('username') && (
              <div className="form-group-item">
                <label>{t.username}</label>
                <div className="static-field-value">@{formData.username}</div>
              </div>
            )}

            {/* Field 3: Email */}
            {shouldShowField('email') && (
              <div className="form-group-item">
                <label>{t.email}</label>
                <div className="static-field-value">{formData.email}</div>
              </div>
            )}

            {/* Field 4: Phone Number */}
            {shouldShowField('phone_number') && (
              <div className="form-group-item">
                <label>{t.phone_number}</label>
                <div className="static-field-value">{formData.phone_number || '—'}</div>
              </div>
            )}

            {/* Field 5: Qualification */}
            {shouldShowField('qualification') && (
              <div className="form-group-item">
                <label>{t.qualification}</label>
                <div className="static-field-value">{formData.qualification || '—'}</div>
              </div>
            )}

            {/* Field 6: Experience Years */}
            {shouldShowField('experience_years') && (
              <div className="form-group-item">
                <label>{t.experience_years}</label>
                <div className="static-field-value">
                  {formData.experience_years} {lang === 'vi' ? 'năm' : 'years'}
                </div>
              </div>
            )}

            {/* Field 7: Affiliated Center */}
            {shouldShowField('center_name') && (
              <div className="form-group-item">
                <label>{t.center_name}</label>
                <div className="static-field-value">{formData.center_name || '—'}</div>
              </div>
            )}

            {/* Field 8: System Invite Code */}
            {shouldShowField('invite_code') && (
              <div className="form-group-item">
                <label>{t.invite_code}</label>
                <div className="static-field-value secure-invite-field">{formData.invite_code || '—'}</div>
              </div>
            )}

            {/* Field 9: Description (Span 2) */}
            {shouldShowField('description') && (
              <div className="form-group-item full-width-field">
                <label>{t.description}</label>
                <div className="static-field-value text-area-static">{formData.description || '—'}</div>
              </div>
            )}

          </div>

          {/* Bottom Footer Actions */}
          <div className="profile-footer-actions">
            <button
              type="button"
              className="profile-btn-secondary candy-btn-change-password"
              onClick={() => setShowChangePasswordModal(true)}
              style={{ marginRight: '1rem' }}
            >
              {t.btnChangePassword}
            </button>
            <button
              type="button"
              className="profile-btn-primary candy-btn-edit"
              onClick={openEditModal}
            >
              {t.btnEdit}
            </button>
          </div>

        </div>
      </div>

      {/* Modal Đổi mật khẩu Memphis Neo-Brutalist */}
      {showChangePasswordModal && (
        <div className="profile-admin-modal-overlay">
          <div className="profile-admin-modal-shell change-password-modal animate-scale-bounce">
            
            <div className="modal-header-band">
              <h3 className="modal-title">{t.changePasswordTitle}</h3>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setShowChangePasswordModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body-content">
              <p className="modal-subtitle-text">{t.changePasswordSubtitle}</p>
              
              {passwordError && (
                <div className="modal-error-banner animate-shake">
                  {passwordError}
                </div>
              )}
              
              <div className="modal-form-fields">
                <div className="modal-form-group">
                  <label>{t.currentPassword}</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder={t.placeholderCurrentPassword}
                    required
                  />
                </div>
                
                <div className="modal-form-group">
                  <label>{t.newPassword}</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder={t.placeholderNewPassword}
                    required
                  />
                </div>
                
                <div className="modal-form-group">
                  <label>{t.confirmPassword}</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder={t.placeholderConfirmPassword}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer-actions">
              <button
                type="button"
                className="modal-btn-cancel candy-btn-cancel"
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setPasswordError('');
                }}
              >
                {t.btnCancel}
              </button>
              <button
                type="button"
                className="modal-btn-confirm candy-btn-save"
                onClick={handlePasswordSubmit}
              >
                {t.btnConfirmChange}
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Modal Chỉnh sửa Hồ sơ Memphis Neo-Brutalist */}
      {showEditModal && (
        <div className="profile-admin-modal-overlay">
          <div className="profile-admin-modal-shell edit-profile-modal animate-scale-bounce">
            
            <div className="modal-header-band">
              <h3 className="modal-title">✏️ {t.editMode}</h3>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="modal-scrollable-body">
              {/* Avatar Zone Picker */}
              <div className="modal-avatar-picker-zone">
                <div 
                  className="modal-avatar-display-wrapper interactive-avatar-wrapper"
                  onClick={() => fileInputRef.current?.click()}
                  title={t.uploadHint}
                >
                  {renderAvatar(editFormData.avatar, 'modal-avatar-display')}
                  <div className="modal-avatar-hover-overlay">
                    <span className="overlay-camera-icon">📷</span>
                    <span className="overlay-text">{t.uploadHint}</span>
                  </div>
                </div>
                
                {/* Input file ẩn phục vụ upload ảnh */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />

                <div className="modal-emoji-picker-container">
                  <label className="picker-label">{t.orChooseEmoji}</label>
                  <div className="modal-emoji-picker-grid">
                    {AVAILABLE_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={`modal-emoji-selector-btn ${editFormData.avatar === emoji ? 'selected' : ''}`}
                        onClick={() => handleEditEmojiSelect(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Solid separator line */}
              <div className="profile-section-divider" style={{ margin: '0.5rem 0' }}></div>
              
              {/* Fields Grid */}
              <div className="modal-fields-grid-2col">
                
                {/* Field 1: Full Name */}
                {shouldShowField('full_name') && (
                  <div className="modal-form-group">
                    <label>{t.full_name}</label>
                    <input
                      type="text"
                      name="full_name"
                      value={editFormData.full_name}
                      onChange={handleEditInputChange}
                      placeholder={t.placeholderFullName}
                      required
                    />
                  </div>
                )}



                {/* Field 3: Email */}
                {shouldShowField('email') && (
                  <div className="modal-form-group">
                    <label>{t.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                      placeholder={t.placeholderEmail}
                      required
                    />
                  </div>
                )}

                {/* Field 4: Phone Number */}
                {shouldShowField('phone_number') && (
                  <div className="modal-form-group">
                    <label>{t.phone_number}</label>
                    <input
                      type="text"
                      name="phone_number"
                      value={editFormData.phone_number}
                      onChange={handleEditInputChange}
                      placeholder={t.placeholderPhone}
                    />
                  </div>
                )}

                {/* Field 5: Qualification */}
                {shouldShowField('qualification') && (
                  <div className="modal-form-group">
                    <label>{t.qualification}</label>
                    <input
                      type="text"
                      name="qualification"
                      value={editFormData.qualification}
                      onChange={handleEditInputChange}
                      placeholder={t.placeholderQualification}
                    />
                  </div>
                )}

                {/* Field 6: Experience Years */}
                {shouldShowField('experience_years') && (
                  <div className="modal-form-group">
                    <label>{t.experience_years}</label>
                    <input
                      type="number"
                      name="experience_years"
                      value={editFormData.experience_years}
                      onChange={handleEditInputChange}
                      placeholder={t.placeholderExperience}
                      min="0"
                      max="70"
                    />
                  </div>
                )}





                {/* Field 9: Description (Span 2) */}
                {shouldShowField('description') && (
                  <div className="modal-form-group full-width-field">
                    <label>{t.description}</label>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditInputChange}
                      placeholder={t.placeholderDescription}
                      rows={4}
                    />
                  </div>
                )}

              </div>
              
              {/* Modal footer actions bọc trong form để submit */}
              <div className="modal-footer-actions" style={{ padding: '1.25rem 0 0 0', borderTop: '2px dashed #CBD5E1', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="modal-btn-cancel candy-btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  className="modal-btn-confirm candy-btn-save"
                >
                  {t.btnSave}
                </button>
              </div>
              
            </form>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProfileTab;
