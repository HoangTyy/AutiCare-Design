import React from 'react';
import {
  type EventItem as DashboardEventItem,
} from '../../../dashboard/EventsTab';

const Search = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

type ScheduleType = 'Event' | 'Appointment';

interface AppointmentItem {
  id: number;
  type: 'Appointment';
  title: string;
  day: string;
  time: string;
  staff: string;
  location: string;
  description: string;
  locationType?: 'Online' | 'Offline';
  status?: 'Available' | 'Booked';
  service_type: 'Diagnosis' | 'Education';
  price?: number;
}

type EventItem = DashboardEventItem & { type: 'Event' };

type ScheduleItem = AppointmentItem | EventItem;

type ScheduleIconName = 'plus' | 'eye' | 'edit' | 'trash' | 'x' | 'save';

const actionButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  whiteSpace: 'nowrap'
};

const ScheduleIcon: React.FC<{ name: ScheduleIconName }> = ({ name }) => {
  const paths: Record<ScheduleIconName, React.ReactNode> = {
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </>
    ),
    x: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
    save: (
      <>
        <path d="M5 3h12l2 2v16H5Z" />
        <path d="M8 3v6h8V3" />
        <path d="M8 17h8" />
      </>
    )
  };

  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
};

const ButtonLabel: React.FC<{ icon: ScheduleIconName; children: React.ReactNode }> = ({ icon, children }) => (
  <>
    <ScheduleIcon name={icon} />
    <span>{children}</span>
  </>
);

const translations = {
  vi: {
    title: "Quản lý lịch",
    subtitle: "Xem lịch làm việc và ca can thiệp của bạn.",
    search: "Tìm lịch...",
    create: 'Tạo lịch',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    createModalTitle: 'Tạo lịch mới',
    editModalTitle: 'Cập nhật lịch',
    save: 'Lưu',
    cancel: 'Hủy',
    typeSelect: 'Chọn loại',
    type: "Loại",
    appointment: "Khung giờ",
    event: "Sự kiện",
    day: "Ngày",
    time: "Giờ",
    staff: "Nhân viên",
    location: "Địa điểm",
    details: "Chi tiết",
    noData: "Không có lịch nào.",
    close: "Đóng",
    description: "Mô tả"
  },
  en: {
    title: "Manage Schedules",
    subtitle: "Review appointments and events.",
    search: "Search schedule...",
    create: 'Create Schedule',
    createAppointment: 'Create Appointment',
    createEvent: 'Create Event',
    edit: 'Edit',
    delete: 'Delete',
    deleteTitle: 'Delete Schedule',
    deleteConfirm: 'Are you sure you want to delete this schedule?',
    createModalTitle: 'Create New Schedule',
    editModalTitle: 'Update Schedule',
    save: 'Save',
    cancel: 'Cancel',
    typeSelect: 'Choose type',
    type: "Type",
    appointment: "Appointment Slot",
    event: "Event",
    day: "Day",
    time: "Time",
    staff: "Staff",
    location: "Location",
    details: "Details",
    noData: "No schedules found.",
    close: "Close",
    description: "Description"
  }
};

