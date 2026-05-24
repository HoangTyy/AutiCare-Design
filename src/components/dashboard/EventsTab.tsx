import React, { useEffect, useState } from 'react';
const Calendar = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
  </svg>
);

const MapPin = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Video = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
    <rect width="14" height="12" x="2" y="6" rx="2" />
  </svg>
);

const Users = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Search = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const Plus = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5v14" />
  </svg>
);

const Clock = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Globe = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const UserCheck = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const ExternalLink = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);


export interface EventStaff {
  event_staff_id: number;
  staff_id: string;
  staff_name: string;
  is_host: boolean;
  assigned_at: string;
}

export interface EventChild {
  event_child_id: number;
  child_id: number;
  child_name: string;
  joined_at: string;
}

export interface EventItem {
  event_id: number;
  child_id: number | null; // Primary child targeted
  title: string;
  description: string;
  time: string;           // E.g. "2026-05-25 09:00 - 10:30"
  location_type: 'Online' | 'Onsite' | 'Hybrid';
  room_name: string | null;
  url: string | null;
  status: 'Active' | 'Cancelled' | 'Completed' | 'Pending';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  // Relations
  staff: EventStaff[];
  children: EventChild[];
}

interface EventTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Quản lý Sự kiện & Lịch hoạt động",
    searchPlaceholder: "Tìm kiếm tiêu dề, Mô tả...",
    addNew: "Tạo sự kiện mới",
    id: "Mã SK",
    name: "Tên sự kiện / Hoạt động",
    time: "Thời gian diễn ra",
    locationType: "Hình thức",
    roomName: "Phòng họp (Physical)",
    url: "Link trực tuyến (URL)",
    status: "Trạng thái",
    actions: "Thao tác",
    noResults: "Không tìm thấy sự kiện phù hợp",
    createTitle: "Thiết lập kế hoạch sự kiện mới",
    deleteTitle: "Hủy / Ẩn lịch sự kiện",
    deleteConfirm: "Bạn có thực sự muốn hủy bỏ sự kiện",
    deleteSub: "Trạng thái sự kiện này sẽ được cập nhật thành đã hủy và lưu trữ tạm thời.",
    cancel: "Bỏ qua",
    save: "Xuất bản Sự kiện",
    confirmDelete: "Xác nhận hủy",
    formId: "Mã sự kiện",
    formTitle: "Tên sự kiện",
    formDescription: "Mô tả",
    formTime: "Thời gian / Lịch diễn ra",
    formType: "Hình thức tổ chức",
    formRoom: "Địa điểm",
    formUrl: "Đường dẫn tham gia",
    formChild: "Học viên liên kết chính",
    formStaff: "Nhân sự & Giáo viên phụ trách",
    formChildren: "Nhóm trẻ / Học viên đăng ký tham gia",
    viewTitle: "Chi tiết sự kiện",
    close: "Đóng lại",

    // Statuses
    active: "Đang mở",
    cancelled: "Đã hủy",
    completed: "Hoàn thành",
    pending: "Chờ duyệt",
    inactive: "Đã ẩn",

    // Location Types
    online: "Trực tuyến (Online)",
    physical: "Trực tiếp (Classroom)",
    hybrid: "Lớp học kết hợp (Hybrid)",

    staffAssigned: "Phụ trách",
    childrenJoined: "Nhóm học viên / Trẻ đã đăng ký",
    assignedHost: "Người phụ trách chính / Host",
    emptyStaff: "Chưa chọn nhân sự nào đứng lớp",
    emptyChildren: "Chưa có học viên nào tham dự",
    selectAll: "Chọn tất cả",
    isHostLabel: "Là người chủ trì"
  },
  en: {
    title: "Manage Events",
    searchPlaceholder: "Search title, description...",
    addNew: "Create Event",
    id: "ID",
    name: "Title",
    time: "Scheduled Time",
    locationType: "Format",
    roomName: "Onsite",
    url: "Meeting Link",
    status: "Status",
    actions: "Actions",
    noResults: "No matching events found",
    createTitle: "Establish New Event Schedule",
    deleteTitle: "Cancel / Hide Event Schedule",
    deleteConfirm: "Are you sure you want to cancel the event",
    deleteSub: "This will switch the status indicator to Cancelled and update records.",
    cancel: "Cancel",
    save: "Publish Event",
    confirmDelete: "Confirm Cancel",
    formId: "Event Identifier (ID)",
    formTitle: "Event Name",
    formDescription: "Description",
    formTime: "Date & Time Duration",
    formType: "Location Type",
    formRoom: "Location",
    formUrl: "Meeting URL",
    formChild: "Primary Connected Student",
    formStaff: "Staff & Teachers",
    formChildren: "Students / Children Registry",
    viewTitle: "Event details",
    close: "Close",

    // Statuses
    active: "Active",
    cancelled: "Cancelled",
    completed: "Completed",
    pending: "Pending",
    inactive: "Hidden",

    // Location Types
    online: "Online",
    physical: "Onsite",
    hybrid: "Hybrid",

    staffAssigned: "Assigned Staffs",
    childrenJoined: "Registered Children",
    assignedHost: "Primary Host",
    emptyStaff: "No staff assigned under instruction",
    emptyChildren: "No registered children recorded yet",
    selectAll: "Select All",
    isHostLabel: "Promote to Main Host"
  }
};

