import React, { useState } from 'react';

interface Appointment {
  id: string;
  childName: string;
  parentName: string;
  parentPhone: string;
  date: string;
  time: string;
  method: 'online' | 'offline';
  location: string;
  status: 'confirmed' | 'pending' | 'reschedule_pending' | 'rejected' | 'completed';
  type: string;
  rescheduleDate?: string;
  rescheduleTime?: string;
  room?: string;
}

interface StaffAppointmentsTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Danh sách lịch hẹn phụ huynh đặt",
    subtitle: "Duyệt hồ sơ khám chẩn đoán, đánh giá năng lực và phản hồi yêu cầu dời lịch",
    filterAll: "Tất cả trạng thái",
    filterConfirmed: "Đã duyệt ✅",
    filterPending: "Chưa duyệt ⏳",
    filterReschedule: "Chờ dời lịch 🗓️",
    filterRejected: "Từ chối ❌",
    filterCompleted: "Đã hoàn thành 🎓",
    lblMethod: "Hình thức hẹn",
    lblDate: "Ngày hẹn",
    lblTime: "Khung giờ",
    lblLocation: "Địa chỉ / Phòng họp",
    lblParent: "Phụ huynh liên hệ",
    lblChild: "Trẻ khám chẩn đoán",
    lblPhone: "Số điện thoại",
    methodOnline: "Trực tuyến (Google Meet)",
    methodOffline: "Trực tiếp tại cơ sở",
    statusConfirmed: "Đã xác nhận",
    statusPending: "Đang chờ duyệt",
    statusReschedule: "Đợi duyệt dời lịch",
    statusRejected: "Đã từ chối",
    statusCompleted: "Đã hoàn thành",
    btnApprove: "Duyệt lịch hẹn ✅",
    btnReject: "Từ chối cuộc hẹn ❌",
    btnApproveReschedule: "Đồng ý dời lịch ✅",
    btnRejectReschedule: "Từ chối dời / Giữ lịch cũ ❌",
    btnMeet: "Tham gia cuộc họp 🚀",
    btnDetail: "Xem chi tiết vé hẹn",
    btnClose: "Đóng cửa sổ",
    emptyStateTitle: "Không tìm thấy lịch hẹn nào",
    emptyStateSub: "Vui lòng chọn bộ lọc khác hoặc kiểm tra lại danh sách.",
    rescheduleProposalTitle: "Đề xuất dời lịch từ Phụ huynh:",
    rescheduleFrom: "Lịch gốc:",
    rescheduleTo: "Lịch mới đề xuất:",
    ticketTitle: "VÉ HẸN AUTICARE",
    ticketStubTitle: "ĐƠN VỊ LÂM SÀNG",
    ticketStubSub: "Khoa Đánh Giá & Chẩn Đoán",
    ticketStubExpert: "Bác sĩ phụ trách:",
    ticketStubExpertVal: "TS. BS. Nguyễn Minh Anh",
    ticketStubCode: "MÃ SỐ VÉ",
    ticketNotesTitle: "CHỈ DẪN CHUẨN BỊ LÂM SÀNG",
    ticketNotes1: "Hồ sơ cần mang:",
    ticketNotes1Val: "Mang theo học bạ mẫu giáo, kết quả sàng lọc sơ bộ trước đó và sổ tiêm chủng của bé.",
    ticketNotes2: "Thời gian tập trung:",
    ticketNotes2Val: "Vui lòng tập trung trước giờ hẹn 15 phút để hoàn tất thủ tục đo chiều cao, cân nặng lâm sàng.",
    toastApprove: "✨ Đã duyệt lịch hẹn thành công!",
    toastReject: "❌ Đã từ chối cuộc hẹn này.",
    toastApproveReschedule: "✨ Đã đồng ý dời lịch hẹn sang ngày/giờ mới đề xuất!",
    toastRejectReschedule: "❌ Đã từ chối dời lịch, khôi phục ngày/giờ gốc của cuộc hẹn!"
  },
  en: {
    title: "Parent Appointment Requests",
    subtitle: "Approve developmental assessment bookings and handle rescheduling proposals",
    filterAll: "All Statuses",
    filterConfirmed: "Confirmed ✅",
    filterPending: "Pending ⏳",
    filterReschedule: "Reschedule Pending 🗓️",
    filterRejected: "Rejected ❌",
    filterCompleted: "Completed 🎓",
    lblMethod: "Meeting Format",
    lblDate: "Date",
    lblTime: "Time Slot",
    lblLocation: "Location / Room link",
    lblParent: "Contact Parent",
    lblChild: "Patient Child",
    lblPhone: "Phone Number",
    methodOnline: "Online (Google Meet)",
    methodOffline: "Directly at Clinic",
    statusConfirmed: "Confirmed",
    statusPending: "Pending Approval",
    statusReschedule: "Reschedule Pending",
    statusRejected: "Rejected",
    statusCompleted: "Completed",
    btnApprove: "Approve Appointment ✅",
    btnReject: "Reject Appointment ❌",
    btnApproveReschedule: "Accept New Date ✅",
    btnRejectReschedule: "Reject New / Keep Original ❌",
    btnMeet: "Join Meeting 🚀",
    btnDetail: "View Detail Ticket",
    btnClose: "Close Ticket",
    emptyStateTitle: "No appointments found",
    emptyStateSub: "Please select another filter or double check your dashboard list.",
    rescheduleProposalTitle: "Rescheduling Proposal from Parent:",
    rescheduleFrom: "Original Date:",
    rescheduleTo: "New Date Proposed:",
    ticketTitle: "AUTICARE CLINICAL TICKET",
    ticketStubTitle: "CLINICAL DIVISION",
    ticketStubSub: "Assessment & Diagnosis",
    ticketStubExpert: "Doctor in Charge:",
    ticketStubExpertVal: "PhD. MD. Nguyen Minh Anh",
    ticketStubCode: "TICKET CODE",
    ticketNotesTitle: "CLINICAL PREPARATION NOTES",
    ticketNotes1: "Required Files:",
    ticketNotes1Val: "Bring preschool records, previous screening results, and child vaccination book.",
    ticketNotes2: "Check-in Time:",
    ticketNotes2Val: "Please arrive 15 minutes early to complete standard clinical weight and height checks.",
    toastApprove: "✨ Appointment approved successfully!",
    toastReject: "❌ Appointment rejected.",
    toastApproveReschedule: "✨ Rescheduled appointment successfully to new proposed slot!",
    toastRejectReschedule: "❌ Rescheduling rejected, restored original appointment details!"
  }
};

