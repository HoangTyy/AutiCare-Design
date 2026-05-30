import React, { useEffect, useState } from 'react';

type Language = 'vi' | 'en';
type AuthMode = 'signIn' | 'signUp' | 'forgot' | 'verifyEmail' | 'resetPassword';
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
  forgot: 1,
  verifyEmail: 2,
  resetPassword: 3,
};

const authCopy = {
  vi: {
    eyebrow: 'AUTICARE ACCESS',
    signInTitle: 'Dang nhap',
    signUpTitle: 'Tao tai khoan',
    forgotTitle: 'Quen mat khau',
    verifyEmailTitle: 'Xac minh email',
    resetPasswordTitle: 'Dat lai mat khau',
    signInSub: 'Tiep tuc vao khong gian dong hanh cua phu huynh, bac si va giao vien.',
    signUpSub: 'Tao tai khoan AutiCare de bat dau theo doi hanh trinh can thiep som.',
    forgotSub: 'Nhap email dang ky, chung toi se gui email xac minh cho ban.',
    verifyEmailSub: 'Chung toi da gui email xac minh. Hay kiem tra hop thu va bam Verify de tiep tuc.',
    resetPasswordSub: 'Tao mat khau moi cho tai khoan AutiCare cua ban.',
    email: 'Email',
    otp: 'Ma OTP',
    username: 'Ten dang nhap',
    password: 'Mat khau',
    newPassword: 'Mat khau moi',
    phoneNumber: 'So dien thoai',
    fullName: 'Ho va ten',
    confirmPassword: 'Nhap lai mat khau',
    address: 'Dia chi',
    job: 'Nghe nghiep',
    remember: 'Ghi nho dang nhap',
    signIn: 'Dang nhap',
    signUp: 'Dang ky',
    sendEmail: 'Gui email',
    verify: 'Verify',
    resetPassword: 'Dat lai mat khau',
    resendOtpQuestion: 'Did not receive the OTP?',
    resendOtpAction: 'Click here to resend',
    resendOtpCountdown: 'Resend available in',
    google: 'Dang nhap voi Google',
    noAccount: 'Chua co tai khoan?',
    hasAccount: 'Da co tai khoan?',
    forgotPassword: 'Quen mat khau?',
    backToSignIn: 'Quay lai dang nhap',
    register: 'Register',
    close: 'Dong modal',
    emailPlaceholder: 'phuhuynh.minhanh@gmail.com',
    otpPlaceholder: 'Nhap ma OTP',
    usernamePlaceholder: 'minhanh_parent',
    phonePlaceholder: '0901 234 567',
    addressPlaceholder: 'Quan 1, TP. Ho Chi Minh',
    jobPlaceholder: 'Nhan vien van phong',
    namePlaceholder: 'Nguyễn Thị Minh Anh',
    passwordPlaceholder: 'Nhap mat khau',
    newPasswordPlaceholder: 'Nhap mat khau moi',
    sampleEmail: 'phuhuynh.minhanh@gmail.com',
    samplePassword: 'phuhuynh-minhanh',
    sampleNote: 'Tài khoản mẫu Phụ huynh đã được điền sẵn. Bấm Đăng nhập để vào ngay.',
  },
  en: {
    eyebrow: 'AUTICARE ACCESS',
    signInTitle: 'Sign in',
    signUpTitle: 'Sign-up',
    forgotTitle: 'Forgot password',
    verifyEmailTitle: 'Verify email',
    resetPasswordTitle: 'Reset password',
    signInSub: 'Continue into the shared workspace for parents, doctors, and teachers.',
    signUpSub: 'Create your AutiCare account to start tracking an early intervention journey.',
    forgotSub: 'Enter your registered email and we will send a verification email.',
    verifyEmailSub: 'We sent a verification email. Check your inbox and press Verify to continue.',
    resetPasswordSub: 'Create a new password for your AutiCare account.',
    email: 'Email',
    otp: 'OTP code',
    username: 'Username',
    password: 'Password',
    newPassword: 'New password',
    phoneNumber: 'Phone number',
    fullName: 'Full name',
    confirmPassword: 'Confirm password',
    address: 'Address',
    job: 'Job',
    remember: 'Remember me',
    signIn: 'Sign in',
    signUp: 'Sign up',
    sendEmail: 'Send email',
    verify: 'Verify',
    resetPassword: 'Reset password',
    resendOtpQuestion: 'Did not receive the OTP?',
    resendOtpAction: 'Click here to resend',
    resendOtpCountdown: 'Resend available in',
    google: 'Sign in with Google',
    noAccount: 'No account yet?',
    hasAccount: 'Already have an account?',
    forgotPassword: 'Forgot password?',
    backToSignIn: 'Back to sign in',
    register: 'Register',
    close: 'Close modal',
    emailPlaceholder: 'phuhuynh.minhanh@gmail.com',
    otpPlaceholder: 'Enter OTP code',
    usernamePlaceholder: 'minhanh_parent',
    phonePlaceholder: '0901 234 567',
    addressPlaceholder: 'District 1, Ho Chi Minh City',
    jobPlaceholder: 'Office staff',
    namePlaceholder: 'Nguyễn Thị Minh Anh',
    passwordPlaceholder: 'Enter password',
    newPasswordPlaceholder: 'Enter new password',
    sampleEmail: 'phuhuynh.minhanh@gmail.com',
    samplePassword: 'phuhuynh-minhanh',
    sampleNote: 'Parent demo account is prefilled. Press Sign in to continue.',
  },
};

