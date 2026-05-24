import React, { useState } from 'react';

interface Question {
  id: number;
  subtestCode: string;
  subtestName: { vi: string; en: string };
  text: { vi: string; en: string };
}

interface PEP3TestRunnerProps {
  lang: 'vi' | 'en';
  childName: string;
  onComplete: (answers: Record<string, number>) => void;
  onBack: () => void;
}

const PEP3TestRunner: React.FC<PEP3TestRunnerProps> = ({ lang, childName, onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questionsList: Question[] = [
    {
      id: 1,
      subtestCode: 'CVP',
      subtestName: { vi: 'Tiểu test 1: Nhận thức có lời/trước lời', en: 'Subtest 1: Cognitive Verbal/Preverbal' },
      text: {
        vi: 'Trẻ có khả năng tự giải quyết vấn đề đơn giản như tìm đồ chơi bị giấu dưới một chiếc cốc không?',
        en: 'Does the child solve simple problems, such as finding a toy hidden under a cup?'
      }
    },
    {
      id: 2,
      subtestCode: 'EL',
      subtestName: { vi: 'Tiểu test 2: Ngôn ngữ diễn đạt', en: 'Subtest 2: Expressive Language' },
      text: {
        vi: 'Trẻ có thể tự phát âm gọi tên đúng ít nhất 5 vật dụng quen thuộc (ca, muỗng, bóng...) khi được chỉ vào không?',
        en: 'Does the child spontaneously name at least 5 familiar objects when pointed at?'
      }
    },
    {
      id: 3,
      subtestCode: 'RL',
      subtestName: { vi: 'Tiểu test 3: Tiếp thu ngôn ngữ', en: 'Subtest 3: Receptive Language' },
      text: {
        vi: 'Trẻ có hiểu và thực hiện chính xác chỉ dẫn bằng lời nói đơn giản không? (Ví dụ: "Lại đây với bố" hoặc "Cất quả bóng đi")',
        en: 'Does the child understand and follow simple verbal commands? (e.g., "Come here" or "Put the ball away")'
      }
    },
    {
      id: 4,
      subtestCode: 'FM',
      subtestName: { vi: 'Tiểu test 4: Vận động tinh', en: 'Subtest 4: Fine Motor' },
      text: {
        vi: 'Trẻ có thể cầm bút màu vẽ các nét nguệch ngoạc tự do hoặc bắt chước vẽ các đường thẳng dọc/ngang không?',
        en: 'Does the child grasp a crayon and draw scribbles or copy simple vertical/horizontal lines?'
      }
    },
    {
      id: 5,
      subtestCode: 'GM',
      subtestName: { vi: 'Tiểu test 5: Vận động thô', en: 'Subtest 5: Gross Motor' },
      text: {
        vi: 'Trẻ có thể nhảy bằng cả hai chân tại chỗ hoặc bước qua các chướng ngại vật nhỏ mà không mất thăng bằng không?',
        en: 'Does the child jump in place with both feet or step over small obstacles without losing balance?'
      }
    },
    {
      id: 6,
      subtestCode: 'VMI',
      subtestName: { vi: 'Tiểu test 6: Liên kết tay - mắt', en: 'Subtest 6: Visual-Motor Imitation' },
      text: {
        vi: 'Trẻ có thể bắt chước xếp chồng 3-4 khối gỗ thành hình tháp đứng sau khi quan sát người lớn xếp mẫu không?',
        en: 'Does the child copy stacking 3-4 building blocks into a tower after watching an adult do it?'
      }
    },
    {
      id: 7,
      subtestCode: 'AE',
      subtestName: { vi: 'Tiểu test 7: Diễn đạt cảm xúc', en: 'Subtest 7: Affective Expression' },
      text: {
        vi: 'Trẻ có biểu lộ nét mặt vui mừng/cười khi tương tác giao tiếp dễ thương hoặc khóc/mếu khi không hài lòng một cách thích hợp không?',
        en: 'Does the child show appropriate facial expressions, laughing when happy or showing distress appropriately?'
      }
    },
    {
      id: 8,
      subtestCode: 'SR',
      subtestName: { vi: 'Tiểu test 8: Tương tác xã hội', en: 'Subtest 8: Social Reciprocity' },
      text: {
        vi: 'Trẻ có quay đầu lại phản ứng ngay khi được gọi tên và có thiết lập tương tác bằng mắt (eye contact) với người giao tiếp không?',
        en: 'Does the child turn their head when called by name and maintain eye contact during interaction?'
      }
    },
    {
      id: 9,
      subtestCode: 'CMB',
      subtestName: { vi: 'Tiểu test 9: Hành vi vận động đặc trưng', en: 'Subtest 9: Characteristic Motor Behaviors' },
      text: {
        vi: 'Trẻ có biểu hiện các chuyển động cơ thể bất thường lặp đi lặp lại như vẫy tay, nhón chân hoặc nhại lời liên tục không?',
        en: 'Does the child exhibit repetitive motor behaviors, such as hand-flapping, toe-walking, or echolalia?'
      }
    },
    {
      id: 10,
      subtestCode: 'PSC',
      subtestName: { vi: 'Tiểu test 12: Tính tự lập (Tự chăm sóc)', en: 'Subtest 12: Personal Self-Care' },
      text: {
        vi: 'Trẻ có khả năng tự cầm thìa xúc ăn gọn gàng hoặc biết ra hiệu khi cần đi vệ sinh không?',
        en: 'Does the child feed themselves with a spoon neatly or signal when needing to use the toilet?'
      }
    }
  ];

  const currentQuestion = questionsList[currentIdx];
  const progressPercent = Math.round(((currentIdx) / questionsList.length) * 100);

  const translations = {
    vi: {
      questionTitle: 'Thực hiện Đánh giá PEP-3',
      childAssessing: 'Đang đánh giá trẻ:',
      progressText: 'Tiến độ:',
      qText: 'Câu hỏi',
      btnBack: 'Quay lại câu trước',
      btnExit: 'Thoát bài test',
      btnNext: 'Câu tiếp theo',
      btnComplete: 'Xem kết quả báo cáo',
      optPass: 'Đạt (P)',
      optPassVal: '2 điểm',
      optEmerging: 'Đang phát triển (E)',
      optEmergingVal: '1 điểm',
      optFail: 'Không đạt (F)',
      optFailVal: '0 điểm'
    },
    en: {
      questionTitle: 'Run PEP-3 Assessment',
      childAssessing: 'Evaluating child:',
      progressText: 'Progress:',
      qText: 'Question',
      btnBack: 'Previous Question',
      btnExit: 'Exit Assessment',
      btnNext: 'Next Question',
      btnComplete: 'Show Result Report',
      optPass: 'Passed (P)',
      optPassVal: '2 Points',
      optEmerging: 'Emerging (E)',
      optEmergingVal: '1 Point',
      optFail: 'Failed (F)',
      optFailVal: '0 Point'
    }
  };

  const t = translations[lang];

  const handleSelectAnswer = (score: number) => {
    // Save current answer
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    // If not last question, move to next
    if (currentIdx < questionsList.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Map to subtest results
      // Since it's a simulated 10 questions test, let's map the scores to all 13 subtests dynamically
      // to create a gorgeous multi-domain y-axis reference!
      const finalSubtestScores: Record<string, number> = {
        CVP: newAnswers[1] * 12, // Cognitive Verbal/Preverbal
        EL: newAnswers[2] * 10,  // Expressive Language
        RL: newAnswers[3] * 8,   // Receptive Language
        FM: newAnswers[4] * 9,   // Fine Motor
        GM: newAnswers[5] * 7,   // Gross Motor
        VMI: newAnswers[6] * 4.5, // Visual-Motor Imitation
        AE: newAnswers[7] * 5,   // Affective Expression
        SR: newAnswers[8] * 5.5, // Social Reciprocity
        CMB: (2 - newAnswers[9]) * 7, // CMB (if 0 repetitive -> 2đ -> 14đ, if 2 repetitive -> 0đ -> 0đ)
        CVB: newAnswers[8] * 5,  // CVB
        PB: (2 - newAnswers[9]) * 4.5, // Problem Behaviors
        PSC: newAnswers[10] * 6,  // Personal Self-Care
        AB: (newAnswers[7] + newAnswers[8]) * 3.5 // Adaptive Behaviors
      };
      
      onComplete(finalSubtestScores);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="pep3-runner-container">
      <div className="pep3-flow-header">
        <h1>{t.questionTitle}</h1>
        <p>{t.childAssessing} <strong>{childName}</strong></p>
      </div>

      {/* Progress Bar Area */}
      <div className="pep3-progress-bar-zone">
        <div className="progress-label-row">
          <span>{t.progressText} <strong>{currentIdx + 1} / {questionsList.length}</strong></span>
          <span>{progressPercent}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="question-runner-card">
        <div className="question-subtest-label">
          <span className="subtest-badge">{currentQuestion.subtestCode}</span>
          <span className="subtest-name">{currentQuestion.subtestName[lang]}</span>
        </div>
        
        <div className="question-main-content">
          <span className="question-index">{t.qText} {currentIdx + 1}:</span>
          <p className="question-text">{currentQuestion.text[lang]}</p>
        </div>

        {/* 3 Large Candy Buttons for Scoring */}
        <div className="scoring-candy-buttons-grid">
          <button 
            type="button" 
            className={`candy-score-btn score-pass ${answers[currentQuestion.id] === 2 ? 'active' : ''}`}
            onClick={() => handleSelectAnswer(2)}
          >
            <span className="candy-icon">🟢</span>
            <div className="candy-label-group">
              <strong>{t.optPass}</strong>
              <span>{t.optPassVal}</span>
            </div>
          </button>

          <button 
            type="button" 
            className={`candy-score-btn score-emerging ${answers[currentQuestion.id] === 1 ? 'active' : ''}`}
            onClick={() => handleSelectAnswer(1)}
          >
            <span className="candy-icon">🟡</span>
            <div className="candy-label-group">
              <strong>{t.optEmerging}</strong>
              <span>{t.optEmergingVal}</span>
            </div>
          </button>

          <button 
            type="button" 
            className={`candy-score-btn score-fail ${answers[currentQuestion.id] === 0 ? 'active' : ''}`}
            onClick={() => handleSelectAnswer(0)}
          >
            <span className="candy-icon">🔴</span>
            <div className="candy-label-group">
              <strong>{t.optFail}</strong>
              <span>{t.optFailVal}</span>
            </div>
          </button>
        </div>
      </div>

      <div className="pep3-flow-footer">
        <button className="pep3-btn btn-secondary" onClick={onBack}>
          {t.btnExit}
        </button>

        {currentIdx > 0 && (
          <button className="pep3-btn btn-secondary" onClick={handlePrevious}>
            {t.btnBack}
          </button>
        )}
      </div>
    </div>
  );
};

export default PEP3TestRunner;
