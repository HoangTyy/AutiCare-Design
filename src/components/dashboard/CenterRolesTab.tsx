import React, { useState, useEffect } from 'react';
import type { CenterRole } from './CenterDetailView';

interface CenterRolesTabProps {
  lang: 'vi' | 'en';
  roles: CenterRole[];
  onUpdateRoles: (newRoles: CenterRole[]) => void;
}

const translations = {
  vi: {
    title: "Vai trò & Quyền hạn",
    searchPlaceholder: "Tìm vai trò...",
    addBtn: "➕ Thêm vai trò",
    active: "Hoạt động",
    inactive: "Tạm ngưng",
    isDefault: "Hệ thống",
    isCustom: "Tự tạo",
    tabGeneral: "⚙️ Thông tin chung",
    tabPermissions: "🛡️ Quyền hạn",
    roleNameVi: "Tên vai trò (Tiếng Việt) *",
    roleNameEn: "Tên vai trò (Tiếng Anh) *",
    statusLabel: "Trạng thái hoạt động",
    deleteBtn: "🗑️ Xóa vai trò",
    deleteConfirmTitle: "Xóa vai trò này?",
    deleteConfirmDesc: "Hành động này không thể hoàn tác. Tất cả nhân viên gán vai trò này sẽ tạm thời không có vai trò.",
    systemRoleWarning: "⚠️ Đây là vai trò mặc định của AutiCare. Quyền hạn và thông tin của vai trò này được khóa để đảm bảo an toàn vận hành trung tâm.",
    dragTooltip: "Kéo thả để sắp xếp thứ tự ưu tiên (Priority)",
    autoSaved: "✨ Đã lưu thay đổi thành công",
    noRoles: "Không tìm thấy vai trò nào.",
    priorityLabel: "Thứ tự ưu tiên (Discord Priority)",
    priorityDesc: "Vai trò xếp ở trên cùng danh sách sẽ có độ ưu tiên cao nhất.",
    newRoleName: "Vai trò mới",
    confirmDeleteBtn: "Xóa ngay",
    cancelBtn: "Hủy bỏ",
    requiredError: "Tên vai trò không được bỏ trống!",
    saveWarning: "Cẩn thận! Bạn có những thay đổi chưa lưu.",
    saveChangesBtn: "Lưu thay đổi",
    discardChangesBtn: "Hủy bỏ"
  },
  en: {
    title: "Roles & Permissions",
    searchPlaceholder: "Search roles...",
    addBtn: "➕ Add Role",
    active: "Active",
    inactive: "Inactive",
    isDefault: "System",
    isCustom: "Custom",
    tabGeneral: "⚙️ General Info",
    tabPermissions: "🛡️ Permissions",
    roleNameVi: "Role Name (Vietnamese) *",
    roleNameEn: "Role Name (English) *",
    statusLabel: "Operational Status",
    deleteBtn: "🗑️ Delete Role",
    deleteConfirmTitle: "Delete this role?",
    deleteConfirmDesc: "This action cannot be undone. All staffs assigned to this role will temporarily have no role.",
    systemRoleWarning: "⚠️ This is an AutiCare system default role. Its permissions and details are locked to ensure stable center operations.",
    dragTooltip: "Drag & drop to reorder priority",
    autoSaved: "✨ Changes saved successfully",
    noRoles: "No roles found.",
    priorityLabel: "Priority Ranking (Discord-style)",
    priorityDesc: "Roles at the top of the list have the highest operational priority.",
    newRoleName: "New Role",
    confirmDeleteBtn: "Delete Now",
    cancelBtn: "Cancel",
    requiredError: "Role name cannot be empty!",
    saveWarning: "Careful! You have unsaved changes.",
    saveChangesBtn: "Save Changes",
    discardChangesBtn: "Reset"
  }
};

