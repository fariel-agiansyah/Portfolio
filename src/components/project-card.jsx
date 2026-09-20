import Icon from "./icon";

function ProjectCard({ project }) {
  const index = project.id === "internary" ? "01" : project.id === "indihome-yogya" ? "02" : "03";

  return (
    <a className="project-card reveal" href={"/works/" + project.slug} data-route>
      <div className="project-media">
        {project.image ? <img src={project.image} alt="" /> : (
          <div className="project-placeholder" aria-hidden="true">
            <span>IMAGE PLACEHOLDER</span><small>Drop project artwork here later</small>
          </div>
        )}
        <span className="project-index">{index}</span>
        <span className="project-arrow"><Icon name="arrow" size={19} /></span>
      </div>
      <div className="project-info">
        <div><p className="project-category">{project.category}</p><h3>{project.title}</h3></div>
        <span className="project-year">{project.year}</span>
      </div>
    </a>
  );
}

export default ProjectCard;
