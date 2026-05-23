import React, { useState } from 'react';

interface SupportTicketsTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Yêu cầu Hỗ trợ kỹ thuật",
    subtitle: "Gửi câu hỏi hoặc phản hồi sự cố kỹ thuật về buổi can thiệp, lịch hẹn hay bài tập của trẻ",
    ticketId: "Mã yêu cầu",
    date: "Ngày gửi",
    subject: "Tiêu đề",
    status: "Trạng thái",
    priority: "Độ ưu tiên",
    resolved: "Đã giải quyết",
    pending: "Đang xử lý",
    closed: "Đã đóng",
    priorityLow: "Thấp",
    priorityMedium: "Trung bình",
    priorityHigh: "Cao",
    createBtn: "✨ Tạo yêu cầu mới",
    noData: "Không có yêu cầu hỗ trợ nào.",
    createModalTitle: "📝 Tạo Yêu Cầu Hỗ Trợ Mới",
    subjectLabel: "Tiêu đề yêu cầu",
    priorityLabel: "Mức độ ưu tiên",
    descLabel: "Mô tả chi tiết sự cố",
    cancel: "Hủy bỏ",
    submit: "Gửi yêu cầu 🚀",
    successMsg: "✨ Gửi yêu cầu hỗ trợ thành công! Mã yêu cầu: ",
    subjectPlaceholder: "Ví dụ: Lỗi tải video bài tập can thiệp Dino...",
    descPlaceholder: "Vui lòng mô tả chi tiết vấn đề bạn đang gặp phải..."
  },
  en: {
    title: "Technical Support Tickets",
    subtitle: "Submit questions or report technical issues regarding sessions, appointments, or child exercises",
    ticketId: "Ticket ID",
    date: "Date Created",
    subject: "Subject",
    status: "Status",
    priority: "Priority",
    resolved: "Resolved",
    pending: "Pending",
    closed: "Closed",
    priorityLow: "Low",
    priorityMedium: "Medium",
    priorityHigh: "High",
    createBtn: "✨ Create New Ticket",
    noData: "No support tickets found.",
    createModalTitle: "📝 Create New Support Ticket",
    subjectLabel: "Ticket Subject",
    priorityLabel: "Priority Level",
    descLabel: "Detailed Description of the Issue",
    cancel: "Cancel",
    submit: "Submit Ticket 🚀",
    successMsg: "✨ Support ticket submitted successfully! Ticket ID: ",
    subjectPlaceholder: "e.g. Error loading Dino exercise video...",
    descPlaceholder: "Please describe the issue you are experiencing..."
  }
};

const INITIAL_TICKETS = [
  {
    id: "TK-2026-904",
    date: "2026-05-20",
    subjectVi: "Không phát được video hướng dẫn bài tập 'Bé học ghép tranh'",
    subjectEn: "Cannot play tutorial video for 'Puzzle matching' exercise",
    status: "pending",
    priority: "high"
  },
  {
    id: "TK-2026-902",
    date: "2026-05-10",
    subjectVi: "Đổi lịch can thiệp ABA ngày 12/05 sang 14/05 do trẻ bị sốt nhẹ",
    subjectEn: "Reschedule ABA session on May 12th to 14th due to child's fever",
    status: "resolved",
    priority: "medium"
  },
  {
    id: "TK-2026-880",
    date: "2026-04-28",
    subjectVi: "Không nhận được hóa đơn điện tử cho gói can thiệp tháng 4",
    subjectEn: "Did not receive e-invoice for April intervention package",
    status: "closed",
    priority: "low"
  }
];

const SupportTicketsTab: React.FC<SupportTicketsTabProps> = ({ lang }) => {
  const t = translations[lang];

  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("medium");
  const [desc, setDesc] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `TK-2026-${Math.floor(100 + Math.random() * 900)}`;
    const today = new Date().toISOString().split('T')[0];
    
    const newTicket = {
      id: newId,
      date: today,
      subjectVi: subject,
      subjectEn: subject,
      status: "pending",
      priority: priority
    };

    setTickets([newTicket, ...tickets]);
    setIsModalOpen(false);

    // Reset Form
    setSubject("");
    setPriority("medium");
    setDesc("");

    // Show Toast
    setToastMessage(t.successMsg + newId);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const getPriorityBadgeClass = (prio: string) => {
    switch (prio) {
      case 'high': return 'prio-high';
      case 'medium': return 'prio-medium';
      default: return 'prio-low';
    }
  };

  const getPriorityLabel = (prio: string) => {
    switch (prio) {
      case 'high': return t.priorityHigh;
      case 'medium': return t.priorityMedium;
      default: return t.priorityLow;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'resolved': return t.resolved;
      case 'closed': return t.closed;
      default: return t.pending;
    }
  };

  return (
    <div className="profile-tab-content">
      {toastMessage && (
        <div className="profile-toast animate-toast">
          {toastMessage}
        </div>
      )}

      <div className="tab-section-header support-header-flex">
        <div>
          <h2 className="tab-section-title">💬 {t.title}</h2>
          <p className="tab-section-subtitle">{t.subtitle}</p>
        </div>
        <button 
          type="button" 
          className="profile-page-btn-primary support-create-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          {t.createBtn}
        </button>
      </div>

      {/* Ticket List */}
      <div className="ticket-sticker-list">
        {tickets.map((ticket, idx) => (
          <div 
            key={ticket.id} 
            className="profile-sticker-card ticket-card"
            style={{ 
              animationDelay: `${idx * 80}ms`,
              transform: `rotate(${(idx % 2 === 0 ? 0.2 : -0.2)}deg)` 
            }}
          >
            <div className="ticket-card-header">
              <span className="ticket-card-code">{ticket.id}</span>
              <div className="ticket-card-badges">
                <span className={`ticket-badge priority-badge ${getPriorityBadgeClass(ticket.priority)}`}>
                  ⚡ {t.priority}: {getPriorityLabel(ticket.priority)}
                </span>
                <span className={`ticket-badge status-badge status-${ticket.status}`}>
                  {getStatusLabel(ticket.status)}
                </span>
              </div>
            </div>
            
            <div className="ticket-card-body">
              <h4 className="ticket-card-subject">
                {lang === 'vi' ? ticket.subjectVi : ticket.subjectEn}
              </h4>
              
              <div className="ticket-card-date">
                📅 {t.date}: {ticket.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Support Ticket Modal */}
      {isModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header ticket-modal-header">
              <h3 className="profile-modal-title">{t.createModalTitle}</h3>
              <button 
                type="button" 
                className="profile-modal-close-btn" 
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTicket}>
              <div className="profile-modal-body">
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.subjectLabel}</label>
                  <input
                    type="text"
                    className="profile-page-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder={t.subjectPlaceholder}
                    spellCheck="false"
                  />
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.priorityLabel}</label>
                  <select
                    className="profile-page-input filter-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{ background: '#F8FAFC' }}
                  >
                    <option value="low">{t.priorityLow}</option>
                    <option value="medium">{t.priorityMedium}</option>
                    <option value="high">{t.priorityHigh}</option>
                  </select>
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.descLabel}</label>
                  <textarea
                    className="profile-page-input profile-page-textarea"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    placeholder={t.descPlaceholder}
                    spellCheck="false"
                    rows={4}
                  />
                </div>
              </div>
              <div className="profile-modal-footer">
                <button
                  type="button"
                  className="profile-page-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t.cancel}
                </button>
                <button type="submit" className="profile-page-btn-primary">
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTicketsTab;
