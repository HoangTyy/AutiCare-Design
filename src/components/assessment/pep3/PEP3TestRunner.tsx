import React, { useState } from 'react';
import { pep3ItemsList, type PEP3Item } from './database';

interface PEP3TestRunnerProps {
  lang: 'vi' | 'en';
  childName: string;
  onComplete: (answers: Record<string, number>) => void;
  onBack: () => void;
}

const PEP3TestRunner: React.FC<PEP3TestRunnerProps> = ({ lang, childName, onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // Dùng danh sách câu hỏi y khoa thực tế (172 câu) thay vì mock data cũ
  const questionsList: PEP3Item[] = pep3ItemsList;
  const currentQuestion = questionsList[currentIdx];
  
  // Tính số câu đã trả lời
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questionsList.length) * 100);

  const translations = {
    vi: {
      questionTitle: 'Đánh giá Lâm sàng PEP-3',
      childAssessing: 'Đang đánh giá trẻ:',
      progressText: 'Tiến độ hoàn thành:',
      qText: 'Bài tập',
      btnBack: 'Quay lại câu trước',
      btnExit: 'Thoát bài test',
      btnNext: 'Câu tiếp theo',
      btnComplete: 'Xem kết quả báo cáo 🩺',
      btnAutofill: 'Tự động điền nhanh bài test 🪄',
      materialsLbl: 'Vật liệu cần chuẩn bị',
      adminLbl: 'Cách tiến hành trị liệu',
      adaptLbl: 'Cẩm nang thích ứng tự kỷ',
      scoringGuideLbl: 'Hướng dẫn chấm điểm hành vi lâm sàng:',
      gridTitle: 'Lưới câu hỏi đánh giá lâm sàng (1 - 172)',
      gridSub: 'Click vào ô số bất kỳ để nhảy nhanh tới bài tập đó. Màu sắc thể hiện điểm đã chấm.',
      confirmExit: 'Bạn có chắc chắn muốn thoát? Tiến độ bài test hiện tại sẽ bị hủy.',
      optPass: 'Đạt (P)',
      optPassVal: '2 điểm',
      optEmerging: 'Đang phát triển (E)',
      optEmergingVal: '1 điểm',
      optFail: 'Chưa đạt (F)',
      optFailVal: '0 điểm',
      unansweredWarning: 'Còn một số câu hỏi chưa được chấm điểm. Hệ thống sẽ tự động gán 0 điểm (Chưa đạt) cho các câu hỏi này khi xuất báo cáo. Bạn có muốn tiếp tục?'
    },
    en: {
      questionTitle: 'PEP-3 Clinical Assessment',
      childAssessing: 'Evaluating child:',
      progressText: 'Progress:',
      qText: 'Item',
      btnBack: 'Previous Item',
      btnExit: 'Exit Assessment',
      btnNext: 'Next Item',
      btnComplete: 'View Assessment Report 🩺',
      btnAutofill: 'Auto-fill simulated answers 🪄',
      materialsLbl: 'Materials needed',
      adminLbl: 'Administration instructions',
      adaptLbl: 'Autism adaptation guide',
      scoringGuideLbl: 'Clinical scoring guidelines:',
      gridTitle: 'Clinical Question Navigation Grid (1 - 172)',
      gridSub: 'Click any numbered cell to jump to that item. Cell colors reflect awarded scores.',
      confirmExit: 'Are you sure you want to exit? Current progress will be lost.',
      optPass: 'Passed (P)',
      optPassVal: '2 Points',
      optEmerging: 'Emerging (E)',
      optEmergingVal: '1 Point',
      optFail: 'Failed (F)',
      optFailVal: '0 Point',
      unansweredWarning: 'There are still some unanswered items. The system will automatically award 0 points (Failed) to these items in the final report. Do you want to proceed?'
    }
  };

  const t = translations[lang];

  // Maximum standard raw scores for each subtest reference
  const maxScoresRef: Record<string, number> = {
    CVP: 24, EL: 20, RL: 16, FM: 18, GM: 14, VMI: 9, AE: 10, SR: 10, CMB: 14, CVB: 10, PB: 9, PSC: 12, AB: 14
  };

  // Tính điểm số quy đổi cho 13 tiểu test theo tỷ lệ phần trăm
  const calculateFinalScores = (currentAnswers: Record<number, number>): Record<string, number> => {
    const finalScores: Record<string, number> = {};
    
    // Phân nhóm câu hỏi theo subtestCode
    const subtestQuestions: Record<string, PEP3Item[]> = {};
    questionsList.forEach(item => {
      if (!subtestQuestions[item.subtestCode]) {
        subtestQuestions[item.subtestCode] = [];
      }
      subtestQuestions[item.subtestCode].push(item);
    });
    
    // Tính toán quy đổi
    Object.keys(maxScoresRef).forEach(code => {
      const questions = subtestQuestions[code] || [];
      const maxPossibleRaw = questions.length * 2; // Mỗi câu hỏi tối đa 2 điểm thô
      
      if (maxPossibleRaw === 0) {
        finalScores[code] = 0;
        return;
      }
      
      let accumulatedRaw = 0;
      questions.forEach(q => {
        const ans = currentAnswers[q.id];
        if (ans !== undefined) {
          accumulatedRaw += ans;
        }
      });
      
      // Áp dụng công thức quy đổi tỷ lệ sang thang điểm đồ thị chuẩn
      const scaledScore = Math.round((accumulatedRaw / maxPossibleRaw) * maxScoresRef[code]);
      finalScores[code] = scaledScore;
    });
    
    return finalScores;
  };

  // Chọn câu trả lời cho câu hiện tại
  const handleSelectAnswer = (score: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    // Nếu chưa phải câu cuối cùng, tự động chuyển sang câu tiếp theo
    if (currentIdx < questionsList.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  // Quay lại câu trước
  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Nhảy tới câu kế tiếp theo cách thủ công
  const handleNext = () => {
    if (currentIdx < questionsList.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  // Tự động điền ngẫu nhiên các câu hỏi chưa trả lời để phục vụ demo nhanh
  const handleAutofill = () => {
    const filledAnswers = { ...answers };
    questionsList.forEach(q => {
      if (filledAnswers[q.id] === undefined) {
        // Sinh ngẫu nhiên: 65% Đạt (2đ), 20% Đang phát triển (1đ), 15% Chưa đạt (0đ)
        const rand = Math.random();
        if (rand < 0.65) {
          filledAnswers[q.id] = 2;
        } else if (rand < 0.85) {
          filledAnswers[q.id] = 1;
        } else {
          filledAnswers[q.id] = 0;
        }
      }
    });
    setAnswers(filledAnswers);
    // Nhảy tới câu cuối cùng để chuyên gia tiện bấm hoàn thành
    setCurrentIdx(questionsList.length - 1);
  };

  // Hoàn thành và nộp bài đánh giá
  const handleComplete = () => {
    if (answeredCount < questionsList.length) {
      const confirm = window.confirm(t.unansweredWarning);
      if (!confirm) return;
    }
    
    const finalScores = calculateFinalScores(answers);
    onComplete(finalScores);
  };

  const handleExit = () => {
    if (window.confirm(t.confirmExit)) {
      onBack();
    }
  };

  return (
    <div className="pep3-runner-container">
      {/* 1. Header & Quick Autofill button */}
      <div className="pep3-flow-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>{t.questionTitle}</h1>
          <p>{t.childAssessing} <strong>{childName}</strong></p>
        </div>
        <button 
          type="button" 
          className="pep3-btn btn-primary autofill-candy-btn" 
          style={{ background: '#F59E0B', color: '#FFFFFF', borderColor: '#1E293B', boxShadow: '4px 4px 0px #1E293B' }}
          onClick={handleAutofill}
        >
          {t.btnAutofill}
        </button>
      </div>

      {/* 2. Progress Bar */}
      <div className="pep3-progress-bar-zone">
        <div className="progress-label-row">
          <span>{t.progressText} <strong>{answeredCount} / {questionsList.length}</strong></span>
          <span>{progressPercent}%</span>
        </div>
        <div className="progress-track" style={{ border: '2.5px solid #1E293B', borderRadius: '9999px', overflow: 'hidden', background: '#E2E8F0', height: '18px' }}>
          <div 
            className="progress-fill" 
            style={{ 
              width: `${progressPercent}%`, 
              height: '100%', 
              background: 'var(--assessment-accent, #8B5CF6)', 
              transition: 'width 0.3s var(--ease-bounce)',
              borderRight: progressPercent > 0 ? '2px solid #1E293B' : 'none'
            }} 
          />
        </div>
      </div>

      {/* 3. Question Main Board */}
      <div className="question-runner-card" style={{ border: '3px solid #1E293B', borderRadius: '24px', padding: '2rem', background: '#FFFFFF', boxShadow: '6px 6px 0px #1E293B' }}>
        <div className="question-subtest-label">
          <span className="subtest-badge" style={{ textTransform: 'uppercase' }}>{currentQuestion.subtestCode}</span>
          <span className="subtest-name" style={{ color: 'var(--assessment-text-muted)', fontWeight: '800' }}>
            {currentQuestion.subtestName[lang]}
          </span>
        </div>
        
        <div className="question-main-content" style={{ marginBottom: '1.5rem' }}>
          <span className="question-index" style={{ color: 'var(--assessment-accent, #8B5CF6)', fontWeight: '800', textTransform: 'uppercase' }}>
            {t.qText} {currentIdx + 1}:
          </span>
          <p className="question-text" style={{ fontSize: '1.45rem', fontWeight: '800', margin: '0.5rem 0 1.5rem 0', color: '#1E293B', lineHeight: '1.45' }}>
            {currentQuestion.name[lang]}
          </p>
        </div>

        {/* 3.1. Clinical Details Grid (Materials, Administration, Adaptation) */}
        <div className="clinical-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.2rem' }}>
          {/* materials */}
          <div className="clinical-detail-card materials-sticker" style={{ border: '2px solid #1E293B', borderRadius: '16px', padding: '1rem', background: '#FFFDF5', boxShadow: '3px 3px 0 #1E293B' }}>
            <strong style={{ fontSize: '0.85rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              📦 {t.materialsLbl}
            </strong>
            <p style={{ fontStyle: 'italic', fontSize: '0.82rem', margin: 0, color: '#475569', lineHeight: '1.4' }}>
              {currentQuestion.materials[lang] || 'N/A'}
            </p>
          </div>

          {/* administration */}
          <div className="clinical-detail-card admin-sticker" style={{ border: '2px solid #1E293B', borderRadius: '16px', padding: '1rem', background: '#F0F9FF', boxShadow: '3px 3px 0 #1E293B' }}>
            <strong style={{ fontSize: '0.85rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              🗣️ {t.adminLbl}
            </strong>
            <p style={{ fontSize: '0.82rem', margin: 0, color: '#0369A1', lineHeight: '1.4' }}>
              {currentQuestion.administration[lang]}
            </p>
          </div>

          {/* adaptation */}
          <div className="clinical-detail-card adaptation-sticker" style={{ border: '2px solid #1E293B', borderRadius: '16px', padding: '1rem', background: '#FFF7ED', boxShadow: '3px 3px 0 #1E293B' }}>
            <strong style={{ fontSize: '0.85rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              💡 {t.adaptLbl}
            </strong>
            <p style={{ fontSize: '0.82rem', margin: 0, color: '#C2410C', lineHeight: '1.4' }}>
              {currentQuestion.adaptationGuide[lang] || 'N/A'}
            </p>
          </div>
        </div>

        {/* 3.2. Clinical Scoring Guides */}
        <div className="scoring-guides-wrapper" style={{ border: '2.5px solid #1E293B', borderRadius: '18px', padding: '1.25rem', background: '#F8FAFC', marginBottom: '2.2rem', boxShadow: '3px 3px 0px #1E293B' }}>
          <strong style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: '#475569', letterSpacing: '0.5px', display: 'block', marginBottom: '1rem', borderBottom: '1.5px dashed #CBD5E1', paddingBottom: '0.4rem' }}>
            📋 {t.scoringGuideLbl}
          </strong>
          
          <div className="scoring-options-vertical" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="scoring-guide-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span className="scoring-mini-badge pass" style={{ background: '#D1FAE5', color: '#047857', border: '1.5px solid #1E293B', borderRadius: '8px', padding: '0.15rem 0.5rem', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0, boxShadow: '1.5px 1.5px 0 #1E293B' }}>2đ</span>
              <p style={{ fontSize: '0.82rem', margin: 0, color: '#1E293B', lineHeight: '1.4' }}>
                <strong>{t.optPass}:</strong> {currentQuestion.scoring[lang]["2"]}
              </p>
            </div>
            
            <div className="scoring-guide-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span className="scoring-mini-badge emerging" style={{ background: '#FEF3C7', color: '#B45309', border: '1.5px solid #1E293B', borderRadius: '8px', padding: '0.15rem 0.5rem', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0, boxShadow: '1.5px 1.5px 0 #1E293B' }}>1đ</span>
              <p style={{ fontSize: '0.82rem', margin: 0, color: '#1E293B', lineHeight: '1.4' }}>
                <strong>{t.optEmerging}:</strong> {currentQuestion.scoring[lang]["1"]}
              </p>
            </div>

            <div className="scoring-guide-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span className="scoring-mini-badge fail" style={{ background: '#FEE2E2', color: '#B91C1C', border: '1.5px solid #1E293B', borderRadius: '8px', padding: '0.15rem 0.5rem', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0, boxShadow: '1.5px 1.5px 0 #1E293B' }}>0đ</span>
              <p style={{ fontSize: '0.82rem', margin: 0, color: '#1E293B', lineHeight: '1.4' }}>
                <strong>{t.optFail}:</strong> {currentQuestion.scoring[lang]["0"]}
              </p>
            </div>
          </div>
        </div>

        {/* 3.3. 3 Candy Buttons for Action */}
        <div className="scoring-candy-buttons-grid">
          <button 
            type="button" 
            className={`candy-score-btn score-pass ${answers[currentQuestion.id] === 2 ? 'active' : ''}`}
            onClick={() => handleSelectAnswer(2)}
            style={{ minHeight: '62px' }}
          >
            <span className="candy-icon" style={{ fontSize: '1.35rem' }}>🟢</span>
            <div className="candy-label-group">
              <strong>{t.optPass}</strong>
              <span>{t.optPassVal}</span>
            </div>
          </button>

          <button 
            type="button" 
            className={`candy-score-btn score-emerging ${answers[currentQuestion.id] === 1 ? 'active' : ''}`}
            onClick={() => handleSelectAnswer(1)}
            style={{ minHeight: '62px' }}
          >
            <span className="candy-icon" style={{ fontSize: '1.35rem' }}>🟡</span>
            <div className="candy-label-group">
              <strong>{t.optEmerging}</strong>
              <span>{t.optEmergingVal}</span>
            </div>
          </button>

          <button 
            type="button" 
            className={`candy-score-btn score-fail ${answers[currentQuestion.id] === 0 ? 'active' : ''}`}
            onClick={() => handleSelectAnswer(0)}
            style={{ minHeight: '62px' }}
          >
            <span className="candy-icon" style={{ fontSize: '1.35rem' }}>🔴</span>
            <div className="candy-label-group">
              <strong>{t.optFail}</strong>
              <span>{t.optFailVal}</span>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Question Navigation Grid */}
      <div className="pep3-question-grid-container" style={{ border: '3px solid #1E293B', borderRadius: '24px', padding: '1.75rem 2rem', background: '#FFFFFF', boxShadow: '6px 6px 0px #1E293B', marginTop: '2.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1E293B', margin: '0 0 0.35rem 0', textTransform: 'uppercase' }}>
          🧩 {t.gridTitle}
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.5rem 0', fontWeight: '500' }}>
          {t.gridSub}
        </p>

        <div className="pep3-question-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(42px, 1fr))', gap: '0.55rem' }}>
          {questionsList.map((item, idx) => {
            const score = answers[item.id];
            let cellBg = '#F8FAFC';
            let cellColor = '#64748B';
            let cellBorder = '1.8px solid #CBD5E1';
            let cellShadow = 'none';

            if (score === 2) {
              cellBg = '#D1FAE5';
              cellColor = '#047857';
              cellBorder = '1.8px solid #047857';
              cellShadow = '1.5px 1.5px 0px #1E293B';
            } else if (score === 1) {
              cellBg = '#FEF3C7';
              cellColor = '#B45309';
              cellBorder = '1.8px solid #B45309';
              cellShadow = '1.5px 1.5px 0px #1E293B';
            } else if (score === 0) {
              cellBg = '#FEE2E2';
              cellColor = '#B91C1C';
              cellBorder = '1.8px solid #B91C1C';
              cellShadow = '1.5px 1.5px 0px #1E293B';
            }

            const isCurrent = currentIdx === idx;
            if (isCurrent) {
              cellBorder = '2.5px solid #1E293B';
              cellShadow = '2.5px 2.5px 0px #8B5CF6';
            }

            return (
              <button
                key={item.id}
                type="button"
                className={`grid-cell-btn ${isCurrent ? 'active' : ''}`}
                style={{
                  background: cellBg,
                  color: cellColor,
                  border: cellBorder,
                  borderRadius: '10px',
                  height: '42px',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: cellShadow,
                  transition: 'all 0.15s',
                  transform: isCurrent ? 'scale(1.08)' : 'scale(1)'
                }}
                onClick={() => setCurrentIdx(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Navigation Flow Footer */}
      <div className="pep3-flow-footer" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="pep3-btn btn-secondary" onClick={handleExit}>
            {t.btnExit}
          </button>
          
          {currentIdx > 0 && (
            <button className="pep3-btn btn-secondary" onClick={handlePrevious}>
              {t.btnBack}
            </button>
          )}

          {currentIdx < questionsList.length - 1 && (
            <button className="pep3-btn btn-secondary" onClick={handleNext}>
              {t.btnNext}
            </button>
          )}
        </div>

        <button 
          className="pep3-btn btn-primary" 
          onClick={handleComplete}
          style={{ background: 'var(--assessment-accent, #8B5CF6)', color: '#FFFFFF', borderColor: '#1E293B', boxShadow: '4px 4px 0px #1E293B' }}
        >
          {t.btnComplete}
        </button>
      </div>
    </div>
  );
};

export default PEP3TestRunner;
