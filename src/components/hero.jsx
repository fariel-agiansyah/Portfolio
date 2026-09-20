import Icon from "./icon";

function Hero() {
  return (
    <section className="hero section shell">
      <div className="hero-copy reveal">
        <p className="eyebrow">PORTFOLIO / 2026</p>
        <h1>Visual design,<br /><em>built for the web.</em></h1>
        <p className="hero-description">
          I’m Fariel Agiansyah, a visual designer and creative developer interested in turning ideas into clear, useful, and memorable digital experiences.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="/works" data-route>View selected work <Icon name="arrow" size={17} /></a>
          <a className="text-link" href="/about" data-route>More about me <Icon name="arrow" size={16} /></a>
        </div>
      </div>
      <div className="hero-meta reveal reveal-delay">
        <span>Based in Yogyakarta, Indonesia</span>
        <span>Design / Development / Content</span>
      </div>
    </section>
  );
}

export default Hero;
