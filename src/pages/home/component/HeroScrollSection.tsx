import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SAFETY_SCORE = 72;

const sensitiveItems = [
  {
    num: 1,
    numBg: 'text-[#E9A0B5]',
    numStyle: { backgroundColor: 'rgba(217, 121, 145, 0.15)' },
    tag: '혐오 표현',
    tagStyle: { backgroundColor: 'rgba(217, 121, 145, 0.15)', color: '#E9A0B5' },
    title: '특정 집단 비하 표현이 포함되어 있어요',
    desc: '플랫폼 정책에 위배될 가능성이 있으며 즉각적인 검토가 필요합니다.',
  },
  {
    num: 2,
    numBg: 'text-[#8FB3E0]',
    numStyle: { backgroundColor: 'rgba(110, 147, 196, 0.15)' },
    tag: '정치적 발언',
    tagStyle: { backgroundColor: 'rgba(110, 147, 196, 0.15)', color: '#8FB3E0' },
    title: '특정 정당에 유리한 내용이 포함되어 있어요',
    desc: '플랫폼 정책에 위배될 가능성이 있으며 즉각적인 검토가 필요합니다.',
  },
  {
    num: 3,
    numBg: 'text-[#B9A6F5]',
    numStyle: { backgroundColor: 'rgba(167, 139, 250, 0.15)' },
    tag: '비속어',
    tagStyle: { backgroundColor: 'rgba(167, 139, 250, 0.15)', color: '#B9A6F5' },
    title: '경미한 비속어가 포함되어 있어요',
    desc: '전체 이용가 채널의 경우 연령 제한 조치가 필요할 수 있습니다.',
  },
];

interface Props {
  isLoggedIn: boolean;
}

