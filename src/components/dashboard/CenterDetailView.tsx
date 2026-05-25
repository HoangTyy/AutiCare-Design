import React, { useState } from 'react';
import CenterLevelsTab from './CenterLevelsTab';
import type { ExerciseLevel } from './CenterLevelsTab';
import CenterCategoriesTab from './CenterCategoriesTab';
import type { ExerciseCategory } from './CenterCategoriesTab';
import CenterRolesTab from './CenterRolesTab';
import CenterStaffsTab from './CenterStaffsTab';

export interface CenterRole {
  id: string;
  nameVi: string;
  nameEn: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
  priority: number;
  isDefault?: boolean;
}

export interface CenterStaff {
  id: string;
  name: string;
  roleId: string; // references CenterRole.id
  email: string;
  phone: string;
  joinedDate: string;
  status: 'Active' | 'Inactive';
}

export interface Center {
  id: string;
  name: string;
  date: string;
  status: 'Active' | 'Inactive';
  address?: string;
  phone_number?: string;
  email?: string;
  province?: string;
  levels: ExerciseLevel[];
  categories: ExerciseCategory[];
  roles?: CenterRole[];
  staffs?: CenterStaff[];
}

interface CenterDetailViewProps {
  lang: 'vi' | 'en';
  center: Center;
  onBack: () => void;
  onUpdateLevels: (newLevels: ExerciseLevel[]) => void;
  onUpdateCategories: (newCategories: ExerciseCategory[]) => void;
  onUpdateCenter: (updatedCenter: Center) => void;
  onDeleteCenter: (centerId: string) => void;
}

