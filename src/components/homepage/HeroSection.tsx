import React from 'react';
import { TiltButton } from 'react-tilt-button';
import ThreeBackground from './ThreeBackground';

import heroIllustration from '../../assets/hero-illustration.png';

interface HeroSectionProps {
  id: string;
  t: any;
  lang: string;
  onQuizSelected: (quizId: 'mchat' | 'cars') => void;
  onInvoiceGenerated?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id, t, lang, onQuizSelected, onInvoiceGenerated }) => {
  const [showExperts, setShowExperts] = React.useState(false)
  const [showAssessmentModal, setShowAssessmentModal] = React.useState(false)
  const [selectedExpert, setSelectedExpert] = React.useState<any | null>(null)
  
  // Custom Scheduling Flow States
  const [bookingExpert, setBookingExpert] = React.useState<any | null>(null)
  const [selectedDate, setSelectedDate] = React.useState<any | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<any | null>(null)
  const [bookingSuccess, setBookingSuccess] = React.useState<boolean>(false)
  const [ticketCode, setTicketCode] = React.useState<string>('')

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

  // Dynamic next 4 days generator for booking slots
  const getNextDays = (lang: string) => {
    const days = [];
    const now = new Date();
    for (let i = 1; i <= 4; i++) {
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + i);
      
      let dayName = '';
      if (lang === 'vi') {
        const weekday = nextDate.getDay();
        dayName = weekday === 0 ? 'Chủ Nhật' : `Thứ ${weekday + 1}`;
      } else {
        const weekdayStr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        dayName = weekdayStr[nextDate.getDay()];
      }
      
      const dateStr = `${nextDate.getDate().toString().padStart(2, '0')}/${(nextDate.getMonth() + 1).toString().padStart(2, '0')}`;
      days.push({
        id: nextDate.toISOString().split('T')[0],
        dayName,
        dateStr,
        fullDate: nextDate.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      });
    }
    return days;
  };

  const nextDays = React.useMemo(() => getNextDays(lang), [lang]);

  // Standard 2-hour sessions with Online/Offline types and availability statuses
  const timeSlots = React.useMemo(() => [
    { id: 'slot-1', time: '08:00 - 10:00', type: 'Online', status: 'available' },
    { id: 'slot-2', time: '10:00 - 12:00', type: 'Offline', status: 'booked' },
    { id: 'slot-3', time: '13:00 - 15:00', type: 'Online', status: 'available' },
    { id: 'slot-4', time: '15:00 - 17:00', type: 'Offline', status: 'available' },
    { id: 'slot-5', time: '18:00 - 20:00', type: 'Online', status: 'booked' }
  ], []);

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
              onClick={() => setShowAssessmentModal(true)}
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

      {showAssessmentModal && (
        <div className="experts-popup-overlay" onClick={() => setShowAssessmentModal(false)}>
          <div className="experts-panel glass" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '760px' }}>
            <div className="experts-header">
              <div>
                <h3>{lang === 'vi' ? 'Chọn bộ công cụ đánh giá' : 'Choose an assessment tool'}</h3>
                <p>{lang === 'vi' ? 'Hỗ trợ cha mẹ chọn bài kiểm tra phù hợp để sàng lọc hành vi và phát triển.' : 'Help parents choose the right screening tool for behavior and development.'}</p>
              </div>
              <button className="close-experts-btn" type="button" onClick={() => setShowAssessmentModal(false)}>
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0F172A' }}>M-CHAT-R/F</h4>
                <p style={{ margin: '0 0 1rem', color: '#475569' }}>{lang === 'vi' ? 'Bộ sàng lọc cha mẹ cho trẻ 16-30 tháng.' : 'A parent-report screening tool for toddlers aged 16 to 30 months.'}</p>
                <button
                  type="button"
                  onClick={() => {
                    setShowAssessmentModal(false)
                    onQuizSelected('mchat')
                  }}
                  style={{ border: 'none', background: '#8B5CF6', color: '#fff', padding: '0.9rem 1.5rem', borderRadius: '999px', cursor: 'pointer' }}
                >
                  {lang === 'vi' ? 'Bắt đầu M-CHAT-R/F' : 'Start M-CHAT-R/F'}
                </button>
              </div>

              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0F172A' }}>CARS</h4>
                <p style={{ margin: '0 0 1rem', color: '#475569' }}>{lang === 'vi' ? 'Đánh giá hành vi dựa trên quan sát cho trẻ từ 2 tuổi trở lên.' : 'An observational behavior rating scale for children 2 years and older.'}</p>
                <button
                  type="button"
                  onClick={() => {
                    setShowAssessmentModal(false)
                    onQuizSelected('cars')
                  }}
                  style={{ border: 'none', background: '#8B5CF6', color: '#fff', padding: '0.9rem 1.5rem', borderRadius: '999px', cursor: 'pointer' }}
                >
                  {lang === 'vi' ? 'Bắt đầu CARS' : 'Start CARS'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      setShowExperts(false);
                      setBookingExpert(expert);
                      setSelectedDate(null);
                      setSelectedTimeSlot(null);
                      setBookingSuccess(false);
                      setTicketCode(`AC-${Math.floor(1000 + Math.random() * 9000)}`);
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
                const targetExpert = selectedExpert;
                setSelectedExpert(null);
                setBookingExpert(targetExpert);
                setSelectedDate(null);
                setSelectedTimeSlot(null);
                setBookingSuccess(false);
                setTicketCode(`AC-${Math.floor(1000 + Math.random() * 9000)}`);
              }}>
                {t.btnScheduleNow}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Booking Time Slots Selection Modal */}
      {bookingExpert && (
        <div className="booking-popup-overlay" onClick={() => {
          if (!bookingSuccess) {
            setBookingExpert(null);
          }
        }}>
          <div className="booking-panel glass" onClick={(event) => event.stopPropagation()}>
            {!bookingSuccess ? (
              <>
                <div className="experts-header">
                  <div className="header-info-group">
                    <div 
                      className="expert-avatar detail-avatar" 
                      aria-hidden="true"
                      style={{
                        backgroundColor: (() => {
                          const idx = experts.findIndex(e => e.name === bookingExpert.name);
                          const cols = ['#EDE9FE', '#FCE7F3', '#FEF3C7'];
                          return idx !== -1 ? cols[idx % cols.length] : '#FEF3C7';
                        })()
                      }}
                    >
                      {bookingExpert.name.split(' ').map((part: string) => part[0]).join('')}
                    </div>
                    <div>
                      <h3>{t.bookingModalTitle}</h3>
                      <p className="detail-expert-title">{bookingExpert.name} — {bookingExpert.title}</p>
                    </div>
                  </div>
                  <button className="close-experts-btn" type="button" onClick={() => setBookingExpert(null)}>
                    ×
                  </button>
                </div>

                <div className="expert-detail-content booking-content-scroll">
                  {/* Select Date Area */}
                  <div className="booking-section">
                    <h4>
                      <span className="bento-icon">📅</span>
                      {t.bookingSelectDate}
                    </h4>
                    <div className="date-grid">
                      {nextDays.map((day) => {
                        const isSelected = selectedDate?.id === day.id;
                        return (
                          <button
                            key={day.id}
                            type="button"
                            className={`date-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedDate(day)}
                          >
                            <span className="date-day-name">{day.dayName}</span>
                            <span className="date-day-val">{day.dateStr}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Time Slots Area */}
                  <div className="booking-section" style={{ marginTop: '0.5rem' }}>
                    <h4>
                      <span className="bento-icon">🕒</span>
                      {t.bookingSelectTime}
                    </h4>
                    <div className="time-grid">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTimeSlot?.id === slot.id;
                        const isBooked = slot.status === 'booked';
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            className={`time-slot-card ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                            onClick={() => {
                              if (!isBooked) setSelectedTimeSlot(slot);
                            }}
                            disabled={isBooked}
                          >
                            <div className="time-slot-main">
                              <span className="time-icon">🕒</span>
                              <span className="time-text">{slot.time}</span>
                            </div>
                            
                            <div className="slot-badges">
                              <span className={`slot-type-badge ${slot.type.toLowerCase()}`}>
                                {slot.type === 'Online' ? t.slotOnline : t.slotOffline}
                              </span>
                              <span className={`slot-status-badge ${slot.status}`}>
                                {slot.status === 'available' ? t.slotAvailable : t.slotBooked}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="expert-detail-footer">
                  <button className="expert-back-btn" type="button" onClick={() => {
                    setBookingExpert(null);
                    setShowExperts(true);
                  }}>
                    {t.btnBackToList}
                  </button>
                  <div className="booking-footer-action-zone">
                    {!selectedDate || !selectedTimeSlot ? (
                      <span className="booking-required-hint">{t.bookingRequiredHint}</span>
                    ) : null}
                    <button 
                      className={`expert-schedule-btn detail-schedule-cta ${(!selectedDate || !selectedTimeSlot) ? 'disabled-btn' : ''}`} 
                      type="button" 
                      disabled={!selectedDate || !selectedTimeSlot}
                      onClick={() => {
                        setBookingSuccess(true);
                        if (onInvoiceGenerated) onInvoiceGenerated();
                      }}
                    >
                      {t.bookingBtnConfirm}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Success Screen with Appointment Ticket
              <div className="booking-success-container">
                <div className="success-header-wrapper">
                  <div className="success-tick-sticker" aria-hidden="true">✓</div>
                  <h2>{t.bookingSuccessTitle}</h2>
                  <p className="success-sub-desc">{t.bookingSuccessSub}</p>
                </div>

                {/* Appointment Ticket Playful Geometric */}
                <div className="appointment-ticket">
                  <div className="ticket-top">
                    <span className="ticket-brand">AutiCare</span>
                    <span className="ticket-badge">CONFIRMED</span>
                  </div>
                  <div className="ticket-body">
                    <h3 className="ticket-title">{t.bookingTicketTitle}</h3>
                    
                    <div className="ticket-grid">
                      <div className="ticket-field">
                        <small>{t.bookingExpertLbl}</small>
                        <strong>{bookingExpert.name}</strong>
                      </div>
                      <div className="ticket-field">
                        <small>{t.bookingTimeLbl}</small>
                        <strong>{selectedTimeSlot?.time} <br/> {selectedDate?.fullDate}</strong>
                      </div>
                      <div className="ticket-field">
                        <small>{t.bookingMethodLbl}</small>
                        <strong>
                          {selectedTimeSlot?.type === 'Online' 
                            ? (lang === 'vi' ? 'Trực tuyến (Zoom/Google Meet)' : 'Online (Zoom/Google Meet)')
                            : (lang === 'vi' ? 'Trực tiếp (Tại trung tâm)' : 'Offline (At Clinical Center)')}
                        </strong>
                      </div>
                      <div className="ticket-field">
                        <small>{t.bookingCodeLbl}</small>
                        <strong className="ticket-code-text">{ticketCode}</strong>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Ticket bar code */}
                  <div className="ticket-barcode" aria-hidden="true">
                    <div className="barcode-line w-2"></div>
                    <div className="barcode-line w-4"></div>
                    <div className="barcode-line w-1"></div>
                    <div className="barcode-line w-3"></div>
                    <div className="barcode-line w-2"></div>
                    <div className="barcode-line w-1"></div>
                    <div className="barcode-line w-4"></div>
                    <div className="barcode-line w-2"></div>
                    <div className="barcode-line w-3"></div>
                    <div className="barcode-line w-1"></div>
                    <div className="barcode-line w-2"></div>
                    <div className="barcode-line w-4"></div>
                  </div>
                </div>

                <div className="booking-success-footer">
                  <button className="expert-schedule-btn success-done-btn" type="button" onClick={() => {
                    setBookingExpert(null);
                    setShowExperts(false);
                  }}>
                    {t.bookingBtnClose}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
