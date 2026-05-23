import React from 'react';

interface ScheduleClass {
  id: string;
  day: string;
  time: string;
  childName: string;
  activity: string;
  room: string;
  method: 'online' | 'offline';
  color: 'violet' | 'pink' | 'amber' | 'blue';
}

const translations = {
  vi: {
    title: "Thời khóa biểu can thiệp trong tuần",
    subtitle: "Theo dõi các ca trị liệu cố định và khung giờ huấn luyện trẻ chuyên biệt của bạn",
    mon: "Thứ Hai",
    tue: "Thứ Ba",
    wed: "Thứ Tư",
    thu: "Thứ Năm",
    fri: "Thứ Sáu",
    sat: "Thứ Bảy",
    sun: "Chủ Nhật",
    room: "Phòng học / Link",
    methodOnline: "💻 Trực tuyến",
    methodOffline: "🏫 Trực tiếp",
    activityABA: "Trị liệu hành vi ABA",
    activitySpeech: "Trị liệu Ngôn ngữ & Giao tiếp",
    activityPhysio: "Trị liệu Tâm vận động & Cảm giác",
    activityClinical: "Chẩn đoán lâm sàng đầu vào",
    btnSync: "🔄 Đồng bộ lịch Google Calendar",
    toastSync: "✨ Lịch làm việc đã được đồng bộ hóa với Google Calendar thành công!"
  },
  en: {
    title: "Weekly Intervention Schedule",
    subtitle: "Track your fixed therapy sessions and clinical assessment slots for children",
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
    room: "Room / Link",
    methodOnline: "💻 Online",
    methodOffline: "🏫 Direct",
    activityABA: "ABA Behavioral Therapy",
    activitySpeech: "Speech & Communication Therapy",
    activityPhysio: "Sensory & Psychomotor Therapy",
    activityClinical: "Clinical Intake Assessment",
    btnSync: "🔄 Sync with Google Calendar",
    toastSync: "✨ Weekly schedule synced with Google Calendar successfully!"
  }
};

const MOCK_CLASSES: ScheduleClass[] = [
  {
    id: "CLS-01",
    day: "Thứ Hai / Monday",
    time: "08:00 - 09:30",
    childName: "Bé Trần Gia Bảo",
    activity: "ABA",
    room: "Phòng Trị Liệu ABA A01",
    method: "offline",
    color: "violet"
  },
  {
    id: "CLS-02",
    day: "Thứ Hai / Monday",
    time: "10:00 - 11:30",
    childName: "Bé Đỗ Hoàng Hải",
    activity: "Speech",
    room: "Phòng Âm Nhạc & Giao Tiếp S03",
    method: "offline",
    color: "pink"
  },
  {
    id: "CLS-03",
    day: "Thứ Tư / Wednesday",
    time: "14:00 - 15:30",
    childName: "Bé Phan Khánh Ngọc",
    activity: "ABA",
    room: "Google Meet Room B",
    method: "online",
    color: "violet"
  },
  {
    id: "CLS-04",
    day: "Thứ Năm / Thursday",
    time: "09:00 - 10:30",
    childName: "Bé Phạm Minh Đăng",
    activity: "Physio",
    room: "Phòng Vận Động Cảm Giác P02",
    method: "offline",
    color: "amber"
  },
  {
    id: "CLS-05",
    day: "Thứ Sáu / Friday",
    time: "15:00 - 16:30",
    childName: "Bé Bùi Đức Anh",
    activity: "Speech",
    room: "Phòng Âm Nhạc & Giao Tiếp S03",
    method: "offline",
    color: "pink"
  },
  {
    id: "CLS-06",
    day: "Thứ Bảy / Saturday",
    time: "08:30 - 10:30",
    childName: "Ca đánh giá lâm sàng mới",
    activity: "Clinical",
    room: "Phòng Quan Sát Chẩn Đoán L02",
    method: "offline",
    color: "blue"
  }
];

const StaffScheduleTab: React.FC<{ lang: 'vi' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  const [showToast, setShowToast] = React.useState(false);

  const handleSyncClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getDaysArray = () => {
    return lang === 'vi' 
      ? [t.mon, t.tue, t.wed, t.thu, t.fri, t.sat, t.sun]
      : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  };

  const days = getDaysArray();

  return (
    <div className="schedule-tab-wrapper staff-schedule-wrapper">
      
      {/* Toast Sync Alert */}
      {showToast && (
        <div className="profile-toast-message shadow-bounce">
          <span className="profile-toast-icon">📅</span>
          <span className="profile-toast-text">{t.toastSync}</span>
        </div>
      )}

      {/* Title */}
      <div className="schedule-header-zone">
        <div className="schedule-title-block">
          <h2 className="schedule-tab-title">{t.title}</h2>
          <p className="schedule-tab-subtitle">{t.subtitle}</p>
        </div>
        
        <button 
          type="button" 
          className="schedule-sync-btn"
          onClick={handleSyncClick}
        >
          {t.btnSync}
        </button>
      </div>

      {/* Memphis Weekly Timeline Columns Grid */}
      <div className="weekly-columns-grid">
        {days.map((dayName, idx) => {
          // Lọc các ca trong ngày đó
          const classesInDay = MOCK_CLASSES.filter(c => {
            if (lang === 'vi') {
              return c.day.includes(dayName);
            } else {
              return c.day.toLowerCase().includes(dayName.toLowerCase());
            }
          });

          return (
            <div key={dayName} className="weekly-day-column">
              
              {/* Day Header Banner */}
              <div className={`weekly-day-header day-color-${idx}`}>
                <span className="day-name">{dayName}</span>
                <span className="day-classes-count-badge">
                  {classesInDay.length}
                </span>
              </div>

              {/* Day Content: Slots List */}
              <div className="weekly-day-slots-list">
                {classesInDay.length === 0 ? (
                  <div className="weekly-day-empty-slot">
                    <span className="empty-slot-icon">☕</span>
                    <span className="empty-slot-text">{lang === 'vi' ? 'Không có ca học' : 'No sessions'}</span>
                  </div>
                ) : (
                  classesInDay.map((cls) => (
                    <div key={cls.id} className={`schedule-class-sticker border-color-${cls.color}`}>
                      
                      {/* Accent strip */}
                      <div className={`class-accent-strip bg-color-${cls.color}`}></div>

                      <div className="class-header">
                        <span className="class-time">⏰ {cls.time}</span>
                        <span className={`class-method-badge type-${cls.method}`}>
                          {cls.method === 'online' ? t.methodOnline : t.methodOffline}
                        </span>
                      </div>

                      <h4 className="class-child-name">{cls.childName}</h4>
                      
                      <div className="class-activity-badge">
                        {cls.activity === 'ABA' && t.activityABA}
                        {cls.activity === 'Speech' && t.activitySpeech}
                        {cls.activity === 'Physio' && t.activityPhysio}
                        {cls.activity === 'Clinical' && t.activityClinical}
                      </div>

                      <div className="class-room-info">
                        <strong>{t.room}:</strong>
                        <p className="room-val text-ellipsis">{cls.room}</p>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default StaffScheduleTab;