const translations = {
  vi: {
    back: "Quay lại danh sách",
    tabOverview: "Thông tin chung",
    tabLevels: "Cấp độ Bài tập",
    tabCategories: "Danh mục Bài tập",
    tabRoles: "Vai trò cơ sở",
    tabStaffs: "Nhân sự cơ sở",
    tabDirectorStats: "Báo cáo Giám đốc 📊",
    overviewTitle: "Tổng quan Trung tâm",
    centerId: "Mã trung tâm",
    lblCenterName: "Tên trung tâm",
    lblAddress: "Địa chỉ cơ sở",
    lblPhone: "Số điện thoại",
    lblDirector: "Giám đốc trung tâm",
    lblEmail: "Địa chỉ Email",
    unassigned: "Chưa phân công",
    createdDate: "Ngày tham gia",
    status: "Trạng thái",
    active: "Hoạt động",
    inactive: "Tạm ngưng",
    statsLevels: "Tổng cấp độ bài tập",
    statsCategories: "Tổng danh mục",
    statsTeachers: "Nhân sự",
    statsChildren: "Vai trò nội bộ",
    cardInfoTitle: "Chi tiết trung tâm",
    cardInfoDesc: "Trung tâm cung cấp các chương trình can thiệp sớm và hỗ trợ kỹ năng cho trẻ tự kỷ thông qua lộ trình được thiết kế chuẩn chuyên khoa.",
    quickStats: "Chỉ số hoạt động",
    dbSchemaTitle: "Trường dữ liệu Schema Hệ thống",
    dbSchemaDesc: "Các trường dữ liệu chuẩn được lưu trữ trực tiếp trong cơ sở dữ liệu SQLite/PostgreSQL của hệ thống AutiCare.",
    btnEdit: "✏️ Chỉnh sửa thông tin",
    btnDeleteCenter: "❌ Xóa cơ sở trung tâm",
    editTitle: "Cập nhật Thông tin Cơ sở",
    deleteTitle: "Xác nhận Xóa cơ sở",
    deleteConfirm: "Bạn có chắc chắn muốn xóa trung tâm này? Toàn bộ cấp độ, danh mục, vai trò và nhân viên trực thuộc sẽ bị loại bỏ vĩnh viễn khỏi cơ sở dữ liệu.",
    confirmDeleteInput: "Nhập mã cơ sở để xác nhận xóa:",
    placeholderCenterName: "Tên trung tâm",
    placeholderAddress: "Địa chỉ hoạt động",
    placeholderPhone: "Số điện thoại",
    placeholderEmail: "Thư điện tử",
    btnSave: "Cập nhật",
    btnCancel: "Hủy bỏ",
    btnConfirmDelete: "Xác nhận xóa vĩnh viễn",
    requiredError: "Vui lòng nhập tên trung tâm!",
    statsChartTitle: "Phân tích Thống kê (Intervention Analytics)",
    statsChartDesc: "Biểu đồ ghi nhận số giờ can thiệp của trẻ và phân bổ các danh mục tập luyện trực quan.",
    exampleChartBadge: "Biểu đồ ví dụ",
    chartInterventions: "Số giờ can thiệp tích lũy theo tháng",
    chartCategories: "Tỷ lệ phân bổ bài tập kỹ năng",
    directorStatsTitle: "Thống kê & Tài chính Cơ sở (Director Analytics)",
    directorStatsDesc: "Báo cáo thống kê doanh thu, lưu lượng học viên, hiệu suất nhân sự chuyên biệt của cơ sở.",
    roleSimulatorTitle: "Giả lập Vai trò (Role Switcher):",
    roleAdmin: "System Admin 👑",
    roleDirector: "Giám đốc trung tâm 🧑‍💼",
    lockedTabWarning: "🔒 Báo cáo chuyên sâu chỉ dành riêng cho Giám đốc Trung tâm này!",
    lockedTabHint: "Vui lòng sử dụng bộ giả lập vai trò phía trên để chuyển đổi sang Giám đốc trung tâm để mở khóa thông tin.",
    lblRevenue: "Doanh thu tích lũy 6 tháng gần nhất",
    lblStudentTraffic: "Biến động học viên (Lưu lượng)",
    lblStaffPerformance: "Bảng xếp hạng hiệu suất Chuyên gia",
    lblPerformanceScore: "Tỷ lệ đạt mục tiêu:",
    lblSatisfaction: "Hài lòng phụ huynh:",
    lblHoursCompleted: "Giờ can thiệp:",
    lblTopExpert: "Hiệu suất hoạt động:",
    lblActiveStudents: "Nhập học mới",
    lblGraduatedStudents: "Tốt nghiệp trị liệu",
    lblRevenueVND: "Triệu VND",
    lblTotalRevenue: "Tổng doanh thu tích lũy",
    lblActiveCases: "Tổng ca đang học",
    lblAvgSatisfaction: "Hài lòng trung bình"
  },
  en: {
    back: "Back to centers",
    tabOverview: "Overview Info",
    tabLevels: "Exercise Levels",
    tabCategories: "Exercise Categories",
    tabRoles: "Center Roles",
    tabStaffs: "Center Staffs",
    tabDirectorStats: "Director Stats 📊",
    overviewTitle: "Center Overview",
    centerId: "Center ID",
    lblCenterName: "Center Name",
    lblAddress: "Physical Address",
    lblPhone: "Phone Number",
    lblDirector: "Center Director",
    lblEmail: "Email Address",
    unassigned: "Unassigned",
    createdDate: "Date Joined",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    statsLevels: "Total Levels",
    statsCategories: "Total Categories",
    statsTeachers: "Staff Members",
    statsChildren: "Custom Roles",
    cardInfoTitle: "Center detail",
    cardInfoDesc: "The center provides early intervention programs and skills support for autistic children through medically standardized, personalized pathways.",
    quickStats: "Operational Metrics",
    dbSchemaTitle: "System Database Schema Fields",
    dbSchemaDesc: "Standard schema fields defined and stored directly in the core SQLite/PostgreSQL database of AutiCare.",
    btnEdit: "✏️ Edit Information",
    btnDeleteCenter: "❌ Delete Center",
    editTitle: "Edit Center Properties",
    deleteTitle: "Confirm Center Deletion",
    deleteConfirm: "Are you sure you want to delete this center? All levels, categories, roles, and staff rosters associated will be permanently removed.",
    confirmDeleteInput: "Type the center ID to confirm:",
    placeholderCenterName: "Center name",
    placeholderAddress: "Physical address",
    placeholderPhone: "Phone number",
    placeholderEmail: "Email address",
    btnSave: "Save changes",
    btnCancel: "Cancel",
    btnConfirmDelete: "Permanently delete",
    requiredError: "Center name is required!",
    statsChartTitle: "Statistical Analysis (Intervention Analytics)",
    statsChartDesc: "Interactive summary charts representing cumulative intervention hours and category distribution.",
    exampleChartBadge: "Example Chart",
    chartInterventions: "Cumulative monthly intervention hours",
    chartCategories: "Skill category distribution ratio",
    directorStatsTitle: "Center Statistics & Finance (Director Analytics)",
    directorStatsDesc: "Specialized reports representing revenue, student enrollment, and staff performance.",
    roleSimulatorTitle: "Role Simulator (Switcher):",
    roleAdmin: "System Admin 👑",
    roleDirector: "Center Director 🧑‍💼",
    lockedTabWarning: "🔒 Deep analytical reports are exclusive to the Center Director!",
    lockedTabHint: "Please use the role switcher widget above to switch to Center Director to unlock this board.",
    lblRevenue: "Revenue Cumulative Analysis (6 months)",
    lblStudentTraffic: "Student Enrollment Traffic",
    lblStaffPerformance: "Staff Performance & Mastery Board",
    lblPerformanceScore: "Mastery Rate:",
    lblSatisfaction: "Parent Satisfaction:",
    lblHoursCompleted: "Clinical Hours:",
    lblTopExpert: "Operational Score:",
    lblActiveStudents: "New Enrollments",
    lblGraduatedStudents: "Graduates",
    lblRevenueVND: "Million VND",
    lblTotalRevenue: "Total Revenue",
    lblActiveCases: "Active Therapy Cases",
    lblAvgSatisfaction: "Average Satisfaction"
  }
};

