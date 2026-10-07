export default function Hero() {
  return (
    <div className="w-full flex flex-col justify-center items-start text-[#3b3b3b]">
      <div className="flex flex-col gap-2 text-xl font-medium tracking-tight mb-4 w-full">
        {"Jimmy's portfolio."}
      </div>
      <div className="w-full space-y-4 text-sm tracking-tight">
        <p>
          {"I like building things, breaking into new spaces, and figuring stuff out as I go. Right now that looks like building AI agents at Cedar AI Agents and running events at BizTech."}
        </p>
      </div>
    </div>
  );
}
