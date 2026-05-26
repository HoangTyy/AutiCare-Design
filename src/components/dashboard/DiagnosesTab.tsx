import React, { useMemo, useState } from 'react';

export interface DiagnosisRecord {
  diagnose_result_id: number;
  staff_id?: string;
  child_id?: number;
  child_name: string;
  diagnosis_place: string;
  age_at_diagnosis: string;
  doctor_answers: string;
  diagnosis_content: string;
  recommendation: string;
  confirmation_code: string;
  evidence_file_url: string;
  diagnostic_date: string;
  external_doctor_name: string;
  conclusion: string;
  status: 'Pending' | 'Reviewed' | 'Completed';
  created_at: string;
  updated_at: string;
}

const MOCK_DIAGNOSES: DiagnosisRecord[] = [
  {
    diagnose_result_id: 1,
    staff_id: 'S-001',
    child_id: 101,
    child_name: 'Nguyễn Minh Khôi',
    diagnosis_place: 'Phòng khám AutiCare Saigon',
    age_at_diagnosis: '4 tuổi 2 tháng',
    doctor_answers: 'Chú ý thái độ giao tiếp ít, cần quan sát thêm khi tương tác với người lạ.',
    diagnosis_content: 'ASD mức độ vừa, khó khăn về ngôn ngữ và tương tác xã hội.',
    recommendation: 'Tăng cường can thiệp ngôn ngữ, mô phỏng tình huống giao tiếp gia đình.',
    confirmation_code: 'DX-AP-2026-001',
    evidence_file_url: 'https://example.com/evidence/1.pdf',
    diagnostic_date: '2026-05-10T09:00:00',
    external_doctor_name: 'Dr. Nguyễn Văn A',
    conclusion: 'Kết luận: ASD Moderate, cần can thiệp sớm.',
    status: 'Completed',
    created_at: '2026-05-10T10:15:00',
    updated_at: '2026-05-10T12:00:00'
  },
  {
    diagnose_result_id: 2,
    staff_id: 'S-002',
    child_id: 102,
    child_name: 'Trần Đức Nam',
    diagnosis_place: 'Phòng khám AutiCare Hanoi',
    age_at_diagnosis: '3 tuổi 8 tháng',
    doctor_answers: 'Cần thu thập thêm dữ liệu hành vi tại nhà và trường.',
    diagnosis_content: 'Nghi ngờ ASD, chưa đủ dữ liệu chẩn đoán chính thức.',
    recommendation: 'Tiếp tục quan sát và đánh giá bổ sung trong 4 tuần tới.',
    confirmation_code: 'DX-AP-2026-002',
    evidence_file_url: 'https://example.com/evidence/2.pdf',
    diagnostic_date: '2026-05-17T14:30:00',
    external_doctor_name: 'Dr. Lê Thị B',
    conclusion: 'Chưa xác định cuối cùng, cần đánh giá thêm.',
    status: 'Pending',
    created_at: '2026-05-17T15:20:00',
    updated_at: '2026-05-17T15:20:00'
  },
  {
    diagnose_result_id: 3,
    staff_id: 'S-003',
    child_id: 103,
    child_name: 'Lê Thị Bảo',
    diagnosis_place: 'Phòng khám AutiCare Danang',
    age_at_diagnosis: '5 tuổi 1 tháng',
    doctor_answers: 'Cần tập trung vào kỹ năng tự phục vụ và xử lý kích thích giác quan.',
    diagnosis_content: 'Xu hướng ASD nhẹ, trì hoãn ngôn ngữ và hành vi lặp lại.',
    recommendation: 'Thực hiện can thiệp hành vi nhận thức và giáo dục cảm xúc.',
    confirmation_code: 'DX-AP-2026-003',
    evidence_file_url: 'https://example.com/evidence/3.pdf',
    diagnostic_date: '2026-05-20T11:00:00',
    external_doctor_name: 'Dr. Phạm Văn C',
    conclusion: 'ASD nhẹ, cần theo dõi và can thiệp các kỹ năng giao tiếp.',
    status: 'Reviewed',
    created_at: '2026-05-20T13:45:00',
    updated_at: '2026-05-20T13:45:00'
  }
];

interface DiagnosisTabProps {
  lang: 'vi' | 'en';
}

