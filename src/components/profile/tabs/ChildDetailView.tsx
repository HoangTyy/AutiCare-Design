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
      CMB: { scored: 9, max: 15, labelVi: "Hành vi vận động (CMB)", labelEn: "Characteristic Motor Behaviors", descVi: "Sử dụng đồ chơi đúng cách, không có hành vi rập khuôn vận động thô.", descEn: "Appropriate toy usage, absence of gross motor stereotypic actions." },
      CVB: { scored: 8, max: 12, labelVi: "Hành vi ngôn ngữ (CVB)", labelEn: "Characteristic Verbal Behaviors", descVi: "Không nói nhại lời, không có giọng điệu kỳ lạ hay lặp lại cụm từ vô nghĩa.", descEn: "Absence of echolalia, weird intonations, or repetitive meaningless phrases." },
      PB: { scored: 10, max: 15, labelVi: "Vấn đề hành vi (PB)", labelEn: "Problem Behaviors", descVi: "Mức độ tự kiểm soát, không cáu gắt ăn vạ khi đổi hoạt động đột ngột.", descEn: "Self-regulation level, absence of tantrums when activities change abruptly." },
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
      BODY: { scored: 2.5, max: 4, labelVi: "Sử dụng cơ thể", labelEn: "Body Use", descVi: "Sự khéo léo của cơ thể, không có hành vi tự kích thích rập khuôn.", descEn: "Body coordination, absence of stereotypic self-stimulatory movements." },
      OBJ: { scored: 2.0, max: 4, labelVi: "Sử dụng đồ vật", labelEn: "Object Use", descVi: "Mức độ hứng thú và cách chơi đồ chơi đúng chức năng thiết kế.", descEn: "Interest level and functional usage of toys as designed." },
      ADAPT: { scored: 3.0, max: 4, labelVi: "Thích ứng với thay đổi", labelEn: "Adaptation to Change", descVi: "Phản ứng khi thay đổi thói quen, hoạt động hoặc đồ dùng quen thuộc.", descEn: "Reaction to changes in routines, activities, or familiar items." }
    }
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
    toastDownload: "✨ Tải xuống kết quả đánh giá thành công! Định dạng file: ",
    toastSave: "✨ Đã lưu kết quả đánh giá mới thành công!",
    toastDelete: "🗑️ Đã xóa kết quả đánh giá thành công!",
    
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
    deleteBody: "Bạn có chắc chắn muốn xóa vĩnh viễn kết quả đánh giá này của trẻ khỏi hệ thống? Hành động này sẽ không thể khôi phục lại dữ liệu.",
    confirmDeleteBtn: "Đồng ý xóa 🗑️"
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
    toastDownload: "✨ Assessment results downloaded successfully! File format: ",
    toastSave: "✨ Successfully saved new assessment result!",
    toastDelete: "🗑️ Successfully deleted assessment record!",

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
    deleteBody: "Are you sure you want to permanently delete this child assessment record from the system? This action is highly destructive and cannot be undone.",
    confirmDeleteBtn: "Confirm Delete 🗑️"
  }
};

