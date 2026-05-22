import React, { useState } from 'react';

export interface SupportTicket {
  support_ticket_id: number;
  requester_id: string;
  assignee_id?: string;
  subject: string;
  description: string;
  rating?: number;
  feedback?: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  created_at: string;
}

export interface SupportMessage {
  support_message_id: number;
  support_ticket_id: number;
  sender_id: string; // 'Parent' or 'Admin'
  message: string;
  created_at: string;
}

const MOCK_TICKETS: SupportTicket[] = [
  { support_ticket_id: 1, requester_id: 'Auticare Admin', subject: 'Không thể tải tài liệu về máy', description: 'Mình ấn vào nút tải tài liệu giáo án PECS nhưng web báo lỗi 404.', status: 'Open', created_at: '2026-05-23T08:00:00' },
  { support_ticket_id: 2, requester_id: 'Auticare Admin', assignee_id: 'S-001', subject: 'Xin đổi lịch khám', description: 'Ngày mai mình bận đột xuất nên muốn đổi lịch khám của bé sang ngày mốt.', status: 'Resolved', created_at: '2026-05-20T10:00:00' }
];

const MOCK_MESSAGES: SupportMessage[] = [
  { support_message_id: 1, support_ticket_id: 2, sender_id: 'Parent', message: 'Chào admin, ngày mai mình bận đột xuất nên muốn đổi lịch khám của bé sang ngày mốt được không?', created_at: '2026-05-20T10:00:00' },
  { support_message_id: 2, support_ticket_id: 2, sender_id: 'Admin', message: 'Chào bạn, trung tâm đã nhận được yêu cầu. Bạn có thể chọn ngày mốt vào lúc 14h hoặc 16h, bạn chọn giờ nào ạ?', created_at: '2026-05-20T10:15:00' },
  { support_message_id: 3, support_ticket_id: 2, sender_id: 'Parent', message: 'Mình chọn 14h nhé, cảm ơn trung tâm.', created_at: '2026-05-20T10:20:00' },
  { support_message_id: 4, support_ticket_id: 2, sender_id: 'Admin', message: 'Dạ trung tâm đã đổi lịch thành công cho bé vào 14h ngày mốt. Hẹn gặp bé và gia đình!', created_at: '2026-05-20T10:25:00' },
];

interface SupportTicketsTabProps {
  lang: 'vi' | 'en';
}

