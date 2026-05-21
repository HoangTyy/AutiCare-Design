import { useState, useEffect } from 'react'
import ThemeCustomizer from './components/ThemeCustomizer'
import AdminDashboard from './components/AdminDashboard'
import DesignCodeHomepage from './components/DesignCodeHomepage'
import DesignCodeAdmin from './components/DesignCodeAdmin'
import ToolAssessmentPage from './components/assessment/ToolAssessmentPage'
import AuthModal from './components/auth/AuthModal'

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
type View = 'landing' | 'admin' | 'designHomepage' | 'designAdmin' | 'assessment'

const translations = {
  vi: {
    home: "Trang chủ",
    category: "Danh mục",
    reviews: "Đánh giá",
    about: "Về chúng tôi",
    collections: "Liên hệ",
    dashboard: "Dashboard Admin",
    signOut: "Dang xuat",
    login: "Đăng nhập",
    notifications: "Thong bao",
    heroTitle: "THẤU HIỂU & ĐỒNG HÀNH CÙNG TRẺ phổ tự kỷ",
    heroSub: "Giải pháp toàn diện hỗ trợ giáo viên, cơ sở can thiệp sớm và cha mẹ trong việc sàng lọc, giám sát hành vi và đồng hành cùng sự hòa nhập của con trẻ.",
    btnStartAssessment: "BẮT ĐẦU ĐÁNH GIÁ",
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
    signOut: "Sign out",
    login: "Login",
    notifications: "Notifications",
    heroTitle: "UNDERSTAND & ACCOMPANY AUTISTIC CHILDREN",
    heroSub: "A comprehensive digital solution supporting clinical schools, teachers, and parents in early screening, behavioral analysis, and social inclusion progress.",
    btnStartAssessment: "START ASSESSMENT",
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [currentUserName, setCurrentUserName] = useState<string | null>(null)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

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
  const notificationItems = lang === 'vi'
    ? [
        { title: 'Cap nhat he thong', body: 'He thong se bao tri de cap nhat.' },
        { title: 'Canh bao tai khoan', body: 'Da phat hien mot loi bao mat.' },
        { title: 'Loi moi hop', body: 'Ban vua duoc moi tham gia mot cuoc hop.' },
      ]
    : [
        { title: 'System Update', body: 'System will be under maintenance for update.' },
        { title: 'Account warning', body: 'A security fault has been occurred.' },
        { title: 'Meeting invite', body: 'You has been invited to a meeting.' },
      ]

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

  if (view === 'assessment') {
    return (
      <div className="assessment-theme-root assessment-view-wrapper" key="assessment-view">
         <ToolAssessmentPage 
           lang={lang} 
           setLang={setLang} 
           onBack={() => setView('landing')}
         />
         <ThemeCustomizer view={view} />
      </div>
    )
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
              <div className="notification-menu">
                <button
                  className={`icon-btn notification-btn ${isNotificationsOpen ? 'active' : ''}`}
                  title={t.notifications}
                  aria-label={t.notifications}
                  aria-expanded={isNotificationsOpen}
                  onClick={() => setIsNotificationsOpen((open) => !open)}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  <span className="notification-dot" aria-hidden="true" />
                </button>

                {isNotificationsOpen && (
                  <div className="notification-panel" role="menu">
                    {notificationItems.map((item) => (
                      <button className="notification-item" type="button" key={item.title} role="menuitem">
                        <span className="notification-title">{item.title}</span>
                        <span className="notification-body">{item.body}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

            {currentUserName ? (
              <div className="auth-session">
                <span className="auth-user-chip">{currentUserName}</span>
                <button className="auth-signout-btn" type="button" onClick={() => setCurrentUserName(null)}>
                  {t.signOut}
                </button>
              </div>
            ) : (
              <button className="auth-open-btn" type="button" onClick={() => setIsAuthModalOpen(true)}>
                {t.login}
              </button>
            )}
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
        <HeroSection id="hero" t={t} onStartAssessment={() => setView('assessment')} />
        
        <CategoriesSection id="category" lang={lang} />
        
        <ReviewsSection id="reviews" lang={lang} />
        
        <AboutSection id="about" lang={lang} />
        
        <CtaSection id="cta" t={t} />

        {/* 4. Project Footer (Developers & Mentor Credits) */}
        <Footer lang={lang} />
      </main>

      {/* Design customizer system */}
      <AuthModal
        isOpen={isAuthModalOpen}
        lang={lang}
        onClose={() => setIsAuthModalOpen(false)}
        onSignIn={() => setCurrentUserName('Auticare Admin')}
      />
      <ThemeCustomizer view={view} onDesignCode={() => setView('designHomepage')} />
    </div>
  )
}

export default App
