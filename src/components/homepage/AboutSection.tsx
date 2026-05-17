import React from 'react';
import { TiltButton } from 'react-tilt-button';

interface AboutSectionProps {
  id: string;
  lang: 'vi' | 'en';
}

const AboutSection: React.FC<AboutSectionProps> = ({ id, lang }) => {
  const content = {
    vi: {
      title: "SỨ MỆNH & HÀNH TRÌNH",
      sub: "Chúng tôi kiến tạo hệ sinh thái số hóa chuyên nghiệp, thu hẹp khoảng cách giữa phụ huynh, trường học và bác sĩ chẩn đoán, mang lại cơ hội hòa nhập bình đẳng cho trẻ phổ tự kỷ.",
      btnMission: "Tìm hiểu hành trình",
      stats: [
        { value: "50+", label: "Cơ sở Can thiệp sớm", color: "#0084FF" },
        { value: "1,200+", label: "Bác sĩ & Giáo viên chuyên khoa", color: "#2AC176" },
        { value: "6,500+", label: "Trẻ em được sàng lọc", color: "#FF6B6B" },
        { value: "94%", label: "Phụ huynh ghi nhận tiến bộ", color: "#FFD215" },
      ],
      visionText: "Kiến tạo tương lai giáo dục hòa nhập",
      visionDesc: "Chúng tôi tin rằng mỗi trẻ tự kỷ đều có một thế giới nội tâm rực rỡ và tài năng riêng biệt. Thông qua các bài tập phân tích dữ liệu, theo dõi hành vi khoa học, AutiCare đồng hành cùng cha mẹ và chuyên gia để chẩn đoán sớm, can thiệp đúng lúc và phát triển tối đa tiềm năng của trẻ."
    },
    en: {
      title: "OUR MISSION & JOURNEY",
      sub: "We create a professional digital ecosystem that bridges the gap between parents, schools, and clinical specialists, opening equal inclusive opportunities for children on the autism spectrum.",
      btnMission: "Learn our journey",
      stats: [
        { value: "50+", label: "Early Intervention Centers", color: "#0084FF" },
        { value: "1,200+", label: "Clinical Doctors & Teachers", color: "#2AC176" },
        { value: "6,500+", label: "Children Screened & Helped", color: "#FF6B6B" },
        { value: "94%", label: "Parents Reporting Progress", color: "#FFD215" },
      ],
      visionText: "Building an Inclusive Educational Future",
      visionDesc: "We believe every child on the autism spectrum has a vibrant inner world and unique capabilities. Through data-driven behavioral analysis and structured monitoring, AutiCare supports parents and specialists in early screening, timely intervention, and maximizing potential."
    }
  };

  const t = lang === 'vi' ? content.vi : content.en;

  return (
    <section id={id} className="about snap-section container-section">
      <div className="section-header container">
        <h2 className="section-title-premium">{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
      </div>

      <div className="container about-grid">
        {/* Left Side: Stats numbers */}
        <div className="about-stats-panel glass">
          <div className="stats-row-grid">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="stat-card" style={{ '--accent-color': stat.color } as React.CSSProperties}>
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Vision text & CTA */}
        <div className="about-vision-panel glass">
          <h3>{t.visionText}</h3>
          <p>{t.visionDesc}</p>
          
          <div className="about-action">
            <TiltButton 
              elevation={5} 
              radius={16} 
              surfaceColor="var(--primary)" 
              textColor="white"
              padding="0.8rem 2.5rem"
            >
              {t.btnMission}
            </TiltButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
