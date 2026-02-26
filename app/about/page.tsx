import { PageLoadCascade } from "@/components/layout/PageLoadCascade";
import { getMDXComponents } from "@/mdx-components";
import AboutContent from "@/content/about/about.mdx";

export default function Page() {
  const components = getMDXComponents();

  return (
    <main className="relative justify-center">
      <PageLoadCascade>
        <div>
          <h3 className="text-xl font-regular mb-4 font-sans tracking-tight">
            A little bit more about who I am.
          </h3>
          <div className="font-light text-sm space-y-3 text-zinc-900 dark:text-zinc-200 mb-4">
            <AboutContent components={components} />
          </div>
        </div>
      </PageLoadCascade>
    </main>
  );
}
