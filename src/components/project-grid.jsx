import projects from "../data/projects";
import ProjectCard from "./project-card";

function ProjectGrid({ featuredOnly = false }) {
  const items = featuredOnly ? projects.filter((project) => project.featured) : projects;
  return <div className="project-grid">{items.map((project) => <ProjectCard key={project.id} project={project} />)}</div>;
}

export default ProjectGrid;
