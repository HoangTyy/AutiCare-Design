import React, { useState } from 'react';

interface ChildDetailViewProps {
  child: any;
  onBack: () => void;
  lang: 'vi' | 'en';
}

interface AssessmentResult {
  id: string;
  toolName: string;
  date: string;
  examiner: string;
  totalScore: string;
  status: 'completed' | 'pending';
  notesVi: string;
  notesEn: string;
  scores: Record<string, { scored: number; max: number; labelVi: string; labelEn: string; descVi: string; descEn: string }>;
}

interface HealthRecord {
  id: string;
  date: string;
  title: string;
  descriptions: string;
  fileType: string;
  fileUrl?: string;
}

// Interface strictly mapping the database schema "screening_result"
interface DatabaseScreeningResult {
  screening_id: number;
  child_id: number;
  tool_name: string;
  screening_date: string;
  total_score: number;
  risk_level: string;
  details_json: string; // JSON string representing details of the test
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: "HLT-001",
    date: "2026-04-10",
    title: "Child health record 2025",
    descriptions: "Summary of child health condition in 2025",
    fileType: "pdf",
    fileUrl: "https://example.com/files/audiology_report_2026.pdf"
  },
  {
    id: "HLT-002",
    date: "2026-04-10",
    title: "Child health record 2026",
    descriptions: "Summary of child health condition in 2026",
    fileType: "pdf",
    fileUrl: "https://example.com/files/audiology_report_2026.pdf"
  },
];

const INITIAL_ASSESSMENTS: AssessmentResult[] = [
  {
    id: "ASM-PEP3-001",
    toolName: "PEP-3",
    date: "2026-05-15",
    examiner: "TS. BS. Nguyễn Minh Anh",
    totalScore: "133 / 218",
    status: "completed",
    notesVi: "Bé hợp tác tốt trong 9 tiểu test năng lực. Có dấu hiệu nhạy cảm thị giác nhẹ khi tiếp xúc với các khối gỗ màu đỏ nhưng nhanh chóng thích ứng tốt. Kỹ năng vận động tinh phát triển khá tốt, tuy nhiên kỹ năng ngôn ngữ tiếp nhận và ngôn ngữ diễn đạt còn chậm so với tuổi phát triển.",
    notesEn: "The child cooperated well during the 9 developmental subtests. Showed mild visual sensitivity to red blocks but adapted quickly. Fine motor skills are relatively well-developed, but receptive and expressive language domains are delayed compared to chronological age.",
    scores: {
      CVP: { scored: 21, max: 34, labelVi: "Nhận thức (CVP)", labelEn: "Cognitive Verbal/Preverbal", descVi: "Khả năng giải quyết vấn đề, phân loại vật liệu, tư duy logic cơ bản.", descEn: "Problem solving, sorting objects, basic logical thinking skills." },
      EL: { scored: 15, max: 26, labelVi: "Ngôn ngữ diễn đạt (EL)", labelEn: "Expressive Language", descVi: "Khả năng nói, phát âm từ đơn, ghép cụm từ, diễn đạt nhu cầu bằng lời.", descEn: "Ability to speak, pronounce single words, form phrases, express verbal needs." },
      RL: { scored: 11, max: 19, labelVi: "Ngôn ngữ tiếp nhận (RL)", labelEn: "Receptive Language", descVi: "Khả năng hiểu mệnh lệnh, nhận diện vật thể và phản ứng với lời nói.", descEn: "Understanding instructions, identifying objects, and responding to speech." },
      FM: { scored: 13, max: 20, labelVi: "Vận động tinh (FM)", labelEn: "Fine Motor", descVi: "Sử dụng ngón tay, cầm bút, xếp khối gỗ, cắt kéo mộc mạc.", descEn: "Finger usage, holding pencil, stacking blocks, raw scissors control." },
      GM: { scored: 9, max: 15, labelVi: "Vận động thô (GM)", labelEn: "Gross Motor", descVi: "Khả năng giữ thăng bằng, nhảy, đi lò cò, vận động cơ lớn.", descEn: "Balance control, jumping, hopping, large muscle group coordination." },
      VMI: { scored: 6, max: 10, labelVi: "Trực quan - Vận động (VMI)", labelEn: "Visual-Motor Imitation", descVi: "Bắt chước vẽ các đường nét, xếp hình theo mẫu có sẵn.", descEn: "Imitating drawing lines, copying shapes, and stacking pattern templates." },
      AE: { scored: 7, max: 11, labelVi: "Bộc lộ cảm xúc (AE)", labelEn: "Affective Expression", descVi: "Cách trẻ bộc lộ cảm xúc vui, buồn, giận dữ và tương tác mặt đối mặt.", descEn: "How the child expresses joy, sadness, anger, and maintains face-to-face contact." },
      SR: { scored: 8, max: 12, labelVi: "Tương tác xã hội (SR)", labelEn: "Social Reciprocity", descVi: "Phản ứng chia sẻ chú ý chung, hồi đáp cử chỉ của chuyên viên.", descEn: "Responding to joint attention, reciprocating examiner gestures." },
      CMB: { scored: 9, max: 15, labelVi: "Hành vi vận động (CMB)", labelEn: "Characteristic Motor Behaviors", descVi: "Sử dụng đồ chơi đúng cách, có hành vi rập khuôn vận động thô.", descEn: "Appropriate toy usage, absence of gross motor stereotypic actions." },
      CVB: { scored: 8, max: 12, labelVi: "Hành vi ngôn ngữ (CVB)", labelEn: "Characteristic Verbal Behaviors", descVi: "nói nhại lời, có giọng điệu kỳ lạ hay lặp lại cụm từ vô nghĩa.", descEn: "Absence of echolalia, weird intonations, or repetitive meaningless phrases." },
      PB: { scored: 10, max: 15, labelVi: "Vấn đề hành vi (PB)", labelEn: "Problem Behaviors", descVi: "Mức độ tự kiểm soát, cáu gắt ăn vạ khi đổi hoạt động đột ngột.", descEn: "Self-regulation level, absence of tantrums when activities change abruptly." },
      PSC: { scored: 6, max: 10, labelVi: "Tự chăm sóc (PSC)", labelEn: "Personal Self-Care", descVi: "Kỹ năng tự cởi giày, cởi áo, rửa tay, tự xúc ăn mộc mạc.", descEn: "Basic skills in taking off shoes, undressing, washing hands, self-feeding." },
      AB: { scored: 10, max: 15, labelVi: "Hành vi thích ứng (AB)", labelEn: "Adaptive Behavior", descVi: "Khả năng thích nghi của trẻ trong môi trường sinh hoạt hàng ngày.", descEn: "The child's capability to adapt during daily living environments." }
    }
  },
  {
    id: "ASM-CARS-002",
    toolName: "CARS",
    date: "2026-05-18",
    examiner: "ThS. Nguyễn Thị Mai",
    totalScore: "33.5 / 60",
    status: "completed",
    notesVi: "Điểm CARS ở mức 33.5, tương ứng với chẩn đoán Tự kỷ mức độ Nhẹ đến Trung bình. Bé có khó khăn rõ nét ở tương tác xã hội và phản ứng với thay đổi môi trường. Cần tập trung hỗ trợ giao tiếp xã hội và điều hòa cảm giác.",
    notesEn: "CARS score is 33.5, corresponding to Mild-to-Moderate Autism. The child has distinct challenges in social interaction and adapting to environment changes. Recommendations focus on social communication and sensory regulation.",
    scores: {
      SOC: { scored: 2.5, max: 4, labelVi: "Quan hệ với mọi người", labelEn: "Relating to People", descVi: "Mức độ tương tác xã hội, kết nối cảm xúc với cha mẹ và người lạ.", descEn: "Level of social interaction, emotional connection with parents and strangers." },
      IMI: { scored: 2.0, max: 4, labelVi: "Bắt chước", labelEn: "Imitation", descVi: "Khả năng bắt chước hành động, âm thanh và lời nói từ người khác.", descEn: "Ability to imitate actions, sounds, and speech from others." },
      EMO: { scored: 3.0, max: 4, labelVi: "Phản ứng cảm xúc", labelEn: "Emotional Response", descVi: "Sự phù hợp của cảm xúc với hoàn cảnh thực tế xung quanh.", descEn: "Appropriateness of emotional responses to the actual surroundings." },
      BODY: { scored: 2.5, max: 4, labelVi: "Sử dụng cơ thể", labelEn: "Body Use", descVi: "Sự khéo léo của cơ thể, có hành vi tự kích thích rập khuôn.", descEn: "Body coordination, absence of stereotypic self-stimulatory movements." },
      OBJ: { scored: 2.0, max: 4, labelVi: "Sử dụng đồ vật", labelEn: "Object Use", descVi: "Mức độ hứng thú và cách chơi đồ chơi đúng chức năng thiết kế.", descEn: "Interest level and functional usage of toys as designed." },
      ADAPT: { scored: 3.0, max: 4, labelVi: "Thích ứng với thay đổi", labelEn: "Adaptation to Change", descVi: "Phản ứng khi thay đổi thói quen, hoạt động hoặc đồ dùng quen thuộc.", descEn: "Reaction to changes in routines, activities, or familiar items." }
    }
  }
];

