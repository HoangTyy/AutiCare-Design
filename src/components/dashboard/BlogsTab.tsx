import React, { useState } from 'react';

// Cấu trúc mô phỏng Database Schema theo yêu cầu
interface Blog {
  blog_id: number;
  author_id: string; // Ref to account.account_id
  titleVi: string; // Tương đương nvarchar title (bản vi)
  titleEn: string; // Tương đương nvarchar title (bản en)
  contentVi: string; // Tương đương nvarchar(max)
  contentEn: string; // Tương đương nvarchar(max)
  visibility: 'Public' | 'Private' | 'Center-only'; // varchar(50)
  status: 'Published' | 'Draft' | 'Archived'; // varchar(50)
  imageUrl: string; // Cột mở rộng để hiển thị thumbnail
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

interface BlogsTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Quản lý Blog",
    searchPlaceholder: "Tìm kiếm bài viết hoặc tác giả...",
    addNew: "Thêm bài viết",
    id: "ID",
    thumbnail: "Ảnh Bìa",
    blogTitle: "Tiêu đề Bài viết",
    author: "Tác giả (ID)",
    visibility: "Hiển thị",
    date: "Ngày tạo",
    status: "Trạng thái",
    actions: "Thao tác",
    published: "Đã xuất bản",
    draft: "Bản nháp",
    public: "Công khai",
    private: "Riêng tư",
    centerOnly: "Nội bộ Trung tâm",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm Mới Bài Viết",
    editTitle: "Chỉnh Sửa Bài Viết",
    deleteTitle: "Xác Nhận Xóa",
    viewTitle: "Chi Tiết Bài Viết",
    deleteConfirm: "Bạn có chắc chắn muốn xóa bài viết này không?",
    deleteSub: "Hành động này sẽ đánh dấu bài viết là is_deleted = true.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    confirmDelete: "Xóa bài viết",
    formTitleVi: "Tiêu đề (Tiếng Việt)",
    formTitleEn: "Tiêu đề (Tiếng Anh)",
    formContentVi: "Nội dung (Tiếng Việt)",
    formContentEn: "Nội dung (Tiếng Anh)",
    formAuthor: "Mã Tác giả (Author ID)",
    formImageUrl: "Đường dẫn Ảnh (URL)",
    formVisibility: "Quyền hiển thị",
    formStatus: "Trạng thái",
    operationSuccess: "Thao tác thành công!",
    close: "Đóng"
  },
  en: {
    title: "Blog Management",
    searchPlaceholder: "Search articles or authors...",
    addNew: "Add Article",
    id: "ID",
    thumbnail: "Cover",
    blogTitle: "Article Title",
    author: "Author (ID)",
    visibility: "Visibility",
    date: "Created Date",
    status: "Status",
    actions: "Actions",
    published: "Published",
    draft: "Draft",
    public: "Public",
    private: "Private",
    centerOnly: "Center Only",
    noResults: "No matching results found",
    createTitle: "Create New Article",
    editTitle: "Edit Article",
    deleteTitle: "Confirm Delete",
    viewTitle: "Article Details",
    deleteConfirm: "Are you sure you want to delete this article?",
    deleteSub: "This action will mark the article as is_deleted = true.",
    cancel: "Cancel",
    save: "Save Changes",
    confirmDelete: "Delete Article",
    formTitleVi: "Title (Vietnamese)",
    formTitleEn: "Title (English)",
    formContentVi: "Content (Vietnamese)",
    formContentEn: "Content (English)",
    formAuthor: "Author ID",
    formImageUrl: "Cover Image URL",
    formVisibility: "Visibility",
    formStatus: "Status",
    operationSuccess: "Operation Successful!",
    close: "Close"
  }
};

