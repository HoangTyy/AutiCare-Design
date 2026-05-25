import React, { useState, useMemo } from 'react';

interface CenterInfo {
  id: string;
  name: string;
  date: string;
  status: string;
  address?: string;
  phone?: string;
  phone_number?: string;
  email?: string;
  province?: string;
  levels?: any[];
  categories?: any[];
  roles?: any[];
  staffs?: any[];
}

interface CenterDetailClientPageProps {
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
  center: CenterInfo;
  onBack: () => void;
  onInvoiceGenerated?: () => void;
}

const translations = {
  vi: {
    backToHome: 'Quay lại trang chủ',
    centerDetailTitle: 'Chi Tiết Cơ Sở AutiCare',
    centerDetailSub: 'Tìm hiểu thông tin và đặt lịch trực tiếp với các chuyên gia can thiệp hàng đầu tại cơ sở này.',
    address: 'Địa chỉ',
    phone: 'Điện thoại',
    email: 'Email',
    active: 'Đang hoạt động',
    inactive: 'Tạm ngưng',
    director: 'Giám đốc cơ sở',
    specialistListTitle: 'Đội Ngũ Chuyên Gia & Bác Sĩ Tại Cơ Sở',
    specialistListSub: 'Chọn bác sĩ hoặc chuyên viên trị liệu dưới đây để xem lịch trống và đặt lịch hẹn tư vấn 2 tiếng/phiên.',
    ratingReviews: 'đánh giá',
    btnScheduleNow: 'Đặt lịch ngay',
    bookingModalTitle: 'Xác nhận đặt lịch tư vấn',
    bookingSelectDate: 'Chọn ngày hẹn',
    bookingSelectTime: 'Chọn ca giờ trống',
    bookingBtnConfirm: 'Xác nhận đặt lịch',
    bookingSuccessTitle: 'Đặt lịch thành công!',
    bookingSuccessSub: 'Thông tin cuộc hẹn đã được ghi nhận vào hệ thống. Chuyên gia sẽ liên hệ bạn sớm nhất.',
    bookingTicketTitle: 'VÉ HẸN CHI TIẾT',
    bookingExpertLbl: 'Chuyên gia',
    bookingCenterLbl: 'Tại cơ sở',
    bookingTimeLbl: 'Thời gian',
    bookingMethodLbl: 'Hình thức',
    bookingCodeLbl: 'Mã số vé',
    bookingBtnClose: 'Hoàn tất & Đóng',
    bookingRequiredHint: 'Vui lòng chọn ngày và giờ để đặt lịch',
    slotOnline: 'Trực tuyến',
    slotOffline: 'Trực tiếp',
    slotAvailable: 'Đang trống',
    slotBooked: 'Đã bận',
    experienceYears: 'năm kinh nghiệm',
    accompanyPhilosophy: 'Triết lý trị liệu',
    formatOnline: 'Trực tuyến (Zoom/Google Meet)',
    formatOffline: 'Trực tiếp (Tại cơ sở trung tâm)'
  },
  en: {
    backToHome: 'Back to Home',
    centerDetailTitle: 'AutiCare Center Details',
    centerDetailSub: 'Explore facility information and book direct consultation sessions with early intervention specialists.',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    active: 'Active',
    inactive: 'Inactive',
    director: 'Center Director',
    specialistListTitle: 'Our Specialists & Clinical Roster',
    specialistListSub: 'Select a clinical doctor or early intervention therapist to view available slots and schedule a 2-hour session.',
    ratingReviews: 'reviews',
    btnScheduleNow: 'Book appointment',
    bookingModalTitle: 'Confirm Consultation Booking',
    bookingSelectDate: 'Select Date',
    bookingSelectTime: 'Select Time Slot',
    bookingBtnConfirm: 'Confirm Appointment',
    bookingSuccessTitle: 'Appointment Confirmed!',
    bookingSuccessSub: 'Your appointment details have been successfully saved. Our specialist will contact you shortly.',
    bookingTicketTitle: 'APPOINTMENT TICKET',
    bookingExpertLbl: 'Specialist',
    bookingCenterLbl: 'At Facility',
    bookingTimeLbl: 'Schedule',
    bookingMethodLbl: 'Format',
    bookingCodeLbl: 'Ticket Code',
    bookingBtnClose: 'Done & Close',
    bookingRequiredHint: 'Please choose a date and time slot to proceed',
    slotOnline: 'Online',
    slotOffline: 'Offline',
    slotAvailable: 'Available',
    slotBooked: 'Booked',
    experienceYears: 'years exp',
    accompanyPhilosophy: 'Philosophy',
    formatOnline: 'Online (Zoom/Google Meet)',
    formatOffline: 'Offline (At Clinical Center)'
  }
};