const MOCK_STAFF_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-2026-081",
    childName: "Trần Gia Bảo",
    parentName: "Nguyễn Thanh Hằng",
    parentPhone: "0912.456.789",
    date: "2026-05-28",
    time: "09:00 - 11:00",
    method: "offline",
    location: "Cơ sở AutiCare Central Saigon",
    room: "Phòng Chẩn Đoán L02",
    status: "confirmed",
    type: "Chẩn đoán phổ tự kỷ lâm sàng chuyên sâu"
  },
  {
    id: "APT-2026-092",
    childName: "Phạm Minh Đăng",
    parentName: "Phạm Hoàng Nam",
    parentPhone: "0988.112.233",
    date: "2026-05-29",
    time: "14:00 - 16:00",
    method: "offline",
    location: "Cơ sở AutiCare Central Saigon",
    room: "Phòng Trị Liệu Hành Vi T05",
    status: "pending",
    type: "Sàng lọc phản xạ & Đánh giá giao tiếp xã hội"
  },
  {
    id: "APT-2026-105",
    childName: "Đỗ Hoàng Hải",
    parentName: "Đỗ Thùy Linh",
    parentPhone: "0934.556.778",
    date: "2026-05-30",
    time: "08:30 - 10:30",
    method: "online",
    location: "Google Meet (Phòng trực tuyến)",
    status: "reschedule_pending",
    type: "Đánh giá rối loạn tăng động giảm chú ý (ADHD)",
    rescheduleDate: "2026-06-01",
    rescheduleTime: "10:00 - 12:00"
  },
  {
    id: "APT-2026-079",
    childName: "Phan Khánh Ngọc",
    parentName: "Phan Thu Trang",
    parentPhone: "0904.667.889",
    date: "2026-05-24",
    time: "15:30 - 17:30",
    method: "online",
    location: "Google Meet (Phòng trực tuyến)",
    status: "completed",
    type: "Tham vấn lộ trình trị liệu hành vi ABA cho gia đình"
  },
  {
    id: "APT-2026-112",
    childName: "Bùi Đức Anh",
    parentName: "Bùi Tiến Dũng",
    parentPhone: "0977.334.455",
    date: "2026-05-31",
    time: "09:00 - 11:00",
    method: "offline",
    location: "Cơ sở AutiCare Central Saigon",
    room: "Phòng Quan Sát Phản Xạ H01",
    status: "rejected",
    type: "Kiểm tra phản xạ cảm giác & Vận động thô"
  }
];

