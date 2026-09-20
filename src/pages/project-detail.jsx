import { useEffect } from "react";
import Icon from "../components/icon";
import projects from "../data/projects";

function ProjectDetail({ slug }) {
  const project = projects.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) {
    return (
      <section className="page-shell not-found">
        <p className="eyebrow">WORK / NOT FOUND</p>
        <h1>Project not found.</h1>
        <a className="button button-dark" href="/works" data-route>
          Back to works <Icon name="arrow" />
        </a>
      </section>
    );
  }

  return (
    <section className="page-shell project-detail-page">
      <a className="detail-back" href="/works" data-route>
        <Icon name="arrow" size={16} /> Back to works
      </a>

      <div className="project-detail-hero">
        <div>
          <p className="eyebrow">{project.category} / {project.year}</p>
          <h1>{project.title}</h1>
          <p className="project-detail-description">{project.description}</p>
        </div>
        <div className="project-detail-media">
          {project.image ? (
            <img src={project.image} alt={project.title} />
          ) : (
            <div className="project-placeholder" aria-hidden="true">
              <span>PROJECT IMAGE</span>
              <small>Artwork can be added later</small>
            </div>
          )}
        </div>
      </div>

      <div className="project-detail-grid">
        <div className="detail-block">
          <p className="detail-label">ROLE</p>
          <p>{project.role}</p>
        </div>
        <div className="detail-block">
          <p className="detail-label">STACK</p>
          <div className="tag-list">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
        </div>
        <div className="detail-block">
          <p className="detail-label">ABOUT</p>
          <p>{project.description}</p>
        </div>
      </div>

      <div className="project-detail-actions">
        {project.liveUrl && <a className="button button-dark" href={project.liveUrl} target="_blank" rel="noreferrer">
          Visit project <Icon name="external" size={16} />
        </a>}
        {project.githubUrl && <a className="button button-light" href={project.githubUrl} target="_blank" rel="noreferrer">
          GitHub <Icon name="github" size={16} />
        </a>}
      </div>
    </section>
  );
}

export default ProjectDetail;
