import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import HeroScrollSection from './HeroScrollSection';
import { tokenStore } from '@/features/auth/store/tokenStore';
import bbikFullLogo from '@/shared/assets/bbik-full-logo.svg';

function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

const TABS = ['이미지', '텍스트'] as const;
type Tab = (typeof TABS)[number];

function ServiceCard({
  title,
  innerContent,
  outerContent,
}: {
  title: string;
  innerContent: React.ReactNode;
  outerContent: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[15px] font-semibold text-gray-900">{title}</p>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-[13px] text-gray-500">
          설명용 예시
        </span>
      </div>

      {/* 연보라 내부 박스 */}
      <div className="mb-4 rounded-2xl bg-[#ede9ff] p-5">{innerContent}</div>

      {/* 구분선 + 하단 설명 */}
      <div className="border-t border-gray-100 pt-4">{outerContent}</div>

      <p className="mt-4 text-right text-[10px] text-gray-400">
        서비스 이해를 돕기 위한 예시이며, 실제 분석 결과가 아닙니다.
      </p>
    </div>
  );
}

function ImageCard() {
  return (
    <ServiceCard
      title="이미지 콘텐츠 검수"
      innerContent={
        <>
          <p className="mb-2 text-[11px] text-gray-400">이미지 검토 포인트</p>
          <p className="text-[20px] leading-relaxed font-medium text-gray-800">
            익숙하게 쓴 이미지,
            <br />
            <span className="text-bold rounded bg-violet-200 px-1 text-[#7047E8]">
              다른 의미는 없을까요?
            </span>
          </p>
        </>
      }
      outerContent={
        <>
          <p className="mb-1 text-sm font-semibold text-[#7047E8]">문제적 밈 · 혐오 표현 등</p>
          <p className="text-xs leading-relaxed text-gray-400">
            이미지가 사용된 맥락과 전달하려는 의도를 함께 확인해 주세요.
          </p>
        </>
      }
    />
  );
}

function TextCard() {
  return (
    <ServiceCard
      title="텍스트 콘텐츠 검수"
      innerContent={
        <>
          <p className="mb-2 text-[11px] text-gray-400">표현 검토 포인트</p>
          <p className="text-[20px] leading-relaxed font-medium text-gray-800">
            가볍게 건넨 한마디가
            <br />
            <span className="text-bold rounded bg-violet-200 px-1 text-[#7047E8]">
              누군가에게는 다르게.
            </span>
          </p>
        </>
      }
      outerContent={
        <>
          <p className="mb-1 text-[13px] font-semibold text-[#7047E8]">
            어떤 표현을 왜 확인해야 하는지
          </p>
          <p className="text-[13px] leading-relaxed text-gray-400">
            앞뒤 문장과 표현의 대상을 살펴보고 최종 문구를 결정해 주세요.
          </p>
        </>
      }
    />
  );
}

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

