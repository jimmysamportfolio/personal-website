"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

type Project = {
  slug: string;
  title: string;
  role: string;
  tags: string[];
  type?: string;
  previewImage: string;
  featured: boolean;
  date?: string;
};

export default function ProjectFolderTabs({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <section className="w-full py-4">
      <div className="w-full">
        <h2 className="mb-6 text-xl font-semibold">Projects</h2>
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 sm:grid-cols-2">
          {projects.map((project) => (
            <motion.div key={project.title} className="w-full">
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
        {projects.length === 0 && (
          <p className="py-10 text-center text-sm text-zinc-600">
            No projects yet.
          </p>
        )}
      </div>
    </section>
  );
}
