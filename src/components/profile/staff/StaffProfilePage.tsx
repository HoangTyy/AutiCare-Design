import React, { useState } from 'react';
import StaffProfileTab from './tabs/StaffProfileTab';
import StaffAppointmentsTab from './tabs/StaffAppointmentsTab';
import StaffScheduleTab from './tabs/StaffScheduleTab';
import StaffInterventionTab from './tabs/StaffInterventionTab';

interface StaffProfilePageProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  onBack: () => void;
  onViewChange: (newView: 'landing' | 'admin' | 'designHomepage' | 'designAdmin' | 'assessment' | 'profile' | 'centers' | 'staff-profile') => void;
}

const translations = {
  vi: {
    title: "Trang Cá Nhân Chuyên Gia",
    backToHome: "Quay lại trang chủ",
    tabUserProfile: "👤 Hồ Sơ Cá Nhân",
    tabAppointments: "📅 Lịch Hẹn Với Phụ Huynh",
    tabSchedule: "⏱️ Thời Khóa Biểu Tuần",
    tabIntervention: "📂 Hồ Sơ Can Thiệp",
    roleSwitcher: "👶 PHỤ HUYNH PORTAL"
  },
  en: {
    title: "Specialist Portal Dashboard",
    backToHome: "Back to Home",
    tabUserProfile: "👤 Personal Profile",
    tabAppointments: "📅 Appointments with Parents",
    tabSchedule: "⏱️ Weekly Schedule",
    tabIntervention: "📂 Intervention Records",
    roleSwitcher: "👶 PARENT PORTAL"
  }
};

type TabType = 'profile' | 'appointments' | 'schedule' | 'intervention';

export interface StaffProfile {
  username: string;
  email: string;
  avatar: string;
  phonenumber: string;
  full_name: string;
  title: string; // Học vị/chức danh
  specialty: string; // Chuyên khoa
  experience: string; // Kinh nghiệm
  bio: string; // Giới thiệu ngắn
  workplace: string; // Nơi làm việc (Cơ sở AutiCare)
}

const StaffProfilePage: React.FC<StaffProfilePageProps> = ({
  lang,
  setLang,
  onBack,
  onViewChange
}) => {
  const t = translations[lang];
  // Khởi tạo state cho tab động, mặc định tập trung vào 'appointments' theo yêu cầu của user
  const [activeTab, setActiveTab] = useState<TabType>('appointments');

  // Reactive State cho profile chuyên gia để đồng bộ
  const [staffProfile, setStaffProfile] = useState<StaffProfile>({
    username: 'dr_minhanh_clinical',
    email: 'minhanh.nguyen@auticare.edu.vn',
    avatar: '👩‍⚕️',
    phonenumber: '0903.111.222',
    full_name: 'TS. BS. Nguyễn Minh Anh',
    title: lang === 'vi' ? 'Tiến sĩ - Bác sĩ Chẩn đoán Lâm sàng' : 'PhD. MD. Clinical Diagnosis Specialist',
    specialty: lang === 'vi' ? 'Đánh giá phát triển & Can thiệp sớm' : 'Developmental Assessment & Early Intervention',
    experience: lang === 'vi' ? '12 năm kinh nghiệm trong lĩnh vực tự kỷ trẻ em' : '12 years of experience in childhood autism',
    bio: lang === 'vi' ? 'Chuyên gia đầu ngành về sàng lọc sớm và chẩn đoán phổ tự kỷ trẻ em. Đam mê nghiên cứu và đồng hành cùng các gia đình nhằm tối ưu hóa giai đoạn vàng can thiệp của con.' : 'Leading expert in early screening and diagnosis of childhood autism spectrum disorders. Passionate about accompanying families to optimize children\'s golden window of intervention.',
    workplace: 'AutiCare Central Saigon'
  });

  const handleProfileSave = (updated: StaffProfile) => {
    setStaffProfile(updated);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <StaffProfileTab 
            lang={lang} 
            profile={staffProfile} 
            onSave={handleProfileSave} 
          />
        );
      case 'schedule':
        return <StaffScheduleTab lang={lang} />;
      case 'intervention':
        return <StaffInterventionTab lang={lang} />;
      case 'appointments':
      default:
        return <StaffAppointmentsTab lang={lang} />;
    }
  };

  const tabsConfig = [
    { id: 'appointments' as TabType, label: t.tabAppointments },
    { id: 'profile' as TabType, label: t.tabUserProfile },
    { id: 'schedule' as TabType, label: t.tabSchedule },
    { id: 'intervention' as TabType, label: t.tabIntervention }
  ];

  return (
    <div className="profile-page-wrapper staff-portal-theme">
      {/* 1. Page Header */}
      <header className="profile-page-header">
        <div className="profile-header-container">
          <div className="profile-header-left" onClick={onBack} style={{ cursor: 'pointer' }}>
            <div className="profile-brand-logo">AutiCare</div>
          </div>
          
          <h1 className="profile-page-title">{t.title}</h1>
          
          <div className="profile-header-right">
            {/* Candy Button chuyển vai trò nhanh về Phụ huynh */}
            <button 
              className="profile-role-switcher-btn parent-role-switcher-btn"
              onClick={() => onViewChange('profile')}
              title={lang === 'vi' ? "Chuyển sang trang Phụ huynh" : "Switch to Parent Portal"}
            >
              {t.roleSwitcher}
            </button>

            <div className="profile-lang-switch">
              <button 
                className={`profile-lang-btn ${lang === 'vi' ? 'active' : ''}`} 
                onClick={() => setLang('vi')}
              >
                VN
              </button>
              <button 
                className={`profile-lang-btn ${lang === 'en' ? 'active' : ''}`} 
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            
            <button className="profile-back-btn" onClick={onBack}>
              ⬅ {t.backToHome}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout: Sidebar + Tab Content */}
      <main className="profile-page-main">
        <div className="profile-content-container dashboard-layout-container">
          
          {/* Left Sidebar Navigation */}
          <aside className="profile-dashboard-sidebar">
            <nav className="profile-sidebar-nav">
              {tabsConfig.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`profile-sidebar-tab-btn staff-sidebar-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTab(tab.id);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Tab Content Zone */}
          <section className="profile-dashboard-content-zone">
            {renderActiveTabContent()}
          </section>

        </div>
      </main>
    </div>
  );
};

export default StaffProfilePage;
