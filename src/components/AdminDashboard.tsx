import React, { useState } from 'react';
import { TiltButton } from 'react-tilt-button';
import './AdminDashboard.css';

type Tab = 'centers' | 'staffs' | 'levels' | 'categories' | 'objectives' | 'blogs';

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
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['system', 'training']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (mode: 'create' | 'edit' | 'delete', item: any = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

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
        { id: 'levels', labelVi: 'Cấp độ Bài tập', labelEn: 'Exercise Levels' },
        { id: 'categories', labelVi: 'Danh mục Bài tập', labelEn: 'Exercise Categories' },
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

  const getTabSingular = () => {
    const active = getActiveItem();
    if (lang === 'vi') {
      if (active.id === 'centers') return 'trung tâm';
      if (active.id === 'staffs') return 'nhân sự';
      if (active.id === 'levels') return 'cấp độ';
      if (active.id === 'categories') return 'danh mục';
      if (active.id === 'objectives') return 'mục tiêu';
      if (active.id === 'blogs') return 'bài viết';
      return 'mục';
    } else {
      if (active.id === 'centers') return 'Center';
      if (active.id === 'staffs') return 'Staff';
      if (active.id === 'levels') return 'Level';
      if (active.id === 'categories') return 'Category';
      if (active.id === 'objectives') return 'Objective';
      if (active.id === 'blogs') return 'Blog';
      return 'Item';
    }
  };

  const renderContent = () => {
    const activeItem = getActiveItem();
    const title = lang === 'vi' ? activeItem.labelVi : activeItem.labelEn;

    // Mock data and columns based on tab
    const getTabData = () => {
      switch (activeTab) {
        case 'centers': return {
          columns: [
            { key: 'id', labelVi: 'ID', labelEn: 'ID' },
            { key: 'name', labelVi: 'Tên Trung tâm', labelEn: 'Center Name' },
            { key: 'date', labelVi: 'Ngày tạo', labelEn: 'Created At' },
            { key: 'status', labelVi: 'Trạng thái', labelEn: 'Status' }
          ],
          rows: [
            { id: 'AC-001', name: 'AutiCare Central Saigon', date: '2026-01-10', status: 'Active' },
            { id: 'AC-002', name: 'AutiCare Hanoi North', date: '2026-02-15', status: 'Active' },
            { id: 'AC-003', name: 'AutiCare Da Nang Beach', date: '2026-03-20', status: 'Active' },
          ]
        };
        case 'levels': return {
          columns: [
            { key: 'id', labelVi: 'ID', labelEn: 'ID' },
            { key: 'name', labelVi: 'Tên Cấp độ', labelEn: 'Exercise Level Name' },
            { key: 'score', labelVi: 'Điểm độ khó', labelEn: 'Complexity Score' },
            { key: 'desc', labelVi: 'Mô tả', labelEn: 'Description' }
          ],
          rows: [
            { id: '1', name: 'Dễ', score: '1', desc: 'Mức độ dành cho các bài tập dễ' },
            { id: '2', name: 'Bình Thường', score: '2', desc: 'Mức độ dành cho các bài tập bình thường' },
            { id: '3', name: 'Khó', score: '3', desc: 'Mức độ dành cho các bài tập khó' },
          ]
        };
        case 'categories': return {
          columns: [
            { key: 'id', labelVi: 'ID', labelEn: 'ID' },
            { key: 'name', labelVi: 'Tên Danh mục', labelEn: 'Exercise Category Name' },
            { key: 'date', labelVi: 'Ngày tạo', labelEn: 'Create at' }
          ],
          rows: [
            { id: '1', name: 'Giáo dục thể chất', date: '05/10/2026', isParent: true },
            { id: '2', name: 'Vận động thô', date: '05/12/2026', isSub: true },
            { id: '3', name: 'Vận động tinh', date: '05/13/2026', isSub: true },
          ]
        };
        default: return {
          columns: [
            { key: 'id', labelVi: 'ID', labelEn: 'ID' },
            { key: 'name', labelVi: 'Tên', labelEn: 'Name' },
            { key: 'date', labelVi: 'Ngày tạo', labelEn: 'Created At' }
          ],
          rows: [
            { id: 'ITEM-01', name: lang === 'vi' ? 'Dữ liệu mẫu 01' : 'Sample Item 01', date: '2026-05-16' },
            { id: 'ITEM-02', name: lang === 'vi' ? 'Dữ liệu mẫu 02' : 'Sample Item 02', date: '2026-05-16' },
          ]
        };
      }
    };

    const tabData = getTabData();
    const lowSearch = searchTerm.toLowerCase();

    let filteredRows: any[] = [];

    if (activeTab === 'categories' && searchTerm) {
      const matchIndices = new Set<number>();

      // Find direct matches
      tabData.rows.forEach((row: any, i) => {
        if (Object.values(row).some(val => String(val).toLowerCase().includes(lowSearch))) {
          matchIndices.add(i);
        }
      });

      const finalIndices = new Set(matchIndices);

      // Add parents if subs match
      matchIndices.forEach(idx => {
        const row = tabData.rows[idx] as any;
        if (row.isSub) {
          for (let i = idx - 1; i >= 0; i--) {
            const potentialParent = tabData.rows[i] as any;
            if (potentialParent.isParent) {
              finalIndices.add(i);
              break;
            }
          }
        }
      });

      filteredRows = tabData.rows
        .filter((_, i) => finalIndices.has(i))
        .map((row: any) => ({
          ...row,
          isHighlight: Object.values(row).some(val => String(val).toLowerCase().includes(lowSearch))
        }));
    } else {
      filteredRows = tabData.rows
        .filter((row: any) =>
          !searchTerm || Object.values(row).some(val => String(val).toLowerCase().includes(lowSearch))
        )
        .map((row: any) => ({
          ...row,
          isHighlight: !!searchTerm
        }));
    }

    return (
      <div className="dashboard-content-area">
        <div className="table-header">
          <h2 className="table-title">{title}</h2>
          <div className="table-actions">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={lang === 'vi' ? 'Tìm kiếm...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="add-btn" onClick={() => openModal('create')}>
              + {lang === 'vi' ? 'Thêm mới' : 'Add New'}
            </button>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {tabData.columns.map((col: any) => (
                  <th key={col.key} style={col.key === 'id' ? { width: '80px' } : {}}>
                    {lang === 'vi' ? col.labelVi : col.labelEn}
                  </th>
                ))}
                <th style={{ textAlign: 'right', width: '100px' }}>{lang === 'vi' ? 'Thao tác' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row: any, i) => (
                  <tr key={i} className={row.isHighlight ? 'neon-highlight' : ''}>
                    {tabData.columns.map((col: any) => (
                      <td key={col.key} className={`${col.key}-col ${row.isSub && col.key === 'name' ? 'sub-category-cell' : ''} ${row.isParent && col.key === 'name' ? 'parent-category-cell' : ''}`}>
                        {col.key === 'status' ? (
                          <span className="badge active">{lang === 'vi' ? 'Hoạt động' : 'Active'}</span>
                        ) : (
                          <>
                            {row.isSub && col.key === 'name' && <span className="sub-indicator">└</span>}
                            {row[col.key]}
                          </>
                        )}
                      </td>
                    ))}
                    <td>
                      <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                        <button className="edit-btn-v2" title={lang === 'vi' ? 'Chỉnh sửa' : 'Edit'} onClick={() => openModal('edit', row)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </button>
                        <button className="delete-btn-v2" title={lang === 'vi' ? 'Xóa' : 'Delete'} onClick={() => openModal('delete', row)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={tabData.columns.length + 1} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                    {lang === 'vi' ? 'Không tìm thấy kết quả phù hợp' : 'No matching results found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
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
          <div className="user-profile">
            <div className="avatar">AD</div>
            <div className="user-info">
              <div className="user-name">Admin User</div>
              <div className="user-role">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <span className="breadcrumb">Admin / {getActiveItem().labelEn}</span>
          </div>
          <div className="topbar-right">
            <button
              className="view-toggle-btn"
              onClick={onBack}
              style={{ padding: '8px 16px', borderRadius: '20px', background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}
            >
              ← {lang === 'vi' ? 'Quay lại Homepage' : 'Back to Homepage'}
            </button>
            <div className="lang-switch" style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '2px' }}>
              <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')}>VN</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
            <button className="icon-btn" title="Notifications">🔔</button>
            {onDesignCode && <button className="icon-btn" title="Design Code" onClick={onDesignCode} style={{ fontSize: '0.75rem', fontWeight: 800 }}>&lt;/&gt;</button>}
            <button className="icon-btn" title="Settings">⚙️</button>
          </div>
        </header>

        {renderContent()}
      </main>

      {/* Modern Admin Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal animate-in">
            <div className="modal-header">
              <h3>
                {modalMode === 'create' && (lang === 'vi' ? `Thêm mới ${getTabSingular()}` : `Create new ${getTabSingular().toLowerCase()}`)}
                {modalMode === 'edit' && (lang === 'vi' ? `Chỉnh sửa ${getTabSingular()}` : `Edit ${getTabSingular().toLowerCase()}`)}
                {modalMode === 'delete' && (lang === 'vi' ? 'Xác nhận xóa' : 'Confirm Delete')}
              </h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              {modalMode === 'delete' ? (
                <div className="delete-confirm">
                  <div className="warning-icon">⚠️</div>
                  <p>
                    {lang === 'vi'
                      ? `Bạn có chắc chắn muốn xóa ${getTabSingular()} "${selectedItem?.name || selectedItem?.labelVi || 'mục này'}"?`
                      : `Are you sure you want to delete ${getTabSingular().toLowerCase()} "${selectedItem?.name || selectedItem?.labelEn || 'this item'}"?`}
                  </p>
                  <p className="sub-text">{lang === 'vi' ? 'Hành động này không thể hoàn tác.' : 'This action cannot be undone.'}</p>
                </div>
              ) : (
                <div className="modal-form">
                  <div className="form-group">
                    <label>{lang === 'vi' ? 'Tên / Tiêu đề' : 'Name / Title'}</label>
                    <input
                      type="text"
                      defaultValue={selectedItem?.name || selectedItem?.labelVi || ''}
                      placeholder="..."
                      spellCheck="false"
                    />
                  </div>
                  <div className="form-group">
                    <label>{lang === 'vi' ? 'Mô tả' : 'Description'}</label>
                    <textarea
                      defaultValue={selectedItem?.description || ''}
                      placeholder="..."
                      spellCheck="false"
                    ></textarea>
                  </div>
                  {(modalMode === 'create' || modalMode === 'edit') && activeTab === 'categories' && (
                    <div className="form-group">
                      <label>{lang === 'vi' ? 'Danh mục cha' : 'Parent Category'}</label>
                      <select>
                        <option>--- {lang === 'vi' ? 'Không có' : 'None'} ---</option>
                        <option>General</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>
                {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
              </button>
              <button className={`btn-primary ${modalMode === 'delete' ? 'btn-danger' : ''}`} onClick={() => {
                alert(lang === 'vi' ? 'Thực hiện thành công!' : 'Operation Successful!');
                closeModal();
              }}>
                {modalMode === 'delete' ? (lang === 'vi' ? 'Xác nhận xóa' : 'Confirm Delete') : (lang === 'vi' ? 'Lưu thay đổi' : 'Save Changes')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