const eventModalTranslations = {
  vi: {
    lang: 'vi',
    deleteTitle: 'Delete Event',
    deleteConfirm: 'Are you sure you want to cancel the event',
    deleteSub: 'This will switch the status indicator to Cancelled and update records.',
    cancel: 'Cancel',
    save: 'Publish Event',
    confirmDelete: 'Confirm Cancel',
    createTitle: 'Create Event',
    formTitle: 'Event Name',
    formDescription: 'Description',
    formTime: 'Date & Time Duration',
    formType: 'Location Type',
    formRoom: 'Location',
    formUrl: 'Meeting URL',
    formStaff: 'Staff & Teachers',
    viewTitle: 'Event details',
    close: 'Close',
    active: 'Active',
    cancelled: 'Cancelled',
    completed: 'Completed',
    pending: 'Pending',
    online: 'Online',
    physical: 'Onsite',
    hybrid: 'Hybrid',
    staffAssigned: 'Assigned Staffs',
    childrenJoined: 'Registered Children',
    assignedHost: 'Primary Host',
    emptyStaff: 'No staff assigned under instruction',
    emptyChildren: 'No registered children recorded yet'
  },
  en: {
    lang: 'en',
    deleteTitle: 'Delete Event',
    deleteConfirm: 'Are you sure you want to cancel the event',
    deleteSub: 'This will switch the status indicator to Cancelled and update records.',
    cancel: 'Cancel',
    save: 'Publish Event',
    confirmDelete: 'Confirm Cancel',
    createTitle: 'Create Event',
    formTitle: 'Event Name',
    formDescription: 'Description',
    formTime: 'Date & Time Duration',
    formType: 'Location Type',
    formRoom: 'Location',
    formUrl: 'Meeting URL',
    formStaff: 'Staff & Teachers',
    viewTitle: 'Event details',
    close: 'Close',
    active: 'Active',
    cancelled: 'Cancelled',
    completed: 'Completed',
    pending: 'Pending',
    online: 'Online',
    physical: 'Onsite',
    hybrid: 'Hybrid',
    staffAssigned: 'Assigned Staffs',
    childrenJoined: 'Registered Children',
    assignedHost: 'Primary Host',
    emptyStaff: 'No staff assigned under instruction',
    emptyChildren: 'No registered children recorded yet'
  }
};

const mockEventStaff = [
  { id: 'st_001', name: 'Alice', role: 'Teacher' },
  { id: 'st_002', name: 'Bob', role: 'Instructor' },
  { id: 'st_003', name: 'Claire', role: 'Coordinator' },
  { id: 'st_004', name: 'Donald', role: 'Coach' }
];

const splitEventTime = (time: string) => {
  const date = time?.substring(0, 10) || '';
  const range = time?.length > 10 ? time.substring(11) : '';
  return { date, range };
};

const getScheduleDate = (item: ScheduleItem) => (
  item.type === 'Event' ? splitEventTime(item.time).date : item.day
);

const formatCalendarDay = (dateValue: string, lang: 'vi' | 'en') => {
  const [year, month, day] = dateValue.split('-').map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1);
  return new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const addDays = (dateValue: string, amount: number) => {
  const [year, month, day] = dateValue.split('-').map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1);
  date.setDate(date.getDate() + amount);
  return date.toISOString().slice(0, 10);
};

const mockSchedules: ScheduleItem[] = [
  {
    id: 1,
    type: 'Appointment',
    title: 'ABA Therapy Morning',
    day: '2026-06-01',
    time: '08:00 - 09:30',
    staff: 'Ms. Le Thi Thanh Nhan',
    location: 'Phòng Trị Liệu ABA A01',
    description: 'ABA therapy session for the student.',
    locationType: 'Offline',
    status: 'Available',
    service_type: 'Diagnosis',
    price: 0
  },
  {
    id: 2,
    type: 'Appointment',
    title: 'Speech Therapy',
    day: '2026-06-01',
    time: '10:00 - 11:30',
    staff: 'Ms. Nguyen Lan Vy',
    location: 'Phòng Âm Nhạc S03',
    description: 'Speech development therapy slot.',
    locationType: 'Offline',
    status: 'Booked',
    service_type: 'Education',
    price: 0
  },
  {
    event_id: 3,
    type: 'Event',
    child_id: null,
    title: 'Communication Skills Workshop',
    description: 'Workshop for communication skills training.',
    time: '2026-06-03 14:00 - 15:30',
    location_type: 'Onsite',
    room_name: 'Phòng Hội Thảo B',
    url: null,
    status: 'Active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    staff: [
      { event_staff_id: 1, staff_id: 'duc', staff_name: 'Mr. Hoang Van Duc', is_host: true, assigned_at: new Date().toISOString() }
    ],
    children: []
  }
];

