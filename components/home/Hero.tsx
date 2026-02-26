import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full flex flex-col justify-center items-start text-[#3b3b3b]">
      <div className="flex flex-col gap-2 text-xl font-medium tracking-tight mb-4 w-full">
        {"Jimmy's portfolio."}
      </div>
      <div className="w-full space-y-4 text-sm tracking-tight">
        <p>
          {"Currently a SWE at "}
          <Link href="https://advizr.ca/" target="_blank" className="hover:underline hover:text-muted-foreground text-muted-foreground/80">
            {"Advizr"}
          </Link>
          {" where I ship agentic AI and RAG products to small businesses. Also a Partnerships Director at "}
          <Link href="https://www.ubcbiztech.com/" target="_blank" className="hover:underline hover:text-muted-foreground text-muted-foreground/80">
            {"UBC BizTech"}
          </Link>
          {" (800+ members)."}
        </p>
        <p>
          {"Interested in startups, agentic AI, and sports."}
        </p>
      </div>
    </div>
  );
}
