import React, { useState } from 'react';

export interface ActivitySubmission {
  activity_submission_id: number;
  submission_date: string;
  submitter_note: string;
  evidence_videos_json: string; // JSON string chứa mảng ảnh/video, ví dụ: '["url1"]'
  submit_times: number;
}

export interface SubmissionReview {
  submission_review_id: number;
  expert_feedback: string;
  created_at: string;
}

export interface ObjectiveActivity {
  activity_id: number;
  plan_phase_id: number;
  activity_name: string;
  description: string;
  duration: string;
  frequency?: string;
  target_criteria?: string;
  teaching_method?: string;
  assignee_type?: string;
  is_deleted?: boolean;
  status: 'In Progress' | 'Submitted';
  submissions?: ActivitySubmission[];
  reviews?: SubmissionReview[];
}

export interface PhaseObjective {
  objective_id: number;
  plan_phase_id: number;
  objective_name: string;
  target_date: string;
  activities?: ObjectiveActivity[];
  status: 'Completed' | 'In process';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PlanPhase {
  plan_phase_id: number;
  plan_id: number;
  phase_name: string;
  phase_type: string;
  start_date: string;
  end_date: string;
  status: 'Active' | 'Inactive';
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  objectives: PhaseObjective[];
}

export interface Plan {
  plan_id: number;
  plan_name: string;
  academic_year: string;
  assessment_tool: string;
  child_strengths: string;
  child_weaknesses: string;
  child_interests: string;
  family_feedback: string;
  start_date: string;
  end_date: string;
  status: 'Active' | 'Inactive';
  center_staff_id: number;
  child_id: number;
  created_at: string;
  updated_at: string;
  phases: PlanPhase[];
}

interface PlanDetailViewProps {
  lang: 'vi' | 'en';
  plan: Plan;
  onBack: () => void;
  onUpdatePlan: (updatedPlan: Plan) => void;
  onDeletePlan: (planId: number) => void;
}

const translations = {
  vi: {
    backBtn: "← Quay lại danh sách",
    title: "Chi tiết kế hoạch",
    subTitle: "Xem chi tiết thông tin và các giai đoạn can thiệp",
    planId: "Mã kế hoạch (Plan ID)",
    staffId: "Mã nhân sự phụ trách (Staff ID)",
    childId: "Mã trẻ can thiệp (Child ID)",
    planName: "Tên kế hoạch",
    academicYear: "Năm học",
    assessmentTool: "Công cụ đánh giá đầu vào",
    strengths: "Điểm mạnh của trẻ",
    weaknesses: "Điểm yếu của trẻ",
    interests: "Sở thích của trẻ",
    feedback: "Ý kiến / Phản hồi từ gia đình",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    status: "Trạng thái",
    createdAt: "Thời gian tạo",
    updatedAt: "Cập nhật lúc",
    editPlan: "✏️ Chỉnh sửa kế hoạch",
    deletePlan: "❌ Xóa kế hoạch",
    active: "Hoạt động",
    inactive: "Tạm ngưng",
    noData: "Chưa có thông tin",

    // Phase translation
    phasesTitle: "Quản lý các Giai đoạn kế hoạch (Plan Phases)",
    phaseList: "Danh sách Giai đoạn",
    addPhase: "Thêm giai đoạn mới",
    phaseId: "Mã Giai đoạn",
    phaseName: "Tên Giai đoạn",
    phaseType: "Loại giai đoạn (Phương pháp)",
    actions: "Thao tác",
    noPhases: "Kế hoạch này chưa có giai đoạn nào được tạo.",
    editPhase: "Sửa",
    deletePhase: "Xóa",
    phaseDetails: "Chi tiết Giai đoạn",
    backToPhases: "← Trở lại danh sách giai đoạn",
    deletedAt: "Ngày xóa",
    isDeleted: "Đã xóa",

    // Sub tabs inside Phase Detail
    tabOverview: "Tổng quan giai đoạn",
    tabActivities: "Hoạt động can thiệp (Activities)",
    tabObjectives: "Mục tiêu hành vi (Objectives)",

    // Modal Edit plan
    editPlanTitle: "Chỉnh sửa thông tin Kế hoạch",
    confirmDeletePlan: "Bạn có chắc chắn muốn xóa kế hoạch can thiệp này?",
    confirmDeletePlanSub: "Mọi dữ liệu về các giai đoạn, hoạt động liên quan sẽ bị xóa vĩnh viễn và không thể khôi phục.",

    // Phase Modal
    createPhaseTitle: "Thêm giai đoạn mới",
    updatePhaseTitle: "Cập nhật Giai đoạn",
    confirmDeletePhase: "Bạn có chắc chắn muốn xóa giai đoạn này?",
    deleteSub: "Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn mục này.",

    // Buttons
    cancel: "Hủy bỏ",
    save: "Lưu thay đổi",
    create: "Thêm mới",
    success: "Thao tác thành công!",
    confirmDelete: "Xác nhận xóa",

    // CRUD Activity
    actTitle: "Quản lý hoạt động can thiệp",
    addAct: "Thêm hoạt động",
    actName: "Tên hoạt động",
    actDesc: "Mô tả chi tiết",
    actDuration: "Thời lượng",
    noAct: "Chưa có hoạt động nào trong giai đoạn này.",
    createActTitle: "Thêm hoạt động mới",
    editActTitle: "Cập nhật hoạt động",
    confirmDeleteAct: "Xóa hoạt động này?",
    deleteActSub: "Hành động này sẽ xóa hoạt động và không thể khôi phục.",
    actListTitle: "Danh sách Hoạt động",
    actExercise: "Bài tập",
    actFreq: "Tần suất",
    actMethodCol: "PP Giảng dạy",
    actAssigneeCol: "Thực hiện",
    actCriteria: "Tiêu chí đạt",
    actActions: "Thao tác",
    actDetailsTitle: "Chi tiết Hoạt động",
    actDetailsSubtitle: "Xem chi tiết hướng dẫn thao tác, công cụ cần chuẩn bị cho một Hoạt động can thiệp cụ thể.",
    editAct: "Cập nhật Hoạt động",
    actNamePlaceholder: "Nhập tên bài tập...",
    actFreqPlaceholder: "Ví dụ: 3 lần/tuần",
    actMethodPlaceholder: "Hướng dẫn chi tiết...",
    actCriteriaPlaceholder: "Tiêu chí để đánh giá trẻ đạt",
    roleParent: "Phụ huynh (Parent)",
    roleTeacher: "Giáo viên (Teacher)",
    roleTherapist: "Chuyên viên (Therapist)",

    // CRUD Objective
    objTitle: "Quản lý mục tiêu hành vi",
    addObj: "Thêm mục tiêu",
    objName: "Tên mục tiêu",
    objTarget: "Điểm đích (Target Score)",
    objDesc: "Mô tả mục tiêu",
    noObj: "Chưa có mục tiêu hành vi nào trong giai đoạn này.",
    createObjTitle: "Thêm mục tiêu mới",
    editObjTitle: "Cập nhật mục tiêu",
    confirmDeleteObj: "Xóa mục tiêu này?",
  },
  en: {
    backBtn: "← Back to list",
    title: "Plan detail",
    subTitle: "View detailed information and intervention phases",
    planId: "Plan ID",
    staffId: "Center Staff ID",
    childId: "Child ID",
    planName: "Plan Name",
    academicYear: "Academic Year",
    assessmentTool: "Assessment Tool",
    strengths: "Child Strengths",
    weaknesses: "Child Weaknesses",
    interests: "Child Interests",
    feedback: "Family Feedback",
    startDate: "Start Date",
    endDate: "End Date",
    status: "Status",
    createdAt: "Created At",
    updatedAt: "Updated At",
    editPlan: "✏️ Edit Plan Info",
    deletePlan: "❌ Delete Plan",
    active: "Active",
    inactive: "Inactive",
    noData: "No data",

    // Phase translation
    phasesTitle: "Manage plan phase",
    phaseList: "Phase List",
    addPhase: "Add New Phase",
    phaseId: "Phase ID",
    phaseName: "Phase Name",
    phaseType: "Phase Type",
    actions: "Actions",
    noPhases: "No phases created for this intervention plan.",
    editPhase: "Edit",
    deletePhase: "Delete",
    phaseDetails: "Phase Details",
    backToPhases: "← Back to Phase List",
    deletedAt: "Deleted At",
    isDeleted: "Is Deleted",

    // Sub tabs inside Phase Detail
    tabOverview: "Phase Overview",
    tabActivities: "Manage activity",
    tabObjectives: "Manage objective",

    // Modal Edit plan
    editPlanTitle: "Edit Plan Information",
    confirmDeletePlan: "Are you sure you want to delete this intervention plan?",
    confirmDeletePlanSub: "All phases, activities, and objectives related to this plan will be permanently deleted.",

    // Phase Modal
    createPhaseTitle: "Create Plan Phase",
    updatePhaseTitle: "Update Plan Phase",
    confirmDeletePhase: "Are you sure you want to delete this phase?",
    deleteSub: "This action cannot be undone and will permanently delete this item.",

    // Buttons
    cancel: "Cancel",
    save: "Save Changes",
    create: "Create",
    success: "Operation successful!",
    confirmDelete: "Confirm Delete",

    // CRUD Activity
    actTitle: "Manage activities",
    addAct: "Create Activity",
    actName: "Activity Name",
    actDesc: "Description",
    actDuration: "Duration",
    noAct: "No activities found in this phase.",
    createActTitle: "Create New Activity",
    editActTitle: "Update Activity",
    confirmDeleteAct: "Delete this activity?",
    deleteActSub: "This action cannot be undone and will permanently delete this item.",
    actListTitle: "Activities List",
    actExercise: "Exercise",
    actFreq: "Frequency",
    actMethodCol: "Teaching Method",
    actAssigneeCol: "Assignee",
    actCriteria: "Criteria",
    actActions: "Actions",
    actDetailsTitle: "Activity Details",
    actDetailsSubtitle: "View detailed instructions and prepared tools for a specific intervention activity.",
    editAct: "Update Activity",
    actNamePlaceholder: "Enter exercise name...",
    actFreqPlaceholder: "E.g., 3 times/week",
    actMethodPlaceholder: "Detailed instructions...",
    actCriteriaPlaceholder: "Target criteria to evaluate the child",
    roleParent: "Parent",
    roleTeacher: "Teacher",
    roleTherapist: "Therapist",

    // CRUD Objective
    objTitle: "Manage objectives",
    addObj: "Create Objective",
    objName: "Objective Name",
    objTarget: "Target date",
    noObj: "No objectives found in this phase.",
    createObjTitle: "Create New Objective",
    editObjTitle: "Update Objective",
    confirmDeleteObj: "Delete this objective?",
  }
};

const PlanDetailView: React.FC<PlanDetailViewProps> = ({
  lang,
  plan,
  onBack,
  onUpdatePlan,
  onDeletePlan
}) => {
  const t = translations[lang];

  // Selected phase for detailed view
  const [selectedPhase, setSelectedPhase] = useState<PlanPhase | null>(null);
  const [phaseSearchTerm, setPhaseSearchTerm] = useState('');

  // Role Simulator State
  const [currentSimulatorRole, setCurrentSimulatorRole] = useState<'Teacher' | 'Parent'>('Teacher');

  // Activity Progress Reports State
  const [activeActivityForReport, setActiveActivityForReport] = useState<ObjectiveActivity | null>(null);
  
  // Submit Report Fields
  const [reportMediaFile, setReportMediaFile] = useState<string>(''); // Base64
  const [reportParentNote, setReportParentNote] = useState('');

  // Evaluate Report Fields
  const [evalFeedback, setEvalFeedback] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Plan Modals State
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [isDeletePlanOpen, setIsDeletePlanOpen] = useState(false);

  // Edit Plan Form Fields
  const [editPlanName, setEditPlanName] = useState(plan.plan_name);

  const [editAssessmentTool, setEditAssessmentTool] = useState(plan.assessment_tool);
  const [editStrengths, setEditStrengths] = useState(plan.child_strengths);
  const [editWeaknesses, setEditWeaknesses] = useState(plan.child_weaknesses);
  const [editInterests, setEditInterests] = useState(plan.child_interests);
  const [editFeedback, setEditFeedback] = useState(plan.family_feedback);
  const [editStartDate, setEditStartDate] = useState(plan.start_date);
  const [editEndDate, setEditEndDate] = useState(plan.end_date);


  // Phase Modal State
  const [isPhaseModalOpen, setIsPhaseModalOpen] = useState(false);
  const [phaseModalMode, setPhaseModalMode] = useState<'create' | 'update' | 'delete'>('create');
  const [selectedPhaseForEdit, setSelectedPhaseForEdit] = useState<PlanPhase | null>(null);

  const [expandedObjId, setExpandedObjId] = useState<number | null>(null);

  const toggleExpandRow = (objectiveId: number) => {
    if (expandedObjId === objectiveId) {
      setExpandedObjId(null); // Đóng lại nếu click lần 2
    } else {
      setExpandedObjId(objectiveId); // Mở dòng được chọn
    }
  };

  // Phase Form Fields
  const [phaseName, setPhaseName] = useState('');
  const [phaseType, setPhaseType] = useState('');
  const [phaseStartDate, setPhaseStartDate] = useState('');
  const [phaseEndDate, setPhaseEndDate] = useState('');
  const [phaseStatus, setPhaseStatus] = useState<'Active' | 'Inactive'>('Active');

  const filteredPhases = plan.phases.filter(p => 
    !p.is_deleted && 
    (p.phase_name.toLowerCase().includes(phaseSearchTerm.toLowerCase()) ||
     p.phase_type.toLowerCase().includes(phaseSearchTerm.toLowerCase()) ||
     p.plan_phase_id.toString().includes(phaseSearchTerm))
  );

  // Activity Modal State (Removed per user request)

  // Objective Modal State
  const [isObjModalOpen, setIsObjModalOpen] = useState(false);
  const [isActModalOpen, setIsActModalOpen] = useState(false);
  const [actModalMode, setActModalMode] = useState<'create' | 'update' | 'delete' | 'view'>('create');
  const [actName, setActName] = useState('');
  // @ts-ignore
  const [actDesc, setActDesc] = useState('');
  // @ts-ignore
  const [actDuration, setActDuration] = useState('');
  const [actFrequency, setActFrequency] = useState('');
  const [actAssigneeType, setActAssigneeType] = useState('Parent');
  const [actTeachingMethod, setActTeachingMethod] = useState('');
  const [actTargetCriteria, setActTargetCriteria] = useState('');
  // @ts-ignore
  const [activeObjId, setActiveObjId] = useState<number | null>(null);
  // @ts-ignore
  const [activeActId, setActiveActId] = useState<number | null>(null);
  const [objModalMode, setObjModalMode] = useState<'create' | 'update' | 'delete' | 'view'>('create');
  const [selectedObj, setSelectedObj] = useState<PhaseObjective | null>(null);
  const [objName, setObjName] = useState('');
  const [objTarget, setObjTarget] = useState('');
  const [objDesc, setObjDesc] = useState('');

  // Handle Save Plan Information
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Plan = {
      ...plan,
      plan_name: editPlanName,
      assessment_tool: editAssessmentTool,
      child_strengths: editStrengths,
      child_weaknesses: editWeaknesses,
      child_interests: editInterests,
      family_feedback: editFeedback,
      start_date: editStartDate,
      end_date: editEndDate,
      updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    onUpdatePlan(updated);
    alert(t.success);
    setIsEditPlanOpen(false);
  };

  // Open phase modal
  const openPhaseModal = (mode: 'create' | 'update' | 'delete', phase: PlanPhase | null = null) => {
    setPhaseModalMode(mode);
    setSelectedPhaseForEdit(phase);
    if (phase && (mode === 'update' || mode === 'delete')) {
      setPhaseName(phase.phase_name);
      setPhaseType(phase.phase_type);
      setPhaseStartDate(phase.start_date.substring(0, 10));
      setPhaseEndDate(phase.end_date.substring(0, 10));
      setPhaseStatus(phase.status);
    } else {
      setPhaseName('');
      setPhaseType('');
      setPhaseStartDate('');
      setPhaseEndDate('');
      setPhaseStatus('Active');
    }
    setIsPhaseModalOpen(true);
  };

  // Save Phase
  const handleSavePhase = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedPhases = [...plan.phases];
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (phaseModalMode === 'create') {
      const newId = plan.phases.length > 0 ? Math.max(...plan.phases.map(p => p.plan_phase_id)) + 1 : 1;
      const newPhase: PlanPhase = {
        plan_phase_id: newId,
        plan_id: plan.plan_id,
        phase_name: phaseName,
        phase_type: phaseType,
        start_date: phaseStartDate,
        end_date: phaseEndDate,
        status: phaseStatus,
        is_deleted: false,
        created_at: nowStr,
        updated_at: nowStr,
        objectives: []
      };
      updatedPhases.push(newPhase);
    } else if (phaseModalMode === 'update' && selectedPhaseForEdit) {
      updatedPhases = updatedPhases.map(p => {
        if (p.plan_phase_id === selectedPhaseForEdit.plan_phase_id) {
          return {
            ...p,
            phase_name: phaseName,
            phase_type: phaseType,
            start_date: phaseStartDate,
            end_date: phaseEndDate,
            status: phaseStatus,
            updated_at: nowStr
          };
        }
        return p;
      });

      // Update selected detail view if active
      if (selectedPhase && selectedPhase.plan_phase_id === selectedPhaseForEdit.plan_phase_id) {
        setSelectedPhase(prev => prev ? {
          ...prev,
          phase_name: phaseName,
          phase_type: phaseType,
          start_date: phaseStartDate,
          end_date: phaseEndDate,
          status: phaseStatus,
          updated_at: nowStr
        } : null);
      }
    } else if (phaseModalMode === 'delete' && selectedPhaseForEdit) {
      updatedPhases = updatedPhases.map(p => {
        if (p.plan_phase_id === selectedPhaseForEdit.plan_phase_id) {
          return {
            ...p,
            is_deleted: true,
            status: 'Inactive' as const,
            deleted_at: nowStr,
            updated_at: nowStr
          };
        }
        return p;
      });
      if (selectedPhase && selectedPhase.plan_phase_id === selectedPhaseForEdit.plan_phase_id) {
        setSelectedPhase(null);
      }
    }

    onUpdatePlan({ ...plan, phases: updatedPhases });
    alert(t.success);
    setIsPhaseModalOpen(false);
  };

