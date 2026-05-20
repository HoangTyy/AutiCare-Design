import React, { useState } from 'react';
import CentersTab from './dashboard/CentersTab';
import CenterDetailView from './dashboard/CenterDetailView';
import type { Center } from './dashboard/CenterDetailView';
import StaffsTab from './dashboard/StaffsTab';
import ObjectivesTab from './dashboard/ObjectivesTab';
import BlogsTab from './dashboard/BlogsTab';
import type { ExerciseLevel } from './dashboard/CenterLevelsTab';
import type { ExerciseCategory } from './dashboard/CenterCategoriesTab';
import './AdminDashboard.css';
import NotificationTab from './dashboard/NotificationTab';

type Tab = 'centers' | 'staffs' | 'objectives' | 'blogs' | 'notification';

interface AdminDashboardProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  onBack: () => void;
  onDesignCode?: () => void;
}

interface MenuItem {
  id: Tab;
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, setLang, onBack, onDesignCode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('centers');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['system', 'training', 'content']);
  const [selectedCenterForDetail, setSelectedCenterForDetail] = useState<Center | null>(null);

  // Core Mock Database State for Centers, their respective Levels, and Categories
  const [centers, setCenters] = useState<Center[]>([
    {
      id: 'AC-001',
      name: 'AutiCare Central Saigon',
      date: '2026-01-10',
      status: 'Active',
      address: '123 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh',
      phone_number: '+84 28 3930 1234',
      email: 'saigon.central@auticare.edu.vn',
      levels: [
        { id: '1', name: 'Dễ - Saigon', score: '1', desc: 'Mức độ dành cho các bài tập dễ tại Saigon' },
        { id: '2', name: 'Bình Thường - Saigon', score: '2', desc: 'Mức độ dành cho các bài tập bình thường tại Saigon' },
        { id: '3', name: 'Khó - Saigon', score: '3', desc: 'Mức độ bài tập khó phát triển kỹ năng cao tại Saigon' },
      ],
      categories: [
        { id: '1', name: 'Giáo dục thể chất - Saigon', date: '05/10/2026', isParent: true },
        { id: '2', name: 'Vận động thô - Saigon', date: '05/12/2026', isSub: true },
        { id: '3', name: 'Vận động tinh - Saigon', date: '05/13/2026', isSub: true },
      ],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true },
        { id: 'R-DOC', nameVi: 'Bác sĩ chuyên khoa', nameEn: 'Clinical Doctor', permissions: ['view_analytics', 'manage_exercises', 'manage_levels'], status: 'Active', priority: 2, isDefault: true },
        { id: 'R-TCH', nameVi: 'Giáo viên can thiệp', nameEn: 'Intervention Teacher', permissions: ['manage_exercises', 'view_analytics'], status: 'Active', priority: 3, isDefault: true },
        { id: 'R-THR', nameVi: 'Trị liệu viên cao cấp', nameEn: 'Senior Therapist', permissions: ['manage_exercises'], status: 'Active', priority: 4, isDefault: false },
      ],
      staffs: [
        { id: 'S-001', name: 'Dr. Nguyễn Văn A', roleId: 'R-DIR', email: 'nguyenvana.saigon@auticare.edu.vn', phone: '0901234567', joinedDate: '2026-01-10', status: 'Active' },
        { id: 'S-002', name: 'Cô Lê Thị B', roleId: 'R-TCH', email: 'lethib.saigon@auticare.edu.vn', phone: '0907654321', joinedDate: '2026-01-12', status: 'Active' },
        { id: 'S-003', name: 'Thầy Phạm Văn C', roleId: 'R-THR', email: 'phamvanc.saigon@auticare.edu.vn', phone: '0903334445', joinedDate: '2026-02-01', status: 'Active' },
      ]
    },
    {
      id: 'AC-002',
      name: 'AutiCare Hanoi North',
      date: '2026-02-15',
      status: 'Active',
      address: '456 Hoàng Hoa Thám, Quận Tây Hồ, Hà Nội',
      phone_number: '+84 24 3762 5678',
      email: 'hanoi.north@auticare.edu.vn',
      levels: [
        { id: '1', name: 'Cơ bản - Hanoi', score: '1', desc: 'Mức độ làm quen ban đầu tại cơ sở Hanoi' },
        { id: '2', name: 'Nâng cao - Hanoi', score: '4', desc: 'Cấp độ nâng cao chuyên sâu tại cơ sở Hanoi' },
      ],
      categories: [
        { id: '1', name: 'Phát triển ngôn ngữ - Hanoi', date: '05/10/2026', isParent: true },
        { id: '2', name: 'Giao tiếp xã hội - Hanoi', date: '05/12/2026', isSub: true },
      ],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true },
        { id: 'R-DOC', nameVi: 'Bác sĩ chuyên khoa', nameEn: 'Clinical Doctor', permissions: ['view_analytics', 'manage_exercises', 'manage_levels'], status: 'Active', priority: 2, isDefault: true },
        { id: 'R-TCH', nameVi: 'Giáo viên can thiệp', nameEn: 'Intervention Teacher', permissions: ['manage_exercises', 'view_analytics'], status: 'Active', priority: 3, isDefault: true },
      ],
      staffs: [
        { id: 'H-001', name: 'Dr. Trần Thu Hằng', roleId: 'R-DIR', email: 'tranthuhang.hn@auticare.edu.vn', phone: '0912345678', joinedDate: '2026-02-15', status: 'Active' },
        { id: 'H-002', name: 'Cô Hoàng Mai Anh', roleId: 'R-TCH', email: 'maianh.hn@auticare.edu.vn', phone: '0918765432', joinedDate: '2026-02-20', status: 'Active' },
      ]
    },
    {
      id: 'AC-003',
      name: 'AutiCare Da Nang Beach',
      date: '2026-03-20',
      status: 'Active',
      address: '789 Võ Nguyên Giáp, Quận Sơn Trà, Đà Nẵng',
      phone_number: '+84 23 6384 9012',
      email: 'danang.beach@auticare.edu.vn',
      levels: [
        { id: '1', name: 'Nhập môn - Da Nang', score: '1', desc: 'Mức nhập môn làm quen cho trẻ tại Da Nang' }
      ],
      categories: [
        { id: '1', name: 'Kỹ năng sống - Da Nang', date: '05/10/2026', isParent: true },
        { id: '2', name: 'Tự phục vụ - Da Nang', date: '05/12/2026', isSub: true }
      ],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true },
        { id: 'R-DOC', nameVi: 'Bác sĩ chuyên khoa', nameEn: 'Clinical Doctor', permissions: ['view_analytics', 'manage_exercises', 'manage_levels'], status: 'Active', priority: 2, isDefault: true },
        { id: 'R-TCH', nameVi: 'Giáo viên can thiệp', nameEn: 'Intervention Teacher', permissions: ['manage_exercises', 'view_analytics'], status: 'Active', priority: 3, isDefault: true },
      ],
      staffs: [
        { id: 'D-001', name: 'Thầy Lê Anh Tuấn', roleId: 'R-DIR', email: 'anhtuan.dn@auticare.edu.vn', phone: '0987654321', joinedDate: '2026-03-20', status: 'Active' }
      ]
    }
  ]);

  const menuGroups: MenuGroup[] = [
    {
      id: 'system',
      labelVi: 'Hệ thống',
      labelEn: 'System',
      icon: '⚙️',
      items: [
        { id: 'centers', labelVi: 'Quản lý Trung tâm', labelEn: 'Manage Centers' },
        { id: 'staffs', labelVi: 'Quản lý Nhân sự', labelEn: 'Manage Staffs' },
      ]
    },
    {
      id: 'training',
      labelVi: 'Nội dung Huấn luyện',
      labelEn: 'Training Content',
      icon: '🧩',
      items: [
        { id: 'objectives', labelVi: 'Mục tiêu Huấn luyện', labelEn: 'Manage Objectives' },
      ]
    },
    {
      id: 'content',
      labelVi: 'Truyền thông',
      labelEn: 'Communication',
      icon: '📰',
      items: [
        { id: 'blogs', labelVi: 'Quản lý Blog', labelEn: 'Manage Blogs' },
        { id: 'notification', labelVi: 'Quản lý Thông báo', labelEn: 'Manage Notifications' },
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

  // State Updates for Center Levels and Categories
  const handleUpdateCenterLevels = (centerId: string, newLevels: ExerciseLevel[]) => {
    setCenters(prev =>
      prev.map(c => (c.id === centerId ? { ...c, levels: newLevels } : c))
    );
    if (selectedCenterForDetail && selectedCenterForDetail.id === centerId) {
      setSelectedCenterForDetail(prev => prev ? { ...prev, levels: newLevels } : null);
    }
  };

  const handleUpdateCenterCategories = (centerId: string, newCategories: ExerciseCategory[]) => {
    setCenters(prev =>
      prev.map(c => (c.id === centerId ? { ...c, categories: newCategories } : c))
    );
    if (selectedCenterForDetail && selectedCenterForDetail.id === centerId) {
      setSelectedCenterForDetail(prev => prev ? { ...prev, categories: newCategories } : null);
    }
  };

  const handleUpdateCenter = (updatedCenter: Center) => {
    setCenters(prev =>
      prev.map(c => (c.id === updatedCenter.id ? updatedCenter : c))
    );
    setSelectedCenterForDetail(updatedCenter);
  };

  const handleDeleteCenter = (centerId: string) => {
    setCenters(prev => prev.filter(c => c.id !== centerId));
    setSelectedCenterForDetail(null);
  };

  const handleManageDetail = (center: Center) => {
    setSelectedCenterForDetail(center);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'centers':
        if (selectedCenterForDetail) {
          return (
            <CenterDetailView
              lang={lang}
              center={selectedCenterForDetail}
              onBack={() => setSelectedCenterForDetail(null)}
              onUpdateLevels={(newLevels) => handleUpdateCenterLevels(selectedCenterForDetail.id, newLevels)}
              onUpdateCategories={(newCats) => handleUpdateCenterCategories(selectedCenterForDetail.id, newCats)}
              onUpdateCenter={handleUpdateCenter}
              onDeleteCenter={handleDeleteCenter}
            />
          );
        }
        return (
          <CentersTab
            lang={lang}
            centers={centers}
            onManageDetail={handleManageDetail}
            onUpdateCenters={setCenters}
          />
        );
      case 'staffs':
        return <StaffsTab lang={lang} />;
      case 'objectives':
        return <ObjectivesTab lang={lang} />;
      case 'blogs':
        return <BlogsTab lang={lang} />;
      case 'notification':
        return <NotificationTab lang={lang} />;
      default:
        return <CentersTab lang={lang} centers={centers} onManageDetail={handleManageDetail} onUpdateCenters={setCenters} />;
    }
  };

  return (
    <div className="admin-theme-root admin-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="admin-logo">
            <h1 className="logo-text">AUTICARE</h1>
            <span className="logo-subtitle">Dashboard</span>
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
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (item.id !== 'centers') {
                          setSelectedCenterForDetail(null);
                        }
                      }}
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
          <div className="user-profile">
            <div className="avatar">AD</div>
            <div className="user-info">
              <div className="user-name">AutiCare's Admin</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <span className="breadcrumb">
              Admin /{' '}
              {lang === 'vi' ? getActiveItem().labelVi : getActiveItem().labelEn}
              {selectedCenterForDetail && ` / ${selectedCenterForDetail.name}`}
            </span>
          </div>
          <div className="topbar-right">
            <button
              className="view-toggle-btn"
              onClick={onBack}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'var(--primary)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.8rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ← {lang === 'vi' ? 'Quay lại Homepage' : 'Back to Homepage'}
            </button>
            <div className="lang-switch" style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '2px' }}>
              <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')}>VN</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
            <button className="icon-btn" title="Notifications" onClick={() => setActiveTab('notification')}>🔔</button>
            {onDesignCode && (
              <button className="icon-btn" title="Design Code" onClick={onDesignCode} style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                &lt;/&gt;
              </button>
            )}
            <button className="icon-btn" title="Settings">⚙️</button>
          </div>
        </header>

        {renderActiveTab()}
      </main>
    </div>
  );
};

export default AdminDashboard;