export default function HeroScrollSection({ isLoggedIn }: Props) {
  const navigate = useNavigate();

  const count = useMotionValue(0);
  const ringRounded = useTransform(count, (v) => Math.round(v));
  const ringDashoffset = useTransform(count, (v) => CIRCUMFERENCE * (1 - v / 100));

  useEffect(() => {
    const controls = animate(count, SAFETY_SCORE, {
      duration: 1.6,
      delay: 0.9,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [count]);

  return (
    <div className="relative h-screen overflow-hidden bg-[#0e0e14] max-lg:h-auto max-md:break-keep">
      {/* 배경 컬러 오브 — 카드 뒤 배경색 */}
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
        <span className="font-regular text-[13px] tracking-[0.2em] text-[#d2cbdc] uppercase max-md:hidden">
          CREATE WITH CONFIDENCE
        </span>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        className="relative flex h-full items-center gap-12 px-55 max-xl:px-20 max-lg:h-auto max-lg:min-h-dvh max-lg:flex-col max-lg:items-stretch max-lg:justify-center max-lg:px-10 max-lg:pt-40 max-lg:pb-28 max-md:gap-10 max-md:px-5 max-md:pt-28 max-md:pb-24"
        style={{ zIndex: 1 }}
      >
        {/* 왼쪽: 히어로 텍스트 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-1 flex-col max-lg:flex-none"
        >
          <h1 className="text-[70px] leading-tight font-bold tracking-tight text-white max-xl:text-[clamp(2.5rem,4vw,4.375rem)] max-lg:text-[clamp(2.5rem,7vw,4.375rem)] max-md:text-[clamp(1.75rem,9vw,2.75rem)]">
            만드는 데 집중해요.
          </h1>
          <h1 className="text-[70px] leading-tight font-bold tracking-tight text-white max-xl:text-[clamp(2.5rem,4vw,4.375rem)] max-lg:text-[clamp(2.5rem,7vw,4.375rem)] max-md:text-[clamp(1.75rem,9vw,2.75rem)]">
            살펴보는 건,
          </h1>
          <h1 className="mb-8 text-[70px] leading-tight font-bold tracking-tight text-[#c4afff] max-xl:text-[clamp(2.5rem,4vw,4.375rem)] max-lg:text-[clamp(2.5rem,7vw,4.375rem)] max-md:text-[clamp(1.75rem,9vw,2.75rem)]">
            삐빅.
          </h1>

          <p className="mb-8 text-[18px] leading-relaxed text-gray-300 max-md:text-base">
            이미지부터 글까지.
            <br className="max-md:hidden" /> 놓치기 쉬운 민감한 요소를 모니터링해
            <br className="max-md:hidden" /> 당신의 다음 판단을 돕습니다.
          </p>

          <button
            onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
            className="flex w-fit items-center gap-2 rounded-full bg-[#c4afff] px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-violet-300"
          >
            콘텐츠 검수 시작하기
            <ArrowUpRight className="size-4" />
          </button>
        </motion.div>

        {/* 오른쪽: 결과 패널 */}
        <div className="relative flex flex-1 flex-col gap-3 max-lg:flex-none">
          {/* 원 그래프 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="relative flex items-center gap-5 overflow-hidden rounded-3xl border border-white/[0.14] bg-gradient-to-b from-[rgba(255,255,255,0.07)] to-[rgba(0,0,0,0.35)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.7),inset_0_1.5px_0_rgba(255,255,255,0.55),inset_1px_0_0_rgba(255,255,255,0.1),inset_-1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm max-md:gap-4 max-md:p-4"
          >
            {/* 스펙큘러 림 — 상단 곡면 반사 */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%] rounded-t-3xl bg-gradient-to-b from-white/[0.13] to-transparent" />
            <div className="relative shrink-0">
              <svg width="110" height="110" className="-rotate-90">
                <circle
                  cx="55"
                  cy="55"
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="10"
                />
                <motion.circle
                  cx="55"
                  cy="55"
                  r={RADIUS}
                  fill="none"
                  stroke="#c4afff"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  style={{ strokeDashoffset: ringDashoffset }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-0.5">
                  <motion.span className="text-xl font-bold text-white">{ringRounded}</motion.span>
                  <span className="text-xs text-white/50">점</span>
                </div>
                <span className="text-xs text-white/50">위험도</span>
              </div>
            </div>
            <div className="relative">
              <p className="mb-1 text-[18px] font-bold text-white max-md:text-base">
                전체 콘텐츠 민감도
              </p>
              <p className="text-xs leading-relaxed text-white/55">
                AI가 콘텐츠 전체를 분석해
                <br className="max-md:hidden" /> 종합 민감도 점수를 산출합니다.
                <br className="max-md:hidden" /> 최종 판단은 사람이 직접 내립니다.
              </p>
            </div>
          </motion.div>

          {/* 민감 요소 아이템 */}
          {sensitiveItems.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.12, ease: 'easeOut' }}
              className="relative flex items-start gap-3 overflow-hidden rounded-3xl border border-white/[0.14] bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(0,0,0,0.3)] p-4 shadow-[0_16px_48px_rgba(0,0,0,0.65),inset_0_1.5px_0_rgba(255,255,255,0.5),inset_1px_0_0_rgba(255,255,255,0.08),inset_-1px_0_0_rgba(255,255,255,0.03)] backdrop-blur-sm"
            >
              {/* 스펙큘러 림 */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[28%] rounded-t-3xl bg-gradient-to-b from-white/[0.11] to-transparent" />
              <div
                className={`relative flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${item.numBg}`}
                style={item.numStyle}
              >
                {item.num}
              </div>
              <div className="relative">
                <div className="mb-1 flex flex-wrap items-center gap-1.5">
                  <span
                    className="rounded-full px-2 py-0.5 text-[13px] font-medium"
                    style={item.tagStyle}
                  >
                    {item.tag}
                  </span>
                  <p className="text-[15px] font-semibold text-white">{item.title}</p>
                </div>
                <p className="text-xs leading-relaxed text-white/55">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 하단 레이블 */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-between px-55 max-xl:px-20 max-lg:px-10 max-md:px-5">
        <p className="flex items-center gap-2 text-[14px] font-semibold tracking-[0.2em] text-gray-600 uppercase">
          SCROLL TO EXPLORE <span className="text-lg text-[#c4afff]">↓</span>
        </p>
        <p className="text-[14px] text-gray-600 max-md:hidden">이미지 · 텍스트를 함께</p>
      </div>
    </div>
  );
}
