import ProjectGrid from "../components/project-grid";
import Icon from "../components/icon";

function Works({ preview = false }) {
  return (
    <section id="works" className="section shell works">
      <div className="section-heading reveal">
        <div><p className="eyebrow">01 / SELECTED WORKS</p><h2>{preview ? "A selection of things I’ve made." : "Projects, experiments, and client work."}</h2></div>
        {preview && <a className="text-link" href="/works" data-route>View all <Icon name="arrow" size={16} /></a>}
      </div>
      <ProjectGrid featuredOnly={preview} />
    </section>
  );
}

export default Works;
