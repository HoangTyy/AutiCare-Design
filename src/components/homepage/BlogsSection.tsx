import React, { useState } from 'react';
import './BlogsSection.css'; // We will create this CSS file next

interface Blog {
  blog_id: number;
  author_id: string;
  titleVi: string;
  titleEn: string;
  contentVi: string;
  contentEn: string;
  visibility: string;
  status: string;
  imageUrl: string;
  created_at: string;
}

const mockBlogs: Blog[] = [
  {
    blog_id: 1,
    author_id: "ACC-001",
    titleVi: "5 Phương pháp hỗ trợ giao tiếp hiệu quả cho trẻ tự kỷ",
    titleEn: "5 Effective Communication Support Methods for Autistic Children",
    contentVi: "Nội dung chi tiết về các phương pháp hỗ trợ giao tiếp hiệu quả giúp trẻ tự kỷ phát triển khả năng ngôn ngữ và hòa nhập xã hội tốt hơn. Các phương pháp bao gồm: sử dụng hình ảnh, tạo môi trường tương tác an toàn, và sự kiên nhẫn từ gia đình...",
    contentEn: "Detailed content about effective communication support methods to help autistic children develop language skills and better social integration. Methods include: using visuals, creating safe interactive environments, and patience from family...",
    visibility: "Public",
    status: "Published",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
    created_at: "2026-05-10T08:00:00"
  },
  {
    blog_id: 2,
    author_id: "ACC-042",
    titleVi: "Xây dựng thời khóa biểu trực quan (Visual Schedules) tại nhà",
    titleEn: "Creating Home Visual Schedules for Children with Autism",
    contentVi: "Thời khóa biểu trực quan giúp trẻ tự kỷ dễ dàng nắm bắt trình tự công việc, giảm lo âu và tăng cường tính tự lập trong các hoạt động sinh hoạt hàng ngày.",
    contentEn: "Visual schedules help autistic children easily grasp the sequence of tasks, reducing anxiety and enhancing independence in daily living activities.",
    visibility: "Public",
    status: "Published",
    imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=800&auto=format&fit=crop",
    created_at: "2026-05-15T10:30:00"
  },
  {
    blog_id: 3,
    author_id: "ACC-015",
    titleVi: "Hiểu đúng về Can thiệp sớm và tầm quan trọng của giai đoạn vàng",
    titleEn: "Understanding Early Intervention and the Importance of the Golden Period",
    contentVi: "Giai đoạn vàng từ 0-3 tuổi là thời điểm tốt nhất để can thiệp sớm, giúp trẻ cải thiện các kỹ năng thiết yếu và tạo nền tảng vững chắc cho tương lai.",
    contentEn: "The golden period from 0-3 years old is the best time for early intervention, helping children improve essential skills and build a solid foundation for the future.",
    visibility: "Public",
    status: "Published",
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop",
    created_at: "2026-05-20T14:15:00"
  }
];

const translations = {
  vi: {
    sectionTitle: "Tin tức & Bài viết",
    sectionSubtitle: "Cập nhật những kiến thức, phương pháp và câu chuyện truyền cảm hứng từ cộng đồng AutiCare.",
    readMore: "Đọc tiếp",
    close: "Đóng bài viết",
    publishedAt: "Đăng ngày"
  },
  en: {
    sectionTitle: "News & Articles",
    sectionSubtitle: "Stay updated with knowledge, methods, and inspiring stories from the AutiCare community.",
    readMore: "Read more",
    close: "Close article",
    publishedAt: "Published on"
  }
};

interface BlogsSectionProps {
  id: string;
  lang: 'vi' | 'en';
}

const BlogsSection: React.FC<BlogsSectionProps> = ({ id, lang }) => {
  const t = translations[lang];
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id={id} className="blogs-section snap-section container-section">
      <div className="container">
        <div className="section-header container">
          <h2 className="section-title-premium">{t.sectionTitle}</h2>
          <p className="section-sub">{t.sectionSubtitle}</p>
        </div>

        <div className="blogs-grid">
          {mockBlogs.map((blog) => (
            <div 
              className="blog-card" 
              key={blog.blog_id}
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="blog-card-image" style={{ backgroundImage: `url(${blog.imageUrl})` }}></div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span>{formatDate(blog.created_at)}</span>
                  <span>•</span>
                  <span>{blog.author_id}</span>
                </div>
                <h3 className="blog-card-title line-clamp-2">
                  {lang === 'vi' ? blog.titleVi : blog.titleEn}
                </h3>
                <p className="blog-card-excerpt line-clamp-3">
                  {lang === 'vi' ? blog.contentVi : blog.contentEn}
                </p>
                <button className="read-more-btn">
                  {t.readMore} <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen Reader Modal */}
      {selectedBlog && (
        <div className="reader-modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="reader-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="reader-close-btn" onClick={() => setSelectedBlog(null)}>×</button>
            <div className="reader-hero" style={{ backgroundImage: `url(${selectedBlog.imageUrl})` }}></div>
            <div className="reader-body">
              <h1 className="reader-title">{lang === 'vi' ? selectedBlog.titleVi : selectedBlog.titleEn}</h1>
              <div className="reader-meta">
                <span>{t.publishedAt} {formatDate(selectedBlog.created_at)}</span>
                <span>Tác giả: {selectedBlog.author_id}</span>
              </div>
              <div className="reader-text">
                {lang === 'vi' ? selectedBlog.contentVi : selectedBlog.contentEn}
              </div>
              <div className="reader-footer">
                <button className="btn-primary" onClick={() => setSelectedBlog(null)}>{t.close}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogsSection;
