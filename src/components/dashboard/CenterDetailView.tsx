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
    chartCategories: "Tỷ lệ phân bổ bài tập kỹ năng"
  },
  en: {
    back: "Back to centers",
    tabOverview: "Overview Info",
    tabLevels: "Exercise Levels",
    tabCategories: "Exercise Categories",
    tabRoles: "Center Roles",
    tabStaffs: "Center Staffs",
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
    chartCategories: "Skill category distribution ratio"
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
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'levels' | 'categories' | 'roles' | 'staffs'>('overview');

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
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              background: 'white',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#0F172A',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
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

      {/* Sub-tab navigation */}
      <div
        className="sub-tab-navigation"
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '2px solid #E2E8F0',
          paddingBottom: '1px',
          marginBottom: '2rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {[
          { id: 'overview', icon: 'ℹ️', label: t.tabOverview },
          { id: 'levels', icon: '🧩', label: t.tabLevels },
          { id: 'categories', icon: '📂', label: t.tabCategories },
          { id: 'roles', icon: '🛡️', label: t.tabRoles },
          { id: 'staffs', icon: '👥', label: t.tabStaffs }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'transparent',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: activeSubTab === tab.id ? 'var(--primary)' : '#64748B',
              cursor: 'pointer',
              borderBottom: activeSubTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
              marginBottom: '-2px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
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

          {/* Statistical Analysis Section */}
          <div
            className="statistical-analysis-section glass"
            style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ margin: 0, color: '#0F172A', fontSize: '1.25rem', fontWeight: 800 }}>
                  📊 {t.statsChartTitle}
                </h3>
                <p style={{ margin: '4px 0 0 0', color: '#64748B', fontSize: '0.85rem' }}>{t.statsChartDesc}</p>
              </div>

              {/* Pulsing Example Badge */}
              <span
                style={{
                  background: 'rgba(13, 148, 136, 0.1)',
                  border: '1px solid rgba(13, 148, 136, 0.3)',
                  color: 'var(--primary)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 12px rgba(13, 148, 136, 0.15)',
                  animation: 'pulseGlow 2s infinite ease-in-out'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></span>
                {t.exampleChartBadge}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
              {/* Chart 1: Column Bar Chart */}
              <div style={{ border: '1px solid #F1F5F9', borderRadius: '16px', padding: '1.5rem', background: '#F8FAFC' }}>
                <h4 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', fontSize: '0.95rem', fontWeight: 700 }}>
                  📈 {t.chartInterventions}
                </h4>
                
                <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px', position: 'relative' }}>
                  {/* Grid lines */}
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '25%', borderBottom: '1px dashed #E2E8F0', height: 0 }}></div>
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderBottom: '1px dashed #E2E8F0', height: 0 }}></div>
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '75%', borderBottom: '1px dashed #E2E8F0', height: 0 }}></div>

                  {[
                    { month: 'T1', hours: 120, pct: '50%' },
                    { month: 'T2', hours: 150, pct: '62%' },
                    { month: 'T3', hours: 185, pct: '77%' },
                    { month: 'T4', hours: 160, pct: '66%' },
                    { month: 'T5', hours: 210, pct: '88%' },
                    { month: 'T6', hours: 240, pct: '100%' }
                  ].map((bar, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                      <div
                        style={{
                          width: '28px',
                          height: 0,
                          background: 'linear-gradient(to top, var(--primary) 0%, #2DD4BF 100%)',
                          borderRadius: '6px 6px 0 0',
                          boxShadow: '0 4px 10px rgba(13, 148, 136, 0.2)',
                          transition: 'height 1s ease-out',
                          animation: `growUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards ${idx * 0.1}s`,
                          position: 'relative'
                        }}
                        className="chart-bar"
                        data-value={`${bar.hours}h`}
                      >
                        {/* Hover Tooltip */}
                        <span className="bar-tooltip">{bar.hours}h</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginTop: '8px' }}>{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: SVG Area Wave Path Chart */}
              <div style={{ border: '1px solid #F1F5F9', borderRadius: '16px', padding: '1.5rem', background: '#F8FAFC' }}>
                <h4 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', fontSize: '0.95rem', fontWeight: 700 }}>
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
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#E2E8F0" strokeDasharray="4 4" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#E2E8F0" strokeDasharray="4 4" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="#E2E8F0" strokeDasharray="4 4" />

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
                      strokeWidth="3"
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
                    <circle cx="200" cy="80" r="5" fill="var(--primary)" />
                    <circle cx="200" cy="80" r="10" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="r" values="5;14" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                    </circle>

                    <circle cx="400" cy="40" r="5" fill="var(--primary)" />
                  </svg>
                  
                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '12px', height: '3px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                      <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>Actual Intervention</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '12px', height: '3px', background: '#94A3B8', borderStyle: 'dashed', borderRadius: '2px' }}></span>
                      <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>Standard Target</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