// Mock registries based on structural requirements
const mockChildren = [
  { id: 101, name: "Suzy Nguyen", age: "5 tuổi", code: "STUDENT-A" },
  { id: 102, name: "Bobby Tran", age: "4 tuổi", code: "STUDENT-B" },
  { id: 103, name: "Alex Le", age: "6 tuổi", code: "STUDENT-C" },
  { id: 104, name: "Daniel Pham", age: "5 tuổi", code: "STUDENT-D" },
];

const mockStaff = [
  { id: 'st_001', name: "Alice", role: "Giáo viên chủ nhiệm" },
  { id: 'st_002', name: "Bob", role: "Giảng viên thỉnh giảng" },
  { id: 'st_003', name: "Claire", role: "Điều phối viên" },
  { id: 'st_004', name: "Donald", role: "Huấn luyện viên chính" },
];

const modalTextStyle: React.CSSProperties = {
  color: '#1e293b',
};

// --- EVENTS MODAL CREATE COMPONENT ---
interface CreateEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (data: Partial<EventItem>) => void;
  t: any;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, closeModal, handleSave, t }) => {
  const [locationType, setLocationType] = useState<'Online' | 'Onsite' | 'Hybrid'>('Onsite');

  // Advanced hooks for sub-entity checkboxes inside the create flow as guided by DRAW schemas!
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [hostStaffId, setHostStaffId] = useState<string>('');
  const [selectedChildIds, setSelectedChildIds] = useState<number[]>([]);

  if (!isOpen) return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Build child participants structures
    const childrenRelation: EventChild[] = selectedChildIds.map((cId, idx) => {
      const kidObj = mockChildren.find(c => c.id === cId);
      return {
        event_child_id: Math.floor(Math.random() * 10000),
        child_id: cId,
        child_name: kidObj ? kidObj.name : `Child ${cId}`,
        joined_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
    });

    // Build staff participants structures with host evaluation
    const staffRelation: EventStaff[] = selectedStaffIds.map((sId, idx) => {
      const instObj = mockStaff.find(s => s.id === sId);
      return {
        event_staff_id: Math.floor(Math.random() * 10000),
        staff_id: sId,
        staff_name: instObj ? instObj.name : `Staff ${sId}`,
        is_host: sId === hostStaffId,
        assigned_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
    });

    // Read values securely
    const customTime = (formData.get('event_date') as string) + ' ' + (formData.get('event_time_range') as string || '09:00 - 10:30');

    handleSave({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      time: customTime,
      location_type: locationType,
      room_name: locationType !== 'Online' ? (formData.get('room_name') as string) : null,
      url: locationType !== 'Onsite' ? (formData.get('url') as string) : null,
      status: 'Active',
      staff: staffRelation,
      children: childrenRelation,
      child_id: selectedChildIds.length > 0 ? selectedChildIds[0] : null // initial primary FK index
    });
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="admin-modal animate-in flex flex-col max-h-[90vh]"
        style={{ ...modalTextStyle, maxWidth: '650px', width: '90%' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar className="text-emerald-600" size={24} />
            <h3 style={{ color: '#091d11', fontWeight: 700 }} className="text-lg">{t.createTitle}</h3>
          </div>
          <button className="close-modal text-slate-800 hover:text-black transition-colors" onClick={closeModal}>×</button>
        </div>
        <div className="modal-body overflow-y-auto">
          <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1">
            <div className="modal-body max-h-[70vh] overflow-y-auto pr-2">
              <div className="modal-form flex flex-col gap-4">

                {/* Event Title */}
                <div className="form-group">
                  <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formTitle} *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder={t.lang === 'vi' ? 'Ví dụ: Đại hội thể thao hè, Lớp trải nghiệm vẽ' : 'E.g., Music Gala, Science Adventure'}
                    spellCheck="false"
                    style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                {/* Event Schedule info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label style={{ color: '#1e293b', fontWeight: 600 }}>Ngày tổ chức *</label>
                    <input
                      type="date"
                      name="event_date"
                      required
                      defaultValue="2026-05-25"
                      style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formTime} (Range) *</label>
                    <input
                      type="text"
                      name="event_time_range"
                      required
                      placeholder="09:00 - 11:30"
                      defaultValue="09:00 - 11:30"
                      style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formDescription}</label>
                  <textarea
                    name="description"
                    required
                    spellCheck="false"
                    rows={3}
                    placeholder={t.lang === 'vi' ? 'Mô tả mục đích hoạt động, yêu cầu giáo viên đứng lớp...' : 'Activity goals, teacher requirements, items to bring...'}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', color: '#1e293b' }}
                  />
                </div>

                <div className="form-group bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <label style={{ color: '#1e293b', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>{t.formType}</label>
                  <div className="action-btns" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    {[
                      { key: 'Onsite', label: t.physical, icon: MapPin },
                      { key: 'Online', label: t.online, icon: Video },
                      { key: 'Hybrid', label: t.hybrid, icon: Globe }
                    ].map((item) => {
                      const IconComp = item.icon;
                      const active = locationType === item.key;

                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setLocationType(item.key as any)}
                          className={`view-btn-v2 cursor-pointer transition-all duration-200 ${active
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 shadow-sm hover:shadow'
                            }`}
                          // Ghi đè CSS cũ: Đảm bảo nút tự co giãn theo chữ, căn giữa icon và chữ bằng Flexbox
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            borderRadius: '6px',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            width: 'auto',          // Hủy bỏ mọi width cố định gây tràn chữ
                            minWidth: 'max-content' // Ép viền phải bao trọn toàn bộ chữ bên trong
                          }}
                        >
                          {IconComp && (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15px', height: '15px', flexShrink: 0 }}>
                              <IconComp size={15} />
                            </span>
                          )}

                          {/* Xử lý Chữ: Không cho phép rớt dòng bừa bãi */}
                          <span style={{ whiteSpace: 'nowrap', lineHeight: 1 }}>
                            {item.label.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Conditional Location details inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locationType !== 'Online' && (
                    <div className="form-group animate-slide-in">
                      <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formRoom} *</label>
                      <input
                        type="text"
                        name="room_name"
                        required
                        defaultValue="Phòng A101"
                        placeholder="e.g. Room G203"
                        style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  )}

                  {locationType !== 'Onsite' && (
                    <div className="form-group animate-slide-in">
                      <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formUrl} *</label>
                      <input
                        type="url"
                        name="url"
                        required
                        defaultValue="https://meet.google.com/abc-xyz-123"
                        placeholder="https://meet.google.com/..."
                        style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  )}
                </div>

                {/* Staff Selection List */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1e293b' }}>
                    {t.formStaff}
                  </label>

                  {/* Khung bọc danh sách nhân viên */}
                  <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    maxHeight: '180px',
                    overflowY: 'auto',
                    padding: '6px',
                    backgroundColor: '#f8fafc'
                  }}>
                    {mockStaff.map(s => {
                      const isChecked = selectedStaffIds.includes(s.id);
                      const isHost = hostStaffId === s.id;

                      return (
                        <div
                          key={s.id}
                          // Sử dụng lại class cũ của bạn để nhận hiệu ứng hover nếu có sẵn trong file CSS
                          className="hover:bg-white"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'between',
                            padding: '10px',
                            marginBottom: '4px',
                            borderRadius: '6px',
                            backgroundColor: isChecked ? '#ffffff' : 'transparent',
                            border: isChecked ? '1px solid #cbd5e1' : '1px solid transparent',
                            boxShadow: isChecked ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {/* Vùng chọn Checkbox + Tên */}
                          <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            flex: 1,
                            color: '#334155',
                            userSelect: 'none'
                          }}>
                            <input
                              type="checkbox"
                              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                              checked={isChecked}
                              onChange={() => {
                                setSelectedStaffIds(prev =>
                                  prev.includes(s.id) ? prev.filter(i => i !== s.id) : [...prev, s.id]
                                );
                                if (!hostStaffId) setHostStaffId(s.id);
                              }}
                            />
                            <span>{s.name}</span>
                          </label>

                          {/* Vùng nút bấm Host */}
                          {isChecked && (
                            <button
                              type="button"
                              onClick={() => setHostStaffId(s.id)}
                              // Thêm class view-btn-v2 của bạn vào đây nếu cần đồng bộ style
                              className="view-btn-v2"
                              style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '4px 10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                minWidth: '65px',
                                textAlign: 'center',
                                transition: 'all 0.15s ease',
                                // Đổi màu linh hoạt bằng toán tử ba ngôi (Ternary) dựa trên trạng thái active
                                backgroundColor: isHost ? '#ecfdf5' : '#ffffff',
                                border: isHost ? '1px solid #10b981' : '1px solid #cbd5e1',
                                color: isHost ? '#047857' : '#64748b'
                              }}
                              // Thêm hiệu ứng hover thủ công cho nút bấm chưa Set Host
                              onMouseEnter={(e) => {
                                if (!isHost) {
                                  e.currentTarget.style.borderColor = '#94a3b8';
                                  e.currentTarget.style.color = '#334155';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isHost) {
                                  e.currentTarget.style.borderColor = '#cbd5e1';
                                  e.currentTarget.style.color = '#64748b';
                                }
                              }}
                            >
                              {isHost ? '✕ Host' : 'Set Host'}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer mt-4">
              <button type="button" className="btn-secondary" onClick={closeModal}>{t.cancel}</button>
              <button type="submit" className="btn-primary" style={{ backgroundColor: '#059669', borderColor: '#059669' }}>
                {t.save}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


// --- EVENTS DELETE CONFIRMATION MODAL ---
interface DeleteEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleDelete: () => void;
  selectedObj: EventItem | null;
  t: any;
}

export const DeleteEventModal: React.FC<DeleteEventModalProps> = ({ isOpen, closeModal, handleDelete, selectedObj, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in" style={modalTextStyle}>
        <div className="modal-header">
          <h3 style={{ color: '#991b1b' }} className="font-bold">{t.deleteTitle}</h3>
          <button className="close-modal text-slate-800" onClick={closeModal}>×</button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
          <div className="modal-body">
            <div className="delete-confirm">
              <div className="warning-icon text-red-600">⚠️</div>
              <p style={{ color: '#1e293b', fontWeight: 500 }} className="text-base my-2">
                {t.deleteConfirm} "{selectedObj?.title}"?
              </p>
              <p className="sub-text text-sm" style={{ color: '#64748b' }}>{t.deleteSub}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeModal}>{t.cancel}</button>
            <button type="submit" className="btn-primary bg-red-600 hover:bg-red-700 border-red-600 text-white">
              {t.confirmDelete}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- EVENTS MODAL UPDATE COMPONENT ---
interface UpdateEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleUpdate: (data: Partial<EventItem>) => void;
  selectedObj: EventItem | null;
  t: any;
}

export const UpdateEventModal: React.FC<UpdateEventModalProps> = ({ isOpen, closeModal, handleUpdate, selectedObj, t }) => {
  const [locationType, setLocationType] = useState<'Online' | 'Onsite' | 'Hybrid'>('Onsite');
  
  // Khai báo state cho danh sách nhân viên được chọn và Host
  const [selectedStaffIds, setSelectedStaffIds] = useState<number[]>([]);
  const [hostStaffId, setHostStaffId] = useState<number | null>(null);

  // useEffect đồng bộ toàn bộ dữ liệu từ selectedObj khi mở modal
  useEffect(() => {
    if (selectedObj) {
      setLocationType(selectedObj.location_type || 'Onsite');
      
      // Xử lý nạp danh sách nhân viên cũ đã được gán vào sự kiện
      if (selectedObj.staff && selectedObj.staff.length > 0) {
        const staffIds = selectedObj.staff.map((s: any) => s.event_staff_id || s.id);
        const host = selectedObj.staff.find((s: any) => s.is_host);
        setSelectedStaffIds(staffIds);
        setHostStaffId(host ? (host.event_staff_id || host.id) : null);
      } else {
        setSelectedStaffIds([]);
        setHostStaffId(null);
      }
    }
  }, [selectedObj, isOpen]);

  if (!isOpen || !selectedObj) return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Gộp dữ liệu từ Date và Time Range thành chuỗi "time" duy nhất hoặc cấu trúc mong muốn
    const eventDate = formData.get('event_date') as string;
    const eventTimeRange = formData.get('event_time_range') as string;
    const combinedTime = `${eventDate} ${eventTimeRange}`;

    const staffPayload: EventStaff[] = selectedStaffIds.map(id => {
    // Tìm thông tin gốc của nhân viên từ danh sách mockStaff
    const originalStaff = mockStaff.find(s => s.id === id);
    
    return {
      event_staff_id: originalStaff?.id || id, // hoặc sinh mã ngẫu nhiên nếu là nhân viên mới thêm
      staff_id: id,
      staff_name: originalStaff?.name || originalStaff?.name || 'Unknown',
      is_host: id === hostStaffId,
      assigned_at: new Date().toISOString()
    };
  });
    
    handleUpdate({
      ...selectedObj, // Giữ lại các id hoặc thuộc tính ẩn khác của Object cũ
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      time: combinedTime, 
      location_type: locationType,
      room_name: locationType !== 'Online' ? (formData.get('room_name') as string) : null,
      url: locationType !== 'Onsite' ? (formData.get('url') as string) : null,
      staff: staffPayload, // Gửi kèm danh sách nhân viên đã chỉnh sửa
      updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
    });
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="admin-modal animate-in flex flex-col max-h-[90vh]"
        style={{ maxWidth: '650px', width: '90%' }}
      >
        {/* Header */}
        <div className="modal-header flex items-center justify-between p-4 border-b">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar className="text-emerald-600" size={24} />
            <h3 style={{ color: '#091d11', fontWeight: 700 }} className="text-lg">
              {t.lang === 'vi' ? 'Cập nhật sự kiện' : 'Update Event'}
            </h3>
          </div>
          <button className="close-modal text-slate-800 hover:text-black transition-colors text-xl font-bold" onClick={closeModal}>×</button>
        </div>

        {/* Body Form */}
        <div className="modal-body overflow-y-auto p-4 min-h-0 flex-1">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            
            {/* Event Title */}
            <div className="form-group">
              <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formTitle} *</label>
              <input
                type="text"
                name="title"
                required
                defaultValue={selectedObj.title || ''}
                placeholder={t.lang === 'vi' ? 'Ví dụ: Đại hội thể thao hè...' : 'E.g., Music Gala...'}
                spellCheck="false"
                style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            {/* Event Schedule info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label style={{ color: '#1e293b', fontWeight: 600 }}>Ngày tổ chức *</label>
                <input
                  type="date"
                  name="event_date"
                  required
                  // Trích xuất chuỗi "YYYY-MM-DD" từ dữ liệu time cũ của bạn để làm mặc định
                  defaultValue={selectedObj.time ? selectedObj.time.substring(0, 10) : '2026-05-25'}
                  style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div className="form-group">
                <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formTime} (Range) *</label>
                <input
                  type="text"
                  name="event_time_range"
                  required
                  placeholder="09:00 - 11:30"
                  // Trích xuất phần Giờ từ dữ liệu time cũ
                  defaultValue={selectedObj.time ? selectedObj.time.substring(11) : '09:00 - 11:30'}
                  style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formDescription}</label>
              <textarea
                name="description"
                spellCheck="false"
                rows={3}
                defaultValue={selectedObj.description || ''}
                placeholder={t.lang === 'vi' ? 'Mô tả mục đích hoạt động...' : 'Activity goals...'}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', color: '#1e293b' }}
              />
            </div>

            {/* Location Type Buttons */}
            <div className="form-group bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label style={{ color: '#1e293b', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>{t.formType}</label>
              <div className="action-btns" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                {[
                  { key: 'Onsite', label: t.physical, icon: MapPin },
                  { key: 'Online', label: t.online, icon: Video },
                  { key: 'Hybrid', label: t.hybrid, icon: Globe }
                ].map((item) => {
                  const IconComp = item.icon;
                  const active = locationType === item.key;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setLocationType(item.key as any)}
                      className={`view-btn-v2 cursor-pointer transition-all duration-200 ${
                        active ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white'
                      }`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: active ? '#059669' : '#cbd5e1',
                        width: 'auto',
                        minWidth: 'max-content'
                      }}
                    >
                      {IconComp && <IconComp size={15} />}
                      <span style={{ whiteSpace: 'nowrap', lineHeight: 1 }}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conditional Location Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locationType !== 'Online' && (
                <div className="form-group animate-slide-in">
                  <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formRoom} *</label>
                  <input
                    type="text"
                    name="room_name"
                    required
                    defaultValue={selectedObj.room_name || ''}
                    placeholder="e.g. Room G203"
                    style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              )}

              {locationType !== 'Onsite' && (
                <div className="form-group animate-slide-in">
                  <label style={{ color: '#1e293b', fontWeight: 600 }}>{t.formUrl} *</label>
                  <input
                    type="url"
                    name="url"
                    required
                    defaultValue={selectedObj.url || ''}
                    placeholder="https://meet.google.com/..."
                    style={{ color: '#101726', width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              )}
            </div>

            {/* Staff Selection List */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1e293b' }}>
                {t.formStaff || 'Staff Members'}
              </label>

              <div style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                maxHeight: '180px',
                overflowY: 'auto',
                padding: '6px',
                backgroundColor: '#f8fafc'
              }}>
                {/* Ở đây sử dụng mảng mockStaff của bạn (hoặc dữ liệu từ props cấp vào) */}
                {mockStaff.map(s => {
                  const isChecked = selectedStaffIds.includes(s.id);
                  const isHost = hostStaffId === s.id;

                  return (
                    <div
                      key={s.id}
                      className="hover:bg-white"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px',
                        marginBottom: '4px',
                        borderRadius: '6px',
                        backgroundColor: isChecked ? '#ffffff' : 'transparent',
                        border: isChecked ? '1px solid #cbd5e1' : '1px solid transparent',
                        boxShadow: isChecked ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Checkbox và tên nhân viên */}
                      <label style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        flex: 1,
                        color: '#334155',
                        userSelect: 'none'
                      }}>
                        <input
                          type="checkbox"
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                          checked={isChecked}
                          onChange={() => {
                            setSelectedStaffIds(prev => {
                              const updated = prev.includes(s.id) ? prev.filter(i => i !== s.id) : [...prev, s.id];
                              // Nếu bỏ check trúng người đang làm Host, reset hostState về null
                              if (prev.includes(s.id) && hostStaffId === s.id) {
                                setHostStaffId(null);
                              }
                              return updated;
                            });
                          }}
                        />
                        <span>{s.name}</span>
                      </label>

                      {/* Nút phân bổ chức vụ Host */}
                      {isChecked && (
                        <button
                          type="button"
                          onClick={() => setHostStaffId(isHost ? null : s.id)}
                          className="view-btn-v2"
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '75px',
                            textAlign: 'center',
                            transition: 'all 0.15s ease',
                            backgroundColor: isHost ? '#ecfdf5' : '#ffffff',
                            border: isHost ? '1px solid #10b981' : '1px solid #cbd5e1',
                            color: isHost ? '#047857' : '#64748b'
                          }}
                        >
                          {isHost ? '✕ Host' : 'Set Host'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="modal-footer mt-4 flex justify-end gap-2 border-t pt-3">
              <button type="button" className="btn-secondary px-4 py-2 border rounded-md text-sm" onClick={closeModal}>
                {t.cancel}
              </button>
              <button 
                type="submit" 
                className="btn-primary px-4 py-2 text-white rounded-md text-sm font-medium" 
                style={{ backgroundColor: '#059669', borderColor: '#059669' }}
              >
                {'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- EVENTS READ DETAILS SHEET MODAL ---
interface ReadEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedObj: EventItem | null;
  t: any;
}

export const ReadEventModal: React.FC<ReadEventModalProps> = ({ isOpen, closeModal, selectedObj, t }) => {
  if (!isOpen) return null;

  // Find primary teacher if any
  const hostStaff = selectedObj?.staff.find(s => s.is_host);
  const secondaryStaff = selectedObj?.staff.filter(s => !s.is_host) || [];

  return (
    <div className="modal-overlay">
      <div className="admin-modal animate-in" style={{ ...modalTextStyle, maxWidth: '600px', width: '90%' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ color: '#0f172a', fontWeight: 700 }}>{t.viewTitle}</h3>
          </div>
          <button className="close-modal" onClick={closeModal}>×</button>
        </div>

        <div className="modal-body max-h-[70vh] overflow-y-auto">
          <div className="modal-form flex flex-col gap-4">

            {/* Title Block & Status Banner */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden">
              <div className="absolute right-3 top-3">
                Status:{' '}
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${selectedObj?.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                  selectedObj?.status === 'Cancelled' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                    selectedObj?.status === 'Completed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                  {selectedObj?.status === 'Active' ? t.active :
                    selectedObj?.status === 'Cancelled' ? t.cancelled :
                      selectedObj?.status === 'Completed' ? t.completed : t.pending}
                </span>
              </div>
              <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                ID: {selectedObj?.event_id}
              </div>
              <h4 className="text-xl font-bold text-slate-950 pr-20">{selectedObj?.title}</h4>

              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-slate-800">{selectedObj?.time}</span>
                </div>

                <span className="text-slate-300">|</span>

                <span className={`px-2 py-0.5 rounded text-slate-800 text-[10px] font-semibold border ${selectedObj?.location_type === 'Online' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                  selectedObj?.location_type === 'Onsite' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                    'bg-pink-50 border-pink-200 text-pink-700'
                  }`}>
                  {selectedObj?.location_type === 'Online' ? t.online :
                    selectedObj?.location_type === 'Onsite' ? t.physical : t.hybrid}
                </span>
              </div>
            </div>

            {/* Description Sheet */}
            <div className="form-group-view">
              <label style={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t.formDescription}
              </label>
              <p className="mt-1 text-sm bg-slate-50 border border-slate-100 p-3 rounded-lg text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedObj?.description || '---'}
              </p>
            </div>

            {/* Conditional Room Badge or meeting url rendering with Interactive triggers! */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedObj?.room_name && (
                <div className="p-3 border border-slate-100 bg-slate-50 rounded-lg flex items-start gap-2.5">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">{t.formRoom}{': '}</span>
                    <span className="text-sm font-semibold text-slate-800">{selectedObj.room_name}</span>
                  </div>
                </div>
              )}

              {selectedObj?.url && (
                <a
                  href={selectedObj.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 transition-colors rounded-lg flex items-start gap-2.5 cursor-pointer decoration-transparent outline-none group"
                >
                  <Video className="text-indigo-600 mt-0.5" size={18} />
                  <div className="flex-1">
                    <span className="text-indigo-500 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                      {t.formUrl}{': '}
                      <ExternalLink size={10} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-xs font-semibold text-slate-800 overflow-hidden text-ellipsis block max-w-[200px]" title={selectedObj.url}>
                      {selectedObj.url}
                    </span>
                  </div>
                </a>
              )}
            </div>

            {/* Assigned Staff with Host spotlight */}
            <div className="form-group-view">
              <label style={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="mb-2 block">
                {t.staffAssigned}
              </label>

              {selectedObj && selectedObj.staff && selectedObj.staff.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {/* Loại bỏ trùng lặp id trước khi chia nhóm */}
                  {(() => {
                    const uniqueStaff = Array.from(new Map(selectedObj.staff.map(item => [item.event_staff_id, item])).values());
                    const hosts = uniqueStaff.filter(s => s.is_host);
                    const assistants = uniqueStaff.filter(s => !s.is_host);

                    return (
                      <>
                        {/* KHU VỰC HOST (Chỉ xuất hiện chữ Host 1 lần) */}
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                          {t.assignedHost}
                        </span>
                        {hosts.length > 0 && (
                          <div className="flex items-start justify-between p-2.5 rounded-lg border bg-emerald-50/60 border-emerald-100 text-sm">
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-600" />
                              <span className="text-slate-900 font-medium">
                                {hosts.map(h => h.staff_name).join(', ')}
                              </span>
                            </div>

                          </div>
                        )}

                        {assistants.length > 0 && (
                          <div className="flex flex-col gap-1.5 p-2.5 rounded-lg border bg-white border-slate-100 text-sm">
                            {/* Tiêu đề nhóm Assistant */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-300" />
                                <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Assistant</span>
                              </div>
                            </div>

                            {/* Liệt kê danh sách các Assistant */}
                            <div className="flex flex-wrap gap-1.5 pl-4">
                              {assistants.map((assistant) => (
                                <div>
                                  <span
                                    key={assistant.event_staff_id}
                                    className="bg-slate-50 text-slate-700 border border-slate-200 px-2 py-1 rounded-md text-xs font-medium"
                                  >
                                    {assistant.staff_name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded border border-dashed border-slate-200">
                  {t.emptyStaff}
                </div>
              )}
            </div>
            {/* Attending Children registry relations */}
            <div className="form-group-view">
              <label style={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="mb-2 block">
                {t.childrenJoined}
              </label>

              {selectedObj && selectedObj.children.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedObj.children.map((childMember) => (
                    <div
                      key={childMember.event_child_id}
                      className="p-2.5 border border-slate-100 rounded-lg bg-slate-50/50 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-slate-800">{childMember.child_name} | Joined: {childMember.joined_at.substring(0, 10)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded border border-dashed border-slate-200">
                  {t.emptyChildren}
                </div>
              )}
            </div>

            {/* Technical Stamp Details */}
            <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <div>Created: <span className="font-mono">{selectedObj?.created_at}</span></div>
              <div>Updated: <span className="font-mono">{selectedObj?.updated_at}</span></div>
            </div>

          </div>
        </div>

        <div className="modal-footer pt-3 mt-2 border-t border-slate-100">
          <button type="button" className="btn-secondary w-full sm:w-auto" onClick={closeModal}>{t.close}</button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN EVENT TAB COMPONENT ---
const EventTab: React.FC<EventTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering tools for Events tab
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMode, setModalMode] = useState<'create' | 'delete' | 'read' | 'update'>('create');

const handleUpdate = (updatedData: Partial<EventItem>) => {
  setEvents(events.map(ev => 
    ev.event_id === selectedObj?.event_id ? { ...ev, ...updatedData } : ev
  ));
  closeModal();
};
  const [selectedObj, setSelectedObj] = useState<EventItem | null>(null);

  // Initial event setups in compliant structures!
  const [events, setEvents] = useState<EventItem[]>([
    {
      event_id: 1,
      child_id: 101,
      title: 'Đại hội Âm nhạc Tuổi Thơ Hè 2026',
      description: 'Lớp học nhạc cụ gõ dân gian và biểu diễn tập thể. Yêu cầu học viên mặc đồng phục hoạt động ngoại khóa.',
      time: '2026-05-25 09:00 - 11:30',
      location_type: 'Onsite',
      room_name: 'Phòng hòa nhạc Melody Hall (Lầu 2)',
      url: null,
      status: 'Active',
      created_at: '2026-05-20 08:30:00',
      updated_at: '2026-05-20 08:30:00',
      deleted_at: null,
      staff: [
        { event_staff_id: 1, staff_id: 'st_001', staff_name: 'Cô giáo Alice', is_host: true, assigned_at: '2026-05-20 08:30:00' },
        { event_staff_id: 2, staff_id: 'st_003', staff_name: 'Cô Claire', is_host: false, assigned_at: '2026-05-20 08:31:00' }
      ],
      children: [
        { event_child_id: 1, child_id: 101, child_name: 'Suzy Nguyen', joined_at: '2026-05-20 09:00:00' },
        { event_child_id: 2, child_id: 102, child_name: 'Bobby Tran', joined_at: '2026-05-21 10:15:00' }
      ]
    },
    {
      event_id: 2,
      child_id: 103,
      title: 'Lớp lập trình Robotics cơ bản trực tuyến',
      description: 'Chương trình làm quen tư duy thuật toán thông qua sa bàn giả lập. Xem hướng dẫn kết nối camera trước giờ học.',
      time: '2026-05-26 14:00 - 15:30',
      location_type: 'Online',
      room_name: null,
      url: 'https://meet.google.com/robotic-kids-class',
      status: 'Pending',
      created_at: '2026-05-22 11:22:00',
      updated_at: '2026-05-22 11:22:00',
      deleted_at: null,
      staff: [
        { event_staff_id: 3, staff_id: 'st_002', staff_name: 'Thầy giáo Bob (Kỹ năng mềm)', is_host: true, assigned_at: '2026-05-22 11:22:00' }
      ],
      children: [
        { event_child_id: 3, child_id: 103, child_name: 'Alex Le (ID: 103)', joined_at: '2026-05-23 09:00:00' }
      ]
    },
    {
      event_id: 3,
      child_id: 104,
      title: 'Hội thảo khoa học nhí: Kỳ quan hóa học',
      description: 'Sự kiện trải nghiệm tạo phản ứng xà phòng hóa học tự nhiên an toàn. Có kết nối cầu truyền hình cho phụ huynh xem từ xa.',
      time: '2026-05-28 08:00 - 10:00',
      location_type: 'Hybrid',
      room_name: 'Phòng Lab Hóa Sinh (B204)',
      url: 'https://zoom.us/j/kids-chemical-magic-wonder',
      status: 'Cancelled',
      created_at: '2026-05-23 15:45:00',
      updated_at: '2026-05-24 02:10:00',
      deleted_at: '2026-05-24 02:10:00',
      staff: [
        { event_staff_id: 4, staff_id: 'st_002', staff_name: 'Thầy giáo Bob (Kỹ năng mềm)', is_host: true, assigned_at: '2026-05-23 15:45:00' },
        { event_staff_id: 5, staff_id: 'st_004', staff_name: 'Coach Donald (Thể thao / Bơi lội)', is_host: false, assigned_at: '2026-05-23 15:47:00' }
      ],
      children: [
        { event_child_id: 4, child_id: 104, child_name: 'Daniel Pham (ID: 104)', joined_at: '2026-05-23 16:00:00' },
        { event_child_id: 5, child_id: 101, child_name: 'Suzy Nguyen (ID: 101)', joined_at: '2026-05-23 16:05:00' }
      ]
    }
  ]);

  const openModal = (mode: 'create' | 'delete' | 'read' | 'update', obj: EventItem | null = null) => {
    setModalMode(mode);
    setSelectedObj(obj);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedObj(null);
  };

  const handleCreate = (data: Partial<EventItem>) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const nextId = events.length > 0 ? Math.max(...events.map(e => e.event_id)) + 1 : 1;

    // Create new full EventItem matching backend schemas
    const newEvent: EventItem = {
      event_id: nextId,
      child_id: data.child_id || null,
      title: data.title || 'Untitled event',
      description: data.description || '',
      time: data.time || '',
      location_type: data.location_type || 'Onsite',
      room_name: data.room_name || null,
      url: data.url || null,
      status: 'Active',
      created_at: nowStr,
      updated_at: nowStr,
      deleted_at: null,
      staff: data.staff || [],
      children: data.children || []
    };

    setEvents([...events, newEvent]);
    closeModal();
  };

  const handleDelete = () => {
    if (!selectedObj) return;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Soft hide by updating status to Cancelled and setting deleted_at time
    setEvents(events.map(ev =>
      ev.event_id === selectedObj.event_id
        ? { ...ev, status: 'Cancelled', deleted_at: nowStr }
        : ev
    ));
    closeModal();
  };

  // Complex multi-level query filtering
  const filteredEvents = events.filter(obj => {
    const term = searchTerm.toLowerCase();

    // Search terms criteria
    const matchesSearch = (
      obj.title.toLowerCase().includes(term) ||
      obj.description.toLowerCase().includes(term) ||
      (obj.room_name && obj.room_name.toLowerCase().includes(term)) ||
      (obj.url && obj.url.toLowerCase().includes(term))
    );

    // FilterType criteria ('All', 'Online', 'Onsite', 'Hybrid')
    const matchesType = (filterType === 'All' || obj.location_type === filterType);

    // FilterStatus criteria ('All', 'Active/Open', 'Cancelled', 'Pending', 'Inactive/Deleted')
    let matchesStatus = true;
    if (filterStatus !== 'All') {
      if (filterStatus === 'Active') {
        matchesStatus = obj.status === 'Active' && !obj.deleted_at;
      } else if (filterStatus === 'Cancelled') {
        matchesStatus = obj.status === 'Cancelled' || obj.deleted_at !== null;
      } else if (filterStatus === 'Pending') {
        matchesStatus = obj.status === 'Pending';
      }
    }

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="dashboard-content-area animate-fade-in">

      {/* Table Title and Actions Header row */}
      <div className="table-header">
        <div>
          <h2 className="table-title flex items-center gap-2 text-slate-900 font-bold">
            {t.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'vi' ? 'Thiết lập danh sách lớp, điều phối giảng viên đứng lớp và theo dõi điểm danh trẻ.' : 'Configure schedules, assign teachers, monitor student rosters.'}
          </p>
        </div>

        <div className="table-actions flex-wrap gap-3">
          {/* Main search */}
          <div className="search-bar min-w-[240px]">
            <Search className="search-icon text-slate-400" size={17} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="add-btn flex items-center gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm transition-all" onClick={() => openModal('create')}>
            {'+ ' + t.addNew}
          </button>
        </div>
      </div>

      {/* Grid or Table Display */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>{t.id}</th>
              <th style={{ width: '30%' }}>{t.name}</th>
              <th style={{ width: '20%' }}>{t.locationType}</th>
              <th style={{ width: '20%' }}>{t.time}</th>
              <th style={{ width: '10%' }}>{t.status}</th>
              <th style={{ width: '10%' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((obj) => {
                const isOnline = obj.location_type === 'Online';
                const isPhysical = obj.location_type === 'Onsite';

                return (
                  <tr key={obj.event_id} className="table-row-hover animate-fade-in group">
                    <td className="id-col text-xs font-mono font-semibold text-slate-500">
                      {obj.event_id}
                    </td>
                    <td className="name-col" title={obj.description}>
                      <div className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {obj.title}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span>
                          {isOnline ? t.online.split(' ')[0] :
                            isPhysical ? t.physical.split(' ')[0] : t.hybrid.split(' ')[0]}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <span className="font-medium text-slate-800">{obj.time}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${obj.status === 'Active' ? 'completed bg-emerald-100 text-emerald-800 border-emerald-200' :
                        obj.status === 'Completed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          obj.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'processing bg-rose-100 text-rose-800 border-rose-200'
                        }`}>
                        {obj.status === 'Active' ? t.active :
                          obj.status === 'Completed' ? t.completed :
                            obj.status === 'Pending' ? t.pending : t.cancelled}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns" style={{ justifyContent: 'flex-end', display: 'flex', gap: '8px' }}>
                        <button className="view-btn-v2 cursor-pointer" title={t.viewTitle} onClick={() => openModal('read', obj)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        </button>
<button 
  className="edit-btn-v2 cursor-pointer" 
  onClick={() => openModal('update', obj)}
>
  Edit
</button>
                        <button className="delete-btn-v2 cursor-pointer text-red-600 hover:bg-red-50" title={t.deleteTitle} onClick={() => openModal('delete', obj)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3.5rem', color: '#94A3B8' }} className="text-sm">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span>⚠️ {t.noResults}</span>
                    <span className="text-xs text-slate-400 font-normal">Try altering search keywords or filters.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Roster Modals block */}
      <CreateEventModal
        isOpen={isModalOpen && modalMode === 'create'}
        closeModal={closeModal}
        handleSave={handleCreate}
        t={t}
      />

      <DeleteEventModal
        isOpen={isModalOpen && modalMode === 'delete'}
        closeModal={closeModal}
        handleDelete={handleDelete}
        selectedObj={selectedObj}
        t={t}
      />

      <ReadEventModal
        isOpen={isModalOpen && modalMode === 'read'}
        closeModal={closeModal}
        selectedObj={selectedObj}
        t={t}
      />

      <UpdateEventModal
  isOpen={isModalOpen && modalMode === 'update'}
  closeModal={closeModal}
  handleUpdate={handleUpdate}
  selectedObj={selectedObj}
  t={t}
/>
    </div>
  );
};

export default EventTab;
