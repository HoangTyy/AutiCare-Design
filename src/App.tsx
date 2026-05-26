import { useState, useEffect } from 'react'
import ThemeCustomizer from './components/ThemeCustomizer'
import AdminDashboard from './components/AdminDashboard'
import DesignCodeHomepage from './components/DesignCodeHomepage'
import DesignCodeAdmin from './components/DesignCodeAdmin'
import AuthModal from './components/auth/AuthModal'
import UserProfilePage from './components/profile/UserProfilePage'
import type { UserProfile } from './components/profile/UserProfilePage'
import StaffProfilePage from './components/profile/staff/StaffProfilePage'
import StaffDashboard from './components/profile/staff/StaffDashboard'
import ProfileModal from './components/homepage/ProfileModal'
import ParentInvoicesModal from './components/homepage/ParentInvoicesModal'
import ParentSupportTicketsModal from './components/homepage/ParentSupportTicketsModal'
import AllCentersPage from './components/homepage/AllCentersPage'
import { CenterDetailClientPage } from './components/homepage/CenterDetailClientPage'
import type { Center } from './components/dashboard/CenterDetailView'
import QuizPage from './components/homepage/ScreeningTab'

// Modular Landing Sections
import HeroSection from './components/homepage/HeroSection'
import CategoriesSection from './components/homepage/CategoriesSection'
import ReviewsSection from './components/homepage/ReviewsSection'
import BlogsSection from './components/homepage/BlogsSection'
import AboutSection from './components/homepage/AboutSection'
import CentersSection from './components/homepage/CentersSection'
import CtaSection from './components/homepage/CtaSection'
import Footer from './components/homepage/Footer'
import FloatingNav from './components/homepage/FloatingNav'

import './App.css'

type Language = 'vi' | 'en'
type View = 'landing' | 'admin' | 'designHomepage' | 'designAdmin' | 'assessment' | 'quiz' | 'profile' | 'centers' | 'staff-profile' | 'staff-dashboard' | 'center-detail'

