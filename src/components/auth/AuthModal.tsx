import React, { useEffect, useState } from 'react';

type Language = 'vi' | 'en';
type AuthMode = 'signIn' | 'signUp' | 'forgot';
type SlipDirection = 'forward' | 'backward';

interface AuthModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onSignIn: () => void;
}

const modeOrder: Record<AuthMode, number> = {
  signIn: 0,
  signUp: 1,
  forgot: 2,
};

const authCopy = {
  vi: {
    eyebrow: 'AUTICARE ACCESS',
    signInTitle: 'Dang nhap',
    signUpTitle: 'Tao tai khoan',
    forgotTitle: 'Khoi phuc mat khau',
    signInSub: 'Tiep tuc vao khong gian dong hanh cua phu huynh, bac si va giao vien.',
    signUpSub: 'Tao tai khoan AutiCare de bat dau theo doi hanh trinh can thiep som.',
    forgotSub: 'Nhap email dang ky, chung toi se gui huong dan dat lai mat khau.',
    email: 'Email',
    password: 'Mat khau',
    fullName: 'Ho va ten',
    confirmPassword: 'Nhap lai mat khau',
    remember: 'Ghi nho dang nhap',
    signIn: 'Dang nhap',
    signUp: 'Dang ky',
    sendReset: 'Gui lien ket',
    google: 'Dang nhap voi Google',
    noAccount: 'Chua co tai khoan?',
    hasAccount: 'Da co tai khoan?',
    forgotPassword: 'Quen mat khau?',
    backToSignIn: 'Quay lai dang nhap',
    register: 'Register',
    close: 'Dong modal',
    emailPlaceholder: 'phuhuynh.minhanh@gmail.com',
    namePlaceholder: 'Nguyễn Thị Minh Anh',
    passwordPlaceholder: 'Nhap mat khau',
    sampleEmail: 'phuhuynh.minhanh@gmail.com',
    samplePassword: 'phuhuynh-minhanh',
    sampleNote: 'Tài khoản mẫu Phụ huynh đã được điền sẵn. Bấm Đăng nhập để vào ngay.',
  },
  en: {
    eyebrow: 'AUTICARE ACCESS',
    signInTitle: 'Sign in',
    signUpTitle: 'Create account',
    forgotTitle: 'Reset password',
    signInSub: 'Continue into the shared workspace for parents, doctors, and teachers.',
    signUpSub: 'Create your AutiCare account to start tracking an early intervention journey.',
    forgotSub: 'Enter your registered email and we will send reset instructions.',
    email: 'Email',
    password: 'Password',
    fullName: 'Full name',
    confirmPassword: 'Confirm password',
    remember: 'Remember me',
    signIn: 'Sign in',
    signUp: 'Sign up',
    sendReset: 'Send reset link',
    google: 'Sign in with Google',
    noAccount: 'No account yet?',
    hasAccount: 'Already have an account?',
    forgotPassword: 'Forgot password?',
    backToSignIn: 'Back to sign in',
    register: 'Register',
    close: 'Close modal',
    emailPlaceholder: 'phuhuynh.minhanh@gmail.com',
    namePlaceholder: 'Nguyễn Thị Minh Anh',
    passwordPlaceholder: 'Enter password',
    sampleEmail: 'phuhuynh.minhanh@gmail.com',
    samplePassword: 'phuhuynh-minhanh',
    sampleNote: 'Parent demo account is prefilled. Press Sign in to continue.',
  },
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, lang, onClose, onSignIn }) => {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [direction, setDirection] = useState<SlipDirection>('forward');

  const t = authCopy[lang];

  useEffect(() => {
    if (isOpen) {
      setMode('signIn');
      setDirection('forward');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const switchMode = (nextMode: AuthMode) => {
    setDirection(modeOrder[nextMode] > modeOrder[mode] ? 'forward' : 'backward');
    setMode(nextMode);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === 'signIn') {
      onSignIn();
      onClose();
    }
  };

  const title = mode === 'signIn' ? t.signInTitle : mode === 'signUp' ? t.signUpTitle : t.forgotTitle;
  const subtitle = mode === 'signIn' ? t.signInSub : mode === 'signUp' ? t.signUpSub : t.forgotSub;

  return (
    <div className="auth-modal-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className={`auth-modal-shell auth-mode-${mode}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="auth-close-btn" type="button" onClick={onClose} aria-label={t.close}>
          X
        </button>

        <div className="auth-side-poster" aria-hidden="true">
          <span className="auth-sticker auth-sticker-red">SECURE</span>
          <span className="auth-sticker auth-sticker-yellow">CARE ID</span>
          <div className="auth-poster-logo">AutiCare</div>
          <div className="auth-poster-grid">
            <span>01</span>
            <span>CLINIC</span>
            <span>02</span>
            <span>FAMILY</span>
            <span>03</span>
            <span>SCHOOL</span>
          </div>
        </div>

        <div className="auth-form-zone">
          <div key={mode} className={`auth-slip-panel slip-${direction}`}>
            <p className="auth-eyebrow">{t.eyebrow}</p>
            <h2 id="auth-modal-title">{title}</h2>
            <p className="auth-subtitle">{subtitle}</p>

            {mode === 'signIn' && (
              <button className="auth-google-btn" type="button" onClick={() => { onSignIn(); onClose(); }}>
                <span className="google-mark">G</span>
                {t.google}
              </button>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'signUp' && (
                <label className="auth-field">
                  <span>{t.fullName}</span>
                  <input type="text" placeholder={t.namePlaceholder} autoComplete="name" />
                </label>
              )}

              <label className="auth-field">
                <span>{t.email}</span>
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  defaultValue={mode === 'signIn' ? t.sampleEmail : ''}
                  autoComplete="email"
                />
              </label>

              {mode !== 'forgot' && (
                <label className="auth-field">
                  <span>{t.password}</span>
                  <input
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    defaultValue={mode === 'signIn' ? t.samplePassword : ''}
                    autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
                  />
                </label>
              )}

              {mode === 'signIn' && (
                <p className="auth-sample-note">{t.sampleNote}</p>
              )}

              {mode === 'signUp' && (
                <label className="auth-field">
                  <span>{t.confirmPassword}</span>
                  <input type="password" placeholder={t.confirmPassword} autoComplete="new-password" />
                </label>
              )}

              {mode === 'signIn' && (
                <div className="auth-options-row">
                  <label className="auth-check">
                    <input type="checkbox" />
                    <span>{t.remember}</span>
                  </label>
                  <button className="auth-text-link" type="button" onClick={() => switchMode('forgot')}>
                    {t.forgotPassword}
                  </button>
                </div>
              )}

              <button className="auth-submit-btn" type="submit">
                {mode === 'signIn' ? t.signIn : mode === 'signUp' ? t.signUp : t.sendReset}
              </button>
            </form>

            <div className="auth-switch-row">
              {mode === 'signIn' && (
                <>
                  <span>{t.noAccount}</span>
                  <button type="button" onClick={() => switchMode('signUp')}>
                    {t.register}
                  </button>
                </>
              )}

              {mode === 'signUp' && (
                <>
                  <span>{t.hasAccount}</span>
                  <button type="button" onClick={() => switchMode('signIn')}>
                    {t.signIn}
                  </button>
                </>
              )}

              {mode === 'forgot' && (
                <button type="button" onClick={() => switchMode('signIn')}>
                  {t.backToSignIn}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthModal;
