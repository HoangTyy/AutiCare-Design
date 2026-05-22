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

export const MOCK_TICKETS: SupportTicket[] = [
  { support_ticket_id: 1, requester_id: 'Auticare Admin', subject: 'Không thể tải tài liệu về máy', description: 'Mình ấn vào nút tải tài liệu giáo án PECS nhưng web báo lỗi 404.', status: 'Open', created_at: '2026-05-23T08:00:00' },
  { support_ticket_id: 2, requester_id: 'Auticare Admin', assignee_id: 'S-001', subject: 'Xin đổi lịch khám', description: 'Ngày mai mình bận đột xuất nên muốn đổi lịch khám của bé sang ngày mốt.', status: 'Resolved', created_at: '2026-05-20T10:00:00' }
];

export const MOCK_MESSAGES: SupportMessage[] = [
  { support_message_id: 1, support_ticket_id: 2, sender_id: 'Parent', message: 'Chào admin, ngày mai mình bận đột xuất nên muốn đổi lịch khám của bé sang ngày mốt được không?', created_at: '2026-05-20T10:00:00' },
  { support_message_id: 2, support_ticket_id: 2, sender_id: 'Admin', message: 'Chào bạn, trung tâm đã nhận được yêu cầu. Bạn có thể chọn ngày mốt vào lúc 14h hoặc 16h, bạn chọn giờ nào ạ?', created_at: '2026-05-20T10:15:00' },
  { support_message_id: 3, support_ticket_id: 2, sender_id: 'Parent', message: 'Mình chọn 14h nhé, cảm ơn trung tâm.', created_at: '2026-05-20T10:20:00' },
  { support_message_id: 4, support_ticket_id: 2, sender_id: 'Admin', message: 'Dạ trung tâm đã đổi lịch thành công cho bé vào 14h ngày mốt. Hẹn gặp bé và gia đình!', created_at: '2026-05-20T10:25:00' },
];

interface ParentSupportTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
}