const CenterDetailView: React.FC<CenterDetailViewProps> = ({
  lang,
  center,
  onBack,
  onUpdateLevels,
  onUpdateCategories,
  onUpdateCenter,
  onDeleteCenter
}) => {
  const t = translations[lang];
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'levels' | 'categories' | 'roles' | 'staffs' | 'director_stats'>('overview');
  const [userRole, setUserRole] = useState<'admin' | 'director'>('admin');

  // Edit center modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [centerName, setCenterName] = useState(center.name);
  const [address, setAddress] = useState(center.address || '');
  const [phone, setPhone] = useState(center.phone_number || '');
  const [email, setEmail] = useState(center.email || '');
  const [directorName, setDirectorName] = useState('');
  const [editError, setEditError] = useState('');

  // Delete center modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleOpenEdit = () => {
    setCenterName(center.name);
    setAddress(center.address || '');
    setPhone(center.phone_number || '');
    setEmail(center.email || '');
    setDirectorName(center.staffs?.find(s => s.roleId === 'R-DIR')?.name || '');
    setEditError('');
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!centerName.trim()) {
      setEditError(t.requiredError);
      return;
    }

    let updatedStaffs = [...(center.staffs || [])];
    const existingDirIndex = updatedStaffs.findIndex(s => s.roleId === 'R-DIR');
    
    if (directorName.trim()) {
      if (existingDirIndex >= 0) {
        updatedStaffs[existingDirIndex] = {
          ...updatedStaffs[existingDirIndex],
          name: directorName
        };
      } else {
        const currentDate = new Date().toISOString().split('T')[0];
        updatedStaffs.push({
          id: `S-${Date.now().toString().slice(-4)}`,
          name: directorName,
          roleId: 'R-DIR',
          email: email,
          phone: phone,
          joinedDate: currentDate,
          status: 'Active'
        });
      }
    } else {
      if (existingDirIndex >= 0) {
        updatedStaffs.splice(existingDirIndex, 1);
      }
    }

    const updated: Center = {
      ...center,
      name: centerName,
      address,
      phone_number: phone,
      email,
      staffs: updatedStaffs
    };

    onUpdateCenter(updated);
    setIsEditModalOpen(false);
  };

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteInput === center.id) {
      onDeleteCenter(center.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="dashboard-content-area" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      {/* Back button and title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            className="back-btn-v2"
          >
            ← {t.back}
          </button>
          <div>
            <h2 className="table-title" style={{ margin: 0, fontSize: '1.6rem' }}>{center.name}</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>ID: {center.id}</span>
          </div>
        </div>

        <div>
          <span className={`badge ${center.status.toLowerCase()}`}>
            {center.status === 'Active' ? t.active : t.inactive}
          </span>
        </div>
      </div>

      {/* Role Simulator Widget: Memphis Playful 3D dashboard */}
      <div 
        className="role-simulator-widget"
        style={{
          background: '#FFFBEB',
          border: '3px dashed #F59E0B',
          borderRadius: '16px',
          padding: '0.85rem 1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '4px 4px 0px #1E293B',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.25rem' }}>🧑‍💻</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            {t.roleSimulatorTitle}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            type="button"
            className={`simulator-role-btn ${userRole === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setUserRole('admin');
              if (activeSubTab === 'director_stats') {
                setActiveSubTab('overview');
              }
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: '2px solid #1E293B',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              background: userRole === 'admin' ? '#FBBF24' : '#FFFFFF',
              boxShadow: userRole === 'admin' ? '2px 2px 0px #1E293B' : '1px 1px 0px #1E293B',
              transform: userRole === 'admin' ? 'translateY(1px)' : 'none',
              transition: 'all 100ms ease'
            }}
          >
            {t.roleAdmin}
          </button>
          <button
            type="button"
            className={`simulator-role-btn ${userRole === 'director' ? 'active' : ''}`}
            onClick={() => setUserRole('director')}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: '2px solid #1E293B',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              background: userRole === 'director' ? '#8B5CF6' : '#FFFFFF',
              color: userRole === 'director' ? '#FFFFFF' : '#1E293B',
              boxShadow: userRole === 'director' ? '2px 2px 0px #1E293B' : '1px 1px 0px #1E293B',
              transform: userRole === 'director' ? 'translateY(1px)' : 'none',
              transition: 'all 100ms ease'
            }}
          >
            {t.roleDirector}
          </button>
        </div>
      </div>

      {/* Sub-tab navigation */}
      <div className="sub-tab-navigation">
        {[
          { id: 'overview', icon: 'ℹ️', label: t.tabOverview },
          { id: 'director_stats', icon: userRole === 'director' ? '📊' : '🔒', label: t.tabDirectorStats },
          { id: 'levels', icon: '🧩', label: t.tabLevels },
          { id: 'categories', icon: '📂', label: t.tabCategories },
          { id: 'roles', icon: '🛡️', label: t.tabRoles },
          { id: 'staffs', icon: '👥', label: t.tabStaffs }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`sub-tab-btn ${activeSubTab === tab.id ? 'active' : ''}`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Render sub-tab content */}
      {activeSubTab === 'overview' && (
        <div className="overview-sub-tab" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            {/* Center Profile Bento Grid Box */}
            <div
              className="overview-card glass"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '20px',
                padding: '2rem',
                gridColumn: 'span 2',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <h3 style={{ margin: 0, color: '#0F172A', fontSize: '1.2rem', fontWeight: 800 }}>
                    {t.cardInfoTitle}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handleOpenEdit}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        background: 'white',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        color: '#0F172A',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.color = 'var(--primary)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.color = '#0F172A';
                      }}
                    >
                      {t.btnEdit}
                    </button>
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#FEF2F2',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        color: '#EF4444',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#FEE2E2'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#FEF2F2'}
                    >
                      {t.btnDeleteCenter}
                    </button>
                  </div>
                </div>

                {/* Database Schema Grid Layout */}
                <div style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem', marginBottom: '1.5rem' }}>


                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t.centerId}
                      </span>
                      <code style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 700 }}>{center.id}</code>
                    </div>

                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t.lblCenterName}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 700 }}>{center.name}</span>
                    </div>

                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t.lblAddress}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 700 }}>{center.address || 'N/A'}</span>
                    </div>

                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t.lblPhone}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 700 }}>{center.phone_number || 'N/A'}</span>
                    </div>

                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t.lblDirector}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 700 }}>
                        {center.staffs?.find(s => s.roleId === 'R-DIR')?.name || t.unassigned}
                      </span>
                    </div>

                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t.lblEmail}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 700 }}>{center.email || 'N/A'}</span>
                    </div>

                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                        {t.createdDate}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 700 }}>{center.date}</span>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* Quick stats box */}
            <div
              className="overview-card"
              style={{
                background: 'linear-gradient(135deg, #1E1B4B 0%, #111827 100%)',
                color: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 25px rgba(30, 27, 75, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Neon accent corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  filter: 'blur(40px)',
                  opacity: 0.4
                }}
              ></div>

              <h3 style={{ margin: '0 0 1.5rem 0', color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>
                {t.quickStats}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>{t.statsTeachers}</span>
                  <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: 800 }}>{center.staffs?.length || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>{t.statsChildren}</span>
                  <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: 800 }}>{center.roles?.length || 0}</span>
                </div>
              </div>
              {/* Bento stats grid inside dark card */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{t.statsLevels}</span>
                  <span style={{ display: 'block', fontSize: '1.75rem', color: 'white', fontWeight: 800, marginTop: '0.25rem' }}>{center.levels.length}</span>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{t.statsCategories}</span>
                  <span style={{ display: 'block', fontSize: '1.75rem', color: 'white', fontWeight: 800, marginTop: '0.25rem' }}>{center.categories.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Director Stats Tab */}
      {activeSubTab === 'director_stats' && (
        <div className="director-stats-sub-tab" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          {userRole !== 'director' ? (
            /* LOCKED STATE WARNING CARD */
            <div 
              className="profile-sticker-card locked-warning-card"
              style={{
                background: '#FFFFFF',
                border: '3px solid #1E293B',
                borderRadius: '24px',
                padding: '3rem 2rem',
                textAlign: 'center',
                boxShadow: '10px 10px 0px #1E293B',
                maxWidth: '640px',
                margin: '2rem auto',
                boxSizing: 'border-box'
              }}
            >
              <div 
                className="locked-wobble-icon" 
                style={{ 
                  fontSize: '4.2rem', 
                  marginBottom: '1.25rem',
                  display: 'inline-block',
                  animation: 'wobble 2s infinite ease-in-out'
                }}
              >
                🔒
              </div>
              <h3 style={{ margin: '0 0 0.85rem 0', color: '#EF4444', fontSize: '1.45rem', fontWeight: 900, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {t.lockedTabWarning}
              </h3>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.6 }}>
                {t.lockedTabHint}
              </p>
            </div>
          ) : (
            /* DIRECTOR DETAILED STATISTICS DASHBOARD */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Sticker Heading */}
              <div 
                className="director-stats-hero-banner"
                style={{
                  background: '#FFFFFF',
                  border: '3px solid #1E293B',
                  borderRadius: '20px',
                  padding: '1.5rem 1.8rem',
                  boxShadow: '6px 6px 0px #1E293B',
                  boxSizing: 'border-box'
                }}
              >
                <h3 style={{ margin: 0, color: '#1E293B', fontSize: '1.4rem', fontWeight: 900 }}>
                  📊 {t.directorStatsTitle}
                </h3>
                <p style={{ margin: '6px 0 0 0', color: '#64748B', fontSize: '0.88rem', fontWeight: 700 }}>
                  {t.directorStatsDesc}
                </p>
              </div>

              {/* Bento Row 1: Revenue 3D Chart + Student Enrollment waves */}
              <div 
                className="director-charts-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                  gap: '1.8rem'
                }}
              >
                {/* 1. Doanh thu tích lũy 6 tháng */}
                <div 
                  className="director-chart-card"
                  style={{
                    background: '#FFFFFF',
                    border: '3px solid #1E293B',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '6px 6px 0px #1E293B',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <h4 style={{ margin: 0, color: '#1E293B', fontSize: '0.95rem', fontWeight: 900 }}>
                      💰 {t.lblRevenue}
                    </h4>
                    <span className="revenue-avg-badge" style={{ background: '#EDE9FE', color: '#8B5CF6', border: '1.5px solid #1E293B', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', boxShadow: '2px 2px 0px #1E293B' }}>
                      +18.5% Q/Q
                    </span>
                  </div>

                  {/* 3D Memphis column bars */}
                  <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '25%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '75%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>

                    {[
                      { month: 'T1', val: 180, fill: '#8B5CF6', depth: '#6D28D9' },
                      { month: 'T2', val: 210, fill: '#EC4899', depth: '#BE185D' },
                      { month: 'T3', val: 260, fill: '#34D399', depth: '#059669' },
                      { month: 'T4', val: 230, fill: '#FBBF24', depth: '#D97706' },
                      { month: 'T5', val: 280, fill: '#60A5FA', depth: '#2563EB' },
                      { month: 'T6', val: 290, fill: '#8B5CF6', depth: '#6D28D9' }
                    ].map((bar, idx) => {
                      const h = `${(bar.val / 320) * 100}%`;
                      return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                          <div
                            className="chart-bar-3d-wrap"
                            style={{
                              width: '26px',
                              height: h,
                              position: 'relative',
                              transformStyle: 'preserve-3d',
                              transform: 'rotateX(-12deg) rotateY(-15deg)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {/* Front face */}
                            <div 
                              style={{ 
                                position: 'absolute', 
                                bottom: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                background: bar.fill, 
                                border: '2px solid #1E293B',
                                borderBottom: 'none',
                                borderRadius: '4px 4px 0 0',
                                boxSizing: 'border-box'
                              }}
                            >
                              <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 900, color: '#1E293B' }}>
                                {bar.val}
                              </span>
                            </div>
                            {/* Right side depth face */}
                            <div 
                              style={{ 
                                position: 'absolute', 
                                bottom: 0, 
                                right: '-8px', 
                                width: '8px', 
                                height: '100%', 
                                background: bar.depth, 
                                border: '2px solid #1E293B',
                                borderLeft: 'none',
                                transform: 'skewY(45deg)',
                                transformOrigin: 'left bottom',
                                boxSizing: 'border-box'
                              }}
                            ></div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 900, marginTop: '8px' }}>{bar.month}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Legend text */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', borderTop: '2px dashed #E2E8F0', paddingTop: '0.85rem' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700 }}>{t.lblTotalRevenue}:</span>
                    <span style={{ fontSize: '0.95rem', color: '#1E293B', fontWeight: 900 }}>1.450 {t.lblRevenueVND}</span>
                  </div>
                </div>

                {/* 2. Biến động học viên */}
                <div 
                  className="director-chart-card"
                  style={{
                    background: '#FFFFFF',
                    border: '3px solid #1E293B',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '6px 6px 0px #1E293B',
                    boxSizing: 'border-box'
                  }}
                >
                  <h4 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', fontSize: '0.95rem', fontWeight: 900 }}>
                    📈 {t.lblStudentTraffic}
                  </h4>

                  <div style={{ height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
                      <defs>
                        <linearGradient id="waveActive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="50" x2="400" y2="50" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
                      <line x1="0" y1="100" x2="400" y2="100" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />

                      {/* Area wave */}
                      <path d="M0 200 L0 140 Q60 80 120 150 T240 100 T360 60 L400 60 L400 200 Z" fill="url(#waveActive)" />

                      {/* Line active students */}
                      <path d="M0 140 Q60 80 120 150 T240 100 T360 60 L400 60" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />

                      {/* Line graduated students dashed */}
                      <path d="M0 180 Q80 170 160 140 T320 90 L400 80" fill="none" stroke="#34D399" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />

                      {/* Peak dots */}
                      <circle cx="240" cy="100" r="5" fill="#8B5CF6" stroke="#1E293B" strokeWidth="2" />
                      <circle cx="320" cy="90" r="5" fill="#34D399" stroke="#1E293B" strokeWidth="2" />
                    </svg>

                    {/* Legend keys */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginTop: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '12px', height: '3px', background: '#8B5CF6', borderRadius: '2px' }}></span>
                        <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 800 }}>{t.lblActiveStudents}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '12px', height: '3px', background: '#34D399', borderStyle: 'dashed', borderRadius: '2px' }}></span>
                        <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 800 }}>{t.lblGraduatedStudents}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Row 2: Bảng xếp hạng Hiệu suất Nhân sự */}
              <div 
                className="director-staff-performance-container"
                style={{
                  background: '#FFFFFF',
                  border: '3px solid #1E293B',
                  borderRadius: '20px',
                  padding: '1.5rem 1.8rem',
                  boxShadow: '6px 6px 0px #1E293B',
                  boxSizing: 'border-box'
                }}
              >
                <h4 style={{ margin: '0 0 1.25rem 0', color: '#1E293B', fontSize: '0.98rem', fontWeight: 900 }}>
                  👥 {t.lblStaffPerformance}
                </h4>

                <div 
                  className="staff-performance-list"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  {(center.staffs && center.staffs.length > 0 ? center.staffs : [
                    { id: 'S-DIR', name: 'Dr. Nguyễn Văn A', roleId: 'R-DIR', status: 'Active' },
                    { id: 'S-TCH', name: 'Cô Lê Thị B', roleId: 'R-TCH', status: 'Active' }
                  ]).map((st, idx) => {
                    // Trích xuất vai trò
                    const r = center.roles?.find(role => role.id === st.roleId);
                    const roleName = r ? (lang === 'vi' ? r.nameVi : r.nameEn) : 'Staff Member';
                    
                    // Giả lập điểm số cho từng nhân sự
                    const mastery = idx === 0 ? 94 : idx === 1 ? 88 : 85;
                    const sat = idx === 0 ? 98 : idx === 1 ? 95 : 92;
                    const hrs = idx === 0 ? 320 : idx === 1 ? 280 : 240;

                    return (
                      <div 
                        key={st.id}
                        className="performance-item-row"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#F8FAFC',
                          border: '2px solid #1E293B',
                          borderRadius: '16px',
                          padding: '1rem 1.25rem',
                          boxShadow: '3px 3px 0px #1E293B',
                          flexWrap: 'wrap',
                          gap: '1.25rem',
                          boxSizing: 'border-box'
                        }}
                      >
                        {/* Profile Info Left */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: '220px' }}>
                          <div 
                            style={{ 
                              width: '42px', 
                              height: '42px', 
                              borderRadius: '50%', 
                              background: idx === 0 ? '#EDE9FE' : idx === 1 ? '#D1FAE5' : '#FEF3C7',
                              border: '2px solid #1E293B',
                              boxShadow: '1.5px 1.5px 0px #1E293B',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.15rem'
                            }}
                          >
                            👤
                          </div>
                          <div>
                            <h5 style={{ margin: 0, color: '#1E293B', fontSize: '0.88rem', fontWeight: 900 }}>
                              {st.name}
                            </h5>
                            <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                              {roleName}
                            </span>
                          </div>
                        </div>

                        {/* Middle Mastery bar 3D */}
                        <div style={{ flexGrow: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#475569' }}>
                            <span>{t.lblPerformanceScore}</span>
                            <span>{mastery}%</span>
                          </div>
                          <div 
                            style={{ 
                              height: '14px', 
                              background: '#E2E8F0', 
                              border: '2px solid #1E293B', 
                              borderRadius: '999px',
                              overflow: 'hidden',
                              boxSizing: 'border-box'
                            }}
                          >
                            <div 
                              style={{ 
                                height: '100%', 
                                width: `${mastery}%`,
                                background: idx === 0 ? 'linear-gradient(to right, #8B5CF6, #EC4899)' : idx === 1 ? 'linear-gradient(to right, #10B981, #34D399)' : 'linear-gradient(to right, #F59E0B, #FBBF24)',
                                transition: 'width 1s ease-out'
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Extra indicators Right */}
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                              {t.lblSatisfaction}
                            </span>
                            <span className="satisfaction-badge" style={{ background: '#FEF3C7', color: '#D97706', border: '1.5px solid #1E293B', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 900, padding: '1px 6px', display: 'inline-block', marginTop: '2px' }}>
                              ⭐️ {sat}%
                            </span>
                          </div>
                          
                          <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>
                              {t.lblHoursCompleted}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#1E293B', fontWeight: 900 }}>
                              {hrs}h
                            </span>
                          </div>

                          {idx === 0 && (
                            <span className="best-staff-badge" style={{ background: '#FEF08A', border: '2px solid #1E293B', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 900, color: '#B45309', padding: '3px 8px', boxShadow: '2px 2px 0px #1E293B', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                              🏆 Best
                            </span>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Statistical Analysis Section */}
              <div
                className="statistical-analysis-section"
                style={{
                  background: '#FFFFFF',
                  border: '3px solid #1E293B',
                  borderRadius: '20px',
                  padding: '1.5rem 1.8rem',
                  boxShadow: '6px 6px 0px #1E293B',
                  boxSizing: 'border-box',
                  width: '100%',
                  marginTop: '1.8rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#1E293B', fontSize: '1.15rem', fontWeight: 900 }}>
                      📊 {t.statsChartTitle}
                    </h3>
                    <p style={{ margin: '4px 0 0 0', color: '#64748B', fontSize: '0.8rem', fontWeight: 700 }}>
                      {t.statsChartDesc}
                    </p>
                  </div>
                </div>

                <div 
                  className="director-charts-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                    gap: '1.8rem'
                  }}
                >
                  {/* Chart 1: Column Bar Chart */}
                  <div style={{ border: '2.5px solid #1E293B', borderRadius: '16px', padding: '1.5rem', background: '#F8FAFC', boxShadow: '3px 3px 0px #1E293B' }}>
                    <h4 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', fontSize: '0.95rem', fontWeight: 900 }}>
                      📈 {t.chartInterventions}
                    </h4>
                    
                    <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px', position: 'relative' }}>
                      {/* Grid lines */}
                      <div style={{ position: 'absolute', left: 0, right: 0, top: '25%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>
                      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>
                      <div style={{ position: 'absolute', left: 0, right: 0, top: '75%', borderBottom: '2px dashed #E2E8F0', height: 0 }}></div>

                      {[
                        { month: 'T1', hours: 120 },
                        { month: 'T2', hours: 150 },
                        { month: 'T3', hours: 185 },
                        { month: 'T4', hours: 160 },
                        { month: 'T5', hours: 210 },
                        { month: 'T6', hours: 240 }
                      ].map((bar, idx) => {
                        const h = `${(bar.hours / 260) * 100}%`;
                        return (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                            <div
                              style={{
                                width: '24px',
                                height: h,
                                background: 'linear-gradient(to top, var(--primary) 0%, #2DD4BF 100%)',
                                border: '2px solid #1E293B',
                                borderRadius: '4px 4px 0 0',
                                boxShadow: '2px 2px 0px #1E293B',
                                position: 'relative'
                              }}
                            >
                              <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 900, color: '#1E293B', whiteSpace: 'nowrap' }}>
                                {bar.hours}h
                              </span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 900, marginTop: '8px' }}>{bar.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
 
                  {/* Chart 2: SVG Area Wave Path Chart */}
                  <div style={{ border: '2.5px solid #1E293B', borderRadius: '16px', padding: '1.5rem', background: '#F8FAFC', boxShadow: '3px 3px 0px #1E293B' }}>
                    <h4 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', fontSize: '0.95rem', fontWeight: 900 }}>
                      🧬 {t.chartCategories}
                    </h4>
 
                    <div style={{ height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
                        <defs>
                          <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
 
                        {/* Guidelines */}
                        <line x1="0" y1="50" x2="400" y2="50" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
                        <line x1="0" y1="150" x2="400" y2="150" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
 
                        {/* Area wave path */}
                        <path
                          d="M0 200 L0 120 Q50 60 100 130 T200 80 T300 110 T400 40 L400 200 Z"
                          fill="url(#waveGrad)"
                        />
 
                        {/* Stroke line path */}
                        <path
                          d="M0 120 Q50 60 100 130 T200 80 T300 110 T400 40"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
 
                        {/* Target baseline path */}
                        <path
                          d="M0 150 Q70 140 150 110 T300 70 T400 30"
                          fill="none"
                          stroke="#94A3B8"
                          strokeWidth="2"
                          strokeDasharray="5 5"
                        />
 
                        {/* Pulse dots at peaks */}
                        <circle cx="200" cy="80" r="5" fill="var(--primary)" stroke="#1E293B" strokeWidth="2" />
                        <circle cx="200" cy="80" r="10" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.5">
                          <animate attributeName="r" values="5;14" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                        </circle>
 
                        <circle cx="400" cy="40" r="5" fill="var(--primary)" stroke="#1E293B" strokeWidth="2" />
                      </svg>
                      
                      {/* Legend */}
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '12px', height: '3px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                          <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 800 }}>Actual</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '12px', height: '3px', background: '#94A3B8', borderStyle: 'dashed', borderRadius: '2px' }}></span>
                          <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 800 }}>Target</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {activeSubTab === 'levels' && (
        <CenterLevelsTab
          lang={lang}
          levels={center.levels}
          onUpdateLevels={onUpdateLevels}
        />
      )}

      {activeSubTab === 'categories' && (
        <CenterCategoriesTab
          lang={lang}
          categories={center.categories}
          onUpdateCategories={onUpdateCategories}
        />
      )}

      {activeSubTab === 'roles' && (
        <CenterRolesTab
          lang={lang}
          roles={center.roles || []}
          onUpdateRoles={(newRoles) => onUpdateCenter({ ...center, roles: newRoles })}
        />
      )}

      {activeSubTab === 'staffs' && (
        <CenterStaffsTab
          lang={lang}
          staffs={center.staffs || []}
          roles={center.roles || []}
          onUpdateStaffs={(newStaffs) => onUpdateCenter({ ...center, staffs: newStaffs })}
        />
      )}

      {/* Edit center metadata Modal */}
      {isEditModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            className="modal-box glass"
            style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '500px',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <form onSubmit={handleSaveEdit}>
              <h3 style={{ margin: '0 0 1.5rem 0', color: '#0F172A', fontSize: '1.3rem', fontWeight: 800 }}>
                ⚙️ {t.editTitle}
              </h3>

              {editError && (
                <div style={{ color: '#EF4444', background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                  ❌ {editError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Tên cơ sở (center_name) *
                  </label>
                  <input
                    type="text"
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
                    placeholder={t.placeholderCenterName}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Địa chỉ hoạt động (address)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.placeholderAddress}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Số điện thoại liên lạc (phone_number)
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.placeholderPhone}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Thư điện tử (email)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholderEmail}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    {lang === 'vi' ? 'Giám đốc Trung tâm (Director)' : 'Center Director'}
                  </label>
                  <input
                    type="text"
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    placeholder="..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    background: 'white',
                    fontWeight: 700,
                    color: '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'var(--primary)',
                    fontWeight: 700,
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)'
                  }}
                >
                  {t.btnSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete center confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            className="modal-box glass"
            style={{
              background: 'white',
              border: '1px solid #EF4444',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '500px',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.1)',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <form onSubmit={handleDeleteSubmit}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#EF4444', fontSize: '1.3rem', fontWeight: 800 }}>
                ⚠️ {t.deleteTitle}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {t.deleteConfirm}
              </p>

              <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#991B1B', marginBottom: '8px' }}>
                  {t.confirmDeleteInput}
                </span>
                <code
                  style={{
                    display: 'block',
                    background: '#FEE2E2',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#991B1B',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    letterSpacing: '1px'
                  }}
                >
                  {center.id}
                </code>
                <input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder={center.id}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #FCA5A5',
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#991B1B',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    background: 'white',
                    fontWeight: 700,
                    color: '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  disabled={deleteInput !== center.id}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    background: deleteInput === center.id ? '#EF4444' : '#FCA5A5',
                    fontWeight: 700,
                    color: 'white',
                    cursor: deleteInput === center.id ? 'pointer' : 'not-allowed',
                    boxShadow: deleteInput === center.id ? '0 4px 12px rgba(239, 68, 68, 0.2)' : 'none'
                  }}
                >
                  {t.btnConfirmDelete}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterDetailView;
