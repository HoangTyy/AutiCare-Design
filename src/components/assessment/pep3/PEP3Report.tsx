import React, { useState } from 'react';

interface PEP3ReportProps {
  lang: 'vi' | 'en';
  childName: string;
  childAge: number;
  scores: Record<string, number>;
  onReset: () => void;
  onSave: () => void;
}

const PEP3Report: React.FC<PEP3ReportProps> = ({ lang, childName, childAge, scores, onReset, onSave }) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Maximum standard raw scores for each subtest reference
  const maxScoresRef: Record<string, number> = {
    CVP: 24, EL: 20, RL: 16, FM: 18, GM: 14, VMI: 9, AE: 10, SR: 10, CMB: 14, CVB: 10, PB: 9, PSC: 12, AB: 14
  };

  const colorsRef: Record<string, string> = {
    CVP: '#FBBF24', // Amber
    EL: '#EC4899',  // Pink
    RL: '#8B5CF6',  // Violet
    FM: '#10B981',  // Emerald
    GM: '#06B6D4',  // Cyan
    VMI: '#EF4444', // Red
    AE: '#A78BFA',  // Purple
    SR: '#F43F5E',  // Rose
    CMB: '#F97316', // Orange
    CVB: '#06B6D4', // Cyan
    PB: '#EC4899',  // Pink
    PSC: '#3B82F6', // Blue
    AB: '#10B981'   // Emerald
  };

  const namesRef: Record<string, { vi: string; en: string }> = {
    CVP: { vi: 'Nhận thức có lời/trước lời', en: 'Cognitive Verbal/Preverbal' },
    EL: { vi: 'Ngôn ngữ diễn đạt', en: 'Expressive Language' },
    RL: { vi: 'Tiếp thu ngôn ngữ', en: 'Receptive Language' },
    FM: { vi: 'Vận động tinh', en: 'Fine Motor' },
    GM: { vi: 'Vận động thô', en: 'Gross Motor' },
    VMI: { vi: 'Liên kết tay - mắt', en: 'Visual-Motor Imitation' },
    AE: { vi: 'Diễn đạt cảm xúc', en: 'Affective Expression' },
    SR: { vi: 'Tương tác xã hội', en: 'Social Reciprocity' },
    CMB: { vi: 'Hành vi vận động đặc trưng', en: 'Characteristic Motor Behaviors' },
    CVB: { vi: 'Hành vi lời nói đặc trưng', en: 'Characteristic Verbal Behaviors' },
    PB: { vi: 'Các vấn đề về hành vi', en: 'Problem Behaviors' },
    PSC: { vi: 'Tính tự lập (Tự chăm sóc)', en: 'Personal Self-Care' },
    AB: { vi: 'Hành vi thích ứng', en: 'Adaptive Behaviors' }
  };

  // Compute overall raw score and mock percentile based on child answers
  // Max aggregate score possible here is 180
  const totalRawScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const rawMaxLimit = Object.values(maxScoresRef).reduce((sum, val) => sum + val, 0);
  const percentile = Math.min(Math.max(Math.round((totalRawScore / rawMaxLimit) * 100), 5), 98);

  // Map to Bảng 1: Percentile ranges
  let severityLevel = '';
  let severityColor = '';
  
  if (percentile > 89) {
    severityLevel = lang === 'vi' ? 'Bình thường' : 'Typical Development';
    severityColor = '#10B981'; // Green
  } else if (percentile >= 75) {
    severityLevel = lang === 'vi' ? 'Thiếu hụt nhẹ' : 'Mild Delay';
    severityColor = '#FBBF24'; // Yellow
  } else if (percentile >= 25) {
    severityLevel = lang === 'vi' ? 'Thiếu hụt trung bình' : 'Moderate Delay';
    severityColor = '#F97316'; // Orange
  } else {
    severityLevel = lang === 'vi' ? 'Thiếu hụt nặng' : 'Severe Delay';
    severityColor = '#EF4444'; // Red
  }

  // Interventions based on delay type
  const recommendations = {
    vi: percentile > 89 
      ? [
          'Trẻ đang phát triển kỹ năng rất tốt và nằm trong mức bình thường so với trẻ cùng trang lứa.',
          'Tiếp tục khuyến khích các trò chơi tương tác xã hội tự nhiên và đọc sách cùng trẻ hàng ngày.',
          'Duy trì chế độ dinh dưỡng và tạo nhiều cơ hội giao tiếp độc lập tại gia đình và nhà trường.'
        ]
      : percentile >= 75
      ? [
          'Trẻ có thiếu hụt nhẹ ở một số lĩnh vực, cần sự hỗ trợ điều hướng nhẹ nhàng.',
          'Tập trung hỗ trợ kỹ năng ngôn ngữ diễn đạt (EL) bằng cách khuyến khích trẻ gọi tên đồ vật xung quanh.',
          'Cho trẻ tham gia các nhóm chơi nhỏ từ 2-3 trẻ để cải thiện khả năng tương tác xã hội (SR).'
        ]
      : percentile >= 25
      ? [
          'Trẻ có mức độ thiếu hụt trung bình rõ rệt, cần xây dựng Kế hoạch Giáo dục Cá nhân (IEP) ngay.',
          'Can thiệp âm ngữ trị liệu chuyên sâu để cải thiện cả Ngôn ngữ tiếp thu (RL) và Diễn đạt (EL).',
          'Rèn luyện tính tự lập hàng ngày (PSC) thông qua các bài tập xúc thìa, mặc quần áo phân bước nhỏ.',
          'Tăng cường các trò chơi liên kết tay - mắt (VMI) như xâu vòng, xếp gỗ khối mầm non.'
        ]
      : [
          'Trẻ bị thiếu hụt nặng, cần thiết lập lộ trình can thiệp đặc biệt toàn diện và tích cực.',
          'Can thiệp phân tích hành vi ứng dụng (ABA) cường độ cao kết hợp trị liệu cảm giác và vận động.',
          'Thực hiện kiểm tra y khoa định kỳ với chuyên gia tâm thần nhi và giáo dục đặc biệt chuyên sâu.',
          'Thiết lập môi trường sống tối giản, an toàn, hỗ trợ trẻ giao tiếp bằng hình ảnh (PECS) nếu ngôn ngữ hạn chế.'
        ],
    en: percentile > 89
      ? [
          'The child is developing skills very well and is within typical developmental limits.',
          'Continue promoting natural social play and reading books together daily.',
          'Maintain balanced developmental stimulation at home and school environments.'
        ]
      : percentile >= 75
      ? [
          'The child shows mild delays in specific areas, needing gentle developmental scaffolds.',
          'Focus on expressive language (EL) by encouraging the child to voice and label items.',
          'Encourage playdates in small groups (2-3 children) to boost social reciprocity (SR).'
        ]
      : percentile >= 25
      ? [
          'The child exhibits moderate delays, recommended to establish an IEP (Individualized Education Plan).',
          'Engage special speech therapy targeting both Receptive (RL) and Expressive (EL) language.',
          'Train basic self-help skills (PSC) by breaking tasks down (e.g., spoon-feeding, buttoning).',
          'Enhance visual-motor coordination (VMI) via threading beads or pegboard replication blocks.'
        ]
      : [
          'The child shows severe delays, requiring intensive specialized intervention pathways immediately.',
          'Engage high-intensity Applied Behavior Analysis (ABA) along with sensory integration therapy.',
          'Regularly consult child psychiatrists, special educators, and speech therapists.',
          'Establish a safe, minimal home space and support communication via pictures (PECS) if verbal skills are limited.'
        ]
  };

  const translations = {
    vi: {
      reportTitle: 'KẾT QUẢ ĐÁH GIÁ PEP-3',
      subText: 'Báo cáo Hồ sơ phát triển Giáo dục Tâm lý chi tiết của trẻ:',
      childNameLbl: 'Họ tên trẻ:',
      childAgeLbl: 'Độ tuổi:',
      testedDateLbl: 'Ngày đánh giá:',
      rawScoreLbl: 'Tổng điểm thô:',
      percentileLbl: 'Bách phân vị:',
      severityLbl: 'Mức độ phát triển:',
      chartTitle: 'Biểu đồ Hồ sơ Phát triển Giáo dục (PEP-3 Profile Chart)',
      chartHint: 'Di chuột vào các cột để xem thông tin chi tiết từng tiểu test',
      tableTitle: 'Bảng 1: Điểm bách phân vị xác định mức độ phát triển/thích ứng',
      tblThCol1: 'Thứ hạng Bách phân vị',
      tblThCol2: 'Mức độ phát triển / thích ứng',
      recomTitle: 'Khuyến nghị can thiệp lâm sàng từ chuyên gia AutiCare',
      btnReset: 'Làm bài test mới',
      btnSave: 'Lưu kết quả vào hồ sơ trẻ',
      btnPrint: 'Tải PDF báo cáo',
      saveSuccess: '✨ Đã lưu kết quả đánh giá PEP-3 vào Hồ sơ của trẻ thành công!',
      valNormal: 'Bình thường',
      valMild: 'Thiếu hụt nhẹ',
      valModerate: 'Thiếu hụt trung bình',
      valSevere: 'Thiếu hụt nặng'
    },
    en: {
      reportTitle: 'PEP-3 ASSESSMENT REPORT',
      subText: 'Detailed Psychoeducational Profile report of child:',
      childNameLbl: 'Child Name:',
      childAgeLbl: 'Child Age:',
      testedDateLbl: 'Tested Date:',
      rawScoreLbl: 'Total Raw Score:',
      percentileLbl: 'Percentile Rank:',
      severityLbl: 'Developmental Status:',
      chartTitle: 'Psychoeducational Profile Chart (PEP-3 Chart)',
      chartHint: 'Hover over bars to view detailed subtest details',
      tableTitle: 'Table 1: Percentile Scores for Determining Developmental Status',
      tblThCol1: 'Percentile Rank',
      tblThCol2: 'Developmental / Adaptive Level',
      recomTitle: 'Intervention Recommendations from AutiCare Clinicians',
      btnReset: 'Start New Assessment',
      btnSave: 'Save Results to Child Profile',
      btnPrint: 'Download PDF Report',
      saveSuccess: '✨ Successfully saved PEP-3 assessment results to the child profile!',
      valNormal: 'Normal',
      valMild: 'Mild Delay',
      valModerate: 'Moderate Delay',
      valSevere: 'Severe Delay'
    }
  };

  const t = translations[lang];

  // Table ranges details
  const tableRows = [
    { rank: '>89', label: t.valNormal, active: percentile > 89 },
    { rank: '75 – 89', label: t.valMild, active: percentile >= 75 && percentile <= 89 },
    { rank: '25 – 74', label: t.valModerate, active: percentile >= 25 && percentile <= 74 },
    { rank: '<25', label: t.valSevere, active: percentile < 25 }
  ];

  const subtestCodes = Object.keys(maxScoresRef);

  return (
    <div className="pep3-report-container">
      <div className="pep3-flow-header">
        <h1>{t.reportTitle}</h1>
        <p>{t.subText} <strong>{childName}</strong></p>
      </div>

      {/* 1. Ticket Memphis Results Board */}
      <div className="pep3-ticket-board">
        <div className="ticket-decor-stamp" style={{ borderColor: severityColor, color: severityColor }}>
          {severityLevel.toUpperCase()}
        </div>
        <div className="ticket-header-band">
          <div className="brand-logo-ticket">AutiCare PEP-3 Ticket</div>
          <div className="ticket-date-tag">24/05/2026</div>
        </div>

        <div className="ticket-body-grid">
          <div className="ticket-field-item">
            <small>{t.childNameLbl}</small>
            <strong>{childName}</strong>
          </div>
          <div className="ticket-field-item">
            <small>{t.childAgeLbl}</small>
            <strong>{childAge} {lang === 'vi' ? 'tuổi' : 'y.o'}</strong>
          </div>
          <div className="ticket-field-item">
            <small>{t.rawScoreLbl}</small>
            <strong>{totalRawScore} / {rawMaxLimit}</strong>
          </div>
          <div className="ticket-field-item">
            <small>{t.percentileLbl}</small>
            <strong style={{ color: severityColor }}>{percentile}%</strong>
          </div>
          <div className="ticket-field-item" style={{ gridColumn: 'span 2' }}>
            <small>{t.severityLbl}</small>
            <strong style={{ color: severityColor, fontSize: '1.25rem' }}>{severityLevel}</strong>
          </div>
        </div>

        <div className="ticket-separating-line" />
        
        {/* Fake barcode */}
        <div className="ticket-barcode-zone">
          <div className="fake-barcode-lines">
            <div className="b-line w-2"></div>
            <div className="b-line w-4"></div>
            <div className="b-line w-1"></div>
            <div className="b-line w-3"></div>
            <div className="b-line w-2"></div>
            <div className="b-line w-1"></div>
            <div className="b-line w-4"></div>
            <div className="b-line w-3"></div>
            <div className="b-line w-1"></div>
            <div className="b-line w-2"></div>
          </div>
          <span className="barcode-number">PEP3-{totalRawScore}-{percentile}</span>
        </div>
      </div>

      {/* 2. SVG Bar Chart: Psychoeducational Profile */}
      <div className="pep3-chart-card">
        <h3>{t.chartTitle}</h3>
        <p className="chart-hint">{t.chartHint}</p>
        
        <div className="svg-chart-container">
          <svg className="pep3-svg-chart" viewBox="0 0 880 320" width="100%">
            {/* Chart Grid Lines */}
            <line x1="50" y1="20" x2="840" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="80" x2="840" y2="80" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="140" x2="840" y2="140" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="200" x2="840" y2="200" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="260" x2="840" y2="260" stroke="#1E293B" strokeWidth="2" /> {/* X Axis */}

            {/* Y Axis Labels */}
            <text x="40" y="25" fill="#64748B" fontSize="10" textAnchor="end">100%</text>
            <text x="40" y="85" fill="#64748B" fontSize="10" textAnchor="end">75%</text>
            <text x="40" y="145" fill="#64748B" fontSize="10" textAnchor="end">50%</text>
            <text x="40" y="205" fill="#64748B" fontSize="10" textAnchor="end">25%</text>
            <text x="40" y="265" fill="#64748B" fontSize="10" textAnchor="end">0%</text>

            {/* Render 13 bars */}
            {subtestCodes.map((code, idx) => {
              const rawVal = scores[code] || 0;
              const maxVal = maxScoresRef[code];
              const pct = (rawVal / maxVal) * 100;
              
              // Calculate SVG rect dimensions
              const chartHeight = 240; // max height in pixels (from y=20 to y=260)
              const barHeight = (pct / 100) * chartHeight;
              const barWidth = 40;
              const xPos = 65 + idx * 58;
              const yPos = 260 - barHeight;

              const isHovered = hoveredBar === code;

              return (
                <g 
                  key={code} 
                  onMouseEnter={() => setHoveredBar(code)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Background placeholder bar */}
                  <rect 
                    x={xPos} 
                    y={20} 
                    width={barWidth} 
                    height={chartHeight} 
                    fill="#F8FAFC" 
                    rx="6" 
                    stroke="#E2E8F0" 
                    strokeWidth="1" 
                  />
                  
                  {/* Actual Score Bar */}
                  <rect 
                    x={xPos} 
                    y={yPos} 
                    width={barWidth} 
                    height={barHeight} 
                    fill={colorsRef[code]} 
                    rx="6" 
                    stroke="#1E293B" 
                    strokeWidth="2" 
                    className={`svg-bar-element ${isHovered ? 'hovered' : ''}`}
                    style={{ transition: 'all 200ms' }}
                  />

                  {/* Code on X Axis */}
                  <text 
                    x={xPos + barWidth/2} 
                    y="280" 
                    fill="#1E293B" 
                    fontWeight="800" 
                    fontSize="11" 
                    textAnchor="middle"
                  >
                    {code}
                  </text>
                  
                  {/* Score tooltip text on top of bar if hovered */}
                  {isHovered && (
                    <text 
                      x={xPos + barWidth/2} 
                      y={yPos - 8} 
                      fill="#1E293B" 
                      fontWeight="900" 
                      fontSize="11" 
                      textAnchor="middle"
                    >
                      {rawVal}/{maxVal}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Tooltip detail box */}
        <div className="chart-detail-display-box">
          {hoveredBar ? (
            <div className="hover-detail-active">
              <span className="detail-badge" style={{ backgroundColor: colorsRef[hoveredBar] }}>
                {hoveredBar}
              </span>
              <div className="detail-text-row">
                <strong>{namesRef[hoveredBar][lang]}</strong>
                <span>
                  {lang === 'vi' ? 'Điểm số:' : 'Raw Score:'} <strong>{scores[hoveredBar]} / {maxScoresRef[hoveredBar]}</strong> 
                  ({Math.round(((scores[hoveredBar] || 0) / maxScoresRef[hoveredBar]) * 100)}%)
                </span>
              </div>
            </div>
          ) : (
            <div className="hover-detail-empty">
              <span>💡 {lang === 'vi' ? 'Rê chuột vào ký hiệu viết tắt để xem tên đầy đủ và điểm số từng tiểu test' : 'Hover over abbreviation codes to view subtest full names and scores'}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Bảng 1: Percentile Table */}
      <div className="pep3-table-card">
        <h3>{t.tableTitle}</h3>
        <table className="pep3-medical-table">
          <thead>
            <tr>
              <th>{t.tblThCol1}</th>
              <th>{t.tblThCol2}</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, idx) => (
              <tr key={idx} className={row.active ? 'active-row' : ''}>
                <td>
                  <strong>{row.rank}</strong>
                </td>
                <td>
                  <span className="row-status-val">{row.label}</span>
                  {row.active && <span className="current-indicator-badge">{lang === 'vi' ? 'Hồ sơ trẻ hiện tại' : 'Current child rank'}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Recommendations Card */}
      <div className="pep3-recommendations-card">
        <h3>🩺 {t.recomTitle}</h3>
        <ul className="recom-list">
          {recommendations[lang].map((recom, idx) => (
            <li key={idx} className="recom-item">
              <span className="recom-bullet">✦</span>
              <p>{recom}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Flow Action Footer */}
      <div className="pep3-flow-footer">
        <button className="pep3-btn btn-secondary" onClick={onReset}>
          {t.btnReset}
        </button>
        <button className="pep3-btn btn-primary" onClick={onSave}>
          {t.btnSave}
        </button>
      </div>
    </div>
  );
};

export default PEP3Report;
