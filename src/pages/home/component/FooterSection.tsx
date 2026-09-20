import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import bbikFullLogo from '@/shared/assets/bbik-full-logo.svg';

interface Props {
  isLoggedIn: boolean;
}

export default function FooterSection({ isLoggedIn }: Props) {
  return (
    <footer className="bg-white px-55 pt-14 pb-10 max-xl:px-20 max-lg:px-10 max-md:px-5 max-md:pt-10">
      <div className="mb-10 flex items-start justify-between max-md:flex-col max-md:gap-6">
        <div>
          <img src={bbikFullLogo} alt="삐빅" className="mb-4 h-8" />
          <p className="text-[14px] leading-relaxed text-gray-400">
            콘텐츠에 집중할 수 있도록.
            <br />
            AI 콘텐츠 모니터링 서비스, 삐빅
          </p>
        </div>
        <div className="flex items-center gap-8 pt-1">
          <Link
            to={isLoggedIn ? '/dashboard' : '/login'}
            className="flex items-center gap-1 text-[15px] font-semibold text-gray-900 hover:text-[#7047E8]"
          >
            서비스 바로가기
            <ArrowUpRight className="size-4" />
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1 text-[15px] font-semibold text-gray-900 hover:text-[#7047E8]"
          >
            로그인
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-6 max-md:flex-col max-md:items-start max-md:gap-4">
        <div>
          <p className="mb-1 text-[12px] text-gray-400">Bbik · AI CONTENT MONITORING</p>
          <p className="text-[12px] text-gray-400">
            AI는 검토를 돕고, 최종 판단은 사람이 내립니다.
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-gray-900"
        >
          맨 위로 <span className="text-lg">↑</span>
        </button>
      </div>
    </footer>
  );
}
