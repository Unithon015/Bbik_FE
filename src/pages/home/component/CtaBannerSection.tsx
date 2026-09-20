import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  isLoggedIn: boolean;
}

export default function CtaBannerSection({ isLoggedIn }: Props) {
  const navigate = useNavigate();

  return (
    <section className="bg-[#c4afff] px-55 py-20 max-xl:px-20 max-lg:px-10 max-md:px-5 max-md:py-14">
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-8">
        <div>
          <p className="mb-6 text-[13px] font-semibold tracking-[0.2em] text-black/50 uppercase">
            YOUR NEXT CONTENT, WITH BBIK
          </p>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-tight font-bold tracking-tight text-gray-900">
            다음 콘텐츠도,
            <br />
            삐빅과 함께.
          </h2>
        </div>
        <button
          onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
          className="flex shrink-0 items-center gap-2.5 rounded-full bg-black px-8 py-4 text-[18px] font-semibold text-white transition-colors hover:bg-gray-800"
        >
          삐빅 시작하기
          <ArrowUpRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
