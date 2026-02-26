import { PageLoadCascade } from "@/components/PageLoadCascade";
import PolaroidGallery from "@/components/PolaroidGallery";
import { cn } from "@/lib/utils";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const CustomLink = (props: CustomLinkProps) => (
  <a
    {...props}
    target="_blank"
    className={cn(
      "relative inline-block text-blue-400 transition-colors duration-200 ease-in-out hover:text-blue-300",
      "after:absolute after:left-0 after:bottom-[3px] after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-300 after:transition-transform after:duration-300 after:ease-out",
      "hover:after:scale-x-100",
    )}
  />
);

export default function Page() {
  return (
    <main className="relative justify-center">
      <PageLoadCascade>
        <div>
          <h3 className="text-xl font-regular mb-4 font-sans tracking-tight">
            A little bit more about who I am.
          </h3>
          <div className="font-light text-sm space-y-3 text-zinc-900 dark:text-zinc-200 mb-4">
            <p>
              Currently a SWE at{" "}
              <CustomLink href="https://advizr.ca/">
                Advizr
              </CustomLink>
              , where I ship agentic AI and RAG products to small businesses.
              I&apos;ve built a custom RAG pipeline, comparison tool, and document
              generator for a real estate company, as well as an automated parallel
              data scraper and normalizer for 10,000+ clinics across Canada.
            </p>
            <p>
              I&apos;m also a Partnerships Director at{" "}
              <CustomLink href="https://www.ubcbiztech.com/">
                UBC BizTech
              </CustomLink>{" "}
              (800+ members). A few things I&apos;m proud of: getting us a live
              interview on Global News, securing over $10k in sponsorships/grants,
              and leading our partnerships team for Kickstart — a startup event
              with 40+ partners including an a16z partner and YC founders.
            </p>
            <p>
              Currently studying Business + Computer Science at the University of
              British Columbia. Interested in startups, agentic AI, and sports
              (volleyball, table tennis, and soccer are my main three).
            </p>

            <p>Here&apos;s a few of my adventures from my undergrad!</p>
          </div>
          <PolaroidGallery />
        </div>
      </PageLoadCascade>
    </main>
  );
}