// Initial mock DB data for 2 standardized screening tests (M-CHAT-R/F and CARS)
const INITIAL_SCREENING_RESULTS: DatabaseScreeningResult[] = [
  {
    screening_id: 101,
    child_id: 1,
    tool_name: "M-CHAT-R/F",
    screening_date: "2026-05-10",
    total_score: 3,
    risk_level: "Medium Risk",
    details_json: JSON.stringify({
      answers: [
        { q: 1, textVi: "Nhìn theo hướng tay chỉ của cha mẹ", status: "Pass" },
        { q: 2, textVi: "Nghi ngờ khả năng nghe kém (bị điếc)", status: "Risk" },
        { q: 3, textVi: "Chơi trò chơi giả vờ / tưởng tượng", status: "Fail" },
        { q: 4, textVi: "Thích leo trèo lên đồ vật", status: "Pass" },
        { q: 5, textVi: "Cử động tay bất thường gần mắt", status: "Risk" },
        { q: 6, textVi: "Dùng ngón trỏ để yêu cầu hoặc giúp đỡ", status: "Pass" },
        { q: 7, textVi: "Dùng ngón trỏ chỉ vật thú vị muốn chia sẻ", status: "Pass" },
        { q: 8, textVi: "Quan tâm đến những đứa trẻ khác", status: "Pass" },
        { q: 9, textVi: "Mang khoe đồ vật với cha mẹ", status: "Pass" },
        { q: 10, textVi: "Đáp ứng khi được gọi tên", status: "Fail" },
        { q: 11, textVi: "Cười đáp lại khi bạn cười", status: "Pass" },
        { q: 12, textVi: "Khó chịu với tiếng ồn xung quanh", status: "Pass" },
        { q: 13, textVi: "Trẻ có biết đi hay không", status: "Pass" },
        { q: 14, textVi: "Nhìn vào mắt khi nói chuyện / tương tác", status: "Pass" },
        { q: 15, textVi: "Bắt chước các hành động vui vẻ", status: "Pass" },
        { q: 16, textVi: "Nhìn theo hướng bạn quay đầu nhìn", status: "Pass" },
        { q: 17, textVi: "Tìm cách gây sự chú ý của cha mẹ", status: "Pass" },
        { q: 18, textVi: "Hiểu các mệnh lệnh bằng lời nói", status: "Pass" },
        { q: 19, textVi: "Nhìn biểu cảm của bạn khi gặp thứ lạ", status: "Pass" },
        { q: 20, textVi: "Thích hoạt động chuyển động cơ thể", status: "Pass" }
      ]
    }),
    created_at: "2026-05-10T14:30:00.000Z",
    updated_at: "2026-05-10T14:30:00.000Z"
  },
  {
    screening_id: 102,
    child_id: 1,
    tool_name: "CARS",
    screening_date: "2026-05-20",
    total_score: 33.5,
    risk_level: "Mild-Moderate Autism",
    details_json: JSON.stringify({
      categories: [
        { id: "I", name: "Quan hệ với mọi người / Relating to People", score: 2.5 },
        { id: "II", name: "Bắt chước / Imitation", score: 2.0 },
        { id: "III", name: "Phản ứng cảm xúc / Emotional Response", score: 3.0 },
        { id: "IV", name: "Sử dụng cơ thể / Body Use", score: 2.5 },
        { id: "V", name: "Sử dụng đồ vật / Object Use", score: 2.0 },
        { id: "VI", name: "Thích ứng với thay đổi / Adaptation to Change", score: 3.0 },
        { id: "VII", name: "Phản ứng thị giác / Visual Response", score: 2.5 },
        { id: "VIII", name: "Phản ứng thính giác / Listening Response", score: 2.0 },
        { id: "IX", name: "Nếm, Ngửi, Sờ / Taste, Smell, Touch", score: 2.0 },
        { id: "X", name: "Nỗi sợ hoặc sự lo lắng / Fear or Nervousness", score: 2.0 },
        { id: "XI", name: "Giao tiếp bằng lời / Verbal Communication", score: 3.0 },
        { id: "XII", name: "Giao tiếp phi ngôn ngữ / Nonverbal Communication", score: 2.5 },
        { id: "XIII", name: "Mức độ hoạt động / Activity Level", score: 2.0 },
        { id: "XIV", name: "Mức độ trí tuệ / Intellectual Response", score: 2.5 },
        { id: "XV", name: "Ấn tượng chung / General Impressions", score: 2.0 }
      ]
    }),
    created_at: "2026-05-20T16:00:00.000Z",
    updated_at: "2026-05-20T16:00:00.000Z"
  }
];

const translations = {
  vi: {
    backToList: "⬅️ Quay lại danh sách",
    title: "Hồ Sơ Chi Tiết của Bé",
    assessmentsTitle: "🩺 Kết Quả Đánh Giá Gần Đây",
    assessmentsSubtitle: "Lịch sử lưu trữ các bài đánh giá sàng lọc lâm sàng và chẩn đoán năng lực của con em",
    id: "Mã hồ sơ",
    dob: "Ngày sinh",
    gender: "Giới tính",
    level: "Cấp độ tự kỷ",
    diagnosticDate: "Ngày chẩn đoán",
    male: "Nam",
    female: "Nữ",
    tool: "Công cụ",
    date: "Ngày thực hiện",
    examiner: "Người đánh giá",
    score: "Tổng điểm",
    status: "Trạng thái",
    actions: "Hành động",
    statusCompleted: "Đã hoàn thành",
    statusPending: "Đang chờ duyệt",
    btnViewDetails: "Xem chi tiết 📊",
    btnDownload: "Tải xuống 📥",
    btnDelete: "Xóa 🗑️",
    btnSave: "Thêm kết quả ➕",
    noData: "Chưa có dữ liệu đánh giá nào cho bé.",
    toastDownload: "✨ Tải xuống kết quả thành công! Định dạng file: ",
    toastSave: "✨ Đã lưu kết quả thành công!",
    toastDelete: "🗑️ Đã xóa bản ghi thành công!",

    // Save modal
    addTitle: "➕ Lưu kết quả đánh giá mới",
    fieldTool: "Chọn công cụ đánh giá",
    fieldDate: "Ngày thực hiện",
    fieldExaminer: "Chuyên viên thực hiện",
    fieldScore: "Tổng điểm đạt được",
    fieldMaxScore: "Điểm tối đa của bài test",
    fieldNotes: "Ghi chú/Nhận xét lâm sàng",
    cancel: "Hủy bỏ",
    save: "Lưu kết quả 💾",

    // Detail modal
    detailsTitle: "📊 CHI TIẾT KẾT QUẢ ĐÁNH GIÁ PEP-3 LÂM SÀNG",
    pep3SubTitle: "Báo cáo chi tiết 13 tiểu test lâm sàng phác họa thế mạnh và khó khăn phát triển của trẻ",
    subtestCol: "Tiểu test lâm sàng",
    scoredCol: "Điểm số đạt",
    maxCol: "Điểm tối đa",
    percentCol: "Tỷ lệ phát triển",
    descCol: "Đặc tả lâm sàng y học",
    totalResult: "Tổng điểm tích lũy toàn bài PEP-3:",
    clinicalAnalysis: "📑 Nhận xét chuyên khoa lâm sàng của bác sĩ:",
    close: "Đóng cửa sổ",

    // Delete modal
    deleteConfirmTitle: "⚠️ XÁC NHẬN XÓA BẢN GHI",
    deleteBody: "Bạn có chắc chắn muốn xóa vĩnh viễn kết quả này khỏi hệ thống? Hành động này sẽ thể khôi phục lại dữ liệu.",
    confirmDeleteBtn: "Đồng ý xóa 🗑️",

    // Health Records Tab Strings
    healthTabTitle: "Hồ Sơ Y Tế",
    healthSectionTitle: "📋 Danh Sách Hồ Sơ Y Tế",
    healthSectionSubtitle: "Theo dõi và quản lý dữ liệu kiểm tra sức khỏe thể chất lâm sàng của bé",
    btnUploadHealth: "Upload hồ sơ mới ➕",
    healthNoData: "Chưa có dữ liệu hồ sơ y tế nào cho bé.",
    healthColTitle: "Tiêu đề hồ sơ",
    healthColDate: "Ngày khám",
    healthColType: "Định dạng tệp",
    healthNoUrl: "có liên kết tệp",
    toastHealthSaved: "✨ Đã lưu hồ sơ sức khỏe mới thành công!",
    toastHealthUpdated: "✨ Đã cập nhật hồ sơ sức khỏe thành công!",
    toastHealthDeleted: "🗑️ Đã xóa hồ sơ sức khỏe thành công!",

    // Health Modals
    healthAddTitle: "➕ Thêm hồ sơ y tế mới",
    healthEditTitle: "✏️ Cập nhật thông tin hồ sơ y tế",
    healthDetailTitle: "🔍 Chi Tiết Hồ Sơ Y Tế",
    healthFieldTitle: "Tiêu đề / Tên đợt khám",
    healthFieldDescriptions: "Mô tả",
    healthFieldFileType: "Định dạng tệp (Ví dụ: pdf, docx, png)",
    healthFieldFileUrl: "Đường dẫn liên kết tệp (fileUrl)",
    btnEditHealth: "Chỉnh sửa ✏️",

    // New Screening Tab translations
    screeningTabTitle: "Kết quả sàng lọc",
    screeningSectionTitle: "📋 Kết Quả Sàng Lọc Phát Triển",
    screeningColId: "Mã Sàng Lọc",
    screeningColTool: "Tên Công Cụ",
    screeningColDate: "Ngày Sàng Lọc",
    screeningColScore: "Tổng Điểm",
    screeningColRisk: "Phân Nhóm Nguy Cơ",
    screeningEmpty: "Bé chưa có hồ sơ sàng lọc sớm nào.",
    screeningDetailTitle: "🔍 Chi Tiết Kết Quả Sàng Lọc Sớm",
    screeningFormTotalScore: "Tổng điểm tự động",
    screeningFormRiskCalc: "Phân loại nguy cơ gợi ý",
    screeningDetailSubTitle: "Thông số chi tiết lưu trữ dưới dạng details_json thô trong cơ sở dữ liệu"
  },
  en: {
    backToList: "⬅️ Back to List",
    title: "Detailed Child Profile",
    assessmentsTitle: "🩺 Recent Clinical Assessments",
    assessmentsSubtitle: "Stored history of clinical screenings and developmental diagnostic tests",
    id: "Profile ID",
    dob: "Date of Birth",
    gender: "Gender",
    level: "Severity Level",
    diagnosticDate: "Diagnosis Date",
    male: "Male",
    female: "Female",
    tool: "Tool",
    date: "Execution Date",
    examiner: "Examiner",
    score: "Total Score",
    status: "Status",
    actions: "Actions",
    statusCompleted: "Completed",
    statusPending: "Pending Approval",
    btnViewDetails: "Details 📊",
    btnDownload: "Download 📥",
    btnDelete: "Delete 🗑️",
    btnSave: "Save Result ➕",
    noData: "No assessment records found for this child.",
    toastDownload: "✨ Results downloaded successfully! File format: ",
    toastSave: "✨ Successfully saved new record!",
    toastDelete: "🗑️ Successfully deleted record!",

    // Save modal
    addTitle: "➕ Save New Assessment Result",
    fieldTool: "Select Assessment Tool",
    fieldDate: "Date Executed",
    fieldExaminer: "Clinical Examiner Name",
    fieldScore: "Total Score Obtained",
    fieldMaxScore: "Maximum Test Score",
    fieldNotes: "Clinical Notes/Remarks",
    cancel: "Cancel",
    save: "Save Record 💾",

    // Detail modal
    detailsTitle: "📊 DETAILED CLINICAL PEP-3 ASSESSMENT REPORT",
    pep3SubTitle: "Detailed report of 13 clinical subtests mapping child developmental strengths and struggles",
    subtestCol: "Clinical Subtest",
    scoredCol: "Score",
    maxCol: "Max",
    percentCol: "Progress Rate",
    descCol: "Clinical Medical Description",
    totalResult: "Total Accumulated PEP-3 Score:",
    clinicalAnalysis: "📑 Clinical Specialist Remarks & Recommendations:",
    close: "Close Window",

    // Delete modal
    deleteConfirmTitle: "⚠️ CONFIRM DELETE RECORD",
    deleteBody: "Are you sure you want to permanently delete this record from the system? This action is highly destructive and cannot be undone.",
    confirmDeleteBtn: "Confirm Delete 🗑️",

    // Health Records Tab Strings
    healthTabTitle: "Health Records",
    healthSectionTitle: "📋 Child Health Records Log",
    healthSectionSubtitle: "Monitor and manage physical health metrics and clinical diagnostic logs",
    btnUploadHealth: "Upload New Record ➕",
    healthNoData: "No health records found for this child.",
    healthColTitle: "Record Title",
    healthColDate: "Checkup Date",
    healthColType: "File Type",
    healthNoUrl: "No file link",
    toastHealthSaved: "✨ Successfully uploaded new medical record!",
    toastHealthUpdated: "✨ Successfully updated health record!",
    toastHealthDeleted: "🗑️ Successfully deleted health record!",

    // Health Modals
    healthAddTitle: "➕ Add New Health Record",
    healthEditTitle: "✏️ Update Health Record",
    healthDetailTitle: "🔍 Medical Record Details",
    healthFieldTitle: "Title",
    healthFieldDescriptions: "Descriptions",
    healthFieldFileType: "File Format (e.g. pdf, docx, png)",
    healthFieldFileUrl: "File",
    btnEditHealth: "Update ✏️",

    // Screening Tab translations
    screeningTabTitle: "Screenings results",
    screeningSectionTitle: "📋 Developmental Screening Logs",
    screeningColTool: "Tool Name",
    screeningColDate: "Screening Date",
    screeningColScore: "Score",
    screeningColRisk: "Risk Category",
    screeningBtnSave: "Save Screening Result ➕",
    screeningEmpty: "No developmental screening results recorded for this child.",
    screeningDetailTitle: "🔍 Screening Test Details",
    screeningAddTitle: "➕ Save New Screening Result",
    screeningFormTotalScore: "Automatic score calculation",
    screeningFormRiskCalc: "Suggested risk classification",
    screeningDetailSubTitle: "Detailed"
  }
};

