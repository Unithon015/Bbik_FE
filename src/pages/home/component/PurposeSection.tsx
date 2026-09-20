export default function PurposeSection() {
  return (
    <section
      id="section-purpose"
      className="flex min-h-[650px] items-center bg-white px-55 max-xl:px-20 max-lg:min-h-0 max-lg:px-10 max-lg:py-20 max-md:px-5 max-md:py-16 max-md:break-keep"
    >
      <div className="flex w-full items-center justify-between gap-24 max-xl:gap-12 max-lg:flex-col max-lg:items-start max-lg:gap-10">
        <div className="flex-1 max-lg:flex-none">
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

        <div className="flex-1 space-y-6 pl-20 text-gray-500 max-xl:pl-10 max-lg:flex-none max-lg:pl-0">
          <p className="text-base leading-relaxed">
            의도와 다르게 전해질 수 있는 한마디,
            <br className="max-md:hidden" /> 미처 발견하지 못한 장면 하나.
          </p>
          <p className="text-base leading-relaxed">
            삐빅은 콘텐츠 속 민감한 요소와 맥락을 함께
            <br className="max-md:hidden" /> 살펴봅니다. 무엇을 다시 확인해야 할지 정리해,
            <br className="max-md:hidden" /> 만드는 사람이 콘텐츠에 더 집중할 수 있도록
            <br className="max-md:hidden" /> 돕습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
