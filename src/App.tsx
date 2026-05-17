import { useState, useEffect } from 'react'
import ThemeCustomizer from './components/ThemeCustomizer'
import AdminDashboard from './components/AdminDashboard'
import DesignCodeHomepage from './components/DesignCodeHomepage'
import DesignCodeAdmin from './components/DesignCodeAdmin'

// Modular Landing Sections
import HeroSection from './components/homepage/HeroSection'
import CategoriesSection from './components/homepage/CategoriesSection'
import ReviewsSection from './components/homepage/ReviewsSection'
import AboutSection from './components/homepage/AboutSection'
import CtaSection from './components/homepage/CtaSection'
import Footer from './components/homepage/Footer'
import FloatingNav from './components/homepage/FloatingNav'

import './App.css'

type Language = 'vi' | 'en'
type View = 'landing' | 'admin' | 'designHomepage' | 'designAdmin'

const translations = {
  vi: {
    home: "Trang chủ",
    category: "Danh mục",
    reviews: "Đánh giá",
    about: "Về chúng tôi",
    collections: "Liên hệ",
    dashboard: "Dashboard Admin",
    login: "Đăng nhập",
    heroTitle: "THẤU HIỂU & ĐỒNG HÀNH CÙNG TRẺ phổ tự kỷ",
    heroSub: "Giải pháp toàn diện hỗ trợ giáo viên, cơ sở can thiệp sớm và cha mẹ trong việc sàng lọc, giám sát hành vi và đồng hành cùng sự hòa nhập của con trẻ.",
    btnStartScreening: "BẮT ĐẦU SÀNG LỌC",
    btnViewDemo: "DEMO TRUNG TÂM & VAI TRÒ",
    ctaTitle: "BẮT ĐẦU HÀNH TRÌNH THAY ĐỔI NGAY HÔM NAY",
    ctaSub: "Tham gia cùng mạng lưới hơn 50 trung tâm và 1000 chuyên gia can thiệp sớm hàng đầu sử dụng AutiCare mỗi ngày.",
    btnJoinNow: "ĐĂNG KÝ TRẢI NGHIỆM"
  },
  en: {
    home: "Home",
    category: "Categories",
    reviews: "Reviews",
    about: "About us",
    collections: "Contact",
    dashboard: "Admin Dashboard",
    login: "Login",
    heroTitle: "UNDERSTAND & ACCOMPANY AUTISTIC CHILDREN",
    heroSub: "A comprehensive digital solution supporting clinical schools, teachers, and parents in early screening, behavioral analysis, and social inclusion progress.",
    btnStartScreening: "START SCREENING",
    btnViewDemo: "CENTER & ROLES DEMO",
    ctaTitle: "START THE LIFELONG TRANSFORMATION TODAY",
    ctaSub: "Join our network of over 50 early intervention clinical centers and 1000 specialist educators using AutiCare daily.",
    btnJoinNow: "REGISTER FREE DEMO"
  }
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<Language>('vi')
  const [view, setView] = useState<View>('landing')
  const [activeSection, setActiveSection] = useState('hero')

  // Navbar scroll visual shift
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Section Tracking IntersectionObserver for active indicators
  useEffect(() => {
    if (view !== 'landing') return

    const sections = ['hero', 'category', 'reviews', 'about', 'cta', 'footer']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          root: null,
          rootMargin: '-40% 0px -40% 0px', // Trigger exactly when section crosses the middle zone
          threshold: 0
        }
      )
      observer.observe(el)
      return { observer, el }
    })

    return () => {
      observers.forEach((obs) => {
        if (obs?.observer) obs.observer.unobserve(obs.el)
      })
    }
  }, [view])

  const t = translations[lang]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  if (view === 'designHomepage') {
    return <DesignCodeHomepage lang={lang} setLang={setLang} onBack={() => setView('landing')} />
  }

  if (view === 'designAdmin') {
    return <DesignCodeAdmin lang={lang} setLang={setLang} onBack={() => setView('admin')} />
  }

  if (view === 'admin') {
    return (
      <div className="admin-theme-root admin-view-wrapper" key="admin-view">
         <AdminDashboard 
           lang={lang} 
           setLang={setLang} 
           onBack={() => setView('landing')}
           onDesignCode={() => setView('designAdmin')}
         />
         <ThemeCustomizer view={view} />
      </div>
    )
  }

  return (
    <div className={`app-shell ${view === 'landing' ? 'landing-active' : ''}`} key="landing-view">
      {/* 1. Header Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="nav-links">
            <a 
              href="#hero" 
              className={activeSection === 'hero' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            >
              {t.home}
            </a>
            <a 
              href="#category" 
              className={activeSection === 'category' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('category'); }}
            >
              {t.category}
            </a>
            <a 
              href="#reviews" 
              className={activeSection === 'reviews' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
            >
              {t.reviews}
            </a>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              {t.about}
            </a>
            <a 
              href="#cta" 
              className={activeSection === 'cta' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('cta'); }}
            >
              {t.collections}
            </a>
          </div>

          <div className="logo-area center-logo" onClick={() => scrollToSection('hero')} style={{ cursor: 'pointer' }}>
            <div className="brand-name neon-text">AutiCare</div>
          </div>

          <div className="nav-right">
            <div className="nav-icons">
              <button className="icon-btn" title="Search">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
              <button className="icon-btn" title="Design Code" onClick={() => setView('designHomepage')}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </button>
              <button className="icon-btn" title={t.dashboard} onClick={() => setView('admin')}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              </button>
            </div>
            
            <div className="lang-switch">
              <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')}>VN</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Floating Section Dot Indicator Panel (Desktop only) */}
      <FloatingNav 
        activeSection={activeSection} 
        onSectionClick={scrollToSection} 
        lang={lang} 
      />

      {/* 3. Main Sections */}
      <main>
        <HeroSection id="hero" t={t} />
        
        <CategoriesSection id="category" lang={lang} />
        
        <ReviewsSection id="reviews" lang={lang} />
        
        <AboutSection id="about" lang={lang} />
        
        <CtaSection id="cta" t={t} />

        {/* 4. Project Footer (Developers & Mentor Credits) */}
        <Footer lang={lang} />
      </main>

      {/* Design customizer system */}
      <ThemeCustomizer view={view} />
    </div>
  )
}

export default App
