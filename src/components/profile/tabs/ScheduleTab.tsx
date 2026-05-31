import React from 'react';

interface ScheduleTabProps {
  lang: 'vi' | 'en';
}

type ScheduleType = 'Event' | 'Appointment';

interface ScheduleItem {
  id: number;
  type: ScheduleType;
  titleVi: string;
  titleEn: string;
  dayKey: string;
  date: string;
  time: string;
  teacherVi: string;
  teacherEn: string;
  room: string;
  location: string;
  descriptionVi: string;
  descriptionEn: string;
}

const EyeIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CloseIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const actionButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  whiteSpace: 'nowrap'
};

const translations = {
  vi: {
    title: "Lá»‹ch can thiá»‡p tuáº§n",
    subtitle: "Danh sĂ¡ch lá»‹ch há»c vĂ  can thiá»‡p cá»§a con em báº¡n",
    search: "TĂ¬m kiáº¿m lá»‹ch",
    type: "Loáº¡i lá»‹ch",
    appointment: "Khung giá»/Äáº·t lá»‹ch",
    event: "Sá»± kiá»‡n",
    day: "NgĂ y",
    date: "NgĂ y thá»±c hiá»‡n",
    time: "Thá»i gian",
    teacher: "GiĂ¡o viĂªn",
    room: "PhĂ²ng",
    location: "Äá»‹a Ä‘iá»ƒm",
    details: "Xem chi tiáº¿t",
    close: "ÄĂ³ng",
    noData: "KhĂ´ng cĂ³ lá»‹ch nĂ o.",
    empty: "Trá»‘ng",
    description: "MĂ´ táº£"
  },
  en: {
    title: "Schedule Overview",
    subtitle: "View the list of scheduled sessions and events for your child",
    search: "Search schedules",
    type: "Type",
    appointment: "Appointment Slot",
    event: "Event",
    day: "Day",
    date: "Date",
    time: "Time",
    teacher: "Teacher",
    room: "Room",
    location: "Location",
    details: "View details",
    close: "Close",
    noData: "No schedules found.",
    empty: "Empty",
    description: "Description"
  }
};

const mockSchedules: ScheduleItem[] = [
  {
    id: 1,
    type: 'Appointment',
    titleVi: 'Trá»‹ liá»‡u HĂ nh vi ABA CĂ¡ nhĂ¢n',
    titleEn: 'Individual ABA Therapy',
    dayKey: 'monday',
    date: '2026-06-01',
    time: '08:30 - 10:00',
    teacherVi: 'CĂ´ LĂª Thá»‹ Thanh NhĂ n',
    teacherEn: 'Ms. Le Thi Thanh Nhan',
    room: 'PhĂ²ng 203',
    location: 'Room 203',
    descriptionVi: 'Buá»•i trá»‹ liá»‡u cĂ¡ nhĂ¢n dĂ nh cho bĂ©.',
    descriptionEn: 'Individual therapy session for the child.'
  },
  {
    id: 2,
    type: 'Appointment',
    titleVi: 'Trá»‹ liá»‡u NgĂ´n ngá»¯',
    titleEn: 'Speech Therapy',
    dayKey: 'monday',
    date: '2026-06-01',
    time: '15:00 - 16:30',
    teacherVi: 'ThS. CĂ´ Nguyá»…n Lan Vy',
    teacherEn: 'Ms. Nguyen Lan Vy, MSc',
    room: 'PhĂ²ng Ă‚m Nháº¡c A',
    location: 'Speech Room A',
    descriptionVi: 'Buá»•i trá»‹ liá»‡u ngĂ´n ngá»¯ cho tráº».',
    descriptionEn: 'Speech therapy session for the child.'
  },
  {
    id: 3,
    type: 'Event',
    titleVi: 'Há»™i tháº£o PhĂ¡t triá»ƒn Ká»¹ nÄƒng XĂ£ há»™i',
    titleEn: 'Social Skills Workshop',
    dayKey: 'wednesday',
    date: '2026-06-03',
    time: '14:00 - 16:00',
    teacherVi: 'Tháº§y HoĂ ng VÄƒn Äá»©c',
    teacherEn: 'Mr. Hoang Van Duc',
    room: 'PhĂ²ng Tháº£o Luáº­n B',
    location: 'Group Play Room',
    descriptionVi: 'Sá»± kiá»‡n nhĂ³m nhá» phĂ¡t triá»ƒn ká»¹ nÄƒng xĂ£ há»™i.',
    descriptionEn: 'Small group workshop for social skills development.'
  }
];

const dayLabels = {
  vi: {
    monday: 'Thá»© Hai',
    tuesday: 'Thá»© Ba',
    wednesday: 'Thá»© TÆ°',
    thursday: 'Thá»© NÄƒm',
    friday: 'Thá»© SĂ¡u',
    saturday: 'Thá»© Báº£y',
    sunday: 'Chá»§ Nháº­t'
  },
  en: {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  }
};

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

