import React, { useState } from 'react';

export interface PlanFeedback {
  plan_feedback_id: number;
  staff_id: string;
  parent_id: string;
  plan_id: number;
  rating: number;
  feedback_text: string;
  status: 'Published' | 'Hidden';
  is_deleted: boolean;
  created_at: string;
}

const MOCK_FEEDBACKS: PlanFeedback[] = [
  { plan_feedback_id: 1, staff_id: 'S-001 (Hoàng Minh)', parent_id: 'P-001 (Nguyễn Văn A)', plan_id: 101, rating: 5, feedback_text: 'Bác sĩ Minh rất kiên nhẫn. Sau 3 tháng đồng hành theo lộ trình của bác, bé Bin nhà mình đã bắt đầu mở lời và tương tác chủ động nhiều hơn. Cảm ơn bác sĩ nhiều lắm!', status: 'Published', is_deleted: false, created_at: '2026-05-15T09:00:00' },
  { plan_feedback_id: 2, staff_id: 'S-002 (Trần Đức)', parent_id: 'P-002 (Lê Thị B)', plan_id: 102, rating: 2, feedback_text: 'Bài tập hơi khó, bé nhà mình khóc nhiều quá. Không hài lòng lắm vì bác sĩ bắt ép bé!', status: 'Hidden', is_deleted: false, created_at: '2026-05-16T14:30:00' },
  { plan_feedback_id: 3, staff_id: 'S-001 (Hoàng Minh)', parent_id: 'P-003 (Phạm C)', plan_id: 103, rating: 4, feedback_text: 'Phương pháp chơi trị liệu thực sự hiệu quả. Cần trung tâm gửi thêm tài liệu hướng dẫn về nhà.', status: 'Published', is_deleted: false, created_at: '2026-05-20T10:15:00' }
];

interface PlanFeedbacksTabProps {
  lang: 'vi' | 'en';
}

const PlanFeedbacksTab: React.FC<PlanFeedbacksTabProps> = ({ lang }) => {
  const [feedbacks, setFeedbacks] = useState<PlanFeedback[]>(MOCK_FEEDBACKS);
  const [searchTerm, setSearchTerm] = useState('');

  const t = {
    vi: {
      title: 'Đánh giá Kế hoạch (Feedbacks)',
      searchPlaceholder: 'Tìm theo tên Phụ huynh hoặc Bác sĩ...',
      id: 'Mã FB',
      parent: 'Phụ huynh',
      staff: 'Chuyên gia phụ trách',
      rating: 'Đánh giá',
      content: 'Nội dung Feedback',
      status: 'Trạng thái',
      actions: 'Thao tác',
      hide: 'Ẩn',
      publish: 'Công khai',
      delete: 'Gỡ bỏ (Delete)',
      deletedMsg: 'Đã xóa'
    },
    en: {
      title: 'Plan Feedbacks',
      searchPlaceholder: 'Search by Parent or Staff...',
      id: 'FB ID',
      parent: 'Parent',
      staff: 'Assigned Staff',
      rating: 'Rating',
      content: 'Feedback Content',
      status: 'Status',
      actions: 'Actions',
      hide: 'Hide',
      publish: 'Publish',
      delete: 'Remove',
      deletedMsg: 'Deleted'
    }
  }[lang];

  const filteredFeedbacks = feedbacks.filter(f => 
    !f.is_deleted && (
      f.parent_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.feedback_text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleStatus = (id: number) => {
    setFeedbacks(feedbacks.map(f => {
      if (f.plan_feedback_id === id) {
        return { ...f, status: f.status === 'Published' ? 'Hidden' : 'Published' as const };
      }
      return f;
    }));
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn gỡ bỏ đánh giá này?')) {
      setFeedbacks(feedbacks.map(f => f.plan_feedback_id === id ? { ...f, is_deleted: true } : f));
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: i < rating ? '#F59E0B' : '#E2E8F0', fontSize: '1.2rem' }}>★</span>
    ));
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
              <th style={{ width: '80px' }}>{t.id}</th>
              <th style={{ width: '150px' }}>{t.parent}</th>
              <th style={{ width: '150px' }}>{t.staff}</th>
              <th style={{ width: '120px' }}>{t.rating}</th>
              <th style={{ width: '300px' }}>{t.content}</th>
              <th style={{ width: '100px' }}>{t.status}</th>
              <th style={{ textAlign: 'right', width: '150px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map(fb => (
              <tr key={fb.plan_feedback_id}>
                <td className="font-mono text-sm">#{fb.plan_feedback_id}</td>
                <td style={{ fontWeight: 600 }}>{fb.parent_id}</td>
                <td style={{ color: '#64748B' }}>{fb.staff_id}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{renderStars(fb.rating)}</td>
                <td>
                  <p style={{ 
                    margin: 0, 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    color: fb.status === 'Hidden' ? '#94A3B8' : '#334155',
                    fontStyle: fb.status === 'Hidden' ? 'italic' : 'normal'
                  }}>
                    "{fb.feedback_text}"
                  </p>
                </td>
                <td>
                  <span className="invoice-badge" style={{ 
                    backgroundColor: fb.status === 'Published' ? '#DCFCE7' : '#F1F5F9', 
                    color: fb.status === 'Published' ? '#16A34A' : '#64748B' 
                  }}>
                    {fb.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '4px 10px', fontSize: '0.8rem', marginRight: '0.5rem' }} 
                    onClick={() => toggleStatus(fb.plan_feedback_id)}
                  >
                    {fb.status === 'Published' ? `👁️ ${t.hide}` : `📢 ${t.publish}`}
                  </button>
                  <button 
                    className="delete-btn-v2" 
                    title={t.delete}
                    onClick={() => handleDelete(fb.plan_feedback_id)}
                    style={{ padding: '6px' }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                  </button>
                </td>
              </tr>
            ))}
            {filteredFeedbacks.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>Không có phản hồi nào.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanFeedbacksTab;
