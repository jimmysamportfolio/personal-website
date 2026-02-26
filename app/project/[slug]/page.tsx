import { ExternalLink } from "@/app/constants";
import Footer from "@/components/layout/Footer";
import ProjectLinkButton from "@/components/project/ProjectLinkButton";
import { getMDXComponents } from "@/mdx-components";
import { MDXContent } from "mdx/types";
import type { Metadata } from "next/types";
import MediaPreview from "@/components/project/MediaPreview";
import { notFound } from "next/navigation";
import { ProjectTag } from "@/components/project/ProjectTag";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Link } from "lucide-react";
import { PageLoadCascade } from "@/components/layout/PageLoadCascade";

export type PostMetadata = Metadata & {
  title: string;
  description: string;
  tags: string[];
  role: string;
  team: string[];
  date?: string;
  additionalLinks?: ExternalLink[];
  image: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Post: MDXContent;
  let metadata: PostMetadata;

  try {
    const mod = await import(`@/content/${slug}.mdx`);
    Post = mod.default;
    metadata = mod.metadata;
  } catch (err) {
    console.error(`MDX file for slug "${slug}" not found`, err);
    notFound();
  }

  const components = getMDXComponents();
  const parsedYear = metadata.date
    ? new Date(metadata.date).getFullYear()
    : undefined;
  const projectYear =
    parsedYear && !Number.isNaN(parsedYear) ? String(parsedYear) : null;

  const projectRole = metadata.role;

  return (
    <>
      <ScrollToTop />
      <main className="relative mx-auto min-h-screen w-full justify-center lg:justify-start">
        <PageLoadCascade stagger={0.05}>
          <div className="flex flex-col gap-1 w-full mb-8 border-b border-border border-dashed pb-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Title</p>
                <p className="text-sm break-words">{metadata.title ?? "—"}</p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="text-sm break-words">{projectRole ?? "—"}</p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Year</p>
                <p className="text-sm">{projectYear ?? "—"}</p>
              </div>
            </div>

            <MediaPreview
              src={metadata.image}
              className="flex h-64 md:h-[24rem] w-full mt-2 mb-1"
            />

            <p className="text-2xl font-regular tracking-tight mt-4">
              {metadata.description}
            </p>

            {metadata?.additionalLinks &&
              metadata?.additionalLinks?.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4 opacity-80">
                  {metadata?.additionalLinks?.map((item, index) => (
                    <ProjectLinkButton item={item} key={index} />
                  ))}
                </div>
              )}
          </div>

          <Post components={components} />

          <Footer />
        </PageLoadCascade>
      </main>
    </>
  );
}

export const dynamicParams = false;
