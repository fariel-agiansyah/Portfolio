function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} />
      </div>

      <div className="project-info">
        <div>
          <p className="project-category">{project.category}</p>

          <h3>{project.title}</h3>
        </div>

        <span className="project-year">{project.year}</span>
      </div>
    </article>
  );
}

export default ProjectCard;
