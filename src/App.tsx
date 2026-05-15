import { useState, useEffect } from 'react'
import { TiltButton } from 'react-tilt-button'
import logo from './assets/logo.png'
import heroBg from './assets/hero-bg.png'
import classroomImg from './assets/classroom.png'
import dashboardImg from './assets/dashboard.png'
import ThemeCustomizer from './components/ThemeCustomizer'
import AdminDashboard from './components/AdminDashboard'
import DesignCodeHomepage from './components/DesignCodeHomepage'
import DesignCodeAdmin from './components/DesignCodeAdmin'
import './App.css'

type Language = 'vi' | 'en'
type View = 'landing' | 'admin' | 'designHomepage' | 'designAdmin'

const translations = {
  vi: {
    home: "Trang chủ",
    category: "Danh mục",
    reviews: "Đánh giá",
    about: "Về chúng tôi",
    collections: "Bộ sưu tập",
    dashboard: "Dashboard Admin",
    login: "Đăng nhập",
    heroTitle: "THẤU HIỂU & ĐỒNG HÀNH CÙNG TRẺ",
    heroSub: "Giải pháp toàn diện hỗ trợ giáo viên và phụ huynh trong việc sàng lọc, theo dõi và can thiệp sớm cho trẻ phổ tự kỷ.",
    btnStartScreening: "BẮT ĐẦU SÀNG LỌC",
    btnViewDemo: "XEM DEMO QUẢN LÝ",
    missionTitle: "TẦM NHÌN CỦA CHÚNG TÔI",
    missionSub: "Chúng tôi kiến tạo môi trường giáo dục hòa nhập, nơi mọi trẻ em đều được thấu hiểu và phát triển theo cách riêng của mình.",
    card1Title: "Môi trường học tập tối ưu",
    card1Sub: "Cung cấp các công cụ hỗ trợ giáo viên tạo dựng lịch trình trực quan, giúp trẻ giảm lo âu và tăng tính tự lập.",
    card2Title: "Dữ liệu là chìa khóa",
    card2Sub: "Theo dõi tiến độ hành vi và giao tiếp của trẻ thông qua các biểu đồ trực quan, giúp chuyên gia đưa ra lộ trình can thiệp đúng đắn.",
    btnLearnMore: "Tìm hiểu thêm",
    btnViewReports: "Xem báo cáo mẫu",
    ctaTitle: "SẴN SÀNG ĐỂ GIÚP ĐỠ TRẺ?",
    ctaSub: "Tham gia cùng hơn 1000 giáo viên đang sử dụng AutiCare để thay đổi cuộc sống của học sinh mỗi ngày.",
    btnJoinNow: "THAM GIA NGAY"
  },
  en: {
    home: "Home",
    category: "Category",
    reviews: "Reviews",
    about: "About us",
    collections: "All Collections",
    dashboard: "Admin Dashboard",
    login: "Login",
    heroTitle: "UNDERSTAND & ACCOMPANY CHILDREN",
    heroSub: "A comprehensive solution supporting teachers and parents in screening, monitoring, and early intervention for children with autism.",
    btnStartScreening: "START SCREENING",
    btnViewDemo: "VIEW MANAGEMENT DEMO",
    missionTitle: "OUR VISION",
    missionSub: "We create an inclusive educational environment where every child is understood and develops in their own unique way.",
    card1Title: "Optimal Learning Environment",
    card1Sub: "Providing tools to help teachers create visual schedules, reducing anxiety and increasing student independence.",
    card2Title: "Data is the Key",
    card2Sub: "Track behavioral and communication progress through visual charts, helping experts provide correct intervention pathways.",
    btnLearnMore: "Learn More",
    btnViewReports: "View Sample Reports",
    ctaTitle: "READY TO HELP CHILDREN?",
    ctaSub: "Join over 1000 teachers using AutiCare to change students' lives every day.",
    btnJoinNow: "JOIN NOW"
  }
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<Language>('vi')
  const [view, setView] = useState<View>('landing')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const t = translations[lang]

  if (view === 'designHomepage') {
    return <DesignCodeHomepage lang={lang} setLang={setLang} onBack={() => setView('landing')} />;
  }

  if (view === 'designAdmin') {
    return <DesignCodeAdmin lang={lang} setLang={setLang} onBack={() => setView('admin')} />;
  }

  if (view === 'admin') {
    return (
      <div className="admin-view-wrapper">
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
    <div className="app-shell">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="nav-links">
            <a href="#">{t.home}</a>
            <a href="#">{t.category}</a>
            <a href="#">{t.reviews}</a>
            <a href="#">{t.about}</a>
            <a href="#">{t.collections}</a>
          </div>

          <div className="logo-area center-logo" onClick={() => setView('landing')} style={{ cursor: 'pointer' }}>
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

      <main>
        <section className="hero">
          <div className="hero-bg-overlay" style={{ backgroundImage: `url(${heroBg})` }}></div>
          <div className="hero-content">
            <h1 className="bubble-text">{t.heroTitle}</h1>
            <p>{t.heroSub}</p>
            <div className="hero-actions" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <TiltButton 
                elevation={6} 
                radius={24} 
                surfaceColor="var(--primary)" 
                textColor="white"
                tilt={10}
                padding="1rem 2.5rem"
                className="btn-tilt-lg"
              >
                {t.btnStartScreening}
              </TiltButton>
              <TiltButton 
                elevation={6} 
                radius={24} 
                surfaceColor="white" 
                textColor="var(--primary)"
                tilt={10}
                padding="1rem 2.5rem"
                className="btn-tilt-lg"
              >
                {t.btnViewDemo}
              </TiltButton>
            </div>
          </div>
        </section>

        <section className="mission container">
          <div className="section-title">
            <h2 className="bubble-text" style={{ color: 'var(--primary)', textShadow: '2px 2px 0 white' }}>{t.missionTitle}</h2>
            <p>{t.missionSub}</p>
          </div>
          <div className="mission-grid">
            <div className="mission-card glass">
              <div className="mission-img-wrapper">
                <img src={classroomImg} alt="Classroom" className="mission-img" />
              </div>
              <div className="mission-info">
                <h3>{t.card1Title}</h3>
                <p>{t.card1Sub}</p>
                <TiltButton elevation={3} radius={12} surfaceColor="var(--secondary)" textColor="white">{t.btnLearnMore}</TiltButton>
              </div>
            </div>
            <div className="mission-card glass">
              <div className="mission-img-wrapper">
                <img src={dashboardImg} alt="Dashboard" className="mission-img" />
              </div>
              <div className="mission-info">
                <h3>{t.card2Title}</h3>
                <p>{t.card2Sub}</p>
                <TiltButton elevation={3} radius={12} surfaceColor="var(--primary)" textColor="white">{t.btnViewReports}</TiltButton>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-banner container">
          <div className="banner-content" style={{ background: 'var(--secondary)', color: 'white' }}>
            <div className="banner-text">
              <h2 className="bubble-text" style={{ color: 'white', textShadow: '2px 2px 0 var(--primary)' }}>{t.ctaTitle}</h2>
              <p>{t.ctaSub}</p>
            </div>
            <TiltButton 
              elevation={6} 
              radius={24} 
              surfaceColor="white" 
              textColor="var(--secondary)"
              padding="1rem 3rem"
            >
              {t.btnJoinNow}
            </TiltButton>
          </div>
        </section>
      </main>

      <ThemeCustomizer view={view} />
    </div>
  )
}

export default App
