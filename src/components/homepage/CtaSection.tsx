import React from 'react';
import { TiltButton } from 'react-tilt-button';

interface CtaSectionProps {
  id: string;
  t: any;
}

const CtaSection: React.FC<CtaSectionProps> = ({ id, t }) => {
  return (
    <section id={id} className="cta-banner snap-section container-section">
      <div className="container banner-card glass">
        <div className="banner-glow-effect" />
        
        <div className="banner-content">
          <div className="banner-text">
            <h2 className="bubble-text">{t.ctaTitle}</h2>
            <p>{t.ctaSub}</p>
          </div>
          
          <div className="banner-action">
            <TiltButton 
              elevation={6} 
              radius={24} 
              surfaceColor="white" 
              textColor="var(--secondary)"
              tilt={12}
              padding="1.2rem 3.5rem"
              className="btn-tilt-lg glow-btn-white"
            >
              {t.btnJoinNow}
            </TiltButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
