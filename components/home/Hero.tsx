export default function Hero() {
  return (
    <div className="flex w-full flex-col items-start justify-center py-6 text-[#3b3b3b] sm:py-10">
      <div className="mb-6 flex w-full flex-col gap-2 text-3xl font-medium tracking-tight sm:text-4xl">
        {"Hi, I'm Jimmy, Founding Engineer at Cedar AI Agents (a16z SR06)"}
      </div>
      <div className="w-full max-w-3xl space-y-4 text-lg leading-relaxed tracking-tight sm:text-xl">
        <p>I&apos;m interested in AI/ML and robotics, and I&apos;m loving building at the intersection of human-AI interaction.</p>
        <p>I care about building products that are not only functional, but also intuitive and delightful.</p>
        <p>Currently on leave from the University of British Columbia.</p>
      </div>
    </div>
  );
}