const ScheduleTab: React.FC<ScheduleTabProps> = ({ lang }) => {
  const t = translations[lang];
  const [search, setSearch] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<ScheduleItem | null>(null);

  const filteredSchedules = mockSchedules.filter(item => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return [item.titleVi, item.titleEn, item.dayKey, item.date, item.time, item.teacherVi, item.teacherEn, item.room, item.location]
      .some(field => field.toLowerCase().includes(query));
  });

  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
  });

  const firstScheduleDate = sortedSchedules[0]?.date || new Date().toISOString().slice(0, 10);
  const calendarDays = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(firstScheduleDate, index);
    return {
      date,
      label: formatCalendarDay(date, lang),
      schedules: sortedSchedules.filter(item => item.date === date)
    };
  });

  const getTitle = (item: ScheduleItem) => lang === 'vi' ? item.titleVi : item.titleEn;
  const getTeacher = (item: ScheduleItem) => lang === 'vi' ? item.teacherVi : item.teacherEn;

  const renderScheduleCard = (item: ScheduleItem) => (
    <div 
      key={item.id} 
      className="schedule-class-sticker border-color-blue" 
      style={{ 
        padding: '0.75rem', 
        // Thay minHeight cố định bằng tự động hoặc giảm xuống để flex tốt hơn
        minHeight: 'auto', 
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#F8FAFC', // Layout nền sáng nhẹ để dễ phân biệt card
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        wordBreak: 'break-word' // Giúp text tiếng Anh/Việt dài không bị tràn viền card
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', width: '100%' }}>
        {/* Header của Card: Loại lịch và Giờ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.35rem', alignItems: 'flex-start', width: '100%' }}>
          <span style={{ color: item.type === 'Event' ? '#047857' : '#1D4ED8', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {item.type === 'Event' ? t.event : t.appointment}
          </span>
          <span style={{ color: '#475569', fontWeight: 800, fontSize: '0.7rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
            {item.time}
          </span>
        </div>

        {/* Tiêu đề lịch trình */}
        <h4 style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.3, fontWeight: 800, color: '#1E293B' }}>
          {getTitle(item)}
        </h4>

        {/* Chi tiết Giáo viên & Phòng */}
        <div style={{ color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.75rem', lineHeight: 1.35 }}>
          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <strong>{t.teacher}:</strong> {getTeacher(item)}
          </span>
          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <strong>{t.location}:</strong> {lang === 'vi' ? item.room : item.location} 
            {/* Mẹo nhỏ: Dùng item.room cho tiếng Việt vì mock data của bạn item.location đang lưu text tiếng Anh */}
          </span>
        </div>
      </div>

      {/* Button xem chi tiết được đẩy xuống dưới đáy card */}
      <button
        className="btn-primary"
        type="button"
        style={{ 
          ...actionButtonStyle, 
          padding: '0.3rem 0.45rem', 
          fontSize: '0.75rem',
          alignSelf: 'flex-start', 
          marginTop: '0.6rem',
          width: 'auto'
        }}
        onClick={() => setSelectedItem(item)}
      >
        <EyeIcon />
        <span>{t.details}</span>
      </button>
    </div>
  );

  return (
    <div className="profile-tab-content schedule-tab-wrapper">
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

        <div style={{ flex: 1, minWidth: '240px', maxWidth: '320px' }}>
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
                    {t.empty}
                  </div>
                ) : (
                  day.schedules.map(renderScheduleCard)
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="profile-admin-modal" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0 }}>{getTitle(selectedItem)}</h3>
                <p style={{ margin: '0.4rem 0 0', color: '#64748B' }}>{selectedItem.type === 'Event' ? t.event : t.appointment}</p>
              </div>
              <button className="close-modal" style={actionButtonStyle} onClick={() => setSelectedItem(null)}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body" style={{ paddingTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}><strong>ID:</strong> {selectedItem.id}</div>
              <div style={{ marginBottom: '1rem' }}><strong>{t.type}:</strong> {selectedItem.type === 'Event' ? t.event : t.appointment}</div>
              <div style={{ marginBottom: '1rem' }}><strong>{t.day}:</strong> {dayLabels[lang][selectedItem.dayKey as keyof typeof dayLabels['vi']]}</div>
              <div style={{ marginBottom: '1rem' }}><strong>{t.date}:</strong> {selectedItem.date}</div>
              <div style={{ marginBottom: '1rem' }}><strong>{t.time}:</strong> {selectedItem.time}</div>
              <div style={{ marginBottom: '1rem' }}><strong>{t.teacher}:</strong> {getTeacher(selectedItem)}</div>
              <div style={{ marginBottom: '1rem' }}><strong>{t.room}:</strong> {selectedItem.room}</div>
              <div style={{ marginBottom: '1rem' }}><strong>{t.location}:</strong> {selectedItem.location}</div>
              <div><strong>{t.description}:</strong> {lang === 'vi' ? selectedItem.descriptionVi : selectedItem.descriptionEn}</div>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn-secondary" type="button" style={actionButtonStyle} onClick={() => setSelectedItem(null)}>
                <CloseIcon />
                <span>{t.close}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;