const initialBlogs: Blog[] = [
  {
    blog_id: 1,
    author_id: "ACC-001",
    titleVi: "5 Phương pháp hỗ trợ giao tiếp hiệu quả cho trẻ tự kỷ",
    titleEn: "5 Effective Communication Support Methods for Autistic Children",
    contentVi: "Nội dung bài viết chi tiết bằng tiếng Việt về phương pháp hỗ trợ giao tiếp...",
    contentEn: "Detailed English content about communication support methods...",
    visibility: "Public",
    status: "Published",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
    is_deleted: false,
    created_at: "2026-05-10T08:00:00",
    updated_at: "2026-05-10T08:00:00"
  },
  {
    blog_id: 2,
    author_id: "ACC-042",
    titleVi: "Xây dựng thời khóa biểu trực quan (Visual Schedules) tại nhà",
    titleEn: "Creating Home Visual Schedules for Children with Autism",
    contentVi: "Thời khóa biểu trực quan giúp trẻ tự kỷ dễ dàng nắm bắt trình tự công việc...",
    contentEn: "Visual schedules help autistic children easily grasp the sequence of tasks...",
    visibility: "Public",
    status: "Draft",
    imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=600&auto=format&fit=crop",
    is_deleted: false,
    created_at: "2026-05-15T10:30:00",
    updated_at: "2026-05-15T10:30:00"
  }
];