// Custom layout for doctors list
interface DoctorMock {
  id: string;
  name: string;
  titleVi: string;
  titleEn: string;
  qualificationVi: string;
  qualificationEn: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  descriptionVi: string;
  descriptionEn: string;
  avatarColor: string;
}

export const CenterDetailClientPage: React.FC<CenterDetailClientPageProps> = ({
  lang,
  setLang,
  center,
  onBack,
  onInvoiceGenerated
}) => {
  const t = translations[lang];

  // Booking details states
  const [bookingDoctor, setBookingDoctor] = useState<DoctorMock | null>(null);
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [ticketCode, setTicketCode] = useState<string>('');

  // Local state to track selected date on each doctor card's inline schedule
  // doctorId -> dateId
  const [doctorSelectedDates, setDoctorSelectedDates] = useState<Record<string, string>>({});

  // 1. Mock Specialists data specific to each center, ensuring professional descriptions
  const specialists: DoctorMock[] = useMemo(() => {
    const defaultSpecialists: DoctorMock[] = [
      {
        id: 'DOC-01',
        name: 'TS. Bác sĩ Hoàng Minh',
        titleVi: 'Chuyên gia Can thiệp sớm',
        titleEn: 'Early Intervention Specialist',
        qualificationVi: 'Tiến sĩ Tâm lý học Giáo dục & Can thiệp sớm - Đại học Quốc gia Hà Nội',
        qualificationEn: 'Ph.D. in Educational Psychology & Early Intervention - VNU',
        experienceYears: 12,
        rating: 5,
        reviewsCount: 38,
        avatarColor: '#EDE9FE',
        descriptionVi: 'Hơn 12 năm kinh nghiệm trong sàng lọc lâm sàng và thiết kế lộ trình điều trị cá nhân cho trẻ tự kỷ và chậm phát triển ngôn ngữ.',
        descriptionEn: 'Over 12 years of clinical screening experience and tailoring speech delay / autism therapeutic programs.'
      },
      {
        id: 'DOC-02',
        name: 'Cô ThS. Nguyễn Lan',
        titleVi: 'Chuyên viên Tâm lý học Trẻ em',
        titleEn: 'Pediatric Psychologist',
        qualificationVi: 'Thạc sĩ Tâm lý học Phát triển & Trị liệu Nhi khoa - Đại học Sư phạm TP.HCM',
        qualificationEn: 'M.S. in Child Development & Play Therapy - HCMC University of Education',
        experienceYears: 8,
        rating: 4.9,
        reviewsCount: 29,
        avatarColor: '#FCE7F3',
        descriptionVi: 'Chuyên môn sâu về liệu pháp chơi trị liệu (Play Therapy), hòa nhập cộng đồng và làm việc trực tiếp cùng phụ huynh hỗ trợ can thiệp tại nhà.',
        descriptionEn: 'Expertise in play therapy, social integration, and coaching parent-implemented early interventions at home.'
      },
      {
        id: 'DOC-03',
        name: 'BS. CKII. Trần Đức',
        titleVi: 'Bác sĩ Phục hồi chức năng & Hành vi',
        titleEn: 'Rehabilitation & Behavior Doctor',
        qualificationVi: 'Bác sĩ Chuyên khoa II Nhi khoa - Đại học Y Dược TP. Hồ Chí Minh',
        qualificationEn: 'M.D. in Child Rehabilitation & Behavioral Development - UMP',
        experienceYears: 10,
        rating: 5,
        reviewsCount: 41,
        avatarColor: '#FEF3C7',
        descriptionVi: 'Chuyên sâu chẩn đoán điều trị rối loạn phổ tự kỷ (ASD), rối loạn tăng động giảm chú ý (ADHD) và kiểm soát các hành vi bùng nổ.',
        descriptionEn: 'Specializes in clinical ASD/ADHD diagnostics, developmental rehab, and pediatric sensory modulation therapies.'
      }
    ];

    // If center has custom staffs, integrate them for a more realistic roster
    if (center.staffs && center.staffs.length > 0) {
      const mergedList: DoctorMock[] = [];
      
      // Add the Director first
      const dirStaff = center.staffs.find(s => s.roleId === 'R-DIR');
      if (dirStaff) {
        mergedList.push({
          id: dirStaff.id,
          name: dirStaff.name,
          titleVi: 'Giám đốc kiêm Chuyên gia Lâm sàng',
          titleEn: 'Center Director & Clinical Expert',
          qualificationVi: `Thạc sĩ can thiệp lâm sàng - Đồng hành quản lý cơ sở AutiCare`,
          qualificationEn: `M.S. in Clinical Intervention - AutiCare Facility Manager`,
          experienceYears: 14,
          rating: 5,
          reviewsCount: 52,
          avatarColor: '#D1FAE5',
          descriptionVi: `Đại diện chuyên môn cấp cao của cơ sở, dẫn dắt các chương trình can thiệp hành vi cá nhân hóa cho học viên.`,
          descriptionEn: `Senior clinical lead of the facility, directing individualized sensory and behavioral programs.`
        });
      }

      // Add other staff
      center.staffs.forEach(staff => {
        if (staff.roleId !== 'R-DIR') {
          const isTeacher = staff.roleId === 'R-TCH';
          mergedList.push({
            id: staff.id,
            name: staff.name,
            titleVi: isTeacher ? 'Giáo viên can thiệp đặc biệt' : 'Trị liệu viên cao cấp',
            titleEn: isTeacher ? 'Special Education Teacher' : 'Senior Behavior Therapist',
            qualificationVi: isTeacher ? 'Cử nhân Giáo dục Đặc biệt - ĐH Sư phạm' : 'Chuyên viên trị liệu hành vi ABA được cấp chứng nhận',
            qualificationEn: isTeacher ? 'Bachelor in Special Education' : 'Certified ABA Therapist',
            experienceYears: isTeacher ? 6 : 9,
            rating: 4.8,
            reviewsCount: 17,
            avatarColor: isTeacher ? '#DBEAFE' : '#FFE4E6',
            descriptionVi: isTeacher 
              ? 'Tận tâm xây dựng giáo án phát triển nhận thức, kỹ năng giao tiếp và tự phục vụ hàng ngày cho trẻ.' 
              : 'Năng động trong trị liệu điều hòa giác quan, huấn luyện vận động thô và tinh trong môi trường Memphis sinh động.',
            descriptionEn: isTeacher 
              ? 'Dedicated to building academic, social interaction, and self-help skill plans for young learners.' 
              : 'Active in sensory integration therapy, gross/fine motor control training, and social behavior play.'
          });
        }
      });

      // Pad with default doctors if roster is small
      if (mergedList.length < 3) {
        defaultSpecialists.forEach(doc => {
          if (!mergedList.some(m => m.name === doc.name)) {
            mergedList.push(doc);
          }
        });
      }
      return mergedList;
    }

    return defaultSpecialists;
  }, [center]);

  // 2. Next 4 days generator for dynamic dates
  const nextDays = useMemo(() => {
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
  }, [lang]);

  // Set default selected date for each doctor if not set yet
  useState(() => {
    const initialDates: Record<string, string> = {};
    specialists.forEach(doc => {
      initialDates[doc.id] = nextDays[0].id;
    });
    setDoctorSelectedDates(initialDates);
  });

  // Helper to get time slots for a doctor based on date
  // In a real app, this would query a database. Here we return dynamic results based on doctor ID & date ID to make it feel alive!
  const getDoctorTimeSlots = (doctorId: string, dateId: string) => {
    // Generate deterministic availability based on doctor ID char codes & date ID
    const seed = doctorId.charCodeAt(doctorId.length - 1) + dateId.charCodeAt(dateId.length - 1);
    
    return [
      { id: 'slot-1', time: '08:00 - 10:00', type: seed % 2 === 0 ? 'Online' : 'Offline', status: seed % 3 === 0 ? 'booked' : 'available' },
      { id: 'slot-2', time: '10:00 - 12:00', type: seed % 2 === 1 ? 'Online' : 'Offline', status: seed % 4 === 0 ? 'booked' : 'available' },
      { id: 'slot-3', time: '13:00 - 15:00', type: seed % 2 === 0 ? 'Online' : 'Offline', status: seed % 5 === 0 ? 'booked' : 'available' },
      { id: 'slot-4', time: '15:00 - 17:00', type: seed % 2 === 1 ? 'Online' : 'Offline', status: seed % 2 === 0 ? 'booked' : 'available' },
      { id: 'slot-5', time: '18:00 - 20:00', type: seed % 2 === 0 ? 'Online' : 'Offline', status: seed % 6 === 0 ? 'booked' : 'available' }
    ];
  };

  // Find center director name for presentation
  const directorName = useMemo(() => {
    if (center.staffs) {
      const dir = center.staffs.find(s => s.roleId === 'R-DIR');
      return dir ? dir.name : 'Chưa cập nhật / Not updated';
    }
    return 'Chưa cập nhật / Not updated';
  }, [center]);

  return (
    <div className="profile-page-wrapper all-centers-page-wrapper center-detail-client-wrapper">
      {/* 1. Sticky Header */}
      <header className="profile-page-header">
        <div className="profile-header-container">
          <div className="profile-header-left" onClick={onBack} style={{ cursor: 'pointer' }}>
            <div className="profile-brand-logo">AutiCare</div>
          </div>

          <h1 className="profile-page-title">{t.centerDetailTitle}</h1>

          <div className="profile-header-right">
            <div className="profile-lang-switch">
              <button
                className={`profile-lang-btn ${lang === 'vi' ? 'active' : ''}`}
                onClick={() => setLang('vi')}
              >
                VN
              </button>
              <button
                className={`profile-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>

            <button className="profile-back-btn" onClick={onBack}>
              ⬅ {t.backToHome}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main content */}
      <main className="profile-page-main centers-page-main">
        <div className="profile-content-container all-centers-main-container center-detail-client-container">
          
          {/* Header Info Banner */}
          <div className="all-centers-hero-zone center-detail-header-zone">
            <h2 className="all-centers-main-title">{center.name}</h2>
            <p className="all-centers-main-sub">{t.centerDetailSub}</p>
          </div>

          {/* 3. Center detailed info card - Single Card Board Layout */}
          <div className="center-detail-info-card glass">
            <div className="center-card-accent" />
            <div className="info-card-header">
              <div className="center-avatar" aria-hidden="true">🏢</div>
              <div className="info-card-title-group">
                <h3>{center.name}</h3>
                <span className={`center-card-status ${center.status.toLowerCase()}`}>
                  <span className="status-pulse" />
                  {center.status.toLowerCase() === 'active' ? t.active : t.inactive}
                </span>
              </div>
            </div>

            <div className="info-card-body-grid">
              <div className="info-item">
                <strong>📍 {t.address}:</strong>
                <span>{center.address || 'Chưa cập nhật'}</span>
              </div>
              <div className="info-item">
                <strong>📞 {t.phone}:</strong>
                <span>{center.phone_number || center.phone || 'Chưa cập nhật'}</span>
              </div>
              <div className="info-item">
                <strong>✉️ {t.email}:</strong>
                <span>{center.email || 'Chưa cập nhật'}</span>
              </div>
              <div className="info-item">
                <strong>👑 {t.director}:</strong>
                <span className="director-name-highlight">{directorName}</span>
              </div>
            </div>
          </div>

          {/* 4. Doctors & Specialists title */}
          <div className="specialists-list-title-zone">
            <h2 className="specialists-title-text">
              ✨ {t.specialistListTitle}
            </h2>
            <p className="specialists-sub-text">{t.specialistListSub}</p>
          </div>

          {/* 5. Doctor list - Each doctor in 1 horizontal Row */}
          <div className="doctors-list-rows">
            {specialists.map((doc) => {
              const activeDateId = doctorSelectedDates[doc.id] || nextDays[0].id;
              const activeDateObj = nextDays.find(d => d.id === activeDateId) || nextDays[0];
              const slots = getDoctorTimeSlots(doc.id, activeDateId);

              return (
                <div className="doctor-row-card glass" key={doc.id}>
                  <div className="doctor-row-accent" style={{ background: doc.avatarColor }} />
                  
                  {/* Left Column: Doctor Biography & Info */}
                  <div className="doctor-left-bio">
                    <div className="doctor-bio-header">
                      <div 
                        className="doctor-avatar-circle" 
                        style={{ backgroundColor: doc.avatarColor }}
                      >
                        {doc.name.split(' ').slice(-2).map(n => n[0]).join('')}
                      </div>
                      <div className="doctor-titles">
                        <h3 className="doctor-fullname">{doc.name}</h3>
                        <span className="doctor-specialty">{lang === 'vi' ? doc.titleVi : doc.titleEn}</span>
                        
                        <div className="doctor-stars-row">
                          <div className="star-rating" aria-label={`${doc.rating} stars`}>
                            {Array.from({ length: Math.floor(doc.rating) }).map((_, i) => (
                              <svg key={i} className="star-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="reviews-count">
                            <strong>{doc.rating}</strong> ({doc.reviewsCount} {t.ratingReviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="doctor-bio-body">
                      <p className="doctor-qualification">
                        <strong>🎓 {lang === 'vi' ? 'Học vị' : 'Credentials'}:</strong> {lang === 'vi' ? doc.qualificationVi : doc.qualificationEn}
                      </p>
                      <p className="doctor-experience-tag">
                        <strong>⏳ {lang === 'vi' ? 'Thâm niên' : 'Experience'}:</strong> {doc.experienceYears} {t.experienceYears}
                      </p>
                      <p className="doctor-philosophy">
                        <strong>✨ {t.accompanyPhilosophy}:</strong> “{lang === 'vi' ? doc.descriptionVi : doc.descriptionEn}”
                      </p>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="doctor-row-divider" />

                  {/* Right Column: Dynamic interactive schedule */}
                  <div className="doctor-right-schedule">
                    <div className="schedule-header-inline">
                      <h4>📅 {t.bookingSelectDate}</h4>
                      
                      {/* Mini date selector */}
                      <div className="mini-date-grid">
                        {nextDays.map((day) => {
                          const isSelected = activeDateId === day.id;
                          return (
                            <button
                              key={day.id}
                              type="button"
                              className={`mini-date-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => {
                                setDoctorSelectedDates(prev => ({
                                  ...prev,
                                  [doc.id]: day.id
                                }));
                              }}
                            >
                              <span className="mini-date-day">{day.dayName}</span>
                              <span className="mini-date-val">{day.dateStr}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time slots grid */}
                    <div className="schedule-slots-inline">
                      <h4>🕒 {t.bookingSelectTime}</h4>
                      <div className="mini-slots-grid">
                        {slots.map((slot) => {
                          const isBooked = slot.status === 'booked';
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              className={`mini-slot-card ${isBooked ? 'booked' : ''}`}
                              onClick={() => {
                                if (!isBooked) {
                                  setBookingDoctor(doc);
                                  setSelectedDate(activeDateObj);
                                  setSelectedTimeSlot(slot);
                                  setBookingSuccess(false);
                                  setTicketCode(`AC-${Math.floor(1000 + Math.random() * 9000)}`);
                                }
                              }}
                              disabled={isBooked}
                            >
                              <span className="slot-time-text">{slot.time}</span>
                              <div className="slot-badge-labels">
                                <span className={`slot-format-badge ${slot.type.toLowerCase()}`}>
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

                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* 6. Booking Confirmation Modal */}
      {bookingDoctor && (
        <div className="booking-popup-overlay" onClick={() => {
          if (!bookingSuccess) setBookingDoctor(null);
        }}>
          <div className="booking-panel glass center-detail-booking-modal" onClick={(e) => e.stopPropagation()}>
            {!bookingSuccess ? (
              <>
                <div className="experts-header">
                  <div className="header-info-group">
                    <div 
                      className="expert-avatar detail-avatar" 
                      aria-hidden="true"
                      style={{ backgroundColor: bookingDoctor.avatarColor }}
                    >
                      {bookingDoctor.name.split(' ').slice(-2).map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3>{t.bookingModalTitle}</h3>
                      <p className="detail-expert-title">{bookingDoctor.name} — {lang === 'vi' ? bookingDoctor.titleVi : bookingDoctor.titleEn}</p>
                    </div>
                  </div>
                  <button className="close-experts-btn" type="button" onClick={() => setBookingDoctor(null)}>
                    ×
                  </button>
                </div>

                <div className="expert-detail-content booking-content-scroll">
                  <div className="confirm-summary-box">
                    <div className="summary-row">
                      <strong>🏢 {t.bookingCenterLbl}:</strong>
                      <span>{center.name}</span>
                    </div>
                    <div className="summary-row">
                      <strong>📅 {t.bookingSelectDate}:</strong>
                      <span>{selectedDate?.fullDate}</span>
                    </div>
                    <div className="summary-row">
                      <strong>🕒 Khung giờ:</strong>
                      <span>{selectedTimeSlot?.time}</span>
                    </div>
                    <div className="summary-row">
                      <strong>🔗 {t.bookingMethodLbl}:</strong>
                      <span>
                        {selectedTimeSlot?.type === 'Online' ? t.formatOnline : t.formatOffline}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="expert-detail-footer">
                  <button className="expert-back-btn" type="button" onClick={() => setBookingDoctor(null)}>
                    Hủy bỏ / Cancel
                  </button>
                  <button 
                    className="expert-schedule-btn detail-schedule-cta" 
                    type="button"
                    onClick={() => {
                      setBookingSuccess(true);
                      if (onInvoiceGenerated) onInvoiceGenerated();
                    }}
                  >
                    {t.bookingBtnConfirm}
                  </button>
                </div>
              </>
            ) : (
              // Success Ticket Screen
              <div className="booking-success-container">
                <div className="success-header-wrapper">
                  <div className="success-tick-sticker" aria-hidden="true">✓</div>
                  <h2>{t.bookingSuccessTitle}</h2>
                  <p className="success-sub-desc">{t.bookingSuccessSub}</p>
                </div>

                {/* AutiCare Appointment Ticket */}
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
                        <strong>{bookingDoctor.name}</strong>
                      </div>
                      <div className="ticket-field">
                        <small>{t.bookingCenterLbl}</small>
                        <strong>{center.name}</strong>
                      </div>
                      <div className="ticket-field">
                        <small>{t.bookingTimeLbl}</small>
                        <strong>{selectedTimeSlot?.time} <br/> {selectedDate?.fullDate}</strong>
                      </div>
                      <div className="ticket-field">
                        <small>{t.bookingMethodLbl}</small>
                        <strong>
                          {selectedTimeSlot?.type === 'Online' ? t.formatOnline : t.formatOffline}
                        </strong>
                      </div>
                      <div className="ticket-field">
                        <small>{t.bookingCodeLbl}</small>
                        <strong className="ticket-code-text">{ticketCode}</strong>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Barcode */}
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
                  </div>
                </div>

                <div className="booking-success-footer">
                  <button className="expert-schedule-btn success-done-btn" type="button" onClick={() => {
                    setBookingDoctor(null);
                  }}>
                    {t.bookingBtnClose}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
