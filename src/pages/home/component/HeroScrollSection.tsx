import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Plus, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const phrases = [
  '요즘 MZ세대 너무 예민한 거 같음',
  '재택근무하는 사람들 진짜로 일하는 건지 모르겠다',
  '스타벅스 가격이 너무 올랐어요. 이제 안 갈 것 같은데요?',
];

const sensitiveItems = [
  {
    num: 1,
    tag: '혐오 표현',
    tagStyle: { backgroundColor: 'rgba(217, 121, 145, 0.15)', color: '#E9A0B5' },
    title: '특정 집단 비하 표현이 포함되어 있어요',
    desc: '플랫폼 정책에 위배될 가능성이 있으며 즉각적인 검토가 필요합니다.',
  },
  {
    num: 2,
    tag: '정치적 발언',
    tagStyle: { backgroundColor: 'rgba(110, 147, 196, 0.15)', color: '#8FB3E0' },
    title: '특정 정당에 유리한 내용이 포함되어 있어요',
    desc: '플랫폼 정책에 위배될 가능성이 있으며 즉각적인 검토가 필요합니다.',
  },
  {
    num: 3,
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

  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];

    if (!isDeleting && typedText === phrase) {
      const t = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (isDeleting && typedText === '') {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      }, 500);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () =>
        setTypedText(
          isDeleting
            ? phrase.slice(0, typedText.length - 1)
            : phrase.slice(0, typedText.length + 1),
        ),
      isDeleting ? 30 : 60,
    );
    return () => clearTimeout(t);
  }, [typedText, phraseIdx, isDeleting]);

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center px-5 pt-16 pb-10 text-center max-md:pt-24 max-md:pb-12">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-[13px] tracking-[0.2em] text-gray-400 uppercase"
        >
          AI content monitoring
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.2] font-bold tracking-tight break-keep text-gray-900"
        >
          만드는 데 집중해요.
          <br />
          살펴보는 건, 삐빅.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 max-w-sm text-[17px] leading-relaxed break-keep text-gray-500 max-md:text-base"
        >
          글과 이미지를 올리기 전에 한 번에 살펴보고, 놓치기 쉬운 민감한 요소와 그 이유를 정리해
          드려요.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
          className="rounded-full bg-[#7047E8] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-violet-300"
        >
          검수 시작하기
        </motion.button>
      </section>

      {/* ── Preview section ── */}
      <section className="relative mx-55 overflow-hidden rounded-[2rem] bg-[#7047E8] px-8 py-12 max-xl:mx-20 max-lg:mx-10 max-md:mx-5 max-md:px-4 max-md:pt-8">
        {/* Decorative bg elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-8 -left-8 size-40 rounded-3xl bg-[#4a3cbf]/50" />
          <div className="absolute -right-8 -bottom-8 size-40 rounded-3xl bg-[#4a3cbf]/50" />
        </div>

        {/* Mockup card */}
        <div className="relative mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-[10px] ring-white/20 max-md:p-4">
            {/* Text input */}
            <div className="mb-3 flex items-center gap-3 rounded-full border border-gray-400 px-4 py-3">
              <Plus className="size-4 shrink-0 text-gray-900" />
              <span className="flex-1 text-[16px] font-semibold text-gray-900">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-900">
                <ArrowUp className="size-4 text-white" />
              </div>
            </div>

            {/* Image upload */}
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-gray-400 px-4 py-3">
              <Upload className="size-4 shrink-0 text-gray-500" />
              <div className="flex-1">
                <p className="text-[14px] text-gray-500">함께 올릴 이미지를 올려주세요</p>
                <p className="text-[12px] text-gray-500">
                  파일을 끌어다 놓거나 직접 선택할 수 있어요
                </p>
              </div>
              <button className="shrink-0 rounded-full border border-gray-400 px-4 py-1.5 text-[13px] text-gray-600">
                파일 선택
              </button>
            </div>

            {/* Tag chips */}
            <div className="mb-5 flex flex-wrap gap-2">
              {['문구', '이미지 속 문자', '상징', '제스처', '사물', '맥락'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-xl bg-gray-100 px-3 py-1 text-[13px] text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Results header */}
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-[14px] text-gray-500">이런 결과를 받아요</span>
            </div>

            {/* Sensitive items */}
            <div className="flex flex-col gap-4">
              {sensitiveItems.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.12 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 shrink-0 text-[13px] font-medium text-gray-400">
                    {String(item.num).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-[12px] font-medium"
                        style={item.tagStyle}
                      >
                        {item.tag}
                      </span>
                      <p className="text-[14px] font-semibold text-gray-800">{item.title}</p>
                    </div>
                    <p className="text-[12px] leading-relaxed text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
