import React from 'react';

interface SubtestInfo {
  id: string;
  code: string;
  name: { vi: string; en: string };
  itemsCount: number;
  description: { vi: string; en: string };
  color: string;
}

interface PEP3GuideProps {
  lang: 'vi' | 'en';
  childName: string;
  onStart: () => void;
  onBack: () => void;
  onOpenBrowser: () => void;
}

const PEP3Guide: React.FC<PEP3GuideProps> = ({ lang, childName, onStart, onBack, onOpenBrowser }) => {
  
  // 13 subtests of PEP-3 based on user references and standard guidelines
  const developmentalSubtests: SubtestInfo[] = [
    {
      id: 'subtest_1',
      code: 'CVP',
      name: { vi: 'Nhận thức có lời/trước lời', en: 'Cognitive Verbal/Preverbal' },
      itemsCount: 34,
      description: {
        vi: 'Trí nhớ từ, giải quyết vấn đề, gọi tên, sắp xếp và phối hợp tri giác vận động.',
        en: 'Word memory, problem solving, naming, sorting, and motor-perception coordination.'
      },
      color: '#FDE68A' // Amber nhạt
    },
    {
      id: 'subtest_2',
      code: 'EL',
      name: { vi: 'Ngôn ngữ diễn đạt', en: 'Expressive Language' },
      itemsCount: 25,
      description: {
        vi: 'Đo lường khả năng thể hiện lời nói, phát âm hoặc cử chỉ giao tiếp của trẻ.',
        en: 'Measure child ability to express verbal language, vocalize, or use gestures.'
      },
      color: '#FBCFE8' // Pink nhạt
    },
    {
      id: 'subtest_3',
      code: 'RL',
      name: { vi: 'Tiếp thu ngôn ngữ', en: 'Receptive Language' },
      itemsCount: 19,
      description: {
        vi: 'Đo lường khả năng hiểu ngôn ngữ nói và chỉ dẫn lời nói của người lớn.',
        en: 'Evaluate understanding of spoken words and adult verbal instructions.'
      },
      color: '#C7D2FE' // Violet nhạt
    },
    {
      id: 'subtest_4',
      code: 'FM',
      name: { vi: 'Vận động tinh', en: 'Fine Motor' },
      itemsCount: 20,
      description: {
        vi: 'Đánh giá mức độ phối hợp vận động bàn tay, ngón tay và cơ tay nhỏ.',
        en: 'Assess hand, finger coordination and small muscle movement control.'
      },
      color: '#A7F3D0' // Mint nhạt
    },
    {
      id: 'subtest_5',
      code: 'GM',
      name: { vi: 'Vận động thô', en: 'Gross Motor' },
      itemsCount: 15,
      description: {
        vi: 'Khả năng kiểm soát cơ bắp lớn, thăng bằng, đi, chạy, nhảy và ném.',
        en: 'Assess balance, walking, running, jumping, and large muscle controls.'
      },
      color: '#BAE6FD' // Blue nhạt
    },
    {
      id: 'subtest_6',
      code: 'VMI',
      name: { vi: 'Liên kết tay - mắt', en: 'Visual-Motor Imitation' },
      itemsCount: 10,
      description: {
        vi: 'Khả năng bắt chước phối hợp thị giác và vận động thông qua vẽ, xếp hình.',
        en: 'Imitative visual-motor coordination via drawing and model replication.'
      },
      color: '#FCA5A5' // Red nhạt
    }
  ];

  const maladaptiveSubtests: SubtestInfo[] = [
    {
      id: 'subtest_7',
      code: 'AE',
      name: { vi: 'Diễn đạt cảm xúc', en: 'Affective Expression' },
      itemsCount: 11,
      description: {
        vi: 'Mức độ thể hiện tình cảm thích hợp, nét mặt và tư thế cơ thể.',
        en: 'Degree of appropriate emotional expression, facial and posture feedback.'
      },
      color: '#DDD6FE' // Purple nhạt
    },
    {
      id: 'subtest_8',
      code: 'SR',
      name: { vi: 'Tương tác xã hội', en: 'Social Reciprocity' },
      itemsCount: 12,
      description: {
        vi: 'Khả năng tương tác xã hội, phản ứng qua lại với người khác.',
        en: 'Capacity for appropriate social interaction and reciprocity with others.'
      },
      color: '#FECACA' // Rose nhạt
    },
    {
      id: 'subtest_9',
      code: 'CMB',
      name: { vi: 'Hành vi vận động đặc trưng', en: 'Characteristic Motor Behaviors' },
      itemsCount: 15,
      description: {
        vi: 'Những hành vi xúc giác, chuyển động lặp lại, cảm giác điển hình tự kỷ.',
        en: 'Tactile responses, repetitive motor behaviors, atypical autism sensations.'
      },
      color: '#FED7AA' // Orange nhạt
    },
    {
      id: 'subtest_10',
      code: 'CVB',
      name: { vi: 'Hành vi lời nói đặc trưng', en: 'Characteristic Verbal Behaviors' },
      itemsCount: 11,
      description: {
        vi: 'Khả năng nói thích hợp với sự lặp từ tối thiểu hoặc bập bẹ của trẻ.',
        en: 'Evaluate appropriate vocalizations, echolalia, and speech repetition levels.'
      },
      color: '#CFFAFE' // Cyan nhạt
    }
  ];

  const caregiverSubtests: SubtestInfo[] = [
    {
      id: 'subtest_11',
      code: 'PB',
      name: { vi: 'Các vấn đề về hành vi', en: 'Problem Behaviors' },
      itemsCount: 10,
      description: {
        vi: 'Nhận diện hành vi, ngôn ngữ, quan hệ xã hội bất thường của trẻ.',
        en: 'Identify atypical behavioral, language, and relational patterns.'
      },
      color: '#FCE7F3' // Pink nhạt
    },
    {
      id: 'subtest_12',
      code: 'PSC',
      name: { vi: 'Tính tự lập (Tự chăm sóc)', en: 'Personal Self-Care' },
      itemsCount: 13,
      description: {
        vi: 'Các kỹ năng tự phục vụ cơ bản: ăn uống, ngủ, đi vệ sinh, mặc quần áo, tắm.',
        en: 'Basic self-help skills: eating, sleeping, toileting, dressing, bathing.'
      },
      color: '#E0F2FE' // Blue nhạt
    },
    {
      id: 'subtest_13',
      code: 'AB',
      name: { vi: 'Hành vi thích ứng', en: 'Adaptive Behaviors' },
      itemsCount: 15,
      description: {
        vi: 'Khả năng ứng phó của trẻ với nhiều tình huống đa dạng trong cuộc sống.',
        en: 'Evaluate child coping capacity across diverse everyday living contexts.'
      },
      color: '#D1FAE5' // Mint nhạt
    }
  ];

  const translations = {
    vi: {
      guideTitle: 'Hướng dẫn Đánh giá PEP-3',
      guideSub: 'Cẩm nang chẩn đoán tâm lý giáo dục chi tiết cho trẻ:',
      devTitle: 'I. Phần các tiểu test về Phát triển',
      malTitle: 'II. Phần các tiểu test về Hành vi kém thích ứng',
      careTitle: 'III. Phần đánh giá của Người chăm sóc',
      scoringTitle: 'Cơ chế chấm điểm PEP-3 chuẩn lâm sàng',
      scorePass: 'Đạt (Passed - P - 2 điểm)',
      scorePassDesc: 'Trẻ tự thực hiện kỹ năng trọn vẹn, không cần trợ giúp.',
      scoreEmerging: 'Đang phát triển (Emerging - E - 1 điểm)',
      scoreEmergingDesc: 'Trẻ làm được một phần, cần gợi ý hoặc làm nháp thử.',
      scoreFail: 'Không đạt (Failed - F - 0 điểm)',
      scoreFailDesc: 'Trẻ hoàn toàn không thể thực hiện kỹ năng hoặc từ chối.',
      itemsText: 'bài',
      btnBack: 'Quay lại',
      btnStart: 'Bắt đầu làm test',
      btnBrowse: '🔍 Duyệt & Tùy biến 172 bài tập'
    },
    en: {
      guideTitle: 'PEP-3 Assessment Guidelines',
      guideSub: 'Detailed psychoeducational diagnostic guide for child:',
      devTitle: 'I. Developmental Subtests',
      malTitle: 'II. Maladaptive Behavior Subtests',
      careTitle: 'III. Caregiver Assessment Subtests',
      scoringTitle: 'Clinical PEP-3 Scoring Protocol',
      scorePass: 'Passed (P - 2 Points)',
      scorePassDesc: 'Child performs the skill completely and independently.',
      scoreEmerging: 'Emerging (E - 1 Point)',
      scoreEmergingDesc: 'Child performs partially or requires prompts/hints.',
      scoreFail: 'Failed (F - 0 Points)',
      scoreFailDesc: 'Child is completely unable to perform or refuses.',
      itemsText: 'items',
      btnBack: 'Back',
      btnStart: 'Start Test',
      btnBrowse: '🔍 Browse & Adapt 172 Items'
    }
  };

  const t = translations[lang];

  return (
    <div className="pep3-guide-container">
      <div className="pep3-flow-header">
        <h1>{t.guideTitle}</h1>
        <p>{t.guideSub} <strong>{childName}</strong></p>
      </div>

      <div className="pep3-guide-layout">
        {/* Left Column: Scoring & Info */}
        <div className="pep3-guide-info-panel">
          <div className="scoring-card">
            <h3>{t.scoringTitle}</h3>
            <div className="score-row">
              <span className="score-badge pass">P</span>
              <div className="score-desc">
                <strong>{t.scorePass}</strong>
                <p>{t.scorePassDesc}</p>
              </div>
            </div>
            <div className="score-row">
              <span className="score-badge emerging">E</span>
              <div className="score-desc">
                <strong>{t.scoreEmerging}</strong>
                <p>{t.scoreEmergingDesc}</p>
              </div>
            </div>
            <div className="score-row">
              <span className="score-badge fail">F</span>
              <div className="score-desc">
                <strong>{t.scoreFail}</strong>
                <p>{t.scoreFailDesc}</p>
              </div>
            </div>
          </div>
          
          <div className="clinical-notice-card">
            <span className="notice-icon">🩺</span>
            <div className="notice-content">
              <strong>PEP-3 (Psychoeducational Profile 3)</strong>
              <p>
                {lang === 'vi' 
                  ? 'PEP-3 là công cụ tiêu chuẩn vàng toàn cầu dùng để vẽ Hồ sơ phát triển năng lực và hành vi của trẻ tự kỷ hoặc chậm phát triển từ 2 đến 7.5 tuổi, trực tiếp phục vụ lập Kế hoạch Giáo dục Cá nhân (IEP).'
                  : 'PEP-3 is a gold-standard diagnostic tool globally used to map the developmental and behavioral profile of autistic or delayed children aged 2 to 7.5, directly serving Individualized Education Plans (IEPs).'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: 13 Subtests Bento Grid */}
        <div className="pep3-subtests-scroller">
          
          {/* 1. Developmental Section */}
          <div className="subtests-section-block">
            <h3>{t.devTitle}</h3>
            <div className="subtests-bento-grid">
              {developmentalSubtests.map((sub) => (
                <div key={sub.id} className="subtest-bento-card" style={{ '--subtest-bg': sub.color } as React.CSSProperties}>
                  <div className="subtest-card-header">
                    <span className="sub-code">{sub.code}</span>
                    <span className="sub-count">{sub.itemsCount} {t.itemsText}</span>
                  </div>
                  <h4>{sub.name[lang]}</h4>
                  <p>{sub.description[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Maladaptive Section */}
          <div className="subtests-section-block" style={{ marginTop: '2rem' }}>
            <h3>{t.malTitle}</h3>
            <div className="subtests-bento-grid">
              {maladaptiveSubtests.map((sub) => (
                <div key={sub.id} className="subtest-bento-card" style={{ '--subtest-bg': sub.color } as React.CSSProperties}>
                  <div className="subtest-card-header">
                    <span className="sub-code">{sub.code}</span>
                    <span className="sub-count">{sub.itemsCount} {t.itemsText}</span>
                  </div>
                  <h4>{sub.name[lang]}</h4>
                  <p>{sub.description[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Caregiver Section */}
          <div className="subtests-section-block" style={{ marginTop: '2rem' }}>
            <h3>{t.careTitle}</h3>
            <div className="subtests-bento-grid">
              {caregiverSubtests.map((sub) => (
                <div key={sub.id} className="subtest-bento-card" style={{ '--subtest-bg': sub.color } as React.CSSProperties}>
                  <div className="subtest-card-header">
                    <span className="sub-code">{sub.code}</span>
                    <span className="sub-count">{sub.itemsCount} {t.itemsText}</span>
                  </div>
                  <h4>{sub.name[lang]}</h4>
                  <p>{sub.description[lang]}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="pep3-flow-footer">
        <button className="pep3-btn btn-secondary" onClick={onBack}>
          {t.btnBack}
        </button>
        <button className="pep3-btn btn-secondary btn-browse-items" onClick={onOpenBrowser}>
          {t.btnBrowse}
        </button>
        <button className="pep3-btn btn-primary" onClick={onStart}>
          {t.btnStart}
        </button>
      </div>
    </div>
  );
};

export default PEP3Guide;