  // Activity Progress Reports Handlers (CSDL Hợp nhất mới)
  const handleSaveSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeActivityForReport) return;
    
    const subs = activeActivityForReport.submissions || [];
    const newSubTimes = subs.length > 0 ? Math.max(...subs.map(s => s.submit_times)) + 1 : 1;
    const newSubId = subs.length > 0 ? Math.max(...subs.map(s => s.activity_submission_id)) + 1 : 1;
    
    const newSubmission: ActivitySubmission = {
      activity_submission_id: newSubId,
      submission_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      submitter_note: reportParentNote,
      evidence_videos_json: reportMediaFile ? JSON.stringify([reportMediaFile]) : '[]',
      submit_times: newSubTimes
    };

    const updatedPhases = plan.phases.map(phase => {
      const updatedObjectives = phase.objectives.map(obj => {
        const updatedActs = (obj.activities || []).map(act => {
          if (act.activity_id === activeActivityForReport.activity_id) {
            const currentSubs = act.submissions || [];
            return {
              ...act,
              status: 'Submitted' as const,
              submissions: [...currentSubs, newSubmission]
            };
          }
          return act;
        });
        return { ...obj, activities: updatedActs };
      });
      return { ...phase, objectives: updatedObjectives };
    });

    const targetAct = updatedPhases.flatMap(p => p.objectives).flatMap(o => o.activities || []).find(a => a.activity_id === activeActivityForReport.activity_id);
    if (targetAct) {
      setActiveActivityForReport(targetAct);
    }

    onUpdatePlan({ ...plan, phases: updatedPhases });
    showToast(lang === 'vi' ? '✨ Đã nộp bài tập thực hành thành công!' : '✨ Practice submission successful!');
    
    setReportMediaFile('');
    setReportParentNote('');
  };

  const handleSaveReview = (submissionId: number) => {
    if (!activeActivityForReport) return;
    if (!evalFeedback.trim()) {
      alert(lang === 'vi' ? 'Vui lòng nhập phản hồi chuyên môn!' : 'Please enter clinical feedback!');
      return;
    }

    const newReview: SubmissionReview = {
      submission_review_id: submissionId, // Kẹp đôi khớp với submissionId nộp bài
      expert_feedback: evalFeedback,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    const updatedPhases = plan.phases.map(phase => {
      const updatedObjectives = phase.objectives.map(obj => {
        const updatedActs = (obj.activities || []).map(act => {
          if (act.activity_id === activeActivityForReport.activity_id) {
            const currentReviews = act.reviews || [];
            return {
              ...act,
              status: 'In Progress' as const,
              reviews: [...currentReviews, newReview]
            };
          }
          return act;
        });
        return { ...obj, activities: updatedActs };
      });
      return { ...phase, objectives: updatedObjectives };
    });

    const targetAct = updatedPhases.flatMap(p => p.objectives).flatMap(o => o.activities || []).find(a => a.activity_id === activeActivityForReport.activity_id);
    if (targetAct) {
      setActiveActivityForReport(targetAct);
    }

    onUpdatePlan({ ...plan, phases: updatedPhases });
    showToast(lang === 'vi' ? '✨ Đã lưu nhận xét chuyên môn!' : '✨ Expert feedback saved successfully!');
    setEvalFeedback('');
  };

  // Objective Handlers
  const openActModal = (mode: 'create' | 'update' | 'delete' | 'view', objId: number, act: ObjectiveActivity | null = null) => {
    setActModalMode(mode);
    setActiveObjId(objId);
    if (act) {
      setActiveActivityForReport(act);
      setReportMediaFile('');
      setReportParentNote('');
      setEvalFeedback('');
    }
    if (act && (mode === 'update' || mode === 'delete' || mode === 'view')) {
      setActiveActId(act.activity_id);
      setActName(act.activity_name);
      setActDesc(act.description);
      setActDuration(act.duration);
      setActFrequency(act.frequency || '');
      setActAssigneeType(act.assignee_type || 'Parent');
      setActTeachingMethod(act.teaching_method || '');
      setActTargetCriteria(act.target_criteria || '');
    } else {
      setActiveActId(null);
      setActiveActivityForReport(null);
      setActName('');
      setActDesc('');
      setActDuration('');
      setActFrequency('');
      setActAssigneeType('Parent');
      setActTeachingMethod('');
      setActTargetCriteria('');
    }
    setIsActModalOpen(true);
  };

  const handleSaveAct = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.success || 'Success');
    setIsActModalOpen(false);
  };

  const openObjModal = (mode: 'create' | 'update' | 'delete' | 'view', obj: PhaseObjective | null = null) => {
    setObjModalMode(mode);
    setSelectedObj(obj);
    if (obj) {
      setObjName(obj.objective_name);
      setObjDesc(obj.status)
      setObjTarget(obj.target_date)
    } else {
      setObjName('');
      setObjTarget('');
      setObjDesc('');
    }
    setIsObjModalOpen(true);
  };

  const handleSaveObj = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhase) return;

    let updatedObjs = [...selectedPhase.objectives];
    if (objModalMode === 'create') {
      const newId = selectedPhase.objectives.length > 0 ? Math.max(...selectedPhase.objectives.map(o => o.objective_id)) + 1 : 1;
      updatedObjs.push({
        objective_id: newId,
        plan_phase_id: selectedPhase.plan_phase_id,
        objective_name: objName,
        target_date: objTarget,
        activities: selectedObj?.activities,
        status: 'In process',
        created_at: '2016-02-02',
        updated_at: '2016-02-02',
      });
    } else if (objModalMode === 'update' && selectedObj) {
      updatedObjs = updatedObjs.map(o => o.objective_id === selectedObj.objective_id ? {
        ...o,
        objective_name: objName,
        target_date: objTarget,
        status: objDesc as 'Completed' | 'In process',
        updated_at: '2016-02-02',
      } : o);
    } else if (objModalMode === 'delete' && selectedObj) {
      updatedObjs = updatedObjs.filter(o => o.objective_id !== selectedObj.objective_id);
    }

    const updatedPhase = { ...selectedPhase, objectives: updatedObjs };
    setSelectedPhase(updatedPhase);

    // Sync back to plan
    const updatedPhases = plan.phases.map(p => p.plan_phase_id === selectedPhase.plan_phase_id ? updatedPhase : p);
    onUpdatePlan({ ...plan, phases: updatedPhases });
    alert(t.success);
    setIsObjModalOpen(false);
  };

  return (
    <div className="dashboard-content-area plan-detail-view-container">
      <style>{`
        .plan-detail-view-container {
          font-family: "Be Vietnam Pro", sans-serif;
        }

        /* Anti-Leakage Dark Theme Overrides for Text & Containers */
        .admin-theme-root .plan-detail-view-container .plan-profile-card,
        .plan-detail-view-container .plan-profile-card {
          padding: 2rem;
          border-radius: 24px;
          border: 1px solid #CBD5E1 !important;
          background: #FFFFFF !important;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03) !important;
          margin-bottom: 2.5rem;
          color: #1E293B !important;
        }

        /* PHASE MANAGEMENT CARD - Same as Plan Profile */
.admin-theme-root .plan-detail-view-container .phase-management-card,
.plan-detail-view-container .phase-management-card {
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid #CBD5E1 !important;
  background: #FFFFFF !important;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03) !important;
  margin-bottom: 2.5rem;
  color: #1E293B !important;
  display: block !important;
}

.admin-theme-root .plan-detail-view-container .phase-management-card:hover,
.plan-detail-view-container .phase-management-card:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06) !important;
}

        .admin-theme-root .plan-detail-view-container .phase-management-card:hover,
        .plan-detail-view-container .phase-management-card:hover {
          transform: none !important;
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06) !important;
        }

        /* Color Fix for White Text Issues in Dark Theme */
        .admin-theme-root .plan-detail-view-container .phase-section-title,
        .plan-detail-view-container .phase-section-title {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 800;
          color: #1E293B !important;
          font-family: "Be Vietnam Pro", sans-serif !important;
        }

        .admin-theme-root .plan-detail-view-container .phase-section-subtitle,
        .plan-detail-view-container .phase-section-subtitle {
          margin: 6px 0 0 0;
          color: #64748B !important;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: "Be Vietnam Pro", sans-serif !important;
        }

        .admin-theme-root .plan-detail-view-container .meta-field-label,
        .plan-detail-view-container .meta-field-label {
          display: block;
          font-size: 0.85rem;
          color: #64748B !important;
          text-transform: uppercase;
          margin-bottom: 4px;
          font-weight: 800;
        }

        .admin-theme-root .plan-detail-view-container .meta-field-val,
        .plan-detail-view-container .meta-field-val {
          font-size: 1rem;
          color: #1E293B !important;
          font-weight: 700;
        }

        .admin-theme-root .plan-detail-view-container .meta-date-text,
        .plan-detail-view-container .meta-date-text {
          font-size: 0.9rem;
          color: #475569 !important;
          font-weight: 700;
        }

        .admin-theme-root .plan-detail-view-container .profile-title,
        .plan-detail-view-container .profile-title {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 800;
          color: #1E293B !important;
          letter-spacing: -0.02em;
        }

        .admin-theme-root .plan-detail-view-container .profile-subtitle,
        .plan-detail-view-container .profile-subtitle {
          margin: 6px 0 0 0;
          color: #64748B !important;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .admin-theme-root .plan-detail-view-container .assessment-tool-box,
        .plan-detail-view-container .assessment-tool-box {
          font-size: 0.95rem;
          color: #1E293B !important;
          font-weight: 600;
          background: #F8FAFC !important;
          padding: 8px 12px;
          border-radius: 8px;
          display: block;
          border: 1px solid #E2E8F0 !important;
        }

        .admin-theme-root .plan-detail-view-container .section-box-title,
        .plan-detail-view-container .section-box-title {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          margin-bottom: 6px;
          font-weight: 800;
        }

        .admin-theme-root .plan-detail-view-container .strengths-title,
        .admin-theme-root .plan-detail-view-container .weaknesses-title,
        .admin-theme-root .plan-detail-view-container .interests-title,
        .admin-theme-root .plan-detail-view-container .feedback-title,
        .plan-detail-view-container .strengths-title,
        .plan-detail-view-container .weaknesses-title,
        .plan-detail-view-container .interests-title,
        .plan-detail-view-container .feedback-title {
          color: #64748B !important;
        }

        .admin-theme-root .plan-detail-view-container .box-content,
        .plan-detail-view-container .box-content {
          margin: 0;
          color: #1E293B !important;
          white-space: pre-line;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .admin-theme-root .plan-detail-view-container .strengths-box,
        .admin-theme-root .plan-detail-view-container .weaknesses-box,
        .admin-theme-root .plan-detail-view-container .interests-box,
        .admin-theme-root .plan-detail-view-container .feedback-box,
        .plan-detail-view-container .strengths-box,
        .plan-detail-view-container .weaknesses-box,
        .plan-detail-view-container .interests-box,
        .plan-detail-view-container .feedback-box {
          background: #F8FAFC !important;
          border: 1px solid #E2E8F0 !important;
          padding: 1.25rem;
          border-radius: 16px;
          transition: all 0.2s ease;
        }

                  background: #E5E7EB !important;
          color: #374151 !important;
        }

        .admin-theme-root .plan-detail-view-container .plan-status-badge.inactive,
        .plan-detail-view-container .plan-status-badge.inactive {
          background: #F3F4F6 !important;
          color: #4B5563 !important;
        }

        /* Navigation & Top Actions Flat Styles */
        .plan-detail-view-container .detail-navigation {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-theme-root .plan-detail-view-container .back-btn-v2,
        .plan-detail-view-container .back-btn-v2 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid #CBD5E1 !important;
          background: #FFFFFF !important;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.15s ease;
          color: #475569 !important;
        }

        .admin-theme-root .plan-detail-view-container .back-btn-v2:hover,
        .plan-detail-view-container .back-btn-v2:hover {
          background: #F1F5F9 !important;
          color: #1E293B !important;
          border-color: #94A3B8 !important;
        }

        .plan-detail-view-container .back-btn-v2:active {
          transform: translateY(1px);
        }

        .plan-detail-view-container .detail-action-group {
          display: flex;
          gap: 12px;
        }

        .admin-theme-root .plan-detail-view-container .edit-detail-btn-v2,
        .plan-detail-view-container .edit-detail-btn-v2 {
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid #CBD5E1 !important;
          background: #FFFFFF !important;
          color: #475569 !important;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.15s ease;
        }

        .admin-theme-root .plan-detail-view-container .edit-detail-btn-v2:hover,
        .plan-detail-view-container .edit-detail-btn-v2:hover {
          background: #F1F5F9 !important;
          color: #1E293B !important;
          border-color: #94A3B8 !important;
        }

        .admin-theme-root .plan-detail-view-container .delete-detail-btn-v2,
        .plan-detail-view-container .delete-detail-btn-v2 {
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid #FCA5A5 !important;
          background: #FFFFFF !important;
          color: #EF4444 !important;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.15s ease;
        }


        /* ========================================================================= */
        /* ROLE SIMULATOR WIDGET (Memphis Playful Geometric Style) */
        /* ========================================================================= */
        .plan-detail-view-container .role-simulator-widget {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFFDF5 !important;
          border: 3px solid #1E293B !important;
          padding: 6px 14px;
          border-radius: 16px;
          box-shadow: 4px 4px 0px #1E293B;
          margin: 0 1rem;
          transition: all 0.2s ease;
        }

        .plan-detail-view-container .role-simulator-widget .widget-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: #1E293B;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .plan-detail-view-container .role-simulator-widget .simulator-btn-group {
          display: flex;
          gap: 6px;
        }

        .plan-detail-view-container .role-simulator-widget .simulator-btn {
          background: #FFFFFF;
          border: 2px solid #1E293B;
          font-family: "Be Vietnam Pro", sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: #475569;
        }

        .plan-detail-view-container .role-simulator-widget .simulator-btn.active {
          background: #8B5CF6 !important;
          color: #FFFFFF !important;
          box-shadow: 2px 2px 0px #1E293B;
          transform: translate(-2px, -2px);
        }

        .plan-detail-view-container .role-simulator-widget .simulator-btn:not(.active):hover {
          background: #F1F5F9 !important;
          transform: translateY(-1px);
        }

        /* Responsive Simulator Widget */
        @media (max-width: 950px) {
          .plan-detail-view-container .detail-navigation {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .plan-detail-view-container .role-simulator-widget {
            margin: 0 !important;
            justify-content: space-between;
          }
        }

        /* ========================================================================= */
        /* PROGRESS REPORTS STYLES & MODALS */
        /* ========================================================================= */
        .plan-detail-view-container .report-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          border-radius: 8px;
          border: 2px solid #1E293B;
          font-size: 0.75rem;
          font-weight: 800;
          box-shadow: 2px 2px 0px #1E293B;
        }
        
        .plan-detail-view-container .report-badge.approved {
          background: #D1FAE5 !important;
          color: #065F46 !important;
        }
        
        .plan-detail-view-container .report-badge.rejected {
          background: #FEE2E2 !important;
          color: #991B1B !important;
        }
        
        .plan-detail-view-container .report-badge.pending {
          background: #FEF3C7 !important;
          color: #92400E !important;
          animation: pulse-border 1.5s infinite ease-in-out;
        }

        @keyframes pulse-border {
          0% { box-shadow: 2px 2px 0px #1E293B; }
          50% { box-shadow: 2px 2px 8px #F59E0B; }
          100% { box-shadow: 2px 2px 0px #1E293B; }
        }

        /* Memphis Candy Buttons for Reports */
        .plan-detail-view-container .report-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: "Be Vietnam Pro", sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 10px;
          border: 2px solid #1E293B;
          cursor: pointer;
          transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 2px 2px 0px #1E293B;
        }

        .plan-detail-view-container .report-action-btn.submit {
          background: #8B5CF6 !important;
          color: #FFFFFF !important;
        }

        .plan-detail-view-container .report-action-btn.submit:hover {
          background: #7C3AED !important;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px #1E293B;
        }

        .plan-detail-view-container .report-action-btn.evaluate {
          background: #FFFFFF !important;
          color: #1E293B !important;
        }

        .plan-detail-view-container .report-action-btn.evaluate:hover {
          background: #FFFDF5 !important;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px #1E293B;
        }

        /* Media Upload & Preview Memphis Style */
        .plan-detail-view-container .memphis-uploader {
          background: #FFFDF5;
          border: 3px dashed #1E293B;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .plan-detail-view-container .memphis-uploader:hover {
          background: #FDFBF7;
          border-color: #8B5CF6;
        }

        .plan-detail-view-container .media-preview-container {
          border: 3px solid #1E293B;
          border-radius: 16px;
          overflow: hidden;
          background: #FFFFFF;
          box-shadow: 6px 6px 0px #1E293B;
          position: relative;
          width: 100%;
          max-height: 240px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .plan-detail-view-container .media-preview-img {
          width: 100%;
          height: auto;
          max-height: 240px;
          object-fit: contain;
        }

        .plan-detail-view-container .btn-remove-media {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #EF4444 !important;
          color: #FFFFFF !important;
          border: 2px solid #1E293B !important;
          border-radius: 50% !important;
          width: 28px !important;
          height: 28px !important;
          padding: 0 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          cursor: pointer !important;
          box-shadow: 2px 2px 0px #1E293B !important;
          font-weight: bold;
        }

        /* Evaluate Candy Buttons Selector */
        .plan-detail-view-container .eval-status-selector {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .plan-detail-view-container .eval-status-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: "Be Vietnam Pro", sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          padding: 10px 16px;
          border-radius: 12px;
          border: 3px solid #1E293B;
          cursor: pointer;
          transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 2px 2px 0px #1E293B;
        }

        .plan-detail-view-container .eval-status-btn.approved {
          background: #FFFFFF;
          color: #065F46;
        }

        .plan-detail-view-container .eval-status-btn.approved.active {
          background: #10B981 !important;
          color: #FFFFFF !important;
          box-shadow: 4px 4px 0px #1E293B;
          transform: translate(-2px, -2px);
        }

        .plan-detail-view-container .eval-status-btn.rejected {
          background: #FFFFFF;
          color: #991B1B;
        }

        .plan-detail-view-container .eval-status-btn.rejected.active {
          background: #EF4444 !important;
          color: #FFFFFF !important;
          box-shadow: 4px 4px 0px #1E293B;
          transform: translate(-2px, -2px);
        }

        /* Report Item Card in History List */
        .plan-detail-view-container .report-item-card {
          background: #FFFFFF;
          border: 3px solid #1E293B;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 16px;
          box-shadow: 4px 4px 0px #1E293B;
          transition: transform 0.2s ease;
        }

        .plan-detail-view-container .report-item-card:hover {
          transform: translateY(-2px);
        }

        /* Profile Card & Info Grid */
        .plan-detail-view-container .card-header-block {
          margin-bottom: 1.5rem;
          border-bottom: 2px dashed #E2E8F0;
          padding-bottom: 1rem;
        }

        .admin-theme-root .plan-detail-view-container .profile-badge,
        .plan-detail-view-container .profile-badge {
          background: #F1F5F9 !important;
          color: #64748B !important;
          padding: 6px 14px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 8px;
          border: 1px solid #E2E8F0 !important;
        }

        .plan-detail-view-container .plan-grid-fields {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .plan-detail-view-container .meta-field {
          display: flex;
          flex-direction: column;
        }

        .plan-detail-view-container .meta-field-full {
          grid-column: 1 / -1;
        }

        .plan-detail-view-container .profile-bento-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          grid-column: 1 / -1;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .plan-detail-view-container .strengths-box:hover,
        .plan-detail-view-container .weaknesses-box:hover,
        .plan-detail-view-container .interests-box:hover,
        .plan-detail-view-container .feedback-box:hover {
          background: #FFFFFF !important;
          border-color: #CBD5E1 !important;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03) !important;
          transform: none;
        }

        .plan-detail-view-container .plan-status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid transparent !important;
        }

        /* Phase Section Header */
        .plan-detail-view-container .phase-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 2px dashed #E2E8F0;
          padding-bottom: 1rem;
          flex-wrap: wrap !important;
          gap: 1rem !important;
        }

        .plan-detail-view-container .phase-section-actions {
          display: flex !important;
          gap: 12px !important;
          align-items: center !important;
          flex-wrap: wrap !important;
        }

        @media (max-width: 768px) {
          .plan-detail-view-container .phase-section-actions {
            width: 100% !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          .plan-detail-view-container .phase-section-actions .search-bar {
            width: 100% !important;
          }
          
          .plan-detail-view-container .phase-section-actions .add-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        /* Synchronized System Primary Button (Candy Button style) */
        .admin-theme-root .plan-detail-view-container .add-btn,
        .plan-detail-view-container .add-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          border-radius: 12px !important;
          border: none !important;
          background: var(--primary) !important;
          color: #FFFFFF !important;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.875rem;
          box-shadow: 0 4px 8px rgba(15, 23, 42, 0.1) !important;
          transition: all 0.2s ease;
        }

        .admin-theme-root .plan-detail-view-container .add-btn:hover,
        .plan-detail-view-container .add-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 12px rgba(15, 23, 42, 0.15) !important;
        }

        .admin-theme-root .plan-detail-view-container .add-btn:active,
        .plan-detail-view-container .add-btn:active {
          transform: translateY(0) !important;
          box-shadow: 0 2px 4px rgba(15, 23, 42, 0.1) !important;
        }

        .admin-theme-root .plan-detail-view-container .empty-state-box,
        .plan-detail-view-container .empty-state-box {
          text-align: center;
          padding: 3rem 1rem;
          color: #64748B !important;
          background: #F8FAFC !important;
          border-radius: 16px;
          border: 2px dashed #CBD5E1 !important;
          font-weight: 700;
        }

        .plan-detail-view-container .table-responsive {
          overflow-x: auto;
        }

        .plan-detail-view-container .phase-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px;
        }

        /* Color Fix for Phase Table Headers */
        .admin-theme-root .plan-detail-view-container .phase-table thead th,
        .plan-detail-view-container .phase-table thead th {
          color: #64748B !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          font-size: 0.8rem !important;
          letter-spacing: 0.05em !important;
          padding: 8px 12px !important;
          border-bottom: 2px solid #E2E8F0 !important;
          text-align: left;
        }

        .plan-detail-view-container .phase-row {
          background: #FFFFFF;
          border-radius: 12px;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
        }

        .plan-detail-view-container .phase-row:hover {
  transform: none !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02) !important;
  background: #FAF5FF !important;
}

        .admin-theme-root .plan-detail-view-container .phase-row td,
        .plan-detail-view-container .phase-row td {
          padding: 14px 12px;
          border-top: 1px solid #E2E8F0 !important;
          border-bottom: 1px solid #E2E8F0 !important;
          color: #1E293B !important;
        }

        .admin-theme-root .plan-detail-view-container .phase-row td.cell-first,
        .plan-detail-view-container .phase-row td.cell-first {
          font-size: 0.9rem;
          font-weight: 800;
          border-left: 1px solid #E2E8F0 !important;
          border-radius: 12px 0 0 12px;
          color: #1E293B !important;
        }

        .admin-theme-root .plan-detail-view-container .phase-row td.cell-name,
        .plan-detail-view-container .phase-row td.cell-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1E293B !important;
        }

        .admin-theme-root .plan-detail-view-container .phase-row td.cell-type,
        .plan-detail-view-container .phase-row td.cell-type {
          font-size: 0.9rem;
          color: #475569 !important;
        }

        .admin-theme-root .plan-detail-view-container .phase-type-tag,
        .plan-detail-view-container .phase-type-tag {
          background: #F1F5F9 !important;
          color: #475569 !important;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
          border: 1px solid #E2E8F0 !important;
          display: inline-block;
        }

        .admin-theme-root .plan-detail-view-container .phase-row td.cell-date,
        .plan-detail-view-container .phase-row td.cell-date {
          font-size: 0.85rem;
          color: #64748B !important;
        }

        .plan-detail-view-container .phase-status-badge {
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 800;
          border: 1px solid transparent !important;
          display: inline-block;
        }

        .admin-theme-root .plan-detail-view-container .phase-status-badge.active,
        .plan-detail-view-container .phase-status-badge.active {
          background: #DCFCE7 !important;
          color: #166534 !important;
        }

        .admin-theme-root .plan-detail-view-container .phase-status-badge.inactive,
        .plan-detail-view-container .phase-status-badge.inactive {
          background: #F3F4F6 !important;
          color: #4B5563 !important;
        }

        .plan-detail-view-container .phase-row td.cell-actions {
          text-align: center;
          border-right: 1px solid #E2E8F0 !important;
          border-radius: 0 12px 12px 0;
        }

        .plan-detail-view-container .phase-actions-container {
          display: flex;
          gap: 6px;
          justify-content: center;
        }

        .plan-detail-view-container .edit-btn-v2,
        .plan-detail-view-container .delete-btn-v2 {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .plan-detail-view-container .edit-btn-v2:hover {
          background: #EDE9FE;
          color: #6D28D9;
          border-color: #C084FC;
        }
        .plan-detail-view-container .delete-btn-v2:hover {
          background: #FEE2E2;
          color: #EF4444;
          border-color: #FCA5A5;
        }

        /* Phase Detail Workspace & Sub Tabs - Playful Geometric style */
        .plan-detail-view-container .phase-detail-workspace-card {
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #E5E7EB !important;
  background: #F9FAFB !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
  transition: background 0.2s ease;
  margin-bottom: 1.5rem;
  color: #111827 !important;
  display: block !important;
}

.plan-detail-view-container .phase-detail-workspace-card:hover {
  background: #FFFFFF !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08) !important;
}


        .plan-detail-view-container .phase-detail-inner {
          padding: 0;
          background: transparent;
          margin-top: 1.5rem;
        }

        .plan-detail-view-container .phase-detail-header-block {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px dashed #E2E8F0;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .plan-detail-view-container .phase-detail-badge {
  background: #E5E7EB;
  color: #111827 !important;
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 4px;
  border: 1px solid transparent;
}


        .admin-theme-root .plan-detail-view-container .phase-detail-title,
        .plan-detail-view-container .phase-detail-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 900;
          color: #1E293B !important;
        }

        .plan-detail-view-container .phase-detail-tags {
          display: flex;
          gap: 8px;
        }

        .admin-theme-root .plan-detail-view-container .phase-tag-badge,
        .plan-detail-view-container .phase-tag-badge {
          padding: 4px 12px;
          border-radius: 8px;
          font-weight: 800;
          border: 1px solid transparent !important;
        }

        .admin-theme-root .plan-detail-view-container .phase-tag-badge.type,
.plan-detail-view-container .phase-tag-badge.type {
  background: #E5E7EB !important;
  color: #374151 !important;
}


        .admin-theme-root .plan-detail-view-container .phase-tag-badge.status-active,
        .plan-detail-view-container .phase-tag-badge.status-active {
          background: #E5E7EB !important;
          color: #374151 !important;
        }

        .admin-theme-root .plan-detail-view-container .phase-tag-badge.status-inactive,
        .plan-detail-view-container .phase-tag-badge.status-inactive {
          background: #F3F4F6 !important;
          color: #4B5563 !important;
        }

        .plan-detail-view-container .sub-tabs-container {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid #E2E8F0;
          padding-bottom: 1px;
          margin-bottom: 1.5rem;
        }

        .plan-detail-view-container .sub-tab-btn {
          padding: 10px 20px;
          border: 1px solid #CBD5E1;
          border-bottom: none;
          background: #F8FAFC;
          border-radius: 12px 12px 0 0;
          cursor: pointer;
          font-weight: 700;
          color: #475569;
          z-index: 1;
          transition: all 0.15s ease;
        }

        .plan-detail-view-container .sub-tab-btn:hover {
          background: #F1F5F9;
          color: #1E293B;
        }

        .plan-detail-view-container .sub-tab-btn.active {
          border: 1.5px solid #1E293B;
          border-bottom: 2px solid #FFFFFF;
          background: #FFFFFF;
          color: #8B5CF6;
          transform: translateY(1px);
          z-index: 2;
          font-weight: 800;
        }

        .plan-detail-view-container .tab-pane-content {
          animation: fadeIn 0.2s ease-out;
        }

        .plan-detail-view-container .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .plan-detail-view-container .section-pane-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .admin-theme-root .plan-detail-view-container .section-pane-title,
        .plan-detail-view-container .section-pane-title {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 800;
          color: #1E293B !important;
        }

        /* Synchronized Candy buttons for Activities & Objectives */
        .admin-theme-root .plan-detail-view-container .add-act-btn,
        .plan-detail-view-container .add-act-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 999px !important;
          border: 2px solid #1E293B !important;
          background: #10B981 !important;
          color: #FFFFFF !important;
          cursor: pointer;
          font-weight: 800;
          font-size: 0.85rem;
          box-shadow: 4px 4px 0px #1E293B !important;
          transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .admin-theme-root .plan-detail-view-container .add-act-btn:hover,
        .plan-detail-view-container .add-act-btn:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 6px 6px 0px #1E293B !important;
        }

        .admin-theme-root .plan-detail-view-container .add-act-btn:active,
        .plan-detail-view-container .add-act-btn:active {
          transform: translate(1px, 1px) !important;
          box-shadow: 2px 2px 0px #1E293B !important;
        }

        .admin-theme-root .plan-detail-view-container .add-obj-btn,
        .plan-detail-view-container .add-obj-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 999px !important;
          border: 2px solid #1E293B !important;
          background: #EC4899 !important;
          color: #FFFFFF !important;
          cursor: pointer;
          font-weight: 800;
          font-size: 0.85rem;
          box-shadow: 4px 4px 0px #1E293B !important;
          transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .admin-theme-root .plan-detail-view-container .add-obj-btn:hover,
        .plan-detail-view-container .add-obj-btn:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 6px 6px 0px #1E293B !important;
        }

        .admin-theme-root .plan-detail-view-container .add-obj-btn:active,
        .plan-detail-view-container .add-obj-btn:active {
          transform: translate(1px, 1px) !important;
          box-shadow: 2px 2px 0px #1E293B !important;
        }

        .admin-theme-root .plan-detail-view-container .empty-sub-state,
        .plan-detail-view-container .empty-sub-state {
          text-align: center;
          padding: 2rem 1rem;
          color: #64748B !important;
          background: #F8FAFC !important;
          border-radius: 12px;
          border: 1.5px dashed #CBD5E1 !important;
        }

        /* Activity / Objective Grid & Cards - Playful Geometric style */
        .plan-detail-view-container .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.2rem;
        }

        .plan-detail-view-container .item-card-v2 {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #E5E7EB !important;
  background: #F9FAFB !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background .2s ease;
  color: #111827 !important;
}

.plan-detail-view-container .item-card-v2:hover {
  background: #FFFFFF !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08) !important;
}

        .plan-detail-view-container .item-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .admin-theme-root .plan-detail-view-container .item-card-title,
        .plan-detail-view-container .item-card-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 800;
          color: #1E293B !important;
          padding-right: 8px;
        }

        .plan-detail-view-container .item-card-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid #E5E7EB !important;
  background: #E5E7EB !important;
  color: #111827 !important;
  white-space: nowrap;
}

/* Remove special colors for duration and target */
/* Keeps neutral style for all tags */


        .admin-theme-root .plan-detail-view-container .item-card-desc,
        .plan-detail-view-container .item-card-desc {
          margin: 0 0 1rem 0;
          font-size: 0.85rem;
          color: #475569 !important;
          line-height: 1.4;
        }

        .plan-detail-view-container .item-card-actions {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          border-top: 1px dashed #E2E8F0;
          padding-top: 8px;
        }

        /* System Admin Modal Integration Styles */
        .plan-detail-view-container .modal-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 18px;
        }

        .plan-detail-view-container .modal-form-grid .form-group {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
        }

        .plan-detail-view-container .modal-form-grid .form-group-full {
          grid-column: 1 / -1;
        }

        .plan-detail-view-container .modal-form-grid label {
          display: block;
          font-size: 0.85rem;
          font-weight: 800;
          color: #1E293B;
          margin-bottom: 6px;
        }

        .plan-detail-view-container .modal-form-grid input,
        .plan-detail-view-container .modal-form-grid select,
        .plan-detail-view-container .modal-form-grid textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px;
          border-radius: 12px;
          border: 2px solid #1E293B;
          font-weight: 700;
          font-family: inherit;
        }

        .plan-detail-view-container .modal-form-grid textarea {
          font-weight: 500;
        }

        .plan-detail-view-container .modal-form-grid select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231E293B' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 16px;
          padding-right: 40px;
        }

        .plan-detail-view-container .modal-flex-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .plan-detail-view-container .modal-flex-col label {
          display: block;
          font-size: 0.85rem;
          font-weight: 800;
          color: #1E293B;
          margin-bottom: 6px;
        }

        .plan-detail-view-container .modal-flex-col input,
        .plan-detail-view-container .modal-flex-col textarea,
        .plan-detail-view-container .modal-flex-col select {
          width: 100%;
          box-sizing: border-box;
          padding: 8px 12px;
          border-radius: 10px;
          border: 2px solid #1E293B;
          font-weight: 700;
          font-family: inherit;
        }

        .plan-detail-view-container .modal-flex-col textarea {
          font-weight: 500;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .plan-detail-view-container .detail-navigation {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .plan-detail-view-container .detail-action-group {
            justify-content: stretch;
          }

          .plan-detail-view-container .detail-action-group button,
          .plan-detail-view-container .back-btn-v2 {
            flex: 1;
            text-align: center;
            justify-content: center;
          }

          .plan-detail-view-container .plan-grid-fields {
            grid-template-columns: 1fr;
          }

          .plan-detail-view-container .sub-tabs-container {
            flex-direction: column;
            gap: 5px;
            border-bottom: none;
          }

          .plan-detail-view-container .sub-tab-btn {
            border-radius: 12px;
            border-bottom: 2px solid #1E293B;
          }

          .plan-detail-view-container .sub-tab-btn.active {
            transform: none;
            background: #EDE9FE;
          }
        }
      `}</style>

      {/* HEADER ACTION */}
      <div className="detail-navigation">
        <button className="back-btn-v2" onClick={onBack}>
          {t.backBtn}
        </button>

        {/* ROLE SIMULATOR WIDGET */}
        <div className="role-simulator-widget">
          <span className="widget-label">🎭 {lang === 'vi' ? 'Giả lập vai trò:' : 'Role Simulator:'}</span>
          <div className="simulator-btn-group">
            <button 
              type="button"
              className={`simulator-btn ${currentSimulatorRole === 'Teacher' ? 'active' : ''}`}
              onClick={() => setCurrentSimulatorRole('Teacher')}
            >
              🩺 {lang === 'vi' ? 'Chuyên gia' : 'Specialist'}
            </button>
            <button 
              type="button"
              className={`simulator-btn ${currentSimulatorRole === 'Parent' ? 'active' : ''}`}
              onClick={() => setCurrentSimulatorRole('Parent')}
            >
              🏠 {lang === 'vi' ? 'Phụ huynh' : 'Parent'}
            </button>
          </div>
        </div>

        {!selectedPhase && (
          <div className="detail-action-group">
            <button className="edit-detail-btn-v2" onClick={() => setIsEditPlanOpen(true)}>
              {t.editPlan}
            </button>
            <button className="delete-detail-btn-v2" onClick={() => setIsDeletePlanOpen(true)}>
              {t.deletePlan}
            </button>
          </div>
        )}
      </div>

      {!selectedPhase ? (
        <>
          {/* INTERVENTION PLAN INFO */}
          <div className="plan-profile-card">
            <div className="card-header-block">
              <span className="profile-badge">
                Plan Profile
              </span>
              <h2 className="profile-title">
                {plan.plan_name}
              </h2>
              <p className="profile-subtitle">{t.subTitle}</p>
            </div>

            <div className="plan-grid-fields">
              <div className="meta-field">
                <strong className="meta-field-label">{t.planId}</strong>
                <span className="meta-field-val">PL-{plan.plan_id}</span>
              </div>
              <div className="meta-field">
                <strong className="meta-field-label">{t.staffId}</strong>
                <span className="meta-field-val">S-00{plan.center_staff_id}</span>
              </div>
              <div className="meta-field">
                <strong className="meta-field-label">{t.childId}</strong>
                <span className="meta-field-val">C-00{plan.child_id}</span>
              </div>
              <div className="meta-field">
                <strong className="meta-field-label">{t.academicYear}</strong>
                <span className="meta-field-val">{plan.academic_year}</span>
              </div>
              <div className="meta-field">
                <strong className="meta-field-label">{t.startDate}</strong>
                <span className="meta-field-val">{plan.start_date}</span>
              </div>
              <div className="meta-field">
                <strong className="meta-field-label">{t.endDate}</strong>
                <span className="meta-field-val">{plan.end_date}</span>
              </div>
              <div className="meta-field meta-field-full">
                <strong className="meta-field-label">{t.assessmentTool}</strong>
                <span className="assessment-tool-box">{plan.assessment_tool || t.noData}</span>
              </div>
              <div className="profile-bento-grid">
                <div className="strengths-box">
                  <strong className="section-box-title strengths-title">{t.strengths}</strong>
                  <p className="box-content">{plan.child_strengths || t.noData}</p>
                </div>

                <div className="weaknesses-box">
                  <strong className="section-box-title weaknesses-title">{t.weaknesses}</strong>
                  <p className="box-content">{plan.child_weaknesses || t.noData}</p>
                </div>

                <div className="interests-box">
                  <strong className="section-box-title interests-title">{t.interests}</strong>
                  <p className="box-content">{plan.child_interests || t.noData}</p>
                </div>

                <div className="feedback-box">
                  <strong className="section-box-title feedback-title">{t.feedback}</strong>
                  <p className="box-content">{plan.family_feedback || t.noData}</p>
                </div>
              </div>

              <div className="meta-field">
                <strong className="meta-field-label">{t.status}</strong>
                <span className={`plan-status-badge ${plan.status.toLowerCase()}`}>
                  {plan.status === 'Active' ? t.active : t.inactive}
                </span>
              </div>
              <div className="meta-field">
                <strong className="meta-field-label">{t.createdAt}</strong>
                <span className="meta-date-text">{plan.created_at}</span>
              </div>
              <div className="meta-field">
                <strong className="meta-field-label">{t.updatedAt}</strong>
                <span className="meta-date-text">{plan.updated_at}</span>
              </div>
            </div>
          </div>

          {/* PLAN PHASE MANAGEMENT */}
          <div className="phase-management-card">
            <div className="phase-section-header">
              <div>
                <h3 className="phase-section-title">📊 {t.phasesTitle}</h3>
                <p className="phase-section-subtitle">{t.phaseList}</p>
              </div>
              <div className="phase-section-actions">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder={lang === 'vi' ? 'Tìm kiếm giai đoạn...' : 'Search phases...'}
                    value={phaseSearchTerm}
                    onChange={(e) => setPhaseSearchTerm(e.target.value)}
                  />
                </div>
                <button className="add-btn" onClick={() => openPhaseModal('create')}>
                  + {t.addPhase}
                </button>
              </div>
            </div>

            {filteredPhases.length === 0 ? (
              <div className="empty-state-box">
                <p>{phaseSearchTerm ? (lang === 'vi' ? 'Không tìm thấy kết quả phù hợp' : 'No matching phases found') : t.noPhases}</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="phase-table">
                  <thead>
                    <tr>
                      <th>{t.phaseId}</th>
                      <th>{t.phaseName}</th>
                      <th>{t.phaseType}</th>
                      <th>{t.startDate}</th>
                      <th>{t.endDate}</th>
                      <th>{t.status}</th>
                      <th style={{ textAlign: 'center' }}>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPhases.map((p) => (
                      <tr
                        key={p.plan_phase_id}
                        className="phase-row"
                        onClick={() => setSelectedPhase(p)}
                      >
                        <td className="cell-first">
                          PH-{p.plan_phase_id}
                        </td>
                        <td className="cell-name">
                          {p.phase_name}
                        </td>
                        <td className="cell-type">
                          <span className="phase-type-tag">
                            {p.phase_type}
                          </span>
                        </td>
                        <td className="cell-date">
                          {p.start_date}
                        </td>
                        <td className="cell-date">
                          {p.end_date}
                        </td>
                        <td>
                          <span className={`phase-status-badge ${p.status.toLowerCase()}`}>
                            {p.status === 'Active' ? t.active : t.inactive}
                          </span>
                        </td>
                        <td
                          className="cell-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="phase-actions-container">
                            <button
                              className="edit-btn-v2"
                              title={t.editPhase}
                              onClick={() => openPhaseModal('update', p)}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                              </svg>
                            </button>
                            <button
                              className="delete-btn-v2"
                              title={t.deletePhase}
                              onClick={() => openPhaseModal('delete', p)}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        /* VIEW PLAN PHASE DETAIL */
        <div className="phase-detail-workspace-card">
          <div className="detail-navigation">
            <button className="back-btn-v2" onClick={() => setSelectedPhase(null)}>
              {t.backToPhases}
            </button>
          </div>

          <div className="phase-detail-inner">
            <div className="phase-detail-header-block">
              <div>
                <span className="phase-detail-badge">
                  Phase Details
                </span>
                <h2 className="phase-detail-title">
                  {selectedPhase.phase_name}
                </h2>
              </div>
              <div className="phase-detail-tags">

              </div>
            </div>

            {/* CARD 1: PHASE OVERVIEW */}
            <div className="phase-detail-card" style={{ marginBottom: '2rem' }}>
              <div className="section-pane-header" style={{ marginBottom: '1.2rem', borderBottom: '2px dashed #E2E8F0', paddingBottom: '0.75rem' }}>
                <h4 className="section-pane-title" style={{ fontSize: '1.25rem' }}>{t.tabOverview || 'Phase Overview'}</h4>
              </div>
              <div className="overview-grid">
                <div className="meta-field">
                  <strong className="meta-field-label">{t.phaseId}</strong>
                  <span className="meta-field-val">PH-{selectedPhase.plan_phase_id}</span>
                </div>
                <div className="meta-field">
                  <strong className="meta-field-label">{t.planId}</strong>
                  <span className="meta-field-val">PL-{selectedPhase.plan_id}</span>
                </div>
                <div className="meta-field">
                  <strong className="meta-field-label">{t.phaseType}</strong>
                  <span className="meta-field-val">{selectedPhase.phase_type}</span>
                </div>
                <div className="meta-field">
                  <strong className="meta-field-label">{t.startDate}</strong>
                  <span className="meta-field-val">{selectedPhase.start_date}</span>
                </div>
                <div className="meta-field">
                  <strong className="meta-field-label">{t.endDate}</strong>
                  <span className="meta-field-val">{selectedPhase.end_date}</span>
                </div>
                <div className="meta-field">
                  <strong className="meta-field-label">{t.status}</strong>
                  <span className={`phase-status-badge ${selectedPhase.status.toLowerCase()}`}>
                    {selectedPhase.status === 'Active' ? t.active : t.inactive}
                  </span>
                </div>
                <div className="meta-field">
                  <strong className="meta-field-label">{t.isDeleted}</strong>
                  <span className="meta-field-val">{selectedPhase.is_deleted ? 'TRUE' : 'FALSE'}</span>
                </div>
                <div className="meta-field">
                  <strong className="meta-field-label">{t.createdAt}</strong>
                  <span className="meta-date-text">{selectedPhase.created_at}</span>
                </div>
                <div className="meta-field">
                  <strong className="meta-field-label">{t.updatedAt}</strong>
                  <span className="meta-date-text">{selectedPhase.updated_at}</span>
                </div>
                {selectedPhase.deleted_at && (
                  <div className="meta-field">
                    <strong className="meta-field-label">{t.deletedAt}</strong>
                    <span className="meta-date-text" style={{ color: '#EF4444' }}>{selectedPhase.deleted_at}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CARD 2: MANAGE OBJECTIVES */}
            <div className="phase-detail-card">
              {/* Section Objectives */}
              <div className="objectives-section">
                <div 
                  className="section-pane-header" 
                  style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem', 
                    padding: '14px 20px',
                    background: '#FFFFFF',
                    border: '3px solid #1E293B',
                    borderRadius: '16px',
                    boxShadow: '4px 4px 0px #1E293B'
                  }}
                >
                  <h4 className="section-pane-title" style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1E293B', margin: 0 }}>
                    📝 {t.objTitle || 'Manage Objectives'}
                  </h4>
                  <button 
                    className="add-btn" 
                    onClick={() => openObjModal('create')}
                    style={{
                      height: 'auto',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      boxShadow: '2.5px 2.5px 0px #1E293B',
                      background: '#8B5CF6',
                      borderColor: '#1E293B'
                    }}
                  >
                    + {t.addObj || 'Add Objective'}
                  </button>
                </div>

                {selectedPhase.objectives.length === 0 ? (
                  <div className="empty-sub-state">
                    <p>{t.noObj}</p>
                  </div>
                ) : (
                  <div className="objectives-table-wrapper" style={{ overflowX: 'auto' }}>
                    <table className="objectives-table">
                      <thead>
                        <tr>
                          <th style={{ width: '8%', textAlign: 'center' }}></th>
                          <th style={{ width: '47%', textAlign: 'left' }}>
                            {t.objName || 'Tên mục tiêu'}
                          </th>
                          <th style={{ width: '15%', textAlign: 'center' }}>
                            {'Target'}
                          </th>
                          <th style={{ width: '15%', textAlign: 'center' }}>
                            {'Status'}
                          </th>
                          <th style={{ width: '15%', textAlign: 'center' }}>
                            {'Actions'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPhase.objectives.map(obj => {
                          const isExpanded = expandedObjId === obj.objective_id;
                          // Giả định dữ liệu activities đi kèm trong object hoặc fallback mảng rỗng
                          const activities = obj.activities || [];

                          return (
                            <React.Fragment key={obj.objective_id}>
                              {/* Dòng chính chứa Objective */}
                              <tr
                                className={`obj-main-row ${isExpanded ? 'active' : ''}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => toggleExpandRow(obj.objective_id)}
                              >
                                {/* Mũi tên chỉ trạng thái đóng/mở */}
                                <td style={{ textAlign: 'center' }}>
                                  <div 
                                    style={{
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '50%',
                                      border: '2px solid #1E293B',
                                      background: isExpanded ? '#8B5CF6' : '#FFFFFF',
                                      color: isExpanded ? '#FFFFFF' : '#1E293B',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      boxShadow: '2px 2px 0px #1E293B',
                                      transition: 'all 0.2s ease',
                                      transform: isExpanded ? 'scale(1.05)' : 'scale(1)',
                                      margin: '0 auto'
                                    }}
                                  >
                                    <span style={{ display: 'inline-block', fontSize: '0.65rem', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                                      ▶
                                    </span>
                                  </div>
                                </td>
                                <td style={{ color: '#1E293B' }}>
                                  {obj.objective_name}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  <span className="item-card-tag duration" style={{ display: 'inline-block', padding: '0.25rem 0.5rem', background: '#F1F5F9', borderRadius: '4px', fontSize: '0.85rem' }}>
                                    {obj.target_date}
                                  </span>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  <span 
                                    className={`report-badge ${obj.status === 'Completed' ? 'approved' : 'pending'}`}
                                    style={{
                                      backgroundColor: obj.status === 'Completed' ? '#D1FAE5' : '#FEF9C3',
                                      color: obj.status === 'Completed' ? '#065F46' : '#854D0E',
                                      borderColor: '#1E293B',
                                      borderWidth: '2.5px',
                                      borderStyle: 'solid',
                                      fontSize: '0.75rem',
                                      padding: '4px 10px',
                                      boxShadow: '1.5px 1.5px 0px #1E293B'
                                    }}
                                  >
                                    {obj.status === 'Completed' ? (lang === 'vi' ? '👍 Hoàn thành' : 'Completed') : (lang === 'vi' ? '⏳ Đang thực hiện' : 'In process')}
                                  </span>
                                </td>
                                {/* Cột Action chặn sụp đổ dòng khi click nút bấm (stopPropagation) */}
                                <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                                  <div className="item-card-actions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <button className="edit-btn-v2" 
                                    title={'details'}
                                     onClick={() => openObjModal('view', obj)}>
                                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                      </svg>
                                    </button>
                                    <button
                                      className="edit-btn-v2"
                                      title={t.editPhase || 'Sửa'}
                                      onClick={() => openObjModal('update', obj)}
                                    >
                                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                      </svg>
                                    </button>
                                    <button
                                      className="delete-btn-v2"
                                      title={t.deletePhase || 'Xóa'}
                                      onClick={() => openObjModal('delete', obj)}
                                    >
                                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              {/* Dòng phụ hiển thị danh sách Activity (Chỉ render khi dòng này được mở) */}
                              {isExpanded && (
                                <tr className="activity-row-expanded">
                                  <td colSpan={5}>
                                    <div className="activity-section-wrapper" style={{ animation: 'fadeIn 0.2s ease-out', padding: '12px' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <h5 style={{ margin: 0, fontSize: '0.9rem', color: '#1E293B', fontWeight: '800' }}>
                                          📋 {lang === 'vi' ? 'Danh sách Hoạt động rèn luyện' : 'Intervention Activities List'}
                                        </h5>
                                        
                                        {currentSimulatorRole === 'Teacher' && (
                                          <button 
                                            type="button" 
                                            className="add-btn" 
                                            style={{ padding: '4px 12px', fontSize: '0.75rem', height: 'auto' }}
                                            onClick={() => openActModal('create', obj.objective_id)}
                                          >
                                            ➕ {lang === 'vi' ? 'Thêm Hoạt động' : 'Add Activity'}
                                          </button>
                                        )}
                                      </div>

                                      {(!activities || activities.filter(a => !a.is_deleted).length === 0) ? (
                                        <div style={{ textAlign: 'center', padding: '20px', color: '#94A3B8', fontStyle: 'italic', background: '#ffffff', borderRadius: '6px', border: '1px dashed #CBD5E1' }}>
                                          {lang === 'vi' ? 'Chưa có hoạt động nào được lập cho mục tiêu này.' : 'No activities planned for this objective.'}
                                        </div>
                                      ) : (
                                        <table className="activity-sub-table">
                                          <thead>
                                            <tr>
                                              <th>{(t as any).actExercise || 'Bài tập'}</th>
                                              <th>{(t as any).actFreq || 'Tần suất'}</th>
                                              <th>{(t as any).actMethodCol || 'PP Giảng dạy'}</th>
                                              <th>{(t as any).actCriteria || 'Tiêu chí'}</th>
                                              <th>{(t as any).actAssigneeCol || 'Thực hiện'}</th>
                                              <th>{lang === 'vi' ? 'Trạng thái & Bài nộp' : 'Status & Submissions'}</th>
                                              <th style={{ textAlign: 'right' }}>{(t as any).actActions || 'Thao tác'}</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {activities.filter(a => !a.is_deleted).map((act, index) => {
                                              const subs = act.submissions || [];
                                              const currentStatus = act.status === 'Submitted' ? 'Submitted' : 'In Progress';
                                              const submitTimes = subs.length > 0 ? Math.max(...subs.map(s => s.submit_times)) : 0;
                                              return (
                                                <tr key={act.activity_id || index}>
                                                  <td style={{ color: '#0F172A' }}>{act.activity_name}</td>
                                                  <td>{act.frequency}</td>
                                                  <td style={{ whiteSpace: 'pre-wrap' }}>{act.teaching_method}</td>
                                                  <td>{act.target_criteria}</td>
                                                  <td>
                                                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#E2E8F0', fontSize: '0.75rem', fontWeight: 700 }}>{act.assignee_type}</span>
                                                  </td>
                                                  <td>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                                                      <span 
                                                        className={`report-badge ${currentStatus === 'Submitted' ? 'pending' : 'approved'}`}
                                                        style={{ 
                                                          backgroundColor: currentStatus === 'Submitted' ? '#FEF3C7' : '#E2E8F0',
                                                          color: currentStatus === 'Submitted' ? '#B45309' : '#334155',
                                                          borderColor: '#1E293B',
                                                          borderWidth: '2px',
                                                          borderStyle: 'solid',
                                                          boxShadow: '1.5px 1.5px 0px #1E293B'
                                                        }}
                                                      >
                                                        {currentStatus === 'Submitted' 
                                                          ? (lang === 'vi' ? '⏳ Chờ Review' : '⏳ Submitted')
                                                          : (lang === 'vi' ? '🏃 Đang thực hiện' : '🏃 In Progress')}
                                                      </span>
                                                      {submitTimes > 0 && (
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E293B' }}>
                                                          📥 {lang === 'vi' ? `Đã nộp: ${submitTimes} lần` : `Submitted: ${submitTimes} times`}
                                                        </span>
                                                      )}
                                                    </div>
                                                  </td>
                                                  <td>
                                                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                      <button 
                                                        type="button"
                                                        className="report-action-btn evaluate"
                                                        style={{
                                                          background: currentStatus === 'Submitted' && currentSimulatorRole === 'Teacher' ? '#FBBF24 !important' : '#FFFFFF !important',
                                                          color: '#1E293B !important',
                                                          borderColor: '#1E293B !important',
                                                          fontWeight: 800,
                                                          display: 'inline-flex',
                                                          alignItems: 'center',
                                                          gap: '4px'
                                                        }}
                                                        onClick={() => openActModal('view', obj.objective_id, act)}
                                                      >
                                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                                        </svg>
                                                        {currentStatus === 'Submitted' && currentSimulatorRole === 'Teacher' 
                                                              ? (lang === 'vi' ? 'Review ngay' : 'Review') 
                                                              : (lang === 'vi' ? 'Details' : 'Details')}
                                                      </button>
                                                      
                                                      {currentSimulatorRole === 'Teacher' && (
                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                          <button type="button" className="edit-btn-v2" onClick={() => openActModal('update', obj.objective_id, act)}>
                                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                                                          </button>
                                                          <button type="button" className="delete-btn-v2" onClick={() => openActModal('delete', obj.objective_id, act)}>
                                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                                                          </button>
                                                        </div>
                                                      )}
                                                    </div>
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                          </tbody>
                                        </table>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS SECTION */}
      {/* ========================================================================= */}



      {/* TOAST SUCCESS NOTIFICATION */}
      {toastMessage && (
        <div className="profile-toast-floating animate-in" style={{ animation: 'bounceIn 0.3s ease-out' }}>
          {toastMessage}
        </div>
      )}

      {/* EDIT PLAN MODAL */}
      {isEditPlanOpen && (
        <div className="modal-overlay" onClick={() => setIsEditPlanOpen(false)}>
          <div className="admin-modal animate-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📝 {t.editPlanTitle}</h3>
              <button className="close-modal" onClick={() => setIsEditPlanOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSavePlan}>
              <div className="modal-body modal-body-scroll">
                <div className="modal-form modal-form-grid">
                  <div className="form-group form-group-full">
                    <label>{t.planName}</label>
                    <input required type="text" value={editPlanName} onChange={e => setEditPlanName(e.target.value)} spellCheck="false" />
                  </div>



                  <div className="form-group form-group-full">
                    <label>{t.assessmentTool}</label>
                    <input type="text" value={editAssessmentTool} onChange={e => setEditAssessmentTool(e.target.value)} spellCheck="false" />
                  </div>

                  <div className="form-group form-group-full">
                    <label>{t.strengths}</label>
                    <textarea rows={3} value={editStrengths} onChange={e => setEditStrengths(e.target.value)} spellCheck="false" />
                  </div>

                  <div className="form-group form-group-full">
                    <label>{t.weaknesses}</label>
                    <textarea rows={3} value={editWeaknesses} onChange={e => setEditWeaknesses(e.target.value)} spellCheck="false" />
                  </div>

                  <div className="form-group form-group-full">
                    <label>{t.interests}</label>
                    <textarea rows={3} value={editInterests} onChange={e => setEditInterests(e.target.value)} spellCheck="false" />
                  </div>

                  <div className="form-group form-group-full">
                    <label>{t.feedback}</label>
                    <textarea rows={3} value={editFeedback} onChange={e => setEditFeedback(e.target.value)} spellCheck="false" />
                  </div>

                  <div className="form-group">
                    <label>{t.startDate}</label>
                    <input required type="date" value={editStartDate} onChange={e => setEditStartDate(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t.endDate}</label>
                    <input required type="date" value={editEndDate} onChange={e => setEditEndDate(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsEditPlanOpen(false)}>
                  {t.cancel}
                </button>
                <button type="submit" className="btn-primary">
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE PLAN CONFIRMATION MODAL */}
      {isDeletePlanOpen && (
        <div className="modal-overlay" onClick={() => setIsDeletePlanOpen(false)}>
          <div className="admin-modal animate-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ color: '#EF4444' }}>⚠️ {t.confirmDeletePlan}</h3>
              <button className="close-modal" onClick={() => setIsDeletePlanOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="delete-confirm">

                <p>{t.confirmDeletePlanSub}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setIsDeletePlanOpen(false)}>
                {t.cancel}
              </button>
              <button type="button" className="btn-primary btn-danger" onClick={() => { onDeletePlan(plan.plan_id); alert(t.success); setIsDeletePlanOpen(false); }}>
                {t.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE & UPDATE & DELETE PLAN PHASE MODAL */}
      {isPhaseModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPhaseModalOpen(false)}>
          <div className="admin-modal animate-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {phaseModalMode === 'create' && `✨ ${t.createPhaseTitle}`}
                {phaseModalMode === 'update' && `📝 ${t.updatePhaseTitle}`}
                {phaseModalMode === 'delete' && `⚠️ ${t.confirmDeletePhase}`}
              </h3>
              <button className="close-modal" onClick={() => setIsPhaseModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSavePhase}>
              <div className="modal-body">
                {phaseModalMode === 'delete' ? (
                  <div className="delete-confirm">

                    <p>{t.deleteSub}</p>
                  </div>
                ) : (
                  <div className="modal-form modal-form-grid">
                    <div className="form-group form-group-full">
                      <label>{t.phaseName}</label>
                      <input required type="text" value={phaseName} onChange={e => setPhaseName(e.target.value)} spellCheck="false" />
                    </div>
                    <div className="form-group">
                      <label>{t.phaseType}</label>
                      <input required type="text" placeholder="Ví dụ: PECS, ABA, TEACCH" value={phaseType} onChange={e => setPhaseType(e.target.value)} spellCheck="false" />
                    </div>

                    <div className="form-group">
                      <label>{t.startDate}</label>
                      <input required type="date" value={phaseStartDate} onChange={e => setPhaseStartDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>{t.endDate}</label>
                      <input required type="date" value={phaseEndDate} onChange={e => setPhaseEndDate(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsPhaseModalOpen(false)}>
                  {t.cancel}
                </button>
                <button type="submit" className={`btn-primary ${phaseModalMode === 'delete' ? 'btn-danger' : ''}`}>
                  {phaseModalMode === 'delete' ? t.confirmDelete : (phaseModalMode === 'create' ? t.create : t.save)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CRUD ACTIVITY MODAL (Removed per user request) */}

            {/* ACTIVITY MODAL */}
      {isActModalOpen && (
        <div className="modal-overlay" onClick={() => setIsActModalOpen(false)}>
          <div className="admin-modal animate-in" onClick={(e) => e.stopPropagation()} style={{ width: actModalMode === 'view' ? '920px' : '600px', maxWidth: '95vw', maxHeight: 'none' }}>
            <div className="modal-header">
              <h3>
                {actModalMode === 'create' && `✨ ${(t as any).addAct || 'Thêm Hoạt động'}`}
                {actModalMode === 'update' && `📝 ${(t as any).editAct || 'Cập nhật Hoạt động'}`}
                {actModalMode === 'delete' && `⚠️ ${(t as any).confirmDeleteAct || 'Xóa Hoạt động'}`}
                {actModalMode === 'view' && `👁️ ${(t as any).actDetailsTitle || 'Chi tiết Hoạt động'}`}
              </h3>
              <button className="close-modal" onClick={() => setIsActModalOpen(false)}>×</button>
            </div>

            <form onSubmit={actModalMode === 'view' ? (e) => e.preventDefault() : handleSaveAct}>
              <div className="modal-body">
                {actModalMode === 'view' ? (
                  <div className="modal-body">
                    <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '16px' }}>
                      {(t as any).actDetailsSubtitle || 'Xem chi tiết hướng dẫn thao tác, nộp báo cáo thực hành tại nhà và đánh giá chuyên môn từ Chuyên gia.'}
                    </p>
                    
                    <div className="modal-body-scroll-bar-custom" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '20px', alignItems: 'stretch' }}>
                      
                      {/* CỘT TRÁI: THÔNG TIN CHI TIẾT HOẠT ĐỘNG */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ padding: '14px', background: '#FFFFFF', border: '3px solid #1E293B', borderRadius: '16px', boxShadow: '4px 4px 0px #1E293B' }}>
                          <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: 900, color: '#1E293B', borderBottom: '2.5px solid #1E293B', paddingBottom: '6px' }}>
                            🎯 {lang === 'vi' ? 'Thông tin hoạt động' : 'Activity details'}
                          </h4>
                          
                          <div className="modal-flex-col" style={{ gap: '10px' }}>
                            <div className="form-group form-group-full">
                              <label style={{ fontSize: '0.8rem', color: '#64748B' }}>{(t as any).actName || 'Tên bài tập'}</label>
                              <input type="text" readOnly value={actName || ''} style={{ backgroundColor: '#F8FAFC', color: '#1E293B', fontWeight: 800, border: '2px solid #E2E8F0', borderRadius: '8px', padding: '6px 10px', width: '100%', boxSizing: 'border-box' }} />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <div className="form-group" style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', color: '#64748B' }}>{(t as any).actFreq || 'Tần suất'}</label>
                                <input type="text" readOnly value={actFrequency || ''} style={{ backgroundColor: '#F8FAFC', color: '#1E293B', fontWeight: 700, border: '2px solid #E2E8F0', borderRadius: '8px', padding: '6px 10px', width: '100%', boxSizing: 'border-box' }} />
                              </div>
                              <div className="form-group" style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', color: '#64748B' }}>{(t as any).actAssigneeCol || 'Thực hiện'}</label>
                                <input type="text" readOnly value={actAssigneeType || ''} style={{ backgroundColor: '#F8FAFC', color: '#1E293B', fontWeight: 700, border: '2px solid #E2E8F0', borderRadius: '8px', padding: '6px 10px', width: '100%', boxSizing: 'border-box' }} />
                              </div>
                            </div>

                            <div className="form-group form-group-full">
                              <label style={{ fontSize: '0.8rem', color: '#64748B' }}>{(t as any).actMethodCol || 'Phương pháp giảng dạy'}</label>
                              <textarea rows={3} readOnly value={actTeachingMethod || ''} style={{ backgroundColor: '#F8FAFC', color: '#1E293B', fontWeight: 500, border: '2px solid #E2E8F0', borderRadius: '8px', padding: '6px 10px', width: '100%', boxSizing: 'border-box', resize: 'none' }} />
                            </div>

                            <div className="form-group form-group-full">
                              <label style={{ fontSize: '0.8rem', color: '#64748B' }}>{(t as any).actCriteria || 'Tiêu chí đạt'}</label>
                              <input type="text" readOnly value={actTargetCriteria || ''} style={{ backgroundColor: '#F8FAFC', color: '#1E293B', fontWeight: 700, border: '2px solid #E2E8F0', borderRadius: '8px', padding: '6px 10px', width: '100%', boxSizing: 'border-box' }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CỘT PHẢI: KHU VỰC TIẾN TRÌNH & ĐÁNH GIÁ TƯƠNG TÁC */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ padding: '14px', background: '#FFFDF5', border: '3px solid #1E293B', borderRadius: '16px', boxShadow: '4px 4px 0px #1E293B', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '2.5px solid #1E293B', paddingBottom: '6px' }}>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#1E293B' }}>
                              📈 {lang === 'vi' ? 'Tiến trình & Tương tác' : 'Practice & Review'}
                            </h4>
                            
                            <span 
                              className={`report-badge ${(activeActivityForReport?.status || 'In Progress') === 'Submitted' ? 'pending' : 'approved'}`}
                              style={{ 
                                backgroundColor: (activeActivityForReport?.status || 'In Progress') === 'Submitted' ? '#FEF3C7' : '#F1F5F9',
                                color: (activeActivityForReport?.status || 'In Progress') === 'Submitted' ? '#D97706' : '#475569',
                                borderColor: '#1E293B',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                fontSize: '0.75rem'
                              }}
                            >
                              {(activeActivityForReport?.status || 'In Progress') === 'Submitted' 
                                ? (lang === 'vi' ? '⏳ Chờ Review' : '⏳ Submitted')
                                : (lang === 'vi' ? '🏃 Đang thực hiện' : '🏃 In Progress')}
                            </span>
                          </div>

                          {/* LUỒNG PHỤ HUYNH */}
                          {currentSimulatorRole === 'Parent' && (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <form onSubmit={handleSaveSubmission} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>
                                    📤 {lang === 'vi' ? 'Nộp bài tập thực hành mới' : 'Submit Practice Check-in'}
                                  </strong>
                                  <button 
                                    type="button" 
                                    style={{
                                      background: '#FBBF24',
                                      border: '2px solid #1E293B',
                                      borderRadius: '8px',
                                      padding: '2px 8px',
                                      fontSize: '0.7rem',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      boxShadow: '1.5px 1.5px 0px #1E293B',
                                      fontFamily: '"Be Vietnam Pro", sans-serif'
                                    }}
                                    onClick={() => {
                                      setReportMediaFile('https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');
                                      setReportParentNote(lang === 'vi' 
                                        ? 'Bé hôm nay tự tay xếp Lego rất tập trung. Khi ba gọi tên để trao mảnh ghép Lego mới, bé đã chủ động nhìn vào mắt ba khoảng 4 giây liên tiếp và mỉm cười rất ngoan ạ!' 
                                        : 'Today he assembled Lego very cooperatively. When called to receive a new piece, he actively maintained eye contact for about 4 seconds and smiled.');
                                    }}
                                  >
                                    🪄 {lang === 'vi' ? 'Dữ liệu mẫu' : 'Fill Demo'}
                                  </button>
                                </div>

                                {reportMediaFile ? (
                                  <div className="media-preview-container animate-in" style={{ maxHeight: '130px', border: '2px solid #1E293B' }}>
                                    <img src={reportMediaFile} alt="Preview" className="media-preview-img" style={{ maxHeight: '130px' }} />
                                    <button type="button" className="btn-remove-media" style={{ width: '22px', height: '22px', fontSize: '0.8rem' }} onClick={() => setReportMediaFile('')}>×</button>
                                  </div>
                                ) : (
                                  <div 
                                    className="memphis-uploader"
                                    style={{ padding: '14px', borderRadius: '12px', border: '2px dashed #1E293B', background: '#FFFFFF' }}
                                    onClick={() => {
                                      const input = document.createElement('input');
                                      input.type = 'file';
                                      input.accept = 'image/*,video/*';
                                      input.onchange = (e: any) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                          const reader = new FileReader();
                                          reader.onload = (uploadEvent: any) => {
                                            setReportMediaFile(uploadEvent.target.result);
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      };
                                      input.click();
                                    }}
                                  >
                                    <span style={{ fontSize: '1.5rem' }}>📷</span>
                                    <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.75rem' }}>
                                      {lang === 'vi' ? 'Nhấp để tải ảnh/video thực hành' : 'Click to Upload Practice Media'}
                                    </span>
                                  </div>
                                )}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>✍️ {lang === 'vi' ? 'Nhật ký rèn luyện của ba mẹ' : 'Parent Practice Notes'}</label>
                                  <textarea 
                                    required
                                    rows={2}
                                    value={reportParentNote}
                                    onChange={e => setReportParentNote(e.target.value)}
                                    placeholder={lang === 'vi' ? 'Ghi nhận phản ứng hoặc khó khăn của con khi rèn luyện...' : 'Describe how the child responded during the session...'}
                                    style={{ border: '2px solid #1E293B', borderRadius: '8px', padding: '6px 8px', fontSize: '0.8rem', fontFamily: 'inherit', fontWeight: 500, width: '100%', boxSizing: 'border-box', resize: 'none' }}
                                  />
                                </div>

                                <button type="submit" className="btn-primary" style={{ background: '#8B5CF6', padding: '6px 14px', fontSize: '0.8rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  🚀 {lang === 'vi' ? 'Gửi bài tập thực hành' : 'Submit Practice Check-in'}
                                </button>
                              </form>
                            </div>
                          )}

                          {/* LUỒNG CHUYÊN GIA / GIÁO VIÊN */}
                          {currentSimulatorRole === 'Teacher' && (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                              {(activeActivityForReport?.status || 'In Progress') === 'Submitted' && activeActivityForReport?.submissions && activeActivityForReport.submissions.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                                  {(() => {
                                    const subsList = activeActivityForReport.submissions || [];
                                    const lastSub = subsList[subsList.length - 1];
                                    const lastImages = lastSub.evidence_videos_json ? JSON.parse(lastSub.evidence_videos_json) : [];
                                    return (
                                      <>
                                        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '12px', border: '2px solid #1E293B', fontSize: '0.8rem' }}>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 800, color: '#475569' }}>📥 {lang === 'vi' ? `Bài nộp mới nhất (Lần ${lastSub.submit_times})` : `Latest Submission (Times ${lastSub.submit_times})`}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{lastSub.submission_date}</span>
                                          </div>
                                          <p style={{ margin: '0 0 6px 0', fontStyle: 'italic', color: '#0F172A' }}>"{lastSub.submitter_note}"</p>
                                          
                                          {lastImages.length > 0 && (
                                            <div className="media-preview-container" style={{ maxHeight: '90px', border: '1.5px solid #1E293B', borderRadius: '8px', overflow: 'hidden' }}>
                                              <img src={lastImages[0]} alt="Evidence" style={{ maxHeight: '90px', objectFit: 'contain' }} />
                                            </div>
                                          )}
                                        </div>

                                        <div style={{ borderTop: '2px dashed #CBD5E1', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                          <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B' }}>✍️ {lang === 'vi' ? 'Nhận xét chuyên môn & Hướng dẫn (Review)' : 'Expert Feedback & Review'}</label>
                                          <textarea 
                                            required
                                            rows={2}
                                            value={evalFeedback}
                                            onChange={e => setEvalFeedback(e.target.value)}
                                            placeholder={lang === 'vi' ? 'Nhập phản hồi chuyên môn, định hướng trị liệu cho phụ huynh...' : 'Write clinical recommendations for parents...'}
                                            style={{ border: '2px solid #1E293B', borderRadius: '8px', padding: '6px 8px', fontSize: '0.8rem', fontFamily: 'inherit', fontWeight: 500, width: '100%', boxSizing: 'border-box', resize: 'none' }}
                                          />
                                          <button 
                                            type="button" 
                                            className="btn-primary" 
                                            style={{ background: '#FBBF24', color: '#1E293B', fontWeight: 800, padding: '6px 14px', fontSize: '0.8rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            onClick={() => handleSaveReview(lastSub.activity_submission_id)}
                                          >
                                            💾 {lang === 'vi' ? 'Gửi đánh giá chuyên môn' : 'Submit Review'}
                                          </button>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              ) : (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', background: '#FFFFFF', borderRadius: '12px', border: '2px dashed #CBD5E1' }}>
                                  <span style={{ fontSize: '2rem', marginBottom: '8px' }}>⏳</span>
                                  <strong style={{ fontSize: '0.85rem', color: '#475569' }}>
                                    {lang === 'vi' ? 'Chưa có bài nộp mới cần Review' : 'No new submissions to review'}
                                  </strong>
                                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
                                    {lang === 'vi' ? 'Khi phụ huynh gửi bài thực hành mới tại nhà, bạn sẽ thấy bài nộp và form chấm điểm tại đây.' : 'Form will open as soon as parents submit practice records.'}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* DÒNG PHỤ DƯỚI CÙNG: TIMELINE LỊCH SỬ THỰC HÀNH & ĐÁNH GIÁ (Full width cả 2 cột) */}
                      <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                        <h4 style={{ fontWeight: 800, color: '#1E293B', marginBottom: '12px', borderBottom: '2.5px solid #1E293B', paddingBottom: '6px' }}>
                          📋 {lang === 'vi' ? 'Lịch sử rèn luyện & Đánh giá' : 'Practice & Review Timeline'}
                        </h4>

                        {(!activeActivityForReport?.submissions || activeActivityForReport.submissions.length === 0) ? (
                          <div style={{ textAlign: 'center', padding: '24px', background: '#F8FAFC', border: '2px dashed #CBD5E1', borderRadius: '16px', color: '#94A3B8', fontSize: '0.85rem' }}>
                            {lang === 'vi' ? 'Chưa có lịch sử rèn luyện nào được ghi nhận.' : 'No practice history has been recorded yet.'}
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {(activeActivityForReport.submissions || []).slice().reverse().map((sub) => {
                              const matchingReview = (activeActivityForReport.reviews || []).find(r => r.submission_review_id === sub.activity_submission_id);
                              const images = sub.evidence_videos_json ? JSON.parse(sub.evidence_videos_json) : [];
                              return (
                                <div key={sub.activity_submission_id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: '#FFFFFF', border: '2px solid #1E293B', borderRadius: '14px', boxShadow: '3px 3px 0px #1E293B' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#8B5CF6' }}>
                                      📥 {lang === 'vi' ? `Lần thực hành ${sub.submit_times}` : `Practice Attempt ${sub.submit_times}`}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>
                                      📅 {sub.submission_date}
                                    </span>
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: images.length > 0 ? '1.5fr 1fr' : '1fr', gap: '12px' }}>
                                    <div>
                                      <strong style={{ fontSize: '0.75rem', color: '#475569', display: 'block', marginBottom: '2px' }}>
                                        💬 {lang === 'vi' ? 'Ba mẹ ghi chú:' : 'Parent Note:'}
                                      </strong>
                                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#0F172A', fontStyle: 'italic', background: '#F8FAFC', padding: '8px', borderRadius: '8px', border: '1.5px solid #E2E8F0' }}>
                                        "{sub.submitter_note}"
                                      </p>
                                    </div>
                                    {images.length > 0 && (
                                      <div>
                                        <strong style={{ fontSize: '0.75rem', color: '#475569', display: 'block', marginBottom: '2px' }}>
                                          📷 {lang === 'vi' ? 'Bằng chứng thực tế:' : 'Evidence:'}
                                        </strong>
                                        <div className="media-preview-container" style={{ maxHeight: '90px', border: '2px solid #1E293B', borderRadius: '8px', overflow: 'hidden' }}>
                                          <img src={images[0]} alt="Practice evidence" style={{ maxHeight: '90px', objectFit: 'contain', width: '100%' }} />
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Nhận xét tương ứng của chuyên gia */}
                                  {matchingReview ? (
                                    <div style={{ marginTop: '4px', padding: '10px', background: '#F0FDF4', borderRadius: '10px', border: '1.5px solid #DCFCE7' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#166534', fontWeight: 800, marginBottom: '4px' }}>
                                        <span>🩺 {lang === 'vi' ? 'Chuyên gia phản hồi (Review):' : 'Expert Clinical Feedback:'}</span>
                                        <span>{matchingReview.created_at}</span>
                                      </div>
                                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#1E293B', fontStyle: 'italic', fontWeight: 500 }}>
                                        "{matchingReview.expert_feedback}"
                                      </p>
                                    </div>
                                  ) : (
                                    <div style={{ marginTop: '4px', padding: '8px 12px', background: '#FFFBEB', borderRadius: '10px', border: '1.5px solid #FEF3C7', color: '#B45309', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <span>⏳</span>
                                      <span>{lang === 'vi' ? 'Đang chờ Chuyên gia đánh giá (Review)' : 'Awaiting clinical review from expert'}</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : actModalMode === 'delete' ? (
                  <div className="delete-confirm">
                    <p>{(t as any).deleteActSub || 'Hành động này sẽ xóa hoạt động và không thể khôi phục.'}</p>
                  </div>
                ) : (
                  <div className="modal-form modal-form-grid">
                    <div className="form-group form-group-full">
                      <label>{(t as any).actName || 'Tên bài tập (từ Thư viện)'}</label>
                      <input required type="text" value={actName} onChange={e => setActName(e.target.value)} placeholder={(t as any).actNamePlaceholder || 'Nhập tên bài tập...'} spellCheck="false" />
                    </div>
                    <div className="form-group">
                      <label>{(t as any).actFreq || 'Tần suất'}</label>
                      <input required type="text" value={actFrequency} onChange={e => setActFrequency(e.target.value)} placeholder={(t as any).actFreqPlaceholder || 'Ví dụ: 3 lần/tuần'} spellCheck="false" />
                    </div>
                    <div className="form-group">
                      <label>{(t as any).actAssigneeCol || 'Người thực hiện'}</label>
                      <select required value={actAssigneeType} onChange={e => setActAssigneeType(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                        <option value="Parent">{(t as any).roleParent || 'Phụ huynh'}</option>
                        <option value="Teacher">{(t as any).roleTeacher || 'Giáo viên'}</option>
                        <option value="Therapist">{(t as any).roleTherapist || 'Chuyên viên'}</option>
                      </select>
                    </div>
                    <div className="form-group form-group-full">
                      <label>{(t as any).actMethodCol || 'Phương pháp giảng dạy'}</label>
                      <textarea rows={3} required value={actTeachingMethod} onChange={e => setActTeachingMethod(e.target.value)} placeholder={(t as any).actMethodPlaceholder || 'Hướng dẫn chi tiết...'} spellCheck="false" />
                    </div>
                    <div className="form-group form-group-full">
                      <label>{(t as any).actCriteria || 'Tiêu chí đạt'}</label>
                      <input required type="text" value={actTargetCriteria} onChange={e => setActTargetCriteria(e.target.value)} placeholder={(t as any).actCriteriaPlaceholder || 'Tiêu chí để đánh giá trẻ đạt'} spellCheck="false" />
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className={actModalMode === 'view' ? "btn-primary" : "btn-secondary"} onClick={() => setIsActModalOpen(false)}>
                  {actModalMode === 'view' ? (lang === 'vi' ? 'Đóng' : 'Close') : t.cancel}
                </button>
                {actModalMode !== 'view' && (
                  <button type="submit" className={`btn-primary ${actModalMode === 'delete' ? 'btn-danger' : ''}`}>
                    {actModalMode === 'delete' ? t.confirmDelete : (actModalMode === 'create' ? t.create : t.save)}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
{isObjModalOpen && (
        <div className="modal-overlay" onClick={() => setIsObjModalOpen(false)}>
          <div className="admin-modal animate-in" onClick={(e) => e.stopPropagation()}>

            {/* HEADER */}
            <div className="modal-header">
              <h3>
                {objModalMode === 'create' && `🎯 ${t.createObjTitle}`}
                {objModalMode === 'update' && `📝 ${t.editObjTitle}`}
                {objModalMode === 'delete' && `⚠️ ${t.confirmDeleteObj}`}
                {objModalMode === 'view' && `🔍 ${'Objective Detail'}`}
              </h3>
              <button className="close-modal" onClick={() => setIsObjModalOpen(false)}>×</button>
            </div>

            <form onSubmit={objModalMode === 'view' ? (e) => e.preventDefault() : handleSaveObj}>
              {/* BODY */}
              <div className="modal-body">
                {objModalMode === 'delete' ? (
                  <div className="delete-confirm">
                    <p>{t.deleteSub}</p>
                  </div>
                ) : objModalMode === 'view' ? (
                  /* CHẾ ĐỘ XEM CHI TIẾT (DETAIL) */
                  <div className="modal-detail-view" style={{ color: 'black',display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="detail-group" style={{ gridColumn: 'span 2' }}>
                        <label style={{ fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>{t.objName}</label>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>{selectedObj?.objective_name}</p>
                      </div>

                      <div className="detail-group">
                        <label style={{ fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>{t.objTarget}</label>
                        <p style={{ margin: 0 }}>{selectedObj?.target_date}</p>
                      </div>

                      <div className="detail-group">
                        <label style={{ fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Status</label>
                        <div>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            backgroundColor: selectedObj?.status === 'Completed' ? '#DCFCE7' : '#FEF9C3',
                            color: selectedObj?.status === 'Completed' ? '#166534' : '#854D0E'
                          }}>
                            {selectedObj?.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DANH SÁCH ACTIVITIES ĐI KÈM */}
                    <div className="detail-activities" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
                      <label style={{ fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.5rem' }}>
                        Activities ({selectedObj?.activities?.length || 0})
                      </label>

                      {selectedObj?.activities && selectedObj?.activities?.length > 0 ? (
                        <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {selectedObj?.activities?.map((act) => (
                            <li key={act.activity_id} style={{ color: '#334155' }}>
                              {act.activity_name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ margin: 0, color: '#94A3B8', fontStyle: 'italic', fontSize: '0.9rem' }}>
                          No activities planned for this objective.
                        </p>
                      )}
                    </div>

                  </div>
                ) : (
                  /* CHẾ ĐỘ CREATE / UPDATE (FORM GỐC CỦA BẠN) */
                  <div className="modal-form modal-form-grid">
                    <div className="form-group form-group-full">
                      <label>{t.objName}</label>
                      <input required type="text" value={objName} onChange={e => setObjName(e.target.value)} spellCheck="false" />
                    </div>
                    <div className="form-group form-group-full">
                      <label>{t.objTarget}</label>
                      <input required type="date" placeholder="dd-mm-yyy" value={objTarget} onChange={e => setObjTarget(e.target.value)} spellCheck="false" />
                    </div>
                    <div className="form-group form-group-full">
                      <label>Status</label>
                      <select
                        required
                        value={objDesc} /* Note: Bạn đang dùng state objDesc để lưu status */
                        onChange={e => setObjDesc(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                      >
                        <option value="In process">In process</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* FOOTER */}
              <div className="modal-footer">
                {objModalMode === 'view' ? (
                  /* Nút đóng duy nhất ở chế độ xem chi tiết */
                  <button type="button" className="btn-primary" onClick={() => setIsObjModalOpen(false)}>
                    {'Close'}
                  </button>
                ) : (
                  /* Nút hành động cho các chế độ create/update/delete */
                  <>
                    <button type="button" className="btn-secondary" onClick={() => setIsObjModalOpen(false)}>
                      {t.cancel}
                    </button>
                    <button type="submit" className={`btn-primary ${objModalMode === 'delete' ? 'btn-danger' : ''}`}>
                      {objModalMode === 'delete' ? t.confirmDelete : (objModalMode === 'create' ? t.create : t.save)}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default PlanDetailView;
