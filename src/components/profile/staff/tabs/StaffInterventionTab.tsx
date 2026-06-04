import React, { useState } from 'react';
import { SUBTEST_ITEMS_DB } from '../../tabs/ChildDetailView';

interface InterventionRecord {
  id: string;
  childName: string;
  age: number;
  parentName: string;
  level: string;
  levelColor: 'green' | 'amber' | 'red';
  status: 'active' | 'graduated';
  progress: number; // Tỷ lệ hoàn thành mục tiêu %
  startDate: string;
  objectives: string[];
  recentNote: string;
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

const translations = {
  vi: {
    title: "Hồ sơ can thiệp lâm sàng",
    subtitle: "Giám sát giáo án, đo lường chỉ số tiến bộ phát triển hành vi và ngôn ngữ của các bé",
    btnCreate: "➕ Tạo hồ sơ can thiệp mới",
    filterActive: "Đang can thiệp 🩺",
    filterGraduated: "Đã hoàn thành trị liệu 🎓",
    lblAge: "Tuổi:",
    lblParent: "Phụ huynh:",
    lblLevel: "Cấp độ tự kỷ:",
    lblStartDate: "Ngày bắt đầu can thiệp:",
    lblProgress: "Tiến trình đạt mục tiêu:",
    lblObjectives: "Mục tiêu can thiệp chính:",
    lblRecentNote: "Đánh giá buổi học gần nhất:",
    statusActive: "Đang trị liệu",
    statusGraduated: "Đã tốt nghiệp",
    levelLight: "Mức 1 - Tự lập có hỗ trợ ít",
    levelMedium: "Mức 2 - Cần hỗ trợ nhiều",
    levelSevere: "Mức 3 - Cần hỗ trợ đặc biệt nghiêm trọng",
    emptySearch: "Không tìm thấy hồ sơ trẻ phù hợp",
    placeholderSearch: "🔍 Tìm tên trẻ, mã hồ sơ...",
    lblChartTitle: "Phân tích tiến độ phát triển 5 lĩnh vực chính",
    toastCreateSuccess: "✨ Đã tạo hồ sơ can thiệp mới lâm sàng thành công!",
    lblDetailBtn: "Xem bệnh án chi tiết",
    emptyStateTitle: "Không tìm thấy hồ sơ can thiệp phù hợp",
    emptyStateSub: "Vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để kiểm tra lại.",
    statTotalRecords: "Tổng hồ sơ can thiệp",
    statActiveRecords: "Đang trị liệu 🩺",
    statGraduatedRecords: "Đã tốt nghiệp 🎓",
    statAvgMastery: "Mastery trung bình ✨",
    expertStatsTitle: "Báo Cáo Tiến Độ Trị Liệu Tổng Hợp 📊",
    expertStatsSubtitle: "Tỷ lệ hoàn thành mục tiêu can thiệp (Mastery Progress) của từng trẻ đang phụ trách",
    
    // New Translations Scoped for assessments view list and details
    btnViewAssessments: "Xem các bài đánh giá 🩺",
    backToRecords: "⬅️ Quay lại danh sách hồ sơ",
    assessmentsHeader: "LỊCH SỬ ĐÁNH GIÁ LÂM SÀNG CỦA BÉ",
    assessmentSubTitle: "Chi tiết các đợt kiểm thử chẩn đoán và năng lực phát triển của trẻ",
    btnViewDetails: "Xem chi tiết 📊",
    btnDownload: "Tải xuống 📥",
    btnDelete: "Xóa 🗑️",
    detailsTitle: "📊 CHI TIẾT KẾT QUẢ ĐÁNH GIÁ PEP-3 LÂM SÀNG",
    pep3SubTitle: "Báo cáo chi tiết 13 tiểu test lâm sàng phác họa thế mạnh và khó khăn phát triển của trẻ",
    subtestCol: "Tiểu test lâm sàng",
    scoredCol: "Điểm số đạt",
    maxCol: "Điểm tối đa",
    percentCol: "Tỷ lệ phát triển",
    descCol: "Đặc tả lâm sàng y học",
    close: "Đóng cửa sổ",
    noAssessments: "Chưa có dữ liệu bài đánh giá nào cho trẻ này."
  },
  en: {
    title: "Clinical Intervention Records",
    subtitle: "Monitor treatment plans, track development progress, and manage sensory-behavior milestones",
    btnCreate: "➕ Create Intervention Record",
    filterActive: "Under Active Therapy 🩺",
    filterGraduated: "Graduated Therapy 🎓",
    lblAge: "Age:",
    lblParent: "Parent:",
    lblLevel: "ASD Level:",
    lblStartDate: "Intervention Start Date:",
    lblProgress: "Objective Mastery Progress:",
    lblObjectives: "Core Intervention Objectives:",
    lblRecentNote: "Latest Session Diagnostic Note:",
    statusActive: "Active Therapy",
    statusGraduated: "Graduated",
    levelLight: "Level 1 - Requiring Support",
    levelMedium: "Level 2 - Requiring Substantial Support",
    levelSevere: "Level 3 - Requiring Very Substantial Support",
    emptySearch: "No child records match search criteria",
    placeholderSearch: "🔍 Search child name, record ID...",
    lblChartTitle: "5 Development Domains Analytics Progress",
    toastCreateSuccess: "✨ New clinical intervention record created successfully!",
    lblDetailBtn: "View Detailed Medical Record",
    emptyStateTitle: "No clinical intervention records found",
    emptyStateSub: "Please adjust your search keyword or filters and try again.",
    statTotalRecords: "Total Intervention Records",
    statActiveRecords: "Active Therapy 🩺",
    statGraduatedRecords: "Graduated 🎓",
    statAvgMastery: "Avg Mastery Rate ✨",
    expertStatsTitle: "Intervention Performance Analytics 📊",
    expertStatsSubtitle: "Objective mastery progress of children currently under your charge",

    // New Translations Scoped for assessments view list and details
    btnViewAssessments: "View Assessments 🩺",
    backToRecords: "⬅️ Back to child profiles",
    assessmentsHeader: "CLINICAL ASSESSMENT HISTORY",
    assessmentSubTitle: "Detailed diagnostic and developmental capability records of child",
    btnViewDetails: "Details 📊",
    btnDownload: "Download 📥",
    btnDelete: "Delete 🗑️",
    detailsTitle: "📊 DETAILED CLINICAL PEP-3 ASSESSMENT REPORT",
    pep3SubTitle: "Detailed report of 13 clinical subtests mapping child developmental strengths and struggles",
    subtestCol: "Clinical Subtest",
    scoredCol: "Score",
    maxCol: "Max",
    percentCol: "Progress Rate",
    descCol: "Clinical Medical Description",
    close: "Close Window",
    noAssessments: "No assessment records found for this child."
  }
};

const MOCK_RECORDS: InterventionRecord[] = [
  {
    id: "REC-2026-004",
    childName: "Trần Gia Bảo",
    age: 4,
    parentName: "Nguyễn Thanh Hằng",
    level: "levelLight",
    levelColor: "green",
    status: "active",
    progress: 78,
    startDate: "2026-01-15",
    objectives: [
      "Giao tiếp bằng mắt chủ động đạt > 5 giây khi nói chuyện",
      "Gọi tên quay lại đáp ứng trong 8/10 lần thử nghiệm",
      "Sử dụng cụm từ 3 từ để biểu đạt nhu cầu cá nhân"
    ],
    recentNote: "Bé phản ứng rất nhanh khi cô giáo gọi tên hôm nay. Tuy nhiên, khả năng giao tiếp mắt cần duy trì đều đặn ở các môi trường ồn ào."
  },
  {
    id: "REC-2026-011",
    childName: "Đỗ Hoàng Hải",
    age: 5,
    parentName: "Đỗ Thùy Linh",
    level: "levelMedium",
    levelColor: "amber",
    status: "active",
    progress: 52,
    startDate: "2026-02-10",
    objectives: [
      "Ngồi yên tập trung thực hiện nhiệm vụ bento gỗ > 10 phút",
      "Giảm hành vi vỗ tay tự kích thích khi phấn khích",
      "Đáp lại câu hỏi đơn giản Có/Không một cách độc lập"
    ],
    recentNote: "Bé đã chịu ngồi ghép tranh gỗ được 8 phút. Hành vi vỗ tay tự kích thích có xu hướng giảm nhẹ khi được ôm chặt (Deep Pressure)."
  },
  {
    id: "REC-2026-009",
    childName: "Phạm Minh Đăng",
    age: 3,
    parentName: "Phạm Hoàng Nam",
    level: "levelSevere",
    levelColor: "red",
    status: "active",
    progress: 35,
    startDate: "2026-03-01",
    objectives: [
      "Phản xạ nhìn theo vật thể di động và hướng chỉ tay của cô",
      "Bắt chước 5 âm cơ bản (a, o, u, ba, ma)",
      "Chấp nhận tương tác cầm tay chỉ việc trong trò chơi cát trị liệu"
    ],
    recentNote: "Buổi trị liệu cảm giác đạt kết quả khả quan, bé ít khóc ré khi tiếp xúc với cát mịn, bắt đầu phát âm 'ba' khi cô khuyến khích."
  },
  {
    id: "REC-2026-002",
    childName: "Phan Khánh Ngọc",
    age: 6,
    parentName: "Phan Thu Trang",
    level: "levelLight",
    levelColor: "green",
    status: "graduated",
    progress: 95,
    startDate: "2025-08-20",
    objectives: [
      "Hòa nhập vui chơi tương tác nhóm 3 trẻ không xung đột",
      "Tự thực hiện vệ sinh cá nhân rửa tay theo quy trình 6 bước",
      "Kể lại ngắn gọn một câu chuyện tranh 4 khung cảnh đơn giản"
    ],
    recentNote: "Hồ sơ hoàn thành can thiệp xuất sắc. Bé đã sẵn sàng vào học lớp 1 trường hòa nhập thông thường. Sẽ kiểm tra định kỳ 6 tháng."
  }
];

// Mock clinical assessments map for each child
const MOCK_ASSESSMENTS_MAP: Record<string, AssessmentResult[]> = {
  "REC-2026-004": [ // Trần Gia Bảo
    {
      id: "ASM-PEP3-101",
      toolName: "PEP-3",
      date: "2026-05-15",
      examiner: "TS. BS. Nguyễn Minh Anh",
      totalScore: "138 / 218",
      status: "completed",
      notesVi: "Bé Trần Gia Bảo hợp tác rất tốt, tiến bộ vượt bậc ở tiểu test nhận thức có lời và ngôn ngữ diễn đạt. Cầm nắm bút sáp vẽ nét gạch tốt. Tuy nhiên vận động thô còn yếu thăng bằng nhẹ.",
      notesEn: "Tran Gia Bao cooperated very well, showed outstanding progress in Cognitive Verbal and Expressive Language. Fine motor drawing is decent. However, gross motor balance remains slightly weak.",
      scores: {
        CVP: { scored: 22, max: 34, labelVi: "Nhận thức (CVP)", labelEn: "Cognitive Verbal/Preverbal", descVi: "Khả năng giải quyết vấn đề, phân loại vật liệu, tư duy logic cơ bản.", descEn: "Problem solving, sorting objects, basic logical thinking skills." },
        EL: { scored: 17, max: 26, labelVi: "Ngôn ngữ diễn đạt (EL)", labelEn: "Expressive Language", descVi: "Khả năng nói, phát âm từ đơn, ghép cụm từ, diễn đạt nhu cầu bằng lời.", descEn: "Ability to speak, pronounce single words, form phrases, express verbal needs." },
        RL: { scored: 12, max: 19, labelVi: "Ngôn ngữ tiếp nhận (RL)", labelEn: "Receptive Language", descVi: "Khả năng hiểu mệnh lệnh, nhận diện vật thể và phản ứng với lời nói.", descEn: "Understanding instructions, identifying objects, and responding to speech." },
        FM: { scored: 14, max: 20, labelVi: "Vận động tinh (FM)", labelEn: "Fine Motor", descVi: "Sử dụng ngón tay, cầm bút, xếp khối gỗ, cắt kéo mộc mạc.", descEn: "Finger usage, holding pencil, stacking blocks, raw scissors control." },
        GM: { scored: 8, max: 15, labelVi: "Vận động thô (GM)", labelEn: "Gross Motor", descVi: "Khả năng giữ thăng bằng, nhảy, đi lò cò, vận động cơ lớn.", descEn: "Balance control, jumping, hopping, large muscle group coordination." },
        VMI: { scored: 7, max: 10, labelVi: "Trực quan - Vận động (VMI)", labelEn: "Visual-Motor Imitation", descVi: "Bắt chước vẽ các đường nét, xếp hình theo mẫu có sẵn.", descEn: "Imitating drawing lines, copying shapes, and stacking pattern templates." },
        AE: { scored: 8, max: 11, labelVi: "Bộc lộ cảm xúc (AE)", labelEn: "Affective Expression", descVi: "Cách trẻ bộc lộ cảm xúc vui, buồn, giận dữ và tương tác mặt đối mặt.", descEn: "How the child expresses joy, sadness, anger, and maintains face-to-face contact." },
        SR: { scored: 9, max: 12, labelVi: "Tương tác xã hội (SR)", labelEn: "Social Reciprocity", descVi: "Phản ứng chia sẻ chú ý chung, hồi đáp cử chỉ của chuyên viên.", descEn: "Responding to joint attention, reciprocating examiner gestures." },
        CMB: { scored: 9, max: 15, labelVi: "Hành vi vận động (CMB)", labelEn: "Characteristic Motor Behaviors", descVi: "Sử dụng đồ chơi đúng cách, có hành vi rập khuôn vận động thô.", descEn: "Appropriate toy usage, absence of gross motor stereotypic actions." },
        CVB: { scored: 8, max: 12, labelVi: "Hành vi ngôn ngữ (CVB)", labelEn: "Characteristic Verbal Behaviors", descVi: "nói nhại lời, có giọng điệu kỳ lạ hay lặp lại cụm từ vô nghĩa.", descEn: "Absence of echolalia, weird intonations, or repetitive meaningless phrases." },
        PB: { scored: 10, max: 15, labelVi: "Vấn đề hành vi (PB)", labelEn: "Problem Behaviors", descVi: "Mức độ tự kiểm soát, cáu gắt ăn vạ khi đổi hoạt động đột ngột.", descEn: "Self-regulation level, absence of tantrums when activities change abruptly." },
        PSC: { scored: 7, max: 10, labelVi: "Tự chăm sóc (PSC)", labelEn: "Personal Self-Care", descVi: "Kỹ năng tự cởi giày, cởi áo, rửa tay, tự xúc ăn mộc mạc.", descEn: "Basic skills in taking off shoes, undressing, washing hands, self-feeding." },
        AB: { scored: 11, max: 15, labelVi: "Hành vi thích ứng (AB)", labelEn: "Adaptive Behavior", descVi: "Khả năng thích nghi của trẻ trong môi trường sinh hoạt hàng ngày.", descEn: "The child's capability to adapt during daily living environments." }
      }
    },
    {
      id: "ASM-CARS-102",
      toolName: "CARS",
      date: "2026-05-18",
      examiner: "ThS. Nguyễn Thị Mai",
      totalScore: "32.0 / 60",
      status: "completed",
      notesVi: "Điểm số CARS 32.0 biểu thị mức độ tự kỷ nhẹ, trẻ phản xạ tốt nhưng cần tăng cường thêm kỹ năng xã hội.",
      notesEn: "CARS score is 32.0 showing mild autism. Social skills are recommended for improvement.",
      scores: {
        SOC: { scored: 2.5, max: 4, labelVi: "Quan hệ với mọi người", labelEn: "Relating to People", descVi: "Mức độ tương tác xã hội, kết nối cảm xúc với cha mẹ và người lạ.", descEn: "Level of social interaction, emotional connection with parents and strangers." },
        IMI: { scored: 2.0, max: 4, labelVi: "Bắt chước", labelEn: "Imitation", descVi: "Khả năng bắt chước hành động, âm thanh và lời nói từ người khác.", descEn: "Ability to imitate actions, sounds, and speech from others." },
        EMO: { scored: 2.5, max: 4, labelVi: "Phản ứng cảm xúc", labelEn: "Emotional Response", descVi: "Sự phù hợp của cảm xúc với hoàn cảnh thực tế xung quanh.", descEn: "Appropriateness of emotional responses to the actual surroundings." },
        BODY: { scored: 2.0, max: 4, labelVi: "Sử dụng cơ thể", labelEn: "Body Use", descVi: "Sự khéo léo của cơ thể, có hành vi tự kích thích rập khuôn.", descEn: "Body coordination, absence of stereotypic self-stimulatory movements." },
        OBJ: { scored: 2.0, max: 4, labelVi: "Sử dụng đồ vật", labelEn: "Object Use", descVi: "Mức độ hứng thú và cách chơi đồ chơi đúng chức năng thiết kế.", descEn: "Interest level and functional usage of toys as designed." },
        ADAPT: { scored: 2.5, max: 4, labelVi: "Thích ứng với thay đổi", labelEn: "Adaptation to Change", descVi: "Phản ứng khi thay đổi thói quen, hoạt động hoặc đồ dùng quen thuộc.", descEn: "Reaction to changes in routines, activities, or familiar items." }
      }
    }
  ],
  "REC-2026-011": [ // Đỗ Hoàng Hải
    {
      id: "ASM-PEP3-201",
      toolName: "PEP-3",
      date: "2026-05-12",
      examiner: "TS. BS. Nguyễn Minh Anh",
      totalScore: "128 / 218",
      status: "completed",
      notesVi: "Bé Đỗ Hoàng Hải cần hỗ trợ nhiều ở tương tác xã hội. Khả năng bắt chước và liên kết mắt tay ở mức trung bình khá.",
      notesEn: "Do Hoang Hai needs substantial support in social interaction. Visual-motor imitation is fair.",
      scores: {
        CVP: { scored: 19, max: 34, labelVi: "Nhận thức (CVP)", labelEn: "Cognitive Verbal/Preverbal", descVi: "Khả năng giải quyết vấn đề, phân loại vật liệu, tư duy logic cơ bản.", descEn: "Problem solving, sorting objects, basic logical thinking skills." },
        EL: { scored: 13, max: 26, labelVi: "Ngôn ngữ diễn đạt (EL)", labelEn: "Expressive Language", descVi: "Khả năng nói, phát âm từ đơn, ghép cụm từ, diễn đạt nhu cầu bằng lời.", descEn: "Ability to speak, pronounce single words, form phrases, express verbal needs." },
        RL: { scored: 10, max: 19, labelVi: "Ngôn ngữ tiếp nhận (RL)", labelEn: "Receptive Language", descVi: "Khả năng hiểu mệnh lệnh, nhận diện vật thể và phản ứng với lời nói.", descEn: "Understanding instructions, identifying objects, and responding to speech." },
        FM: { scored: 13, max: 20, labelVi: "Vận động tinh (FM)", labelEn: "Fine Motor", descVi: "Sử dụng ngón tay, cầm bút, xếp khối gỗ, cắt kéo mộc mạc.", descEn: "Finger usage, holding pencil, stacking blocks, raw scissors control." },
        GM: { scored: 9, max: 15, labelVi: "Vận động thô (GM)", labelEn: "Gross Motor", descVi: "Khả năng giữ thăng bằng, nhảy, đi lò cò, vận động cơ lớn.", descEn: "Balance control, jumping, hopping, large muscle group coordination." },
        VMI: { scored: 6, max: 10, labelVi: "Trực quan - Vận động (VMI)", labelEn: "Visual-Motor Imitation", descVi: "Bắt chước vẽ các đường nét, xếp hình theo mẫu có sẵn.", descEn: "Imitating drawing lines, copying shapes, and stacking pattern templates." },
        AE: { scored: 7, max: 11, labelVi: "Bộc lộ cảm xúc (AE)", labelEn: "Affective Expression", descVi: "Cách trẻ bộc lộ cảm xúc vui, buồn, giận dữ và tương tác mặt đối mặt.", descEn: "How the child expresses joy, sadness, anger, and maintains face-to-face contact." },
        SR: { scored: 8, max: 12, labelVi: "Tương tác xã hội (SR)", labelEn: "Social Reciprocity", descVi: "Phản ứng chia sẻ chú ý chung, hồi đáp cử chỉ của chuyên viên.", descEn: "Responding to joint attention, reciprocating examiner gestures." },
        CMB: { scored: 9, max: 15, labelVi: "Hành vi vận động (CMB)", labelEn: "Characteristic Motor Behaviors", descVi: "Sử dụng đồ chơi đúng cách, có hành vi rập khuôn vận động thô.", descEn: "Appropriate toy usage, absence of gross motor stereotypic actions." },
        CVB: { scored: 8, max: 12, labelVi: "Hành vi ngôn ngữ (CVB)", labelEn: "Characteristic Verbal Behaviors", descVi: "nói nhại lời, có giọng điệu kỳ lạ hay lặp lại cụm từ vô nghĩa.", descEn: "Absence of echolalia, weird intonations, or repetitive meaningless phrases." },
        PB: { scored: 9, max: 15, labelVi: "Vấn đề hành vi (PB)", labelEn: "Problem Behaviors", descVi: "Mức độ tự kiểm soát, cáu gắt ăn vạ khi đổi hoạt động đột ngột.", descEn: "Self-regulation level, absence of tantrums when activities change abruptly." },
        PSC: { scored: 6, max: 10, labelVi: "Tự chăm sóc (PSC)", labelEn: "Personal Self-Care", descVi: "Kỹ năng tự cởi giày, cởi áo, rửa tay, tự xúc ăn mộc mạc.", descEn: "Basic skills in taking off shoes, undressing, washing hands, self-feeding." },
        AB: { scored: 10, max: 15, labelVi: "Hành vi thích ứng (AB)", labelEn: "Adaptive Behavior", descVi: "Khả năng thích nghi của trẻ trong môi trường sinh hoạt hàng ngày.", descEn: "The child's capability to adapt during daily living environments." }
      }
    }
  ],
  "REC-2026-009": [ // Phạm Minh Đăng
    {
      id: "ASM-PEP3-301",
      toolName: "PEP-3",
      date: "2026-05-14",
      examiner: "TS. BS. Nguyễn Minh Anh",
      totalScore: "115 / 218",
      status: "completed",
      notesVi: "Bé Phạm Minh Đăng có thiếu hụt nghiêm trọng về mặt ngôn ngữ và tự chăm sóc. Cần can thiệp tích cực cường độ cao.",
      notesEn: "Pham Minh Dang shows severe delays in language and personal self-care. High-intensity intervention is recommended.",
      scores: {
        CVP: { scored: 16, max: 34, labelVi: "Nhận thức (CVP)", labelEn: "Cognitive Verbal/Preverbal", descVi: "Khả năng giải quyết vấn đề, phân loại vật liệu, tư duy logic cơ bản.", descEn: "Problem solving, sorting objects, basic logical thinking skills." },
        EL: { scored: 10, max: 26, labelVi: "Ngôn ngữ diễn đạt (EL)", labelEn: "Expressive Language", descVi: "Khả năng nói, phát âm từ đơn, ghép cụm từ, diễn đạt nhu cầu bằng lời.", descEn: "Ability to speak, pronounce single words, form phrases, express verbal needs." },
        RL: { scored: 9, max: 19, labelVi: "Ngôn ngữ tiếp nhận (RL)", labelEn: "Receptive Language", descVi: "Khả năng hiểu mệnh lệnh, nhận diện vật thể và phản ứng với lời nói.", descEn: "Understanding instructions, identifying objects, and responding to speech." },
        FM: { scored: 11, max: 20, labelVi: "Vận động tinh (FM)", labelEn: "Fine Motor", descVi: "Sử dụng ngón tay, cầm bút, xếp khối gỗ, cắt kéo mộc mạc.", descEn: "Finger usage, holding pencil, stacking blocks, raw scissors control." },
        GM: { scored: 8, max: 15, labelVi: "Vận động thô (GM)", labelEn: "Gross Motor", descVi: "Khả năng giữ thăng bằng, nhảy, đi lò cò, vận động cơ lớn.", descEn: "Balance control, jumping, hopping, large muscle group coordination." },
        VMI: { scored: 5, max: 10, labelVi: "Trực quan - Vận động (VMI)", labelEn: "Visual-Motor Imitation", descVi: "Bắt chước vẽ các đường nét, xếp hình theo mẫu có sẵn.", descEn: "Imitating drawing lines, copying shapes, and stacking pattern templates." },
        AE: { scored: 7, max: 11, labelVi: "Bộc lộ cảm xúc (AE)", labelEn: "Affective Expression", descVi: "Cách trẻ bộc lộ cảm xúc vui, buồn, giận dữ và tương tác mặt đối mặt.", descEn: "How the child expresses joy, sadness, anger, and maintains face-to-face contact." },
        SR: { scored: 8, max: 12, labelVi: "Tương tác xã hội (SR)", labelEn: "Social Reciprocity", descVi: "Phản ứng chia sẻ chú ý chung, hồi đáp cử chỉ của chuyên viên.", descEn: "Responding to joint attention, reciprocating examiner gestures." },
        CMB: { scored: 9, max: 15, labelVi: "Hành vi vận động (CMB)", labelEn: "Characteristic Motor Behaviors", descVi: "Sử dụng đồ chơi đúng cách, có hành vi rập khuôn vận động thô.", descEn: "Appropriate toy usage, absence of gross motor stereotypic actions." },
        CVB: { scored: 8, max: 12, labelVi: "Hành vi ngôn ngữ (CVB)", labelEn: "Characteristic Verbal Behaviors", descVi: "nói nhại lời, có giọng điệu kỳ lạ hay lặp lại cụm từ vô nghĩa.", descEn: "Absence of echolalia, weird intonations, or repetitive meaningless phrases." },
        PB: { scored: 10, max: 15, labelVi: "Vấn đề hành vi (PB)", labelEn: "Problem Behaviors", descVi: "Mức độ tự kiểm soát, cáu gắt ăn vạ khi đổi hoạt động đột ngột.", descEn: "Self-regulation level, absence of tantrums when activities change abruptly." },
        PSC: { scored: 5, max: 10, labelVi: "Tự chăm sóc (PSC)", labelEn: "Personal Self-Care", descVi: "Kỹ năng tự cởi giày, cởi áo, rửa tay, tự xúc ăn mộc mạc.", descEn: "Basic skills in taking off shoes, undressing, washing hands, self-feeding." },
        AB: { scored: 9, max: 15, labelVi: "Hành vi thích ứng (AB)", labelEn: "Adaptive Behavior", descVi: "Khả năng thích nghi của trẻ trong môi trường sinh hoạt hàng ngày.", descEn: "The child's capability to adapt during daily living environments." }
      }
    }
  ]
};

const StaffInterventionTab: React.FC<{ lang: 'vi' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  const [records] = useState<InterventionRecord[]>(MOCK_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'graduated'>('all');
  const [showToast, setShowToast] = useState(false);

  // States scoped for navigation of child assessments
  const [selectedRecordForAssessments, setSelectedRecordForAssessments] = useState<InterventionRecord | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<AssessmentResult | null>(null);
  const [expandedSubtests, setExpandedSubtests] = useState<Record<string, boolean>>({});

  const handleCreateRecord = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDownload = (record: AssessmentResult) => {
    const jsonStr = JSON.stringify(record, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedRecordForAssessments?.childName.replace(/\s+/g, '_') || 'Child'}_${record.toolName}_${record.date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredRecords = records.filter(rec => {
    const matchesSearch = rec.childName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rec.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // If a child is selected to view their assessments, render the View List sub-page
  if (selectedRecordForAssessments !== null) {
    const childAssessments = MOCK_ASSESSMENTS_MAP[selectedRecordForAssessments.id] || [];

    return (
      <div className="intervention-tab-wrapper staff-intervention-wrapper" style={{ animation: 'profile-fade-in 0.25s ease-out' }}>
        
        {/* Back Header with pill-shape Memphis button */}
        <div className="detail-navigation-bar" style={{ marginBottom: '1.5rem' }}>
          <button
            type="button"
            className="profile-page-btn-secondary"
            onClick={() => setSelectedRecordForAssessments(null)}
            style={{ padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            {t.backToRecords}
          </button>
        </div>

        {/* Header Card Memphis */}
        <div 
          className="intervention-header-zone"
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
          <div className="intervention-title-block">
            <h2 className="intervention-tab-title" style={{ margin: 0, fontWeight: 900, color: '#1E293B', fontSize: '1.4rem' }}>
              🩺 {t.assessmentsHeader}: {selectedRecordForAssessments.childName}
            </h2>
            <p className="intervention-tab-subtitle" style={{ margin: '6px 0 0 0', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
              {t.assessmentSubTitle}
            </p>
          </div>
        </div>

        {/* View List of Assessments */}
        <div className="profile-sticker-card assessments-list-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFF' }}>
          {childAssessments.length === 0 ? (
            <div style={{ padding: '3rem 1rem', textAlign: 'center', border: '3px dashed #CBD5E1', borderRadius: '16px' }}>
              <span style={{ fontSize: '3rem' }}>🩺</span>
              <p style={{ color: '#64748B', fontWeight: 700, fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                {t.noAssessments}
              </p>
            </div>
          ) : (
            <div className="assessments-sticker-table" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {childAssessments.map((record) => (
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
                    gap: '1rem',
                    transition: 'all 180ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <div className="cell-tool-meta">
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0D9488', letterSpacing: '0.5px' }}>{record.id}</span>
                    <h3 style={{ margin: '0.1rem 0 0 0', fontWeight: 900, color: '#1E293B', fontSize: '1.4rem' }}>{record.toolName}</h3>
                  </div>

                  <div className="cell-date">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>📅 {lang === 'vi' ? 'Ngày thực hiện' : 'Date'}</span>
                    <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.9rem' }}>{record.date}</span>
                  </div>

                  <div className="cell-examiner">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>👩‍⚕️ {lang === 'vi' ? 'Người đánh giá' : 'Examiner'}</span>
                    <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.9rem' }}>{record.examiner}</span>
                  </div>

                  <div className="cell-score">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>📊 {lang === 'vi' ? 'Tổng điểm' : 'Score'}</span>
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
          )}
        </div>

        {/* ── MODAL 1: VIEW DETAILS PEP-3 (View Detail y hệt luồng profile) ── */}
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
                
                {/* 1. Thông tin chung */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '16px', border: '2.5px solid #1E293B', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>👶 {lang === 'vi' ? 'Trẻ đánh giá:' : 'Patient:'}</span>
                    <span style={{ fontWeight: 800, color: '#1E293B' }}>{selectedRecordForAssessments.childName}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>📅 {lang === 'vi' ? 'Ngày thực hiện:' : 'Date:'}</span>
                    <span style={{ fontWeight: 800, color: '#1E293B' }}>{selectedDetails.date}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>👩‍⚕️ {lang === 'vi' ? 'Người đánh giá:' : 'Examiner:'}</span>
                    <span style={{ fontWeight: 800, color: '#1E293B' }}>{selectedDetails.examiner}</span>
                  </div>
                </div>

                {/* 2. Bảng phân rã các tiểu test lâm sàng (nếu có dữ liệu scores) */}
                {selectedDetails.scores && (
                  <>
                    <h4 style={{ margin: '1.5rem 0 1rem 0', fontWeight: 900, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                      📊 {lang === 'vi' ? 'Phân rã 100% chỉ số tiểu test lâm sàng:' : '100% Clinical Subtests Breakdown:'}
                    </h4>
                    <div className="pep3-detail-table-wrapper">
                      <table>
                        <thead>
                          <tr style={{ background: '#F8FAFC' }}>
                            <th style={{ padding: '12px 16px', fontWeight: 900, color: '#1E293B', fontSize: '0.85rem' }}>
                              {t.subtestCol}
                            </th>
                            <th style={{ padding: '12px 16px', fontWeight: 900, color: '#1E293B', fontSize: '0.85rem', textAlign: 'center' }}>
                              {t.scoredCol}
                            </th>
                            <th style={{ padding: '12px 16px', fontWeight: 900, color: '#1E293B', fontSize: '0.85rem', textAlign: 'center' }}>
                              {t.maxCol}
                            </th>
                            <th style={{ padding: '12px 16px', fontWeight: 900, color: '#1E293B', fontSize: '0.85rem' }}>
                              {t.percentCol}
                            </th>
                            <th style={{ padding: '12px 16px', fontWeight: 900, color: '#1E293B', fontSize: '0.85rem' }}>
                              {t.descCol}
                            </th>
                            <th style={{ padding: '12px 16px', fontWeight: 900, color: '#1E293B', fontSize: '0.85rem', textAlign: 'center' }}>
                              {lang === 'vi' ? 'Chi tiết' : 'Details'}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(selectedDetails.scores).map(([code, scoreData]) => {
                            const percent = Math.round((scoreData.scored / scoreData.max) * 100);
                            const isExpanded = !!expandedSubtests[code];
                            return (
                              <React.Fragment key={code}>
                                <tr className="pep3-table-main-row" style={{ borderBottom: '1.5px solid #CBD5E1' }}>
                                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#1E293B', fontSize: '0.9rem' }}>
                                    {lang === 'vi' ? scoreData.labelVi : scoreData.labelEn}
                                  </td>
                                  <td style={{ padding: '14px 16px', fontWeight: 900, color: '#0D9488', fontSize: '1rem', textAlign: 'center' }}>
                                    {scoreData.scored}
                                  </td>
                                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#475569', fontSize: '0.9rem', textAlign: 'center' }}>
                                    {scoreData.max}
                                  </td>
                                  <td style={{ padding: '14px 16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '130px' }}>
                                      <div style={{ width: '80px', height: '8px', background: '#E2E8F0', border: '1px solid #1E293B', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #F97316, #EA580C)', transition: 'width 0.3s ease' }} />
                                      </div>
                                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1E293B' }}>{percent}%</span>
                                    </div>
                                  </td>
                                  <td style={{ padding: '14px 16px', color: '#475569', fontSize: '0.8rem', fontWeight: 700, maxWidth: '280px', lineHeight: '1.45', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                    {lang === 'vi' ? scoreData.descVi : scoreData.descEn}
                                  </td>
                                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                    <button
                                      type="button"
                                      className="candy-btn-action"
                                      onClick={() => setExpandedSubtests(prev => ({ ...prev, [code]: !prev[code] }))}
                                      style={{
                                        padding: '5px 12px',
                                        background: '#0D9488',
                                        border: '2px solid #1E293B',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        color: '#FFF',
                                        cursor: 'pointer',
                                        boxShadow: '1.5px 1.5px 0 #1E293B',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {isExpanded 
                                        ? (lang === 'vi' ? 'Ẩn bớt 🔍' : 'Hide items 🔍')
                                        : (lang === 'vi' ? 'Xem mục 🔍' : 'View items 🔍')
                                      }
                                    </button>
                                  </td>
                                </tr>
                                
                                {/* Accordion detail subtest items */}
                                {isExpanded && (
                                  <tr>
                                    <td colSpan={6} style={{ padding: '0 16px 16px 16px', background: '#F8FAFC' }}>
                                      <div className="subtest-accordion-panel">
                                        <h5 style={{ margin: '0 0 10px 0', fontWeight: 900, color: '#1E293B', fontSize: '0.85rem', fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                                          📝 {lang === 'vi' ? `Chi tiết bài tập kiểm thử của tiểu test ${code}:` : `Diagnostic test items detail of subtest ${code}:`}
                                        </h5>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                          {SUBTEST_ITEMS_DB[code] && SUBTEST_ITEMS_DB[code].length > 0 ? (
                                            SUBTEST_ITEMS_DB[code].map((item) => (
                                              <div 
                                                key={item.id} 
                                                className="subtest-item-sticker-card"
                                                style={{
                                                  background: '#FFFFFF',
                                                  border: '2px solid #1E293B',
                                                  borderRadius: '12px',
                                                  padding: '10px 14px',
                                                  boxShadow: '3px 3px 0 #1E293B',
                                                  display: 'grid',
                                                  gridTemplateColumns: '1fr auto',
                                                  gap: '1rem',
                                                  alignItems: 'center',
                                                  boxSizing: 'border-box'
                                                }}
                                              >
                                                <div>
                                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#0D9488', background: '#E6F4F1', padding: '1px 6px', borderRadius: '4px', border: '1.5px solid #0D9488' }}>
                                                      {item.id}
                                                    </span>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                                                      {lang === 'vi' ? item.activityVi : item.activityEn}
                                                    </span>
                                                  </div>
                                                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', fontWeight: 700, lineHeight: '1.4' }}>
                                                    💬 <strong>{lang === 'vi' ? 'Biểu hiện lâm sàng:' : 'Clinical behavior:'}</strong> {lang === 'vi' ? item.behaviorVi : item.behaviorEn}
                                                  </p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                  <span style={{ 
                                                    fontSize: '0.72rem', 
                                                    fontWeight: 900, 
                                                    color: '#1E293B', 
                                                    background: item.score === 2 ? '#D1FAE5' : item.score === 1 ? '#FEF3C7' : '#FEE2E2', 
                                                    padding: '4px 10px', 
                                                    borderRadius: '8px', 
                                                    border: '2px solid #1E293B',
                                                    whiteSpace: 'nowrap',
                                                    boxShadow: '1.5px 1.5px 0 #1E293B'
                                                  }}>
                                                    {item.score} {lang === 'vi' ? 'Điểm' : 'Pts'}
                                                  </span>
                                                </div>
                                              </div>
                                            ))
                                          ) : (
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', fontStyle: 'italic' }}>
                                              {lang === 'vi' ? 'Không có dữ liệu bài đánh giá cụ thể cho tiểu test này.' : 'No assessment items recorded for this subtest.'}
                                            </p>
                                          )}
                                        </div>
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
                  </>
                )}

                {/* 3. Tổng kết & Nhận xét của chuyên gia lâm sàng */}
                <div style={{ marginTop: '1.8rem', borderTop: '2.5px dashed #CBD5E1', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', background: '#F0FDF4', border: '2.5px solid #1E293B', padding: '10px 18px', borderRadius: '14px', boxShadow: '3px 3px 0 #1E293B' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#166534', fontWeight: 900, fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                      {lang === 'vi' ? '🏆 Tổng điểm tích lũy toàn bài PEP-3:' : '🏆 Total Accumulated PEP-3 Score:'}
                    </strong>
                    <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#166534' }}>
                      {selectedDetails.totalScore}
                    </span>
                  </div>

                  <div style={{ background: '#FFFDF5', border: '2.5px solid #1E293B', padding: '14px 18px', borderRadius: '16px', boxShadow: '4px 4px 0 #1E293B' }}>
                    <h5 style={{ margin: '0 0 8px 0', fontWeight: 900, color: '#1E293B', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                      📑 {lang === 'vi' ? 'Nhận xét chuyên khoa lâm sàng của bác sĩ:' : 'Clinical Specialist Remarks & Recommendations:'}
                    </h5>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', fontWeight: 700, lineHeight: '1.5' }}>
                      {lang === 'vi' ? selectedDetails.notesVi : selectedDetails.notesEn}
                    </p>
                  </div>
                </div>

              </div>
              <div className="profile-modal-footer" style={{ borderTop: '2.5px solid #1E293B', background: '#F8FAFC' }}>
                <button type="button" className="profile-page-btn-primary" onClick={() => setSelectedDetails(null)} style={{ background: '#1E293B' }}>{t.close}</button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // Otherwise, render the original Intervention child profiles list
  return (
    <div className="intervention-tab-wrapper staff-intervention-wrapper">
      
      {/* Toast Alert */}
      {showToast && (
        <div className="profile-toast-message shadow-bounce">
          <span className="profile-toast-icon">📂</span>
          <span className="profile-toast-text">{t.toastCreateSuccess}</span>
        </div>
      )}

      {/* Header với khung viền đen Memphis */}
      <div 
        className="intervention-header-zone"
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
        <div className="intervention-title-block">
          <h2 className="intervention-tab-title" style={{ margin: 0, fontWeight: 900, color: '#1E293B', fontSize: '1.4rem' }}>{t.title}</h2>
          <p className="intervention-tab-subtitle" style={{ margin: '6px 0 0 0', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>{t.subtitle}</p>
        </div>
        
        <button 
          type="button" 
          className="intervention-create-btn"
          onClick={handleCreateRecord}
          style={{ margin: 0 }}
        >
          {t.btnCreate}
        </button>
      </div>

      {/* Toolbar Board: Search and Filter */}
      <div className="intervention-toolbar-board">
        <div className="search-box-container">
          <input 
            type="text" 
            placeholder={t.placeholderSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="intervention-search-input"
          />
          {searchTerm && (
            <button className="search-clear-btn" onClick={() => setSearchTerm('')}>✖</button>
          )}
        </div>

        <div className="status-filter-pills">
          <button 
            type="button"
            className={`status-pill-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            {lang === 'vi' ? 'Tất cả hồ sơ' : 'All Records'}
          </button>
          <button 
            type="button"
            className={`status-pill-btn ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            {t.filterActive}
          </button>
          <button 
            type="button"
            className={`status-pill-btn ${statusFilter === 'graduated' ? 'active' : ''}`}
            onClick={() => setStatusFilter('graduated')}
          >
            {t.filterGraduated}
          </button>
        </div>
      </div>

      {/* Main Records Grid */}
      {filteredRecords.length === 0 ? (
        <div className="appointment-empty-state">
          <div className="empty-state-icon">📂</div>
          <h3 className="empty-state-title">{t.emptyStateTitle}</h3>
          <p className="empty-state-sub">{t.emptyStateSub}</p>
        </div>
      ) : (
        <div className="intervention-records-grid">
          {filteredRecords.map((rec) => (
            <div key={rec.id} className={`profile-sticker-card record-card status-${rec.status}`} style={{ height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
              
              {/* Colored top border based on ASD level */}
              <div className={`record-card-top-accent level-accent-${rec.levelColor}`}></div>

              <div className="record-header">
                <span className="record-id-tag">{rec.id}</span>
                <span className={`record-status-badge badge-${rec.status}`}>
                  {rec.status === 'active' ? t.statusActive : t.statusGraduated}
                </span>
              </div>

              <h3 className="record-child-name">👶 {rec.childName}</h3>
              
              {/* General Grid Info */}
              <div className="record-general-info">
                <div>
                  <strong>{t.lblAge}</strong> <span>{rec.age} {lang === 'vi' ? 'tuổi' : 'years old'}</span>
                </div>
                <div>
                  <strong>{t.lblParent}</strong> <span>{rec.parentName}</span>
                </div>
                <div>
                  <strong>{t.lblStartDate}</strong> <span>{rec.startDate}</span>
                </div>
                <div className="span-2">
                  <strong>{t.lblLevel}</strong>
                  <span className={`asd-level-tag color-${rec.levelColor}`}>
                    {rec.level === 'levelLight' && t.levelLight}
                    {rec.level === 'levelMedium' && t.levelMedium}
                    {rec.level === 'levelSevere' && t.levelSevere}
                  </span>
                </div>
              </div>

              {/* Progress Bar Memphis 3D */}
              <div className="record-progress-section">
                <div className="progress-labels">
                  <strong>{t.lblProgress}</strong>
                  <span className="progress-number">{rec.progress}%</span>
                </div>
                <div className="progress-bar-track-memphis">
                  <div 
                    className="progress-bar-fill-memphis animate-fill" 
                    style={{ width: `${rec.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="card-dashed-line"></div>

              {/* Core Objectives List */}
              <div className="record-objectives-section" style={{ flexGrow: 1 }}>
                <h5 className="objectives-title">{t.lblObjectives}</h5>
                <ul className="objectives-bullet-list">
                  {rec.objectives.map((obj, i) => (
                    <li key={i}>🎯 {obj}</li>
                  ))}
                </ul>
              </div>

              {/* Recent Note Box */}
              <div className="record-note-box">
                <h5 className="note-box-title">📝 {t.lblRecentNote}</h5>
                <p className="note-box-content">{rec.recentNote}</p>
              </div>

              {/* Two Column Actions layout for detailed medical record & assessments */}
              <div className="card-actions-layout" style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap', width: '100%' }}>
                <button 
                  type="button" 
                  className="record-action-btn"
                  style={{ flex: 1, margin: 0, padding: '10px 14px', whiteSpace: 'nowrap' }}
                >
                  📊 {t.lblDetailBtn}
                </button>
                <button 
                  type="button" 
                  className="record-action-btn view-assessments-btn"
                  onClick={() => setSelectedRecordForAssessments(rec)}
                  style={{
                    flex: 1,
                    margin: 0,
                    background: '#D1FAE5',
                    border: '2px solid #1E293B',
                    color: '#065F46',
                    boxShadow: '3px 3px 0 #1E293B',
                    fontWeight: 800,
                    borderRadius: '12px',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    transition: 'all 100ms ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  🩺 {t.btnViewAssessments}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default StaffInterventionTab;