const translations = {
  vi: {
    home: "Trang chủ",
    category: "Danh mục",
    reviews: "Đánh giá",
    blogs: "Tin tức",
    about: "Về chúng tôi",
    centers: "Trung tâm",
    collections: "Liên hệ",
    dashboard: "Dashboard Admin",
    signOut: "Dang xuat",
    login: "Đăng nhập",
    notifications: "Thong bao",
    heroTitle: "THẤU HIỂU & ĐỒNG HÀNH CÙNG TRẺ phổ tự kỷ",
    heroSub: "Giải pháp toàn diện hỗ trợ giáo viên, cơ sở can thiệp sớm và cha mẹ trong việc sàng lọc, giám sát hành vi và đồng hành cùng sự hòa nhập của con trẻ.",
    btnStartAssessment: "BẮT ĐẦU ĐÁNH GIÁ",
    btnBookExpert: "ĐẶT HẸN VỚI CHUYÊN GIA NGAY",
    expertPanelTitle: "Chọn chuyên gia can thiệp sớm",
    expertPanelSub: "Gặp chuyên gia uy tín để tư vấn nhanh về hành vi và lộ trình phát triển.",
    btnScheduleNow: "Đặt lịch ngay",
    btnViewDetail: "Xem chi tiết",
    expertDetailTitle: "Hồ sơ chuyên gia chi tiết",
    lblQualification: "Bằng cấp & Học vị",
    lblExperience: "Kinh nghiệm can thiệp",
    lblFeedbacks: "Nhận xét từ cha mẹ",
    lblYears: "năm kinh nghiệm",
    btnBackToList: "Quay lại danh sách",
    btnViewDemo: "DEMO TRUNG TÂM & VAI TRÒ",
    ctaTitle: "BẮT ĐẦU HÀNH TRÌNH THAY ĐỒỔI NGAY HÔM NAY",
    ctaSub: "Tham gia cùng mạng lưới hơn 50 trung tâm và 1000 chuyên gia can thiệp sớm hàng đầu sử dụng AutiCare mỗi ngày.",
    btnJoinNow: "ĐĂNG KÝ TRẢI NGHIỆM",
    bookingModalTitle: "Đặt lịch hẹn tư vấn",
    bookingSelectDate: "1. Chọn ngày tư vấn",
    bookingSelectTime: "2. Chọn giờ tư vấn",
    bookingBtnConfirm: "Xác nhận đặt lịch",
    bookingSuccessTitle: "Đặt lịch thành công!",
    bookingSuccessSub: "Thông tin cuộc hẹn của bạn đã được ghi nhận. Chuyên gia sẽ liên hệ bạn sớm nhất.",
    bookingTicketTitle: "VÉ HẸN AUTICARE",
    bookingExpertLbl: "Chuyên gia",
    bookingTimeLbl: "Thời gian",
    bookingMethodLbl: "Hình thức",
    bookingMethodVal: "Trực tuyến (Zoom/Google Meet)",
    bookingCodeLbl: "Mã số vé",
    bookingBtnClose: "Hoàn tất & Đóng",
    bookingRequiredHint: "Vui lòng chọn ngày và giờ để tiếp tục",
    slotOnline: "Trực tuyến",
    slotOffline: "Trực tiếp",
    slotAvailable: "Đang trống",
    slotBooked: "Đã bận"
  },
  en: {
    home: "Home",
    category: "Categories",
    reviews: "Reviews",
    blogs: "News",
    about: "About us",
    centers: "Centers",
    collections: "Contact",
    dashboard: "Admin Dashboard",
    signOut: "Sign out",
    login: "Login",
    notifications: "Notifications",
    heroTitle: "UNDERSTAND & ACCOMPANY AUTISTIC CHILDREN",
    heroSub: "A comprehensive digital solution supporting clinical schools, teachers, and parents in early screening, behavioral analysis, and social inclusion progress.",
    btnStartAssessment: "START ASSESSMENT",
    btnBookExpert: "BOOK AN EXPERT NOW",
    expertPanelTitle: "Choose an early intervention specialist",
    expertPanelSub: "Connect with top experts for fast guidance on behavior and development plans.",
    btnScheduleNow: "Schedule now",
    btnViewDetail: "View details",
    expertDetailTitle: "Detailed Expert Profile",
    lblQualification: "Qualifications & Credentials",
    lblExperience: "Intervention Experience",
    lblFeedbacks: "Parent Feedbacks",
    lblYears: "years of experience",
    btnBackToList: "Back to list",
    btnViewDemo: "CENTER & ROLES DEMO",
    ctaTitle: "START THE LIFELONG TRANSFORMATION TODAY",
    ctaSub: "Join our network of over 50 early intervention clinical centers and 1000 specialist educators using AutiCare daily.",
    btnJoinNow: "REGISTER FREE DEMO",
    bookingModalTitle: "Book a Consultation Session",
    bookingSelectDate: "1. Select Date",
    bookingSelectTime: "2. Select Time Slot",
    bookingBtnConfirm: "Confirm Booking",
    bookingSuccessTitle: "Booking Successful!",
    bookingSuccessSub: "Your appointment details have been saved. Our expert will contact you shortly.",
    bookingTicketTitle: "AUTICARE APPOINTMENT TICKET",
    bookingExpertLbl: "Expert",
    bookingTimeLbl: "Time",
    bookingMethodLbl: "Format",
    bookingMethodVal: "Online (Zoom/Google Meet)",
    bookingCodeLbl: "Ticket Code",
    bookingBtnClose: "Done & Close",
    bookingRequiredHint: "Please select a date and time to continue",
    slotOnline: "Online",
    slotOffline: "Offline",
    slotAvailable: "Available",
    slotBooked: "Booked"
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
  const [showProfile, setShowProfile] = useState(false)
  const [showParentInvoices, setShowParentInvoices] = useState(false)
  const [showSupportTickets, setShowSupportTickets] = useState(false)
  const [justBooked, setJustBooked] = useState(false)
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null)
  const [quizTarget, setQuizTarget] = useState<'mchat' | 'cars' | null>(null)

  // Core Mock Database State for Centers, their respective Levels, and Categories
  const [centers, setCenters] = useState<Center[]>([
    {
      id: 'AC-001',
      name: 'AutiCare Central Saigon',
      date: '2026-01-10',
      status: 'Active',
      address: '123 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh',
      phone_number: '+84 28 3930 1234',
      email: 'saigon.central@auticare.edu.vn',
      province: 'TP. Hồ Chí Minh',
      levels: [
        { id: '1', name: 'Dễ - Saigon', score: '1', desc: 'Mức độ dành cho các bài tập dễ tại Saigon' },
        { id: '2', name: 'Bình Thường - Saigon', score: '2', desc: 'Mức độ dành cho các bài tập bình thường tại Saigon' },
        { id: '3', name: 'Khó - Saigon', score: '3', desc: 'Mức độ bài tập khó phát triển kỹ năng cao tại Saigon' },
      ],
      categories: [
        { id: '1', name: 'Giáo dục thể chất - Saigon', date: '05/10/2026', isParent: true },
        { id: '2', name: 'Vận động thô - Saigon', date: '05/12/2026', isSub: true },
        { id: '3', name: 'Vận động tinh - Saigon', date: '05/13/2026', isSub: true },
      ],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true },
        { id: 'R-DOC', nameVi: 'Bác sĩ chuyên khoa', nameEn: 'Clinical Doctor', permissions: ['view_analytics', 'manage_exercises', 'manage_levels'], status: 'Active', priority: 2, isDefault: true },
        { id: 'R-TCH', nameVi: 'Giáo viên can thiệp', nameEn: 'Intervention Teacher', permissions: ['manage_exercises', 'view_analytics'], status: 'Active', priority: 3, isDefault: true },
        { id: 'R-THR', nameVi: 'Trị liệu viên cao cấp', nameEn: 'Senior Therapist', permissions: ['manage_exercises'], status: 'Active', priority: 4, isDefault: false },
      ],
      staffs: [
        { id: 'S-001', name: 'Dr. Nguyễn Văn A', roleId: 'R-DIR', email: 'nguyenvana.saigon@auticare.edu.vn', phone: '0901234567', joinedDate: '2026-01-10', status: 'Active' },
        { id: 'S-002', name: 'Cô Lê Thị B', roleId: 'R-TCH', email: 'lethib.saigon@auticare.edu.vn', phone: '0907654321', joinedDate: '2026-01-12', status: 'Active' },
        { id: 'S-003', name: 'Thầy Phạm Văn C', roleId: 'R-THR', email: 'phamvanc.saigon@auticare.edu.vn', phone: '0903334445', joinedDate: '2026-02-01', status: 'Active' },
      ]
    },
    {
      id: 'AC-002',
      name: 'AutiCare Hanoi North',
      date: '2026-02-15',
      status: 'Active',
      address: '456 Hoàng Hoa Thám, Quận Tây Hồ, Hà Nội',
      phone_number: '+84 24 3762 5678',
      email: 'hanoi.north@auticare.edu.vn',
      province: 'Hà Nội',
      levels: [
        { id: '1', name: 'Cơ bản - Hanoi', score: '1', desc: 'Mức độ làm quen ban đầu tại cơ sở Hanoi' },
        { id: '2', name: 'Nâng cao - Hanoi', score: '4', desc: 'Cấp độ nâng cao chuyên sâu tại cơ sở Hanoi' },
      ],
      categories: [
        { id: '1', name: 'Phát triển ngôn ngữ - Hanoi', date: '05/10/2026', isParent: true },
        { id: '2', name: 'Giao tiếp xã hội - Hanoi', date: '05/12/2026', isSub: true },
      ],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true },
        { id: 'R-DOC', nameVi: 'Bác sĩ chuyên khoa', nameEn: 'Clinical Doctor', permissions: ['view_analytics', 'manage_exercises', 'manage_levels'], status: 'Active', priority: 2, isDefault: true },
        { id: 'R-TCH', nameVi: 'Giáo viên can thiệp', nameEn: 'Intervention Teacher', permissions: ['manage_exercises', 'view_analytics'], status: 'Active', priority: 3, isDefault: true },
      ],
      staffs: [
        { id: 'H-001', name: 'Dr. Trần Thu Hằng', roleId: 'R-DIR', email: 'tranthuhang.hn@auticare.edu.vn', phone: '0912345678', joinedDate: '2026-02-15', status: 'Active' },
        { id: 'H-002', name: 'Cô Hoàng Mai Anh', roleId: 'R-TCH', email: 'maianh.hn@auticare.edu.vn', phone: '0918765432', joinedDate: '2026-02-20', status: 'Active' },
      ]
    },
    {
      id: 'AC-003',
      name: 'AutiCare Da Nang Beach',
      date: '2026-03-20',
      status: 'Active',
      address: '789 Võ Nguyên Giáp, Quận Sơn Trà, Đà Nẵng',
      phone_number: '+84 23 6384 9012',
      email: 'danang.beach@auticare.edu.vn',
      province: 'Đà Nẵng',
      levels: [
        { id: '1', name: 'Nhập môn - Da Nang', score: '1', desc: 'Mức nhập môn làm quen cho trẻ tại Da Nang' }
      ],
      categories: [
        { id: '1', name: 'Kỹ năng sống - Da Nang', date: '05/10/2026', isParent: true },
        { id: '2', name: 'Tự phục vụ - Da Nang', date: '05/12/2026', isSub: true }
      ],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true },
        { id: 'R-DOC', nameVi: 'Bác sĩ chuyên khoa', nameEn: 'Clinical Doctor', permissions: ['view_analytics', 'manage_exercises', 'manage_levels'], status: 'Active', priority: 2, isDefault: true },
        { id: 'R-TCH', nameVi: 'Giáo viên can thiệp', nameEn: 'Intervention Teacher', permissions: ['manage_exercises', 'view_analytics'], status: 'Active', priority: 3, isDefault: true },
      ],
      staffs: [
        { id: 'D-001', name: 'Thầy Lê Anh Tuấn', roleId: 'R-DIR', email: 'anhtuan.dn@auticare.edu.vn', phone: '0987654321', joinedDate: '2026-03-20', status: 'Active' }
      ]
    },
    {
      id: 'AC-004',
      name: 'AutiCare Thủ Đức Innovation',
      date: '2026-04-05',
      status: 'Active',
      address: '55 Đường Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh',
      phone_number: '+84 28 3720 4455',
      email: 'thuduc.innovation@auticare.edu.vn',
      province: 'TP. Hồ Chí Minh',
      levels: [],
      categories: [],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true }
      ],
      staffs: []
    },
    {
      id: 'AC-005',
      name: 'AutiCare Cầu Giấy',
      date: '2026-04-12',
      status: 'Active',
      address: '12 Trần Thái Tông, Quận Cầu Giấy, Hà Nội',
      phone_number: '+84 24 3795 6688',
      email: 'caugiay@auticare.edu.vn',
      province: 'Hà Nội',
      levels: [],
      categories: [],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true }
      ],
      staffs: []
    },
    {
      id: 'AC-006',
      name: 'AutiCare Hải Phòng Harbor',
      date: '2026-04-18',
      status: 'Active',
      address: '278 Lạch Tray, Quận Ngô Quyền, Hải Phòng',
      phone_number: '+84 22 5383 7799',
      email: 'haiphong.harbor@auticare.edu.vn',
      province: 'Hải Phòng',
      levels: [],
      categories: [],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true }
      ],
      staffs: []
    },
    {
      id: 'AC-007',
      name: 'AutiCare Cần Thơ Delta',
      date: '2026-04-22',
      status: 'Active',
      address: '90 Đường 3/2, Quận Ninh Kiều, Cần Thơ',
      phone_number: '+84 29 2381 2233',
      email: 'cantho.delta@auticare.edu.vn',
      province: 'Cần Thơ',
      levels: [],
      categories: [],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true }
      ],
      staffs: []
    },
    {
      id: 'AC-008',
      name: 'AutiCare Nha Trang Coastal',
      date: '2026-04-28',
      status: 'Inactive',
      address: '44 Trần Phú, Phường Lộc Thọ, Nha Trang, Khánh Hòa',
      phone_number: '+84 25 8352 1100',
      email: 'nhatrang.coastal@auticare.edu.vn',
      province: 'Khánh Hòa',
      levels: [],
      categories: [],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true }
      ],
      staffs: []
    },
    {
      id: 'AC-009',
      name: 'AutiCare Bình Dương Smart',
      date: '2026-05-02',
      status: 'Active',
      address: '15 Đại lộ Bình Dương, TX. Thuận An, Bình Dương',
      phone_number: '+84 27 4382 9900',
      email: 'binhduong.smart@auticare.edu.vn',
      province: 'Bình Dương',
      levels: [],
      categories: [],
      roles: [
        { id: 'R-DIR', nameVi: 'Giám đốc Trung tâm', nameEn: 'Center Director', permissions: ['manage_center', 'manage_staffs', 'manage_roles', 'view_analytics', 'manage_levels', 'manage_categories', 'manage_exercises', 'manage_blogs'], status: 'Active', priority: 1, isDefault: true }
      ],
      staffs: []
    }
  ]);

  // Profile settings
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'nguyenthia_02',
    email: 'nguyenthia02@gmail.com',
    avatar: '🦖',
    phonenumber: '0384.719.253',
    full_name: 'Nguyễn Thị A',
    address: '78/12 Đường Nguyễn Văn Cừ, Phường 2, Quận 5, TP. Hồ Chí Minh',
    job: 'Kế toán'
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hash Routing - Synchronize URL Hash with View State
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      let targetView: View = 'landing';

      if (hash === '#/dashboard/admin') {
        targetView = 'admin';
      } else if (hash === '#/profile') {
        targetView = 'profile';
      } else if (hash === '#/staff-profile') {
        targetView = 'staff-profile';
      } else if (hash === '#/dashboard/staff') {
        targetView = 'staff-dashboard';
      } else if (hash === '#/centers') {
        targetView = 'centers';
      } else if (hash === '#/design-homepage') {
        targetView = 'designHomepage';
      } else if (hash === '#/design-admin') {
        targetView = 'designAdmin';
      }

      setView(targetView);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initialize hash routing on mount
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update hash when view changes programmatically
  useEffect(() => {
    let targetHash = '#/';
    if (view === 'admin') targetHash = '#/dashboard/admin';
    else if (view === 'profile') targetHash = '#/profile';
    else if (view === 'staff-profile') targetHash = '#/staff-profile';
    else if (view === 'staff-dashboard') targetHash = '#/dashboard/staff';
    else if (view === 'centers') targetHash = '#/centers';
    else if (view === 'designHomepage') targetHash = '#/design-homepage';
    else if (view === 'designAdmin') targetHash = '#/design-admin';

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  }, [view]);

  // Section Tracking IntersectionObserver for active indicators
  useEffect(() => {
    if (view !== 'landing') return

    const sections = ['hero', 'category', 'reviews', 'blogs', 'about', 'centers', 'cta', 'footer']
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

  if (view === 'profile') {
    return (
      <UserProfilePage
        lang={lang}
        setLang={setLang}
        profile={userProfile}
        onBack={() => setView('landing')}
        onSave={(updatedProfile) => {
          setUserProfile(updatedProfile);
          setCurrentUserName(updatedProfile.full_name);
        }}
        onViewChange={(newView) => setView(newView)}
      />
    )
  }

  if (view === 'staff-profile') {
    return (
      <StaffProfilePage
        lang={lang}
        setLang={setLang}
        onBack={() => setView('landing')}
        onViewChange={(newView) => setView(newView)}
      />
    )
  }

  if (view === 'staff-dashboard') {
    return (
      <StaffDashboard
        lang={lang}
        setLang={setLang}
        onBack={() => setView('landing')}
        onViewChange={(newView) => setView(newView)}
      />
    )
  }

  if (view === 'centers') {
    return (
      <AllCentersPage
        lang={lang}
        setLang={setLang}
        centers={centers}
        onBack={() => setView('landing')}
        onSelectCenter={(c) => {
          setSelectedCenter(c as any);
          setView('center-detail');
        }}
      />
    )
  }

  if (view === 'center-detail' && selectedCenter) {
    return (
      <CenterDetailClientPage
        lang={lang}
        setLang={setLang}
        center={selectedCenter}
        onBack={() => setView('landing')}
        onInvoiceGenerated={() => {
          setJustBooked(true);
          setTimeout(() => {
            setShowParentInvoices(true);
          }, 2000);
        }}
      />
    )
  }

  if (view === 'quiz') {
    return (
      <QuizPage
        lang={lang}
        quizId={quizTarget}
        onBack={() => {
          setQuizTarget(null);
          setView('landing');
        }}
      />
    )
  }

  if (view === 'admin') {
    return (
      <div className="admin-theme-root admin-view-wrapper" key="admin-view">
         <AdminDashboard 
           lang={lang} 
           setLang={setLang} 
           centers={centers}
           setCenters={setCenters}
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
              href="#blogs" 
              className={activeSection === 'blogs' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('blogs'); }}
            >
              {t.blogs}
            </a>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              {t.about}
            </a>
            <a 
              href="#centers" 
              className={activeSection === 'centers' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('centers'); }}
            >
              {t.centers}
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
              <a 
                href={currentUserName === 'TS. BS. Nguyễn Minh Anh' ? '#/dashboard/staff' : '#/dashboard/admin'}
                className="icon-btn" 
                title={currentUserName === 'TS. BS. Nguyễn Minh Anh' ? (lang === 'vi' ? 'Không gian làm việc' : 'Workspace') : t.dashboard}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'inherit', textDecoration: 'none' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              </a>
            </div>
            
            <div className="lang-switch">
              <button className={`lang-btn ${lang === 'vi' ? 'active' : ''}`} onClick={() => setLang('vi')}>VN</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>

            {currentUserName ? (
              <div className="auth-session">
                <a 
                  href={currentUserName === 'TS. BS. Nguyễn Minh Anh' ? '#/staff-profile' : '#/profile'}
                  className="auth-user-chip" 
                  title={lang === 'vi' ? 'Xem hồ sơ cá nhân' : 'View User Profile'}
                  style={{ textDecoration: 'none' }}
                >
                  {currentUserName}
                </a>
                <button className="auth-signout-btn" type="button" onClick={() => {
                  setCurrentUserName(null);
                  window.location.hash = '#/';
                }}>
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
        <HeroSection 
          id="hero" 
          t={t} 
          lang={lang} 
          onQuizSelected={(quizId) => {
            setQuizTarget(quizId);
            setView('quiz');
          }}
          onInvoiceGenerated={() => {
            setJustBooked(true);
            setTimeout(() => {
              setShowParentInvoices(true);
            }, 2000);
          }}
        />
        
        <CategoriesSection id="category" lang={lang} />
        
        <ReviewsSection id="reviews" lang={lang} />
        
        <BlogsSection id="blogs" lang={lang} />
        
        <AboutSection id="about" lang={lang} />
        
        <CentersSection 
          id="centers" 
          lang={lang} 
          centers={centers} 
          onViewMoreCenters={() => setView('centers')} 
          onSelectCenter={(c) => {
            setSelectedCenter(c as any);
            setView('center-detail');
          }}
        />
        
        <CtaSection id="cta" t={t} />

        {/* 4. Project Footer (Developers & Mentor Credits) */}
        <Footer lang={lang} />
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        lang={lang}
        onClose={() => setIsAuthModalOpen(false)}
        onSignIn={() => setCurrentUserName(userProfile.full_name)}
      />
      <ProfileModal 
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        lang={lang}
        onOpenInvoices={() => setShowParentInvoices(true)}
        onOpenSupportTickets={() => setShowSupportTickets(true)}
      />
      <ParentInvoicesModal 
        isOpen={showParentInvoices}
        onClose={() => setShowParentInvoices(false)}
        lang={lang}
        justBooked={justBooked}
      />
      <ParentSupportTicketsModal 
        isOpen={showSupportTickets}
        onClose={() => setShowSupportTickets(false)}
        lang={lang}
      />
      <ThemeCustomizer view={view === 'center-detail' ? 'landing' : view as any} onDesignCode={() => setView('designHomepage')} />
    </div>
  )
}

export default App