export default function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = !!tokenStore.getToken();
  const [activeTab, setActiveTab] = useState<Tab>('이미지');
  const [activePrinciple, setActivePrinciple] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) return;

    tokenStore.setToken(token);

    const payload = parseJwtPayload(token);
    if (payload) {
      const email = (payload.email ?? '') as string;
      const name = (payload.name ?? email) as string;
      tokenStore.setUser({ email, name });
    }

    const isOnboarded = localStorage.getItem('onboarding_complete');
    navigate(isOnboarded ? '/dashboard' : '/onboarding', { replace: true });
  }, [navigate]);

  return (
    <main>
      <HeroScrollSection isLoggedIn={isLoggedIn} />

      {/* OUR PURPOSE */}
      <section id="section-purpose" className="flex min-h-[650px] items-center bg-white px-55">
        <div className="flex w-full items-center justify-between gap-24">
          {/* 왼쪽 */}
          <div className="flex-1">
            <p className="mb-10 text-[13px] font-semibold tracking-[0.2em] text-[#7047E8] uppercase">
              OUR PURPOSE
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4.375rem)] leading-tight font-bold tracking-tight text-gray-900">
              좋은 콘텐츠가
              <br />
              더 나은 반응을
              <br />
              <span className="text-[#7047E8]">만날 수 있도록.</span>
            </h2>
          </div>

          {/* 오른쪽 */}
          <div className="flex-1 space-y-6 pl-20 text-gray-500">
            <p className="text-base leading-relaxed">
              의도와 다르게 전해질 수 있는 한마디,
              <br />
              미처 발견하지 못한 장면 하나.
            </p>
            <p className="text-base leading-relaxed">
              삐빅은 콘텐츠 속 민감한 요소와 맥락을 함께
              <br />
              살펴봅니다. 무엇을 다시 확인해야 할지 정리해,
              <br />
              만드는 사람이 콘텐츠에 더 집중할 수 있도록
              <br />
              돕습니다.
            </p>
          </div>
        </div>
      </section>

      {/* OUR SERVICE */}
      <section id="section-service" className="bg-[#ede9ff] px-55 pt-20 pb-24">
        {/* 상단: 타이틀 + 설명 */}
        <div className="mb-14 grid grid-cols-2 gap-24">
          <div>
            <p className="mb-8 text-[13px] font-semibold tracking-[0.2em] text-[#7047E8] uppercase">
              OUR SERVICE
            </p>
            <h2 className="text-[clamp(2rem,4vw,4rem)] leading-tight font-bold tracking-tight text-gray-900">
              형식은 달라도,
              <br />
              놓치지 않도록.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base leading-relaxed text-gray-500">
              서로 다른 콘텐츠를 한 번에.
              <br />
              각각의 요소뿐 아니라
              <br />
              함께 놓았을 때의 맥락까지 살펴봅니다.
            </p>
          </div>
        </div>

        {/* 탭 전환 */}
        <div className="mb-12 inline-flex rounded-full bg-white p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-9 py-3 text-[18px] font-semibold transition-colors ${
                activeTab === tab ? 'bg-black text-white' : 'text-black hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 하단: 콘텐츠 + 카드 
        {activeTab === '영상' && (
          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-gray-400">
                01 / VIDEO
              </p>
              <h3 className="mb-4 text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold leading-tight tracking-tight text-gray-900">
                지나가는 장면도,
                <br />
                다시 살펴볼 수 있게.
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                영상에서 확인이 필요한 구간과 이유를 정리합니다.
                <br />
                전체 흐름 속에서 표현과 맥락을 함께 검토해 보세요.
              </p>
              <p className="text-sm text-gray-400">— MP4 · 영상 콘텐츠</p>
            </div>
            <VideoCard />
          </div>
        )} */}

        {activeTab === '이미지' && (
          <div className="grid grid-cols-[2fr_3fr] gap-16">
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-[13px] font-semibold tracking-widest text-gray-400 uppercase">
                01 / IMAGE
              </p>
              <h3 className="mb-4 text-[clamp(1.5rem,2.5vw,2.5rem)] leading-tight font-bold tracking-tight text-gray-900">
                한 장에 담긴 의미도,
                <br />
                조금 더 세심하게.
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                이미지에 담긴 민감한 요소를 확인합니다. 눈에 띄는
                <br />
                표현뿐 아니라 함께 쓰인 글과의 맥락도 살펴보세요.
              </p>
              <p className="text-sm text-gray-400">— JPG · PNG · 이미지 콘텐츠</p>
            </div>
            <ImageCard />
          </div>
        )}

        {activeTab === '텍스트' && (
          <div className="grid grid-cols-[2fr_3fr] gap-16">
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-[13px] font-semibold tracking-widest text-gray-400 uppercase">
                02 / TEXT
              </p>
              <h3 className="mb-4 text-[clamp(1.5rem,2.5vw,2.5rem)] leading-tight font-bold tracking-tight text-gray-900">
                전하고 싶은 말이,
                <br />
                의도대로 닿을 수 있게.
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                글에 담긴 정치적 발언, 혐오 표현, 비속어 등 민감한
                <br />
                요소를 정리합니다. 독자가 받아들일 맥락을 한 번 더
                <br />
                확인해 보세요.
              </p>
              <p className="text-sm text-gray-400">— TEXT · 글 콘텐츠</p>
            </div>
            <TextCard />
          </div>
        )}
      </section>

      {/* CORE PRINCIPLES */}
      <section id="section-principles" className="bg-[#0e0e14] px-55 py-24">
        <div className="grid grid-cols-2 items-start gap-16">
          {/* 왼쪽: 리스트 */}
          <div>
            <p className="mb-10 text-[14px] font-semibold tracking-[0.2em] text-[#c4afff] uppercase">
              CORE PRINCIPLES
            </p>
            <h2 className="mb-14 text-[clamp(2rem,4vw,4rem)] leading-tight font-bold tracking-tight text-white">
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
                      <div className="flex items-center gap-6">
                        <span
                          className={`text-[25px] font-semibold transition-colors ${isActive ? 'text-[#c4afff]' : 'text-gray-600'}`}
                        >
                          {p.num}
                        </span>
                        <span
                          className={`text-[25px] font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}
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
          <div className="flex items-center pt-[140px]">
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
                <p className="mb-4 text-[clamp(2rem,1.8vw,1.5rem)] font-bold text-white">
                  {principles[activePrinciple].subtitle}
                </p>
                <p className="text-base leading-relaxed whitespace-pre-line text-gray-400">
                  {principles[activePrinciple].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="section-how" className="bg-white px-55 pt-24 pb-28">
        {/* 상단: 타이틀 + 설명 */}
        <div className="mb-16 grid grid-cols-2 items-start gap-16">
          <div>
            <p className="mb-8 text-[14px] font-semibold tracking-[0.2em] text-[#7047E8] uppercase">
              HOW IT WORKS
            </p>
            <h2 className="text-[clamp(2rem,4vw,4rem)] leading-tight font-bold tracking-tight text-gray-900">
              업로드부터 검토까지,
              <br />
              자연스럽게 이어지도록.
            </h2>
          </div>
          <div className="flex items-start justify-end pt-2">
            <p className="text-[15px] leading-relaxed text-gray-400">
              복잡한 검토의 시작을
              <br />세 단계로 간결하게.
            </p>
          </div>
        </div>

        {/* 단계 리스트 */}
        <div className="flex flex-col">
          {[
            {
              num: '01',
              title: '콘텐츠 업로드',
              desc: '검토할 이미지, 글을 준비하고\n삐빅 서비스에 업로드해 주세요.',
            },
            {
              num: '02',
              title: 'AI 모니터링',
              desc: 'AI가 콘텐츠의 민감한 요소를 살펴보고\n확인이 필요한 내용과 이유를 정리합니다.',
            },
            {
              num: '03',
              title: '근거 기반 검수',
              desc: '정리된 내용을 확인하고 맥락을 검토해\n수정과 게시 여부를 직접 결정하세요.',
            },
          ].map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-[160px_1fr_1fr] items-center border-t border-gray-200 py-8"
            >
              <span className="text-[45px] font-bold text-[#7047E8]">{step.num}</span>
              <span className="text-[30px] font-semibold text-gray-900">{step.title}</span>
              <p className="text-[18px] leading-relaxed whitespace-pre-line text-gray-600">
                {step.desc}
              </p>
            </div>
          ))}
          <div className="border-t border-gray-200" />
        </div>
      </section>

      {/* CTA 배너 */}
      <section className="bg-[#c4afff] px-55 py-20">
        <div className="flex items-center justify-between">
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

      {/* 푸터 */}
      <footer className="bg-white px-55 pt-14 pb-10">
        <div className="mb-10 flex items-start justify-between">
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

        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
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
    </main>
  );
}