const StaffScheduleTab: React.FC<{ lang: 'vi' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<ScheduleItem | null>(null);
  const [items, setItems] = React.useState<ScheduleItem[]>(mockSchedules);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<ScheduleItem | null>(null);
  const [formData, setFormData] = React.useState<any>({ type: 'Appointment', status: 'Available' });
  const [deleteTarget, setDeleteTarget] = React.useState<ScheduleItem | null>(null);
  const [selectedEventStaffIds, setSelectedEventStaffIds] = React.useState<string[]>([]);
  const [hostEventStaffId, setHostEventStaffId] = React.useState<string>('');
  const eventT = eventModalTranslations[lang];

  const closeScheduleForm = () => {
    setIsCreateOpen(false);
    setEditingItem(null);
    setSelectedEventStaffIds([]);
    setHostEventStaffId('');
  };

  const openEditModal = (item: ScheduleItem) => {
    setEditingItem(item);
    if (item.type === 'Event') {
      const eventItem = item as EventItem;
      const { date, range } = splitEventTime(eventItem.time);
      setFormData({
        ...eventItem,
        type: 'Event',
        event_date: date,
        event_time_range: range,
        location_type: eventItem.location_type || 'Onsite',
        room_name: eventItem.room_name || '',
        url: eventItem.url || ''
      });
      setSelectedEventStaffIds(eventItem.staff.map(staff => staff.staff_id));
      setHostEventStaffId(eventItem.staff.find(staff => staff.is_host)?.staff_id || '');
    } else {
      setFormData({ ...item });
      setSelectedEventStaffIds([]);
      setHostEventStaffId('');
    }
    setIsCreateOpen(true);
  };

  const handleCreateEvent = (data: Partial<DashboardEventItem>) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const nextId = Math.max(0, ...items.filter((item): item is EventItem => item.type === 'Event').map(event => event.event_id)) + 1;
    const newEvent: EventItem = {
      event_id: nextId,
      type: 'Event',
      child_id: data.child_id || null,
      title: data.title || 'Untitled event',
      description: data.description || '',
      time: data.time || '',
      location_type: data.location_type || 'Onsite',
      room_name: data.room_name || null,
      url: data.url || null,
      status: data.status || 'Active',
      created_at: nowStr,
      updated_at: nowStr,
      deleted_at: null,
      staff: data.staff || [],
      children: data.children || []
    };

    setItems(prev => [...prev, newEvent]);
    setSelectedEventStaffIds([]);
    setHostEventStaffId('');
    setIsCreateOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setItems(prev => {
      if (deleteTarget.type === 'Event') {
        return prev.map(item => {
          if (item.type !== 'Event' || item.event_id !== deleteTarget.event_id) return item;
          return { ...item, status: 'Cancelled', deleted_at: nowStr };
        });
      }
      return prev.filter(item => item.type !== 'Appointment' || item.id !== deleteTarget.id);
    });
    setDeleteTarget(null);
  };

  const filteredSchedules = items.filter(item => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    if (item.type === 'Appointment') {
      const a = item as AppointmentItem;
      return [a.title, a.day, a.time, a.location, a.description].some(f => (f || '').toLowerCase().includes(query));
    }
    const ev = item as EventItem;
    const staffNames = ev.staff?.map(s => s.staff_name).join(' ') || '';
    const childrenNames = ev.children?.map(c => c.child_name).join(' ') || '';
    return [ev.title, ev.time, ev.room_name || '', ev.location_type, staffNames, childrenNames, ev.description]
      .some(f => (f || '').toLowerCase().includes(query));
  });

  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    const dateCompare = getScheduleDate(a).localeCompare(getScheduleDate(b));
    if (dateCompare !== 0) return dateCompare;
    const aTime = a.type === 'Event' ? splitEventTime(a.time).range : a.time;
    const bTime = b.type === 'Event' ? splitEventTime(b.time).range : b.time;
    return aTime.localeCompare(bTime);
  });

  const firstScheduleDate = sortedSchedules[0] ? getScheduleDate(sortedSchedules[0]) : new Date().toISOString().slice(0, 10);
  const calendarDays = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(firstScheduleDate, index);
    return {
      date,
      label: formatCalendarDay(date, lang),
      schedules: sortedSchedules.filter(item => getScheduleDate(item) === date)
    };
  });

  const renderScheduleCard = (item: ScheduleItem) => (
    <div
      key={item.type === 'Event' ? item.event_id : item.id}
      className="schedule-class-sticker border-color-blue"
      style={{ padding: '0.75rem', minHeight: '150px' }}
    >
      <div style={{ display: 'grid', gap: '0.45rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'flex-start' }}>
          <span style={{ color: item.type === 'Event' ? '#047857' : '#1D4ED8', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase' }}>
            {item.type === 'Event' ? t.event : t.appointment}
          </span>
          <span style={{ color: '#475569', fontWeight: 800, fontSize: '0.75rem', textAlign: 'right' }}>
            {item.type === 'Event' ? splitEventTime(item.time).range : item.time}
          </span>
        </div>

        <h4 style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.25 }}>{item.title}</h4>

        <div style={{ color: '#334155', display: 'grid', gap: '0.25rem', fontSize: '0.8rem', lineHeight: 1.35 }}>
          {item.type === 'Appointment' ? (
            <>
              <span><strong>{t.staff}:</strong> {item.staff}</span>
              <span><strong>{t.location}:</strong> {item.location}</span>
            </>
          ) : (
            <>
              <span><strong>{t.staff}:</strong> {item.staff.map(s => s.staff_name).join(', ') || '-'}</span>
              <span><strong>{t.location}:</strong> {item.room_name || item.location_type}</span>
            </>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
          <button className="btn-primary" type="button" style={{ ...actionButtonStyle, padding: '0.35rem 0.5rem' }} onClick={() => setSelected(item)}>
            <ButtonLabel icon="eye">{t.details}</ButtonLabel>
          </button>
          <button className="btn-secondary" type="button" style={{ ...actionButtonStyle, padding: '0.35rem 0.5rem' }} onClick={() => openEditModal(item)}>
            <ButtonLabel icon="edit">{t.edit}</ButtonLabel>
          </button>
          <button className="btn-danger" type="button" style={{ ...actionButtonStyle, padding: '0.35rem 0.5rem' }} onClick={() => {
            if (item.type === 'Appointment' && item.status === 'Booked') {
              alert((t as any).deleteConfirmBooked || 'Cannot delete booked schedule');
              return;
            }
            setDeleteTarget(item);
          }}>
            <ButtonLabel icon="trash">{t.delete}</ButtonLabel>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="schedule-tab-wrapper staff-schedule-wrapper">

      <div 
        className="schedule-header-zone"
        style={{
          background: '#FFFFFF',
          border: '3px solid #1E293B',
          borderRadius: '20px',
          padding: '1.5rem 2rem',
          boxShadow: '6px 6px 0px #1E293B',
          boxSizing: 'border-box',
          width: '100%',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        <div className="schedule-title-block">
          <h2 className="schedule-tab-title" style={{ margin: 0, fontWeight: 900, color: '#1E293B', fontSize: '1.4rem' }}>{t.title}</h2>
          <p className="schedule-tab-subtitle" style={{ margin: '6px 0 0 0', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>{t.subtitle}</p>
        </div>

        <div className="search-bar min-w-[240px]">
          <Search className="search-icon text-slate-400" size={17} />
          <input
            type="search"
            placeholder={t.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-control"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="add-btn" type="button" style={actionButtonStyle} onClick={() => {
            setFormData({
              type: 'Appointment',
              status: 'Available',
              title: '',
              day: '',
              time: '',
              staff: '',
              location: '',
              description: '',
              service_type: 'Diagnosis',
              price: 0,
              event_date: '2026-05-25',
              event_time_range: '09:00 - 10:30',
              location_type: 'Onsite',
              room_name: '',
              url: ''
            });
            setSelectedEventStaffIds([]);
            setHostEventStaffId('');
            setEditingItem(null);
            setIsCreateOpen(true);
          }}>
            <ButtonLabel icon="plus">{t.create}</ButtonLabel>
          </button>
        </div>

        {filteredSchedules.length === 0 ? (
          <div className="weekly-day-empty-slot" style={{ padding: '2rem', textAlign: 'center' }}>{t.noData}</div>
        ) : (
          <div
            className="weekly-columns-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(180px, 1fr))',
              gap: '0.85rem',
              overflowX: 'auto',
              paddingBottom: '0.35rem'
            }}
          >
            {calendarDays.map((day, index) => (
              <div
                key={day.date}
                className="weekly-day-column"
                style={{
                  minWidth: '180px',
                  background: '#FFFFFF',
                  border: '2px solid #1E293B',
                  borderRadius: '12px',
                  boxShadow: '4px 4px 0 #1E293B',
                  overflow: 'hidden'
                }}
              >
                <div
                  className={`weekly-day-header day-color-${index}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    borderBottom: '2px solid #1E293B'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 950, color: '#0F172A', fontSize: '0.9rem' }}>{day.label}</div>
                    <div style={{ color: '#64748B', fontWeight: 800, fontSize: '0.72rem' }}>{day.date}</div>
                  </div>
                  <span
                    className="day-classes-count-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '28px',
                      height: '28px',
                      borderRadius: '999px',
                      background: '#1E293B',
                      color: '#FFFFFF',
                      fontWeight: 900
                    }}
                  >
                    {day.schedules.length}
                  </span>
                </div>

                <div className="weekly-day-slots-list" style={{ display: 'grid', gap: '0.75rem', padding: '0.75rem', alignContent: 'start' }}>
                  {day.schedules.length === 0 ? (
                    <div className="weekly-day-empty-slot" style={{ padding: '1.25rem 0.5rem', textAlign: 'center', color: '#94A3B8', fontWeight: 800 }}>
                      {lang === 'vi' ? 'Trống' : 'Empty'}
                    </div>
                  ) : (
                    day.schedules.map(renderScheduleCard)
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="profile-admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0 }}>{selected.title}</h3>
                <p style={{ margin: '0.25rem 0 0', color: '#64748B' }}>{selected.type === 'Event' ? t.event : t.appointment}</p>
              </div>
              <button className="close-modal" style={actionButtonStyle} onClick={() => setSelected(null)}>
                <ScheduleIcon name="x" />
              </button>
            </div>
            <div className="modal-body" style={{ paddingTop: '1rem' }}>
              {selected.type === 'Appointment' ? (
                <>
                  <div style={{ marginBottom: '0.75rem' }}><strong>ID:</strong> {(selected as AppointmentItem).id}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.type}:</strong> {t.appointment}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Title:</strong> {(selected as AppointmentItem).title}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.day}:</strong> {(selected as AppointmentItem).day}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.time}:</strong> {(selected as AppointmentItem).time}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.staff}:</strong> {(selected as AppointmentItem).staff}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.location}:</strong> {(selected as AppointmentItem).location}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Location Type:</strong> {(selected as AppointmentItem).locationType || '-'}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Status:</strong> {(selected as AppointmentItem).status || '-'}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Service Type:</strong> {(selected as AppointmentItem).service_type}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Price:</strong> {(selected as AppointmentItem).price ?? '-'}</div>
                  <div><strong>{t.description}:</strong> {(selected as AppointmentItem).description}</div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '0.75rem' }}><strong>ID:</strong> {(selected as EventItem).event_id}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.type}:</strong> {t.event}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Title:</strong> {(selected as EventItem).title}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.time}:</strong> {(selected as EventItem).time}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{eventT.formType}:</strong> {(selected as EventItem).location_type}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.location}:</strong> {(selected as EventItem).room_name || (selected as EventItem).location_type}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{eventT.formUrl}:</strong> {(selected as EventItem).url || '-'}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Status:</strong> {(selected as EventItem).status}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{t.staff}:</strong> {(selected as EventItem).staff.map(s => `${s.staff_name}${s.is_host ? ' (Host)' : ''}`).join(', ') || '-'}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>{eventT.childrenJoined}:</strong> {(selected as EventItem).children.map(c => c.child_name).join(', ') || '-'}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Created:</strong> {(selected as EventItem).created_at}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Updated:</strong> {(selected as EventItem).updated_at}</div>
                  <div style={{ marginBottom: '0.75rem' }}><strong>Deleted:</strong> {(selected as EventItem).deleted_at || '-'}</div>
                  <div><strong>{t.description}:</strong> {(selected as EventItem).description}</div>
                </>
              )}
            </div>
            <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
              <button className="btn-secondary" type="button" style={actionButtonStyle} onClick={() => setSelected(null)}>
                <ButtonLabel icon="x">{t.close}</ButtonLabel>
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreateOpen && (
        <div className="modal-overlay" onClick={closeScheduleForm}>
          <div className="admin-modal animate-in" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? (t as any).editModalTitle : (t as any).createModalTitle}</h3>
              <button className="close-modal" style={actionButtonStyle} onClick={closeScheduleForm}>
                <ScheduleIcon name="x" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!((formData as any).title)) return;
              if ((formData as any).type === 'Event') {
                const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
                const staff = selectedEventStaffIds.map((staffId, index) => {
                  const staffMember = mockEventStaff.find(member => member.id === staffId);
                  const existingStaff = editingItem?.type === 'Event' ? editingItem.staff.find(member => member.staff_id === staffId) : null;
                  return {
                    event_staff_id: existingStaff?.event_staff_id || Date.now() + index,
                    staff_id: staffId,
                    staff_name: staffMember?.name || existingStaff?.staff_name || `Staff ${staffId}`,
                    is_host: staffId === hostEventStaffId,
                    assigned_at: nowStr
                  };
                });

                const eventData: Partial<DashboardEventItem> = {
                  title: (formData as any).title,
                  description: (formData as any).description || '',
                  time: `${(formData as any).event_date || ''} ${(formData as any).event_time_range || ''}`.trim(),
                  location_type: (formData as any).location_type || 'Onsite',
                  room_name: (formData as any).location_type !== 'Online' ? ((formData as any).room_name || null) : null,
                  url: (formData as any).location_type !== 'Onsite' ? ((formData as any).url || null) : null,
                  status: 'Active',
                  staff,
                  children: [],
                  child_id: null
                };

                if (editingItem?.type === 'Event') {
                  setItems(prev => prev.map(item => {
                    if (item.type !== 'Event' || item.event_id !== editingItem.event_id) return item;
                    return {
                      ...item,
                      ...eventData,
                      type: 'Event',
                      status: (formData as any).status || item.status,
                      children: item.children,
                      child_id: item.child_id,
                      updated_at: nowStr
                    };
                  }));
                  setEditingItem(null);
                  setIsCreateOpen(false);
                } else {
                  handleCreateEvent(eventData);
                }
                return;
              }
              if (editingItem) {
                setItems(prev => prev.map(it => {
                  if (it.type === 'Appointment' && (editingItem as AppointmentItem).type === 'Appointment') {
                    return (it as AppointmentItem).id === (editingItem as AppointmentItem).id ? ({ ...it, ...(formData as any), type: 'Appointment' } as AppointmentItem) : it;
                  }
                  return it;
                }));
                setEditingItem(null);
              } else {
                const nextId = Math.max(0, ...items.filter(i => i.type === 'Appointment').map(a => (a as AppointmentItem).id)) + 1;
                const newApp: AppointmentItem = {
                  id: nextId,
                  type: 'Appointment',
                  title: (formData as any).title,
                  day: (formData as any).day || '',
                  time: (formData as any).time || '',
                  staff: (formData as any).staff || '',
                  location: (formData as any).location || '',
                  description: (formData as any).description || '',
                  locationType: (formData as any).locationType || 'Offline',
                  status: (formData as any).status || 'Available',
                  service_type: (formData as any).service_type || 'Diagnosis',
                  price: (formData as any).price || 0
                };
                setItems(prev => [...prev, newApp]);
              }
              setIsCreateOpen(false);
            }}>
              <div className="modal-body">
                <div className="form-group">
                  <label>{(t as any).typeSelect}</label>
                  <select
                    required
                    value={formData.type}
                    onChange={e => {
                      const nextType = e.target.value as ScheduleType;
                      setFormData((prev: any) => ({ ...prev, type: nextType }));
                    }}
                    disabled={Boolean(editingItem)}
                  >
                    <option value="Appointment">{t.appointment}</option>
                    <option value="Event">{t.event}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{(t as any).titleLabel || 'Title'}</label>
                  <input type="text" required value={(formData as any).title || ''} onChange={e => setFormData((prev: any) => ({ ...prev, title: e.target.value }))} />
                </div>

                {formData.type === 'Appointment' && (
                  <>
                    <div className="form-group">
                      <label>{(t as any).locationType || 'Type'}</label>
                      <select value={(formData as any).locationType || 'Offline'} onChange={e => setFormData((prev: any) => ({ ...prev, locationType: e.target.value as any }))}>
                        <option value="Offline">Offline</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{(t as any).serviceType || 'Service'}</label>
                      <select value={(formData as any).service_type || 'Diagnosis'} onChange={e => setFormData((prev: any) => ({ ...prev, service_type: e.target.value as any }))}>
                        <option value="Diagnosis">Diagnosis</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{(t as any).price || 'Price'}</label>
                      <input type="number" value={(formData as any).price || 0} onChange={e => setFormData((prev: any) => ({ ...prev, price: Number(e.target.value) }))} />
                    </div>
                    <div className="form-group">
                      <label>{t.day}</label>
                      <input type="date" required value={(formData as any).day || ''} onChange={e => setFormData((prev: any) => ({ ...prev, day: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label>{t.time}</label>
                      <input type="time" required value={(formData as any).time || ''} onChange={e => setFormData((prev: any) => ({ ...prev, time: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label>{t.location}</label>
                      <input type="text" value={(formData as any).location || ''} onChange={e => setFormData((prev: any) => ({ ...prev, location: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label>{t.description}</label>
                      <textarea value={(formData as any).description || ''} onChange={e => setFormData((prev: any) => ({ ...prev, description: e.target.value }))} rows={3} />
                    </div>
                  </>
                )}

                {formData.type === 'Event' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label>{eventT.formTime}</label>
                        <input
                          type="date"
                          required
                          value={(formData as any).event_date || ''}
                          onChange={e => setFormData((prev: any) => ({ ...prev, event_date: e.target.value }))}
                        />
                      </div>
                      <div className="form-group">
                        <label>{`${eventT.formTime} (Range)`}</label>
                        <input
                          type="text"
                          required
                          value={(formData as any).event_time_range || ''}
                          onChange={e => setFormData((prev: any) => ({ ...prev, event_time_range: e.target.value }))}
                          placeholder="09:00 - 10:30"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>{eventT.formType}</label>
                      <select
                        value={(formData as any).location_type || 'Onsite'}
                        onChange={e => setFormData((prev: any) => ({ ...prev, location_type: e.target.value as EventItem['location_type'] }))}
                      >
                        <option value="Onsite">{eventT.physical}</option>
                        <option value="Online">{eventT.online}</option>
                        <option value="Hybrid">{eventT.hybrid}</option>
                      </select>
                    </div>

                    {(formData as any).location_type !== 'Online' && (
                      <div className="form-group">
                        <label>{eventT.formRoom}</label>
                        <input
                          type="text"
                          required
                          value={(formData as any).room_name || ''}
                          onChange={e => setFormData((prev: any) => ({ ...prev, room_name: e.target.value }))}
                          placeholder="Room G203"
                        />
                      </div>
                    )}

                    {(formData as any).location_type !== 'Onsite' && (
                      <div className="form-group">
                        <label>{eventT.formUrl}</label>
                        <input
                          type="url"
                          required
                          value={(formData as any).url || ''}
                          onChange={e => setFormData((prev: any) => ({ ...prev, url: e.target.value }))}
                          placeholder="https://meet.google.com/abc-xyz-123"
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label>{eventT.formStaff}</label>
                      <div style={{ display: 'grid', gap: '0.5rem', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.5rem', background: '#F8FAFC' }}>
                        {mockEventStaff.map(staffMember => {
                          const isChecked = selectedEventStaffIds.includes(staffMember.id);
                          const isHost = hostEventStaffId === staffMember.id;

                          return (
                            <div
                              key={staffMember.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.75rem',
                                padding: '0.55rem 0.65rem',
                                borderRadius: '6px',
                                background: isChecked ? '#FFFFFF' : 'transparent',
                                border: isChecked ? '1px solid #CBD5E1' : '1px solid transparent'
                              }}
                            >
                              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', flex: 1, color: '#334155', cursor: 'pointer' }}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    setSelectedEventStaffIds(prev => {
                                      const next = prev.includes(staffMember.id)
                                        ? prev.filter(id => id !== staffMember.id)
                                        : [...prev, staffMember.id];
                                      if (!next.includes(hostEventStaffId)) {
                                        setHostEventStaffId(next[0] || '');
                                      }
                                      return next;
                                    });
                                  }}
                                />
                                <span>{staffMember.name}</span>
                              </label>
                              {isChecked && (
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  style={{ ...actionButtonStyle, padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                                  onClick={() => setHostEventStaffId(isHost ? '' : staffMember.id)}
                                >
                                  {isHost ? eventT.assignedHost : 'Set Host'}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" style={actionButtonStyle} onClick={closeScheduleForm}>
                  <ButtonLabel icon="x">{(t as any).cancel}</ButtonLabel>
                </button>
                <button type="submit" className="btn-primary" style={actionButtonStyle}>
                  <ButtonLabel icon="save">{(t as any).save}</ButtonLabel>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal animate-in" style={{ maxWidth: '460px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{(t as any).deleteTitle || eventT.deleteTitle}</h3>
              <button className="close-modal" style={actionButtonStyle} onClick={() => setDeleteTarget(null)}>
                <ScheduleIcon name="x" />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, color: '#334155', fontWeight: 700 }}>
                {(t as any).deleteConfirm || eventT.deleteConfirm} "{deleteTarget.title}"?
              </p>
              {deleteTarget.type === 'Event' && (
                <p style={{ margin: '0.75rem 0 0', color: '#64748B', fontSize: '0.9rem' }}>
                  {eventT.deleteSub}
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary" style={actionButtonStyle} onClick={() => setDeleteTarget(null)}>
                <ButtonLabel icon="x">{t.cancel}</ButtonLabel>
              </button>
              <button type="button" className="btn-danger" style={actionButtonStyle} onClick={handleConfirmDelete}>
                <ButtonLabel icon="trash">{eventT.confirmDelete}</ButtonLabel>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffScheduleTab;