const SUBTEST_ITEMS_DB: Record<string, Array<{ id: string; activityVi: string; activityEn: string; score: number; behaviorVi: string; behaviorEn: string }>> = {
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
    { id: "RL-11", activityVi: "Chỉ vào bức tranh mô tả hành động đang ngủ", activityEn: "Point to a picture describing sleeping action", score: 0, behaviorVi: "Bé không phản ứng, lơ đãng nhìn sang hướng cửa sổ.", behaviorEn: "No response, stared out of the window." }
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
    { id: "VMI-3", activityVi: "Bắt chước xây tháp gỗ cao 4 tầng kiên cố", activityEn: "Imitate stacking a 4-level wooden tower", score: 2, behaviorVi: "Bé bắt chước xếp cực kỳ vững chãi và không làm đổ tháp.", behaviorEn: "Imitated stacking flawlessly and tower remained stable." },
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
    { id: "CMB-8", activityVi: "Không có hành vi tự kích thích rập khuôn vỗ tay liên hồi", activityEn: "Absence of gross motor stereotypic hand flapping", score: 1, behaviorVi: "Xuất hiện vỗ tay rập khuôn nhẹ chỉ khi bé quá phấn khích.", behaviorEn: "Mild stereotypic flapping observed only during high arousal." }
  ],
  CVB: [
    { id: "CVB-2", activityVi: "Hội thoại tự nhiên không nhại lời rập khuôn", activityEn: "Converse naturally without rigid echolalic phrases", score: 1, behaviorVi: "Bé thỉnh thoảng nói nhại lại cụm từ cuối của câu hỏi.", behaviorEn: "Child occasionally repeated the last words of questions." },
    { id: "CVB-6", activityVi: "Giọng nói tự nhiên không có âm điệu kỳ lạ trầm bổng", activityEn: "Speak with a natural vocal intonation and pitch", score: 2, behaviorVi: "Bé phát âm với cao độ rất tự nhiên và âm lượng vừa phải.", behaviorEn: "Spoke with very natural pitch and appropriate volume." }
  ],
  PB: [
    { id: "PB-4", activityVi: "Chấp nhận chuyển đổi hoạt động chơi theo hiệu lệnh", activityEn: "Accept transitions between activities upon instruction", score: 1, behaviorVi: "Hơi ăn vạ hờn dỗi 10 giây ban đầu, sau đó hợp tác ngoan.", behaviorEn: "Showed minor tantrum for 10 seconds, then cooperated." },
    { id: "PB-8", activityVi: "Không có hành vi tự hủy hoại hoặc tự gây đau cơ thể", activityEn: "Absence of self-injurious or self-harming behaviors", score: 2, behaviorVi: "Tuyệt đối không tự cắn tay hay đập đầu trong suốt buổi.", behaviorEn: "Absolutely no arm biting or head banging observed." }
  ],
  PSC: [
    { id: "PSC-2", activityVi: "Tự tháo đôi giày quai dán nhãn dán Memphis", activityEn: "Independently take off velcro strap shoes", score: 2, behaviorVi: "Tự xé quai dán và cởi giày cực kỳ nhanh nhẹn.", behaviorEn: "Pulled velcro straps and slipped off shoes independently." },
    { id: "PSC-6", activityVi: "Tự rửa bàn tay dưới vòi nước rửa tay cơ bản", activityEn: "Independently wash hands under running faucet", score: 1, behaviorVi: "Bé rửa sạch tay nhưng làm ướt nhiều vần áo do nghịch nước.", behaviorEn: "Washed hands well but splashed water, wetting clothes." }
  ],
  AB: [
    { id: "AB-3", activityVi: "Chấp nhận ngồi yên can thiệp tại bàn học trong 10 phút", activityEn: "Accept sitting quietly at therapy desk for 10 minutes", score: 2, behaviorVi: "Bé ngồi học ngoan ngoãn, phối hợp tốt với Bác sĩ.", behaviorEn: "Sat cooperatively and interacted well with the clinician." },
    { id: "AB-9", activityVi: "Phản ứng thích ứng bình thường khi nghe tiếng ồn máy sấy", activityEn: "Adapt normally to the loud noise of a hair dryer", score: 1, behaviorVi: "Hơi nhăn mặt bịt tai nhẹ, không xuất hiện hoảng loạn la hét.", behaviorEn: "Frowned and covered ears mildly, no panic or screams." }
  ]
};

