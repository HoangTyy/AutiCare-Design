import React, { useMemo, useState } from 'react';

type QuizId = 'mchat' | 'cars';

type QuizPageProps = {
  lang: 'vi' | 'en';
  quizId: QuizId | null;
  onBack: () => void;
};

type QuizItem = {
  prompt: string;
  details?: string;
};

const CARS_RATING_OPTIONS = ['1', '1.5', '2', '2.5', '3', '3.5', '4'];

const CARS_OPTION_LABELS: Record<string, { en: string; vi: string }> = {
  '1': { en: 'Age appropriate / normal behavior', vi: 'Phù hợp tuổi / hành vi bình thường' },
  '1.5': { en: 'Slightly unusual but still mild', vi: 'Bất thường nhẹ, vẫn ở mức nhẹ' },
  '2': { en: 'Mildly abnormal behavior or reactions', vi: 'Hành vi hoặc phản ứng bất thường nhẹ' },
  '2.5': { en: 'Some noticeable abnormality or delay', vi: 'Có sự khác thường hoặc chậm trễ rõ rệt' },
  '3': { en: 'Moderately abnormal, clear differences', vi: 'Bất thường vừa, khác biệt rõ ràng' },
  '3.5': { en: 'More severe abnormality and persistence', vi: 'Bất thường nhiều hơn, ít thay đổi' },
  '4': { en: 'Severely abnormal behavior or response', vi: 'Hành vi/phản ứng rất bất thường' }
};

const QUIZ_META: Record<QuizId, { title: string; subtitle: string; description: string; ageRange: string; items: QuizItem[] }> = {
  mchat: {
    title: 'M-CHAT-R/F',
    subtitle: 'Modified Checklist for Autism in Toddlers, Revised with Follow-Up',
    description: 'A 20-item parent-report screening tool to evaluate joint attention, social responsiveness, and early communication milestones for toddlers aged 16 to 30 months.',
    ageRange: '16 to 30 months',
    items: [
      { prompt: 'Does your child enjoy being swung, bounced on your knee, or held in a similar playful way?' },
      { prompt: 'Does your child take an interest in other children?' },
      { prompt: 'Does your child ever seem oversensitive to noise?' },
      { prompt: 'Does your child ever look at you when you call his or her name?' },
      { prompt: 'If you point at a toy across the room, does your child look at it?' },
      { prompt: 'Does your child ever point with one finger to ask for something or to get help?' },
      { prompt: 'Does your child ever point with one finger to indicate interest in something?' },
      { prompt: 'Does your child ever bring you things to show you?' },
      { prompt: 'Does your child ever imitate you?' },
      { prompt: 'Does your child respond when you call his or her name?' },
      { prompt: 'Does your child ever show you things by bringing them to you or holding them up for you to see?' },
      { prompt: 'Does your child ever try to make you watch him or her when something interesting is happening?' },
      { prompt: 'Does your child ever use simple gestures such as nodding, waving, or shaking his or her head?' },
      { prompt: 'Does your child ever play peek-a-boo or hide-and-seek?' },
      { prompt: 'Does your child ever pretend or make-believe?' },
      { prompt: 'Does your child ever show you that he or she wants to go somewhere?' },
      { prompt: 'Does your child ever use words to tell you what he or she wants or needs?' },
      { prompt: 'Does your child ever point to share interest in something with you?' },
      { prompt: 'Does your child ever seem to understand simple instructions?' },
      { prompt: 'Does your child ever seem to have difficulty accepting new routines or changes?' }
    ]
  },
  cars: {
    title: 'CARS',
    subtitle: 'Childhood Autism Rating Scale',
    description: 'A 15-item observational rating scale for children aged 2 years and older, with 1.0–4.0 scores and 0.5 increments to capture subtle behavior differences.',
    ageRange: '2 years and older',
    items: [
      { prompt: 'Relating to People', details: 'Evaluate the child’s ability to interact, seek eye contact, and respond to adults.' },
      { prompt: 'Imitation', details: 'Evaluate how consistently the child imitates sounds, words, and actions.' },
      { prompt: 'Emotional Response', details: 'Evaluate whether the child’s emotional reactions match the situation.' },
      { prompt: 'Body Use', details: 'Evaluate coordination, repetitive movements, posturing, and unusual body use.' },
      { prompt: 'Object Use', details: 'Evaluate interest in toys and objects and whether the use is age appropriate.' },
      { prompt: 'Adaptation to Change', details: 'Evaluate how the child accepts changes in routine or instructions.' },
      { prompt: 'Visual Response', details: 'Evaluate the child’s visual attention, eye contact, and interest in objects or people.' },
      { prompt: 'Listening Response', details: 'Evaluate the child’s reactivity to sounds and ability to attend to auditory cues.' },
      { prompt: 'Taste, Smell, and Touch Response and Use', details: 'Evaluate the child’s response to sensory input and touch, smell, or taste behaviors.' },
      { prompt: 'Fear or Nervousness', details: 'Evaluate whether the child shows appropriate fear or anxiety for the situation.' },
      { prompt: 'Verbal Communication', details: 'Evaluate the quantity and quality of meaningful verbal speech.' },
      { prompt: 'Nonverbal Communication', details: 'Evaluate gestures, eye pointing, and nonverbal signal use.' },
      { prompt: 'Activity Level', details: 'Evaluate whether activity is normal, restless, lethargic, or extreme.' },
      { prompt: 'Level and Consistency of Intellectual Response', details: 'Evaluate intellectual performance for age and consistency across tasks.' },
      { prompt: 'General Impressions', details: 'Evaluate the overall degree of autistic symptoms based on the child’s behavior.' }
    ]
  }
};

