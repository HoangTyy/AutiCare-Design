import React from 'react';

interface ReviewsSectionProps {
  id: string;
  lang: 'vi' | 'en';
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ id, lang }) => {
  const content = {
    vi: {
      title: "PHẢN HỒI TỪ CỘNG ĐỒNG",
      sub: "Lắng nghe chia sẻ thực tế từ các chuyên gia y tế, giáo viên can thiệp sớm và các bậc phụ huynh đồng hành cùng AutiCare.",
      reviews: [
        {
          name: "BS. Nguyễn Minh Khoa",
          role: "Trưởng khoa Nhi - BV Trung ương",
          quote: "AutiCare giúp chúng tôi rút ngắn 40% thời gian chẩn đoán lâm sàng ban đầu. Hệ thống biểu đồ SVG phân tích tự động hỗ trợ cực kỳ đắc lực trong việc theo dõi tiến trình can thiệp dài hạn của trẻ.",
          rating: 5,
          avatarText: "NK",
          tag: "Y tế & Chuyên khoa"
        },
        {
          name: "Chị Mai Phương",
          role: "Phụ huynh bé Gia Bảo (5 tuổi)",
          quote: "Khi biết con có triệu chứng liên quan tới phổ tự kỷ, gia đình tôi đã tìm lại hy vọng nhờ AutiCare. Tôi có thể dễ dàng nắm bắt các bài tập giáo viên giao trên lớp để cùng thực hành bổ trợ thêm cho con tại nhà.",
          rating: 5,
          avatarText: "MP",
          tag: "Đồng hành cùng con"
        },
        {
          name: "Thầy Trần Hữu Nghĩa",
          role: "Chuyên gia Giáo dục Đặc biệt",
          quote: "Cơ chế quản lý cấp độ bài tập chuyên biệt hóa cho từng cơ sở là một đột phá. Nó giúp giáo viên chúng tôi cá nhân hóa lộ trình bài tập chuẩn xác nhất với năng lực riêng của trẻ.",
          rating: 5,
          avatarText: "HN",
          tag: "Chuyên gia Giáo dục"
        }
      ]
    },
    en: {
      title: "COMMUNITY TESTIMONIALS",
      sub: "Hear real stories and feedback from pediatric specialists, early intervention educators, and parents accompanying AutiCare.",
      reviews: [
        {
          name: "Dr. Nguyen Minh Khoa",
          role: "Head of Pediatrics - National Hospital",
          quote: "AutiCare helps us shorten 40% of initial clinical screening time. The integrated automatic SVG analysis charts provide outstanding clinical evidence to track long-term child developmental domains.",
          rating: 5,
          avatarText: "NK",
          tag: "Medical & Specialist"
        },
        {
          name: "Mrs. Mai Phuong",
          role: "Parent of Gia Bao (5 years old)",
          quote: "We were very helpless when discovering our son had autism. Thanks to AutiCare, we found our hope. I can track school intervention schedules easily to coordinate practice at home effectively.",
          rating: 5,
          avatarText: "MP",
          tag: "Parent's Journey"
        },
        {
          name: "Mr. Tran Huu Nghia",
          role: "Special Education Specialist",
          quote: "Decentralized levels and exercise categories custom-configured per Early Intervention Center is a brilliant breakthrough. It empowers us to custom-tailor optimal pathways aligned to kids' capabilities.",
          rating: 5,
          avatarText: "HN",
          tag: "Specialist Educator"
        }
      ]
    }
  };

  const t = lang === 'vi' ? content.vi : content.en;

  return (
    <section id={id} className="reviews snap-section container-section">
      <div className="section-header container">
        <h2 className="section-title-premium">{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
      </div>

      <div className="container reviews-grid">
        {t.reviews.map((rev, idx) => (
          <div key={idx} className="review-card glass">
            <div className="review-badge">{rev.tag}</div>
            
            <div className="review-rating">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" width="18" height="18" fill="#FFD215" stroke="#FFD215">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            <p className="review-quote">“{rev.quote}”</p>

            <div className="review-user">
              <div className="review-avatar">
                {rev.avatarText}
              </div>
              <div className="review-info">
                <h4>{rev.name}</h4>
                <span>{rev.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
