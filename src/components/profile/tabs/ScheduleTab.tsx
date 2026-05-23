import React from 'react';

interface ScheduleTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Thời khóa biểu Can thiệp tuần",
    subtitle: "Theo dõi các buổi trị liệu hành vi, ngôn ngữ hoặc tâm vận động của con em trong tuần tại trung tâm",
    monday: "Thứ Hai",
    tuesday: "Thứ Ba",
    wednesday: "Thứ Tư",
    thursday: "Thứ Năm",
    friday: "Thứ Sáu",
    saturday: "Thứ Bảy",
    sessionName: "Nội dung học",
    time: "Thời gian",
    teacher: "Giáo viên can thiệp",
    room: "Phòng học",
    noData: "Không có ca học nào được xếp lịch."
  },
  en: {
    title: "Weekly Intervention Schedule",
    subtitle: "Track behavioral, speech, or behavioral therapy sessions of your child during the week at our center",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sessionName: "Session Name",
    time: "Time",
    teacher: "Intervention Teacher",
    room: "Room",
    noData: "No sessions scheduled."
  }
};

const MOCK_SCHEDULES = [
  {
    day: "monday",
    sessions: [
      {
        time: "08:30 - 10:00",
        nameVi: "Trị liệu Hành vi ABA Sớm (ABA - Cá nhân 1:1)",
        nameEn: "Early ABA Behavioral Therapy (ABA - Individual 1:1)",
        teacherVi: "Cô Lê Thị Thanh Nhàn",
        teacherEn: "Ms. Le Thi Thanh Nhan",
        room: "Room 203",
        color: "color-violet"
      },
      {
        time: "15:00 - 16:30",
        nameVi: "Trị liệu Ngôn ngữ & Âm lời nói (Speech Therapy)",
        nameEn: "Speech & Language Therapy (Speech Therapy)",
        teacherVi: "ThS. Cô Nguyễn Lan Vy",
        teacherEn: "Ms. Nguyen Lan Vy, MSc",
        room: "Speech Room A",
        color: "color-pink"
      }
    ]
  },
  {
    day: "wednesday",
    sessions: [
      {
        time: "08:30 - 10:00",
        nameVi: "Trị liệu Hành vi ABA Sớm (ABA - Cá nhân 1:1)",
        nameEn: "Early ABA Behavioral Therapy (ABA - Individual 1:1)",
        teacherVi: "Cô Lê Thị Thanh Nhàn",
        teacherEn: "Ms. Le Thi Thanh Nhan",
        room: "Room 203",
        color: "color-violet"
      },
      {
        time: "10:15 - 11:45",
        nameVi: "Tâm vận động & Điều hòa Cảm giác (Occupational Therapy)",
        nameEn: "Sensory Integration & Occupational Therapy",
        teacherVi: "Thầy Hoàng Văn Đức",
        teacherEn: "Mr. Hoang Van Duc",
        room: "Gym Room B",
        color: "color-amber"
      }
    ]
  },
  {
    day: "friday",
    sessions: [
      {
        time: "08:30 - 10:00",
        nameVi: "Trị liệu Hành vi ABA Sớm (ABA - Cá nhân 1:1)",
        nameEn: "Early ABA Behavioral Therapy (ABA - Individual 1:1)",
        teacherVi: "Cô Lê Thị Thanh Nhàn",
        teacherEn: "Ms. Le Thi Thanh Nhan",
        room: "Room 203",
        color: "color-violet"
      },
      {
        time: "15:00 - 16:30",
        nameVi: "Trị liệu Ngôn ngữ & Âm lời nói (Speech Therapy)",
        nameEn: "Speech & Language Therapy (Speech Therapy)",
        teacherVi: "ThS. Cô Nguyễn Lan Vy",
        teacherEn: "Ms. Nguyen Lan Vy, MSc",
        room: "Speech Room A",
        color: "color-pink"
      }
    ]
  },
  {
    day: "saturday",
    sessions: [
      {
        time: "09:00 - 11:00",
        nameVi: "Hành vi Xã hội Nhóm Nhỏ (Social Skills Group - 4 trẻ)",
        nameEn: "Small Group Social Skills (Social Skills Group - 4 kids)",
        teacherVi: "Cô Lê Thị Thanh Nhàn & Thầy Đức",
        teacherEn: "Ms. Le Thi Thanh Nhan & Mr. Duc",
        room: "Group Play Room",
        color: "color-mint"
      }
    ]
  }
];

const ScheduleTab: React.FC<ScheduleTabProps> = ({ lang }) => {
  const t = translations[lang];

  const getDayLabel = (dayKey: string) => {
    switch (dayKey) {
      case 'monday': return t.monday;
      case 'tuesday': return t.tuesday;
      case 'wednesday': return t.wednesday;
      case 'thursday': return t.thursday;
      case 'friday': return t.friday;
      default: return t.saturday;
    }
  };

  return (
    <div className="profile-tab-content">
      <div className="tab-section-header">
        <h2 className="tab-section-title">📅 {t.title}</h2>
        <p className="tab-section-subtitle">{t.subtitle}</p>
      </div>

      {/* Weekly Schedule Timeline */}
      <div className="weekly-schedule-timeline">
        {MOCK_SCHEDULES.map((daySchedule, idx) => (
          <div 
            key={daySchedule.day} 
            className="schedule-day-row"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="schedule-day-label-box">
              <span className="schedule-day-name">{getDayLabel(daySchedule.day)}</span>
            </div>
            
            <div className="schedule-sessions-list">
              {daySchedule.sessions.map((session, sIdx) => (
                <div 
                  key={sIdx} 
                  className={`profile-sticker-card schedule-session-card ${session.color}`}
                  style={{ transform: `rotate(${(sIdx % 2 === 0 ? 0.2 : -0.2)}deg)` }}
                >
                  <div className="session-card-time">⏰ {session.time}</div>
                  
                  <h4 className="session-card-title">
                    {lang === 'vi' ? session.nameVi : session.nameEn}
                  </h4>
                  
                  <div className="session-card-details">
                    <span className="session-teacher">👤 {lang === 'vi' ? session.teacherVi : session.teacherEn}</span>
                    <span className="session-room">📍 {session.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTab;