const RequiredMark = () => (
  <span className="auth-required-mark" aria-label="required">
    *
  </span>
);

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, lang, onClose, onSignIn }) => {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [direction, setDirection] = useState<SlipDirection>('forward');
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [nextOtpCooldown, setNextOtpCooldown] = useState(30);

  const t = authCopy[lang];

  useEffect(() => {
    if (isOpen) {
      setMode('signIn');
      setDirection('forward');
      setOtpCooldown(0);
      setNextOtpCooldown(30);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || otpCooldown <= 0) return;

    const timer = window.setTimeout(() => {
      setOtpCooldown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [isOpen, otpCooldown]);

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

  const handleResendOtp = () => {
    if (otpCooldown > 0) return;

    setOtpCooldown(nextOtpCooldown);
    setNextOtpCooldown((current) => current + 30);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === 'signIn') {
      onSignIn();
      onClose();
      return;
    }

    if (mode === 'signUp' || mode === 'forgot') {
      switchMode('verifyEmail');
      return;
    }

    if (mode === 'verifyEmail') {
      switchMode('resetPassword');
      return;
    }

    if (mode === 'resetPassword') {
      switchMode('signIn');
    }
  };

  const title =
    mode === 'signIn'
      ? t.signInTitle
      : mode === 'signUp'
        ? t.signUpTitle
        : mode === 'forgot'
          ? t.forgotTitle
          : mode === 'verifyEmail'
            ? t.verifyEmailTitle
            : t.resetPasswordTitle;
  const subtitle =
    mode === 'signIn'
      ? t.signInSub
      : mode === 'signUp'
        ? t.signUpSub
        : mode === 'forgot'
          ? t.forgotSub
          : mode === 'verifyEmail'
            ? t.verifyEmailSub
            : t.resetPasswordSub;

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

            {mode === 'verifyEmail' ? (
              <form className="auth-step-card" onSubmit={handleSubmit}>
                <label className="auth-field auth-otp-field">
                  <span className="auth-label-text">
                    {t.otp}
                    <RequiredMark />
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder={t.otpPlaceholder}
                    maxLength={6}
                    required
                  />
                </label>
                <button className="auth-submit-btn" type="submit">
                  {t.verify}
                </button>
                <div className="auth-resend-block">
                  <span>{t.resendOtpQuestion}</span>
                  <button
                    className="auth-resend-link"
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpCooldown > 0}
                  >
                    {t.resendOtpAction}
                  </button>
                  {otpCooldown > 0 && (
                    <span className="auth-otp-countdown">
                      {t.resendOtpCountdown} {otpCooldown}s
                    </span>
                  )}
                </div>
              </form>
            ) : (
            <form
              className={`auth-form ${
                mode === 'signUp'
                  ? 'auth-signup-form'
                  : mode === 'resetPassword'
                    ? 'auth-reset-form'
                    : ''
              }`}
              onSubmit={handleSubmit}
            >
              {mode === 'signUp' && (
                <>
                  <label className="auth-field signup-username">
                    <span className="auth-label-text">
                      {t.username}
                      <RequiredMark />
                    </span>
                    <input type="text" placeholder={t.usernamePlaceholder} autoComplete="username" required />
                  </label>

                  <label className="auth-field signup-fullname">
                    <span className="auth-label-text">
                      {t.fullName}
                      <RequiredMark />
                    </span>
                    <input type="text" placeholder={t.namePlaceholder} autoComplete="name" required />
                  </label>
                </>
              )}

              {(mode === 'signIn' || mode === 'forgot') && (
                <label className="auth-field">
                  <span className="auth-label-text">{t.email}</span>
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    defaultValue={mode === 'signIn' ? t.sampleEmail : ''}
                    autoComplete="email"
                    required={mode === 'forgot'}
                  />
                </label>
              )}

              {(mode === 'signIn' || mode === 'signUp') && (
                <label className={`auth-field ${mode === 'signUp' ? 'signup-password' : ''}`}>
                  <span className="auth-label-text">
                    {t.password}
                    {mode === 'signUp' && <RequiredMark />}
                  </span>
                  <input
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    defaultValue={mode === 'signIn' ? t.samplePassword : ''}
                    autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
                    required={mode === 'signUp'}
                  />
                </label>
              )}

              {mode === 'signIn' && (
                <p className="auth-sample-note">{t.sampleNote}</p>
              )}

              {mode === 'signUp' && (
                <>
                  <label className="auth-field signup-confirm-password">
                    <span className="auth-label-text">
                      {t.confirmPassword}
                      <RequiredMark />
                    </span>
                    <input type="password" placeholder={t.confirmPassword} autoComplete="new-password" required />
                  </label>

                  <label className="auth-field signup-email">
                    <span className="auth-label-text">
                      {t.email}
                      <RequiredMark />
                    </span>
                    <input type="email" placeholder={t.emailPlaceholder} autoComplete="email" required />
                  </label>

                  <label className="auth-field signup-phone">
                    <span className="auth-label-text">
                      {t.phoneNumber}
                      <RequiredMark />
                    </span>
                    <input type="tel" placeholder={t.phonePlaceholder} autoComplete="tel" required />
                  </label>

                  <label className="auth-field signup-job">
                    <span className="auth-label-text">{t.job}</span>
                    <input type="text" placeholder={t.jobPlaceholder} autoComplete="organization-title" />
                  </label>

                  <label className="auth-field signup-address">
                    <span className="auth-label-text">{t.address}</span>
                    <textarea placeholder={t.addressPlaceholder} autoComplete="street-address" rows={3} />
                  </label>
                </>
              )}

              {mode === 'resetPassword' && (
                <>
                  <label className="auth-field">
                    <span className="auth-label-text">
                      {t.newPassword}
                      <RequiredMark />
                    </span>
                    <input type="password" placeholder={t.newPasswordPlaceholder} autoComplete="new-password" required />
                  </label>

                  <label className="auth-field">
                    <span className="auth-label-text">
                      {t.confirmPassword}
                      <RequiredMark />
                    </span>
                    <input type="password" placeholder={t.confirmPassword} autoComplete="new-password" required />
                  </label>
                </>
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
                {mode === 'signIn'
                  ? t.signIn
                  : mode === 'signUp'
                    ? t.signUp
                    : mode === 'forgot'
                      ? t.sendEmail
                      : t.resetPassword}
              </button>
            </form>
            )}

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