const BlogsTab: React.FC<BlogsTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete' | 'view'>('create');
  
  // Form State
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({});

  const openModal = (mode: 'create' | 'edit' | 'delete' | 'view', blog?: Blog) => {
    setModalMode(mode);
    if (mode === 'create') {
      setCurrentBlog({
        visibility: 'Public',
        status: 'Draft',
        imageUrl: ''
      });
    } else if (blog) {
      setCurrentBlog({ ...blog });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlog({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newBlog: Blog = {
        ...(currentBlog as Blog),
        blog_id: blogs.length > 0 ? Math.max(...blogs.map(b => b.blog_id)) + 1 : 1,
        is_deleted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setBlogs([newBlog, ...blogs]);
    } else if (modalMode === 'edit') {
      setBlogs(blogs.map(b => b.blog_id === currentBlog.blog_id ? { 
        ...b, 
        ...currentBlog, 
        updated_at: new Date().toISOString() 
      } : b));
    } else if (modalMode === 'delete') {
      // Soft delete
      setBlogs(blogs.map(b => b.blog_id === currentBlog.blog_id ? { ...b, is_deleted: true } : b));
    }
    
    // Toast simulation
    const toast = document.createElement('div');
    toast.className = 'save-toast success slide-up';
    toast.innerHTML = `<span>✨ ${t.operationSuccess}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('slide-up');
      toast.classList.add('slide-down');
      setTimeout(() => toast.remove(), 500);
    }, 3000);

    closeModal();
  };

  const filteredBlogs = blogs.filter(blog => {
    if (blog.is_deleted) return false;
    const term = searchTerm.toLowerCase();
    const title = lang === 'vi' ? blog.titleVi : blog.titleEn;
    return (
      title.toLowerCase().includes(term) ||
      blog.author_id.toLowerCase().includes(term) ||
      blog.blog_id.toString().includes(term)
    );
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US');
  };

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
              <th style={{ width: '60px' }}>{t.id}</th>
              <th style={{ width: '80px', textAlign: 'center' }}>{t.thumbnail}</th>
              <th>{t.blogTitle}</th>
              <th>{t.author}</th>
              <th>{t.visibility}</th>
              <th>{t.status}</th>
              <th>{t.date}</th>
              <th style={{ textAlign: 'right', width: '140px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <tr key={blog.blog_id}>
                  <td className="id-col">{blog.blog_id}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="blog-thumbnail-mini">
                      {blog.imageUrl ? (
                        <img src={blog.imageUrl} alt="Thumbnail" />
                      ) : (
                        <div className="img-placeholder"></div>
                      )}
                    </div>
                  </td>
                  <td className="name-col" style={{ maxWidth: '250px' }}>
                    <div className="text-truncate" title={lang === 'vi' ? blog.titleVi : blog.titleEn}>
                      {lang === 'vi' ? blog.titleVi : blog.titleEn}
                    </div>
                  </td>
                  <td className="font-mono text-sm">{blog.author_id}</td>
                  <td>
                    <span className={`badge-visibility ${blog.visibility.toLowerCase()}`}>
                      {blog.visibility === 'Public' ? t.public : blog.visibility === 'Private' ? t.private : t.centerOnly}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${blog.status.toLowerCase()}`}>
                      {blog.status === 'Published' ? t.published : t.draft}
                    </span>
                  </td>
                  <td>{formatDate(blog.created_at)}</td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end', gap: '6px' }}>
                      <button className="view-btn-v2" title={t.viewTitle} onClick={() => openModal('view', blog)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
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
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                  {t.noResults}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className={`admin-modal animate-in ${modalMode === 'view' ? 'blog-view-modal' : 'blog-form-modal'}`}>
            <div className="modal-header">
              <h3>
                {modalMode === 'create' && t.createTitle}
                {modalMode === 'edit' && t.editTitle}
                {modalMode === 'delete' && t.deleteTitle}
                {modalMode === 'view' && t.viewTitle}
              </h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>

            {modalMode === 'view' ? (
              <div className="modal-body custom-scrollbar">
                <div className="blog-preview-container">
                  {currentBlog.imageUrl && (
                    <div className="blog-preview-hero" style={{ backgroundImage: `url(${currentBlog.imageUrl})` }}></div>
                  )}
                  <div className="blog-preview-content">
                    <h1 className="blog-preview-title">{lang === 'vi' ? currentBlog.titleVi : currentBlog.titleEn}</h1>
                    <div className="blog-preview-meta">
                      <span>👤 {currentBlog.author_id}</span>
                      <span>🗓️ {formatDate(currentBlog.created_at || '')}</span>
                      <span className={`badge ${currentBlog.status?.toLowerCase()}`}>{currentBlog.status}</span>
                      <span className={`badge-visibility ${currentBlog.visibility?.toLowerCase()}`}>{currentBlog.visibility}</span>
                    </div>
                    <div className="blog-preview-body">
                      {lang === 'vi' ? currentBlog.contentVi : currentBlog.contentEn}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="modal-body custom-scrollbar">
                  {modalMode === 'delete' ? (
                    <div className="delete-confirm">
                      <div className="warning-icon">⚠️</div>
                      <p>
                        {t.deleteConfirm} "{lang === 'vi' ? currentBlog.titleVi : currentBlog.titleEn}"?
                      </p>
                      <p className="sub-text">{t.deleteSub}</p>
                    </div>
                  ) : (
                    <div className="modal-form grid-2-cols">
                      <div className="form-group col-span-2">
                        <label>{t.formImageUrl}</label>
                        <input
                          type="url"
                          name="imageUrl"
                          value={currentBlog.imageUrl || ''}
                          onChange={handleInputChange}
                          placeholder="https://..."
                          spellCheck="false"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>{t.formTitleVi}</label>
                        <input
                          type="text"
                          name="titleVi"
                          value={currentBlog.titleVi || ''}
                          onChange={handleInputChange}
                          required
                          spellCheck="false"
                        />
                      </div>
                      <div className="form-group">
                        <label>{t.formTitleEn}</label>
                        <input
                          type="text"
                          name="titleEn"
                          value={currentBlog.titleEn || ''}
                          onChange={handleInputChange}
                          required
                          spellCheck="false"
                        />
                      </div>

                      <div className="form-group">
                        <label>{t.formAuthor}</label>
                        <input
                          type="text"
                          name="author_id"
                          value={currentBlog.author_id || ''}
                          onChange={handleInputChange}
                          placeholder="VD: ACC-001"
                          required
                          spellCheck="false"
                        />
                      </div>
                      
                      <div className="form-group grid-2-cols-inner">
                        <div>
                          <label>{t.formVisibility}</label>
                          <select name="visibility" value={currentBlog.visibility || 'Public'} onChange={handleInputChange}>
                            <option value="Public">{t.public}</option>
                            <option value="Private">{t.private}</option>
                            <option value="Center-only">{t.centerOnly}</option>
                          </select>
                        </div>
                        <div>
                          <label>{t.formStatus}</label>
                          <select name="status" value={currentBlog.status || 'Draft'} onChange={handleInputChange}>
                            <option value="Published">{t.published}</option>
                            <option value="Draft">{t.draft}</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group col-span-2">
                        <label>{t.formContentVi}</label>
                        <textarea
                          name="contentVi"
                          value={currentBlog.contentVi || ''}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="custom-scrollbar"
                        ></textarea>
                      </div>
                      <div className="form-group col-span-2">
                        <label>{t.formContentEn}</label>
                        <textarea
                          name="contentEn"
                          value={currentBlog.contentEn || ''}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="custom-scrollbar"
                        ></textarea>
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
            )}
            
            {modalMode === 'view' && (
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  {t.close}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsTab;