const StaffAppointmentsTab: React.FC<StaffAppointmentsTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_STAFF_APPOINTMENTS);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'reschedule_pending' | 'rejected' | 'completed'>('all');
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 1. Duyệt lịch hẹn từ Pending -> Confirmed
  const handleApprove = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: 'confirmed' } : apt)
    );
    // Đồng bộ vào vé chi tiết nếu đang mở
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt(prev => prev ? { ...prev, status: 'confirmed' } : null);
    }
    triggerToast(t.toastApprove);
  };

  // 2. Từ chối lịch hẹn từ Pending -> Rejected
  const handleReject = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: 'rejected' } : apt)
    );
    // Đồng bộ vào vé chi tiết nếu đang mở
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt(prev => prev ? { ...prev, status: 'rejected' } : null);
    }
    triggerToast(t.toastReject);
  };

  // 3. Chấp thuận dời lịch hẹn từ Reschedule Pending -> Confirmed với ngày giờ mới
  const handleApproveReschedule = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAppointments(prev =>
      prev.map(apt => {
        if (apt.id === id && apt.rescheduleDate && apt.rescheduleTime) {
          return {
            ...apt,
            date: apt.rescheduleDate,
            time: apt.rescheduleTime,
            status: 'confirmed',
            rescheduleDate: undefined,
            rescheduleTime: undefined
          };
        }
        return apt;
      })
    );
    // Đồng bộ vào vé chi tiết nếu đang mở
    if (selectedApt && selectedApt.id === id && selectedApt.rescheduleDate && selectedApt.rescheduleTime) {
      setSelectedApt(prev => prev ? {
        ...prev,
        date: prev.rescheduleDate!,
        time: prev.rescheduleTime!,
        status: 'confirmed',
        rescheduleDate: undefined,
        rescheduleTime: undefined
      } : null);
    }
    triggerToast(t.toastApproveReschedule);
  };

  // 4. Từ chối dời lịch, giữ lịch cũ -> Confirmed
  const handleRejectReschedule = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAppointments(prev =>
      prev.map(apt => {
        if (apt.id === id) {
          return {
            ...apt,
            status: 'confirmed',
            rescheduleDate: undefined,
            rescheduleTime: undefined
          };
        }
        return apt;
      })
    );
    // Đồng bộ vào vé chi tiết nếu đang mở
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt(prev => prev ? {
        ...prev,
        status: 'confirmed',
        rescheduleDate: undefined,
        rescheduleTime: undefined
      } : null);
    }
    triggerToast(t.toastRejectReschedule);
  };

  // Filter logic
  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  return (
    <div className="staff-appointments-container">
      
      {/* 3D Memphis Floating Toast Message */}
      {showToast && (
        <div className="profile-toast-message shadow-bounce">
          <span className="profile-toast-icon">🎉</span>
          <span className="profile-toast-text">{toastMsg}</span>
        </div>
      )}

      {/* Title Header Section */}
      <div className="staff-appointments-header-zone">
        <h2 className="staff-appointments-title">{t.title}</h2>
        <p className="staff-appointments-subtitle">{t.subtitle}</p>
      </div>

      {/* Filters Board */}
      <div className="appointments-filter-bar horizontal-scroll-board">
        <button 
          className={`appointment-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t.filterAll}
        </button>
        <button 
          className={`appointment-filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          {t.filterConfirmed}
        </button>
        <button 
          className={`appointment-filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          {t.filterPending}
        </button>
        <button 
          className={`appointment-filter-btn ${filter === 'reschedule_pending' ? 'active' : ''}`}
          onClick={() => setFilter('reschedule_pending')}
        >
          {t.filterReschedule}
        </button>
        <button 
          className={`appointment-filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          {t.filterCompleted}
        </button>
        <button 
          className={`appointment-filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          {t.filterRejected}
        </button>
      </div>

      {/* Grid List View */}
      {filteredAppointments.length === 0 ? (
        <div className="appointment-empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">{t.emptyStateTitle}</h3>
          <p className="empty-state-sub">{t.emptyStateSub}</p>
        </div>
      ) : (
        <div className="appointment-sticker-grid">
          {filteredAppointments.map((apt) => {
            const hasProposedReschedule = apt.status === 'reschedule_pending' && apt.rescheduleDate && apt.rescheduleTime;
            
            return (
              <div 
                key={apt.id} 
                className={`profile-sticker-card appointment-card click-allowed staff-apt-card status-${apt.status}`}
                onClick={() => setSelectedApt(apt)}
              >
                
                {/* Accent Bar */}
                <div className="appointment-card-accent-bar"></div>

                {/* Header Card: ID Code & Status Badge */}
                <div className="appointment-card-header">
                  <span className="appointment-card-code">{apt.id}</span>
                  <span className={`appointment-status-badge badge-${apt.status}`}>
                    {apt.status === 'confirmed' && t.statusConfirmed}
                    {apt.status === 'pending' && t.statusPending}
                    {apt.status === 'reschedule_pending' && t.statusReschedule}
                    {apt.status === 'rejected' && t.statusRejected}
                    {apt.status === 'completed' && t.statusCompleted}
                  </span>
                </div>

                {/* Primary Content: Child Name & Type */}
                <h3 className="appointment-card-title">{apt.childName}</h3>
                <div className="appointment-card-type-desc">{apt.type}</div>

                {/* Memphis Dashed separator */}
                <div className="card-dashed-line"></div>

                {/* Details list */}
                <div className="appointment-card-details">
                  <div className="detail-row">
                    <span className="detail-label">👥 {t.lblParent}:</span>
                    <span className="detail-value">{apt.parentName} ({apt.parentPhone})</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📅 {t.lblDate}:</span>
                    <span className={`detail-value ${hasProposedReschedule ? 'text-strikethrough text-muted' : 'text-bold'}`}>
                      {apt.date}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">⏰ {t.lblTime}:</span>
                    <span className={`detail-value ${hasProposedReschedule ? 'text-strikethrough text-muted' : 'text-bold'}`}>
                      {apt.time}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💻 {t.lblMethod}:</span>
                    <span className="detail-value">
                      <span className={`meeting-type-badge type-${apt.method}`}>
                        {apt.method === 'online' ? t.methodOnline : t.methodOffline}
                      </span>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📍 {t.lblLocation}:</span>
                    <span className="detail-value text-ellipsis">
                      {apt.method === 'online' ? apt.location : `${apt.room} - ${apt.location}`}
                    </span>
                  </div>
                </div>

                {/* Proposal Reschedule Banner (Chỉ hiển thị ở status reschedule_pending) */}
                {hasProposedReschedule && (
                  <div className="reschedule-proposal-box">
                    <div className="reschedule-proposal-header">
                      🗓️ {t.rescheduleProposalTitle}
                    </div>
                    <div className="reschedule-proposal-body">
                      <div>
                        <span className="proposal-label">{t.rescheduleFrom}</span>
                        <span className="proposal-val text-muted text-strikethrough">{apt.date} ({apt.time})</span>
                      </div>
                      <div className="proposal-target-slot">
                        <span className="proposal-label">{t.rescheduleTo}</span>
                        <span className="proposal-val text-neon-orange">{apt.rescheduleDate} ({apt.rescheduleTime})</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Action Candy Buttons at Card Level */}
                <div className="staff-card-actions-wrapper">
                  
                  {/* CASE 1: Lịch chưa duyệt (pending) */}
                  {apt.status === 'pending' && (
                    <div className="staff-inline-candy-buttons">
                      <button 
                        type="button"
                        className="staff-candy-btn approve-btn"
                        onClick={(e) => handleApprove(apt.id, e)}
                      >
                        {lang === 'vi' ? 'Duyệt ✅' : 'Approve ✅'}
                      </button>
                      <button 
                        type="button"
                        className="staff-candy-btn reject-btn"
                        onClick={(e) => handleReject(apt.id, e)}
                      >
                        {lang === 'vi' ? 'Từ chối ❌' : 'Reject ❌'}
                      </button>
                    </div>
                  )}

                  {/* CASE 2: Yêu cầu dời lịch (reschedule_pending) */}
                  {apt.status === 'reschedule_pending' && (
                    <div className="staff-inline-candy-buttons column-flow">
                      <button 
                        type="button"
                        className="staff-candy-btn approve-reschedule-btn"
                        onClick={(e) => handleApproveReschedule(apt.id, e)}
                      >
                        {t.btnApproveReschedule}
                      </button>
                      <button 
                        type="button"
                        className="staff-candy-btn reject-reschedule-btn"
                        onClick={(e) => handleRejectReschedule(apt.id, e)}
                      >
                        {lang === 'vi' ? 'Giữ lịch cũ ❌' : 'Keep Old ❌'}
                      </button>
                    </div>
                  )}

                  {/* CASE 3: Lịch đã xác nhận và là Online */}
                  {apt.status === 'confirmed' && apt.method === 'online' && (
                    <button 
                      type="button" 
                      className="staff-candy-btn meet-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open('https://meet.google.com', '_blank');
                      }}
                    >
                      {t.btnMeet}
                    </button>
                  )}

                  <button 
                    type="button" 
                    className="staff-view-detail-btn"
                  >
                    🔍 {t.btnDetail}
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Clinical Ticket Modal */}
      {selectedApt && (
        <div className="profile-modal-overlay clinical-ticket-overlay" onClick={() => setSelectedApt(null)}>
          <div 
            className="profile-admin-modal appointment-detail-modal-shell appointment-ticket-card horizontal-ticket-shell scale-bounce" 
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Lỗ khuyết vé (Ticket Punch Cutouts) */}
            <div className="ticket-punch-left"></div>
            <div className="ticket-punch-right"></div>

            {/* Modal Header */}
            <div className="appointment-ticket-header">
              <div className="ticket-header-left">
                <span className="ticket-brand-logo">AutiCare</span>
                <span className="ticket-brand-badge">CLINICAL PASS</span>
              </div>
              <button 
                type="button" 
                className="profile-modal-close-btn ticket-close-btn"
                onClick={() => setSelectedApt(null)}
              >
                ×
              </button>
            </div>

            {/* Ticket Content Layout: Horizontal (Bento details left + notes right) */}
            <div className="profile-modal-body appointment-modal-body-container appointment-ticket-body">
              <div className="ticket-horizontal-content-layout">
                
                {/* Cột trái: Bento Info */}
                <div className="ticket-bento-info-column">
                  
                  {/* Cuống vé (Doctor Stub) */}
                  <div className="ticket-doctor-stub-card">
                    <div className="stub-header">
                      <h4>{t.ticketStubTitle}</h4>
                      <span className="stub-sub-tag">{t.ticketStubSub}</span>
                    </div>
                    <div className="stub-body">
                      <p className="stub-text">
                        <strong>{t.ticketStubExpert}</strong>
                      </p>
                      <h5 className="stub-expert-name">{t.ticketStubExpertVal}</h5>
                      <div className="stub-footer">
                        <span className="stub-code-label">{t.ticketStubCode}:</span>
                        <span className="stub-code-val">{selectedApt.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bento Grid 2 Columns */}
                  <div className="appointment-modal-details-grid ticket-details-grid">
                    <div className="appointment-modal-info-item">
                      <span className="appointment-modal-info-label">🧬 {t.lblMethod}</span>
                      <span className="appointment-modal-info-value">
                        <span className={`appointment-meeting-type-badge ${selectedApt.method}`}>
                          {selectedApt.method === 'online' ? t.methodOnline : t.methodOffline}
                        </span>
                      </span>
                    </div>
                    <div className="appointment-modal-info-item">
                      <span className="appointment-modal-info-label">⏳ Status</span>
                      <span className="appointment-modal-info-value">
                        <span className={`appointment-status-badge badge-${selectedApt.status}`}>
                          {selectedApt.status === 'confirmed' && t.statusConfirmed}
                          {selectedApt.status === 'pending' && t.statusPending}
                          {selectedApt.status === 'reschedule_pending' && t.statusReschedule}
                          {selectedApt.status === 'rejected' && t.statusRejected}
                          {selectedApt.status === 'completed' && t.statusCompleted}
                        </span>
                      </span>
                    </div>
                    <div className="appointment-modal-info-item">
                      <span className="appointment-modal-info-label">📅 {t.lblDate}</span>
                      <span className="appointment-modal-info-value">{selectedApt.date}</span>
                    </div>
                    <div className="appointment-modal-info-item">
                      <span className="appointment-modal-info-label">⏰ {t.lblTime}</span>
                      <span className="appointment-modal-info-value">{selectedApt.time}</span>
                    </div>
                    <div className="appointment-modal-info-item span-two">
                      <span className="appointment-modal-info-label">👶 {t.lblChild}</span>
                      <span className="appointment-modal-info-value font-highlight">{selectedApt.childName}</span>
                    </div>
                    <div className="appointment-modal-info-item span-two">
                      <span className="appointment-modal-info-label">👥 {t.lblParent}</span>
                      <span className="appointment-modal-info-value">{selectedApt.parentName} ({selectedApt.parentPhone})</span>
                    </div>
                    <div className="appointment-modal-info-item span-two full-width-info-row">
                      <span className="appointment-modal-info-label">📍 {t.lblLocation}</span>
                      <span className="appointment-modal-info-value text-bold">
                        {selectedApt.method === 'online' ? selectedApt.location : `${selectedApt.room} - ${selectedApt.location}`}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Cột phải: Chỉ dẫn lâm sàng & Reschedule proposal */}
                <div className="ticket-clinical-notes-column">
                  
                  {/* Reschedule banner inside Ticket modal */}
                  {selectedApt.status === 'reschedule_pending' && selectedApt.rescheduleDate && selectedApt.rescheduleTime && (
                    <div className="reschedule-proposal-box in-modal">
                      <div className="reschedule-proposal-header">
                        🗓️ {t.rescheduleProposalTitle}
                      </div>
                      <div className="reschedule-proposal-body">
                        <div>
                          <span className="proposal-label">{t.rescheduleFrom}</span>
                          <span className="proposal-val text-muted text-strikethrough">{selectedApt.date} ({selectedApt.time})</span>
                        </div>
                        <div className="proposal-target-slot">
                          <span className="proposal-label">{t.rescheduleTo}</span>
                          <span className="proposal-val text-neon-orange">{selectedApt.rescheduleDate} ({selectedApt.rescheduleTime})</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Clinical Notes Box */}
                  <div className="appointment-modal-notes-box ticket-notes-box">
                    <div className="appointment-modal-notes-title">
                      📋 {t.ticketNotesTitle}
                    </div>
                    <div className="appointment-modal-notes-text">
                      <div className="notes-list-item">
                        <span className="notes-list-emoji">📂</span>
                        <div className="notes-list-content">
                          <strong>{t.ticketNotes1}</strong> {t.ticketNotes1Val}
                        </div>
                      </div>
                      <div className="notes-list-item">
                        <span className="notes-list-emoji">⏰</span>
                        <div className="notes-list-content">
                          <strong>{t.ticketNotes2}</strong> {t.ticketNotes2Val}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CSS Barcode */}
                  <div className="appointment-ticket-barcode-zone">
                    <div className="barcode-lines-container">
                      <span className="barcode-line-element thin"></span>
                      <span className="barcode-line-element thick"></span>
                      <span className="barcode-line-element medium"></span>
                      <span className="barcode-line-element thin"></span>
                      <span className="barcode-line-element thick"></span>
                      <span className="barcode-line-element medium"></span>
                      <span className="barcode-line-element thin"></span>
                      <span className="barcode-line-element thick"></span>
                      <span className="barcode-line-element thin"></span>
                      <span className="barcode-line-element medium"></span>
                    </div>
                    <span className="barcode-numbers-label">*{selectedApt.id}-AUTICARE*</span>
                  </div>

                </div>

              </div>
            </div>

            {/* Memphis Dashed Tear Separator */}
            <div className="ticket-dashed-tear-line"></div>

            {/* Modal Footer Actions */}
            <div className="profile-modal-footer appointment-modal-actions-footer ticket-actions-footer">
              
              {/* Logic buttons dynamic inside Modal */}
              <div className="modal-dynamic-actions-group">
                
                {/* CASE 1: pending */}
                {selectedApt.status === 'pending' && (
                  <>
                    <button 
                      type="button"
                      className="staff-modal-candy-btn approve-btn"
                      onClick={() => handleApprove(selectedApt.id)}
                    >
                      {t.btnApprove}
                    </button>
                    <button 
                      type="button"
                      className="staff-modal-candy-btn reject-btn"
                      onClick={() => handleReject(selectedApt.id)}
                    >
                      {t.btnReject}
                    </button>
                  </>
                )}

                {/* CASE 2: reschedule_pending */}
                {selectedApt.status === 'reschedule_pending' && (
                  <>
                    <button 
                      type="button"
                      className="staff-modal-candy-btn approve-reschedule-btn"
                      onClick={() => handleApproveReschedule(selectedApt.id)}
                    >
                      {t.btnApproveReschedule}
                    </button>
                    <button 
                      type="button"
                      className="staff-modal-candy-btn reject-reschedule-btn"
                      onClick={() => handleRejectReschedule(selectedApt.id)}
                    >
                      {t.btnRejectReschedule}
                    </button>
                  </>
                )}

                {/* CASE 3: confirmed + online */}
                {selectedApt.status === 'confirmed' && selectedApt.method === 'online' && (
                  <button 
                    type="button"
                    className="staff-modal-candy-btn meet-btn"
                    onClick={() => window.open('https://meet.google.com', '_blank')}
                  >
                    {t.btnMeet}
                  </button>
                )}

              </div>

              <button 
                type="button" 
                className="profile-sidebar-tab-btn appointment-modal-close-candy-btn ticket-close-candy"
                onClick={() => setSelectedApt(null)}
              >
                {t.btnClose}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default StaffAppointmentsTab;
