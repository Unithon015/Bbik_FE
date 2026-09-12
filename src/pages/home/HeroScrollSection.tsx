import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const items = [
  { num: 1, title: '혐오 표현', desc: '특정 집단을 향한 표현을 확인해 주세요' },
  { num: 2, title: '정치적 발언', desc: '게시 맥락을 함께 살펴봐 주세요' },
  { num: 3, title: '비속어', desc: '표현의 수위와 대상을 확인해 주세요' },
];

interface Props {
  isLoggedIn: boolean;
}

export default function HeroScrollSection({ isLoggedIn }: Props) {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden bg-[#0e0e14]">
      {/* 상단 레이블 */}
      <div className="absolute inset-x-0 top-6 z-10 flex justify-between px-55 pt-15">
        <span className="pb-5 text-[13px] font-semibold tracking-[0.2em] text-[#d2cbdc] uppercase">
          AI CONTENT MONITORING
        </span>
        <span className="font-regular text-[13px] tracking-[0.2em] text-[#d2cbdc] uppercase">
          CREATE WITH CONFIDENCE
        </span>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative flex h-full items-center gap-8 px-55" style={{ zIndex: 1 }}>
        {/* ── 왼쪽: 히어로 텍스트 ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-1 flex-col"
        >
          <h1 className="text-[70px] leading-tight font-bold tracking-tight text-white">
            만드는 데 집중해요.
          </h1>
          <h1 className="text-[70px] leading-tight font-bold tracking-tight text-white">
            살펴보는 건,
          </h1>
          <h1 className="mb-8 text-[70px] leading-tight font-bold tracking-tight text-[#c4afff]">
            삐빅.
          </h1>

          <p className="mb-8 text-[18px] leading-relaxed text-gray-300">
            이미지부터 글까지.
            <br />
            놓치기 쉬운 민감한 요소를 모니터링해
            <br />
            당신의 다음 판단을 돕습니다.
          </p>

          <button
            onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
            className="flex w-fit items-center gap-2 rounded-full bg-[#c4afff] px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-violet-700"
          >
            콘텐츠 검수 시작하기
            <ArrowUpRight className="size-4" />
          </button>
        </motion.div>

        {/* ── 오른쪽: 플로팅 카드 ── */}
        <div className="relative flex flex-1 items-center">
          {/* 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            style={{ rotate: 3 }}
            className="w-full max-w-[460px] rounded-3xl bg-white p-7 shadow-2xl"
          >
            <p className="mb-5 text-base font-extrabold tracking-tight text-gray-900">Bbik</p>

            <p className="mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
              CONTENT REVIEW
            </p>
            <h2 className="mb-4 text-xl leading-snug font-bold text-gray-900">
              어디를 살펴봐야 할지,
              <br />
              이유와 함께 한눈에.
            </h2>

            {/* 태그 */}
            <div className="mb-4 flex gap-2">
              {['영상', '이미지', '텍스트'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 아이템 */}
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              {items.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.55 + idx * 0.15 }}
                  className={`flex items-center gap-3 px-4 py-3.5 ${idx < items.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-[#7047E8]">
                    {item.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-gray-400" />
                </motion.div>
              ))}
            </div>

            <p className="mt-4 text-xs text-gray-400">
              ⓘ AI는 정리하고, 최종 판단은 사람이 내립니다.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 하단 레이블 */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-between px-55">
        <p className="flex items-center gap-2 text-[14px] font-semibold tracking-[0.2em] text-gray-600 uppercase">
          SCROLL TO EXPLORE <span className="text-lg text-[#c4afff]">↓</span>
        </p>
        <p className="text-[14px] text-gray-600">영상 · 이미지 · 텍스트를 함께</p>
      </div>
    </div>
  );
}
