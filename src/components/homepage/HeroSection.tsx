import React from 'react';
import { TiltButton } from 'react-tilt-button';
import ThreeBackground from './ThreeBackground';

import heroIllustration from '../../assets/hero-illustration.png';

interface HeroSectionProps {
  id: string;
  t: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id, t }) => {
  return (
    <section id={id} className="hero snap-section">
      {/* 3D Three.js Interactive Particle System */}
      <ThreeBackground />

      <div className="hero-content container glass">
        <div className="hero-left">
          <h1 className="bubble-text glow-text">{t.heroTitle}</h1>
          <p className="hero-desc">{t.heroSub}</p>
          
          <div className="hero-actions">
            <TiltButton 
              elevation={6} 
              radius={24} 
              surfaceColor="var(--primary)" 
              textColor="white"
              tilt={10}
              padding="1.2rem 3rem"
              className="btn-tilt-lg glow-btn-primary"
            >
              {t.btnStartScreening}
            </TiltButton>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img src={heroIllustration} alt="AutiCare Illustration" className="hero-illustration-img" />
          </div>
        </div>
      </div>

      {/* Floating indicators at bottom to prompt user to scroll */}
      <div className="scroll-indicator">
        <span className="mouse-icon">
          <span className="wheel" />
        </span>
        <span className="scroll-arrow" />
      </div>
    </section>
  );
};

export default HeroSection;