const permissionsList = [
  {
    key: 'manage_center',
    icon: '🏢',
    nameVi: 'Quản lý Trung tâm',
    nameEn: 'Manage Center',
    descVi: 'Quản lý thông tin trung tâm (Tên, địa chỉ, liên hệ và xóa trung tâm).',
    descEn: 'Manage center profile metadata (Name, address, contact info and delete center).'
  },
  {
    key: 'manage_staffs',
    icon: '👥',
    nameVi: 'Quản lý Nhân sự',
    nameEn: 'Manage Staffs',
    descVi: 'Quản lý danh sách nhân sự, phân bổ chức vụ và trạng thái hoạt động.',
    descEn: 'Manage staff roster, assign roles, and operational status.'
  },
  {
    key: 'manage_roles',
    icon: '🛡️',
    nameVi: 'Quản lý Vai trò & Quyền hạn',
    nameEn: 'Manage Roles',
    descVi: 'Quản lý vai trò, quyền hạn tùy chỉnh và sắp xếp thứ tự ưu tiên kéo thả.',
    descEn: 'Manage center roles, custom permissions, and priority dragging.'
  },
  {
    key: 'view_analytics',
    icon: '📈',
    nameVi: 'Xem Phân tích Thống kê',
    nameEn: 'View Analytics',
    descVi: 'Xem báo cáo thống kê, số giờ can thiệp và biểu đồ tiến trình trẻ.',
    descEn: 'View analytics reports, intervention hours, and child progress charts.'
  },
  {
    key: 'manage_levels',
    icon: '🧩',
    nameVi: 'Quản lý Cấp độ Bài tập',
    nameEn: 'Manage Exercise Levels',
    descVi: 'Thiết lập cấp độ bài tập và độ khó can thiệp riêng của cơ sở.',
    descEn: 'Configure exercise levels and custom difficulty settings for the center.'
  },
  {
    key: 'manage_categories',
    icon: '📂',
    nameVi: 'Quản lý Danh mục Bài tập',
    nameEn: 'Manage Categories',
    descVi: 'Quản lý danh mục bài tập can thiệp theo dạng cây phân cấp.',
    descEn: 'Manage hierarchal exercise categories and structure.'
  },
  {
    key: 'manage_exercises',
    icon: '✏️',
    nameVi: 'Quản lý Bài tập',
    nameEn: 'Manage Exercises',
    descVi: 'Tạo mới, chỉnh sửa và cấu hình nội dung bài tập can thiệp.',
    descEn: 'Create, edit, and configure intervention exercise contents.'
  },
  {
    key: 'manage_blogs',
    icon: '📢',
    nameVi: 'Quản lý Truyền thông',
    nameEn: 'Manage Media & Blogs',
    descVi: 'Đăng tải bài viết truyền thông, tin tức và thông báo của trung tâm.',
    descEn: 'Publish marketing blog posts, announcements, and center news.'
  }
];

