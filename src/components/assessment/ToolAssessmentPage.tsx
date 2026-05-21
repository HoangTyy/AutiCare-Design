import React, { useState } from 'react';
import './ToolAssessmentPage.css';

type Language = 'vi' | 'en';

interface ToolAssessmentPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onBack: () => void;
}

interface TestTool {
  id: string;
  name: string;
  fullName: { vi: string; en: string };
  description: { vi: string; en: string };
  purpose: { vi: string; en: string };
  ageRange: { vi: string; en: string };
  examiner: { vi: string; en: string };
  duration: { vi: string; en: string };
  status: 'available' | 'coming_soon';
}

interface TestGroup {
  id: string;
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  icon: React.ReactNode;
  tools: TestTool[];
}

interface ToastMessage {
  id: number;
  message: string;
  type: 'teal' | 'orange';
}

const ToolAssessmentPage: React.FC<ToolAssessmentPageProps> = ({ lang, setLang, onBack }) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('group_1');
  const [selectedTool, setSelectedTool] = useState<TestTool | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'teal' | 'orange' = 'teal') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // SVG Icons for the groups
  const icons = {
    diagnostic: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    assessment: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    adaptive: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    motor: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <path d="M4 20s1-3 4-3h8c3 0 4 3 4 3" />
        <path d="M12 8v9" />
        <path d="M8 11h8" />
      </svg>
    )
  };

  // Comprehensive localized database for 10 clinical tools in 4 groups
  const testGroups: TestGroup[] = [
    {
      id: 'group_1',
      title: {
        vi: 'Chẩn đoán Chuyên sâu',
        en: 'In-Depth Diagnostics'
      },
      description: {
        vi: 'Tiêu chuẩn vàng chẩn đoán chính thức từ chuyên gia lâm sàng.',
        en: 'Gold standards for official clinical diagnosis by specialists.'
      },
      icon: icons.diagnostic,
      tools: [
        {
          id: 'tool_ados2',
          name: 'ADOS-2',
          fullName: {
            vi: 'Thang quan sát chẩn đoán tự kỷ',
            en: 'Autism Diagnostic Observation Schedule (Second Edition)'
          },
          description: {
            vi: 'Chuyên viên lâm sàng tương tác trực tiếp với trẻ thông qua các tình huống trò chơi mang tính xã hội được thiết kế chuẩn để bộc lộ các hành vi đặc trưng.',
            en: 'Standardized direct observation where the clinician interacts with the child through tailored play scenarios to elicit key social-communication behaviors.'
          },
          purpose: {
            vi: 'Đánh giá các hành vi tự kỷ trong giao tiếp xã hội, chơi và sử dụng vật liệu mang tính sáng tạo để đưa ra chẩn đoán chính thức.',
            en: 'Evaluate social communication, play, and repetitive behaviors to support a definitive clinical diagnosis of Autism Spectrum Disorder.'
          },
          ageRange: {
            vi: 'Từ 12 tháng tuổi đến người trưởng thành (chia theo 5 Module)',
            en: '12 months to adulthood (structured across 5 modules based on developmental levels)'
          },
          examiner: {
            vi: 'Chuyên gia tâm thần nhi, nhà tâm lý học lâm sàng đã đào tạo chuyên sâu ADOS-2',
            en: 'Child psychiatrists, clinical psychologists certified in ADOS-2 administration'
          },
          duration: {
            vi: '40 - 60 phút',
            en: '40 - 60 minutes'
          },
          status: 'coming_soon'
        },
        {
          id: 'tool_adir',
          name: 'ADI-R',
          fullName: {
            vi: 'Phỏng vấn chẩn đoán tự kỷ (Bản sửa đổi)',
            en: 'Autism Diagnostic Interview-Revised'
          },
          description: {
            vi: 'Bộ câu hỏi phỏng vấn bán cấu trúc cực kỳ chuyên sâu dành riêng cho cha mẹ để thu thập toàn bộ lịch sử phát triển hành vi của trẻ từ nhỏ đến nay.',
            en: 'A highly structured, in-depth parent interview covering the entire early developmental history and current behavioral profile of the child.'
          },
          purpose: {
            vi: 'Khảo sát sâu ba lĩnh vực cốt lõi: Giao tiếp xã hội, Ngôn ngữ và Hành vi lặp lại phục vụ chẩn đoán phân biệt.',
            en: 'Conduct in-depth assessment across three domain areas: Social interaction, Communication, and Restricted/Repetitive patterns.'
          },
          ageRange: {
            vi: 'Trẻ có tuổi phát triển từ 2.0 tuổi trở lên',
            en: 'Children and adults with a mental age of 2.0 years and above'
          },
          examiner: {
            vi: 'Nhà tâm lý học, bác sĩ nhi chuyên khoa phát triển được cấp chứng chỉ ADI-R',
            en: 'Licensed psychologists and developmental clinicians certified in ADI-R coding'
          },
          duration: {
            vi: '90 - 150 phút (2.5 giờ)',
            en: '90 - 150 minutes (2.5 hours)'
          },
          status: 'coming_soon'
        }
      ]
    },
    {
      id: 'group_2',
      title: {
        vi: 'Đánh giá & Sàng lọc Nhanh',
        en: 'Quick Assessment & Screening'
      },
      description: {
        vi: 'Các bộ câu hỏi ngắn giúp cha mẹ và giáo viên phát hiện sớm nguy cơ trẻ tự kỷ.',
        en: 'Short questionnaires helping parents and educators quickly detect early autism risks.'
      },
      icon: icons.assessment,
      tools: [
        {
          id: 'tool_mchat',
          name: 'M-CHAT-R/F',
          fullName: {
            vi: 'Bảng kiểm tự kỷ ở trẻ tập đi có sửa đổi',
            en: 'Modified Checklist for Autism in Toddlers, Revised with Follow-Up'
          },
          description: {
            vi: 'Bảng hỏi gồm 20 câu trắc nghiệm Đúng/Sai dành cho phụ huynh để đánh giá khả năng chú ý chung, phản ứng xã hội và tương tác giao tiếp cơ bản.',
            en: 'A 20-item parent-report screening tool designed to evaluate joint attention, social responsiveness, and early communication milestones.'
          },
          purpose: {
            vi: 'Phát hiện sớm nguy cơ tự kỷ ở trẻ nhỏ trong các đợt khám định kỳ hoặc tại các trường mầm non.',
            en: 'Identify toddlers at risk for ASD during primary pediatric checkups or preschool visits.'
          },
          ageRange: {
            vi: 'Trẻ từ 16 đến 30 tháng tuổi',
            en: 'Toddlers aged 16 to 30 months'
          },
          examiner: {
            vi: 'Cha mẹ, giáo viên mầm non, hoặc bác sĩ nhi khoa tại cộng đồng',
            en: 'Parents, preschool teachers, pediatricians, or community health workers'
          },
          duration: {
            vi: '10 - 20 phút',
            en: '10 - 20 minutes'
          },
          status: 'coming_soon'
        },
        {
          id: 'tool_asq3',
          name: 'ASQ-3',
          fullName: {
            vi: 'Bộ câu hỏi đánh giá phát triển trẻ theo từng độ tuổi',
            en: 'Ages and Stages Questionnaires (Third Edition)'
          },
          description: {
            vi: 'Bộ câu hỏi sàng lọc toàn diện, quét qua 5 lĩnh vực phát triển thiết yếu của trẻ: Giao tiếp, Vận động thô, Vận động tinh, Giải quyết vấn đề, Cá nhân - xã hội.',
            en: 'A comprehensive developmental screening tool covering 5 key domains: Communication, Gross Motor, Fine Motor, Problem Solving, and Personal-Social.'
          },
          purpose: {
            vi: 'Theo dõi sự phát triển tổng quát và phát hiện các dấu hiệu nghi ngờ chậm phát triển hoặc có nguy cơ tự kỷ.',
            en: 'Monitor general child development progress and catch early delays or neurodevelopmental red flags.'
          },
          ageRange: {
            vi: 'Trẻ từ 1 tháng đến 5.5 tuổi (66 tháng)',
            en: 'Infants and children from 1 month to 5.5 years (66 months)'
          },
          examiner: {
            vi: 'Phụ huynh tự thực hiện dưới sự hỗ trợ chuyên môn của giáo viên can thiệp hoặc bác sĩ',
            en: 'Parents or primary caregivers under clinical or educational guidance'
          },
          duration: {
            vi: '10 - 15 phút',
            en: '10 - 15 minutes'
          },
          status: 'coming_soon'
        },
        {
          id: 'tool_cars',
          name: 'CARS',
          fullName: {
            vi: 'Thang đánh giá tự kỷ ở trẻ em',
            en: 'Childhood Autism Rating Scale'
          },
          description: {
            vi: 'Thang đo chấm điểm 15 hạng mục hành vi dựa trên quan sát trực tiếp, giúp bác sĩ phân loại mức độ tự kỷ từ nhẹ, vừa đến nặng.',
            en: 'A 15-item behavioral rating scale based on direct observation, helping clinicians categorize autism severity from mild, moderate to severe.'
          },
          purpose: {
            vi: 'Đo lường mức độ biểu hiện tự kỷ và hỗ trợ chẩn đoán phân biệt với các rối loạn phát triển khác.',
            en: 'Measure the presence and severity of autism symptoms to differentiate from other developmental delays.'
          },
          ageRange: {
            vi: 'Trẻ từ 2 tuổi trở lên',
            en: 'Children aged 2 years and older'
          },
          examiner: {
            vi: 'Chuyên gia y tế, nhà trị liệu âm ngữ, giáo viên can thiệp đặc biệt',
            en: 'Special educators, pediatricians, clinical speech therapists, psychologists'
          },
          duration: {
            vi: '20 - 30 phút',
            en: '20 - 30 minutes'
          },
          status: 'coming_soon'
        }
      ]
    },
    {
      id: 'group_3',
      title: {
        vi: 'Hành vi Thích ứng & Kỹ năng',
        en: 'Adaptive Behavior & Skills'
      },
      description: {
        vi: 'Đánh giá kỹ năng sinh hoạt, khả năng độc lập của trẻ để xây dựng chương trình can thiệp.',
        en: 'Assess daily life skills and independence to build practical intervention programs.'
      },
      icon: icons.adaptive,
      tools: [
        {
          id: 'tool_pep3',
          name: 'PEP-3',
          fullName: {
            vi: 'Biểu đồ hồ sơ giáo dục tâm lý - Phiên bản thứ 3',
            en: 'Psychoeducational Profile (Third Edition)'
          },
          description: {
            vi: 'Hệ thống đánh giá chuyên biệt nhằm vẽ ra bản đồ điểm mạnh, điểm yếu trong hành vi và năng lực học tập của trẻ tự kỷ, phục vụ xây dựng giáo án cá nhân.',
            en: 'A clinical tool that maps developmental strengths and weaknesses in children with autism, providing concrete data to construct Individualized Education Plans (IEPs).'
          },
          purpose: {
            vi: 'Đánh giá mức độ phát triển nhận thức, ngôn ngữ, vận động và các vấn đề hành vi đặc thù để thiết kế lộ trình can thiệp cá nhân hóa chi tiết.',
            en: 'Evaluate cognitive levels, language, motor functions, and atypical behaviors to customize precise behavioral therapy blueprints.'
          },
          ageRange: {
            vi: 'Trẻ từ 2 đến 7.5 tuổi',
            en: 'Children aged 2 to 7.5 years'
          },
          examiner: {
            vi: 'Giáo viên can thiệp sớm, nhà tâm lý giáo dục, chuyên viên đặc biệt',
            en: 'Early interventionists, educational psychologists, special educators'
          },
          duration: {
            vi: '45 - 90 phút',
            en: '45 - 90 minutes'
          },
          status: 'available'
        },
        {
          id: 'tool_vineland3',
          name: 'Vineland-3',
          fullName: {
            vi: 'Thang đo hành vi thích ứng Vineland (Phiên bản 3)',
            en: 'Vineland Adaptive Behavior Scales (Third Edition)'
          },
          description: {
            vi: 'Thang đo chuẩn hóa hàng đầu để đánh giá khả năng độc lập của trẻ trong cuộc sống hàng ngày qua Giao tiếp, Kỹ năng sống thường nhật, Xã hội hóa và Vận động.',
            en: 'The leading clinical standard to assess everyday personal and social independence across Communication, Daily Living Skills, Socialization, and Motor domains.'
          },
          purpose: {
            vi: 'Đánh giá hành vi thích ứng nhằm hỗ trợ chẩn đoán tự kỷ, khuyết tật trí tuệ và lên kế hoạch rèn luyện kỹ năng tự lập.',
            en: 'Measure real-world adaptive skills to assist in diagnosing intellectual disability or autism, and frame transitional life-skills goals.'
          },
          ageRange: {
            vi: 'Từ sơ sinh đến 90 tuổi',
            en: 'Birth to age 90'
          },
          examiner: {
            vi: 'Nhà tâm lý học, chuyên gia tham vấn qua hình thức phỏng vấn cha mẹ hoặc giáo viên',
            en: 'Clinical psychologists, counseling experts via parent/teacher interview questionnaires'
          },
          duration: {
            vi: '30 - 60 phút',
            en: '30 - 60 minutes'
          },
          status: 'coming_soon'
        },
        {
          id: 'tool_ablls',
          name: 'ABLLS-R',
          fullName: {
            vi: 'Hệ thống đánh giá kỹ năng ngôn ngữ và học tập cơ bản (Sửa đổi)',
            en: 'Assessment of Basic Language and Learning Skills - Revised'
          },
          description: {
            vi: 'Bộ tài liệu đồ sộ đánh giá hơn 500 kỹ năng dựa trên phân tích hành vi ứng dụng (ABA), là nền tảng tối ưu để xây dựng chương trình học chuyên sâu cho trẻ.',
            en: 'A massive assessment tool screening over 500 tasks in 25 skill areas based on Applied Behavior Analysis (ABA) to set micro-milestones.'
          },
          purpose: {
            vi: 'Xác định các lỗ hổng kỹ năng ngôn ngữ và học tập để trực tiếp lập kế hoạch dạy học hành vi đặc biệt.',
            en: 'Pinpoint gaps in core communication and academic readiness to directly outline targeted behavioral tutoring protocols.'
          },
          ageRange: {
            vi: 'Trẻ từ 2 đến 12 tuổi',
            en: 'Children aged 2 to 12 years'
          },
          examiner: {
            vi: 'Chuyên viên phân tích hành vi (BCBA), chuyên gia can thiệp đặc biệt',
            en: 'Board Certified Behavior Analysts (BCBAs), certified special education directors'
          },
          duration: {
            vi: 'Nhiều buổi quan sát thực tế (2 - 10 giờ)',
            en: 'Administered over multiple observation sessions (2 to 10 hours cumulative)'
          },
          status: 'coming_soon'
        },
        {
          id: 'tool_vbmapp',
          name: 'VB-MAPP',
          fullName: {
            vi: 'Chương trình đánh giá mốc hành vi ngôn ngữ & thiết lập lộ trình can thiệp',
            en: 'Verbal Behavior Milestones Assessment and Placement Program'
          },
          description: {
            vi: 'Công cụ đánh giá mốc ngôn ngữ dựa trên phân tích Ngôn ngữ Hành vi của Skinner, cực kỳ xuất sắc đối với trẻ chậm nói, giao tiếp kém hoặc tự kỷ.',
            en: 'A milestone-based verbal behavior assessment built on B.F. Skinner\'s analysis of verbal behavior, optimized for children with autism.'
          },
          purpose: {
            vi: 'Đo lường năng lực ngôn ngữ chức năng (yêu cầu, gọi tên, hội thoại...) và rào cản học tập để thiết lập lộ trình can thiệp ngôn ngữ.',
            en: 'Map functional linguistics (mand, tact, intraverbal) and learning barriers to recommend classroom placements and customized speech curriculums.'
          },
          ageRange: {
            vi: 'Trẻ từ 0 đến 48 tháng tuổi (hoặc trẻ lớn hơn có chậm nói)',
            en: 'Children aged 0 to 48 months (or older individuals with severe language delays)'
          },
          examiner: {
            vi: 'Chuyên viên phân tích hành vi, chuyên gia ngôn ngữ, giáo viên can thiệp đặc biệt',
            en: 'Behavior analysts, speech-language pathologists, early intervention therapists'
          },
          duration: {
            vi: '2 - 4 giờ qua nhiều buổi',
            en: '2 - 4 hours split across multiple child engagement blocks'
          },
          status: 'coming_soon'
        }
      ]
    },
    {
      id: 'group_4',
      title: {
        vi: 'Tâm vận động Tổng quát',
        en: 'General Psychomotor & Dev'
      },
      description: {
        vi: 'Khảo sát toàn diện tư duy, ngôn ngữ và năng lực vận động của trẻ nhỏ.',
        en: 'Comprehensive checkups for motor skills, cognitive growth, and general delay.'
      },
      icon: icons.motor,
      tools: [
        {
          id: 'tool_denver2',
          name: 'Denver II',
          fullName: {
            vi: 'Thang sàng lọc phát triển Denver II',
            en: 'Denver Developmental Screening Test II'
          },
          description: {
            vi: 'Công cụ sàng lọc phát triển tâm vận động nhanh hàng đầu, khảo sát kỹ 4 mảng chính: Cá nhân - xã hội, Vận động tinh - thích ứng, Ngôn ngữ, Vận động thô.',
            en: 'The industry-standard quick developmental screener measuring 4 sectors: Personal-Social, Fine Motor-Adaptive, Language, and Gross Motor skills.'
          },
          purpose: {
            vi: 'Phát hiện sớm nguy cơ chậm phát triển tâm vận động ở trẻ nhỏ không triệu chứng để chuyển gửi kịp thời.',
            en: 'Differentiate healthy growth from early developmental delays in asymptomatic children for early clinical referrals.'
          },
          ageRange: {
            vi: 'Trẻ từ sơ sinh đến 6 tuổi',
            en: 'Infants and toddlers from birth to 6 years of age'
          },
          examiner: {
            vi: 'Bác sĩ nhi khoa, y tá điều dưỡng, giáo viên mầm non',
            en: 'Pediatricians, family practitioners, nurse practitioners, preschool educators'
          },
          duration: {
            vi: '15 - 20 phút',
            en: '15 - 20 minutes'
          },
          status: 'coming_soon'
        },
        {
          id: 'tool_bayley3',
          name: 'Bayley-III',
          fullName: {
            vi: 'Thang đo phát triển dành cho trẻ sơ sinh và trẻ nhỏ',
            en: 'Bayley Scales of Infant and Toddler Development (Third Edition)'
          },
          description: {
            vi: 'Công cụ lâm sàng tiêu chuẩn vàng để khảo sát sâu sắc, toàn diện xem trẻ có bị chậm phát triển toàn diện (Global Developmental Delay) hay không.',
            en: 'The premium gold-standard diagnostic tool to comprehensively examine global developmental delays in infants and toddlers.'
          },
          purpose: {
            vi: 'Khảo sát sâu sắc các lĩnh vực nhận thức, ngôn ngữ, vận động, cảm xúc - xã hội và hành vi thích ứng của trẻ.',
            en: 'Assess structural cognitive growth, expressive/receptive language, motor abilities, socio-emotional reactivity, and adaptive skills.'
          },
          ageRange: {
            vi: 'Trẻ từ 1 đến 42 tháng tuổi',
            en: 'Infants and toddlers from 1 to 42 months of age'
          },
          examiner: {
            vi: 'Nhà tâm lý học phát triển, nhà trị liệu vận động, bác sĩ nhi chuyên sâu',
            en: 'Developmental psychologists, pediatric physical therapists, neonatologists'
          },
          duration: {
            vi: '30 - 90 phút',
            en: '30 - 90 minutes'
          },
          status: 'coming_soon'
        }
      ]
    }
  ];

  const selectedGroup = testGroups.find(g => g.id === selectedGroupId) || testGroups[0];

  const translations = {
    vi: {
      navBack: 'Về trang chủ',
      title: 'Đánh giá Công cụ',
      subtitle: 'Chọn công cụ đánh giá phù hợp để đồng hành cùng sự phát triển của trẻ',
      groupsTitle: 'Nhóm công cụ',
      toolsTitle: 'Các bài đánh giá',
      availableBadge: 'Có sẵn trên hệ thống',
      comingSoonBadge: 'Đang nghiên cứu',
      btnLearnMore: 'Xem thông tin chi tiết',
      btnStart: 'Bắt đầu đánh giá',
      modalExaminer: 'Người thực hiện:',
      modalAge: 'Độ tuổi áp dụng:',
      modalDuration: 'Thời gian thực hiện:',
      modalPurpose: 'Mục đích chính:',
      modalStateAvailable: '✨ Công cụ này đã được số hóa hoàn chỉnh trên AutiCare và sẵn sàng liên kết với Hồ sơ Trẻ (Children Profile) của bạn.',
      modalStateComingSoon: '⚡ Công cụ này đang được ban nghiên cứu lâm sàng AutiCare phát triển số hóa. Bạn có thể đăng ký nhận thông báo để được trải nghiệm sớm nhất.',
      btnStartTest: 'Thực hiện đánh giá',
      btnNotify: 'Đăng ký nhận thông báo',
      btnCancel: 'Quay lại',
      toastAvailable: 'Chức năng thực hiện bài đánh giá chi tiết sẽ được mở khóa sau khi trang Hồ sơ Trẻ (Children Profile) hoàn thành! Hiện tại, bạn có thể tùy chỉnh diện mạo trang này bằng Design Lab.',
      toastNotify: '✨ Cảm ơn bạn! Hệ thống đã ghi nhận sự quan tâm của bạn và sẽ gửi email thông báo ngay khi công cụ này được cập nhật.'
    },
    en: {
      navBack: 'Back to Home',
      title: 'Tool Assessment',
      subtitle: 'Select the optimal clinical tool to evaluate and accompany child progress',
      groupsTitle: 'Tool Categories',
      toolsTitle: 'Available Questionnaires',
      availableBadge: 'Available in System',
      comingSoonBadge: 'Under Research',
      btnLearnMore: 'Learn More & Stats',
      btnStart: 'Start Assessment',
      modalExaminer: 'Qualified Examiner:',
      modalAge: 'Ideal Age Range:',
      modalDuration: 'Average Duration:',
      modalPurpose: 'Primary Clinical Goal:',
      modalStateAvailable: '✨ This tool is fully digitized on AutiCare and ready to be linked with your Children Profile.',
      modalStateComingSoon: '⚡ This clinical tool is currently in the digitization pipeline. Subscribe to be notified immediately upon release.',
      btnStartTest: 'Start Assessment',
      btnNotify: 'Notify Me When Ready',
      btnCancel: 'Close Panel',
      toastAvailable: 'Detailed assessment execution will be unlocked after the Children Profile page is fully integrated! For now, you can custom frame the layouts via the Design Lab.',
      toastNotify: '✨ Thank you! We have registered your interest and will send you a personalized email update once this tool is live.'
    }
  };

  const t = translations[lang];

  // Map group id -> index for CSS colour classes
  const groupIndexMap: Record<string, number> = {
    group_1: 1,
    group_2: 2,
    group_3: 3,
    group_4: 4,
  };

  return (
    <div className="assessment-layout-wrapper">
      {/* Floating Decoration Shapes (Playful Geometric) */}
      <div className="assessment-deco assessment-deco-circle-1" />
      <div className="assessment-deco assessment-deco-circle-2" />
      <div className="assessment-deco assessment-deco-triangle" />
      <div className="assessment-deco assessment-deco-square" />
      {/* 1. Page Header */}
      <header className="assessment-header">
        <div className="container">
          <div className="header-left">
            <button className="btn-back" onClick={onBack}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              {t.navBack}
            </button>
            <div className="brand-title">
              <h2>AutiCare Assessment</h2>
              <span>{t.title}</span>
            </div>
          </div>
          <div className="header-right">
            <div className="lang-switch">
              <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')}>VN</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Page Layout (Two Columns) */}
      <main className="assessment-layout">
        {/* Left Column: Category Tabs */}
        <aside className="group-sidebar">
          <span className="sidebar-title">{t.groupsTitle}</span>
          {testGroups.map((group) => (
            <button
              key={group.id}
              className={`group-card group-${groupIndexMap[group.id]} ${selectedGroupId === group.id ? 'active' : ''}`}
              onClick={() => setSelectedGroupId(group.id)}
            >
              <div className="group-icon">{group.icon}</div>
              <div className="group-info">
                <h3>{group.title[lang]}</h3>
                <p>{group.description[lang]}</p>
              </div>
            </button>
          ))}
        </aside>

        {/* Right Column: Tools Grid */}
        <section className="tools-workspace">
          <div className="workspace-header">
            <h1>{selectedGroup.title[lang]}</h1>
            <p>{selectedGroup.description[lang]}</p>
          </div>

          <div className="tools-grid">
            {selectedGroup.tools.map((tool) => (
              <div 
                key={tool.id} 
                className={`tool-card ${tool.status === 'available' ? 'available' : ''}`}
              >
                <div className="badge-container">
                  {tool.status === 'available' ? (
                    <span className="status-badge available">
                      <span className="pulse-dot" />
                      {t.availableBadge}
                    </span>
                  ) : (
                    <span className="status-badge coming-soon">
                      {t.comingSoonBadge}
                    </span>
                  )}
                </div>

                <div className="tool-meta">
                  <h2>{tool.name}</h2>
                  <h4>{tool.fullName[lang]}</h4>
                </div>

                <p className="tool-desc">{tool.description[lang]}</p>

                <div className="card-footer">
                  <div className="tool-age">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span>{tool.ageRange[lang]}</span>
                  </div>
                  <button 
                    className={`btn-card-action ${tool.status === 'available' ? 'btn-start' : ''}`}
                    onClick={() => setSelectedTool(tool)}
                  >
                    {tool.status === 'available' ? t.btnStart : t.btnLearnMore}
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 3. Detail Popup Modal */}
      {selectedTool && (
        <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
          <div
            className={`modal-content-wrapper ${selectedTool.status === 'available' ? 'modal-available' : 'modal-coming-soon'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-bg" />
            <div className="modal-inner-content">
              <div className="modal-top">
                <div className="modal-title-area">
                  <h2>{selectedTool.name}</h2>
                  <h4>{selectedTool.fullName[lang]}</h4>
                </div>
                <button className="btn-close-modal" onClick={() => setSelectedTool(null)}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              {/* Info Grid */}
              <div className="modal-info-grid">
                <div className="info-item">
                  <span className="info-label">{t.modalAge}</span>
                  <span className="info-val">{selectedTool.ageRange[lang]}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t.modalDuration}</span>
                  <span className="info-val">{selectedTool.duration[lang]}</span>
                </div>
                <div className="info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="info-label">{t.modalExaminer}</span>
                  <span className="info-val">{selectedTool.examiner[lang]}</span>
                </div>
              </div>

              {/* Detailed clinical target */}
              <div className="modal-body-section">
                <h3>{t.modalPurpose}</h3>
                <p>{selectedTool.purpose[lang]}</p>
              </div>

              {/* Platform integration banner */}
              {selectedTool.status === 'available' ? (
                <div className="state-banner available">
                  <span className="banner-icon">✨</span>
                  <span>{t.modalStateAvailable}</span>
                </div>
              ) : (
                <div className="state-banner coming-soon">
                  <span className="banner-icon">⚡</span>
                  <span>{t.modalStateComingSoon}</span>
                </div>
              )}

              {/* Actions */}
              <div className="modal-actions">
                <button className="btn-modal btn-secondary" onClick={() => setSelectedTool(null)}>
                  {t.btnCancel}
                </button>

                {selectedTool.status === 'available' ? (
                  <button 
                    className="btn-modal btn-primary"
                    onClick={() => {
                      showToast(t.toastAvailable, 'teal');
                      setSelectedTool(null);
                    }}
                  >
                    {t.btnStartTest}
                  </button>
                ) : (
                  <button 
                    className="btn-modal btn-notify"
                    onClick={() => {
                      showToast(t.toastNotify, 'orange');
                      setSelectedTool(null);
                    }}
                  >
                    {t.btnNotify}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Stack */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`toast ${toast.type === 'orange' ? 'toast-orange' : ''}`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolAssessmentPage;