const ChildDetailView: React.FC<ChildDetailViewProps> = ({ child, onBack, lang }) => {
  const t = translations[lang];

  // States
  const [assessments, setAssessments] = useState<AssessmentResult[]>(INITIAL_ASSESSMENTS);
  const [toast, setToast] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'progress' | 'assessments' | 'iep' | 'schedule'>('progress');
  const [expandedSubtests, setExpandedSubtests] = useState<Record<string, boolean>>({});
  
  // Modals state
  const [selectedDetails, setSelectedDetails] = useState<AssessmentResult | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form inputs state
  const [formTool, setFormTool] = useState("PEP-3");
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formExaminer, setFormExaminer] = useState("");
  const [formScore, setFormScore] = useState(120);
  const [formMaxScore, setFormMaxScore] = useState(218);
  const [formNotes, setFormNotes] = useState("");

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // 1. Download assessment result as a detailed JSON file
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

  // 2. Save new tool assessment result
  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dynamic generated scores dictionary based on entered tool
    const genericScores: Record<string, { scored: number; max: number; labelVi: string; labelEn: string; descVi: string; descEn: string }> = {};
    if (formTool === "PEP-3") {
      // Build details 100% for PEP-3 dynamically based on input score proportion
      const ratio = formScore / formMaxScore;
      const subtests = [
        { key: "CVP", max: 34, vi: "Nhận thức (CVP)", en: "Cognitive Verbal/Preverbal", dVi: "Giải quyết vấn đề, xếp khối gỗ.", dEn: "Cognitive logic and block building." },
        { key: "EL", max: 26, vi: "Ngôn ngữ diễn đạt (EL)", en: "Expressive Language", dVi: "Nói và diễn đạt từ ngữ.", dEn: "Expressing needs verbally." },
        { key: "RL", max: 19, vi: "Ngôn ngữ tiếp nhận (RL)", en: "Receptive Language", dVi: "Hiểu mệnh lệnh y khoa.", dEn: "Understanding clinician guidelines." },
        { key: "FM", max: 20, vi: "Vận động tinh (FM)", en: "Fine Motor", dVi: "Cầm nắm viết kéo mộc.", dEn: "Holding pen and scissor manipulation." },
        { key: "GM", max: 15, vi: "Vận động thô (GM)", en: "Gross Motor", dVi: "Nhảy thăng bằng cơ lớn.", dEn: "Jumping and balancing motor controls." },
        { key: "VMI", max: 10, vi: "Bắt chước thị giác (VMI)", en: "Visual-Motor Imitation", dVi: "Sao chép nét vẽ mẫu.", dEn: "Copying graphics templates." },
        { key: "AE", max: 11, vi: "Bộc lộ cảm xúc (AE)", en: "Affective Expression", dVi: "Mặt đối mặt chia sẻ cảm xúc.", dEn: "Expressing joy/anger/frustration." },
        { key: "SR", max: 12, vi: "Tương tác xã hội (SR)", en: "Social Reciprocity", dVi: "Hồi đáp giao tiếp mắt.", dEn: "Responding to social reciprocity." },
        { key: "CMB", max: 15, vi: "Hành vi vận động (CMB)", en: "Characteristic Motor Behaviors", dVi: "Sử dụng đồ chơi phù hợp.", dEn: "Stereotypic motor checks." },
        { key: "CVB", max: 12, vi: "Hành vi ngôn ngữ (CVB)", en: "Characteristic Verbal Behaviors", dVi: "Không nhại lời nói lặp.", dEn: "Verbal echolalia controls." },
        { key: "PB", max: 15, vi: "Vấn đề hành vi (PB)", en: "Problem Behaviors", dVi: "Hợp tác chuyển đổi hoạt động.", dEn: "Self-regulation and tantrums." },
        { key: "PSC", max: 10, vi: "Tự phục vụ (PSC)", en: "Personal Self-Care", dVi: "Tự cởi giày rửa tay.", dEn: "Undressing and self-feeding." },
        { key: "AB", max: 15, vi: "Hành vi thích ứng (AB)", en: "Adaptive Behavior", enDesc: "Adaptive living behavior.", dVi: "Thích nghi sinh hoạt thường nhật.", dEn: "General adaptive living skills." }
      ];
      
      let sum = 0;
      subtests.forEach((s, index) => {
        let scoredVal = Math.round(s.max * ratio);
        if (index === subtests.length - 1) {
          // Adjust last to match exactly
          scoredVal = Math.max(0, Math.min(s.max, formScore - sum));
        }
        scoredVal = Math.min(s.max, Math.max(0, scoredVal));
        sum += scoredVal;
        
        genericScores[s.key] = {
          scored: scoredVal,
          max: s.max,
          labelVi: s.vi,
          labelEn: s.en,
          descVi: s.dVi,
          descEn: s.dEn
        };
      });
    } else {
      // CARS or standard screening fallback
      genericScores["GEN"] = {
        scored: formScore,
        max: formMaxScore,
        labelVi: "Chỉ số chung",
        labelEn: "General Index",
        descVi: "Điểm số tích lũy chung toàn bộ bài test.",
        descEn: "Overall accumulated score across testing items."
      };
    }

    const newRecord: AssessmentResult = {
      id: `ASM-${formTool}-${Date.now().toString().slice(-4)}`,
      toolName: formTool,
      date: formDate,
      examiner: formExaminer || (lang === 'vi' ? "Người giám hộ" : "Guardian Specialist"),
      totalScore: `${formScore} / ${formMaxScore}`,
      status: "completed",
      notesVi: formNotes || "Lưu trữ thủ công bởi phụ huynh.",
      notesEn: formNotes || "Manually saved by parent.",
      scores: genericScores
    };

    setAssessments([newRecord, ...assessments]);
    setIsAddModalOpen(false);
    
    // Clear inputs
    setFormExaminer("");
    setFormNotes("");
    setFormScore(120);
    
    triggerToast(t.toastSave);
  };

  // 3. Delete assessment result
  const handleDelete = () => {
    if (!deleteTargetId) return;
    setAssessments(prev => prev.filter(item => item.id !== deleteTargetId));
    setDeleteTargetId(null);
    triggerToast(t.toastDelete);
  };

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
          <div className="sub-tab-navigation">
            <button 
              type="button" 
              className={`sub-tab-btn ${activeSubTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('progress')}
            >
              📈 {lang === 'vi' ? 'Nhật ký Tiến trình' : 'Progress Log'}
            </button>
            <button 
              type="button" 
              className={`sub-tab-btn ${activeSubTab === 'assessments' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('assessments')}
            >
              🩺 {lang === 'vi' ? 'Kết quả Đánh giá' : 'Clinical Assessments'}
            </button>
            <button 
              type="button" 
              className={`sub-tab-btn ${activeSubTab === 'iep' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('iep')}
            >
              📋 {lang === 'vi' ? 'Mục tiêu IEP' : 'Educational Goals'}
            </button>
            <button 
              type="button" 
              className={`sub-tab-btn ${activeSubTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('schedule')}
            >
              📅 {lang === 'vi' ? 'Lịch Trị liệu' : 'Intervention Schedule'}
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
                <div style={{ borderLeft: '3px solid #CBD5E1', paddingLeft: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-9px', top: '2px', width: '15px', height: '15px', borderRadius: '50%', background: '#CBD5E1', border: '3px solid #FFF' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8' }}>2026-05-02</span>
                  <h4 style={{ margin: '0.15rem 0', fontWeight: 900, color: '#1E293B', fontSize: '1.05rem' }}>🧩 {lang === 'vi' ? 'Hoàn thành bảng ghép hình 3 khối thô' : 'Completed 3-Shape Puzzle Board'}</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', fontWeight: 700, lineHeight: '1.5' }}>{lang === 'vi' ? 'Bé tự xếp đúng vị trí khối Tròn, Vuông, Tam giác vào bảng gỗ trong 2 phút.' : 'Correctly sorted Circle, Square, and Triangle blocks into the wooden board in 2 minutes.'}</p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'assessments' && (
            <div className="profile-sticker-card assessments-list-card" style={{ border: '3px solid #1E293B', padding: '1.5rem', background: '#FFF', animation: 'profile-fade-in 0.25s ease-out' }}>
              
              {/* Header section of assessments */}
              <div className="assessments-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 className="section-assessments-title" style={{ margin: 0, fontWeight: 900, fontSize: '1.5rem', color: '#1E293B' }}>{t.assessmentsTitle}</h2>
                  <p className="section-assessments-subtitle" style={{ margin: '0.2rem 0 0 0', color: '#64748B', fontSize: '0.85rem' }}>{t.assessmentsSubtitle}</p>
                </div>
                <button 
                  type="button" 
                  className="profile-page-btn-primary"
                  onClick={() => setIsAddModalOpen(true)}
                  style={{ padding: '8px 16px', background: '#0D9488' }}
                >
                  {t.btnSave}
                </button>
              </div>

              {/* List Display */}
              {assessments.length === 0 ? (
                <div className="assessments-empty-box" style={{ padding: '3rem 1rem', textAlign: 'center', border: '3px dashed #CBD5E1', borderRadius: '16px', background: '#F8FAFC' }}>
                  <span style={{ fontSize: '3rem' }}>🔍</span>
                  <p style={{ color: '#64748B', fontWeight: 700, margin: '1rem 0 0 0' }}>{t.noData}</p>
                </div>
              ) : (
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
                      {/* Tool info cell */}
                      <div className="cell-tool-meta">
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0D9488', letterSpacing: '0.5px' }}>{record.id}</span>
                        <h3 style={{ margin: '0.1rem 0 0 0', fontWeight: 900, color: '#1E293B', fontSize: '1.4rem' }}>{record.toolName}</h3>
                      </div>

                      {/* Date cell */}
                      <div className="cell-date">
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>📅 {t.date}</span>
                        <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.9rem' }}>{record.date}</span>
                      </div>

                      {/* Examiner cell */}
                      <div className="cell-examiner">
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>👩‍⚕️ {t.examiner}</span>
                        <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.9rem' }}>{record.examiner}</span>
                      </div>

                      {/* Score cell */}
                      <div className="cell-score">
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>📊 {t.score}</span>
                        <span style={{ fontWeight: 900, color: '#0D9488', fontSize: '1.1rem' }}>{record.totalScore}</span>
                      </div>

                      {/* Actions cell */}
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
                          onClick={() => setDeleteTargetId(record.id)}
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
                <div style={{ border: '2.5px solid #1E293B', borderRadius: '16px', padding: '1.2rem', background: '#FFFDF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '4px 4px 0 #1E293B' }}>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 900, color: '#1E293B', fontSize: '1.05rem' }}>2. {lang === 'vi' ? 'Cầm bút bằng 3 ngón tay viết nét gạch' : 'Pincer Grasp holding pencil to scribble'}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>{lang === 'vi' ? 'Lĩnh vực: Vận động tinh' : 'Domain: Fine Motor'}</span>
                  </div>
                  <span style={{ background: '#D1FAE5', color: '#059669', padding: '4px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800, border: '1.5px solid #059669' }}>
                    ✓ {lang === 'vi' ? 'Đã tốt nghiệp' : 'Completed'}
                  </span>
                </div>
                <div style={{ border: '2.5px solid #1E293B', borderRadius: '16px', padding: '1.2rem', background: '#FFFDF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '4px 4px 0 #1E293B' }}>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 900, color: '#1E293B', fontSize: '1.05rem' }}>3. {lang === 'vi' ? 'Chơi luân phiên hai người (Turn-taking)' : 'Two-person cooperative turn-taking'}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>{lang === 'vi' ? 'Lĩnh vực: Tương tác xã hội' : 'Domain: Social Interaction'}</span>
                  </div>
                  <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '4px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800, border: '1.5px solid #DC2626' }}>
                    ✕ {lang === 'vi' ? 'Cần hỗ trợ sâu' : 'Needs Support'}
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
              <p style={{ color: '#64748B', fontSize: '0.85rem', margin: '0.2rem 0 1.5rem 0' }}>
                {lang === 'vi' ? 'Khung thời gian biểu can thiệp trị liệu lâm sàng cố định tại trung tâm AutiCare' : 'Clinical intervention schedule registered at AutiCare centers'}
              </p>

              <div style={{ border: '3px solid #1E293B', borderRadius: '16px', overflow: 'hidden', background: '#FFF' }}>
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
                    <tr style={{ borderBottom: '1.5px solid #E2E8F0', display: 'table-row' }}>
                      <td style={{ padding: '12px 15px', fontWeight: 800, color: '#1E293B', fontSize: '0.85rem' }}>{lang === 'vi' ? 'Thứ Tư (14:00 - 15:30)' : 'Wed (14:00 - 15:30)'}</td>
                      <td style={{ padding: '12px 15px', fontWeight: 700, color: '#0D9488', fontSize: '0.85rem' }}>💬 {lang === 'vi' ? 'Trị liệu Ngôn ngữ / Lời nói' : 'Speech & Language'}</td>
                      <td style={{ padding: '12px 15px', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>TS. BS. Nguyễn Minh Anh</td>
                    </tr>
                    <tr style={{ display: 'table-row' }}>
                      <td style={{ padding: '12px 15px', fontWeight: 800, color: '#1E293B', fontSize: '0.85rem' }}>{lang === 'vi' ? 'Thứ Sáu (09:00 - 10:30)' : 'Fri (09:00 - 10:30)'}</td>
                      <td style={{ padding: '12px 15px', fontWeight: 700, color: '#0D9488', fontSize: '0.85rem' }}>🧸 {lang === 'vi' ? 'Hòa nhập & Tương tác xã hội' : 'Social Reciprocity'}</td>
                      <td style={{ padding: '12px 15px', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>ThS. Nguyễn Thị Mai</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ── MODAL 1: VIEW DETAILS PEP-3 100% CLINICAL DATA ── */}
      {selectedDetails && (
        <div className="profile-modal-overlay" onClick={() => setSelectedDetails(null)}>
          <div className="profile-admin-modal detailed-report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header" style={{ background: '#0D9488', borderBottom: '3px solid #1E293B', padding: '1.25rem 1.5rem' }}>
              <div style={{ color: '#FFF' }}>
                <h3 className="profile-modal-title" style={{ margin: 0, color: '#FFF', fontWeight: 900, fontSize: '1.5rem' }}>{t.detailsTitle} ({selectedDetails.toolName})</h3>
                <span style={{ fontSize: '0.85rem', opacity: 0.95 }}>{t.pep3SubTitle}</span>
              </div>
              <button 
                type="button" 
                className="profile-modal-close-btn" 
                onClick={() => setSelectedDetails(null)}
                style={{ color: '#FFF' }}
              >
                ×
              </button>
            </div>

            <div className="profile-modal-body" style={{ padding: '1.5rem' }}>
              {/* Patient Stub banner */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '16px', border: '2.5px solid #1E293B', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>👶 Trẻ đánh giá / Patient:</span>
                  <span style={{ fontWeight: 800, color: '#1E293B' }}>{child.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>📅 Ngày thực hiện / Date:</span>
                  <span style={{ fontWeight: 800, color: '#1E293B' }}>{selectedDetails.date}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block' }}>👩‍⚕️ Chuyên viên / Examiner:</span>
                  <span style={{ fontWeight: 800, color: '#1E293B' }}>{selectedDetails.examiner}</span>
                </div>
              </div>

              {/* Subtests Clinical Data */}
              <h4 style={{ fontWeight: 900, color: '#1E293B', fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>📊 Phân rã 100% chỉ số tiểu test lâm sàng:</h4>
              
              <div className="pep3-detail-table-wrapper">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', display: 'table' }}>
                  <thead>
                    <tr style={{ background: '#F1F5F9', borderBottom: '3px solid #1E293B', display: 'table-row' }}>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B' }}>{t.subtestCol}</th>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B', width: '100px', textAlign: 'center' }}>{t.scoredCol}</th>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B', width: '100px', textAlign: 'center' }}>{t.maxCol}</th>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B', width: '180px', textAlign: 'center' }}>{t.percentCol}</th>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B' }}>{t.descCol}</th>
                      <th style={{ padding: '12px 15px', fontWeight: 800, fontSize: '0.85rem', color: '#1E293B', width: '135px', textAlign: 'center' }}>{lang === 'vi' ? 'Chi tiết' : 'Details'}</th>
                    </tr>
                  </thead>
                  <tbody style={{ display: 'table-row-group' }}>
                    {Object.entries(selectedDetails.scores).map(([key, value]: [string, any]) => {
                      const percent = Math.round((value.scored / value.max) * 100) || 0;
                      const isExpanded = !!expandedSubtests[key];
                      const itemAnswers = SUBTEST_ITEMS_DB[key] || [];

                      return (
                        <React.Fragment key={key}>
                          <tr 
                            style={{ 
                              borderBottom: isExpanded ? 'none' : '1.5px solid #CBD5E1', 
                              display: 'table-row',
                              background: isExpanded ? '#FFFDF5' : 'transparent',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              setExpandedSubtests(prev => ({
                                ...prev,
                                [key]: !prev[key]
                              }));
                            }}
                            className="pep3-table-main-row"
                          >
                            <td style={{ padding: '12px 15px', fontWeight: 800, color: '#1E293B', fontSize: '0.85rem' }}>
                              {lang === 'vi' ? value.labelVi : value.labelEn}
                            </td>
                            <td style={{ padding: '12px 15px', fontWeight: 900, color: '#10B981', fontSize: '0.95rem', textAlign: 'center' }}>
                              {value.scored}
                            </td>
                            <td style={{ padding: '12px 15px', fontWeight: 800, color: '#64748B', fontSize: '0.85rem', textAlign: 'center' }}>
                              {value.max}
                            </td>
                            <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                <div style={{ width: '100px', height: '14px', border: '2px solid #1E293B', borderRadius: '6px', background: '#F1F5F9', overflow: 'hidden', position: 'relative' }}>
                                  <div style={{ width: `${percent}%`, height: '100%', background: percent > 75 ? '#10B981' : percent > 40 ? '#F59E0B' : '#EF4444', borderRight: percent > 0 ? '2px solid #1E293B' : 'none' }} />
                                </div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#1E293B', width: '36px', textAlign: 'left' }}>{percent}%</span>
                              </div>
                            </td>
                            <td style={{ padding: '12px 15px', color: '#475569', fontSize: '0.8rem', fontWeight: 700, lineHeight: '1.4' }}>
                              {lang === 'vi' ? value.descVi : value.descEn}
                            </td>
                            <td style={{ padding: '12px 15px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                className="candy-btn-action"
                                onClick={() => {
                                  setExpandedSubtests(prev => ({
                                    ...prev,
                                    [key]: !prev[key]
                                  }));
                                }}
                                style={{
                                  padding: '4px 10px',
                                  background: isExpanded ? '#EF4444' : '#0D9488',
                                  border: '2px solid #1E293B',
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  color: '#FFF',
                                  cursor: 'pointer',
                                  boxShadow: '1.5px 1.5px 0 #1E293B'
                                }}
                              >
                                {isExpanded ? (lang === 'vi' ? 'Ẩn ✕' : 'Hide ✕') : (lang === 'vi' ? 'Xem bài tập 🔍' : 'View items 🔍')}
                              </button>
                            </td>
                          </tr>

                          {isExpanded && (
                            <tr style={{ display: 'table-row', background: '#FFFDF5' }}>
                              <td colSpan={6} style={{ padding: '0 1.5rem 1.25rem 1.5rem', borderBottom: '1.5px solid #CBD5E1' }}>
                                <div className="subtest-accordion-panel" style={{ animation: 'profile-fade-in 0.25s ease-out' }}>
                                  <h5 style={{ margin: '0 0 0.75rem 0', fontWeight: 900, fontSize: '0.88rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    📂 {lang === 'vi' ? `Chi tiết câu trả lời lâm sàng (${key})` : `Clinical items detail responses (${key})`}:
                                  </h5>

                                  {itemAnswers.length === 0 ? (
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', fontStyle: 'italic' }}>
                                      {lang === 'vi' ? "Không tìm thấy dữ liệu câu trả lời cho tiểu test này." : "No item responses found for this subtest."}
                                    </p>
                                  ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                      {itemAnswers.map((item) => (
                                        <div 
                                          key={item.id} 
                                          className="subtest-item-sticker-card"
                                          style={{
                                            border: '2px solid #1E293B',
                                            borderRadius: '12px',
                                            background: '#FFF',
                                            padding: '0.85rem 1rem',
                                            boxShadow: '3px 3px 0px #1E293B',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.4rem',
                                            transition: 'transform 0.15s ease'
                                          }}
                                        >
                                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0D9488' }}>{item.id}</span>
                                            
                                            <span 
                                              style={{
                                                padding: '2px 8px',
                                                borderRadius: '8px',
                                                fontSize: '0.75rem',
                                                fontWeight: 900,
                                                border: '1.5px solid #1E293B',
                                                boxShadow: '1.5px 1.5px 0 #1E293B',
                                                background: item.score === 2 ? '#D1FAE5' : item.score === 1 ? '#FEF3C7' : '#FEE2E2',
                                                color: item.score === 2 ? '#065F46' : item.score === 1 ? '#92400E' : '#991B1B'
                                              }}
                                            >
                                              {item.score}đ - {item.score === 2 ? (lang === 'vi' ? 'Thành công' : 'Pass') : item.score === 1 ? (lang === 'vi' ? 'Đang phát triển' : 'Emerging') : (lang === 'vi' ? 'Chưa đạt' : 'Fail')}
                                            </span>
                                          </div>

                                          <h4 style={{ margin: 0, fontWeight: 800, fontSize: '0.88rem', color: '#1E293B' }}>
                                            🎯 {lang === 'vi' ? item.activityVi : item.activityEn}
                                          </h4>

                                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', fontWeight: 700, lineHeight: '1.45', background: '#F8FAFC', padding: '6px 10px', borderRadius: '8px', borderLeft: '3px solid #64748B' }}>
                                            🗣️ <strong style={{ color: '#334155' }}>{lang === 'vi' ? 'Hành vi thực tế: ' : 'Actual Behavior: '}</strong>
                                            {lang === 'vi' ? item.behaviorVi : item.behaviorEn}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
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

              {/* Total Summary and Notes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ background: '#ECFDF5', border: '2.5px solid #10B981', padding: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, color: '#065F46', fontSize: '1.05rem' }}>{t.totalResult}</span>
                  <span style={{ fontWeight: 900, color: '#047857', fontSize: '1.4rem' }}>{selectedDetails.totalScore}</span>
                </div>

                <div style={{ border: '2.5px solid #1E293B', borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ background: '#F1F5F9', borderBottom: '2.5px solid #1E293B', padding: '8px 12px', fontWeight: 900, color: '#1E293B', fontSize: '0.9rem' }}>
                    {t.clinicalAnalysis}
                  </div>
                  <div style={{ padding: '1rem', background: '#FFFDF5', fontSize: '0.88rem', color: '#334155', fontWeight: 700, lineHeight: '1.5' }}>
                    {lang === 'vi' ? selectedDetails.notesVi : selectedDetails.notesEn}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-modal-footer" style={{ borderTop: '2.5px solid #1E293B', background: '#F8FAFC' }}>
              <button 
                type="button" 
                className="profile-page-btn-primary" 
                onClick={() => setSelectedDetails(null)}
                style={{ background: '#1E293B' }}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: SAVE NEW TOOL ASSESSMENT RESULT ── */}
      {isAddModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <div className="profile-modal-header" style={{ borderBottom: '3px solid #1E293B' }}>
              <h3 className="profile-modal-title">{t.addTitle}</h3>
              <button type="button" className="profile-modal-close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleSaveResult}>
              <div className="profile-modal-body" style={{ maxHeight: 'min(500px, calc(80vh - 120px))', overflowY: 'auto' }}>
                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.fieldTool}</label>
                  <select 
                    className="profile-page-input filter-select" 
                    value={formTool} 
                    onChange={(e) => {
                      setFormTool(e.target.value);
                      if (e.target.value === "PEP-3") {
                        setFormMaxScore(218);
                        setFormScore(120);
                      } else {
                        setFormMaxScore(60);
                        setFormScore(30);
                      }
                    }}
                    style={{ background: '#F8FAFC' }}
                  >
                    <option value="PEP-3">PEP-3 (Clinical Profile)</option>
                    <option value="CARS">CARS (Childhood Autism Rating Scale)</option>
                  </select>
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.fieldDate}</label>
                  <input 
                    type="date" 
                    className="profile-page-input"
                    value={formDate} 
                    onChange={(e) => setFormDate(e.target.value)} 
                    required 
                  />
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.fieldExaminer}</label>
                  <input 
                    type="text" 
                    className="profile-page-input"
                    value={formExaminer} 
                    onChange={(e) => setFormExaminer(e.target.value)}
                    required
                    placeholder={lang === 'vi' ? "Ví dụ: TS. BS. Nguyễn Minh Anh..." : "e.g. Dr. Nguyen Minh Anh..."}
                    spellCheck="false"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="profile-page-form-group">
                    <label className="profile-page-field-label">{t.fieldScore}</label>
                    <input 
                      type="number" 
                      className="profile-page-input"
                      value={formScore}
                      min={0}
                      max={formMaxScore}
                      onChange={(e) => setFormScore(parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="profile-page-form-group">
                    <label className="profile-page-field-label">{t.fieldMaxScore}</label>
                    <input 
                      type="number" 
                      className="profile-page-input"
                      value={formMaxScore}
                      disabled
                      style={{ background: '#E2E8F0', cursor: 'not-allowed' }}
                    />
                  </div>
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-field-label">{t.fieldNotes}</label>
                  <textarea 
                    className="profile-page-input"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    rows={4}
                    placeholder={lang === 'vi' ? "Nhập các ghi chú quan sát hành vi, khả năng thích ứng của bé..." : "Enter behavioral observations, adaptation responses of the child..."}
                    style={{ resize: 'none' }}
                  />
                </div>
              </div>

              <div className="profile-modal-footer" style={{ borderTop: '3px solid #1E293B' }}>
                <button type="button" className="profile-page-btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  {t.cancel}
                </button>
                <button type="submit" className="profile-page-btn-primary" style={{ background: '#0D9488' }}>
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 3: CONFIRM DELETE RESULT ── */}
      {deleteTargetId && (
        <div className="profile-modal-overlay" onClick={() => setDeleteTargetId(null)}>
          <div className="profile-admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px', border: '4px solid #EF4444' }}>
            <div className="profile-modal-header" style={{ background: '#FEE2E2', borderBottom: '3px solid #EF4444' }}>
              <h3 className="profile-modal-title" style={{ color: '#EF4444' }}>{t.deleteConfirmTitle}</h3>
              <button type="button" className="profile-modal-close-btn" onClick={() => setDeleteTargetId(null)} style={{ color: '#EF4444' }}>×</button>
            </div>
            <div className="profile-modal-body" style={{ padding: '1.25rem' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {t.deleteBody}
              </p>
            </div>
            <div className="profile-modal-footer">
              <button type="button" className="profile-page-btn-secondary" onClick={() => setDeleteTargetId(null)}>
                {t.cancel}
              </button>
              <button 
                type="button" 
                className="profile-page-btn-primary"
                onClick={handleDelete}
                style={{ background: '#EF4444' }}
              >
                {t.confirmDeleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChildDetailView;
