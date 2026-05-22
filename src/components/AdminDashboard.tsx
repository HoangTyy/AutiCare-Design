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
import PlansTab from './dashboard/PlansTab';
import PlanDetailView from './dashboard/PlanDetailView';
import type { Plan } from './dashboard/PlanDetailView';

type Tab = 'centers' | 'staffs' | 'objectives' | 'blogs' | 'notification' | 'plans';

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
  const [selectedPlanForDetail, setSelectedPlanForDetail] = useState<Plan | null>(null);

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

  const [plans, setPlans] = useState<Plan[]>([
    {
      plan_id: 1,
      plan_name: 'Kế hoạch can thiệp sớm hành vi & giao tiếp - Nguyễn Minh Khôi',
      academic_year: '2026-2027',
      assessment_tool: 'CARS-2 (Thang đánh giá mức độ tự kỷ ở trẻ em)',
      child_strengths: 'Có khả năng nhận biết hình ảnh nhanh, thích các trò chơi xếp hình Lego, phản xạ tốt với âm thanh nhạc cụ.',
      child_weaknesses: 'Chưa nói được câu dài, thiếu giao tiếp mắt chủ động, thường la hét khi không vừa ý.',
      child_interests: 'Xếp hình Lego, nghe nhạc thiếu nhi, xem phim hoạt hình Pororo.',
      family_feedback: 'Mong muốn con cải thiện khả năng giao tiếp mắt và tự phục vụ cơ bản.',
      start_date: '2026-05-01',
      end_date: '2026-11-01',
      status: 'Active',
      center_staff_id: 1,
      child_id: 1,
      created_at: '2026-05-01 08:30:00',
      updated_at: '2026-05-01 08:30:00',
      phases: [
        {
          plan_phase_id: 1,
          plan_id: 1,
          phase_name: 'Giai đoạn 1: Thiết lập giao tiếp mắt và cử chỉ cơ bản',
          phase_type: 'PECS & ABA',
          start_date: '2026-05-01',
          end_date: '2026-07-31',
          status: 'Active',
          is_deleted: false,
          created_at: '2026-05-01 08:30:00',
          updated_at: '2026-05-01 08:30:00',
          activities: [
            {
              activity_id: 1,
              plan_phase_id: 1,
              activity_name: 'Ghép tranh Lego tìm kiếm tương tác mắt',
              description: 'Giáo viên cầm mảnh Lego đặt ngang tầm mắt để thu hút sự chú ý của trẻ, khi trẻ nhìn vào mắt giáo viên thì trao mảnh ghép.',
              duration: '30 phút / buổi',
              status: 'Active'
            }
          ],
          objectives: [
            {
              objective_id: 1,
              plan_phase_id: 1,
              objective_name: 'Duy trì giao tiếp mắt tối thiểu 3 giây',
              target_score: 'Đạt 4/5 lần thử',
              description: 'Khi có hiệu lệnh gọi tên từ giáo viên can thiệp.',
              status: 'Active'
            }
          ]
        },
        {
          plan_phase_id: 2,
          plan_id: 1,
          phase_name: 'Giai đoạn 2: Phát triển ngôn ngữ nói đơn từ và câu ngắn',
          phase_type: 'TEACCH',
          start_date: '2026-08-01',
          end_date: '2026-10-31',
          status: 'Active',
          is_deleted: false,
          created_at: '2026-05-01 08:35:00',
          updated_at: '2026-05-01 08:35:00',
          activities: [
            {
              activity_id: 2,
              plan_phase_id: 2,
              activity_name: 'Gọi tên con vật qua thẻ hình ảnh',
              description: 'Sử dụng các thẻ tranh ảnh sắc nét để hướng dẫn trẻ phát âm các từ đơn.',
              duration: '45 phút / buổi',
              status: 'Active'
            }
          ],
          objectives: [
            {
              objective_id: 2,
              plan_phase_id: 2,
              objective_name: 'Phát âm chính xác 10 từ đơn cơ bản',
              target_score: 'Đạt 80%',
              description: 'Tự phát âm không cần nhắc mẫu.',
              status: 'Active'
            }
          ]
        }
      ]
    },
    {
      plan_id: 2,
      plan_name: 'Kế hoạch can thiệp điều hòa giác quan & tự phục vụ - Trần Đức Nam',
      academic_year: '2026-2027',
      assessment_tool: 'Sensory Profile 2 (Hồ sơ giác quan trẻ em)',
      child_strengths: 'Thể chất tốt, thích vận động leo trèo, hợp tác tốt với giáo viên nam.',
      child_weaknesses: 'Nhạy cảm quá mức với tiếng ồn lớn, gặp khó khăn khi cầm thìa tự xúc ăn.',
      child_interests: 'Chơi bóng, xích đu, chơi với nước.',
      family_feedback: 'Gia đình muốn hỗ trợ con tự cầm thìa ăn cơm và giảm bớt cơn bùng nổ khi gặp tiếng ồn.',
      start_date: '2026-05-10',
      end_date: '2026-11-10',
      status: 'Active',
      center_staff_id: 2,
      child_id: 2,
      created_at: '2026-05-10 09:00:00',
      updated_at: '2026-05-10 09:00:00',
      phases: [
        {
          plan_phase_id: 3,
          plan_id: 2,
          phase_name: 'Giai đoạn 1: Điều hòa cảm giác thính giác và vận động thô',
          phase_type: 'Sensory Integration',
          start_date: '2026-05-10',
          end_date: '2026-08-10',
          status: 'Active',
          is_deleted: false,
          created_at: '2026-05-10 09:00:00',
          updated_at: '2026-05-10 09:00:00',
          activities: [
            {
              activity_id: 3,
              plan_phase_id: 3,
              activity_name: 'Nghe nhạc êm dịu kết hợp chơi đất nặn',
              description: 'Giúp trẻ làm quen với các tần số âm thanh khác nhau trong môi trường thư giãn.',
              duration: '40 phút / buổi',
              status: 'Active'
            }
          ],
          objectives: [
            {
              objective_id: 3,
              plan_phase_id: 3,
              objective_name: 'Chấp nhận đeo tai nghe chống ồn',
              target_score: 'Nhẫn nại tối thiểu 10 phút',
              description: 'Khi đi vào môi trường ồn ào.',
              status: 'Active'
            }
          ]
        }
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
        { id: 'plans', labelVi: 'Kế hoạch Can thiệp', labelEn: 'Manage Plans' },
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
      case 'plans':
        if (selectedPlanForDetail) {
          return (
            <PlanDetailView
              lang={lang}
              plan={selectedPlanForDetail}
              onBack={() => setSelectedPlanForDetail(null)}
              onUpdatePlan={(updatedPlan) => {
                setPlans(prev =>
                  prev.map(p => p.plan_id === updatedPlan.plan_id ? updatedPlan : p)
                );
                setSelectedPlanForDetail(updatedPlan);
              }}
              onDeletePlan={(planId) => {
                setPlans(prev => prev.filter(p => p.plan_id !== planId));
                setSelectedPlanForDetail(null);
              }}
            />
          );
        }
        return (
          <PlansTab
            lang={lang}
            plans={plans}
            onManageDetail={(plan) => setSelectedPlanForDetail(plan)}
            onUpdatePlans={setPlans}
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
                        if (item.id !== 'plans') {
                          setSelectedPlanForDetail(null);
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
              {selectedPlanForDetail && ` / ${selectedPlanForDetail.plan_name}`}
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