import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden bg-[#0e0e14] max-lg:h-auto max-md:break-keep">
      {/* 배경 컬러 오브 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-[10%] size-80 rounded-full bg-[#9b8ec4]/30 blur-[90px]" />
        <div className="absolute right-[30%] bottom-1/4 size-64 rounded-full bg-[#7ea3c4]/50 blur-[80px]" />
        <div className="absolute top-1/2 right-[20%] size-48 rounded-full bg-[#b89fc4]/30 blur-[70px]" />
      </div>

      {/* 상단 레이블 */}
      <div className="absolute inset-x-0 top-6 z-10 flex justify-between px-55 pt-15 max-xl:px-20 max-lg:px-10 max-md:px-5 max-md:pt-6">
        <span className="pb-5 text-[13px] font-semibold tracking-[0.2em] text-[#d2cbdc] uppercase">
          AI CONTENT MONITORING
        </span>
        <span className="text-[13px] font-normal tracking-[0.2em] text-[#d2cbdc] uppercase max-md:hidden">
          PAGE NOT FOUND
        </span>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        className="relative flex h-full items-center gap-12 px-55 max-xl:px-20 max-lg:h-auto max-lg:min-h-dvh max-lg:px-10 max-lg:py-32 max-md:px-5"
        style={{ zIndex: 1 }}
      >
        {/* 왼쪽: 텍스트 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-1 flex-col"
        >
          <h1 className="text-[70px] leading-tight font-bold tracking-tight text-white max-xl:text-[clamp(2.5rem,4vw,4.375rem)] max-lg:text-[clamp(2.5rem,7vw,4.375rem)] max-md:text-[clamp(1.75rem,9vw,2.75rem)]">
            페이지를
          </h1>
          <h1 className="text-[70px] leading-tight font-bold tracking-tight text-white max-xl:text-[clamp(2.5rem,4vw,4.375rem)] max-lg:text-[clamp(2.5rem,7vw,4.375rem)] max-md:text-[clamp(1.75rem,9vw,2.75rem)]">
            찾을 수 없어요.
          </h1>
          <h1 className="mb-8 text-[70px] leading-tight font-bold tracking-tight text-[#c4afff] max-xl:text-[clamp(2.5rem,4vw,4.375rem)] max-lg:text-[clamp(2.5rem,7vw,4.375rem)] max-md:text-[clamp(1.75rem,9vw,2.75rem)]">
            404.
          </h1>

          <p className="mb-8 text-[18px] leading-relaxed text-gray-300 max-md:text-base">
            요청하신 페이지가 존재하지 않거나
            <br className="max-md:hidden" /> 이동되었을 수 있습니다.
            <br className="max-md:hidden" /> 홈으로 돌아가서 다시 시도해 보세요.
          </p>

          <button
            onClick={() => navigate('/')}
            className="flex w-fit items-center gap-2 rounded-full bg-[#c4afff] px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-violet-300"
          >
            홈으로 돌아가기
            <ArrowUpRight className="size-4" />
          </button>
        </motion.div>

        {/* 오른쪽: 404 카드 */}
        <div className="relative flex flex-1 flex-col gap-3 max-xl:hidden"></div>
      </div>

      {/* 하단 레이블 */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-between px-55 max-xl:px-20 max-lg:px-10 max-md:px-5">
        <p className="flex items-center gap-2 text-[14px] font-semibold tracking-[0.2em] text-gray-600 uppercase">
          ERROR 404
        </p>
        <p className="text-[14px] text-gray-600 max-md:hidden">삐빅 · AI 콘텐츠 모니터링</p>
      </div>
    </div>
  );
}
