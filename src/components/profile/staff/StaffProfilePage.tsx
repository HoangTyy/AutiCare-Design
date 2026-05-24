import React, { useState } from 'react';
import StaffProfileTab from './tabs/StaffProfileTab';
import InvoicesTab from '../tabs/InvoicesTab';
import SupportTicketsTab from '../tabs/SupportTicketsTab';
import BookedAppointmentsTab from '../tabs/BookedAppointmentsTab';
import ScheduleTab from '../tabs/ScheduleTab';
import ChildrenTab from '../tabs/ChildrenTab';

interface StaffProfilePageProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  onBack: () => void;
  onViewChange: (newView: 'landing' | 'admin' | 'designHomepage' | 'designAdmin' | 'assessment' | 'profile' | 'centers' | 'staff-profile' | 'staff-dashboard') => void;
}

const translations = {
  vi: {
    title: "Trang Cá Nhân Chuyên Gia",
    backToHome: "Quay lại trang chủ",
    tabUserProfile: "👤 Hồ Sơ Cá Nhân",
    tabInvoices: "🧾 Hóa Đơn & Thanh Toán",
    tabSupportTickets: "💬 Hỗ Trợ Kỹ Thuật",
    tabBookedAppointments: "📅 Lịch Hẹn Đã Đặt",
    tabSchedule: "⏱️ Thời Khóa Biểu Tuần",
    tabChildren: "👶 Hồ Sơ Con Em",
    roleSwitcher: "🩺 KHÔNG GIAN LÀM VIỆC"
  },
  en: {
    title: "Specialist Personal Profile",
    backToHome: "Back to Home",
    tabUserProfile: "👤 Personal Profile",
    tabInvoices: "🧾 Invoices & Receipts",
    tabSupportTickets: "💬 Support Ticket List",
    tabBookedAppointments: "📅 Booked Appointments",
    tabSchedule: "⏱️ Weekly Schedule",
    tabChildren: "👶 Children Profiles",
    roleSwitcher: "🩺 WORKSPACE"
  }
};

type TabType = 'profile' | 'invoices' | 'tickets' | 'appointments' | 'schedule' | 'children';

export interface StaffProfile {
  username: string;
  email: string;
  avatar: string;
  phonenumber: string;
  full_name: string;
  title: string; 
  specialty: string; 
  experience: string; 
  bio: string; 
  workplace: string; 
}

const StaffProfilePage: React.FC<StaffProfilePageProps> = ({
  lang,
  setLang,
  onBack,
  onViewChange
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<TabType>('profile');

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
      case 'invoices':
        return <InvoicesTab lang={lang} />;
      case 'tickets':
        return <SupportTicketsTab lang={lang} />;
      case 'appointments':
        return <BookedAppointmentsTab lang={lang} />;
      case 'schedule':
        return <ScheduleTab lang={lang} />;
      case 'children':
        return <ChildrenTab lang={lang} />;
      case 'profile':
      default:
        return (
          <StaffProfileTab 
            lang={lang} 
            profile={staffProfile} 
            onSave={handleProfileSave} 
          />
        );
    }
  };

  const tabsConfig = [
    { id: 'profile' as TabType, label: t.tabUserProfile },
    { id: 'invoices' as TabType, label: t.tabInvoices },
    { id: 'tickets' as TabType, label: t.tabSupportTickets },
    { id: 'appointments' as TabType, label: t.tabBookedAppointments },
    { id: 'schedule' as TabType, label: t.tabSchedule },
    { id: 'children' as TabType, label: t.tabChildren }
  ];

  return (
    <div className="profile-page-wrapper">
      {/* 1. Page Header */}
      <header className="profile-page-header">
        <div className="profile-header-container">
          <div className="profile-header-left" onClick={onBack} style={{ cursor: 'pointer' }}>
            <div className="profile-brand-logo">AutiCare</div>
          </div>
          
          <h1 className="profile-page-title">{t.title}</h1>
          
          <div className="profile-header-right">
            {/* Candy Buttons chuyển đổi vai trò */}
            <button 
              className="profile-role-switcher-btn"
              onClick={() => onViewChange('staff-dashboard')}
              title={lang === 'vi' ? "Vào Không gian làm việc chuyên khoa" : "Enter Specialist Workspace"}
              style={{ background: '#0D9488', color: 'white', marginRight: '8px' }}
            >
              {t.roleSwitcher}
            </button>

            <button 
              className="profile-role-switcher-btn parent-role-switcher-btn"
              onClick={() => onViewChange('profile')}
              title={lang === 'vi' ? "Chuyển sang trang Phụ huynh" : "Switch to Parent Portal"}
              style={{ marginRight: '8px' }}
            >
              {lang === 'vi' ? "👶 PHỤ HUYNH PORTAL" : "👶 PARENT PORTAL"}
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
                  className={`profile-sidebar-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
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
