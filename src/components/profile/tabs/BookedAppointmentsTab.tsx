import React, { useState, useMemo } from 'react';

interface BookedAppointmentsTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Lịch hẹn Chẩn đoán & Can thiệp",
    subtitle: "Quản lý các buổi hẹn khám chẩn đoán phổ tự kỷ lâm sàng, đánh giá năng lực trị liệu hoặc tư vấn phụ huynh",
    doctor: "Chuyên gia / Bác sĩ",
    date: "Ngày hẹn",
    time: "Khung giờ",
    location: "Địa điểm khám",
    status: "Trạng thái",
    type: "Loại cuộc hẹn",
    confirmed: "Đã xác nhận",
    pending: "Đang chờ duyệt",
    completed: "Đã hoàn thành",
    typeDiagnostic: "Chẩn đoán lâm sàng chuyên sâu",
    typeAssessment: "Đánh giá năng lực can thiệp sớm",
    typeCounseling: "Tư vấn phụ huynh & Định định hướng trị liệu",
    room: "Phòng khám lâm sàng ",
    noData: "Không có lịch hẹn nào được tìm thấy.",
    meetingType: "Hình thức hẹn",
    online: "Online (Trực tuyến)",
    offline: "Offline (Trực tiếp)",
    onlineLocation: "Liên kết cuộc họp",
    googleMeet: "Google Meet (Phòng trực tuyến)",
    joinMeeting: "Tham gia cuộc họp 🚀",
    filterAll: "Tất cả trạng thái",
    // Modal Translations
    detailsTitle: "VÉ HẸN KHÁM LÂM SÀNG",
    patientChild: "Trẻ được khám",
    notes: "Chỉ dẫn chuẩn bị lâm sàng",
    childMock: "Nguyễn Minh Khang (Bé Dino)",
    closeBtn: "Đóng cửa sổ",
    // Reschedule Translations
    rescheduleBtn: "Dời lịch hẹn 🗓️",
    rescheduleTitle: "DỜI LỊCH HẸN LÂM SÀNG",
    selectNewDate: "Chọn ngày hẹn mới",
    selectNewTime: "Chọn khung giờ mới",
    confirmReschedule: "Xác nhận dời lịch 💾",
    cancelBtn: "Hủy bỏ ❌",
    errorSameDateTime: "Ngày và giờ mới chọn phải khác với lịch hẹn hiện tại!",
    successReschedule: "Yêu cầu dời lịch của bạn đã được gửi thành công! Trạng thái cuộc hẹn được chuyển sang Chờ duyệt.",
    originalSchedule: "Lịch hẹn hiện tại",
    noteDocLabel: "Hồ sơ cần chuẩn bị:",
    noteDocValue: "Học bạ can thiệp cũ, kết quả sàng lọc sơ bộ, sổ nhật ký hành vi (nếu có).",
    noteTimeLabel: "Thời gian tập trung:",
    noteTimeValue: "Có mặt trước 10 phút để bé làm quen phòng khám và ổn định tâm lý.",
  },
  en: {
    title: "Diagnostic & Intervention Appointments",
    subtitle: "Manage clinical autism diagnostics, developmental assessments, or parent consultation sessions",
    doctor: "Specialist / Doctor",
    date: "Appointment Date",
    time: "Time Slot",
    location: "Clinic Location",
    status: "Status",
    type: "Appointment Type",
    confirmed: "Confirmed",
    pending: "Pending",
    completed: "Completed",
    typeDiagnostic: "In-depth Clinical Diagnostics",
    typeAssessment: "Intervention Capacity Assessment",
    typeCounseling: "Parent Counseling & Orientation",
    room: "Clinical Room ",
    noData: "No booked appointments found.",
    meetingType: "Appointment Mode",
    online: "Online (Virtual)",
    offline: "Offline (In-person)",
    onlineLocation: "Meeting Link",
    googleMeet: "Google Meet (Virtual Room)",
    joinMeeting: "Join Meeting 🚀",
    filterAll: "All Statuses",
    // Modal Translations
    detailsTitle: "CLINICAL APPOINTMENT TICKET",
    patientChild: "Patient Child",
    notes: "Clinical Preparation Notes",
    childMock: "Nguyen Minh Khang (Baby Dino)",
    closeBtn: "Close Ticket",
    // Reschedule Translations
    rescheduleBtn: "Reschedule 🗓️",
    rescheduleTitle: "RESCHEDULE CLINICAL SESSION",
    selectNewDate: "Select New Date",
    selectNewTime: "Select New Time Slot",
    confirmReschedule: "Confirm Reschedule 💾",
    cancelBtn: "Cancel ❌",
    errorSameDateTime: "New date and time slot must be different from current schedule!",
    successReschedule: "Your reschedule request has been submitted successfully! Appointment status is now Pending.",
    originalSchedule: "Current Schedule",
    noteDocLabel: "Required documents:",
    noteDocValue: "Previous intervention records, screening results, and behavior logs (if any).",
    noteTimeLabel: "Arriving time:",
    noteTimeValue: "Arrive 10 minutes early to help your child adapt and stabilize.",
  }
};

