const steps = [
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
];

export default function HowItWorksSection() {
  return (
    <section
      id="section-how"
      className="bg-white px-55 pt-24 pb-28 max-xl:px-20 max-lg:px-10 max-md:px-5 max-md:py-16 max-md:break-keep"
    >
      <div className="mb-16 grid grid-cols-2 items-start gap-16 max-xl:gap-10 max-lg:grid-cols-1 max-lg:gap-6 max-md:mb-10">
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
        <div className="flex items-start justify-end pt-2 max-lg:justify-start max-lg:pt-0">
          <p className="text-[15px] leading-relaxed text-gray-400">
            복잡한 검토의 시작을
            <br />세 단계로 간결하게.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {steps.map((step) => (
          <div
            key={step.num}
            className="grid grid-cols-[160px_1fr_1fr] items-center border-t border-gray-200 py-8 max-lg:grid-cols-[100px_1fr] max-lg:gap-y-2 max-md:grid-cols-[56px_1fr]"
          >
            <span className="text-[45px] font-bold text-[#7047E8] max-lg:row-span-2 max-lg:self-start max-md:text-4xl">
              {step.num}
            </span>
            <span className="text-[30px] font-semibold text-gray-900 max-md:text-2xl">
              {step.title}
            </span>
            <p className="text-[18px] leading-relaxed whitespace-pre-line text-gray-600 max-md:text-base max-md:whitespace-normal">
              {step.desc}
            </p>
          </div>
        ))}
        <div className="border-t border-gray-200" />
      </div>
    </section>
  );
}
