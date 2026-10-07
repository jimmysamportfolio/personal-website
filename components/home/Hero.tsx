export default function Hero() {
  return (
    <div className="flex w-full flex-col items-start justify-center py-6 text-[#3b3b3b] sm:py-10">
      <div className="mb-6 flex w-full flex-col gap-2 text-3xl font-medium tracking-tight sm:text-4xl">
        {"Jimmy's portfolio."}
      </div>
      <div className="w-full max-w-2xl space-y-4 text-lg leading-relaxed tracking-tight sm:text-xl">
        <p>
          {"I like building things, breaking into new spaces, and figuring stuff out as I go. Right now that looks like building AI agents at Cedar AI Agents and running events at BizTech."}
        </p>
      </div>
    </div>
  );
}
