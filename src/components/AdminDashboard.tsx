import React, { useState } from 'react';
import CentersTab from './dashboard/CentersTab';
import CenterDetailView from './dashboard/CenterDetailView';
import type { Center } from './dashboard/CenterDetailView';
import StaffsTab from './dashboard/StaffsTab';
import ObjectivesTab from './dashboard/ObjectivesTab';
import BlogsTab from './dashboard/BlogsTab';
import InvoicesTab from './dashboard/InvoicesTab';
import SupportTicketsTab from './dashboard/SupportTicketsTab';
import PlanFeedbacksTab from './dashboard/PlanFeedbacksTab';
import ScheduleTab from './dashboard/ScheduleTab';
import type { ExerciseLevel } from './dashboard/CenterLevelsTab';
import type { ExerciseCategory } from './dashboard/CenterCategoriesTab';
import './AdminDashboard.css';
import NotificationTab from './dashboard/NotificationTab';
import PlansTab from './dashboard/PlansTab';
import PlanDetailView from './dashboard/PlanDetailView';
import type { Plan } from './dashboard/PlanDetailView';
import ExercisesTab from './dashboard/ExercisesTab';
import OverviewTab from './dashboard/OverviewTab';

type Tab = 'overview' | 'centers' | 'staffs' | 'objectives' | 'blogs' | 'notification' | 'plans' | 'schedule' | 'exercises' | 'invoices' | 'support' | 'feedbacks';

interface AdminDashboardProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  onBack: () => void;
  onDesignCode?: () => void;
  centers: Center[];
  setCenters: React.Dispatch<React.SetStateAction<Center[]>>;
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, setLang, onBack, onDesignCode, centers, setCenters }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['dashboard', 'system', 'training', 'content']);
  const [selectedCenterForDetail, setSelectedCenterForDetail] = useState<Center | null>(null);
  const [selectedPlanForDetail, setSelectedPlanForDetail] = useState<Plan | null>(null);

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

          objectives: [
            {
              objective_id: 1,
              plan_phase_id: 1,
              objective_name: 'Duy trì giao tiếp mắt tối thiểu 3 giây',
              target_date: '2026-05-01 08:30:0',
              status: 'Completed',
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
               created_at: '2026-05-01 08:35:00',
              updated_at: '2026-05-01 08:35:00',
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
          objectives: [
            {
              objective_id: 2,
              plan_phase_id: 2,
              objective_name: 'Phát âm chính xác 10 từ đơn cơ bản',
              target_date: '2026-11-07',
              status: 'Completed',
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
              created_at: '2026-05-01 08:35:00',
              updated_at: '2026-05-01 08:35:00',
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

          objectives: [
            {
              objective_id: 3,
              plan_phase_id: 3,
              objective_name: 'Chấp nhận đeo tai nghe chống ồn',
              target_date: 'Nhẫn nại tối thiểu 10 phút',
              status: 'In process',
              created_at: '2026-05-01 08:35:00',
              updated_at: '2026-05-01 08:35:00',
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
            },
          ]
        }
      ]
    }
  ]);

  const menuGroups: MenuGroup[] = [
    {
      id: 'dashboard',
      labelVi: 'Bảng điều khiển',
      labelEn: 'Dashboard',
      icon: '📊',
      items: [
        { id: 'overview', labelVi: 'Tổng quan hệ thống', labelEn: 'System Overview' }
      ]
    },
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
      id: 'scheduling',
      labelVi: 'Lịch trình',
      labelEn: 'Scheduling',
      icon: '📅',
      items: [
        { id: 'schedule', labelVi: 'Quản lý Lịch trống', labelEn: 'Available Slots' },
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
        { id: 'exercises', labelVi: 'Quản lý Bài tập', labelEn: 'Manage Exercises' },
        { id: 'feedbacks', labelVi: 'Đánh giá Kế hoạch', labelEn: 'Plan Feedbacks' },
      ]
    },
    {
      id: 'content',
      labelVi: 'Truyền thông & CSKH',
      labelEn: 'Communication & Support',
      icon: '📰',
      items: [
        { id: 'blogs', labelVi: 'Quản lý Blog', labelEn: 'Manage Blogs' },
        { id: 'notification', labelVi: 'Quản lý Thông báo', labelEn: 'Manage Notifications' },
        { id: 'support', labelVi: 'Yêu cầu Hỗ trợ', labelEn: 'Support Tickets' },
      ]
    },
    {
      id: 'finance',
      labelVi: 'Tài chính',
      labelEn: 'Finance',
      icon: '💰',
      items: [
        { id: 'invoices', labelVi: 'Quản lý Hóa đơn', labelEn: 'Manage Invoices' },
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
      case 'overview':
        return <OverviewTab lang={lang} centers={centers} />;
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
      case 'schedule':
        return <ScheduleTab lang={lang} />;
      case 'exercises':
        return <ExercisesTab lang={lang} />;
      case 'invoices':
        return <InvoicesTab lang={lang} />;
      case 'support':
        return <SupportTicketsTab lang={lang} />;
      case 'feedbacks':
        return <PlanFeedbacksTab lang={lang} />;
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