const CenterRolesTab: React.FC<CenterRolesTabProps> = ({ lang, roles, onUpdateRoles }) => {
  const t = translations[lang];
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'permissions'>('general');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  
  // Pending and saved roles state comparison buffers
  const [initialRoles, setInitialRoles] = useState<CenterRole[]>(roles);
  const [currentRoles, setCurrentRoles] = useState<CenterRole[]>(roles);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggedRoleId, setDraggedRoleId] = useState<string | null>(null);
  const [lastSwappedId, setLastSwappedId] = useState<string | null>(null);
  
  // Auto-saved micro-indicator state
  const [showSaved, setShowSaved] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Sync state if center or prop updates
  useEffect(() => {
    setInitialRoles(roles);
    setCurrentRoles(roles);
  }, [roles]);

  // Auto-select the first role on mount or search
  const sortedRoles = [...currentRoles].sort((a, b) => a.priority - b.priority);
  const filteredRoles = sortedRoles.filter(role => {
    const term = search.toLowerCase();
    return (
      role.nameVi.toLowerCase().includes(term) ||
      role.nameEn.toLowerCase().includes(term) ||
      role.id.toLowerCase().includes(term)
    );
  });

  const selectedRole = currentRoles.find(r => r.id === selectedRoleId) || filteredRoles[0] || null;

  useEffect(() => {
    if (selectedRole && selectedRoleId !== selectedRole.id) {
      setSelectedRoleId(selectedRole.id);
    }
  }, [selectedRole, selectedRoleId]);

  const triggerSavedIndicator = () => {
    setShowSaved(true);
    const timer = setTimeout(() => setShowSaved(false), 1500);
    return () => clearTimeout(timer);
  };

  // Reorder dragging (Discord-style swap in real time with high-fidelity visual glow animations)
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    if (filteredRoles[index]) {
      setDraggedRoleId(filteredRoles[index].id);
    }
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (hoveredIndex !== index) {
      setHoveredIndex(index);
    }
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && hoveredIndex !== null && draggedIndex !== hoveredIndex) {
      const sourceRole = filteredRoles[draggedIndex];
      if (sourceRole) {
        // Trigger glowing swap animation on landing!
        setLastSwappedId(sourceRole.id);
        const currentTargetId = sourceRole.id;
        setTimeout(() => {
          setLastSwappedId(prev => prev === currentTargetId ? null : prev);
        }, 700);
      }

      const reordered = [...filteredRoles];
      const draggedItem = reordered[draggedIndex];
      reordered.splice(draggedIndex, 1);
      reordered.splice(hoveredIndex, 0, draggedItem);

      // Re-calculate priorities
      const updated = reordered.map((r, idx) => ({
        ...r,
        priority: idx + 1
      }));

      // Merge back into original roles array
      const newRoles = currentRoles.map(orig => {
        const match = updated.find(u => u.id === orig.id);
        return match ? match : orig;
      });

      newRoles.sort((a, b) => a.priority - b.priority);
      setCurrentRoles(newRoles);
    }

    setDraggedIndex(null);
    setDraggedRoleId(null);
    setHoveredIndex(null);
  };

  // Form handlers
  const handleNameChange = (val: string, field: 'nameVi' | 'nameEn') => {
    if (!selectedRole || selectedRole.isDefault) return;
    const updated = currentRoles.map(r => r.id === selectedRole.id ? { ...r, [field]: val } : r);
    setCurrentRoles(updated);
  };

  const handleStatusChange = (val: 'Active' | 'Inactive') => {
    if (!selectedRole || selectedRole.isDefault) return;
    const updated = currentRoles.map(r => r.id === selectedRole.id ? { ...r, status: val } : r);
    setCurrentRoles(updated);
  };

  // Permission toggles
  const togglePermission = (permKey: string) => {
    if (!selectedRole || selectedRole.isDefault) return;
    
    const hasPerm = selectedRole.permissions.includes(permKey);
    const newPerms = hasPerm 
      ? selectedRole.permissions.filter(k => k !== permKey)
      : [...selectedRole.permissions, permKey];

    const updated = currentRoles.map(r => r.id === selectedRole.id ? { ...r, permissions: newPerms } : r);
    setCurrentRoles(updated);
  };

  // Create Role (spawn and select immediately)
  const handleCreateRole = () => {
    const newId = `R-${Math.floor(100 + Math.random() * 900)}`;
    const newRole: CenterRole = {
      id: newId,
      nameVi: t.newRoleName,
      nameEn: t.newRoleName,
      permissions: [],
      status: 'Active',
      priority: currentRoles.length + 1,
      isDefault: false
    };

    setCurrentRoles([...currentRoles, newRole]);
    setSelectedRoleId(newId);
    setActiveTab('general');
  };

  // Delete Role
  const handleDeleteRole = () => {
    if (!selectedRole || selectedRole.isDefault) return;
    const filtered = currentRoles.filter(r => r.id !== selectedRole.id);
    
    // Re-adjust priorities
    const updated = filtered.map((r, idx) => ({
      ...r,
      priority: idx + 1
    }));

    setCurrentRoles(updated);
    setDeleteConfirmOpen(false);
    
    // Select first role remaining
    if (updated.length > 0) {
      setSelectedRoleId(updated[0].id);
    }
  };

  // Unsaved Changes Actions
  const hasChanges = JSON.stringify(currentRoles) !== JSON.stringify(initialRoles);

  const handleSave = () => {
    onUpdateRoles(currentRoles);
    setInitialRoles(currentRoles);
    triggerSavedIndicator();
  };

  const handleDiscard = () => {
    setCurrentRoles(initialRoles);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px', animation: 'fadeIn 0.3s ease-out' }}>
      <style>{`
        .role-card-item {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      border-color 0.2s ease,
                      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.25s ease;
          position: relative;
          will-change: transform, box-shadow;
        }
        
        .role-card-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
        }
        
        .role-card-item.dragging {
          opacity: 0.35;
          transform: scale(0.96) translateY(0px) !important;
          background: rgba(13, 148, 136, 0.04) !important;
          border: 1px dashed var(--primary) !important;
          box-shadow: 0 0 10px rgba(13, 148, 136, 0.15) !important;
        }
        
        .role-card-item.just-swapped {
          animation: roleSwapGlow 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes roleSwapGlow {
          0% {
            border-color: #00F2FF !important;
            box-shadow: 0 0 15px rgba(0, 242, 255, 0.35) !important;
            background-color: rgba(0, 242, 255, 0.06) !important;
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .drag-handle-glow {
          transition: color 0.2s, text-shadow 0.2s;
        }
        
        .role-card-item:hover .drag-handle-glow {
          color: var(--primary) !important;
          text-shadow: 0 0 4px rgba(13, 148, 136, 0.4);
        }
      `}</style>
      
      {/* Title Header with Auto-Saved indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', position: 'relative' }}>
        <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>
          {t.title}
        </h3>
        
        {/* Glowing micro-indicator */}
        <div style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          color: '#047857',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          opacity: showSaved ? 1 : 0,
          pointerEvents: 'none',
          boxShadow: '0 4px 10px rgba(167, 243, 208, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <span style={{ fontSize: '0.85rem' }}>✨</span> {t.autoSaved}
        </div>
      </div>

      {/* Main Dual-Column Panel */}
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        
        {/* LEFT COLUMN: Roster list & search (35%) */}
        <div style={{
          flex: '1 1 320px',
          maxWidth: '400px',
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}>
          {/* Search bar + Add Button */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.85rem',
                  color: '#1E293B',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              />
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem', color: '#94A3B8', pointerEvents: 'none' }}>
                🔍
              </span>
            </div>
            
            <button
              onClick={handleCreateRole}
              title={t.addBtn}
              style={{
                background: 'var(--primary)',
                border: 'none',
                borderRadius: '10px',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(13, 148, 136, 0.15)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              ➕
            </button>
          </div>

          {/* Roles Scroll List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto',
            maxHeight: '480px',
            paddingRight: '4px'
          }}>
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role, idx) => {
                const isSelected = selectedRole?.id === role.id;
                
                // Calculate dynamic shifting translation to make room!
                let shiftY = 0;
                if (draggedIndex !== null && hoveredIndex !== null && idx !== draggedIndex) {
                  if (draggedIndex < hoveredIndex) {
                    if (idx > draggedIndex && idx <= hoveredIndex) {
                      shiftY = -62; // Shift up by card height + gap
                    }
                  } else if (draggedIndex > hoveredIndex) {
                    if (idx >= hoveredIndex && idx < draggedIndex) {
                      shiftY = 62; // Shift down by card height + gap
                    }
                  }
                }

                return (
                  <div
                    key={role.id}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      setSelectedRoleId(role.id);
                      setActiveTab('general');
                    }}
                    className={`role-card-item ${draggedRoleId === role.id ? 'dragging' : ''} ${lastSwappedId === role.id ? 'just-swapped' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(13, 148, 136, 0.06)' : 'transparent',
                      border: isSelected ? '1px solid rgba(13, 148, 136, 0.25)' : '1px solid transparent',
                      cursor: 'grab',
                      userSelect: 'none',
                      boxSizing: 'border-box',
                      transform: `translateY(${shiftY}px)`
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }
                    }}
                  >
                    {/* Drag handle dots */}
                    <span
                      className="drag-handle-glow"
                      title={t.dragTooltip}
                      style={{
                        marginRight: '10px',
                        fontSize: '1.1rem',
                        color: '#94A3B8',
                        cursor: 'grab'
                      }}
                    >
                      ⣿
                    </span>

                    {/* Role identity info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: isSelected ? 'var(--primary)' : '#0F172A',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {lang === 'vi' ? role.nameVi : role.nameEn}
                      </div>
                      <div style={{
                        fontSize: '0.72rem',
                        color: '#64748B',
                        marginTop: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {lang === 'vi' ? role.nameEn : role.nameVi}
                      </div>
                    </div>

                    {/* Badges system */}
                    <div style={{ display: 'flex', gap: '4px', marginLeft: '6px' }}>
                      {role.isDefault ? (
                        <span style={{
                          background: '#EFF6FF',
                          border: '1px solid #DBEAFE',
                          color: '#1E40AF',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          textTransform: 'uppercase'
                        }}>
                          {t.isDefault}
                        </span>
                      ) : (
                        <span style={{
                          background: '#F0FDFA',
                          border: '1px solid #CCFBF1',
                          color: '#0F766E',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          textTransform: 'uppercase'
                        }}>
                          {t.isCustom}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                {t.noRoles}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Configuration detail panel (65%) */}
        <div style={{
          flex: '2 1 450px',
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}>
          {selectedRole ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Detail Header Title */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                    {lang === 'vi' ? selectedRole.nameVi : selectedRole.nameEn}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
                    ID: <span style={{ color: 'var(--primary)' }}>{selectedRole.id}</span> • Priority: <span style={{ color: '#E29578' }}>#{selectedRole.priority}</span>
                  </div>
                </div>

                {/* Sub-tabs switch */}
                <div style={{
                  display: 'flex',
                  background: '#F1F5F9',
                  borderRadius: '10px',
                  padding: '2px',
                  border: '1px solid #E2E8F0'
                }}>
                  <button
                    onClick={() => setActiveTab('general')}
                    style={{
                      background: activeTab === 'general' ? 'white' : 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: activeTab === 'general' ? '#0F172A' : '#64748B',
                      cursor: 'pointer',
                      boxShadow: activeTab === 'general' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {t.tabGeneral}
                  </button>
                  <button
                    onClick={() => setActiveTab('permissions')}
                    style={{
                      background: activeTab === 'permissions' ? 'white' : 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: activeTab === 'permissions' ? '#0F172A' : '#64748B',
                      cursor: 'pointer',
                      boxShadow: activeTab === 'permissions' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {t.tabPermissions}
                  </button>
                </div>
              </div>

              {/* Warning box for default locked roles */}
              {selectedRole.isDefault && (
                <div style={{
                  background: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  color: '#92400E',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  lineHeight: '1.4',
                  marginBottom: '1.25rem'
                }}>
                  {t.systemRoleWarning}
                </div>
              )}

              {/* TAB 1: General Info */}
              {activeTab === 'general' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                  
                  {/* Name Vietnamese */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.3px' }}>
                      {t.roleNameVi}
                    </label>
                    <input
                      type="text"
                      value={selectedRole.nameVi}
                      disabled={selectedRole.isDefault}
                      onChange={(e) => handleNameChange(e.target.value, 'nameVi')}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                        background: selectedRole.isDefault ? '#F8FAFC' : 'white',
                        cursor: selectedRole.isDefault ? 'not-allowed' : 'text'
                      }}
                    />
                  </div>

                  {/* Name English */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.3px' }}>
                      {t.roleNameEn}
                    </label>
                    <input
                      type="text"
                      value={selectedRole.nameEn}
                      disabled={selectedRole.isDefault}
                      onChange={(e) => handleNameChange(e.target.value, 'nameEn')}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                        background: selectedRole.isDefault ? '#F8FAFC' : 'white',
                        cursor: selectedRole.isDefault ? 'not-allowed' : 'text'
                      }}
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.3px' }}>
                      {t.statusLabel}
                    </label>
                    <select
                      value={selectedRole.status}
                      disabled={selectedRole.isDefault}
                      onChange={(e) => handleStatusChange(e.target.value as 'Active' | 'Inactive')}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                        background: selectedRole.isDefault ? '#F8FAFC' : 'white',
                        cursor: selectedRole.isDefault ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <option value="Active">{t.active}</option>
                      <option value="Inactive">{t.inactive}</option>
                    </select>
                  </div>

                  {/* Priority indicator */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.3px' }}>
                      {t.priorityLabel}
                    </label>
                    <div style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      fontSize: '0.8rem',
                      color: '#64748B',
                      lineHeight: '1.5'
                    }}>
                      🧭 {t.priorityDesc} (Current: <strong style={{ color: 'var(--primary)' }}>#{selectedRole.priority}</strong>)
                    </div>
                  </div>

                  {/* Spacer to push buttons down */}
                  <div style={{ flex: 1 }} />

                  {/* Delete role button */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => !selectedRole.isDefault && setDeleteConfirmOpen(true)}
                      disabled={selectedRole.isDefault}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        background: selectedRole.isDefault ? '#E2E8F0' : '#FEF2F2',
                        color: selectedRole.isDefault ? '#94A3B8' : '#EF4444',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: selectedRole.isDefault ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: selectedRole.isDefault ? 'none' : '0 2px 4px rgba(239, 68, 68, 0.05)'
                      }}
                      onMouseOver={(e) => {
                        if (!selectedRole.isDefault) {
                          e.currentTarget.style.background = '#FEE2E2';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!selectedRole.isDefault) {
                          e.currentTarget.style.background = '#FEF2F2';
                        }
                      }}
                    >
                      {t.deleteBtn}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Permissions Listing */}
              {activeTab === 'permissions' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  overflowY: 'auto',
                  maxHeight: '440px',
                  paddingRight: '6px',
                  flex: 1
                }}>
                  {permissionsList.map((p) => {
                    const hasPermission = selectedRole.permissions.includes(p.key);
                    const isLocked = selectedRole.isDefault;
                    
                    return (
                      <div
                        key={p.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          background: hasPermission ? 'rgba(13, 148, 136, 0.02)' : 'transparent',
                          border: hasPermission ? '1px solid rgba(13, 148, 136, 0.15)' : '1px solid #E2E8F0',
                          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxSizing: 'border-box'
                        }}
                      >
                        {/* Icon shield/colored element */}
                        <span style={{
                          fontSize: '1.4rem',
                          marginRight: '12px',
                          background: hasPermission ? '#ECFDF5' : '#F1F5F9',
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {p.icon}
                        </span>

                        {/* Title & Description of permission */}
                        <div style={{ flex: 1, minWidth: 0, marginRight: '1rem' }}>
                          <div style={{
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: hasPermission ? 'var(--primary)' : '#0F172A',
                            transition: 'color 0.2s'
                          }}>
                            {lang === 'vi' ? p.nameVi : p.nameEn}
                          </div>
                          <div style={{
                            fontSize: '0.72rem',
                            color: '#64748B',
                            marginTop: '2px',
                            lineHeight: '1.4',
                            whiteSpace: 'normal'
                          }}>
                            {lang === 'vi' ? p.descVi : p.descEn}
                          </div>
                        </div>

                        {/* Slide-switch Toggle component */}
                        <div
                          onClick={() => !isLocked && togglePermission(p.key)}
                          style={{
                            position: 'relative',
                            width: '44px',
                            height: '24px',
                            borderRadius: '12px',
                            background: hasPermission ? 'var(--primary)' : '#CBD5E1',
                            cursor: isLocked ? 'not-allowed' : 'pointer',
                            opacity: isLocked ? 0.65 : 1,
                            flexShrink: 0,
                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: hasPermission ? '0 2px 6px rgba(13, 148, 136, 0.2)' : 'none'
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '2px',
                              left: hasPermission ? '22px' : '2px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: 'white',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '0.9rem' }}>
              {t.noRoles}
            </div>
          )}
        </div>

      </div>

      {/* Delete Confirmation Modal (Glow effect) */}
      {deleteConfirmOpen && selectedRole && (
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
            zIndex: 99999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '460px',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.04)',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxSizing: 'border-box'
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: '#EF4444', fontSize: '1.25rem', fontWeight: 800 }}>
              ⚠️ {t.deleteConfirmTitle}
            </h3>
            <p style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              {t.deleteConfirmDesc} <br />
              <span style={{ display: 'block', marginTop: '10px', fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                "{lang === 'vi' ? selectedRole.nameVi : selectedRole.nameEn}"
              </span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  background: 'white',
                  fontWeight: 700,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                {t.cancelBtn}
              </button>
              <button
                onClick={handleDeleteRole}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#EF4444',
                  fontWeight: 700,
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                }}
              >
                {t.confirmDeleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discord-Style Floating Unsaved Changes Warning Bar */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: `translateX(-50%) translateY(${hasChanges ? '0px' : '100px'})`,
          opacity: hasChanges ? 1 : 0,
          pointerEvents: hasChanges ? 'auto' : 'none',
          width: 'calc(100% - 48px)',
          maxWidth: '850px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(13, 148, 136, 0.3)',
          borderRadius: '16px',
          padding: '14px 24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(13, 148, 136, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 9999,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '0.9rem', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
            {t.saveWarning}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleDiscard}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              padding: '8px 16px',
              fontFamily: '"Be Vietnam Pro", sans-serif',
              transition: 'all 0.2s ease',
              borderRadius: '8px'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F1F5F9'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent'; }}
          >
            {t.discardChangesBtn}
          </button>
          <button
            onClick={handleSave}
            style={{
              background: '#0D9488', // Teal-600
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontFamily: '"Be Vietnam Pro", sans-serif',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#0F766E'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#0D9488'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {t.saveChangesBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenterRolesTab;
