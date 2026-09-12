import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import bbikFullLogo from '@/shared/assets/bbik-full-logo.svg';
import { tokenStore } from '@/features/auth/store/tokenStore';
import { logout } from '@/features/auth/api/authApi';

const navLinks = [
  { label: '삐빅 소개', sectionId: 'section-purpose' },
  { label: '서비스', sectionId: 'section-service' },
  { label: '핵심 원칙', sectionId: 'section-principles' },
  { label: '이용 방법', sectionId: 'section-how' },
];

interface NavbarProps {
  isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(navLinks[0].sectionId);
  const user = tokenStore.getUser();
  const initial = (user?.name?.[0] ?? user?.email?.[0] ?? '').toUpperCase();

  useEffect(() => {
    function onScroll() {
      const purpose = document.getElementById('section-purpose');
      const service = document.getElementById('section-service');
      const principles = document.getElementById('section-principles');
      const how = document.getElementById('section-how');

      let active = 'section-purpose';

      // OUR PURPOSE 중간 지나면 → 서비스
      if (purpose) {
        const mid = purpose.getBoundingClientRect().top + purpose.offsetHeight / 2;
        if (mid <= 0) active = 'section-service';
      }

      // OUR SERVICE 80% 지나면 → 핵심 원칙
      if (service) {
        const eighty = service.getBoundingClientRect().top + service.offsetHeight * 0.8;
        if (eighty <= 0) active = 'section-principles';
      }

      // CORE PRINCIPLES 중간 지나면 → 이용 방법
      if (principles) {
        const mid = principles.getBoundingClientRect().top + principles.offsetHeight / 2;
        if (mid <= 0 && how) active = 'section-how';
      }

      setActiveSection(active);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex h-22 items-center justify-between px-30">
        <Link to="/">
          <img src={bbikFullLogo} alt="삐빅" className="h-9" />
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-7">
            <Link to="/dashboard" className="text-sm text-violet-600 hover:text-violet-800">
              작업 목록
            </Link>
            <Link to="/settings" className="text-sm text-gray-500 hover:text-gray-900">
              설정
            </Link>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-900">
              로그아웃
            </button>
            <div className="flex size-9 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
              {initial}
            </div>
          </div>
        ) : (
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <button
                  key={link.sectionId}
                  onClick={() =>
                    document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className={`relative pb-1 text-[17px] font-semibold transition-colors ${
                    isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-[#7047E8]"
                      transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full border border-gray-300 px-5 py-2 text-[17px] font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              삐빅 시작하기
              <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