const DiagnosisTab: React.FC<DiagnosisTabProps> = ({ lang }) => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisRecord[]>(MOCK_DIAGNOSES);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisRecord | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formChildName, setFormChildName] = useState('');
  const [formPlace, setFormPlace] = useState('');
  const [formAgeAtDiagnosis, setFormAgeAtDiagnosis] = useState('');
  const [formDoctorAnswers, setFormDoctorAnswers] = useState('');
  const [formDiagnosisContent, setFormDiagnosisContent] = useState('');
  const [formRecommendation, setFormRecommendation] = useState('');
  const [formConfirmationCode, setFormConfirmationCode] = useState('');
  const [formEvidenceFile, setFormEvidenceFile] = useState<File | null>(null);
  const [formExternalDoctorName, setFormExternalDoctorName] = useState('');
  const [formConclusion, setFormConclusion] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formStatus, setFormStatus] = useState<DiagnosisRecord['status']>('Pending');

  const t = useMemo(() => ({
    vi: {
      title: 'Quản lý Chẩn đoán',
      searchPlaceholder: 'Tìm theo tên trẻ, công cụ hoặc kết luận...',
      id: 'Mã chẩn đoán',
      child: 'Tên trẻ',
      date: 'Ngày chẩn đoán',
      tool: 'Công cụ đánh giá',
      place: 'Nơi chẩn đoán',
      status: 'Trạng thái',
      actions: 'Thao tác',
      viewDetails: 'Chi tiết',
      addNew: 'Thêm chẩn đoán mới',
      modalTitle: 'Chi tiết chẩn đoán',
      createTitle: 'Tạo chẩn đoán mới',
      childName: 'Tên trẻ',
      diagnosisDate: 'Ngày chẩn đoán',
      diagnosisPlace: 'Nơi chẩn đoán',
      ageAtDiagnosis: 'Tuổi khi chẩn đoán',
      doctorAnswers: 'Phản hồi bác sĩ',
      diagnosisContent: 'Nội dung chẩn đoán',
      recommendation: 'Khuyến nghị',
      confirmationCode: 'Mã xác nhận',
      evidenceUrl: 'Tệp bằng chứng',
      externalDoctorName: 'Bác sĩ ngoài',
      conclusion: 'Kết luận',
      createdAt: 'Tạo lúc',
      updatedAt: 'Cập nhật',
      cancel: 'Hủy',
      save: 'Lưu',
      noResults: 'Không tìm thấy chẩn đoán phù hợp',
      emptyList: 'Hiện chưa có chẩn đoán nào. Hãy tạo mới.',
      createdSuccess: 'Chẩn đoán mới đã được tạo.',
      close: 'Đóng'
    },
    en: {
      title: 'Manage Diagnoses',
      searchPlaceholder: 'Search by child, tool or conclusion...',
      id: 'ID',
      child: 'Child Name',
      date: 'Diagnosis Date',
      place: 'Diagnosis Place',
      status: 'Status',
      actions: 'Actions',
      viewDetails: 'Details',
      addNew: 'Add Diagnosis',
      modalTitle: 'Diagnosis Details',
      createTitle: 'Create New Diagnosis',
      childName: 'Child Name',
      diagnosisDate: 'Diagnosis Date',
      diagnosisPlace: 'Diagnosis Place',
      ageAtDiagnosis: 'Age at Diagnosis',
      doctorAnswers: 'Doctor Answers',
      diagnosisContent: 'Diagnosis Content',
      recommendation: 'Recommendation',
      confirmationCode: 'Confirmation Code',
      evidenceUrl: 'Evident file',
      externalDoctorName: 'External Doctor',
      conclusion: 'Conclusion',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
      cancel: 'Cancel',
      save: 'Save',
      noResults: 'No diagnoses found',
      emptyList: 'No diagnoses available yet. Create one now.',
      createdSuccess: 'New diagnosis created.',
      close: 'Close'
    }
  } as const)[lang], [lang]);

  const filteredDiagnoses = diagnoses.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.child_name.toLowerCase().includes(term) ||
      item.diagnosis_place.toLowerCase().includes(term) ||
      item.conclusion.toLowerCase().includes(term) ||
      item.diagnose_result_id.toString().includes(term)
    );
  });

  const resetForm = () => {
    setFormChildName('');
    setFormPlace('');
    setFormAgeAtDiagnosis('');
    setFormDoctorAnswers('');
    setFormDiagnosisContent('');
    setFormRecommendation('');
    setFormConfirmationCode('');
    setFormEvidenceFile(null);
    setFormExternalDoctorName('');
    setFormConclusion('');
    setFormDate('');
    setFormStatus('Pending');
  };

  const handleCreateDiagnosis = (event: React.FormEvent) => {
    event.preventDefault();
    const now = new Date().toISOString();
    const newDiagnosis: DiagnosisRecord = {
      diagnose_result_id: diagnoses.length > 0 ? Math.max(...diagnoses.map(d => d.diagnose_result_id)) + 1 : 1,
      staff_id: undefined,
      child_id: undefined,
      child_name: formChildName.trim() || 'Unknown Child',
      diagnosis_place: formPlace || 'AutiCare Clinic',
      age_at_diagnosis: formAgeAtDiagnosis || 'Unknown',
      doctor_answers: formDoctorAnswers || '',
      diagnosis_content: formDiagnosisContent || 'No details provided',
      recommendation: formRecommendation || '',
      confirmation_code: formConfirmationCode || `DX-${Date.now()}`,
      evidence_file_url: formEvidenceFile ? URL.createObjectURL(formEvidenceFile) : '',
      diagnostic_date: formDate ? `${formDate}T09:00:00` : now,
      external_doctor_name: formExternalDoctorName || '',
      conclusion: formConclusion || '',
      status: formStatus,
      created_at: now,
      updated_at: now
    };

    setDiagnoses(prev => [newDiagnosis, ...prev]);
    resetForm();
    setIsCreateOpen(false);
    alert(t.createdSuccess);
  };

  return (
    <div className="dashboard-content-area">
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
          <button className="add-btn" onClick={() => setIsCreateOpen(true)}>
            + {t.addNew}
          </button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>{t.id}</th>
              <th style={{ width: '20%' }}> {t.child}</th>
              <th style={{ width: '20%' }}>{t.place}</th>
              <th style={{ width: '30%' }}>{t.date}</th>
              <th style={{ width: '10%' }}>{t.status}</th>
              <th style={{ width: '10%' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredDiagnoses.length > 0 ? (
              filteredDiagnoses.map((diagnosis) => (
                <tr key={diagnosis.diagnose_result_id} style={{ cursor: 'pointer' }}>
                  <td className="id-col" style={{ width: '10%' }}>#{diagnosis.diagnose_result_id}</td>
                  <td className="name-col" style={{ width: '20%' }}>{diagnosis.child_name}</td>
                  <td style={{ width: '20%' }}>{diagnosis.diagnosis_place}</td>
                  <td style={{ width: '30%' }}>{new Date(diagnosis.diagnostic_date).toLocaleDateString()}</td>
                  <td style={{ width: '10%' }}>{diagnosis.status}</td>
                  <td style={{ width: '10%', textAlign: 'right' }}>
                    <button
                      className="btn-secondary"
                      style={{ padding: '6px 12px' }}
                      onClick={() => setSelectedDiagnosis(diagnosis)}
                    >
                      {t.viewDetails}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                  {searchTerm ? t.noResults : t.emptyList}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(selectedDiagnosis || isCreateOpen) && (
        <div className="modal-overlay">
          <div className="admin-modal animate-in" style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <div>
                <h3>{selectedDiagnosis ? t.modalTitle : t.createTitle}</h3>
              </div>
              <button className="close-modal" onClick={() => {
                setSelectedDiagnosis(null);
                setIsCreateOpen(false);
              }}>×</button>
            </div>
            <div className="modal-body">
              {selectedDiagnosis ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div><strong>{t.childName}:</strong> {selectedDiagnosis.child_name}</div>
                  <div><strong>{t.diagnosisDate}:</strong> {new Date(selectedDiagnosis.diagnostic_date).toLocaleString()}</div>
                  <div><strong>{t.diagnosisPlace}:</strong> {selectedDiagnosis.diagnosis_place}</div>
                  <div><strong>{t.ageAtDiagnosis}:</strong> {selectedDiagnosis.age_at_diagnosis}</div>
                  <div><strong>{t.externalDoctorName}:</strong> {selectedDiagnosis.external_doctor_name || '-'}</div>
                  <div><strong>{t.status}:</strong> {selectedDiagnosis.status}</div>
                  <div><strong>{t.doctorAnswers}:</strong></div>
                  <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1rem', lineHeight: 1.7 }}>
                    {selectedDiagnosis.doctor_answers || '-'}
                  </div>
                  <div><strong>{t.diagnosisContent}:</strong></div>
                  <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1rem', lineHeight: 1.7 }}>
                    {selectedDiagnosis.diagnosis_content || '-'}
                  </div>
                  <div><strong>{t.recommendation}:</strong></div>
                  <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1rem', lineHeight: 1.7 }}>
                    {selectedDiagnosis.recommendation || '-'}
                  </div>
                  <div><strong>{t.conclusion}:</strong> {selectedDiagnosis.conclusion || '-'}</div>
                  <div><strong>{t.confirmationCode}:</strong> {selectedDiagnosis.confirmation_code || '-'}</div>
                  <div><strong>{t.evidenceUrl}:</strong> {selectedDiagnosis.evidence_file_url ? <a href={selectedDiagnosis.evidence_file_url} target="_blank" rel="noreferrer">Link</a> : '-'}</div>
                  <div><strong>{t.createdAt}:</strong> {new Date(selectedDiagnosis.created_at).toLocaleString()}</div>
                  <div><strong>{t.updatedAt}:</strong> {new Date(selectedDiagnosis.updated_at).toLocaleString()}</div>
                </div>
              ) : (
                <form className="modal-form" onSubmit={handleCreateDiagnosis}>
                  <div className="form-group">
                    <label>{t.childName}</label>
                    <input
                      type="text"
                      value={formChildName}
                      onChange={(e) => setFormChildName(e.target.value)}
                      placeholder={t.childName}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.diagnosisDate}</label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.diagnosisPlace}</label>
                    <input
                      type="text"
                      value={formPlace}
                      onChange={(e) => setFormPlace(e.target.value)}
                      placeholder={t.diagnosisPlace}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.ageAtDiagnosis}</label>
                    <input
                      type="text"
                      value={formAgeAtDiagnosis}
                      onChange={(e) => setFormAgeAtDiagnosis(e.target.value)}
                      placeholder={t.ageAtDiagnosis}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.externalDoctorName}</label>
                    <input
                      type="text"
                      value={formExternalDoctorName}
                      onChange={(e) => setFormExternalDoctorName(e.target.value)}
                      placeholder={t.externalDoctorName}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.diagnosisContent}</label>
                    <textarea
                      value={formDiagnosisContent}
                      onChange={(e) => setFormDiagnosisContent(e.target.value)}
                      placeholder={t.diagnosisContent}
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.doctorAnswers}</label>
                    <textarea
                      value={formDoctorAnswers}
                      onChange={(e) => setFormDoctorAnswers(e.target.value)}
                      placeholder={t.doctorAnswers}
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.recommendation}</label>
                    <textarea
                      value={formRecommendation}
                      onChange={(e) => setFormRecommendation(e.target.value)}
                      placeholder={t.recommendation}
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.conclusion}</label>
                    <textarea
                      value={formConclusion}
                      onChange={(e) => setFormConclusion(e.target.value)}
                      placeholder={t.conclusion}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.confirmationCode}</label>
                    <input
                      type="text"
                      value={formConfirmationCode}
                      onChange={(e) => setFormConfirmationCode(e.target.value)}
                      placeholder={t.confirmationCode}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.evidenceUrl}</label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => setFormEvidenceFile(e.target.files?.[0] ?? null)}
                    />
                    {formEvidenceFile && <small>{formEvidenceFile.name}</small>}
                  </div>
                  <div className="form-group">
                    <label>{t.status}</label>
                    <select value={formStatus} onChange={(e) => setFormStatus(e.target.value as DiagnosisRecord['status'])}>
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn-secondary" onClick={() => setIsCreateOpen(false)}>{t.cancel}</button>
                    <button type="submit" className="btn-primary">{t.save}</button>
                  </div>
                </form>
              )}
            </div>
            {selectedDiagnosis && (
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setSelectedDiagnosis(null)}>{t.close}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisTab;