const ParentSupportTicketsModal: React.FC<ParentSupportTicketsModalProps> = ({ isOpen, onClose, lang }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [messages, setMessages] = useState<SupportMessage[]>(MOCK_MESSAGES);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [replyMsg, setReplyMsg] = useState('');

  if (!isOpen) return null;

  const t = {
    vi: {
      title: 'Yêu cầu Hỗ trợ',
      newTicket: 'Gửi Yêu cầu mới',
      subject: 'Chủ đề',
      status: 'Trạng thái',
      date: 'Ngày gửi',
      createTicket: 'Tạo Yêu cầu hỗ trợ',
      desc: 'Mô tả chi tiết',
      send: 'Gửi yêu cầu',
      cancel: 'Hủy',
      chatTitle: 'Chi tiết Yêu cầu',
      typeMsg: 'Nhập tin nhắn...',
      reply: 'Gửi'
    },
    en: {
      title: 'Support Tickets',
      newTicket: 'Submit New Ticket',
      subject: 'Subject',
      status: 'Status',
      date: 'Date',
      createTicket: 'Create Support Ticket',
      desc: 'Description',
      send: 'Send Request',
      cancel: 'Cancel',
      chatTitle: 'Ticket Details',
      typeMsg: 'Type a message...',
      reply: 'Send'
    }
  }[lang];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: SupportTicket = {
      support_ticket_id: tickets.length + 1,
      requester_id: 'Auticare Admin',
      subject: newSubject,
      description: newDesc,
      status: 'Open',
      created_at: new Date().toISOString()
    };
    
    const initialMsg: SupportMessage = {
      support_message_id: messages.length + 1,
      support_ticket_id: newTicket.support_ticket_id,
      sender_id: 'Parent',
      message: newDesc,
      created_at: newTicket.created_at
    };

    setTickets([newTicket, ...tickets]);
    setMessages([...messages, initialMsg]);
    setIsCreating(false);
    setNewSubject('');
    setNewDesc('');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMsg.trim() || !selectedTicket) return;
    
    const newMsg: SupportMessage = {
      support_message_id: messages.length + 1,
      support_ticket_id: selectedTicket.support_ticket_id,
      sender_id: 'Parent',
      message: replyMsg,
      created_at: new Date().toISOString()
    };
    setMessages([...messages, newMsg]);
    setReplyMsg('');
  };

  const getTicketMessages = (ticketId: number) => {
    return messages.filter(m => m.support_ticket_id === ticketId);
  };

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in" style={{ maxWidth: selectedTicket ? '700px' : '900px', padding: 0, backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', height: '80vh' }}>
        
        {/* Header */}
        <div className="modal-header" style={{ padding: '1.5rem', backgroundColor: 'white', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {selectedTicket ? t.chatTitle : (isCreating ? t.createTicket : t.title)}
            </h3>
            {selectedTicket && <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '0.25rem' }}>#{selectedTicket.support_ticket_id} - {selectedTicket.subject}</p>}
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {!selectedTicket && !isCreating && (
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setIsCreating(true)}>
                + {t.newTicket}
              </button>
            )}
            {selectedTicket && (
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => setSelectedTicket(null)}>
                ← Quay lại
              </button>
            )}
            <button className="close-modal" onClick={onClose} style={{ position: 'relative', top: 0, right: 0 }}>×</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {isCreating ? (
            <form onSubmit={handleCreate} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>{t.subject}</label>
                <input type="text" required value={newSubject} onChange={e => setNewSubject(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>{t.desc}</label>
                <textarea required rows={5} value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsCreating(false)}>{t.cancel}</button>
                <button type="submit" className="btn-primary">{t.send}</button>
              </div>
            </form>
          ) : selectedTicket ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {getTicketMessages(selectedTicket.support_ticket_id).map(msg => (
                <div key={msg.support_message_id} style={{ 
                  display: 'flex', 
                  justifyContent: msg.sender_id === 'Parent' ? 'flex-end' : 'flex-start' 
                }}>
                  <div style={{ 
                    maxWidth: '70%', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '16px', 
                    borderBottomRightRadius: msg.sender_id === 'Parent' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.sender_id === 'Admin' ? '4px' : '16px',
                    backgroundColor: msg.sender_id === 'Parent' ? '#0084FF' : 'white',
                    color: msg.sender_id === 'Parent' ? 'white' : '#0F172A',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    border: msg.sender_id === 'Admin' ? '1px solid #E2E8F0' : 'none'
                  }}>
                    <div style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{msg.message}</div>
                    <div style={{ fontSize: '0.7rem', color: msg.sender_id === 'Parent' ? 'rgba(255,255,255,0.7)' : '#94A3B8', marginTop: '0.25rem', textAlign: 'right' }}>
                      {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="data-table-wrapper" style={{ margin: 0, backgroundColor: 'white' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t.subject}</th>
                    <th>{t.status}</th>
                    <th>{t.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket => (
                    <tr key={ticket.support_ticket_id} onClick={() => setSelectedTicket(ticket)} style={{ cursor: 'pointer' }} className="hover-row">
                      <td style={{ fontWeight: 600 }}>{ticket.subject}</td>
                      <td>
                        <span className={`invoice-badge ${ticket.status === 'Open' ? 'pending' : (ticket.status === 'Resolved' ? 'paid' : '')}`} style={{ backgroundColor: ticket.status === 'Open' ? '#FEF3C7' : '#DCFCE7', color: ticket.status === 'Open' ? '#D97706' : '#16A34A' }}>
                          {ticket.status}
                        </span>
                      </td>
                      <td style={{ color: '#64748B' }}>{new Date(ticket.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {tickets.length === 0 && (
                    <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>Chưa có yêu cầu hỗ trợ nào.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Chat Input */}
        {selectedTicket && (
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

      </div>
    </div>
  );
};

export default ParentSupportTicketsModal;