export const SUBTEST_ITEMS_DB: Record<string, Array<{ id: string; activityVi: string; activityEn: string; score: number; behaviorVi: string; behaviorEn: string }>> = {
  CVP: [
    { id: "CVP-1", activityVi: "Ghép 3 hình khối gỗ thô (Tròn, Vuông, Tam giác)", activityEn: "Sort 3 basic wooden blocks (Circle, Square, Triangle)", score: 2, behaviorVi: "Bé xếp đúng vị trí cực kỳ nhanh nhẹn dưới 15 giây.", behaviorEn: "Sorted accurately and rapidly under 15 seconds." },
    { id: "CVP-5", activityVi: "Phân loại đồ vật theo 2 nhóm màu sắc khác biệt", activityEn: "Sort objects into 2 distinct color groups", score: 1, behaviorVi: "Bé cần Bác sĩ chỉ tay hướng dẫn gợi ý nhẹ mới hoàn thành.", behaviorEn: "Required clinician pointing prompts to complete." },
    { id: "CVP-12", activityVi: "Ghép tranh 4 mảnh ghép theo mẫu mẫu dọc", activityEn: "Assemble 4-piece cut vertical puzzle template", score: 0, behaviorVi: "Bé né tránh, ném các mảnh ghép ra khỏi bàn học.", behaviorEn: "Avoided task, threw puzzle pieces off the desk." }
  ],
  EL: [
    { id: "EL-2", activityVi: "Phát âm từ đơn gọi tên con vật quen thuộc trong tranh", activityEn: "Pronounce single words naming familiar animals", score: 2, behaviorVi: "Bé gọi rõ ràng và chính xác từ 'Cá', 'Mèo', 'Bò'.", behaviorEn: "Pronounced 'Fish', 'Cat', 'Cow' clearly and accurately." },
    { id: "EL-8", activityVi: "Nói cụm 2 từ để diễn đạt nhu cầu ăn uống", activityEn: "Speak 2-word phrases to express food needs", score: 1, behaviorVi: "Nói được cụm 'uống sữa', 'ăn bánh' khi được gợi ý thức ăn.", behaviorEn: "Said 'drink milk', 'eat cake' when prompted with foods." },
    { id: "EL-15", activityVi: "Trả lời câu hỏi 'Bé tên gì?' tự nhiên", activityEn: "Answer the question 'What is your name?' naturally", score: 0, behaviorVi: "Bé nhại lời câu hỏi của bác sĩ thay vì tự trả lời tên.", behaviorEn: "Echolalic response, repeated clinician question instead." }
  ],
  RL: [
    { id: "RL-3", activityVi: "Thực hiện lệnh đơn y khoa 'Đưa quả bóng cho mẹ'", activityEn: "Follow simple command 'Give the ball to mom'", score: 2, behaviorVi: "Bé làm chính xác và nhanh chóng khi nghe yêu cầu.", behaviorEn: "Followed instruction immediately and accurately." },
    { id: "RL-7", activityVi: "Chỉ vào 5 bộ phận cơ thể tương ứng khi nghe tên", activityEn: "Point to 5 body parts when named", score: 1, behaviorVi: "Bé chỉ đúng Tai, Mắt, Mũi. Bị nhầm lẫn giữa Tóc và Miệng.", behaviorEn: "Pointed correctly to Ear, Eye, Nose. Confused Hair and Mouth." },
    { id: "RL-11", activityVi: "Chỉ vào bức tranh mô tả hành động đang ngủ", activityEn: "Point to a picture describing sleeping action", score: 0, behaviorVi: "Bé phản ứng, lơ đãng nhìn sang hướng cửa sổ.", behaviorEn: "No response, stared out of the window." }
  ],
  FM: [
    { id: "FM-4", activityVi: "Cầm bút sáp màu vẽ nét gạch dọc thẳng thô", activityEn: "Hold crayon to draw a rough vertical line", score: 2, behaviorVi: "Cầm bút 3 ngón tay khá vững chãi, vẽ nét thẳng rõ ràng.", behaviorEn: "Held crayon with a decent 3-finger grasp, drew straight line." },
    { id: "FM-9", activityVi: "Xâu 3 hạt gỗ tròn to vào sợi dây chỉ thô", activityEn: "Thread 3 large round wooden beads into a cord", score: 1, behaviorVi: "Tay bé hơi run, xâu được 2 hạt gỗ sau nhiều nỗ lực.", behaviorEn: "Slight hand tremors, threaded 2 beads after much effort." },
    { id: "FM-12", activityVi: "Sử dụng kéo nhựa cắt giấy theo đường kẻ thẳng", activityEn: "Use plastic safety scissors to cut paper along a line", score: 0, behaviorVi: "Bé chưa biết cách xỏ ngón tay vào kéo, cắt chệch hướng.", behaviorEn: "Did not know how to hold scissors, cut completely off path." }
  ],
  GM: [
    { id: "GM-2", activityVi: "Nhảy lò cò bằng 1 chân tại chỗ", activityEn: "Hop on one foot in place", score: 1, behaviorVi: "Khả năng giữ thăng bằng còn kém, nhảy được 2 bước rồi ngã.", behaviorEn: "Poor balance controls, hopped twice then lost balance." },
    { id: "GM-6", activityVi: "Bắt quả bóng hơi ném từ cự ly 1.5 mét", activityEn: "Catch a light plastic ball thrown from 1.5 meters", score: 2, behaviorVi: "Bé giơ 2 tay đón bắt bóng cực kỳ chính xác và khéo léo.", behaviorEn: "Extended both hands and caught the ball with great skill." }
  ],
  VMI: [
    { id: "VMI-3", activityVi: "Bắt chước xây tháp gỗ cao 4 tầng kiên cố", activityEn: "Imitate stacking a 4-level wooden tower", score: 2, behaviorVi: "Bé bắt chước xếp cực kỳ vững chãi và làm đổ tháp.", behaviorEn: "Imitated stacking flawlessly and tower remained stable." },
    { id: "VMI-7", activityVi: "Sao chép hình tròn vẽ sẵn trên bảng gỗ", activityEn: "Copy a pre-drawn circle on a wooden board", score: 1, behaviorVi: "Vẽ nét méo mó, điểm khép nét góc cuối chưa hoàn toàn khít.", behaviorEn: "Drew distorted shape, closing point was not perfectly met." }
  ],
  AE: [
    { id: "AE-1", activityVi: "Cười phản hồi khi chơi ú òa mặt đối mặt", activityEn: "Smile reciprocally during face-to-face Peek-a-boo", score: 2, behaviorVi: "Bé giao tiếp mắt tuyệt vời, cười to sảng khoái thành tiếng.", behaviorEn: "Excellent eye contact, laughed out loud reciprocally." },
    { id: "AE-5", activityVi: "Bộc lộ sự thất vọng phù hợp khi bị thu đồ chơi thích", activityEn: "Express appropriate frustration when favorite toy is removed", score: 1, behaviorVi: "Bé mếu khóc giận nhưng xoa dịu được nhanh bằng đồ chơi khác.", behaviorEn: "Whined and cried but quickly redirected with an alternative." }
  ],
  SR: [
    { id: "SR-2", activityVi: "Nhìn theo hướng chỉ tay của chuyên viên về góc phòng", activityEn: "Follow examiner's pointing gesture to corner of room", score: 2, behaviorVi: "Giao tiếp mắt nhạy bén, hướng đầu ngay lập tức theo tay chỉ.", behaviorEn: "Excellent joint attention response, turned head instantly." },
    { id: "SR-6", activityVi: "Vẫy tay chào tạm biệt Bác sĩ khi kết thúc bài đánh giá", activityEn: "Wave goodbye to clinician at the end of assessment", score: 1, behaviorVi: "Bé giơ tay vẫy chào nhưng mắt nhìn lảng tránh sang mẹ.", behaviorEn: "Waved hand but avoided eye contact, looking at mother." }
  ],
  CMB: [
    { id: "CMB-3", activityVi: "Chơi xe ô tô đúng chức năng lăn bánh chạy thảm", activityEn: "Play with toy car functionally rolling on carpet", score: 2, behaviorVi: "Bé đẩy xe chạy thẳng và phát âm thanh còi xe 'tin tin'.", behaviorEn: "Rolled car forward and made horn noises 'beep beep'." },
    { id: "CMB-8", activityVi: "có hành vi tự kích thích rập khuôn vỗ tay liên hồi", activityEn: "Absence of gross motor stereotypic hand flapping", score: 1, behaviorVi: "Xuất hiện vỗ tay rập khuôn nhẹ chỉ khi bé quá phấn khích.", behaviorEn: "Mild stereotypic flapping observed only during high arousal." }
  ],
  CVB: [
    { id: "CVB-2", activityVi: "Hội thoại tự nhiên nhại lời rập khuôn", activityEn: "Converse naturally without rigid echolalic phrases", score: 1, behaviorVi: "Bé thỉnh thoảng nói nhại lại cụm từ cuối của câu hỏi.", behaviorEn: "Child occasionally repeated the last words of questions." },
    { id: "CVB-6", activityVi: "Giọng nói tự nhiên có âm điệu kỳ lạ trầm bổng", activityEn: "Speak with a natural vocal intonation and pitch", score: 2, behaviorVi: "Bé phát âm với cao độ rất tự nhiên và âm lượng vừa phải.", behaviorEn: "Spoke with very natural pitch and appropriate volume." }
  ],
  PB: [
    { id: "PB-4", activityVi: "Chấp nhận chuyển đổi hoạt động chơi theo hiệu lệnh", activityEn: "Accept transitions between activities upon instruction", score: 1, behaviorVi: "Hơi ăn vạ hờn dỗi 10 giây ban đầu, sau đó hợp tác ngoan.", behaviorEn: "Showed minor tantrum for 10 seconds, then cooperated." },
    { id: "PB-8", activityVi: "có hành vi tự hủy hoại hoặc tự gây đau cơ thể", activityEn: "Absence of self-injurious or self-harming behaviors", score: 2, behaviorVi: "Tuyệt đối tự cắn tay hay đập đầu trong suốt buổi.", behaviorEn: "Absolutely no arm biting or head banging observed." }
  ],
  PSC: [
    { id: "PSC-2", activityVi: "Tự tháo đôi giày quai dán nhãn dán Memphis", activityEn: "Independently take off velcro strap shoes", score: 2, behaviorVi: "Tự xé quai dán và cởi giày cực kỳ nhanh nhẹn.", behaviorEn: "Pulled velcro straps and slipped off shoes independently." },
    { id: "PSC-6", activityVi: "Tự rửa bàn tay dưới vòi nước rửa tay cơ bản", activityEn: "Independently wash hands under running faucet", score: 1, behaviorVi: "Bé rửa sạch tay nhưng làm ướt nhiều vần áo do nghịch nước.", behaviorEn: "Washed hands well but splashed water, wetting clothes." }
  ],
  AB: [
    { id: "AB-3", activityVi: "Chấp nhận ngồi yên can thiệp tại bàn học trong 10 phút", activityEn: "Accept sitting quietly at therapy desk for 10 minutes", score: 2, behaviorVi: "Bé ngồi học ngoan ngoãn, phối hợp tốt với Bác sĩ.", behaviorEn: "Sat cooperatively and interacted well with the clinician." },
    { id: "AB-9", activityVi: "Phản ứng thích ứng bình thường khi nghe tiếng ồn máy sấy", activityEn: "Adapt normally to the loud noise of a hair dryer", score: 1, behaviorVi: "Hơi nhăn mặt bịt tai nhẹ, xuất hiện hoảng loạn la hét.", behaviorEn: "Frowned and covered ears mildly, no panic or screams." }
  ]
};