const SupportTicketsTab: React.FC<SupportTicketsTabProps> = ({ lang }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [messages, setMessages] = useState<SupportMessage[]>(MOCK_MESSAGES);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMsg, setReplyMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const t = {
    vi: {
      title: 'Quản lý Yêu cầu hỗ trợ',
      searchPlaceholder: 'Tìm theo ID hoặc Tên KH...',
      id: 'Mã Ticket',
      requester: 'Người gửi',
      subject: 'Chủ đề',
      status: 'Trạng thái',
      date: 'Ngày tạo',
      actions: 'Thao tác',
      viewDetails: 'Phản hồi',
      chatTitle: 'Chi tiết Yêu cầu',
      typeMsg: 'Nhập phản hồi của bạn...',
      reply: 'Gửi',
      markResolved: 'Đánh dấu đã giải quyết'
    },
    en: {
      title: 'Manage Support Tickets',
      searchPlaceholder: 'Search by ID or Requester...',
      id: 'Ticket ID',
      requester: 'Requester',
      subject: 'Subject',
      status: 'Status',
      date: 'Created Date',
      actions: 'Actions',
      viewDetails: 'Respond',
      chatTitle: 'Ticket Details',
      typeMsg: 'Type your response...',
      reply: 'Send',
      markResolved: 'Mark as Resolved'
    }
  }[lang];

  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.requester_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTicketMessages = (ticketId: number) => {
    return messages.filter(m => m.support_ticket_id === ticketId);
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMsg.trim() || !selectedTicket) return;
    
    const newMsg: SupportMessage = {
      support_message_id: messages.length + 1,
      support_ticket_id: selectedTicket.support_ticket_id,
      sender_id: 'Admin',
      message: replyMsg,
      created_at: new Date().toISOString()
    };
    
    // Auto change status to In Progress if it was Open
    if (selectedTicket.status === 'Open') {
      const updatedTickets = tickets.map(t => 
        t.support_ticket_id === selectedTicket.support_ticket_id ? { ...t, status: 'In Progress' as const } : t
      );
      setTickets(updatedTickets);
      setSelectedTicket({ ...selectedTicket, status: 'In Progress' });
    }

    setMessages([...messages, newMsg]);
    setReplyMsg('');
  };

  const handleResolve = () => {
    if (!selectedTicket) return;
    const updatedTickets = tickets.map(t => 
      t.support_ticket_id === selectedTicket.support_ticket_id ? { ...t, status: 'Resolved' as const } : t
    );
    setTickets(updatedTickets);
    setSelectedTicket(null);
  };

  return (
    <div className="dashboard-content-area">
      <div className="table-header" style={{ marginBottom: '1.5rem' }}>
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
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t.id}</th>
              <th>{t.requester}</th>
              <th>{t.subject}</th>
              <th>{t.status}</th>
              <th>{t.date}</th>
              <th style={{ textAlign: 'right' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.support_ticket_id}>
                <td className="font-mono text-sm">#{ticket.support_ticket_id}</td>
                <td style={{ fontWeight: 600 }}>{ticket.requester_id}</td>
                <td>{ticket.subject}</td>
                <td>
                  <span className="invoice-badge" style={{ 
                    backgroundColor: ticket.status === 'Open' ? '#FEF3C7' : (ticket.status === 'Resolved' ? '#DCFCE7' : '#DBEAFE'), 
                    color: ticket.status === 'Open' ? '#D97706' : (ticket.status === 'Resolved' ? '#16A34A' : '#2563EB') 
                  }}>
                    {ticket.status}
                  </span>
                </td>
                <td style={{ color: '#64748B' }}>{new Date(ticket.created_at).toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.85rem' }} onClick={() => setSelectedTicket(ticket)}>
                    {t.viewDetails}
                  </button>
                </td>
              </tr>
            ))}
            {filteredTickets.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Không tìm thấy yêu cầu nào.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className="modal-overlay">
          <div className="admin-modal animate-in" style={{ maxWidth: '700px', padding: 0, backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', height: '80vh' }}>
            
            {/* Header */}
            <div className="modal-header" style={{ padding: '1.5rem', backgroundColor: 'white', borderBottom: '1px solid #E2E8F0' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{t.chatTitle}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '0.25rem' }}>#{selectedTicket.support_ticket_id} - {selectedTicket.subject}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {selectedTicket.status !== 'Resolved' && (
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem', color: '#16A34A', borderColor: '#16A34A' }} onClick={handleResolve}>
                    ✓ {t.markResolved}
                  </button>
                )}
                <button className="close-modal" onClick={() => setSelectedTicket(null)} style={{ position: 'relative', top: 0, right: 0 }}>×</button>
              </div>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {getTicketMessages(selectedTicket.support_ticket_id).map(msg => (
                  <div key={msg.support_message_id} style={{ 
                    display: 'flex', 
                    justifyContent: msg.sender_id === 'Admin' ? 'flex-end' : 'flex-start' 
                  }}>
                    <div style={{ 
                      maxWidth: '70%', 
                      padding: '0.75rem 1rem', 
                      borderRadius: '16px', 
                      borderBottomRightRadius: msg.sender_id === 'Admin' ? '4px' : '16px',
                      borderBottomLeftRadius: msg.sender_id === 'Parent' ? '4px' : '16px',
                      backgroundColor: msg.sender_id === 'Admin' ? '#0084FF' : 'white',
                      color: msg.sender_id === 'Admin' ? 'white' : '#0F172A',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                      border: msg.sender_id === 'Parent' ? '1px solid #E2E8F0' : 'none'
                    }}>
                      <div style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{msg.message}</div>
                      <div style={{ fontSize: '0.7rem', color: msg.sender_id === 'Admin' ? 'rgba(255,255,255,0.7)' : '#94A3B8', marginTop: '0.25rem', textAlign: 'right' }}>
                        {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>
                ))}
                {getTicketMessages(selectedTicket.support_ticket_id).length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                    <p style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>{selectedTicket.description}</p>
                    <p>Khách hàng mới tạo yêu cầu, hãy phản hồi ngay!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Chat Input */}
            {selectedTicket.status !== 'Resolved' && (
              <div style={{ padding: '1rem 1.5rem', backgroundColor: 'white', borderTop: '1px solid #E2E8F0' }}>
                <form onSubmit={handleReply} style={{ display: 'flex', gap: '0.75rem' }}>
                  <input 
                    type="text" 
                    placeholder={t.typeMsg} 
                    value={replyMsg}
                    onChange={e => setReplyMsg(e.target.value)}
                    style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '24px', border: '1px solid #CBD5E1', backgroundColor: '#F1F5F9' }}
                  />
                  <button type="submit" className="btn-primary" style={{ borderRadius: '24px', padding: '0 1.5rem' }} disabled={!replyMsg.trim()}>
                    {t.reply}
                  </button>
                </form>
              </div>
            )}
            {selectedTicket.status === 'Resolved' && (
              <div style={{ padding: '1rem 1.5rem', backgroundColor: '#F1F5F9', borderTop: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                Yêu cầu này đã được giải quyết. Không thể phản hồi thêm.
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTicketsTab;
