import React from 'react';
import { TiltButton } from 'react-tilt-button';
import ThreeBackground from './ThreeBackground';

import heroIllustration from '../../assets/hero-illustration.png';

interface HeroSectionProps {
  id: string;
  t: any;
  lang: string;
  onStartAssessment: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id, t, lang, onStartAssessment }) => {
  const [showExperts, setShowExperts] = React.useState(false)
  const [selectedExpert, setSelectedExpert] = React.useState<any | null>(null)

  const experts = lang === 'vi' ? [
    { 
      name: 'TS. Hoàng Minh', 
      title: 'Chuyên gia Can thiệp sớm', 
      availability: 'Còn trống: 10h - 12h',
      qualification: 'Tiến sĩ Tâm lý học Giáo dục & Can thiệp sớm - Đại học Quốc gia Hà Nội',
      experienceYears: 12,
      description: 'Hơn 12 năm kinh nghiệm trong lĩnh vực sàng lọc lâm sàng và thiết kế lộ trình can thiệp cá nhân hóa cho trẻ tự kỷ và chậm phát triển ngôn ngữ.',
      feedbacks: [
        { parentName: 'Mẹ Bé Bin (Hà Nội)', rating: 5, comment: 'Bác sĩ Minh rất kiên nhẫn. Sau 3 tháng đồng hành theo lộ trình của bác, bé Bin nhà mình đã bắt đầu mở lời và tương tác chủ động nhiều hơn. Cảm ơn bác sĩ nhiều lắm!' },
        { parentName: 'Bố Gia Bảo (Đà Nẵng)', rating: 5, comment: 'Quy trình sàng lọc của tiến sĩ rất chi tiết và giải thích cực kỳ khoa học giúp gia đình không còn hoang mang.' }
      ]
    },
    { 
      name: 'Cô Nguyễn Lan', 
      title: 'Tư vấn tâm lý trẻ em', 
      availability: 'Còn trống: 13h - 15h',
      qualification: 'Thạc sĩ Đánh giá & Trị liệu Tâm lý Trẻ em - Đại học Sư phạm TP.HCM',
      experienceYears: 8,
      description: 'Chuyên sâu về trị liệu hành vi, tư vấn tâm lý gia đình và tổ chức các hoạt động hòa nhập vận động tích hợp.',
      feedbacks: [
        { parentName: 'Mẹ Hồng Ngọc (Quảng Nam)', rating: 5, comment: 'Cô Lan có giọng nói rất ấm áp, các con ai cũng mến cô. Phương pháp chơi trị liệu của cô thực sự hiệu quả!' },
        { parentName: 'Mẹ Minh Quân (TP.HCM)', rating: 4, comment: 'Cô tư vấn rất tận tâm, đưa ra nhiều bài tập thực hành dễ áp dụng tại nhà cho cha mẹ.' }
      ]
    },
    { 
      name: 'BS. Trần Đức', 
      title: 'Chuyên gia phát triển hành vi', 
      availability: 'Còn trống: 16h - 18h',
      qualification: 'Bác sĩ Chuyên khoa Nhi & Phục hồi chức năng - Đại học Y Dược TP.HCM',
      experienceYears: 10,
      description: 'Chuyên đánh giá và điều trị các rối loạn hành vi, tăng động giảm chú ý (ADHD) và đồng hành can thiệp sớm.',
      feedbacks: [
        { parentName: 'Bố Tuấn Anh (Vũng Tàu)', rating: 5, comment: 'Bác sĩ Đức đánh giá rất chính xác, có thái độ làm việc cực kỳ chuyên nghiệp và tôn trọng trẻ nhỏ.' },
        { parentName: 'Mẹ Bảo Vy (Bình Dương)', rating: 5, comment: 'Lộ trình can thiệp hành vi của bác sĩ giúp con gái mình kiểm soát tốt hơn các cơn hờn giận kích động.' }
      ]
    },
  ] : [
    { 
      name: 'Dr. Hoang Minh', 
      title: 'Early Intervention Specialist', 
      availability: 'Available: 10:00 - 12:00',
      qualification: 'Ph.D. in Educational Psychology & Early Intervention - VNU',
      experienceYears: 12,
      description: 'Over 12 years of experience in clinical screening and designing individualized intervention programs for children with autism and speech delays.',
      feedbacks: [
        { parentName: 'Bin\'s Mother (Hanoi)', rating: 5, comment: 'Dr. Minh is incredibly patient. After 3 months under his guidance, my child has started speaking and proactively interacting. Highly recommended!' },
        { parentName: 'Gia Bao\'s Father (Danang)', rating: 5, comment: 'Super scientific and highly detailed screening process that relieved all our family anxiety.' }
      ]
    },
    { 
      name: 'Mrs. Nguyen Lan', 
      title: 'Child Psychology Consultant', 
      availability: 'Available: 13:00 - 15:00',
      qualification: 'M.S. in Child Psychological Assessment & Therapy - HNUE',
      experienceYears: 8,
      description: 'Specialized in pediatric behavior therapy, family counseling, and coordinating comprehensive inclusive development activities.',
      feedbacks: [
        { parentName: 'Hong Ngoc\'s Mother (Quang Nam)', rating: 5, comment: 'Mrs. Lan has a lovely warm voice, the children absolutely adore her. Her play therapy has done wonders!' },
        { parentName: 'Minh Quan\'s Mother (HCMC)', rating: 4, comment: 'Very dedicated consultant who provides actionable exercises that parents can easily run at home.' }
      ]
    },
    { 
      name: 'Dr. Tran Duc', 
      title: 'Behavioral Development Specialist', 
      availability: 'Available: 16:00 - 18:00',
      qualification: 'M.D. in Pediatrics & Rehabilitation - UMP',
      experienceYears: 10,
      description: 'Specializes in clinical assessments and pediatric therapies for behavioral disorders, ADHD, and early developmental delays.',
      feedbacks: [
        { parentName: 'Tuan Anh\'s Father (Vung Tau)', rating: 5, comment: 'Dr. Duc is extremely professional and respectful. His clinical assessment was highly accurate.' },
        { parentName: 'Bao Vy\'s Mother (Binh Duong)', rating: 5, comment: 'His behavior intervention plans helped my daughter significantly reduce her emotional outbursts.' }
      ]
    },
  ]

  return (
    <section id={id} className="hero snap-section">
      {/* 3D Three.js Interactive Particle System */}
      <ThreeBackground />

      <div className="hero-content container glass">
        <div className="hero-left">
          <h1 className="bubble-text glow-text">{t.heroTitle}</h1>
          <p className="hero-desc">{t.heroSub}</p>
          
          <div className="hero-actions neo-button-surface">
            <TiltButton 
              elevation={6} 
              radius={0} 
              surfaceColor="var(--primary)" 
              textColor="white"
              tilt={10}
              padding="1.2rem 3rem"
              className="btn-tilt-lg glow-btn-primary"
              onClick={onStartAssessment}
            >
              {t.btnStartAssessment}
            </TiltButton>

            <TiltButton 
              elevation={6} 
              radius={0} 
              surfaceColor="white" 
              textColor="var(--secondary)"
              tilt={10}
              padding="1.2rem 3rem"
              className="btn-tilt-lg glow-btn-white"
              onClick={() => setShowExperts((visible) => !visible)}
            >
              {t.btnBookExpert}
            </TiltButton>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img src={heroIllustration} alt="AutiCare Illustration" className="hero-illustration-img" />
          </div>
        </div>
      </div>

      {/* Floating indicators at bottom to prompt user to scroll */}
      <div className="scroll-indicator">
        <span className="mouse-icon">
          <span className="wheel" />
        </span>
        <span className="scroll-arrow" />
      </div>

      {showExperts && (
        <div className="experts-popup-overlay" onClick={() => setShowExperts(false)}>
          <div className="experts-panel glass" onClick={(event) => event.stopPropagation()}>
            <div className="experts-header">
              <div>
                <h3>{t.expertPanelTitle}</h3>
                <p>{t.expertPanelSub}</p>
              </div>
              <button className="close-experts-btn" type="button" onClick={() => setShowExperts(false)}>
                ×
              </button>
            </div>

            <div className="expert-list">
              {experts.map((expert) => (
                <div className="expert-card" key={expert.name}>
                  <div className="expert-avatar" aria-hidden="true">{expert.name.split(' ').map((part) => part[0]).join('')}</div>
                  <div className="expert-info">
                    <strong>{expert.name}</strong>
                    <span>{expert.title}</span>
                    <small>{expert.availability}</small>
                  </div>
                  <div className="expert-actions-row">
                    <button className="expert-detail-btn" type="button" onClick={() => setSelectedExpert(expert)}>
                      {t.btnViewDetail}
                    </button>
                    <button className="expert-schedule-btn" type="button" onClick={() => {
                      alert(lang === 'vi' ? `Đã kích hoạt quy trình đặt lịch với ${expert.name}!` : `Scheduling flow with ${expert.name} activated!`);
                      setShowExperts(false);
                    }}>
                      {t.btnScheduleNow}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Expert Popup Modal */}
      {selectedExpert && (
        <div className="experts-detail-overlay" onClick={() => setSelectedExpert(null)}>
          <div className="expert-detail-panel glass" onClick={(event) => event.stopPropagation()}>
            <div className="experts-header">
              <div className="header-info-group">
                <div 
                  className="expert-avatar detail-avatar" 
                  aria-hidden="true"
                  style={{
                    backgroundColor: (() => {
                      const idx = experts.findIndex(e => e.name === selectedExpert.name);
                      const cols = ['#EDE9FE', '#FCE7F3', '#FEF3C7'];
                      return idx !== -1 ? cols[idx % cols.length] : '#FEF3C7';
                    })()
                  }}
                >
                  {selectedExpert.name.split(' ').map((part: string) => part[0]).join('')}
                </div>
                <div>
                  <h3>{selectedExpert.name}</h3>
                  <p className="detail-expert-title">{selectedExpert.title}</p>
                </div>
              </div>
              <button className="close-experts-btn detail-close-btn" type="button" onClick={() => setSelectedExpert(null)}>
                ×
              </button>
            </div>

            <div className="expert-detail-content">
              {/* Bento Grid layout for credentials */}
              <div className="expert-detail-bento">
                <div className="detail-bento-card bento-qualification">
                  <h4>
                    <span className="bento-icon">🎓</span>
                    {t.lblQualification}
                  </h4>
                  <p>{selectedExpert.qualification}</p>
                </div>

                <div className="detail-bento-card bento-experience">
                  <h4>
                    <span className="bento-icon">⏳</span>
                    {t.lblExperience}
                  </h4>
                  <p className="experience-number">
                    <strong>{selectedExpert.experienceYears}</strong> {t.lblYears}
                  </p>
                </div>

                <div className="detail-bento-card bento-description">
                  <h4>
                    <span className="bento-icon">✨</span>
                    {lang === 'vi' ? 'Triết lý đồng hành' : 'Accompanying Philosophy'}
                  </h4>
                  <p>{selectedExpert.description}</p>
                </div>
              </div>

              {/* Feedbacks section */}
              <div className="feedbacks-section">
                <h3>
                  <span className="bento-icon">💬</span>
                  {t.lblFeedbacks}
                </h3>
                <div className="feedback-list">
                  {selectedExpert.feedbacks.map((fb: any, index: number) => (
                    <div className="feedback-item-card" key={index}>
                      <div className="feedback-item-header">
                        <span className="parent-badge">{fb.parentName}</span>
                        <div className="star-rating" aria-label={`${fb.rating} stars`}>
                          {Array.from({ length: fb.rating }).map((_, i) => (
                            <svg key={i} className="star-icon" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="feedback-comment">“{fb.comment}”</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="expert-detail-footer">
              <button className="expert-back-btn" type="button" onClick={() => setSelectedExpert(null)}>
                {t.btnBackToList}
              </button>
              <button className="expert-schedule-btn detail-schedule-cta" type="button" onClick={() => {
                alert(lang === 'vi' ? `Đã kích hoạt quy trình đặt lịch với ${selectedExpert.name}!` : `Scheduling flow with ${selectedExpert.name} activated!`);
                setSelectedExpert(null);
                setShowExperts(false);
              }}>
                {t.btnScheduleNow}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
