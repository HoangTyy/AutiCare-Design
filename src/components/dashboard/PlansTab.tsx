import React, { useState } from 'react';
import type { Plan } from './PlanDetailView';

interface PlansTabProps {
  lang: 'vi' | 'en';
  plans: Plan[];
  onManageDetail: (plan: Plan) => void;
  onUpdatePlans: (newPlans: Plan[]) => void;
}

const translations = {
  vi: {
    title: "Kế hoạch Can thiệp",
    searchPlaceholder: "Tìm kiếm kế hoạch...",
    addNew: "Thêm kế hoạch mới",
    id: "ID Kế hoạch",
    name: "Tên Kế hoạch",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    status: "Trạng thái",
    actions: "Thao tác",
    active: "Hoạt động",
    inactive: "Tạm ngưng",
    noResults: "Không tìm thấy kết quả phù hợp",
    createTitle: "Thêm mới Kế hoạch",
    editTitle: "Chỉnh sửa Kế hoạch",
    deleteTitle: "Xác nhận xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa kế hoạch",
    deleteSub: "Hành động này sẽ xóa toàn bộ các giai đoạn, hoạt động liên quan và không thể khôi phục.",
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    create: "Thêm mới",
    confirmDelete: "Xác nhận xóa",
    operationSuccess: "Thao tác thành công!",
    btnDetails: "Chi tiết",
    
    // Form fields
    formName: "Tên Kế hoạch",
    formYear: "Năm học",
    formTool: "Công cụ đánh giá đầu vào",
    formStrengths: "Điểm mạnh của trẻ",
    formWeaknesses: "Điểm yếu của trẻ",
    formInterests: "Sở thích của trẻ",
    formFeedback: "Ý kiến / Phản hồi từ gia đình",
    formStartDate: "Ngày bắt đầu",
    formEndDate: "Ngày kết thúc",
    formStatus: "Trạng thái",
  },
  en: {
    title: "Intervention Plans",
    searchPlaceholder: "Search plans...",
    addNew: "Add New Plan",
    id: "Plan ID",
    name: "Plan Name",
    startDate: "Start Date",
    endDate: "End Date",
    status: "Status",
    actions: "Actions",
    active: "Active",
    inactive: "Inactive",
    noResults: "No matching plans found",
    createTitle: "Create New Plan",
    editTitle: "Edit Plan Info",
    deleteTitle: "Confirm Delete",
    deleteConfirm: "Are you sure you want to delete plan",
    deleteSub: "This action will permanently delete all related phases, activities, and objectives.",
    cancel: "Cancel",
    save: "Save Changes",
    create: "Create",
    confirmDelete: "Confirm Delete",
    operationSuccess: "Operation Successful!",
    btnDetails: "Details",
    
    // Form fields
    formName: "Plan Name",
    formYear: "Academic Year",
    formTool: "Assessment Tool",
    formStrengths: "Child Strengths",
    formWeaknesses: "Child Weaknesses",
    formInterests: "Child Interests",
    formFeedback: "Family Feedback",
    formStartDate: "Start Date",
    formEndDate: "End Date",
    formStatus: "Status",
  }
};

