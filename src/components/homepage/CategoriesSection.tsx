import React from 'react';
import { TiltButton } from 'react-tilt-button';

interface CategoriesSectionProps {
  id: string;
  lang: 'vi' | 'en';
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ id, lang }) => {
  const content = {
    vi: {
      title: "DANH MỤC TRỊ LIỆU CHUYÊN BIỆT",
      sub: "Các chương trình can thiệp sớm toàn diện được khoa học chứng minh hiệu quả cho sự phát triển của trẻ phổ tự kỷ.",
      btnDetails: "Xem chi tiết bài tập",
      cats: [
        {
          title: "Tích hợp Cảm giác",
          desc: "Giúp trẻ điều hòa cảm quan, kiểm soát sự tăng động và thích nghi tốt hơn với môi trường xung quanh.",
          color: "rgba(0, 132, 255, 0.08)",
          borderColor: "#0084FF",
          icon: (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#0084FF" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="2" fill="#0084FF" />
            </svg>
          ),
          tag: "SENSORY"
        },
        {
          title: "Trị liệu Ngôn ngữ",
          desc: "Gia tăng khả năng diễn đạt tự nhiên, cải thiện phát âm và phát triển kỹ năng giao tiếp xã hội.",
          color: "rgba(42, 193, 118, 0.08)",
          borderColor: "#2AC176",
          icon: (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2AC176" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 7h8M8 11h5" />
            </svg>
          ),
          tag: "SPEECH"
        },
        {
          title: "Hành vi Ứng dụng (ABA)",
          desc: "Định hình các thói quen tích cực, giảm bớt hành vi lặp lại không mong muốn qua hệ thống khích lệ.",
          color: "rgba(255, 107, 107, 0.08)",
          borderColor: "#FF6B6B",
          icon: (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#FF6B6B" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          ),
          tag: "BEHAVIOR"
        },
        {
          title: "Vận động & Phối hợp",
          desc: "Nâng cao sức mạnh cơ bắp, rèn luyện sự khéo léo vật lý và phối hợp giác quan - vận động tinh.",
          color: "rgba(255, 210, 21, 0.08)",
          borderColor: "#FFD215",
          icon: (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#FFD215" strokeWidth="2">
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
              <path d="M9 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
            </svg>
          ),
          tag: "MOTOR SKILLS"
        }
      ]
    },
    en: {
      title: "SPECIALIZED THERAPY CATEGORIES",
      sub: "Comprehensive early intervention programs scientifically proven effective for children on the autism spectrum.",
      btnDetails: "View exercises",
      cats: [
        {
          title: "Sensory Integration",
          desc: "Helping children modulate sensory inputs, manage hyperactivity, and adapt easily to surroundings.",
          color: "rgba(0, 132, 255, 0.08)",
          borderColor: "#0084FF",
          icon: (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#0084FF" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="2" fill="#0084FF" />
            </svg>
          ),
          tag: "SENSORY"
        },
        {
          title: "Speech & Language",
          desc: "Stimulating verbal reflexes, expanding vocabulary, and improving social communication skills.",
          color: "rgba(42, 193, 118, 0.08)",
          borderColor: "#2AC176",
          icon: (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2AC176" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 7h8M8 11h5" />
            </svg>
          ),
          tag: "SPEECH"
        },
        {
          title: "Applied Behavior (ABA)",
          desc: "Shaping positive habits and reducing repetitive behaviors through structured reinforcement.",
          color: "rgba(255, 107, 107, 0.08)",
          borderColor: "#FF6B6B",
          icon: (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#FF6B6B" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          ),
          tag: "BEHAVIOR"
        },
        {
          title: "Motor Skills & Coordination",
          desc: "Enhancing muscular strength, fine-tuning physical coordination, and sensory-motor skills.",
          color: "rgba(255, 210, 21, 0.08)",
          borderColor: "#FFD215",
          icon: (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#FFD215" strokeWidth="2">
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
              <path d="M9 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
            </svg>
          ),
          tag: "MOTOR SKILLS"
        }
      ]
    }
  };

  const t = lang === 'vi' ? content.vi : content.en;

  return (
    <section id={id} className="category snap-section container-section">
      <div className="section-header container">
        <h2 className="section-title-premium">{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
      </div>

      <div className="container bento-grid">
        {t.cats.map((cat, idx) => (
          <div 
            key={idx} 
            className={`bento-card bento-${idx + 1} glass`}
            style={{ 
              '--card-glow': cat.borderColor,
              backgroundColor: cat.color
            } as React.CSSProperties}
          >
            <div className="bento-badge" style={{ backgroundColor: cat.borderColor }}>
              {cat.tag}
            </div>
            
            <div className="bento-icon-box" style={{ boxShadow: `0 8px 24px ${cat.color}` }}>
              {cat.icon}
            </div>
            
            <div className="bento-content">
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>

            <div className="bento-action">
              <TiltButton 
                elevation={5} 
                radius={0} 
                surfaceColor={cat.borderColor} 
                textColor="white"
                padding="0.6rem 1.5rem"
              >
                {t.btnDetails}
              </TiltButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