const MOCK_APPOINTMENTS = [
  {
    id: "APT-2026-081",
    doctorVi: "TS. BS. Nguyễn Minh Anh",
    doctorEn: "Dr. Nguyen Minh Anh, PhD",
    roleVi: "Chuyên gia Chẩn đoán phổ tự kỷ",
    roleEn: "Autism Diagnostic Specialist",
    date: "2026-05-28",
    time: "09:00 - 11:00",
    room: "Room 102",
    type: "diagnostic",
    status: "confirmed",
    meetingType: "offline"
  },
  {
    id: "APT-2026-079",
    doctorVi: "ThS. Cô Nguyễn Lan Vy",
    doctorEn: "Ms. Nguyen Lan Vy, MSc",
    roleVi: "Chuyên gia Trị liệu Ngôn ngữ",
    roleEn: "Speech therapist",
    date: "2026-05-18",
    time: "14:00 - 16:00",
    room: "Google Meet",
    type: "assessment",
    status: "completed",
    meetingType: "online"
  },
  {
    id: "APT-2026-092",
    doctorVi: "BS. CKI. Trần Hồng Đức",
    doctorEn: "Dr. Tran Hong Duc, MD",
    roleVi: "Bác sĩ Nhi khoa & Phát triển Hành vi",
    roleEn: "Developmental & Behavioral Pediatrician",
    date: "2026-06-05",
    time: "08:30 - 10:30",
    room: "Room 105",
    type: "counseling",
    status: "pending",
    meetingType: "offline"
  }
];

