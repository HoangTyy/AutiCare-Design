import React, { useState } from 'react';
import UserProfileTab from './tabs/UserProfileTab';
import InvoicesTab from './tabs/InvoicesTab';
import SupportTicketsTab from './tabs/SupportTicketsTab';
import BookedAppointmentsTab from './tabs/BookedAppointmentsTab';
import ScheduleTab from './tabs/ScheduleTab';
import ChildrenTab from './tabs/ChildrenTab';

export interface UserProfile {
  username: string;
  email: string;
  avatar: string;
  phonenumber: string;
  full_name: string;
  address: string;
  job: string;
}

interface UserProfilePageProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  profile: UserProfile;
  onBack: () => void;
  onSave: (updatedProfile: UserProfile) => void;
  onViewChange: (newView: 'landing' | 'admin' | 'designHomepage' | 'designAdmin' | 'assessment' | 'profile' | 'centers' | 'staff-profile') => void;
}

const translations = {
  vi: {
    title: "Trang Cá Nhân Phụ Huynh",
    backToHome: "Quay lại trang chủ",
    tabUserProfile: "👤 Hồ Sơ Cá Nhân",
    tabInvoices: "🧾 Hóa Đơn & Thanh Toán",
    tabSupportTickets: "💬 Hỗ Trợ Kỹ Thuật",
    tabBookedAppointments: "📅 Lịch Hẹn Đã Đặt",
    tabSchedule: "⏱️ Thời Khóa Biểu Tuần",
    tabChildren: "👶 Hồ Sơ Con Em"
  },
  en: {
    title: "Parent Portal Dashboard",
    backToHome: "Back to Home",
    tabUserProfile: "👤 User Profile",
    tabInvoices: "🧾 Invoices & Receipts",
    tabSupportTickets: "💬 Support Ticket List",
    tabBookedAppointments: "📅 Booked Appointments",
    tabSchedule: "⏱️ Weekly Schedule",
    tabChildren: "👶 Children Profiles"
  }
};

type TabType = 'profile' | 'invoices' | 'tickets' | 'appointments' | 'schedule' | 'children';

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  lang,
  setLang,
  profile,
  onBack,
  onSave,
  onViewChange: _
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<TabType>('profile');

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
      default:
        return (
          <UserProfileTab 
            lang={lang} 
            profile={profile} 
            onSave={onSave} 
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
            {/* Candy Button chuyển vai trò nhanh */}
            <a 
              href="#/staff-profile"
              className="profile-role-switcher-btn"
              title={lang === 'vi' ? "Chuyển sang trang Chuyên gia" : "Switch to Staff Portal"}
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              🧑‍⚕️ {lang === 'vi' ? "CHUYÊN GIA PORTAL" : "STAFF PORTAL"}
            </a>

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
            
            <a href="#/" className="profile-back-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              ⬅ {t.backToHome}
            </a>
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

export default UserProfilePage;
