import React, { useState } from 'react';

interface Blog {
  id: string;
  titleVi: string;
  titleEn: string;
  authorVi: string;
  authorEn: string;
  date: string;
  status: 'Published' | 'Draft';
}

interface BlogsTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Quản lý Blog Truyền thông",
    searchPlaceholder: "Tìm kiếm bài viết...",
    addNew: "Thêm bài viết",
    id: "ID",
    name: "Tiêu đề Bài viết",
    author: "Tác giả",
    date: "Ngày đăng",
    status: "Trạng thái",
    actions: "Thao tác",
    published: "Đã xuất bản",
    draft: "Bản nháp",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm mới bài viết",
    editTitle: "Chỉnh sửa bài viết",
    deleteTitle: "Xác nhận xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa bài viết",
    deleteSub: "Hành động này không thể hoàn tác.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    confirmDelete: "Xác nhận xóa",
    formTitleVi: "Tiêu đề (Tiếng Việt)",
    formTitleEn: "Tiêu đề (Tiếng Anh)",
    formAuthorVi: "Tác giả (Tiếng Việt)",
    formAuthorEn: "Tác giả (Tiếng Anh)",
    formStatus: "Trạng thái",
    operationSuccess: "Thao tác thành công!"
  },
  en: {
    title: "Manage Communication Blogs",
    searchPlaceholder: "Search articles...",
    addNew: "Add Article",
    id: "ID",
    name: "Article Title",
    author: "Author",
    date: "Published Date",
    status: "Status",
    actions: "Actions",
    published: "Published",
    draft: "Draft",
    noResults: "No matching results found",
    createTitle: "Create New Article",
    editTitle: "Edit Blog Article",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete article",
    deleteSub: "This action cannot be undone.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Confirm Delete",
    formTitleVi: "Title (Vietnamese)",
    formTitleEn: "Title (English)",
    formAuthorVi: "Author (Vietnamese)",
    formAuthorEn: "Author (English)",
    formStatus: "Status",
    operationSuccess: "Operation Successful!"
  }
};

const BlogsTab: React.FC<BlogsTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const [blogs] = useState<Blog[]>([
    { id: 'BL-001', titleVi: '5 Phương pháp hỗ trợ giao tiếp hiệu quả cho trẻ tự kỷ', titleEn: '5 Effective Communication Support Methods for Autistic Children', authorVi: 'Dr. Nguyễn Văn A', authorEn: 'Dr. Nguyen Van A', date: '2026-05-10', status: 'Published' },
    { id: 'BL-002', titleVi: 'Xây dựng thời khóa biểu trực quan (Visual Schedules) tại nhà', titleEn: 'Creating Home Visual Schedules for Children with Autism', authorVi: 'Cô Lê Thị B', authorEn: 'Ms. Le Thi B', date: '2026-05-15', status: 'Draft' },
  ]);

  const openModal = (mode: 'create' | 'edit' | 'delete', blog: Blog | null = null) => {
    setModalMode(mode);
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.operationSuccess);
    closeModal();
  };

  const filteredBlogs = blogs.filter(blog => {
    const term = searchTerm.toLowerCase();
    const title = lang === 'vi' ? blog.titleVi : blog.titleEn;
    const author = lang === 'vi' ? blog.authorVi : blog.authorEn;
    return (
      title.toLowerCase().includes(term) ||
      blog.id.toLowerCase().includes(term) ||
      author.toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-content-area">
      <div className="table-header">
        <h2 className="table-title">{t.title}</h2>
        <div className="table-actions">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={() => openModal('create')}>
            + {t.addNew}
          </button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '100px' }}>{t.id}</th>
              <th>{t.name}</th>
              <th>{t.author}</th>
              <th>{t.date}</th>
              <th>{t.status}</th>
              <th style={{ textAlign: 'right', width: '100px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="id-col">{blog.id}</td>
                  <td className="name-col">{lang === 'vi' ? blog.titleVi : blog.titleEn}</td>
                  <td>{lang === 'vi' ? blog.authorVi : blog.authorEn}</td>
                  <td>{blog.date}</td>
                  <td>
                    <span className={`badge ${blog.status.toLowerCase()}`}>
                      {blog.status === 'Published' ? t.published : t.draft}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button className="edit-btn-v2" title={t.editTitle} onClick={() => openModal('edit', blog)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                      <button className="delete-btn-v2" title={t.deleteTitle} onClick={() => openModal('delete', blog)}>
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
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                  {t.noResults}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal animate-in">
            <div className="modal-header">
              <h3>
                {modalMode === 'create' && t.createTitle}
                {modalMode === 'edit' && t.editTitle}
                {modalMode === 'delete' && t.deleteTitle}
              </h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                {modalMode === 'delete' ? (
                  <div className="delete-confirm">
                    <div className="warning-icon">⚠️</div>
                    <p>
                      {t.deleteConfirm} "{lang === 'vi' ? selectedBlog?.titleVi : selectedBlog?.titleEn}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                ) : (
                  <div className="modal-form">
                    <div className="form-group">
                      <label>{t.formTitleVi}</label>
                      <input
                        type="text"
                        defaultValue={selectedBlog?.titleVi || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formTitleEn}</label>
                      <input
                        type="text"
                        defaultValue={selectedBlog?.titleEn || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formAuthorVi}</label>
                      <input
                        type="text"
                        defaultValue={selectedBlog?.authorVi || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formAuthorEn}</label>
                      <input
                        type="text"
                        defaultValue={selectedBlog?.authorEn || ''}
                        required
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.formStatus}</label>
                      <select defaultValue={selectedBlog?.status || 'Draft'}>
                        <option value="Published">{t.published}</option>
                        <option value="Draft">{t.draft}</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className={`btn-primary ${modalMode === 'delete' ? 'btn-danger' : ''}`}
                >
                  {modalMode === 'delete' ? t.confirmDelete : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsTab;
