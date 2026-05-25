import React, { useState } from 'react';
import StaffAppointmentsTab from './tabs/StaffAppointmentsTab';
import StaffScheduleTab from './tabs/StaffScheduleTab';
import StaffInterventionTab from './tabs/StaffInterventionTab';
import StaffStatsTab from './tabs/StaffStatsTab';
import ToolAssessmentPage from '../../assessment/ToolAssessmentPage';
import ThemeCustomizer from '../../ThemeCustomizer';
import '../../AdminDashboard.css'; // Sử dụng chung file CSS tối của Admin để giữ nguyên 100% style

type TabType = 'stats' | 'appointments' | 'schedule' | 'intervention' | 'assessment';

interface StaffDashboardProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  onBack: () => void;
  onViewChange?: (newView: 'landing' | 'admin' | 'designHomepage' | 'designAdmin' | 'assessment' | 'profile' | 'centers' | 'staff-profile' | 'staff-dashboard') => void;
}

interface MenuItem {
  id: TabType;
  labelVi: string;
  labelEn: string;
}

interface MenuGroup {
  id: string;
  labelVi: string;
  labelEn: string;
  icon: string;
  items: MenuItem[];
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ 
  lang, 
  setLang, 
  onBack: _, 
  onViewChange: __ 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('stats');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['stats', 'scheduling', 'clinical']);

  const menuGroups: MenuGroup[] = [
    {
      id: 'stats',
      labelVi: 'Báo cáo & Phân tích',
      labelEn: 'Reports & Analytics',
      icon: '📊',
      items: [
        { id: 'stats', labelVi: 'Phân tích Thống kê', labelEn: 'Statistical Analysis' }
      ]
    },
    {
      id: 'scheduling',
      labelVi: 'Quản lý Lịch hẹn',
      labelEn: 'Appointments Scheduling',
      icon: '📅',
      items: [
        { id: 'appointments', labelVi: 'Lịch hẹn với Phụ huynh', labelEn: 'Appointments with Parents' },
        { id: 'schedule', labelVi: 'Thời khóa biểu tuần', labelEn: 'Weekly Schedule' }
      ]
    },
    {
      id: 'clinical',
      labelVi: 'Nghiệp vụ Lâm sàng',
      labelEn: 'Clinical Intervention',
      icon: '🩺',
      items: [
        { id: 'intervention', labelVi: 'Hồ sơ Can thiệp', labelEn: 'Intervention Records' },
        { id: 'assessment', labelVi: 'Đánh giá Lâm sàng', labelEn: 'Clinical Assessment' }
      ]
    }
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const getActiveItem = () => {
    for (const group of menuGroups) {
      const item = group.items.find(i => i.id === activeTab);
      if (item) return item;
    }
    return menuGroups[0].items[0];
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'appointments':
        return <StaffAppointmentsTab lang={lang} />;
      case 'schedule':
        return <StaffScheduleTab lang={lang} />;
      case 'intervention':
        return <StaffInterventionTab lang={lang} />;
      case 'assessment':
        return (
          <div className="assessment-theme-root assessment-view-wrapper" style={{ width: '100%', padding: 0, border: 'none', background: 'transparent', boxShadow: 'none' }}>
            <ToolAssessmentPage 
              lang={lang} 
              setLang={setLang} 
              onBack={() => setActiveTab('appointments')}
              hideHeader={true}
            />
            <ThemeCustomizer view="assessment" />
          </div>
        );
      case 'stats':
      default:
        return <StaffStatsTab lang={lang} />;
    }
  };

  return (
    <div className="admin-theme-root admin-dashboard staff-portal-theme">
      {/* Sidebar trái ( Midnight Indigo ) */}
      <aside className="dashboard-sidebar" style={{ borderRight: '3px solid #1E293B' }}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <h1 className="logo-text">AUTICARE</h1>
            <span className="logo-subtitle" style={{ color: '#0D9488' }}>
              {lang === 'vi' ? 'Không gian làm việc' : 'Workspace'}
            </span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {menuGroups.map((group) => (
            <div key={group.id} className="menu-group">
              <button
                className={`group-toggle ${expandedGroups.includes(group.id) ? 'expanded' : ''}`}
                onClick={() => toggleGroup(group.id)}
              >
                <span className="group-icon">{group.icon}</span>
                <span className="group-label">{lang === 'vi' ? group.labelVi : group.labelEn}</span>
                <span className="arrow">▾</span>
              </button>

              {expandedGroups.includes(group.id) && (
                <div className="group-items">
                  {menuGroups.find(g => g.id === group.id)?.items.map((item) => (
                    <button
                      key={item.id}
                      className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <span className="nav-label">{lang === 'vi' ? item.labelVi : item.labelEn}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          {/* Click avatar/username để chuyển sang Trang cá nhân màu kem của Chuyên gia */}
          <a 
            href="#/staff-profile"
            className="user-profile" 
            style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'inherit' }}
            title={lang === 'vi' ? "Xem hồ sơ cá nhân" : "View personal profile"}
          >
            <div className="avatar" style={{ background: '#0D9488', fontSize: '1.2rem' }}>👩‍⚕️</div>
            <div className="user-info">
              <div className="user-name">TS. BS. Nguyễn Minh Anh</div>
              <div className="user-role" style={{ color: '#0D9488' }}>
                {lang === 'vi' ? 'Bác sĩ chuyên khoa' : 'Clinical Specialist'}
              </div>
            </div>
          </a>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <span className="breadcrumb">
              {lang === 'vi' ? 'Không gian làm việc' : 'Workspace'} /{' '}
              {lang === 'vi' ? getActiveItem().labelVi : getActiveItem().labelEn}
            </span>
          </div>
          <div className="topbar-right">
            <a
              href="#/"
              className="view-toggle-btn"
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'var(--primary)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.8rem',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              ← {lang === 'vi' ? 'Quay lại Homepage' : 'Back to Homepage'}
            </a>
            <div className="lang-switch" style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '2px' }}>
              <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')}>VN</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </header>
        <div className="dashboard-content-scroll" style={{ flex: 1, overflowY: 'auto', padding: activeTab === 'assessment' ? '0' : '2rem 2.5rem' }}>
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