const childOptions = [
  { value: 'child-1', label: 'Nguyễn An (4 tuổi)' },
  { value: 'child-2', label: 'Trần Bình (3 tuổi)' },
  { value: 'new-child', label: 'New child / Thêm trẻ mới' }
];

const QuizPage: React.FC<QuizPageProps> = ({ lang, quizId, onBack }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState(childOptions[0].value);

  const activeQuiz = quizId ? QUIZ_META[quizId] : null;

  const result = useMemo(() => {
    if (!activeQuiz) return null;

    if (quizId === 'mchat') {
      const riskCount = activeQuiz.items.reduce((count, _, index) => {
        const answer = selectedAnswers[index] || 'no';
        return count + (answer === 'no' ? 1 : 0);
      }, 0);
      return {
        score: riskCount,
        message:
          riskCount <= 2
            ? (lang === 'vi' ? 'Nguy cơ thấp. Tiếp tục theo dõi giao tiếp và xã hội.' : 'Low risk. Continue monitoring social and communication development.')
            : riskCount <= 7
            ? (lang === 'vi' ? 'Nguy cơ trung bình. Cần đánh giá thêm.' : 'Medium risk. Further evaluation is recommended.')
            : (lang === 'vi' ? 'Nguy cơ cao. Nên gặp chuyên gia lâm sàng sớm.' : 'High risk. Recommend clinical follow-up soon.')
      };
    }

    const total = activeQuiz.items.reduce((sum, _, index) => {
      const value = Number(selectedAnswers[index] || '1');
      return sum + (Number.isNaN(value) ? 1 : value);
    }, 0);

    return {
      score: total,
      message:
        total <= 30
          ? (lang === 'vi' ? 'Không tự kỷ. Tiếp tục quan sát tiến trình phát triển.' : 'Non-autistic. Continue monitoring development.')
          : total <= 36
          ? (lang === 'vi' ? 'Tự kỷ nhẹ đến trung bình. Cần đánh giá thêm, có thể gợi ý Asperger/ HFA nếu 30-33.' : 'Mild-moderate autism. Further evaluation recommended; 30-33 often corresponds to Asperger’s or high-functioning autism.')
          : (lang === 'vi' ? 'Tự kỷ nặng. Khuyến nghị can thiệp lâm sàng chi tiết ngay.' : 'Severe autism. Recommend detailed clinical assessment as soon as possible.')
    };
  }, [activeQuiz, quizId, selectedAnswers, lang]);

  const handleAnswer = (questionIndex: number, value: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setShowResultModal(true);
  };

  const labels = {
    vi: {
      pageTitle: 'Bài đánh giá',
      pageSubtitle: 'Chọn bài kiểm tra phù hợp với lứa tuổi và nhu cầu sàng lọc',
      btnBack: 'Quay lại',
      btnSubmit: 'Hoàn thành đánh giá',
      btnStartOver: 'Làm lại',
      yes: 'Có',
      no: 'Không',
      rate: 'Đánh giá',
      scoreLabel: 'Điểm',
      resultLabel: 'Kết quả',
      selectRating: 'Chọn điểm từ 1.0 đến 4.0 (có thể dùng 1.5/2.5/3.5)',
      selectedValue: 'Điểm đã chọn',
      promptRate: 'Điểm',
      carScaleHint: '1 = phù hợp; 4 = bất thường nghiêm trọng',
      saveResult: 'Lưu kết quả',
      chooseChild: 'Chọn trẻ hiện có hoặc thêm trẻ mới',
      saveToChild: 'Lưu vào',
      confirmSave: 'Xác nhận'
    },
    en: {
      pageTitle: 'Assessment Quiz',
      pageSubtitle: 'Choose the screening tool that fits your child and begin the evaluation.',
      btnBack: 'Back',
      btnSubmit: 'Submit Assessment',
      btnStartOver: 'Start over',
      yes: 'Yes',
      no: 'No',
      rate: 'Rating',
      scoreLabel: 'Score',
      resultLabel: 'Result',
      selectRating: 'Select a score from 1.0 to 4.0 (you may use 1.5/2.5/3.5)',
      selectedValue: 'Selected score',
      promptRate: 'Score',
      carScaleHint: '1 = age-appropriate; 4 = severely abnormal',
      saveResult: 'Save result',
      chooseChild: 'Choose an existing child or add a new child',
      saveToChild: 'Save to',
      confirmSave: 'Confirm'
    }
  }[lang];

  return (
    <div className="quiz-page-root" style={{ minHeight: '100vh', padding: '3rem 1.5rem', background: '#F8FAFC' }}>
      <div className="quiz-page-header" style={{ maxWidth: '1120px', margin: '0 auto 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <button
            type="button"
            onClick={onBack}
            style={{ border: 'none', background: '#E2E8F0', color: '#0F172A', padding: '0.75rem 1.2rem', borderRadius: '999px', cursor: 'pointer' }}
          >
            ← {labels.btnBack}
          </button>
          <h1 style={{ margin: '1rem 0 0.5rem', fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>{labels.pageTitle}</h1>
          <p style={{ margin: 0, color: '#475569', maxWidth: '720px' }}>{labels.pageSubtitle}</p>
        </div>
      </div>

      {!activeQuiz ? (
        <div className="quiz-list" style={{ maxWidth: '1120px', margin: '0 auto', padding: '2rem', background: '#FFFFFF', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
          <h2 style={{ marginTop: 0, color: '#0F172A' }}>{lang === 'vi' ? 'Chưa chọn bài đánh giá' : 'No assessment selected'}</h2>
          <p style={{ color: '#475569', lineHeight: 1.75 }}>{lang === 'vi' ? 'Vui lòng quay lại trang chủ và chọn BẮT ĐẦU ĐÁNH GIÁ để mở modal lựa chọn giữa M-CHAT-R/F và CARS.' : 'Please return to the home page and choose START ASSESSMENT to open the quiz selection modal.'}</p>
          <button
            type="button"
            onClick={onBack}
            style={{ border: 'none', background: '#8B5CF6', color: '#FFFFFF', padding: '0.9rem 1.5rem', borderRadius: '999px', cursor: 'pointer' }}
          >
            {labels.btnBack}
          </button>
        </div>
      ) : (
        <div className="quiz-content" style={{ maxWidth: '1120px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
          <div className="quiz-overview" style={{ display: 'grid', gap: '1rem', background: '#FFFFFF', padding: '2rem', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
              <h2 style={{ margin: 0, color: '#0F172A' }}>{activeQuiz.title}</h2>
              <span style={{ background: '#ECFDF5', color: '#166534', padding: '0.65rem 1rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.95rem' }}>{activeQuiz.ageRange}</span>
            </div>
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.75 }}>{activeQuiz.description}</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            {activeQuiz.items.map((item, index) => {
              const question = item.prompt;
              const detail = item.details;
              const selectedValue = selectedAnswers[index] || (quizId === 'cars' ? '1' : 'no');

              return (
                <div key={index} style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{lang === 'vi' ? `Mục ${index + 1}` : `Item ${index + 1}`}</span>
                    <span style={{ color: '#64748B' }}>{labels.scoreLabel}: {selectedValue}</span>
                  </div>
                  <p style={{ margin: '0.75rem 0 0.5rem', color: '#334155', lineHeight: 1.75, fontWeight: 600 }}>{question}</p>
                  {detail && <p style={{ margin: '0 0 1rem', color: '#475569', lineHeight: 1.7 }}>{detail}</p>}

                  {quizId === 'mchat' ? (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {['yes', 'no'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleAnswer(index, value)}
                          style={{
                            border: selectedAnswers[index] === value ? '2px solid #8B5CF6' : '1px solid #CBD5E1',
                            background: selectedAnswers[index] === value ? '#EDE9FE' : '#FFFFFF',
                            color: '#0F172A',
                            padding: '0.85rem 1.2rem',
                            borderRadius: '999px',
                            cursor: 'pointer'
                          }}
                        >
                          {value === 'yes' ? labels.yes : labels.no}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                      {CARS_RATING_OPTIONS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleAnswer(index, value)}
                          style={{
                            border: selectedAnswers[index] === value ? '2px solid #8B5CF6' : '1px solid #CBD5E1',
                            background: selectedAnswers[index] === value ? '#EDE9FE' : '#FFFFFF',
                            color: '#0F172A',
                            padding: '0.85rem 0.8rem',
                            borderRadius: '14px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            minHeight: '88px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <strong style={{ display: 'block', fontSize: '1rem' }}>{value}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.3 }}>
                            {CARS_OPTION_LABELS[value][lang]}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
              <button
                type="submit"
                style={{ border: 'none', background: '#8B5CF6', color: '#FFFFFF', padding: '1rem 1.5rem', borderRadius: '999px', cursor: 'pointer', fontWeight: 700 }}
              >
                {labels.btnSubmit}
              </button>
            </div>
          </form>
        </div>
      )}

      {showResultModal && result && (
        <div
          className="popup-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setShowResultModal(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(15, 23, 42, 0.18)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, color: '#0F172A' }}>{labels.resultLabel}</h3>
                <p style={{ margin: '0.5rem 0 1rem', color: '#475569' }}>{lang === 'vi' ? 'Kết quả đánh giá của bạn' : 'Your assessment result'}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                style={{ border: 'none', background: 'transparent', color: '#475569', fontSize: '1.5rem', lineHeight: 1, cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '20px', border: '1px solid #C7D2FE' }}>
              <p style={{ margin: '0 0 0.75rem', color: '#1E293B', fontWeight: 700 }}>{labels.scoreLabel}: {result.score}</p>
              <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>{result.message}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                style={{ border: '1px solid #CBD5E1', background: '#F8FAFC', color: '#1F2937', padding: '0.85rem 1.25rem', borderRadius: '999px', cursor: 'pointer' }}
              >
                {lang === 'vi' ? 'Đóng' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSaveModal(true);
                  setShowResultModal(false);
                }}
                style={{ border: 'none', background: '#10B981', color: '#FFFFFF', padding: '0.85rem 1.25rem', borderRadius: '999px', cursor: 'pointer', fontWeight: 700 }}
              >
                {labels.saveResult}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveModal && (
        <div
          className="popup-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setShowSaveModal(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(15, 23, 42, 0.18)'
            }}
          >
            <h3 style={{ margin: 0, color: '#0F172A' }}>{labels.chooseChild}</h3>
            <p style={{ margin: '0.75rem 0 1.5rem', color: '#475569' }}>{labels.saveToChild}</p>
            <label style={{ display: 'block', marginBottom: '1rem', color: '#334155', fontWeight: 600 }}>{labels.chooseChild}</label>
            <select
              value={selectedChild}
              onChange={(event) => setSelectedChild(event.target.value)}
              style={{
                width: '100%',
                padding: '0.95rem 1rem',
                borderRadius: '16px',
                border: '1px solid #CBD5E1',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              {childOptions.map((child) => (
                <option key={child.value} value={child.value}>
                  {child.label}
                </option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                style={{ border: '1px solid #CBD5E1', background: '#F8FAFC', color: '#1F2937', padding: '0.85rem 1.25rem', borderRadius: '999px', cursor: 'pointer' }}
              >
                {lang === 'vi' ? 'Hủy' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSaveModal(false);
                  // In a real app, persist the result to the selected child here.
                }}
                style={{ border: 'none', background: '#8B5CF6', color: '#FFFFFF', padding: '0.85rem 1.25rem', borderRadius: '999px', cursor: 'pointer', fontWeight: 700 }}
              >
                {labels.confirmSave}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