const ChildDetailView: React.FC<ChildDetailViewProps> = ({ child, onBack, lang }) => {
  const t = translations[lang];

  // Tab State
  const [activeSubTab, setActiveSubTab] = useState<'progress' | 'assessments' | 'health' | 'screening' | 'iep' | 'schedule'>('progress');
  const [toast, setToast] = useState<string | null>(null);

  // Core Data States
  const [assessments] = useState<AssessmentResult[]>(INITIAL_ASSESSMENTS);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(INITIAL_HEALTH_RECORDS);
  const [screeningResults] = useState<DatabaseScreeningResult[]>(INITIAL_SCREENING_RESULTS);
  // const [expandedSubtests, setExpandedSubtests] = useState<Record<string, boolean>>({});

  // Modals state
  const [selectedDetails, setSelectedDetails] = useState<AssessmentResult | null>(null);
  // const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  // const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Health Modals state
  const [editingHealthRecord, setEditingHealthRecord] = useState<HealthRecord | null>(null);
  const [isAddHealthModalOpen, setIsAddHealthModalOpen] = useState(false);
  const [deleteHealthTargetId, setDeleteHealthTargetId] = useState<string | null>(null);

  // Database Screening Modals State
  const [selectedScreeningRecord, setSelectedScreeningRecord] = useState<DatabaseScreeningResult | null>(null);
  // const [isAddScreeningModalOpen, setIsAddScreeningModalOpen] = useState(false);

  // Assessment Form state
  // const [formTool, setFormTool] = useState("PEP-3");
  // const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  // const [formExaminer, setFormExaminer] = useState("");
  // const [formScore, setFormScore] = useState(120);
  // const [formMaxScore, setFormMaxScore] = useState(218);
  // const [formNotes, setFormNotes] = useState("");

  // Health Form input states
  const [healthFormDate, setHealthFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [healthFormTitle, setHealthFormTitle] = useState("");
  const [healthFormDescriptions, setHealthFormDescriptions] = useState("");
  const [healthFormFileType, setHealthFormFileType] = useState("pdf");
  const [healthFormFileUrl, setHealthFormFileUrl] = useState("");

  // Database Screening Form input states
  // const [screeningFormTool, setScreeningFormTool] = useState("M-CHAT-R/F");
  // const [screeningFormDate, setScreeningFormDate] = useState(new Date().toISOString().split('T')[0]);
  // const [screeningFormScore, setScreeningFormScore] = useState(0);
  // const [screeningFormRisk, setScreeningFormRisk] = useState("Nguy cơ thấp / Low Risk");

  // Specific screening details for interactive checkup on M-CHAT
  // const [mchatAnswers, setMchatAnswers] = useState<Array<{ q: number; textVi: string; status: "Pass" | "Risk" | "Fail" }>>([
  //   { q: 1, textVi: "Nhìn theo hướng tay chỉ của cha mẹ", status: "Pass" },
  //   { q: 2, textVi: "Nghi ngờ khả năng nghe kém (bị điếc)", status: "Pass" },
  //   { q: 3, textVi: "Chơi trò chơi giả vờ / tưởng tượng", status: "Pass" },
  //   { q: 4, textVi: "Thích leo trèo lên đồ vật", status: "Pass" },
  //   { q: 5, textVi: "Cử động tay bất thường gần mắt", status: "Pass" },
  //   { q: 6, textVi: "Dùng ngón trỏ để yêu cầu hoặc giúp đỡ", status: "Pass" },
  //   { q: 7, textVi: "Dùng ngón trỏ chỉ vật thú vị muốn chia sẻ", status: "Pass" },
  //   { q: 8, textVi: "Quan tâm đến những đứa trẻ khác", status: "Pass" },
  //   { q: 9, textVi: "Mang khoe đồ vật với cha mẹ", status: "Pass" },
  //   { q: 10, textVi: "Đáp ứng khi được gọi tên", status: "Pass" },
  //   { q: 11, textVi: "Cười đáp lại khi bạn cười", status: "Pass" },
  //   { q: 12, textVi: "Khó chịu với tiếng ồn xung quanh", status: "Pass" },
  //   { q: 13, textVi: "Trẻ có biết đi hay không", status: "Pass" },
  //   { q: 14, textVi: "Nhìn vào mắt khi nói chuyện / tương tác", status: "Pass" },
  //   { q: 15, textVi: "Bắt chước các hành động vui vẻ", status: "Pass" },
  //   { q: 16, textVi: "Nhìn theo hướng bạn quay đầu nhìn", status: "Pass" },
  //   { q: 17, textVi: "Tìm cách gây sự chú ý của cha mẹ", status: "Pass" },
  //   { q: 18, textVi: "Hiểu các mệnh lệnh bằng lời nói", status: "Pass" },
  //   { q: 19, textVi: "Nhìn biểu cảm của bạn khi gặp thứ lạ", status: "Pass" },
  //   { q: 20, textVi: "Thích hoạt động chuyển động cơ thể", status: "Pass" }
  // ]);

  // Specific CARS category scoring state
  // const [carsCategories, setCarsCategories] = useState<Array<{ id: string; name: string; score: number }>>([
  //   { id: "I", name: "Relating to People", score: 1.0 },
  //   { id: "II", name: "Imitation", score: 1.0 },
  //   { id: "III", name: "Emotional Response", score: 1.0 },
  //   { id: "IV", name: "Body Use", score: 1.0 },
  //   { id: "V", name: "Object Use", score: 1.0 },
  //   { id: "VI", name: "Adaptation to Change", score: 1.0 },
  //   { id: "VII", name: "Visual Response", score: 1.0 },
  //   { id: "VIII", name: "Listening Response", score: 1.0 },
  //   { id: "IX", name: "Taste, Smell, Touch", score: 1.0 },
  //   { id: "X", name: "Fear or Nervousness", score: 1.0 },
  //   { id: "XI", name: "Verbal Communication", score: 1.0 },
  //   { id: "XII", name: "Nonverbal Communication", score: 1.0 },
  //   { id: "XIII", name: "Activity Level", score: 1.0 },
  //   { id: "XIV", name: "Intellectual Response", score: 1.0 },
  //   { id: "XV", name: "General Impressions", score: 1.0 }
  // ]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const resetHealthForm = () => {
    setHealthFormDate(new Date().toISOString().split('T')[0]);
    setHealthFormTitle("");
    setHealthFormDescriptions("");
    setHealthFormFileType("pdf");
    setHealthFormFileUrl("");
  };

  const populateHealthForm = (record: HealthRecord) => {
    setHealthFormDate(record.date);
    setHealthFormTitle(record.title);
    setHealthFormDescriptions(record.descriptions);
    setHealthFormFileType(record.fileType);
    setHealthFormFileUrl(record.fileUrl || "");
  };

  // Automated score calculation for newly simulated screening records
  // const updateMchatRisk = (answers: typeof mchatAnswers) => {
  //   const riskCount = answers.filter(a => {
  //     // Questions 2, 5, 12: Yes means risk (For simplicty, mock scoring rules based on document)
  //     if (a.q === 2 || a.q === 5 || a.q === 12) {
  //       return a.status === "Risk";
  //     }
  //     return a.status === "Fail";
  //   }).length;
  // 
  //   setScreeningFormScore(riskCount);
  //   if (riskCount <= 2) {
  //     setScreeningFormRisk("Low Risk");
  //   } else if (riskCount <= 7) {
  //     setScreeningFormRisk("Medium Risk");
  //   } else {
  //     setScreeningFormRisk("High Risk");
  //   }
  // };
  // 
  // const updateCarsRisk = (categories: typeof carsCategories) => {
  //   const total = categories.reduce((sum, item) => sum + item.score, 0);
  //   setScreeningFormScore(total);
  //   if (total < 30) {
  //     setScreeningFormRisk("Non-autistic");
  //   } else if (total < 36) {
  //     setScreeningFormRisk(" Mild-Moderate Autism");
  //   } else {
  //     setScreeningFormRisk("Severely Autistic");
  //   }
  // };

  // Database handlers for assessments
  const handleDownload = (record: AssessmentResult) => {
    const jsonStr = JSON.stringify(record, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${child.name.replace(/\s+/g, '_')}_${record.toolName}_${record.date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast(t.toastDownload + `[JSON]`);
  };

  // const handleSaveResult = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const genericScores: Record<string, { scored: number; max: number; labelVi: string; labelEn: string; descVi: string; descEn: string }> = {};
  //   if (formTool === "PEP-3") {
  //     const ratio = formScore / formMaxScore;
  //     const subtests = [
  //       { key: "CVP", max: 34, vi: "Nhận thức (CVP)", en: "Cognitive Verbal/Preverbal", dVi: "Giải quyết vấn đề, xếp khối gỗ.", dEn: "Cognitive logic and block building." },
  //       { key: "EL", max: 26, vi: "Ngôn ngữ diễn đạt (EL)", en: "Expressive Language", dVi: "Nói và diễn đạt từ ngữ.", dEn: "Expressing needs verbally." },
  //       { key: "RL", max: 19, vi: "Ngôn ngữ tiếp nhận (RL)", en: "Receptive Language", dVi: "Hiểu mệnh lệnh y khoa.", dEn: "Understanding clinician guidelines." },
  //       { key: "FM", max: 20, vi: "Vận động tinh (FM)", en: "Fine Motor", dVi: "Cầm nắm viết kéo mộc.", dEn: "Holding pen and scissor manipulation." },
  //       { key: "GM", max: 15, vi: "Vận động thô (GM)", en: "Gross Motor", dVi: "Nhảy thăng bằng cơ lớn.", dEn: "Jumping and balancing motor controls." },
  //       { key: "VMI", max: 10, vi: "Bắt chước thị giác (VMI)", en: "Visual-Motor Imitation", dVi: "Sao chép nét vẽ mẫu.", dEn: "Copying graphics templates." },
  //       { key: "AE", max: 11, vi: "Bộc lộ cảm xúc (AE)", en: "Affective Expression", dVi: "Mặt đối mặt chia sẻ cảm xúc.", dEn: "Expressing joy/anger/frustration." },
  //       { key: "SR", max: 12, vi: "Tương tác xã hội (SR)", en: "Social Reciprocity", dVi: "Hồi đáp giao tiếp mắt.", dEn: "Responding to social reciprocity." },
  //       { key: "CMB", max: 15, vi: "Hành vi vận động (CMB)", en: "Characteristic Motor Behaviors", dVi: "Sử dụng đồ chơi phù hợp.", dEn: "Stereotypic motor checks." },
  //       { key: "CVB", max: 12, vi: "Hành vi ngôn ngữ (CVB)", en: "Characteristic Verbal Behaviors", dVi: "nhại lời nói lặp.", dEn: "Verbal echolalia controls." },
  //       { key: "PB", max: 15, vi: "Vấn đề hành vi (PB)", en: "Problem Behaviors", dVi: "Hợp tác chuyển đổi hoạt động.", dEn: "Self-regulation and tantrums." },
  //       { key: "PSC", max: 10, vi: "Tự phục vụ (PSC)", en: "Personal Self-Care", dVi: "Tự cởi giày rửa tay.", dEn: "Undressing and self-feeding." },
  //       { key: "AB", max: 15, vi: "Hành vi thích ứng (AB)", en: "Adaptive Behavior", dVi: "Thích nghi sinh hoạt thường nhật.", dEn: "General adaptive living skills." }
  //     ];
  // 
  //     let sum = 0;
  //     subtests.forEach((s, index) => {
  //       let scoredVal = Math.round(s.max * ratio);
  //       if (index === subtests.length - 1) {
  //         scoredVal = Math.max(0, Math.min(s.max, formScore - sum));
  //       }
  //       scoredVal = Math.min(s.max, Math.max(0, scoredVal));
  //       sum += scoredVal;
  // 
  //       genericScores[s.key] = {
  //         scored: scoredVal,
  //         max: s.max,
  //         labelVi: s.vi,
  //         labelEn: s.en,
  //         descVi: s.dVi,
  //         descEn: s.dEn
  //       };
  //     });
  //   } else {
  //     genericScores["GEN"] = {
  //       scored: formScore,
  //       max: formMaxScore,
  //       labelVi: "Chỉ số chung",
  //       labelEn: "General Index",
  //       descVi: "Điểm số tích lũy chung toàn bộ bài test.",
  //       descEn: "Overall accumulated score across testing items."
  //     };
  //   }
  // 
  //   const newRecord: AssessmentResult = {
  //     id: `ASM-${formTool}-${Date.now().toString().slice(-4)}`,
  //     toolName: formTool,
  //     date: formDate,
  //     examiner: formExaminer || (lang === 'vi' ? "Người giám hộ" : "Guardian Specialist"),
  //     totalScore: `${formScore} / ${formMaxScore}`,
  //     status: "completed",
  //     notesVi: formNotes || "Lưu trữ thủ công.",
  //     notesEn: formNotes || "Manually saved.",
  //     scores: genericScores
  //   };
  // 
  //   setAssessments([newRecord, ...assessments]);
  //   setIsAddModalOpen(false);
  //   setFormExaminer("");
  //   setFormNotes("");
  //   setFormScore(120);
  //   triggerToast(t.toastSave);
  // };
  // 
  // const handleDelete = () => {
  //   if (!deleteTargetId) return;
  //   setAssessments(prev => prev.filter(item => item.id !== deleteTargetId));
  //   setDeleteTargetId(null);
  //   triggerToast(t.toastDelete);
  // };

  // Health record handlers
  const handleSaveHealthRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newHealth: HealthRecord = {
      id: `HLT-${Date.now().toString().slice(-4)}`,
      date: healthFormDate,
      title: healthFormTitle,
      descriptions: healthFormDescriptions,
      fileType: healthFormFileType,
      fileUrl: healthFormFileUrl || undefined
    };
    setHealthRecords([newHealth, ...healthRecords]);
    setIsAddHealthModalOpen(false);
    resetHealthForm();
    triggerToast(t.toastHealthSaved);
  };

  const handleUpdateHealthRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHealthRecord) return;
    const updated = healthRecords.map(item => {
      if (item.id === editingHealthRecord.id) {
        return {
          ...item,
          date: healthFormDate,
          title: healthFormTitle,
          descriptions: healthFormDescriptions,
          fileType: healthFormFileType,
          fileUrl: healthFormFileUrl || undefined
        };
      }
      return item;
    });
    setHealthRecords(updated);
    setEditingHealthRecord(null);
    resetHealthForm();
    triggerToast(t.toastHealthUpdated);
  };

  const handleDeleteHealthRecord = () => {
    if (!deleteHealthTargetId) return;
    setHealthRecords(prev => prev.filter(item => item.id !== deleteHealthTargetId));
    setDeleteHealthTargetId(null);
    triggerToast(t.toastHealthDeleted);
  };

  const handleDownloadHealthRecord = (record: HealthRecord) => {
    const jsonStr = JSON.stringify(record, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${child.name.replace(/\s+/g, '_')}_health_${record.id}_${record.date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast(t.toastDownload + ` [Health JSON]`);
  };

  // ── MANAGE SCREENING TEST RESULTS FUNCTIONS ──
  // const handleSaveScreeningResult = (e: React.FormEvent) => {
  //   e.preventDefault();
  // 
  //   // Construct database schema compatible structured string inside details_json
  //   let detailsPayload = {};
  //   if (screeningFormTool === "M-CHAT-R/F") {
  //     detailsPayload = { answers: mchatAnswers };
  //   } else {
  //     detailsPayload = { categories: carsCategories };
  //   }
  // 
  //   const newDbRecord: DatabaseScreeningResult = {
  //     screening_id: Math.floor(Math.random() * 1000) + 200,
  //     child_id: child.id || 1,
  //     tool_name: screeningFormTool,
  //     screening_date: screeningFormDate,
  //     total_score: screeningFormScore,
  //     risk_level: screeningFormRisk,
  //     details_json: JSON.stringify(detailsPayload),
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString()
  //   };
  // 
  //   setScreeningResults([newDbRecord, ...screeningResults]);
  //   setIsAddScreeningModalOpen(false);
  //   triggerToast(t.toastSave);
  // };

  return (
    <div className="profile-tab-content child-detail-wrapper" style={{ animation: 'profile-fade-in 0.35s ease-out' }}>

      {/* Toast Notification Stack */}
      {toast && (
        <div className="profile-toast animate-toast" style={{ background: '#0D9488', border: '3px solid #1E293B', color: '#FFF' }}>
          {toast}
        </div>
      )}

      {/* Back Header Column */}
      <div className="detail-navigation-bar" style={{ marginBottom: '1.5rem' }}>
        <button
          type="button"
          className="profile-page-btn-secondary"
          onClick={onBack}
          style={{ padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          {t.backToList}
        </button>
      </div>

      <div className="child-detail-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '2rem' }}>

        {/* Column 1: Child Bio Info Card */}
        <div className="profile-sticker-card child-bio-sidebar-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFFDF5', height: 'fit-content' }}>
          <div className="bio-card-header" style={{ textAlign: 'center', borderBottom: '2.5px dashed #CBD5E1', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="avatar-huge" style={{ fontSize: '4.5rem', marginBottom: '0.5rem' }}>{child.avatar}</div>
            <h2 className="bio-child-name" style={{ margin: '0.2rem 0', color: '#1E293B', fontWeight: 900, fontSize: '1.6rem' }}>{child.name}</h2>
            <span className="bio-child-id" style={{ background: '#1E293B', color: '#FFF', padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>{child.id}</span>
          </div>

          <div className="bio-card-details" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="bio-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              <span className="bio-label" style={{ color: '#64748B', fontWeight: 700 }}>📅 {t.dob}:</span>
              <span className="bio-val" style={{ color: '#1E293B', fontWeight: 800 }}>{child.dob}</span>
            </div>
            <div className="bio-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              <span className="bio-label" style={{ color: '#64748B', fontWeight: 700 }}>⚧ {t.gender}:</span>
              <span className="bio-val" style={{ color: '#1E293B', fontWeight: 800 }}>
                {child.gender === 'male' ? t.male : t.female}
              </span>
            </div>
            <div className="bio-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              <span className="bio-label" style={{ color: '#64748B', fontWeight: 700 }}>⚡ {t.level}:</span>
              <span className={`level-badge level-${child.level}`} style={{ fontWeight: 800 }}>
                {child.level === 'mild' ? (lang === 'vi' ? 'Nhẹ (Mức 1)' : 'Mild (Lvl 1)') : (lang === 'vi' ? 'Trung bình (Mức 2)' : 'Moderate (Lvl 2)')}
              </span>
            </div>
            <div className="bio-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="bio-label" style={{ color: '#64748B', fontWeight: 700 }}>🩺 {t.diagnosticDate}:</span>
              <span className="bio-val font-highlight" style={{ color: '#0D9488', fontWeight: 800 }}>{child.lastAssessed}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Interactive Sub-Tabs Area */}
        <div className="child-detail-content-zone" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Sub Tab Navigation */}
          <div className="sub-tab-navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              type="button"
              className={`sub-tab-btn ${activeSubTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('progress')}
            >
              📈 {lang === 'vi' ? 'Nhật ký' : 'Progress'}
            </button>
            <button
              type="button"
              className={`sub-tab-btn ${activeSubTab === 'assessments' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('assessments')}
            >
              🩺 PEP-3
            </button>
            <button
              type="button"
              className={`sub-tab-btn ${activeSubTab === 'screening' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('screening')}
            >
              🔍 {t.screeningTabTitle}
            </button>
            <button
              type="button"
              className={`sub-tab-btn ${activeSubTab === 'health' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('health')}
            >
              ✏️ {t.healthTabTitle}
            </button>
            <button
              type="button"
              className={`sub-tab-btn ${activeSubTab === 'iep' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('iep')}
            >
              📋 IEP
            </button>
            <button
              type="button"
              className={`sub-tab-btn ${activeSubTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('schedule')}
            >
              📅 {lang === 'vi' ? 'Lịch' : 'Schedule'}
            </button>
          </div>

          {/* Sub Tab Renderings */}
          {activeSubTab === 'progress' && (
            <div className="profile-sticker-card child-progress-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFF', animation: 'profile-fade-in 0.25s ease-out' }}>
              <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.5rem', color: '#1E293B' }}>
                📈 {lang === 'vi' ? 'Nhật ký Tiến trình của Bé' : 'Developmental Progress Log'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.85rem', margin: '0.2rem 0 1.5rem 0' }}>
                {lang === 'vi' ? 'Theo dõi các mốc phát triển lâm sàng và hành vi tiến bộ vượt bậc của bé' : 'Track clinical developmental milestones and children progressive behavior'}
              </p>

              {/* Development milestones timeline */}
              <div className="timeline-milestones" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderLeft: '3px solid #0D9488', paddingLeft: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-9px', top: '2px', width: '15px', height: '15px', borderRadius: '50%', background: '#0D9488', border: '3px solid #FFF' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0D9488' }}>2026-05-18</span>
                  <h4 style={{ margin: '0.15rem 0', fontWeight: 900, color: '#1E293B', fontSize: '1.05rem' }}>✨ {lang === 'vi' ? 'Chủ động tương tác chia sẻ chú ý chung' : 'Initiated Joint Attention'}</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', fontWeight: 700, lineHeight: '1.5' }}>{lang === 'vi' ? 'Bé đã chủ động chỉ tay vào khối đồ chơi màu vàng và nhìn Bác sĩ cười để chia sẻ sự chú ý.' : 'The child pointed at the yellow toy block and made eye contact with the doctor to share attention.'}</p>
                </div>
                <div style={{ borderLeft: '3px solid #0D9488', paddingLeft: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-9px', top: '2px', width: '15px', height: '15px', borderRadius: '50%', background: '#0D9488', border: '3px solid #FFF' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0D9488' }}>2026-05-15</span>
                  <h4 style={{ margin: '0.15rem 0', fontWeight: 900, color: '#1E293B', fontSize: '1.05rem' }}>💬 {lang === 'vi' ? 'Phát âm từ đơn khớp theo vật liệu' : 'Pronounced Single Object Words'}</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', fontWeight: 700, lineHeight: '1.5' }}>{lang === 'vi' ? 'Phát âm chính xác từ "Bóng", "Cá" khi Bác sĩ chỉ vào tranh mẫu trong bài kiểm tra PEP-3.' : 'Accurately pronounced words "Ball", "Fish" when the doctor pointed at flashcards in PEP-3.'}</p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'assessments' && (
            <div className="profile-sticker-card assessments-list-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFF', animation: 'profile-fade-in 0.25s ease-out' }}>

              <div className="assessments-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 className="section-assessments-title" style={{ margin: 0, fontWeight: 900, fontSize: '1.5rem', color: '#1E293B' }}>{t.assessmentsTitle}</h2>
                  <p className="section-assessments-subtitle" style={{ margin: '0.2rem 0 0 0', color: '#64748B', fontSize: '0.85rem' }}>{t.assessmentsSubtitle}</p>
                </div>
                <button
                  type="button"
                  className="profile-page-btn-primary"
                  onClick={() => {}}
                  style={{ padding: '8px 16px', background: '#0D9488' }}
                >
                  {t.btnSave}
                </button>
              </div>

              <div className="assessments-sticker-table" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {assessments.map((record) => (
                  <div
                    key={record.id}
                    className="assessment-result-sticker-row"
                    style={{
                      border: '3px solid #1E293B',
                      borderRadius: '16px',
                      padding: '1.2rem',
                      background: '#FFFDF5',
                      boxShadow: '4px 4px 0px #1E293B',
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 1fr 1fr 1fr auto',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <div className="cell-tool-meta">
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0D9488', letterSpacing: '0.5px' }}>{record.id}</span>
                      <h3 style={{ margin: '0.1rem 0 0 0', fontWeight: 900, color: '#1E293B', fontSize: '1.4rem' }}>{record.toolName}</h3>
                    </div>

                    <div className="cell-date">
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>📅 {t.date}</span>
                      <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.9rem' }}>{record.date}</span>
                    </div>

                    <div className="cell-examiner">
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>👩‍⚕️ {t.examiner}</span>
                      <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.9rem' }}>{record.examiner}</span>
                    </div>

                    <div className="cell-score">
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>📊 {t.score}</span>
                      <span style={{ fontWeight: 900, color: '#0D9488', fontSize: '1.1rem' }}>{record.totalScore}</span>
                    </div>

                    <div className="cell-actions-layout" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="candy-btn-action view-btn"
                        onClick={() => setSelectedDetails(record)}
                        style={{ padding: '6px 12px', background: '#F1F5F9', border: '2px solid #1E293B', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', cursor: 'pointer', boxShadow: '2px 2px 0 #1E293B' }}
                      >
                        {t.btnViewDetails}
                      </button>
                      <button
                        type="button"
                        className="candy-btn-action download-btn"
                        onClick={() => handleDownload(record)}
                        style={{ padding: '6px 12px', background: '#FEF08A', border: '2px solid #1E293B', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', cursor: 'pointer', boxShadow: '2px 2px 0 #1E293B' }}
                      >
                        {t.btnDownload}
                      </button>
                      <button
                        type="button"
                        className="candy-btn-action delete-btn"
                        onClick={() => {}}
                        style={{ padding: '6px 12px', background: '#FEE2E2', border: '2px solid #1E293B', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, color: '#EF4444', cursor: 'pointer', boxShadow: '2px 2px 0 #1E293B' }}
                      >
                        {t.btnDelete}
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ── SCREENING RESULTS TAB ── */}
          {activeSubTab === 'screening' && (
            <div className="profile-sticker-card screening-tab-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFF', animation: 'profile-fade-in 0.25s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.5rem', color: '#1E293B' }}>{t.screeningSectionTitle}</h2>
                </div>
              </div>

              {screeningResults.length === 0 ? (
                <div style={{ padding: '3rem 1rem', textAlign: 'center', border: '3px dashed #CBD5E1', borderRadius: '16px' }}>
                  <span style={{ fontSize: '3rem' }}>🔍</span>
                  <p style={{ color: '#64748B', fontWeight: 700 }}>{t.screeningEmpty}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {screeningResults.map((rec) => (
                    <div
                      key={rec.screening_id}
                      style={{
                        border: '3px solid #1E293B',
                        borderRadius: '16px',
                        padding: '1.2rem',
                        background: '#F1F5F9',
                        boxShadow: '4px 4px 0px #1E293B',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.2fr 1fr 1.5fr auto',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >

                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block' }}>{t.screeningColTool}</span>
                        <span style={{ fontWeight: 900, color: '#0D9488', fontSize: '1.1rem' }}>{rec.tool_name}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block' }}>{t.screeningColDate}</span>
                        <span style={{ fontWeight: 800, color: '#1E293B' }}>{rec.screening_date}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block' }}>{t.screeningColRisk} ({t.screeningColScore})</span>
                        <span style={{ fontWeight: 900, color: '#B91C1C' }}>{rec.risk_level} ({rec.total_score})</span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="candy-btn-action"
                          onClick={() => setSelectedScreeningRecord(rec)}
                          style={{ padding: '6px 12px', background: '#FFF', border: '2px solid #1E293B', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}
                        >
                          {t.btnViewDetails}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'health' && (
            <div className="profile-sticker-card health-records-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFF', animation: 'profile-fade-in 0.25s ease-out' }}>
              <div className="health-records-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.5rem', color: '#1E293B' }}>{t.healthSectionTitle}</h2>
                  <p style={{ color: '#64748B', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>{t.healthSectionSubtitle}</p>
                </div>
                <button
                  type="button"
                  className="profile-page-btn-primary"
                  onClick={() => {
                    resetHealthForm();
                    setIsAddHealthModalOpen(true);
                  }}
                  style={{ padding: '8px 16px', background: '#0D9488' }}
                >
                  {t.btnUploadHealth}
                </button>
              </div>

              <div className="health-records-table-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {healthRecords.map((record) => (
                  <div
                    key={record.id}
                    className="health-record-sticker-row"
                    style={{
                      border: '3px solid #1E293B',
                      borderRadius: '16px',
                      padding: '1.2rem',
                      background: '#FFFDF5',
                      boxShadow: '4px 4px 0px #1E293B',
                      display: 'grid',
                      gridTemplateColumns: '1.5fr 1fr 1.2fr auto',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ minWidth: '180px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0D9488', display: 'block', whiteSpace: 'nowrap' }}>
                        📅 {record.date}
                      </span>
                      <h3 style={{ margin: '0.15rem 0 0 0', fontWeight: 900, color: '#1E293B', fontSize: '1.15rem' }}>
                        {record.title}
                      </h3>
                      <span style={{ display: 'block', marginTop: '0.3rem', fontSize: '0.75rem', color: '#475569', fontWeight: 800 }}>
                        ID: {record.id}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>📁 {t.healthColType}</span>
                      <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.85rem', background: '#E2E8F0', padding: '2px 8px', borderRadius: '8px', border: '1.5px solid #1E293B', display: 'inline-block', textTransform: 'uppercase', marginTop: '0.15rem' }}>
                        {record.fileType}
                      </span>
                    </div>

                    <div style={{ width: '200px', minWidth: '200px', maxWidth: '200px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>📝 {t.healthFieldDescriptions}</span>
                      <p style={{ margin: '0.15rem 0 0 0', color: '#475569', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.4' }}>
                        {record.descriptions}
                      </p>                     
                    </div>

                    <div className="health-actions-layout" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="candy-btn-action download-btn"
                        onClick={() => handleDownloadHealthRecord(record)}
                        style={{ padding: '6px 12px', background: '#FEF08A', border: '2px solid #1E293B', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', cursor: 'pointer', boxShadow: '2px 2px 0 #1E293B' }}
                      >
                        {t.btnDownload}
                      </button>
                      <button
                        type="button"
                        className="candy-btn-action edit-btn"
                        onClick={() => {
                          setEditingHealthRecord(record);
                          populateHealthForm(record);
                        }}
                        style={{ padding: '6px 12px', background: '#FEF08A', border: '2px solid #1E293B', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', cursor: 'pointer', boxShadow: '2px 2px 0 #1E293B' }}
                      >
                        {t.btnEditHealth}
                      </button>
                      <button
                        type="button"
                        className="candy-btn-action delete-btn"
                        onClick={() => setDeleteHealthTargetId(record.id)}
                        style={{ padding: '6px 12px', background: '#FEE2E2', border: '2px solid #1E293B', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, color: '#EF4444', cursor: 'pointer', boxShadow: '2px 2px 0 #1E293B' }}
                      >
                        {t.btnDelete}
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {activeSubTab === 'iep' && (
            <div className="profile-sticker-card child-iep-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFF', animation: 'profile-fade-in 0.25s ease-out' }}>
              <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.5rem', color: '#1E293B' }}>
                📋 {lang === 'vi' ? 'Mục tiêu Giáo dục Cá nhân (IEP)' : 'Individualized Education Plan Goals (IEP)'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.85rem', margin: '0.2rem 0 1.5rem 0' }}>
                {lang === 'vi' ? 'Các mục tiêu can thiệp chuyên khoa đang được trị liệu viên và gia đình phối hợp thực hiện' : 'Specialized intervention goals currently coordinated between clinicians and parent'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ border: '2.5px solid #1E293B', borderRadius: '16px', padding: '1.2rem', background: '#FFFDF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '4px 4px 0 #1E293B' }}>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 900, color: '#1E293B', fontSize: '1.05rem' }}>1. {lang === 'vi' ? 'Giao tiếp chủ động bằng lời (2-3 từ)' : 'Verbal Communication (2-3 words)'}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>{lang === 'vi' ? 'Lĩnh vực: Ngôn ngữ diễn đạt' : 'Domain: Expressive Language'}</span>
                  </div>
                  <span style={{ background: '#FEF3C7', color: '#D97706', padding: '4px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800, border: '1.5px solid #D97706' }}>
                    ⚡ {lang === 'vi' ? 'Đang thực hiện' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'schedule' && (
            <div className="profile-sticker-card child-schedule-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFF', animation: 'profile-fade-in 0.25s ease-out' }}>
              <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.5rem', color: '#1E293B' }}>
                📅 {lang === 'vi' ? 'Lịch Học Can Thiệp Trong Tuần' : 'Weekly Intervention Schedule'}
              </h2>
              <div style={{ border: '3px solid #1E293B', borderRadius: '16px', overflow: 'hidden', background: '#FFF', marginTop: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', display: 'table' }}>
                  <thead style={{ display: 'table-header-group' }}>
                    <tr style={{ background: '#F1F5F9', borderBottom: '3px solid #1E293B', display: 'table-row' }}>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B' }}>{lang === 'vi' ? 'Thứ / Khung giờ' : 'Day / Time'}</th>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B' }}>{lang === 'vi' ? 'Nghiệp vụ Trị liệu' : 'Therapy Unit'}</th>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B' }}>{lang === 'vi' ? 'Chuyên gia' : 'Specialist'}</th>
                    </tr>
                  </thead>
                  <tbody style={{ display: 'table-row-group' }}>
                    <tr style={{ borderBottom: '1.5px solid #E2E8F0', display: 'table-row' }}>
                      <td style={{ padding: '12px 15px', fontWeight: 800, color: '#1E293B', fontSize: '0.85rem' }}>{lang === 'vi' ? 'Thứ Hai (09:00 - 10:30)' : 'Mon (09:00 - 10:30)'}</td>
                      <td style={{ padding: '12px 15px', fontWeight: 700, color: '#0D9488', fontSize: '0.85rem' }}>🧩 {lang === 'vi' ? 'Trị liệu Vận động tinh' : 'Fine Motor Therapy'}</td>
                      <td style={{ padding: '12px 15px', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>ThS. Nguyễn Thị Mai</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ── MODAL 1: VIEW DETAILS PEP-3 ── */}
      {selectedDetails && (
        <div className="profile-modal-overlay" onClick={() => setSelectedDetails(null)}>
          <div className="profile-admin-modal detailed-report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header" style={{ background: '#0D9488', borderBottom: '3px solid #1E293B', padding: '1.25rem 1.5rem' }}>
              <div style={{ color: '#FFF' }}>
                <h3 className="profile-modal-title" style={{ margin: 0, color: '#FFF', fontWeight: 900, fontSize: '1.5rem' }}>{t.detailsTitle} ({selectedDetails.toolName})</h3>
                <span style={{ fontSize: '0.85rem', opacity: 0.95 }}>{t.pep3SubTitle}</span>
              </div>
              <button type="button" className="profile-modal-close-btn" onClick={() => setSelectedDetails(null)} style={{ color: '#FFF' }}>×</button>
            </div>
            <div className="profile-modal-body" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '16px', border: '2.5px solid #1E293B' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>👶 Trẻ đánh giá:</span>
                  <span style={{ fontWeight: 800, color: '#1E293B' }}>{child.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>📅 Ngày thực hiện:</span>
                  <span style={{ fontWeight: 800, color: '#1E293B' }}>{selectedDetails.date}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>👩‍⚕️ Người đánh giá:</span>
                  <span style={{ fontWeight: 800, color: '#1E293B' }}>{selectedDetails.examiner}</span>
                </div>
              </div>
            </div>
            <div className="profile-modal-footer" style={{ borderTop: '2.5px solid #1E293B', background: '#F8FAFC' }}>
              <button type="button" className="profile-page-btn-primary" onClick={() => setSelectedDetails(null)} style={{ background: '#1E293B' }}>{t.close}</button>
            </div>
          </div>
        </div>
      )}

      

      {/* ── MODAL: VIEW SCREENING RESULT DETAILS (details_json parsed representation) ── */}
      {selectedScreeningRecord && (
        <div className="profile-modal-overlay" onClick={() => setSelectedScreeningRecord(null)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className="profile-modal-header" style={{ background: '#0D9488', borderBottom: '3px solid #1E293B', padding: '1.25rem' }}>
              <h3 className="profile-modal-title" style={{ color: '#FFF', fontWeight: 900 }}>{t.screeningDetailTitle}</h3>
              <button type="button" className="profile-modal-close-btn" onClick={() => setSelectedScreeningRecord(null)} style={{ color: '#FFF' }}>×</button>
            </div>
            <div className="profile-modal-body" style={{ padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
              <div style={{ borderBottom: '2.5px dashed #CBD5E1', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <h3 style={{ margin: '0.2rem 0 0 0', fontWeight: 900, color: '#1E293B', fontSize: '1.4rem' }}>
                  {selectedScreeningRecord.tool_name}
                </h3>
                <div style={{ marginTop: '0.5rem', background: '#FEE2E2', border: '2px solid #B91C1C', borderRadius: '8px', padding: '8px 12px', display: 'inline-block' }}>
                  <span style={{ fontWeight: 900, color: '#B91C1C' }}>
                    {t.screeningColRisk}: {selectedScreeningRecord.risk_level} (Score: {selectedScreeningRecord.total_score})
                  </span>
                </div>
              </div>

              <h4 style={{ fontWeight: 900, color: '#1E293B', marginBottom: '0.5rem' }}>{t.screeningDetailSubTitle}:</h4>

              {/* Parse and cleanly render details_json fields */}
              {(() => {
                try {
                  const data = JSON.parse(selectedScreeningRecord.details_json);
                  if (selectedScreeningRecord.tool_name === "M-CHAT-R/F" && data.answers) {
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {data.answers.map((ans: any) => (
                          <div key={ans.q} style={{ border: '2px solid #1E293B', borderRadius: '8px', padding: '8px 12px', background: '#FFFDF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Câu {ans.q}: {ans.textVi}</span>
                            <span style={{
                              padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 900, border: '1.5px solid #1E293B',
                              background: ans.status.includes("Đạt") ? '#D1FAE5' : '#FEE2E2',
                              color: ans.status.includes("Đạt") ? '#065F46' : '#991B1B'
                            }}>
                              {ans.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  } else if (selectedScreeningRecord.tool_name === "CARS" && data.categories) {
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {data.categories.map((cat: any) => (
                          <div key={cat.id} style={{ border: '2px solid #1E293B', borderRadius: '8px', padding: '8px 12px', background: '#FFFDF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Tiêu chí {cat.id}: {cat.name}</span>
                            <span style={{
                              padding: '4px 10px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 900, border: '1.5px solid #1E293B',
                              background: cat.score >= 3 ? '#FEE2E2' : cat.score >= 2 ? '#FEF3C7' : '#D1FAE5',
                              color: '#1E293B'
                            }}>
                              {cat.score} Điểm
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                } catch (e) {
                  return <pre>{selectedScreeningRecord.details_json}</pre>;
                }
              })()}
            </div>
            <div className="profile-modal-footer" style={{ borderTop: '2.5px solid #1E293B', background: '#F8FAFC' }}>
              <button type="button" className="profile-page-btn-primary" onClick={() => setSelectedScreeningRecord(null)} style={{ background: '#1E293B' }}>{t.close}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 5: UPLOAD/ADD NEW HEALTH RECORD ── */}
      {isAddHealthModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsAddHealthModalOpen(false)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="profile-modal-header" style={{ borderBottom: '3px solid #1E293B' }}>
              <h3 className="profile-modal-title">{t.healthAddTitle}</h3>
              <button type="button" className="profile-modal-close-btn" onClick={() => setIsAddHealthModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSaveHealthRecord}>
              <div className="profile-modal-body" style={{ maxHeight: 'min(500px, calc(80vh - 120px))', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="profile-page-form-group">
                    <label className="profile-page-field-label">{t.fieldDate}</label>
                    <input type="date" className="profile-page-input" value={healthFormDate} onChange={(e) => setHealthFormDate(e.target.value)} required />
                  </div>
                  <div className="profile-page-form-group">
                    <label className="profile-page-field-label">{t.healthColType}</label>
                    <input type="text" className="profile-page-input" value={healthFormFileType} disabled style={{ background: '#E2E8F0', cursor: 'not-allowed', textTransform: 'uppercase' }} />
                  </div>
                </div>
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.healthFieldTitle}</label>
                  <input type="text" className="profile-page-input" value={healthFormTitle} onChange={(e) => setHealthFormTitle(e.target.value)} required />
                </div>
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.healthFieldDescriptions}</label>
                  <textarea className="profile-page-input" value={healthFormDescriptions} onChange={(e) => setHealthFormDescriptions(e.target.value)} rows={4} required style={{ resize: 'none' }} />
                </div>
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{lang === 'vi' ? 'Chọn tài liệu đính kèm' : 'Attach Document'}</label>
                  <input
                    type="file"
                    className="profile-page-input"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const extension = file.name.split('.').pop() || '';
                        setHealthFormFileType(extension.toLowerCase());
                        setHealthFormFileUrl(file.name);
                      }
                    }}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  />
                </div>
              </div>
              <div className="profile-modal-footer" style={{ borderTop: '3px solid #1E293B' }}>
                <button type="button" className="profile-page-btn-secondary" onClick={() => setIsAddHealthModalOpen(false)}>{t.cancel}</button>
                <button type="submit" className="profile-page-btn-primary" style={{ background: '#0D9488' }}>{t.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 6: EDIT HEALTH RECORD ── */}
      {editingHealthRecord && (
        <div className="profile-modal-overlay" onClick={() => setEditingHealthRecord(null)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="profile-modal-header" style={{ borderBottom: '3px solid #1E293B' }}>
              <h3 className="profile-modal-title">{t.healthEditTitle}</h3>
              <button type="button" className="profile-modal-close-btn" onClick={() => setEditingHealthRecord(null)}>×</button>
            </div>
            <form onSubmit={handleUpdateHealthRecord}>
              <div className="profile-modal-body" style={{ maxHeight: 'min(500px, calc(80vh - 120px))', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="profile-page-form-group">
                    <label className="profile-page-field-label">{t.fieldDate}</label>
                    <input type="date" className="profile-page-input" value={healthFormDate} onChange={(e) => setHealthFormDate(e.target.value)} required />
                  </div>
                  <div className="profile-page-form-group">
                    <label className="profile-page-field-label">{t.healthColType}</label>
                    <input type="text" className="profile-page-input" value={healthFormFileType} disabled style={{ background: '#E2E8F0', textTransform: 'uppercase', cursor: 'not-allowed' }} />
                  </div>
                </div>
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.healthFieldTitle}</label>
                  <input type="text" className="profile-page-input" value={healthFormTitle} onChange={(e) => setHealthFormTitle(e.target.value)} required />
                </div>
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.healthFieldDescriptions}</label>
                  <textarea className="profile-page-input" value={healthFormDescriptions} onChange={(e) => setHealthFormDescriptions(e.target.value)} rows={4} required style={{ resize: 'none' }} />
                </div>

                {/* Cập nhật trường chọn tệp tin đính kèm cho chế độ sửa */}
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">
                    {lang === 'vi' ? 'Chọn tài liệu thay thế đính kèm' : 'Select New Attached Document'}
                  </label>
                  <input
                    type="file"
                    className="profile-page-input"
                    style={{ paddingTop: '8px' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const extension = file.name.split('.').pop() || '';
                        setHealthFormFileType(extension.toLowerCase());
                        setHealthFormFileUrl(file.name);
                      }
                    }}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  />
                  {healthFormFileUrl && (
                    <span style={{ fontSize: '0.8rem', color: '#0D9488', fontWeight: 700, marginTop: '0.35rem', display: 'block' }}>
                      📄 {lang === 'vi' ? 'Tệp hiện tại:' : 'Current file:'} {healthFormFileUrl}
                    </span>
                  )}
                </div>
              </div>
              <div className="profile-modal-footer" style={{ borderTop: '3px solid #1E293B' }}>
                <button type="button" className="profile-page-btn-secondary" onClick={() => setEditingHealthRecord(null)}>{t.cancel}</button>
                <button type="submit" className="profile-page-btn-primary" style={{ background: '#0D9488' }}>{t.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 7: CONFIRM DELETE HEALTH RECORD ── */}
      {deleteHealthTargetId && (
        <div className="profile-modal-overlay" onClick={() => setDeleteHealthTargetId(null)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px', border: '4px solid #EF4444' }}>
            <div className="profile-modal-header" style={{ background: '#FEE2E2', borderBottom: '3px solid #EF4444' }}>
              <h3 className="profile-modal-title" style={{ color: '#EF4444' }}>{t.deleteConfirmTitle}</h3>
              <button type="button" className="profile-modal-close-btn" onClick={() => setDeleteHealthTargetId(null)} style={{ color: '#EF4444' }}>×</button>
            </div>
            <div className="profile-modal-body" style={{ padding: '1.25rem' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>{t.deleteBody}</p>
            </div>
            <div className="profile-modal-footer">
              <button type="button" className="profile-page-btn-secondary" onClick={() => setDeleteHealthTargetId(null)}>{t.cancel}</button>
              <button type="button" className="profile-page-btn-primary" onClick={handleDeleteHealthRecord} style={{ background: '#EF4444' }}>{t.confirmDeleteBtn}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChildDetailView;