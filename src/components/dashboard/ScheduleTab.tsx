import React, { useState } from 'react';

// Database Schema Mock
interface AppointmentSlot {
  appointment_slot_id: number;
  staff_id: string;
  location_type: string; // 'Online' | 'Offline'
  start_time: string; // datetime string
  end_time: string; // datetime string
  status: string; // 'Available' | 'Booked'
}

interface ScheduleTabProps {
  lang: 'vi' | 'en';
}

const mockAppointmentSlots: AppointmentSlot[] = [
  { appointment_slot_id: 1, staff_id: 'S-001', location_type: 'Offline', start_time: '2026-05-25T09:15', end_time: '2026-05-25T10:15', status: 'Available' },
  { appointment_slot_id: 2, staff_id: 'S-001', location_type: 'Online', start_time: '2026-05-26T14:00', end_time: '2026-05-26T15:00', status: 'Booked' },
];

const ScheduleTab: React.FC<ScheduleTabProps> = ({ lang }) => {
  const [slots, setSlots] = useState<AppointmentSlot[]>(mockAppointmentSlots);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlot, setNewSlot] = useState<Partial<AppointmentSlot>>({
    location_type: 'Offline',
    status: 'Available'
  });

  const translations = {
    vi: {
      title: "Quản lý Lịch khám",
      addSlot: "Tạo Khung giờ mới",
      id: "ID",
      staff: "Bác sĩ",
      location: "Hình thức",
      startTime: "Bắt đầu",
      endTime: "Kết thúc",
      status: "Trạng thái",
      actions: "Thao tác",
      booked: "Đã đặt (Booked)",
      available: "Trống (Available)",
      formTitle: "Thêm Khung giờ trống",
      save: "Tạo lịch",
      cancel: "Hủy",
      deleteConfirm: "Không thể xóa khung giờ đã có người đặt!"
    },
    en: {
      title: "Manage Appointments",
      addSlot: "Create New Slot",
      id: "ID",
      staff: "Doctor",
      location: "Type",
      startTime: "Start Time",
      endTime: "End Time",
      status: "Status",
      actions: "Actions",
      booked: "Booked",
      available: "Available",
      formTitle: "Add Available Slot",
      save: "Create Slot",
      cancel: "Cancel",
      deleteConfirm: "Cannot delete a booked slot!"
    }
  };

  const t = translations[lang];

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const createdSlot: AppointmentSlot = {
      ...(newSlot as AppointmentSlot),
      appointment_slot_id: slots.length > 0 ? Math.max(...slots.map(s => s.appointment_slot_id)) + 1 : 1,
    };
    setSlots([...slots, createdSlot]);
    setIsModalOpen(false);
  };

  const handleDeleteSlot = (slotId: number) => {
    const slot = slots.find(s => s.appointment_slot_id === slotId);
    if (slot && slot.status === 'Booked') {
      alert(t.deleteConfirm);
      return;
    }
    setSlots(slots.filter(s => s.appointment_slot_id !== slotId));
  };

  const formatDateTime = (dt: string) => {
    return new Date(dt).toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-content-area">
      <div className="table-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="table-title">{t.title}</h2>
        <div className="table-actions">
          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            + {t.addSlot}
          </button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t.id}</th>
              <th>{t.staff}</th>
              <th>{t.location}</th>
              <th>{t.startTime}</th>
              <th>{t.endTime}</th>
              <th>{t.status}</th>
              <th style={{ textAlign: 'right' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {slots.map(slot => (
              <tr key={slot.appointment_slot_id}>
                <td className="id-col">{slot.appointment_slot_id}</td>
                <td className="font-mono text-sm">{slot.staff_id}</td>
                <td>{slot.location_type}</td>
                <td style={{ fontWeight: 600, color: '#0F172A' }}>{formatDateTime(slot.start_time)}</td>
                <td style={{ fontWeight: 600, color: '#0F172A' }}>{formatDateTime(slot.end_time)}</td>
                <td>
                  <span className={`badge-status ${slot.status === 'Available' ? 'available' : 'booked'}`}>
                    {slot.status === 'Available' ? t.available : t.booked}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="delete-btn-v2" 
                    title="Delete" 
                    onClick={() => handleDeleteSlot(slot.appointment_slot_id)}
                    style={{ opacity: slot.status === 'Booked' ? 0.5 : 1, cursor: slot.status === 'Booked' ? 'not-allowed' : 'pointer' }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal animate-in" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>{t.formTitle}</h3>
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSaveSlot}>
              <div className="modal-body">
                <div className="form-group">
                  <label>{t.staff} (ID)</label>
                  <input type="text" required value={newSlot.staff_id || ''} onChange={e => setNewSlot({...newSlot, staff_id: e.target.value})} placeholder="S-001" />
                </div>
                <div className="form-group">
                  <label>{t.location}</label>
                  <select value={newSlot.location_type} onChange={e => setNewSlot({...newSlot, location_type: e.target.value})}>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t.startTime}</label>
                  <input type="datetime-local" required value={newSlot.start_time || ''} onChange={e => setNewSlot({...newSlot, start_time: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>{t.endTime}</label>
                  <input type="datetime-local" required value={newSlot.end_time || ''} onChange={e => setNewSlot({...newSlot, end_time: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>{t.cancel}</button>
                <button type="submit" className="btn-primary">{t.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;