const BookedAppointmentsTab: React.FC<BookedAppointmentsTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedApt, setSelectedApt] = useState<any | null>(null);
  
  const [appointments, setAppointments] = useState<any[]>(MOCK_APPOINTMENTS);

  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
  const [newDate, setNewDate] = useState<any | null>(null);
  const [newTimeSlot, setNewTimeSlot] = useState<any | null>(null);
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return t.confirmed;
      case 'completed': return t.completed;
      default: return t.pending;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'diagnostic': return t.typeDiagnostic;
      case 'assessment': return t.typeAssessment;
      default: return t.typeCounseling;
    }
  };

  const getNextRescheduleDays = (lang: 'vi' | 'en') => {
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

  const rescheduleDays = useMemo(() => getNextRescheduleDays(lang), [lang]);

  const rescheduleTimeSlots = [
    { id: 'r-slot-1', time: '08:00 - 10:00' },
    { id: 'r-slot-2', time: '10:00 - 12:00' },
    { id: 'r-slot-3', time: '13:00 - 15:00' },
    { id: 'r-slot-4', time: '15:00 - 17:00' },
    { id: 'r-slot-5', time: '18:00 - 20:00' }
  ];

  const handleConfirmReschedule = () => {
    if (!selectedApt || !newDate || !newTimeSlot) return;

    if (newDate.id === selectedApt.date && newTimeSlot.time === selectedApt.time) {
      setRescheduleError(t.errorSameDateTime);
      return;
    }

    setRescheduleError(null);

    const updatedAppointments = appointments.map(apt => {
      if (apt.id === selectedApt.id) {
        return {
          ...apt,
          date: newDate.id,
          time: newTimeSlot.time,
          status: 'pending'
        };
      }
      return apt;
    });

    setAppointments(updatedAppointments);

    setSelectedApt({
      ...selectedApt,
      date: newDate.id,
      time: newTimeSlot.time,
      status: 'pending'
    });

    setIsRescheduling(false);
    alert(t.successReschedule);
  };

  const filteredAppointments = appointments.filter(apt => {
    if (selectedStatus === 'all') return true;
    return apt.status === selectedStatus;
  });

  const statusFilters = [
    { key: 'all', label: t.filterAll, icon: '📅' },
    { key: 'confirmed', label: t.confirmed, icon: '✅' },
    { key: 'pending', label: t.pending, icon: '⏳' },
    { key: 'completed', label: t.completed, icon: '✨' },
  ];

  return (
    <div className="profile-tab-content">
      <div className="tab-section-header">
        <h2 className="tab-section-title">📅 {t.title}</h2>
        <p className="tab-section-subtitle">{t.subtitle}</p>
      </div>

      <div className="appointments-filter-bar">
        {statusFilters.map(filter => (
          <button
            key={filter.key}
            className={`appointment-filter-btn ${selectedStatus === filter.key ? 'active' : ''}`}
            onClick={() => setSelectedStatus(filter.key)}
          >
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {filteredAppointments.length > 0 ? (
        <div className="appointment-sticker-grid">
          {filteredAppointments.map((apt, idx) => (
            <div 
              className="profile-sticker-card appointment-card click-allowed" 
              key={apt.id}
              onClick={() => setSelectedApt(apt)}
              style={{ 
                animationDelay: `${idx * 80}ms`,
                transform: `rotate(${(idx % 2 === 0 ? 0.35 : -0.35)}deg)`,
                cursor: 'pointer'
              }}
              title="Click to view genuine clinical ticket"
            >
              {/* Card top accent ribbon */}
              <div className="appointment-card-accent-ribbon" />
              
              <div className="appointment-card-header">
                <span className="appointment-card-code">{apt.id}</span>
                <span className={`appointment-badge ${getStatusBadgeClass(apt.status)}`}>
                  {getStatusLabel(apt.status)}
                </span>
              </div>

              <div className="appointment-card-body">
                <div className="appointment-doctor-info">
                  <h4 className="appointment-doctor-name">
                    👤 {lang === 'vi' ? apt.doctorVi : apt.doctorEn}
                  </h4>
                  <div className="appointment-doctor-role">
                    {lang === 'vi' ? apt.roleVi : apt.roleEn}
                  </div>
                </div>
                
                <div className="appointment-card-details">
                  <div className="appointment-detail-row">
                    <span className="appointment-detail-label">📌 {t.type}:</span>
                    <span className="appointment-detail-value font-highlight">
                      {getTypeLabel(apt.type)}
                    </span>
                  </div>

                  <div className="appointment-detail-row">
                    <span className="appointment-detail-label">⚡ {t.meetingType}:</span>
                    <span className="appointment-detail-value">
                      <span className={`appointment-meeting-type-badge ${apt.meetingType}`}>
                        {apt.meetingType === 'online' ? t.online : t.offline}
                      </span>
                    </span>
                  </div>

                  <div className="appointment-detail-row">
                    <span className="appointment-detail-label">📅 {t.date}:</span>
                    <span className="appointment-detail-value">{apt.date}</span>
                  </div>

                  <div className="appointment-detail-row">
                    <span className="appointment-detail-label">⏰ {t.time}:</span>
                    <span className="appointment-detail-value">{apt.time}</span>
                  </div>

                  <div className="appointment-detail-row">
                    <span className="appointment-detail-label">📍 {t.location}:</span>
                    <span className="appointment-detail-value">
                      {apt.meetingType === 'online' ? (
                        <span className="appointment-online-location">{t.googleMeet}</span>
                      ) : (
                        <span>{t.room} {apt.room} (Cơ sở AutiCare)</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Google Meet Quick Action Button for confirmed online meetings */}
                {apt.meetingType === 'online' && apt.status === 'confirmed' && (
                  <a 
                    href="https://meet.google.com/abc-xyz-123" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="profile-sidebar-tab-btn appointment-meet-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {t.joinMeeting}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="appointment-empty-state">
          <div className="appointment-empty-icon">🔍</div>
          <p className="appointment-empty-text">{t.noData}</p>
        </div>
      )}

      {selectedApt && (
        <div className="profile-modal-overlay" onClick={() => setSelectedApt(null)}>
          <div className="profile-admin-modal appointment-detail-modal-shell appointment-ticket-card" onClick={(e) => e.stopPropagation()}>
            <div className="ticket-punch-left"></div>
            <div className="ticket-punch-right"></div>
            <div className="appointment-ticket-header">
              <div className="ticket-header-left">
                <span className="ticket-brand-logo">AutiCare</span>
                <span className="ticket-brand-badge">CLINICAL PASS</span>
              </div>
              <button className="profile-modal-close-btn ticket-close-btn" onClick={() => setSelectedApt(null)}>×</button>
            </div>
            
            <div className="profile-modal-body appointment-modal-body-container appointment-ticket-body">
              <div className="appointment-ticket-stub">
                <div className="appointment-modal-doctor-profile ticket-doctor-profile">
                  <div className="appointment-modal-avatar-bubble">👤</div>
                  <div className="appointment-modal-doctor-info-group">
                    <h4 className="appointment-modal-doctor-name">
                      {lang === 'vi' ? selectedApt.doctorVi : selectedApt.doctorEn}
                    </h4>
                    <p className="appointment-modal-doctor-role">
                      {lang === 'vi' ? selectedApt.roleVi : selectedApt.roleEn}
                    </p>
                  </div>
                </div>
                <div className="appointment-ticket-meta-right">
                  <span className="appointment-modal-id-badge ticket-id-badge">{selectedApt.id}</span>
                  <span className={`appointment-badge ${getStatusBadgeClass(selectedApt.status)}`}>
                    {getStatusLabel(selectedApt.status)}
                  </span>
                </div>
              </div>

              <div className="ticket-dashed-tear-line"></div>

              <div className="ticket-horizontal-content-layout">
                <div className="appointment-modal-details-grid ticket-details-grid">
                  <div className="appointment-modal-info-item">
                    <span className="appointment-modal-info-label">📌 {t.type}</span>
                    <span className="appointment-modal-info-value font-highlight">
                      {getTypeLabel(selectedApt.type)}
                    </span>
                  </div>

                  <div className="appointment-modal-info-item">
                    <span className="appointment-modal-info-label">⚡ {t.meetingType}</span>
                    <span className="appointment-modal-info-value">
                      <span className={`appointment-meeting-type-badge ${selectedApt.meetingType}`}>
                        {selectedApt.meetingType === 'online' ? t.online : t.offline}
                      </span>
                    </span>
                  </div>

                  <div className="appointment-modal-info-item">
                    <span className="appointment-modal-info-label">📅 {t.date}</span>
                    <span className="appointment-modal-info-value">{selectedApt.date}</span>
                  </div>

                  <div className="appointment-modal-info-item">
                    <span className="appointment-modal-info-label">⏰ {t.time}</span>
                    <span className="appointment-modal-info-value">{selectedApt.time}</span>
                  </div>

                  <div className="appointment-modal-info-item span-two">
                    <span className="appointment-modal-info-label">👶 {t.patientChild}</span>
                    <span className="appointment-modal-info-value">{t.childMock}</span>
                  </div>

                  <div className="appointment-modal-info-item full-width-info-row span-two">
                    <span className="appointment-modal-info-label">📍 {t.location}</span>
                    <span className="appointment-modal-info-value">
                      {selectedApt.meetingType === 'online' ? (
                        <span className="appointment-online-location">{t.googleMeet}</span>
                      ) : (
                        <span>{t.room} {selectedApt.room} (Cơ sở AutiCare)</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="appointment-modal-notes-box ticket-notes-box">
                  <div className="appointment-modal-notes-title">📋 {t.notes}</div>
                  <div className="appointment-modal-notes-text">
                    <div className="notes-list-item">
                      <span className="notes-list-emoji">📂</span>
                      <div className="notes-list-content">
                        <strong>{t.noteDocLabel}</strong> {t.noteDocValue}
                      </div>
                    </div>
                    <div className="notes-list-item">
                      <span className="notes-list-emoji">⏰</span>
                      <div className="notes-list-content">
                        <strong>{t.noteTimeLabel}</strong> {t.noteTimeValue}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="appointment-ticket-barcode-zone">
                <div className="barcode-lines-container">
                  <span className="barcode-line-element thin"></span>
                  <span className="barcode-line-element thick"></span>
                  <span className="barcode-line-element medium"></span>
                  <span className="barcode-line-element thin"></span>
                  <span className="barcode-line-element thick"></span>
                  <span className="barcode-line-element thin"></span>
                  <span className="barcode-line-element thick"></span>
                  <span className="barcode-line-element medium"></span>
                  <span className="barcode-line-element thick"></span>
                  <span className="barcode-line-element thin"></span>
                </div>
                <div className="barcode-numbers-label">*{selectedApt.id}-AUTICARE*</div>
              </div>
            </div>

            <div className="profile-modal-footer appointment-modal-actions-footer ticket-actions-footer">
              {(selectedApt.status === 'confirmed' || selectedApt.status === 'pending') && (
                <button 
                  className="profile-sidebar-tab-btn appointment-modal-reschedule-candy-btn ticket-reschedule-candy"
                  onClick={() => {
                    setNewDate(null);
                    setNewTimeSlot(null);
                    setRescheduleError(null);
                    setIsRescheduling(true);
                  }}
                >
                  {t.rescheduleBtn}
                </button>
              )}

              {selectedApt.meetingType === 'online' && selectedApt.status === 'confirmed' && (
                <a 
                  href="https://meet.google.com/abc-xyz-123" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="profile-sidebar-tab-btn appointment-meet-btn appointment-modal-meet-candy-btn ticket-meet-candy"
                  onClick={() => setSelectedApt(null)}
                >
                  {t.joinMeeting}
                </a>
              )}

              <button 
                className="profile-sidebar-tab-btn appointment-modal-close-candy-btn ticket-close-candy"
                onClick={() => setSelectedApt(null)}
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {isRescheduling && selectedApt && (
        <div className="reschedule-modal-overlay" onClick={() => setIsRescheduling(false)}>
          <div className="profile-admin-modal reschedule-modal-shell" onClick={(e) => e.stopPropagation()}>
            <div className="reschedule-modal-header">
              <h3 className="reschedule-modal-title">🗓️ {t.rescheduleTitle}</h3>
              <button className="close-experts-btn" onClick={() => setIsRescheduling(false)}>×</button>
            </div>
            
            <div className="reschedule-modal-body">
              <div className="reschedule-current-box">
                <span className="reschedule-current-label">📌 {t.originalSchedule}:</span>
                <span className="reschedule-current-value">
                  📅 {selectedApt.date} &nbsp;|&nbsp; ⏰ {selectedApt.time}
                </span>
              </div>

              <div className="reschedule-section">
                <h4>{t.selectNewDate}</h4>
                <div className="reschedule-date-grid">
                  {rescheduleDays.map((day) => {
                    const isSelected = newDate?.id === day.id;
                    return (
                      <button
                        key={day.id}
                        type="button"
                        className={`reschedule-date-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setNewDate(day);
                          setRescheduleError(null);
                        }}
                      >
                        <span className="reschedule-date-day">{day.dayName}</span>
                        <span className="reschedule-date-val">{day.dateStr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="reschedule-section" style={{ marginTop: '1.25rem' }}>
                <h4>{t.selectNewTime}</h4>
                <div className="reschedule-time-grid">
                  {rescheduleTimeSlots.map((slot) => {
                    const isSelected = newTimeSlot?.id === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        className={`reschedule-time-slot-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setNewTimeSlot(slot);
                          setRescheduleError(null);
                        }}
                      >
                        <span className="reschedule-time-icon">🕒</span>
                        <span className="reschedule-time-text">{slot.time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {rescheduleError && (
                <div className="reschedule-error-banner">
                  ⚠️ {rescheduleError}
                </div>
              )}
            </div>

            <div className="reschedule-modal-footer">
              <button 
                className="profile-sidebar-tab-btn reschedule-cancel-btn"
                onClick={() => setIsRescheduling(false)}
              >
                {t.cancelBtn}
              </button>
              
              <button 
                className={`profile-sidebar-tab-btn reschedule-confirm-btn ${(!newDate || !newTimeSlot) ? 'disabled-btn' : ''}`}
                disabled={!newDate || !newTimeSlot}
                onClick={handleConfirmReschedule}
              >
                {t.confirmReschedule}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedAppointmentsTab;
