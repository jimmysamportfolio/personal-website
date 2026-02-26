import { getAllProjects } from "@/lib/getAllProjects";
import ProjectFolderTabs from "@/components/ProjectFolderTabs";

export default async function ProjectGrid() {
  const projects = await getAllProjects();

  return <ProjectFolderTabs projects={projects} />;
}