const PlansTab: React.FC<PlansTabProps> = ({
  lang,
  plans,
  onManageDetail,
  onUpdatePlans
}) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');

  const [formTool, setFormTool] = useState('');
  const [formStrengths, setFormStrengths] = useState('');
  const [formWeaknesses, setFormWeaknesses] = useState('');
  const [formInterests, setFormInterests] = useState('');
  const [formFeedback, setFormFeedback] = useState('');
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');


  const openModal = (mode: 'create' | 'edit' | 'delete', plan: Plan | null = null) => {
    setModalMode(mode);
    setSelectedPlan(plan);
    if (plan && (mode === 'edit' || mode === 'delete')) {
      setFormName(plan.plan_name);
      setFormTool(plan.assessment_tool);
      setFormStrengths(plan.child_strengths);
      setFormWeaknesses(plan.child_weaknesses);
      setFormInterests(plan.child_interests);
      setFormFeedback(plan.family_feedback);
      setFormStartDate(plan.start_date);
      setFormEndDate(plan.end_date);
    } else {
      setFormName('');
      setFormTool('');
      setFormStrengths('');
      setFormWeaknesses('');
      setFormInterests('');
      setFormFeedback('');
      setFormStartDate('');
      setFormEndDate('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    if (modalMode === 'create') {
      const newId = plans.length > 0 ? Math.max(...plans.map(p => p.plan_id)) + 1 : 1;
      const newPlan: Plan = {
        plan_id: newId,
        plan_name: formName,
        academic_year: '2025-2026',
        assessment_tool: formTool,
        child_strengths: formStrengths,
        child_weaknesses: formWeaknesses,
        child_interests: formInterests,
        family_feedback: formFeedback,
        start_date: formStartDate,
        end_date: formEndDate,
        status: 'Active',
        center_staff_id: 1, // Default mock staff
        child_id: 1, // Default mock child
        created_at: nowStr,
        updated_at: nowStr,
        phases: []
      };
      onUpdatePlans([...plans, newPlan]);
    } else if (modalMode === 'edit' && selectedPlan) {
      const updated = plans.map(p => p.plan_id === selectedPlan.plan_id ? {
        ...p,
        plan_name: formName,
        assessment_tool: formTool,
        child_strengths: formStrengths,
        child_weaknesses: formWeaknesses,
        child_interests: formInterests,
        family_feedback: formFeedback,
        start_date: formStartDate,
        end_date: formEndDate,
        updated_at: nowStr
      } : p);
      onUpdatePlans(updated);
    } else if (modalMode === 'delete' && selectedPlan) {
      const updated = plans.filter(p => p.plan_id !== selectedPlan.plan_id);
      onUpdatePlans(updated);
    }
    alert(t.operationSuccess);
    closeModal();
  };

  // Filter plans based on search
  const filteredPlans = plans.filter(p => 
    p.plan_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.plan_id.toString().includes(searchTerm)
  );

  return (
    <div className="dashboard-content-area plans-tab-container">
      <style>{`
        .plans-tab-container {
          font-family: "Be Vietnam Pro", sans-serif;
        }

        .plans-tab-container .admin-modal {
          max-width: 960px !important;
          width: min(960px, 95vw) !important;
          max-height: none !important;
        }

        .plans-tab-container .admin-modal.delete-admin-modal {
          max-width: 520px !important;
          width: min(520px, 90vw) !important;
        }

        .plans-tab-container .modal-header {
          border-top-left-radius: 25px !important;
          border-top-right-radius: 25px !important;
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 18px;
        }

        .modal-form-grid .form-group {
          margin-bottom: 0;
        }

        .modal-form-grid .form-group-full {
          grid-column: 1 / -1;
        }

        .modal-form-grid input,
        .modal-form-grid select,
        .modal-form-grid textarea,
        .modal-form-grid .view-detail-text {
          width: 100%;
          box-sizing: border-box;
        }

        /* Table structural classes */
        .plans-tab-container th.col-id {
          width: 120px;
        }

        .plans-tab-container th.col-actions {
          text-align: right;
          width: 150px;
        }

        .plans-tab-container .plan-action-container {
          justify-content: flex-end;
          display: flex;
          gap: 6px;
        }

        .plans-tab-container .empty-row-td {
          text-align: center;
          padding: 3rem;
          color: #94A3B8;
        }

        @media (max-width: 720px) {
          .modal-form-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Bỏ thu nhỏ modal & scroll, hiện đầy đủ các trường cho Tạo/Sửa */
        .plans-tab-container .modal-overlay.modal-edit-mode {
          overflow-y: auto !important;
          align-items: flex-start !important;
          padding: 2.5rem 1rem !important;
          display: flex !important;
        }

        /* Modal xác nhận xóa ngắn: Căn giữa màn hình hoàn hảo */
        .plans-tab-container .modal-overlay.modal-delete-mode {
          overflow-y: hidden !important;
          align-items: center !important;
          padding: 1rem !important;
          display: flex !important;
        }

        .plans-tab-container .modal-body {
          max-height: none !important;
          overflow-y: visible !important;
          padding-right: 2rem !important;
        }
      `}</style>

      {/* HEADER & ACTIONS */}
      <div className="table-header">
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

          <button className="add-btn" onClick={() => openModal('create')}>
            + {t.addNew}
          </button>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="col-id">{t.id}</th>
              <th>{t.name}</th>
              <th>{t.startDate}</th>
              <th>{t.endDate}</th>
              <th>{t.status}</th>
              <th className="col-actions">{t.actions}</th>
            </tr>
          </thead>

          <tbody>
            {filteredPlans.length > 0 ? (
              filteredPlans.map((p) => (
                <tr key={p.plan_id} className="floating-row" onClick={() => onManageDetail(p)}>
                  <td className="id-col">PL-{p.plan_id}</td>
                  <td className="name-col">{p.plan_name}</td>
                  <td>{p.start_date}</td>
                  <td>{p.end_date}</td>
                  <td>
                    <span className={`badge ${p.status.toLowerCase()}`}>
                      {p.status === 'Active' ? t.active : t.inactive}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="action-btns plan-action-container">
                      {/* Nút Xem chi tiết */}
                      <button
                        className="view-btn-v2"
                        title={t.btnDetails}
                        onClick={() => onManageDetail(p)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      </button>

<button
                      className="edit-btn-v2"
                      title={t.editTitle}
                      onClick={() => openModal('edit', p)}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </button>

                      {/* Nút Xóa */}
                      <button
                        className="delete-btn-v2"
                        title={t.deleteTitle}
                        onClick={() => openModal('delete', p)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="empty-row-td">
                  {t.noResults}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* POPUP MODAL */}
      {isModalOpen && (
        <div className={`modal-overlay ${modalMode === 'delete' ? 'modal-delete-mode' : 'modal-edit-mode'}`}>
          <div className={`admin-modal animate-in ${modalMode === 'delete' ? 'delete-admin-modal' : ''}`}>
            <div className="modal-header">
              <h3>
                {modalMode === 'create' && t.createTitle}
                {modalMode === 'edit' && t.editTitle}
                {modalMode === 'delete' && t.deleteTitle}
              </h3>

              <button className="close-modal" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                {modalMode === 'delete' ? (
                  <div className="delete-confirm">
                    <div className="warning-icon">⚠️</div>
                    <p>
                      {t.deleteConfirm} "{selectedPlan?.plan_name}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                ) : (
                  <div className="modal-form modal-form-grid">
                    <div className="form-group form-group-full">
                      <label>{t.formName}</label>
                      <input
                        required
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label>{t.formTool}</label>
                      <select
                        value={formTool}
                        onChange={(e) => setFormTool(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '2px solid #1E293B',
                          background: '#FFFFFF',
                          fontFamily: '"Be Vietnam Pro", sans-serif',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: '#1E293B',
                          boxShadow: 'inset 2px 2px 0px rgba(0, 0, 0, 0.05)',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">-- {lang === 'vi' ? 'Chọn công cụ đánh giá' : 'Select Assessment Tool'} --</option>
                        <option value="PEP-3">PEP-3</option>
                        <option value="M-CHAT-R/F">M-CHAT-R/F</option>
                        <option value="CARS">CARS</option>
                        <option value="ASQ-3">ASQ-3</option>
                        <option value="GARS-3">GARS-3</option>
                        <option value="Other">{lang === 'vi' ? 'Khác / Khác' : 'Other'}</option>
                      </select>
                    </div>

                    <div className="form-group form-group-full">
                      <label>{t.formStrengths}</label>
                      <textarea
                        rows={3}
                        value={formStrengths}
                        onChange={(e) => setFormStrengths(e.target.value)}
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label>{t.formWeaknesses}</label>
                      <textarea
                        rows={3}
                        value={formWeaknesses}
                        onChange={(e) => setFormWeaknesses(e.target.value)}
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label>{t.formInterests}</label>
                      <textarea
                        rows={3}
                        value={formInterests}
                        onChange={(e) => setFormInterests(e.target.value)}
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label>{t.formFeedback}</label>
                      <textarea
                        rows={3}
                        value={formFeedback}
                        onChange={(e) => setFormFeedback(e.target.value)}
                        spellCheck="false"
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.formStartDate}</label>
                      <input
                        required
                        type="date"
                        value={formStartDate}
                        onChange={(e) => setFormStartDate(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.formEndDate}</label>
                      <input
                        required
                        type="date"
                        value={formEndDate}
                        onChange={(e) => setFormEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  {t.cancel}
                </button>

                <button
                  type="submit"
                  className={`btn-primary ${modalMode === 'delete' ? 'btn-danger' : ''}`}
                >
                  {modalMode === 'delete'
                    ? t.confirmDelete
                    : modalMode === 'create'
                      ? t.create
                      : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansTab;
