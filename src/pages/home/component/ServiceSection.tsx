import { useState } from 'react';

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
    <div className="rounded-3xl bg-white p-6 max-md:p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[15px] font-semibold text-gray-900">{title}</p>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-[13px] text-gray-500">
          설명용 예시
        </span>
      </div>

      <div className="mb-4 rounded-2xl bg-[#ede9ff] p-5">{innerContent}</div>

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

export default function ServiceSection() {
  const [activeTab, setActiveTab] = useState<Tab>('이미지');

  return (
    <section
      id="section-service"
      className="bg-[#ede9ff] px-55 pt-20 pb-24 max-xl:px-20 max-lg:px-10 max-md:px-5 max-md:py-16 max-md:break-keep"
    >
      <div className="mb-14 grid grid-cols-2 gap-24 max-xl:gap-12 max-lg:grid-cols-1 max-lg:gap-6 max-md:mb-10">
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
            <br className="max-md:hidden" /> 각각의 요소뿐 아니라
            <br className="max-md:hidden" /> 함께 놓았을 때의 맥락까지 살펴봅니다.
          </p>
        </div>
      </div>

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

      {activeTab === '이미지' && (
        <div className="grid grid-cols-[2fr_3fr] gap-16 max-xl:gap-10 max-lg:grid-cols-1 max-lg:gap-8">
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
              <br className="max-md:hidden" /> 표현뿐 아니라 함께 쓰인 글과의 맥락도 살펴보세요.
            </p>
            <p className="text-sm text-gray-400">— JPG · PNG · 이미지 콘텐츠</p>
          </div>
          <ImageCard />
        </div>
      )}

      {activeTab === '텍스트' && (
        <div className="grid grid-cols-[2fr_3fr] gap-16 max-xl:gap-10 max-lg:grid-cols-1 max-lg:gap-8">
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
              <br className="max-md:hidden" /> 요소를 정리합니다. 독자가 받아들일 맥락을 한 번 더
              <br className="max-md:hidden" /> 확인해 보세요.
            </p>
            <p className="text-sm text-gray-400">— TEXT · 글 콘텐츠</p>
          </div>
          <TextCard />
        </div>
      )}
    </section>
  );
}
