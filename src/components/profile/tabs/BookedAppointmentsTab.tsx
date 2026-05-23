import React from 'react';

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
    noData: "Không có lịch hẹn nào được tìm thấy."
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
    noData: "No booked appointments found."
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
    time: "09:00 - 11:30",
    room: "Room 102",
    type: "diagnostic",
    status: "confirmed"
  },
  {
    id: "APT-2026-079",
    doctorVi: "ThS. Cô Nguyễn Lan Vy",
    doctorEn: "Ms. Nguyen Lan Vy, MSc",
    roleVi: "Chuyên gia Trị liệu Ngôn ngữ",
    roleEn: "Speech therapist",
    date: "2026-05-18",
    time: "14:00 - 15:30",
    room: "Room 304",
    type: "assessment",
    status: "completed"
  },
  {
    id: "APT-2026-092",
    doctorVi: "BS. CKI. Trần Hồng Đức",
    doctorEn: "Dr. Tran Hong Duc, MD",
    roleVi: "Bác sĩ Nhi khoa & Phát triển Hành vi",
    roleEn: "Developmental & Behavioral Pediatrician",
    date: "2026-06-05",
    time: "08:30 - 10:00",
    room: "Room 105",
    type: "counseling",
    status: "pending"
  }
];

const BookedAppointmentsTab: React.FC<BookedAppointmentsTabProps> = ({ lang }) => {
  const t = translations[lang];

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

  return (
    <div className="profile-tab-content">
      <div className="tab-section-header">
        <h2 className="tab-section-title">📅 {t.title}</h2>
        <p className="tab-section-subtitle">{t.subtitle}</p>
      </div>

      {/* Appointment Grid */}
      <div className="appointment-sticker-grid">
        {MOCK_APPOINTMENTS.map((apt, idx) => (
          <div 
            key={apt.id} 
            className="profile-sticker-card appointment-card"
            style={{ 
              animationDelay: `${idx * 80}ms`,
              transform: `rotate(${(idx % 2 === 0 ? 0.3 : -0.3)}deg)` 
            }}
          >
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
                    {t.room} {apt.room} (Cơ sở AutiCare)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedAppointmentsTab;
