import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const principles = [
  {
    num: '01',
    label: '맥락을 함께 봅니다',
    keyword: 'Context.',
    subtitle: '한 부분을 넘어, 전체를 함께.',
    desc: '영상, 이미지, 글은 서로 연결되어 있습니다. 삐빅은 서로 다른 콘텐츠의 맥락을 함께 확인해\n 살펴볼 요소를 정리합니다.',
  },
  {
    num: '02',
    label: '이유를 정리합니다',
    keyword: 'Reason.',
    subtitle: '무엇보다 중요한 건, 그 이유.',
    desc: '민감한 요소를 찾는 데서 멈추지 않습니다. 확인이 필요한 구간과 이유를 우선순위로 정리해\n 검토할 지점을 파악하도록 돕습니다.',
  },
  {
    num: '03',
    label: '판단은 사람에게 둡니다',
    keyword: 'Human.',
    subtitle: '마지막 결정은 만드는 사람에게.',
    desc: 'AI가 게시 가능 여부나 법적 판단을 단정하지 않습니다. 정리된 근거를 바탕으로\n 최종 판단은 사람이 직접 내립니다.',
  },
];

export default function PrinciplesSection() {
  const [activePrinciple, setActivePrinciple] = useState(0);

  return (
    <section
      id="section-principles"
      className="bg-[#0e0e14] px-55 py-24 max-xl:px-20 max-lg:px-10 max-md:px-5 max-md:py-16 max-md:break-keep"
    >
      <div className="grid grid-cols-2 items-start gap-16 max-xl:gap-10 max-lg:grid-cols-1 max-lg:gap-12">
        {/* 왼쪽: 리스트 */}
        <div>
          <p className="mb-10 text-[14px] font-semibold tracking-[0.2em] text-[#c4afff] uppercase">
            CORE PRINCIPLES
          </p>
          <h2 className="mb-14 text-[clamp(2rem,4vw,4rem)] leading-tight font-bold tracking-tight text-white max-md:mb-8">
            삐빅이 살펴보는 방식.
          </h2>

          <div className="flex flex-col">
            {principles.map((p, idx) => {
              const isActive = activePrinciple === idx;
              return (
                <button
                  key={p.num}
                  onMouseEnter={() => setActivePrinciple(idx)}
                  onClick={() => setActivePrinciple(idx)}
                  className="border-t border-white/10 py-7 text-left transition-colors first:border-t-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 max-md:gap-3">
                      <span
                        className={`text-[25px] font-semibold transition-colors max-md:text-xl ${isActive ? 'text-[#c4afff]' : 'text-gray-600'}`}
                      >
                        {p.num}
                      </span>
                      <span
                        className={`text-[25px] font-semibold transition-colors max-md:text-xl ${isActive ? 'text-white' : 'text-gray-500'}`}
                      >
                        {p.label}
                      </span>
                    </div>
                    {isActive && <ArrowUpRight className="size-5 text-[#c4afff]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 키워드 + 설명 */}
        <div className="flex items-center pt-[140px] max-lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePrinciple}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <p className="mb-6 text-[clamp(3rem,6vw,6rem)] leading-none font-bold tracking-tight text-[#c4afff]">
                {principles[activePrinciple].keyword}
              </p>
              <p className="mb-4 text-[clamp(2rem,1.8vw,1.5rem)] font-bold text-white max-md:text-2xl">
                {principles[activePrinciple].subtitle}
              </p>
              <p className="text-base leading-relaxed whitespace-pre-line text-gray-400 max-md:whitespace-normal">
                {principles[activePrinciple].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
