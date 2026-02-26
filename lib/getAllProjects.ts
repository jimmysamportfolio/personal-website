import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export async function getAllProjects() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const projects = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");

      const { metadata } = await import(`@/content/projects/${slug}.mdx`);
      return {
        slug,
        ...metadata,
        tags: (metadata.tags || [])
          .slice()
          .sort((a: string, b: string) => a.localeCompare(b)),
      };
    })
  );

  projects.sort((a, b) => {
    const priorityA = a.priority ?? 999;
    const priorityB = b.priority ?? 999;
    if (priorityA !== priorityB) return priorityA - priorityB;
    return a.title.localeCompare(b.title);
  });

  return projects as {
    slug: string;
    title: string;
    role: string;
    type: string
    tags: string[];
    previewImage: string;
    featured: boolean;
  }[];
}
